from datetime import datetime
from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from auth import Auth, LoginBody
from db import init_db
from models import Printer, PrintJob, Document, Log
from threading import Thread
import docx
import io
import PyPDF2

app = FastAPI()
auth = Auth()
db = init_db()

def log_callback(printer: Printer, print_job: PrintJob):
    assert printer.id is not None and print_job.id is not None and print_job.student_id is not None
    log = Log(
        printer_id=printer.id,
        print_job_id=print_job.id,
        student_id=print_job.student_id,
        description=f"[END] user={print_job.student_id} doc={print_job.document.file_name}",
        date=datetime.now(),
    )

    # this is thread safe
    db.add_log(log)


for printer in db.get_printers():
    printer_thread = Thread(target=printer.run, args=(log_callback,))
    printer_thread.start()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.middleware("http")
async def authorize(request: Request, call_next):
    if request.url.path == "/login":
        return await call_next(request)
    token = request.headers.get("Authorization") or request.cookies.get("token")
    if token is None:
        return Response(status_code=401, content="Unauthorized")

    user_id = auth.is_authorised(token)
    if user_id is None:
        return Response(status_code=401, content="Unauthorized")
    request.state.user = user_id
    print(f"User {user_id} is authorized")
    response = await call_next(request)
    return response


@app.post("/login")
async def login(response: Response, login_data: LoginBody):
    user, token = auth.login(login_data.login, login_data.password)
    if user is None or token is None:
        return {"error": "Invalid login or password"}
    response.set_cookie("token", token, httponly=True)
    return {"token": token, "role": auth.role(user.user_id)}


@app.get("/printer")
async def get_printers():
    return db.get_printers()


@app.post("/printer/add")
async def add_printer(request: Request, printer: Printer):
    if auth.role(request.state.user) != "spso":
        raise HTTPException(status_code=403, detail="Forbidden")
    printers = db.get_printers()
    assert len(printers) > 0 and printers[-1].id is not None
    next_printer_id = printers[-1].id + 1
    printer.id = next_printer_id
    db.add_printer(printer)
    return {"id": printer.id}


@app.post("/printer/update")
async def update_printer(request: Request, printer: Printer):
    if auth.role(request.state.user) != "spso":
        raise HTTPException(status_code=403, detail="Forbidden")
    if printer.id is None:
        raise HTTPException(status_code=400, detail="Printer ID is required")
    db.update_printer(printer)
    return {"id": printer.id}


@app.delete("/printer/delete/{id}")
async def delete_printer(request: Request, id: int):
    if auth.role(request.state.user) != "spso":
        raise HTTPException(status_code=403, detail="Forbidden")
    db.delete_printer(id)
    return {"id": id}


@app.post("/printer/print")
async def add_printjob(request: Request, print_job: PrintJob):
    if auth.role(request.state.user) != "student":
        raise HTTPException(status_code=403, detail="Forbidden")

    printers = db.get_printers()
    least_busy_printer = min(printers, key=lambda printer: len(printer._printing_queue))
    assert least_busy_printer is not None and least_busy_printer.id is not None

    # 32 bit for timestamp, 32 bit for printer id
    print_job.id = (
        int(datetime.now().timestamp() * 1000) << 32
    ) | least_busy_printer.id
    least_busy_printer.add_printjob(print_job)
    print_job.student_id = request.state.user

    log = Log(
        description=f"[QUEUE] user={print_job.student_id} doc={print_job.document.file_name}",
        student_id=request.state.user,
        printer_id=least_busy_printer.id,
        print_job_id=print_job.id,
        date=datetime.now(),
    )
    db.add_log(log)

    return {"printer_id": least_busy_printer.id, "print_job_id": print_job.id}


@app.get("/printjob")
async def get_printjobs(request: Request):
    printers = db.get_printers()
    printjobs = [
        printjob for printer in printers for printjob in printer._printing_queue
    ]
    if auth.role(request.state.user) == "student":
        printjobs = [
            printjob
            for printjob in printjobs
            if printjob.student_id == request.state.user
        ]
    return printjobs


@app.post("/upload")
async def upload_file(request: Request):
    if auth.role(request.state.user) != "student":
        raise HTTPException(status_code=403, detail="Forbidden")
    form = await request.form()
    file = form.get("file")
    if file is None:
        raise HTTPException(status_code=400, detail="File is required")
    if isinstance(file, str):
        raise HTTPException(status_code=400, detail="Invalid file")

    file_name = file.filename
    if file_name is None:
        raise HTTPException(status_code=400, detail="Invalid file name")

    true_name, ext = file_name.split(".")
    if ext not in db.get_system_config().allowed_file_types:
        raise HTTPException(status_code=400, detail="Invalid file type")
    file_bytes = await file.read()
    await file.close()

    match ext:
        # case docx and doc
        case "docx", "doc":
            file_id = db.upload_file(file_bytes, ext)
            try:
                doc = docx.Document(io.BytesIO(file_bytes))
            except Exception as e:
                raise HTTPException(status_code=400, detail="Invalid DOCX file")
            page_cnt = sum(p.contains_page_break for p in doc.paragraphs) + 1
            document = Document(
                file_id=file_id,
                file_name=true_name,
                file_type=ext,
                pages=page_cnt,
            )
            db.add_document(document)
        case "pdf":
            file_id = db.upload_file(file_bytes, ext)
            try:
                pdf = PyPDF2.PdfReader(io.BytesIO(file_bytes))
            except Exception as e:
                raise HTTPException(status_code=400, detail="Invalid PDF file")
            page_cnt = len(pdf.pages)
            document = Document(
                file_id=file_id,
                file_name=true_name,
                file_type=ext,
                pages=page_cnt,
            )
            db.add_document(document)

        case _:
            raise HTTPException(status_code=400, detail="Invalid file type")

    return document

@app.get("/log")
async def get_logs(request: Request):
    logs = db.get_logs()
    if auth.role(request.state.user) == "student":
        logs = [log for log in logs if log.student_id == request.state.user]
    return logs

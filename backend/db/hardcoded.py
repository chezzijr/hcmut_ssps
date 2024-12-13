from .repo import Repo
from threading import Lock
from datetime import datetime

from models import (
    Log,
    Student,
    SPSO,
    Printer,
    SystemConfig,
    Status,
    Document,
    PrintJob,
    PageSize,
)
from os import makedirs

class HardCodedDB(Repo):
    def __init__(self):
        
        self.documents: list[Document] = [
            Document(
                file_id=1,
                file_name="student_report_1.pdf",
                file_type="pdf",
                pages=15
            ),
            Document(
                file_id=2,
                file_name="student_report_2.docx",
                file_type="docx",
                pages=20
            ),
            Document(
                file_id=3,
                file_name="student_report_3.pdf",
                file_type="pdf",
                pages=10
            ),
            Document(
                file_id=4,
                file_name="student_report_4.doc",
                file_type="doc",
                pages=25
            ),
            Document(
                file_id=5,
                file_name="student_report_5.pdf",
                file_type="pdf",
                pages=30
            )
        ]
        
        self.print_jobs: list[PrintJob] = [
            PrintJob(id=1, document=self.documents[0], copies=2, page_size=PageSize.A4, double_sided=True, student_id=2211234),
            PrintJob(id=2, document=self.documents[1], copies=1, page_size=PageSize.A4, double_sided=False, student_id=2211235),
            PrintJob(id=3, document=self.documents[2], copies=1, page_size=PageSize.A4, double_sided=False, student_id=2211236),
            PrintJob(id=4, document=self.documents[3], copies=2, page_size=PageSize.A4, double_sided=True, student_id=2211234),
            PrintJob(id=5, document=self.documents[4], copies=1, page_size=PageSize.A4, double_sided=False, student_id=2211235),
        ]

        # Gán PrintJobs vào queue của các Printer
        self.printers: list[Printer] = [
            Printer(id=1, brand="HP", model="LaserJet Pro MFP M130fw", description="", status=Status.ENABLED, _printing_queue=[self.print_jobs[0]]),
            Printer(id=2, brand="Canon", model="PIXMA TR4520", description="", status=Status.ENABLED, _printing_queue=[self.print_jobs[1]]),
            Printer(id=3, brand="Brother", model="HL-L2320D", description="", status=Status.ENABLED, _printing_queue=[self.print_jobs[2]]),
            Printer(id=4, brand="Epson", model="EcoTank ET-2720", description="", status=Status.ENABLED, _printing_queue=[self.print_jobs[3]]),
        ]

        # Sửa đổi phần logs để tham chiếu trực tiếp đối tượng PrintJob
        self.logs: list[Log] = [
            Log(
                id=1,
                description="Printed 10 pages for John Doe.",
                student_id=2211234,
                printer_id=1,
                print_job=self.print_jobs[0],  # Liên kết trực tiếp tới đối tượng PrintJob
                date=datetime(2024, 12, 12, 9, 30)
            ),
            Log(
                id=2,
                description="Printed 5 pages for Jane Doe.",
                student_id=2211235,
                printer_id=2,
                print_job=self.print_jobs[1],  # Liên kết trực tiếp tới đối tượng PrintJob
                date=datetime(2024, 12, 12, 10, 15)
            ),
            Log(
                id=3,
                description="Printed 8 pages for Alice.",
                student_id=2211236,
                printer_id=3,
                print_job=self.print_jobs[2],  # Liên kết trực tiếp tới đối tượng PrintJob
                date=datetime(2024, 12, 12, 11, 0)
            ),
            Log(
                id=4,
                description="Printed 12 pages for John Doe.",
                student_id=2211234,
                printer_id=4,
                print_job=self.print_jobs[3],  # Liên kết trực tiếp tới đối tượng PrintJob
                date=datetime(2024, 12, 12, 13, 30)
            ),
            Log(
                id=5,
                description="Printed 6 pages for Jane Doe.",
                student_id=2211235,
                printer_id=1,
                print_job=self.print_jobs[4],  # Liên kết trực tiếp tới đối tượng PrintJob
                date=datetime(2024, 12, 12, 14, 0)
            )
        ]
        self.students: list[Student] = [
            Student(
                id=2211234,
                name="John Doe",
                remaining_pages=20,
            ),
            Student(
                id=2211235,
                name="Jane Doe",
                remaining_pages=15,
            ),
            Student(
                id=2211236,
                name="Alice",
                remaining_pages=10,
            ),
        ]

        self.spsos: list[SPSO] = [
            SPSO(
                id=1,
                name="SPSO 1",
            ),
            SPSO(
                id=2,
                name="SPSO 2",
            ),
        ]

        self.printers: list[Printer] = [
            Printer(
                id=1,
                brand="HP",
                model="LaserJet Pro MFP M130fw",
                description="",
                status=Status.DISABLED,
                is_running= False,
            ),
            Printer(
                id=2,
                brand="Canon",
                model="PIXMA TR4520",
                description="",
                status=Status.ENABLED,
                is_running= True,
            ),
            Printer(
                id=3,
                brand="Brother",
                model="HL-L2320D",
                description="",
                status=Status.ENABLED,
                is_running= False,
            ),
            Printer(
                id=4,
                brand="Epson",
                model="EcoTank ET-2720",
                description="",
                status=Status.DISABLED,
                is_running= False,
            ),
        ]
        self.system_config: SystemConfig = SystemConfig(
            default_num_pages_per_sem=20,
            prices_per_page=1000, # 1000 VND, also accounts for the prining cost
            allowed_file_types=["pdf", "docx", "doc"],
        )

        

    def get_printers(self):
        return self.printers

    def get_printer_by_id(self, printer_id: int) -> Printer | None:
        return next(
            filter(lambda printer: printer.id == printer_id, self.printers),
            None
        )

    def add_printer(self, printer: Printer):
        next_id = 1 if len(self.printers) == 0 else self.printers[-1].id + 1
        printer.id = next_id
        self.printers.append(printer)
        return printer

    def delete_printer(self, printer_id: int):
        deleted_printer = next(
            filter(lambda printer: printer.id == printer_id, self.printers),
            None
        )
        if deleted_printer is None:
            raise ValueError(f"Printer with id {printer_id} not found")
        deleted_printer.status = Status.DISABLED
        self.printers = list(
            filter(lambda printer: printer.id != printer_id, self.printers)
        )

    def update_printer(self, printer: Printer) -> Printer:
        updated_printer = next(
            filter(lambda p: p.id == printer.id, self.printers),
            None
        )
        if updated_printer is None:
            raise ValueError(f"Printer with id {printer.id} not found")
        updated_printer.brand = printer.brand
        updated_printer.model = printer.model
        updated_printer.description = printer.description
        updated_printer.status = printer.status
        return printer

    def get_logs(self):
        return self.logs

    # the only function used in parallelism
    def add_log(self, log: Log):
        self.lock.acquire()
        next_id = 1 if len(self.logs) == 0 else self.logs[-1].id + 1
        log.id = next_id
        self.logs.append(log)
        self.lock.release()

    def add_document(self, document: Document):
        self.documents.append(document)

    def upload_file(self, file_bytes: bytes, ext: str) -> int:
        """
        returns the id of the uploaded document
        """
        FILE_PATH = "files"
        # ensure the file path exists
        makedirs(FILE_PATH, exist_ok=True)
        
        file_id = 1 if len(self.documents) == 0 else self.documents[-1].file_id + 1

        with open(f"{FILE_PATH}/{file_id}.{ext}", "wb") as f:
            f.write(file_bytes)
        return file_id

    def get_student_by_id(self, student_id: int) -> Student | None:
        return next(
            filter(lambda student: student.id == student_id, self.students),
            None
        )

    def get_system_config(self):
        return self.system_config

    def update_system_config(self, system_config: SystemConfig):
        self.system_config = system_config

    def add_pages_to_students(self):
        self.lock.acquire()
        num_pages = self.system_config.default_num_pages_per_sem
        for student in self.students:
            student.remaining_pages += num_pages
        self.lock.release()

    def update_student(self, student: Student) -> Student:
        updated_student = next(
            filter(lambda s: s.id == student.id, self.students),
            None
        )
        if updated_student is None:
            raise ValueError(f"Student with id {student.id} not found")
        updated_student.name = student.name
        updated_student.remaining_pages = student.remaining_pages
        return student

def init_db() -> Repo:
    return HardCodedDB()

from .repo import Repo
from threading import Lock
from models import (
    Log,
    Student,
    SPSO,
    Printer,
    SystemConfig,
    Status,
    Document,
)


class HardCodedDB(Repo):
    def __init__(self):
        self.logs: list[Log] = []
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
                status=Status.ENABLED,
            ),
            Printer(
                id=2,
                brand="Canon",
                model="PIXMA TR4520",
                description="",
                status=Status.ENABLED,
            ),
            Printer(
                id=3,
                brand="Brother",
                model="HL-L2320D",
                description="",
                status=Status.ENABLED,
            ),
            Printer(
                id=4,
                brand="Epson",
                model="EcoTank ET-2720",
                description="",
                status=Status.ENABLED,
            ),
        ]
        self.system_config: SystemConfig = SystemConfig(
            default_num_pages_per_sem=20,
            prices_per_page=1000, # 1000 VND, also accounts for the prining cost
            allowed_file_types=["pdf", "docx", "doc"],
        )

        self.documents: list[Document] = []
        self.lock = Lock()

    def get_printers(self):
        return self.printers

    def get_printer_by_id(self, printer_id: int) -> Printer | None:
        return next(
            filter(lambda printer: printer.id == printer_id, self.printers)
        )

    def add_printer(self, printer: Printer):
        next_id = 1 if len(self.printers) == 0 else self.printers[-1].id + 1
        printer.id = next_id
        self.printers.append(printer)
        return printer

    def delete_printer(self, printer_id: int):
        deleted_printer = next(
            filter(lambda printer: printer.id == printer_id, self.printers)
        )
        deleted_printer.status = Status.DISABLED
        self.printers = list(
            filter(lambda printer: printer.id != printer_id, self.printers)
        )

    def update_printer(self, printer: Printer):
        updated_printer = next(
            filter(lambda p: p.id == printer.id, self.printers)
        )
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
        file_id = 1 if len(self.documents) == 0 else self.documents[-1].file_id + 1

        with open(f"{FILE_PATH}/{file_id}.{ext}", "wb") as f:
            f.write(file_bytes)
        return file_id

    def get_student_by_id(self, student_id: int) -> Student | None:
        return next(
            filter(lambda student: student.id == student_id, self.students)
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
            filter(lambda s: s.id == student.id, self.students)
        )
        if updated_student is None:
            raise ValueError(f"Student with id {student.id} not found")
        updated_student.name = student.name
        updated_student.remaining_pages = student.remaining_pages
        return student

def init_db() -> Repo:
    return HardCodedDB()

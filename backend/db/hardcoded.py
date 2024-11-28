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
            allowed_file_types=["pdf", "docx", "doc"],
        )

        self.documents: list[Document] = []
        self.lock = Lock()

    def get_printers(self):
        return self.printers

    def add_printer(self, printer: Printer):
        next_id = 1 if len(self.printers) == 0 else self.printers[-1].id + 1
        printer.id = next_id
        self.printers.append(printer)

    def delete_printer(self, printer_id: int):
        self.printers = list(
            filter(lambda printer: printer.id != printer_id, self.printers)
        )

    def update_printer(self, printer: Printer):
        self.printers = list(
            map(lambda p: printer if p.id == printer.id else p, self.printers)
        )

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

    def get_system_config(self):
        return self.system_config


def init_db() -> Repo:
    return HardCodedDB()

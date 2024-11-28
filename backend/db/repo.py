from abc import ABC, abstractmethod
from models import Printer, Log, PrintJob, Document, SystemConfig

class PrinterRepo(ABC):
    @abstractmethod
    def add_printer(self, printer: Printer) -> Printer:
        raise NotImplementedError()

    @abstractmethod
    def delete_printer(self, printer_id):
        raise NotImplementedError()

    @abstractmethod
    def update_printer(self, printer: Printer) -> Printer:
        raise NotImplementedError()

    @abstractmethod
    def get_printers(self) -> list[Printer]:
        raise NotImplementedError()

    @abstractmethod
    def get_printer_by_id(self, printer_id: int) -> Printer | None:
        raise NotImplementedError()

class LogRepo(ABC):
    @abstractmethod
    def get_logs(self) -> list[Log]:
        raise NotImplementedError()

    @abstractmethod
    def add_log(self, log: Log):
        raise NotImplementedError()

class FileRepo(ABC):
    @abstractmethod
    def add_document(self, document: Document):
        raise NotImplementedError()

    @abstractmethod
    def upload_file(self, file_bytes: bytes, ext: str) -> int:
        raise NotImplementedError()

class Repo(PrinterRepo, LogRepo, FileRepo):
    @abstractmethod
    def get_system_config(self) -> SystemConfig:
        raise NotImplementedError()

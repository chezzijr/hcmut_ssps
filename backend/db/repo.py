from abc import ABC, abstractmethod
from models import Printer, Log, PrintJob

class PrinterRepo(ABC):
    @abstractmethod
    def add_printer(self, printer):
        raise NotImplementedError()

    @abstractmethod
    def delete_printer(self, printer_id):
        raise NotImplementedError()

    @abstractmethod
    def update_printer(self, printer):
        raise NotImplementedError()

    @abstractmethod
    def get_printers(self) -> list[Printer]:
        raise NotImplementedError()

class LogRepo(ABC):
    @abstractmethod
    def get_logs(self) -> list[Log]:
        raise NotImplementedError()

    @abstractmethod
    def add_log(self, log: Log):
        raise NotImplementedError()

class Repo(PrinterRepo, LogRepo):
    pass

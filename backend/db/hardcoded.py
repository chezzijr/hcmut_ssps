from .repo import Repo
from models import Log, Student, SPSO, Printer, PrintJob, Document, SystemConfig


class HardCodedDB(Repo):
    def __init__(self):
        self.logs = []
        self.students = []
        self.spsos = []
        self.printers = []
        self.print_jobs = []
        self.documents = []
        self.system_configs = []

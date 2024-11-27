from __future__ import annotations
from collections.abc import Callable
from enum import IntEnum
from typing import Optional
from pydantic import BaseModel
from models.printjob import PrintJob
from time import sleep

class Status(IntEnum):
    DISABLED = 0
    ENABLED = 1

class Printer(BaseModel):
    id: Optional[int] = None
    brand: str
    model: str
    description: str
    status: Status
    # list is thread safe because of GIL
    # so this will work for python <3.13 (hopefully)
    _printing_queue: list[PrintJob] = []

    def add_printjob(self, print_job: PrintJob):
        self._printing_queue.append(print_job)

    def run(self, callback: Callable[[Printer, PrintJob], None]):
        while self._printing_queue:
            printjob = self._printing_queue.pop(0)
            sleep(printjob.document.pages * 1)
            callback(self, printjob)

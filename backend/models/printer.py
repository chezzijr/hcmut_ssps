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
    is_running: bool = False
    # list is thread safe because of GIL
    # so this will work for python <3.13 (hopefully)
    _printing_queue: list[PrintJob] = []

    def add_printjob(self, print_job: PrintJob):
        self._printing_queue.append(print_job)

    def run(self, callback: Callable[[Printer, PrintJob], None]):
        while self.status == Status.ENABLED:
            if len(self._printing_queue) == 0:
                sleep(1)
                continue
            self.is_running = True
            printjob = self._printing_queue.pop(0)
            print(f"Sleeping for {printjob.count_num_pages() * 0.1} seconds")
            sleep(printjob.count_num_pages() * 0.1)
            self.is_running = False
            callback(self, printjob)

from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from .printjob import PrintJob

class Log(BaseModel):
    id: Optional[int] = None
    description: str
    student_id: int
    printer_id: int
    print_job: PrintJob
    date: datetime
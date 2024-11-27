from datetime import datetime
from typing import Optional
from pydantic import BaseModel

class Log(BaseModel):
    id: Optional[int] = None
    description: str
    student_id: int
    printer_id: int
    print_job_id: int
    date: datetime

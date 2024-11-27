from enum import IntEnum
from typing import Optional
from pydantic import BaseModel
from .document import Document

class PageSize(IntEnum):
    A1 = 1
    A2 = 2
    A3 = 3
    A4 = 4
    A5 = 5

class PrintJob(BaseModel):
    id: Optional[int] = None
    document: Document
    copies: int
    page_size: PageSize
    double_sided: bool
    student_id: int

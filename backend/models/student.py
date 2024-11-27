from pydantic import BaseModel

class Student(BaseModel):
    id: int
    name: str
    remaining_pages: int

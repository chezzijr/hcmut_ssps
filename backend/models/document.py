from pydantic import BaseModel

class Document(BaseModel):
    file_id: int # reference to file saved in the database
    file_name: str
    file_type: str
    pages: int

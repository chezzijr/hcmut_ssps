from pydantic import BaseModel

class SPSO(BaseModel):
    id: int
    name: str

from pydantic import BaseModel

class SystemConfig(BaseModel):
    default_num_pages_per_sem: int
    prices_per_page: int
    allowed_file_types: list[str]

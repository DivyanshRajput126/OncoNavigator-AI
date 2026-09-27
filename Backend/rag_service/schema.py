from pydantic import BaseModel

class TumorRequest(BaseModel):
    tumor_name:str

class TumorResponse(BaseModel):
    tumor_name:str
    answer:str
    references:list
    status:str
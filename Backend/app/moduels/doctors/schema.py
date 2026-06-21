from pydantic import BaseModel

class SpecialistRequest(BaseModel):
    tumor_name:str
    city:str

class SpecialistResponse(BaseModel):
    tumor_name:str
    city:str
    specialist:str
    answer:str
    status:str
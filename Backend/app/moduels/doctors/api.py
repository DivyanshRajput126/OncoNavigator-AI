from fastapi import APIRouter
from .schema import (SpecialistRequest)
from .specialist_agent import (specialist_agent)

router = APIRouter()

@router.post("")
async def find_specialist(request:SpecialistRequest):

    result = specialist_agent(
        request.tumor_name,
        request.city
    )

    return {
        "tumor_name":request.tumor_name,
        "city":request.city,
        "specialist":result["specialist"],
        "answer":result["answer"],
        "status":"success"
    }
from fastapi import APIRouter
from .schema import ChatRequest
from .chatbot_agent import (medical_chatbot)

router = APIRouter()

@router.post("")
async def chatbot(request:ChatRequest):
    
    result = medical_chatbot(request.session_id,request.query)

    return {
        "session_id":
        request.session_id,
        "route":
        result["route"],
        "response":
        result["response"],
        "history":
        result["history"]
    }
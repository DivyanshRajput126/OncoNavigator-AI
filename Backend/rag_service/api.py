from fastapi import APIRouter
from .schema import (TumorRequest,TumorResponse)
from .rag_agent import (BrainTumorRAGAgent)

router = APIRouter()

rag_agent = BrainTumorRAGAgent()

@router.post("",response_model=TumorResponse)
async def brain_tumor_information(request:TumorRequest):
    result = (
        rag_agent.get_information(
            request.tumor_name
        )
    )

    return {
        "tumor_name":request.tumor_name,
        "answer":result["answer"],
        "references":result["references"],
        "status":"success"
    }
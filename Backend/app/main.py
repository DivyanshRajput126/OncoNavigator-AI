from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from app.moduels.prediction.api import router as prediction_router
from app.moduels.segmentation.api import router as segmentation_router
from app.moduels.rag.api import router as rag_router
from app.moduels.chatbot.api import router as chatbot_router
from app.moduels.doctors.api import router as doctor_router

app = FastAPI(
    title="OncoNavigator AI",
    version="1.0.0",
    description="Brain Tumor Detection and Analysis Platform"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():


    app.include_router(
        prediction_router,
        prefix="/api/v1/prediction",
        tags=["Prediction"]
    )
    
    app.include_router(
        segmentation_router,
        prefix="/api/v1/segmentation",
        tags=["Segmentation"]
    )
    
    app.include_router(
        rag_router,
        prefix="/api/v1/rag",
        tags=["RAG"]
    )
    
    app.include_router(
        chatbot_router,
        prefix="/api/v1/chatbot",
        tags=["Chatbot"]
    )
    
    app.include_router(
        doctor_router,
        prefix="/api/v1/specialist",
        tags=["Specialist"]
    )

@app.get("/")
async def root():
    return {
        "message": "OncoNavigator AI Backend Running"
    }

@app.get("/health")
async def health_check():
    return {
        "status": "healthy"
    }

if __name__ == "main":
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )

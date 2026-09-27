from fastapi import FastAPI, UploadFile, File, Request, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import uvicorn
import httpx
from dotenv import load_dotenv
import os

load_dotenv()

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

SERVICES = {
    "prediction": os.getenv("PREDICTION_SERVICE_URL"),
    "segmentation": os.getenv("SEGMENTATION_SERVICE_URL"),
    "rag": os.getenv("RAG_SERVICE_URL"),
    "doctor": os.getenv("DOCTOR_SERVICE_URL"),
    "chatbot": os.getenv("CHATBOT_SERVICE_URL")
}


@app.post("/api/v1/prediction")
async def predict_tumour(image: UploadFile = File(...)):
    try:
        content = await image.read()
        files = {'image': (image.filename, content, image.content_type)}
        async with httpx.AsyncClient() as client:
            response = await client.post(SERVICES["prediction"], files=files, timeout=60.0)
            response.raise_for_status()
            return response.json()
    except httpx.HTTPStatusError as exc:
        raise HTTPException(status_code=exc.response.status_code, detail=exc.response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/v1/segmentation")
async def segment_tumour(prediction_id: str):
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(f"{SERVICES['segmentation']}?prediction_id={prediction_id}", timeout=60.0)
            response.raise_for_status()
            return response.json()
    except httpx.HTTPStatusError as exc:
        raise HTTPException(status_code=exc.response.status_code, detail=exc.response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/v1/rag")
async def rag_info(request: Request):
    try:
        data = await request.json()
        async def stream_generator():
            async with httpx.AsyncClient() as client:
                async with client.stream("POST", SERVICES["rag"], json=data, timeout=60.0) as response:
                    response.raise_for_status()
                    async for chunk in response.aiter_bytes():
                        yield chunk
        return StreamingResponse(stream_generator(), media_type="text/event-stream")
    except httpx.HTTPStatusError as exc:
        raise HTTPException(status_code=exc.response.status_code, detail=exc.response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
# async def rag_info(request: Request):
#     try:
#         data = await request.json()

#         async with httpx.AsyncClient() as client:
#             response = await client.post(
#                 SERVICES["rag"],
#                 json=data,
#                 timeout=60.0
#             )

#         response.raise_for_status()

#         return response.json()

#     except httpx.HTTPStatusError as exc:
#         raise HTTPException(
#             status_code=exc.response.status_code,
#             detail=exc.response.text
#         )

#     except Exception as e:
#         raise HTTPException(
#             status_code=500,
#             detail=str(e)
#         )

@app.post("/api/v1/chatbot")
async def chatbot(request: Request):
    try:
        data = await request.json()
        async def stream_generator():
            async with httpx.AsyncClient() as client:
                async with client.stream("POST", SERVICES["chatbot"], json=data, timeout=60.0) as response:
                    response.raise_for_status()
                    async for chunk in response.aiter_bytes():
                        yield chunk
        return StreamingResponse(stream_generator(), media_type="text/event-stream")
    except httpx.HTTPStatusError as exc:
        raise HTTPException(status_code=exc.response.status_code, detail=exc.response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
# async def chatbot(request: Request):
#     try:
#         data = await request.json()
#         async def stream_generator():
#             async with httpx.AsyncClient() as client:
#                 async with client.stream("POST", SERVICES["chatbot"], json=data, timeout=60.0) as response:
#                     response.raise_for_status()
#                     async for chunk in response.aiter_bytes():
#                         yield chunk
#         return StreamingResponse(stream_generator(), media_type="text/event-stream")
#     except httpx.HTTPStatusError as exc:
#         raise HTTPException(status_code=exc.response.status_code, detail=exc.response.text)
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/v1/specialist")
async def specialist(request: Request):
    try:
        data = await request.json()
        async def stream_generator():
            async with httpx.AsyncClient() as client:
                async with client.stream("POST", SERVICES["doctor"], json=data, timeout=60.0) as response:
                    response.raise_for_status()
                    async for chunk in response.aiter_bytes():
                        yield chunk
        return StreamingResponse(stream_generator(), media_type="text/event-stream")
    except httpx.HTTPStatusError as exc:
        raise HTTPException(status_code=exc.response.status_code, detail=exc.response.text)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# async def specialist(request: Request):
#     try:
#         data = await request.json()

#         async with httpx.AsyncClient() as client:
#             response = await client.post(
#                 SERVICES["doctor"],
#                 json=data,
#                 timeout=60.0
#             )

#         response.raise_for_status()

#         return response.json()

#     except httpx.HTTPStatusError as exc:
#         raise HTTPException(
#             status_code=exc.response.status_code,
#             detail=exc.response.text
#         )

#     except Exception as e:
#         raise HTTPException(
#             status_code=500,
#             detail=str(e)
#         )

# @app.on_event("startup")
# async def startup_event():


#     app.include_router(
#         prediction_router,
#         prefix="/api/v1/prediction",
#         tags=["Prediction"]
#     )
    
#     app.include_router(
#         segmentation_router,
#         prefix="/api/v1/segmentation",
#         tags=["Segmentation"]
#     )
    
#     app.include_router(
#         rag_router,
#         prefix="/api/v1/rag",
#         tags=["RAG"]
#     )
    
#     app.include_router(
#         chatbot_router,
#         prefix="/api/v1/chatbot",
#         tags=["Chatbot"]
#     )
    
#     app.include_router(
#         doctor_router,
#         prefix="/api/v1/specialist",
#         tags=["Specialist"]
#     )

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

from pydantic import BaseModel

class PredictionResponse(BaseModel):
    class_id: int
    confidence: float
    prediction: str

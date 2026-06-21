from fastapi import (APIRouter,UploadFile,File,HTTPException)
import uuid
from pathlib import Path
from .predictior import TumourPredictor
from .preprocess import preprocess_single_image

router = APIRouter()

predictor = TumourPredictor()

UPLOAD_DIR = Path("uploads")

UPLOAD_DIR.mkdir(
    exist_ok=True
)

@router.post("")
async def predict_tumour(image: UploadFile = File(...)):
    try:
        # create unique filename
        image_id = str(uuid.uuid4())

        image_path = (UPLOAD_DIR/f"{image_id}.png")
        # save uploaded image
        content = await image.read()
        with open(image_path,"wb") as f:
            f.write(content)

        # preprocessing
        image_tensor = preprocess_single_image(str(image_path))

        # prediction
        result = predictor.predict(image_tensor)

        classes = {
            0: "Glioma",
            1: "Meningioma",
            2: "No Tumor",
            3: "Pitutary"
        }
        
        return {
            "prediction_id": image_id,
            "class_id": result["class_id"],
            "prediction": classes[result["class_id"]],
            "confidence": result["confidence"]
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
from fastapi import (APIRouter,HTTPException)
from pathlib import Path
from .preprocess import preprocess_image
from .predictor import SegmentationPredictor
from .utils import mask_to_base64

router = APIRouter()

predictor = SegmentationPredictor()

UPLOAD_DIR = Path("uploads")

@router.post("")
async def generate_mask(prediction_id: str):
    try:
        # image path created by prediction API
        image_path = (UPLOAD_DIR/f"{prediction_id}.png")

        # check image exists
        if not image_path.exists():
            raise HTTPException(
                status_code=404,
                detail="Image not found for this prediction id"
            )
            
        # preprocessing
        image_tensor = preprocess_image(
            str(image_path)
        )

        # model prediction
        mask = predictor.predict(
            image_tensor
        )

        # convert mask to base64
        mask_base64 = mask_to_base64(
            mask
        )

        return {
            "prediction_id": prediction_id,
            "mask_base64": mask_base64,
            "status": "success"
        }

    except HTTPException:
        raise

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
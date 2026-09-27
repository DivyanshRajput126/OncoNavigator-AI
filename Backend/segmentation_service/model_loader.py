from pathlib import Path
import torch
from .segmentation_model import SegmentationModel

MODEL_PATH = (Path(__file__).parent/"model"/"checkpoint.pth")

class SegmentationModelLoader:
    _model = None

    @classmethod
    def get_model(cls):
        if cls._model is None:
            device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

            model = SegmentationModel()

            checkpoint = torch.load(
                MODEL_PATH,
                map_location=device
            )

            model.load_state_dict(
                checkpoint["model_state_dict"]
            )

            model.to(device)

            model.eval()

            cls._model = model

        return cls._model
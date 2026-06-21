from pathlib import Path
import torch
from .cnn_model import BrainTumourCNN

MODEL_PATH = (Path(__file__).parent/"model"/"best_model.pth")

class PredictionModelLoader:
    _model = None
    @classmethod
    def get_model(cls):
        if cls._model is None:
            device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
            model = BrainTumourCNN(
                num_classes=4
            )

            checkpoint = torch.load(
                MODEL_PATH,
                map_location=device
            )

            model.load_state_dict(
                checkpoint["model_state_dict"]
            )

            model = model.to(device)

            model.eval()

            cls._model = model

        return cls._model
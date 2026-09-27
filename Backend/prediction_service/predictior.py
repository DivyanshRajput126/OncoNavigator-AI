import torch
from .model_loader import PredictionModelLoader

class TumourPredictor:
    def __init__(self):
        self.model = (
            PredictionModelLoader.get_model()
        )
        self.device = next(
            self.model.parameters()
        ).device

    def predict(self,image_tensor):

        image_tensor = (
            image_tensor.to(self.device)
        )

        with torch.no_grad():
            outputs = self.model(
                image_tensor
            )

            probabilities = (
                torch.softmax(
                    outputs,
                    dim=1
                )
            )

            confidence, predicted = (
                torch.max(
                    probabilities,
                    dim=1
                )
            )

        return {
            "class_id": int(predicted.item()),
            "confidence": float(confidence.item())
        }

import torch
from .model_loader import SegmentationModelLoader

class SegmentationPredictor:
    def __init__(self):
        self.model = (
            SegmentationModelLoader.get_model()
        )

        self.device = next(
            self.model.parameters()
        ).device

    def predict(self,image_tensor):
        image_tensor = (
            image_tensor.to(self.device)
        )

        with torch.no_grad():
            prediction = self.model(
                image_tensor
            )

        # remove batch and channel
        mask = prediction.squeeze()

        mask = (mask.cpu().numpy())

        # threshold
        mask = (mask > 0.5).astype("uint8")

        return mask
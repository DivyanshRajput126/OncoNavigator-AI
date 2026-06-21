from PIL import Image
import torch
from torchvision import transforms

transform = transforms.Compose(
    [
        transforms.Resize((256,256)),
        transforms.ToTensor()
    ]
)

def preprocess_image(image_path):

    image = Image.open(
        image_path
    )

    # convert to grayscale because model input is 1 channel
    image = image.convert("L")

    image_tensor = transform(image)

    # (1,H,W) -> (1,1,H,W)
    image_tensor = image_tensor.unsqueeze(0)

    return image_tensor
import cv2
import torch
import numpy as np


def preprocess_single_image(img_path,image_size=224):
    # Read grayscale image
    image = cv2.imread(
        img_path,
        cv2.IMREAD_GRAYSCALE
    )

    if image is None:
        raise ValueError("Unable to read image")


    # Resize
    image = cv2.resize(
        image,
        (image_size, image_size)
    )

    # Normalize
    image = (
        image.astype(np.float32)
        / 255.0
    )

    # Convert to tensor
    image = torch.tensor(
        image,
        dtype=torch.float32
    )

    # (H,W) -> (1,H,W)
    image = image.unsqueeze(0)

    # (1,H,W) -> (1,1,H,W)
    image = image.unsqueeze(0)

    return image
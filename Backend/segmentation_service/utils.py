import cv2
import base64

def mask_to_base64(mask):
    _, buffer = cv2.imencode(
        ".png",
        mask * 255
    )

    encoded = base64.b64encode(
        buffer
    )

    return encoded.decode(
        "utf-8"
    )
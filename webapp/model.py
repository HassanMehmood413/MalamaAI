from PIL import Image
import torch
from transformers import AutoModelForImageClassification, AutoImageProcessor

# Provide an image and get back a prediction
def get_prediction(image_path):
    # Using pre-trained model
    repo_name = "Jayanth2002/dinov2-base-finetuned-SkinDisease"
    image_processor = AutoImageProcessor.from_pretrained(repo_name)
    model = AutoModelForImageClassification.from_pretrained(repo_name)

    # Load and preprocess the test image
    image = Image.open(image_path)
    encoding = image_processor(image.convert("RGB"), return_tensors="pt")

    # Make a prediction
    with torch.no_grad():
        outputs = model(**encoding)
        logits = outputs.logits

    predicted_class_idx = logits.argmax(-1).item()

    # Get the class name
    class_names = ['Basal Cell Carcinoma', 'Darier_s Disease', 'Epidermolysis Bullosa Pruriginosa', 'Hailey-Hailey Disease', 'Herpes Simplex', 'Impetigo', 'Larva Migrans', 'Leprosy Borderline', 'Leprosy Lepromatous', 'Leprosy Tuberculoid', 'Lichen Planus', 'Lupus Erythematosus Chronicus Discoides', 'Melanoma', 'Molluscum Contagiosum', 'Mycosis Fungoides', 'Neurofibromatosis', 'Papilomatosis Confluentes And Reticulate', 'Pediculosis Capitis', 'Pityriasis Rosea', 'Porokeratosis Actinic', 'Psoriasis', 'Tinea Corporis', 'Tinea Nigra', 'Tungiasis', 'actinic keratosis', 'dermatofibroma', 'nevus', 'pigmented benign keratosis', 'seborrheic keratosis', 'squamous cell carcinoma', 'vascular lesion']
    predicted_class_name = class_names[predicted_class_idx]

    return predicted_class_name

from fastapi import FastAPI, UploadFile, File, Depends, HTTPException
import torch
from torchvision import transforms
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from Models.model1 import ImageClassifierCNN
from PIL import Image
import joblib
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os

#Database Imports
from sqlalchemy.orm import Session
from database import engine, Base, get_db
from models import Disease

# Create Database Tables
Base.metadata.create_all(bind=engine)

#Initialize FastAPI app
app = FastAPI(title = "Image + Text Classification Model" )

#Middleware for CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

#Image Classification Setup
#load Model
device = torch.device("cuda" if torch.cuda.is_available() else"cpu")
print(f"using device: {device}")

#load trained model
model = ImageClassifierCNN(15) #num_classes=15
current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, "Models", "cnn_model.pth")

model.load_state_dict(torch.load(model_path, map_location=device)) #r=raw string
model.to(device)
model.eval()   # put into inference mode

#define transformers
mean = [0.45923691987991333, 0.4754456877708435, 0.4114924371242523]
std = [0.18601608276367188, 0.16261300444602966, 0.20084309577941895]

image_transform = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=mean, std=std)
])

#class mapping
idx_to_class = {0: 'Pepper__bell___Bacterial_spot',
                1: 'Pepper__bell___healthy',
                2: 'Potato___Early_blight',
                3: 'Potato___Late_blight',
                4: 'Potato___healthy',
                5: 'Tomato_Bacterial_spot',
                6: 'Tomato_Early_blight',
                7: 'Tomato_Late_blight',
                8: 'Tomato_Leaf_Mold',
                9: 'Tomato_Septoria_leaf_spot',
                10:'Tomato_Spider_mites_Two_spotted_spider_mite',
                11: 'Tomato__Target_Spot',
                12: 'Tomato__Tomato_YellowLeaf__Curl_Virus',
                13: 'Tomato__Tomato_mosaic_virus',
                14: 'Tomato_healthy'}

#API Route
@app.post("/image-prediction")
def image_predict(file: UploadFile = File(...), db: Session = Depends(get_db)):

  image = Image.open(file.file).convert("RGB")
  img_tensor = image_transform(image).unsqueeze(0).to(device)

  with torch.inference_mode():
    output_tensor = model(img_tensor)
    probabilities = torch.softmax(output_tensor, dim=1) #prediction probabilities using softmax
    pred_idx = torch.argmax(output_tensor, dim=1).item() #Get the prediction class index

    #1. Class Name
    pred_label = idx_to_class[pred_idx] #Get the prediction class label
    confidence = probabilities[0][pred_idx].item() # Confidence (0.0 to 1.0)
    
    print(f"DEBUG CHECK -> Predicted: {pred_label}")

    #2. Database Query
    db_info = db.query(Disease).filter(Disease.class_name == pred_label).first()
    
    if db_info:
        print(f"DEBUG CHECK -> Database Found: YES, Name: {db_info.disease_name}")
    else:
        print(f"DEBUG CHECK -> Database Found: NO (Check spelling in seed_data.py)")

    response = {
        "predicted_class": pred_label,
        "confidence": f"{confidence:.2%}"
    }
    
    #If found on database, add to response
    if db_info:
            response.update({
                "disease_name": db_info.disease_name,
                "severity": db_info.severity,
                "description": db_info.description,
                "treatment": db_info.treatment  # Ye JSON format me aayega
            })
    else:
        response["info"] = "Database details not found for this class."

    return response


# Text Classification
#load text model
encoder_path = os.path.join(current_dir, "Models", "encoder.pkl") #r=raw string
encoder = joblib.load(encoder_path) #label mapping

text_model_path = os.path.join(current_dir, "Models", "best_model_text") #r=raw string
tokenizer = AutoTokenizer.from_pretrained(text_model_path)
text_model = AutoModelForSequenceClassification.from_pretrained(text_model_path)
text_model.eval()

class TextInput(BaseModel):
  text:str
  
#API Route
@app.post("/text-prediction")
def predict_text(data: TextInput, db: Session = Depends(get_db)):
  inputs = tokenizer(data.text, return_tensors="pt", truncation=True, padding=True) #tokenize the texts
  with torch.inference_mode():
    outputs = text_model(**inputs)
  logits = outputs.logits #get predicted class index

  #1.Confidence score
  probabilities = torch.softmax(logits, dim=1)
  pred_idx = torch.argmax(logits, dim=-1).tolist()
  confidence = probabilities[0][pred_idx[0]].item()

  #2. Prediction Label
  pred_label_list = encoder.inverse_transform(pred_idx) #get predicted class label
  pred_label = str(pred_label_list[0])

  #3. Mapping
  text_to_db_mapping = {
        "Tomato Septoria leaf spot": "Tomato_Septoria_leaf_spot",
        "Tomato Early blight": "Tomato_Early_blight",
        "Tomato Late blight": "Tomato_Late_blight",
        "Tomato Bacterial spot": "Tomato_Bacterial_spot",
        "Tomato healthy": "Tomato_healthy",
        "Tomato Leaf Mold": "Tomato_Leaf_Mold",
        "Tomato Target Spot": "Tomato__Target_Spot",
        "Tomato Spider mites Two-spotted spider mite": "Tomato_Spider_mites_Two_spotted_spider_mite",
        "Tomato Spider mites Two spotted spider mite": "Tomato_Spider_mites_Two_spotted_spider_mite",
        "Tomato Yellow Leaf Curl Virus": "Tomato__Tomato_YellowLeaf__Curl_Virus",
        "Tomato mosaic virus": "Tomato__Tomato_mosaic_virus",
        "Potato Early blight": "Potato___Early_blight",
        "Potato Late blight": "Potato___Late_blight",
        "Potato healthy": "Potato___healthy",
        "Pepper bell Bacterial spot": "Pepper__bell___Bacterial_spot",
        "Pepper bell healthy": "Pepper__bell___healthy"
    }

  db_search_label = text_to_db_mapping.get(pred_label, pred_label)

  #4. Database query
  db_info = db.query(Disease).filter(Disease.class_name == db_search_label).first()

  response = {
      "text": data.text,
      "Predicted_label": pred_label,
      "confidence": f"{confidence:.2%}"
  }

  # If data is found in database
  if db_info:
      response.update({
          "disease_name": db_info.disease_name,
          "severity": db_info.severity,
          "description": db_info.description,
          "treatment": db_info.treatment
        })
  else:
      response["info"] = "Database details not found for: {db_search_label}"

  return response 



# 🌱 Plant Doc - Plant Disease Detection System

A smart, AI-powered web application that helps gardeners and farmers diagnose plant diseases through image and text-based analysis.

![Plant Doc Screenshot](https://github.com/alokrj01/ai-plant-doc/blob/main/frontend/Screenshot%202025-10-09%20213110.png)

---

## ✨ Features

- **Text-Based Prediction:** Describe your plant's symptoms and get an AI-powered diagnosis.
- **Image-Based Prediction:** Upload an image of a plant leaf to detect diseases instantly.
- **Detailed Results:** Get a predicted disease name, confidence score, and description.
- **Treatment Recommendations:** Receive immediate and long-term advice for treating the detected disease.
- **Modern UI:** A clean, responsive, and user-friendly interface built with React and Tailwind CSS.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS
- **Backend:** Python, FastAPI
- **Machine Learning:** PyTorch, Transformers, Scikit-learn

---

## 🚀 How to Run Locally

Follow these steps to set up and run the project on your local machine.

### Prerequisites

- Node.js & npm
- Python & pip

## 📥 Model Setup

The machine learning models for this project are too large for GitHub and must be downloaded separately.

1.  **Download the models** from this link:
    [**Download these files from Google Drive**](https://drive.google.com/file/d/1MXMz-hBrqbqKnczM486nkbkY2rbSzaiU/view?usp=sharing)
    for text model (https://drive.google.com/drive/folders/1aqKHcEMsyzvO4ym0kHpsig3AoS1XOZ9L?usp=sharing) & (https://drive.google.com/file/d/1jZA8RYyh3S6iIzAWpEm90Rsk7mtgxhzP/view?usp=sharing)

2.  **Unzip the file** to get the `Models` folder.

3.  **Place the `Models` folder** inside the `backend/` directory of this project.

✔️ Your final folder structure should look like this:
backend/
├── Models/ <-- The folder you just downloaded and placed
│ ├── cnn_model.pth
│ └── best_model_text/
└── main.py

### 1. Clone the Repository

````bash
git clone [https://github.com/alokrj01/AI_Plant_Doc_Bot](https://github.com/alokrj01/AI_Plant_Doc_Bot)
cd your-repo-name

### 2. Setup and run the Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

### 3. Setup and Run the frontend
```bash
cd frontend
npm install
npm run dev
````

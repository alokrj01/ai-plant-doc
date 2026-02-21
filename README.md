<div align="center">

# 🌱 PlantMitra AI (formerly Plant Doc)
**Intelligent Plant Disease Detection & Treatment System**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white)](https://pytorch.org/)

A smart, AI-powered web application that empowers gardeners and farmers to diagnose plant diseases instantly through image and text-based analysis.

![App Screenshot](https://github.com/alokrj01/ai-plant-doc/blob/main/frontend/Screenshot%202025-10-09%20213110.png)

</div>

<br />

## 📑 Table of Contents
- [✨ Features](#-features)
- [🛠️ Tech Stack](#️-tech-stack)
- [🚀 Getting Started](#-getting-started)
  - [📥 Model Setup (Crucial)](#-model-setup-crucial)
  - [💻 Installation Steps](#-installation-steps)

---

## ✨ Features

- 📝 **Text-Based Prediction:** Describe your plant's symptoms and get an AI-powered diagnosis.
- 📸 **Image-Based Prediction:** Upload an image of a plant leaf to detect diseases instantly.
- 📊 **Detailed Results:** Get a predicted disease name, confidence score, and severity description.
- 💊 **Treatment Recommendations:** Receive immediate and long-term advice for treating the detected disease.
- 🎨 **Premium UI:** A clean, responsive, glassmorphic interface built with React and Tailwind CSS.

---

## 🛠️ Tech Stack

<details>
<summary><b>Click to expand technology details</b></summary>
<br/>

* **Frontend:** React.js, Vite, Tailwind CSS, Lucide Icons, React Router
* **Backend:** Python, FastAPI, Uvicorn
* **Machine Learning:** PyTorch, Transformers (HuggingFace), Scikit-learn
* **Architecture:** Client-Server model with RESTful APIs

</details>

---

## 🚀 Getting Started

Follow these steps to set up and run the project on your local machine.

### Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [Python](https://www.python.org/downloads/) (v3.8 or higher)
- Git

### 📥 Model Setup (Crucial)

> ⚠️ **IMPORTANT:** The machine learning models for this project are too large for GitHub and must be downloaded separately before running the backend.

1. **Download the Image Model:** [Get `cnn_model.pth` here](https://drive.google.com/file/d/1MXMz-hBrqbqKnczM486nkbkY2rbSzaiU/view?usp=sharing)
2. **Download the Text Models:** - [Part 1 (Folder)](https://drive.google.com/drive/folders/1aqKHcEMsyzvO4ym0kHpsig3AoS1XOZ9L?usp=sharing)
   - [Part 2 (File)](https://drive.google.com/file/d/1jZA8RYyh3S6iIzAWpEm90Rsk7mtgxhzP/view?usp=sharing)
3. **Organize the Files:** Place them inside the `backend/` directory of this project.

<details>
<summary><b>📁 Click here to view the required Folder Structure</b></summary>

```text
backend/
├── Models/              <-- Create this folder if it doesn't exist
│   ├── cnn_model.pth    <-- Place the downloaded image model here
│   └── best_model_text/ <-- Place the text model files inside this folder
└── main.py

### Installation

1. Clone the Repository

````bash
git clone [https://github.com/alokrj01/AI_Plant_Doc_Bot](https://github.com/alokrj01/AI_Plant_Doc_Bot)
cd AI_Plant_Doc_Bot
```

2. Setup and run the Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```
3. Setup and Run the frontend
```bash
cd frontend
npm install
npm run dev
```
<div align="center">
<p>Made with ❤️ by <a href="https://www.google.com/search?q=https://github.com/alokrj01">Alok Ranjan</a></p>
</div>


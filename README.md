# 🧠 OncoNavigator AI

### AI-Powered Healthcare Intelligence Platform

> ⚠️ **Demo & Research-Oriented Project**
>
> OncoNavigator AI is a healthcare AI system that combines custom-built Deep Learning models, Retrieval-Augmented Generation (RAG), and Agentic AI into a unified end-to-end workflow.
>
> It is designed for educational and portfolio purposes and is not intended for clinical or medical diagnosis use.

---

# 🌐 Live Deployment

- **Frontend (Netlify):** https://onconavigator-ai.netlify.app/  
- **Backend (Railway):** https://onconavigator-ai-production.up.railway.app/  
- **API Docs:** https://onconavigator-ai-production.up.railway.app/docs  

---

# 🧠 Project Overview

OncoNavigator AI is an end-to-end healthcare intelligence platform that enables:

- Brain tumor detection from MRI scans  
- Tumor classification into 4 categories  
- Tumor segmentation (if tumor is detected)  
- Medical information generation  
- Healthcare recommendation system  
- AI-powered medical chatbot  

It combines **medical imaging + AI reasoning + healthcare assistance** into one system.

---

# 🔁 System Flow

1. User uploads MRI image  
2. CNN model predicts tumor class:
   - Glioma  
   - Meningioma  
   - Pituitary Tumor  
   - No Tumor  

3. If tumor is detected:
   - Segmentation model generates tumor mask  
   - Tumor region is highlighted  

4. Medical information is generated for the tumor  

5. Healthcare agent activates:
   - Finds nearby doctors  
   - Suggests specialists  
   - Recommends hospitals  

6. Chatbot module:
   - Medical Q&A system  
   - RAG-based responses  

---

# ✨ Key Features

## 🔬 Tumor Classification (Custom CNN)
- Built from scratch using CNN architecture  
- 4-class classification only:
  - Glioma
  - Meningioma
  - Pituitary Tumor
  - No Tumor
- Confidence score output  
- Optimized preprocessing pipeline  

---

## 🎯 Tumor Segmentation
- U-Net based segmentation model  
- Activated only when tumor is detected  
- Generates pixel-level tumor mask  
- Highlights tumor region visually  

---

## 📚 Medical Information Module
- Tumor-related explanations  
- Symptoms overview  
- Awareness and educational content  

---

## 🏥 Healthcare Recommendation Agent
- Finds nearby doctors  
- Suggests specialists:
  - Oncologists  
  - Neurologists  
  - Neurosurgeons  
- Hospital recommendations based on location  

---

## 💬 Medical Chatbot (RAG System)
- Built using:
  - Groq LLM API  
  - LangChain  
  - ChromaDB  
- Answers medical queries  
- Context-aware responses  

---

# 🛠️ Tech Stack

## 🧠 AI / Machine Learning
- Custom CNN (PyTorch)
- U-Net for segmentation
- OpenCV
- NumPy
- Pandas

---

## 💬 RAG & Agentic AI
- Groq API (LLM inference)
- LangChain (workflow orchestration)
- ChromaDB (vector database for retrieval)

---

## ⚙️ Backend
- FastAPI
- Python
- REST API architecture
- Image preprocessing pipelines

---

## 🎨 Frontend
- React.js
- Raw CSS (no UI frameworks)
- Axios for API communication
- Responsive UI design

---

## 🚀 Deployment
- Netlify (Frontend)
- Railway (Backend)

---

# 🚀 Deployment Links

- 🌐 Frontend: https://onconavigator-ai.netlify.app/  
- ⚙️ Backend: https://onconavigator-ai-production.up.railway.app/  
- 📄 API Docs: https://onconavigator-ai-production.up.railway.app/docs  

---

# 🔄 Project Status

OncoNavigator AI is a **fully deployed and working system**, but it is under **active improvement and continuous development**.

We are actively improving across all layers:

### 🧠 AI Models
- Improving CNN accuracy
- Better generalization on MRI scans
- Improving segmentation mask precision

### 📚 RAG System
- Better retrieval quality from ChromaDB
- More accurate medical responses
- Reduced hallucination rate

### 🏥 Healthcare Agent
- Improved doctor recommendation accuracy
- Better hospital ranking system
- Smarter location-based filtering

### 💬 Chatbot
- Better contextual responses
- Improved reasoning using Groq + LangChain

### 🎨 Frontend
- UI/UX improvements
- Better responsiveness
- Smoother user experience

---

# ⚠️ Limitations

- Not a medical diagnostic system  
- Predictions are not clinically validated  
- Segmentation is approximate  
- Recommendations are informational only  
- Chatbot responses should be verified  

---

# 🔮 Future Enhancements

- Multi-modal inputs (reports + MRI scans)  
- Clinical report generation  
- Explainable AI visualizations  
- User authentication system  
- Multi-language support  
- Advanced hospital API integration  

---

# ⚠️ Medical Disclaimer

This system is for **educational and research purposes only**.

It does NOT provide medical advice and must not be used as a substitute for professional healthcare consultation.

---

# 🌟 Vision

OncoNavigator AI aims to build a unified healthcare intelligence system that integrates:

- Medical image understanding  
- AI-powered knowledge retrieval  
- Intelligent healthcare recommendations  
- Conversational AI assistance  

into a continuously improving ecosystem for better healthcare awareness and assistance.

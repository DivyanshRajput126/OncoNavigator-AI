import React, { useState } from 'react';
import { ChevronLeft, Loader2, Image as ImageIcon, MapPin, Activity, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ChatbotUI from '../components/ChatbotUI';
import { predictTumor, generateMask, getRagInformation, findSpecialist } from '../services/api';
import './AiDashboard.css';

const AiDashboard = () => {
  const navigate = useNavigate();

  // Input State
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [city, setCity] = useState('');

  // Workflow State
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0); // 0: Idle, 1: Predicting, 2: Segmenting, 3: RAG, 4: Specialist, 5: Done
  const [error, setError] = useState('');

  // Results State
  const [predResult, setPredResult] = useState(null);
  const [segMask, setSegMask] = useState(null);
  const [ragResult, setRagResult] = useState(null);
  const [specialistResult, setSpecialistResult] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      resetAnalysis();
    }
  };

  const resetAnalysis = () => {
    setPredResult(null);
    setSegMask(null);
    setRagResult(null);
    setSpecialistResult(null);
    setCurrentStep(0);
    setError('');
  };

  const startAnalysis = async () => {
    if (!file) {
      setError('Please upload an MRI scan first.');
      return;
    }
    if (!city.trim()) {
      setError('Please enter your city to find nearby specialists.');
      return;
    }

    setIsAnalyzing(true);
    setError('');
    resetAnalysis();

    try {
      // Step 1: Prediction
      setCurrentStep(1);
      const predictionData = await predictTumor(file);
      setPredResult(predictionData);

      // If no tumor, stop early
      if (predictionData.prediction.toLowerCase() === 'no tumor') {
        setCurrentStep(5);
        setIsAnalyzing(false);
        return;
      }

      // Step 2: Segmentation
      setCurrentStep(2);
      const segData = await generateMask(predictionData.prediction_id);
      setSegMask(`data:image/png;base64,${segData.mask_base64}`);

      // Step 3: RAG Details
      setCurrentStep(3);
      const ragData = await getRagInformation(predictionData.prediction);
      setRagResult(ragData);

      // Step 4: Specialist
      setCurrentStep(4);
      const specData = await findSpecialist(predictionData.prediction, city);
      setSpecialistResult(specData);

      setCurrentStep(5);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.detail || err.message || 'An error occurred during analysis.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-main-full">
        <header className="dashboard-header glass">
          <button className="back-btn" onClick={() => navigate('/')}>
            <ChevronLeft size={20} /> Back to Home
          </button>
          <h2>Comprehensive AI Analysis</h2>
        </header>

        <div className="dashboard-content-full">
          
          {/* Input Section */}
          <div className="input-section grid md:grid-cols-2 gap-8 mb-12">
            <div className="upload-box glass">
              {!preview ? (
                <label className="upload-area">
                  <input type="file" accept="image/jpeg, image/png" onChange={handleFileChange} hidden />
                  <ImageIcon size={48} className="text-secondary mb-4" />
                  <h3>Upload MRI Scan</h3>
                  <p className="text-secondary">Drag & Drop or Click (JPEG, PNG)</p>
                </label>
              ) : (
                <div className="preview-area">
                  <img src={preview} alt="MRI Preview" className="mri-preview" />
                  <button className="btn btn-outline mt-4" onClick={() => { setPreview(null); setFile(null); resetAnalysis(); }}>
                    Remove Image
                  </button>
                </div>
              )}
            </div>

            <div className="details-box glass flex-col justify-center">
              <div className="input-group mb-6">
                <label className="input-label">Patient Location (City)</label>
                <div className="input-wrapper">
                  <MapPin className="input-icon" size={20} />
                  <input 
                    type="text" 
                    className="styled-input" 
                    placeholder="E.g. New York, London, Delhi..." 
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <p className="input-hint text-secondary mt-2">Required to find nearby specialists.</p>
              </div>

              <button 
                className="btn btn-primary w-full start-analysis-btn" 
                onClick={startAnalysis} 
                disabled={isAnalyzing || !file || !city.trim()}
              >
                {isAnalyzing ? (
                  <><Loader2 className="spin mr-2" size={20} /> Analyzing Sequence...</>
                ) : (
                  <><Activity className="mr-2" size={20} /> Start Comprehensive Analysis</>
                )}
              </button>

              {error && <div className="error-message mt-4">{error}</div>}
            </div>
          </div>

          {/* Workflow Status Tracker */}
          {currentStep > 0 && (
            <div className="workflow-tracker glass mb-8">
              <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
                {currentStep > 1 ? <CheckCircle2 size={24} className="text-primary" /> : (currentStep === 1 ? <Loader2 size={24} className="spin text-primary" /> : <div className="step-circle">1</div>)}
                <span>Prediction</span>
              </div>
              <div className="step-line"></div>
              <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
                {currentStep > 2 ? <CheckCircle2 size={24} className="text-primary" /> : (currentStep === 2 ? <Loader2 size={24} className="spin text-primary" /> : <div className="step-circle">2</div>)}
                <span>Segmentation</span>
              </div>
              <div className="step-line"></div>
              <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
                {currentStep > 3 ? <CheckCircle2 size={24} className="text-primary" /> : (currentStep === 3 ? <Loader2 size={24} className="spin text-primary" /> : <div className="step-circle">3</div>)}
                <span>Information Fetch</span>
              </div>
              <div className="step-line"></div>
              <div className={`step ${currentStep >= 4 ? 'active' : ''}`}>
                {currentStep > 4 ? <CheckCircle2 size={24} className="text-primary" /> : (currentStep === 4 ? <Loader2 size={24} className="spin text-primary" /> : <div className="step-circle">4</div>)}
                <span>Specialist Match</span>
              </div>
            </div>
          )}

          {/* Results Section */}
          <div className="results-section">
            
            {/* Prediction & Segmentation Images */}
            {predResult && (
              <div className="result-block glass animate-fade-in mb-8">
                <h3 className="section-title">Diagnostic Imaging</h3>
                
                <div className="grid md:grid-cols-2 gap-8 mt-6">
                  <div className="image-comparison-box">
                    <h4>Original MRI Scan</h4>
                    <img src={preview} alt="Original MRI" className="result-image" />
                  </div>
                  
                  {segMask ? (
                    <div className="image-comparison-box">
                      <h4>Tumor Segmentation Mask</h4>
                      <div className="mask-overlay-container">
                        <img src={preview} alt="MRI Background" className="result-image" />
                        <img src={segMask} alt="Segmentation Mask" className="result-image mask-image" />
                      </div>
                    </div>
                  ) : (
                    <div className="image-comparison-box empty-box">
                      {predResult.prediction.toLowerCase() === 'no tumor' ? (
                        <p className="text-secondary text-center">No tumor detected. Segmentation bypassed.</p>
                      ) : (
                        <p className="text-secondary text-center"><Loader2 className="spin mr-2" size={16} /> Generating mask...</p>
                      )}
                    </div>
                  )}
                </div>

                <div className="prediction-details mt-6 p-4 bg-tertiary rounded">
                  <span className="text-secondary">Diagnosis: </span>
                  <strong className="text-gradient text-xl ml-2">{predResult.prediction}</strong>
                  <span className="text-secondary ml-6">Confidence: </span>
                  <strong className="text-primary text-xl ml-2">{(predResult.confidence * 100).toFixed(2)}%</strong>
                </div>
              </div>
            )}

            {/* RAG Information */}
            {ragResult && (
              <div className="result-block glass animate-fade-in mb-8">
                <h3 className="section-title">Medical Information & Insights</h3>
                <div className="rag-answer mt-4">
                  {ragResult.answer}
                </div>
                {ragResult.references && ragResult.references.length > 0 && (
                  <div className="rag-references mt-6">
                    <h4>Clinical References:</h4>
                    <ul className="ref-list">
                      {ragResult.references.map((ref, idx) => (
                        <li key={idx}><a href={ref} target="_blank" rel="noreferrer" className="text-primary">{ref}</a></li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Specialist Recommendation */}
            {specialistResult && (
              <div className="result-block glass animate-fade-in mb-8">
                <h3 className="section-title">Specialist Recommendations in {specialistResult.city}</h3>
                <div className="specialist-answer mt-4">
                  <p>{specialistResult.answer}</p>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
      <ChatbotUI />
    </div>
  );
};

export default AiDashboard;

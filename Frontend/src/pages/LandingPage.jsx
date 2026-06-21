import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Activity, ChevronRight, Stethoscope, Search, Layers, Cpu, Database, ShieldCheck, ArrowRight, Microscope, MessageSquareText, MapPin, Code2 } from 'lucide-react';
import Footer from '../components/Footer';
import ChatbotUI from '../components/ChatbotUI';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      {/* Navbar Placeholder */}
      <nav className="navbar container">
        <div className="nav-brand">
          <Brain className="text-primary mr-2" size={28} />
          <span className="font-bold text-xl">OncoNavigator AI</span>
        </div>
        <div className="nav-links">
          <button className="btn btn-outline nav-btn" onClick={() => navigate('/dashboard')}>
            Launch Platform
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="glow-orb orb-1"></div>
          <div className="glow-orb orb-2"></div>
          <div className="grid-overlay"></div>
        </div>

        <div className="container hero-container">
          <div className="hero-content animate-fade-in">
            <div className="badge glass mb-6">
              <span className="pulse-dot"></span> From Detection to Care
            </div>
            <h1 className="hero-title">
              Bridging the gap between <br className="hidden-mobile" /> medical image analysis and <br className="hidden-mobile" /> <span className="text-gradient">actionable healthcare</span>
            </h1>
            <p className="hero-subtitle">
              An end-to-end AI ecosystem combining deep learning tumor classification, U-Net segmentation, Retrieval-Augmented Generation (RAG), and intelligent healthcare navigation.
            </p>
            <div className="hero-cta">
              <button className="btn btn-primary cta-btn" onClick={() => navigate('/dashboard')}>
                Start AI Analysis <ArrowRight size={20} className="ml-2" />
              </button>
              <a href="#features" className="btn btn-outline cta-btn">
                Explore Modules
              </a>
            </div>

            <div className="hero-stats mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="stat-item">
                <h4 className="text-3xl font-bold text-white">4</h4>
                <p className="text-secondary text-sm">Core AI Modules</p>
              </div>
              <div className="stat-item">
                <h4 className="text-3xl font-bold text-white">RAG</h4>
                <p className="text-secondary text-sm">Knowledge Grounding</p>
              </div>
              <div className="stat-item">
                <h4 className="text-3xl font-bold text-white">CNN</h4>
                <p className="text-secondary text-sm">Vision Architecture</p>
              </div>
              <div className="stat-item">
                <h4 className="text-3xl font-bold text-white">24/7</h4>
                <p className="text-secondary text-sm">Agentic Assistance</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Modules Section */}
      <section id="features" className="how-it-works container py-section">
        <div className="section-header text-center mb-16">
          <div className="badge glass mb-4">Core Platform Features</div>
          <h2 className="text-4xl font-bold mb-4">Four Pillars of OncoNavigator</h2>
          <p className="text-secondary max-w-2xl mx-auto text-lg">
            A unified healthcare intelligence platform that combines medical image analysis, medical knowledge retrieval, and healthcare navigation.
          </p>
        </div>

        <div className="workflow-cards grid md:grid-cols-2 gap-8">
          {/* Classification */}
          <div className="workflow-card glass-card text-left p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="icon-wrapper m-0"><Microscope size={28} className="text-primary" /></div>
              <h3 className="text-2xl font-bold">Tumor Classification</h3>
            </div>
            <p className="text-secondary mb-4">
              Automatically identifies tumor types from medical images using deep learning CNNs. Generates confidence scores and supports multi-class classification.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="badge-small">Glioma</span>
              <span className="badge-small">Meningioma</span>
              <span className="badge-small">Pituitary</span>
              <span className="badge-small">PyTorch</span>
            </div>
          </div>

          {/* Segmentation */}
          <div className="workflow-card glass-card text-left p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="icon-wrapper m-0"><Layers size={28} className="text-primary" /></div>
              <h3 className="text-2xl font-bold">Tumor Segmentation</h3>
            </div>
            <p className="text-secondary mb-4">
              Identifies and localizes tumor regions within medical images. Generates pixel-level binary masks and extracts precise tumor boundaries.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="badge-small">U-Net Architecture</span>
              <span className="badge-small">Localization</span>
              <span className="badge-small">Dice Score</span>
            </div>
          </div>

          {/* RAG Assistant */}
          <div className="workflow-card glass-card text-left p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="icon-wrapper m-0"><MessageSquareText size={28} className="text-primary" /></div>
              <h3 className="text-2xl font-bold">Medical RAG Assistant</h3>
            </div>
            <p className="text-secondary mb-4">
              Provides context-aware, grounded medical responses using Retrieval-Augmented Generation. Explains terminology and retrieves cancer care guidelines.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="badge-small">LangChain</span>
              <span className="badge-small">Vector Search</span>
              <span className="badge-small">Groq API</span>
            </div>
          </div>

          {/* Recommendation Agent */}
          <div className="workflow-card glass-card text-left p-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="icon-wrapper m-0"><MapPin size={28} className="text-primary" /></div>
              <h3 className="text-2xl font-bold">Healthcare Navigator</h3>
            </div>
            <p className="text-secondary mb-4">
              Assists users in discovering relevant healthcare resources based on diagnosis and location. Recommends oncologists, neurologists, and cancer hospitals.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="badge-small">Location-Aware</span>
              <span className="badge-small">Specialist Routing</span>
              <span className="badge-small">Agentic AI</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="tech-stack py-section bg-tertiary">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="tech-content animate-fade-in">
              <div className="badge glass mb-6">System Architecture</div>
              <h2 className="text-4xl font-bold mb-6">Enterprise-Grade Stack</h2>
              <p className="text-secondary mb-8 text-lg">
                Built upon scalable backend infrastructure, modern vector databases, and state-of-the-art machine learning frameworks.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-bold mb-3 flex items-center gap-2"><Code2 size={18} className="text-primary" /> Frontend & API</h4>
                  <ul className="text-secondary space-y-2 text-sm">
                    <li>• React.js & Tailwind CSS</li>
                    <li>• FastAPI (Python)</li>
                    <li>• RESTful Architecture</li>
                    <li>• Pydantic Validation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-bold mb-3 flex items-center gap-2"><Cpu size={18} className="text-primary" /> Deep Learning</h4>
                  <ul className="text-secondary space-y-2 text-sm">
                    <li>• PyTorch Ecosystem</li>
                    <li>• OpenCV Image Processing</li>
                    <li>• Custom CNN Models</li>
                    <li>• U-Net Segmentation</li>
                  </ul>
                </div>
                <div className="mt-4">
                  <h4 className="text-white font-bold mb-3 flex items-center gap-2"><Brain size={18} className="text-primary" /> Agentic AI</h4>
                  <ul className="text-secondary space-y-2 text-sm">
                    <li>• LangChain & LangGraph</li>
                    <li>• Groq Inference API</li>
                    <li>• DuckDuckGo Integration</li>
                  </ul>
                </div>
                <div className="mt-4">
                  <h4 className="text-white font-bold mb-3 flex items-center gap-2"><Database size={18} className="text-primary" /> Data Layer</h4>
                  <ul className="text-secondary space-y-2 text-sm">
                    <li>• ChromaDB / FAISS</li>
                    <li>• PostgreSQL</li>
                    <li>• Semantic Vector Search</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="tech-visual-container">
              <div className="glass-card code-window">
                <div className="window-header">
                  <div className="dots">
                    <span className="dot red"></span>
                    <span className="dot yellow"></span>
                    <span className="dot green"></span>
                  </div>
                  <span className="window-title">api_response.json</span>
                </div>
                <div className="code-block font-mono text-sm text-left">
                  <pre className="text-white" style={{ margin: 0 }}>
                    {`{
  "status": "success",
  "data": {
    "patient_id": "PT-78921",
    "analysis": {
      "tumor_type": "Glioma",
      "confidence": 0.992,
      "segmentation_mask": "generated"
    },
    "recommendation": {
      "action": "Immediate Consult",
      "specialists_nearby": 3
    }
  }
}`}
                  </pre>
                </div>
              </div>

              <div className="floating-element el-1"><ShieldCheck size={40} className="text-primary opacity-20" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section container text-center py-section">
        <div className="glass-card cta-banner">
          <h2 className="text-4xl font-bold mb-6">Experience the Future of Oncology</h2>
          <p className="text-secondary mb-10 max-w-2xl mx-auto text-lg">
            Join the ecosystem combining medical image analysis, knowledge retrieval, and healthcare navigation.
          </p>
          <button className="btn btn-primary cta-btn-lg" onClick={() => navigate('/dashboard')}>
            Launch Dashboard <ArrowRight size={24} className="ml-2" />
          </button>
        </div>
      </section>

      <Footer />
      <ChatbotUI />
    </div>
  );
};

export default LandingPage;

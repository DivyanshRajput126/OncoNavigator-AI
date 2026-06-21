import React from 'react';
import './Footer.css';
import { Globe, Network, Mail, Code2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="footer glass">
      <div className="container footer-content">
        <div className="footer-brand">
          <div className="brand-logo">
            <Code2 className="brand-icon" />
            <span className="text-gradient">OncoNavigator AI</span>
          </div>
          <p className="footer-desc">Advanced Brain Tumor Detection & Analysis powered by Machine Learning and RAG Agents.</p>
        </div>

        <div className="footer-links">
          <h4>Connect</h4>
          <div className="social-links">
            <a href="https://divyansh-portfolio126.netlify.app/" target="_blank" rel="noopener noreferrer" className="social-link portfolio-btn">
              <Globe size={18} />
              <span className="portfolio-link-text">Visit My Portfolio</span>
            </a>
            <div className="icon-links">
              <a href="https://github.com/Divyansh-rajput1" target="_blank" rel="noopener noreferrer" className="icon-link" aria-label="GitHub">
                <Code2 size={22} />
              </a>
              <a href="https://www.linkedin.com/in/divyansh-rajput-49198524a/" target="_blank" rel="noopener noreferrer" className="icon-link" aria-label="LinkedIn">
                <Network size={22} />
              </a>
              <a href="mailto:divyanshrajput126@gmail.com" className="icon-link" aria-label="Email">
                <Mail size={22} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} OncoNavigator AI. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

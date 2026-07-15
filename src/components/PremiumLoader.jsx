import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import logo from '../assets/limitless-logo.webp';

const PremiumLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    
    // Force Google Translate to re-translate the new DOM elements 
    // after React mounts them, solving the reset issue.
    const translateTimer = setTimeout(() => {
      const selectEl = document.querySelector('.goog-te-combo');
      if (selectEl && selectEl.value && selectEl.value !== 'en') {
        selectEl.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }, 100);

    const loaderTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1000ms premium loading transition
    
    return () => {
      clearTimeout(translateTimer);
      clearTimeout(loaderTimer);
    };
  }, [location.pathname]);

  if (!isLoading) return null;

  return (
    <div className="premium-loader-overlay">
      <div className="premium-loader-content">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        
        <div className="logo-wrapper">
           <div className="rotating-ring"></div>
           <img src={logo} alt="Limitless" className="floating-logo" />
        </div>
        
        <div className="shimmer-text">Unlocking Potential...</div>
      </div>
      <style>{`
        .premium-loader-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: radial-gradient(circle at center, #0a0f24 0%, #020617 100%);
          z-index: 999999;
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 1;
          animation: fadeIn 0.3s ease-out;
        }
        
        .premium-loader-content {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        
        .orb {
          position: absolute;
          width: 250px;
          height: 250px;
          border-radius: 50%;
          filter: blur(70px);
          opacity: 0.4;
          z-index: 1;
          animation: orbit 4s linear infinite;
        }
        
        .orb-1 {
          background: #F59E0B; /* Amber */
          top: -80px; left: -80px;
          transform-origin: 150px 150px;
        }
        
        .orb-2 {
          background: #3B82F6; /* Trust Blue */
          bottom: -80px; right: -80px;
          transform-origin: -50px -50px;
          animation: orbit 6s linear infinite reverse;
        }
        
        .logo-wrapper {
          position: relative;
          width: 160px;
          height: 160px;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 3;
        }
        
        .rotating-ring {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          border-radius: 50%;
          border: 2px solid transparent;
          border-top-color: rgba(245, 158, 11, 0.8);
          border-right-color: rgba(59, 130, 246, 0.8);
          border-bottom-color: transparent;
          border-left-color: transparent;
          animation: spin 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) infinite;
        }
        
        .floating-logo {
          width: 100px;
          height: 100px;
          object-fit: contain;
          animation: float 3s ease-in-out infinite;
          filter: drop-shadow(0 10px 15px rgba(0,0,0,0.5));
        }
        
        .shimmer-text {
          margin-top: 40px;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 4px;
          text-transform: uppercase;
          background: linear-gradient(90deg, #475569 0%, #ffffff 50%, #475569 100%);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmer 2s linear infinite;
          z-index: 3;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes orbit {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.2); }
          100% { transform: rotate(360deg) scale(1); }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-12px) scale(1.05); }
        }
        
        @keyframes shimmer {
          to { background-position: 200% center; }
        }
      `}</style>
    </div>
  );
};

export default PremiumLoader;

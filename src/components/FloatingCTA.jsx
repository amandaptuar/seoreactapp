import React, { useState } from 'react';
import EnquiryModal from './EnquiryModal';

const FloatingCTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        className="floating-cta" 
        onClick={() => setIsModalOpen(true)}
        title="Start Assessment"
      >
        ⚡
        <span className="cta-tooltip">Start Assessment</span>
      
      <style>{`
        .floating-cta {
          position: fixed;
          bottom: 90px;
          right: 20px;
          width: 60px;
          height: 60px;
          background: var(--primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 24px;
          cursor: pointer;
          z-index: 1000;
          box-shadow: 0 8px 24px rgba(225, 29, 46, 0.4);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .floating-cta:hover {
          transform: scale(1.1) rotate(10deg);
          background: var(--primary-dark);
        }
        
        .cta-tooltip {
          position: absolute;
          right: 75px;
          background: var(--secondary);
          color: white;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          box-shadow: var(--shadow-md);
        }
        
        .floating-cta:hover .cta-tooltip {
          opacity: 1;
          visibility: visible;
          right: 80px;
        }
        
        .cta-tooltip::after {
          content: '';
          position: absolute;
          right: -6px;
          top: 50%;
          transform: translateY(-50%);
          border-width: 6px 0 6px 6px;
          border-style: solid;
          border-color: transparent transparent transparent var(--secondary);
        }
      `}</style>
      </div>
      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default FloatingCTA;

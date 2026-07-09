import React, { useState } from 'react';
import FeedbackModal from './FeedbackModal';

const FeedbackCTA = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <style>
        {`
          .feedback-cta-btn {
            padding: 12px 24px;
            border-radius: 50px;
          }
          .feedback-cta-text {
            display: inline;
          }
          @media (max-width: 768px) {
            .feedback-cta-btn {
              padding: 16px;
              border-radius: 50%;
            }
            .feedback-cta-text {
              display: none;
            }
          }
        `}
      </style>
      <div 
        style={{
          position: 'fixed',
          bottom: '30px',
          left: '30px',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <button
          className="feedback-cta-btn"
          onClick={() => setIsModalOpen(true)}
          style={{
            background: 'linear-gradient(135deg, #10B981, #059669)',
            color: '#fff',
            border: 'none',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(16, 185, 129, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease, padding 0.3s ease, border-radius 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.6)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 14px rgba(16, 185, 129, 0.4)';
          }}
        >
          <svg 
            width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
          </svg>
          <span className="feedback-cta-text">Send Feedback</span>
        </button>
      </div>

      <FeedbackModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};

export default FeedbackCTA;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ExitIntentPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseLeave = (e) => {
      // If the mouse leaves the top of the viewport (usually towards the tabs/address bar)
      if (e.clientY <= 0 && !hasTriggered) {
        setIsVisible(true);
        setHasTriggered(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasTriggered]);

  if (!isVisible) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(15,23,42,0.85)', backdropFilter: 'blur(8px)', zIndex: 10000,
      display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}>
      <div style={{
        background: '#ffffff', borderRadius: '24px', padding: '40px', maxWidth: '500px', width: '90%',
        textAlign: 'center', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
      }}>
        <button 
          onClick={() => setIsVisible(false)}
          style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', fontSize: '24px', color: '#94a3b8', cursor: 'pointer' }}
        >
          &times;
        </button>
        <div style={{ fontSize: '48px', marginBottom: '15px' }}>🧠</div>
        <h2 style={{ color: '#0F172A', fontSize: '28px', fontWeight: '800', marginBottom: '15px', lineHeight: 1.2 }}>
          Wait! Get your free cognitive score before leaving.
        </h2>
        <p style={{ color: '#6B7280', fontSize: '16px', marginBottom: '25px' }}>
          It only takes 2 minutes to discover what's holding back your focus and energy.
        </p>
        <button
          onClick={() => {
            setIsVisible(false);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          style={{
            width: '100%', padding: '16px', background: 'linear-gradient(135deg, #F59E0B, #FB923C)',
            color: '#ffffff', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '18px',
            cursor: 'pointer', boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)'
          }}
        >
          Take the Free Assessment
        </button>
        <button 
          onClick={() => setIsVisible(false)}
          style={{ marginTop: '15px', background: 'none', border: 'none', color: '#94a3b8', fontSize: '14px', cursor: 'pointer', textDecoration: 'underline' }}
        >
          No thanks, I'll pass
        </button>
      </div>
    </div>
  );
};

export default ExitIntentPopup;

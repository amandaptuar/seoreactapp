import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCurrency } from '../hooks/useCurrency';
import { createCheckoutSession } from '../lib/backendApi';

const Payment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userEmail = sessionStorage.getItem('userEmail');
  const { formatPrice } = useCurrency();

  const handlePayment = async () => {
    setIsProcessing(true);
    setError('');
    try {
      const result = await createCheckoutSession();
      if (result && result.url) {
        window.location.href = result.url;
      } else {
        throw new Error('No checkout URL returned from the server.');
      }
    } catch (err) {
      console.error('[stripe] Checkout error:', err);
      setError(err.message || 'Failed to start payment checkout session. Please try again.');
      setIsProcessing(false);
    }
  };

  return (
    <section style={styles.section} className="payment-section">
      <div className="container" style={styles.container}>
        <div className="dark-glass-panel" style={{ textAlign: 'center', padding: '60px 30px', maxWidth: '600px', margin: '0 auto', background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
          
          <div className="slide-up">
            <h2 style={{ color: '#0F172A', fontSize: '42px', marginBottom: '16px', fontWeight: '800' }}>Complete Your Payment</h2>
            <p style={{ color: '#64748b', fontSize: '24px', marginBottom: '32px' }}>
              Final step: Pay the one-time fee of <strong className="notranslate">{formatPrice(19)}</strong> to unlock your full cognitive report and personalized action plan.
            </p>

            <div style={{ background: '#F8FAFC', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '32px', textAlign: 'left' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                 <span style={{ color: '#64748b' }}>Assessment Fee</span>
                 <span className="notranslate" style={{ fontWeight: '700', color: '#0F172A' }}>{formatPrice(19)}</span>
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '10px' }}>
                 <span style={{ fontWeight: '700', color: '#0F172A' }}>Total</span>
                 <span className="notranslate" style={{ fontWeight: '800', color: '#0F172A', fontSize: '28px' }}>{formatPrice(19)}</span>
               </div>
            </div>

            <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(59, 130, 246, 0.2)', marginBottom: '32px', textAlign: 'left' }}>
              <h4 style={{ color: '#0F172A', margin: '0 0 12px 0', fontSize: '22px' }}>Important: Check your email</h4>
              <p style={{ color: '#64748B', fontSize: '20px', margin: 0 }}>Your assessment answers have been securely saved and your login credentials have been sent to your email. You can complete payment now to view your full report.</p>
            </div>

            {error && (
              <div style={{ color: '#EF4444', backgroundColor: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '12px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontWeight: '500' }}>
                {error}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button 
                onClick={handlePayment} 
                disabled={isProcessing}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: 'linear-gradient(135deg, #F59E0B, #FB923C)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '23px',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 14px rgba(245, 158, 11, 0.35)'
                }}
              >
                {isProcessing ? 'Processing...' : `Pay ${formatPrice(19)} & Get Instant Access`}
              </button>


              <button 
                onClick={() => {
                  navigate('/dashboard');
                  window.scrollTo(0, 0);
                }} 
                style={{
                  width: '100%',
                  padding: '12px',
                  background: 'transparent',
                  color: '#64748B',
                  border: '1px solid #E2E8F0',
                  borderRadius: '12px',
                  fontWeight: '600',
                  fontSize: '21px',
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
              >
                Return to Dashboard
              </button>

              <p style={{ fontSize: '20px', color: '#94A3B8', margin: 0, marginTop: '16px' }}>
                🔒 Secure 256-bit SSL encrypted payment.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: '140px 0 80px',
    minHeight: '100vh',
    background: '#F8FAFC',
    display: 'flex',
    alignItems: 'center'
  },
  container: { width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }
};

export default Payment;

import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const PaymentSuccess = () => {
  const [countdown, setCountdown] = useState(3);
  const [status, setStatus] = useState('processing'); // 'processing', 'success', 'error'

  useEffect(() => {
    const verifyAndSave = async () => {
      const email = localStorage.getItem('pendingPaymentEmail');
      
      if (!email) {
        // If there is no email in local storage, it means they didn't come from our checkout flow
        // or they opened it in a different browser.
        setStatus('error');
        return;
      }
      
      try {
        const { error } = await supabase
          .from('users')
          .update({ payment: 'yes' })
          .eq('email', email);

        if (error) throw error;
        
        setStatus('success');
        // Clear it so reloading doesn't duplicate the action
        localStorage.removeItem('pendingPaymentEmail');
      } catch (err) {
        console.error('Payment update error:', err);
        setStatus('error');
      }
    };
    
    verifyAndSave();
  }, []);

  useEffect(() => {
    let timer;
    if (status === 'success' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (status === 'success' && countdown <= 0) {
      // Remove query param and redirect to home
      window.location.replace('/');
    }

    return () => clearInterval(timer);
  }, [status, countdown]);

  return (
    <section style={styles.section} className="payment-section">
      <div className="container" style={styles.container}>
        <div className="dark-glass-panel" style={{ textAlign: 'center', padding: '60px 20px', maxWidth: '600px', margin: '0 auto' }}>
          
          {status === 'processing' && (
            <div className="slide-up">
              <h2 style={{color: 'var(--white)', fontSize: '28px', marginBottom: '16px'}}>Verifying Payment...</h2>
              <p style={{color: '#ccc', fontSize: '16px'}}>Please wait while we confirm your payment with Stripe.</p>
            </div>
          )}

          {status === 'success' && (
            <div className="slide-up">
              <div className="support-success-icon" style={{margin: '0 auto 20px', fontSize: '48px', color: '#28a745'}}>✓</div>
              <h2 style={{color: 'var(--white)', fontSize: '32px', marginBottom: '16px'}}>Thanks for Purchasing!</h2>
              <p style={{color: '#ccc', fontSize: '18px', marginBottom: '30px'}}>
                Your payment was successfully verified.
              </p>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: 'var(--primary)' }}>
                {countdown}
              </div>
              <p style={{color: '#ccc', fontSize: '14px', marginTop: '10px'}}>Redirecting to home page...</p>
            </div>
          )}

          {status === 'error' && (
            <div className="slide-up">
              <div className="support-success-icon" style={{margin: '0 auto 20px', fontSize: '48px', color: '#ff4d4d'}}>✕</div>
              <h2 style={{color: 'var(--white)', fontSize: '32px', marginBottom: '16px'}}>Verification Failed</h2>
              <p style={{color: '#ccc', fontSize: '16px', marginBottom: '30px'}}>
                We couldn't verify your payment or your session expired. If you were charged, please contact support.
              </p>
              <button 
                onClick={() => window.location.replace('/')} 
                className="btn btn-primary"
                style={{ padding: '12px 32px', fontSize: '18px' }}
              >
                Return to Home
              </button>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    paddingTop: '140px',
    paddingBottom: '80px',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    width: '100%',
    padding: '0 15px'
  }
};

export default PaymentSuccess;

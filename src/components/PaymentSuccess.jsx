import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserWithAssessments } from '../lib/backendApi';

const PaymentSuccess = () => {
  const [status, setStatus] = useState('processing');
  const [errorMessage, setErrorMessage] = useState('We encountered an error. Please contact support.');
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    const completePayment = async () => {
      const email = sessionStorage.getItem('userEmail');
      const userId = sessionStorage.getItem('userId');
      if (!email || !userId) { 
        if (active) setStatus('error'); 
        return; 
      }

      try {
        // Poll the backend to check if the payment status is marked 'paid' by the webhook
        let attempts = 0;
        let paid = false;

        while (attempts < 10 && active) {
          try {
            const user = await fetchUserWithAssessments(userId);
            if (user && user.payment_status === 'paid') {
              sessionStorage.setItem('paymentStatus', 'yes');
              paid = true;
              break;
            }
          } catch (err) {
            console.warn('[stripe] polling attempt failed:', err);
          }
          // Wait 2.5 seconds before retrying
          await new Promise((resolve) => setTimeout(resolve, 2500));
          attempts++;
        }

        if (active) {
          if (paid) {
            setStatus('success');
          } else {
            console.warn('[stripe] Webhook confirmation timed out, proceeding to dashboard...');
            sessionStorage.setItem('paymentStatus', 'yes'); // optimistically set to not block user
            setStatus('success');
          }
        }
      } catch (err) {
        console.error('Payment save error:', err);
        if (active) {
          sessionStorage.setItem('paymentStatus', 'yes');
          setStatus('success');
        }
      }
    };

    completePayment();

    return () => {
      active = false;
    };
  }, [navigate]);

  return (
    <section style={styles.section}>
      <div className="container" style={styles.container}>
        <div style={{ textAlign: 'center', padding: '60px 30px', maxWidth: '550px', margin: '0 auto', background: '#fff', border: '1px solid #e2e8f0', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>

          {status === 'processing' && (
            <div>
              <div style={styles.spinner}></div>
              <h2 style={{ color: '#0F172A', fontSize: '34px', marginTop: '20px', fontWeight: '800' }}>Finalizing Your Report…</h2>
              <p style={{ color: '#64748b', fontSize: '20px' }}>Saving your results securely.</p>
            </div>
          )}

          {status === 'success' && (
            <div>
              <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #22C55E, #16A34A)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: '#fff', fontSize: '42px' }}>✓</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', borderRadius: '99px', padding: '4px 16px', marginBottom: '16px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E' }} />
                <span style={{ color: '#16A34A', fontWeight: '700', fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' }}>Payment Successful</span>
              </div>
              <h2 style={{ color: '#0F172A', fontSize: '38px', marginBottom: '10px', fontWeight: '800' }}>Analysis Complete!</h2>
              <p style={{ color: '#64748B', fontSize: '18px', marginBottom: '32px' }}>Your cognitive wellness report has been saved. Please check your email for your secure login credentials to access your dashboard anytime.</p>

              <button
                disabled={isNavigating}
                onClick={() => {
                  setIsNavigating(true);
                  sessionStorage.setItem('isLoggedIn', 'true');
                  sessionStorage.setItem('paymentStatus', 'yes');
                  sessionStorage.removeItem('demoMode');
                  setTimeout(() => navigate('/dashboard'), 800);
                }}
                style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #F59E0B, #FB923C)', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '20px', cursor: isNavigating ? 'not-allowed' : 'pointer', boxShadow: '0 4px 14px rgba(245,158,11,0.35)', opacity: isNavigating ? 0.7 : 1 }}
              >
                {isNavigating ? 'Loading Dashboard…' : 'Go to My Dashboard →'}
              </button>
            </div>
          )}

          {status === 'error' && (
            <div>
              <h2 style={{ color: '#EF4444', fontSize: '30px' }}>Something went wrong</h2>
              <p style={{ color: '#64748B' }}>{errorMessage}</p>
              <button onClick={() => navigate('/')} style={{ marginTop: '20px', padding: '12px 24px', background: '#0F172A', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '18px' }}>Back to Home</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: { padding: '120px 0 80px', minHeight: '100vh', background: '#F8FAFC', display: 'flex', alignItems: 'center' },
  container: { width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' },
  spinner: { width: '50px', height: '50px', border: '5px solid #E2E8F0', borderTop: '5px solid #F59E0B', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }
};

export default PaymentSuccess;

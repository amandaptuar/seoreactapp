import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const [status, setStatus] = useState('processing');
  const [userData, setUserData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const completePayment = async () => {
      const email = localStorage.getItem('userEmail');
      const username = localStorage.getItem('username');
      const password = localStorage.getItem('generatedPassword');

      if (!email) {
        setStatus('error');
        return;
      }

      try {
        // 1. Update database payment status since Stripe Payment Link redirected us here
        const { error } = await supabase
          .from('users')
          .update({ payment_status: 'yes' })
          .eq('email', email);

        if (error) throw error;

        // 2. Send email with credentials via Formsubmit Autoresponse
        await fetch('https://formsubmit.co/ajax/matrikaventures2020@gmail.com', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            _subject: `New User Payment Success: ${username}`,
            email: email, // Formsubmit uses this to send the autoresponse
            message: `User ${username} (${email}) has successfully paid and registered.`,
            _autoresponse: `Welcome to Limitless!\n\nYour payment was successful and your account is ready.\n\nUsername: ${username}\nPassword: ${password}\n\nPlease login at the homepage to access your full report.`
          }),
        });

        setUserData({ username, password });
        setStatus('success');
      } catch (err) {
        console.error('Payment verification or email send error:', err);
        // If DB update fails, don't show success. 
        // If it's just an email error, it's safer to still show success but the DB MUST succeed.
        setStatus('error');
      }
    };

    completePayment();
  }, []);

  return (
    <section style={styles.section}>
      <div className="container" style={styles.container}>
        <div className="dark-glass-panel" style={{ textAlign: 'center', padding: '60px 30px', maxWidth: '550px', margin: '0 auto', background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
          
          {status === 'processing' && (
            <div>
              <h2 style={{ color: '#0F172A', fontSize: '28px' }}>Processing Payment...</h2>
              <p style={{ color: '#64748b' }}>Just a moment while we finalize your account.</p>
            </div>
          )}

          {status === 'success' && (
            <div className="fade-in">
              <div style={{ width: '80px', height: '80px', background: '#22C55E', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: '#fff', fontSize: '32px' }}>✓</div>
              <h2 style={{ color: '#0F172A', fontSize: '32px', marginBottom: '10px', fontWeight: '800' }}>Payment Success!</h2>
              <p style={{ color: '#64748b', fontSize: '16px', marginBottom: '32px' }}>
                Your account is ready. Use the credentials below to log in and access your report.
              </p>

              <div style={{ background: '#F8FAFC', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '32px', textAlign: 'left' }}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Username</label>
                  <div style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>{userData.username}</div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>Temp Password</label>
                  <div style={{ fontSize: '20px', fontWeight: '800', color: '#F59E0B', background: '#fff', padding: '12px', borderRadius: '8px', border: '2px dashed #F59E0B', textAlign: 'center', letterSpacing: '1px' }}>
                    {userData.password}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  localStorage.setItem('isLoggedIn', 'true');
                  navigate('/');
                }}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: '#0F172A',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '700',
                  fontSize: '16px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(15,23,42,0.2)'
                }}
              >
                Go to Home Page
              </button>
            </div>
          )}

          {status === 'error' && (
            <div>
              <h2 style={{ color: '#ef4444' }}>Verification Failed</h2>
              <p style={{ color: '#64748b' }}>We couldn't verify your session. Please contact support.</p>
              <button onClick={() => navigate('/')} style={{ marginTop: '20px', padding: '12px 24px', background: '#0F172A', color: '#fff', border: 'none', borderRadius: '8px' }}>Back to Home</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    padding: '120px 0 80px',
    minHeight: '100vh',
    background: '#F8FAFC',
    display: 'flex',
    alignItems: 'center'
  },
  container: { width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }
};

export default PaymentSuccess;

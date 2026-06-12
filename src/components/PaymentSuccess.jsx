import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { sendCredentialsEmail } from '../lib/emailService';

const PaymentSuccess = () => {
  const [status, setStatus] = useState('processing');
  const [errorMessage, setErrorMessage] = useState('We encountered an error. Please contact support.');
  const [isNavigating, setIsNavigating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const completePayment = async () => {
      const email = localStorage.getItem('userEmail');
      if (!email) { setStatus('error'); return; }

      try {
        const userId = localStorage.getItem('userId');
        const reportJson = localStorage.getItem('analysisReport');

        // 1. Update payment_status to 'paid' in users table
        if (userId) {
          await supabase
            .from('users')
            .update({ payment_status: 'paid' })
            .eq('id', userId);
        }

        // 2. Save assessment report JSON to assessments table
        if (userId && reportJson) {
          const { data: existing } = await supabase
            .from('assessments')
            .select('id')
            .eq('user_id', userId)
            .single();

          if (existing) {
            await supabase
              .from('assessments')
              .update({ report_json: JSON.parse(reportJson) })
              .eq('id', existing.id);
          } else {
            await supabase
              .from('assessments')
              .insert([{ user_id: userId, report_json: JSON.parse(reportJson) }]);
          }
        }
        // 3. Send Credentials Email
        try {
          await sendCredentialsEmail({
            name: localStorage.getItem('name') || 'User',
            email: localStorage.getItem('userEmail'),
            tempPassword: localStorage.getItem('generatedPassword'),
          });
        } catch (emailErr) {
          console.warn('Credentials email failed (non-fatal):', emailErr);
        }

        setStatus('success');
      } catch (err) {
        console.error('Payment save error:', err);
        // Still show success — DB save is non-fatal
        setStatus('success');
      }
    };

    completePayment();
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
              <p style={{ color: '#64748B', fontSize: '18px', marginBottom: '24px' }}>Your cognitive wellness report has been saved. Use the credentials below to log in anytime.</p>

              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '20px', borderRadius: '16px', margin: '0 0 24px', textAlign: 'left' }}>
                <p style={{ color: '#64748B', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 12px' }}>🔐 Your Login Credentials</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: '#fff', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                    <span style={{ color: '#64748B', fontWeight: '600', fontSize: '16px' }}>Username</span>
                    <strong style={{ color: '#0F172A', fontSize: '16px' }}>{localStorage.getItem('userEmail')}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', background: '#fff', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                    <span style={{ color: '#64748B', fontWeight: '600', fontSize: '16px' }}>Temp Password</span>
                    <strong style={{ color: '#6366F1', fontSize: '18px', letterSpacing: '2px', fontFamily: 'monospace' }}>{localStorage.getItem('generatedPassword')}</strong>
                  </div>
                </div>
                <p style={{ color: '#EF4444', fontSize: '14px', margin: '12px 0 0', fontStyle: 'italic' }}>⚠️ Save these before continuing — you'll be asked to reset your password on first login.</p>
              </div>

              <button
                disabled={isNavigating}
                onClick={() => {
                  setIsNavigating(true);
                  localStorage.setItem('isLoggedIn', 'true');
                  localStorage.setItem('paymentStatus', 'yes');
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

import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const PaymentSuccess = () => {
  const [status, setStatus] = useState('processing');
  const [statusMessage, setStatusMessage] = useState('Processing Payment & Analysis...');
  const navigate = useNavigate();

  useEffect(() => {
    const completePaymentAndAnalyze = async () => {
      const email = localStorage.getItem('userEmail');
      const username = localStorage.getItem('username');

      if (!email) {
        setStatus('error');
        return;
      }

      try {
        // 1. Update database payment status
        const { error, data: userRecord } = await supabase
          .from('users')
          .update({ payment_status: 'yes' })
          .eq('email', email)
          .select('questions')
          .single();

        if (error) throw error;

        setStatusMessage('Analyzing Assessment Data...');

        // 2. Fetch assessment data to send to backend
        const assessmentData = userRecord.questions || {};

        // 3. Call backend for LLM analysis and PDF generation
        const response = await fetch('http://localhost:3000/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, username, data: assessmentData })
        });

        if (!response.ok) {
          throw new Error('Failed to analyze data');
        }

        const result = await response.json();
        
        // Save the result in localStorage to be used by the Dashboard
        localStorage.setItem('assessmentReport', JSON.stringify(result.report));
        if (result.pdfUrl) {
           localStorage.setItem('pdfUrl', result.pdfUrl);
        }

        // Save AI insights to Supabase
        await supabase
          .from('users')
          .update({ ai_insights: result.report })
          .eq('email', email);

        setStatus('success');
        
        // Removed auto-redirect so the user has time to copy their password.
        // They will click a button to proceed.

      } catch (err) {
        console.error('Payment verification or analysis error:', err);
        setStatus('error');
      }
    };

    completePaymentAndAnalyze();
  }, [navigate]);

  return (
    <section style={styles.section}>
      <div className="container" style={styles.container}>
        <div className="dark-glass-panel" style={{ textAlign: 'center', padding: '60px 30px', maxWidth: '550px', margin: '0 auto', background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
          
          {status === 'processing' && (
            <div>
              <div className="spinner" style={styles.spinner}></div>
              <h2 style={{ color: '#0F172A', fontSize: '28px', marginTop: '20px' }}>{statusMessage}</h2>
              <p style={{ color: '#64748b' }}>Our AI is crafting your personalized cognitive protocol.</p>
            </div>
          )}

          {status === 'success' && (
            <div className="fade-in">
              <div style={{ width: '80px', height: '80px', background: '#22C55E', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: '#fff', fontSize: '32px' }}>✓</div>
              <h2 style={{ color: '#0F172A', fontSize: '32px', marginBottom: '10px', fontWeight: '800' }}>Analysis Complete!</h2>
              
              <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '20px', borderRadius: '12px', margin: '24px 0', textAlign: 'left' }}>
                <p style={{ color: '#64748B', fontSize: '14px', margin: '0 0 12px 0', fontWeight: '600', textTransform: 'uppercase' }}>Save your login details:</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#fff', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <span style={{ color: '#64748B', fontWeight: '500' }}>Username:</span>
                    <strong style={{ color: '#0F172A' }}>{localStorage.getItem('username')}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#fff', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <span style={{ color: '#64748B', fontWeight: '500' }}>Password:</span>
                    <strong style={{ color: '#0F172A' }}>{localStorage.getItem('generatedPassword')}</strong>
                  </div>
                </div>
                <p style={{ color: '#EF4444', fontSize: '12px', margin: '12px 0 0 0', fontStyle: 'italic' }}>* Please save these before continuing. You will need them to log in later.</p>
              </div>

              <button 
                onClick={() => {
                  // Mark as logged in so header reflects status
                  localStorage.setItem('isLoggedIn', 'true');
                  localStorage.setItem('paymentStatus', 'yes');
                  navigate('/dashboard');
                }} 
                style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #F59E0B, #FB923C)', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '16px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(245,158,11,0.35)' }}
              >
                Go to My Dashboard →
              </button>
            </div>
          )}

          {status === 'error' && (
            <div>
              <h2 style={{ color: '#ef4444' }}>Verification Failed</h2>
              <p style={{ color: '#64748b' }}>We encountered an error processing your data. Please contact support.</p>
              <button onClick={() => navigate('/')} style={{ marginTop: '20px', padding: '12px 24px', background: '#0F172A', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Back to Home</button>
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
  container: { width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '0 20px' },
  spinner: {
    width: '50px',
    height: '50px',
    border: '5px solid #E2E8F0',
    borderTop: '5px solid #F59E0B',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto'
  }
};

export default PaymentSuccess;

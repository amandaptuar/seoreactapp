import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';

const stripeLink = "https://buy.stripe.com/9B68wI7Ux7bGaXugBt7ss00";

const Payment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');

  const stripeLink = "https://buy.stripe.com/9B68wI7Ux7bGaXugBt7ss00";

  const handlePayment = () => {
    setIsProcessing(true);
    // Redirect user to the Stripe Payment Link
    // To ensure they return to the app, the success URL must be configured in Stripe Dashboard
    // to point to YOUR_DOMAIN/payment-success
    window.location.href = stripeLink;
  };

  return (
    <section style={styles.section} className="payment-section">
      <div className="container" style={styles.container}>
        <div className="dark-glass-panel" style={{ textAlign: 'center', padding: '60px 30px', maxWidth: '600px', margin: '0 auto', background: '#fff', border: '1px solid #e2e8f0', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
          
          <div className="slide-up">
            <h2 style={{ color: '#0F172A', fontSize: '32px', marginBottom: '16px', fontWeight: '800' }}>Complete Your Payment</h2>
            <p style={{ color: '#64748b', fontSize: '17px', marginBottom: '32px' }}>
              Final step: Pay the one-time fee of <strong>$79</strong> to unlock your full cognitive report and personalized action plan.
            </p>

            <div style={{ background: '#F8FAFC', padding: '24px', borderRadius: '16px', border: '1px solid #E2E8F0', marginBottom: '32px', textAlign: 'left' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                 <span style={{ color: '#64748b' }}>Assessment Fee</span>
                 <span style={{ fontWeight: '700', color: '#0F172A' }}>$79.00</span>
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '10px' }}>
                 <span style={{ fontWeight: '700', color: '#0F172A' }}>Total</span>
                 <span style={{ fontWeight: '800', color: '#0F172A', fontSize: '20px' }}>$79.00</span>
               </div>
            </div>

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
                  fontSize: '16px',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 14px rgba(245, 158, 11, 0.35)'
                }}
              >
                {isProcessing ? 'Processing...' : 'Pay $79 & Get Instant Access'}
              </button>
              
              <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0 }}>
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

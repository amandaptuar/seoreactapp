import React from 'react';

const stripeLink = "https://buy.stripe.com/9B68wI7Ux7bGaXugBt7ss00";

const Payment = () => {
  const userEmail = localStorage.getItem('userEmail');

  const handleStartPayment = () => {
    // Save email to local storage so we know who is paying when Stripe redirects them back
    localStorage.setItem('pendingPaymentEmail', userEmail);
    window.location.href = stripeLink;
  };

  return (
    <section style={styles.section} className="payment-section">
      <div className="container" style={styles.container}>
        <div className="dark-glass-panel" style={{ textAlign: 'center', padding: '60px 20px', maxWidth: '600px', margin: '0 auto' }}>
          
          <div className="slide-up">
            <h2 style={{color: 'var(--white)', fontSize: '32px', marginBottom: '16px'}}>Complete Your Payment</h2>
            <p style={{color: '#ccc', fontSize: '16px', marginBottom: '30px'}}>
              You must complete the payment on Stripe to unlock your personalized Limitless Protocol.
            </p>
            <button 
              onClick={handleStartPayment} 
              className="btn btn-primary"
              style={{ padding: '16px 32px', fontSize: '18px', width: '100%' }}
            >
              Go to Stripe Checkout
            </button>
          </div>

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

export default Payment;

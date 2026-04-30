import React from 'react';

const Pricing = () => {
  return (
    <section id="pricing" className="gap no-top">
      <div className="container">
        <div className="heading sec-title-animation animation-style2" style={{ textAlign: 'center' }}>
          <h2 className="title-animation">Take Control of Your Health Today</h2>
          <p className="title-animation" style={{ fontSize: '18px', color: '#ccc', marginTop: '10px' }}>
            Discover what may be impacting your energy, focus, and daily performance.
          </p>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col-lg-5 col-md-8">
            <div className="pricing" style={{ border: '1px solid var(--primary)' }}>
              <div className="pricing-plans">
                <span style={{ fontSize: '20px', fontWeight: '600' }}>Cognitive Health Assessment</span>
                <h5 style={{ margin: '15px 0' }}>$79 One-Time Payment</h5>
                <p style={{ fontSize: '14px', color: 'var(--primary)', fontWeight: '600', letterSpacing: '0.5px' }}>
                  No Subscription &nbsp;•&nbsp; Instant Access
                </p>
              </div>
              <div className="pricing-plans-text">
                <i className="flaticon-price-tag"></i>
                <p>Measure your focus, memory, stress levels, and daily performance with a personalized report and action plan.</p>
                <ul className="chek">
                  <li><img src="/assets/img/chek.png" alt="img" /> 5-Minute Online Assessment</li>
                  <li><img src="/assets/img/chek.png" alt="img" /> Personalized Cognitive Score</li>
                  <li><img src="/assets/img/chek.png" alt="img" /> AI-Powered Health Insights</li>
                  <li><img src="/assets/img/chek.png" alt="img" /> Action Steps to Improve Focus &amp; Energy</li>
                  <li><img src="/assets/img/chek.png" alt="img" /> Private &amp; Secure Results</li>
                </ul>

                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                  <a href="#" className="button btn"><span><span>Start My Assessment Now</span></span></a>
                </div>

                {/* Trust boosters */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  gap: '20px',
                  marginTop: '25px',
                  fontSize: '13px',
                  color: '#aaa'
                }}>
                  <span>🔒 Secure Checkout</span>
                  <span>📩 Instant Email Access</span>
                  <span>🇺🇸 Designed for USA Adults</span>
                </div>

                {/* Value comparison */}
                <p style={{
                  marginTop: '20px',
                  fontSize: '13px',
                  color: '#888',
                  textAlign: 'center',
                  fontStyle: 'italic'
                }}>
                  Less than one doctor visit. Get insights in minutes.
                </p>
              </div>
            </div>
          </div> 
        </div>
      </div>
    </section>
  );
};

export default Pricing;

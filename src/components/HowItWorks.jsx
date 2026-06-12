import React from 'react';

const HowItWorks = () => {
  return (
    <section id="how-it-works" style={{ background: '#F8FAFC', padding: '15px 0', fontFamily: "'Inter', sans-serif" }}>
      
      {/* --- TOP SECTION (scroll5.jpeg) --- */}
      <div className="container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 20px', marginBottom: '100px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#EFF6FF', padding: '6px 16px', borderRadius: '30px', marginBottom: '20px' }}>
            <i className="fa-regular fa-star" style={{ color: '#3B82F6', fontSize: '18px' }}></i>
            <span style={{ color: '#3B82F6', fontSize: '17px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>HOW TO ENGAGE WITH US</span>
          </div>
          <h2 style={{ fontSize: '52px', fontWeight: '800', color: '#0F172A', lineHeight: '1.2', marginBottom: '16px', letterSpacing: '-1px' }}>
            Get Your Limitless <span style={{ color: '#6366F1' }}>AI Report</span><br/>in 4 Simple Steps
          </h2>
          <p style={{ fontSize: '22px', color: '#64748B', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
            Start your journey to better brain health and a better life in less than 5 minutes.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', position: 'relative', marginBottom: '60px' }}>
          
          {/* Step 1 */}
          <div style={{ background: '#FFF', borderRadius: '24px', padding: '32px 24px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6', fontSize: '28px', marginBottom: '16px' }}>
              <i className="fa-regular fa-user"></i>
            </div>
            <div style={{ color: '#3B82F6', fontSize: '18px', fontWeight: '800', letterSpacing: '1px', marginBottom: '8px' }}>STEP 1</div>
            <h4 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>Create Your Account</h4>
            <p style={{ fontSize: '18px', color: '#64748B', marginBottom: '24px', lineHeight: '1.5' }}>Sign up in less than 30 seconds.<br/>Secure your account.</p>
            
            {/* Form Mockup */}
            <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '16px', width: '100%', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFF', border: '1px solid #E2E8F0', padding: '10px 12px', borderRadius: '8px', marginBottom: '12px' }}>
                <i className="fa-regular fa-user" style={{ color: '#94A3B8', fontSize: '16px' }}></i>
                <span style={{ color: '#94A3B8', fontSize: '16px' }}>Full Name</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFF', border: '1px solid #E2E8F0', padding: '10px 12px', borderRadius: '8px', marginBottom: '12px' }}>
                <i className="fa-regular fa-envelope" style={{ color: '#94A3B8', fontSize: '16px' }}></i>
                <span style={{ color: '#94A3B8', fontSize: '16px' }}>Email Address</span>
              </div>
              <div style={{ background: '#3B82F6', color: '#FFF', padding: '10px', borderRadius: '8px', fontSize: '18px', fontWeight: '600', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
                Register Now <i className="fa-solid fa-angle-right" style={{ fontSize: '14px' }}></i>
              </div>
            </div>
            <div style={{ fontSize: '16px', color: '#64748B', marginTop: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <i className="fa-solid fa-shield-halved"></i> 100% Secure & Private
            </div>
          </div>

          {/* Step 2 */}
          <div style={{ background: '#FFF', borderRadius: '24px', padding: '32px 24px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A855F7', fontSize: '28px', marginBottom: '16px' }}>
              <i className="fa-solid fa-clipboard-list"></i>
            </div>
            <div style={{ color: '#A855F7', fontSize: '18px', fontWeight: '800', letterSpacing: '1px', marginBottom: '8px' }}>STEP 2</div>
            <h4 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>Choose Assessment</h4>
            <p style={{ fontSize: '18px', color: '#64748B', marginBottom: '24px', lineHeight: '1.5' }}>Select the assessment that<br/>fits your needs.</p>
            
            {/* List Mockup */}
            <div style={{ background: '#FFF', borderRadius: '16px', width: '100%', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-brain" style={{ color: '#64748B', fontSize: '16px' }}></i> <span style={{ fontSize: '16px', color: '#0F172A', fontWeight: '600' }}>Mental Health</span></div>
                <i className="fa-solid fa-angle-right" style={{ color: '#94A3B8', fontSize: '14px' }}></i>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-venus" style={{ color: '#64748B', fontSize: '16px' }}></i> <span style={{ fontSize: '16px', color: '#0F172A', fontWeight: '600' }}>Women's Health</span></div>
                <i className="fa-solid fa-angle-right" style={{ color: '#94A3B8', fontSize: '14px' }}></i>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-heart" style={{ color: '#64748B', fontSize: '16px' }}></i> <span style={{ fontSize: '16px', color: '#0F172A', fontWeight: '600' }}>Sexual Health</span></div>
                <i className="fa-solid fa-angle-right" style={{ color: '#94A3B8', fontSize: '14px' }}></i>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-mars" style={{ color: '#64748B', fontSize: '16px' }}></i> <span style={{ fontSize: '16px', color: '#0F172A', fontWeight: '600' }}>Men's Health</span></div>
                <i className="fa-solid fa-angle-right" style={{ color: '#94A3B8', fontSize: '14px' }}></i>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div style={{ background: '#FFF', borderRadius: '24px', padding: '32px 24px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', fontSize: '28px', marginBottom: '16px' }}>
              <i className="fa-regular fa-credit-card"></i>
            </div>
            <div style={{ color: '#10B981', fontSize: '18px', fontWeight: '800', letterSpacing: '1px', marginBottom: '8px' }}>STEP 3</div>
            <h4 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>Secure Payment</h4>
            <p style={{ fontSize: '18px', color: '#64748B', marginBottom: '24px', lineHeight: '1.5' }}>Fast, secure & encrypted<br/>payment process.</p>
            
            {/* Stripe Mockup */}
            <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '20px', width: '100%', border: '1px solid #E2E8F0', marginTop: 'auto' }}>
              <div style={{ fontSize: '16px', color: '#64748B', marginBottom: '12px', fontWeight: '600' }}>Powered by <span style={{ color: '#6366F1', fontWeight: '800' }}>stripe</span></div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
                <div style={{ background: '#FFF', border: '1px solid #E2E8F0', padding: '4px 8px', borderRadius: '4px', fontSize: '16px', fontWeight: '800', color: '#1E3A8A' }}>VISA</div>
                <div style={{ background: '#FFF', border: '1px solid #E2E8F0', padding: '4px 8px', borderRadius: '4px', display: 'flex', gap: '2px' }}>
                  <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#EF4444' }}></div>
                  <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#F59E0B', marginLeft: '-6px' }}></div>
                </div>
                <div style={{ background: '#FFF', border: '1px solid #E2E8F0', padding: '4px 8px', borderRadius: '4px', fontSize: '16px', fontWeight: '800', color: '#2563EB' }}>AMEX</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '16px', color: '#64748B' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><i className="fa-solid fa-lock" style={{ color: '#10B981' }}></i> 256-bit SSL Encryption</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><i className="fa-solid fa-shield-check" style={{ color: '#10B981' }}></i> 100% Secure Payment</div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div style={{ background: '#FFF', borderRadius: '24px', padding: '32px 24px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B', fontSize: '28px', marginBottom: '16px' }}>
              <i className="fa-regular fa-circle-check"></i>
            </div>
            <div style={{ color: '#F59E0B', fontSize: '18px', fontWeight: '800', letterSpacing: '1px', marginBottom: '8px' }}>STEP 4</div>
            <h4 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>Get AI Report Instantly</h4>
            <p style={{ fontSize: '18px', color: '#64748B', marginBottom: '24px', lineHeight: '1.5' }}>Receive your personalized AI report<br/>immediately after payment.</p>
            
            {/* Report Mockup */}
            <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '20px', width: '100%', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ background: '#FFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px', width: '100%' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '4px solid #10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>78</div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ width: '100%', height: '4px', background: '#E2E8F0', borderRadius: '2px' }}></div>
                  <div style={{ width: '60%', height: '4px', background: '#3B82F6', borderRadius: '2px' }}></div>
                  <div style={{ width: '80%', height: '4px', background: '#A855F7', borderRadius: '2px' }}></div>
                </div>
              </div>
              <div style={{ background: '#F97316', color: '#FFF', padding: '12px', borderRadius: '8px', fontSize: '18px', fontWeight: '700', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
                View My AI Report <i className="fa-solid fa-angle-right" style={{ fontSize: '14px' }}></i>
              </div>
            </div>
            <div style={{ fontSize: '16px', color: '#64748B', marginTop: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <i className="fa-regular fa-envelope"></i> Delivered instantly
            </div>
          </div>

        </div>

        {/* Bottom Trust Bar */}
        <div style={{ background: '#F1F5F9', borderRadius: '24px', padding: '32px 40px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6', fontSize: '24px' }}><i className="fa-solid fa-shield-check"></i></div>
            <div>
              <h5 style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', margin: '0 0 4px 0' }}>Your Privacy Matters</h5>
              <p style={{ fontSize: '17px', color: '#64748B', margin: 0 }}>We never share your data.</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', fontSize: '24px' }}><i className="fa-solid fa-flask"></i></div>
            <div>
              <h5 style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', margin: '0 0 4px 0' }}>Backed by Science</h5>
              <p style={{ fontSize: '17px', color: '#64748B', margin: 0 }}>Built on validated research.</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A855F7', fontSize: '24px' }}><i className="fa-solid fa-users"></i></div>
            <div>
              <h5 style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', margin: '0 0 4px 0' }}>Trusted by Thousands</h5>
              <p style={{ fontSize: '17px', color: '#64748B', margin: 0 }}>2,300+ assessments completed.</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B', fontSize: '24px' }}><i className="fa-solid fa-trophy"></i></div>
            <div>
              <h5 style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', margin: '0 0 4px 0' }}>Actionable Results</h5>
              <p style={{ fontSize: '17px', color: '#64748B', margin: 0 }}>Insights you can act on today.</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1200px) {
          .steps-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .steps-grid { grid-template-columns: 1fr !important; }
          #how-it-works { padding: 60px 0 !important; }
          #how-it-works h2 { font-size: 32px !important; line-height: 1.2 !important; }
          .container { padding: 0 16px !important; }
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;

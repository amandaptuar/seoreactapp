import React from 'react';

const HowItWorks = () => {
  return (
    <section id="how-it-works" style={{ background: '#F8FAFC', padding: '15px 0', fontFamily: "'Inter', sans-serif" }}>
      
      {/* --- TOP SECTION (scroll5.jpeg) --- */}
      <div className="container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 20px', marginBottom: '100px' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#EFF6FF', padding: '6px 16px', borderRadius: '30px', marginBottom: '20px' }}>
            <i className="fa-regular fa-star" style={{ color: '#3B82F6', fontSize: '16px' }}></i>
            <span style={{ color: '#3B82F6', fontSize: '15px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>HOW TO ENGAGE WITH US</span>
          </div>
          <h2 style={{ fontSize: '50px', fontWeight: '800', color: '#0F172A', lineHeight: '1.2', marginBottom: '16px', letterSpacing: '-1px' }}>
            Get Your Limitless <span style={{ color: '#6366F1' }}>AI Report</span><br/>in 4 Simple Steps
          </h2>
          <p style={{ fontSize: '20px', color: '#64748B', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
            Start your journey to better brain health and a better life in less than 5 minutes.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', position: 'relative', marginBottom: '60px' }}>
          
          {/* Step 1 */}
          <div style={{ background: '#FFF', borderRadius: '24px', padding: '32px 24px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6', fontSize: '26px', marginBottom: '16px' }}>
              <i className="fa-regular fa-user"></i>
            </div>
            <div style={{ color: '#3B82F6', fontSize: '16px', fontWeight: '800', letterSpacing: '1px', marginBottom: '8px' }}>STEP 1</div>
            <h4 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>Create Your Account</h4>
            <p style={{ fontSize: '16px', color: '#64748B', marginBottom: '24px', lineHeight: '1.5' }}>Sign up in less than 30 seconds.<br/>Secure your account.</p>
            
            {/* Form Mockup */}
            <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '16px', width: '100%', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFF', border: '1px solid #E2E8F0', padding: '10px 12px', borderRadius: '8px', marginBottom: '12px' }}>
                <i className="fa-regular fa-user" style={{ color: '#94A3B8', fontSize: '14px' }}></i>
                <span style={{ color: '#94A3B8', fontSize: '14px' }}>Full Name</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFF', border: '1px solid #E2E8F0', padding: '10px 12px', borderRadius: '8px', marginBottom: '12px' }}>
                <i className="fa-regular fa-envelope" style={{ color: '#94A3B8', fontSize: '14px' }}></i>
                <span style={{ color: '#94A3B8', fontSize: '14px' }}>Email Address</span>
              </div>
              <div style={{ background: '#3B82F6', color: '#FFF', padding: '10px', borderRadius: '8px', fontSize: '16px', fontWeight: '600', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
                Register Now <i className="fa-solid fa-angle-right" style={{ fontSize: '12px' }}></i>
              </div>
            </div>
            <div style={{ fontSize: '14px', color: '#64748B', marginTop: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <i className="fa-solid fa-shield-halved"></i> 100% Secure & Private
            </div>
          </div>

          {/* Step 2 */}
          <div style={{ background: '#FFF', borderRadius: '24px', padding: '32px 24px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A855F7', fontSize: '26px', marginBottom: '16px' }}>
              <i className="fa-solid fa-clipboard-list"></i>
            </div>
            <div style={{ color: '#A855F7', fontSize: '16px', fontWeight: '800', letterSpacing: '1px', marginBottom: '8px' }}>STEP 2</div>
            <h4 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>Choose Assessment</h4>
            <p style={{ fontSize: '16px', color: '#64748B', marginBottom: '24px', lineHeight: '1.5' }}>Select the assessment that<br/>fits your needs.</p>
            
            {/* List Mockup */}
            <div style={{ background: '#FFF', borderRadius: '16px', width: '100%', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-brain" style={{ color: '#64748B', fontSize: '14px' }}></i> <span style={{ fontSize: '14px', color: '#0F172A', fontWeight: '600' }}>Mental Health</span></div>
                <i className="fa-solid fa-angle-right" style={{ color: '#94A3B8', fontSize: '12px' }}></i>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-venus" style={{ color: '#64748B', fontSize: '14px' }}></i> <span style={{ fontSize: '14px', color: '#0F172A', fontWeight: '600' }}>Women's Health</span></div>
                <i className="fa-solid fa-angle-right" style={{ color: '#94A3B8', fontSize: '12px' }}></i>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px', borderBottom: '1px solid #E2E8F0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-heart" style={{ color: '#64748B', fontSize: '14px' }}></i> <span style={{ fontSize: '14px', color: '#0F172A', fontWeight: '600' }}>Sexual Health</span></div>
                <i className="fa-solid fa-angle-right" style={{ color: '#94A3B8', fontSize: '12px' }}></i>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><i className="fa-solid fa-mars" style={{ color: '#64748B', fontSize: '14px' }}></i> <span style={{ fontSize: '14px', color: '#0F172A', fontWeight: '600' }}>Men's Health</span></div>
                <i className="fa-solid fa-angle-right" style={{ color: '#94A3B8', fontSize: '12px' }}></i>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div style={{ background: '#FFF', borderRadius: '24px', padding: '32px 24px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', fontSize: '26px', marginBottom: '16px' }}>
              <i className="fa-regular fa-credit-card"></i>
            </div>
            <div style={{ color: '#10B981', fontSize: '16px', fontWeight: '800', letterSpacing: '1px', marginBottom: '8px' }}>STEP 3</div>
            <h4 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>Secure Payment</h4>
            <p style={{ fontSize: '16px', color: '#64748B', marginBottom: '24px', lineHeight: '1.5' }}>Fast, secure & encrypted<br/>payment process.</p>
            
            {/* Stripe Mockup */}
            <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '20px', width: '100%', border: '1px solid #E2E8F0', marginTop: 'auto' }}>
              <div style={{ fontSize: '14px', color: '#64748B', marginBottom: '12px', fontWeight: '600' }}>Powered by <span style={{ color: '#6366F1', fontWeight: '800' }}>stripe</span></div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '20px' }}>
                <div style={{ background: '#FFF', border: '1px solid #E2E8F0', padding: '4px 8px', borderRadius: '4px', fontSize: '14px', fontWeight: '800', color: '#1E3A8A' }}>VISA</div>
                <div style={{ background: '#FFF', border: '1px solid #E2E8F0', padding: '4px 8px', borderRadius: '4px', display: 'flex', gap: '2px' }}>
                  <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#EF4444' }}></div>
                  <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: '#F59E0B', marginLeft: '-6px' }}></div>
                </div>
                <div style={{ background: '#FFF', border: '1px solid #E2E8F0', padding: '4px 8px', borderRadius: '4px', fontSize: '14px', fontWeight: '800', color: '#2563EB' }}>AMEX</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#64748B' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><i className="fa-solid fa-lock" style={{ color: '#10B981' }}></i> 256-bit SSL Encryption</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><i className="fa-solid fa-shield-check" style={{ color: '#10B981' }}></i> 100% Secure Payment</div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div style={{ background: '#FFF', borderRadius: '24px', padding: '32px 24px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
            <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B', fontSize: '26px', marginBottom: '16px' }}>
              <i className="fa-regular fa-circle-check"></i>
            </div>
            <div style={{ color: '#F59E0B', fontSize: '16px', fontWeight: '800', letterSpacing: '1px', marginBottom: '8px' }}>STEP 4</div>
            <h4 style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>Get AI Report Instantly</h4>
            <p style={{ fontSize: '16px', color: '#64748B', marginBottom: '24px', lineHeight: '1.5' }}>Receive your personalized AI report<br/>immediately after payment.</p>
            
            {/* Report Mockup */}
            <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '20px', width: '100%', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ background: '#FFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px', width: '100%' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '4px solid #10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: '800', color: '#0F172A' }}>78</div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div style={{ width: '100%', height: '4px', background: '#E2E8F0', borderRadius: '2px' }}></div>
                  <div style={{ width: '60%', height: '4px', background: '#3B82F6', borderRadius: '2px' }}></div>
                  <div style={{ width: '80%', height: '4px', background: '#A855F7', borderRadius: '2px' }}></div>
                </div>
              </div>
              <div style={{ background: '#F97316', color: '#FFF', padding: '12px', borderRadius: '8px', fontSize: '16px', fontWeight: '700', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px' }}>
                View My AI Report <i className="fa-solid fa-angle-right" style={{ fontSize: '12px' }}></i>
              </div>
            </div>
            <div style={{ fontSize: '14px', color: '#64748B', marginTop: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <i className="fa-regular fa-envelope"></i> Delivered instantly
            </div>
          </div>

        </div>

        {/* Bottom Trust Bar */}
        <div style={{ background: '#F1F5F9', borderRadius: '24px', padding: '32px 40px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6', fontSize: '22px' }}><i className="fa-solid fa-shield-check"></i></div>
            <div>
              <h5 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: '0 0 4px 0' }}>Your Privacy Matters</h5>
              <p style={{ fontSize: '15px', color: '#64748B', margin: 0 }}>We never share your data.</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', fontSize: '22px' }}><i className="fa-solid fa-flask"></i></div>
            <div>
              <h5 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: '0 0 4px 0' }}>Backed by Science</h5>
              <p style={{ fontSize: '15px', color: '#64748B', margin: 0 }}>Built on validated research.</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A855F7', fontSize: '22px' }}><i className="fa-solid fa-users"></i></div>
            <div>
              <h5 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: '0 0 4px 0' }}>Trusted by Thousands</h5>
              <p style={{ fontSize: '15px', color: '#64748B', margin: 0 }}>2,300+ assessments completed.</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B', fontSize: '22px' }}><i className="fa-solid fa-trophy"></i></div>
            <div>
              <h5 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', margin: '0 0 4px 0' }}>Actionable Results</h5>
              <p style={{ fontSize: '15px', color: '#64748B', margin: 0 }}>Insights you can act on today.</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- BOTTOM SECTION (scroll3.jpeg) --- */}
      <div className="container overflow-hidden w-full max-w-full" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 20px' }}>
        <div className="report-main-grid w-full" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '60px', alignItems: 'center' }}>
          
          {/* Left Text */}
          <div style={{ paddingLeft: '20px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#EFF6FF', padding: '6px 16px', borderRadius: '30px', marginBottom: '20px' }}>
              <i className="fa-regular fa-star" style={{ color: '#3B82F6', fontSize: '16px' }}></i>
              <span style={{ color: '#3B82F6', fontSize: '15px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>WHAT LIMITLESS OFFERS</span>
            </div>
            
            <h2 style={{ fontSize: '50px', fontWeight: '800', color: '#0F172A', lineHeight: '1.1', marginBottom: '24px', letterSpacing: '-1px' }}>
              Your AI Report.<br/>
              Deep Insights.<br/>
              <span style={{ color: '#3B82F6' }}>Better Decisions.</span>
            </h2>
            
            <p style={{ fontSize: '20px', color: '#64748B', lineHeight: '1.6', marginBottom: '40px' }}>
              Your personalized AI report shows your current status, key insights, and an action plan to improve your overall well-being.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6', fontSize: '22px', flexShrink: 0 }}><i className="fa-solid fa-chart-pie"></i></div>
                <div>
                  <h5 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', margin: '0 0 8px 0' }}>AI-Powered Analysis</h5>
                  <p style={{ fontSize: '17px', color: '#64748B', margin: 0, lineHeight: '1.5' }}>Advanced algorithms analyze 50+ cognitive, behavioral & health factors.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B', fontSize: '22px', flexShrink: 0 }}><i className="fa-regular fa-lightbulb"></i></div>
                <div>
                  <h5 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', margin: '0 0 8px 0' }}>Personalized Insights</h5>
                  <p style={{ fontSize: '17px', color: '#64748B', margin: 0, lineHeight: '1.5' }}>Get a deep understanding of your strengths, weaknesses & risk areas.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', fontSize: '22px', flexShrink: 0 }}><i className="fa-solid fa-thumbtack"></i></div>
                <div>
                  <h5 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', margin: '0 0 8px 0' }}>Actionable Recommendations</h5>
                  <p style={{ fontSize: '17px', color: '#64748B', margin: 0, lineHeight: '1.5' }}>Receive expert-backed suggestions tailored to you.</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#F3F4F6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', fontSize: '22px', flexShrink: 0 }}><i className="fa-solid fa-arrow-trend-up"></i></div>
                <div>
                  <h5 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', margin: '0 0 8px 0' }}>Track & Improve</h5>
                  <p style={{ fontSize: '17px', color: '#64748B', margin: 0, lineHeight: '1.5' }}>Monitor your progress and see real improvements over time.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Dashboard Mockup */}
          <div style={{ background: '#FFF', borderRadius: '24px', padding: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', border: '1px solid #F1F5F9', width: '100%', maxWidth: '900px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#0F172A', margin: 0 }}>Your AI Report Overview</h3>
              <div style={{ color: '#3B82F6', fontSize: '16px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', background: '#EFF6FF', padding: '8px 16px', borderRadius: '8px' }}>
                <i className="fa-solid fa-download"></i> Download Report
              </div>
            </div>

            {/* Score Cards Row */}
            <div className="report-cards-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', background: '#FFF' }}>
                <div style={{ fontSize: '15px', color: '#64748B', fontWeight: '600', marginBottom: '8px' }}>Overall Cognitive Score</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '38px', fontWeight: '800', color: '#0F172A', lineHeight: '1' }}>78</span>
                  <span style={{ fontSize: '16px', color: '#94A3B8' }}>/100</span>
                  <span style={{ fontSize: '16px', color: '#10B981', fontWeight: '600' }}>Good</span>
                </div>
                <div style={{ width: '100%', height: '4px', background: '#E2E8F0', borderRadius: '2px', overflow: 'hidden', marginBottom: '16px' }}>
                  <div style={{ width: '78%', height: '100%', background: '#10B981', borderRadius: '2px' }}></div>
                </div>
                <div style={{ fontSize: '14px', color: '#64748B', lineHeight: '1.4' }}>You're performing better than 78% of people in your age group.</div>
              </div>
              
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', background: '#FFF' }}>
                <div style={{ fontSize: '15px', color: '#64748B', fontWeight: '600', marginBottom: '8px' }}>Mental Well-being</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '38px', fontWeight: '800', color: '#0F172A', lineHeight: '1' }}>72</span>
                  <span style={{ fontSize: '16px', color: '#94A3B8' }}>/100</span>
                  <span style={{ fontSize: '16px', color: '#10B981', fontWeight: '600' }}>Good</span>
                </div>
                <svg width="100%" height="30" viewBox="0 0 100 30" preserveAspectRatio="none"><path d="M0,15 Q25,30 50,15 T100,15" fill="none" stroke="#8B5CF6" strokeWidth="2"/></svg>
              </div>

              <div style={{ border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', background: '#FFF' }}>
                <div style={{ fontSize: '15px', color: '#64748B', fontWeight: '600', marginBottom: '8px' }}>Focus & Attention</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '38px', fontWeight: '800', color: '#0F172A', lineHeight: '1' }}>81</span>
                  <span style={{ fontSize: '16px', color: '#94A3B8' }}>/100</span>
                  <span style={{ fontSize: '16px', color: '#10B981', fontWeight: '600' }}>Excellent</span>
                </div>
                <svg width="100%" height="30" viewBox="0 0 100 30" preserveAspectRatio="none"><path d="M0,20 Q25,5 50,20 T100,20" fill="none" stroke="#10B981" strokeWidth="2"/></svg>
              </div>

              <div style={{ border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', background: '#FFF' }}>
                <div style={{ fontSize: '15px', color: '#64748B', fontWeight: '600', marginBottom: '8px' }}>Stress Level</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '38px', fontWeight: '800', color: '#0F172A', lineHeight: '1' }}>35</span>
                  <span style={{ fontSize: '16px', color: '#94A3B8' }}>/100</span>
                  <span style={{ fontSize: '16px', color: '#F59E0B', fontWeight: '600' }}>Low</span>
                </div>
                <svg width="100%" height="30" viewBox="0 0 100 30" preserveAspectRatio="none"><path d="M0,15 Q25,0 50,15 T100,15" fill="none" stroke="#F59E0B" strokeWidth="2"/></svg>
              </div>
            </div>

            {/* Bottom 3 Columns Row */}
            <div className="report-cards-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
              
              <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '20px' }}>
                <h5 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', marginBottom: '16px' }}>Key Insights</h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0F172A', fontWeight: '700', fontSize: '16px', marginBottom: '4px' }}><i className="fa-solid fa-circle-check" style={{ color: '#10B981' }}></i> Your memory is strong</div>
                    <div style={{ color: '#64748B', fontSize: '14px', paddingLeft: '24px' }}>Keep engaging in cognitive exercises.</div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0F172A', fontWeight: '700', fontSize: '16px', marginBottom: '4px' }}><i className="fa-solid fa-triangle-exclamation" style={{ color: '#F97316' }}></i> Stress is slightly elevated</div>
                    <div style={{ color: '#64748B', fontSize: '14px', paddingLeft: '24px' }}>Try mindfulness and breathing exercises.</div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0F172A', fontWeight: '700', fontSize: '16px', marginBottom: '4px' }}><i className="fa-solid fa-circle-info" style={{ color: '#3B82F6' }}></i> Focus can be improved</div>
                    <div style={{ color: '#64748B', fontSize: '14px', paddingLeft: '24px' }}>Limit distractions & maintain routine.</div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0F172A', fontWeight: '700', fontSize: '16px', marginBottom: '4px' }}><i className="fa-solid fa-circle-check" style={{ color: '#10B981' }}></i> Excellent decision-making skills</div>
                    <div style={{ color: '#64748B', fontSize: '14px', paddingLeft: '24px' }}>Keep up the good work!</div>
                  </div>
                </div>
              </div>

              <div style={{ border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px' }}>
                <h5 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', marginBottom: '16px' }}>Personalized Action Plan</h5>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#475569', fontSize: '15px' }}><i className="fa-regular fa-square-check" style={{ color: '#10B981', marginTop: '2px' }}></i> Practice 15 mins of mindfulness daily</div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#475569', fontSize: '15px' }}><i className="fa-regular fa-square-check" style={{ color: '#10B981', marginTop: '2px' }}></i> Improve sleep quality (7-8 hours)</div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#475569', fontSize: '15px' }}><i className="fa-regular fa-square-check" style={{ color: '#10B981', marginTop: '2px' }}></i> Engage in brain training 3x week</div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', color: '#475569', fontSize: '15px' }}><i className="fa-regular fa-square-check" style={{ color: '#10B981', marginTop: '2px' }}></i> Stay hydrated & balanced diet</div>
                </div>
                <div style={{ color: '#3B82F6', fontSize: '15px', fontWeight: '600', cursor: 'pointer' }}>View Full Action Plan <i className="fa-solid fa-arrow-right"></i></div>
              </div>

              <div style={{ border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px' }}>
                <h5 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', marginBottom: '16px' }}>Report Summary</h5>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
                  <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '12px solid #E2E8F0', borderTopColor: '#10B981', borderRightColor: '#10B981', borderBottomColor: '#10B981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <span style={{ fontSize: '26px', fontWeight: '800', color: '#0F172A', lineHeight: '1' }}>78</span>
                    <span style={{ fontSize: '12px', color: '#64748B' }}>Score</span>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', color: '#64748B' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#10B981' }}></div> Excellent (80-100)</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#3B82F6' }}></div> Good (60-79)</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#F59E0B' }}></div> Average (40-59)</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#EF4444' }}></div> Needs Attention (0-39)</div>
                </div>
              </div>

            </div>

            {/* Bottom Inner Trust Bar */}
            <div className="report-trust-grid" style={{ background: '#F8FAFC', borderRadius: '16px', padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', border: '1px solid #E2E8F0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ color: '#3B82F6', fontSize: '26px' }}><i className="fa-solid fa-shield-halved"></i></div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A' }}>100% Private & Secure</div>
                  <div style={{ fontSize: '13px', color: '#64748B' }}>Your data is encrypted and never shared.</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ color: '#8B5CF6', fontSize: '26px' }}><i className="fa-solid fa-atom"></i></div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A' }}>Science-Backed</div>
                  <div style={{ fontSize: '13px', color: '#64748B' }}>Reports built using validated cognitive models.</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ color: '#3B82F6', fontSize: '26px' }}><i className="fa-solid fa-chart-simple"></i></div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A' }}>Actionable Results</div>
                  <div style={{ fontSize: '13px', color: '#64748B' }}>Insights you can understand and act on.</div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      <style>{`
        @media (max-width: 1200px) {
          .steps-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .report-main-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .steps-grid { grid-template-columns: 1fr !important; }
          #how-it-works { padding: 60px 0 !important; }
          #how-it-works h2 { font-size: 32px !important; line-height: 1.2 !important; }
          .container { padding: 0 16px !important; }
          .report-cards-grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
          .report-cards-grid-3 { grid-template-columns: 1fr !important; }
          .report-trust-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .report-cards-grid-4 { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;

import React from 'react';

const HowItWorks = () => {
  return (
    <section id="how-it-works" style={{ background: '#F8FAFC', padding: '100px 0' }}>
      <div className="container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Top Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '42px', fontWeight: '800', color: '#0F172A', lineHeight: '1.2', letterSpacing: '-1px', marginBottom: '16px' }}>
            Get Your Limitless <span style={{ color: '#3B82F6' }}>AI Report</span> in 4 Simple Steps
          </h2>
          <p style={{ color: '#475569', fontSize: '16px', maxWidth: '700px', margin: '0 auto' }}>
            Start your journey to better brain health and a better life in less than 5 minutes.
          </p>
        </div>

        {/* 4 Steps Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '80px', position: 'relative' }}>
          
          {/* Step 1 */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '32px 24px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6', fontSize: '24px', margin: '0 auto 16px auto' }}>
              <i className="fa-regular fa-user"></i>
            </div>
            <span style={{ color: '#3B82F6', fontSize: '12px', fontWeight: '800', letterSpacing: '1px', marginBottom: '8px', textTransform: 'uppercase' }}>STEP 1</span>
            <h4 style={{ color: '#0F172A', fontSize: '16px', fontWeight: '800', marginBottom: '8px' }}>Create Your Account</h4>
            <p style={{ color: '#64748B', fontSize: '12px', marginBottom: '24px', lineHeight: '1.5' }}>Sign up in less than 30 seconds.<br/>Secure your account.</p>
            <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '16px', border: '1px solid #E2E8F0', marginTop: 'auto' }}>
              <input type="text" placeholder="Full Name" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '11px', marginBottom: '8px', outline: 'none' }} readOnly />
              <input type="email" placeholder="Email Address" style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '11px', marginBottom: '12px', outline: 'none' }} readOnly />
              <button style={{ width: '100%', background: '#3B82F6', color: '#FFF', border: 'none', borderRadius: '6px', padding: '8px', fontSize: '12px', fontWeight: '700' }}>Sign Up</button>
            </div>
          </div>

          {/* Step 2 */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '32px 24px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B5CF6', fontSize: '24px', margin: '0 auto 16px auto' }}>
              <i className="fa-regular fa-clipboard"></i>
            </div>
            <span style={{ color: '#8B5CF6', fontSize: '12px', fontWeight: '800', letterSpacing: '1px', marginBottom: '8px', textTransform: 'uppercase' }}>STEP 2</span>
            <h4 style={{ color: '#0F172A', fontSize: '16px', fontWeight: '800', marginBottom: '8px' }}>Choose Assessment</h4>
            <p style={{ color: '#64748B', fontSize: '12px', marginBottom: '24px', lineHeight: '1.5' }}>Select the assessment that<br/>fits your needs.</p>
            <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '16px', border: '1px solid #E2E8F0', marginTop: 'auto' }}>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#0F172A', fontWeight: '600', borderBottom: '1px solid #E2E8F0', paddingBottom: '6px' }}><span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><i className="fa-regular fa-user" style={{ color: '#64748B' }}></i> Mental Health Assessment</span> <i className="fa-solid fa-chevron-right" style={{ color: '#CBD5E1' }}></i></li>
                <li style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#0F172A', fontWeight: '600', borderBottom: '1px solid #E2E8F0', paddingBottom: '6px' }}><span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><i className="fa-solid fa-person-dress" style={{ color: '#64748B' }}></i> Women's Health Assessment</span> <i className="fa-solid fa-chevron-right" style={{ color: '#CBD5E1' }}></i></li>
                <li style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#0F172A', fontWeight: '600', borderBottom: '1px solid #E2E8F0', paddingBottom: '6px' }}><span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><i className="fa-solid fa-heart-pulse" style={{ color: '#64748B' }}></i> Sexual Health Assessment</span> <i className="fa-solid fa-chevron-right" style={{ color: '#CBD5E1' }}></i></li>
                <li style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#0F172A', fontWeight: '600', borderBottom: '1px solid #E2E8F0', paddingBottom: '6px' }}><span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><i className="fa-solid fa-person" style={{ color: '#64748B' }}></i> Men's Health Assessment</span> <i className="fa-solid fa-chevron-right" style={{ color: '#CBD5E1' }}></i></li>
                <li style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#0F172A', fontWeight: '600' }}><span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><i className="fa-solid fa-child" style={{ color: '#64748B' }}></i> Kids Monitoring Assessment</span> <i className="fa-solid fa-chevron-right" style={{ color: '#CBD5E1' }}></i></li>
              </ul>
            </div>
          </div>

          {/* Step 3 */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '32px 24px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', fontSize: '24px', margin: '0 auto 16px auto' }}>
              <i className="fa-regular fa-credit-card"></i>
            </div>
            <span style={{ color: '#10B981', fontSize: '12px', fontWeight: '800', letterSpacing: '1px', marginBottom: '8px', textTransform: 'uppercase' }}>STEP 3</span>
            <h4 style={{ color: '#0F172A', fontSize: '16px', fontWeight: '800', marginBottom: '8px' }}>Secure Payment</h4>
            <p style={{ color: '#64748B', fontSize: '12px', marginBottom: '24px', lineHeight: '1.5' }}>Fast, secure & encrypted<br/>payment process.</p>
            <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '16px', border: '1px solid #E2E8F0', marginTop: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <p style={{ fontSize: '10px', color: '#94A3B8', margin: 0, fontWeight: '700' }}>Powered by <span style={{ color: '#6366F1' }}>stripe</span></p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div style={{ width: '36px', height: '24px', background: '#FFF', border: '1px solid #E2E8F0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A1F71', fontSize: '10px', fontWeight: '800' }}>VISA</div>
                <div style={{ width: '36px', height: '24px', background: '#FFF', border: '1px solid #E2E8F0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#EB001B' }}></div>
                   <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#F79E1B', marginLeft: '-6px' }}></div>
                </div>
                <div style={{ width: '36px', height: '24px', background: '#FFF', border: '1px solid #E2E8F0', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#006FCF', fontSize: '8px', fontWeight: '800' }}>AMEX</div>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li style={{ fontSize: '10px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}><i className="fa-solid fa-lock" style={{ color: '#10B981' }}></i> 256-bit SSL Encryption</li>
                <li style={{ fontSize: '10px', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px' }}><i className="fa-solid fa-shield-check" style={{ color: '#10B981' }}></i> 100% Secure Payment</li>
              </ul>
            </div>
          </div>

          {/* Step 4 */}
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '32px 24px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F97316', fontSize: '24px', margin: '0 auto 16px auto' }}>
              <i className="fa-regular fa-circle-check"></i>
            </div>
            <span style={{ color: '#F97316', fontSize: '12px', fontWeight: '800', letterSpacing: '1px', marginBottom: '8px', textTransform: 'uppercase' }}>STEP 4</span>
            <h4 style={{ color: '#0F172A', fontSize: '16px', fontWeight: '800', marginBottom: '8px' }}>Get AI Report Instantly</h4>
            <p style={{ color: '#64748B', fontSize: '12px', marginBottom: '24px', lineHeight: '1.5' }}>Receive your personalized AI report<br/>immediately after payment.</p>
            <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '16px', border: '1px solid #E2E8F0', marginTop: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <i className="fa-solid fa-party-horn" style={{ fontSize: '32px', color: '#F59E0B' }}></i>
              <button style={{ width: '100%', background: 'linear-gradient(90deg, #F97316 0%, #EA580C 100%)', color: '#FFF', border: 'none', borderRadius: '6px', padding: '10px', fontSize: '12px', fontWeight: '700' }}>View My AI Report</button>
              <p style={{ fontSize: '10px', color: '#64748B', margin: 0, lineHeight: '1.4' }}>Delivered instantly to your dashboard and email.</p>
            </div>
          </div>

        </div>

        {/* Lower Dashboard Section */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '60px', alignItems: 'center', marginBottom: '60px' }}>
          
          {/* Left Text */}
          <div style={{ paddingRight: '20px' }}>
            <h3 style={{ fontSize: '32px', fontWeight: '800', color: '#0F172A', lineHeight: '1.2', marginBottom: '16px' }}>
              Your AI Report. Deep Insights.<br/>
              <span style={{ color: '#3B82F6' }}>Better Decisions.</span>
            </h3>
            <p style={{ color: '#64748B', fontSize: '15px', marginBottom: '32px', lineHeight: '1.6' }}>
              Your personalized AI report shows your current status, key insights, and an action plan to improve your overall well-being.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6', fontSize: '16px', flexShrink: 0 }}>
                  <i className="fa-solid fa-chart-pie"></i>
                </div>
                <div>
                  <h5 style={{ color: '#0F172A', fontSize: '15px', fontWeight: '800', margin: '0 0 4px 0' }}>AI-Powered Analysis</h5>
                  <p style={{ color: '#64748B', fontSize: '13px', margin: 0, lineHeight: '1.5' }}>Advanced algorithms analyze 50+ cognitive, behavioral & health factors.</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F97316', fontSize: '16px', flexShrink: 0 }}>
                  <i className="fa-solid fa-lightbulb"></i>
                </div>
                <div>
                  <h5 style={{ color: '#0F172A', fontSize: '15px', fontWeight: '800', margin: '0 0 4px 0' }}>Personalized Insights</h5>
                  <p style={{ color: '#64748B', fontSize: '13px', margin: 0, lineHeight: '1.5' }}>Get a deep understanding of your strengths, weaknesses & risk areas.</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', fontSize: '16px', flexShrink: 0 }}>
                  <i className="fa-solid fa-thumbtack"></i>
                </div>
                <div>
                  <h5 style={{ color: '#0F172A', fontSize: '15px', fontWeight: '800', margin: '0 0 4px 0' }}>Actionable Recommendations</h5>
                  <p style={{ color: '#64748B', fontSize: '13px', margin: 0, lineHeight: '1.5' }}>Receive expert-backed suggestions tailored to you.</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#F0FDF4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#22C55E', fontSize: '16px', flexShrink: 0 }}>
                  <i className="fa-solid fa-arrow-trend-up"></i>
                </div>
                <div>
                  <h5 style={{ color: '#0F172A', fontSize: '15px', fontWeight: '800', margin: '0 0 4px 0' }}>Track & Improve</h5>
                  <p style={{ color: '#64748B', fontSize: '13px', margin: 0, lineHeight: '1.5' }}>Monitor your progress and improve your scores over time.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Dashboard UI */}
          <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', border: '1px solid #E2E8F0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h4 style={{ color: '#0F172A', fontSize: '18px', fontWeight: '800', margin: 0 }}>Your AI Report Overview</h4>
              <button style={{ background: '#EFF6FF', color: '#3B82F6', border: 'none', borderRadius: '6px', padding: '6px 12px', fontSize: '12px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}><i className="fa-solid fa-download"></i> Download Report</button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
              <div style={{ background: '#FAFAFA', borderRadius: '12px', padding: '16px', border: '1px solid #E2E8F0' }}>
                <h6 style={{ color: '#64748B', fontSize: '11px', fontWeight: '700', margin: '0 0 8px 0' }}>Overall Cognitive Score</h6>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '32px', fontWeight: '800', color: '#0F172A', lineHeight: '1' }}>78</span>
                  <span style={{ fontSize: '12px', color: '#94A3B8' }}>/100</span>
                  <span style={{ color: '#10B981', fontSize: '11px', fontWeight: '700' }}>Good</span>
                </div>
                <div style={{ width: '100%', height: '4px', background: '#E2E8F0', borderRadius: '2px', marginTop: '12px', overflow: 'hidden' }}>
                  <div style={{ width: '78%', height: '100%', background: '#10B981', borderRadius: '2px' }}></div>
                </div>
                <p style={{ fontSize: '10px', color: '#94A3B8', margin: '8px 0 0 0', lineHeight: '1.3' }}>You're performing better than 78% of people in your age group.</p>
              </div>

              <div style={{ background: '#FAFAFA', borderRadius: '12px', padding: '16px', border: '1px solid #E2E8F0' }}>
                <h6 style={{ color: '#64748B', fontSize: '11px', fontWeight: '700', margin: '0 0 8px 0' }}>Mental Well-being</h6>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', lineHeight: '1' }}>72</span>
                  <span style={{ fontSize: '12px', color: '#94A3B8' }}>/100</span>
                  <span style={{ color: '#10B981', fontSize: '11px', fontWeight: '700' }}>Good</span>
                </div>
                <svg width="100%" height="30" style={{ marginTop: '12px' }}><path d="M0,20 Q15,5 30,15 T60,10 T90,20" fill="none" stroke="#8B5CF6" strokeWidth="2"/></svg>
              </div>

              <div style={{ background: '#FAFAFA', borderRadius: '12px', padding: '16px', border: '1px solid #E2E8F0' }}>
                <h6 style={{ color: '#64748B', fontSize: '11px', fontWeight: '700', margin: '0 0 8px 0' }}>Focus & Attention</h6>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', lineHeight: '1' }}>81</span>
                  <span style={{ fontSize: '12px', color: '#94A3B8' }}>/100</span>
                  <span style={{ color: '#10B981', fontSize: '11px', fontWeight: '700' }}>Excellent</span>
                </div>
                <svg width="100%" height="30" style={{ marginTop: '12px' }}><path d="M0,25 Q15,15 30,20 T60,10 T90,5" fill="none" stroke="#10B981" strokeWidth="2"/></svg>
              </div>

              <div style={{ background: '#FAFAFA', borderRadius: '12px', padding: '16px', border: '1px solid #E2E8F0' }}>
                <h6 style={{ color: '#64748B', fontSize: '11px', fontWeight: '700', margin: '0 0 8px 0' }}>Stress Level</h6>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                  <span style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', lineHeight: '1' }}>35</span>
                  <span style={{ fontSize: '12px', color: '#94A3B8' }}>/100</span>
                  <span style={{ color: '#F59E0B', fontSize: '11px', fontWeight: '700' }}>Low</span>
                </div>
                <svg width="100%" height="30" style={{ marginTop: '12px' }}><path d="M0,20 Q15,25 30,20 T60,25 T90,20" fill="none" stroke="#F59E0B" strokeWidth="2"/></svg>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr', gap: '16px' }}>
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
                <h6 style={{ color: '#0F172A', fontSize: '13px', fontWeight: '800', margin: '0 0 12px 0' }}>Key Insights</h6>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}><i className="fa-solid fa-circle-check" style={{ color: '#10B981', marginTop: '2px', fontSize: '12px' }}></i><div><p style={{ color: '#0F172A', fontSize: '11px', fontWeight: '700', margin: 0 }}>Your memory is strong</p><p style={{ color: '#64748B', fontSize: '10px', margin: 0 }}>Keep engaging in cognitive exercises.</p></div></li>
                  <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}><i className="fa-solid fa-triangle-exclamation" style={{ color: '#F59E0B', marginTop: '2px', fontSize: '12px' }}></i><div><p style={{ color: '#0F172A', fontSize: '11px', fontWeight: '700', margin: 0 }}>Stress is slightly elevated</p><p style={{ color: '#64748B', fontSize: '10px', margin: 0 }}>Try mindfulness and breathing exercises.</p></div></li>
                  <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}><i className="fa-solid fa-circle-info" style={{ color: '#3B82F6', marginTop: '2px', fontSize: '12px' }}></i><div><p style={{ color: '#0F172A', fontSize: '11px', fontWeight: '700', margin: 0 }}>Focus can be improved</p><p style={{ color: '#64748B', fontSize: '10px', margin: 0 }}>Limit distractions & maintain routine.</p></div></li>
                  <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}><i className="fa-solid fa-circle-check" style={{ color: '#10B981', marginTop: '2px', fontSize: '12px' }}></i><div><p style={{ color: '#0F172A', fontSize: '11px', fontWeight: '700', margin: 0 }}>Excellent decision-making skills</p><p style={{ color: '#64748B', fontSize: '10px', margin: 0 }}>Keep up the good work!</p></div></li>
                </ul>
              </div>
              
              <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px' }}>
                <h6 style={{ color: '#0F172A', fontSize: '13px', fontWeight: '800', margin: '0 0 12px 0' }}>Personalized Action Plan</h6>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '11px', color: '#475569' }}><i className="fa-regular fa-square-check" style={{ color: '#10B981', marginTop: '2px' }}></i> Practice 15 mins of mindfulness daily</li>
                  <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '11px', color: '#475569' }}><i className="fa-regular fa-square-check" style={{ color: '#10B981', marginTop: '2px' }}></i> Improve sleep quality (7-8 hours)</li>
                  <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '11px', color: '#475569' }}><i className="fa-regular fa-square-check" style={{ color: '#10B981', marginTop: '2px' }}></i> Engage in brain training 3x week</li>
                  <li style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '11px', color: '#475569' }}><i className="fa-regular fa-square-check" style={{ color: '#10B981', marginTop: '2px' }}></i> Stay hydrated & balanced diet</li>
                </ul>
                <a href="#" style={{ color: '#3B82F6', fontSize: '11px', fontWeight: '700', textDecoration: 'none', display: 'inline-block', marginTop: '12px' }}>View Full Action Plan <i className="fa-solid fa-arrow-right" style={{ fontSize: '10px' }}></i></a>
              </div>

              <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h6 style={{ color: '#0F172A', fontSize: '13px', fontWeight: '800', margin: '0 0 16px 0', alignSelf: 'flex-start' }}>Report Summary</h6>
                {/* CSS Donut Chart Mockup */}
                <div style={{ position: 'relative', width: '80px', height: '80px', borderRadius: '50%', background: 'conic-gradient(#10B981 0% 78%, #E2E8F0 78% 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                  <div style={{ width: '60px', height: '60px', background: '#FFF', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', lineHeight: '1' }}>78</span>
                    <span style={{ fontSize: '8px', color: '#64748B' }}>Score</span>
                  </div>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, width: '100%', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: '#64748B' }}><span style={{ width: '8px', height: '8px', background: '#10B981', borderRadius: '2px' }}></span> Excellent (80-100)</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: '#64748B' }}><span style={{ width: '8px', height: '8px', background: '#3B82F6', borderRadius: '2px' }}></span> Good (60-79)</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: '#64748B' }}><span style={{ width: '8px', height: '8px', background: '#F59E0B', borderRadius: '2px' }}></span> Average (40-59)</li>
                  <li style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', color: '#64748B' }}><span style={{ width: '8px', height: '8px', background: '#EF4444', borderRadius: '2px' }}></span> Needs Attention</li>
                </ul>
              </div>
            </div>
            
          </div>
        </div>

        {/* Bottom Trust Banner */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', flexWrap: 'wrap', padding: '24px 0', borderTop: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <img src="https://flagcdn.com/w20/us.png" alt="US" style={{ width: '20px', borderRadius: '50%' }} />
            <span style={{ fontSize: '13px', color: '#0F172A', fontWeight: '700' }}>Trusted by Thousands Across the USA</span>
          </div>
          <div style={{ width: '1px', background: '#E2E8F0' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fa-solid fa-shield-halved" style={{ color: '#8B5CF6' }}></i>
            <span style={{ fontSize: '13px', color: '#64748B', fontWeight: '500' }}>100% Private & Secure</span>
          </div>
          <div style={{ width: '1px', background: '#E2E8F0' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fa-solid fa-flask" style={{ color: '#10B981' }}></i>
            <span style={{ fontSize: '13px', color: '#64748B', fontWeight: '500' }}>Science-Backed Assessments</span>
          </div>
          <div style={{ width: '1px', background: '#E2E8F0' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fa-solid fa-bolt" style={{ color: '#F59E0B' }}></i>
            <span style={{ fontSize: '13px', color: '#64748B', fontWeight: '500' }}>Instant Results</span>
          </div>
          <div style={{ width: '1px', background: '#E2E8F0' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <i className="fa-solid fa-user-doctor" style={{ color: '#3B82F6' }}></i>
            <span style={{ fontSize: '13px', color: '#64748B', fontWeight: '500' }}>Trusted by Experts</span>
          </div>
        </div>

      </div>

      <style>{`
        @media (max-width: 1024px) {
          #how-it-works .container > div:nth-child(2) { grid-template-columns: repeat(2, 1fr); }
          #how-it-works .container > div:nth-child(3) { grid-template-columns: 1fr; }
          #how-it-works .container > div:nth-child(3) > div:last-child > div:nth-child(2) { grid-template-columns: repeat(2, 1fr); }
          #how-it-works .container > div:nth-child(3) > div:last-child > div:nth-child(3) { grid-template-columns: repeat(2, 1fr); }
          #how-it-works .container > div:nth-child(4) > div:nth-child(even) { display: none; }
        }
        @media (max-width: 768px) {
          #how-it-works .container > div:nth-child(2) { grid-template-columns: 1fr; }
          #how-it-works .container > div:nth-child(3) > div:last-child > div:nth-child(2) { grid-template-columns: 1fr; }
          #how-it-works .container > div:nth-child(3) > div:last-child > div:nth-child(3) { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;

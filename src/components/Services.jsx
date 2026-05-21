import React from 'react';

const Services = () => {
  return (
    <section id="services" className="services-section" style={{ background: '#FAFAFA', padding: '40px 0' }}>
      <div className="container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Top Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(59, 130, 246, 0.1)', padding: '6px 16px', borderRadius: '30px', marginBottom: '24px' }}>
            <i className="fa-solid fa-sparkles" style={{ color: '#F59E0B', fontSize: '14px' }}></i>
            <span style={{ color: '#3B82F6', fontSize: '13px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>Smart Assessments. Smarter You.</span>
          </div>

          <h2 style={{ fontSize: '58px', fontWeight: '800', color: '#0F172A', lineHeight: '1.2', letterSpacing: '-1px', marginBottom: '16px' }}>
            AI-Powered Assessments.<br/>
            Personalized Reports. <span style={{ color: '#3B82F6' }}>Better Life.</span>
          </h2>
          <p style={{ color: '#475569', fontSize: '22px', maxWidth: '700px', margin: '0 auto' }}>
            Limitless uses advanced AI and neuroscience to deliver deep insights that help you improve your brain performance, health, and overall well-being.
          </p>
        </div>

        {/* 5 Badges Row */}
        <div className="services-trust-banner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="https://flagcdn.com/w40/us.png" alt="US" style={{ width: '40px', borderRadius: '50%' }} />
            <div>
              <h5 style={{ fontSize: '17px', fontWeight: '700', color: '#0F172A', margin: '0 0 2px 0' }}>Trusted by<br/>Thousands in USA</h5>
              <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>Based on scientific<br/>research & data</p>
            </div>
          </div>
          <div style={{ width: '1px', background: '#E2E8F0' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B5CF6' }}>
              <i className="fa-solid fa-check"></i>
            </div>
            <div>
              <h5 style={{ fontSize: '17px', fontWeight: '700', color: '#0F172A', margin: '0 0 2px 0' }}>AI & Science<br/>Combined</h5>
              <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>Advanced algorithms<br/>& clinical validation</p>
            </div>
          </div>
          <div style={{ width: '1px', background: '#E2E8F0' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981' }}>
              <i className="fa-solid fa-lock"></i>
            </div>
            <div>
              <h5 style={{ fontSize: '17px', fontWeight: '700', color: '#0F172A', margin: '0 0 2px 0' }}>100% Private<br/>& Secure</h5>
              <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>Your data is encrypted<br/>and never shared</p>
            </div>
          </div>
          <div style={{ width: '1px', background: '#E2E8F0' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B' }}>
              <i className="fa-solid fa-bolt"></i>
            </div>
            <div>
              <h5 style={{ fontSize: '17px', fontWeight: '700', color: '#0F172A', margin: '0 0 2px 0' }}>Instant Results<br/>in Minutes</h5>
              <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>Get your detailed AI<br/>report instantly</p>
            </div>
          </div>
          <div style={{ width: '1px', background: '#E2E8F0' }}></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6' }}>
              <i className="fa-solid fa-check-double"></i>
            </div>
            <div>
              <h5 style={{ fontSize: '17px', fontWeight: '700', color: '#0F172A', margin: '0 0 2px 0' }}>Actionable<br/>Recommendations</h5>
              <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>Personalized steps to<br/>improve your life</p>
            </div>
          </div>
        </div>

        {/* 2-Column Section */}
        <div className="services-main-grid">
          
          {/* Left Column: Features List */}
          <div>
            <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', marginBottom: '24px' }}>Features of Limitless AI Assessments</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B5CF6', fontSize: '24px', flexShrink: 0 }}>
                  <i className="fa-solid fa-brain"></i>
                </div>
                <div>
                  <h5 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', margin: '0 0 4px 0' }}>AI-Powered Deep Analysis</h5>
                  <p style={{ fontSize: '16px', color: '#64748B', margin: 0, lineHeight: '1.4' }}>Advanced AI analyzes 50+ cognitive & behavioral factors to generate accurate insights.</p>
                </div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', fontSize: '24px', flexShrink: 0 }}>
                  <i className="fa-solid fa-bullseye"></i>
                </div>
                <div>
                  <h5 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', margin: '0 0 4px 0' }}>Science-Backed Accuracy</h5>
                  <p style={{ fontSize: '16px', color: '#64748B', margin: 0, lineHeight: '1.4' }}>Built on neuroscience, psychology & clinical research for reliable and meaningful results.</p>
                </div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B', fontSize: '24px', flexShrink: 0 }}>
                  <i className="fa-solid fa-chart-line"></i>
                </div>
                <div>
                  <h5 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', margin: '0 0 4px 0' }}>Instant, Easy & Convenient</h5>
                  <p style={{ fontSize: '16px', color: '#64748B', margin: 0, lineHeight: '1.4' }}>Complete your assessment in under 5 minutes and get results instantly.</p>
                </div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6', fontSize: '24px', flexShrink: 0 }}>
                  <i className="fa-solid fa-shield-halved"></i>
                </div>
                <div>
                  <h5 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', margin: '0 0 4px 0' }}>100% Private & Secure</h5>
                  <p style={{ fontSize: '16px', color: '#64748B', margin: 0, lineHeight: '1.4' }}>Your privacy is our priority. Your data is encrypted, secure, and never shared.</p>
                </div>
              </div>

              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(236, 72, 153, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EC4899', fontSize: '24px', flexShrink: 0 }}>
                  <i className="fa-regular fa-heart"></i>
                </div>
                <div>
                  <h5 style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A', margin: '0 0 4px 0' }}>Personalized Action Plan</h5>
                  <p style={{ fontSize: '16px', color: '#64748B', margin: 0, lineHeight: '1.4' }}>Get customized recommendations and daily practices to improve your brain and life.</p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Report Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', marginBottom: '24px' }}>Comprehensive AI Reports for Every You</h3>
            
            <div className="services-cards-grid">
              
              {/* Card 1 */}
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.02)', height: '100%' }}>
                <i className="fa-solid fa-brain" style={{ fontSize: '43px', color: '#8B5CF6', marginBottom: '16px' }}></i>
                <h5 style={{ fontSize: '17px', fontWeight: '700', color: '#0F172A', marginBottom: '12px', minHeight: '40px' }}>Brain Performance<br/>Report</h5>
                <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '16px', lineHeight: '1.5' }}>A complete analysis of your neuro-cognitive health and potential.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', textAlign: 'left', fontSize: '14px', color: '#64748B', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                  <li><span style={{ color: '#8B5CF6', marginRight: '6px' }}>•</span> Cognitive Score</li>
                  <li><span style={{ color: '#8B5CF6', marginRight: '6px' }}>•</span> Memory & Focus</li>
                  <li><span style={{ color: '#8B5CF6', marginRight: '6px' }}>•</span> Attention Span</li>
                  <li><span style={{ color: '#8B5CF6', marginRight: '6px' }}>•</span> Reaction Time</li>
                  <li><span style={{ color: '#8B5CF6', marginRight: '6px' }}>•</span> Mental Clarity</li>
                </ul>
                <button style={{ width: '100%', padding: '10px', background: '#8B5CF6', color: '#FFF', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}>Get Report</button>
              </div>

              {/* Card 2 */}
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.02)', height: '100%' }}>
                <i className="fa-solid fa-person-dress" style={{ fontSize: '43px', color: '#EC4899', marginBottom: '16px' }}></i>
                <h5 style={{ fontSize: '17px', fontWeight: '700', color: '#0F172A', marginBottom: '12px', minHeight: '40px' }}>Women's Health<br/>Report</h5>
                <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '16px', lineHeight: '1.5' }}>Actionable insights tailored to your unique hormonal profile.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', textAlign: 'left', fontSize: '14px', color: '#64748B', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                  <li><span style={{ color: '#EC4899', marginRight: '6px' }}>•</span> Hormonal Balance</li>
                  <li><span style={{ color: '#EC4899', marginRight: '6px' }}>•</span> Stress & Mood</li>
                  <li><span style={{ color: '#EC4899', marginRight: '6px' }}>•</span> Energy Levels</li>
                  <li><span style={{ color: '#EC4899', marginRight: '6px' }}>•</span> Sleep Quality</li>
                  <li><span style={{ color: '#EC4899', marginRight: '6px' }}>•</span> Menstrual Insights</li>
                </ul>
                <button style={{ width: '100%', padding: '10px', background: '#EC4899', color: '#FFF', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}>Get Report</button>
              </div>

              {/* Card 3 */}
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.02)', height: '100%' }}>
                <i className="fa-solid fa-heart-pulse" style={{ fontSize: '43px', color: '#14B8A6', marginBottom: '16px' }}></i>
                <h5 style={{ fontSize: '17px', fontWeight: '700', color: '#0F172A', marginBottom: '12px', minHeight: '40px' }}>Sexual Health<br/>Report</h5>
                <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '16px', lineHeight: '1.5' }}>Understand and optimize your physical vitality and performance.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', textAlign: 'left', fontSize: '14px', color: '#64748B', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                  <li><span style={{ color: '#14B8A6', marginRight: '6px' }}>•</span> Performance Health</li>
                  <li><span style={{ color: '#14B8A6', marginRight: '6px' }}>•</span> Hormonal Insights</li>
                  <li><span style={{ color: '#14B8A6', marginRight: '6px' }}>•</span> Libido & Wellness</li>
                  <li><span style={{ color: '#14B8A6', marginRight: '6px' }}>•</span> Confidence Score</li>
                  <li><span style={{ color: '#14B8A6', marginRight: '6px' }}>•</span> Personal Guidance</li>
                </ul>
                <button style={{ width: '100%', padding: '10px', background: '#14B8A6', color: '#FFF', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}>Get Report</button>
              </div>

              {/* Card 4 */}
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.02)', height: '100%' }}>
                <i className="fa-solid fa-person" style={{ fontSize: '43px', color: '#3B82F6', marginBottom: '16px' }}></i>
                <h5 style={{ fontSize: '17px', fontWeight: '700', color: '#0F172A', marginBottom: '12px', minHeight: '40px' }}>Men's Health<br/>Report</h5>
                <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '16px', lineHeight: '1.5' }}>Data-driven guidance to maximize strength and physiological balance.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', textAlign: 'left', fontSize: '14px', color: '#64748B', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                  <li><span style={{ color: '#3B82F6', marginRight: '6px' }}>•</span> Testosterone Levels</li>
                  <li><span style={{ color: '#3B82F6', marginRight: '6px' }}>•</span> Energy & Stamina</li>
                  <li><span style={{ color: '#3B82F6', marginRight: '6px' }}>•</span> Stress & Recovery</li>
                  <li><span style={{ color: '#3B82F6', marginRight: '6px' }}>•</span> Muscle & Fitness</li>
                  <li><span style={{ color: '#3B82F6', marginRight: '6px' }}>•</span> Men's Wellness</li>
                </ul>
                <button style={{ width: '100%', padding: '10px', background: '#3B82F6', color: '#FFF', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}>Get Report</button>
              </div>

              {/* Card 5 */}
              <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.02)', height: '100%' }}>
                <i className="fa-solid fa-arrow-trend-up" style={{ fontSize: '43px', color: '#F97316', marginBottom: '16px' }}></i>
                <h5 style={{ fontSize: '17px', fontWeight: '700', color: '#0F172A', marginBottom: '12px', minHeight: '40px' }}>Your Better Life<br/>Report</h5>
                <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '16px', lineHeight: '1.5' }}>A holistic roadmap designed to elevate your daily habits.</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', textAlign: 'left', fontSize: '14px', color: '#64748B', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                  <li><span style={{ color: '#F97316', marginRight: '6px' }}>•</span> Productivity Boost</li>
                  <li><span style={{ color: '#F97316', marginRight: '6px' }}>•</span> Emotional Balance</li>
                  <li><span style={{ color: '#F97316', marginRight: '6px' }}>•</span> Goal Achievement</li>
                  <li><span style={{ color: '#F97316', marginRight: '6px' }}>•</span> Habit Optimization</li>
                  <li><span style={{ color: '#F97316', marginRight: '6px' }}>•</span> Life Quality Score</li>
                </ul>
                <button style={{ width: '100%', padding: '10px', background: '#F97316', color: '#FFF', border: 'none', borderRadius: '8px', fontSize: '16px', fontWeight: '700', cursor: 'pointer' }}>Get Report</button>
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Dark Card */}
        <div className="services-bottom-bar">
          <h3 style={{ textAlign: 'center', fontSize: '29px', fontWeight: '800', color: '#FFFFFF', marginBottom: '32px' }}>Your Better Life Starts with Better Insights</h3>
          
          <div className="services-bottom-grid">
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B5CF6', fontSize: '24px', flexShrink: 0 }}>
                <i className="fa-solid fa-brain"></i>
              </div>
              <div>
                <h5 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700', margin: '0 0 4px 0' }}>Think Better</h5>
                <p style={{ color: '#94A3B8', fontSize: '14px', margin: 0, lineHeight: '1.4' }}>Improve memory, focus, and decision-making.</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', fontSize: '24px', flexShrink: 0 }}>
                <i className="fa-solid fa-bolt"></i>
              </div>
              <div>
                <h5 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700', margin: '0 0 4px 0' }}>Feel Better</h5>
                <p style={{ color: '#94A3B8', fontSize: '14px', margin: 0, lineHeight: '1.4' }}>Reduce stress, balance mood, and boost energy.</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(236, 72, 153, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EC4899', fontSize: '24px', flexShrink: 0 }}>
                <i className="fa-regular fa-heart"></i>
              </div>
              <div>
                <h5 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700', margin: '0 0 4px 0' }}>Perform Better</h5>
                <p style={{ color: '#94A3B8', fontSize: '14px', margin: 0, lineHeight: '1.4' }}>Enhance productivity, creativity, and confidence.</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6', fontSize: '24px', flexShrink: 0 }}>
                <i className="fa-regular fa-user"></i>
              </div>
              <div>
                <h5 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700', margin: '0 0 4px 0' }}>Live Better</h5>
                <p style={{ color: '#94A3B8', fontSize: '14px', margin: 0, lineHeight: '1.4' }}>Build healthy habits and a better lifestyle.</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B', fontSize: '24px', flexShrink: 0 }}>
                <i className="fa-solid fa-medal"></i>
              </div>
              <div>
                <h5 style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: '700', margin: '0 0 4px 0' }}>Be Your Best</h5>
                <p style={{ color: '#94A3B8', fontSize: '14px', margin: 0, lineHeight: '1.4' }}>Unlock your full potential and live your best life.</p>
              </div>
            </div>

          </div>
        </div>

      </div>

      <style>{`
        /* Desktop Base */
        .services-trust-banner { display: flex; justify-content: space-between; align-items: center; background: #F8FAFC; padding: 16px 24px; border-radius: 16px; border: 1px solid #E2E8F0; margin-bottom: 60px; }
        .services-main-grid { display: grid; grid-template-columns: 1fr 2fr; gap: 40px; margin-bottom: 60px; }
        .services-cards-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 16px; flex: 1; align-items: stretch; }
        .services-bottom-bar { background: #0F172A; border-radius: 24px; padding: 40px; box-shadow: 0 10px 40px rgba(0,0,0,0.04); position: relative; overflow: hidden; }
        .services-bottom-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; position: relative; z-index: 2; }

        /* Responsive Fixes */
        @media (max-width: 1024px) {
          .services-section h2 { font-size: 36px !important; }
          .services-trust-banner { display: grid !important; grid-template-columns: repeat(3, 1fr) !important; gap: 16px; }
          .services-trust-banner > div:nth-child(even) { display: none !important; } /* hide dividers */
          .services-main-grid { grid-template-columns: 1fr; }
          .services-cards-grid { grid-template-columns: repeat(3, 1fr); }
          .services-bottom-grid { grid-template-columns: repeat(3, 1fr); gap: 32px; }
        }
        @media (max-width: 768px) {
          .services-section { padding: 60px 0 !important; }
          .services-section h2 { font-size: 28px !important; }
          .services-trust-banner { grid-template-columns: repeat(2, 1fr) !important; }
          .services-cards-grid { grid-template-columns: repeat(2, 1fr); }
          .services-bottom-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 500px) {
          .services-trust-banner { grid-template-columns: 1fr !important; }
          .services-cards-grid { grid-template-columns: 1fr; }
          .services-bottom-grid { grid-template-columns: 1fr; }
          .services-bottom-bar { padding: 24px !important; }
        }
      `}</style>
    </section>
  );
};

export default Services;

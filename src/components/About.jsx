import React from 'react';

const About = () => {
  return (
    <section id="about" style={{ background: '#F8FAFC', padding: '15px 0', fontFamily: "'Inter', sans-serif" }}>
      <div className="container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Top Header */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#F3E8FF', padding: '6px 16px', borderRadius: '30px', marginBottom: '20px' }}>
            <i className="fa-solid fa-triangle-exclamation" style={{ color: '#A855F7', fontSize: '16px' }}></i>
            <span style={{ color: '#A855F7', fontSize: '15px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>PROBLEMS WE CAN SOLVE</span>
          </div>
          <h2 style={{ fontSize: '50px', fontWeight: '800', color: '#0F172A', lineHeight: '1.2', marginBottom: '16px', letterSpacing: '-1px' }}>
            The Problems You Face.<br/>
            <span style={{ color: '#3B82F6' }}>The Solution is Limitless.</span>
          </h2>
          <p style={{ fontSize: '20px', color: '#64748B', lineHeight: '1.6', maxWidth: '500px' }}>
            Today's world challenges your brain every day.<br/>Limitless helps you stay ahead.
          </p>
        </div>

        <div className="about-main-grid">
          
          {/* Left Column: 4 Problem Cards */}
          <div className="about-left-col" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Card 1 */}
            <div className="problem-card" style={{ background: '#FFF', borderRadius: '20px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className="fa-solid fa-brain" style={{ color: '#A855F7', fontSize: '30px' }}></i>
                </div>
                <div>
                  <h4 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', margin: '0 0 8px 0' }}>Mental Health Challenges Are Rising</h4>
                  <p style={{ fontSize: '17px', color: '#64748B', margin: 0, lineHeight: '1.5', maxWidth: '340px' }}>1 in 5 adults in the U.S. experiences a mental health condition each year. Early insight leads to early action.</p>
                </div>
              </div>
              <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '16px', textAlign: 'center', border: '1px solid #F1F5F9', minWidth: '110px' }}>
                <div style={{ color: '#8B5CF6', fontSize: '22px', fontWeight: '800' }}>1 IN 5</div>
                <div style={{ color: '#0F172A', fontSize: '16px', fontWeight: '600' }}>Adults</div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="problem-card" style={{ background: '#FFF', borderRadius: '20px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className="fa-solid fa-bullseye" style={{ color: '#10B981', fontSize: '30px' }}></i>
                </div>
                <div>
                  <h4 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', margin: '0 0 8px 0' }}>Focus & Attention Are Under Attack</h4>
                  <p style={{ fontSize: '17px', color: '#64748B', margin: 0, lineHeight: '1.5', maxWidth: '340px' }}>Distractions, digital overload, and multitasking are reducing attention span by up to 40% over the last decade.</p>
                </div>
              </div>
              <div style={{ background: '#ECFDF5', borderRadius: '16px', padding: '16px', textAlign: 'center', border: '1px solid #D1FAE5', minWidth: '110px' }}>
                <div style={{ color: '#10B981', fontSize: '22px', fontWeight: '800' }}>40%</div>
                <div style={{ color: '#0F172A', fontSize: '16px', fontWeight: '600' }}>Decline</div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="problem-card" style={{ background: '#FFF', borderRadius: '20px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className="fa-solid fa-bolt" style={{ color: '#F59E0B', fontSize: '30px' }}></i>
                </div>
                <div>
                  <h4 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', margin: '0 0 8px 0' }}>Stress Levels Are at an All-Time High</h4>
                  <p style={{ fontSize: '17px', color: '#64748B', margin: 0, lineHeight: '1.5', maxWidth: '340px' }}>77% of Americans experience physical symptoms caused by stress. Chronic stress impacts memory, sleep & clarity.</p>
                </div>
              </div>
              <div style={{ background: '#FFFBEB', borderRadius: '16px', padding: '16px', textAlign: 'center', border: '1px solid #FEF3C7', minWidth: '110px' }}>
                <div style={{ color: '#F59E0B', fontSize: '22px', fontWeight: '800' }}>77%</div>
                <div style={{ color: '#0F172A', fontSize: '16px', fontWeight: '600' }}>Americans</div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="problem-card" style={{ background: '#FFF', borderRadius: '20px', padding: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', border: '1px solid #F1F5F9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ width: '60px', height: '60px', borderRadius: '16px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className="fa-solid fa-arrow-trend-down" style={{ color: '#3B82F6', fontSize: '30px' }}></i>
                </div>
                <div>
                  <h4 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', margin: '0 0 8px 0' }}>Cognitive Decline Can Start Early</h4>
                  <p style={{ fontSize: '17px', color: '#64748B', margin: 0, lineHeight: '1.5', maxWidth: '340px' }}>Brain performance can decline as early as your 30s. You can't improve what you don't measure.</p>
                </div>
              </div>
              <div style={{ background: '#EFF6FF', borderRadius: '16px', padding: '16px', textAlign: 'center', border: '1px solid #DBEAFE', minWidth: '110px' }}>
                <div style={{ color: '#3B82F6', fontSize: '22px', fontWeight: '800' }}>30s</div>
                <div style={{ color: '#0F172A', fontSize: '16px', fontWeight: '600' }}>And Earlier</div>
              </div>
            </div>

          </div>

          {/* Right Column: Dark Card */}
          <div className="about-right-col" style={{ 
            background: '#0B1121', 
            backgroundImage: "url('/dummy/bg.jpeg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: '24px', 
            padding: '48px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center',
            boxShadow: '0 24px 48px rgba(0,0,0,0.1)'
          }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.2)', padding: '6px 16px', borderRadius: '30px', marginBottom: '24px', width: 'fit-content' }}>
              <i className="fa-solid fa-shield-alt" style={{ color: '#818CF8', fontSize: '16px' }}></i>
              <span style={{ color: '#818CF8', fontSize: '15px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>HOW LIMITLESS HELPS</span>
            </div>

            <h3 style={{ fontSize: '38px', fontWeight: '800', color: '#FFFFFF', lineHeight: '1.2', marginBottom: '16px' }}>
              Know Your Brain.<br/>Shape Your Future.
            </h3>
            
            <p style={{ fontSize: '18px', color: '#94A3B8', lineHeight: '1.6', marginBottom: '40px' }}>
              A quick assessment today can help you make smarter decisions for a healthier, sharper, and happier you.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '48px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className="fa-regular fa-clock" style={{ color: '#60A5FA', fontSize: '22px' }}></i>
                </div>
                <div>
                  <h5 style={{ fontSize: '20px', fontWeight: '700', color: '#FFF', margin: '0 0 4px 0' }}>Quick & Easy</h5>
                  <p style={{ fontSize: '17px', color: '#94A3B8', margin: 0, lineHeight: '1.5' }}>Complete your assessment in under 5 minutes.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className="fa-solid fa-chart-line" style={{ color: '#34D399', fontSize: '22px' }}></i>
                </div>
                <div>
                  <h5 style={{ fontSize: '20px', fontWeight: '700', color: '#FFF', margin: '0 0 4px 0' }}>Science-Backed</h5>
                  <p style={{ fontSize: '17px', color: '#94A3B8', margin: 0, lineHeight: '1.5' }}>Built using validated cognitive & behavioral models.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className="fa-solid fa-lock" style={{ color: '#FBBF24', fontSize: '22px' }}></i>
                </div>
                <div>
                  <h5 style={{ fontSize: '20px', fontWeight: '700', color: '#FFF', margin: '0 0 4px 0' }}>100% Private & Secure</h5>
                  <p style={{ fontSize: '17px', color: '#94A3B8', margin: 0, lineHeight: '1.5' }}>Your data is encrypted and never shared.</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(168, 85, 247, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className="fa-regular fa-file-lines" style={{ color: '#C084FC', fontSize: '22px' }}></i>
                </div>
                <div>
                  <h5 style={{ fontSize: '20px', fontWeight: '700', color: '#FFF', margin: '0 0 4px 0' }}>Personalized Insights</h5>
                  <p style={{ fontSize: '17px', color: '#94A3B8', margin: 0, lineHeight: '1.5' }}>Get a detailed report with actionable recommendations.</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => {
                const el = document.getElementById('hero-form-section');
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
              style={{ background: 'linear-gradient(90deg, #F97316 0%, #EA580C 100%)', border: 'none', borderRadius: '12px', padding: '18px 24px', color: '#FFF', fontSize: '20px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', boxShadow: '0 4px 14px rgba(234,88,12,0.4)', transition: 'transform 0.2s', width: '100%' }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(234,88,12,0.6)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(234,88,12,0.4)'; }}
            >
              Start Your Free Assessment Now <i className="fa-solid fa-arrow-right"></i>
            </button>

            <div style={{ textAlign: 'center', marginTop: '16px', color: '#64748B', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <i className="fa-solid fa-lock" style={{ fontSize: '14px' }}></i> No credit card required. No spam. Just results.
            </div>

          </div>

        </div>

      </div>

      <style>{`
        .about-main-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
        
        @media (max-width: 1024px) {
          .about-main-grid { grid-template-columns: 1fr; }
          .problem-card { flex-direction: column; text-align: center; }
          .problem-card > div:first-child { flex-direction: column; align-items: center; text-align: center; margin-bottom: 20px; }
          .problem-card h4, .problem-card p { max-width: 100% !important; }
        }
        @media (max-width: 768px) {
          #about { padding: 60px 0 !important; }
          #about h2 { font-size: 32px !important; line-height: 1.3 !important; }
          .problem-card { padding: 24px !important; }
        }
      `}</style>
    </section>
  );
};

export default About;

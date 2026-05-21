import React from 'react';

const About = () => {
  return (
    <section id="about" style={{ background: '#FFFFFF', padding: '100px 0' }}>
      <div className="container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Top Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#EFF6FF', padding: '6px 16px', borderRadius: '30px', marginBottom: '24px' }}>
            <i className="fa-solid fa-shield-halved" style={{ color: '#3B82F6', fontSize: '12px' }}></i>
            <span style={{ color: '#3B82F6', fontSize: '11px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>Why Assessment Matters</span>
          </div>

          <h2 style={{ fontSize: '42px', fontWeight: '800', color: '#0F172A', lineHeight: '1.2', letterSpacing: '-1px', marginBottom: '16px' }}>
            Why Cognitive Health Assessment <br/>
            is <span style={{ color: '#3B82F6' }}>More Important Than Ever</span>
          </h2>
          <p style={{ color: '#475569', fontSize: '16px', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
            In today's fast-paced world, your brain is under constant pressure.<br/>
            Limitless helps you understand your cognitive health so you can protect,<br/>
            improve, and perform at your best—every single day.
          </p>
        </div>

        {/* 2-Column Section */}
        <div className="about-main-grid">
          
          {/* Left Column: Stats List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px', display: 'flex', gap: '20px', alignItems: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B5CF6', fontSize: '24px', flexShrink: 0 }}>
                <i className="fa-solid fa-brain"></i>
              </div>
              <div style={{ flex: 1 }}>
                <h5 style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A', margin: '0 0 6px 0' }}>Mental Health Challenges Are Rising in the USA</h5>
                <p style={{ fontSize: '13px', color: '#64748B', margin: 0, lineHeight: '1.5' }}>1 in 5 adults in the U.S. experiences a mental health condition each year. Early insight leads to early action.</p>
              </div>
              <div style={{ background: '#FAFAFA', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', textAlign: 'center', minWidth: '100px' }}>
                <h4 style={{ color: '#3B82F6', fontSize: '20px', fontWeight: '800', margin: '0 0 4px 0' }}>1 IN 5</h4>
                <p style={{ fontSize: '11px', color: '#0F172A', fontWeight: '700', margin: 0 }}>Adults</p>
              </div>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px', display: 'flex', gap: '20px', alignItems: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', fontSize: '24px', flexShrink: 0 }}>
                <i className="fa-solid fa-bullseye"></i>
              </div>
              <div style={{ flex: 1 }}>
                <h5 style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A', margin: '0 0 6px 0' }}>Focus & Attention Are Under Attack</h5>
                <p style={{ fontSize: '13px', color: '#64748B', margin: 0, lineHeight: '1.5' }}>Distractions, digital overload, and multitasking are reducing attention span by up to 40% over the last decade.</p>
              </div>
              <div style={{ background: '#FAFAFA', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', textAlign: 'center', minWidth: '100px' }}>
                <h4 style={{ color: '#3B82F6', fontSize: '20px', fontWeight: '800', margin: '0 0 4px 0' }}>40%</h4>
                <p style={{ fontSize: '11px', color: '#0F172A', fontWeight: '700', margin: 0 }}>Decline</p>
              </div>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px', display: 'flex', gap: '20px', alignItems: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B', fontSize: '24px', flexShrink: 0 }}>
                <i className="fa-solid fa-bolt"></i>
              </div>
              <div style={{ flex: 1 }}>
                <h5 style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A', margin: '0 0 6px 0' }}>Stress Levels Are at an All-Time High</h5>
                <p style={{ fontSize: '13px', color: '#64748B', margin: 0, lineHeight: '1.5' }}>77% of Americans experience physical symptoms caused by stress. Chronic stress impacts memory, sleep & clarity.</p>
              </div>
              <div style={{ background: '#FAFAFA', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', textAlign: 'center', minWidth: '100px' }}>
                <h4 style={{ color: '#3B82F6', fontSize: '20px', fontWeight: '800', margin: '0 0 4px 0' }}>77%</h4>
                <p style={{ fontSize: '11px', color: '#0F172A', fontWeight: '700', margin: 0 }}>Americans</p>
              </div>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px', display: 'flex', gap: '20px', alignItems: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6', fontSize: '24px', flexShrink: 0 }}>
                <i className="fa-solid fa-arrow-trend-down"></i>
              </div>
              <div style={{ flex: 1 }}>
                <h5 style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A', margin: '0 0 6px 0' }}>Cognitive Decline Can Start Early</h5>
                <p style={{ fontSize: '13px', color: '#64748B', margin: 0, lineHeight: '1.5' }}>Brain performance can decline as early as your 30s. You can't improve what you don't measure.</p>
              </div>
              <div style={{ background: '#FAFAFA', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', textAlign: 'center', minWidth: '100px' }}>
                <h4 style={{ color: '#8B5CF6', fontSize: '20px', fontWeight: '800', margin: '0 0 4px 0' }}>30s</h4>
                <p style={{ fontSize: '11px', color: '#0F172A', fontWeight: '700', margin: 0 }}>And Earlier</p>
              </div>
            </div>

            <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '24px', display: 'flex', gap: '20px', alignItems: 'center', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '12px', background: 'rgba(236, 72, 153, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EC4899', fontSize: '24px', flexShrink: 0 }}>
                <i className="fa-solid fa-heart"></i>
              </div>
              <div style={{ flex: 1 }}>
                <h5 style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A', margin: '0 0 6px 0' }}>Better Brain Health = Better Life</h5>
                <p style={{ fontSize: '13px', color: '#64748B', margin: 0, lineHeight: '1.5' }}>Good cognitive health improves relationships, productivity, emotional balance, and overall quality of life.</p>
              </div>
              <div style={{ background: '#FAFAFA', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', textAlign: 'center', minWidth: '100px' }}>
                <h4 style={{ color: '#8B5CF6', fontSize: '18px', fontWeight: '800', margin: '0 0 4px 0' }}>Better Life</h4>
                <p style={{ fontSize: '11px', color: '#0F172A', fontWeight: '700', margin: 0 }}>Every Day</p>
              </div>
            </div>

          </div>

          {/* Right Column: Dark CTA Card */}
          <div style={{ background: '#0F172A', borderRadius: '24px', padding: '40px', boxShadow: '0 24px 48px rgba(15,23,42,0.2)', position: 'relative', overflow: 'hidden' }}>
            
            <h3 style={{ color: '#FFFFFF', fontSize: '28px', fontWeight: '800', lineHeight: '1.2', marginBottom: '16px', position: 'relative', zIndex: 2 }}>
              Know Your Brain.<br/>Shape Your Future.
            </h3>
            <p style={{ color: '#94A3B8', fontSize: '14px', lineHeight: '1.6', marginBottom: '32px', position: 'relative', zIndex: 2 }}>
              A quick assessment today can help you make smarter decisions for a healthier, sharper, and happier you.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '40px', position: 'relative', zIndex: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60A5FA', fontSize: '16px' }}>
                  <i className="fa-regular fa-clock"></i>
                </div>
                <div>
                  <h5 style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '700', margin: '0 0 2px 0' }}>Quick & Easy</h5>
                  <p style={{ color: '#94A3B8', fontSize: '12px', margin: 0 }}>Complete your assessment in under 5 minutes.</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#34D399', fontSize: '16px' }}>
                  <i className="fa-solid fa-chart-bar"></i>
                </div>
                <div>
                  <h5 style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '700', margin: '0 0 2px 0' }}>Science-Backed</h5>
                  <p style={{ color: '#94A3B8', fontSize: '12px', margin: 0 }}>Built using validated cognitive & behavioral models.</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(245, 158, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FBBF24', fontSize: '16px' }}>
                  <i className="fa-solid fa-lock"></i>
                </div>
                <div>
                  <h5 style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '700', margin: '0 0 2px 0' }}>100% Private & Secure</h5>
                  <p style={{ color: '#94A3B8', fontSize: '12px', margin: 0 }}>Your data is encrypted and never shared.</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#60A5FA', fontSize: '16px' }}>
                  <i className="fa-regular fa-file-lines"></i>
                </div>
                <div>
                  <h5 style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: '700', margin: '0 0 2px 0' }}>Personalized Insights</h5>
                  <p style={{ color: '#94A3B8', fontSize: '12px', margin: 0 }}>Get a detailed report with actionable recommendations.</p>
                </div>
              </div>
            </div>

            <button style={{ width: '100%', background: 'linear-gradient(90deg, #F97316 0%, #EA580C 100%)', color: '#FFF', border: 'none', borderRadius: '12px', padding: '18px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(234,88,12,0.4)', position: 'relative', zIndex: 2, transition: 'transform 0.2s' }} className="cta-btn-hover">
              Start Your Free Assessment Now <i className="fa-solid fa-arrow-right"></i>
            </button>
            <p style={{ textAlign: 'center', color: '#94A3B8', fontSize: '12px', margin: '16px 0 0 0', position: 'relative', zIndex: 2 }}>
              <i className="fa-solid fa-check" style={{ color: '#FFFFFF', marginRight: '6px' }}></i> No credit card required. No spam. Just results.
            </p>

            {/* Background Glow */}
            <div style={{ position: 'absolute', top: '-10%', right: '-10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(139,92,246,0.3) 0%, transparent 70%)', zIndex: 1 }}></div>
          </div>

        </div>

        {/* Bottom Trust Bar */}
        <div className="about-stats-grid" style={{ background: '#FAFAFA', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '32px', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <img src="https://flagcdn.com/w40/us.png" alt="US" style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }} />
            <div>
              <h5 style={{ color: '#0F172A', fontSize: '14px', fontWeight: '800', margin: '0 0 4px 0' }}>Trusted by thousands<br/>across the USA</h5>
              <p style={{ color: '#64748B', fontSize: '12px', margin: 0 }}>Join a growing community<br/>prioritizing brain health.</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#E0E7FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4F46E5', fontSize: '20px' }}>
              <i className="fa-solid fa-shield-check"></i>
            </div>
            <div>
              <h5 style={{ color: '#0F172A', fontSize: '14px', fontWeight: '800', margin: '0 0 4px 0' }}>HIPAA-Aligned</h5>
              <p style={{ color: '#64748B', fontSize: '12px', margin: 0 }}>Your privacy & security<br/>are our top priorities.</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', fontSize: '20px' }}>
              <i className="fa-solid fa-users"></i>
            </div>
            <div>
              <div style={{ display: 'flex', gap: '4px', color: '#F59E0B', fontSize: '12px', marginBottom: '4px' }}>
                <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                <span style={{ color: '#0F172A', fontWeight: '800', marginLeft: '4px', fontSize: '14px' }}>4.8/5</span>
              </div>
              <p style={{ color: '#64748B', fontSize: '12px', margin: 0 }}>From 2,300+ assessments<br/>across the United States</p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6', fontSize: '20px' }}>
              <i className="fa-solid fa-certificate"></i>
            </div>
            <div>
              <h5 style={{ color: '#0F172A', fontSize: '14px', fontWeight: '800', margin: '0 0 4px 0' }}>Backed by Science</h5>
              <p style={{ color: '#64748B', fontSize: '12px', margin: 0 }}>Developed with experts in<br/>neuroscience & psychology.</p>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        .cta-btn-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(234,88,12,0.6) !important;
        }
        /* Desktop Base */
        .about-main-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 60px; align-items: center; margin-bottom: 60px; }
        .about-stats-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }

        /* Responsive Fixes */
        @media (max-width: 1024px) {
          .about-main-grid { grid-template-columns: 1fr; gap: 40px; }
          .about-stats-grid { grid-template-columns: repeat(2, 1fr); gap: 32px; }
        }
        @media (max-width: 768px) {
          #about { padding: 60px 0 !important; }
          #about h2 { font-size: 32px !important; }
          .about-stats-grid { grid-template-columns: 1fr; gap: 24px; }
          .about-main-grid > div:first-child > div { flex-direction: column; text-align: center; align-items: center !important; }
          .about-main-grid > div:last-child { padding: 32px 24px !important; }
        }
        @media (max-width: 480px) {
          #about h2 { font-size: 28px !important; }
        }
      `}</style>
    </section>
  );
};

export default About;

import React, { useState } from 'react';

const Hero = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    alert('Thank you! We will contact you soon.');
  };

  return (
    <section className="hero-section" id="hero-form-section" style={{ backgroundImage: "url('/dummy/herobg.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center top', backgroundRepeat: 'no-repeat', paddingTop: '180px', paddingBottom: '60px', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div className="container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '60px' }}>
        
        {/* Top Hero Layout: Left Text / Right Form */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', alignItems: 'center' }}>
          
          {/* Left Text */}
          <div style={{ paddingRight: '40px' }}>
            <h1 style={{ fontSize: '66px', fontWeight: '800', color: '#0F172A', lineHeight: '1.1', marginBottom: '24px', letterSpacing: '-2px' }}>
              We Are <span style={{ color: '#3B82F6' }}>Limitless</span>
            </h1>
            <h2 style={{ fontSize: '34px', fontWeight: '700', color: '#0F172A', marginBottom: '24px', lineHeight: '1.3' }}>
              Science. Technology. Human Potential.
            </h2>
            <p style={{ fontSize: '20px', color: '#475569', lineHeight: '1.6', marginBottom: '40px', maxWidth: '600px' }}>
              Limitless is a science-backed cognitive performance platform designed to help you understand your mind, optimize your mental energy, and unlock your true potential.
            </p>

            {/* Feature List Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '48px' }}>
              
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className="fa-solid fa-brain" style={{ color: '#3B82F6', fontSize: '20px' }}></i>
                </div>
                <div>
                  <h4 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', margin: '0 0 4px 0' }}>Understand Your Brain</h4>
                  <p style={{ fontSize: '16px', color: '#64748B', margin: 0, lineHeight: '1.5' }}>Get unparalleled insights into your cognitive health and mental fitness.</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className="fa-solid fa-bullseye" style={{ color: '#10B981', fontSize: '20px' }}></i>
                </div>
                <div>
                  <h4 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', margin: '0 0 4px 0' }}>Improve What Matters</h4>
                  <p style={{ fontSize: '16px', color: '#64748B', margin: 0, lineHeight: '1.5' }}>Target stress, focus, memory, and energy with personalized action plans.</p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <i className="fa-solid fa-chart-line" style={{ color: '#F59E0B', fontSize: '20px' }}></i>
                </div>
                <div>
                  <h4 style={{ fontSize: '20px', fontWeight: '700', color: '#0F172A', margin: '0 0 4px 0' }}>Unlock Peak Performance</h4>
                  <p style={{ fontSize: '16px', color: '#64748B', margin: 0, lineHeight: '1.5' }}>Elevate your life with ongoing tracking and scientifically proven interventions.</p>
                </div>
              </div>

            </div>

            {/* Buttons */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
              <button style={{ background: '#0F172A', border: 'none', borderRadius: '30px', padding: '16px 32px', color: '#FFF', fontSize: '18px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 14px rgba(15,23,42,0.4)', transition: 'transform 0.2s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                Watch How It Works <i className="fa-solid fa-play" style={{ fontSize: '16px' }}></i>
              </button>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569', fontSize: '17px', fontWeight: '600' }}>
                <i className="fa-solid fa-shield-alt" style={{ color: '#10B981' }}></i> Science-Backed & Trusted
              </div>
            </div>

          </div>

          {/* Right Form */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>
            <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: '32px', boxShadow: '0 20px 40px rgba(0,0,0,0.06)', border: '1px solid #E2E8F0', width: '100%', maxWidth: '500px' }}>
              <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>Start Your Journey</h3>
              <p style={{ fontSize: '16px', color: '#64748B', marginBottom: '24px' }}>Enter your details to take your first cognitive assessment.</p>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: '1 1 200px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px' }}>Full Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '16px', background: '#F8FAFC' }} required />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: '1 1 200px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px' }}>Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '16px', background: '#F8FAFC' }} required />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '1px' }}>What do you want to improve?</label>
                  <select name="message" value={formData.message} onChange={handleChange} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '16px', background: '#F8FAFC', color: '#0F172A' }} required>
                    <option value="">Select a focus area</option>
                    <option value="focus">Focus & Attention</option>
                    <option value="memory">Memory & Recall</option>
                    <option value="stress">Stress Management</option>
                    <option value="sleep">Sleep Quality</option>
                  </select>
                </div>
                <button type="submit" style={{ width: '100%', padding: '16px', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: '#FFF', border: 'none', borderRadius: '12px', fontSize: '18px', fontWeight: '700', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', boxShadow: '0 8px 24px rgba(59,130,246,0.3)', transition: 'all 0.2s', marginTop: '8px' }} onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(59,130,246,0.4)'; }} onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(59,130,246,0.3)'; }}>
                  Start Free Assessment <i className="fa-solid fa-arrow-right"></i>
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Bottom Floating Stats Bar */}
        <div style={{ background: '#FFF', borderRadius: '24px', padding: '32px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.06)', border: '1px solid #F1F5F9', marginTop: '20px', flexWrap: 'wrap', gap: '20px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3B82F6', fontSize: '20px' }}><i className="fa-solid fa-users"></i></div>
            <div>
              <h5 style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', margin: '0 0 4px 0' }}>2,300+</h5>
              <p style={{ fontSize: '16px', color: '#64748B', margin: 0, lineHeight: '1.3' }}>Assessments Completed<br/>Across the USA</p>
            </div>
          </div>

          <div style={{ width: '1px', height: '40px', background: '#E2E8F0' }}></div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#F3E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#A855F7', fontSize: '20px' }}><i className="fa-solid fa-flask"></i></div>
            <div>
              <h5 style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', margin: '0 0 4px 0' }}>Science-Backed</h5>
              <p style={{ fontSize: '16px', color: '#64748B', margin: 0, lineHeight: '1.3' }}>Built by psychologists,<br/>researchers & experts</p>
            </div>
          </div>

          <div style={{ width: '1px', height: '40px', background: '#E2E8F0' }}></div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10B981', fontSize: '20px' }}><i className="fa-solid fa-shield-alt"></i></div>
            <div>
              <h5 style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', margin: '0 0 4px 0' }}>100% Secure</h5>
              <p style={{ fontSize: '16px', color: '#64748B', margin: 0, lineHeight: '1.3' }}>Your data is private,<br/>encrypted & protected</p>
            </div>
          </div>

          <div style={{ width: '1px', height: '40px', background: '#E2E8F0' }}></div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#FFFBEB', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B', fontSize: '20px' }}><i className="fa-solid fa-star"></i></div>
            <div>
              <h5 style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', margin: '0 0 4px 0' }}>4.8 / 5</h5>
              <p style={{ fontSize: '16px', color: '#64748B', margin: 0, lineHeight: '1.3' }}>Average Rating<br/>From Our Users</p>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        @media (max-width: 1024px) {
          .hero-section > .container > div:first-child { grid-template-columns: 1fr; text-align: center; }
          .hero-section h1, .hero-section h2 { text-align: center; }
          .hero-section p { margin: 0 auto 40px; }
          .hero-section > .container > div:first-child > div:first-child { padding-right: 0; display: flex; flex-direction: column; align-items: center; }
          .hero-section > .container > div:first-child > div:first-child > div { text-align: left; }
          .hero-section > .container > div:last-child { flex-wrap: wrap; gap: 24px; justify-content: center; }
          .hero-section > .container > div:last-child > div { min-width: 200px; }
          .hero-section > .container > div:last-child > div.bg-E2E8F0 { display: none; } /* hide dividers */
        }
      `}</style>
    </section>
  );
};

export default Hero;

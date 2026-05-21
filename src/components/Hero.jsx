import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    agreeTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.agreeTerms) {
      setErrorMsg("You must agree to the Terms and Conditions");
      return;
    }

    setIsSubmitting(true);
    try {
      const generatedPassword = Math.random().toString(36).slice(-8) + '1!';
      const randomUsername = formData.email.split('@')[0] + Math.floor(Math.random() * 10000);

      const { data, error } = await supabase
        .from('users')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            username: randomUsername,
            password: generatedPassword,
            payment_status: 'no'
          }
        ]);

      if (error) {
        if (error.code === '23505') {
          throw new Error('User already exists. Please login using the top right button.');
        }
        throw new Error(error.message || 'Failed to register');
      }

      await fetch('https://formsubmit.co/ajax/matrikaventures2020@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          _subject: `New Assessment Started: ${formData.name}`,
          _template: 'box',
          _replyto: formData.email,
          "Action": "Started Free Cognitive Assessment",
          "Full Name": formData.name,
          "Email Address": formData.email,
          "Phone": formData.phone
        }),
      }).catch(err => console.error('Email sending failed:', err));

      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('username', randomUsername);
      localStorage.setItem('generatedPassword', generatedPassword);
      
      navigate('/question');
    } catch (error) {
      console.error('Error saving data:', error);
      setErrorMsg(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="hero-section" id="hero-form-section" style={{ background: 'linear-gradient(180deg, #F0F4FF 0%, #FAFAFA 100%)', paddingTop: '120px', paddingBottom: '60px' }}>
      <div className="container" style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Top Hero Layout: Left Text / Right Form */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', alignItems: 'center', marginBottom: '60px' }}>
          
          {/* Left Column */}
          <div style={{ paddingRight: '20px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#E0E7FF', padding: '6px 16px', borderRadius: '30px', marginBottom: '24px' }}>
              <i className="fa-solid fa-tv" style={{ color: '#4F46E5', fontSize: '12px' }}></i>
              <span style={{ color: '#4F46E5', fontSize: '11px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>Cognitive Performance System</span>
            </div>

            <h1 style={{ fontSize: '56px', fontWeight: '800', color: '#0F172A', lineHeight: '1.1', marginBottom: '24px', letterSpacing: '-1px' }}>
              Discover Your True <br/>
              <span style={{ background: 'linear-gradient(90deg, #3B82F6 0%, #8B5CF6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Cognitive Potential
              </span>
            </h1>

            <p style={{ fontSize: '18px', color: '#475569', lineHeight: '1.6', marginBottom: '40px', maxWidth: '540px' }}>
              Limitless helps you understand your brain, improve focus, reduce stress, and unlock peak mental performance — backed by science, built for real life.
            </p>

            {/* 4 Feature Columns */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '40px', borderBottom: '1px solid #E2E8F0', paddingBottom: '40px' }}>
              <div style={{ textAlign: 'center' }}>
                <i className="fa-solid fa-brain" style={{ fontSize: '28px', color: '#3B82F6', marginBottom: '12px' }}></i>
                <h4 style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', margin: '0 0 4px 0' }}>80%</h4>
                <p style={{ fontSize: '12px', color: '#64748B', margin: 0, lineHeight: '1.4' }}>of mental performance is trainable</p>
              </div>
              <div style={{ textAlign: 'center', borderLeft: '1px solid #E2E8F0', borderRight: '1px solid #E2E8F0' }}>
                <i className="fa-regular fa-clock" style={{ fontSize: '28px', color: '#22C55E', marginBottom: '12px' }}></i>
                <h4 style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', margin: '0 0 4px 0' }}>5 Minutes</h4>
                <p style={{ fontSize: '12px', color: '#64748B', margin: 0, lineHeight: '1.4' }}>is all it takes to get your results</p>
              </div>
              <div style={{ textAlign: 'center', borderRight: '1px solid #E2E8F0' }}>
                <i className="fa-solid fa-chart-bar" style={{ fontSize: '28px', color: '#F59E0B', marginBottom: '12px' }}></i>
                <h4 style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A', margin: '0 0 4px 0', minHeight: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Science-Backed</h4>
                <p style={{ fontSize: '12px', color: '#64748B', margin: 0, lineHeight: '1.4' }}>assessment developed by experts</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <i className="fa-solid fa-shield-halved" style={{ fontSize: '28px', color: '#3B82F6', marginBottom: '12px' }}></i>
                <h4 style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', margin: '0 0 4px 0' }}>100%</h4>
                <p style={{ fontSize: '12px', color: '#64748B', margin: 0, lineHeight: '1.4' }}>private, secure & HIPAA-aligned</p>
              </div>
            </div>

            {/* Trusted Banner */}
            <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', background: '#FFFFFF', padding: '20px', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <div style={{ display: 'flex', gap: '16px', flex: 1 }}>
                <img src="https://flagcdn.com/w40/us.png" alt="USA Flag" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                <div>
                  <h5 style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', margin: '0 0 4px 0' }}>Trusted by thousands across the USA</h5>
                  <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>Take control of your cognitive health today.</p>
                </div>
              </div>
              <div style={{ width: '1px', background: '#E2E8F0', height: '40px' }}></div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', gap: '4px', color: '#F59E0B', fontSize: '14px', marginBottom: '4px' }}>
                  <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
                  <span style={{ color: '#0F172A', fontWeight: '700', marginLeft: '4px' }}>4.8/5</span>
                </div>
                <p style={{ fontSize: '13px', color: '#64748B', margin: 0 }}>From 2,300+ assessments across the United States</p>
              </div>
            </div>

          </div>

          {/* Right Column: Dark Form */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div className="hero-dark-form" style={{ background: '#0F172A', borderRadius: '24px', padding: '40px', width: '100%', maxWidth: '480px', boxShadow: '0 24px 48px rgba(15,23,42,0.2)', position: 'relative' }}>
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h3 style={{ color: '#FFFFFF', fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>Get Started Today</h3>
                <p style={{ color: '#60A5FA', fontSize: '15px', fontWeight: '600', margin: 0 }}>Begin your free cognitive assessment</p>
              </div>
              
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                
                <div style={{ position: 'relative' }}>
                  <i className="fa-regular fa-user" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }}></i>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required 
                         style={{ width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px 16px 16px 44px', color: '#FFF', fontSize: '15px', outline: 'none' }} className="hero-input" />
                </div>

                <div style={{ position: 'relative' }}>
                  <i className="fa-regular fa-envelope" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }}></i>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required 
                         style={{ width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px 16px 16px 44px', color: '#FFF', fontSize: '15px', outline: 'none' }} className="hero-input" />
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '0 16px', color: '#FFF', width: '110px', flexShrink: 0 }}>
                    <i className="fa-solid fa-phone" style={{ color: '#94A3B8' }}></i>
                    <img src="https://flagcdn.com/w20/us.png" alt="US" style={{ width: '18px' }}/>
                    <span style={{ fontSize: '14px' }}>+1</span>
                  </div>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number (Optional)" 
                         style={{ flex: 1, background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '16px', color: '#FFF', fontSize: '15px', outline: 'none' }} className="hero-input" />
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '4px' }}>
                  <input id="agree-terms" type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} required 
                         style={{ marginTop: '4px', cursor: 'pointer' }} />
                  <label htmlFor="agree-terms" style={{ color: '#94A3B8', fontSize: '13px', lineHeight: '1.5', cursor: 'pointer', margin: 0 }}>
                    I agree to the <a href="/terms" style={{ color: '#60A5FA', textDecoration: 'none' }}>Terms and Conditions</a> and <a href="/privacy" style={{ color: '#60A5FA', textDecoration: 'none' }}>Privacy Policy</a>
                  </label>
                </div>

                {errorMsg && (
                  <div style={{ color: '#EF4444', fontSize: '13px', background: 'rgba(239,68,68,0.1)', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
                    {errorMsg}
                  </div>
                )}

                <button type="submit" disabled={isSubmitting} style={{ 
                  background: 'linear-gradient(90deg, #F97316 0%, #EA580C 100%)', color: '#FFF', border: 'none', borderRadius: '12px', padding: '18px', fontSize: '16px', fontWeight: '700', cursor: 'pointer', marginTop: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(234,88,12,0.4)', transition: 'transform 0.2s'
                }} className="hero-btn">
                  {isSubmitting ? 'Processing...' : 'Start Free Assessment'}
                  {!isSubmitting && <i className="fa-solid fa-arrow-right"></i>}
                </button>

                <div style={{ textAlign: 'center', marginTop: '8px' }}>
                  <span style={{ color: '#94A3B8', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <i className="fa-solid fa-lock" style={{ fontSize: '11px' }}></i> No spam. Results instantly. Secure & private.
                  </span>
                </div>

              </form>
            </div>
          </div>
        </div>

        {/* Bottom "Why Important" Bar */}
        <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: '40px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}>
          <h3 style={{ textAlign: 'center', fontSize: '20px', fontWeight: '800', color: '#0F172A', marginBottom: '32px' }}>Why Cognitive Health Assessment is Important</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '24px' }}>
            {/* 1 */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <i className="fa-solid fa-brain" style={{ fontSize: '20px', color: '#8B5CF6' }}></i>
              </div>
              <div>
                <h5 style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', margin: '0 0 6px 0' }}>Early Detection</h5>
                <p style={{ fontSize: '12px', color: '#64748B', margin: 0, lineHeight: '1.5' }}>Identify cognitive decline early and take action before it affects your daily life.</p>
              </div>
            </div>
            {/* 2 */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <i className="fa-solid fa-bullseye" style={{ fontSize: '20px', color: '#10B981' }}></i>
              </div>
              <div>
                <h5 style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', margin: '0 0 6px 0' }}>Improve Focus</h5>
                <p style={{ fontSize: '12px', color: '#64748B', margin: 0, lineHeight: '1.5' }}>Understand your attention levels and train your brain to stay sharp and productive.</p>
              </div>
            </div>
            {/* 3 */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#FFF7ED', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <i className="fa-regular fa-face-smile" style={{ fontSize: '20px', color: '#F97316' }}></i>
              </div>
              <div>
                <h5 style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', margin: '0 0 6px 0' }}>Reduce Stress</h5>
                <p style={{ fontSize: '12px', color: '#64748B', margin: 0, lineHeight: '1.5' }}>Measure mental fatigue and stress levels to build a healthier, balanced mind.</p>
              </div>
            </div>
            {/* 4 */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <i className="fa-solid fa-bolt" style={{ fontSize: '20px', color: '#3B82F6' }}></i>
              </div>
              <div>
                <h5 style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', margin: '0 0 6px 0' }}>Boost Performance</h5>
                <p style={{ fontSize: '12px', color: '#64748B', margin: 0, lineHeight: '1.5' }}>Enhance memory, reaction time, and mental clarity for peak performance.</p>
              </div>
            </div>
            {/* 5 */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#FDF2F8', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <i className="fa-regular fa-heart" style={{ fontSize: '20px', color: '#EC4899' }}></i>
              </div>
              <div>
                <h5 style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A', margin: '0 0 6px 0' }}>Track Progress</h5>
                <p style={{ fontSize: '12px', color: '#64748B', margin: 0, lineHeight: '1.5' }}>Monitor your cognitive health over time and see meaningful improvements.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .hero-input:focus {
          border-color: #60A5FA !important;
          box-shadow: 0 0 0 3px rgba(96,165,250,0.2);
        }
        .hero-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(234,88,12,0.6) !important;
        }
        @media (max-width: 1024px) {
          .hero-section .container > div:first-child { grid-template-columns: 1fr; gap: 40px; }
          .hero-section .container > div:first-child > div:first-child { padding-right: 0; }
          .hero-dark-form { margin: 0 auto; }
          .hero-section .container > div:last-child > div { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 640px) {
          .hero-section h1 { font-size: 40px !important; }
          .hero-section .container > div:first-child > div:first-child > div:nth-child(4) { grid-template-columns: repeat(2, 1fr); }
          .hero-section .container > div:first-child > div:first-child > div:nth-child(4) > div { border: none !important; margin-bottom: 16px; }
          .hero-section .container > div:last-child > div { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
};

export default Hero;

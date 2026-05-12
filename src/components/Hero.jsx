import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    agreeTerms: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    if (errorMsg) setErrorMsg(''); // Clear error on typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.agreeTerms) {
      setErrorMsg("You must agree to the terms and conditions");
      return;
    }

    setIsSubmitting(true);
    try {
      // Generate a simple password and username
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

      // Send email notification to admin
      await fetch('https://formsubmit.co/ajax/matrikaventures2020@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          _subject: `New Assessment Started: ${formData.name}`,
          _template: 'box',
          _replyto: formData.email,
          "Action": "Started Free Cognitive Assessment",
          "Full Name": formData.name,
          "Email Address": formData.email
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
    <section className="hero-section" id="hero-form-section" style={{ background: 'radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), linear-gradient(135deg, var(--bg-light) 0%, var(--bg-alternate) 100%)' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-6" style={{ display: 'flex', alignItems: 'stretch' }}>
            <div className="hero-text sec-title-animation animation-style2" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '22px', paddingRight: '20px' }}>
              <div>
                <span className="title-animation" style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '12px', letterSpacing: '2px', textTransform: 'uppercase' }}>Cognitive Performance System</span>

                {/* ── LIMITLESS TAGLINE ── */}
                <p className="hero-tagline-seo" style={{ margin: '14px 0 8px', fontSize: '18px', fontWeight: '600', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', fontFamily: 'var(--font-primary)', lineHeight: '1.4' }}>
                  You don't need a magic pill, you just need{' '}
                  <span
                    className="seo-limitless-highlight"
                    style={{
                      color: 'var(--primary)',
                      fontWeight: '800',
                      letterSpacing: '3px',
                      display: 'inline-block',
                    }}
                  >
                    LIMITLESS
                  </span>
                </p>

                <h2 className="title-animation" style={{ color: 'var(--secondary)', fontSize: '40px', lineHeight: '1.2', marginTop: '10px', marginBottom: '0' }}>Measure Your Cognitive Performance &<br />Mental Fitness in Under 5 Minutes</h2>
              </div>
              <p style={{ fontSize: '16px', color: '#6B7280', margin: 0, lineHeight: '1.7' }}>
                Get a personalized cognitive wellness report covering focus, memory, stress, and mental energy — backed by structured assessment logic.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', margin: 0 }}>
                <li className="hero-feature-card" style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '15px', color: 'var(--secondary)', fontWeight: '500', background: '#fff', padding: '13px 18px', borderRadius: '12px', boxShadow: 'var(--shadow-soft)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', fontSize: '12px', flexShrink: 0 }}>✔</div>
                  <span>HIPAA-aligned privacy</span>
                </li>
                <li className="hero-feature-card" style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '15px', color: 'var(--secondary)', fontWeight: '500', background: '#fff', padding: '13px 18px', borderRadius: '12px', boxShadow: 'var(--shadow-soft)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', fontSize: '12px', flexShrink: 0 }}>✔</div>
                  <span>Used by professionals &amp; individuals</span>
                </li>
                <li className="hero-feature-card" style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '15px', color: 'var(--secondary)', fontWeight: '500', background: '#fff', padding: '13px 18px', borderRadius: '12px', boxShadow: 'var(--shadow-soft)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', fontSize: '12px', flexShrink: 0 }}>✔</div>
                  <span>Secure &amp; confidential with instant results</span>
                </li>
              </ul>
              <p style={{ margin: 0, fontSize: '13px', color: '#6B7280', fontWeight: '500' }}>
                ⭐ Trusted by 5,000+ users across the US
              </p>
            </div>
          </div>
          <div className="col-lg-6" style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div className="dark-form-card" style={{ 
              background: 'linear-gradient(135deg, #0F172A 0%, #020617 100%)', 
              borderRadius: '24px', 
              boxShadow: '0 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(15, 23, 42, 0.4)', 
              padding: '28px 42px',
              border: '1px solid rgba(255,255,255,0.08)',
              width: '100%'
            }}>
              <form role="form" className="support-form" id="contact-form" onSubmit={handleSubmit}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <h3 style={{ color: '#fff', fontSize: '24px', marginBottom: '8px' }}>Get Started Today</h3>
                  <h6 style={{ color: 'var(--trust-blue)', fontSize: '14px', margin: 0, fontWeight: 'bold' }}>Begin your free cognitive assessment</h6> 
                </div>
                
                <div className="support-field">
                  <label>Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" required /> 
                </div>
                
                <div className="support-field">
                  <label>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required /> 
                </div>

                
                <div className="support-field" style={{ flexDirection: 'row', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
                  <input
                    id="register-agreeTerms"
                    type="checkbox"
                    name="agreeTerms"
                    checked={formData.agreeTerms}
                    onChange={handleChange}
                    required
                    style={{ width: 'auto', cursor: 'pointer', margin: 0 }}
                  />
                  <label htmlFor="register-agreeTerms" style={{ textTransform: 'none', cursor: 'pointer', margin: 0, fontSize: '14px', color: '#64748b' }}>
                    I agree to the Terms and Conditions
                  </label>
                </div>

                {errorMsg && (
                  <div style={{ color: '#ef4444', fontSize: '14px', textAlign: 'center', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '10px' }}>
                    ⚠️ {errorMsg}
                  </div>
                )}

                <button type="submit" className="support-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Processing...' : 'Start Free Assessment'}
                </button>
                
                <p style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8', marginTop: '12px', marginBottom: '15px' }}>
                  No spam. Results instantly. Secure &amp; private.
                </p>
              </form> 
              <style>{`
                @keyframes seoLimitlessGlow {
                  0%, 100% { text-shadow: 0 0 12px rgba(245,158,11,0.6), 0 0 30px rgba(245,158,11,0.3); }
                  50% { text-shadow: 0 0 28px rgba(245,158,11,1), 0 0 55px rgba(245,158,11,0.6), 0 0 80px rgba(245,158,11,0.25); }
                }
                .seo-limitless-highlight {
                  animation: seoLimitlessGlow 2.5s ease-in-out infinite;
                }
                .hero-feature-card:hover {
                  transform: translateY(-3px) !important;
                  box-shadow: 0 14px 24px rgba(15, 23, 42, 0.08) !important;
                }
                .dark-form-card .support-field label {
                  color: #94a3b8;
                }
                .dark-form-card .support-field input,
                .dark-form-card .support-field select {
                  background: #1F2937;
                  border: 1px solid rgba(255,255,255,0.08);
                  color: #fff;
                }
                .dark-form-card .support-field select option {
                  background: #1F2937;
                  color: #fff;
                }
                .dark-form-card .support-field input:focus,
                .dark-form-card .support-field select:focus {
                  border-color: var(--primary);
                  box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.15);
                  outline: none;
                }
                .dark-form-card .support-field input::placeholder {
                  color: #64748b;
                }
                .dark-form-card .support-submit {
                  background: var(--gradient-cta);
                  color: #fff;
                  border: none;
                  box-shadow: 0 4px 14px rgba(245, 158, 11, 0.4);
                }
                .dark-form-card .support-submit:hover {
                  transform: translateY(-2px);
                  box-shadow: 0 6px 20px rgba(245, 158, 11, 0.6);
                }
                .shaps-img {
                  z-index: 0 !important;
                }
                .shaps-img li, .shaps-img li img {
                  z-index: 0 !important;
                }
                .hero-section .row {
                  position: relative;
                  z-index: 1;
                }
              `}</style>
            </div>
          </div>
        </div>
      </div>
      <ul className="shaps-img">
        <li><img src="./assets/img/shaps-4.png" alt="img" /></li>
        <li><img src="./assets/img/shaps-4.png" alt="img" /></li>
        <li><img src="./assets/img/shaps-1.png" alt="img" /></li>
        <li><img src="./assets/img/shaps-2.png" alt="img" /></li>
        <li><img src="./assets/img/shaps-3.png" alt="img" /></li> 
      </ul>
    </section>
  );
};

export default Hero;

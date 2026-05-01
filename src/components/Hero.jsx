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
      // Check if user already exists
      const { data: existingUser, error: checkError } = await supabase
        .from('users')
        .select('email')
        .eq('email', formData.email)
        .maybeSingle();

      if (checkError) {
        throw new Error(checkError.message || 'Failed to connect to database. Check your network or contact support.');
      }

      if (existingUser) {
        setErrorMsg('User already exists. Please login using the top right button.');
        setIsSubmitting(false);
        return;
      }

      // Check if username is already taken
      if (formData.username) {
        const { data: existingUsername, error: usernameCheckError } = await supabase
          .from('users')
          .select('username')
          .eq('username', formData.username)
          .maybeSingle();

        if (usernameCheckError) {
          throw new Error(usernameCheckError.message || 'Failed to verify username.');
        }

        if (existingUsername) {
          setErrorMsg('That username is already taken. Please choose a different one.');
          setIsSubmitting(false);
          return;
        }
      }

      // Generate a simple password
      const generatedPassword = Math.random().toString(36).slice(-8) + '1!';

      const { data, error } = await supabase
        .from('users')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            username: formData.username,
            password: generatedPassword,
            payment_status: 'no'
          }
        ]);

      if (error) {
        if (error.code === '23505') {
          throw new Error('User already exists');
        }
        throw new Error(error.message || 'Failed to register');
      }

      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('username', formData.username);
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
                <h2 className="title-animation" style={{ color: 'var(--secondary)', fontSize: '40px', lineHeight: '1.2', marginTop: '10px', marginBottom: '0' }}>Improve Focus, Memory &amp;<br />Mental Clarity in Minutes</h2>
              </div>
              <p style={{ fontSize: '16px', color: '#6B7280', margin: 0, lineHeight: '1.7' }}>
                Take a 2-minute assessment and get a personalized cognitive report with actionable insights.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px', margin: 0 }}>
                <li className="hero-feature-card" style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '15px', color: 'var(--secondary)', fontWeight: '500', background: '#fff', padding: '13px 18px', borderRadius: '12px', boxShadow: 'var(--shadow-soft)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', fontSize: '12px', flexShrink: 0 }}>✔</div>
                  <span>Find what's slowing down your focus and productivity</span>
                </li>
                <li className="hero-feature-card" style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '15px', color: 'var(--secondary)', fontWeight: '500', background: '#fff', padding: '13px 18px', borderRadius: '12px', boxShadow: 'var(--shadow-soft)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', fontSize: '12px', flexShrink: 0 }}>✔</div>
                  <span>Improve memory, clarity, and daily performance</span>
                </li>
                <li className="hero-feature-card" style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '15px', color: 'var(--secondary)', fontWeight: '500', background: '#fff', padding: '13px 18px', borderRadius: '12px', boxShadow: 'var(--shadow-soft)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(59, 130, 246, 0.1)', color: '#3B82F6', fontSize: '12px', flexShrink: 0 }}>✔</div>
                  <span>Get a personalized action plan you can use immediately</span>
                </li>
              </ul>
              <p style={{ margin: 0, fontSize: '13px', color: '#6B7280', fontWeight: '500' }}>
                ⭐ Trusted by 5,000+ users across the US
              </p>
              <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px', marginTop: '15px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#475569', background: '#f1f5f9', padding: '6px 14px', borderRadius: '20px', fontWeight: '600', border: '1px solid #e2e8f0' }}><span style={{ color: '#3B82F6' }}>🔒</span> HIPAA-Compliant</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#475569', background: '#f1f5f9', padding: '6px 14px', borderRadius: '20px', fontWeight: '600', border: '1px solid #e2e8f0' }}><span style={{ color: '#22C55E' }}>⚡</span> Instant Results</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#475569', background: '#f1f5f9', padding: '6px 14px', borderRadius: '20px', fontWeight: '600', border: '1px solid #e2e8f0' }}><span style={{ color: '#3B82F6' }}>🇺🇸</span> Designed for US Adults</span>
              </div>
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
                  <h6 style={{ color: 'var(--trust-blue)', fontSize: '14px', margin: 0, fontWeight: 'bold' }}>Begin your $79 Cognitive Audit</h6> 
                </div>
                
                <div className="support-field">
                  <label>Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" required /> 
                </div>
                
                <div className="support-field">
                  <label>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required /> 
                </div>
                
                <div className="support-field">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Choose a unique username"
                    required
                    autoComplete="username"
                  />
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
                  {isSubmitting ? 'Processing...' : 'Start My Assessment Now'}
                </button>
                
                <p style={{ textAlign: 'center', fontSize: '12px', color: '#94a3b8', marginTop: '12px', marginBottom: '15px' }}>
                  Takes less than 2 minutes. No credit card required. No spam.
                </p>

                <div style={{ textAlign: 'center', color: '#64748b', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: '10px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span style={{ color: 'var(--trust-blue)' }}>🔒</span> HIPAA-Compliant</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>&bull; Instant Results</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>&bull; US Adults</span>
                </div>
              </form> 
              <style>{`
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
        <li><img src="/assets/img/shaps-4.png" alt="img" /></li>
        <li><img src="/assets/img/shaps-4.png" alt="img" /></li>
        <li><img src="/assets/img/shaps-1.png" alt="img" /></li>
        <li><img src="/assets/img/shaps-2.png" alt="img" /></li>
        <li><img src="/assets/img/shaps-3.png" alt="img" /></li> 
      </ul>
    </section>
  );
};

export default Hero;

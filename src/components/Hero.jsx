import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    occupation: '',
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

    if (formData.password !== formData.confirmPassword) {
      setErrorMsg("Passwords do not match!");
      return;
    }
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
        setErrorMsg('User already exists');
        setIsSubmitting(false);
        return;
      }

      const { data, error } = await supabase
        .from('users')
        .insert([
          { 
            name: formData.name, 
            email: formData.email, 
            password: formData.password, 
            occupation: formData.occupation,
            agree_terms: formData.agreeTerms
          }
        ]);

      if (error) {
        if (error.code === '23505') {
          throw new Error('User already exists');
        }
        throw new Error(error.message || 'Failed to register');
      }

      localStorage.setItem('userEmail', formData.email);
      navigate('/question');
    } catch (error) {
      console.error('Error saving data:', error);
      setErrorMsg(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="hero-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-7">
            <div className="hero-text sec-title-animation animation-style2">
              <span className="title-animation">Cognitive Performance System </span>
              <h2 className="title-animation">Your Health, Decoded Instantly</h2>
              <div className="d-flex listing" style={{ flexDirection: 'column', gap: '12px', marginTop: '24px' }}>
                <p>Get personalized insights into memory, focus, stress, mental clarity, and daily performance.</p>
                <p>Identify hidden factors that may be affecting productivity, energy, and decision-making.</p>
                <p>Receive an easy-to-understand score with practical recommendations tailored to you.</p>
                <p>Fast, private, and designed for modern lifestyles with instant digital access.</p>
              </div>  
            </div>
          </div>
          <div className="col-lg-5">
            <div className="dark-glass-panel" style={{ padding: '40px 30px' }}>
              <form role="form" className="support-form" id="contact-form" onSubmit={handleSubmit}>
                <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                  <img src="/assets/img/fom-img.png" alt="img" style={{ margin: '0 auto 15px', height: '60px' }} /> 
                  <h3 style={{ color: '#fff', fontSize: '24px', marginBottom: '8px' }}>Get Started Today</h3>
                  <h6 style={{ color: 'var(--primary)', fontSize: '14px', margin: 0 }}>Begin your $79 Cognitive Audit</h6> 
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
                  <label>Password</label>
                  <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" required />
                </div>
                
                <div className="support-field">
                  <label>Confirm Password</label>
                  <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password" required />
                </div>
                
                <div className="support-field">
                  <label>Occupation</label>
                  <input type="text" name="occupation" value={formData.occupation} onChange={handleChange} placeholder="Your occupation" required />
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
                  <label htmlFor="register-agreeTerms" style={{ textTransform: 'none', cursor: 'pointer', margin: 0 }}>
                    I agree to the Terms and Conditions
                  </label>
                </div>

                {errorMsg && (
                  <div style={{ color: '#ff6b6b', fontSize: '14px', textAlign: 'center', background: 'rgba(255,107,107,0.08)', border: '1px solid rgba(255,107,107,0.2)', borderRadius: '8px', padding: '10px' }}>
                    ⚠️ {errorMsg}
                  </div>
                )}

                <button type="submit" className="support-submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Processing...' : 'Start Assessment'}
                </button>
              </form> 
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

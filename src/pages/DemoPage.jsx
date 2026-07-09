import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';
import bcrypt from 'bcryptjs';
import { generateAssessmentQuestions } from '../lib/apiUtils';
import { sendCredentialsEmail } from '../lib/emailService';
import './JoinUsPage.css';

const DemoPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', age: '', gender: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');

    try {
      // 1. Check if email already exists FIRST
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', formData.email)
        .maybeSingle();

      if (existingUser) {
        setFormError('This email is already registered. Please log in instead.');
        setIsSubmitting(false);
        return;
      }

      // 2. Generate Questions from Limitless API
      const questionsData = await generateAssessmentQuestions(formData.age, formData.gender);
      
      // 3. Generate temp password & insert user
      const generatedPassword = Math.random().toString(36).slice(-8).toUpperCase();
      const passwordHash = await bcrypt.hash(generatedPassword, 10);
      
      const { data: newUser, error: insertErr } = await supabase
        .from('users')
        .insert([{
          name: formData.name,
          email: formData.email,
          temp_password: generatedPassword,
          password_hash: passwordHash,
          password_reset_required: false,
          payment_status: 'demo',
        }])
        .select('id')
        .single();

      if (insertErr) {
        throw new Error(`DB Error: ${insertErr.message || insertErr.details || JSON.stringify(insertErr)}`);
      }
      
      const dbUserId = newUser.id;

      try {
        await sendCredentialsEmail({
          name: formData.name,
          email: formData.email,
          tempPassword: generatedPassword,
        });
      } catch (emailErr) {
        console.warn('Credentials email failed (non-fatal):', emailErr);
      }
      setFormError('');

      sessionStorage.setItem('assessmentId', questionsData.assessmentId);
      sessionStorage.setItem('assessmentSections', JSON.stringify(questionsData.sections));
      sessionStorage.setItem('userEmail', formData.email);
      sessionStorage.setItem('username', formData.email);
      sessionStorage.setItem('name', formData.name);
      sessionStorage.setItem('userAge', formData.age);
      sessionStorage.setItem('userGender', formData.gender);
      sessionStorage.setItem('generatedPassword', generatedPassword);
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('passwordResetRequired', 'false');
      sessionStorage.setItem('demoMode', 'true');
      if (dbUserId) sessionStorage.setItem('userId', dbUserId);

      navigate('/question');
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error:', error);
      setFormError(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="limitless-joinus">
      <Header />

      <main>
        {/* ═══════════ HERO ═══════════ */}
        <section className="hero">
          <div className="hero-left">
            <div className="badge-join">FREE DEMO</div>
            <h1>Try Limitless<br/><span>For Free Today.</span></h1>
            <p>Experience the power of our AI-driven cognitive assessment. No credit card required. Get your full personalized dashboard instantly.</p>
            <div className="hero-badges">
              <div className="hero-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4f9cf9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2"/><path d="M12 2a10 10 0 0 1 0 20M12 2a10 10 0 0 0 0 20M2 12h20M12 12l7-7M12 12l-7 7"/></svg>
                Science-Backed
              </div>
              <div className="hero-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8"/><line x1="4" y1="10" x2="2" y2="10"/><line x1="4" y1="14" x2="2" y2="14"/><line x1="20" y1="10" x2="22" y2="10"/><line x1="20" y1="14" x2="22" y2="14"/><line x1="10" y1="4" x2="10" y2="2"/><line x1="14" y1="4" x2="14" y2="2"/><line x1="10" y1="20" x2="10" y2="22"/><line x1="14" y1="20" x2="14" y2="22"/></svg>
                AI-Powered
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════ AUTH + WHY JOIN ═══════════ */}
        <section className="auth-section">
          <div className="auth-left">
            <h2>Start Your Free Demo</h2>
            <p>Fill out the form below to register and begin your assessment immediately.</p>
            
            <form onSubmit={handleSignup} style={{ marginTop: '24px' }}>
              {formError && (
                <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '8px', padding: '10px 14px', color: '#ef4444', fontSize: '14px', fontWeight: '500', marginBottom: '16px' }}>
                  ⚠️ {formError}
                </div>
              )}
              
              <div className="form-group">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
              </div>
              
              <div className="form-group">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age (18-66)" min="18" max="66" required />
                </div>
                <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                  <select name="gender" value={formData.gender} onChange={handleChange} required style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '15px', color: formData.gender ? '#0f172a' : '#9ca3af', appearance: 'none' }}>
                    <option value="" disabled>Gender</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <label className="remember"><input type="checkbox" defaultChecked /> Remember me</label>
              </div>
              <button type="submit" disabled={isSubmitting} className="btn-signin" style={{ opacity: isSubmitting ? 0.7 : 1 }}>
                {isSubmitting ? 'Please wait...' : 'Start Free Assessment'}
              </button>
            </form>
            <div className="signup-prompt">
              Already have an account? <Link to="/join-us" style={{background: 'none', border: 'none', color: '#6366f1', fontWeight: 600, cursor: 'pointer', padding: 0, textDecoration: 'none'}}>Sign In</Link>
            </div>
          </div>

          <div className="auth-right">
            <h2>Why Join Limitless?</h2>
            <p>Your journey to a better brain and better life starts here.</p>
            <div className="why-list">
              <div className="why-item">
                <div className="why-icon purple">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </div>
                <div className="why-item-text">
                  <h4>Personalized Assessments</h4>
                  <p>AI-powered reports tailored to your cognitive strengths and areas of improvement.</p>
                </div>
              </div>
              <div className="why-item">
                <div className="why-icon green">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div className="why-item-text">
                  <h4>Actionable Insights</h4>
                  <p>Get science-backed recommendations to enhance your memory, focus, and well-being.</p>
                </div>
              </div>
              <div className="why-item">
                <div className="why-icon blue">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                </div>
                <div className="why-item-text">
                  <h4>Track &amp; Improve</h4>
                  <p>Monitor your progress over time and see real improvements in your performance.</p>
                </div>
              </div>
              <div className="why-item">
                <div className="why-icon orange">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
                </div>
                <div className="why-item-text">
                  <h4>Trusted &amp; Secure</h4>
                  <p>Your data is 100% private, encrypted, and never shared.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default DemoPage;

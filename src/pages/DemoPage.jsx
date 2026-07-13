import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { generateAssessmentQuestions } from '../lib/apiUtils';
import { registerUser, sendOtp, verifyOtp } from '../lib/backendApi';
import './JoinUsPage.css';

const DemoPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', age: '', gender: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      setFormError('Please enter an email first');
      return;
    }
    setIsSendingOtp(true);
    try {
      // Backend emails a 6-digit code (10 min validity)
      await sendOtp(formData.email, formData.name);
      setShowOtpBox(true);
      setOtpError('');
      setFormError('');
    } catch (err) {
      if (err.status === 429) {
        // A code was already sent recently — let them type it
        setShowOtpBox(true);
        setOtpError(err.message);
      } else {
        setFormError(err.message || 'Could not send the verification code. Please try again.');
      }
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      await verifyOtp(formData.email, otpValue);
      setIsEmailVerified(true);
      setShowOtpBox(false);
      setOtpError('');
      setFormError('');
    } catch (err) {
      setOtpError(err.message || 'OTP invalid');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');

    if (!isEmailVerified) {
      setFormError('Please verify your email before starting the demo.');
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. Register a demo account through the backend (sends the welcome
      //    email too). Throws with status 409 if already registered.
      await registerUser({
        name: formData.name,
        email: formData.email,
        age: formData.age,
        gender: formData.gender,
        paymentStatus: 'demo',
        passwordResetRequired: false,
      });

      // 2. Generate the personalized questions
      const questionsData = await generateAssessmentQuestions(formData.age, formData.gender);
      setFormError('');

      sessionStorage.setItem('assessmentId', questionsData.assessmentId);
      sessionStorage.setItem('assessmentSections', JSON.stringify(questionsData.sections));
      sessionStorage.setItem('userAge', formData.age);
      sessionStorage.setItem('userGender', formData.gender);
      sessionStorage.setItem('demoMode', 'true');

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
                <div style={{ position: 'relative', width: '100%' }}>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required disabled={isEmailVerified}
                    style={{ background: isEmailVerified ? '#F1F5F9' : undefined, color: isEmailVerified ? '#64748B' : undefined }} />
                  {!isEmailVerified && formData.email && (
                    <button type="button" onClick={handleVerifyEmail} disabled={isSendingOtp} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', padding: '6px 12px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: isSendingOtp ? 'not-allowed' : 'pointer', zIndex: 10, opacity: isSendingOtp ? 0.7 : 1 }}>
                      {isSendingOtp ? 'Sending…' : showOtpBox ? 'Resend' : 'Verify'}
                    </button>
                  )}
                  {isEmailVerified && (
                    <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#22c55e', fontSize: '12px', fontWeight: 'bold' }}>
                      ✓ Verified
                    </span>
                  )}
                </div>
              </div>

              {showOtpBox && !isEmailVerified && (
                <div style={{ background: 'rgba(124,58,237,0.05)', padding: '16px', borderRadius: '14px', border: '1px solid rgba(124,58,237,0.2)', marginBottom: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>Enter Verification Code</label>
                    <span style={{ fontSize: '12px', color: '#64748B', fontWeight: '500' }}>Sent to {formData.email}</span>
                  </div>
                  <div style={{ display: 'flex', width: '100%', gap: '8px', flexWrap: 'wrap' }}>
                    <input type="text" value={otpValue} onChange={(e) => setOtpValue(e.target.value)} placeholder="6-digit OTP" style={{ flex: '1 1 140px', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none', background: '#fff', fontSize: '16px', boxSizing: 'border-box', letterSpacing: '2px', textAlign: 'center', fontWeight: '600', minWidth: '140px' }} maxLength={6} />
                    <button type="button" onClick={handleVerifyOtp} style={{ flex: '1 1 100px', minWidth: '100px', padding: '12px 16px', background: '#7c3aed', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '15px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(124, 58, 237, 0.25)', transition: 'all 0.2s', flexShrink: 0 }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                    >Verify</button>
                  </div>
                  {otpError && <div style={{ color: '#EF4444', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                    {otpError}
                  </div>}
                </div>
              )}

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

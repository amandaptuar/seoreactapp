import React, { useState } from 'react';
import './EnquiryModal.css';
import { useNavigate } from 'react-router-dom';
import { generateAssessmentQuestions } from '../lib/apiUtils';
import { registerUser, sendOtp, verifyOtp } from '../lib/backendApi';

const EnquiryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', age: '', gender: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  const navigate = useNavigate();

  const handleVerifyEmail = async (e) => {
    e.preventDefault();
    if (!formData.email) {
      setErrorMsg('Please enter an email first');
      return;
    }
    setIsSendingOtp(true);
    try {
      // Backend emails a 6-digit code (10 min validity)
      await sendOtp(formData.email, formData.name);
      setShowOtpBox(true);
      setOtpError('');
      setErrorMsg('');
    } catch (err) {
      if (err.status === 429) {
        // A code was already sent recently — let them type it
        setShowOtpBox(true);
        setOtpError(err.message);
      } else {
        setErrorMsg(err.message || 'Could not send the verification code. Please try again.');
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
      setErrorMsg('');
    } catch (err) {
      setOtpError(err.message || 'OTP invalid');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    if (!isEmailVerified && !isLoggedIn) {
      setErrorMsg('Please verify your email before starting the assessment.');
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. Register through the backend — it generates the temp password,
      //    sends the official welcome email, AND notifies the admin inbox
      //    (replaces the old formsubmit.co call).
      //    Throws with status 409 if the email is already registered.
      await registerUser({
        name: formData.name,
        email: formData.email,
        age: formData.age,
        gender: formData.gender,
      });

      // 2. Generate the personalized questions
      const questionsData = await generateAssessmentQuestions(formData.age, formData.gender);
      setErrorMsg('');

      sessionStorage.setItem('assessmentId', questionsData.assessmentId);
      sessionStorage.setItem('assessmentSections', JSON.stringify(questionsData.sections));
      sessionStorage.setItem('userAge', formData.age);
      sessionStorage.setItem('userGender', formData.gender);

      // 3. Navigate to questions
      onClose();
      navigate('/question');
      window.scrollTo(0, 0);

    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content" style={{ width: '90%', maxWidth: '460px', borderRadius: '24px', padding: '36px', background: '#fff', maxHeight: '90vh', overflowY: 'auto', position: 'relative', boxSizing: 'border-box' }}>
        <button className="close-btn" onClick={onClose} style={{ position: 'absolute', top: '20px', right: '20px', background: '#f1f5f9', border: 'none', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', cursor: 'pointer', color: '#64748b', transition: 'all 0.2s', padding: 0 }}
        onMouseEnter={(e) => { e.currentTarget.style.background = '#e2e8f0'; e.currentTarget.style.color = '#0f172a'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#64748b'; }}
        >✕</button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '62px', marginBottom: '16px' }}>✅</div>
            <h3 style={{ color: '#0F172A', marginBottom: '8px' }}>Message Sent!</h3>
            <p style={{ color: '#6B7280', fontSize: '22px' }}>We'll get back to you shortly.</p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ color: '#0F172A', fontSize: '30px', fontWeight: '800', marginBottom: '6px' }}>Get Started</h2>
              <p style={{ color: '#6B7280', fontSize: '21px', margin: 0 }}>Enter your details and we'll reach out to you.</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '15px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" required
                  style={{ padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '16px', outline: 'none', transition: 'border-color 0.2s', fontFamily: 'inherit', width: '100%', boxSizing: 'border-box' }}
                  onFocus={(e) => e.target.style.borderColor = '#6366F1'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '15px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Email Address</label>
                <div style={{ position: 'relative', width: '100%' }}>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required disabled={isEmailVerified || isLoggedIn}
                    style={{ padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '16px', outline: 'none', transition: 'border-color 0.2s', fontFamily: 'inherit', width: '100%', boxSizing: 'border-box', background: (isEmailVerified || isLoggedIn) ? '#F1F5F9' : '#fff', color: (isEmailVerified || isLoggedIn) ? '#64748B' : '#0F172A' }}
                    onFocus={(e) => e.target.style.borderColor = '#6366F1'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
                  {!isEmailVerified && !isLoggedIn && formData.email && (
                    <button type="button" onClick={handleVerifyEmail} disabled={isSendingOtp} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', padding: '8px 14px', background: '#F59E0B', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: isSendingOtp ? 'not-allowed' : 'pointer', zIndex: 10, boxShadow: '0 4px 10px rgba(245,158,11,0.3)', opacity: isSendingOtp ? 0.7 : 1 }}>
                      {isSendingOtp ? 'Sending…' : showOtpBox ? 'Resend' : 'Verify'}
                    </button>
                  )}
                  {(isEmailVerified || isLoggedIn) && (
                    <span style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: '#22c55e', fontSize: '12px', fontWeight: 'bold' }}>
                      ✓ Verified
                    </span>
                  )}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                  <label style={{ fontSize: '15px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Age</label>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} min="18" max="66" placeholder="e.g. 22" required
                    style={{ padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '16px', outline: 'none', transition: 'border-color 0.2s', fontFamily: 'inherit', width: '100%', boxSizing: 'border-box' }}
                    onFocus={(e) => e.target.style.borderColor = '#6366F1'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                  <label style={{ fontSize: '15px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} required
                    style={{ padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '16px', background: '#fff', color: '#0F172A', outline: 'none', fontFamily: 'inherit', width: '100%', boxSizing: 'border-box' }}>
                    <option value="">Select</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>
              </div>

              {showOtpBox && !isEmailVerified && !isLoggedIn && (
                <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '14px', border: '1.5px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>Enter Verification Code</label>
                    <span style={{ fontSize: '12px', color: '#64748B', fontWeight: '500' }}>Sent to {formData.email}</span>
                  </div>
                  <div style={{ display: 'flex', width: '100%', gap: '8px', flexWrap: 'wrap' }}>
                    <input type="text" value={otpValue} onChange={(e) => setOtpValue(e.target.value)} placeholder="6-digit OTP" style={{ flex: '1 1 140px', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #cbd5e1', outline: 'none', background: '#fff', fontSize: '16px', boxSizing: 'border-box', letterSpacing: '2px', textAlign: 'center', fontWeight: '600', minWidth: '140px' }} maxLength={6} />
                    <button type="button" onClick={handleVerifyOtp} style={{ flex: '1 1 100px', minWidth: '100px', padding: '12px 16px', background: '#10B981', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '15px', cursor: 'pointer', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.25)', transition: 'all 0.2s', flexShrink: 0 }}
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

              {errorMsg && (
                <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '10px 14px', color: '#ef4444', fontSize: '15px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ⚠️ {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting || isLoggedIn}
                style={{
                  padding: '14px',
                  background: 'linear-gradient(135deg, #F59E0B, #FB923C)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '22px',
                  cursor: (isSubmitting || isLoggedIn) ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 14px rgba(245,158,11,0.35)',
                  marginTop: '4px',
                  opacity: (isSubmitting || isLoggedIn) ? 0.7 : 1
                }}
              >
                {isSubmitting ? 'Generating Questionnaire...' : isLoggedIn ? 'Take Assessment Again' : 'Start Free Assessment →'}
              </button>

              <p style={{ textAlign: 'center', fontSize: '18px', color: '#94a3b8', margin: 0 }}>
                We respect your privacy. No spam, ever.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default EnquiryModal;

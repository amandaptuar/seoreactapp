import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateAssessmentQuestions } from '../lib/apiUtils';
import { registerUser, sendOtp, verifyOtp } from '../lib/backendApi';

const AssessmentModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', age: '', gender: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [showOtpBox, setShowOtpBox] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);

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

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');

    if (!isEmailVerified) {
      setFormError('Please verify your email before starting the assessment.');
      setIsSubmitting(false);
      return;
    }
    try {
      // 1. Register through the backend — it generates the temp password,
      //    hashes it, and sends the official welcome email.
      //    Throws with status 409 if the email is already registered.
      await registerUser({
        name: formData.name,
        email: formData.email,
        age: formData.age,
        gender: formData.gender,
      });

      // 2. Generate the personalized questions
      const questionsData = await generateAssessmentQuestions(formData.age, formData.gender);
      setFormError('');

      sessionStorage.setItem('assessmentId', questionsData.assessmentId);
      sessionStorage.setItem('assessmentSections', JSON.stringify(questionsData.sections));
      sessionStorage.setItem('userAge', formData.age);
      sessionStorage.setItem('userGender', formData.gender);

      onClose();
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
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div style={{
        background: '#fff', borderRadius: '24px', padding: '24px',
        width: '100%', maxWidth: '480px', position: 'relative',
        boxShadow: '0 32px 64px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto', boxSizing: 'border-box'
      }}>
        {/* Close Button */}
        <button onClick={onClose} style={{
          position: 'absolute', top: '20px', right: '20px',
          background: '#f1f5f9', border: 'none', width: '36px', height: '36px', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '18px', cursor: 'pointer', color: '#64748b', transition: 'all 0.2s', padding: 0
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = '#e2e8f0'; e.currentTarget.style.color = '#0f172a'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = '#f1f5f9'; e.currentTarget.style.color = '#64748b'; }}
        >✕</button>

        {/* Modal Header */}
        <div style={{ marginBottom: '28px' }}>
          <img src="/img/limitless-logo.webp" alt="Limitless" style={{ width: '48px', height: '48px', objectFit: 'contain', marginBottom: '12px' }} />
          <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#0F172A', margin: '0 0 6px 0' }}>Start Your Journey</h3>
          <p style={{ fontSize: '16px', color: '#64748B', margin: 0 }}>Enter your details to begin your free cognitive assessment.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Name + Email */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 100%', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required
                style={{ padding: '13px 16px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '16px', background: '#F8FAFC', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: '1 1 100%', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Email Address</label>
              <div style={{ position: 'relative', width: '100%' }}>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required disabled={isEmailVerified}
                  style={{ padding: '13px 16px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '16px', background: isEmailVerified ? '#F1F5F9' : '#F8FAFC', outline: 'none', width: '100%', boxSizing: 'border-box', color: isEmailVerified ? '#64748B' : '#0F172A', transition: 'border-color 0.2s' }} 
                  onFocus={(e) => e.target.style.borderColor = '#3B82F6'}
                  onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
                />
                {!isEmailVerified && formData.email && (
                  <button type="button" onClick={handleVerifyEmail} disabled={isSendingOtp} style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', padding: '8px 14px', background: '#3B82F6', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: isSendingOtp ? 'not-allowed' : 'pointer', zIndex: 10, boxShadow: '0 4px 10px rgba(59,130,246,0.3)', opacity: isSendingOtp ? 0.7 : 1 }}>
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
          </div>

          {/* Age + Gender */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 calc(50% - 8px)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Age</label>
              <input type="number" name="age" value={formData.age} onChange={handleChange} min="18" max="66" placeholder="22" required
                style={{ padding: '13px 16px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '16px', background: '#F8FAFC', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: '1 1 calc(50% - 8px)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} required
                style={{ padding: '13px 16px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '16px', background: '#F8FAFC', color: '#0F172A', outline: 'none', width: '100%', boxSizing: 'border-box' }}>
                <option value="">Select Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>
          </div>

          {showOtpBox && !isEmailVerified && (
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

          {/* Error */}
          {formError && (
            <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '10px', padding: '12px 16px', color: '#ef4444', fontSize: '15px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
              ⚠️ {formError}
            </div>
          )}

          {/* Submit */}
          <button type="submit" disabled={isSubmitting}
            style={{
              width: '100%', padding: '15px',
              background: 'linear-gradient(135deg, #3B82F6, #2563EB)',
              color: '#fff', border: 'none', borderRadius: '12px',
              fontSize: '17px', fontWeight: '700', cursor: isSubmitting ? 'not-allowed' : 'pointer',
              display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px',
              boxShadow: '0 8px 24px rgba(59,130,246,0.35)', marginTop: '4px',
              opacity: isSubmitting ? 0.7 : 1, transition: 'all 0.2s'
            }}
          >
            {isSubmitting ? '⏳ Starting Assessment...' : 'Start Free Assessment →'}
          </button>

          <p style={{ textAlign: 'center', fontSize: '13px', color: '#94a3b8', margin: 0 }}>
            🔒 100% Private & Secure. Your data is never shared.
          </p>
        </form>
      </div>
    </div>
  );
};

export default AssessmentModal;

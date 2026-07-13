import React, { useState } from 'react';
import './EnquiryModal.css'; // Reusing the same styles for consistency
import { submitEnquiry } from '../lib/backendApi';

const FeedbackModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // Backend stores the enquiry AND emails the admin inbox
      // (replaces the old formsubmit.co call).
      await submitEnquiry({
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
        onClose();
      }, 3000);

    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again or verify the database table exists.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content" style={{ maxWidth: '420px', borderRadius: '20px', padding: '40px', background: '#fff' }}>
        <button className="close-btn" onClick={onClose} style={{ position: 'absolute', top: '16px', right: '20px', background: 'none', border: 'none', fontSize: '30px', cursor: 'pointer', color: '#64748b' }}>&times;</button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '62px', marginBottom: '16px' }}>✅</div>
            <h3 style={{ color: '#0F172A', marginBottom: '8px' }}>Thank You!</h3>
            <p style={{ color: '#6B7280', fontSize: '22px' }}>Your feedback has been successfully submitted.</p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ color: '#0F172A', fontSize: '30px', fontWeight: '800', marginBottom: '6px' }}>Send Feedback</h2>
              <p style={{ color: '#6B7280', fontSize: '21px', margin: 0 }}>We value your input and enquiries.</p>
            </div>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '15px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Full Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" required
                  style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '18px', outline: 'none', transition: 'border-color 0.2s', fontFamily: 'inherit' }}
                  onFocus={(e) => e.target.style.borderColor = '#6366F1'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '15px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required
                  style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '18px', outline: 'none', transition: 'border-color 0.2s', fontFamily: 'inherit' }}
                  onFocus={(e) => e.target.style.borderColor = '#6366F1'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '15px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Message / Feedback</label>
                <textarea name="message" value={formData.message} onChange={handleChange} placeholder="How can we help you or what is your feedback?" required
                  style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '18px', outline: 'none', transition: 'border-color 0.2s', fontFamily: 'inherit', minHeight: '120px', resize: 'vertical' }}
                  onFocus={(e) => e.target.style.borderColor = '#6366F1'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
              </div>

              {errorMsg && (
                <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '10px 14px', color: '#ef4444', fontSize: '15px', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  ⚠️ {errorMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: '14px',
                  background: 'linear-gradient(135deg, #F59E0B, #FB923C)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '22px',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 14px rgba(245,158,11,0.35)',
                  marginTop: '4px',
                  opacity: isSubmitting ? 0.7 : 1
                }}
              >
                {isSubmitting ? 'Sending...' : 'Submit Feedback →'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default FeedbackModal;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateAssessmentQuestions } from '../lib/apiUtils';
import { registerUser } from '../lib/backendApi';

const AssessmentModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', age: '', gender: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

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
        background: 'rgba(15,23,42,0.7)', backdropFilter: 'blur(6px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div style={{
        background: '#fff', borderRadius: '24px', padding: '40px',
        width: '100%', maxWidth: '520px', position: 'relative',
        boxShadow: '0 32px 64px rgba(0,0,0,0.2)'
      }}>
        {/* Close Button */}
        <button onClick={onClose} style={{
          position: 'absolute', top: '16px', right: '20px',
          background: 'none', border: 'none', fontSize: '24px',
          cursor: 'pointer', color: '#94a3b8', lineHeight: 1
        }}>✕</button>

        {/* Modal Header */}
        <div style={{ marginBottom: '28px' }}>
          <img src="/img/limitless-logo.webp" alt="Limitless" style={{ width: '48px', height: '48px', objectFit: 'contain', marginBottom: '12px' }} />
          <h3 style={{ fontSize: '26px', fontWeight: '800', color: '#0F172A', margin: '0 0 6px 0' }}>Start Your Journey</h3>
          <p style={{ fontSize: '16px', color: '#64748B', margin: 0 }}>Enter your details to begin your free cognitive assessment.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Name + Email */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 180px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required
                style={{ padding: '13px 16px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '16px', background: '#F8FAFC', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: '1 1 180px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="john@example.com" required
                style={{ padding: '13px 16px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '16px', background: '#F8FAFC', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
            </div>
          </div>

          {/* Age + Gender */}
          <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 100px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Age (18-66)</label>
              <input type="number" name="age" value={formData.age} onChange={handleChange} min="18" max="66" placeholder="22" required
                style={{ padding: '13px 16px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '16px', background: '#F8FAFC', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
            </div>
            <div style={{ flex: '1 1 160px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Gender</label>
              <select name="gender" value={formData.gender} onChange={handleChange} required
                style={{ padding: '13px 16px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '16px', background: '#F8FAFC', color: '#0F172A', outline: 'none', width: '100%', boxSizing: 'border-box' }}>
                <option value="">Select Gender</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>
          </div>

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

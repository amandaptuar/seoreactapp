import React, { useState } from 'react';
import './EnquiryModal.css';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import bcrypt from 'bcryptjs';

const EnquiryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: '', email: '', age: '', gender: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errorMsg) setErrorMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // 1. Generate temp password and hash
      const generatedPassword = Math.random().toString(36).slice(-8).toUpperCase();
      const passwordHash = await bcrypt.hash(generatedPassword, 10);

      // 2. Insert User into Supabase FIRST (To catch duplicate emails immediately)
      let dbUserId = null;

      const { data: newUser, error: insertErr } = await supabase
        .from('users')
        .insert([{
          name: formData.name,
          email: formData.email,
          temp_password: generatedPassword,
          password_hash: passwordHash,
          password_reset_required: true,
          payment_status: 'pending',
        }])
        .select('id')
        .single();

      if (insertErr) {
        // Postgres error code 23505 means Unique Constraint Violation
        const errString = JSON.stringify(insertErr).toLowerCase();
        const isDuplicate = insertErr.code === '23505' ||
          errString.includes('duplicate') ||
          errString.includes('unique') ||
          errString.includes('already exists');

        if (isDuplicate) {
          setErrorMsg('This email is already registered. Please log in instead.');
          setIsSubmitting(false);
          return; // Halts the flow completely before generating AI questions
        }

        console.warn('Supabase insert error details:', insertErr);
        throw new Error(`DB Error: ${insertErr.message || insertErr.details || 'Unknown error'}`);
      }

      dbUserId = newUser.id;

      // 3. Generate questions from Limitless API
      let genderForApi = formData.gender;

      const apiResponse = await fetch('/api/v1/generate-questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ age: parseInt(formData.age, 10), gender: genderForApi })
      });

      if (!apiResponse.ok) throw new Error('Failed to generate assessment questions.');

      const questionsData = await apiResponse.json();

      // 4. FormSubmit notification (fire and forget)
      fetch('https://formsubmit.co/ajax/info@limitlessworld.net', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: formData.name, email: formData.email,
          _subject: `New Assessment Enquiry from ${formData.name}`,
          _template: 'box', _replyto: formData.email
        }),
      }).catch(() => { });

      // 5. Save to localStorage
      localStorage.setItem('assessmentId', questionsData.assessmentId);
      localStorage.setItem('assessmentSections', JSON.stringify(questionsData.sections));
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('username', formData.email);
      localStorage.setItem('name', formData.name);
      localStorage.setItem('userAge', formData.age);
      localStorage.setItem('userGender', formData.gender);
      localStorage.setItem('generatedPassword', generatedPassword);
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('passwordResetRequired', 'true');
      if (dbUserId) localStorage.setItem('userId', dbUserId);

      // 6. Navigate to questions
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
      <div className="modal-content" style={{ maxWidth: '420px', borderRadius: '20px', padding: '40px', background: '#fff' }}>
        <button className="close-btn" onClick={onClose} style={{ position: 'absolute', top: '16px', right: '20px', background: 'none', border: 'none', fontSize: '30px', cursor: 'pointer', color: '#64748b' }}>&times;</button>

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

              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                  <label style={{ fontSize: '15px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Age</label>
                  <input type="number" name="age" value={formData.age} onChange={handleChange} min="10" max="80" placeholder="e.g. 22" required
                    style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '18px', outline: 'none', transition: 'border-color 0.2s', fontFamily: 'inherit', width: '100%' }}
                    onFocus={(e) => e.target.style.borderColor = '#6366F1'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                  <label style={{ fontSize: '15px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} required
                    style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '18px', background: '#fff', color: '#0F172A', outline: 'none', fontFamily: 'inherit', width: '100%' }}>
                    <option value="">Select</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>
              </div>

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
                {isLoggedIn ? 'You are already logged in' : isSubmitting ? 'Starting...' : 'Start Assessment →'}
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

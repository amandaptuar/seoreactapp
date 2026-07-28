import React, { useState } from 'react';
import { forgotPassword, resetPassword } from '../lib/backendApi';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1); // 1 = Email, 2 = OTP + New Password, 3 = Success
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await forgotPassword(email);
      setStep(2);
    } catch (err) {
      setError(err.message || 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      await resetPassword(email, otp, newPassword);
      setStep(3);
    } catch (err) {
      setError(err.message || 'Invalid OTP or failed to reset password.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()} style={{ position: 'fixed', inset: 0, background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999 }}>
      <div className="modal-content" style={{ width: '100%', maxWidth: '420px', borderRadius: '20px', padding: '40px', background: '#fff', position: 'relative', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '20px', background: 'none', border: 'none', fontSize: '30px', cursor: 'pointer', color: '#64748b' }}>&times;</button>

        {step === 3 ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '62px', marginBottom: '16px' }}>✅</div>
            <h3 style={{ color: '#0F172A', marginBottom: '8px', fontSize: '26px' }}>Password Reset!</h3>
            <p style={{ color: '#6B7280', fontSize: '16px', marginBottom: '24px' }}>Your password has been successfully updated.</p>
            <button
              onClick={onClose}
              style={{ padding: '14px', width: '100%', background: 'linear-gradient(135deg, #F59E0B, #FB923C)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '18px', cursor: 'pointer', boxShadow: '0 4px 14px rgba(245,158,11,0.35)', fontFamily: 'inherit' }}
            >
              Back to Login
            </button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ color: '#0F172A', fontSize: '28px', fontWeight: '800', marginBottom: '6px' }}>Reset Password</h2>
              <p style={{ color: '#6B7280', fontSize: '16px', margin: 0 }}>
                {step === 1 ? "Enter your email and we'll send you an OTP." : `Enter the OTP sent to ${email} and your new password.`}
              </p>
            </div>

            {error && (
              <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '10px 14px', color: '#ef4444', fontSize: '14px', marginBottom: '16px' }}>
                ⚠️ {error}
              </div>
            )}

            {step === 1 ? (
              <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '16px', outline: 'none', transition: 'border-color 0.2s', fontFamily: 'inherit' }}
                    onFocus={(e) => e.target.style.borderColor = '#7C3AED'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading || !email}
                  style={{ padding: '14px', background: '#7C3AED', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '16px', cursor: (isLoading || !email) ? 'not-allowed' : 'pointer', marginTop: '4px', fontFamily: 'inherit', opacity: (isLoading || !email) ? 0.7 : 1 }}
                >
                  {isLoading ? 'Sending OTP…' : 'Send OTP'}
                </button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Verification Code (OTP)</label>
                  <input
                    type="text"
                    placeholder="6-digit OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    maxLength={6}
                    style={{ padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '16px', outline: 'none', transition: 'border-color 0.2s', fontFamily: 'inherit', textAlign: 'center', letterSpacing: '2px', fontWeight: '600' }}
                    onFocus={(e) => e.target.style.borderColor = '#7C3AED'}
                    onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>New Password</label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Min 6 characters"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={6}
                      style={{ width: '100%', padding: '12px 16px', paddingRight: '44px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '16px', outline: 'none', transition: 'border-color 0.2s', fontFamily: 'inherit', boxSizing: 'border-box' }}
                      onFocus={(e) => e.target.style.borderColor = '#7C3AED'}
                      onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                    />
                    <svg
                      width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ position: 'absolute', right: '14px', cursor: 'pointer', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.stroke = '#0F172A'}
                      onMouseLeave={(e) => e.currentTarget.style.stroke = '#64748b'}
                    >
                      {showPassword ? (
                        <>
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </>
                      ) : (
                        <>
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </>
                      )}
                    </svg>
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={isLoading || !otp || newPassword.length < 6}
                  style={{ padding: '14px', background: '#7C3AED', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '16px', cursor: (isLoading || !otp || newPassword.length < 6) ? 'not-allowed' : 'pointer', marginTop: '4px', fontFamily: 'inherit', opacity: (isLoading || !otp || newPassword.length < 6) ? 0.7 : 1 }}
                >
                  {isLoading ? 'Resetting…' : 'Reset Password'}
                </button>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;

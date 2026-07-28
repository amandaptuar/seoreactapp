import React, { useState } from 'react';
import { changePassword } from '../lib/backendApi';

const ChangePasswordModal = ({ isOpen, userId, onSuccess }) => {
  const [currentPwd, setCurrentPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPwd, setShowPwd] = useState({});

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (newPwd.length < 6) { setError('New password must be at least 6 characters.'); return; }
    if (newPwd !== confirmPwd) { setError('Passwords do not match.'); return; }

    setIsLoading(true);
    try {
      // Backend verifies the current password (temp or user-set), stores the
      // new bcrypt hash, and clears the first-login reset flag.
      const email = sessionStorage.getItem('userEmail');
      if (!email) throw new Error('Could not verify your identity. Please log in again.');

      await changePassword(email, currentPwd, newPwd);

      setSuccess(true);
      setTimeout(() => { onSuccess(); }, 2000);
    } catch (err) {
      setError(err.status === 401 ? 'Current password is incorrect.' : err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 99999, backdropFilter: 'blur(8px)' }}>
      <div style={{ background: '#fff', borderRadius: '24px', padding: '40px', width: '100%', maxWidth: '440px', boxShadow: '0 25px 60px rgba(0,0,0,0.3)', position: 'relative' }}>
        {success ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>✅</div>
            <h3 style={{ color: '#0F172A', fontSize: '26px', fontWeight: '800', marginBottom: '8px' }}>Password Updated!</h3>
            <p style={{ color: '#64748B', fontSize: '18px' }}>You can now use your new password to log in.</p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '28px' }}>
              <div style={{ width: '52px', height: '52px', background: 'linear-gradient(135deg, #F59E0B, #FB923C)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', marginBottom: '16px' }}>🔐</div>
              <h2 style={{ color: '#0F172A', fontSize: '26px', fontWeight: '800', margin: '0 0 6px' }}>Set Your Password</h2>
              <p style={{ color: '#64748B', fontSize: '16px', margin: 0 }}>
                Your account was created with a temporary password. Please set a new one to continue.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'Current / Temporary Password', value: currentPwd, setter: setCurrentPwd, placeholder: 'Enter your temporary password' },
                { label: 'New Password', value: newPwd, setter: setNewPwd, placeholder: 'Min. 6 characters' },
                { label: 'Confirm New Password', value: confirmPwd, setter: setConfirmPwd, placeholder: 'Repeat new password' },
              ].map(({ label, value, setter, placeholder }) => (
                <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</label>
                  <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                    <input
                      type={showPwd[label] ? "text" : "password"}
                      placeholder={placeholder}
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      required
                      style={{ width: '100%', padding: '12px 16px', paddingRight: '44px', borderRadius: '10px', border: '1.5px solid #E2E8F0', fontSize: '16px', outline: 'none', transition: 'border-color 0.2s', fontFamily: 'inherit', boxSizing: 'border-box' }}
                      onFocus={(e) => e.target.style.borderColor = '#F59E0B'}
                      onBlur={(e) => e.target.style.borderColor = '#E2E8F0'}
                    />
                    <svg
                      width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      onClick={() => setShowPwd(prev => ({ ...prev, [label]: !prev[label] }))}
                      style={{ position: 'absolute', right: '14px', cursor: 'pointer', transition: 'color 0.2s' }}
                      onMouseEnter={(e) => e.currentTarget.style.stroke = '#0F172A'}
                      onMouseLeave={(e) => e.currentTarget.style.stroke = '#64748B'}
                    >
                      {showPwd[label] ? (
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
              ))}

              {error && (
                <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '10px 14px', color: '#EF4444', fontSize: '15px' }}>
                  ⚠️ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                style={{ padding: '14px', background: 'linear-gradient(135deg, #F59E0B, #FB923C)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '17px', cursor: isLoading ? 'not-allowed' : 'pointer', marginTop: '4px', boxShadow: '0 4px 14px rgba(245,158,11,0.35)', fontFamily: 'inherit' }}
              >
                {isLoading ? 'Updating…' : 'Set New Password →'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ChangePasswordModal;

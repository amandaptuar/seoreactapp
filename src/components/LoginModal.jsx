import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../lib/backendApi';
import ChangePasswordModal from './ChangePasswordModal';

const LoginModal = ({ isOpen, onClose, onOpenAssessment }) => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(null);
  const navigate = useNavigate();

  if (!isOpen && !showChangePassword) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Backend verifies the password (temp or user-set), returns a JWT,
      // the user, and their latest assessment. Session data is stored by
      // loginUser (same sessionStorage keys as before).
      const { user } = await loginUser(identifier, password);

      setIsSuccess(true);
      setLoggedInUserId(user.id);

      setTimeout(() => {
        onClose();
        if (user.password_reset_required) {
          setShowChangePassword(true);
        } else {
          navigate('/dashboard');
        }
      }, 1000);

    } catch (err) {
      setError(err.status === 401 ? 'Invalid email or password. Please try again.' : err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* First-login password reset modal */}
      {showChangePassword && (
        <ChangePasswordModal
          isOpen={showChangePassword}
          userId={loggedInUserId}
          onSuccess={() => {
            setShowChangePassword(false);
            navigate('/dashboard');
          }}
        />
      )}

      {/* Main Login Modal */}
      {isOpen && (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
          <div className="modal-content" style={{ maxWidth: '420px', borderRadius: '20px', padding: '40px', background: '#fff', position: 'relative' }}>
            <button onClick={onClose} style={{ position: 'absolute', top: '16px', right: '20px', background: 'none', border: 'none', fontSize: '30px', cursor: 'pointer', color: '#64748b' }}>&times;</button>

            {isSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: '62px', marginBottom: '16px' }}>✅</div>
                <h3 style={{ color: '#0F172A', marginBottom: '8px', fontSize: '26px' }}>Login Successful!</h3>
                <p style={{ color: '#6B7280', fontSize: '18px' }}>Welcome back! Redirecting…</p>
              </div>
            ) : (
              <>
                <div style={{ marginBottom: '24px' }}>
                  <h2 style={{ color: '#0F172A', fontSize: '28px', fontWeight: '800', marginBottom: '6px' }}>Welcome Back</h2>
                  <p style={{ color: '#6B7280', fontSize: '18px', margin: 0 }}>Sign in to your Limitless account.</p>
                </div>

                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email Address</label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                      required
                      style={{ padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '18px', outline: 'none', transition: 'border-color 0.2s', fontFamily: 'inherit' }}
                      onFocus={(e) => e.target.style.borderColor = '#F59E0B'}
                      onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <label style={{ fontSize: '13px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Password</label>
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{ padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '18px', outline: 'none', transition: 'border-color 0.2s', fontFamily: 'inherit' }}
                      onFocus={(e) => e.target.style.borderColor = '#F59E0B'}
                      onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                    />
                  </div>

                  {error && (
                    <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '10px 14px', color: '#ef4444', fontSize: '16px' }}>
                      ⚠️ {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{ padding: '14px', background: 'linear-gradient(135deg, #F59E0B, #FB923C)', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '18px', cursor: isLoading ? 'not-allowed' : 'pointer', boxShadow: '0 4px 14px rgba(245,158,11,0.35)', marginTop: '4px', fontFamily: 'inherit' }}
                  >
                    {isLoading ? 'Signing In…' : 'Log In →'}
                  </button>
                </form>

                <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '16px', color: '#64748b', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                  New user?{' '}
                  <a
                    href="#hero-form-section"
                    onClick={(e) => {
                      e.preventDefault();
                      onClose();
                      if (onOpenAssessment) {
                        onOpenAssessment();
                      } else {
                        const el = document.getElementById('hero-form-section');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                        else navigate('/');
                      }
                    }}
                    style={{ color: '#0F172A', fontWeight: '700', textDecoration: 'none' }}
                  >
                    Create Account
                  </a>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LoginModal;

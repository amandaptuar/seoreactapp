import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

const LoginModal = ({ isOpen, onClose }) => {
  const [identifier, setIdentifier] = useState(''); // email or username
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Mock login check using localStorage
      const savedEmail = localStorage.getItem('userEmail');
      const savedUsername = localStorage.getItem('username');
      const savedPassword = localStorage.getItem('generatedPassword');

      if (!savedEmail && !savedUsername) {
        throw new Error('User not found. Please create an account first.');
      }

      if (identifier !== savedEmail && identifier !== savedUsername) {
        throw new Error('User not found');
      }

      if (password !== savedPassword) {
        throw new Error('Incorrect password');
      }

      // Success
      localStorage.setItem('isLoggedIn', 'true');
      
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
        window.location.reload(); // Refresh to update Header
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-content" style={{ maxWidth: '420px', borderRadius: '20px', padding: '40px', background: '#fff' }}>
        <button className="close-btn" onClick={onClose} style={{ position: 'absolute', top: '16px', right: '20px', background: 'none', border: 'none', fontSize: '30px', cursor: 'pointer', color: '#64748b' }}>&times;</button>
        
        {isSuccess ? (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div style={{ fontSize: '62px', marginBottom: '16px' }}>✅</div>
            <h3 style={{ color: '#0F172A', marginBottom: '8px' }}>Login Successful!</h3>
            <p style={{ color: '#6B7280', fontSize: '22px' }}>Welcome back, {identifier}.</p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ color: '#0F172A', fontSize: '30px', fontWeight: '800', marginBottom: '6px' }}>Welcome Back</h2>
              <p style={{ color: '#6B7280', fontSize: '21px', margin: 0 }}>Sign in to your Limitless account.</p>
            </div>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '18px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Username or Email</label>
                <input 
                  type="text" 
                  placeholder="Your username or email" 
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required 
                  style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '22px', outline: 'none', transition: 'border-color 0.2s' }}
                  onFocus={(e) => e.target.style.borderColor = '#F59E0B'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '18px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Password</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                  style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '22px', outline: 'none', transition: 'border-color 0.2s' }}
                  onFocus={(e) => e.target.style.borderColor = '#F59E0B'}
                  onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              {error && (
                <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '8px', padding: '10px 14px', color: '#ef4444', fontSize: '20px' }}>
                  ⚠️ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                style={{
                  padding: '14px',
                  background: 'linear-gradient(135deg, #F59E0B, #FB923C)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '22px',
                  cursor: isLoading ? 'not-allowed' : 'pointer',
                  boxShadow: '0 4px 14px rgba(245,158,11,0.35)',
                  marginTop: '4px'
                }}
              >
                {isLoading ? 'Signing In...' : 'Log In →'}
              </button>
            </form>

            <div style={{ marginTop: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <a href="#" onClick={(e) => { e.preventDefault(); alert('Password reset instructions sent to your email.'); }} style={{ color: '#64748b', fontSize: '20px', fontWeight: '500', textDecoration: 'none' }}>Forgot your password?</a>
              <div style={{ fontSize: '21px', color: '#64748b', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                New user? <a href="#hero-form-section" onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  const heroForm = document.getElementById('hero-form-section');
                  if (heroForm) {
                    heroForm.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    navigate('/#hero-form-section');
                  }
                }} style={{ color: '#0F172A', fontWeight: '700', marginLeft: '4px', textDecoration: 'none' }}>Create Account</a>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  closeBtn: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    background: 'none',
    border: 'none',
    fontSize: '33px',
    cursor: 'pointer',
    color: '#888'
  }
};

export default LoginModal;

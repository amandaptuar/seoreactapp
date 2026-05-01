import React, { useState, useEffect } from 'react';
import limitlessLogo from '../assets/limitless-logo.webp';
import LoginModal from './LoginModal';
import EnquiryModal from './EnquiryModal';

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [showUserDetails, setShowUserDetails] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) {
      setIsLoggedIn(true);
      setUsername(localStorage.getItem('username') || '');
      setUserEmail(localStorage.getItem('userEmail') || '');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('username');
    setIsLoggedIn(false);
    window.location.reload();
  };

  return (
    <header id="stickyHeader" style={{ background: '#FFFFFF', borderBottom: '1px solid rgba(0,0,0,0.08)', padding: '12px 0', position: 'fixed', width: '100%', top: 0, zIndex: 10001 }}>
      <div className="container">
        <div className="top-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div className="logo">
            <a href="/">
              <img
                alt="logo"
                src={limitlessLogo}
                style={{
                  maxWidth: '180px',
                  maxHeight: '60px',
                  objectFit: 'contain',
                  transform: 'scale(1.4)',
                  transformOrigin: 'left center',
                  marginLeft: '-10px'
                }}
              />
            </a>
          </div>

          <div className="header-buttons" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
            {isLoggedIn ? (
              <>
                <button
                  className="btn"
                  onClick={handleLogout}
                  style={{
                    padding: '10px 24px',
                    background: '#ef4444',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Logout
                </button>
                <div style={{ position: 'relative' }}>
                  <div 
                    onClick={() => setShowUserDetails(!showUserDetails)}
                    style={{
                      width: '40px', height: '40px', borderRadius: '50%', background: '#0F172A', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                    }}
                    title="User Profile"
                  >
                    {username ? username.charAt(0).toUpperCase() : '👤'}
                  </div>
                  {showUserDetails && (
                    <div style={{ position: 'absolute', top: '50px', right: '0', background: '#fff', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', padding: '16px', minWidth: '200px', zIndex: 10002, border: '1px solid #e2e8f0' }}>
                      <p style={{ margin: '0 0 4px', fontWeight: '700', color: '#0F172A', fontSize: '15px' }}>{username}</p>
                      <p style={{ margin: 0, color: '#64748b', fontSize: '13px', wordBreak: 'break-all' }}>{userEmail}</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button
                  className="btn"
                  onClick={() => setIsLoginOpen(true)}
                  style={{
                    padding: '10px 24px',
                    background: '#0F172A',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: '700',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('hero-form-section');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  style={{
                    background: '#D97706',
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: '14px',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 14px rgba(217, 119, 6, 0.4)'
                  }}
                >
                  Start Assessment
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
    </header>
  );
};

export default Header;

import React, { useState, useEffect } from 'react';
import limitlessLogo from '../assets/limitless-logo.webp';
import LoginModal from './LoginModal';
import EnquiryModal from './EnquiryModal';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('no');
  const [showUserDetails, setShowUserDetails] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (loggedIn) {
      setIsLoggedIn(true);
      setUsername(localStorage.getItem('username') || '');
      setUserEmail(localStorage.getItem('userEmail') || '');
      setPaymentStatus(localStorage.getItem('paymentStatus') || 'no');
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
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', position: 'fixed', top: '20px', zIndex: 10001, padding: '0 20px' }}>
      <header id="stickyHeader" style={{ 
        background: '#040B16', 
        borderRadius: '20px', 
        padding: '16px 32px', 
        width: '100%', 
        maxWidth: '1440px', 
        boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between'
      }}>
        
        {/* Left Side: Logo */}
        <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/">
            <img
              alt="logo"
              src={limitlessLogo}
              style={{
                maxWidth: '240px',
                maxHeight: '65px',
                objectFit: 'contain',
              }}
            />
          </Link>
        </div>

        {/* Right Side: Contact & Actions */}
        <div className="header-buttons" style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', gap: '24px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="header-phone">
            <i className="fa-solid fa-phone" style={{ color: '#60A5FA', fontSize: '20px' }}></i>
            <a href="tel:+17025550147" style={{ color: '#FFFFFF', fontWeight: '600', fontSize: '19px', textDecoration: 'none' }}>+1 (702) 555-0147</a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {isLoggedIn ? (
              <>
                {paymentStatus === 'yes' ? (
                  <button
                    onClick={() => navigate('/dashboard')}
                    style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', padding: '12px 24px', color: '#FFF', fontSize: '18px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}
                  >
                    <i className="fa-solid fa-chart-line"></i> Dashboard
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/payment')}
                    style={{ background: 'linear-gradient(90deg, #F97316 0%, #EA580C 100%)', border: 'none', borderRadius: '12px', padding: '12px 24px', color: '#FFF', fontSize: '18px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(234,88,12,0.4)' }}
                  >
                    <i className="fa-solid fa-credit-card"></i> Pay Now
                  </button>
                )}
                
                <div style={{ position: 'relative' }}>
                  <div 
                    onClick={() => setShowUserDetails(!showUserDetails)}
                    style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }}
                    title="User Profile"
                  >
                    {username ? username.charAt(0).toUpperCase() : '👤'}
                  </div>
                  {showUserDetails && (
                    <div style={{ position: 'absolute', top: '60px', right: '0', background: '#FFFFFF', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', padding: '20px', minWidth: '220px', zIndex: 10002 }}>
                      <p style={{ margin: '0 0 4px', fontWeight: '800', color: '#0F172A', fontSize: '20px' }}>{username}</p>
                      <p style={{ margin: '0 0 16px', color: '#64748B', fontSize: '16px', wordBreak: 'break-all' }}>{userEmail}</p>
                      <button onClick={handleLogout} style={{ width: '100%', padding: '10px', background: '#FEE2E2', color: '#EF4444', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsLoginOpen(true)}
                  style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', padding: '12px 24px', color: '#FFF', fontSize: '18px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <i className="fa-regular fa-user"></i> Login
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('hero-form-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  style={{ background: 'linear-gradient(90deg, #F97316 0%, #EA580C 100%)', border: 'none', borderRadius: '12px', padding: '12px 24px', color: '#FFF', fontSize: '18px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(234,88,12,0.4)', transition: 'transform 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(234,88,12,0.6)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(234,88,12,0.4)'; }}
                >
                  <i className="fa-solid fa-rocket"></i> Start Assessment
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Global CSS for Header Responsiveness */}
      <style>{`
        @media (max-width: 992px) {
          .header-phone { display: none !important; }
        }
        @media (max-width: 640px) {
          #stickyHeader { padding: 12px 16px !important; }
          .header-buttons button { padding: 10px 16px !important; font-size: 14px !important; }
          .header-buttons button i { font-size: 14px !important; }
          .logo img { max-width: 140px !important; }
        }
        @media (max-width: 480px) {
          .header-buttons { gap: 8px !important; }
          .header-buttons button { padding: 8px 12px !important; font-size: 12px !important; gap: 4px !important; }
        }
      `}</style>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
    </div>
  );
};

export default Header;

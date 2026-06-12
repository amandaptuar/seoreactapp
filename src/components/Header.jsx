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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <img
              alt="logo"
              src={limitlessLogo}
              style={{
                maxWidth: '240px',
                maxHeight: '65px',
                objectFit: 'contain',
              }}
            />
            <div className="logo-text" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '12px' }}>
              <span className="logo-title" style={{ color: '#FFF', fontSize: '30px', fontWeight: '800', lineHeight: '1', letterSpacing: '1px', margin: 0 }}>LIMITLESS</span>
              <span className="logo-subtitle" style={{ color: '#F97316', fontSize: '14px', fontWeight: '800', letterSpacing: '1px', marginTop: '4px', textTransform: 'uppercase' }}>UNLOCK YOUR TRUE POTENTIAL</span>
            </div>
          </Link>
        </div>

        {/* Right Side: Contact & Actions */}
        <div className="header-buttons" style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'center', gap: '24px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }} className="header-phone">
            <i className="fa-solid fa-phone" style={{ color: '#60A5FA', fontSize: '22px' }}></i>
            <a href="tel:+17025550147" style={{ color: '#FFFFFF', fontWeight: '600', fontSize: '21px', textDecoration: 'none' }}>+1 (702) 555-0147</a>
          </div>

          <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {isLoggedIn ? (
              <>
                {paymentStatus === 'yes' ? (
                  <button
                    onClick={() => navigate('/dashboard')}
                    style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', padding: '12px 24px', color: '#FFF', fontSize: '20px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}
                  >
                    <i className="fa-solid fa-chart-line"></i> Dashboard
                  </button>
                ) : (
                  <button
                    onClick={() => navigate('/payment')}
                    style={{ background: 'linear-gradient(90deg, #F97316 0%, #EA580C 100%)', border: 'none', borderRadius: '12px', padding: '12px 24px', color: '#FFF', fontSize: '20px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(234,88,12,0.4)' }}
                  >
                    <i className="fa-solid fa-credit-card"></i> Pay Now
                  </button>
                )}
                
                <div style={{ position: 'relative' }}>
                  <div 
                    onClick={() => setShowUserDetails(!showUserDetails)}
                    style={{ width: '46px', height: '46px', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }}
                    title="User Profile"
                  >
                    {username ? username.charAt(0).toUpperCase() : '👤'}
                  </div>
                  {showUserDetails && (
                    <div style={{ position: 'absolute', top: '60px', right: '0', background: '#FFFFFF', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.2)', padding: '20px', minWidth: '220px', zIndex: 10002 }}>
                      <p style={{ margin: '0 0 4px', fontWeight: '800', color: '#0F172A', fontSize: '22px' }}>{username}</p>
                      <p style={{ margin: '0 0 16px', color: '#64748B', fontSize: '18px', wordBreak: 'break-all' }}>{userEmail}</p>
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
                  style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', padding: '12px 24px', color: '#FFF', fontSize: '20px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                >
                  <i className="fa-regular fa-user"></i> SIGN-IN
                </button>
                <button
                  onClick={() => setIsEnquiryOpen(true)}
                  style={{ background: 'linear-gradient(90deg, #F97316 0%, #EA580C 100%)', border: 'none', borderRadius: '12px', padding: '12px 24px', color: '#FFF', fontSize: '20px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 14px rgba(234,88,12,0.4)', transition: 'transform 0.2s' }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(234,88,12,0.6)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(234,88,12,0.4)'; }}
                >
                  <i className="fa-solid fa-rocket"></i> Start Assessment
                </button>
              </>
            )}
          </div>

          {/* Hamburger Icon */}
          <button 
            className="hamburger-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ background: 'transparent', border: 'none', color: '#FFF', fontSize: '30px', cursor: 'pointer', display: 'none', padding: '0 8px' }}
          >
            <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="mobile-dropdown" style={{
          position: 'absolute',
          top: '90px',
          left: '20px',
          right: '20px',
          background: '#040B16',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          zIndex: 10000,
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          {isLoggedIn ? (
            <>
              <div style={{ padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px', marginBottom: '8px' }}>
                <p style={{ margin: '0 0 4px', fontWeight: '800', color: '#FFF', fontSize: '20px' }}>{username || 'User'}</p>
                <p style={{ margin: '0', color: '#94A3B8', fontSize: '16px', wordBreak: 'break-all' }}>{userEmail}</p>
              </div>
              
              {paymentStatus === 'yes' ? (
                <button
                  onClick={() => { setIsMobileMenuOpen(false); navigate('/dashboard'); }}
                  style={{ width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', padding: '16px', color: '#FFF', fontSize: '18px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <i className="fa-solid fa-chart-line"></i> Dashboard
                </button>
              ) : (
                <button
                  onClick={() => { setIsMobileMenuOpen(false); navigate('/payment'); }}
                  style={{ width: '100%', background: 'linear-gradient(90deg, #F97316 0%, #EA580C 100%)', border: 'none', borderRadius: '12px', padding: '16px', color: '#FFF', fontSize: '18px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                >
                  <i className="fa-solid fa-credit-card"></i> Pay Now
                </button>
              )}
              <button 
                onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }} 
                style={{ width: '100%', padding: '16px', background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', fontSize: '18px' }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => { setIsMobileMenuOpen(false); setIsLoginOpen(true); }}
                style={{ width: '100%', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '12px', padding: '16px', color: '#FFF', fontSize: '18px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <i className="fa-regular fa-user"></i> SIGN-IN
              </button>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsEnquiryOpen(true);
                }}
                style={{ width: '100%', background: 'linear-gradient(90deg, #F97316 0%, #EA580C 100%)', border: 'none', borderRadius: '12px', padding: '16px', color: '#FFF', fontSize: '18px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <i className="fa-solid fa-rocket"></i> Start Assessment
              </button>
            </>
          )}
        </div>
      )}

      {/* Global CSS for Header Responsiveness */}
      <style>{`
        @media (max-width: 992px) {
          .header-phone { display: none !important; }
        }
        @media (max-width: 768px) {
          .logo-title { font-size: 20px !important; }
          .logo-subtitle { font-size: 10px !important; letter-spacing: 0.5px !important; }
          .logo img { max-width: 140px !important; }
          
          /* Show burger and hide desktop menu on tablets and phones */
          .desktop-menu { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
        @media (max-width: 640px) {
          #stickyHeader { padding: 12px 16px !important; }
          .logo img { max-width: 80px !important; }
          .logo-title { font-size: 18px !important; }
          .logo-subtitle { font-size: 9px !important; letter-spacing: 0px !important; margin-top: 2px !important; }
        }
        @media (max-width: 480px) {
          /* On very small screens */
          .logo img { max-width: 50px !important; }
          .logo-title { font-size: 16px !important; }
          .logo-subtitle { font-size: 7.5px !important; }
          .hamburger-btn { font-size: 24px !important; }
        }
      `}</style>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
      <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
    </div>
  );
};

export default Header;

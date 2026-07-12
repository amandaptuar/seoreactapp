import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import limitlessLogo from '../assets/limitless-logo.webp';
import LoginModal from './LoginModal';
import AssessmentModal from './AssessmentModal';

const Header = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => sessionStorage.getItem('isLoggedIn') === 'true');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('userEmail');
    sessionStorage.removeItem('username');
    setIsLoggedIn(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <style>{`
        .global-header {
          background: #060919;
          padding: 20px 0;
          width: 100%;
          position: relative;
          z-index: 1000;
        }
        .global-header .wrap {
          max-width: 100%;
          margin: 0 auto;
          padding: 0 40px;
        }
        .global-header .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          position: relative;
        }
        .global-header .logo-area {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .global-header .logo-mark {
          width: 120px;
          height: 120px;
          object-fit: contain;
        }
        .global-header .logo-text-group {
          line-height: 1.1;
          margin-left: 0px;
        }
        .global-header .logo-text {
          color: #fff;
          font-weight: 800;
          font-size: 26px;
          letter-spacing: 0.5px;
        }
        .global-header .logo-sub {
          color: #f97316;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
        }
        .global-header .nav-links {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .global-header .header-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .global-header .nav-link {
          color: #fff;
          text-decoration: none;
          font-weight: 600;
          font-size: 16px;
          padding: 8px 12px;
          display: flex;
          align-items: center;
          transition: color 0.2s ease;
        }
        .global-header .nav-link:hover {
          color: #F97316;
        }
        .global-header .btn-outline {
          background: transparent;
          color: #fff;
          border: 2px solid rgba(255,255,255,0.5);
          border-radius: 14px;
          padding: 10px 24px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          height: 44px;
        }
        .global-header .btn-outline:hover {
          background: rgba(255,255,255,0.1);
          border-color: #fff;
        }
        .global-header .btn-orange {
          background: #f97316;
          color: #fff;
          border: none;
          border-radius: 14px;
          padding: 0 24px;
          font-weight: 600;
          font-size: 15px;
          cursor: pointer;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          white-space: nowrap;
        }
        .global-header .hamburger {
          display: none;
          flex-direction: column;
          gap: 6px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
          z-index: 101;
        }
        .global-header .hamburger span {
          display: block;
          width: 30px;
          height: 3px;
          background: #fff;
          border-radius: 2px;
          transition: all 0.3s ease;
        }
        .global-header .hamburger.open span:nth-child(1) { transform: translateY(9px) rotate(45deg); }
        .global-header .hamburger.open span:nth-child(2) { opacity: 0; }
        .global-header .hamburger.open span:nth-child(3) { transform: translateY(-9px) rotate(-45deg); }

        @media (max-width: 992px) {
          .global-header .header-inner {
            display: flex;
            justify-content: space-between;
          }
          .global-header .nav-links {
            position: relative;
            left: 0;
            transform: none;
            width: 100%;
          }
          .global-header .hamburger { display: flex; }
          .global-header .mobile-menu-wrapper {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
            background: #060919;
            flex-direction: column;
            padding: 20px;
            gap: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            display: none;
            border-top: 1px solid rgba(255,255,255,0.1);
          }
          .global-header .mobile-menu-wrapper.mobile-open { display: flex; }
          .global-header .nav-links { flex-direction: column; align-items: stretch; gap: 4px; }
          .global-header .header-actions { flex-direction: column; width: 100%; align-items: stretch; gap: 12px; }
          .global-header .nav-link { padding: 12px; font-size: 18px; border-bottom: 1px solid rgba(255,255,255,0.05); }
          .global-header .btn-outline, .global-header .btn-orange { width: 100%; justify-content: center; }
        }
        @media (max-width: 480px) {
          .global-header .logo-mark { width: 80px; height: 80px; }
          .global-header .logo-text { font-size: 16px; }
          .global-header .logo-sub { font-size: 7px; }
          .global-header .wrap { padding: 0 20px; }
        }
      `}</style>

      <header className="global-header">
        <div className="wrap header-inner">
          <Link to="/" className="logo-area" style={{ textDecoration: 'none' }}>
            <img src={limitlessLogo} alt="Limitless Logo" className="logo-mark" />
            <div className="logo-text-group">
              <div className="logo-text">LIMITLESS</div>
              <div className="logo-sub">UNLOCK YOUR TRUE POTENTIAL</div>
            </div>
          </Link>

          <div className={`mobile-menu-wrapper ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <nav className="nav-links">
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="nav-link">Home</Link>
              <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="nav-link">About</Link>
              <Link to="/features" onClick={() => setIsMobileMenuOpen(false)} className="nav-link">Features</Link>
              <Link to="/benefits" onClick={() => setIsMobileMenuOpen(false)} className="nav-link">Benefits</Link>
              <Link to="/how-it-works" onClick={() => setIsMobileMenuOpen(false)} className="nav-link">How It Works</Link>
              <Link to="/pricing" onClick={() => setIsMobileMenuOpen(false)} className="nav-link">Pricing</Link>
              <Link to="/join-us" onClick={() => setIsMobileMenuOpen(false)} className="nav-link">Join Now</Link>
            </nav>
            
            <div className="header-actions">
              {isLoggedIn ? (
                <>
                  <button className="btn-outline" onClick={() => { navigate('/dashboard'); setIsMobileMenuOpen(false); }}>
                    Dashboard
                  </button>
                  <button onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }} className="btn-orange">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button className="btn-outline" onClick={() => { setIsMobileMenuOpen(false); setIsLoginOpen(true); }}>
                    Login
                  </button>
                  <button onClick={() => { setIsMobileMenuOpen(false); setIsAssessmentOpen(true); }} className="btn-orange">
                    Start Assessment ➔
                  </button>
                </>
              )}
            </div>
          </div>

          <button 
            className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onOpenAssessment={() => setIsAssessmentOpen(true)} />
      <AssessmentModal isOpen={isAssessmentOpen} onClose={() => setIsAssessmentOpen(false)} />
    </>
  );
};

export default Header;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import limitlessLogo from '../assets/limitless-logo.webp';
import EnquiryModal from './EnquiryModal';

const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <footer className="gap no-bottom text-white" style={{ backgroundImage: "url('./assets/img/footer_bg.jpeg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#18191d' }}>
        <div className="container">
          <div className="footer-try">
            <div>
              <h2 className="text-white">Start Improving Your Focus &amp; Performance Today</h2>
              <p className="text-white">Get your personalized cognitive report in minutes.</p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="button btn"
            >
              <span><span>Start My Assessment</span></span>
            </button>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="footer-logo">
                <img src={limitlessLogo} alt="img" style={{ maxWidth: '250px', maxHeight: '90px', objectFit: 'contain' }} />
                <p className="text-white">Limitless is a holistic cognitive performance system delivered directly to your phone. We eliminate the friction between data and execution.</p>
                <div style={{ marginTop: '15px', padding: '15px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', borderLeft: '3px solid #F59E0B' }}>
                  <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0, lineHeight: 1.5 }}>
                    <strong>Disclaimer:</strong> This is not a medical diagnosis. Our cognitive assessment is designed for informational and self-optimization purposes only.
                  </p>
                </div>
                <ul className="social-media" style={{ marginTop: '20px' }}>
                  <li><a href="https://www.facebook.com/limitlessworldnet" target="_blank" rel="noopener noreferrer"><i className="fa-brands fa-facebook-f"></i></a></li>
                  <li><a href="https://x.com/limitless1964" target="_blank" rel="noopener noreferrer"><i className="flaticon-twitter"></i></a></li>
                  <li><a href="#"><i className="flaticon-instagram"></i></a></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-12">
              <div className="widget-title">
                <h3 className="text-white">Useful Links</h3>
                <ul>
                  <li><i className="fa-solid fa-angles-right"></i><Link to="/" onClick={() => setTimeout(() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'}), 100)} className="text-white">The Problem</Link></li>
                  <li><i className="fa-solid fa-angles-right"></i><Link to="/" onClick={() => setTimeout(() => document.getElementById('services')?.scrollIntoView({behavior: 'smooth'}), 100)} className="text-white">The Process</Link></li>
                  <li><i className="fa-solid fa-angles-right"></i><Link to="/" onClick={() => setTimeout(() => document.getElementById('pillars')?.scrollIntoView({behavior: 'smooth'}), 100)} className="text-white">Pillars</Link></li>
                  <li><i className="fa-solid fa-angles-right"></i><Link to="/" onClick={() => setTimeout(() => document.getElementById('pricing')?.scrollIntoView({behavior: 'smooth'}), 100)} className="text-white">Pricing</Link></li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="widget-title">
                <h3 className="text-white">Contact Us</h3>

                <div className="get-in-touch">
                  <div><i className="flaticon-iphone"></i></div>
                  <div>
                    <span>Email Address:</span>
                    <h6><a href="mailto:info@limitless.com" className="text-white">info@limitless.com</a></h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ul className="shaps-img">
          <li><img src="./assets/img/shaps-4.png" alt="img" /></li>
          <li><img src="./assets/img/shaps-1.png" alt="img" /></li>
          <li><img src="./assets/img/shaps-2.png" alt="img" /></li>
        </ul>
      </footer>

      <div className="bottom-bar" style={{ backgroundColor: '#0d0d0d', padding: '20px 0' }}>
        <div className="container">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <p className="text-white mb-0" style={{ fontSize: '14px' }}>Limitless Holistic Cognition © 2026. All Rights Reserved.</p>
            <div className="d-flex align-items-center gap-3">
              <Link to="/privacy-policy" className="text-white" style={{ fontSize: '14px', textDecoration: 'none' }}>Privacy Policy</Link>
              <span className="text-white" style={{ fontSize: '14px' }}>|</span>
              <Link to="/terms-conditions" className="text-white" style={{ fontSize: '14px', textDecoration: 'none' }}>Terms of Condition</Link>
            </div>
            <ul className="social-media d-flex mb-0" style={{ gap: '15px', listStyle: 'none', padding: 0, margin: 0 }}>
              <li><a href="https://www.facebook.com/limitlessworldnet" target="_blank" rel="noopener noreferrer" className="text-white" style={{ fontSize: '16px' }}><i className="fa-brands fa-facebook-f"></i></a></li>
              <li><a href="https://x.com/limitless1964" target="_blank" rel="noopener noreferrer" className="text-white" style={{ fontSize: '16px' }}><i className="fa-brands fa-twitter"></i></a></li>
              <li><a href="#" className="text-white" style={{ fontSize: '16px' }}><i className="fa-brands fa-instagram"></i></a></li>
              <li><a href="#" className="text-white" style={{ fontSize: '16px' }}><i className="fa-brands fa-linkedin-in"></i></a></li>
            </ul>
          </div>
        </div>
      </div>

      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default Footer;

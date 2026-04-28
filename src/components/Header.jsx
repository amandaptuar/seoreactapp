import React, { useState } from 'react';
import limitlessLogo from '../assets/limitless-logo.webp';
import EnquiryModal from './EnquiryModal';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <header id="stickyHeader">
      <div className="container">
        <div className="top-bar">
          <div className="logo">
            <a href="#">
              <img alt="logo" src={limitlessLogo} style={{ maxWidth: '220px', maxHeight: '80px', objectFit: 'contain', transform: 'scale(1.4)', transformOrigin: 'left center', marginLeft: '-20px' }} />
            </a>
          </div>
          <nav className="navbar">
              <ul className="navbar-links">
                <li className="navbar-dropdown">
                  <a href="/#about">The Problem</a>
                </li>
                <li className="navbar-dropdown">
                  <a href="/#services">The Process</a>
                </li>
                <li className="navbar-dropdown">
                  <a href="/#pillars">Pillars</a>
                </li>
                <li className="navbar-dropdown">
                  <a href="/#pricing">Pricing</a>
                </li>
              </ul>
            </nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <button className="btn" onClick={() => setIsModalOpen(true)} style={{ padding: '10px 20px', background: 'var(--primary, #e9a132)', color: '#000', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s ease' }}>
              Send Enquiry
            </button>
            <a href="callto:+12344502086"><i className="flaticon-smart-phone"></i><b> +1234 450 2086</b></a>
          </div>
        </div>
      </div>
      <EnquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </header>
  );
};

export default Header;

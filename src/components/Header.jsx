import React from 'react';
import limitlessLogo from '../assets/limitless-logo.webp';

const Header = () => {
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
                  <a href="#about">The Problem</a>
                </li>
                <li className="navbar-dropdown">
                  <a href="#services">The Process</a>
                </li>
                <li className="navbar-dropdown">
                  <a href="#pillars">Pillars</a>
                </li>
                <li className="navbar-dropdown">
                  <a href="#pricing">Pricing</a>
                </li>
              </ul>
            </nav>
          <a href="callto:+12344502086"><i className="flaticon-smart-phone"></i><b> +1234 450 2086</b></a>
        </div>
      </div>
    </header>
  );
};

export default Header;

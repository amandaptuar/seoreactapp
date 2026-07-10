import React from 'react';
import { Link } from 'react-router-dom';
import limitlessLogo from '../assets/limitless-logo.webp';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="limitless-footer">
      <div className="footer-inner">
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="logo-area" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <img src={limitlessLogo} alt="Limitless Logo" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ fontSize: '24px', fontWeight: '800', letterSpacing: '-0.5px', color: '#fff' }}>LIMITLESS</div>
                <div style={{ fontSize: '11px', fontWeight: '700', letterSpacing: '1.5px', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase' }}>UNLOCK YOUR TRUE POTENTIAL</div>
              </div>
            </Link>
            <p>Science-backed cognitive performance platform designed to help you unlock your true potential.</p>
            <div className="footer-social">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <div className="footer-links-double">
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About</Link></li>
                <li><Link to="/features">Features</Link></li>
                <li><Link to="/benefits">Benefits</Link></li>
              </ul>
              <ul>
                <li><Link to="/how-it-works">How It Works</Link></li>
                <li><Link to="/pricing">Pricing</Link></li>
                <li><Link to="/join-us">Join Now</Link></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
          </div>

          {/* Resources */}
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><Link to="/contact">Blog</Link></li>
              <li><Link to="/contact">FAQs</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="footer-col">
            <h4>Contact Us</h4>
            <div className="footer-contact-item">
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              <span>+1 (702) 555-0147</span>
            </div>
            <div className="footer-contact-item">
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
              <span>hello@limitlessworld.net</span>
            </div>
            <div className="footer-contact-item">
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
              <span>123 Mindful Way, Suite 100<br />Las Vegas, NV 89101, USA</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © 2025 Limitless. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

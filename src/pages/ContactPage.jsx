import React, { useEffect, useState } from 'react';
import './ContactPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import limitlessLogo from '../assets/limitless-logo.webp';
const ContactPage = () => {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => setOpenFaq(openFaq === index ? null : index);

  useEffect(() => {
    document.title = "Limitless – Contact Us";
  }, []);

  return (
    <>
      <Header />
      <div className="limitless-contact">

{/*  ═══════════════════════════════════════
     HERO
═══════════════════════════════════════  */}
<section className="hero">
  {/*  Floating icons  */}
  <div className="hero-icons">
    <div className="hero-icon hi-1">
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
      </svg>
    </div>
    <div className="hero-icon hi-2">
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
      </svg>
    </div>
    <div className="hero-icon hi-3">
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
      </svg>
    </div>
    <div className="hero-icon hi-4">
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
      </svg>
    </div>
  </div>

  <div className="hero-content">
    <div className="hero-badge">CONTACT US</div>
    <h1>We're Here to Help You<br /><span>Unlock Your Potential.</span></h1>
    <div className="hero-divider"></div>
    <p className="hero-sub">Have a question, need support, or want to learn more about Limitless? Our team is ready to connect with you.</p>
    <div className="hero-badges">
      <div className="hero-badge-item">
        <div className="hero-badge-icon">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </div>
        <div className="hero-badge-text">
          <strong>Quick Response</strong>
          <span>We reply within 24 hours</span>
        </div>
      </div>
      <div className="hero-badge-item">
        <div className="hero-badge-icon">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
          </svg>
        </div>
        <div className="hero-badge-text">
          <strong>Trusted Support</strong>
          <span>Here to help you succeed</span>
        </div>
      </div>
      <div className="hero-badge-item">
        <div className="hero-badge-icon">
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
          </svg>
        </div>
        <div className="hero-badge-text">
          <strong>100% Confidential</strong>
          <span>Your privacy is our priority</span>
        </div>
      </div>
    </div>
  </div>

  {/*  Brain SVG illustration  */}
  <div className="hero-brain">
    <svg viewBox="0 0 360 300" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="brainGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#A855F7" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
        </radialGradient>
        <linearGradient id="brainFill" x1="0" y1="0" x2="360" y2="300" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.15"/>
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/*  Glow backdrop  */}
      <ellipse cx="200" cy="140" rx="140" ry="120" fill="url(#brainGlow)" opacity="0.7"/>

      {/*  Brain outline - left hemisphere  */}
      <path d="M130 100 C110 85 90 90 82 110 C74 130 80 155 95 165 C85 175 82 195 95 205 C105 215 120 212 130 200 C125 210 128 225 140 230 C155 235 170 225 175 210 L175 140 L175 95 C165 80 145 80 130 100Z" 
            stroke="#A855F7" strokeWidth="1.5" fill="url(#brainFill)" filter="url(#glow)"/>

      {/*  Brain outline - right hemisphere  */}
      <path d="M175 95 L175 210 C180 225 195 235 210 230 C222 225 225 210 220 200 C230 212 245 215 255 205 C268 195 265 175 255 165 C270 155 276 130 268 110 C260 90 240 85 220 100 C205 80 185 80 175 95Z" 
            stroke="#60A5FA" strokeWidth="1.5" fill="url(#brainFill)" filter="url(#glow)"/>

      {/*  Neural network lines  */}
      <g filter="url(#glow)" opacity="0.75">
        {/*  nodes  */}
        <circle cx="175" cy="95" r="5" fill="#A855F7"/>
        <circle cx="130" cy="130" r="4" fill="#7C3AED"/>
        <circle cx="220" cy="120" r="4" fill="#60A5FA"/>
        <circle cx="155" cy="165" r="4" fill="#A855F7"/>
        <circle cx="200" cy="170" r="4" fill="#818CF8"/>
        <circle cx="175" cy="210" r="5" fill="#A855F7"/>
        <circle cx="105" cy="155" r="3.5" fill="#7C3AED"/>
        <circle cx="245" cy="155" r="3.5" fill="#60A5FA"/>
        <circle cx="140" cy="200" r="3.5" fill="#A855F7"/>
        <circle cx="210" cy="200" r="3.5" fill="#818CF8"/>
        <circle cx="175" cy="140" r="3.5" fill="#C4B5FD"/>
        {/*  connections  */}
        <line x1="175" y1="95" x2="130" y2="130" stroke="#A855F7" strokeWidth="1" opacity="0.7"/>
        <line x1="175" y1="95" x2="220" y2="120" stroke="#60A5FA" strokeWidth="1" opacity="0.7"/>
        <line x1="130" y1="130" x2="155" y2="165" stroke="#A855F7" strokeWidth="1" opacity="0.6"/>
        <line x1="130" y1="130" x2="105" y2="155" stroke="#7C3AED" strokeWidth="1" opacity="0.6"/>
        <line x1="220" y1="120" x2="200" y2="170" stroke="#60A5FA" strokeWidth="1" opacity="0.6"/>
        <line x1="220" y1="120" x2="245" y2="155" stroke="#60A5FA" strokeWidth="1" opacity="0.6"/>
        <line x1="105" y1="155" x2="140" y2="200" stroke="#7C3AED" strokeWidth="1" opacity="0.5"/>
        <line x1="245" y1="155" x2="210" y2="200" stroke="#60A5FA" strokeWidth="1" opacity="0.5"/>
        <line x1="155" y1="165" x2="175" y2="210" stroke="#A855F7" strokeWidth="1" opacity="0.6"/>
        <line x1="200" y1="170" x2="175" y2="210" stroke="#818CF8" strokeWidth="1" opacity="0.6"/>
        <line x1="155" y1="165" x2="175" y2="140" stroke="#C4B5FD" strokeWidth="1" opacity="0.5"/>
        <line x1="200" y1="170" x2="175" y2="140" stroke="#C4B5FD" strokeWidth="1" opacity="0.5"/>
        <line x1="140" y1="200" x2="175" y2="210" stroke="#A855F7" strokeWidth="1" opacity="0.5"/>
        <line x1="210" y1="200" x2="175" y2="210" stroke="#818CF8" strokeWidth="1" opacity="0.5"/>
      </g>

      {/*  Envelope at bottom  */}
      <g transform="translate(50, 220)" filter="url(#glow)">
        <rect x="0" y="0" width="80" height="55" rx="6" stroke="#A855F7" strokeWidth="1.5" fill="rgba(124,58,237,0.1)"/>
        <polyline points="0,0 40,28 80,0" stroke="#A855F7" strokeWidth="1.5" fill="none"/>
      </g>

      {/*  Stars/particles  */}
      <circle cx="80" cy="70" r="2" fill="#A855F7" opacity="0.8"/>
      <circle cx="290" cy="80" r="1.5" fill="#60A5FA" opacity="0.7"/>
      <circle cx="300" cy="220" r="2" fill="#A855F7" opacity="0.6"/>
      <circle cx="60" cy="200" r="1.5" fill="#818CF8" opacity="0.7"/>
      <circle cx="320" cy="150" r="1.5" fill="#C4B5FD" opacity="0.6"/>
    </svg>
  </div>
</section>

{/*  ═══════════════════════════════════════
     FORM + GET IN TOUCH
═══════════════════════════════════════  */}
<div className="main-content">
  {/*  Form  */}
  <div className="form-section">
    <h2>Send Us a Message</h2>
    <p>Fill out the form below and we'll get back to you.</p>

    <div className="form-group">
      <div className="form-field">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
        </svg>
        <input type="text" placeholder="Full Name"/>
      </div>
    </div>
    <div className="form-group">
      <div className="form-field">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
        <input type="email" placeholder="Email Address"/>
      </div>
    </div>
    <div className="form-group">
      <div className="form-field">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
        </svg>
        <input type="tel" placeholder="Phone Number"/>
      </div>
    </div>
    <div className="form-group">
      <div className="form-field">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
        </svg>
        <input type="text" placeholder="Subject"/>
      </div>
    </div>
    <div className="form-group">
      <div className="form-field">
        <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" style={{alignSelf: 'flex-start', marginTop: '2px'}}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
        </svg>
        <textarea placeholder="Your Message"></textarea>
      </div>
    </div>

    <button className="btn-send">
      Send Message
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
      </svg>
    </button>

    <div className="form-privacy">
      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
      </svg>
      Your information is safe with us. We never share your data.
    </div>
  </div>

  {/*  Contact Info  */}
  <div className="contact-info">
    <h2>Get in Touch</h2>
    <p>Choose the best way to reach us.</p>

    <div className="contact-item">
      <div className="contact-icon">
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
        </svg>
      </div>
      <div className="contact-item-text">
        <strong>Phone</strong>
        <span>+1 (702) 555-0147</span>
        <span>Mon - Fri, 9:00 AM – 6:00 PM (PST)</span>
      </div>
    </div>

    <div className="contact-item">
      <div className="contact-icon">
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      </div>
      <div className="contact-item-text">
        <strong>Email</strong>
        <span>support@limitless.com</span>
        <span>We'll reply within 24 hours</span>
      </div>
    </div>


    <div className="contact-item">
      <div className="contact-icon">
        <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"/>
        </svg>
      </div>
      <div className="contact-item-text">
        <strong>Follow Us</strong>
        <span>Stay connected for updates</span>
        <div className="social-icons" style={{marginTop: '10px'}}>
          {/*  Facebook  */}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
            </svg>
          </a>
          {/*  Instagram  */}
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram">
            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>
          {/*  LinkedIn  */}
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
          {/*  YouTube  */}
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="YouTube">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/>
              <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>

{/*  ═══════════════════════════════════════
     FAQ
═══════════════════════════════════════  */}
<section className="faq-section">
  <div className="faq-inner">
    <div className="section-header">
      <h2>Frequently Asked Questions</h2>
    </div>
    <div className="faq-grid">
      {/*  Column 1  */}
      <div>
        <div className={`faq-item ${openFaq === 0 ? "open" : ""}`} onClick={() => toggleFaq(0)}>
          <div className="faq-question">
            What is Limitless?
            <div className="faq-chevron"><svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg></div>
          </div>
          <div className="faq-answer">Limitless is a science-backed cognitive performance platform designed to help you unlock your true potential and achieve better brain health.</div>
        </div>
        <div className={`faq-item ${openFaq === 1 ? "open" : ""}`} onClick={() => toggleFaq(1)}>
          <div className="faq-question">
            How does the assessment work?
            <div className="faq-chevron"><svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg></div>
          </div>
          <div className="faq-answer">Our assessment is a comprehensive series of cognitive tests that measure memory, focus, processing speed, and other key brain functions to provide personalized insights.</div>
        </div>
        <div className={`faq-item ${openFaq === 2 ? "open" : ""}`} onClick={() => toggleFaq(2)}>
          <div className="faq-question">
            Is my data safe and private?
            <div className="faq-chevron"><svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg></div>
          </div>
          <div className="faq-answer">Absolutely. We take your privacy seriously and use industry-standard encryption to protect all your personal and assessment data. We never sell or share your data.</div>
        </div>
        <div className={`faq-item ${openFaq === 3 ? "open" : ""}`} onClick={() => toggleFaq(3)}>
          <div className="faq-question">
            How long does the assessment take?
            <div className="faq-chevron"><svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg></div>
          </div>
          <div className="faq-answer">The full assessment typically takes 20–30 minutes to complete. You can pause and resume at any time, so it fits around your schedule.</div>
        </div>
      </div>

      {/*  Column 2  */}
      <div>
        <div className={`faq-item ${openFaq === 4 ? "open" : ""}`} onClick={() => toggleFaq(4)}>
          <div className="faq-question">
            Who can benefit from Limitless?
            <div className="faq-chevron"><svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg></div>
          </div>
          <div className="faq-answer">Anyone looking to improve their cognitive performance — students, professionals, athletes, seniors, or simply those who want a sharper mind can benefit from Limitless.</div>
        </div>
        <div className={`faq-item ${openFaq === 5 ? "open" : ""}`} onClick={() => toggleFaq(5)}>
          <div className="faq-question">
            Can I retake the assessment?
            <div className="faq-chevron"><svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg></div>
          </div>
          <div className="faq-answer">Yes! We recommend retaking the assessment every few months to track your progress and see how your cognitive performance is improving over time.</div>
        </div>
        <div className={`faq-item ${openFaq === 6 ? "open" : ""}`} onClick={() => toggleFaq(6)}>
          <div className="faq-question">
            How will I receive my results?
            <div className="faq-chevron"><svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg></div>
          </div>
          <div className="faq-answer">Results are delivered instantly in your personalized dashboard. You'll also receive a detailed PDF report via email with actionable recommendations tailored to you.</div>
        </div>
        <div className={`faq-item ${openFaq === 7 ? "open" : ""}`} onClick={() => toggleFaq(7)}>
          <div className="faq-question">
            Do you offer support if I have questions?
            <div className="faq-chevron"><svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg></div>
          </div>
          <div className="faq-answer">Yes! Our support team is available 24/7 via live chat and email. We're committed to ensuring you have the best experience with Limitless.</div>
        </div>
      </div>
    </div>
  </div>
</section>

{/*  ═══════════════════════════════════════
     GLOBAL PRESENCE
═══════════════════════════════════════  */}
<section className="global-section">
  <div className="section-header">
    <h2>Our Global Presence</h2>
    <p>We're a remote-first team, helping people around the world.</p>
  </div>
  <div className="global-inner">
    <div className="world-map-wrap">
      <img src="/contactpage/image%20copy.png" alt="Global Presence" style={{ width: '100%', height: 'auto', borderRadius: '16px' }} />
    </div>

    <div className="global-right">
      <div className="global-badge">
        <div className="global-badge-icon">
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#7C3AED" strokeWidth="2">
            <circle cx="12" cy="12" r="10"/>
            <line x1="2" y1="12" x2="22" y2="12"/>
            <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
          </svg>
        </div>
      </div>
      <h2>Global Community</h2>
      <p>Join thousands of individuals from 100+ countries on their journey to better brain health and a better life.</p>
      <div className="stats-row">
        <div className="stat-item">
          <div className="stat-number">100+</div>
          <div className="stat-label">Countries</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">2,300+</div>
          <div className="stat-label">Happy Users</div>
        </div>
        <div className="stat-item">
          <div className="stat-number">24/7</div>
          <div className="stat-label">Support</div>
        </div>
      </div>
    </div>
  </div>
</section>

</div>
    <Footer />
    </>
  );
};

export default ContactPage;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AboutPage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutPage = () => {
  useEffect(() => {
    document.title = "Limitless – About Us";
  }, []);

  return (
    <>
      <Header />
      <div className="limitless-about">
        {/* ════════════ HERO ════════════ */}
        <section className="hero">
          <div className="hero-content">
            <div className="hero-badge">ABOUT LIMITLESS</div>
            <h1>Science-Backed Insights.<br />Stronger Minds. <span>Better Lives.</span></h1>
            <p className="hero-sub">Limitless is an AI-powered cognitive performance platform designed to help you understand your brain, unlock your true potential, and live a healthier, more focused life.</p>
            <div className="hero-trust">
              <div className="hero-trust-item">
                <div className="hero-trust-icon">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                </div>
                <div className="hero-trust-text"><strong>Science-Backed</strong><span>Built on proven research</span></div>
              </div>
              <div className="hero-trust-item">
                <div className="hero-trust-icon">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                </div>
                <div className="hero-trust-text"><strong>AI-Powered</strong><span>Advanced &amp; accurate</span></div>
              </div>
              <div className="hero-trust-item">
                <div className="hero-trust-icon">
                  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                </div>
                <div className="hero-trust-text"><strong>Trusted by 2,300+</strong><span>Users worldwide</span></div>
              </div>
            </div>
          </div>

          {/* Hero Brain */}
          <div className="hero-visual">
            <svg viewBox="0 0 340 280" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="bg1" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#A855F7" stopOpacity="0.5"/><stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/></radialGradient>
                <linearGradient id="bl1" x1="0" y1="0" x2="340" y2="280" gradientUnits="userSpaceOnUse"><stop offset="0%" stopColor="#7C3AED" stopOpacity="0.12"/><stop offset="100%" stopColor="#3B82F6" stopOpacity="0.08"/></linearGradient>
                <filter id="glow2"><feGaussianBlur stdDeviation="2.5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              </defs>
              <ellipse cx="185" cy="125" rx="130" ry="110" fill="url(#bg1)" opacity="0.8"/>
              {/* Left hemisphere */}
              <path d="M115 95 C97 80 78 86 70 105 C62 124 68 148 83 158 C74 168 71 187 83 197 C93 206 108 203 117 192 C112 201 115 215 126 220 C140 225 154 215 159 201 L159 130 L159 88 C150 74 130 74 115 95Z" stroke="#A855F7" strokeWidth="1.5" fill="url(#bl1)" filter="url(#glow2)"/>
              {/* Right hemisphere */}
              <path d="M159 88 L159 201 C164 215 178 225 192 220 C203 215 206 201 201 192 C210 203 225 206 235 197 C247 187 244 168 235 158 C250 148 256 124 248 105 C240 86 221 80 203 95 C190 74 170 74 159 88Z" stroke="#60A5FA" strokeWidth="1.5" fill="url(#bl1)" filter="url(#glow2)"/>
              {/* Neural nodes */}
              <g filter="url(#glow2)" opacity="0.85">
                <circle cx="159" cy="88" r="4.5" fill="#A855F7"/>
                <circle cx="115" cy="122" r="3.5" fill="#7C3AED"/>
                <circle cx="203" cy="112" r="3.5" fill="#60A5FA"/>
                <circle cx="140" cy="155" r="3.5" fill="#A855F7"/>
                <circle cx="180" cy="160" r="3.5" fill="#818CF8"/>
                <circle cx="159" cy="200" r="4.5" fill="#A855F7"/>
                <circle cx="90" cy="147" r="3" fill="#7C3AED"/>
                <circle cx="228" cy="147" r="3" fill="#60A5FA"/>
                <circle cx="126" cy="192" r="3" fill="#A855F7"/>
                <circle cx="193" cy="190" r="3" fill="#818CF8"/>
                <circle cx="159" cy="132" r="3" fill="#C4B5FD"/>
                {/* Lines */}
                <line x1="159" y1="88" x2="115" y2="122" stroke="#A855F7" strokeWidth="1" opacity="0.7"/>
                <line x1="159" y1="88" x2="203" y2="112" stroke="#60A5FA" strokeWidth="1" opacity="0.7"/>
                <line x1="115" y1="122" x2="140" y2="155" stroke="#A855F7" strokeWidth="1" opacity="0.6"/>
                <line x1="115" y1="122" x2="90" y2="147" stroke="#7C3AED" strokeWidth="1" opacity="0.6"/>
                <line x1="203" y1="112" x2="180" y2="160" stroke="#60A5FA" strokeWidth="1" opacity="0.6"/>
                <line x1="203" y1="112" x2="228" y2="147" stroke="#60A5FA" strokeWidth="1" opacity="0.6"/>
                <line x1="90" y1="147" x2="126" y2="192" stroke="#7C3AED" strokeWidth="1" opacity="0.5"/>
                <line x1="228" y1="147" x2="193" y2="190" stroke="#60A5FA" strokeWidth="1" opacity="0.5"/>
                <line x1="140" y1="155" x2="159" y2="200" stroke="#A855F7" strokeWidth="1" opacity="0.6"/>
                <line x1="180" y1="160" x2="159" y2="200" stroke="#818CF8" strokeWidth="1" opacity="0.6"/>
                <line x1="140" y1="155" x2="159" y2="132" stroke="#C4B5FD" strokeWidth="1" opacity="0.5"/>
                <line x1="180" y1="160" x2="159" y2="132" stroke="#C4B5FD" strokeWidth="1" opacity="0.5"/>
                <line x1="126" y1="192" x2="159" y2="200" stroke="#A855F7" strokeWidth="1" opacity="0.5"/>
                <line x1="193" y1="190" x2="159" y2="200" stroke="#818CF8" strokeWidth="1" opacity="0.5"/>
              </g>
              {/* Ground glow rings */}
              <ellipse cx="159" cy="240" rx="120" ry="18" stroke="#A855F7" strokeWidth="1" opacity="0.3" fill="none"/>
              <ellipse cx="159" cy="240" rx="90" ry="13" stroke="#7C3AED" strokeWidth="1" opacity="0.2" fill="none"/>
              {/* Sparkle dots */}
              <circle cx="65" cy="65" r="2" fill="#A855F7" opacity="0.8"/>
              <circle cx="275" cy="75" r="1.5" fill="#60A5FA" opacity="0.7"/>
              <circle cx="285" cy="195" r="2" fill="#A855F7" opacity="0.6"/>
              <circle cx="55" cy="185" r="1.5" fill="#818CF8" opacity="0.7"/>
            </svg>
          </div>
        </section>

        {/* ════════════ OUR STORY ════════════ */}
        <section>
          <div className="our-story">
            <div className="story-content">
              <div className="story-label">OUR STORY</div>
              <h2>The Journey Behind Limitless</h2>
              <p>Limitless was born from a simple belief — everyone deserves the chance to understand their brain and improve their life.</p>
              <p>For too long, cognitive health was treated as an afterthought. When people experienced brain fog, memory lapses, or chronic stress, the tools to understand these changes were often expensive, clinical, and inaccessible to the general public. We knew there had to be a better way.</p>
              <p>Our founders, a diverse team of neuroscientists, data scientists, and behavioral psychologists, came together with a shared mission: to democratize brain health. We wanted to take the same rigorous, scientifically validated assessments used in clinical settings and make them engaging, personalized, and available to anyone with a smartphone or computer.</p>
              <p>We spent years refining our AI models, cross-referencing thousands of data points to ensure that our insights were not just accurate, but highly actionable. We didn't just want to give people a score; we wanted to give them a roadmap to a sharper, healthier mind.</p>
              <p>Today, Limitless helps thousands of people worldwide discover insights that lead to better focus, reduced stress, stronger memory, and overall well-being. Whether you are looking to optimize your peak performance or protect your cognitive longevity, we are here to guide you every step of the way.</p>
              <a href="#mission-section" className="btn-outline" onClick={(e) => { e.preventDefault(); document.getElementById('mission-section')?.scrollIntoView({ behavior: 'smooth' }); }}>Our Mission &amp; Vision</a>
            </div>

            <div className="story-visual">
              <img src="/aboutuspage/image.png" alt="Our Story" />
            </div>
          </div>
        </section>

        {/* ════════════ STATS BAR ════════════ */}
        <div className="stats-bar">
          <div className="stats-inner">
            {/* Happy Users */}
            <div className="stat-item">
              <div className="stat-icon">
                <svg width="38" height="38" fill="none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="11" fill="rgba(124,58,237,0.1)" stroke="rgba(124,58,237,0.2)" strokeWidth="1"/>
                  <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" stroke="#7C3AED" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" transform="translate(0,0) scale(0.7) translate(5,5)"/>
                </svg>
              </div>
              <div className="stat-number">2,300+</div>
              <div className="stat-label">Happy Users</div>
            </div>
            {/* Assessments */}
            <div className="stat-item">
              <div className="stat-icon">
                <svg width="38" height="38" fill="none" viewBox="0 0 38 38">
                  <circle cx="19" cy="19" r="18" fill="rgba(245,158,11,0.1)" stroke="rgba(245,158,11,0.2)" strokeWidth="1"/>
                  <path d="M19 10 L21.5 16 L28 16.5 L23 21 L24.5 27.5 L19 24 L13.5 27.5 L15 21 L10 16.5 L16.5 16 Z" stroke="#F59E0B" strokeWidth="1.5" fill="rgba(245,158,11,0.15)" strokeLinejoin="round" transform="scale(0.65) translate(10,10)"/>
                </svg>
              </div>
              <div className="stat-number">50+</div>
              <div className="stat-label">Assessments Completed</div>
            </div>
            {/* Private */}
            <div className="stat-item">
              <div className="stat-icon">
                <svg width="38" height="38" fill="none" viewBox="0 0 38 38">
                  <circle cx="19" cy="19" r="18" fill="rgba(16,185,129,0.1)" stroke="rgba(16,185,129,0.2)" strokeWidth="1"/>
                  <path d="M12 22v-2a7 7 0 1114 0v2" stroke="#10B981" strokeWidth="1.5" fill="none" strokeLinecap="round" transform="translate(3,3) scale(0.65)"/>
                  <path d="M9 22h14v7a2 2 0 01-2 2H11a2 2 0 01-2-2v-7z" stroke="#10B981" strokeWidth="1.5" fill="rgba(16,185,129,0.15)" transform="translate(3,3) scale(0.65)"/>
                </svg>
              </div>
              <div className="stat-number">100%</div>
              <div className="stat-label">Private &amp; Secure</div>
            </div>
            {/* Science-Backed */}
            <div className="stat-item">
              <div className="stat-icon">
                <svg width="38" height="38" fill="none" viewBox="0 0 38 38">
                  <circle cx="19" cy="19" r="18" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.2)" strokeWidth="1"/>
                  <path d="M9 21l3-6 3 4 3-8 3 6 3-3" stroke="#3B82F6" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" transform="translate(1,1) scale(0.78)"/>
                </svg>
              </div>
              <div className="stat-number">Science-Backed</div>
              <div className="stat-label">Research &amp; Models</div>
            </div>
            {/* Data Accuracy */}
            <div className="stat-item">
              <div className="stat-icon">
                <svg width="38" height="38" fill="none" viewBox="0 0 38 38">
                  <circle cx="19" cy="19" r="18" fill="rgba(124,58,237,0.1)" stroke="rgba(124,58,237,0.2)" strokeWidth="1"/>
                  <circle cx="19" cy="19" r="10" fill="none" stroke="#7C3AED" strokeWidth="1.5" strokeDasharray="50 15" strokeLinecap="round"/>
                  <circle cx="19" cy="19" r="6" fill="rgba(124,58,237,0.15)"/>
                </svg>
              </div>
              <div className="stat-number">99.9%</div>
              <div className="stat-label">Data Accuracy</div>
            </div>
          </div>
        </div>

        {/* ════════════ MISSION & VISION ════════════ */}
        <section className="mission-section" id="mission-section">
          <div className="mission-inner">
            <h2 className="section-title">Our Mission &amp; Vision</h2>
            <div className="mv-grid">
              {/* Mission */}
              <div className="mv-card">
                <div className="mv-card-header">
                  <div className="mv-icon">
                    <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#7C3AED" strokeWidth="1.8">
                      <circle cx="12" cy="12" r="10"/>
                      <circle cx="12" cy="12" r="6"/>
                      <circle cx="12" cy="12" r="2" fill="#7C3AED"/>
                    </svg>
                  </div>
                  <h3>Our Mission</h3>
                </div>
                <p>To empower millions of people with science-backed insights that unlock cognitive potential and drive meaningful improvements in everyday life.</p>
                <ul className="mv-checklist">
                  <li><div className="mv-check"><svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg></div>Make cognitive assessments accessible to everyone</li>
                  <li><div className="mv-check"><svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg></div>Deliver actionable insights for real improvement</li>
                  <li><div className="mv-check"><svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg></div>Improve mental wellness and performance globally</li>
                </ul>
              </div>
              {/* Vision */}
              <div className="mv-card">
                <div className="mv-card-header">
                  <div className="mv-icon" style={{background:'rgba(59,130,246,0.1)'}}>
                    <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#3B82F6" strokeWidth="1.8">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                  </div>
                  <h3>Our Vision</h3>
                </div>
                <p>A world where every individual understands their mind, optimizes their potential, and lives a healthier, happier, and more fulfilling life.</p>
                <ul className="mv-checklist">
                  <li><div className="mv-check" style={{background:'rgba(59,130,246,0.1)'}}><svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="#3B82F6" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg></div>Lead the future of cognitive health</li>
                  <li><div className="mv-check" style={{background:'rgba(59,130,246,0.1)'}}><svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="#3B82F6" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg></div>Drive innovation through science and AI</li>
                  <li><div className="mv-check" style={{background:'rgba(59,130,246,0.1)'}}><svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="#3B82F6" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg></div>Build a global community of growth and well-being</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════ WHY CHOOSE ════════════ */}
        <section className="why-section">
          <div className="why-inner">
            <div className="why-left">
              <h2>Why Choose Limitless?</h2>
              <p>We combine advanced science, AI, and privacy to deliver the most accurate and personalized cognitive assessments.</p>
              <p>Unlike basic "brain training" apps, Limitless is rooted in scientifically validated measurements. We believe true cognitive improvement starts with understanding your baseline, which is why our engaging assessments are built on decades of neurological research.</p>
              <p>Instead of just giving you a score, our AI translates complex data into simple, actionable roadmaps. We prioritize your privacy with enterprise-grade encryption, ensuring you get clinical-level insights from the comfort of your home, completely securely.</p>
            </div>
            <div className="why-cards">
              {/* Advanced AI */}
              <div className="why-card">
                <div className="why-card-icon" style={{background:'rgba(124,58,237,0.1)'}}>
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#7C3AED" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <h4>Advanced AI</h4>
                <p>Smart algorithms for precise insights</p>
              </div>
              {/* Science-Backed */}
              <div className="why-card">
                <div className="why-card-icon" style={{background:'rgba(16,185,129,0.1)'}}>
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#10B981" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </div>
                <h4>Science-Backed</h4>
                <p>Built on validated research models</p>
              </div>
              {/* Personalized */}
              <div className="why-card">
                <div className="why-card-icon" style={{background:'rgba(59,130,246,0.1)'}}>
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#3B82F6" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                  </svg>
                </div>
                <h4>Personalized</h4>
                <p>Insights tailored to you</p>
              </div>
              {/* Privacy First */}
              <div className="why-card">
                <div className="why-card-icon" style={{background:'rgba(124,58,237,0.1)'}}>
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#7C3AED" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                  </svg>
                </div>
                <h4>Privacy First</h4>
                <p>Your data is 100% encrypted &amp; secure</p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════ VALUES ════════════ */}
        <section className="values-section">
          <div className="values-inner">
            <h2 className="section-title">Our Values</h2>
            <div className="values-grid">
              {/* Integrity */}
              <div className="value-card">
                <div className="value-icon" style={{background:'rgba(124,58,237,0.1)'}}>
                  <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#7C3AED" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                  </svg>
                </div>
                <h4>Integrity</h4>
                <p>We are transparent, honest, and committed to doing what's right.</p>
              </div>
              {/* Innovation */}
              <div className="value-card">
                <div className="value-icon" style={{background:'rgba(245,158,11,0.1)'}}>
                  <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#F59E0B" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <h4>Innovation</h4>
                <p>We embrace creativity and technology to drive real change.</p>
              </div>
              {/* Empowerment */}
              <div className="value-card">
                <div className="value-icon" style={{background:'rgba(59,130,246,0.1)'}}>
                  <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#3B82F6" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <h4>Empowerment</h4>
                <p>We empower individuals to take control of their mental well-being.</p>
              </div>
              {/* Excellence */}
              <div className="value-card">
                <div className="value-icon" style={{background:'rgba(245,158,11,0.1)'}}>
                  <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#F59E0B" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/>
                  </svg>
                </div>
                <h4>Excellence</h4>
                <p>We strive for the highest standards in everything we do.</p>
              </div>
              {/* Inclusivity */}
              <div className="value-card">
                <div className="value-icon" style={{background:'rgba(239,68,68,0.1)'}}>
                  <svg width="26" height="26" fill="none" viewBox="0 0 24 24" stroke="#EF4444" strokeWidth="1.8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </div>
                <h4>Inclusivity</h4>
                <p>We believe everyone deserves access to better mental health.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ════════════ CTA BANNER ════════════ */}
        <section className="cta-banner">
          <div className="cta-brain">
            <svg viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="ctaBrainGlow" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#A855F7" stopOpacity="0.6"/><stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/></radialGradient>
                <filter id="glow3"><feGaussianBlur stdDeviation="2" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              </defs>
              <ellipse cx="75" cy="70" rx="60" ry="55" fill="url(#ctaBrainGlow)" opacity="0.7"/>
              <path d="M52 44 C43 37 34 40 30 50 C26 60 30 73 38 79 C33 84 32 94 38 99 C44 104 52 102 56 96 C53 101 55 109 61 112 C69 116 77 110 80 101 L80 65 L80 42 C73 33 59 33 52 44Z" stroke="#A855F7" strokeWidth="1.2" fill="rgba(124,58,237,0.1)" filter="url(#glow3)"/>
              <path d="M80 42 L80 101 C83 110 91 116 99 112 C105 109 107 101 104 96 C108 102 116 104 122 99 C128 94 127 84 122 79 C130 73 134 60 130 50 C126 40 117 37 108 44 C101 33 87 33 80 42Z" stroke="#60A5FA" strokeWidth="1.2" fill="rgba(59,130,246,0.08)" filter="url(#glow3)"/>
              {/* Nodes */}
              <g filter="url(#glow3)" opacity="0.9">
                <circle cx="80" cy="42" r="3" fill="#A855F7"/>
                <circle cx="52" cy="58" r="2.5" fill="#7C3AED"/>
                <circle cx="108" cy="54" r="2.5" fill="#60A5FA"/>
                <circle cx="68" cy="78" r="2.5" fill="#A855F7"/>
                <circle cx="92" cy="80" r="2.5" fill="#818CF8"/>
                <circle cx="80" cy="100" r="3" fill="#A855F7"/>
                <line x1="80" y1="42" x2="52" y2="58" stroke="#A855F7" strokeWidth="0.8" opacity="0.7"/>
                <line x1="80" y1="42" x2="108" y2="54" stroke="#60A5FA" strokeWidth="0.8" opacity="0.7"/>
                <line x1="52" y1="58" x2="68" y2="78" stroke="#A855F7" strokeWidth="0.8" opacity="0.6"/>
                <line x1="108" y1="54" x2="92" y2="80" stroke="#60A5FA" strokeWidth="0.8" opacity="0.6"/>
                <line x1="68" y1="78" x2="80" y2="100" stroke="#A855F7" strokeWidth="0.8" opacity="0.6"/>
                <line x1="92" y1="80" x2="80" y2="100" stroke="#818CF8" strokeWidth="0.8" opacity="0.6"/>
              </g>
              <ellipse cx="75" cy="125" rx="50" ry="8" stroke="#A855F7" strokeWidth="0.8" opacity="0.3" fill="none"/>
            </svg>
          </div>
          <div className="cta-text">
            <h2>Ready to Unlock Your Potential?</h2>
            <p>Join thousands of others who are already transforming their lives with Limitless.</p>
          </div>
          <div className="cta-buttons">
            <Link to="/join-us" className="btn-cta-primary">Start Free Assessment +</Link>
            <Link to="/join-us" className="btn-secondary">Join Now</Link>
          </div>
        </section>

      </div>
      <Footer />
    </>
  );
};

export default AboutPage;

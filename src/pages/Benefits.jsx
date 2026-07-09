import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AssessmentModal from '../components/AssessmentModal';
import './Benefits.css';

const Benefits = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleStartAssessment = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setModalOpen(true);
    }, 500); // Simulate brief loading for better UX
  };
  const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="benefits-page">
      {/* ===================== HEADER ===================== */}
      <Header />

      {/* ===================== HERO ===================== */}
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-left">
            <div className="hero-eyebrow">
              BENEFITS
            </div>
            <h1>
              <span style={{color: '#111827'}}>Real Benefits.</span><br/>
              <span style={{color: '#2563eb'}}>Better Brain.</span> <span style={{color: '#9333ea'}}>Better Life.</span>
            </h1>
            <p style={{color: '#4b5563'}}>Our AI-Powered Cognitive Health Assessment gives you the insights you need to improve focus, reduce stress, strengthen memory, and perform at your best every day.</p>
            <div className="hero-stats-row">
              <div className="hero-stat">
                <div className="ic" style={{color: '#2563eb'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                </div>
                <span>Science-Backed<br/>Assessment</span>
              </div>
              <div className="hero-stat">
                <div className="ic" style={{color: '#2563eb'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 14h3"/><path d="M1 9h3"/><path d="M1 14h3"/></svg>
                </div>
                <span>AI-Powered<br/>Insights</span>
              </div>
              <div className="hero-stat">
                <div className="ic" style={{color: '#2563eb'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM18 18a3 3 0 1 1-6 0 3 3 0 0 1 6 0ZM9 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/><path d="m15 8-4.5 2.5"/><path d="m15 16-4.5-2.5"/></svg>
                </div>
                <span>Personalized<br/>Recommendations</span>
              </div>
              <div className="hero-stat">
                <div className="ic" style={{color: '#2563eb'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                </div>
                <span>Private &amp;<br/>Secure</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="float-pill fp-tl">
              <div className="pill-ic" style={{color: '#10b981'}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
              </div>
              <span>Improve Focus<br/>and Attention</span>
            </div>
            <div className="float-pill fp-tr">
              <div className="pill-ic" style={{color: '#f97316'}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
              </div>
              <span>Reduce Stress<br/>and Burnout</span>
            </div>
            <div className="float-pill fp-bl">
              <div className="pill-ic" style={{color: '#3b82f6'}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/></svg>
              </div>
              <span>Strengthen<br/>Memory</span>
            </div>
            <div className="float-pill fp-br">
              <div className="pill-ic" style={{color: '#10b981'}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
              </div>
              <span>Enhance Overall<br/>Well-being</span>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== WHY IT MATTERS ===================== */}
      <section className="section section-bg-light">
        <div className="container">
          <div className="section-head">
            <div className="section-eyebrow">WHY IT MATTERS</div>
            <h2 className="section-title">Why Cognitive Health Assessment Matters in the USA</h2>
            <p className="section-sub">Mental challenges and cognitive decline can affect anyone. Early insights lead to better decisions and a healthier future.</p>
          </div>
          <div className="grid-4">
            <div className="stat-card">
              <div className="icon-circle ic-purple" style={{color: '#9333ea'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h3>1 in 5 Adults</h3>
              <p>Experience a mental health condition each year in the USA.</p>
              <div className="stat-source">Source: NAMI</div>
            </div>
            <div className="stat-card">
              <div className="icon-circle ic-green" style={{color: '#10b981'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/></svg>
              </div>
              <h3>40% Decline</h3>
              <p>In attention span over the last decade due to digital overload and distractions.</p>
              <div className="stat-source">Source: Microsoft Study</div>
            </div>
            <div className="stat-card">
              <div className="icon-circle ic-orange" style={{color: '#f97316'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-8 0v2"/><circle cx="12" cy="11" r="4"/><path d="M12 2v2"/><path d="M8.5 3.5 10 5"/><path d="M15.5 3.5 14 5"/></svg>
              </div>
              <h3>77% of Americans</h3>
              <p>Experience physical symptoms caused by stress.</p>
              <div className="stat-source">Source: APA</div>
            </div>
            <div className="stat-card">
              <div className="icon-circle ic-blue" style={{color: '#3b82f6'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/></svg>
              </div>
              <h3>Early Action Helps</h3>
              <p>Early detection and guidance can prevent bigger challenges in the future.</p>
              <div className="stat-source">Source: NIH</div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== WHO IT HELPS ===================== */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-eyebrow">WHO IT HELPS</div>
            <h2 className="section-title">Benefits for Every Stage of Life</h2>
          </div>
          <div className="who-grid">
            <div className="who-card">
              <div className="who-photo" style={{background: 'url("/featurespageimage/image copy 3.png") no-repeat center center / cover'}}>
                <div className="who-badge" style={{background: 'var(--purple)'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                </div>
              </div>
              <div className="who-body">
                <h3>Students</h3>
                <ul className="who-list">
                  <li><span className="dot" style={{background: 'var(--purple)'}}></span>Improve focus and concentration</li>
                  <li><span className="dot" style={{background: 'var(--purple)'}}></span>Better memory and learning</li>
                  <li><span className="dot" style={{background: 'var(--purple)'}}></span>Enhance exam performance</li>
                  <li><span className="dot" style={{background: 'var(--purple)'}}></span>Build academic confidence</li>
                </ul>
              </div>
            </div>
            <div className="who-card">
              <div className="who-photo" style={{background: 'url("/featurespageimage/image copy 4.png") no-repeat center center / cover'}}>
                <div className="who-badge" style={{background: 'var(--green)'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                </div>
              </div>
              <div className="who-body">
                <h3>Professionals</h3>
                <ul className="who-list">
                  <li><span className="dot" style={{background: 'var(--green)'}}></span>Boost productivity and efficiency</li>
                  <li><span className="dot" style={{background: 'var(--green)'}}></span>Make sharper decisions</li>
                  <li><span className="dot" style={{background: 'var(--green)'}}></span>Reduce burnout and stress</li>
                  <li><span className="dot" style={{background: 'var(--green)'}}></span>Enhance leadership skills</li>
                </ul>
              </div>
            </div>
            <div className="who-card">
              <div className="who-photo" style={{background: 'url("/featurespageimage/image copy 5.png") no-repeat center center / cover'}}>
                <div className="who-badge" style={{background: 'var(--orange)'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
              </div>
              <div className="who-body">
                <h3>Parents</h3>
                <ul className="who-list">
                  <li><span className="dot" style={{background: 'var(--orange)'}}></span>Understand stress and mental load</li>
                  <li><span className="dot" style={{background: 'var(--orange)'}}></span>Improve work-life balance</li>
                  <li><span className="dot" style={{background: 'var(--orange)'}}></span>Support family well-being</li>
                  <li><span className="dot" style={{background: 'var(--orange)'}}></span>Build healthier daily routines</li>
                </ul>
              </div>
            </div>
            <div className="who-card">
              <div className="who-photo" style={{background: 'url("/featurespageimage/image copy 6.png") no-repeat center center / cover'}}>
                <div className="who-badge" style={{background: 'var(--blue)'}}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
              </div>
              <div className="who-body">
                <h3>Seniors</h3>
                <ul className="who-list">
                  <li><span className="dot" style={{background: 'var(--blue)'}}></span>Track cognitive health over time</li>
                  <li><span className="dot" style={{background: 'var(--blue)'}}></span>Support healthy brain aging</li>
                  <li><span className="dot" style={{background: 'var(--blue)'}}></span>Maintain independence longer</li>
                  <li><span className="dot" style={{background: 'var(--blue)'}}></span>Encourage early consultation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== REAL IMPACT ===================== */}
      <section className="section section-bg-light" style={{paddingTop: 0}}>
        <div className="container">
          <div className="section-head">
            <div className="section-eyebrow">THE REAL IMPACT</div>
            <h2 className="section-title">Real Benefits You Can Expect</h2>
          </div>
          <div className="impact-band">
            <div className="impact-item">
              <div className="icon-circle" style={{color: '#9333ea'}}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
              </div>
              <h3>Improve Focus</h3>
              <p>Up to 35% improvement in attention and concentration with consistent practice.</p>
            </div>
            <div className="impact-item">
              <div className="icon-circle" style={{color: '#10b981'}}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/></svg>
              </div>
              <h3>Stronger Memory</h3>
              <p>Better recall and retention through personalized brain training recommendations.</p>
            </div>
            <div className="impact-item">
              <div className="icon-circle" style={{color: '#f97316'}}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
              </div>
              <h3>Reduce Stress</h3>
              <p>Lower stress levels and better emotional balance improve overall well-being.</p>
            </div>
            <div className="impact-item">
              <div className="icon-circle" style={{color: '#3b82f6'}}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              </div>
              <h3>Boost Performance</h3>
              <p>Better cognitive performance leads to higher productivity and success.</p>
            </div>
            <div className="impact-item">
              <div className="icon-circle" style={{color: '#6b21a8'}}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              </div>
              <h3>Better Quality of Life</h3>
              <p>Improved mental clarity, sleep, energy, and daily life satisfaction.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== LIMITLESS ADVANTAGE ===================== */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-eyebrow">WHY LIMITLESS?</div>
            <h2 className="section-title">The Limitless Advantage</h2>
            <p className="section-sub">Advanced assessment. Actionable insights. Measurable results.</p>
          </div>
          <div className="adv-grid" style={{marginBottom: '18px'}}>
            <div className="adv-card">
              <div className="adv-icon" style={{background: '#eff6ff', color: '#2563eb'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              </div>
              <div>
                <h4>Quick &amp; Easy</h4>
                <p>Complete the assessment in under 5 minutes.</p>
              </div>
            </div>
            <div className="adv-card">
              <div className="adv-icon" style={{background: '#eff6ff', color: '#2563eb'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 14h3"/><path d="M1 9h3"/><path d="M1 14h3"/></svg>
              </div>
              <div>
                <h4>AI-Powered Analysis</h4>
                <p>Advanced algorithms analyze 50+ cognitive, behavioral &amp; health factors.</p>
              </div>
            </div>
            <div className="adv-card">
              <div className="adv-icon" style={{background: '#eff6ff', color: '#2563eb'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><rect x="9" y="10" width="6" height="7" rx="1" ry="1"/><path d="M10 10V8a2 2 0 0 1 4 0v2"/></svg>
              </div>
              <div>
                <h4>100% Private &amp; Secure</h4>
                <p>Your data is encrypted and never shared with anyone.</p>
              </div>
            </div>
          </div>
          <div className="adv-grid">
            <div className="adv-card">
              <div className="adv-icon" style={{background: '#f3e8ff', color: '#9333ea'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </div>
              <div>
                <h4>Personalized AI Report</h4>
                <p>Get a detailed report with insights and action plan tailored just for you.</p>
              </div>
            </div>
            <div className="adv-card">
              <div className="adv-icon" style={{background: '#d1fae5', color: '#10b981'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              </div>
              <div>
                <h4>Track Progress Over Time</h4>
                <p>Monitor improvements and track your cognitive trends.</p>
              </div>
            </div>
            <div className="adv-card">
              <div className="adv-icon" style={{background: '#f3e8ff', color: '#9333ea'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.31"/><path d="M14 9.3V1.99"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><line x1="5.52" y1="16" x2="18.48" y2="16"/></svg>
              </div>
              <div>
                <h4>Science-Backed</h4>
                <p>Built on validated cognitive science and neuroscience research.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="final-cta">
        <div className="container final-cta-inner">
          <div>
            <h2>Take Control of Your Cognitive Health Today</h2>
            <p>Understand your brain, improve your performance, and unlock your true potential with Limitless.</p>
            <div className="final-cta-ctas">
              <button onClick={handleStartAssessment}  className="btn btn-orange" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
                {isSubmitting ? 'Generating Questionnaire...' : isLoggedIn ? 'Take Assessment Again' : 'Start Free Assessment'}
              </button>
              <div className="phone">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                +1 (702) 555-0147
              </div>
            </div>
          </div>
          <div className="final-trust-row">
            <div className="final-trust-item">
              <div className="ic">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <span>Trusted by<br/>Thousands<br/>Across the USA</span>
            </div>
            <div className="final-trust-item">
              <div className="ic">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
              </div>
              <span>Science<br/>Backed<br/>Assessment</span>
            </div>
            <div className="final-trust-item">
              <div className="ic">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <span>Private &amp;<br/>Secure Always</span>
            </div>
            <div className="final-shield" style={{background: 'url(/featurespageimage/image.png) no-repeat center right / cover'}}>
            </div>
          </div>
        </div>
      </section>
    </div>
    <AssessmentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default Benefits;

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import AssessmentModal from '../components/AssessmentModal';
import './HowItWorksPage.css';

const HowItWorksPage = () => {
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
      <div className="how-it-works-page">
      {/* ===================== HEADER ===================== */}
      <Header />

      {/* ===================== HERO ===================== */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="badge-pill" style={{background: '#2563eb', color: '#fff'}}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/><circle cx="12" cy="12" r="3"/></svg>
              HOW IT WORKS
            </div>
            <h1>
              A Simple Process.<br/>
              <span className="grad-blue">Powerful Results.</span>
            </h1>
            <p>Limitless makes cognitive health assessment easy, secure, and personalized. Complete a few simple steps and get AI-powered insights you can trust.</p>
            <div className="hero-trust-row">
              <div className="hero-trust-item">
                <div className="ic">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <span>Under 5 Minutes</span>
              </div>
              <div className="hero-trust-item">
                <div className="ic">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><rect x="9" y="10" width="6" height="7" rx="1" ry="1"/><path d="M10 10V8a2 2 0 0 1 4 0v2"/></svg>
                </div>
                <span>100% Secure</span>
              </div>
              <div className="hero-trust-item">
                <div className="ic">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/></svg>
                </div>
                <span>AI-Powered</span>
              </div>
              <div className="hero-trust-item">
                <div className="ic">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
                </div>
                <span>Personalized<br/>Results</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== THE PROCESS — 5 STEPS ===================== */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-eyebrow">THE PROCESS</div>
            <h2 className="section-title">How Limitless Works – 5 Easy Steps</h2>
            <p className="section-sub">From signup to insights in just a few simple steps.</p>
          </div>
          <div className="steps5-grid">
            <div className="step5-card">
              <div className="step5-num">1</div>
              <div className="step5-ic">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" y1="8" x2="19" y2="14"/><line x1="16" y1="11" x2="22" y2="11"/></svg>
              </div>
              <h3>Create Your Account</h3>
              <p>Sign up in seconds with your name, email, and age.</p>
            </div>
            <div className="step5-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h12" strokeDasharray="4 4"/><path d="M14 6l6 6-6 6"/></svg>
            </div>
            <div className="step5-card">
              <div className="step5-num">2</div>
              <div className="step5-ic">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M9 14h6"/><path d="M9 18h6"/><path d="M9 10h6"/></svg>
              </div>
              <h3>Provide Basic Details</h3>
              <p>Share some basic information to personalize your assessment.</p>
            </div>
            <div className="step5-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h12" strokeDasharray="4 4"/><path d="M14 6l6 6-6 6"/></svg>
            </div>
            <div className="step5-card">
              <div className="step5-num">3</div>
              <div className="step5-ic">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/></svg>
              </div>
              <h3>Complete Assessment</h3>
              <p>Answer science-backed questions about your cognitive health.</p>
            </div>
            <div className="step5-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h12" strokeDasharray="4 4"/><path d="M14 6l6 6-6 6"/></svg>
            </div>
            <div className="step5-card">
              <div className="step5-num">4</div>
              <div className="step5-ic">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M20 9h3"/><path d="M20 14h3"/><path d="M1 9h3"/><path d="M1 14h3"/></svg>
              </div>
              <h3>AI Analysis</h3>
              <p>Our advanced AI analyzes your responses across multiple domains.</p>
            </div>
            <div className="step5-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12h12" strokeDasharray="4 4"/><path d="M14 6l6 6-6 6"/></svg>
            </div>
            <div className="step5-card">
              <div className="step5-num">5</div>
              <div className="step5-ic">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
              </div>
              <h3>Get Your Report</h3>
              <p>Receive your personalized AI report with insights and action plan.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== STEP 1 & 2 ===================== */}
      <section className="section section-bg-light">
        <div className="container">
          <div className="step-title-block">
            <h2>Step 1 &amp; 2 – Login &amp; Provide Your Details</h2>
            <p>A quick and secure start to personalize your assessment experience.</p>
          </div>

          <div className="panel-grid-2">
            <div className="form-panel">
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                background: 'rgba(99,102,241,0.1)', color: '#6366f1',
                padding: '5px 14px', borderRadius: '20px',
                fontSize: '12px', fontWeight: '700', letterSpacing: '0.5px',
                marginBottom: '12px',
              }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                FREE ASSESSMENT
              </div>
              <h3 style={{ fontSize: '22px', marginBottom: '4px' }}>Start Your Journey</h3>
              <p style={{ marginBottom: '24px' }}>Enter your details to begin your cognitive assessment.</p>
              
              <label className="field-label">Full Name</label>
              <div className="field-input placeholder-text">John Doe</div>
              
              <label className="field-label">Email Address</label>
              <div className="field-input placeholder-text">john.doe@example.com</div>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <label className="field-label">Age (18-66)</label>
                  <div className="field-input placeholder-text">22</div>
                </div>
                <div style={{ flex: 1 }}>
                  <label className="field-label">Gender</label>
                  <div className="field-input placeholder-text">Select <span style={{color: '#6b7280'}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span></div>
                </div>
              </div>

              <button className="btn btn-block" style={{ background: 'linear-gradient(135deg, #3B82F6, #6366f1)', color: '#fff', marginTop: '12px', padding: '14px', borderRadius: '12px', fontSize: '16px', display: 'flex', justifyContent: 'center', gap: '8px', border: 'none' }}>
                Start Free Assessment
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
            </div>

            <div className="info-safe-panel">
              <div className="info-safe-top">
                <div className="info-safe-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><circle cx="12" cy="11" r="3"/></svg></div>
                <div>
                  <h4>Your Information is Safe</h4>
                  <p>We use bank-level encryption to keep your data private and secure.</p>
                </div>
              </div>
              <ul className="safe-list">
                <li><span className="safe-check"><svg width="18" height="18" viewBox="0 0 24 24" fill="#7c3aed" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" fill="#f3e8ff" stroke="none"/><polyline points="8 12 11 15 16 9" stroke="#7c3aed" strokeWidth="3" fill="none"/></svg></span>Encrypted &amp; Secure Data</li>
                <li><span className="safe-check"><svg width="18" height="18" viewBox="0 0 24 24" fill="#7c3aed" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" fill="#f3e8ff" stroke="none"/><polyline points="8 12 11 15 16 9" stroke="#7c3aed" strokeWidth="3" fill="none"/></svg></span>Your data is never shared</li>
                <li><span className="safe-check"><svg width="18" height="18" viewBox="0 0 24 24" fill="#7c3aed" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" fill="#f3e8ff" stroke="none"/><polyline points="8 12 11 15 16 9" stroke="#7c3aed" strokeWidth="3" fill="none"/></svg></span>You can delete your data anytime</li>
                <li><span className="safe-check"><svg width="18" height="18" viewBox="0 0 24 24" fill="#7c3aed" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" fill="#f3e8ff" stroke="none"/><polyline points="8 12 11 15 16 9" stroke="#7c3aed" strokeWidth="3" fill="none"/></svg></span>HIPAA-aligned best practices</li>
              </ul>
              <div className="lock-deco" style={{opacity: 0.05, position: 'absolute', right: '-10px', bottom: '-20px', pointerEvents: 'none'}}>
                <svg width="180" height="180" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="11" width="14" height="10" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><circle cx="12" cy="16" r="1"/></svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== STEP 3 — ASSESSMENT EXPERIENCE ===================== */}
      <section className="section">
        <div className="container">
          <div className="step-title-block">
            <h2>Step 3 – Assessment Experience</h2>
            <p>Answer a series of questions designed by cognitive scientists.</p>
          </div>

          <div className="panel-grid-3b">
            <div>
              <div className="side-feature">
                <div className="ic">▦</div>
                <div>
                  <h4>Multiple Domains</h4>
                  <p>Questions cover memory, attention, stress, mental well-being, and more.</p>
                </div>
              </div>
              <div className="side-feature">
                <div className="ic">🛡️</div>
                <div>
                  <h4>Adaptive Questioning</h4>
                  <p>The assessment adapts to your responses for more accurate insights.</p>
                </div>
              </div>
              <div className="side-feature">
                <div className="ic">⬇️</div>
                <div>
                  <h4>Takes Less Than 5 Minutes</h4>
                  <p>Quick, engaging, and easy to complete on any device.</p>
                </div>
              </div>
            </div>

            <div className="quiz-panel">
              <div className="quiz-progress-row">
                <span>Overall Progress</span>
                <span>Question 8 of 25</span>
              </div>
              <div className="quiz-progress-bar"><div className="quiz-progress-fill"></div></div>
              <div className="quiz-question">In the past two weeks, how often have you had trouble focusing on tasks for more than a few minutes?</div>
              <div className="quiz-options">
                <div className="quiz-option"><span className="radio"></span>Never</div>
                <div className="quiz-option"><span className="radio"></span>Rarely</div>
                <div className="quiz-option selected"><span className="radio on"></span>Sometimes</div>
                <div className="quiz-option"><span className="radio"></span>Often</div>
                <div className="quiz-option"><span className="radio"></span>Always</div>
              </div>
              <div className="quiz-nav-row">
                <div className="quiz-nav-btn">← Previous</div>
                <div className="quiz-next-btn">Next →</div>
              </div>
            </div>

            <div className="assessed-panel">
              <h4>What You'll Be Assessed On</h4>
              <ul className="assessed-list">
                <li><span className="assessed-dot" style={{background: '#f1e8ff', color: 'var(--purple)'}}>🎯</span>Focus &amp; Attention</li>
                <li><span className="assessed-dot" style={{background: '#e7eefe', color: 'var(--blue)'}}>🧠</span>Memory &amp; Learning</li>
                <li><span className="assessed-dot" style={{background: '#fff0e0', color: 'var(--orange)'}}>⚡</span>Processing Speed</li>
                <li><span className="assessed-dot" style={{background: '#e3faf0', color: 'var(--green)'}}>🛡️</span>Stress &amp; Resilience</li>
                <li><span className="assessed-dot" style={{background: '#e7eefe', color: 'var(--blue)'}}>💙</span>Mental Well-being</li>
                <li><span className="assessed-dot" style={{background: '#fff0e0', color: 'var(--orange)'}}>⚖️</span>Decision Making</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== STEP 4 & 5 ===================== */}
      <section className="section section-bg-light">
        <div className="container">
          <div className="step-title-block">
            <h2>Step 4 &amp; 5 – AI Analysis &amp; Your Personalized Report</h2>
            <p>Advanced AI turns your responses into actionable insights.</p>
          </div>

          <div className="panel-grid-3c">
            <div className="s45-card">
              <div style={{display: 'flex', gap: '20px', alignItems: 'flex-start'}}>
                <div className="s45-icon-box" style={{width: '90px', height: '90px', flexShrink: 0, background: '#f3e8ff', color: '#7c3aed', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/></svg>
                </div>
                <div>
                  <h3>4. AI Analysis</h3>
                  <p>Our AI evaluates your responses using validated cognitive and behavioral models.</p>
                  <ul className="s45-list">
                    <li><span className="s45-check"><svg width="14" height="14" viewBox="0 0 24 24" fill="#7c3aed" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" fill="#f3e8ff" stroke="none"/><polyline points="8 12 11 15 16 9" stroke="#7c3aed" strokeWidth="3" fill="none"/></svg></span>50+ Cognitive &amp; Behavioral Factors</li>
                    <li><span className="s45-check"><svg width="14" height="14" viewBox="0 0 24 24" fill="#7c3aed" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" fill="#f3e8ff" stroke="none"/><polyline points="8 12 11 15 16 9" stroke="#7c3aed" strokeWidth="3" fill="none"/></svg></span>Neuroscience-Based Algorithms</li>
                    <li><span className="s45-check"><svg width="14" height="14" viewBox="0 0 24 24" fill="#7c3aed" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" fill="#f3e8ff" stroke="none"/><polyline points="8 12 11 15 16 9" stroke="#7c3aed" strokeWidth="3" fill="none"/></svg></span>Benchmarked Against Age Group</li>
                    <li><span className="s45-check"><svg width="14" height="14" viewBox="0 0 24 24" fill="#7c3aed" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" fill="#f3e8ff" stroke="none"/><polyline points="8 12 11 15 16 9" stroke="#7c3aed" strokeWidth="3" fill="none"/></svg></span>Instant, Accurate &amp; Reliable</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="s45-arrow"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></div>
            <div className="s45-card" style={{borderLeft: '1px solid var(--card-border)'}}>
              <h3>5. Get Your Personalized Report</h3>
              <p>Receive a detailed report with scores, insights, and recommendations.</p>
              <ul className="s45-list">
                <li><span className="s45-check"><svg width="14" height="14" viewBox="0 0 24 24" fill="#2563eb" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" fill="#eff6ff" stroke="none"/><polyline points="8 12 11 15 16 9" stroke="#2563eb" strokeWidth="3" fill="none"/></svg></span>Overall Cognitive Score</li>
                <li><span className="s45-check"><svg width="14" height="14" viewBox="0 0 24 24" fill="#2563eb" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" fill="#eff6ff" stroke="none"/><polyline points="8 12 11 15 16 9" stroke="#2563eb" strokeWidth="3" fill="none"/></svg></span>Strengths &amp; Areas to Improve</li>
                <li><span className="s45-check"><svg width="14" height="14" viewBox="0 0 24 24" fill="#2563eb" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" fill="#eff6ff" stroke="none"/><polyline points="8 12 11 15 16 9" stroke="#2563eb" strokeWidth="3" fill="none"/></svg></span>Personalized Action Plan</li>
                <li><span className="s45-check"><svg width="14" height="14" viewBox="0 0 24 24" fill="#2563eb" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" fill="#eff6ff" stroke="none"/><polyline points="8 12 11 15 16 9" stroke="#2563eb" strokeWidth="3" fill="none"/></svg></span>Track Progress Over Time</li>
              </ul>
            </div>

            <div className="mini-report">
              <div className="mini-report-top">
                <div className="brand-logo"></div>
                <span className="brand-name">LIMITLESS</span>
              </div>
              <div className="mini-report-body">
                <ul className="mini-sidebar">
                  <li className="active"><span style={{marginRight: '6px', display: 'inline-flex'}}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg></span>Overview</li>
                  <li><span style={{marginRight: '6px', display: 'inline-flex'}}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/></svg></span>Cognitive Scores</li>
                  <li><span style={{marginRight: '6px', display: 'inline-flex'}}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l3-9 5 18 3-9h5"/></svg></span>Insights</li>
                  <li><span style={{marginRight: '6px', display: 'inline-flex'}}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></span>Action Plan</li>
                  <li><span style={{marginRight: '6px', display: 'inline-flex'}}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></span>Progress</li>
                  <li><span style={{marginRight: '6px', display: 'inline-flex'}}><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></span>Recommendations</li>
                </ul>
                <div className="mini-main">
                  <h4>Your AI Report Deep Insights.<br/><span className="blue">Better Decisions.</span></h4>
                  <div className="mini-score-row">
                    <div className="mini-score-box"><div className="label">Overall Cognitive</div><div className="value">78 <svg width="24" height="10" style={{marginLeft: '4px'}}><path d="M0 8 Q6 2, 12 8 T24 2" fill="none" stroke="#10b981" strokeWidth="1.5"/></svg></div></div>
                    <div className="mini-score-box"><div className="label">Mental Well-being</div><div className="value">72 <svg width="24" height="10" style={{marginLeft: '4px'}}><path d="M0 8 Q6 2, 12 8 T24 2" fill="none" stroke="#10b981" strokeWidth="1.5"/></svg></div></div>
                    <div className="mini-score-box"><div className="label">Focus &amp; Attention</div><div className="value">81 <svg width="24" height="10" style={{marginLeft: '4px'}}><path d="M0 8 Q6 2, 12 8 T24 2" fill="none" stroke="#10b981" strokeWidth="1.5"/></svg></div></div>
                    <div className="mini-score-box"><div className="label">Stress Level</div><div className="value">36 <svg width="24" height="10" style={{marginLeft: '4px'}}><path d="M0 2 Q6 8, 12 2 T24 8" fill="none" stroke="#f59e0b" strokeWidth="1.5"/></svg></div></div>
                  </div>
                  <div className="mini-insights-row">
                    <div className="mini-insight-box">
                      <div className="label">Key Insights</div>
                      <ul>
                        <li>• Focus on consistent sleep</li>
                        <li>• Stress is slightly elevated</li>
                      </ul>
                    </div>
                    <div className="mini-insight-box">
                      <div className="label">Personalized Action</div>
                      <ul>
                        <li>• Practice 10 mins mindfulness</li>
                        <li>• Improve sleep quality (7–8 hrs)</li>
                        <li>• Engage in brain training 3x/wk</li>
                        <li>• Stay hydrated &amp; balanced diet</li>
                      </ul>
                      <div style={{fontSize: '8px', color: 'var(--purple)', fontWeight: '700', marginTop: '4px'}}>View Full Action Plan →</div>
                    </div>
                    <div className="mini-insight-box" style={{textAlign: 'center'}}>
                      <div className="label" style={{textAlign: 'left'}}>Report Summary</div>
                      <div className="mini-ring" style={{display: 'flex', justifyContent: 'center', margin: '8px 0'}}>
                        <svg width="40" height="40" viewBox="0 0 36 36">
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#e6e6e6" strokeWidth="3" />
                          <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="#10b981" strokeWidth="3" strokeDasharray="78, 100" />
                          <text x="18" y="21.35" fill="#374151" fontSize="10" fontWeight="bold" textAnchor="middle">78</text>
                        </svg>
                      </div>
                      <div style={{fontSize: '7px', color: 'var(--text-gray)'}}><span style={{color: '#10b981'}}>●</span> Excellent (90-100)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== BUILT ON TRUST & SECURITY ===================== */}
      <section className="section">
        <div className="container">
          <div className="section-head" style={{marginBottom: '30px'}}>
            <h2 className="section-title">Built on Trust &amp; Security</h2>
          </div>
          <div className="trust4-grid">
            <div className="trust4-item">
              <div className="ic">🔒</div>
              <div>
                <h4>100% Private</h4>
                <p>Your data is encrypted and never shared.</p>
              </div>
            </div>
            <div className="trust4-item">
              <div className="ic">🛡️</div>
              <div>
                <h4>Secure Infrastructure</h4>
                <p>Enterprise-grade security with regular audits.</p>
              </div>
            </div>
            <div className="trust4-item">
              <div className="ic">👤</div>
              <div>
                <h4>User Control</h4>
                <p>You can access, download, or delete your data anytime.</p>
              </div>
            </div>
            <div className="trust4-item">
              <div className="ic">🇺🇸</div>
              <div>
                <h4>Made in the USA</h4>
                <p>Proudly developed and hosted in the United States.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="final-cta">
        <div className="container final-cta-inner">
          <div>
            <h2>Ready to Unlock Your True Potential?</h2>
            <p>Take control of your cognitive health today. It only takes 5 minutes to get started.</p>
          </div>
          <div className="final-cta-mid">
            <button onClick={handleStartAssessment}  className="btn btn-orange" style={{display: 'flex', alignItems: 'center', gap: '8px',  cursor: 'pointer',}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 3.86-8.86c.41-.44.82-.44 1.14-.06l1.06 1.06c.38.32.38.73-.06 1.14A22 22 0 0 1 12 15Z"/><path d="m12 15 3 3a22 22 0 0 0 8.86-3.86c.44-.41.44-.82.06-1.14l-1.06-1.06c-.32-.38-.73-.38-1.14.06A22 22 0 0 0 12 15Z"/><path d="M12 12a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/></svg>
              {isSubmitting ? 'Generating Questionnaire...' : isLoggedIn ? 'Take Assessment Again' : 'Start Free Assessment'}
            </button>
            <div className="phone" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +1 (702) 555-0147
            </div>
          </div>
        </div>
      </section>
    </div>
    <AssessmentModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default HowItWorksPage;

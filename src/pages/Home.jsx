import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import bcrypt from 'bcryptjs';
import { generateAssessmentQuestions } from '../lib/apiUtils';
import { startLoggedInAssessment } from '../lib/assessmentFlow';
import { sendCredentialsEmail } from '../lib/emailService';
import LoginModal from '../components/LoginModal';
import AssessmentModal from '../components/AssessmentModal';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = React.useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(sessionStorage.getItem('isLoggedIn') === 'true');
  const [showLoginModal, setShowLoginModal] = React.useState(false);

  const handleLogout = () => {
    sessionStorage.clear();
    setIsLoggedIn(false);
    setIsMobileMenuOpen(false);
  };

  const faqData = [
    { 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      ), 
      question: "How long does the assessment take?", 
      answer: "The assessment typically takes about 15-20 minutes to complete." 
    },
    { 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
        </svg>
      ), 
      question: "Will I receive personalized recommendations?", 
      answer: "Yes, after completing the assessment, you will receive a detailed, personalized report with actionable recommendations based on your results." 
    },
    { 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      ), 
      question: "Is my data safe and private?", 
      answer: "Absolutely. We use industry-standard encryption and strict privacy protocols to ensure your data is always 100% secure and never shared." 
    },
    { 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 3v18h18" />
          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3" />
        </svg>
      ), 
      question: "Can I track my progress over time?", 
      answer: "Yes! You can retake the assessment periodically to see how your cognitive scores and behavioral metrics improve over time." 
    },
    { 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ), 
      question: "Is this a medical diagnosis?", 
      answer: "No. Limitless is designed for self-improvement and cognitive tracking. It is not a clinical diagnostic tool and should not replace professional medical advice." 
    },
    { 
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ), 
      question: "Who should take this assessment?", 
      answer: "Anyone looking to better understand their mental performance, manage stress, improve focus, and unlock their full cognitive potential." 
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };



  const [showModal, setShowModal] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);


  const handleStartAssessment = () => {
    if (isLoggedIn) {
      startLoggedInAssessment(navigate, setIsSubmitting);
      return;
    }
    setShowModal(true);
  };

  useEffect(() => {
    // Add class to body to ensure background color matches template if needed
    document.body.style.backgroundColor = '#f3f5f9';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="limitless-home">

            {/* ===== REGISTRATION MODAL ===== */}
      <AssessmentModal isOpen={showModal} onClose={() => setShowModal(false)} />

      {/* ===== LOGIN MODAL ===== */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
          // Refresh login state after modal closes
          if (sessionStorage.getItem('isLoggedIn') === 'true') {
            setIsLoggedIn(true);
          }
        }}
        onOpenAssessment={() => setShowModal(true)}
      />

      <Header />

      {/* HERO */}
      <section className="hero">
        <div className="wrap hero-inner">
          <div className="hero-left">
            <h1>Know Your Brain.<br/><span className="grad">Unlock Your Best Life.</span></h1>
            <p style={{ color: '#fff' }}>Take our 5-minute AI-powered assessment to discover your cognitive strengths, stress levels, focus, memory, and more.</p>
            <p style={{ color: '#fff' }}>Get a personalized report and action plan to improve your brain health and daily performance.</p>
            <div className="hero-btn-row">
              <button onClick={handleStartAssessment}  className="btn btn-gradient" style={{  cursor: 'pointer', }}>
                {isSubmitting ? 'Generating Questionnaire...' : isLoggedIn ? 'Take Assessment Again' : 'Start Free Assessment ➔'}
              </button>
              <button onClick={() => navigate('/sample-report')}  className="btn btn-outline" style={{  cursor: 'pointer', }}>
                'View Sample Report'
              </button>
            </div>
            <div className="hero-meta">
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> 5 Minutes</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><polyline points="9 12 11 14 15 10"></polyline></svg> 100% Private</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(45 12 12)"></ellipse><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(135 12 12)"></ellipse></svg> Science-Backed</span>
            </div>
          </div>
          <div className="hero-right">
            <div className="brain-wrap">
              {/* Orbit badges overlaid on the background brain image */}
              <div className="orbit-badge badge-memory">
                <div className="circle"><svg viewBox="0 0 24 24" fill="none"><path d="M9 2a4 4 0 00-4 4 3 3 0 00-2 5 3 3 0 002 5 4 4 0 004 4M9 2a4 4 0 014 4M9 2v18M13 6a4 4 0 014-4 3 3 0 012 5 3 3 0 01-2 5 4 4 0 01-4 4" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                <span className="label">MEMORY</span>
              </div>
              <div className="orbit-badge badge-focus">
                <div className="circle"><svg viewBox="0 0 24 24" fill="none" stroke="#60a5fa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/><path d="M22 2l-7.9 7.9"/></svg></div>
                <span className="label">FOCUS</span>
              </div>
              <div className="orbit-badge badge-clarity">
                <div className="circle"><svg viewBox="0 0 24 24" fill="none"><path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.4.3.5.8.5 1.3v.3h6v-.3c0-.5.1-1 .5-1.3A6 6 0 0012 3z" stroke="#fbbf24" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg></div>
                <span className="label">CLARITY</span>
              </div>
              <div className="orbit-badge badge-stress">
                <div className="circle"><svg viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-8 0v2"/><circle cx="12" cy="7" r="4"/><path d="M12 1v2M8.5 2.5l1.5 1.5M15.5 2.5l-1.5 1.5"/></svg></div>
                <span className="label">STRESS</span>
              </div>
              <div className="orbit-badge badge-energy">
                <div className="circle"><svg viewBox="0 0 24 24" fill="none"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" stroke="#fff" strokeWidth="1.5" strokeLinejoin="round" fill="#fff"/></svg></div>
                <span className="label">ENERGY</span>
              </div>
              <div className="orbit-badge badge-wellbeing">
                <div className="circle"><svg viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-4.5-9.5-9C1 8.5 2.5 5 6 5c2 0 3.5 1.2 4 2.5C10.5 6.2 12 5 14 5c3.5 0 5 3.5 3.5 7-2.5 4.5-9.5 9-9.5 9z" stroke="#f87171" strokeWidth="1.5" strokeLinejoin="round"/></svg></div>
                <span className="label">WELL-BEING</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REVEALS CARD */}
      <section className="reveals-section">
        <div className="wrap">
          <div style={{textAlign: 'center', width: '100%'}}>
            <h2 className="section-eyebrow" style={{marginBottom: '30px'}}>Your Assessment Reveals</h2>
            <div className="reveals-card">
              <div className="reveal-container">
                <div className="reveal-item">
                  <div className="reveal-icon" style={{background: '#f0e9fe'}}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 2a4 4 0 00-4 4 3 3 0 00-2 5 3 3 0 002 5 4 4 0 004 4M9 2a4 4 0 014 4M9 2v18M13 6a4 4 0 014-4 3 3 0 012 5 3 3 0 01-2 5 4 4 0 01-4 4" stroke="#7c3aed" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <h4>Cognitive Score</h4>
                  <p>Overall brain performance based on 50+ factors</p>
                </div>
                <div className="reveal-item">
                  <div className="reveal-icon" style={{background: '#e3f7ea'}}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#16a34a" strokeWidth="1.6"/><circle cx="12" cy="12" r="5" stroke="#16a34a" strokeWidth="1.6"/><circle cx="12" cy="12" r="1.5" fill="#16a34a"/></svg>
                  </div>
                  <h4>Focus &amp; Attention</h4>
                  <p>Your ability to concentrate and stay on track</p>
                </div>
                <div className="reveal-item">
                  <div className="reveal-icon" style={{background: '#fdeee0'}}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" fill="#f97316"/></svg>
                  </div>
                  <h4>Stress Risk</h4>
                  <p>Understand your stress and burnout risk</p>
                </div>
                <div className="reveal-item">
                  <div className="reveal-icon" style={{background: '#e3edfd'}}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#2563eb" strokeWidth="1.6"/><path d="M9 10h.01M15 10h.01M8 14s1.5 2 4 2 4-2 4-2" stroke="#2563eb" strokeWidth="1.6" strokeLinecap="round"/></svg>
                  </div>
                  <h4>Mental Wellness</h4>
                  <p>Emotional well-being and mood balance</p>
                </div>
                <div className="reveal-item">
                  <div className="reveal-icon" style={{background: '#f0e9fe'}}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="7" y="2" width="10" height="20" rx="2" stroke="#7c3aed" strokeWidth="1.6"/><path d="M10 7h4" stroke="#7c3aed" strokeWidth="1.6" strokeLinecap="round"/></svg>
                  </div>
                  <h4>Energy &amp; Productivity</h4>
                  <p>Daily energy levels and productivity score</p>
                </div>
                <div className="reveal-item">
                  <div className="reveal-icon" style={{background: '#e3f7ea'}}>
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M9 14l2 2 4-4"></path></svg>
                  </div>
                  <h4>Personalized Plan</h4>
                  <p>Science-backed action plan just for you</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section className="section section-light audience-section">
        <div className="wrap">
          <h2 className="section-eyebrow">Designed For Everyone Who Wants a Sharper Mind</h2>
          <div className="audience-grid">
            <div className="audience-card">
              <svg className="ic-svg" viewBox="0 0 24 24" fill="#2563eb"><path d="M20 7h-4V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5zm10 15H4V9h16v11z"/></svg>
              <h4>Professionals</h4>
              <p>Improve focus, productivity &amp; decision-making</p>
            </div>
            <div className="audience-card">
              <svg className="ic-svg" viewBox="0 0 24 24" fill="#0a0e23"><path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/></svg>
              <h4>Students</h4>
              <p>Boost memory, learning &amp; exam performance</p>
            </div>
            <div className="audience-card">
              <svg className="ic-svg" viewBox="0 0 24 24" fill="#2563eb"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
              <h4>Parents</h4>
              <p>Manage stress and stay mentally strong</p>
            </div>
            <div className="audience-card">
              <svg className="ic-svg" viewBox="0 0 24 24" fill="#2563eb"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              <h4>Seniors</h4>
              <p>Support memory, clarity &amp; long-term brain health</p>
            </div>
            <div className="audience-card">
              <svg className="ic-svg" viewBox="0 0 24 24" fill="#ef4444"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              <h4>Wellness Enthusiasts</h4>
              <p>Optimize mental wellness &amp; overall well-being</p>
            </div>
          </div>

          <div className="challenge-wrap">
            <div className="text-cols-container">
              <div className="challenge-col">
                <div className="col-header dark-header">
                  <h4>The Challenges Americans Face Every Day</h4>
                </div>
                <ul className="challenge-list">
                  <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" className="flex-shrink-0"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg> Constant stress and anxiety</li>
                  <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" className="flex-shrink-0"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg> Poor focus and distractions</li>
                  <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" className="flex-shrink-0"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg> Mental fatigue and burnout</li>
                  <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" className="flex-shrink-0"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg> Trouble sleeping and low energy</li>
                  <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" className="flex-shrink-0"><circle cx="12" cy="12" r="10"/><path d="M15 9l-6 6M9 9l6 6"/></svg> Decreased productivity and motivation</li>
                </ul>
              </div>

              <div className="arrow-divider">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>

              <div className="after-col">
                <div className="col-header green-header">
                  <h4>After Using Limitless</h4>
                </div>
                <ul className="after-list">
                  <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0"><rect width="20" height="20" x="2" y="2" rx="5" fill="#10b981"/><path d="M8 12.5l3 3 5-6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg> Better focus and concentration</li>
                  <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0"><rect width="20" height="20" x="2" y="2" rx="5" fill="#10b981"/><path d="M8 12.5l3 3 5-6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg> Improved memory and clarity</li>
                  <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0"><rect width="20" height="20" x="2" y="2" rx="5" fill="#10b981"/><path d="M8 12.5l3 3 5-6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg> Reduced stress and better mood</li>
                  <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0"><rect width="20" height="20" x="2" y="2" rx="5" fill="#10b981"/><path d="M8 12.5l3 3 5-6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg> Better sleep and more energy</li>
                  <li><svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="flex-shrink-0"><rect width="20" height="20" x="2" y="2" rx="5" fill="#10b981"/><path d="M8 12.5l3 3 5-6" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg> Higher productivity and peak performance</li>
                </ul>
              </div>
            </div>

            <div className="challenge-photo" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '300px', borderRadius: '24px', overflow: 'hidden' }}>
              <img src="/featurespageimage/image copy 7.png" alt="Limitless Potential" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* REPORT CARD */}
      <section className="section section-light">
        <div className="wrap">
          <div className="report-grid-new">
            {/* Mockup Container */}
            <div className="report-mockup-wrapper">
              {/* Dark Card */}
              <div className="report-dark-card-new">
                <div className="dark-card-header">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span>LIMITLESS</span>
                </div>
                <h5>Your Cognitive Report</h5>
                <p className="sub-text">Overall Score</p>
                
                <div className="circular-score-new">
                  <svg viewBox="0 0 100 100" width="130" height="130" style={{transform: 'rotate(-90deg)'}}>
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#1e293b" strokeWidth="8" />
                    <circle cx="50" cy="50" r="45" fill="none" stroke="url(#gradient)" strokeWidth="8" strokeDasharray="283" strokeDashoffset="60" strokeLinecap="round" />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#7c3aed" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="score-inner">
                    <h2>78</h2>
                    <span className="eval-text">Good</span>
                  </div>
                </div>
                
                <p className="desc-text">You're performing better than<br/>78% of people in your age group.</p>
                <button className="btn-blue-rounded">View Full Report</button>
              </div>

              {/* White Box for Stats & Radar */}
              <div className="report-white-box-new">
                <div className="stats-list-new">
                  <div className="stat-item-new">
                    <h6>Mental Well-being</h6>
                    <div className="stat-val-row">
                      <span className="big-num">72</span><span className="small-num">/100</span>
                      <span className="status-good-new" style={{textDecoration: 'underline wavy #10b981 2px', textUnderlineOffset: '4px'}}>Good</span>
                    </div>
                  </div>
                  <div className="stat-item-new">
                    <h6>Focus &amp; Attention</h6>
                    <div className="stat-val-row">
                      <span className="big-num">81</span><span className="small-num">/100</span>
                      <span className="status-good-new" style={{textDecoration: 'underline wavy #10b981 2px', textUnderlineOffset: '4px'}}>Excellent</span>
                    </div>
                  </div>
                  <div className="stat-item-new">
                    <h6>Stress Level</h6>
                    <div className="stat-val-row">
                      <span className="big-num">35</span><span className="small-num">/100</span>
                      <span className="status-low-new" style={{textDecoration: 'underline wavy #f97316 2px', textUnderlineOffset: '4px'}}>Low</span>
                    </div>
                  </div>
                </div>
                <div className="radar-chart-new">
                  <svg viewBox="0 0 240 220" width="100%">
                    <g stroke="#e5e9f3" strokeWidth="1" fill="none">
                      <polygon points="120,20 200,75 172,165 68,165 40,75"/>
                      <polygon points="120,50 176,90 154,148 86,148 64,90"/>
                      <polygon points="120,80 152,105 136,131 104,131 88,105"/>
                    </g>
                    <polygon points="120,40 180,85 145,150 95,140 70,80" fill="url(#radarFill2)" stroke="#7c3aed" strokeWidth="1.5"/>
                    <defs>
                      <linearGradient id="radarFill2" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#818cf8" stopOpacity="0.55"/>
                        <stop offset="100%" stopColor="#c084fc" stopOpacity="0.55"/>
                      </linearGradient>
                    </defs>
                    <text x="120" y="12" textAnchor="middle" fontSize="11" fill="#374151" fontWeight="600">Memory</text>
                    <text x="205" y="78" textAnchor="start" fontSize="11" fill="#374151" fontWeight="600">Stress</text>
                    <text x="178" y="180" textAnchor="middle" fontSize="11" fill="#374151" fontWeight="600">Energy</text>
                    <text x="62" y="180" textAnchor="middle" fontSize="11" fill="#374151" fontWeight="600">Clarity</text>
                    <text x="35" y="78" textAnchor="end" fontSize="11" fill="#374151" fontWeight="600">Focus</text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Text Side */}
            <div className="see-get-new">
              <h3>See What You'll Get</h3>
              <p>Our AI-powered report gives you deep insights into your brain health and a clear action plan to improve what matters most.</p>
              <ul>
                <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0"><circle cx="12" cy="12" r="9" stroke="#10b981" strokeWidth="2"/><path d="M8 12.5l3 3 5-6" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg> Easy to understand</li>
                <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0"><circle cx="12" cy="12" r="9" stroke="#10b981" strokeWidth="2"/><path d="M8 12.5l3 3 5-6" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg> Personalized for you</li>
                <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0"><circle cx="12" cy="12" r="9" stroke="#10b981" strokeWidth="2"/><path d="M8 12.5l3 3 5-6" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg> Actionable recommendations</li>
                <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="flex-shrink-0"><circle cx="12" cy="12" r="9" stroke="#10b981" strokeWidth="2"/><path d="M8 12.5l3 3 5-6" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg> Track progress over time</li>
              </ul>
              <button onClick={() => navigate('/sample-report')}  className="btn-purple-rounded" style={{  cursor: 'pointer', }}>
                'View Sample Report ➔'
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* EXPERTS & PRIVACY */}
      <section className="section section-light" style={{paddingTop: 0}}>
        <div className="wrap">
          <div className="experts-row-new">
            <div className="experts-card-new">
              <h3>Built by Experts. Backed by Science.</h3>
              <div className="experts-icons-new">
                <div className="expert-item-new">
                  <div className="expert-icon-wrap" style={{background: 'radial-gradient(circle, #f3e8ff 0%, #faf5ff 70%)'}}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a5 5 0 0 0-5 5c0 2 2 3 2 5v2a3 3 0 0 0 6 0v-2c0-2 2-3 2-5a5 5 0 0 0-5-5z"/><path d="M9 16v2a3 3 0 0 0 6 0v-2"/></svg>
                  </div>
                  <h5>Psychologists</h5>
                  <p>Experts in cognitive<br/>assessments</p>
                </div>
                <div className="expert-item-new">
                  <div className="expert-icon-wrap" style={{background: 'radial-gradient(circle, #ffedd5 0%, #fff7ed 70%)'}}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8"/><path d="M12 4v16"/><path d="M4 12h16"/><circle cx="12" cy="12" r="3" fill="#fff" stroke="#f97316"/></svg>
                  </div>
                  <h5>Neuroscientists</h5>
                  <p>Researching brain<br/>function &amp; behavior</p>
                </div>
                <div className="expert-item-new">
                  <div className="expert-icon-wrap" style={{background: 'radial-gradient(circle, #e0f2fe 0%, #f0f9ff 70%)'}}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4 12H2"/><path d="M22 12h-2"/><rect x="6" y="8" width="12" height="8" rx="2"/></svg>
                  </div>
                  <h5>AI Researchers</h5>
                  <p>Building advanced<br/>cognitive models</p>
                </div>
                <div className="expert-item-new">
                  <div className="expert-icon-wrap" style={{background: 'radial-gradient(circle, #fef9c3 0%, #fefce8 70%)'}}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
                  </div>
                  <h5>Behavioral Scientists</h5>
                  <p>Specialists in human<br/>behavior &amp; habits</p>
                </div>
                <div className="expert-item-new">
                  <div className="expert-icon-wrap" style={{background: 'radial-gradient(circle, #f3e8ff 0%, #faf5ff 70%)'}}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
                  </div>
                  <h5>Data Scientists</h5>
                  <p>Ensuring accuracy &amp;<br/>data security</p>
                </div>
              </div>
            </div>
            <div className="privacy-card-new">
              <div className="privacy-icon">
                <svg width="46" height="46" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><rect x="9" y="10" width="6" height="7" rx="1"/><path d="M12 10V8a2 2 0 014 0"/></svg>
              </div>
              <div className="privacy-text">
                <h4>Your Privacy is<br/>100% Protected</h4>
                <p>Your data is encrypted, private<br/>and never shared.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section section-light" style={{paddingTop: 0}}>
        <div className="wrap">
          <h2 className="section-eyebrow">How It Works</h2>
          <div className="steps-card">
            <div className="steps-row">
              <div className="step-item">
                <div className="step-icon-wrap">
                  <span className="step-num" style={{background: '#7c3aed'}}>1</span>
                  <div className="step-circle" style={{background: '#f0e9fe'}}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><rect x="5" y="3" width="14" height="18" rx="2" stroke="#7c3aed" strokeWidth="1.6"/><path d="M9 8h6M9 12h6M9 16h3" stroke="#7c3aed" strokeWidth="1.6" strokeLinecap="round"/></svg>
                  </div>
                </div>
                <h5>Take Assessment</h5>
                <p>Answer simple questions about your lifestyle, mood &amp; habits.</p>
              </div>
              <div className="step-arrow">→</div>
              <div className="step-item">
                <div className="step-icon-wrap">
                  <span className="step-num" style={{background: '#2563eb'}}>2</span>
                  <div className="step-circle" style={{background: '#e3edfd'}}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M9 2a4 4 0 00-4 4 3 3 0 00-2 5 3 3 0 002 5 4 4 0 004 4M9 2a4 4 0 014 4M9 2v18M13 6a4 4 0 014-4 3 3 0 012 5 3 3 0 01-2 5 4 4 0 01-4 4" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
                <h5>AI Analysis</h5>
                <p>Our advanced AI analyzes your cognitive &amp; behavioral patterns.</p>
              </div>
              <div className="step-arrow">→</div>
              <div className="step-item">
                <div className="step-icon-wrap">
                  <span className="step-num" style={{background: '#16a34a'}}>3</span>
                  <div className="step-circle" style={{background: '#e3f7ea'}}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><rect x="5" y="3" width="14" height="18" rx="2" stroke="#16a34a" strokeWidth="1.6"/><path d="M9 12l2 2 4-4" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
                <h5>Get Your Report</h5>
                <p>Receive your personalized report with scores, insights &amp; recommendations.</p>
              </div>
              <div className="step-arrow">→</div>
              <div className="step-item">
                <div className="step-icon-wrap">
                  <span className="step-num" style={{background: '#f97316'}}>4</span>
                  <div className="step-circle" style={{background: '#fdeee0'}}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M4 21l4-1 11-11-3-3L5 17l-1 4z" stroke="#f97316" strokeWidth="1.6" strokeLinejoin="round"/></svg>
                  </div>
                </div>
                <h5>Follow Action Plan</h5>
                <p>Implement science-backed steps to improve your brain health and performance.</p>
              </div>
              <div className="step-arrow">→</div>
              <div className="step-item">
                <div className="step-icon-wrap">
                  <span className="step-num" style={{background: '#9333ea'}}>5</span>
                  <div className="step-circle" style={{background: '#f3e8fd'}}>
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M3 17l6-6 4 4 8-8M21 7v6h-6" stroke="#9333ea" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
                <h5>Track &amp; Improve</h5>
                <p>Monitor your progress and see real improvements over time.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="section section-light" style={{paddingTop: 0}}>
        <div className="wrap">
          <h2 className="section-eyebrow">The Limitless Benefits</h2>
          <div className="benefits-card">
            <div className="benefit-item">
              <div className="benefit-icon" style={{background: '#e3f7ea'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="9" r="6" stroke="#16a34a" strokeWidth="1.6"/><path d="M9 19h6M10 22h4" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round"/></svg>
              </div>
              <h5>Sharpen Focus &amp; Concentration</h5>
              <p>Improve attention span and eliminate distractions.</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon" style={{background: '#f0e9fe'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 2a4 4 0 00-4 4 3 3 0 00-2 5 3 3 0 002 5 4 4 0 004 4M9 2a4 4 0 014 4M9 2v18M13 6a4 4 0 014-4 3 3 0 012 5 3 3 0 01-2 5 4 4 0 01-4 4" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h5>Stronger Memory &amp; Learning</h5>
              <p>Boost recall, retain information better and enhance learning.</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon" style={{background: '#e3edfd'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M21 12.5A8.5 8.5 0 1111.5 4a6.5 6.5 0 009.5 8.5z" stroke="#2563eb" strokeWidth="1.6" strokeLinejoin="round"/></svg>
              </div>
              <h5>Better Sleep Quality</h5>
              <p>Regulate sleep patterns and wake up refreshed and energized.</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon" style={{background: '#fdeaea'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="7" r="3" stroke="#ef4444" strokeWidth="1.6"/><path d="M5 21c0-4 3-6 7-6s7 2 7 6" stroke="#ef4444" strokeWidth="1.6" strokeLinecap="round"/></svg>
              </div>
              <h5>Reduce Stress &amp; Anxiety</h5>
              <p>Understand stress triggers and build emotional balance.</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon" style={{background: '#e3f7ea'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="17" cy="5" r="2" stroke="#16a34a" strokeWidth="1.6"/><path d="M5 21l4-7 3 3 4-6M14 11l3-4 3 2" stroke="#16a34a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <h5>Increase Productivity</h5>
              <p>Make smarter decisions, manage time better and achieve more.</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon" style={{background: '#fdeaea'}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M12 21s-7-4.5-9.5-9C1 8.5 2.5 5 6 5c2 0 3.5 1.2 4 2.5C10.5 6.2 12 5 14 5c3.5 0 5 3.5 3.5 7-2.5 4.5-9.5 9-9.5 9z" stroke="#ef4444" strokeWidth="1.6" strokeLinejoin="round"/></svg>
              </div>
              <h5>Improve Overall Well-being</h5>
              <p>Enhance mood, energy and emotional balance for a healthier life.</p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS & STATS */}
      <section className="section section-light" style={{paddingTop: 0}}>
        <div className="wrap">
          <div className="testi-card-new">
            <div className="testi-item-new">
              <div className="testi-avatar-col">
                <img className="testi-avatar-new" src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=200&q=80" alt="James T."/>
              </div>
              <div className="testi-content-new">
                <div className="testi-stars-new">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <p className="testi-quote-new">"Limitless helped me understand my stress triggers and improve my focus at work. Within two weeks, I felt a huge difference."</p>
                <div className="testi-name-new">James T.</div>
                <div className="testi-loc-new">Austin, TX</div>
              </div>
            </div>
            <div className="testi-item-new">
              <div className="testi-avatar-col">
                <img className="testi-avatar-new" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&q=80" alt="Sarah M."/>
              </div>
              <div className="testi-content-new">
                <div className="testi-stars-new">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <p className="testi-quote-new">"The report was eye-opening! I improved my sleep and memory using the action plan. Highly recommended!"</p>
                <div className="testi-name-new">Sarah M.</div>
                <div className="testi-loc-new">Miami, FL</div>
              </div>
            </div>
            <div className="testi-item-new">
              <div className="testi-avatar-col">
                <img className="testi-avatar-new" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80" alt="Michael R."/>
              </div>
              <div className="testi-content-new">
                <div className="testi-stars-new">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="#fbbf24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                </div>
                <p className="testi-quote-new">"As a student, this helped me improve my concentration and study smarter, not harder."</p>
                <div className="testi-name-new">Michael R.</div>
                <div className="testi-loc-new">Denver, CO</div>
              </div>
            </div>
          </div>

          <div className="stats-bar-new">
            <div className="stat-new">
              <div className="stat-icon-wrap" style={{background: 'radial-gradient(circle, #eff6ff 0%, #f8fafc 70%)'}}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <div className="stat-text-new">
                <div className="big-new">2,300+</div>
                <div className="lbl-new">Assessments Completed</div>
              </div>
            </div>
            <div className="stat-new">
              <div className="stat-icon-wrap" style={{background: 'radial-gradient(circle, #fff7ed 0%, #fffbeb 70%)'}}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
              <div className="stat-text-new">
                <div className="big-new">4.8 / 5</div>
                <div className="lbl-new">Average Rating</div>
              </div>
            </div>
            <div className="stat-new">
              <div className="stat-icon-wrap" style={{background: 'radial-gradient(circle, #f0fdf4 0%, #f8fafc 70%)'}}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </div>
              <div className="stat-text-new">
                <div className="big-new">100%</div>
                <div className="lbl-new">Private &amp; Secure</div>
              </div>
            </div>
            <div className="stat-new">
              <div className="stat-icon-wrap" style={{background: 'radial-gradient(circle, #fdf2f8 0%, #faf5ff 70%)'}}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              </div>
              <div className="stat-text-new">
                <div className="big-new">50</div>
                <div className="lbl-new">States &amp; Counting</div>
              </div>
            </div>
            <div className="stat-new">
              <div className="stat-icon-wrap" style={{background: 'radial-gradient(circle, #faf5ff 0%, #f8fafc 70%)'}}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.31"/><path d="M14 9.3V1.99"/><path d="M8.5 2h7"/><path d="M14 9.3a6.5 6.5 0 1 1-4 0"/><path d="M5.52 16h12.96"/></svg>
              </div>
              <div className="stat-text-new">
                <div className="big-new">Science-Backed</div>
                <div className="lbl-new">Built on Research</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SCIENCE TRUST */}
      <section className="section section-light" style={{paddingTop: 0}}>
        <div className="wrap">
          <h2 className="section-eyebrow">Science You Can Trust</h2>
          <div className="trust-wrap">
            <div className="trust-blurb">Limitless is built on validated research in neuroscience, psychology, and behavioral science to deliver accurate insights that make a real impact.</div>
            <div className="trust-stats">
              <div className="trust-stat">
                <div className="icon-circ" style={{background: '#e3edfd'}}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5"/></svg>
                </div>
                <div><div className="big">50+</div><div className="lbl">Cognitive &amp; Behavioral Factors Analyzed</div></div>
              </div>
              <div className="trust-stat">
                <div className="icon-circ" style={{background: '#e3f7ea'}}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
                </div>
                <div><div className="big">1000+</div><div className="lbl">Research Studies Integrated</div></div>
              </div>
              <div className="trust-stat">
                <div className="icon-circ" style={{background: '#e3f7ea'}}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                </div>
                <div><div className="big">99.9%</div><div className="lbl">Data Accuracy &amp; Reliability</div></div>
              </div>
              <div className="trust-stat">
                <div className="icon-circ" style={{background: '#e3f3fb'}}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/></svg>
                </div>
                <div><div className="big">Continuous</div><div className="lbl">AI Model Updates &amp; Improvements</div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section section-light" style={{paddingTop: 0}}>
        <div className="wrap">
          <h2 className="section-eyebrow">Frequently Asked Questions</h2>
          <div className="faq-grid">
            {faqData.map((faq, index) => (
              <div 
                key={index} 
                className={`faq-item ${openFaq === index ? 'open' : ''}`} 
                onClick={() => toggleFaq(index)} 
                style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                  <div className="left" style={{ display: 'flex', alignItems: 'center' }}><span className="faq-ic" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginRight: '12px' }}>{faq.icon}</span> {faq.question}</div>
                  <span className="chev" style={{ transform: openFaq === index ? 'rotate(180deg)' : 'none', transition: 'transform 0.3s ease' }}>⌄</span>
                </div>
                {openFaq === index && (
                  <div className="faq-answer" style={{ marginTop: '12px', paddingLeft: '32px', color: '#64748b', fontSize: '15px', lineHeight: '1.6', fontWeight: '400' }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      {/* CTA */}
      <section className="cta-section" style={{ position: 'relative', overflow: 'hidden', minHeight: '340px', display: 'flex', alignItems: 'center' }}>
        <div 
          style={{
            position: 'absolute',
            top: 0, left: 0, width: '100%', height: '100%',
            backgroundImage: "url('/dummy/image copy 3.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0
          }}
        />
        <div className="wrap cta-inner-new" style={{ position: 'relative', zIndex: 1, width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', boxSizing: 'border-box', flexWrap: 'wrap', gap: '20px' }}>
          
          {/* CTA Text Block - Pushed slightly right from left corner */}
          <div className="cta-text-new">
            <h2 style={{ color: '#fff', marginBottom: '12px' }}>Your Best Self is Waiting.</h2>
            <p style={{ color: '#cbd5e1', marginBottom: '24px', }}>Take the first step today towards a healthier mind and a limitless future.</p>
            <div className="cta-btn-row-new" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              <button onClick={handleStartAssessment}  className="btn" style={{ background: 'linear-gradient(to right, #6366f1, #3b82f6)', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '8px', whiteSpace: 'nowrap',  cursor: 'pointer', }}>
                {isSubmitting ? 'Generating Questionnaire...' : isLoggedIn ? 'Take Assessment Again' : 'Start Free Assessment \u2794'}
              </button>
              <button onClick={() => navigate('/join-us')} className="btn" style={{ background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.3)', padding: '12px 24px', borderRadius: '8px', whiteSpace: 'nowrap' }}>Join Now</button>
            </div>
          </div>
          
          {/* Stats Badge Block - Ensured Visibility */}
          <div className="cta-badge-new">
            <h6 style={{ color: '#fff', marginBottom: '12px', }}>Join Thousands<br/>Across the USA</h6>
            <div className="count-new" style={{ color: '#cbd5e1', marginBottom: '16px', }}>2,300+ Happy Users</div>
            <div className="avatar-stack-new" style={{ display: 'flex' }}>
               <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&q=80" alt="" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #1e1b4b', marginLeft: '0', objectFit: 'cover' }}/>
               <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&q=80" alt="" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #1e1b4b', marginLeft: '-10px', objectFit: 'cover' }}/>
               <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80" alt="" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #1e1b4b', marginLeft: '-10px', objectFit: 'cover' }}/>
               <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80" alt="" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #1e1b4b', marginLeft: '-10px', objectFit: 'cover' }}/>
            </div>
          </div>
          
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

export default Home;

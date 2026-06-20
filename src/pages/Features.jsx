import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './Features.css';

const Features = () => {
  const handleStartAssessment = () => {
    window.dispatchEvent(new Event('open-booking-modal'));
  };

  return (
    <div className="features-page">
      {/* ===================== HEADER ===================== */}
      <Header />

      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-left">
            <div className="hero-eyebrow">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              FEATURES
            </div>
            <h1>
              <span style={{color: '#111827'}}>Discover Your</span><br />
              <span style={{color: '#2563eb'}}>Cognitive Strengths.</span><br />
              <span style={{color: '#9333ea'}}>Improve Your Future.</span>
            </h1>
            <p style={{color: '#4b5563'}}>Limitless combines AI, neuroscience, and behavioral science to provide deep insights into your cognitive health, helping you perform better at work, school, and life.</p>
            <div className="hero-btn-row">
              <button onClick={handleStartAssessment} className="btn btn-orange" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
                Start Free Assessment
              </button>
              <button className="btn btn-outline" style={{display: 'flex', alignItems: 'center', gap: '8px', color: '#1f2937', borderColor: '#d1d5db'}}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
                View Sample Report
              </button>
            </div>
          </div>
          <div className="hero-right">
            <div className="brain-wrap" style={{ width: '100%', minHeight: '500px', position: 'relative' }}>
              
              <div className="vertical-tag tag-ai">
                <div className="v-icon-circle">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2" ry="2"/><rect width="6" height="6" x="9" y="9" rx="1" ry="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>
                </div>
                <div className="v-text">AI-Powered<br/>Analysis</div>
              </div>

              <div className="vertical-tag tag-personal">
                <div className="v-icon-circle">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                </div>
                <div className="v-text">Personalized<br/>Insights</div>
              </div>

              <div className="vertical-tag tag-science">
                <div className="v-icon-circle">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#9333ea" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>
                </div>
                <div className="v-text">Science-<br/>Backed</div>
              </div>

              <div className="vertical-tag tag-action">
                <div className="v-icon-circle">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/><polyline points="4 14 10 8 15 13 21 7"/></svg>
                </div>
                <div className="v-text">Actionable<br/>Recommendations</div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ===================== WHY LIMITLESS ===================== */}
      <section className="section section-bg-light">
        <div className="container">
          <div className="section-head">
            <div className="section-eyebrow">WHY LIMITLESS?</div>
            <h2 className="section-title">Why Americans Are Choosing Cognitive Assessments</h2>
          </div>
          <div className="grid-4">
            <div className="card">
              <div className="icon-circle ic-purple">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/></svg>
              </div>
              <h3>Early Cognitive Awareness</h3>
              <p>Identify potential cognitive challenges before they impact daily life.</p>
            </div>
            <div className="card">
              <div className="icon-circle ic-green">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </div>
              <h3>Peak Performance</h3>
              <p>Improve productivity, decision-making, and mental energy.</p>
            </div>
            <div className="card">
              <div className="icon-circle ic-orange">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" x2="9.01" y1="9" y2="9"/><line x1="15" x2="15.01" y1="9" y2="9"/></svg>
              </div>
              <h3>Mental Wellness</h3>
              <p>Understand stress, emotional resilience, and overall well-being.</p>
            </div>
            <div className="card">
              <div className="icon-circle ic-blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>
              </div>
              <h3>Track Progress</h3>
              <p>Monitor improvements over time with AI-powered insights.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== WHAT LIMITLESS MEASURES ===================== */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-eyebrow">OUR CORE FEATURES</div>
            <h2 className="section-title">What Limitless Measures</h2>
            <p className="section-sub">Comprehensive assessment across 6 key cognitive domains</p>
          </div>
          <div className="grid-3" style={{marginBottom: '15px'}}>
            <div className="feature-card">
              <div className="feature-top">
                <div className="feature-icon" style={{background: '#f1e8ff', color: 'var(--purple)'}}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
                </div>
                <div>
                  <h3>Focus &amp; Attention</h3>
                  <p>Measure concentration levels and distraction resistance.</p>
                </div>
              </div>
              <div className="benefits-label">Benefits</div>
              <ul className="benefits-list">
                <li><span className="dot" style={{background: 'var(--purple)'}}></span>Improve productivity</li>
                <li><span className="dot" style={{background: 'var(--purple)'}}></span>Better learning outcomes</li>
                <li><span className="dot" style={{background: 'var(--purple)'}}></span>Enhanced workplace performance</li>
              </ul>
            </div>
            <div className="feature-card">
              <div className="feature-top">
                <div className="feature-icon" style={{background: '#e3faf0', color: 'var(--green)'}}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/></svg>
                </div>
                <div>
                  <h3>Memory Performance</h3>
                  <p>Evaluate memory retention and recall abilities.</p>
                </div>
              </div>
              <div className="benefits-label">Benefits</div>
              <ul className="benefits-list">
                <li><span className="dot" style={{background: 'var(--green)'}}></span>Stronger memory</li>
                <li><span className="dot" style={{background: 'var(--green)'}}></span>Better information retention</li>
                <li><span className="dot" style={{background: 'var(--green)'}}></span>Track cognitive aging</li>
              </ul>
            </div>
            <div className="feature-card">
              <div className="feature-top">
                <div className="feature-icon" style={{background: '#fff0d6', color: 'var(--orange)'}}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                </div>
                <div>
                  <h3>Processing Speed</h3>
                  <p>Understand how quickly your brain reacts and processes information.</p>
                </div>
              </div>
              <div className="benefits-label">Benefits</div>
              <ul className="benefits-list">
                <li><span className="dot" style={{background: 'var(--orange)'}}></span>Faster decisions</li>
                <li><span className="dot" style={{background: 'var(--orange)'}}></span>Better reaction times</li>
                <li><span className="dot" style={{background: 'var(--orange)'}}></span>Improved efficiency</li>
              </ul>
            </div>
          </div>
          <div className="grid-3">
            <div className="feature-card">
              <div className="feature-top">
                <div className="feature-icon" style={{background: '#e7eefe', color: 'var(--blue)'}}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </div>
                <div>
                  <h3>Mental Well-being</h3>
                  <p>Evaluate emotional health and resilience.</p>
                </div>
              </div>
              <div className="benefits-label">Benefits</div>
              <ul className="benefits-list">
                <li><span className="dot" style={{background: 'var(--blue)'}}></span>Better emotional awareness</li>
                <li><span className="dot" style={{background: 'var(--blue)'}}></span>Improved relationships</li>
                <li><span className="dot" style={{background: 'var(--blue)'}}></span>Greater life satisfaction</li>
              </ul>
            </div>
            <div className="feature-card">
              <div className="feature-top">
                <div className="feature-icon" style={{background: '#ffe5e0', color: '#ef4444'}}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
                </div>
                <div>
                  <h3>Stress Analysis</h3>
                  <p>Measure stress impact on cognitive performance.</p>
                </div>
              </div>
              <div className="benefits-label">Benefits</div>
              <ul className="benefits-list">
                <li><span className="dot" style={{background: '#ef4444'}}></span>Reduce burnout</li>
                <li><span className="dot" style={{background: '#ef4444'}}></span>Improve sleep quality</li>
                <li><span className="dot" style={{background: '#ef4444'}}></span>Better mental balance</li>
              </ul>
            </div>
            <div className="feature-card">
              <div className="feature-top">
                <div className="feature-icon" style={{background: '#f1e8ff', color: 'var(--purple)'}}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>
                </div>
                <div>
                  <h3>Cognitive Score</h3>
                  <p>Receive an overall performance score benchmarked against your age group.</p>
                </div>
              </div>
              <div className="benefits-label">Benefits</div>
              <ul className="benefits-list">
                <li><span className="dot" style={{background: 'var(--purple)'}}></span>Personalized comparison</li>
                <li><span className="dot" style={{background: 'var(--purple)'}}></span>Growth tracking</li>
                <li><span className="dot" style={{background: 'var(--purple)'}}></span>Performance monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== HOW IT WORKS ===================== */}
      <section className="section section-bg-light">
        <div className="container">
          <div className="section-head">
            <div className="section-eyebrow">HOW IT WORKS</div>
            <h2 className="section-title">3 Simple Steps to Better Cognitive Health</h2>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-num" style={{background: 'var(--purple)'}}>1</div>
              <div className="step-icon" style={{color: 'var(--purple)'}}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>
              </div>
              <h3>Complete Assessment</h3>
              <p>5-minute science-backed questionnaire.</p>
            </div>
            <div className="step-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </div>
            <div className="step-card">
              <div className="step-num" style={{background: 'var(--blue)'}}>2</div>
              <div className="step-icon" style={{color: 'var(--blue)'}}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/></svg>
              </div>
              <h3>AI Analysis</h3>
              <p>Advanced algorithms evaluate cognitive and behavioral patterns.</p>
            </div>
            <div className="step-arrow">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </div>
            <div className="step-card">
              <div className="step-num" style={{background: 'var(--green)'}}>3</div>
              <div className="step-icon" style={{color: 'var(--green)'}}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
              </div>
              <h3>Personalized Report</h3>
              <p>Receive actionable insights and recommendations.</p>
            </div>
          </div>

          {/* Report Preview */}
          <div className="report-wrap">
            <div className="report-mock">
              <div className="report-mock-topbar">
                <div className="brand">
                  <div className="brand-logo" style={{width: '24px', height: '24px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/></svg>
                  </div>
                  <div className="brand-text-group">
                    <span className="brand-name">LIMITLESS</span>
                    <span className="brand-tag">UNLOCK YOUR TRUE POTENTIAL</span>
                  </div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '14px'}}>
                  <span style={{fontSize: '11px'}}>📞 +1 (702) 555-0147</span>
                  <button onClick={handleStartAssessment} className="btn btn-orange" style={{padding: '7px 14px', fontSize: '11px'}}>🚀 Start Assessment</button>
                </div>
              </div>
              <div className="report-mock-body">
                <ul className="report-sidebar">
                  <li className="active">Overview</li>
                  <li>Cognitive Scores</li>
                  <li>Insights</li>
                  <li>Action Plan</li>
                  <li>Progress</li>
                  <li>Recommendations</li>
                </ul>
                <div className="report-main">
                  <h2>Your AI Report Deep Insights.<br /><span className="blue">Better Decisions.</span></h2>
                  <p>Your personalized AI report shows your current status, key insights, and an action plan to improve your overall well-being.</p>
                  <div className="score-row">
                    <div className="score-box">
                      <div className="label">Overall Cognitive Score</div>
                      <div className="value">78</div>
                      <div className="tag" style={{color: 'var(--green)'}}>
                        Good
                      </div>
                    </div>
                    <div className="score-box">
                      <div className="label">Mental Well-being</div>
                      <div className="value">72</div>
                      <div className="tag" style={{color: 'var(--purple)'}}>Good</div>
                    </div>
                    <div className="score-box">
                      <div className="label">Focus &amp; Attention</div>
                      <div className="value">81</div>
                      <div className="tag" style={{color: 'var(--orange)'}}>Stress Level: 36</div>
                    </div>
                  </div>
                  <div className="insights-row">
                    <div className="insight-box">
                      <div className="label">Key Insights</div>
                      <ul>
                        <li>• Your memory is strong</li>
                        <li>• Stress is slightly elevated</li>
                        <li>• Focus can be improved</li>
                      </ul>
                    </div>
                    <div className="insight-box">
                      <div className="label">Personalized Action Plan</div>
                      <ul>
                        <li>• Practice 10 mins of mindfulness daily</li>
                        <li>• Improve sleep quality (7–8 hours)</li>
                        <li>• Engage in brain training 3x/week</li>
                        <li>• Stay hydrated and balanced diet</li>
                      </ul>
                      <div style={{fontSize: '10.5px', color: 'var(--purple)', fontWeight: '700', marginTop: '8px'}}>
                        View Full Action Plan
                      </div>
                    </div>
                    <div className="insight-box" style={{textAlign: 'center'}}>
                      <div className="label" style={{textAlign: 'left'}}>Report Summary</div>
                      <div className="ring">78</div>
                      <div style={{fontSize: '9.5px', color: 'var(--text-gray)'}}>Excellent (90-100)</div>
                      <div style={{fontSize: '9.5px', color: 'var(--text-gray)'}}>Good (70-89)</div>
                      <div style={{fontSize: '9.5px', color: 'var(--text-gray)'}}>Average (40-69)</div>
                      <div style={{fontSize: '9.5px', color: 'var(--text-gray)'}}>Needs Attention (0-39)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="report-includes">
              <h3>Your Personalized<br />AI Report Includes</h3>
              <div className="include-item">
                <div className="check">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <div className="t-label">Overall Cognitive Score</div>
                  <div className="t-sub">Your total cognitive performance score</div>
                </div>
              </div>
              <div className="include-item">
                <div className="check">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <div className="t-label">Mental Wellness Score</div>
                  <div className="t-sub">Emotional well-being and resilience</div>
                </div>
              </div>
              <div className="include-item">
                <div className="check">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <div className="t-label">Focus &amp; Attention Analysis</div>
                  <div className="t-sub">Detailed attention and concentration insights</div>
                </div>
              </div>
              <div className="include-item">
                <div className="check">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <div className="t-label">Stress Risk Analysis</div>
                  <div className="t-sub">Understand stress impact on your mind</div>
                </div>
              </div>
              <div className="include-item">
                <div className="check">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <div className="t-label">Personalized Recommendations</div>
                  <div className="t-sub">Actionable steps to improve performance</div>
                </div>
              </div>
              <div className="include-item">
                <div className="check">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <div>
                  <div className="t-label">Progress Tracking</div>
                  <div className="t-sub">Monitor improvements over time</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== WHO BENEFITS ===================== */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div className="section-eyebrow">WHO BENEFITS?</div>
            <h2 className="section-title">Designed For Everyone</h2>
          </div>
          <div className="who-grid">
            <div className="who-card">
              <div className="icon-circle ic-purple">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
              </div>
              <h3>Students</h3>
              <p>Improve learning, focus, and academic performance.</p>
            </div>
            <div className="who-card">
              <div className="icon-circle ic-green">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
              </div>
              <h3>Professionals</h3>
              <p>Boost productivity, reduce burnout, and make better decisions.</p>
            </div>
            <div className="who-card">
              <div className="icon-circle ic-orange">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              </div>
              <h3>Parents</h3>
              <p>Understand mental wellness, stress management, and build healthier routines.</p>
            </div>
            <div className="who-card">
              <div className="icon-circle ic-blue">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </div>
              <h3>Seniors</h3>
              <p>Track cognitive health, support healthy aging, and maintain independence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== TRUST BAR ===================== */}
      <section className="trust-bar">
        <div className="container trust-grid">
          <div className="trust-item">
            <div className="ic">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/><path d="M7 16h10"/></svg>
            </div>
            <div>
              <h4>Science-Backed</h4>
              <p>Built using validated cognitive and behavioral assessment methodologies based on neuroscience research.</p>
            </div>
          </div>
          <div className="trust-item">
            <div className="ic">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div>
              <h4>Private &amp; Secure</h4>
              <p>Your data is encrypted and protected with enterprise-grade security. We never share your information.</p>
            </div>
          </div>
          <div className="trust-item">
            <div className="ic">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--purple)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="4" rx="2" ry="2"/><rect width="6" height="6" x="9" y="9" rx="1" ry="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/></svg>
            </div>
            <div>
              <h4>AI-Powered</h4>
              <p>Advanced machine learning analyzes multiple factors to deliver accurate insights and recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FINAL CTA ===================== */}
      <section className="final-cta">
        <div className="brain-img final-brain-deco" style={{color: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <svg width="300" height="300" viewBox="0 0 24 24" fill="currentColor"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4"/><path d="M17.599 6.5a3 3 0 0 0 .399-1.375"/></svg>
        </div>
        <div className="container final-cta-inner">
          <div>
            <h2>Ready to Unlock Your True Potential?</h2>
            <p>Take the Limitless Cognitive Assessment today and gain the insights needed to improve focus, reduce stress, and maximize performance.</p>
          </div>
          <div className="final-cta-right">
            <button onClick={handleStartAssessment} className="btn btn-orange" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
              Start Free Assessment
            </button>
            <div className="phone" style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +1 (702) 555-0147
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;

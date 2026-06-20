import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './HowItWorksPage.css';

const HowItWorksPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="how-it-works-page">
      {/* ===================== HEADER ===================== */}
      <Header />

      {/* ===================== HERO ===================== */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="badge-pill">◐ HOW IT WORKS</div>
            <h1>
              A Simple Process.<br/>
              <span className="grad-blue">Powerful Results.</span>
            </h1>
            <p>Limitless makes cognitive health assessment easy, secure, and personalized. Complete a few simple steps and get AI-powered insights you can trust.</p>
            <div className="hero-trust-row">
              <div className="hero-trust-item">
                <div className="ic">🕐</div>
                <span>Under 5 Minutes</span>
              </div>
              <div className="hero-trust-item">
                <div className="ic">🛡️</div>
                <span>100% Secure</span>
              </div>
              <div className="hero-trust-item">
                <div className="ic">🧠</div>
                <span>AI-Powered</span>
              </div>
              <div className="hero-trust-item">
                <div className="ic">📈</div>
                <span>Personalized<br/>Results</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="head-profile-img placeholder-asset" style={{background: 'radial-gradient(circle at 60% 40%, #6d5bd0 0%, #2c2470 55%, transparent 80%)'}}></div>
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
              <div className="step5-ic">👤+</div>
              <h3>Create Your Account</h3>
              <p>Sign up in seconds with your email or phone number.</p>
            </div>
            <div className="step5-arrow">→</div>
            <div className="step5-card">
              <div className="step5-num">2</div>
              <div className="step5-ic">📋</div>
              <h3>Provide Basic Details</h3>
              <p>Share some basic information to personalize your assessment.</p>
            </div>
            <div className="step5-arrow">→</div>
            <div className="step5-card">
              <div className="step5-num">3</div>
              <div className="step5-ic">🧠</div>
              <h3>Complete Assessment</h3>
              <p>Answer science-backed questions about your cognitive health.</p>
            </div>
            <div className="step5-arrow">→</div>
            <div className="step5-card">
              <div className="step5-num">4</div>
              <div className="step5-ic">🤖</div>
              <h3>AI Analysis</h3>
              <p>Our advanced AI analyzes your responses across multiple domains.</p>
            </div>
            <div className="step5-arrow">→</div>
            <div className="step5-card">
              <div className="step5-num">5</div>
              <div className="step5-ic">📄</div>
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

          <div className="panel-grid-3">
            <div className="form-panel">
              <h3>1. Create Your Account</h3>
              <p>Choose a convenient way to sign up.</p>
              <div className="oauth-btn">🔵 Continue with Google</div>
              <div className="oauth-btn"> Continue with Apple</div>
              <div className="or-divider">or</div>
              <label className="field-label">Full Name</label>
              <div className="field-input placeholder-text">John Doe</div>
              <label className="field-label">Email Address</label>
              <div className="field-input placeholder-text">john.doe@example.com</div>
              <label className="field-label">Password</label>
              <div className="field-input"><span className="placeholder-text">••••••••</span><span>👁</span></div>
              <div className="terms-row">
                <span>☐</span>
                <span>I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a></span>
              </div>
              <button className="btn btn-purple btn-block">Create Account</button>
              <div className="login-link">Already have an account? <a href="#">Login</a></div>
            </div>

            <div className="form-panel">
              <h3>2. Basic Information</h3>
              <p>Help us personalize your assessment.</p>
              <label className="field-label">Date of Birth</label>
              <div className="field-input placeholder-text">MM / DD / YYYY <span>📅</span></div>
              <label className="field-label">Gender</label>
              <div className="field-input placeholder-text">Select Gender <span>⌄</span></div>
              <label className="field-label">Phone Number (Optional)</label>
              <div className="field-input placeholder-text">+1 (___) ___-____</div>
              <label className="field-label">Location</label>
              <div className="field-input placeholder-text">United States <span>⌄</span></div>
              <button className="btn btn-purple btn-block" style={{marginTop: '8px'}}>Continue to Assessment</button>
            </div>

            <div className="info-safe-panel">
              <div className="info-safe-top">
                <div className="info-safe-icon">🛡️</div>
                <div>
                  <h4>Your Information is Safe</h4>
                  <p>We use bank-level encryption to keep your data private and secure.</p>
                </div>
              </div>
              <ul className="safe-list">
                <li><span className="safe-check">✓</span>Encrypted &amp; Secure Data</li>
                <li><span className="safe-check">✓</span>Your data is never shared</li>
                <li><span className="safe-check">✓</span>You can delete your data anytime</li>
                <li><span className="safe-check">✓</span>HIPAA-aligned best practices</li>
              </ul>
              <div className="lock-deco placeholder-asset" style={{background: 'radial-gradient(circle, #a78bfa55 0%, transparent 70%)'}}></div>
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
              <div className="s45-icon-box">🧠</div>
              <h3>4. AI Analysis</h3>
              <p>Our AI evaluates your responses using validated cognitive and behavioral models.</p>
              <ul className="s45-list">
                <li><span className="s45-check">✓</span>50+ Cognitive &amp; Behavioral Factors</li>
                <li><span className="s45-check">✓</span>Neuroscience-Based Algorithms</li>
                <li><span className="s45-check">✓</span>Benchmarked Against Age Group</li>
                <li><span className="s45-check">✓</span>Instant, Accurate &amp; Reliable</li>
              </ul>
            </div>
            <div className="s45-arrow">→</div>
            <div className="s45-card" style={{borderLeft: '1px solid var(--card-border)'}}>
              <h3>5. Get Your Personalized Report</h3>
              <p>Receive a detailed report with scores, insights, and recommendations.</p>
              <ul className="s45-list">
                <li><span className="s45-check">✓</span>Overall Cognitive Score</li>
                <li><span className="s45-check">✓</span>Strengths &amp; Areas to Improve</li>
                <li><span className="s45-check">✓</span>Personalized Action Plan</li>
                <li><span className="s45-check">✓</span>Track Progress Over Time</li>
              </ul>
            </div>

            <div className="mini-report">
              <div className="mini-report-top">
                <div className="brand-logo placeholder-asset"></div>
                <span className="brand-name">LIMITLESS</span>
              </div>
              <div className="mini-report-body">
                <ul className="mini-sidebar">
                  <li className="active">Overview</li>
                  <li>Cognitive Scores</li>
                  <li>Insights</li>
                  <li>Action Plan</li>
                  <li>Progress</li>
                  <li>Recommendations</li>
                </ul>
                <div className="mini-main">
                  <h4>Your AI Report Deep Insights.<br/><span className="blue">Better Decisions.</span></h4>
                  <div className="mini-score-row">
                    <div className="mini-score-box"><div className="label">Overall Cognitive</div><div className="value">78</div></div>
                    <div className="mini-score-box"><div className="label">Mental Well-being</div><div className="value">72</div></div>
                    <div className="mini-score-box"><div className="label">Focus &amp; Attention</div><div className="value">81</div></div>
                    <div className="mini-score-box"><div className="label">Stress Level</div><div className="value">36</div></div>
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
                      <div className="mini-ring">78</div>
                      <div style={{fontSize: '7px', color: 'var(--text-gray)'}}>Excellent (90-100)</div>
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
            <button className="btn btn-orange">🚀 Start Free Assessment</button>
            <div className="phone">📞 +1 (702) 555-0147</div>
          </div>
          <div className="final-brain-deco placeholder-asset" style={{background: 'radial-gradient(circle, #6d5bd0 0%, #2c2470 60%, transparent 80%)', borderRadius: '50%'}}></div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorksPage;

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './Benefits.css';

const Benefits = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="benefits-page">
      {/* ===================== HEADER ===================== */}
      <Header />

      {/* ===================== HERO ===================== */}
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="section-eyebrow-light">BENEFITS</div>
            <h1>
              Real Benefits.<br/>
              <span className="grad-blue">Better Brain.</span> <span style={{color: '#a78bfa'}}>Better Life.</span>
            </h1>
            <p>Our AI-Powered Cognitive Health Assessment gives you the insights you need to improve focus, reduce stress, strengthen memory, and perform at your best every day.</p>
            <div className="hero-stats-row">
              <div className="hero-stat">
                <div className="ic">🎯</div>
                <span>Science-Backed<br/>Assessment</span>
              </div>
              <div className="hero-stat">
                <div className="ic">🤖</div>
                <span>AI-Powered<br/>Insights</span>
              </div>
              <div className="hero-stat">
                <div className="ic">🔀</div>
                <span>Personalized<br/>Recommendations</span>
              </div>
              <div className="hero-stat">
                <div className="ic">🔒</div>
                <span>Private &amp;<br/>Secure</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="float-pill fp-tl">
              <div className="pill-ic" style={{background: '#1f9e6b22', color: '#34d399'}}>🎯</div>
              Improve Focus<br/>and Attention
            </div>
            <div className="float-pill fp-tr">
              <div className="pill-ic" style={{background: '#f9731622', color: '#fb923c'}}>🔥</div>
              Reduce Stress<br/>and Burnout
            </div>
            <div className="float-pill fp-bl">
              <div className="pill-ic" style={{background: '#7c3aed22', color: '#a78bfa'}}>🧠</div>
              Strengthen<br/>Memory
            </div>
            <div className="float-pill fp-br">
              <div className="pill-ic" style={{background: '#16a34a22', color: '#4ade80'}}>🙂</div>
              Enhance Overall<br/>Well-being
            </div>
            <div className="brain-img placeholder-asset" style={{background: 'radial-gradient(circle, #6d5bd0 0%, #2c2470 60%, transparent 80%)'}}></div>
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
              <div className="icon-circle ic-purple">👥</div>
              <h3>1 in 5 Adults</h3>
              <p>Experience a mental health condition each year in the USA.</p>
              <div className="stat-source">Source: NAMI</div>
            </div>
            <div className="stat-card">
              <div className="icon-circle ic-green">📉</div>
              <h3>40% Decline</h3>
              <p>In attention span over the last decade due to digital overload and distractions.</p>
              <div className="stat-source">Source: Microsoft Study</div>
            </div>
            <div className="stat-card">
              <div className="icon-circle ic-orange">😟</div>
              <h3>77% of Americans</h3>
              <p>Experience physical symptoms caused by stress.</p>
              <div className="stat-source">Source: APA</div>
            </div>
            <div className="stat-card">
              <div className="icon-circle ic-blue">🧠</div>
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
              <div className="who-photo placeholder-asset" style={{background: 'linear-gradient(160deg,#cbd5f5,#94a3c4)'}}>
                <div className="who-badge" style={{background: 'var(--purple)'}}>🎓</div>
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
              <div className="who-photo placeholder-asset" style={{background: 'linear-gradient(160deg,#cbd5f5,#94a3c4)'}}>
                <div className="who-badge" style={{background: 'var(--green)'}}>💼</div>
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
              <div className="who-photo placeholder-asset" style={{background: 'linear-gradient(160deg,#cbd5f5,#94a3c4)'}}>
                <div className="who-badge" style={{background: 'var(--orange)'}}>👪</div>
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
              <div className="who-photo placeholder-asset" style={{background: 'linear-gradient(160deg,#cbd5f5,#94a3c4)'}}>
                <div className="who-badge" style={{background: 'var(--blue)'}}>👤</div>
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
              <div className="icon-circle" style={{color: 'var(--purple)'}}>🎯</div>
              <h3>Improve Focus</h3>
              <p>Up to 35% improvement in attention and concentration with consistent practice.</p>
            </div>
            <div className="impact-item">
              <div className="icon-circle" style={{color: 'var(--green)'}}>🧠</div>
              <h3>Stronger Memory</h3>
              <p>Better recall and retention through personalized brain training recommendations.</p>
            </div>
            <div className="impact-item">
              <div className="icon-circle" style={{color: 'var(--orange)'}}>🙂</div>
              <h3>Reduce Stress</h3>
              <p>Lower stress levels and better emotional balance improve overall well-being.</p>
            </div>
            <div className="impact-item">
              <div className="icon-circle" style={{color: 'var(--blue)'}}>📈</div>
              <h3>Boost Performance</h3>
              <p>Better cognitive performance leads to higher productivity and success.</p>
            </div>
            <div className="impact-item">
              <div className="icon-circle" style={{color: 'var(--purple)'}}>💜</div>
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
              <div className="adv-icon">🕐</div>
              <div>
                <h4>Quick &amp; Easy</h4>
                <p>Complete the assessment in under 5 minutes.</p>
              </div>
            </div>
            <div className="adv-card">
              <div className="adv-icon">🤖</div>
              <div>
                <h4>AI-Powered Analysis</h4>
                <p>Advanced algorithms analyze 50+ cognitive, behavioral &amp; health factors.</p>
              </div>
            </div>
            <div className="adv-card">
              <div className="adv-icon">🔒</div>
              <div>
                <h4>100% Private &amp; Secure</h4>
                <p>Your data is encrypted and never shared with anyone.</p>
              </div>
            </div>
          </div>
          <div className="adv-grid">
            <div className="adv-card">
              <div className="adv-icon">📋</div>
              <div>
                <h4>Personalized AI Report</h4>
                <p>Get a detailed report with insights and action plan tailored just for you.</p>
              </div>
            </div>
            <div className="adv-card">
              <div className="adv-icon">📈</div>
              <div>
                <h4>Track Progress Over Time</h4>
                <p>Monitor improvements and track your cognitive trends.</p>
              </div>
            </div>
            <div className="adv-card">
              <div className="adv-icon">🧪</div>
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
              <button className="btn btn-orange">🚀 Start Free Assessment</button>
              <div className="phone">📞 +1 (702) 555-0147</div>
            </div>
          </div>
          <div className="final-trust-row">
            <div className="final-trust-item">
              <div className="ic">⭐</div>
              <span>Trusted by<br/>Thousands<br/>Across the USA</span>
            </div>
            <div className="final-trust-item">
              <div className="ic">🅰️</div>
              <span>Science<br/>Backed<br/>Assessment</span>
            </div>
            <div className="final-trust-item">
              <div className="ic">🔒</div>
              <span>Private &amp;<br/>Secure Always</span>
            </div>
            <div className="final-shield placeholder-asset">
              <div className="final-shield-inner" style={{background: 'radial-gradient(circle, #6d5bd0 0%, #2c2470 70%, transparent 90%)'}}></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Benefits;

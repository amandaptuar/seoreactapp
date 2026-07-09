import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';
import bcrypt from 'bcryptjs';
import { generateAssessmentQuestions } from '../lib/apiUtils';
import { sendCredentialsEmail } from '../lib/emailService';
import './JoinUsPage.css';

const JoinUsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', age: '', gender: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');

    try {
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', formData.email)
        .single();

      if (error || !user) throw new Error('Invalid email or password');

      const isValid = await bcrypt.compare(formData.password, user.password_hash);
      if (!isValid) throw new Error('Invalid email or password');

      sessionStorage.setItem('userEmail', user.email);
      sessionStorage.setItem('username', user.email);
      sessionStorage.setItem('name', user.name);
      sessionStorage.setItem('userId', user.id);
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('paymentStatus', user.payment_status === 'paid' ? 'yes' : 'no');
      if (user.age) sessionStorage.setItem('userAge', user.age);
      if (user.gender) sessionStorage.setItem('userGender', user.gender);
      
      navigate('/dashboard');
    } catch (err) {
      setFormError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');

    try {
      // 1. Check if email already exists FIRST
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', formData.email)
        .maybeSingle();

      if (existingUser) {
        setFormError('This email is already registered. Please log in instead.');
        setIsSubmitting(false);
        return;
      }

      // 2. Generate Questions from Limitless API
      const questionsData = await generateAssessmentQuestions(formData.age, formData.gender);
      
      // 3. Generate temp password & insert user
      const generatedPassword = Math.random().toString(36).slice(-8).toUpperCase();
      const passwordHash = await bcrypt.hash(generatedPassword, 10);
      
      const { data: newUser, error: insertErr } = await supabase
        .from('users')
        .insert([{
          name: formData.name,
          email: formData.email,
          temp_password: generatedPassword,
          password_hash: passwordHash,
          password_reset_required: true,
          payment_status: 'pending',
          age: parseInt(formData.age, 10),
          gender: formData.gender,
        }])
        .select('id')
        .single();

      if (insertErr) {
        throw new Error(`DB Error: ${insertErr.message || insertErr.details || JSON.stringify(insertErr)}`);
      }
      
      const dbUserId = newUser.id;

      try {
        await sendCredentialsEmail({
          name: formData.name,
          email: formData.email,
          tempPassword: generatedPassword,
        });
      } catch (emailErr) {
        console.warn('Credentials email failed (non-fatal):', emailErr);
      }

      setFormError('');

      sessionStorage.setItem('assessmentId', questionsData.assessmentId);
      sessionStorage.setItem('assessmentSections', JSON.stringify(questionsData.sections));
      sessionStorage.setItem('userEmail', formData.email);
      sessionStorage.setItem('username', formData.email);
      sessionStorage.setItem('name', formData.name);
      sessionStorage.setItem('userAge', formData.age);
      sessionStorage.setItem('userGender', formData.gender);
      sessionStorage.setItem('generatedPassword', generatedPassword);
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('paymentStatus', 'no');
      sessionStorage.setItem('passwordResetRequired', 'true');
      if (dbUserId) sessionStorage.setItem('userId', dbUserId);

      navigate('/question');
      window.scrollTo(0, 0);
    } catch (error) {
      console.error('Error:', error);
      setFormError(error.message || 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="limitless-joinus">
      <Header />

      <main>
        {/* ═══════════ HERO ═══════════ */}
        <section className="hero">
          <div className="hero-left">
            <div className="badge-join">JOIN US</div>
            <h1>Be Part of a<br/><span>Smarter, Healthier Future.</span></h1>
            <p>Join thousands of professionals, students, parents, and wellness enthusiasts who trust Limitless to unlock their cognitive potential and live their best life.</p>
            <div className="hero-badges">
              <div className="hero-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4f9cf9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="2"/><path d="M12 2a10 10 0 0 1 0 20M12 2a10 10 0 0 0 0 20M2 12h20M12 12l7-7M12 12l-7 7"/></svg>
                Science-Backed
              </div>
              <div className="hero-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="8" y="8" width="8" height="8"/><line x1="4" y1="10" x2="2" y2="10"/><line x1="4" y1="14" x2="2" y2="14"/><line x1="20" y1="10" x2="22" y2="10"/><line x1="20" y1="14" x2="22" y2="14"/><line x1="10" y1="4" x2="10" y2="2"/><line x1="14" y1="4" x2="14" y2="2"/><line x1="10" y1="20" x2="10" y2="22"/><line x1="14" y1="20" x2="14" y2="22"/></svg>
                AI-Powered
              </div>
              <div className="hero-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                Trusted by 2,300+ Users
              </div>
            </div>
          </div>


        </section>

        {/* ═══════════ AUTH + WHY JOIN ═══════════ */}
        <section className="auth-section">
          <div className="auth-left">
            <h2>Welcome Back!</h2>
            <p>Sign in to continue your journey with Limitless.</p>
            {sessionStorage.getItem('isLoggedIn') === 'true' ? (
              <div style={{ textAlign: 'center', padding: '30px 10px', background: 'rgba(255,255,255,0.8)', borderRadius: '16px', border: '1px solid #e2e8f0', marginTop: '20px' }}>
                <h3 style={{ color: '#0F172A', marginBottom: '16px', fontSize: '22px' }}>You are currently logged in</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
                  <button 
                    onClick={() => navigate('/dashboard')} 
                    style={{ padding: '12px 24px', border: '2px solid #7c3aed', color: '#7c3aed', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', background: 'transparent', width: '100%', maxWidth: '300px' }}
                  >
                    Go to Dashboard →
                  </button>
                  <button 
                    onClick={async () => {
                      try {
                        setIsSubmitting(true);
                        const age = sessionStorage.getItem('userAge') || 30;
                        const gender = sessionStorage.getItem('userGender') || 'male';
                        const questionsData = await generateAssessmentQuestions(age, gender);
                        sessionStorage.setItem('assessmentId', questionsData.assessmentId);
                        sessionStorage.setItem('assessmentSections', JSON.stringify(questionsData.sections));
                        navigate('/question');
                        window.scrollTo(0, 0);
                      } catch (error) {
                        console.error(error);
                        alert('Failed to generate assessment');
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                    disabled={isSubmitting}
                    style={{ padding: '12px 24px', opacity: isSubmitting ? 0.7 : 1, border: 'none', borderRadius: '12px', color: '#fff', fontWeight: 700, cursor: 'pointer', background: '#7c3aed', width: '100%', maxWidth: '300px' }}
                  >
                    {isSubmitting ? 'Generating Questionnaire...' : 'Generate More Assessment'}
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="tabs">
                  <div className={`tab ${activeTab === 'signin' ? 'active' : ''}`} onClick={() => setActiveTab('signin')}>Sign In</div>
                  <div className={`tab ${activeTab === 'signup' ? 'active' : ''}`} onClick={() => setActiveTab('signup')}>Sign Up</div>
                </div>

                <form onSubmit={activeTab === 'signin' ? handleLogin : handleSignup}>
                  {formError && (
                    <div style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.25)', borderRadius: '8px', padding: '10px 14px', color: '#ef4444', fontSize: '14px', fontWeight: '500', marginBottom: '16px' }}>
                      ⚠️ {formError}
                    </div>
                  )}
                  {activeTab === 'signup' && (
                    <div className="form-group">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
                    </div>
                  )}
                  <div className="form-group">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" required />
                  </div>
                  
                  {activeTab === 'signin' && (
                    <div className="form-group">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleChange} placeholder="Password" required />
                      <svg className="eye-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" onClick={() => setShowPassword(!showPassword)}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </div>
                  )}

                  {activeTab === 'signup' && (
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                      <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                        <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age (18-66)" min="18" max="66" required />
                      </div>
                      <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                        <select name="gender" value={formData.gender} onChange={handleChange} required style={{ border: 'none', background: 'transparent', width: '100%', outline: 'none', fontSize: '15px', color: formData.gender ? '#0f172a' : '#9ca3af', appearance: 'none' }}>
                          <option value="" disabled>Gender</option>
                          <option value="female">Female</option>
                          <option value="male">Male</option>
                        </select>
                      </div>
                    </div>
                  )}

                  <div className="form-row">
                    <label className="remember"><input type="checkbox" defaultChecked /> Remember me</label>
                    {activeTab === 'signin' && <a href="#forgot" className="forgot">Forgot Password?</a>}
                  </div>
                  <button type="submit" disabled={isSubmitting} className="btn-signin" style={{ opacity: isSubmitting ? 0.7 : 1 }}>
                    {isSubmitting ? 'Please wait...' : (activeTab === 'signin' ? 'Sign In' : 'Start Free Assessment')}
                  </button>
                </form>
                <div className="signup-prompt">
                  {activeTab === 'signin' ? (
                    <>Don't have an account? <button onClick={() => setActiveTab('signup')}>Sign Up</button></>
                  ) : (
                    <>Already have an account? <button onClick={() => setActiveTab('signin')}>Sign In</button></>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="auth-right">
            <h2>Why Join Limitless?</h2>
            <p>Your journey to a better brain and better life starts here.</p>
            <div className="why-list">
              <div className="why-item">
                <div className="why-icon purple">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7c3aed" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                </div>
                <div className="why-item-text">
                  <h4>Personalized Assessments</h4>
                  <p>AI-powered reports tailored to your cognitive strengths and areas of improvement.</p>
                </div>
              </div>
              <div className="why-item">
                <div className="why-icon green">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                </div>
                <div className="why-item-text">
                  <h4>Actionable Insights</h4>
                  <p>Get science-backed recommendations to enhance your memory, focus, and well-being.</p>
                </div>
              </div>
              <div className="why-item">
                <div className="why-icon blue">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
                </div>
                <div className="why-item-text">
                  <h4>Track &amp; Improve</h4>
                  <p>Monitor your progress over time and see real improvements in your performance.</p>
                </div>
              </div>
              <div className="why-item">
                <div className="why-icon orange">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
                </div>
                <div className="why-item-text">
                  <h4>Trusted &amp; Secure</h4>
                  <p>Your data is 100% private, encrypted, and never shared.</p>
                </div>
              </div>
              <div className="why-item">
                <div className="why-icon pink">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                </div>
                <div className="why-item-text">
                  <h4>For Everyone</h4>
                  <p>Professionals, students, parents, seniors, and wellness enthusiasts – Limitless is for you.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="info-cards-wrapper">
          {/* ═══════════ CAREERS ═══════════ */}
          <section className="careers-card">
            <div className="careers-left">
              <h2>We're Building the Future<br/>of Brain Health.</h2>
              <p>Join our mission to empower millions of people to unlock their true potential through science, AI, and innovation.</p>
              <button className="btn-solid-purple">View Open Positions</button>
            </div>
            <div className="careers-right">
              <div className="stat-column">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="10" r="4" fill="#4f9cf9" fillOpacity=".25"/>
                  <circle cx="12" cy="10" r="4" stroke="#4f9cf9" strokeWidth="1.5" fill="none"/>
                  <circle cx="21" cy="10" r="4" fill="#4f9cf9" fillOpacity=".25"/>
                  <circle cx="21" cy="10" r="4" stroke="#4f9cf9" strokeWidth="1.5" fill="none"/>
                  <path d="M4 26c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="#4f9cf9" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                  <path d="M20 18.5c2.2.5 4 2.6 4 5.5" stroke="#4f9cf9" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                </svg>
                <div className="stat-num">20+</div>
                <div className="stat-label">Open Positions</div>
              </div>
              <div className="stat-column">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="12" width="20" height="14" rx="2" stroke="#22c55e" strokeWidth="1.5" fill="#22c55e" fillOpacity=".15"/>
                  <path d="M11 12V9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3" stroke="#22c55e" strokeWidth="1.5" fill="none"/>
                  <line x1="6" y1="19" x2="26" y2="19" stroke="#22c55e" strokeWidth="1.5"/>
                  <line x1="14" y1="19" x2="18" y2="19" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
                <div className="stat-num">5+</div>
                <div className="stat-label">Departments</div>
              </div>
              <div className="stat-column">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="11" stroke="#7c3aed" strokeWidth="1.5" fill="#7c3aed" fillOpacity=".1"/>
                  <ellipse cx="16" cy="16" rx="5" ry="11" stroke="#7c3aed" strokeWidth="1.5" fill="none"/>
                  <line x1="5" y1="16" x2="27" y2="16" stroke="#7c3aed" strokeWidth="1.5"/>
                  <line x1="7" y1="10" x2="25" y2="10" stroke="#7c3aed" strokeWidth="1" opacity=".5"/>
                  <line x1="7" y1="22" x2="25" y2="22" stroke="#7c3aed" strokeWidth="1" opacity=".5"/>
                </svg>
                <div className="stat-num">Global</div>
                <div className="stat-label">Remote First</div>
              </div>
              <div className="stat-column">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="6" y="18" width="5" height="8" rx="1" fill="#f97316" opacity=".3"/>
                  <rect x="6" y="18" width="5" height="8" rx="1" stroke="#f97316" strokeWidth="1.5" fill="none"/>
                  <rect x="13.5" y="12" width="5" height="14" rx="1" fill="#f97316" opacity=".3"/>
                  <rect x="13.5" y="12" width="5" height="14" rx="1" stroke="#f97316" strokeWidth="1.5" fill="none"/>
                  <rect x="21" y="6" width="5" height="20" rx="1" fill="#f97316" opacity=".3"/>
                  <rect x="21" y="6" width="5" height="20" rx="1" stroke="#f97316" strokeWidth="1.5" fill="none"/>
                  <polyline points="8,16 16,10 24,4" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="20,4 24,4 24,8" stroke="#f97316" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
                <div className="stat-num">Growth</div>
                <div className="stat-label">Career Development</div>
              </div>
              <div className="carousel-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </div>
            </div>
          </section>

          {/* ═══════════ TESTIMONIALS ═══════════ */}
          <section className="testimonials-card">
            <div className="testi-left">
              <h2>Trusted by Thousands<br/>Around the World</h2>
              <div className="happy-users">
                <div className="avatar-stack">
                  <div className="avatar-item" style={{background: 'linear-gradient(135deg,#f97316,#eab308)'}}>S</div>
                  <div className="avatar-item" style={{background: 'linear-gradient(135deg,#22c55e,#06b6d4)'}}>J</div>
                  <div className="avatar-item" style={{background: 'linear-gradient(135deg,#3b4fd4,#7c3aed)'}}>M</div>
                  <div className="avatar-item" style={{background: 'linear-gradient(135deg,#ec4899,#a855f7)'}}>A</div>
                  <div className="avatar-item" style={{background: 'linear-gradient(135deg,#0d1b3e,#3b4fd4)'}}>R</div>
                </div>
                <div>
                  <div className="happy-meta">2,300+ Happy Users</div>
                  <div className="stars">★★★★★</div>
                </div>
              </div>
            </div>
            <div className="testi-right">
              <div className="testi-col">
                <div className="quote-mark">"</div>
                <p>Limitless has completely changed the way I understand my brain and performance.</p>
                <div className="testi-author">
                  <div>
                    <div className="testi-name">Sarah M.</div>
                    <div className="testi-loc">Miami, FL</div>
                  </div>
                  <div className="testi-avatar" style={{background: 'linear-gradient(135deg,#f97316,#eab308)'}}>S</div>
                </div>
              </div>
              <div className="testi-col">
                <div className="quote-mark">"</div>
                <p>The personalized insights helped me improve focus and reduce stress.</p>
                <div className="testi-author">
                  <div>
                    <div className="testi-name">James T.</div>
                    <div className="testi-loc">Austin, TX</div>
                  </div>
                  <div className="testi-avatar" style={{background: 'linear-gradient(135deg,#22c55e,#06b6d4)'}}>J</div>
                </div>
              </div>
              <div className="testi-col">
                <div className="quote-mark">"</div>
                <p>As a student, this platform has helped me stay focused and perform better.</p>
                <div className="testi-author">
                  <div>
                    <div className="testi-name">Michael R.</div>
                    <div className="testi-loc">Denver, CO</div>
                  </div>
                  <div className="testi-avatar" style={{background: 'linear-gradient(135deg,#3b4fd4,#7c3aed)'}}>M</div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* ═══════════ CTA BANNER ═══════════ */}
        <section className="cta-banner">
          <div className="cta-left">
            <div className="cta-brain">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <radialGradient id="brainGlow2" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity="0"/>
                  </radialGradient>
                </defs>
                <circle cx="50" cy="50" r="48" fill="url(#brainGlow2)"/>
                <path d="M50 82 C38 82 25 73 23 60 C21 48 30 39 38 37 C34 30 36 20 44 17 C48 15 53 16 56 19 C58 12 66 6 74 8 C80 10 83 16 82 22 C88 18 97 19 100 26 C104 34 100 44 94 47 C100 51 103 60 99 67 C96 74 88 78 82 76 C80 82 74 86 68 85 C62 87 55 87 50 82Z"
                      fill="none" stroke="#7c3aed" strokeWidth="2" transform="scale(0.72) translate(14,10)"/>
                <line x1="30" y1="35" x2="45" y2="50" stroke="#7c3aed" strokeWidth="0.8" opacity="0.6"/>
                <line x1="45" y1="50" x2="55" y2="40" stroke="#a855f7" strokeWidth="0.8" opacity="0.6"/>
                <line x1="55" y1="40" x2="70" y2="48" stroke="#7c3aed" strokeWidth="0.8" opacity="0.6"/>
                <line x1="70" y1="48" x2="60" y2="62" stroke="#a855f7" strokeWidth="0.8" opacity="0.6"/>
                <line x1="60" y1="62" x2="45" y2="65" stroke="#7c3aed" strokeWidth="0.8" opacity="0.6"/>
                <line x1="45" y1="65" x2="35" y2="55" stroke="#a855f7" strokeWidth="0.8" opacity="0.6"/>
                <line x1="50" y1="30" x2="50" y2="70" stroke="#7c3aed" strokeWidth="0.6" opacity="0.3"/>
                <circle cx="30" cy="35" r="3" fill="#7c3aed" opacity="0.7"/>
                <circle cx="45" cy="50" r="3.5" fill="#a855f7" opacity="0.8"/>
                <circle cx="55" cy="40" r="3" fill="#7c3aed" opacity="0.7"/>
                <circle cx="70" cy="48" r="3" fill="#a855f7" opacity="0.7"/>
                <circle cx="60" cy="62" r="3" fill="#7c3aed" opacity="0.7"/>
                <circle cx="45" cy="65" r="3" fill="#a855f7" opacity="0.7"/>
                <circle cx="35" cy="55" r="2.5" fill="#7c3aed" opacity="0.6"/>
                <circle cx="50" cy="50" r="5" fill="#7c3aed" opacity="0.5"/>
                <circle cx="50" cy="50" r="2.5" fill="#a855f7"/>
              </svg>
            </div>
            <div className="cta-text">
              <h2>Ready to Unlock Your Potential?</h2>
              <p>Create your account or sign in to get your personalized AI assessment and start your transformation today.</p>
            </div>
          </div>
          <div className="cta-buttons">
            <button className="btn-cta-solid" onClick={() => { setActiveTab('signup'); window.scrollTo({ top: 500, behavior: 'smooth' }); }}>Create Account</button>
            <button className="btn-cta-outline" onClick={() => { setActiveTab('signin'); window.scrollTo({ top: 500, behavior: 'smooth' }); }}>Sign In Now</button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default JoinUsPage;

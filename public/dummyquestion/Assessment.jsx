import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import './Assessment.css';

const API_BASE = '/api/v1';

const Assessment = () => {
  const navigate = useNavigate();

  // step: 'register' | 'loading_q' | 'questions' | 'loading_a'
  const [step, setStep] = useState('register');
  const [error, setError] = useState(null);

  // Registration info (kept in memory for questions step)
  const [registeredUser, setRegisteredUser] = useState(null); // { id, email, tempPassword, name, age, gender }

  // Form
  const [formData, setFormData] = useState({ name: '', email: '', age: '', gender: '' });

  // Questions
  const [assessmentId, setAssessmentId] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setStep('loading_q');

    try {
      const tempPassword = 'MJ@' + Math.floor(10000 + Math.random() * 90000);

      // 1. Sign up in Supabase Auth (do NOT log in yet — we sign in later after quiz)
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: tempPassword,
        options: { data: { name: formData.name } }
      });

      if (authError) throw authError;
      if (!authData.user) throw new Error('Registration failed. Please try again.');

      // If Supabase auto-logged them in (email confirm off), sign out immediately
      // We only want to log them in AFTER they complete the quiz
      if (authData.session) {
        await supabase.auth.signOut();
      }

      // 2. Insert profile row (using service role is not available on frontend,
      //    so we use anon insert which is allowed by our RLS policy)
      const { error: profileError } = await supabase.from('users').insert([{
        id: authData.user.id,
        name: formData.name,
        email: formData.email,
        age: parseInt(formData.age),
        gender: formData.gender,
        role: 'user',
        temp_password: tempPassword,
        requires_password_reset: true
      }]);

      if (profileError) {
        // If profile insert fails (e.g. duplicate), still proceed but note it
        console.warn('Profile insert warning:', profileError.message);
      }

      // 3. Store user info in memory for the quiz step
      setRegisteredUser({
        id: authData.user.id,
        email: formData.email,
        tempPassword,
        name: formData.name,
        age: parseInt(formData.age),
        gender: formData.gender,
      });

      // 4. Fetch questions
      await fetchQuestions({
        age: parseInt(formData.age),
        gender: formData.gender
      });

    } catch (err) {
      let msg = err.message || 'Registration failed.';
      if (msg.toLowerCase().includes('already registered') || msg.toLowerCase().includes('email') || msg.toLowerCase().includes('users_email_key')) {
        msg = 'An account with this email already exists. Please sign in.';
      } else if (msg.toLowerCase().includes('rate limit') || msg.toLowerCase().includes('security')) {
        msg = 'Too many attempts. Please wait a moment and try with a different email.';
      }
      setError(msg);
      setStep('register');
    }
  };

  const fetchQuestions = async ({ age, gender }) => {
    setStep('loading_q');
    try {
      let mappedGender = gender;
      if (mappedGender === 'non_binary') mappedGender = 'other';
      if (mappedGender === 'prefer_not_to_say') mappedGender = 'prefer-not-to-say';

      const res = await fetch(`${API_BASE}/generate-questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ age, gender: mappedGender, locale: 'en' })
      });

      if (!res.ok) throw new Error('Failed to generate questions. Please try again.');

      const data = await res.json();
      setAssessmentId(data.assessmentId);

      const flat = [];
      if (data.sections) {
        data.sections.forEach(section => {
          (section.items || []).forEach(item => {
            flat.push({ ...item, domain: section.title });
          });
        });
      }

      setQuestions(flat);
      setStep('questions');
    } catch (err) {
      setError(err.message);
      setStep('register');
    }
  };

  const submitAnalysis = async () => {
    setError(null);
    setStep('loading_a');

    try {
      const formattedResponses = Object.keys(responses).map(key => ({
        itemId: key,
        value: responses[key]
      }));

      let mappedGender = registeredUser.gender;
      if (mappedGender === 'non_binary') mappedGender = 'other';
      if (mappedGender === 'prefer_not_to_say') mappedGender = 'prefer-not-to-say';

      // 1. Analyze
      const res = await fetch(`${API_BASE}/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assessmentId,
          age: registeredUser.age,
          gender: mappedGender,
          responses: formattedResponses
        })
      });

      if (!res.ok) throw new Error('Analysis failed. Please try again.');
      const analysisData = await res.json();

      // 2. Generate PDF
      const pdfRes = await fetch(`${API_BASE}/generate-pdf`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          analysis: analysisData,
          brand: {
            primaryColor: '#d4143a',
            accentColor: '#222222',
            footerNote: 'Dr. Meenakshi Jain - Nutrition & Wellness'
          }
        })
      });

      let pdfUrl = null;

      if (pdfRes.ok) {
        const blob = await pdfRes.blob();

        // 3. Log in the user NOW so we can upload to storage
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
          email: registeredUser.email,
          password: registeredUser.tempPassword
        });

        if (loginError) throw new Error('Login after assessment failed: ' + loginError.message);

        const userId = loginData.session.user.id;

        // 4. Upload PDF to Supabase Storage
        const fileName = `${userId}.pdf`;
        const { error: uploadError } = await supabase.storage
          .from('pdfs')
          .upload(fileName, blob, { contentType: 'application/pdf', upsert: true });

        if (uploadError) throw new Error('PDF upload failed: ' + uploadError.message);

        const { data: { publicUrl } } = supabase.storage.from('pdfs').getPublicUrl(fileName);
        pdfUrl = publicUrl;

        // 5. Save assessment data and PDF URL to the users table
        const { error: dbError } = await supabase.from('users').update({
          latest_assessment_data: analysisData,
          latest_pdf_base64: pdfUrl
        }).eq('id', userId);

        if (dbError) throw new Error('Database save failed: ' + dbError.message);

        // 6. Notify Navbar to update instantly
        window.dispatchEvent(new Event('authStatusChanged'));
      } else {
        // PDF generation failed — still log user in and save assessment without PDF
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email: registeredUser.email,
          password: registeredUser.tempPassword
        });
        if (!loginError) {
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            await supabase.from('users').update({
              latest_assessment_data: analysisData
            }).eq('id', session.user.id);
          }
          window.dispatchEvent(new Event('authStatusChanged'));
        }
      }

      // 7. Navigate to success page
      navigate('/registration-success', {
        state: {
          email: registeredUser.email,
          password: registeredUser.tempPassword,
          analysisData,
          user: { ...registeredUser, latest_pdf_base64: pdfUrl }
        }
      });

    } catch (err) {
      setError(err.message);
      setStep('questions');
    }
  };

  return (
    <div className="assessment-page">
      <div className="assessment__bg"></div>
      <div className="container assessment__inner">

        {/* STEP 1: Registration Form */}
        {step === 'register' && (
          <div className="assessment-card fade-in">
            <h1 className="assessment-title">Register for Assessment</h1>
            <p className="assessment-desc">Enter your details to get a personalized cognitive wellness report.</p>
            <form className="assessment-form" onSubmit={handleRegister}>
              <div className="form-group">
                <label>Full Name</label>
                <input required type="text" placeholder="John Doe" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input required type="email" placeholder="john@example.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Age (18–25)</label>
                  <input required type="number" min="18" max="25" placeholder="e.g. 22" value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select required value={formData.gender} onChange={e => setFormData({ ...formData, gender: e.target.value })}>
                    <option value="" disabled>Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="non_binary">Non-binary</option>
                    <option value="prefer_not_to_say">Prefer not to say</option>
                  </select>
                </div>
              </div>
              {error && (
                <div className="assessment-error" style={{ marginBottom: '16px' }}>{error}</div>
              )}
              <button type="submit" className="btn-primary w-100" style={{ marginTop: '4px' }}>
                Register & Start Assessment
              </button>
            </form>
          </div>
        )}

        {/* STEP 2: Loading Questions */}
        {step === 'loading_q' && (
          <div className="assessment-loading fade-in">
            <div className="spinner"></div>
            <h2>Preparing your assessment...</h2>
            <p>Please wait while we set up your personalized questions.</p>
          </div>
        )}

        {/* STEP 3: Questions */}
        {step === 'questions' && questions.length > 0 && (
          <div className="assessment-quiz fade-in" style={{ maxWidth: '800px', width: '100%' }}>
            <div className="quiz-header" style={{ marginBottom: '32px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#111', margin: 0 }}>Cognitive Assessment</h2>
              <p style={{ color: '#666', marginTop: '12px', fontSize: '16px' }}>Answer all questions to get your personalized report.</p>
            </div>

            {error && (
              <div style={{ marginBottom: '24px', padding: '16px', background: '#fef2f2', border: '1px solid #fecaca', color: '#b91c1c', borderRadius: '8px', fontWeight: '500' }}>
                {error}
              </div>
            )}

            <div className="quiz-list">
              {questions.map((q, idx) => (
                <div key={q.id} className="quiz-list-item" style={{ marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #eaeaea' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontWeight: 700, color: '#888', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Question {idx + 1}</span>
                    <span className="quiz-domain">{q.domain.replace(/_/g, ' ')}</span>
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#111', marginBottom: '24px', lineHeight: 1.4 }}>{q.text}</h3>
                  <div className="quiz-radio-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '12px' }}>
                    {[0, 1, 2, 3, 4].map((val) => (
                      <label key={val} style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
                        cursor: 'pointer', padding: '16px 8px', borderRadius: '12px',
                        border: responses[q.id] === val ? '2px solid var(--primary)' : '2px solid #f0f0f0',
                        background: responses[q.id] === val ? 'rgba(212,20,58,0.05)' : '#fafafa',
                        transition: 'all 0.2s ease',
                        boxShadow: responses[q.id] === val ? '0 4px 12px rgba(212,20,58,0.1)' : 'none'
                      }}>
                        <input
                          type="radio"
                          name={q.id}
                          value={val}
                          checked={responses[q.id] === val}
                          onChange={() => setResponses({ ...responses, [q.id]: val })}
                          style={{ margin: 0, width: '20px', height: '20px', accentColor: 'var(--primary)', cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '14px', textAlign: 'center', fontWeight: responses[q.id] === val ? 700 : 500, color: responses[q.id] === val ? 'var(--primary)' : '#666' }}>
                          {['Never', 'Rarely', 'Sometimes', 'Often', 'Always'][val]}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              className="btn-primary w-100"
              onClick={submitAnalysis}
              disabled={Object.keys(responses).length !== questions.length}
              style={{
                padding: '20px', fontSize: '18px', marginTop: '24px',
                opacity: Object.keys(responses).length !== questions.length ? 0.5 : 1,
                cursor: Object.keys(responses).length !== questions.length ? 'not-allowed' : 'pointer'
              }}
            >
              {Object.keys(responses).length !== questions.length
                ? `Answer all questions (${Object.keys(responses).length} of ${questions.length} done)`
                : 'Submit & Get My Report'}
            </button>
          </div>
        )}

        {/* STEP 4: Analyzing */}
        {step === 'loading_a' && (
          <div className="assessment-loading fade-in">
            <div className="spinner"></div>
            <h2>Analyzing your responses...</h2>
            <p>Generating your personalized cognitive wellness report. Please wait...</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Assessment;

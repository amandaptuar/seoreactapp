import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchWithRetry, getApiUrl } from '../lib/apiUtils';
import './Question.css';

const Question = () => {
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState('idle');
  const navigate = useNavigate();
  const userEmail = sessionStorage.getItem('userEmail');

  const [questionsData, setQuestionsData] = useState([]);

  React.useEffect(() => {
    const stored = sessionStorage.getItem('assessmentSections');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const flat = [];
        parsed.forEach(s => {
          (s.items || []).forEach(item => {
            flat.push({ ...item, domain: s.title });
          });
        });
        setQuestionsData(flat);
      } catch (e) {
        console.error("Error parsing sections", e);
      }
    }
  }, []);

  const totalQuestions = questionsData.length;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value, 10)
    }));
  };

  const calculateProgress = () => {
    const answered = Object.keys(formData).filter(key => key.startsWith('q') || key.startsWith('S')).length;
    if (totalQuestions === 0) return 0;
    return Math.round((answered / totalQuestions) * 100);
  };

  const calculateTotalScore = () => {
    let total = 0;
    Object.values(formData).forEach(val => {
      if (typeof val === 'number') total += val;
    });
    return total;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length < totalQuestions) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setStatus('submitting');
    
    const totalScore = calculateTotalScore();
    const finalData = { ...formData, totalScore };

    try {
      const apiResponses = Object.entries(formData).map(([key, value]) => ({
        itemId: key,
        value: value
      }));

      const assessmentId = sessionStorage.getItem('assessmentId');
      const age = parseInt(sessionStorage.getItem('userAge'), 10) || 22;
      let gender = sessionStorage.getItem('userGender') || 'prefer-not-to-say';
      if (gender === 'prefer_not_to_say') gender = 'prefer-not-to-say';

      // Passing userId makes the backend save the report as an assessment
      // record automatically — no separate DB call needed.
      const userId = sessionStorage.getItem('userId');

      const analyzeResponse = await fetchWithRetry(getApiUrl('/api/v1/analyze'), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assessmentId: assessmentId || "fallback-id",
          age: age,
          gender: gender,
          responses: apiResponses,
          userId: userId || undefined
        })
      });

      const analysisResult = await analyzeResponse.json();
      sessionStorage.setItem('analysisReport', JSON.stringify(analysisResult));

      // Always navigate directly to dashboard after assessment
      navigate('/dashboard');
      window.scrollTo(0, 0);

    } catch (err) {
      console.error(err);
      setStatus('idle');
      alert("Error submitting assessment: " + err.message);
    }
  };

  return (
    <div className="assessment-page">
      <div className="assessment__bg"></div>
      <div className="container assessment__inner">
          <div className="assessment-quiz fade-in" style={{ maxWidth: '800px', width: '100%' }}>
            <div className="quiz-header" style={{ marginBottom: '32px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#111', margin: 0 }}>Cognitive Assessment</h2>
              <p style={{ color: '#666', marginTop: '12px', fontSize: '16px' }}>Answer all questions to get your personalized report.</p>
            </div>

            <div className="quiz-list">
              {questionsData.map((q, idx) => (
                <div key={q.id} className="quiz-list-item" style={{ marginBottom: '40px', paddingBottom: '32px', borderBottom: '1px solid #eaeaea' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <span style={{ fontWeight: 700, color: '#888', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>Question {idx + 1}</span>
                    <span className="quiz-domain">{q.domain ? q.domain.replace(/_/g, ' ') : ''}</span>
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 600, color: '#111', marginBottom: '24px', lineHeight: 1.4 }}>{q.text}</h3>
                  <div className="quiz-radio-group" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '12px' }}>
                    {[0, 1, 2, 3, 4].map((val) => (
                      <label key={val} style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px',
                        cursor: 'pointer', padding: '16px 8px', borderRadius: '12px',
                        border: formData[q.id] === val ? '2px solid var(--primary)' : '2px solid #f0f0f0',
                        background: formData[q.id] === val ? 'rgba(212,20,58,0.05)' : '#fafafa',
                        transition: 'all 0.2s ease',
                        boxShadow: formData[q.id] === val ? '0 4px 12px rgba(212,20,58,0.1)' : 'none'
                      }}>
                        <input
                          type="radio"
                          name={q.id}
                          value={val}
                          checked={formData[q.id] === val}
                          onChange={handleChange}
                          style={{ margin: 0, width: '20px', height: '20px', accentColor: 'var(--primary)', cursor: 'pointer' }}
                        />
                        <span style={{ fontSize: '14px', textAlign: 'center', fontWeight: formData[q.id] === val ? 700 : 500, color: formData[q.id] === val ? 'var(--primary)' : '#666' }}>
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
              onClick={handleSubmit}
              disabled={Object.keys(formData).length < totalQuestions || status === 'submitting'}
              style={{
                padding: '20px', fontSize: '18px', marginTop: '24px',
                opacity: Object.keys(formData).length < totalQuestions ? 0.5 : 1,
                cursor: Object.keys(formData).length < totalQuestions ? 'not-allowed' : 'pointer'
              }}
            >
              {status === 'submitting' ? 'Submitting Assessment...' : Object.keys(formData).length < totalQuestions
                ? `Answer all questions (${Object.keys(formData).length} of ${totalQuestions} done)`
                : 'Submit & Get My Report'}
            </button>
          </div>
      </div>
    </div>
  );
};

export default Question;

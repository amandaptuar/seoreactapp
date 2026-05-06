import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Question = () => {
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState('idle');
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');

  const questionsData = [
    {
      section: "Focus & Attention",
      questions: [
        { id: "q1_1", text: "I find it difficult to concentrate on tasks." },
        { id: "q1_2", text: "I get easily distracted while working or studying." },
        { id: "q1_3", text: "I struggle to complete tasks without losing focus." },
        { id: "q1_4", text: "I feel mentally “foggy” or unclear." }
      ]
    },
    {
      section: "Memory Function",
      questions: [
        { id: "q2_1", text: "I forget important tasks or appointments." },
        { id: "q2_2", text: "I have trouble recalling recent information." },
        { id: "q2_3", text: "I misplace items more often than usual." },
        { id: "q2_4", text: "I struggle to retain new information." }
      ]
    },
    {
      section: "Mental Clarity & Decision-Making",
      questions: [
        { id: "q3_1", text: "I find it hard to make decisions." },
        { id: "q3_2", text: "My thinking feels slow or unclear." },
        { id: "q3_3", text: "I feel overwhelmed when processing information." },
        { id: "q3_4", text: "I lack mental sharpness during daily activities." }
      ]
    },
    {
      section: "Emotional Well-being",
      questions: [
        { id: "q4_1", text: "I feel anxious or worried frequently." },
        { id: "q4_2", text: "I feel low, sad, or unmotivated." },
        { id: "q4_3", text: "I feel overwhelmed by daily responsibilities." },
        { id: "q4_4", text: "I have mood swings or emotional instability." }
      ]
    },
    {
      section: "Stress & Resilience",
      questions: [
        { id: "q5_1", text: "I feel stressed most of the time." },
        { id: "q5_2", text: "I struggle to relax or unwind." },
        { id: "q5_3", text: "I feel mentally exhausted." },
        { id: "q5_4", text: "I find it difficult to cope with challenges." }
      ]
    },
    {
      section: "Sleep & Recovery",
      questions: [
        { id: "q6_1", text: "I have trouble falling asleep." },
        { id: "q6_2", text: "I wake up feeling tired or unrested." },
        { id: "q6_3", text: "My sleep is interrupted or poor quality." },
        { id: "q6_4", text: "I feel fatigued during the day." }
      ]
    },
    {
      section: "Productivity & Performance",
      questions: [
        { id: "q7_1", text: "My productivity has decreased recently." },
        { id: "q7_2", text: "I struggle to stay motivated." },
        { id: "q7_3", text: "I find it hard to manage my time effectively." },
        { id: "q7_4", text: "I feel less efficient than usual." }
      ]
    }
  ];

  const totalQuestions = questionsData.reduce((acc, sec) => acc + sec.questions.length, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseInt(value, 10)
    }));
  };

  const calculateProgress = () => {
    const answered = Object.keys(formData).filter(key => key.startsWith('q')).length;
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
      // 1. Update user data in Supabase
      const { error } = await supabase
        .from('users')
        .update({ questions: finalData }) // Do not set payment_status here
        .eq('email', userEmail);
      
      if (error) {
        throw new Error(error.message || 'Failed to submit audit');
      }

      // Navigate to payment page to complete the flow
      navigate('/payment');
      window.scrollTo(0, 0);

    } catch (err) {
      console.error(err);
      setStatus('idle');
      alert("Error submitting assessment: " + err.message);
    }
  };

  return (
    <section style={styles.section} className="question-section">
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '6px', background: '#1e293b', zIndex: 9999 }}>
        <div style={{ width: `${calculateProgress()}%`, height: '100%', background: 'linear-gradient(90deg, #F59E0B, #10B981)', transition: 'width 0.4s ease' }}></div>
      </div>
      {/* Decorative background blobs */}
      <div style={{ position: 'absolute', top: '10%', left: '-100px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '800px', height: '800px', background: 'radial-gradient(circle, rgba(15,23,42,0.0) 0%, rgba(245,158,11,0.04) 100%)', borderRadius: '50%', pointerEvents: 'none' }} />
      
      <div className="container" style={styles.container}>
        <div className="question-form-panel" style={styles.formPanel}>
          <h2 style={styles.headerTitle} className="slide-up">Cognitive Health Assessment</h2>
          <p style={styles.headerSubtitle} className="slide-up delay-100">
            Please answer each question based on how you’ve felt over the past 2 weeks.
          </p>

          <div style={styles.legendBlock} className="slide-up delay-100">
            <h4 style={{ color: '#fff', marginBottom: '10px' }}>Scale:</h4>
            <ul style={styles.legendList}>
              <li><strong>0</strong> = Not at all</li>
              <li><strong>1</strong> = Rarely (1–2 days)</li>
              <li><strong>2</strong> = Sometimes (3–5 days)</li>
              <li><strong>3</strong> = Often (6–10 days)</li>
              <li><strong>4</strong> = Almost Always (11–14 days)</li>
            </ul>
          </div>

          <form onSubmit={handleSubmit} style={styles.form} className="slide-up delay-200">
            {questionsData.map((section, idx) => (
              <div key={idx} style={styles.sectionBlock}>
                <h3 style={styles.sectionHeader}>🔹 Section {idx + 1}: {section.section}</h3>
                
                <div style={styles.questionsContainer}>
                  {section.questions.map((q) => (
                    <div key={q.id} style={styles.questionItem}>
                      <p style={styles.questionText}>{q.text}</p>
                      <div style={styles.radioGroup}>
                        {[0, 1, 2, 3, 4].map((val) => {
                          const isSelected = formData[q.id] === val;
                          return (
                            <label 
                              key={val} 
                              style={{
                                ...styles.radioLabel,
                                ...(isSelected ? styles.radioLabelSelected : {})
                              }}
                            >
                              <input 
                                type="radio" 
                                name={q.id} 
                                value={val} 
                                required 
                                onChange={handleChange}
                                style={{ display: 'none' }}
                              />
                              <span>{val}</span>
                            </label>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            <button 
              type="submit" 
              className="btn btn-primary support-submit"
              disabled={status === 'submitting'}
              style={{ padding: '16px', fontSize: '18px', marginTop: '20px', opacity: status === 'submitting' ? 0.7 : 1 }}
            >
              {status === 'submitting' ? 'Submitting Assessment...' : 'Submit Assessment & Continue'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const styles = {
  section: {
    paddingTop: '140px',
    paddingBottom: '80px',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #020617 0%, #0F172A 40%, #1e1b4b 70%, #0F172A 100%)'
  },
  container: {
    maxWidth: '900px',
    width: '100%',
    padding: '0 15px',
    position: 'relative',
    zIndex: 1
  },
  formPanel: {
    background: 'rgba(255,255,255,0.04)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '24px',
    padding: '48px 40px',
    boxShadow: '0 25px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)'
  },
  headerTitle: {
    fontSize: 'clamp(24px, 5vw, 36px)',
    color: '#fff',
    marginBottom: '10px',
    textAlign: 'center',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #fff 0%, #F59E0B 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  headerSubtitle: {
    fontSize: 'clamp(15px, 3vw, 18px)',
    color: '#94A3B8',
    textAlign: 'center',
    marginBottom: '30px'
  },
  legendBlock: {
    background: 'rgba(255, 255, 255, 0.05)',
    padding: '20px',
    borderRadius: '12px',
    marginBottom: '40px',
    border: '1px solid rgba(255,255,255,0.1)'
  },
  legendList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
    color: '#CBD5E1',
    fontSize: '14px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px'
  },
  sectionBlock: {
    padding: '28px',
    background: 'rgba(255, 255, 255, 0.03)',
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.07)',
    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.04)'
  },
  sectionHeader: {
    color: '#F59E0B',
    fontSize: '18px',
    fontWeight: '700',
    marginBottom: '20px',
    borderBottom: '1px solid rgba(245, 158, 11, 0.2)',
    paddingBottom: '12px',
    letterSpacing: '0.3px'
  },
  questionsContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  questionItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  questionText: {
    color: '#fff',
    fontSize: '16px',
    margin: 0
  },
  radioGroup: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
    marginTop: '5px'
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45px',
    height: '45px',
    borderRadius: '12px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    cursor: 'pointer',
    color: '#94A3B8',
    transition: 'all 0.2s ease',
    fontSize: '16px',
    fontWeight: '700'
  },
  radioLabelSelected: {
    background: 'linear-gradient(135deg, #F59E0B, #FB923C)',
    color: '#fff',
    borderColor: '#F59E0B',
    boxShadow: '0 4px 15px rgba(245, 158, 11, 0.4)',
    transform: 'scale(1.05)'
  }
};

export default Question;

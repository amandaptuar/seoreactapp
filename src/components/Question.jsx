import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Question = () => {
  const [formData, setFormData] = useState({});
  const [status, setStatus] = useState('idle');
  const navigate = useNavigate();
  const userEmail = localStorage.getItem('userEmail');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const calculateProgress = () => {
    const keyFields = ['name', 'primary_goal', 'sleep_times', 'meals_per_day', 'exercises', 'diagnosed_conditions', 'sleep_quality', 'fatigue', 'smoking_alcohol', 'is_ready'];
    let filled = 0;
    keyFields.forEach(field => {
      if (formData[field] && formData[field].toString().trim() !== '') {
        filled++;
      }
    });
    return Math.round((filled / keyFields.length) * 100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const { error } = await supabase
        .from('users')
        .update({ questions: formData })
        .eq('email', userEmail);
      
      if (error) {
        throw new Error(error.message || 'Failed to submit audit');
      }

      navigate('/payment');
      window.scrollTo(0, 0);
    } catch (err) {
      console.error(err);
      setStatus('idle');
      alert("Error submitting assessment: " + err.message);
    }
  };

  if (status === 'success') {
    return (
      <section style={styles.section} className="question-section">
        <div className="container" style={styles.container}>
          <div className="dark-glass-panel question-form-panel" style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div className="support-success-icon" style={{margin: '0 auto 20px'}}>✓</div>
            <h2 style={{color: 'var(--white)', fontSize: '32px', marginBottom: '16px'}}>Assessment Submitted!</h2>
            <p style={{color: '#ccc', fontSize: '18px'}}>
              Thank you for providing your details. Our AI and expert team will analyze your profile and craft the perfect protocol for you.
            </p>
          </div>
        </div>
      </section>
    );
  }

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
          <h2 style={styles.headerTitle} className="slide-up">Comprehensive Cognitive & Health Audit</h2>
          <p style={styles.headerSubtitle} className="slide-up delay-100">
            Please fill out this detailed assessment. The more accurate your answers, the better we can tailor your limitless protocol.
          </p>

          <form onSubmit={handleSubmit} style={styles.form} className="slide-up delay-200">
            
            {/* SECTION 1 */}
            <div style={styles.sectionBlock}>
              <h3 style={styles.sectionHeader}>🔹 1. Basic Information</h3>
              <div className="question-grid">
                <div className="support-field">
                  <label>Name</label>
                  <input type="text" name="name" required onChange={handleChange} />
                </div>
                <div className="support-field">
                  <label>Age</label>
                  <input type="number" name="age" required onChange={handleChange} />
                </div>
                <div className="support-field">
                  <label>Gender</label>
                  <select name="gender" required onChange={handleChange} className="country-code-select" style={{width: '100%'}}>
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="support-field">
                  <label>Height</label>
                  <input type="text" name="height" placeholder="e.g., 5'10&quot; or 178cm" required onChange={handleChange} />
                </div>
                <div className="support-field">
                  <label>Current Weight</label>
                  <input type="text" name="weight" placeholder="e.g., 75 kg or 165 lbs" required onChange={handleChange} />
                </div>
                <div className="support-field">
                  <label>Occupation Type</label>
                  <select name="occupation_type" required onChange={handleChange} className="country-code-select" style={{width: '100%'}}>
                    <option value="">Select Occupation</option>
                    <option value="sitting">Sitting / Desk Job</option>
                    <option value="active">Active Job</option>
                  </select>
                </div>
                <div className="support-field">
                  <label>City / Lifestyle</label>
                  <select name="lifestyle" required onChange={handleChange} className="country-code-select" style={{width: '100%'}}>
                    <option value="">Select Lifestyle</option>
                    <option value="urban">Urban</option>
                    <option value="rural">Rural</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION 2 */}
            <div style={styles.sectionBlock}>
              <h3 style={styles.sectionHeader}>🔹 2. Goal Identification</h3>
              <div className="question-grid">
                <div className="support-field" style={{gridColumn: '1 / -1'}}>
                  <label>What is your primary goal?</label>
                  <select name="primary_goal" required onChange={handleChange} className="country-code-select" style={{width: '100%'}}>
                    <option value="">Select Primary Goal</option>
                    <option value="Weight loss">Weight loss</option>
                    <option value="Weight gain">Weight gain</option>
                    <option value="Inch loss">Inch loss</option>
                    <option value="Energy boost">Energy boost</option>
                    <option value="Medical improvement">Medical improvement</option>
                  </select>
                </div>
                <div className="support-field">
                  <label>Target weight or transformation goal</label>
                  <input type="text" name="target_goal" required onChange={handleChange} />
                </div>
                <div className="support-field">
                  <label>Timeline (how soon do you want results?)</label>
                  <input type="text" name="timeline" placeholder="e.g. 3 months" required onChange={handleChange} />
                </div>
                <div className="support-field" style={{gridColumn: '1 / -1'}}>
                  <label>Past attempts (what worked / failed?)</label>
                  <textarea name="past_attempts" rows="2" required onChange={handleChange}></textarea>
                </div>
              </div>
            </div>

            {/* SECTION 3 */}
            <div style={styles.sectionBlock}>
              <h3 style={styles.sectionHeader}>🔹 3. Daily Routine Analysis</h3>
              <div className="question-grid">
                <div className="support-field">
                  <label>Wake-up time / sleep time</label>
                  <input type="text" name="sleep_times" placeholder="e.g. 7 AM to 11 PM" required onChange={handleChange} />
                </div>
                <div className="support-field">
                  <label>Working hours</label>
                  <input type="text" name="working_hours" placeholder="e.g. 9 AM to 6 PM" required onChange={handleChange} />
                </div>
                <div className="support-field">
                  <label>Physical activity level</label>
                  <select name="physical_activity" required onChange={handleChange} className="country-code-select" style={{width: '100%'}}>
                    <option value="">Select Level</option>
                    <option value="low">Low</option>
                    <option value="moderate">Moderate</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="support-field">
                  <label>Screen time (approx hours/day)</label>
                  <input type="number" name="screen_time" placeholder="e.g. 8" required onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* SECTION 4 */}
            <div style={styles.sectionBlock}>
              <h3 style={styles.sectionHeader}>🔹 4. Nutrition & Eating Habits</h3>
              <div className="question-grid">
                <div className="support-field">
                  <label>Number of meals per day</label>
                  <input type="number" name="meals_per_day" required onChange={handleChange} />
                </div>
                <div className="support-field">
                  <label>Outside food frequency</label>
                  <input type="text" name="outside_food" placeholder="e.g. 2 times a week" required onChange={handleChange} />
                </div>
                <div className="support-field" style={{gridColumn: '1 / -1'}}>
                  <label>Typical daily diet (breakfast, lunch, dinner, snacks)</label>
                  <textarea name="daily_diet" rows="2" required onChange={handleChange}></textarea>
                </div>
                <div className="support-field">
                  <label>Water intake (liters/day)</label>
                  <input type="number" step="0.1" name="water_intake" required onChange={handleChange} />
                </div>
                <div className="support-field">
                  <label>Tea/coffee/sugar intake</label>
                  <input type="text" name="caffeine_sugar" placeholder="e.g. 2 cups coffee, high sugar" required onChange={handleChange} />
                </div>
                <div className="support-field">
                  <label>Late-night eating habits</label>
                  <select name="latenight_eating" required onChange={handleChange} className="country-code-select" style={{width: '100%'}}>
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION 5 */}
            <div style={styles.sectionBlock}>
              <h3 style={styles.sectionHeader}>🔹 5. Physical Activity & Fitness</h3>
              <div className="question-grid">
                <div className="support-field">
                  <label>Do you exercise?</label>
                  <select name="exercises" required onChange={handleChange} className="country-code-select" style={{width: '100%'}}>
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="support-field">
                  <label>Type</label>
                  <input type="text" name="exercise_type" placeholder="walking, gym, yoga, none" required onChange={handleChange} />
                </div>
                <div className="support-field">
                  <label>Frequency (days/week)</label>
                  <input type="number" name="exercise_frequency" placeholder="e.g. 3" required onChange={handleChange} />
                </div>
                <div className="support-field">
                  <label>Any physical limitations or injuries</label>
                  <input type="text" name="injuries" placeholder="Leave blank if none" onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* SECTION 6 */}
            <div style={styles.sectionBlock}>
              <h3 style={styles.sectionHeader}>🔹 6. Medical & Health Conditions</h3>
              <div className="question-grid">
                <div className="support-field" style={{gridColumn: '1 / -1'}}>
                  <label>Any diagnosed conditions (diabetes, thyroid, BP, etc.)</label>
                  <input type="text" name="diagnosed_conditions" placeholder="Leave blank if none" onChange={handleChange} />
                </div>
                <div className="support-field">
                  <label>Medications currently taking</label>
                  <input type="text" name="medications" placeholder="Leave blank if none" onChange={handleChange} />
                </div>
                <div className="support-field">
                  <label>Family medical history</label>
                  <input type="text" name="family_history" placeholder="Leave blank if none" onChange={handleChange} />
                </div>
                <div className="support-field" style={{gridColumn: '1 / -1'}}>
                  <label>Digestive issues (acidity, constipation, bloating)</label>
                  <input type="text" name="digestive_issues" placeholder="Leave blank if none" onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* SECTION 7 */}
            <div style={styles.sectionBlock}>
              <h3 style={styles.sectionHeader}>🔹 7. Sleep & Stress Analysis</h3>
              <div className="question-grid">
                <div className="support-field">
                  <label>Sleep quality</label>
                  <select name="sleep_quality" required onChange={handleChange} className="country-code-select" style={{width: '100%'}}>
                    <option value="">Select Quality</option>
                    <option value="good">Good</option>
                    <option value="average">Average</option>
                    <option value="poor">Poor</option>
                  </select>
                </div>
                <div className="support-field">
                  <label>Sleep duration (hours)</label>
                  <input type="number" name="sleep_duration" required onChange={handleChange} />
                </div>
                <div className="support-field">
                  <label>Stress level</label>
                  <select name="stress_level" required onChange={handleChange} className="country-code-select" style={{width: '100%'}}>
                    <option value="">Select Stress Level</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div className="support-field">
                  <label>Main stress reasons</label>
                  <input type="text" name="stress_reasons" placeholder="work, family, health" required onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* SECTION 8 */}
            <div style={styles.sectionBlock}>
              <h3 style={styles.sectionHeader}>🔹 8. Body Symptoms</h3>
              <div className="question-grid">
                <div className="support-field">
                  <label>Fatigue / low energy</label>
                  <select name="fatigue" required onChange={handleChange} className="country-code-select" style={{width: '100%'}}>
                    <option value="">Select Level</option>
                    <option value="None">None</option>
                    <option value="Sometimes">Sometimes</option>
                    <option value="Often">Often</option>
                  </select>
                </div>
                <div className="support-field">
                  <label>Hair fall / skin issues</label>
                  <input type="text" name="skin_hair_issues" placeholder="Specify if any" onChange={handleChange} />
                </div>
                <div className="support-field">
                  <label>Cravings (sweet/salty)</label>
                  <input type="text" name="cravings" placeholder="Specify if any" onChange={handleChange} />
                </div>
                <div className="support-field">
                  <label>Mood swings</label>
                  <select name="mood_swings" required onChange={handleChange} className="country-code-select" style={{width: '100%'}}>
                    <option value="">Select Frequency</option>
                    <option value="Rarely">Rarely</option>
                    <option value="Sometimes">Sometimes</option>
                    <option value="Frequently">Frequently</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECTION 9 */}
            <div style={styles.sectionBlock}>
              <h3 style={styles.sectionHeader}>🔹 9. Lifestyle Habits</h3>
              <div className="question-grid">
                <div className="support-field">
                  <label>Smoking / alcohol (if any)</label>
                  <input type="text" name="smoking_alcohol" placeholder="Specify frequency" onChange={handleChange} />
                </div>
                <div className="support-field">
                  <label>Water intake</label>
                  <input type="text" name="water_assessment" placeholder="e.g. adequate or poor" onChange={handleChange} />
                </div>
                <div className="support-field">
                  <label>Daily movement (steps approx)</label>
                  <input type="number" name="steps" placeholder="e.g. 5000" onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* SECTION 10 */}
            <div style={styles.sectionBlock}>
              <h3 style={styles.sectionHeader}>🔹 10. Commitment & Readiness</h3>
              <div className="question-grid">
                <div className="support-field">
                  <label>Are you ready to follow a plan?</label>
                  <select name="is_ready" required onChange={handleChange} className="country-code-select" style={{width: '100%'}}>
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="support-field">
                  <label>Can you give 30–60 minutes daily for your health?</label>
                  <select name="time_commitment" required onChange={handleChange} className="country-code-select" style={{width: '100%'}}>
                    <option value="">Select</option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="support-field" style={{gridColumn: '1 / -1'}}>
                  <label>Support system (family support or not)</label>
                  <input type="text" name="support_system" placeholder="Describe your support system" required onChange={handleChange} />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="btn btn-primary support-submit"
              disabled={status === 'submitting'}
              style={{ padding: '16px', fontSize: '18px', marginTop: '20px', opacity: status === 'submitting' ? 0.7 : 1 }}
            >
              {status === 'submitting' ? 'Submitting Assessment...' : 'Submit Audit & Complete Registration'}
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
    marginBottom: '40px'
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
  }
};

export default Question;

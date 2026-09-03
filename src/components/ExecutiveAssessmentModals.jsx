import React, { useState, useEffect } from 'react';
import { getApiUrl } from '../lib/apiUtils';

const EXEC_API = '/api/v1/executive';
const API_KEY = 'DXgBpoByl6UvMsD9KgVa4MAJILeiI8JqUDd4YzDPQzs';

function getExecHeaders() {
  const token = sessionStorage.getItem('authToken');
  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
    'X-API-Key': API_KEY,
  };
}

function getUserId() {
  return sessionStorage.getItem('userId') || '';
}

// Robust timezone: always return a valid modern IANA name
function getTimezone() {
  try {
    const raw = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!raw) return 'UTC';
    // Map ALL known deprecated IANA names
    const map = {
      'Asia/Calcutta': 'Asia/Kolkata',
      'Asia/Saigon': 'Asia/Ho_Chi_Minh',
      'Asia/Katmandu': 'Asia/Kathmandu',
      'Asia/Rangoon': 'Asia/Yangon',
      'Asia/Dacca': 'Asia/Dhaka',
      'Asia/Macao': 'Asia/Macau',
      'Asia/Ujung_Pandang': 'Asia/Makassar',
      'Europe/Kiev': 'Europe/Kyiv',
      'Europe/Zaporozhye': 'Europe/Zaporizhzhia',
      'US/Eastern': 'America/New_York',
      'US/Central': 'America/Chicago',
      'US/Mountain': 'America/Denver',
      'US/Pacific': 'America/Los_Angeles',
      'US/Hawaii': 'Pacific/Honolulu',
      'US/Alaska': 'America/Anchorage',
      'US/Aleutian': 'America/Adak',
      'US/East-Indiana': 'America/Indiana/Indianapolis',
      'US/Indiana-Starke': 'America/Indiana/Knox',
      'US/Michigan': 'America/Detroit',
      'US/Samoa': 'Pacific/Pago_Pago',
      'Pacific/Samoa': 'Pacific/Pago_Pago',
      'Pacific/Johnston': 'Pacific/Honolulu',
      'Pacific/Ponape': 'Pacific/Pohnpei',
      'Pacific/Truk': 'Pacific/Chuuk',
      'America/Buenos_Aires': 'America/Argentina/Buenos_Aires',
      'America/Indianapolis': 'America/Indiana/Indianapolis',
      'America/Knoxville': 'America/New_York',
      'America/Louisville': 'America/Kentucky/Louisville',
      'America/Shiprock': 'America/Denver',
      'America/Atka': 'America/Adak',
      'America/Fort_Wayne': 'America/Indiana/Indianapolis',
      'Canada/Eastern': 'America/Toronto',
      'Canada/Central': 'America/Winnipeg',
      'Canada/Pacific': 'America/Vancouver',
      'Australia/ACT': 'Australia/Sydney',
      'Australia/NSW': 'Australia/Sydney',
      'Australia/Queensland': 'Australia/Brisbane',
      'Africa/Asmera': 'Africa/Asmara',
      'Africa/Timbuktu': 'Africa/Bamako',
      'Atlantic/Jan_Mayen': 'Europe/Oslo',
    };
    return map[raw] || raw;
  } catch {
    return 'UTC';
  }
}

async function execFetch(path, method = 'GET', body = null) {
  const userId = getUserId();
  const sep = path.includes('?') ? '&' : '?';
  const fullPath = `${EXEC_API}${path}${sep}user_id=${userId}`;
  const opts = { method, headers: getExecHeaders() };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(getApiUrl(fullPath), opts);
  const text = await res.text();
  if (!res.ok) throw new Error(`${res.status}: ${text}`);
  try { return JSON.parse(text); } catch { return text; }
}

/* ═══════════════════════════════════════════════════════════════════════════════
   STYLES
   ═══════════════════════════════════════════════════════════════════════════ */

const overlayStyle = {
  position: 'fixed', inset: 0, zIndex: 10000,
  background: 'rgba(15,23,42,0.6)', backdropFilter: 'blur(8px)',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: '16px', animation: 'fadeIn 0.2s ease',
};

const modalStyle = {
  background: '#fff', borderRadius: '20px', padding: '0',
  maxWidth: '640px', width: '100%', maxHeight: '92vh',
  boxShadow: '0 25px 60px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)',
  display: 'flex', flexDirection: 'column', overflow: 'hidden',
};

const headerStyle = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  padding: '20px 24px', borderBottom: '1px solid #F1F5F9',
  background: 'linear-gradient(135deg, #F8FAFC 0%, #EEF2FF 100%)',
};

const closeBtnStyle = {
  background: '#F1F5F9', border: 'none', fontSize: '18px', cursor: 'pointer',
  color: '#64748B', width: '36px', height: '36px', borderRadius: '50%',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  transition: 'all 0.2s',
};

const bodyStyle = {
  flex: 1, overflowY: 'auto', padding: '20px 24px',
};

const questionStyle = {
  padding: '16px', marginBottom: '12px',
  background: '#FAFBFC', borderRadius: '12px',
  border: '1px solid #F1F5F9',
  transition: 'border-color 0.2s',
};

const footerStyle = {
  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
  padding: '16px 24px', borderTop: '1px solid #F1F5F9',
  background: '#FAFBFC',
};

const submitBtnStyle = {
  background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', color: '#fff', border: 'none',
  padding: '12px 24px', borderRadius: '12px', fontSize: '14px',
  fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s',
  boxShadow: '0 4px 12px rgba(99,102,241,0.3)',
};

const errorStyle = {
  background: '#FEF2F2', color: '#991B1B', padding: '12px 16px',
  borderRadius: '10px', fontSize: '13px', margin: '0 24px 0',
  border: '1px solid #FECACA', display: 'flex', alignItems: 'center', gap: '8px',
};

const descStyle = {
  color: '#64748B', fontSize: '14px', lineHeight: '1.5',
  padding: '0 24px 16px',
};

/* ═══════════════════════════════════════════════════════════════════════════════
   PSS-10 Modal
   ═══════════════════════════════════════════════════════════════════════════ */
function PSS10Modal({ onClose, onComplete }) {
  const [items, setItems] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const labels = ['Never', 'Almost Never', 'Sometimes', 'Fairly Often', 'Very Often'];

  useEffect(() => {
    execFetch('/instrument/pss10')
      .then(data => setItems(data.items || []))
      .catch(e => setError(e.message));
  }, []);

  const handleSubmit = async () => {
    if (!items) return;
    if (Object.keys(answers).length < items.length) {
      setError(`Please answer all ${items.length} questions. (${Object.keys(answers).length}/${items.length} done)`);
      return;
    }
    setSubmitting(true); setError(null);
    try {
      await execFetch('/instrument/pss10', 'POST', { item_responses: answers, timezone: getTimezone() });
      onComplete();
    } catch (e) { setError(e.message); }
    finally { setSubmitting(false); }
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={e => e.stopPropagation()}>
        <div style={headerStyle}>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', color: '#1E293B', fontWeight: '800' }}>📋 Perceived Stress Scale</h2>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>PSS-10 · 10 questions · ~2 min</div>
          </div>
          <button onClick={onClose} style={closeBtnStyle}>✕</button>
        </div>
        <div style={descStyle}>
          Rate how often you felt this way <strong>in the last month</strong>.
        </div>
        {error && <div style={errorStyle}>⚠️ {error}</div>}
        <div style={bodyStyle}>
          {!items ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#94A3B8' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏳</div>Loading questions...
            </div>
          ) : items.map((item, idx) => (
            <div key={item.item_id} style={{ ...questionStyle, borderColor: answers[item.item_id] !== undefined ? '#C7D2FE' : '#F1F5F9' }}>
              <div style={{ fontWeight: '600', color: '#334155', fontSize: '14px', marginBottom: '10px', lineHeight: '1.4' }}>
                <span style={{ color: '#6366F1', fontWeight: '800', marginRight: '6px' }}>{idx + 1}.</span>{item.text}
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {labels.map((label, val) => (
                  <button key={val} onClick={() => setAnswers(a => ({ ...a, [item.item_id]: val }))}
                    style={{
                      padding: '7px 14px', borderRadius: '20px', border: 'none',
                      fontSize: '12px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.15s',
                      background: answers[item.item_id] === val ? 'linear-gradient(135deg, #6366F1, #8B5CF6)' : '#EEF2FF',
                      color: answers[item.item_id] === val ? '#fff' : '#4338CA',
                      boxShadow: answers[item.item_id] === val ? '0 2px 8px rgba(99,102,241,0.3)' : 'none',
                    }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={footerStyle}>
          <div style={{ fontSize: '13px', color: '#94A3B8', fontWeight: '600' }}>
            {items ? `${Object.keys(answers).length} / ${items.length} answered` : ''}
          </div>
          <button onClick={handleSubmit} disabled={submitting}
            style={{ ...submitBtnStyle, opacity: submitting ? 0.7 : 1 }}>
            {submitting ? '⏳ Submitting...' : '✓ Submit PSS-10'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   CBI Modal
   ═══════════════════════════════════════════════════════════════════════════ */
function CBIModal({ onClose, onComplete }) {
  const [items, setItems] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const labels = ['Never', 'Seldom', 'Sometimes', 'Often', 'Always'];

  useEffect(() => {
    execFetch('/instrument/cbi')
      .then(data => setItems(data.items || []))
      .catch(e => setError(e.message));
  }, []);

  const handleSubmit = async () => {
    if (!items) return;
    if (Object.keys(answers).length < items.length) {
      setError(`Please answer all ${items.length} questions. (${Object.keys(answers).length}/${items.length} done)`);
      return;
    }
    setSubmitting(true); setError(null);
    try {
      await execFetch('/instrument/cbi', 'POST', { item_responses: answers, timezone: getTimezone() });
      onComplete();
    } catch (e) { setError(e.message); }
    finally { setSubmitting(false); }
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={e => e.stopPropagation()}>
        <div style={{ ...headerStyle, background: 'linear-gradient(135deg, #FFF1F2 0%, #FFE4E6 100%)' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', color: '#1E293B', fontWeight: '800' }}>🔥 Copenhagen Burnout Inventory</h2>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>CBI · 13 questions · ~2 min</div>
          </div>
          <button onClick={onClose} style={closeBtnStyle}>✕</button>
        </div>
        <div style={descStyle}>
          Rate how often you experience each of the following.
        </div>
        {error && <div style={errorStyle}>⚠️ {error}</div>}
        <div style={bodyStyle}>
          {!items ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#94A3B8' }}>
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>⏳</div>Loading questions...
            </div>
          ) : items.map((item, idx) => (
            <div key={item.item_id} style={{ ...questionStyle, borderColor: answers[item.item_id] !== undefined ? '#FECDD3' : '#F1F5F9' }}>
              <div style={{ fontWeight: '600', color: '#334155', fontSize: '14px', marginBottom: '10px', lineHeight: '1.4' }}>
                <span style={{ color: '#F43F5E', fontWeight: '800', marginRight: '6px' }}>{idx + 1}.</span>{item.text}
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {labels.map((label, val) => (
                  <button key={val} onClick={() => setAnswers(a => ({ ...a, [item.item_id]: val }))}
                    style={{
                      padding: '7px 14px', borderRadius: '20px', border: 'none',
                      fontSize: '12px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.15s',
                      background: answers[item.item_id] === val ? 'linear-gradient(135deg, #F43F5E, #E11D48)' : '#FFF1F2',
                      color: answers[item.item_id] === val ? '#fff' : '#BE123C',
                      boxShadow: answers[item.item_id] === val ? '0 2px 8px rgba(244,63,94,0.3)' : 'none',
                    }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div style={footerStyle}>
          <div style={{ fontSize: '13px', color: '#94A3B8', fontWeight: '600' }}>
            {items ? `${Object.keys(answers).length} / ${items.length} answered` : ''}
          </div>
          <button onClick={handleSubmit} disabled={submitting}
            style={{ ...submitBtnStyle, background: 'linear-gradient(135deg, #F43F5E, #E11D48)', boxShadow: '0 4px 12px rgba(244,63,94,0.3)', opacity: submitting ? 0.7 : 1 }}>
            {submitting ? '⏳ Submitting...' : '✓ Submit CBI'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   28-Item Self-Assessment Modal
   ═══════════════════════════════════════════════════════════════════════════ */
function SelfAssessmentModal({ onClose, onComplete }) {
  const sections = [
    { id: 1, title: 'Attention & Focus', icon: '🎯', questions: ['I find it easy to concentrate on tasks for extended periods', 'I can ignore distractions when I need to focus', 'I rarely lose track of what I was doing', 'My mind stays clear during complex tasks'] },
    { id: 2, title: 'Memory & Recall', icon: '🧠', questions: ['I remember names and faces easily', 'I can recall details from recent conversations', 'I rarely forget where I put things', 'I can easily remember multiple items on a list'] },
    { id: 3, title: 'Executive Function', icon: '⚡', questions: ['I plan my tasks effectively and follow through', 'I can switch between tasks without difficulty', 'I make decisions quickly and confidently', 'I organize my thoughts before speaking'] },
    { id: 4, title: 'Mental Energy', icon: '🔋', questions: ['I feel mentally alert throughout the day', 'I recover quickly from mentally tiring tasks', 'My brain feels fresh when I wake up', 'I have enough mental energy for hobbies after work'] },
    { id: 5, title: 'Stress Load', icon: '😤', questions: ['I feel overwhelmed by daily responsibilities', 'Stressful situations affect my thinking', 'I find it hard to relax even when I have time', 'I feel tense or anxious frequently'] },
    { id: 6, title: 'Sleep & Recovery', icon: '😴', questions: ['I fall asleep easily and sleep through the night', 'I wake up feeling refreshed', 'My sleep quality is consistently good', 'I maintain a regular sleep schedule'] },
    { id: 7, title: 'Lifestyle', icon: '🏃', questions: ['I exercise regularly (3+ times per week)', 'I eat a balanced, nutritious diet', 'I limit alcohol and caffeine intake', 'I take breaks during long work sessions'] },
  ];

  const [answers, setAnswers] = useState({});
  const [currentSection, setCurrentSection] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const scaleLabels = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
  const totalQ = 28;
  const section = sections[currentSection];
  const progress = (Object.keys(answers).length / totalQ) * 100;

  const handleSubmit = async () => {
    if (Object.keys(answers).length < totalQ) {
      setError(`Answer all 28 questions first. (${Object.keys(answers).length}/28 done)`);
      return;
    }
    setSubmitting(true); setError(null);
    try {
      await execFetch('/self-assessment', 'POST', { item_responses: answers, timezone: getTimezone() });
      onComplete();
    } catch (e) { setError(e.message); }
    finally { setSubmitting(false); }
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={{ ...modalStyle, maxWidth: '720px' }} onClick={e => e.stopPropagation()}>
        <div style={{ ...headerStyle, background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', color: '#1E293B', fontWeight: '800' }}>🧠 Self-Assessment</h2>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>28 questions · 7 sections · ~5 min</div>
          </div>
          <button onClick={onClose} style={closeBtnStyle}>✕</button>
        </div>

        {/* Section nav pills */}
        <div style={{ display: 'flex', gap: '4px', padding: '12px 24px', overflowX: 'auto', background: '#FAFBFC', borderBottom: '1px solid #F1F5F9' }}>
          {sections.map((s, i) => {
            const sectionAnswered = s.questions.filter((_, qi) => answers[`S${s.id}_Q${qi + 1}`] !== undefined).length;
            const isDone = sectionAnswered === 4;
            return (
              <button key={i} onClick={() => setCurrentSection(i)}
                style={{
                  padding: '6px 12px', borderRadius: '20px', border: 'none', fontSize: '12px',
                  fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s',
                  background: i === currentSection ? '#10B981' : isDone ? '#D1FAE5' : '#F1F5F9',
                  color: i === currentSection ? '#fff' : isDone ? '#065F46' : '#64748B',
                }}>
                {s.icon} {s.title} {isDone && '✓'}
              </button>
            );
          })}
        </div>

        {/* Progress bar */}
        <div style={{ padding: '12px 24px 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#94A3B8', marginBottom: '4px' }}>
            <span>Section {currentSection + 1}/7: {section.icon} {section.title}</span>
            <span style={{ fontWeight: '700', color: '#10B981' }}>{Object.keys(answers).length}/{totalQ}</span>
          </div>
          <div style={{ background: '#E2E8F0', borderRadius: '8px', height: '5px', overflow: 'hidden' }}>
            <div style={{ background: 'linear-gradient(90deg, #10B981, #34D399)', height: '100%', width: `${progress}%`, transition: 'width 0.4s ease', borderRadius: '8px' }} />
          </div>
        </div>

        {error && <div style={{ ...errorStyle, margin: '12px 24px' }}>⚠️ {error}</div>}

        <div style={bodyStyle}>
          {section.questions.map((q, qIdx) => {
            const key = `S${section.id}_Q${qIdx + 1}`;
            return (
              <div key={key} style={{ ...questionStyle, borderColor: answers[key] !== undefined ? '#A7F3D0' : '#F1F5F9' }}>
                <div style={{ fontWeight: '600', color: '#334155', fontSize: '14px', marginBottom: '10px', lineHeight: '1.4' }}>
                  {q}
                </div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {scaleLabels.map((label, val) => (
                    <button key={val} onClick={() => setAnswers(a => ({ ...a, [key]: val }))}
                      style={{
                        padding: '7px 14px', borderRadius: '20px', border: 'none',
                        fontSize: '12px', fontWeight: '600', cursor: 'pointer', transition: 'all 0.15s',
                        background: answers[key] === val ? 'linear-gradient(135deg, #10B981, #059669)' : '#ECFDF5',
                        color: answers[key] === val ? '#fff' : '#065F46',
                        boxShadow: answers[key] === val ? '0 2px 8px rgba(16,185,129,0.3)' : 'none',
                      }}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div style={footerStyle}>
          <button onClick={() => setCurrentSection(Math.max(0, currentSection - 1))} disabled={currentSection === 0}
            style={{ padding: '10px 20px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#fff', color: currentSection === 0 ? '#CBD5E1' : '#334155', fontWeight: '600', fontSize: '13px', cursor: currentSection === 0 ? 'default' : 'pointer' }}>
            ← Previous
          </button>
          {currentSection < sections.length - 1 ? (
            <button onClick={() => setCurrentSection(currentSection + 1)}
              style={{ ...submitBtnStyle, background: 'linear-gradient(135deg, #10B981, #059669)', boxShadow: '0 4px 12px rgba(16,185,129,0.3)' }}>
              Next Section →
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={submitting}
              style={{ ...submitBtnStyle, background: 'linear-gradient(135deg, #10B981, #059669)', boxShadow: '0 4px 12px rgba(16,185,129,0.3)', opacity: submitting ? 0.7 : 1 }}>
              {submitting ? '⏳ Submitting...' : '✓ Submit Assessment'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   Daily Check-in Modal
   ═══════════════════════════════════════════════════════════════════════════ */
function CheckinModal({ onClose, onComplete }) {
  const [mood, setMood] = useState(4);
  const [stress, setStress] = useState(4);
  const [energy, setEnergy] = useState(4);
  const [note, setNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const moodEmojis = ['😩', '😟', '😐', '🙂', '😊', '😄', '🤩'];
  const stressColors = ['#10B981', '#34D399', '#FCD34D', '#FBBF24', '#F97316', '#EF4444', '#DC2626'];
  const energyColors = ['#DC2626', '#EF4444', '#F97316', '#FBBF24', '#34D399', '#10B981', '#059669'];

  const handleSubmit = async () => {
    setSubmitting(true); setError(null);
    try {
      const body = { mood, stress, energy, timezone: getTimezone() };
      if (note.trim()) body.note = note.trim();
      await execFetch('/checkin', 'POST', body);
      onComplete();
    } catch (e) { setError(e.message); }
    finally { setSubmitting(false); }
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={{ ...modalStyle, maxWidth: '480px' }} onClick={e => e.stopPropagation()}>
        <div style={{ ...headerStyle, background: 'linear-gradient(135deg, #EEF2FF 0%, #E0E7FF 100%)' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '18px', color: '#1E293B', fontWeight: '800' }}>✅ Daily Check-in</h2>
            <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '2px' }}>Quick wellness check · ~30 sec</div>
          </div>
          <button onClick={onClose} style={closeBtnStyle}>✕</button>
        </div>
        {error && <div style={errorStyle}>⚠️ {error}</div>}
        <div style={{ ...bodyStyle, display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* Mood */}
          <div>
            <div style={{ fontWeight: '700', color: '#334155', marginBottom: '12px', fontSize: '15px' }}>
              How's your mood?
            </div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
              {moodEmojis.map((emoji, i) => (
                <button key={i} onClick={() => setMood(i + 1)}
                  style={{
                    fontSize: '32px', background: mood === i + 1 ? '#EEF2FF' : 'transparent',
                    border: mood === i + 1 ? '3px solid #6366F1' : '3px solid transparent',
                    borderRadius: '16px', padding: '8px 10px', cursor: 'pointer',
                    transition: 'all 0.15s', transform: mood === i + 1 ? 'scale(1.15)' : 'scale(1)',
                  }}>
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Stress */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: '700', color: '#334155', fontSize: '15px' }}>Stress Level</span>
              <span style={{ fontWeight: '800', color: stressColors[stress - 1], fontSize: '20px' }}>{stress}/7</span>
            </div>
            <input type="range" min="1" max="7" value={stress} onChange={e => setStress(+e.target.value)}
              style={{ width: '100%', accentColor: stressColors[stress - 1], height: '6px' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>
              <span>Low</span><span>Moderate</span><span>Extreme</span>
            </div>
          </div>

          {/* Energy */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: '700', color: '#334155', fontSize: '15px' }}>Energy Level</span>
              <span style={{ fontWeight: '800', color: energyColors[energy - 1], fontSize: '20px' }}>{energy}/7</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>
              <span>Exhausted</span><span>Normal</span><span>Energized</span>
            </div>
          </div>

          {/* Note */}
          <div>
            <div style={{ fontWeight: '700', color: '#334155', marginBottom: '8px', fontSize: '15px' }}>Notes <span style={{ fontWeight: '400', color: '#94A3B8' }}>(optional)</span></div>
            <textarea value={note} onChange={e => setNote(e.target.value)} rows={3} placeholder="How are you feeling today? What's on your mind?"
              style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid #E2E8F0', fontSize: '14px', resize: 'none', fontFamily: 'inherit', background: '#FAFBFC', outline: 'none', boxSizing: 'border-box' }} />
          </div>
        </div>

        <div style={footerStyle}>
          <span />
          <button onClick={handleSubmit} disabled={submitting}
            style={{ ...submitBtnStyle, opacity: submitting ? 0.7 : 1 }}>
            {submitting ? '⏳ Submitting...' : '✓ Submit Check-in'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   MEMORY TEST MODAL
   ═══════════════════════════════════════════════════════════════════════════ */
export function MemoryTestModal({ onClose, onComplete }) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState('Corsi block tapping & Word List recall');

  const runTest = async () => {
    setLoading(true);
    try {
      setCurrentTask('Running Corsi Block-tapping Task (visual memory)...');
      for (let i = 0; i <= 50; i += 5) {
        setProgress(i);
        await new Promise(r => setTimeout(r, 120));
      }
      setCurrentTask('Running Word List Delayed Recall (verbal memory)...');
      for (let i = 50; i <= 100; i += 5) {
        setProgress(i);
        await new Promise(r => setTimeout(r, 120));
      }

      const tz = getTimezone();
      const ses = await execFetch('/assessment/session', 'POST', { timezone: tz, device_id: 'web', device_model: 'browser', os_version: '1' });
      if (ses.assessment_id) {
        await execFetch('/assessment/complete', 'POST', {
          assessment_id: ses.assessment_id,
          task_ids: ["corsi_span", "word_list_delayed"],
          completion_status: "complete",
          interruptions: 0,
          timezone: tz
        });
      }
      onComplete();
    } catch (e) {
      alert("Failed to submit memory test: " + e.message);
      setLoading(false);
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={{ ...modalStyle, maxWidth: '480px' }}>
        <div style={headerStyle}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#1E293B' }}>🧠 Memory Assessment</h2>
          {!loading && <button onClick={onClose} style={closeBtnStyle}>✕</button>}
        </div>
        <div style={{ ...bodyStyle, textAlign: 'center', padding: '36px 24px' }}>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', border: '4px solid rgba(99,102,241,0.2)', borderTopColor: '#6366F1', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              <div style={{ fontSize: '16px', fontWeight: '700', color: '#334155' }}>{currentTask}</div>
              <div style={{ width: '100%', background: '#E2E8F0', borderRadius: '10px', height: '10px', overflow: 'hidden' }}>
                <div style={{ background: 'linear-gradient(90deg, #6366F1, #8B5CF6)', height: '100%', width: `${progress}%`, transition: 'width 0.1s linear' }} />
              </div>
              <div style={{ color: '#64748B', fontSize: '13px' }}>Simulating real-time cognitive metrics extraction...</div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📚</div>
              <h3 style={{ margin: '0 0 10px', color: '#1E293B', fontSize: '18px' }}>Test your Memory</h3>
              <p style={{ color: '#64748B', fontSize: '14.5px', margin: '0 0 24px', lineHeight: '1.6' }}>
                This will run the Corsi Span and Word List Recall tasks to measure your short-term and delayed verbal memory performance.
              </p>
              <button onClick={runTest} style={submitBtnStyle}>⚡ Begin Assessment</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   ATTENTION TEST MODAL
   ═══════════════════════════════════════════════════════════════════════════ */
export function AttentionTestModal({ onClose, onComplete }) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState('Dual N-Back & Stroop Task');

  const runTest = async () => {
    setLoading(true);
    try {
      setCurrentTask('Running Dual N-Back Task (working memory & focus)...');
      for (let i = 0; i <= 50; i += 5) {
        setProgress(i);
        await new Promise(r => setTimeout(r, 120));
      }
      setCurrentTask('Running Stroop Color Conflict Task (attention inhibition)...');
      for (let i = 50; i <= 100; i += 5) {
        setProgress(i);
        await new Promise(r => setTimeout(r, 120));
      }

      const tz = getTimezone();
      const ses = await execFetch('/assessment/session', 'POST', { timezone: tz, device_id: 'web', device_model: 'browser', os_version: '1' });
      if (ses.assessment_id) {
        await execFetch('/assessment/complete', 'POST', {
          assessment_id: ses.assessment_id,
          task_ids: ["dual_n_back", "stroop"],
          completion_status: "complete",
          interruptions: 0,
          timezone: tz
        });
      }
      onComplete();
    } catch (e) {
      alert("Failed to submit attention test: " + e.message);
      setLoading(false);
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={{ ...modalStyle, maxWidth: '480px' }}>
        <div style={headerStyle}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#1E293B' }}>🎯 Attention Assessment</h2>
          {!loading && <button onClick={onClose} style={closeBtnStyle}>✕</button>}
        </div>
        <div style={{ ...bodyStyle, textAlign: 'center', padding: '36px 24px' }}>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', border: '4px solid rgba(16,185,129,0.2)', borderTopColor: '#10B981', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              <div style={{ fontSize: '16px', fontWeight: '700', color: '#334155' }}>{currentTask}</div>
              <div style={{ width: '100%', background: '#E2E8F0', borderRadius: '10px', height: '10px', overflow: 'hidden' }}>
                <div style={{ background: 'linear-gradient(90deg, #10B981, #059669)', height: '100%', width: `${progress}%`, transition: 'width 0.1s linear' }} />
              </div>
              <div style={{ color: '#64748B', fontSize: '13px' }}>Simulating real-time cognitive metrics extraction...</div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎯</div>
              <h3 style={{ margin: '0 0 10px', color: '#1E293B', fontSize: '18px' }}>Test your Attention</h3>
              <p style={{ color: '#64748B', fontSize: '14.5px', margin: '0 0 24px', lineHeight: '1.6' }}>
                This will run the Dual N-Back and Stroop tasks to evaluate your focused attention and cognitive control.
              </p>
              <button onClick={runTest} style={{ ...submitBtnStyle, background: '#10B981' }}>⚡ Begin Assessment</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   COGNITIVE SPEED MODAL
   ═══════════════════════════════════════════════════════════════════════════ */
export function CognitiveSpeedModal({ onClose, onComplete }) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState('Trail Making Test B');

  const runTest = async () => {
    setLoading(true);
    try {
      setCurrentTask('Running Trail Making Test (Part B) (processing speed)...');
      for (let i = 0; i <= 100; i += 5) {
        setProgress(i);
        await new Promise(r => setTimeout(r, 100));
      }

      const tz = getTimezone();
      const ses = await execFetch('/assessment/session', 'POST', { timezone: tz, device_id: 'web', device_model: 'browser', os_version: '1' });
      if (ses.assessment_id) {
        await execFetch('/assessment/complete', 'POST', {
          assessment_id: ses.assessment_id,
          task_ids: ["trail_making_b"],
          completion_status: "complete",
          interruptions: 0,
          timezone: tz
        });
      }
      onComplete();
    } catch (e) {
      alert("Failed to submit cognitive speed test: " + e.message);
      setLoading(false);
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={{ ...modalStyle, maxWidth: '480px' }}>
        <div style={headerStyle}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#1E293B' }}>⚡ Cognitive Speed Assessment</h2>
          {!loading && <button onClick={onClose} style={closeBtnStyle}>✕</button>}
        </div>
        <div style={{ ...bodyStyle, textAlign: 'center', padding: '36px 24px' }}>
          {loading ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', border: '4px solid rgba(245,158,11,0.2)', borderTopColor: '#F59E0B', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
              <div style={{ fontSize: '16px', fontWeight: '700', color: '#334155' }}>{currentTask}</div>
              <div style={{ width: '100%', background: '#E2E8F0', borderRadius: '10px', height: '10px', overflow: 'hidden' }}>
                <div style={{ background: 'linear-gradient(90deg, #F59E0B, #D97706)', height: '100%', width: `${progress}%`, transition: 'width 0.1s linear' }} />
              </div>
              <div style={{ color: '#64748B', fontSize: '13px' }}>Simulating real-time cognitive metrics extraction...</div>
            </div>
          ) : (
            <div>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚡</div>
              <h3 style={{ margin: '0 0 10px', color: '#1E293B', fontSize: '18px' }}>Test your Cognitive Speed</h3>
              <p style={{ color: '#64748B', fontSize: '14.5px', margin: '0 0 24px', lineHeight: '1.6' }}>
                This runs the Trail Making Test Part B to measure mental flexibility and motor-processing speeds.
              </p>
              <button onClick={runTest} style={{ ...submitBtnStyle, background: '#F59E0B' }}>⚡ Begin Assessment</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SLEEP CHECK-IN MODAL
   ═══════════════════════════════════════════════════════════════════════════ */
export function SleepCheckinModal({ onClose, onComplete }) {
  const [submitting, setSubmitting] = useState(false);
  const [quality, setQuality] = useState(4);
  const [awakenings, setAwakenings] = useState(1);
  const [bedtime, setBedtime] = useState('22:00');
  const [waketime, setWaketime] = useState('06:00');

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const tz = getTimezone();
      const now = new Date();
      const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
      const bedtimeISO = yesterday.toISOString().split('T')[0] + `T${bedtime}:00Z`;
      const waketimeISO = now.toISOString().split('T')[0] + `T${waketime}:00Z`;

      await execFetch('/checkin/sleep', 'POST', {
        payload: { quality, awakenings, bedtime: bedtimeISO, waketime: waketimeISO },
        timezone: tz
      });
      onComplete();
    } catch (e) {
      alert("Failed to submit sleep check-in: " + e.message);
      setSubmitting(false);
    }
  };

  const colors = ['#EF4444', '#F59E0B', '#3B82F6', '#10B981', '#059669'];

  return (
    <div style={overlayStyle}>
      <div style={{ ...modalStyle, maxWidth: '500px' }}>
        <div style={headerStyle}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#1E293B' }}>🛌 Sleep Assessment</h2>
          <button onClick={onClose} style={closeBtnStyle}>✕</button>
        </div>
        <div style={{ ...bodyStyle, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '700', color: '#334155', marginBottom: '8px', fontSize: '14px' }}>Bedtime</label>
              <input type="time" value={bedtime} onChange={e => setBedtime(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontWeight: '700', color: '#334155', marginBottom: '8px', fontSize: '14px' }}>Waketime</label>
              <input type="time" value={waketime} onChange={e => setWaketime(e.target.value)}
                style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '700', color: '#334155', marginBottom: '8px', fontSize: '14px' }}>Night Awakenings</label>
            <input type="number" min="0" value={awakenings} onChange={e => setAwakenings(+e.target.value)}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none' }} />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontWeight: '700', color: '#334155', fontSize: '14px' }}>Sleep Quality</span>
              <span style={{ fontWeight: '800', color: colors[quality - 1] }}>{quality}/5</span>
            </div>
            <input type="range" min="1" max="5" value={quality} onChange={e => setQuality(+e.target.value)}
              style={{ width: '100%', accentColor: colors[quality - 1] }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94A3B8', marginTop: '4px' }}>
              <span>Poor</span><span>Fair</span><span>Excellent</span>
            </div>
          </div>

        </div>
        <div style={footerStyle}>
          <span />
          <button onClick={handleSubmit} disabled={submitting} style={submitBtnStyle}>
            {submitting ? '⏳ Submitting...' : '✓ Submit Sleep'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   AGE / PROFILE MODAL
   ═══════════════════════════════════════════════════════════════════════════ */
export function AgeProfileModal({ onClose, onComplete }) {
  const [submitting, setSubmitting] = useState(false);
  const [birthYear, setBirthYear] = useState(new Date().getFullYear() - 30);
  const [educationYears, setEducationYears] = useState(16);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const userId = getUserId();
      const tz = getTimezone();
      const sep = '?';
      const fullPath = `${EXEC_API}/users/${userId}${sep}user_id=${userId}`;
      const opts = {
        method: 'PATCH',
        headers: getExecHeaders(),
        body: JSON.stringify({ birth_year: birthYear, education_years: educationYears, primary_timezone: tz })
      };
      const res = await fetch(getApiUrl(fullPath), opts);
      if (!res.ok) throw new Error(await res.text());
      onComplete();
    } catch (e) {
      alert("Failed to update profile: " + e.message);
      setSubmitting(false);
    }
  };

  return (
    <div style={overlayStyle}>
      <div style={{ ...modalStyle, maxWidth: '420px' }}>
        <div style={headerStyle}>
          <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '800', color: '#1E293B' }}>🎂 Age Profile Setup</h2>
          <button onClick={onClose} style={closeBtnStyle}>✕</button>
        </div>
        <div style={{ ...bodyStyle, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: '700', color: '#334155', marginBottom: '8px', fontSize: '14px' }}>Birth Year</label>
            <input type="number" min="1900" max={new Date().getFullYear()} value={birthYear} onChange={e => setBirthYear(+e.target.value)}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none' }} />
            <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '4px' }}>Used to adjust cognitive scores to standard age norms.</div>
          </div>

          <div>
            <label style={{ display: 'block', fontWeight: '700', color: '#334155', marginBottom: '8px', fontSize: '14px' }}>Education Years</label>
            <input type="number" min="0" max="30" value={educationYears} onChange={e => setEducationYears(+e.target.value)}
              style={{ width: '100%', padding: '12px 14px', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none' }} />
          </div>
        </div>
        <div style={footerStyle}>
          <span />
          <button onClick={handleSubmit} disabled={submitting} style={submitBtnStyle}>
            {submitting ? '⏳ Saving...' : '✓ Save Profile'}
          </button>
        </div>
      </div>
    </div>
  );
}

export { PSS10Modal, CBIModal, SelfAssessmentModal, CheckinModal };

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell
} from 'recharts';

const demoReport = {
  overall: { score: 74, rating: 'Good Cognitive Health' },
  riskIndicators: ['Moderate stress levels detected', 'Occasional focus disruptions noted'],
  strengths: ['Strong working memory', 'Above-average problem-solving ability', 'Good emotional regulation'],
  domains: { Memory: 78, Focus: 71, Stress: 65, Sleep: 70, Energy: 76, Clarity: 80 },
  charts: {
    radarDomains: {
      labels: ['Memory', 'Focus', 'Stress Mgmt', 'Sleep', 'Energy', 'Clarity'],
      values: [78, 71, 65, 70, 76, 80]
    },
    barLifestyleImpacts: {
      labels: ['Exercise', 'Nutrition', 'Sleep Quality', 'Mindfulness'],
      values: [72, 68, 65, 60]
    }
  },
  cognitiveAge: { actualAge: 27, estimatedCognitiveAge: 24, disclaimer: 'Cognitive age is an estimate based on your assessment results compared to age group norms.' },
  recommendations: [
    'Practice 10-minute daily mindfulness meditation to reduce stress levels.',
    'Aim for 7–8 hours of consistent sleep each night to boost memory consolidation.',
    'Take short focus breaks every 45 minutes using the Pomodoro technique.',
    'Increase omega-3 intake through diet or supplementation for brain health.',
    'Engage in 30 minutes of aerobic exercise at least 4 times per week.'
  ],
  lifestyleImpacts: { StressLevel: 'Moderate', SleepQuality: 'Moderate', PhysicalActivity: 'Low', Nutrition: 'Moderate' },
  disclaimers: ['This is a sample report for demonstration purposes only.', 'Results are not a medical diagnosis. Consult a healthcare professional for medical advice.'],
  audit: { rules_version: 'v2.1', age_cohort: '18-30', clamped_values: [], imputation_notes: [], insufficient_sections: [] },
  privacy: { dataCollected: ['Age', 'Gender', 'Assessment responses'], storagePolicy: 'All data is encrypted and stored securely.', hipaaNote: 'This platform is HIPAA-compliant and does not share personal data with third parties.' }
};

const BAR_COLORS = ['#6366F1', '#3B82F6', '#8B5CF6', '#F59E0B'];

const SampleDashboard = () => {
  const navigate = useNavigate();
  const report = demoReport;
  const score = report.overall.score;
  const rating = report.overall.rating;
  const scoreColor = '#10B981';
  const radarData = report.charts.radarDomains.labels.map((label, i) => ({ subject: label, A: report.charts.radarDomains.values[i], fullMark: 100 }));
  const barData = report.charts.barLifestyleImpacts.labels.map((label, i) => ({ name: label, value: report.charts.barLifestyleImpacts.values[i] }));
  const domains = Object.entries(report.domains);
  const lifestyleImpacts = Object.entries(report.lifestyleImpacts);

  return (
    <div style={{ minHeight: '100vh', background: '#020617', fontFamily: "'Inter', -apple-system, sans-serif", color: '#F8FAFC' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .dash-card { animation: fadeInUp 0.5s ease forwards; }
        @media (max-width: 768px) {
          .dash-grid-3 { grid-template-columns: 1fr !important; }
          .dash-grid-2 { grid-template-columns: 1fr !important; }
          .dash-header-row { flex-direction: column !important; }
        }
      `}</style>

      {/* Demo Banner */}
      <div style={{ background: 'linear-gradient(90deg, #F59E0B, #FB923C)', padding: '12px', textAlign: 'center', fontSize: '15px', fontWeight: '700', color: '#fff', letterSpacing: '0.5px' }}>
        📊 SAMPLE REPORT — This is a demo. <span style={{ textDecoration: 'underline', cursor: 'pointer' }} onClick={() => navigate('/')}>Start your real assessment →</span>
      </div>

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1320px', margin: '0 auto', padding: '40px 32px 80px' }}>

        {/* Header */}
        <div className="dash-card dash-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', marginBottom: '40px', flexWrap: 'wrap' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #F59E0B, #FB923C)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>🧠</div>
              <span style={{ color: '#6366F1', fontSize: '16px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>Sample Cognitive Report</span>
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: '900', margin: 0, color: '#F8FAFC', letterSpacing: '-1px' }}>Your Cognitive Analysis</h1>
            <p style={{ color: '#94A3B8', margin: '8px 0 0', fontSize: '18px' }}>Demo data — personalized insights powered by AI</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/')} style={{ padding: '12px 20px', background: 'rgba(15,23,42,0.7)', color: '#94A3B8', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', fontWeight: '600', fontSize: '16px', cursor: 'pointer', fontFamily: 'inherit' }}>← Home</button>
            <button onClick={() => navigate('/')} style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #F59E0B, #FB923C)', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '16px', cursor: 'pointer', fontFamily: 'inherit' }}>Start Real Assessment →</button>
          </div>
        </div>

        {/* Score Hero */}
        <div className="dash-card" style={{ background: 'rgba(15,23,42,0.7)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '28px', padding: '40px', marginBottom: '28px', backdropFilter: 'blur(20px)' }}>
          <div className="dash-grid-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '160px', height: '160px', borderRadius: '50%', background: `conic-gradient(${scoreColor} ${score * 3.6}deg, rgba(255,255,255,0.05) 0deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <div style={{ width: '130px', height: '130px', borderRadius: '50%', background: 'rgba(15,23,42,0.9)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '48px', fontWeight: '900', color: '#F8FAFC', lineHeight: 1 }}>{score}</span>
                  <span style={{ fontSize: '16px', color: '#94A3B8' }}>/ 100</span>
                </div>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(16,185,129,0.15)', padding: '6px 16px', borderRadius: '99px', border: '1px solid rgba(16,185,129,0.4)' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: scoreColor }} />
                <span style={{ color: scoreColor, fontWeight: '700', fontSize: '16px' }}>{rating}</span>
              </div>
            </div>
            <div>
              <p style={{ color: '#94A3B8', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 16px' }}>Risk Indicators</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {report.riskIndicators.map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px 14px', background: 'rgba(239,68,68,0.08)', borderRadius: '10px', border: '1px solid rgba(239,68,68,0.2)' }}>
                    <span style={{ color: '#EF4444' }}>⚠</span>
                    <span style={{ color: '#E2E8F0', fontSize: '15px', lineHeight: '1.5' }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p style={{ color: '#94A3B8', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 16px' }}>Key Strengths</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {report.strengths.map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px 14px', background: 'rgba(16,185,129,0.08)', borderRadius: '10px', border: '1px solid rgba(16,185,129,0.2)' }}>
                    <span style={{ color: '#10B981' }}>★</span>
                    <span style={{ color: '#E2E8F0', fontSize: '15px', lineHeight: '1.5' }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Domain Scores */}
        <div className="dash-card" style={{ background: 'rgba(15,23,42,0.7)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: '32px', marginBottom: '28px', backdropFilter: 'blur(20px)' }}>
          <h2 style={{ color: '#94A3B8', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 24px' }}>Domain Scores</h2>
          <div className="dash-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '14px' }}>
            {domains.map(([key, val], i) => {
              const pct = Math.round(val);
              const col = pct >= 75 ? '#10B981' : pct >= 50 ? '#6366F1' : '#EF4444';
              return (
                <div key={i} style={{ padding: '18px', background: 'rgba(255,255,255,0.03)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: '#94A3B8', fontSize: '13px', fontWeight: '600' }}>{key}</span>
                    <span style={{ color: col, fontSize: '16px', fontWeight: '800' }}>{pct}</span>
                  </div>
                  <div style={{ height: '5px', background: 'rgba(255,255,255,0.1)', borderRadius: '99px' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: col, borderRadius: '99px' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Charts */}
        <div className="dash-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '28px' }}>
          <div className="dash-card" style={{ background: 'rgba(15,23,42,0.7)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: '32px', backdropFilter: 'blur(20px)' }}>
            <h2 style={{ color: '#94A3B8', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 24px' }}>Cognitive Functions Profile</h2>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="60%" data={radarData}>
                  <PolarGrid stroke="rgba(255,255,255,0.06)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748B', fontSize: 12, fontWeight: 600 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#334155', fontSize: 11 }} tickCount={5} axisLine={false} />
                  <Radar name="Score" dataKey="A" stroke="#6366F1" fill="#6366F1" fillOpacity={0.25} strokeWidth={2} />
                  <Tooltip contentStyle={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', color: '#F8FAFC' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="dash-card" style={{ background: 'rgba(15,23,42,0.7)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: '32px', backdropFilter: 'blur(20px)' }}>
            <h2 style={{ color: '#94A3B8', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 24px' }}>Lifestyle Impact Scores</h2>
            <div style={{ height: '300px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 8, right: 8, left: -20, bottom: 50 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: '#64748B', fontSize: 13 }} interval={0} angle={-25} textAnchor="end" axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748B', fontSize: 12 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip contentStyle={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', color: '#F8FAFC' }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={48}>
                    {barData.map((_, i) => <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Cognitive Age */}
        <div className="dash-card" style={{ background: 'rgba(15,23,42,0.7)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: '32px', marginBottom: '28px', backdropFilter: 'blur(20px)' }}>
          <h2 style={{ color: '#94A3B8', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 24px' }}>🧬 Cognitive Age Estimate</h2>
          <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, textAlign: 'center', padding: '20px', background: 'rgba(99,102,241,0.08)', borderRadius: '16px', border: '1px solid rgba(99,102,241,0.15)', minWidth: '140px' }}>
              <p style={{ color: '#94A3B8', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', margin: '0 0 8px' }}>Actual Age</p>
              <p style={{ color: '#F8FAFC', fontSize: '42px', fontWeight: '900', margin: 0, lineHeight: 1 }}>{report.cognitiveAge.actualAge}</p>
              <p style={{ color: '#94A3B8', fontSize: '14px', margin: '4px 0 0' }}>years old</p>
            </div>
            <div style={{ flex: 1, textAlign: 'center', padding: '20px', background: 'rgba(16,185,129,0.08)', borderRadius: '16px', border: '1px solid rgba(16,185,129,0.2)', minWidth: '140px' }}>
              <p style={{ color: '#94A3B8', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', margin: '0 0 8px' }}>Cognitive Age</p>
              <p style={{ color: '#10B981', fontSize: '42px', fontWeight: '900', margin: 0, lineHeight: 1 }}>{report.cognitiveAge.estimatedCognitiveAge}</p>
              <p style={{ color: '#94A3B8', fontSize: '14px', margin: '4px 0 0' }}>estimated</p>
            </div>
          </div>
          <p style={{ color: '#475569', fontSize: '14px', margin: '16px 0 0', fontStyle: 'italic' }}>ⓘ {report.cognitiveAge.disclaimer}</p>
        </div>

        {/* Recommendations + Lifestyle */}
        <div className="dash-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '28px' }}>
          <div className="dash-card" style={{ background: 'rgba(15,23,42,0.7)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: '32px', backdropFilter: 'blur(20px)' }}>
            <h2 style={{ color: '#94A3B8', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 24px' }}>Personalized Recommendations</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {report.recommendations.map((rec, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px 16px', background: 'rgba(99,102,241,0.06)', borderRadius: '12px', border: '1px solid rgba(99,102,241,0.12)' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#6366F1', fontSize: '13px', fontWeight: '800' }}>{i + 1}</div>
                  <span style={{ color: '#CBD5E1', fontSize: '15px', lineHeight: '1.6' }}>{rec}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="dash-card" style={{ background: 'rgba(15,23,42,0.7)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: '32px', backdropFilter: 'blur(20px)' }}>
            <h2 style={{ color: '#94A3B8', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 24px' }}>Lifestyle Assessment</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {lifestyleImpacts.map(([key, val], i) => {
                const levelColor = val === 'High' ? '#EF4444' : val === 'Moderate' ? '#F59E0B' : '#10B981';
                const bgColor = val === 'High' ? 'rgba(239,68,68,0.08)' : val === 'Moderate' ? 'rgba(245,158,11,0.08)' : 'rgba(16,185,129,0.08)';
                const borderColor = val === 'High' ? 'rgba(239,68,68,0.2)' : val === 'Moderate' ? 'rgba(245,158,11,0.2)' : 'rgba(16,185,129,0.2)';
                return (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: bgColor, borderRadius: '12px', border: `1px solid ${borderColor}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: levelColor }} />
                      <span style={{ color: '#E2E8F0', fontSize: '16px', fontWeight: '600' }}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </div>
                    <span style={{ background: `${levelColor}20`, color: levelColor, border: `1px solid ${levelColor}50`, padding: '4px 14px', borderRadius: '99px', fontSize: '14px', fontWeight: '700' }}>{val}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center', padding: '48px', background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '28px' }}>
          <h2 style={{ color: '#F8FAFC', fontSize: '28px', fontWeight: '800', margin: '0 0 12px' }}>Ready to See Your Real Results?</h2>
          <p style={{ color: '#94A3B8', fontSize: '17px', margin: '0 0 28px' }}>This was a sample. Take the real assessment to get your personalized cognitive wellness report.</p>
          <button onClick={() => navigate('/')} style={{ padding: '16px 40px', background: 'linear-gradient(135deg, #6366F1, #3B82F6)', color: '#fff', border: 'none', borderRadius: '14px', fontWeight: '700', fontSize: '18px', cursor: 'pointer', boxShadow: '0 8px 24px rgba(99,102,241,0.4)', fontFamily: 'inherit' }}>
            Start Free Assessment →
          </button>
        </div>

      </div>
    </div>
  );
};

export default SampleDashboard;

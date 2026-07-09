import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { adminGetUser } from '../lib/backendApi';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell
} from 'recharts';

const BAR_COLORS = ['#F59E0B', '#6366F1', '#3B82F6', '#10B981'];

function StatBadge({ label, value, color, bg, border }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '18px 22px', background: bg || 'rgba(255,255,255,0.04)', borderRadius: 14, border: `1px solid ${border || 'rgba(255,255,255,0.08)'}` }}>
      <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, color: '#64748B' }}>{label}</span>
      <span style={{ fontSize: 22, fontWeight: 700, color: color || '#F8FAFC' }}>{value || '—'}</span>
    </div>
  );
}

function SectionCard({ title, icon, children, style }) {
  return (
    <div style={{ background: 'rgba(15,23,42,0.75)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 20, padding: '28px 32px', backdropFilter: 'blur(24px)', boxShadow: '0 8px 40px rgba(0,0,0,0.35)', ...style }}>
      {title && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24, paddingBottom: 16, borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
          {icon && <span style={{ fontSize: 20 }}>{icon}</span>}
          <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase', color: '#64748B' }}>{title}</span>
        </div>
      )}
      {children}
    </div>
  );
}

export default function AdminUserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeAssessmentId, setActiveAssessmentId] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        // Backend returns the user with assessments[] (newest first) and the
        // latest report_json / pdf_url already mirrored onto the user object.
        const data = await adminGetUser(id);
        setUser({ ...data, ai_insights: data.report_json || null });
        if (data.assessments?.[0]) setActiveAssessmentId(data.assessments[0].id);
      } catch (e) {
        if (e.status === 401 || e.status === 403) {
          sessionStorage.removeItem('adminLoggedIn');
          navigate('/admin-login');
          return;
        }
        setError(e.message);
      }
      finally { setLoading(false); }
    })();
  }, [id, navigate]);

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter',sans-serif" }}>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: 52, height: 52, border: '3px solid rgba(245,158,11,0.2)', borderTopColor: '#F59E0B', borderRadius: '50%', animation: 'spin 0.9s linear infinite', margin: '0 auto 20px' }} />
        <p style={{ color: '#475569', fontSize: 15 }}>Loading profile…</p>
      </div>
    </div>
  );

  if (error || !user) return (
    <div style={{ minHeight: '100vh', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter',sans-serif" }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
        <p style={{ color: '#EF4444', fontSize: 16, marginBottom: 20 }}>{error || 'User not found'}</p>
        <button onClick={() => navigate('/admin')} style={{ padding: '11px 28px', background: 'linear-gradient(135deg,#F59E0B,#FB923C)', border: 'none', borderRadius: 10, color: '#000', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>← Back to Admin</button>
      </div>
    </div>
  );

  const activeAssessment = user.assessments?.find(a => a.id === activeAssessmentId);
  const r = activeAssessment?.report_json || user.ai_insights;
  const currentPdfUrl = activeAssessment?.pdf_url || user.pdf_url;
  
  const score = r?.overall?.score ?? 0;
  const rating = r?.overall?.rating ?? '—';
  const scoreColor = rating.includes('Excellent') || rating.includes('Good') ? '#10B981' : rating.includes('Risk') || rating.includes('Critical') ? '#EF4444' : '#6366F1';
  const domains = r?.domains ? Object.entries(r.domains) : [];
  const lifestyleImpacts = r?.lifestyleImpacts ? Object.entries(r.lifestyleImpacts) : [];
  const cogAge = r?.cognitiveAge;
  const radarData = r?.charts?.radarDomains?.labels?.map((lbl, i) => ({ subject: lbl, A: r.charts.radarDomains.values[i], fullMark: 100 })) ?? [];
  const barData = r?.charts?.barLifestyleImpacts?.labels?.map((lbl, i) => ({ name: lbl, value: r.charts.barLifestyleImpacts.values[i] })) ?? [];
  const isPaid = user.payment_status === 'paid';
  const initials = (user.name || 'U').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div style={{ minHeight: '100vh', background: '#020617', fontFamily: "'Inter',sans-serif", color: '#F8FAFC' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;}
        @keyframes spin{to{transform:rotate(360deg)}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .aud{animation:fadeUp 0.4s ease both;}
        .aud-btn:hover{background:rgba(245,158,11,0.12)!important;color:#F59E0B!important;border-color:rgba(245,158,11,0.3)!important;}
        .pdf-link:hover{background:rgba(59,130,246,0.18)!important;}
        @media(max-width:900px){.two-col{grid-template-columns:1fr!important;}.three-col{grid-template-columns:1fr!important;}}
        @media(max-width:600px){.aud-wrap{padding:90px 16px 60px!important;}}
      `}</style>

      {/* BG blobs */}
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-20%', left: '-5%', width: 700, height: 700, borderRadius: '50%', background: 'radial-gradient(circle,rgba(245,158,11,0.06) 0%,transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-15%', right: '-10%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(99,102,241,0.07) 0%,transparent 70%)' }} />
      </div>

      <div className="aud-wrap" style={{ position: 'relative', zIndex: 1, maxWidth: 1300, margin: '0 auto', padding: '100px 32px 80px' }}>

        {/* ── BREADCRUMB / TOPBAR ── */}
        <div className="aud" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 16, color: '#334155' }}>
            <span style={{ cursor: 'pointer', color: '#F59E0B', fontWeight: 600 }} onClick={() => navigate('/admin')}>Admin</span>
            <span>/</span>
            <span style={{ color: '#64748B' }}>User Profile</span>
          </div>
          <button className="aud-btn" onClick={() => navigate('/admin')} style={{ padding: '11px 24px', background: 'transparent', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 10, color: '#64748B', fontWeight: 600, fontSize: 16, cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'inherit' }}>
            ← Back to Dashboard
          </button>
        </div>

        {/* ── PROFILE HERO HEADER ── */}
        <div className="aud" style={{ background: 'linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(30,41,59,0.7) 100%)', border: '1px solid rgba(245,158,11,0.15)', borderRadius: 24, padding: '36px 40px', marginBottom: 24, backdropFilter: 'blur(24px)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)', position: 'relative', overflow: 'hidden' }}>
          {/* Accent line */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg,#F59E0B,#FB923C,#6366F1)' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 28, flexWrap: 'wrap' }}>
            {/* Avatar */}
            <div style={{ width: 88, height: 88, borderRadius: '50%', background: 'linear-gradient(135deg,#F59E0B,#FB923C)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, fontWeight: 900, color: '#000', flexShrink: 0 }}>
              {initials}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap', marginBottom: 8 }}>
                <h1 style={{ fontSize: 36, fontWeight: 900, margin: 0, color: '#F8FAFC', letterSpacing: '-0.5px' }}>{user.name || 'Unknown User'}</h1>
                <span style={{ padding: '5px 14px', borderRadius: 99, fontSize: 14, fontWeight: 700, background: isPaid ? 'rgba(16,185,129,0.15)' : 'rgba(239,68,68,0.15)', color: isPaid ? '#10B981' : '#EF4444', border: `1px solid ${isPaid ? 'rgba(16,185,129,0.3)' : 'rgba(239,68,68,0.3)'}` }}>
                  {isPaid ? '✓ Paid' : '✗ Unpaid'}
                </span>
                {r && <span style={{ padding: '5px 14px', borderRadius: 99, fontSize: 14, fontWeight: 700, background: 'rgba(99,102,241,0.15)', color: '#818CF8', border: '1px solid rgba(99,102,241,0.3)' }}>AI Report Ready</span>}
                {user.pdf_url && <span style={{ padding: '5px 14px', borderRadius: 99, fontSize: 14, fontWeight: 700, background: 'rgba(59,130,246,0.15)', color: '#60A5FA', border: '1px solid rgba(59,130,246,0.3)' }}>PDF Generated</span>}
              </div>
              <p style={{ color: '#64748B', margin: '0 0 12px', fontSize: 18 }}>{user.email}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
                {user.phone && <span style={{ color: '#94A3B8', fontSize: 17 }}>📞 {user.phone}</span>}
                {user.age && <span style={{ color: '#94A3B8', fontSize: 17 }}>🎂 Age {user.age}</span>}
                {user.city && <span style={{ color: '#94A3B8', fontSize: 17 }}>📍 {user.city}</span>}
                {user.created_at && <span style={{ color: '#94A3B8', fontSize: 17 }}>🗓 {new Date(user.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>}
              </div>
            </div>
            {currentPdfUrl && (
              <a className="pdf-link" href={currentPdfUrl} target="_blank" rel="noreferrer" style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: 10, padding: '14px 26px', background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.25)', borderRadius: 12, color: '#60A5FA', fontWeight: 700, fontSize: 17, textDecoration: 'none', transition: 'all 0.2s' }}>
                📄 View PDF Report
              </a>
            )}
          </div>
        </div>

        {/* ── STATS ROW ── */}
        <div className="aud three-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 16, marginBottom: 24 }}>
          <StatBadge label="Overall Score" value={r ? `${score} / 100` : 'N/A'} color={scoreColor} />
          <StatBadge label="Rating" value={rating} color="#F59E0B" />
          <StatBadge label="Temp Password" value={user.temp_password || '—'} color="#94A3B8" />
          <StatBadge label="Assessment" value={r ? 'Completed' : 'Pending'} color={r ? '#10B981' : '#F59E0B'} />
        </div>

        {/* ── SCORE + RISK + STRENGTHS ── */}
        {r && (
          <div className="aud two-col" style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 20, marginBottom: 24 }}>
            {/* Score ring */}
            <SectionCard icon="🧠" title="Cognitive Score">
              <div style={{ textAlign: 'center' }}>
                <div style={{ width: 150, height: 150, borderRadius: '50%', background: `conic-gradient(${scoreColor} ${score * 3.6}deg, rgba(255,255,255,0.04) 0deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                  <div style={{ width: 122, height: 122, borderRadius: '50%', background: '#0F172A', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <span style={{ fontSize: 52, fontWeight: 900, color: '#F8FAFC', lineHeight: 1 }}>{score}</span>
                    <span style={{ fontSize: 16, color: '#475569', fontWeight: 600 }}>/ 100</span>
                  </div>
                </div>
                <span style={{ padding: '6px 20px', borderRadius: 99, fontSize: 16, fontWeight: 700, background: `${scoreColor}18`, color: scoreColor, border: `1px solid ${scoreColor}40` }}>{rating}</span>
              </div>
            </SectionCard>

            {/* Risk + Strengths side by side */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <SectionCard icon="⚠️" title="Risk Indicators">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {(r.riskIndicators ?? []).length > 0 ? r.riskIndicators.map((ri, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, padding: '12px 16px', background: 'rgba(239,68,68,0.07)', border: '1px solid rgba(239,68,68,0.15)', borderRadius: 10 }}>
                      <span style={{ color: '#EF4444', flexShrink: 0 }}>●</span>
                      <span style={{ color: '#CBD5E1', fontSize: 17, lineHeight: 1.6 }}>{ri}</span>
                    </div>
                  )) : (
                    <div style={{ padding: '12px 16px', background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.18)', borderRadius: 10, color: '#10B981', fontSize: 17, fontWeight: 600 }}>✓ No significant risks</div>
                  )}
                </div>
              </SectionCard>
              <SectionCard icon="★" title="Key Strengths">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {(r.strengths ?? []).length > 0 ? r.strengths.map((s, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, padding: '12px 16px', background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 10 }}>
                      <span style={{ color: '#10B981', flexShrink: 0 }}>★</span>
                      <span style={{ color: '#CBD5E1', fontSize: 17, lineHeight: 1.6 }}>{s}</span>
                    </div>
                  )) : <p style={{ color: '#475569', fontSize: 17 }}>No strengths listed.</p>}
                </div>
              </SectionCard>
            </div>
          </div>
        )}

        {/* ── DOMAIN SCORES ── */}
        {domains.length > 0 && (
          <SectionCard icon="📊" title="Domain Scores" style={{ marginBottom: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(160px,1fr))', gap: 14 }}>
              {domains.map(([key, val], i) => {
                const pct = Math.round(val);
                const col = pct >= 75 ? '#10B981' : pct >= 50 ? '#6366F1' : '#EF4444';
                return (
                  <div key={i} style={{ padding: '18px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 14, border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
                      <span style={{ color: '#94A3B8', fontSize: 16, fontWeight: 600, textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span style={{ color: col, fontWeight: 800, fontSize: 19 }}>{pct}</span>
                    </div>
                    <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: col, borderRadius: 99, transition: 'width 1s ease' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        )}

        {/* ── CHARTS ── */}
        {(radarData.length > 0 || barData.length > 0) && (
          <div className="aud two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            {radarData.length > 0 && (
              <SectionCard title="Cognitive Functions Profile" icon="🕸">
                <div style={{ height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData}>
                      <PolarGrid stroke="rgba(255,255,255,0.05)" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 11, fontFamily: 'Inter' }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#1E293B', fontSize: 10 }} axisLine={false} tickCount={5} />
                      <Radar dataKey="A" stroke="#F59E0B" fill="rgba(245,158,11,0.12)" strokeWidth={2} dot={{ fill: '#F59E0B', r: 3 }} />
                      <Tooltip contentStyle={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#F8FAFC', fontSize: 12, fontFamily: 'Inter' }} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </SectionCard>
            )}
            {barData.length > 0 && (
              <SectionCard title="Lifestyle Impact Scores" icon="📈">
                <div style={{ height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} margin={{ top: 8, right: 8, left: -20, bottom: 48 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                      <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 11, fontFamily: 'Inter' }} interval={0} angle={-25} textAnchor="end" axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: '#475569', fontSize: 10 }} axisLine={false} tickLine={false} domain={[0, 100]} />
                      <Tooltip contentStyle={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 10, color: '#F8FAFC', fontSize: 12 }} />
                      <Bar dataKey="value" radius={[5, 5, 0, 0]} maxBarSize={40}>
                        {barData.map((_, i) => <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </SectionCard>
            )}
          </div>
        )}

        {/* ── COG AGE + LIFESTYLE ── */}
        {r && (
          <div className="aud two-col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
            {cogAge && (
              <SectionCard icon="🧬" title="Cognitive Age Estimate">
                <div style={{ display: 'flex', gap: 14 }}>
                  <div style={{ flex: 1, textAlign: 'center', padding: '24px 16px', background: 'rgba(99,102,241,0.07)', borderRadius: 14, border: '1px solid rgba(99,102,241,0.15)' }}>
                    <p style={{ color: '#475569', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, margin: '0 0 8px' }}>Actual Age</p>
                    <p style={{ color: '#F8FAFC', fontSize: 48, fontWeight: 900, margin: 0, lineHeight: 1 }}>{cogAge.actualAge}</p>
                    <p style={{ color: '#475569', fontSize: 16, margin: '6px 0 0' }}>years old</p>
                  </div>
                  <div style={{ flex: 1, textAlign: 'center', padding: '24px 16px', background: 'rgba(16,185,129,0.07)', borderRadius: 14, border: '1px solid rgba(16,185,129,0.15)' }}>
                    <p style={{ color: '#475569', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1.5, margin: '0 0 8px' }}>Cognitive Age</p>
                    <p style={{ color: '#10B981', fontSize: 48, fontWeight: 900, margin: 0, lineHeight: 1 }}>{cogAge.estimatedCognitiveAge ?? '—'}</p>
                    <p style={{ color: '#475569', fontSize: 16, margin: '6px 0 0' }}>estimated</p>
                  </div>
                </div>
                {cogAge.disclaimer && <p style={{ color: '#475569', fontSize: 16, margin: '14px 0 0', lineHeight: 1.6, fontStyle: 'italic' }}>ⓘ {cogAge.disclaimer}</p>}
              </SectionCard>
            )}
            {lifestyleImpacts.length > 0 && (
              <SectionCard icon="🌿" title="Lifestyle Assessment">
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {lifestyleImpacts.map(([key, val], i) => {
                    const col = val === 'High' ? '#EF4444' : val === 'Moderate' ? '#F59E0B' : '#10B981';
                    return (
                      <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '13px 18px', background: `${col}0d`, border: `1px solid ${col}25`, borderRadius: 10 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{ width: 9, height: 9, borderRadius: '50%', background: col, flexShrink: 0 }} />
                          <span style={{ color: '#CBD5E1', fontSize: 17, fontWeight: 600 }}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                        </div>
                        <span style={{ background: `${col}20`, color: col, border: `1px solid ${col}40`, padding: '4px 16px', borderRadius: 99, fontSize: 15, fontWeight: 700 }}>{val}</span>
                      </div>
                    );
                  })}
                </div>
              </SectionCard>
            )}
          </div>
        )}

        {/* ── RECOMMENDATIONS ── */}
        {(r?.recommendations ?? []).length > 0 && (
          <SectionCard icon="💡" title="Personalized Recommendations" style={{ marginBottom: 24 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 12 }}>
              {r.recommendations.map((rec, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, padding: '16px 20px', background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.1)', borderRadius: 12 }}>
                  <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'rgba(245,158,11,0.15)', border: '1px solid rgba(245,158,11,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#F59E0B', fontSize: 15, fontWeight: 800 }}>{i + 1}</div>
                  <span style={{ color: '#94A3B8', fontSize: 18, lineHeight: 1.7 }}>{rec}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        )}

        {/* ── ASSESSMENT HISTORY ── */}
        {(user.assessments && user.assessments.length > 0) && (
          <SectionCard icon="🕒" title={`Assessment History (${user.assessments.length})`} style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {user.assessments.map((assessment, i) => {
                const date = new Date(assessment.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
                const scr = assessment.report_json?.overall?.score || 'N/A';
                const rat = assessment.report_json?.overall?.rating || 'N/A';
                return (
                  <div key={assessment.id || i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }}>
                    <div>
                      <h4 style={{ margin: '0 0 6px', color: '#F8FAFC', fontSize: 17, fontWeight: 700 }}>Assessment {user.assessments.length - i}</h4>
                      <p style={{ margin: 0, color: '#94A3B8', fontSize: 14 }}>{date}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ color: '#F8FAFC', fontWeight: 800, fontSize: 18 }}>Score: {scr}</div>
                        <div style={{ color: '#F59E0B', fontSize: 14, fontWeight: 600 }}>{rat}</div>
                      </div>
                      {assessment.pdf_url ? (
                        <a href={assessment.pdf_url} target="_blank" rel="noreferrer" style={{ padding: '8px 16px', background: 'rgba(59,130,246,0.1)', color: '#60A5FA', border: '1px solid rgba(59,130,246,0.25)', borderRadius: 8, textDecoration: 'none', fontWeight: 600, fontSize: 14 }}>
                          View PDF
                        </a>
                      ) : (
                        <span style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.05)', color: '#64748B', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontWeight: 600, fontSize: 14 }}>
                          No PDF
                        </span>
                      )}
                      <button 
                        disabled={activeAssessmentId === assessment.id}
                        onClick={() => { setActiveAssessmentId(assessment.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        style={{ padding: '8px 16px', background: activeAssessmentId === assessment.id ? 'rgba(255,255,255,0.05)' : 'rgba(16,185,129,0.15)', color: activeAssessmentId === assessment.id ? '#64748B' : '#10B981', border: activeAssessmentId === assessment.id ? '1px solid rgba(255,255,255,0.1)' : '1px solid rgba(16,185,129,0.3)', borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: activeAssessmentId === assessment.id ? 'default' : 'pointer' }}
                      >
                        {activeAssessmentId === assessment.id ? 'Viewing' : 'View Data'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCard>
        )}

        {/* ── NO REPORT ── */}
        {!r && (
          <SectionCard style={{ textAlign: 'center', padding: '56px 32px' }}>
            <div style={{ fontSize: 52, marginBottom: 18 }}>📋</div>
            <h3 style={{ color: '#475569', fontSize: 20, margin: '0 0 10px', fontWeight: 700 }}>No AI Report Yet</h3>
            <p style={{ color: '#334155', fontSize: 14 }}>This user hasn't completed their cognitive assessment.</p>
          </SectionCard>
        )}

      </div>
    </div>
  );
}

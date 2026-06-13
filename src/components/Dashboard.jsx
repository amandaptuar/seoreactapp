import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  Cell
} from 'recharts';
import { supabase } from '../lib/supabase';
import { sendPdfEmail } from '../lib/emailService';

const Dashboard = () => {
  const [report, setReport] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboardData = async () => {
      const email = localStorage.getItem('userEmail');
      if (!email) { navigate('/'); return; }
      
      let hasReport = false;
      
      // 1. Try localStorage first (fast)
      const savedReport = localStorage.getItem('analysisReport');
      if (savedReport) {
        setReport(JSON.parse(savedReport));
        hasReport = true;
      }

      // 2. Always fetch latest from Supabase to check if PDF was already generated
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const { data: assessment } = await supabase
            .from('users')
            .select('report_json, pdf_url')
            .eq('id', userId)
            .maybeSingle();

          if (assessment) {
            if (assessment.report_json && !hasReport) {
              localStorage.setItem('analysisReport', JSON.stringify(assessment.report_json));
              setReport(assessment.report_json);
              hasReport = true;
            }
            if (assessment.pdf_url) {
              setPdfUrl(assessment.pdf_url);
            }
          }
        } catch (err) {
          console.error('Error fetching assessment from DB:', err);
        }
      }

      if (!hasReport) {
        navigate('/');
      }
    };
    loadDashboardData();
  }, [navigate]);

  const handleGeneratePdf = async () => {
    // If the PDF has already been generated, simply open the saved link
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
      return;
    }

    setIsGeneratingPdf(true);
    try {
      const response = await fetch('/api/v1/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analysis: report, brand: { primaryColor: '#3B82F6', accentColor: '#6366F1' } })
      });
      if (!response.ok) throw new Error('PDF generation failed');
      const blob = await response.blob();

      // 1. Trigger browser download
      const fileName = `Limitless_Cognitive_Report_${new Date().toISOString().split('T')[0]}.pdf`;
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', fileName);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);

      // 2. Upload PDF to Supabase Storage (non-blocking)
      const userId = localStorage.getItem('userId');
      if (userId) {
        try {
          const storagePath = `${userId}/${fileName}`;
          const { error: uploadErr } = await supabase.storage
            .from('pdf-reports')
            .upload(storagePath, blob, { contentType: 'application/pdf', upsert: true });

          if (!uploadErr) {
            const { data: { publicUrl } } = supabase.storage
              .from('pdf-reports')
              .getPublicUrl(storagePath);

            // 3. Save PDF URL to users table
            await supabase
              .from('users')
              .update({ pdf_url: publicUrl })
              .eq('id', userId);

            setPdfUrl(publicUrl);

            // 4. Send PDF link via email
            await sendPdfEmail({
              name: localStorage.getItem('name') || 'User',
              email: localStorage.getItem('userEmail'),
              pdfUrl: publicUrl,
            });
          }
        } catch (storageErr) {
          console.warn('PDF storage/email (non-fatal):', storageErr);
        }
      }
    } catch (error) {
      console.error(error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  if (!report) return (
    <div style={{ minHeight: '100vh', background: '#020617', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', border: '4px solid rgba(99,102,241,0.2)', borderTopColor: '#6366F1', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ color: '#94A3B8', fontFamily: 'Inter, sans-serif', fontSize: '22px' }}>Loading your report…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  const score = report.overall?.score ?? 0;
  const rating = report.overall?.rating ?? 'Pending';
  const scoreColor = rating.includes('Excellent') || rating.includes('Good') ? '#10B981' : rating.includes('Risk') || rating.includes('Critical') ? '#EF4444' : '#6366F1';

  const radarData = report.charts?.radarDomains?.labels?.map((label, i) => ({
    subject: label.replace('& ', '&\n'),
    A: report.charts.radarDomains.values[i],
    fullMark: 100
  })) ?? [];

  const barData = report.charts?.barLifestyleImpacts?.labels?.map((label, i) => ({
    name: label,
    value: report.charts.barLifestyleImpacts.values[i]
  })) ?? [];

  const BAR_COLORS = ['#6366F1', '#3B82F6', '#8B5CF6', '#F59E0B'];

  const lifestyleImpacts = report.lifestyleImpacts ? Object.entries(report.lifestyleImpacts) : [];
  const domains = report.domains ? Object.entries(report.domains) : [];
  let cogAge = report.cognitiveAge;
  if (!cogAge || !cogAge.estimatedCognitiveAge) {
    const userAge = parseInt(localStorage.getItem('userAge'), 10) || 25;
    const estAge = Math.max(18, userAge + Math.round((70 - score) / 1.5));
    cogAge = {
      actualAge: cogAge?.actualAge || userAge,
      estimatedCognitiveAge: estAge,
      disclaimer: cogAge?.disclaimer || 'Calculated based on your overall cognitive score compared to standard age baselines.'
    };
  }
  const audit = report.audit;
  const privacy = report.privacy;

  return (
    <div style={{ minHeight: '100vh', background: '#020617', fontFamily: "'Inter', -apple-system, sans-serif", color: '#F8FAFC' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; }
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .dash-card { animation: fadeInUp 0.5s ease forwards; transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .dash-card:hover { transform: translateY(-4px); box-shadow: 0 24px 48px rgba(15,23,42,0.1) !important; }
        .dash-btn-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(99, 102, 241, 0.5) !important; }
        .dash-btn-ghost:hover { background: rgba(255,255,255,0.08) !important; color: #fff !important; }
        .dash-pill-badge { display: inline-flex; align-items: center; gap: 6px; padding: 4px 12px; border-radius: 99px; font-size: 13px; font-weight: 600; }
        @media (max-width: 1024px) {
          .dash-grid-3 { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 768px) {
          .dash-grid-3 { grid-template-columns: 1fr !important; }
          .dash-grid-2 { grid-template-columns: 1fr !important; }
          .dash-header-row { flex-direction: column !important; align-items: flex-start !important; }
          .dash-header-btns { width: 100%; flex-direction: column !important; }
          .dash-header-btns button { width: 100% !important; justify-content: center !important; }
          .dash-title { font-size: 28px !important; }
          .dash-score-num { font-size: 52px !important; }
          .dash-section-pad { padding: 16px !important; }
        }
        @media (max-width: 480px) {
          .dash-container { padding: 0 16px 60px !important; }
          .dash-section-pad { padding: 12px !important; }
        }
      `}</style>

      {/* Ambient background blobs */}
      <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '-10%', width: '500px', height: '500px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)' }} />
      </div>

      <div className="dash-container" style={{ position: 'relative', zIndex: 1, maxWidth: '1320px', margin: '0 auto', padding: '100px 32px 80px' }}>

        {/* ── HEADER ── */}
        <div className="dash-card dash-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #F59E0B, #FB923C)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px' }}>🧠</div>
              <span style={{ color: '#6366F1', fontSize: '19px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px' }}>Cognitive Wellness Report</span>
            </div>
            <h1 className="dash-title" style={{ fontSize: '44px', fontWeight: '900', margin: 0, color: '#F8FAFC', letterSpacing: '-1px', lineHeight: '1.1' }}>
              Your Cognitive Analysis
            </h1>
            <p style={{ color: '#94A3B8', margin: '10px 0 0', fontSize: '22px', fontWeight: '500' }}>
              Personalized insights powered by AI · {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <div className="dash-header-btns" style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
            <button className="dash-btn-ghost" onClick={() => navigate('/')} style={{ padding: '12px 20px', background: 'rgba(15, 23, 42, 0.7)', color: '#94A3B8', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '12px', fontWeight: '600', fontSize: '21px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s', fontFamily: 'inherit' }}>
              ← Home
            </button>
            <button className="dash-btn-primary" onClick={handleGeneratePdf} disabled={isGeneratingPdf} style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #6366F1, #3B82F6)', color: '#FFFFFF', border: 'none', borderRadius: '12px', fontWeight: '700', fontSize: '21px', cursor: isGeneratingPdf ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s', opacity: isGeneratingPdf ? 0.7 : 1, boxShadow: '0 8px 24px rgba(99,102,241,0.35)', fontFamily: 'inherit' }}>
              {isGeneratingPdf ? (
                <><div style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Generating…</>
              ) : (
                <>{pdfUrl ? '📄 View PDF' : '⬇ Download PDF'}</>
              )}
            </button>
          </div>
        </div>

        {/* ── SCORE HERO SECTION ── */}
        <div className="dash-card" style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(99,102,241,0.25)', borderRadius: '28px', padding: '40px', marginBottom: '28px', backdropFilter: 'blur(20px)', boxShadow: '0 20px 60px rgba(0,0,0,0.4)' }}>
          <div className="dash-grid-3" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px', alignItems: 'center' }}>
            
            {/* Big Score */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '160px', height: '160px', borderRadius: '50%', background: `conic-gradient(${scoreColor} ${score * 3.6}deg, rgba(255,255,255,0.05) 0deg)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', position: 'relative' }}>
                <div style={{ width: '130px', height: '130px', borderRadius: '50%', background: 'rgba(15, 23, 42, 0.7)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="dash-score-num" style={{ fontSize: '54px', fontWeight: '900', color: '#F8FAFC', lineHeight: 1 }}>{score}</span>
                  <span style={{ fontSize: '19px', color: '#94A3B8', fontWeight: '600' }}>/ 100</span>
                </div>
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: `rgba(${scoreColor === '#10B981' ? '16,185,129' : scoreColor === '#EF4444' ? '239,68,68' : '99,102,241'}, 0.15)`, padding: '6px 16px', borderRadius: '99px', border: `1px solid ${scoreColor}40` }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: scoreColor }} />
                <span style={{ color: scoreColor, fontWeight: '700', fontSize: '21px' }}>{rating}</span>
              </div>
            </div>

            {/* Risk Indicators */}
            <div>
              <p style={{ color: '#94A3B8', fontSize: '18px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 16px' }}>Risk Indicators</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(report.riskIndicators ?? []).length > 0 ? report.riskIndicators.map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px 14px', background: 'rgba(239,68,68,0.08)', borderRadius: '10px', border: '1px solid rgba(239,68,68,0.2)' }}>
                    <span style={{ color: '#EF4444', flexShrink: 0, marginTop: '1px' }}>⚠</span>
                    <span style={{ color: '#E2E8F0', fontSize: '20px', lineHeight: '1.5', fontWeight: '500' }}>{r}</span>
                  </div>
                )) : (
                  <div style={{ padding: '12px 14px', background: 'rgba(16,185,129,0.08)', borderRadius: '10px', border: '1px solid rgba(16,185,129,0.2)', color: '#10B981', fontSize: '20px', fontWeight: '600' }}>✓ No significant risks detected</div>
                )}
              </div>
            </div>

            {/* Key Strengths */}
            <div>
              <p style={{ color: '#94A3B8', fontSize: '18px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 16px' }}>Key Strengths</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(report.strengths ?? []).map((s, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '12px 14px', background: 'rgba(16,185,129,0.08)', borderRadius: '10px', border: '1px solid rgba(16,185,129,0.2)' }}>
                    <span style={{ color: '#10B981', flexShrink: 0 }}>★</span>
                    <span style={{ color: '#E2E8F0', fontSize: '20px', lineHeight: '1.5', fontWeight: '500' }}>{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── DOMAIN SCORES ── */}
        {domains.length > 0 && (
          <div className="dash-card" style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: '32px', marginBottom: '28px', backdropFilter: 'blur(20px)', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}>
            <h2 style={{ color: '#94A3B8', fontSize: '18px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 24px' }}>Domain Scores</h2>
            <div className="dash-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
              {domains.map(([key, val], i) => {
                const pct = Math.round(val);
                const col = pct >= 75 ? '#10B981' : pct >= 50 ? '#6366F1' : '#EF4444';
                return (
                  <div key={i} style={{ padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <span style={{ color: '#94A3B8', fontSize: '19px', fontWeight: '600', textTransform: 'capitalize' }}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span style={{ color: col, fontSize: '21px', fontWeight: '800' }}>{pct}</span>
                    </div>
                    <div style={{ height: '6px', background: '#E2E8F0', borderRadius: '99px', overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: col, borderRadius: '99px', transition: 'width 1s ease' }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ── CHARTS ── */}
        <div className="dash-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '28px' }}>
          
          {/* Radar Chart */}
          <div className="dash-card" style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: '32px', backdropFilter: 'blur(20px)', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}>
            <h2 style={{ color: '#94A3B8', fontSize: '18px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 24px' }}>Cognitive Functions Profile</h2>
            <div style={{ height: '340px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="58%" data={radarData}>
                  <defs>
                    <radialGradient id="radarGrad" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#6366F1" stopOpacity={0.6} />
                      <stop offset="100%" stopColor="#3B82F6" stopOpacity={0.2} />
                    </radialGradient>
                  </defs>
                  <PolarGrid stroke="rgba(255,255,255,0.06)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748B', fontSize: 15, fontWeight: 600, fontFamily: 'Inter, sans-serif' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: '#334155', fontSize: 13 }} axisLine={false} tickCount={5} />
                  <Radar name="Score" dataKey="A" stroke="#6366F1" fill="url(#radarGrad)" strokeWidth={2} dot={{ fill: '#6366F1', r: 3 }} />
                  <Tooltip contentStyle={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', color: '#F8FAFC', fontSize: '20px', fontFamily: 'Inter, sans-serif' }} itemStyle={{ color: '#6366F1', fontWeight: 700 }} labelStyle={{ color: '#94A3B8', marginBottom: '4px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="dash-card" style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: '32px', backdropFilter: 'blur(20px)', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}>
            <h2 style={{ color: '#94A3B8', fontSize: '18px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 24px' }}>Lifestyle Impact Scores</h2>
            <div style={{ height: '340px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 8, right: 8, left: -20, bottom: 60 }}>
                  <defs>
                    {BAR_COLORS.map((c, i) => (
                      <linearGradient key={i} id={`bg${i}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor={c} stopOpacity={0.9} />
                        <stop offset="100%" stopColor={c} stopOpacity={0.3} />
                      </linearGradient>
                    ))}
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: '#64748B', fontSize: 16, fontWeight: 600, fontFamily: 'Inter, sans-serif' }} interval={0} angle={-30} textAnchor="end" axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: '#64748B', fontSize: 15, fontFamily: 'Inter, sans-serif' }} axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip contentStyle={{ background: '#0F172A', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '10px', color: '#F8FAFC', fontSize: '20px', fontFamily: 'Inter, sans-serif' }} itemStyle={{ fontWeight: 700 }} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={52}>
                    {barData.map((_, i) => (
                      <Cell key={i} fill={`url(#bg${i % BAR_COLORS.length})`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* ── COGNITIVE AGE ROW ── */}
        <div className="dash-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px', marginBottom: '28px' }}>

          {/* Cognitive Age */}
          {cogAge && (
            <div className="dash-card" style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: '32px', backdropFilter: 'blur(20px)', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}>
              <h2 style={{ color: '#94A3B8', fontSize: '18px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 24px' }}>🧬 Cognitive Age Estimate</h2>
              <div style={{ display: 'flex', gap: '20px', alignItems: 'stretch', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, textAlign: 'center', padding: '20px', background: 'rgba(99,102,241,0.08)', borderRadius: '16px', border: '1px solid rgba(99,102,241,0.15)' }}>
                  <p style={{ color: '#94A3B8', fontSize: '17px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px' }}>Actual Age</p>
                  <p style={{ color: '#F8FAFC', fontSize: '46px', fontWeight: '900', margin: 0, lineHeight: 1 }}>{cogAge.actualAge}</p>
                  <p style={{ color: '#94A3B8', fontSize: '18px', margin: '4px 0 0' }}>years old</p>
                </div>
                <div style={{ flex: 1, textAlign: 'center', padding: '20px', background: cogAge.estimatedCognitiveAge ? 'rgba(16,185,129,0.08)' : 'rgba(255,255,255,0.03)', borderRadius: '16px', border: `1px solid ${cogAge.estimatedCognitiveAge ? 'rgba(16,185,129,0.2)' : '#E2E8F0'}` }}>
                  <p style={{ color: '#94A3B8', fontSize: '17px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px' }}>Cognitive Age</p>
                  <p style={{ color: cogAge.estimatedCognitiveAge ? '#10B981' : '#475569', fontSize: '46px', fontWeight: '900', margin: 0, lineHeight: 1 }}>
                    {cogAge.estimatedCognitiveAge ?? '—'}
                  </p>
                  <p style={{ color: '#94A3B8', fontSize: '18px', margin: '4px 0 0' }}>{cogAge.estimatedCognitiveAge ? 'estimated' : 'not calculated'}</p>
                </div>
              </div>
              {cogAge.disclaimer && (
                <p style={{ color: '#475569', fontSize: '18px', margin: '16px 0 0', lineHeight: '1.6', fontStyle: 'italic' }}>ⓘ {cogAge.disclaimer}</p>
              )}
            </div>
          )}
        </div>

        {/* ── BOTTOM: RECOMMENDATIONS + LIFESTYLE ── */}
        <div className="dash-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '28px' }}>
          
          {/* Recommendations */}
          <div className="dash-card" style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: '32px', backdropFilter: 'blur(20px)', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}>
            <h2 style={{ color: '#94A3B8', fontSize: '18px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 24px' }}>Personalized Recommendations</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {(report.recommendations ?? []).map((rec, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px 16px', background: 'rgba(99,102,241,0.06)', borderRadius: '12px', border: '1px solid rgba(99,102,241,0.12)' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#6366F1', fontSize: '19px', fontWeight: '800' }}>{i + 1}</div>
                  <span style={{ color: '#CBD5E1', fontSize: '20px', lineHeight: '1.6', fontWeight: '500' }}>{rec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Lifestyle Assessment */}
          <div className="dash-card" style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '24px', padding: '32px', backdropFilter: 'blur(20px)', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }}>
            <h2 style={{ color: '#94A3B8', fontSize: '18px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 24px' }}>Lifestyle Assessment</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {lifestyleImpacts.map(([key, val], i) => {
                const levelColor = val === 'High' ? '#EF4444' : val === 'Moderate' ? '#F59E0B' : '#10B981';
                const bgColor = val === 'High' ? 'rgba(239,68,68,0.08)' : val === 'Moderate' ? 'rgba(245,158,11,0.08)' : 'rgba(16,185,129,0.08)';
                const borderColor = val === 'High' ? 'rgba(239,68,68,0.2)' : val === 'Moderate' ? 'rgba(245,158,11,0.2)' : 'rgba(16,185,129,0.2)';
                return (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 18px', background: bgColor, borderRadius: '12px', border: `1px solid ${borderColor}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: levelColor, boxShadow: `0 0 6px ${levelColor}` }} />
                      <span style={{ color: '#E2E8F0', fontSize: '21px', fontWeight: '600' }}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                    </div>
                    <span style={{ background: `${levelColor}20`, color: levelColor, border: `1px solid ${levelColor}50`, padding: '4px 14px', borderRadius: '99px', fontSize: '19px', fontWeight: '700' }}>{val}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── AUDIT + PRIVACY ROW ── */}
        {(audit || privacy) && (
          <div className="dash-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '28px' }}>

            {/* Audit */}
            {audit && (
              <div className="dash-card" style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '28px', backdropFilter: 'blur(20px)' }}>
                <h2 style={{ color: '#94A3B8', fontSize: '17px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>🔍 Audit Metadata</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {[
                    ['Rules Version', audit.rules_version],
                    ['Age Cohort', audit.age_cohort],
                    ['Clamped Values', (audit.clamped_values ?? []).length === 0 ? 'None' : audit.clamped_values.join(', ')],
                    ['Imputation Notes', (audit.imputation_notes ?? []).length === 0 ? 'None' : audit.imputation_notes.join(', ')],
                    ['Insufficient Sections', (audit.insufficient_sections ?? []).length === 0 ? 'None' : audit.insufficient_sections.join(', ')],
                  ].map(([label, val], i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', background: '#020617', borderRadius: '8px', gap: '12px' }}>
                      <span style={{ color: '#475569', fontSize: '19px', fontWeight: '600' }}>{label}</span>
                      <span style={{ color: '#94A3B8', fontSize: '19px', fontWeight: '700', textAlign: 'right' }}>{val ?? '—'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Privacy */}
            {privacy && (
              <div className="dash-card" style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '28px', backdropFilter: 'blur(20px)' }}>
                <h2 style={{ color: '#94A3B8', fontSize: '17px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', margin: '0 0 20px' }}>🔐 Privacy & Data</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {privacy.dataCollected && (
                    <div>
                      <p style={{ color: '#475569', fontSize: '17px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px' }}>Data Collected</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {privacy.dataCollected.map((d, i) => (
                          <span key={i} style={{ padding: '3px 12px', background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)', borderRadius: '99px', color: '#94A3B8', fontSize: '18px', fontWeight: '600' }}>{d}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {privacy.storagePolicy && (
                    <div>
                      <p style={{ color: '#475569', fontSize: '17px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 8px' }}>Storage Policy</p>
                      <p style={{ color: '#94A3B8', fontSize: '19px', margin: 0, lineHeight: '1.6' }}>{privacy.storagePolicy}</p>
                    </div>
                  )}
                  {privacy.hipaaNote && (
                    <div style={{ padding: '12px 14px', background: 'rgba(16,185,129,0.06)', borderRadius: '10px', border: '1px solid rgba(16,185,129,0.15)' }}>
                      <p style={{ color: '#475569', fontSize: '17px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 6px' }}>HIPAA Note</p>
                      <p style={{ color: '#94A3B8', fontSize: '19px', margin: 0, lineHeight: '1.6' }}>{privacy.hipaaNote}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── DISCLAIMERS ── */}
        {(report.disclaimers ?? []).length > 0 && (
          <div className="dash-card" style={{ background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '20px', padding: '24px 32px', backdropFilter: 'blur(20px)' }}>
            <p style={{ color: '#475569', fontSize: '18px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 12px' }}>Disclaimers</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {report.disclaimers.map((d, i) => (
                <p key={i} style={{ color: '#475569', fontSize: '19px', margin: 0, lineHeight: '1.6' }}>• {d}</p>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Dashboard;

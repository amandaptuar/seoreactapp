import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  Cell, AreaChart, Area, PieChart, Pie
} from 'recharts';
import { supabase } from '../lib/supabase';
import { sendPdfEmail } from '../lib/emailService';
import { getApiUrl } from '../lib/apiUtils';
import { startLoggedInAssessment } from '../lib/assessmentFlow';
import FeedbackModal from './FeedbackModal';

// Paywall lock overlay component
const PaywallOverlay = () => (
  <div style={{
    position: 'absolute', inset: 0, zIndex: 10,
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(8px)',
    borderRadius: 'inherit',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center',
    gap: '12px',
    border: '1.5px solid rgba(99,102,241,0.25)',
  }}>
    <div style={{ fontSize: '36px' }}>🔒</div>
    <p style={{ color: '#0F172A', fontSize: '18px', fontWeight: '700', margin: 0, textAlign: 'center' }}>
      Complete Payment to Access Full Features
    </p>
    <p style={{ color: '#64748B', fontSize: '14px', margin: 0, textAlign: 'center', maxWidth: '260px', lineHeight: 1.5 }}>
      Unlock personalized recommendations, lifestyle insights, and your complete report.
    </p>
    <a href="/payment" style={{
      marginTop: '8px', padding: '10px 28px',
      background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
      color: '#FFFFFF', borderRadius: '12px',
      fontWeight: '700', fontSize: '15px',
      textDecoration: 'none', display: 'inline-block',
      boxShadow: '0 6px 20px rgba(99,102,241,0.4)',
      transition: 'transform 0.2s',
    }}>
      🚀 Upgrade Now
    </a>
  </div>
);

const Dashboard = () => {
  const [report, setReport] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [assessmentsHistory, setAssessmentsHistory] = useState([]);
  const [currentAssessmentId, setCurrentAssessmentId] = useState(null);
  const [isSwitchingAssessment, setIsSwitchingAssessment] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userAge, setUserAge] = useState('');
  const [userGender, setUserGender] = useState('');
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loadDashboardData = async () => {
      const email = sessionStorage.getItem('userEmail');
      if (!email) { navigate('/'); return; }

      let hasReport = false;

      // 1. Try sessionStorage first (fast)
      const savedReport = sessionStorage.getItem('analysisReport');
      if (savedReport) {
        setReport(JSON.parse(savedReport));
        hasReport = true;
      }
      
      // NOTE: Do NOT trust sessionStorage for payment status — only Supabase is the source of truth.
      // We reset it here so a stale cache never bypasses the paywall.
      setIsPaid(false);

      // 2. Always fetch latest from Supabase to check if PDF was already generated
      const userId = sessionStorage.getItem('userId');
      if (userId) {
        try {
          // Fetch user metadata
          const { data: userRecord } = await supabase
            .from('users')
            .select('payment_status, age, gender')
            .eq('id', userId)
            .maybeSingle();

          // Fetch all assessments history
          const { data: history } = await supabase
            .from('assessments')
            .select('*')
            .eq('user_id', userId)
            .order('created_at', { ascending: false });

          if (history && history.length > 0) {
            setAssessmentsHistory(history);
            const latestAssessment = history[0];
            setCurrentAssessmentId(latestAssessment.id);
            if (latestAssessment.report_json && !hasReport) {
              sessionStorage.setItem('analysisReport', JSON.stringify(latestAssessment.report_json));
              setReport(latestAssessment.report_json);
              hasReport = true;
            }
            if (latestAssessment.pdf_url) {
              setPdfUrl(latestAssessment.pdf_url);
            }
          }

          if (userRecord) {
            setUserAge(userRecord.age || '');
              setUserGender(userRecord.gender || '');
              sessionStorage.setItem('userAge', userRecord.age || '');
              sessionStorage.setItem('userGender', userRecord.gender || '');
              if (userRecord.payment_status === 'paid') {
              setIsPaid(true);
              sessionStorage.setItem('paymentStatus', 'yes');
            } else {
              // Clear any stale local cache
              setIsPaid(false);
              sessionStorage.removeItem('paymentStatus');
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

  const handleGeneratePdf = async (action = 'download') => {
    if (pdfUrl && isPaid) {
      if (action === 'share' && navigator.share) {
        try {
          await navigator.share({
            title: 'Cognitive Wellness Report',
            text: 'Check out my personalized AI cognitive wellness report from Limitless!',
            url: pdfUrl
          });
        } catch(err) {
          window.open(pdfUrl, '_blank');
        }
      } else {
        window.open(pdfUrl, '_blank');
      }
      return;
    }

    setIsGeneratingPdf(true);
    try {
      const endpoint = isPaid ? '/api/v1/generate-pdf' : '/api/v1/generate-teaser-pdf';
      const response = await fetch(getApiUrl(endpoint), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ analysis: report, brand: { primaryColor: '#3B82F6', accentColor: '#6366F1' } })
      });
      if (!response.ok) throw new Error('PDF generation failed');
      const blob = await response.blob();
      
      const dateStr = new Date().toISOString().split('T')[0];
      const uniqueSuffix = currentAssessmentId ? `_${currentAssessmentId}` : `_${Date.now()}`;
      const fileName = isPaid 
        ? `Limitless_Cognitive_Report_${dateStr}${uniqueSuffix}.pdf`
        : `Limitless_Cognitive_Teaser_${dateStr}${uniqueSuffix}.pdf`;

      const fallbackDownload = () => {
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', fileName);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
      };

      const file = new File([blob], fileName, { type: 'application/pdf' });
      // 2. Upload PDF to Supabase Storage (run in background so share block doesn't delay it)
      const userId = sessionStorage.getItem('userId');
      if (userId && isPaid) {
        supabase.storage
          .from('pdf-reports')
          .upload(`${userId}/${fileName}`, blob, { contentType: 'application/pdf', upsert: true })
          .then(async ({ error: uploadErr }) => {
            if (!uploadErr) {
              const { data: { publicUrl } } = supabase.storage
                .from('pdf-reports')
                .getPublicUrl(`${userId}/${fileName}`);

              if (currentAssessmentId) {
                await supabase.from('assessments').update({ pdf_url: publicUrl }).eq('id', currentAssessmentId);
                
                setAssessmentsHistory(prev => prev.map(a => 
                  a.id === currentAssessmentId ? { ...a, pdf_url: publicUrl } : a
                ));
              }
              setPdfUrl(publicUrl);
              
              await sendPdfEmail({
                name: sessionStorage.getItem('name') || 'User',
                email: sessionStorage.getItem('userEmail'),
                pdfUrl: publicUrl,
              }).catch(console.warn);
            }
          })
          .catch(console.warn);
      }

      // 3. Share or Download locally
      if (action === 'share' && navigator.canShare && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({
            files: [file],
            title: 'Cognitive Wellness Report',
            text: 'Check out my personalized AI cognitive wellness report from Limitless!'
          });
        } catch (err) {
          console.warn('Share failed or cancelled:', err);
          fallbackDownload();
        }
      } else {
        fallbackDownload();
      }
    } catch (error) {
      console.error(error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  if (!report) return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', border: '4px solid rgba(99,102,241,0.2)', borderTopColor: '#6366F1', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ color: '#64748B', fontFamily: 'Inter, sans-serif', fontSize: '22px' }}>Loading your report…</p>
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          .dash-card { padding: 16px !important; }
          .dash-header-row { padding: 16px !important; }
          .dash-title { font-size: 24px !important; }

          .amazon-overlay {
            position: fixed; top: 0; left: 0; right: 0; bottom: 0;
            background: rgba(15,23,42,0.6); backdrop-filter: blur(4px);
            z-index: 9998; opacity: 0; pointer-events: none;
            transition: all 0.3s ease;
          }
          .amazon-overlay.open { opacity: 1; pointer-events: all; }

                    .history-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 24px; }
          @media (max-width: 1400px) { .history-grid { grid-template-columns: repeat(4, 1fr); } }
          @media (max-width: 1024px) { .history-grid { grid-template-columns: repeat(3, 1fr); } }
          @media (max-width: 768px) { .history-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 480px) { .history-grid { grid-template-columns: repeat(1, 1fr); } }
          
          .dash-history-item { aspect-ratio: 1; display: flex !important; flex-direction: column !important; justify-content: space-between !important; }

          .amazon-sidebar {
            position: fixed; top: 0; left: -100vw; bottom: 0; width: 100vw; max-width: 100vw;
            background: #F8FAFC; z-index: 9999;
            overflow-y: auto; overflow-x: hidden;
            transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 4px 0 32px rgba(0,0,0,0.15);
          }
          .amazon-sidebar.open { left: 0; }
          
          .hamburger-btn {
            background: none; border: none; font-size: 28px; cursor: pointer;
            color: #0F172A; display: flex; align-items: center; justify-content: center;
            width: 44px; height: 44px; border-radius: 8px; transition: background 0.2s;
          }
          .hamburger-btn:hover { background: rgba(15,23,42,0.05); }
        
          .dash-history-box:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.08) !important; border-color: rgba(99,102,241,0.5) !important; }
          @media (max-width: 1400px) { .history-boxes-grid { grid-template-columns: repeat(4, 1fr) !important; } }
          @media (max-width: 1024px) { .history-boxes-grid { grid-template-columns: repeat(3, 1fr) !important; } }
          @media (max-width: 768px) { .history-boxes-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 480px) { .history-boxes-grid { grid-template-columns: repeat(1, 1fr) !important; aspect-ratio: auto !important; padding: 24px !important; } }

        `}</style>
      </div>
    </div>
  );

  const isDemo = sessionStorage.getItem('demoMode') === 'true';
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
    const userAge = parseInt(sessionStorage.getItem('userAge'), 10) || 25;
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
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif", color: 'var(--text-dark)', overflowX: 'hidden' }}>
      <style>{`
        :root{
          --bg:#eef0f7;
          --card:#ffffff;
          --border:#e7e9f2;
          --text-dark:#1f2430;
          --text-grey:#8a8fa3;
          --purple:#6c5ce7;
          --purple-light:#f1eefd;
          --purple-badge:#efe9fd;
          --green:#1ea672;
          --green-light:#eafaf3;
          --green-badge:#e4f8ee;
          --blue:#2f6fed;
          --blue-light:#eef4ff;
          --red:#e0455f;
          --orange:#f0a63a;
          --teal:#2bb3a3;
          --radius-lg:16px;
          --radius-md:12px;
          --radius-sm:8px;
          --shadow:0 2px 10px rgba(30,30,60,0.05);
        }
        * { box-sizing: border-box; }
        body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
        .topbar { background:linear-gradient(90deg, #151e2d 0%, #0c1222 100%); border-bottom:1px solid rgba(255,255,255,0.05); padding:20px 32px; display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:22px; flex-wrap:wrap; gap:16px; position:sticky; top:0; z-index:40; }
        .topbar-title-row { display:flex; align-items:center; gap:12px; }
        .hamburger { display:none; width:40px;height:40px; flex-shrink:0; border-radius:10px; border:1px solid #374151; background:#1A2035; align-items:center; justify-content:center; cursor:pointer; box-shadow:var(--shadow); }
        .hamburger span, .hamburger span::before, .hamburger span::after { content:""; display:block; width:18px;height:2px; background:#fff; border-radius:2px; position:relative; transition:all .2s ease; }
        .hamburger span::before{ position:absolute; top:-6px; }
        .hamburger span::after{ position:absolute; top:6px; }
        .topbar h1 { font-size:28px; margin:0 0 4px 0; font-weight:700; color: #fff; }
        .topbar p { margin:0; color: #9ca3af; font-size:14px; }
        .topbar-actions { display:flex; gap:10px; flex-wrap:wrap; }
        .btn { display:flex; align-items:center; gap:8px; padding:10px 18px; border-radius:10px; font-size:14px; font-weight:600; border:none; cursor:pointer; white-space:nowrap; }
        .btn-green { background:#1fa96a; color:#fff; }
        .btn-blue { background:#2f6fed; color:#fff; }
        .btn-purple { background:#6c5ce7; color:#fff; }
        .btn-outline-red { background:transparent; color:#ef4444; border:1px solid #374151; transition:all 0.2s; }
        .btn-outline-red:hover { background:rgba(239,68,68,0.1); color:#f87171; border-color:rgba(239,68,68,0.3); }
        .main-wrapper { margin-left:280px; width:calc(100% - 280px); min-height:100vh; display:flex; flex-direction:column; }
        .layout-content { padding: 0 32px 28px; }
        .card { background:var(--card); border:1px solid var(--border); border-radius:var(--radius-lg); box-shadow:var(--shadow); padding:20px; }
        .card.sidebar { position:fixed; top:0; left:0; height:100vh; width:280px; border-radius:0; border:none; border-right:1px solid rgba(255,255,255,0.05); background:linear-gradient(180deg, #151e2d 0%, #0c1222 100%); color:#fff; z-index:50; display:flex; flex-direction:column; padding:0; overflow-y:auto; box-shadow: 4px 0 24px rgba(0,0,0,0.15); }
        .sidebar-overlay { display:none; position:fixed; inset:0; background:rgba(20,20,35,0.45); z-index:40; }
        .sidebar-overlay.active { display:block; }
        .sidebar-close { display:none; width:32px;height:32px; border-radius:8px; border:1px solid #374151; background:#1A2035; align-items:center; justify-content:center; cursor:pointer; font-size:16px; color:#fff; }
        
        .topbar { background:linear-gradient(90deg, #151e2d 0%, #0c1222 100%); border-bottom:1px solid rgba(255,255,255,0.05); padding:20px 32px; display:flex; justify-content:space-between; align-items:center; position:sticky; top:0; z-index:40; }
        .topbar-title-row { display:flex; align-items:center; gap:20px; }
        .topbar h1 { margin:0; font-size:26px; font-weight:800; color:#fff; letter-spacing:-0.5px; }
        .topbar p { margin:6px 0 0; color:#9ca3af; font-size:14.5px; }
        .topbar-actions { display:flex; gap:10px; flex-wrap:wrap; }
        .sidebar-header { display:flex; align-items:center; gap:10px; margin-bottom:16px; color:#fff; }
        .icon-circle { width:34px;height:34px; border-radius:50%; background:#1A2035; color:#fff; display:flex;align-items:center;justify-content:center; font-size:16px; flex-shrink:0; }
        .sidebar-header h3 { margin:0; font-size:16px; font-weight:700; color:#fff; }
        .assessment-item { background:#0F172A; border:1px solid #1A2035; border-radius:var(--radius-md); padding:14px 14px; margin-bottom:16px; cursor:pointer; transition:all 0.2s; color:#fff; }
        .assessment-item:hover { transform:translateY(-2px); box-shadow:0 4px 12px rgba(99,102,241,0.25); }
        .assessment-item-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; }
        .assessment-item-top span.title { font-weight:700; color:#fff; font-size:14px; }
        .score-pill { display:flex;align-items:center;gap:5px; font-weight:700;color:#fff;font-size:13px; }
        .score-pill::before { content:""; width:7px;height:7px;border-radius:50%; background:currentColor;display:inline-block; }
        .assessment-item .date { color:#9ca3af;font-size:12.5px; }
        .btn-view-all { width:100%; padding:11px; border-radius:10px; border:1px solid #374151; background:#1A2035; color:#fff; font-weight:600; font-size:14px; cursor:pointer; margin-top:24px; }
        .main { display:flex; flex-direction:column; gap:20px; }
        .profile-card { display:flex; justify-content:space-between; align-items:center; flex-wrap:nowrap; gap:40px; overflow-x:auto; }
        .profile-left { display:flex; align-items:center; gap:16px; flex-shrink: 0; }
        .avatar { width:56px;height:56px;border-radius:50%; background:var(--purple-light); color:var(--purple); display:flex;align-items:center;justify-content:center; font-size:22px;font-weight:700; flex-shrink:0; }
        .profile-name-row { display:flex;align-items:center;gap:10px;margin-bottom:4px; }
        .profile-name-row h2 { margin:0;font-size:18px; }
        .badge-paid { background:var(--green-badge); color:var(--green); font-size:12px;font-weight:700; padding:3px 10px;border-radius:20px; display:flex;align-items:center;gap:5px; }
        .badge-paid::before { content:"";width:6px;height:6px;border-radius:50%;background:var(--green); }
        .badge-free { background:#f1f5f9; color:#64748b; font-size:12px;font-weight:700; padding:3px 10px;border-radius:20px; display:flex;align-items:center;gap:5px; }
        .badge-free::before { content:"";width:6px;height:6px;border-radius:50%;background:#64748b; }
        .profile-email { color:var(--text-grey);font-size:13.5px;margin-bottom:8px; }
        .profile-meta { display:flex;gap:22px;font-size:13px;color:var(--text-dark); }
        .profile-meta span { display:flex;align-items:center;gap:6px;color:var(--text-grey); }
        .profile-stats { display:flex; gap:0; }
        .stat-block { padding:0 26px; border-left:1px solid var(--border); text-align:left; }
        .stat-block:first-child { border-left:none; }
        .stat-label { font-size:14px;color:var(--text-grey);margin-bottom:6px; font-weight:600; }
        .stat-value { font-size:24px;font-weight:800; }
        .stat-value.green { color:var(--green); }
        .stat-value.copy { display:flex;align-items:center;gap:6px;font-size:20px;color:var(--text-dark); font-weight:800; }
        .stat-value.check { display:flex;align-items:center;gap:6px; }
        .row-scores { display:flex; gap:20px; align-items:stretch; flex-wrap:wrap; }
        .score-panel { display:flex; flex:2; min-width:340px; flex-wrap:wrap; }
        .score-sub { flex:1; padding:16px 20px; border-right:1px solid var(--border); display:flex; flex-direction:row; align-items:center; text-align:left; justify-content:flex-start; gap: 16px; flex-wrap: wrap; }
        .score-sub:last-child { border-right:none; }
        .score-sub h4 { display:flex;align-items:center;gap:6px; font-size:16px;margin:0; white-space: nowrap; font-weight:700; }
        .score-sub.first h4 { align-self:center; }
        .gauge-wrap { position:relative;width:150px;height:150px; }
        .gauge-wrap svg { width:100%;height:100%; transform:rotate(-90deg); }
        .gauge-center { position:absolute;inset:0; display:flex;flex-direction:column;align-items:center;justify-content:center; }
        .gauge-center .num { font-size:28px;font-weight:800; color:var(--text-dark); }
        .gauge-center .den { font-size:13px;color:var(--text-grey); font-weight:600; }
        .gauge-good-badge { background:var(--green-badge);color:var(--green); font-size:14px;font-weight:700; padding:4px 14px;border-radius:20px; display:flex;align-items:center;gap:5px; margin-top:4px; }
        .gauge-good-badge::before { content:"";width:6px;height:6px;border-radius:50%;background:var(--green); }
        .risk-check { width:56px;height:56px;border-radius:50%; border:2px solid var(--green); display:flex;align-items:center;justify-content:center; color:var(--green);font-size:24px;margin:20px 0 14px 0; }
        .risk-text { font-size:15px;color:var(--text-dark); font-weight:600; }
        .strength-star { color:var(--purple);font-size:22px;margin:22px 0 12px 0; }
        .strength-text { display:flex;align-items:center;gap:6px;font-size:15px;color:var(--purple);font-weight:700; }
        .age-card { flex:1; min-width:260px; position:relative; overflow:hidden; }
        .age-card h4 { display:flex;align-items:center;gap:8px;margin:0 0 18px 0;font-size:16px; font-weight:700; }
        .age-values { display:flex; justify-content:space-between; margin-bottom:16px; }
        .age-values div { text-align:left; }
        .age-label { font-size:14px;color:var(--text-grey);margin-bottom:6px; font-weight:600; }
        .age-num { font-size:32px;font-weight:800; }
        .age-num.grey { color:var(--text-dark); }
        .age-num.purple { color:var(--purple); }
        .age-unit { font-size:14px;color:var(--text-grey); font-weight:600; }
        .age-note { font-size:13px;color:var(--text-grey); display:flex;gap:6px;align-items:flex-start; border-top:1px solid var(--border); padding-top:12px; font-weight:500; }
        .row-domain { display:flex;gap:20px;flex-wrap:wrap; }
        .domain-card { flex:2;min-width:420px; }
        .card-title { display:flex;align-items:center;gap:8px; font-size:18px;font-weight:800;margin:0 0 16px 0; color:var(--text-dark); }
        .domain-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
        .domain-box { border-radius:12px; padding:14px 16px; }
        .domain-box .label { font-size:14px;margin-bottom:8px;font-weight:700; }
        .domain-box .value { font-size:26px;font-weight:800;color:var(--text-dark); }
        .bg-orange{ background:#fdf1ec; } .fg-orange{ color:#e08c3e; }
        .bg-blue{ background:#eef2fb; } .fg-blue{ color:#5b7bd6; }
        .bg-green{ background:#eaf8f1; } .fg-green{ color:#22a06b; }
        .bg-purple{ background:#f2effc; } .fg-purple{ color:#7a5fe0; }
        .bg-peach{ background:#fdf3e7; } .fg-peach{ color:#e0a23e; }
        .bg-grey{ background:#eef0f5; } .fg-grey{ color:#6c7a94; }
        .bg-teal{ background:#e9f8f6; } .fg-teal{ color:#28a99a; }
        .bg-green2{ background:#eafaf0; } .fg-green2{ color:#1fa572; }
        .lifestyle-card { flex:1;min-width:320px; position:relative; overflow:hidden; }
        .lifestyle-item { display:flex;align-items:center;justify-content:space-between; padding:14px 0; border-bottom:1px solid var(--border); font-size:15px; font-weight:600; }
        .lifestyle-item:last-child { border-bottom:none; }
        .lifestyle-item .left { display:flex;align-items:center;gap:12px;color:var(--text-dark);font-weight:700; }
        .lifestyle-icon { font-size:18px; }
        .low-badge { background:var(--green-badge);color:var(--green); font-size:14px;font-weight:700; padding:4px 14px;border-radius:20px; }
        .row-radar { display:flex;gap:20px;flex-wrap:wrap; }
        .radar-card { flex:1;min-width:320px; }
        .reco-card { flex:1;min-width:320px; position:relative; overflow:hidden; }
        .reco-item { display:flex;gap:14px; padding:14px 0; align-items:flex-start; }
        .reco-num { width:28px;height:28px;border-radius:50%; color:#fff;font-size:14px;font-weight:800; display:flex;align-items:center;justify-content:center; flex-shrink:0;margin-top:2px; }
        .reco-num.n1 { background:#6c5ce7; }
        .reco-num.n2 { background:#1fa96a; }
        .reco-num.n3 { background:#f0a63a; }
        .reco-text { font-size:15px;color:var(--text-dark);line-height:1.6; font-weight:500; }
        
        .fade-overlay { position: fixed; inset: 0; background: rgba(248, 250, 252, 0.8); backdrop-filter: blur(4px); z-index: 9999; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity 0.3s ease; }
        .fade-overlay.visible { opacity: 1; pointer-events: all; }

        .dashboard-watermark {
          position: fixed;
          top: 50%;
          left: calc(50% + 140px);
          transform: translate(-50%, -50%);
          width: 60vw;
          height: 60vh;
          max-width: 600px;
          background-image: url(/img/limitless-logo.webp);
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          opacity: 0.15;
          pointer-events: none;
          z-index: 0;
        }

        @media (max-width: 900px){
          .desktop-only { display: none !important; }
          .mobile-only { display: block !important; }
          .dashboard-watermark { left: 50%; opacity: 0.10; }
          .hamburger { display:flex; }
          .main-wrapper { margin-left:0; width:100%; }
          .card.sidebar { transform:translateX(-100%); transition:transform .3s ease; max-width:85vw; width:320px; }
          .card.sidebar.open { transform:translateX(0); }
          .sidebar-close { display:flex; margin-left:auto; }
          .row-scores, .row-domain, .row-radar { flex-direction:column; }
          .score-panel { flex-direction:row; overflow-x:auto; padding-bottom: 10px; }
        }
        
        @media (max-width: 600px){
          /* Topbar adjustments */
          .topbar { padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.05); }
          .topbar h1 { font-size:22px; }
          .topbar-actions { width:100%; margin-top: 12px; display: flex; flex-direction: row; flex-wrap: nowrap; gap: 8px; }
          .topbar-actions .btn { flex:1; padding:10px 8px !important; font-size:13px !important; justify-content:center; text-align:center; white-space:nowrap; }
          .layout-content { padding: 0 16px 28px; }
          
          /* Card & Profile adjustments */
          .card { padding: 16px; border-radius: 12px; }
          .profile-card { flex-direction: column !important; align-items: flex-start !important; gap: 24px !important; overflow: hidden !important; }
          .profile-left { width: 100% !important; }
          .profile-stats { width: 100% !important; display: grid !important; grid-template-columns: 1fr 1fr !important; gap: 16px !important; flex-wrap: wrap !important; }
          .stat-block { border-left: none !important; padding: 0 !important; margin: 0 !important; border-top: 1px solid var(--border) !important; padding-top: 16px !important; }
          .stat-block:first-child { border-top: none !important; padding-top: 0 !important; }
          
          /* Score Panel (Cognitive Score & Risk) */
          .score-panel { flex-direction: column; width: 100%; min-width: 100%; padding: 0; overflow-x: hidden; }
          .score-sub { border-right: none; border-bottom: 1px solid var(--border); padding: 20px 0; min-width: 100%; justify-content: space-between; }
          .score-sub:last-child { border-bottom: none; padding-bottom: 0; }
          .gauge-wrap { width: 120px; height: 120px; }
          .gauge-center .num { font-size: 24px; }
          
          /* Grids */
          .domain-grid { grid-template-columns: 1fr 1fr !important; gap: 12px !important; }
          .domain-box { padding: 12px 10px !important; }
          .domain-box .label { font-size: 13px !important; margin-bottom: 4px !important; }
          .domain-box .value { font-size: 20px !important; }
          
          /* Age & Radar layout */
          .age-num { font-size: 26px; }
          .domain-card, .age-card, .lifestyle-card, .radar-card, .reco-card { min-width: 100% !important; width: 100% !important; flex: none !important; }
          .reco-item .reco-text { font-size: 14px; }
        }
        
        @media (max-width: 380px){
          .domain-grid { grid-template-columns: 1fr 1fr !important; gap: 8px !important; }
          .domain-box { padding: 10px 8px !important; }
          .domain-box .label { font-size: 11px !important; word-wrap: break-word; white-space: normal; }
          .domain-box .value { font-size: 18px !important; }
          .profile-stats { grid-template-columns: 1fr !important; }
          .stat-block { border-top: 1px solid var(--border) !important; padding-top: 12px !important; }
          .stat-block:first-child { border-top: none !important; padding-top: 0 !important; }
          .topbar-actions .btn { flex: 1 1 100%; }
        }
      `}</style>

      {/* Loading Overlay */}
      <div className={`fade-overlay ${isSwitchingAssessment ? 'visible' : ''}`}>
        <div style={{ width: '48px', height: '48px', border: '4px solid rgba(108,92,231,0.2)', borderTopColor: '#6c5ce7', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ color: '#1f2430', fontSize: '20px', fontWeight: '600' }}>Loading Assessment...</p>
      </div>

      <div className="dashboard-watermark"></div>

      {/* ===== TOP HEADER & WRAPPER ===== */}
      <div className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>

      {/* ===== SIDEBAR ===== */}
      <div className={`card sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <img src="/img/limitless-logo.webp" alt="Limitless Logo" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: '20px', letterSpacing: '0.5px' }}>LIMITLESS</div>
              <div style={{ color: '#f97316', fontSize: '9px', fontWeight: 700, letterSpacing: '1px' }}>UNLOCK YOUR TRUE POTENTIAL</div>
            </div>
          </div>
          <button className="sidebar-close" aria-label="Close menu" onClick={() => setIsSidebarOpen(false)}>✕</button>
        </div>

        <div className="sidebar-header" style={{ padding: '24px 20px 10px', marginBottom: 0 }}>
          <div className="icon-circle">🕐</div>
          <h3>History</h3>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px' }}>
          {assessmentsHistory && assessmentsHistory.length > 0 ? (
            assessmentsHistory.map((hist) => (
              <div 
                key={hist.id}
                className="assessment-item"
                style={{
                  border: currentAssessmentId === hist.id ? 'none' : '1px solid #1A2035',
                  background: currentAssessmentId === hist.id ? 'linear-gradient(135deg, #6366F1, #7C3AED)' : '#0F172A',
                  opacity: 1
                }}
                onClick={() => {
                  setCurrentAssessmentId(hist.id);
                  if (hist.report_json) setReport(hist.report_json);
                  if (hist.pdf_url) setPdfUrl(hist.pdf_url);
                  else setPdfUrl(null);
                  if (window.innerWidth <= 900) setIsSidebarOpen(false);
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                     <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: currentAssessmentId === hist.id ? 'rgba(255,255,255,0.2)' : 'rgba(99,102,241,0.1)', color: currentAssessmentId === hist.id ? '#fff' : '#6366F1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                     </div>
                     <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                       <span style={{ fontWeight: '600', fontSize: '13.5px', color: '#fff' }}>Assessment</span>
                       <span style={{ fontSize: '11.5px', color: currentAssessmentId === hist.id ? 'rgba(255,255,255,0.75)' : '#9ca3af' }}>
                         {new Date(hist.created_at).toLocaleDateString()} • {new Date(hist.created_at).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}
                       </span>
                     </div>
                  </div>
                  <div style={{ 
                     background: hist.report_json?.overall?.score >= 70 ? (currentAssessmentId === hist.id ? 'rgba(255,255,255,0.25)' : 'rgba(34, 197, 94, 0.15)') : (currentAssessmentId === hist.id ? 'rgba(255,255,255,0.25)' : 'rgba(245, 158, 11, 0.15)'), 
                     color: hist.report_json?.overall?.score >= 70 ? (currentAssessmentId === hist.id ? '#fff' : '#22c55e') : (currentAssessmentId === hist.id ? '#fff' : '#f59e0b'), 
                     padding: '4px 10px', 
                     borderRadius: '20px', 
                     fontSize: '12px', 
                     fontWeight: '700' 
                  }}>
                    {Math.round(hist.report_json?.overall?.score || 0)}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p style={{ fontSize: '13px', color: 'var(--text-grey)', margin: '10px 0' }}>No past assessments.</p>
          )}
        </div>

        <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'transparent', marginTop: 'auto' }}>
          <div className="mobile-only" style={{ marginBottom: '12px' }}>
            <button className="btn btn-green" onClick={() => {
              if (!isPaid) { alert("Please complete your payment to unlock unlimited retakes."); return; }
              startLoggedInAssessment(navigate, setIsSwitchingAssessment);
            }} style={{ width: '100%', justifyContent: 'center' }}>⟳ Retake Assessment</button>
          </div>
          {!isPaid && (
            <button 
              className="btn btn-purple" 
              style={{ width: '100%', justifyContent: 'center', marginBottom: '12px', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }} 
              onClick={() => navigate('/payment')}
            >
              🚀 Upgrade Subscription
            </button>
          )}
          <button 
            className="btn" 
            style={{ width: '100%', justifyContent: 'center', marginBottom: '12px', background: '#374151', color: '#fff', border: '1px solid #4B5563' }}
            onClick={() => setIsFeedbackModalOpen(true)}
          >
            💬 Send Feedback
          </button>
          <button className="btn btn-outline-red" style={{ width: '100%', justifyContent: 'center' }} onClick={() => { sessionStorage.clear(); navigate('/'); }}>⏻ Logout</button>
        </div>
      </div>

      <div className="main-wrapper">
        <div className="topbar">
          <div className="topbar-title-row">
            <button className="hamburger" aria-label="Open menu" onClick={() => setIsSidebarOpen(true)}><span></span></button>
            <div>
              <h1>Dashboard</h1>

            </div>
          </div>
          <div className="topbar-actions">
            <button className="btn btn-green desktop-only" onClick={() => {
              if (!isPaid) { alert("Please complete your payment to unlock unlimited retakes."); return; }
              startLoggedInAssessment(navigate, setIsSwitchingAssessment);
            }}>⟳ Retake Assessment</button>
            <button className="btn btn-blue" onClick={() => handleGeneratePdf('download')} disabled={isGeneratingPdf}>
              {isGeneratingPdf ? 'Generating...' : (pdfUrl && isPaid ? '📄 View PDF' : (isPaid ? '⬇ Save PDF' : '⬇ Save Free PDF'))}
            </button>
            <button className="btn btn-purple" onClick={() => handleGeneratePdf('share')} disabled={isGeneratingPdf}>
               {isGeneratingPdf ? 'Generating...' : (isPaid ? '↗ Share PDF' : '↗ Share Free PDF')}
            </button>
          </div>
        </div>
        
        <div className="layout-content">
          {/* ===== MAIN CONTENT ===== */}
          <div className="main">
            
            {/* Profile / stats row */}
          <div className="card profile-card" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'nowrap', overflowX: 'auto', gap: '40px', width: '100%' }}>
            <div className="profile-left" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
              <div className="avatar" style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--purple-light)', color: 'var(--purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: '700', flexShrink: 0 }}>{(sessionStorage.getItem('name') || 'U').charAt(0).toUpperCase()}</div>
              <div>
                <div className="profile-name-row" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                  <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800' }}>{sessionStorage.getItem('name') || 'User'}</h2>
                </div>
                <div className="profile-email" style={{ color: 'var(--text-grey)', fontSize: '13.5px', marginBottom: '8px' }}>{sessionStorage.getItem('userEmail') || 'user@example.com'}</div>
                <div className="profile-meta" style={{ display: 'flex', gap: '22px', fontSize: '13px', color: 'var(--text-dark)' }}>
                  {userAge && <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-grey)' }}>🎂 Age {userAge}</span>}
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-grey)' }}>📅 {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="profile-stats" style={{ display: 'flex', flexWrap: 'nowrap', flexShrink: 0 }}>
              <div className="stat-block" style={{ padding: '0 26px', borderLeft: 'none', borderTop: 'none', textAlign: 'left', flex: 'none', marginTop: 0 }}>
                <div className="stat-label" style={{ fontSize: '12.5px', color: 'var(--text-grey)', marginBottom: '6px' }}>Overall Score</div>
                <div className="stat-value green" style={{ color: scoreColor, fontSize: '20px', fontWeight: '700' }}>{Math.round(score)} / 100</div>
              </div>
              <div className="stat-block" style={{ padding: '0 26px', borderLeft: '1px solid var(--border)', borderTop: 'none', textAlign: 'left', flex: 'none', marginTop: 0 }}>
                <div className="stat-label" style={{ fontSize: '12.5px', color: 'var(--text-grey)', marginBottom: '6px' }}>Rating</div>
                <div className="stat-value green" style={{ color: scoreColor, fontSize: '20px', fontWeight: '700' }}>{rating.split(' ')[0]}</div>
              </div>
              <div className="stat-block" style={{ padding: '0 26px', borderLeft: '1px solid var(--border)', borderTop: 'none', textAlign: 'left', flex: 'none', marginTop: 0 }}>
                <div className="stat-label" style={{ fontSize: '12.5px', color: 'var(--text-grey)', marginBottom: '6px' }}>Assessment</div>
                <div className="stat-value check" style={{ color: 'var(--green)', fontSize: '20px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>Completed ✅</div>
              </div>
              <div className="stat-block" style={{ padding: '0 26px', borderLeft: '1px solid var(--border)', borderTop: 'none', textAlign: 'left', flex: 'none', marginTop: 0 }}>
                <div className="stat-label" style={{ fontSize: '12.5px', color: 'var(--text-grey)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Plan</div>
                <div className="stat-value" style={{ marginTop: '2px' }}>
                  {isPaid ? (
                    <div style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', color: '#fff', padding: '4px 12px', borderRadius: '8px', fontSize: '15px', fontWeight: '800', display: 'inline-flex', alignItems: 'center', gap: '6px', boxShadow: '0 4px 14px rgba(99,102,241,0.3)', letterSpacing: '0.5px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> PRO
                    </div>
                  ) : (
                    <div style={{ background: '#F1F5F9', color: '#64748B', padding: '4px 12px', borderRadius: '8px', fontSize: '15px', fontWeight: '700', display: 'inline-flex', alignItems: 'center', border: '1px solid #E2E8F0' }}>
                      Free
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Cognitive score / risk / strengths / age row */}
          <div className="row-scores">
            {/* Flex container for the 3 horizontal boxes */}
            <div className="score-panel" style={{ gap: '20px', flex: 3, paddingBottom: '8px' }}>
              
              {/* Box 1: Cognitive Score */}
              <div className="card" style={{ flex: 1, minWidth: '250px', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#6c5ce7' }}></div>
                <h4 style={{ margin: 0, fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
                  Cognitive Score
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', flex: 1 }}>
                  <div className="gauge-wrap" style={{ width: '120px', height: '120px' }}>
                    <svg viewBox="0 0 150 150">
                      <circle cx="75" cy="75" r="62" fill="none" stroke="#e9ebf2" strokeWidth="16"/>
                      <circle cx="75" cy="75" r="62" fill="none" stroke={scoreColor} strokeWidth="16" strokeLinecap="round" strokeDasharray="389.5" strokeDashoffset={389.5 - (389.5 * (score / 100))}/>
                    </svg>
                    <div className="gauge-center">
                      <div className="num">{Math.round(score)}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>OUT OF 100</span>
                    <div style={{ color: scoreColor, background: scoreColor + '15', padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', display: 'inline-block', border: `1px solid ${scoreColor}40` }}>
                      {rating.split(' ')[0]}
                    </div>
                  </div>
                </div>
              </div>

              {/* Box 2: Risk Indicators */}
              <div className="card" style={{ flex: 1, minWidth: '250px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: score >= 60 ? '#1fa96a' : '#e74c3c' }}></div>
                <h4 style={{ margin: 0, fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  Risk Indicators
                </h4>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
                  <div style={{ 
                    background: score >= 60 ? 'rgba(31,169,106,0.1)' : 'rgba(231,76,60,0.1)',
                    color: score >= 60 ? '#1fa96a' : '#e74c3c',
                    width: '52px', height: '52px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
                  }}>
                    {score >= 60 ? <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg> : <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>}
                  </div>
                  <div>
                    <div style={{ fontWeight: '800', fontSize: '15px', color: '#1f2430' }}>
                      {score >= 60 ? 'Low Risk' : 'Attention Needed'}
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px', lineHeight: '1.4' }}>
                      {score >= 60 ? 'No significant risks found.' : 'Some areas need attention.'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Box 3: Key Strengths */}
              <div className="card" style={{ flex: 1, minWidth: '250px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#f0a63a' }}></div>
                <h4 style={{ margin: 0, fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                  Key Strengths
                </h4>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    background: 'rgba(240,166,58,0.1)', width: '52px', height: '52px', borderRadius: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#f0a63a', flexShrink: 0
                  }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>
                  </div>
                  <div>
                    <div style={{ fontSize: '15px', color: '#1f2430', fontWeight: '800', textTransform: 'capitalize' }}>
                      {domains.length > 0 ? [...domains].sort((a,b) => b[1] - a[1])[0][0].replace(/([A-Z])/g, ' $1').trim() : 'Mental clarity'}
                    </div>
                    <div style={{ fontSize: '13px', color: '#64748b', marginTop: '4px', lineHeight: '1.4' }}>
                      Top Performing Area
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="card age-card">
              <h4>🧠 Cognitive Age Estimate</h4>
              <div style={{ filter: isPaid ? 'none' : 'blur(4px)', pointerEvents: isPaid ? 'auto' : 'none', userSelect: isPaid ? 'auto' : 'none' }}>
                <div className="age-values">
                  <div>
                    <div className="age-label">Actual Age</div>
                    <div className="age-num grey">{cogAge?.actualAge || userAge || '--'}</div>
                    <div className="age-unit">years old</div>
                  </div>
                  <div>
                    <div className="age-label">Cognitive Age</div>
                    <div className="age-num purple">{cogAge?.estimatedCognitiveAge || '--'}</div>
                    <div className="age-unit">estimated</div>
                  </div>
                </div>
                <div className="age-note">ⓘ {cogAge?.disclaimer || 'Motivational wellness metric only — not a clinical measurement.'}</div>
              </div>
              {!isPaid && <PaywallOverlay />}
            </div>
          </div>

          {/* Domain scores + lifestyle assessment */}
          <div className="row-domain">
            <div className="card domain-card">
              <div className="card-title">📶 Domain Scores</div>
              <div className="domain-grid">
                {domains.map(([key, val], i) => {
                  const colors = [
                    { bg: 'bg-orange', fg: 'fg-orange' },
                    { bg: 'bg-blue', fg: 'fg-blue' },
                    { bg: 'bg-green', fg: 'fg-green' },
                    { bg: 'bg-purple', fg: 'fg-purple' },
                    { bg: 'bg-peach', fg: 'fg-peach' },
                    { bg: 'bg-grey', fg: 'fg-grey' },
                    { bg: 'bg-teal', fg: 'fg-teal' },
                    { bg: 'bg-green2', fg: 'fg-green2' }
                  ];
                  const colorClass = colors[i % colors.length];
                  return (
                    <div key={key} className={`domain-box ${colorClass.bg}`}>
                      <div className={`label ${colorClass.fg}`}>{key.replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase())}</div>
                      <div className="value">{Math.round(val)}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card lifestyle-card">
              <div className="card-title">🍃 Lifestyle Assessment</div>
              <div style={{ filter: isPaid ? 'none' : 'blur(4px)', pointerEvents: isPaid ? 'auto' : 'none', userSelect: isPaid ? 'auto' : 'none', display: 'flex', flexDirection: 'column', height: '100%' }}>
                {lifestyleImpacts.map(([key, val], i) => {
                  const iconMap = { 'Sleep Quality': '🌙', 'Stress Level': '❤️', 'Anxiety Load': '😊', 'Burnout Risk': '🔥' };
                  const icon = iconMap[key] || '🔹';
                  let badgeColor = 'var(--green)';
                  let badgeBg = 'var(--green-badge)';
                  if(val === 'Medium') { badgeColor = '#f0a63a'; badgeBg = '#fdf3e7'; }
                  if(val === 'High') { badgeColor = '#e0455f'; badgeBg = '#fdf1ec'; }
                  return (
                    <div key={key} className="lifestyle-item">
                      <div className="left"><span className="lifestyle-icon">{icon}</span> {key} Impact</div>
                      <span className="low-badge" style={{ color: badgeColor, background: badgeBg }}>{val}</span>
                    </div>
                  );
                })}
              </div>
              {!isPaid && <PaywallOverlay />}
            </div>
          </div>

          {/* Radar charts + recommendations */}
          <div className="row-radar">
            <div className="card radar-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="card-title">📊 Cognitive Functions Profile</div>
              <div style={{ height: '300px', width: '100%', flexShrink: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                    <PolarGrid stroke="#e9ebf2" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#555', fontSize: 11 }} />
                    <Radar name="Score" dataKey="A" stroke="#6c5ce7" fill="#6c5ce7" fillOpacity={0.25} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              <div style={{ flex: 1, minHeight: '220px', width: '100%', marginTop: '20px', borderTop: '1px solid var(--border)', paddingTop: '20px', display: 'flex', flexDirection: 'column' }}>
                <h5 style={{ margin: '0 0 16px', fontSize: '13px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Score Distribution</h5>
                <div style={{ flex: 1, width: '100%', minHeight: '220px', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={radarData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9ebf2" />
                        <XAxis dataKey="subject" tick={{ fontSize: 9, fill: '#8a8fa3' }} interval={0} angle={-30} textAnchor="end" />
                        <YAxis tick={{ fontSize: 10, fill: '#8a8fa3' }} />
                        <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                        <Bar dataKey="A" fill="#6c5ce7" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            <div className="card radar-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="card-title">🎗 Lifestyle Impact Profile</div>
              <div style={{ height: '300px', width: '100%', flexShrink: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e9ebf2" />
                    <XAxis type="number" domain={[0, 100]} stroke="#8a8fa3" tick={{fontSize: 12}} />
                    <YAxis dataKey="name" type="category" stroke="#8a8fa3" tick={{fontSize: 12}} width={90} />
                    <Tooltip cursor={{fill: 'transparent'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {barData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={['#6c5ce7', '#1ea672', '#f0a63a', '#e0455f'][index % 4]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div style={{ flex: 1, minHeight: '220px', width: '100%', marginTop: '20px', borderTop: '1px solid var(--border)', paddingTop: '20px', display: 'flex', flexDirection: 'column' }}>
                <h5 style={{ margin: '0 0 16px', fontSize: '13px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px' }}>Impact Ratio</h5>
                <div style={{ flex: 1, width: '100%', minHeight: '240px', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                        <Pie data={barData} cx="50%" cy="50%" innerRadius={45} outerRadius={100} paddingAngle={5} dataKey="value">
                          {barData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={['#6c5ce7', '#1ea672', '#f0a63a', '#e0455f'][index % 4]} />
                          ))}
                        </Pie>
                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>

            <div className="card reco-card">
              <div className="card-title">💡 Personalized Recommendations</div>
              <div style={{ filter: isPaid ? 'none' : 'blur(4px)', pointerEvents: isPaid ? 'auto' : 'none', userSelect: isPaid ? 'auto' : 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {isPaid ? (
                  (report.recommendations ?? []).map((rec, i) => (
                    <div key={i} className="reco-item">
                      <div className={`reco-num n${(i % 3) + 1}`}>{i + 1}</div>
                      <div className="reco-text">{rec}</div>
                    </div>
                  ))
                ) : (
                  [1,2,3].map(i => (
                    <div key={i} className="reco-item">
                       <div className={`reco-num n${i}`}>{i}</div>
                       <div className="reco-text" style={{ color: 'transparent', textShadow: '0 0 8px rgba(0,0,0,0.5)' }}>This is a blurred out premium recommendation. Unlock to see.</div>
                    </div>
                  ))
                )}
              </div>
              {!isPaid && <PaywallOverlay />}
            </div>
          </div>
          
          {/* Audit / Privacy (Optional) */}
          {(audit || privacy || (report.disclaimers && report.disclaimers.length > 0)) && (
            <div className="card" style={{ marginTop: '20px' }}>
              {report.disclaimers && report.disclaimers.length > 0 && (
                <>
                  <div className="card-title">Disclaimers</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {report.disclaimers.map((d, i) => (
                      <p key={i} style={{ color: '#8a8fa3', fontSize: '13px', margin: 0, lineHeight: '1.6' }}>• {d}</p>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
          </div>
        </div>
      </div>

      <FeedbackModal 
        isOpen={isFeedbackModalOpen} 
        onClose={() => setIsFeedbackModalOpen(false)} 
      />
    </div>
  );
};

export default Dashboard;

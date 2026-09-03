import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  Cell, AreaChart, Area, PieChart, Pie, LineChart, Line, Legend
} from 'recharts';
import { getApiUrl, fetchLongitudinalAnalysis, fetchExecutiveOverview, fetchCognitiveHealthAgent, fetchStressBurnoutAgent, fetchEngagementRoadmap, fetchEngagementSummary } from '../lib/apiUtils';
import { fetchUserWithAssessments, storeReportPdf } from '../lib/backendApi';
import { startLoggedInAssessment } from '../lib/assessmentFlow';
import FeedbackModal from './FeedbackModal';
import { PSS10Modal, CBIModal, SelfAssessmentModal, CheckinModal } from './ExecutiveAssessmentModals';
import AICoachChat from './AICoachChat';
import ScenarioSimulator from './ScenarioSimulator';
import WhatIfScenarioDashboard from './WhatIfScenarioDashboard';

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
  const [pdfActionState, setPdfActionState] = useState(null); // 'download' or 'share'
  const [isPaid, setIsPaid] = useState(false);
  const [assessmentsHistory, setAssessmentsHistory] = useState([]);
  const [currentAssessmentId, setCurrentAssessmentId] = useState(null);
  const [isSwitchingAssessment, setIsSwitchingAssessment] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userAge, setUserAge] = useState('');
  const [userGender, setUserGender] = useState('');
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [longitudinalData, setLongitudinalData] = useState(null);
  const [showRawJson, setShowRawJson] = useState(false);
  const [isCoachModalOpen, setIsCoachModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'scenario'
  
  // Daily Engagement State
  const [engagementRoadmap, setEngagementRoadmap] = useState(null);
  const [engagementSummary, setEngagementSummary] = useState(null);
  const [engagementLoading, setEngagementLoading] = useState(false);
  const [engagementError, setEngagementError] = useState(null);
  const [showCheckinForm, setShowCheckinForm] = useState(false);
  const [newCheckin, setNewCheckin] = useState({ sleep: 2, stress: 2, energy: 2, focus: 2, note: '' });

  const [localCheckins, setLocalCheckins] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('engagement_checkins') || '[]');
    } catch {
      return [];
    }
  });

  const [localCompletions, setLocalCompletions] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('engagement_completions') || '{}');
    } catch {
      return {};
    }
  });

  const getLocalDateStr = () => {
    const d = new Date();
    const offset = d.getTimezoneOffset();
    const localDate = new Date(d.getTime() - (offset * 60 * 1000));
    return localDate.toISOString().split('T')[0];
  };

  const handleToggleTask = (taskId) => {
    const todayStr = getLocalDateStr();
    setLocalCompletions(prev => {
      const currentList = prev[taskId] || [];
      let newList;
      if (currentList.includes(todayStr)) {
        newList = currentList.filter(d => d !== todayStr);
      } else {
        newList = [...currentList, todayStr];
      }
      const updated = { ...prev, [taskId]: newList };
      localStorage.setItem('engagement_completions', JSON.stringify(updated));
      return updated;
    });
  };

  const handleSaveCheckin = (e) => {
    e.preventDefault();
    const todayStr = getLocalDateStr();
    
    if (localCheckins.some(c => c.date === todayStr)) {
      alert("You have already checked in today!");
      return;
    }

    const checkInItem = {
      date: todayStr,
      sleep: Number(newCheckin.sleep),
      stress: Number(newCheckin.stress),
      energy: Number(newCheckin.energy),
      focus: Number(newCheckin.focus),
      note: newCheckin.note || "Daily log"
    };

    const updated = [checkInItem, ...localCheckins];
    localStorage.setItem('engagement_checkins', JSON.stringify(updated));
    setLocalCheckins(updated);
    setShowCheckinForm(false);
    setNewCheckin({ sleep: 2, stress: 2, energy: 2, focus: 2, note: '' });
  };

  const handleClearEngagementData = () => {
    if (window.confirm("Are you sure you want to clear your local check-ins and task history?")) {
      localStorage.removeItem('engagement_checkins');
      localStorage.removeItem('engagement_completions');
      setLocalCheckins([]);
      setLocalCompletions({});
    }
  };

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

      // 2. Always fetch latest from the backend (user + assessment history)
      const userId = sessionStorage.getItem('userId');
      if (userId) {
        try {
          const userRecord = await fetchUserWithAssessments(userId);
          const history = userRecord.assessments || [];

          if (history.length > 0) {
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
        } catch (err) {
          console.error('Error fetching assessment from DB:', err);
        }
      }

      if (!hasReport) {
        navigate('/question');
      }
    };
    loadDashboardData();
  }, [navigate]);

  // Load engagement roadmap + summary when report or checkins/completions change
  useEffect(() => {
    if (!report) return;
    const loadEngagement = async () => {
      setEngagementLoading(true);
      setEngagementError(null);
      try {
        const analysisPayload = {
          assessmentId: currentAssessmentId || 'asmt_user',
          demographics: { ageBand: report?.demographics?.ageBand || '25-34' },
          domains: report?.domains
            ? Object.entries(report.domains).map(([key, val]) => ({
                displayName: key.replace(/([A-Z])/g, ' $1').trim().replace(/^./, s => s.toUpperCase()),
                key,
                score: typeof val === 'object' ? (val.score ?? val.value ?? 50) : (Number(val) || 50)
              }))
            : [],
          recommendations: (report?.recommendations || []).map(r => ({
            title: typeof r === 'string' ? r : r.title || r.text || 'Improve daily habits'
          }))
        };

        const roadmapData = await fetchEngagementRoadmap(analysisPayload, {
          maxActiveTasks: 3,
          newTasksPerWeek: 1
        });
        setEngagementRoadmap(roadmapData);

        if (roadmapData && roadmapData.weeks) {
          const today = getLocalDateStr();
          
          // Use assessment timestamp if available, otherwise default to today
          const latestAssessment = assessmentsHistory[0];
          const startedAtDate = latestAssessment?.created_at ? new Date(latestAssessment.created_at) : new Date();
          const startedAtStr = startedAtDate.toISOString().split('T')[0];

          const tasks = roadmapData.weeks.flatMap(w =>
            (w.tasks || []).map(t => ({
              taskId: t.taskId,
              week: t.week,
              text: t.text,
              cadence: t.cadence,
              targetScale: t.targetScale || null,
              completions: localCompletions[t.taskId] || []
            }))
          );

          const stateBundle = {
            schemaVersion: 1,
            roadmap: {
              assessmentId: analysisPayload.assessmentId,
              startedAt: startedAtStr,
              tasks
            },
            checkIns: localCheckins,
            assessments: [],
            archivedRoadmaps: [],
            settings: { reminderTime: '09:00', remindersEnabled: false }
          };

          const summaryData = await fetchEngagementSummary(stateBundle, today);
          setEngagementSummary(summaryData);
        }
      } catch (err) {
        console.error('Error loading engagement data:', err);
        setEngagementError(err?.message || 'Failed to load engagement data');
      } finally {
        setEngagementLoading(false);
      }
    };
    loadEngagement();
  }, [report, currentAssessmentId, localCheckins, localCompletions, assessmentsHistory]);

  useEffect(() => {
    const fetchLongitudinal = async () => {
      const userId = sessionStorage.getItem('userId');
      if (assessmentsHistory && assessmentsHistory.length >= 2 && userId) {
        try {
          const historyPayload = assessmentsHistory.map(h => ({
            sessionTimestamp: h.created_at,
            analysis: h.report_json
          }));
          const data = await fetchLongitudinalAnalysis(userId, historyPayload);
          setLongitudinalData(data);
        } catch (err) {
          console.error('Error fetching longitudinal analysis:', err);
        }
      }
    };
    fetchLongitudinal();
  }, [assessmentsHistory]);


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

    setPdfActionState(action);
    try {
      const userId = sessionStorage.getItem('userId');
      const dateStr = new Date().toISOString().split('T')[0];
      let blob;
      let fileName;

      if (isPaid && userId) {
        // Paid: the backend fetches the PDF from the AI report-generation
        // model for THIS specific assessment, stores it, and emails the
        // download link to the user.
        const stored = await storeReportPdf(userId, report, {
          assessmentId: currentAssessmentId,
          sendEmail: true,
        });
        setPdfUrl(stored.pdfUrl);
        if (currentAssessmentId) {
          setAssessmentsHistory(prev => prev.map(a =>
            a.id === currentAssessmentId ? { ...a, pdf_url: stored.pdfUrl } : a
          ));
        }
        const response = await fetch(stored.pdfUrl);
        if (!response.ok) throw new Error('PDF download failed');
        blob = await response.blob();
        fileName = `Limitless_Cognitive_Report_${dateStr}.pdf`;
      } else {
        // Free preview: generate the teaser PDF directly (not stored)
        const response = await fetch(getApiUrl('/api/v1/generate-teaser-pdf'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ analysis: report, brand: { primaryColor: '#3B82F6', accentColor: '#6366F1' } })
        });
        if (!response.ok) throw new Error('PDF generation failed');
        blob = await response.blob();
        fileName = `Limitless_Cognitive_Teaser_${dateStr}.pdf`;
      }

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

      // Share or Download locally
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
      setPdfActionState(null);
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

  const extractNum = (val) => {
    if (typeof val === 'object' && val !== null) {
      return val.score ?? val.value ?? val.A ?? 0;
    }
    return Number(val) || 0;
  };

  const extractStr = (val, defaultStr) => {
    if (typeof val === 'object' && val !== null) {
      return val.rating ?? val.label ?? val.value ?? defaultStr;
    }
    return typeof val === 'string' ? val : defaultStr;
  };

  const isDemo = sessionStorage.getItem('demoMode') === 'true';
  const score = extractNum(report.overall?.score);
  const rating = extractStr(report.overall?.rating, 'Pending');
  const scoreColor = rating.includes('Excellent') || rating.includes('Good') ? '#10B981' : rating.includes('Risk') || rating.includes('Critical') ? '#EF4444' : '#6366F1';

  const radarData = report.charts?.radarDomains?.labels?.map((label, i) => ({
    subject: label.replace('& ', '&\n'),
    A: extractNum(report.charts.radarDomains.values[i]),
    fullMark: 100
  })) ?? [];

  const barData = report.charts?.barLifestyleImpacts?.labels?.map((label, i) => ({
    name: label,
    value: extractNum(report.charts.barLifestyleImpacts.values[i])
  })) ?? [];

  const BAR_COLORS = ['#6366F1', '#3B82F6', '#8B5CF6', '#F59E0B'];

  const lifestyleImpacts = report.lifestyleImpacts ? Object.entries(report.lifestyleImpacts).map(([k, v]) => [k, extractStr(v, 'Medium')]) : [];
  const domains = report.domains ? Object.entries(report.domains).map(([k, v]) => [k, extractNum(v)]) : [];
  let cogAge = report.cognitiveAge;
  if (!cogAge || !cogAge.estimatedCognitiveAge) {
    const userAge = parseInt(sessionStorage.getItem('userAge'), 10) || 25;
    const estAgeRaw = userAge + (70 - score) / 1.5;
    const estAge = Math.max(18, parseFloat(estAgeRaw.toFixed(1)));
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
          .topbar-actions { width: 100%; margin-top: 12px; display: flex; flex-direction: row; flex-wrap: wrap; gap: 8px; }
          .topbar-actions .btn { flex: 1 1 calc(50% - 8px); padding: 10px 8px !important; font-size: 12px !important; justify-content: center; text-align: center; white-space: nowrap; }
          .layout-content { padding: 0 16px 28px; width: 100%; max-width: 100%; box-sizing: border-box; }
          
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
          .row-engagement-top, .row-engagement-mid { flex-direction: column; }
          .row-engagement-top > .card, .row-engagement-mid > .card { min-width: 100% !important; flex-basis: 100% !important; }
          .roadmap-tasks { grid-template-columns: 1fr !important; }
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

        {/* Dashboard Views Navigation */}
        <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: '#64748B', letterSpacing: '0.8px', marginBottom: '8px' }}>
            Dashboard Views
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <button
              type="button"
              onClick={() => { setActiveTab('overview'); if (window.innerWidth <= 900) setIsSidebarOpen(false); }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: '10px',
                border: 'none',
                background: activeTab === 'overview' ? 'linear-gradient(135deg, #6366F1, #7C3AED)' : 'transparent',
                color: activeTab === 'overview' ? '#fff' : '#94A3B8',
                fontSize: '13.5px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'left'
              }}
            >
              <span style={{ fontSize: '16px' }}>📊</span>
              <span>Overview Report</span>
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('scenario'); if (window.innerWidth <= 900) setIsSidebarOpen(false); }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '10px 14px',
                borderRadius: '10px',
                border: 'none',
                background: activeTab === 'scenario' ? 'linear-gradient(135deg, #6366F1, #7C3AED)' : 'transparent',
                color: activeTab === 'scenario' ? '#fff' : '#94A3B8',
                fontSize: '13.5px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
                textAlign: 'left'
              }}
            >
              <span style={{ fontSize: '16px' }}>🔮</span>
              <span>What-If Scenario</span>
              <span style={{
                marginLeft: 'auto',
                fontSize: '10px',
                background: activeTab === 'scenario' ? 'rgba(255,255,255,0.2)' : 'rgba(99,102,241,0.25)',
                color: activeTab === 'scenario' ? '#fff' : '#818CF8',
                padding: '2px 6px',
                borderRadius: '6px',
                fontWeight: 800
              }}>
                SIMULATOR
              </span>
            </button>
          </div>
        </div>

        <div className="sidebar-header" style={{ padding: '20px 20px 10px', marginBottom: 0 }}>
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
                  <div style={{ fontSize: '18px', fontWeight: '800', color: currentAssessmentId === hist.id ? '#fff' : '#fff' }}>
                    {hist.report_json?.overall?.score || 0}
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
              <h1>{activeTab === 'scenario' ? 'What-If Scenario Simulator' : 'Dashboard'}</h1>
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#9CA3AF' }}>
                {activeTab === 'scenario' ? 'Stateless Behavioral Projection Engine' : 'Your Personalized Cognitive Health Analysis'}
              </p>
            </div>
          </div>
          <div className="topbar-actions">
            {activeTab === 'scenario' && (
              <button
                type="button"
                className="btn"
                style={{ background: '#1E293B', color: '#E2E8F0', border: '1px solid #334155' }}
                onClick={() => setActiveTab('overview')}
              >
                ← Back to Overview
              </button>
            )}
            <button className="btn btn-green desktop-only" onClick={() => {
              if (!isPaid) { alert("Please complete your payment to unlock unlimited retakes."); return; }
              startLoggedInAssessment(navigate, setIsSwitchingAssessment);
            }}>⟳ Retake Assessment</button>
            <button className="btn btn-blue" onClick={() => handleGeneratePdf('download')} disabled={pdfActionState !== null}>
              {pdfActionState === 'download' ? 'Generating...' : (pdfUrl && isPaid ? '📄 View PDF' : (isPaid ? '⬇ Save PDF' : '⬇ Save Free PDF'))}
            </button>
            <button className="btn btn-purple" onClick={() => handleGeneratePdf('share')} disabled={pdfActionState !== null}>
               {pdfActionState === 'share' ? 'Generating...' : (isPaid ? '↗ Share PDF' : '↗ Share Free PDF')}
            </button>
          </div>
        </div>
        
        <div className="layout-content">
          {/* Quick Universal View Switcher Tabs (Accessible on Mobile, Tablet & Desktop) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            background: 'var(--bg)',
            padding: '4px',
            borderRadius: '12px',
            marginBottom: '20px',
            border: '1px solid var(--border)',
            width: 'fit-content',
            maxWidth: '100%',
            gap: '6px',
            overflowX: 'auto'
          }}>
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 18px',
                borderRadius: '9px',
                border: 'none',
                background: activeTab === 'overview' ? '#ffffff' : 'transparent',
                color: activeTab === 'overview' ? 'var(--text-dark)' : 'var(--text-grey)',
                fontSize: '13.5px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: activeTab === 'overview' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap'
              }}
            >
              <span>📊</span>
              <span>Overview Report</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('scenario')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 18px',
                borderRadius: '9px',
                border: 'none',
                background: activeTab === 'scenario' ? 'linear-gradient(135deg, #6366F1, #8B5CF6)' : 'transparent',
                color: activeTab === 'scenario' ? '#ffffff' : 'var(--text-grey)',
                fontSize: '13.5px',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: activeTab === 'scenario' ? '0 4px 12px rgba(99,102,241,0.3)' : 'none',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap'
              }}
            >
              <span>🔮</span>
              <span>What-If Scenario Simulator</span>
              <span style={{
                background: activeTab === 'scenario' ? 'rgba(255,255,255,0.2)' : 'rgba(99,102,241,0.1)',
                color: activeTab === 'scenario' ? '#ffffff' : '#6366F1',
                padding: '2px 7px',
                borderRadius: '6px',
                fontSize: '10px',
                fontWeight: 800
              }}>
                SIMULATE
              </span>
            </button>
          </div>

          {activeTab === 'scenario' ? (
            <WhatIfScenarioDashboard
              analysis={report}
              userAge={userAge}
              userGender={userGender}
              isPaid={isPaid}
              onOpenCoach={() => setIsCoachModalOpen(true)}
              onBackToOverview={() => setActiveTab('overview')}
            />
          ) : (
          /* ===== MAIN CONTENT ===== */
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
                <div className="stat-value green" style={{ color: scoreColor, fontSize: '20px', fontWeight: '700' }}>{score} / 100</div>
              </div>
              <div className="stat-block" style={{ padding: '0 26px', borderLeft: '1px solid var(--border)', borderTop: 'none', textAlign: 'left', flex: 'none', marginTop: 0 }}>
                <div className="stat-label" style={{ fontSize: '12.5px', color: 'var(--text-grey)', marginBottom: '6px' }}>Rating</div>
                <div className="stat-value green" style={{ color: scoreColor, fontSize: '20px', fontWeight: '700' }}>{rating}</div>
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
                      <div className="num">{score}</div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: 600 }}>OUT OF 100</span>
                    <div style={{ color: scoreColor, background: scoreColor + '15', padding: '6px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', display: 'inline-block', border: `1px solid ${scoreColor}40` }}>
                      {rating}
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ fontWeight: '800', fontSize: '15px', color: '#1f2430' }}>
                      {report?.riskIndicators?.length > 0 ? report.riskIndicators.join(', ') : 'None'}
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
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ fontSize: '15px', color: '#1f2430', fontWeight: '800', textTransform: 'capitalize' }}>
                      {report?.strengths?.length > 0 ? report.strengths.join(', ') : 'None'}
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
                      <div className="value">{val}</div>
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
                      <div className="left"><span className="lifestyle-icon">{icon}</span> {key.replace(/Impact$/, '').replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase())}</div>
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
          
          {/* Progression Tracking Section */}
          {longitudinalData && (
            <div className="card" style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="card-title" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 0 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#6366F1' }}><path d="M3 3v18h18"/><path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/></svg>
                  Your Progress Journey
                </span>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: 'var(--text-grey)', fontWeight: '600' }}>
                    Based on your last {longitudinalData.historical_data_points_analyzed} sessions
                  </span>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {/* Trajectory Card */}
                <div style={{ background: '#f8fafc', border: '1px solid var(--border)', padding: '20px', borderRadius: 'var(--radius-lg)' }}>
                  <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Progress Overview</div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600', marginBottom: '4px' }}>FIRST SCORE</div>
                      <div style={{ fontSize: '24px', fontWeight: '800', color: '#1e293b' }}>{longitudinalData.longitudinal_telemetry?.overall_trajectory?.baseline_overall_score || 0}</div>
                    </div>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: '12px', color: '#6c5ce7', fontWeight: '600', marginBottom: '4px' }}>LATEST SCORE</div>
                      <div style={{ fontSize: '24px', fontWeight: '800', color: '#6c5ce7' }}>{longitudinalData.longitudinal_telemetry?.overall_trajectory?.latest_overall_score || 0}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <div style={{ 
                      width: '40px', height: '40px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px',
                      background: longitudinalData.longitudinal_telemetry?.overall_trajectory?.direction === 'Improving' ? 'var(--green-badge)' : 'var(--purple-badge)',
                      color: longitudinalData.longitudinal_telemetry?.overall_trajectory?.direction === 'Improving' ? 'var(--green)' : 'var(--purple)'
                    }}>
                      {longitudinalData.longitudinal_telemetry?.overall_trajectory?.direction === 'Improving' ? '🚀' : longitudinalData.longitudinal_telemetry?.overall_trajectory?.direction === 'Declining' ? '⚠️' : '➡️'}
                    </div>
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a' }}>{longitudinalData.longitudinal_telemetry?.overall_trajectory?.direction || 'Stable'}</div>
                      <div style={{ fontSize: '13px', color: '#64748b' }}>Changing by <span style={{ fontWeight: '700', color: longitudinalData.longitudinal_telemetry?.overall_trajectory?.velocity_score_per_day >= 0 ? 'var(--green)' : 'var(--red)' }}>{longitudinalData.longitudinal_telemetry?.overall_trajectory?.velocity_score_per_day?.toFixed(2)} points</span> per day</div>
                    </div>
                  </div>
                </div>

                {/* AI Insights Card */}
                <div style={{ background: 'linear-gradient(135deg, #1e293b, #0f172a)', padding: '20px', borderRadius: 'var(--radius-lg)', color: '#fff', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                    Your Personal Coach
                  </div>
                  <div style={{ marginBottom: '16px', background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600', display: 'block', marginBottom: '4px' }}>AREA TO FOCUS ON</span>
                    <span style={{ fontSize: '15px', color: '#fff', fontWeight: '600' }}>{longitudinalData.contextual_ai_insights?.primary_bottleneck}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                    <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: '600' }}>ACTION STEPS</span>
                    {longitudinalData.contextual_ai_insights?.dynamic_recommendations?.map((rec, idx) => (
                      <div key={idx} style={{ fontSize: '13.5px', color: '#cbd5e1', display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: '1.4' }}>
                        <span style={{ color: '#6366f1', marginTop: '2px' }}>✦</span> {rec}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                {/* Projections Card */}
                {longitudinalData.predictive_projections_calibrated && Object.keys(longitudinalData.predictive_projections_calibrated).length > 0 && (
                  <div style={{ background: '#f8fafc', border: '1px solid var(--border)', padding: '20px', borderRadius: 'var(--radius-lg)' }}>
                    <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Where You're Heading</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {[30, 60, 90].map(days => {
                        const noAction = longitudinalData.predictive_projections_calibrated[`days_${days}_no_action`];
                        const withAction = longitudinalData.predictive_projections_calibrated[`days_${days}_with_recommendations`];
                        if (noAction === undefined || withAction === undefined) return null;
                        
                        return (
                          <div key={days} style={{ background: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontSize: '15px', fontWeight: '800', color: '#1e293b' }}>In {days} Days</div>
                            <div style={{ display: 'flex', gap: '20px' }}>
                              <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase', marginBottom: '2px' }}>Without Action</div>
                                <div style={{ fontSize: '18px', fontWeight: '800', color: '#94a3b8' }}>{noAction}</div>
                              </div>
                              <div style={{ textAlign: 'right', borderLeft: '1px solid #e2e8f0', paddingLeft: '20px' }}>
                                <div style={{ fontSize: '11px', color: '#6366f1', fontWeight: '600', textTransform: 'uppercase', marginBottom: '2px' }}>With Action</div>
                                <div style={{ fontSize: '18px', fontWeight: '800', color: '#6366f1' }}>{withAction}</div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Attribution Matrix */}
                {longitudinalData.longitudinal_telemetry?.attribution_available && longitudinalData.longitudinal_telemetry?.lifestyle_attribution_matrix && Object.keys(longitudinalData.longitudinal_telemetry.lifestyle_attribution_matrix).length > 0 && (
                  <div style={{ background: '#f8fafc', border: '1px solid var(--border)', padding: '20px', borderRadius: 'var(--radius-lg)' }}>
                    <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '700', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>How Your Lifestyle Affects Your Score</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      {Object.entries(longitudinalData.longitudinal_telemetry.lifestyle_attribution_matrix).map(([key, val]) => {
                        const isPositive = val >= 0;
                        return (
                          <div key={key} style={{ background: '#fff', padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '13px', color: '#475569', fontWeight: '600', textTransform: 'capitalize' }}>{key.replace('Impact', '')}</span>
                            <span style={{ fontSize: '14px', fontWeight: '800', color: isPositive ? 'var(--green)' : 'var(--red)' }}>
                              {isPositive ? '+' : ''}{val.toFixed(1)}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Line Chart */}
              <div style={{ background: '#f8fafc', border: '1px solid var(--border)', padding: '20px', borderRadius: 'var(--radius-lg)' }}>
                <div style={{ fontSize: '13px', color: '#64748b', fontWeight: '700', marginBottom: '20px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Your Brain Areas Over Time</div>
                <div style={{ width: '100%', height: '350px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart 
                      data={longitudinalData.session_timestamps.map((ts, i) => {
                        const pt = { name: new Date(ts).toLocaleDateString() };
                        Object.entries(longitudinalData.longitudinal_telemetry?.domain_trends || {}).forEach(([domain, data]) => {
                          pt[domain] = data.historical_values[i];
                        });
                        return pt;
                      })}
                      margin={{ top: 10, right: 30, left: -20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e9ebf2" vertical={false} />
                      <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#8a8fa3' }} axisLine={false} tickLine={false} dy={10} />
                      <YAxis tick={{ fontSize: 11, fill: '#8a8fa3' }} domain={['dataMin - 5', 'dataMax + 5']} axisLine={false} tickLine={false} dx={-10} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 8px 24px rgba(0,0,0,0.12)', padding: '16px' }}
                        itemStyle={{ fontSize: '13px', fontWeight: '600', padding: '4px 0' }}
                      />
                      <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '20px' }} iconType="circle" />
                      {Object.keys(longitudinalData.longitudinal_telemetry?.domain_trends || {}).map((domain, index) => {
                        const lineColors = ['#6c5ce7', '#1ea672', '#2f6fed', '#f0a63a', '#e0455f', '#2bb3a3', '#e08c3e', '#7a5fe0'];
                        return (
                          <Line 
                            key={domain} 
                            type="monotone" 
                            dataKey={domain} 
                            name={domain.replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase())} 
                            stroke={lineColors[index % lineColors.length]} 
                            strokeWidth={3}
                            dot={{ r: 4, strokeWidth: 2, fill: '#fff' }}
                            activeDot={{ r: 7, strokeWidth: 0 }}
                          />
                        );
                      })}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

            </div>
          )}





          {/* What-If Scenario Spotlight Launcher Card */}
          <div 
            onClick={() => setActiveTab('scenario')}
            className="card" 
            style={{ 
              marginTop: '24px', 
              background: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)', 
              color: '#fff', 
              cursor: 'pointer',
              border: '1px solid rgba(99,102,241,0.35)',
              padding: '22px 24px',
              borderRadius: '16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px',
              boxShadow: '0 8px 24px rgba(15,23,42,0.18)',
              transition: 'transform 0.2s'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', maxWidth: '640px' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '26px',
                flexShrink: 0,
                boxShadow: '0 4px 14px rgba(99,102,241,0.4)'
              }}>
                🔮
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                  <h4 style={{ margin: 0, fontSize: '16.5px', fontWeight: 800, color: '#fff' }}>
                    What-If Cognitive Scenario Simulator
                  </h4>
                  <span style={{ background: 'rgba(52,211,153,0.2)', color: '#34D399', fontSize: '10.5px', fontWeight: 800, padding: '2px 8px', borderRadius: '10px' }}>
                    NEW INTERACTIVE TOOL
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '13px', color: '#94A3B8', lineHeight: 1.5 }}>
                  Simulate how optimizing your sleep duration, evening work boundaries, and deliberate recovery breaks can boost your load capacity by up to <strong>+16 points</strong>.
                </p>
              </div>
            </div>
            <button
              type="button"
              style={{
                background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                padding: '11px 22px',
                fontSize: '13px',
                fontWeight: 800,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(99,102,241,0.4)',
                whiteSpace: 'nowrap'
              }}
            >
              Launch Simulator ➔
            </button>
          </div>

          {/* ===== DAILY ENGAGEMENT PLAN SECTION ===== */}
          <div className="card" style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: 'linear-gradient(135deg, #10B981, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '20px', boxShadow: '0 4px 14px rgba(16,185,129,0.3)' }}>🚀</div>
              <div>
                <div className="card-title" style={{ marginBottom: 0 }}>Daily Engagement Plan</div>
                <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-grey)' }}>30-day roadmap, wellness tracking & adherence</p>
              </div>
            </div>

            {engagementLoading ? (
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <div style={{ width: '40px', height: '40px', border: '3px solid rgba(16,185,129,0.2)', borderTopColor: '#10B981', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
                <p style={{ color: 'var(--text-grey)', fontSize: '15px', fontWeight: 600 }}>Generating engagement plan...</p>
              </div>
            ) : engagementError ? (
              <div style={{ padding: '32px', textAlign: 'center' }}>
                <div style={{ fontSize: '36px', marginBottom: '12px' }}>⚠️</div>
                <p style={{ color: 'var(--red)', fontWeight: 700, marginBottom: '8px' }}>Failed to load engagement data</p>
                <p style={{ color: 'var(--text-grey)', fontSize: '13px', marginBottom: '16px' }}>{engagementError}</p>
              </div>
            ) : engagementRoadmap ? (
              <div style={{ position: 'relative' }}>
                <div style={{ filter: isPaid ? 'none' : 'blur(4px)' }}>

                  {/* Row 1: Adherence Stats + Daily State */}
                  <div className="row-engagement-top" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
                    {/* Adherence Stats */}
                    <div style={{ flex: '1 1 340px', minWidth: '280px', background: 'var(--bg)', borderRadius: 'var(--radius-lg)', padding: '20px', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#10B981' }} />
                      <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>📊 Adherence Stats</div>
                      {engagementSummary?.adherence ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))', gap: '12px' }}>
                          <div style={{ background: '#f0fdf4', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                            <div style={{ fontSize: '26px', fontWeight: 800, color: '#10B981' }}>{engagementSummary.adherence.currentStreak}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-grey)', fontWeight: 600, marginTop: '4px' }}>Day Streak 🔥</div>
                          </div>
                          <div style={{ background: '#eff6ff', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                            <div style={{ fontSize: '26px', fontWeight: 800, color: '#3b82f6' }}>{engagementSummary.adherence.weekAdherence != null ? `${Math.round(engagementSummary.adherence.weekAdherence)}%` : 'N/A'}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-grey)', fontWeight: 600, marginTop: '4px' }}>Week Adherence</div>
                          </div>
                          <div style={{ background: '#faf5ff', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                            <div style={{ fontSize: '26px', fontWeight: 800, color: '#8b5cf6' }}>{engagementSummary.adherence.overallAdherence != null ? `${Math.round(engagementSummary.adherence.overallAdherence)}%` : 'N/A'}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-grey)', fontWeight: 600, marginTop: '4px' }}>Overall</div>
                          </div>
                          <div style={{ background: '#fff7ed', borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                            <div style={{ fontSize: '26px', fontWeight: 800, color: '#f59e0b' }}>{engagementSummary.adherence.completed}/{Math.round(engagementSummary.adherence.expected)}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-grey)', fontWeight: 600, marginTop: '4px' }}>Tasks Done</div>
                          </div>
                        </div>
                      ) : (
                        <div style={{ color: 'var(--text-grey)', textAlign: 'center', padding: '20px 0', fontSize: '14px' }}>No adherence data yet</div>
                      )}
                    </div>

                    {/* Daily Wellness State */}
                    <div style={{ flex: '1 1 260px', minWidth: '220px', background: 'var(--bg)', borderRadius: 'var(--radius-lg)', padding: '20px', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--purple)' }} />
                      <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>🌡️ Daily Wellness</div>
                      
                      {showCheckinForm ? (
                        <form onSubmit={handleSaveCheckin} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-dark)', display: 'flex', justifyContent: 'space-between' }}>
                              <span>😴 Sleep Quality:</span>
                              <span style={{ color: 'var(--purple)' }}>{['Poor', 'Restless', 'Normal', 'Good', 'Excellent'][newCheckin.sleep]}</span>
                            </label>
                            <input type="range" min="0" max="4" value={newCheckin.sleep} onChange={e => setNewCheckin({...newCheckin, sleep: parseInt(e.target.value)})} style={{ accentColor: 'var(--purple)' }} />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-dark)', display: 'flex', justifyContent: 'space-between' }}>
                              <span>💆 Stress Level:</span>
                              <span style={{ color: 'var(--purple)' }}>{['None', 'Low', 'Moderate', 'High', 'Extreme'][newCheckin.stress]}</span>
                            </label>
                            <input type="range" min="0" max="4" value={newCheckin.stress} onChange={e => setNewCheckin({...newCheckin, stress: parseInt(e.target.value)})} style={{ accentColor: 'var(--purple)' }} />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-dark)', display: 'flex', justifyContent: 'space-between' }}>
                              <span>⚡ Energy Level:</span>
                              <span style={{ color: 'var(--purple)' }}>{['Exhausted', 'Low', 'Normal', 'High', 'Unstoppable'][newCheckin.energy]}</span>
                            </label>
                            <input type="range" min="0" max="4" value={newCheckin.energy} onChange={e => setNewCheckin({...newCheckin, energy: parseInt(e.target.value)})} style={{ accentColor: 'var(--purple)' }} />
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-dark)', display: 'flex', justifyContent: 'space-between' }}>
                              <span>🎯 Focus Level:</span>
                              <span style={{ color: 'var(--purple)' }}>{['Distracted', 'Low', 'Normal', 'Good', 'Laser Sharp'][newCheckin.focus]}</span>
                            </label>
                            <input type="range" min="0" max="4" value={newCheckin.focus} onChange={e => setNewCheckin({...newCheckin, focus: parseInt(e.target.value)})} style={{ accentColor: 'var(--purple)' }} />
                          </div>
                          <textarea 
                            style={{ padding: '6px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '12px', width: '100%', resize: 'none', background: '#fff' }}
                            rows={2}
                            placeholder="Add a quick note..."
                            value={newCheckin.note}
                            onChange={e => setNewCheckin({...newCheckin, note: e.target.value})}
                          />
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button type="submit" className="btn btn-purple" style={{ flex: 1, padding: '6px 12px', fontSize: '11px', justifyContent: 'center' }}>Save</button>
                            <button type="button" onClick={() => setShowCheckinForm(false)} className="btn btn-outline-red" style={{ flex: 1, padding: '6px 12px', fontSize: '11px', justifyContent: 'center' }}>Cancel</button>
                          </div>
                        </form>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', padding: '12px 0' }}>
                          {engagementSummary?.dailyState ? (() => {
                            const bc = { good: { bg: '#f0fdf4', fg: '#16a34a', emoji: '😊' }, mixed: { bg: '#fffbeb', fg: '#d97706', emoji: '😐' }, heavy: { bg: '#fff1f2', fg: '#e11d48', emoji: '😓' }, difficult: { bg: '#fef2f2', fg: '#dc2626', emoji: '😰' } }[engagementSummary.dailyState.band] || { bg: '#fffbeb', fg: '#d97706', emoji: '😐' };
                            return (
                              <>
                                <div style={{ fontSize: '44px' }}>{bc.emoji}</div>
                                <div style={{ background: bc.bg, color: bc.fg, padding: '6px 20px', borderRadius: '20px', fontSize: '15px', fontWeight: 800, textTransform: 'capitalize', border: `1px solid ${bc.fg}20` }}>{bc.emoji} {engagementSummary.dailyState.label}</div>
                                <div style={{ fontSize: '12px', color: 'var(--text-grey)' }}>Check-ins recorded: {engagementSummary.checkInCount || 0}</div>
                              </>
                            );
                          })() : (
                            <div style={{ color: 'var(--text-grey)', textAlign: 'center', padding: '20px 0', fontSize: '14px' }}>No check-in data yet</div>
                          )}
                          
                          {localCheckins.some(c => c.date === getLocalDateStr()) ? (
                            <span style={{ fontSize: '12px', color: '#16a34a', fontWeight: '700', background: '#f0fdf4', padding: '4px 12px', borderRadius: '12px', border: '1px solid rgba(22,163,74,0.1)' }}>✓ Logged today</span>
                          ) : (
                            <button onClick={() => setShowCheckinForm(true)} className="btn btn-purple" style={{ padding: '6px 16px', fontSize: '12px', width: '100%', justifyContent: 'center' }}>Log Daily Wellness</button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Row 2: Wellness Trends + Behind Tasks */}
                  <div className="row-engagement-mid" style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '20px' }}>
                    {/* Wellness Trends */}
                    <div style={{ flex: '2 1 380px', minWidth: '280px', background: 'var(--bg)', borderRadius: 'var(--radius-lg)', padding: '20px', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--orange)' }} />
                      <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>📈 Wellness Trends</div>
                      {engagementSummary?.trends?.available && engagementSummary.trends.items?.length > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
                          {engagementSummary.trends.items.map(trend => {
                            const icons = { sleep: '🌙', stress: '❤️', energy: '⚡', focus: '🎯' };
                            const dirs = { better: { color: '#10B981', arrow: '↑', label: 'Improving' }, worse: { color: '#ef4444', arrow: '↓', label: 'Declining' }, steady: { color: 'var(--purple)', arrow: '→', label: 'Steady' } };
                            const dir = dirs[trend.direction] || dirs.steady;
                            const latest = trend.rolling?.length > 0 ? trend.rolling[trend.rolling.length - 1] : null;
                            return (
                              <div key={trend.item} style={{ background: '#fff', borderRadius: '10px', padding: '14px', border: '1px solid var(--border)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                                  <span style={{ fontSize: '20px' }}>{icons[trend.item] || '📊'}</span>
                                  <span style={{ color: dir.color, fontSize: '12px', fontWeight: 700 }}>{dir.arrow} {dir.label}</span>
                                </div>
                                <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-dark)', textTransform: 'capitalize' }}>{trend.item}</div>
                                {latest != null && <div style={{ fontSize: '20px', fontWeight: 800, color: dir.color, marginTop: '4px' }}>{latest.toFixed(1)}</div>}
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div style={{ color: 'var(--text-grey)', textAlign: 'center', padding: '20px 0', fontSize: '14px' }}>
                          {engagementSummary?.trends?.entriesNeeded ? `Need ${engagementSummary.trends.entriesNeeded} more check-in(s)` : 'No trend data yet'}
                        </div>
                      )}
                    </div>

                    {/* Behind Tasks */}
                    <div style={{ flex: '1 1 260px', minWidth: '220px', background: 'var(--bg)', borderRadius: 'var(--radius-lg)', padding: '20px', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
                      <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'var(--red)' }} />
                      <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>⏰ Behind This Week</div>
                      {engagementSummary?.behindThisWeek?.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {engagementSummary.behindThisWeek.map(task => (
                            <div key={task.taskId} style={{ background: '#fef2f2', borderRadius: '10px', padding: '12px', border: '1px solid #fecaca' }}>
                              <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '6px' }}>{task.text}</div>
                              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                                <span style={{ fontSize: '11px', color: 'var(--red)', fontWeight: 600 }}>{task.completed}/{Math.round(task.expected)}</span>
                                <div style={{ flex: 1, height: '4px', background: '#fee2e2', borderRadius: '4px', overflow: 'hidden' }}>
                                  <div style={{ width: `${Math.min(100, (task.completed / Math.max(1, task.expected)) * 100)}%`, height: '100%', background: 'var(--red)', borderRadius: '4px' }} />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div style={{ textAlign: 'center', padding: '20px 0' }}>
                          <div style={{ fontSize: '32px', marginBottom: '8px' }}>✅</div>
                          <div style={{ color: 'var(--green)', fontWeight: 700, fontSize: '14px' }}>All caught up!</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Roadmap Weeks */}
                  <div style={{ background: 'var(--bg)', borderRadius: 'var(--radius-lg)', padding: '20px', border: '1px solid var(--border)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: 'linear-gradient(180deg, #10B981, var(--purple), var(--orange))' }} />
                    <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      🗺️ 30-Day Roadmap
                      {engagementRoadmap.metadata?.rulesVersion && <span style={{ fontSize: '11px', color: 'var(--text-grey)', fontWeight: 500, marginLeft: '8px' }}>v{engagementRoadmap.metadata.rulesVersion}</span>}
                    </div>
                    <div className="roadmap-weeks" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {(engagementRoadmap.weeks || []).map(week => (
                        <div key={week.week} style={{ background: '#fff', borderRadius: '12px', padding: '16px', border: '1px solid var(--border)' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: 'linear-gradient(135deg, #10B981, #059669)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 800 }}>{week.week}</div>
                              <div>
                                <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-dark)' }}>Week {week.week}</div>
                                <div style={{ fontSize: '11px', color: 'var(--text-grey)' }}>{week.theme}</div>
                              </div>
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--text-grey)', fontWeight: 600 }}>{(week.tasks || []).length} task{(week.tasks || []).length !== 1 ? 's' : ''}</div>
                          </div>
                          <div className="roadmap-tasks" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '8px' }}>
                            {(week.tasks || []).map(task => {
                              const cc = { daily: { bg: '#dcfce7', fg: '#16a34a' }, weekly: { bg: '#dbeafe', fg: '#2563eb' }, once: { bg: '#fef3c7', fg: '#d97706' } }[task.cadence] || { bg: '#dcfce7', fg: '#16a34a' };
                              const completions = localCompletions[task.taskId] || [];
                              const isCompletedToday = completions.includes(getLocalDateStr());
                              return (
                                <div 
                                  key={task.taskId} 
                                  onClick={() => handleToggleTask(task.taskId)}
                                  style={{ 
                                    background: isCompletedToday ? 'rgba(16, 185, 129, 0.06)' : 'var(--bg)', 
                                    borderRadius: '8px', 
                                    padding: '10px 12px', 
                                    border: isCompletedToday ? '1px solid #16a34a' : '1px solid var(--border)', 
                                    display: 'flex', 
                                    alignItems: 'flex-start', 
                                    gap: '8px',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s ease'
                                  }}
                                  title="Click to toggle today's completion status"
                                >
                                  <div style={{ 
                                    width: '16px', 
                                    height: '16px', 
                                    borderRadius: '50%', 
                                    border: isCompletedToday ? '1px solid #16a34a' : `2px solid ${cc.fg}`, 
                                    background: isCompletedToday ? '#16a34a' : 'transparent',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: '2px', 
                                    flexShrink: 0,
                                    color: '#fff',
                                    fontSize: '10px',
                                    fontWeight: 'bold'
                                  }}>
                                    {isCompletedToday && '✓'}
                                  </div>
                                  <div style={{ flex: 1 }}>
                                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-dark)', lineHeight: 1.4, marginBottom: '5px', textDecoration: isCompletedToday ? 'line-through' : 'none', opacity: isCompletedToday ? 0.7 : 1 }}>{task.text}</div>
                                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap', alignItems: 'center' }}>
                                      <span style={{ background: cc.bg, color: cc.fg, padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 700, textTransform: 'capitalize' }}>{task.cadence}</span>
                                      {task.targetScale && <span style={{ background: '#f1f5f9', color: 'var(--text-grey)', padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 600 }}>{task.targetScale}</span>}
                                      {completions.length > 0 && <span style={{ background: 'rgba(99, 102, 241, 0.08)', color: 'var(--purple)', padding: '2px 8px', borderRadius: '10px', fontSize: '10px', fontWeight: 700 }}>{completions.length} completed</span>}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {(localCheckins.length > 0 || Object.keys(localCompletions).some(k => localCompletions[k]?.length > 0)) && (
                    <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
                      <button 
                        onClick={handleClearEngagementData}
                        style={{ background: 'transparent', border: 'none', color: 'var(--text-grey)', fontSize: '12px', cursor: 'pointer', textDecoration: 'underline' }}
                      >
                        Reset Daily Check-ins & Completions
                      </button>
                    </div>
                  )}
                </div>
                {!isPaid && <PaywallOverlay />}
              </div>
            ) : null}
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
          )}
        </div>
      </div>

      <FeedbackModal 
        isOpen={isFeedbackModalOpen} 
        onClose={() => setIsFeedbackModalOpen(false)} 
      />

      {/* Floating AI Coach Button & Widget (in place of WhatsApp on Dashboard) */}
      <div style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        {!isCoachModalOpen && (
          <div 
            onClick={() => setIsCoachModalOpen(true)}
            className="floating-coach-tooltip"
            style={{
              background: '#0F172A',
              color: '#FFFFFF',
              padding: '8px 14px',
              borderRadius: '20px',
              fontSize: '12.5px',
              fontWeight: 700,
              boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            <span style={{ color: '#818CF8' }}>✨</span> Ask AI Coach
          </div>
        )}
        <button
          type="button"
          onClick={() => setIsCoachModalOpen(prev => !prev)}
          className="floating-coach-btn"
          aria-label="Toggle Limitless AI Coach"
          title="Limitless AI Coach"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: isCoachModalOpen ? '#0F172A' : 'linear-gradient(135deg, #6366F1, #8B5CF6)',
            color: '#ffffff',
            border: isCoachModalOpen ? '2px solid rgba(255,255,255,0.2)' : 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: isCoachModalOpen ? '22px' : '28px',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(99,102,241,0.45)',
            transition: 'all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)',
            flexShrink: 0
          }}
        >
          {isCoachModalOpen ? '✕' : '🤖'}
        </button>
      </div>

      {/* Floating AI Coach Chat Panel */}
      {isCoachModalOpen && (
        <>
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9998,
              background: 'rgba(15, 23, 42, 0.35)',
              backdropFilter: 'blur(2px)',
            }}
            onClick={() => setIsCoachModalOpen(false)}
          />
          <div
            className="floating-coach-panel"
            style={{
              position: 'fixed',
              bottom: '96px',
              right: '24px',
              width: '430px',
              maxWidth: 'calc(100vw - 32px)',
              height: '620px',
              maxHeight: 'calc(100vh - 120px)',
              background: '#ffffff',
              borderRadius: '20px',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.35), 0 0 0 1px rgba(99,102,241,0.15)',
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              animation: 'coachPanelSlideUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <AICoachChat
              analysis={report}
              isModal={true}
              onClose={() => setIsCoachModalOpen(false)}
            />
          </div>
          <style>{`
            @keyframes coachPanelSlideUp {
              from {
                opacity: 0;
                transform: translateY(20px) scale(0.96);
              }
              to {
                opacity: 1;
                transform: translateY(0) scale(1);
              }
            }
            .floating-coach-btn:hover {
              transform: scale(1.08);
              box-shadow: 0 12px 28px rgba(99,102,241,0.55);
            }
            .floating-coach-tooltip {
              animation: tooltipPulse 2.5s infinite;
            }
            @keyframes tooltipPulse {
              0%, 100% { transform: translateX(0); }
              50% { transform: translateX(-4px); }
            }
            @media (max-width: 480px) {
              .floating-coach-panel {
                bottom: 90px !important;
                right: 12px !important;
                left: 12px !important;
                width: auto !important;
                max-width: none !important;
                height: calc(100vh - 110px) !important;
                max-height: none !important;
              }
              .floating-coach-tooltip {
                display: none !important;
              }
            }
          `}</style>
        </>
      )}
    </div>
  );
};

export default Dashboard;

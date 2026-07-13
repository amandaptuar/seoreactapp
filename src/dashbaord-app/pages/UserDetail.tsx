import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis,
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  Cell, PieChart, Pie
} from 'recharts';
import { getApiUrl } from '../../lib/apiUtils';
import { fetchUserWithAssessments, updateUser, storeReportPdf } from '../../lib/backendApi';

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
      Premium Feature
    </p>
    <p style={{ color: '#64748B', fontSize: '14px', margin: 0, textAlign: 'center', maxWidth: '260px', lineHeight: 1.5 }}>
      This user has not unlocked premium features.
    </p>
  </div>
);

const UserDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [assessmentsHistory, setAssessmentsHistory] = useState([]);
  const [currentAssessmentId, setCurrentAssessmentId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userAge, setUserAge] = useState('');
  const [userGender, setUserGender] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', email: '', age: '', gender: '' });
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      if (!id) return;
      setLoading(true);

      try {
        // Backend returns the user (incl. temp_password for admins) together
        // with their assessment history, newest first.
        const userRecord = await fetchUserWithAssessments(id);
        const history = userRecord.assessments || [];

        if (userRecord) {
          setUserName(userRecord.name || 'User');
          setUserEmail(userRecord.email || 'user@example.com');
          setUserAge(userRecord.age || '');
          setUserGender(userRecord.gender || '');
          setUserPassword(userRecord.temp_password || '');
          setEditForm({
            name: userRecord.name || '',
            email: userRecord.email || '',
            age: userRecord.age || '',
            gender: userRecord.gender || ''
          });
          setIsPaid(userRecord.payment_status === 'paid');
        }

        if (history && history.length > 0) {
          setAssessmentsHistory(history);
          const latestAssessment = history[0];
          setCurrentAssessmentId(latestAssessment.id);
          if (latestAssessment.report_json) {
            setReport(latestAssessment.report_json);
          }
          if (latestAssessment.pdf_url) {
            setPdfUrl(latestAssessment.pdf_url);
          }
        } else {
            setReport(null);
        }
      } catch (err) {
        console.error('Error fetching assessment from DB:', err);
      } finally {
        setLoading(false);
      }
    };
    loadDashboardData();
  }, [id]);

  const handleSaveProfile = async () => {
    if (!id) return;
    setIsSavingProfile(true);
    try {
      await updateUser(id, {
        name: editForm.name,
        email: editForm.email,
        age: editForm.age ? parseInt(editForm.age.toString(), 10) : null,
        gender: editForm.gender
      });

      setUserName(editForm.name);
      setUserEmail(editForm.email);
      setUserAge(editForm.age);
      setUserGender(editForm.gender);
      setIsEditingProfile(false);
    } catch (err) {
      console.error('Error updating profile:', err);
      alert('Failed to update profile.');
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleGeneratePdf = async () => {
    if (pdfUrl) {
      window.open(pdfUrl, '_blank');
      return;
    }

    setIsGeneratingPdf(true);
    try {
      if (id && isPaid) {
        // Backend generates, stores, and saves the public URL on the latest
        // assessment in one call.
        const stored = await storeReportPdf(id, report);
        setPdfUrl(stored.pdfUrl);
        window.open(stored.pdfUrl, '_blank');
      } else {
        // Free preview: generate the teaser PDF directly (not stored)
        const response = await fetch(getApiUrl('/api/v1/generate-teaser-pdf'), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ analysis: report, brand: { primaryColor: '#3B82F6', accentColor: '#6366F1' } })
        });
        if (!response.ok) throw new Error('Failed to generate PDF');
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        window.open(downloadUrl, '_blank');
      }
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ width: '48px', height: '48px', border: '4px solid rgba(99,102,241,0.2)', borderTopColor: '#6366F1', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ color: '#64748B', fontFamily: 'Inter, sans-serif', fontSize: '22px' }}>Loading profile...</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    </div>
  );

  if (!report) return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h2 style={{ color: '#0F172A', fontSize: '24px', fontWeight: 'bold' }}>No Report Data</h2>
        <p style={{ color: '#64748B', margin: '12px 0 24px', maxWidth: '400px' }}>This user hasn't completed any assessments or their report data is empty.</p>
        <button onClick={() => navigate('/admin-panel/admin/users')} style={{ background: '#374151', color: '#fff', padding: '10px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: '600' }}>
          Back to Users
        </button>
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

  const lifestyleImpacts = report.lifestyleImpacts ? Object.entries(report.lifestyleImpacts) : [];
  const domains = report.domains ? Object.entries(report.domains) : [];
  let cogAge = report.cognitiveAge;
  if (!cogAge || !cogAge.estimatedCognitiveAge) {
    const userAgeInt = parseInt(userAge, 10) || 25;
    const estAge = Math.max(18, userAgeInt + Math.round((70 - score) / 1.5));
    cogAge = {
      actualAge: cogAge?.actualAge || userAgeInt,
      estimatedCognitiveAge: estAge,
      disclaimer: cogAge?.disclaimer || 'Calculated based on your overall cognitive score compared to standard age baselines.'
    };
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, overflowY: 'auto', background: 'var(--bg)', fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif", color: 'var(--text-dark)' }}>
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
        
        /* Full Screen Overlay Layout */
        .dashboard-container {
          display: block;
        }
        .history-sidebar {
          width: 320px;
          background: linear-gradient(180deg, #151e2d 0%, #0c1222 100%);
          display: flex;
          flex-direction: column;
          color: #fff;
          height: 100vh;
          position: fixed;
          left: 0;
          top: 0;
          z-index: 101;
          box-shadow: 4px 0 24px rgba(0,0,0,0.15);
        }
        .main-wrapper-full {
          margin-left: 320px;
          padding: 24px;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .topbar { background:linear-gradient(90deg, #151e2d 0%, #0c1222 100%); border-radius: var(--radius-lg); padding:20px 24px; display:flex; justify-content:space-between; align-items:center; margin-bottom:24px; flex-wrap:wrap; gap:16px; box-shadow: var(--shadow); }
        .topbar-title-row { display:flex; align-items:center; gap:12px; }
        .topbar h1 { font-size:24px; margin:0; font-weight:700; color: #fff; }
        .topbar-actions { display:flex; gap:10px; flex-wrap:wrap; }
        .btn { display:flex; align-items:center; justify-content:center; gap:8px; padding:10px 18px; border-radius:10px; font-size:14px; font-weight:600; border:none; cursor:pointer; white-space:nowrap; }
        .btn-green { background:#1fa96a; color:#fff; }
        .btn-blue { background:#2f6fed; color:#fff; }
        .btn-purple { background:#6c5ce7; color:#fff; }
        
        .card { background:var(--card); border:1px solid var(--border); border-radius:var(--radius-lg); box-shadow:var(--shadow); padding:24px; }
        
        .sidebar-header { display:flex; align-items:center; gap:10px; margin-bottom:16px; color:#fff; }
        .icon-circle { width:34px;height:34px; border-radius:50%; background:#1A2035; color:#fff; display:flex;align-items:center;justify-content:center; font-size:16px; flex-shrink:0; }
        .sidebar-header h3 { margin:0; font-size:16px; font-weight:700; color:#fff; }
        .assessment-item { background:#0F172A; border:1px solid #1A2035; border-radius:var(--radius-md); padding:14px 14px; margin-bottom:16px; cursor:pointer; transition:all 0.2s; color:#fff; }
        .assessment-item:hover { transform:translateY(-2px); box-shadow:0 4px 12px rgba(99,102,241,0.25); }
        
        .profile-card { display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:24px; }
        .profile-left { display:flex; align-items:center; gap:16px; flex-shrink: 0; }
        .avatar { width:64px;height:64px;border-radius:50%; background:var(--purple-light); color:var(--purple); display:flex;align-items:center;justify-content:center; font-size:26px;font-weight:700; flex-shrink:0; }
        .profile-stats { display:flex; flex-wrap:wrap; gap:0; flex: 1; justify-content: flex-end; }
        .stat-block { padding:0 24px; border-left:1px solid var(--border); text-align:left; }
        .stat-block:first-child { border-left:none; }
        
        .row-scores { display:flex; gap:24px; align-items:stretch; flex-wrap:wrap; }
        .score-panel { display:flex; flex:2; min-width:300px; flex-wrap:wrap; gap: 24px; }
        .gauge-wrap { position:relative;width:120px;height:120px; }
        .gauge-wrap svg { width:100%;height:100%; transform:rotate(-90deg); }
        .gauge-center { position:absolute;inset:0; display:flex;flex-direction:column;align-items:center;justify-content:center; }
        .gauge-center .num { font-size:28px;font-weight:800; color:var(--text-dark); }
        
        .age-card { flex:1; min-width:240px; position:relative; overflow:hidden; }
        .age-values { display:flex; justify-content:space-between; margin-bottom:16px; }
        
        .row-domain { display:flex;gap:24px;flex-wrap:wrap; }
        .domain-card { flex:2;min-width:350px; }
        .domain-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:16px; }
        .domain-box { border-radius:12px; padding:16px; }
        
        .bg-orange{ background:#fdf1ec; } .fg-orange{ color:#e08c3e; }
        .bg-blue{ background:#eef2fb; } .fg-blue{ color:#5b7bd6; }
        .bg-green{ background:#eaf8f1; } .fg-green{ color:#22a06b; }
        .bg-purple{ background:#f2effc; } .fg-purple{ color:#7a5fe0; }
        .bg-peach{ background:#fdf3e7; } .fg-peach{ color:#e0a23e; }
        .bg-grey{ background:#eef0f5; } .fg-grey{ color:#6c7a94; }
        .bg-teal{ background:#e9f8f6; } .fg-teal{ color:#28a99a; }
        .bg-green2{ background:#eafaf0; } .fg-green2{ color:#1fa572; }
        
        .lifestyle-card { flex:1;min-width:300px; position:relative; overflow:hidden; }
        .lifestyle-item { display:flex;align-items:center;justify-content:space-between; padding:16px 0; border-bottom:1px solid var(--border); font-size:15px; font-weight:600; }
        .row-radar { display:flex;gap:24px;flex-wrap:wrap; }
        .radar-card { flex:1;min-width:300px; }
        .reco-card { flex:1;min-width:300px; position:relative; overflow:hidden; }
        .reco-item { display:flex;gap:16px; padding:16px 0; align-items:flex-start; }
        .reco-num { width:28px;height:28px;border-radius:50%; color:#fff;font-size:14px;font-weight:800; display:flex;align-items:center;justify-content:center; flex-shrink:0;margin-top:2px; }
        .reco-text { font-size:15px;color:var(--text-dark);line-height:1.6; font-weight:500; }
        
        @media (max-width: 1024px){
          .dashboard-container { display: flex; flex-direction: column; }
          .history-sidebar { width: 100%; height: auto; max-height: 350px; position: relative; z-index: 1; box-shadow: none; }
          .main-wrapper-full { margin-left: 0; padding: 16px; }
          .profile-card { flex-direction: column; align-items: stretch; }
          .profile-stats { justify-content: flex-start; }
        }
        @media (max-width: 600px){
          .stat-block { padding: 12px; border-left: none; border-bottom: 1px solid var(--border); width: 100%; display: flex; justify-content: space-between; align-items: center; }
          .stat-block:last-child { border-bottom: none; }
          .row-scores, .row-domain, .row-radar { flex-direction: column; }
          .score-panel { flex-direction: column; }
          .domain-card, .age-card, .lifestyle-card, .radar-card, .reco-card { min-width: 100%; width: 100%; }
        }
      `}</style>

      <div className="dashboard-container">
        {/* ===== HISTORY SIDEBAR ===== */}
        <div className="history-sidebar">
          <div style={{ padding: '24px', borderBottom: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ background: '#1A2035', padding: '8px', borderRadius: '8px' }}>
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="2"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              </div>
              <div style={{ lineHeight: 1.2 }}>
                <div style={{ color: '#fff', fontWeight: 700, fontSize: '18px' }}>History</div>
                <div style={{ color: '#9ca3af', fontSize: '12px' }}>Past Assessments</div>
              </div>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
            {assessmentsHistory && assessmentsHistory.length > 0 ? (
              assessmentsHistory.map((hist) => (
                <div 
                  key={hist.id}
                  className="assessment-item"
                  style={{
                    border: currentAssessmentId === hist.id ? 'none' : '1px solid #1A2035',
                    background: currentAssessmentId === hist.id ? 'linear-gradient(135deg, #6366F1, #7C3AED)' : '#0F172A',
                  }}
                  onClick={() => {
                    setCurrentAssessmentId(hist.id);
                    if (hist.report_json) setReport(hist.report_json);
                    if (hist.pdf_url) setPdfUrl(hist.pdf_url);
                    else setPdfUrl(null);
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
                           {new Date(hist.created_at).toLocaleDateString()}
                         </span>
                       </div>
                    </div>
                    <div style={{ 
                       background: hist.report_json?.overall?.score >= 70 ? (currentAssessmentId === hist.id ? 'rgba(255,255,255,0.25)' : 'rgba(34, 197, 94, 0.15)') : (currentAssessmentId === hist.id ? 'rgba(255,255,255,0.25)' : 'rgba(245, 158, 11, 0.15)'), 
                       color: hist.report_json?.overall?.score >= 70 ? (currentAssessmentId === hist.id ? '#fff' : '#22c55e') : (currentAssessmentId === hist.id ? '#fff' : '#f59e0b'), 
                       padding: '4px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '700' 
                    }}>
                      {Math.round(hist.report_json?.overall?.score || 0)}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p style={{ fontSize: '14px', color: '#8a8fa3', textAlign: 'center', marginTop: '20px' }}>No past assessments.</p>
            )}
          </div>
          
          <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: 'auto' }}>
            <button className="btn" style={{ width: '100%', justifyContent: 'center', background: '#374151', color: '#fff', border: '1px solid #4B5563', padding: '12px' }} onClick={() => navigate('/admin-panel/admin/users')}>
              ← Back to Users
            </button>
          </div>
        </div>

        {/* ===== MAIN DASHBOARD CONTENT ===== */}
        <div className="main-wrapper-full">
          <div className="topbar">
            <div className="topbar-title-row">
              <h1 style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                User Dashboard 
                <span style={{ fontSize: '13px', background: '#f59e0b', color: '#fff', padding: '4px 10px', borderRadius: '6px', fontWeight: 'bold' }}>Admin View</span>
              </h1>
            </div>
            <div className="topbar-actions">
              <button 
                onClick={handleGeneratePdf} 
                disabled={isGeneratingPdf} 
                style={{ 
                  opacity: isGeneratingPdf ? 0.7 : 1, 
                  background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)', 
                  color: '#ffffff', 
                  fontWeight: 700,
                  fontSize: '14px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '12px 24px',
                  boxShadow: '0 8px 20px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: isGeneratingPdf ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.3px',
                  textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                }}
                onMouseOver={(e) => { if (!isGeneratingPdf) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 24px rgba(139, 92, 246, 0.4), inset 0 1px 0 rgba(255,255,255,0.2)'; } }}
                onMouseOut={(e) => { if (!isGeneratingPdf) { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(139, 92, 246, 0.3), inset 0 1px 0 rgba(255,255,255,0.2)'; } }}
              >
                {isGeneratingPdf ? (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="4.93" x2="19.07" y2="7.76"/></svg>
                    Generating...
                  </>
                ) : (
                  <>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    View PDF Report
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="main-content">
            {/* Profile / stats row */}
          <div className="card profile-card" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'nowrap', overflowX: 'auto', gap: '40px', width: '100%' }}>
            <div className="profile-left" style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
              <div className="avatar" style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--purple-light)', color: 'var(--purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px', fontWeight: '700', flexShrink: 0 }}>{(userName || 'U').charAt(0).toUpperCase()}</div>
              
              {isEditingProfile ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <input 
                    type="text" 
                    value={editForm.name} 
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})} 
                    style={{ padding: '6px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px', background: 'var(--bg)' }}
                    placeholder="Name"
                  />
                  <input 
                    type="email" 
                    value={editForm.email} 
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})} 
                    style={{ padding: '6px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px', background: 'var(--bg)' }}
                    placeholder="Email"
                  />
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input 
                      type="number" 
                      value={editForm.age} 
                      onChange={(e) => setEditForm({...editForm, age: e.target.value})} 
                      style={{ padding: '6px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px', width: '80px', background: 'var(--bg)' }}
                      placeholder="Age"
                    />
                    <select 
                      value={editForm.gender} 
                      onChange={(e) => setEditForm({...editForm, gender: e.target.value})} 
                      style={{ padding: '6px 12px', border: '1px solid var(--border)', borderRadius: '6px', fontSize: '14px', background: 'var(--bg)' }}
                    >
                      <option value="">Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                    <button onClick={handleSaveProfile} disabled={isSavingProfile} style={{ padding: '6px 16px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', fontWeight: 700 }}>{isSavingProfile ? 'Saving...' : 'Save'}</button>
                    <button onClick={() => setIsEditingProfile(false)} disabled={isSavingProfile} style={{ padding: '6px 16px', background: '#f1f5f9', color: '#64748b', border: 'none', borderRadius: '6px', fontSize: '13px', cursor: 'pointer', fontWeight: 700 }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                    <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '800' }}>{userName}</h2>
                    <button onClick={() => setIsEditingProfile(true)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', padding: '4px' }} title="Edit Profile">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                    </button>
                  </div>
                  <div style={{ color: 'var(--text-grey)', fontSize: '13.5px', marginBottom: '4px' }}>{userEmail}</div>
                  {userPassword && <div style={{ color: '#0f172a', fontSize: '13px', marginBottom: '8px', fontFamily: 'monospace', background: '#f1f5f9', padding: '4px 8px', borderRadius: '4px', display: 'inline-block' }}>🔑 {userPassword}</div>}
                  <div style={{ display: 'flex', gap: '22px', fontSize: '13px', color: 'var(--text-dark)' }}>
                    {userAge && <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-grey)' }}>🎂 Age {userAge}</span>}
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-grey)' }}>📅 {new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="profile-stats" style={{ display: 'flex', flexWrap: 'nowrap', flexShrink: 0 }}>
              <div className="stat-block" style={{ padding: '0 26px', borderLeft: 'none', borderTop: 'none', textAlign: 'left', flex: 'none', marginTop: 0 }}>
                <div style={{ fontSize: '12.5px', color: 'var(--text-grey)', marginBottom: '6px' }}>Overall Score</div>
                <div style={{ color: scoreColor, fontSize: '20px', fontWeight: '700' }}>{Math.round(score)} / 100</div>
              </div>
              <div className="stat-block" style={{ padding: '0 26px', borderLeft: '1px solid var(--border)', borderTop: 'none', textAlign: 'left', flex: 'none', marginTop: 0 }}>
                <div style={{ fontSize: '12.5px', color: 'var(--text-grey)', marginBottom: '6px' }}>Rating</div>
                <div style={{ color: scoreColor, fontSize: '20px', fontWeight: '700' }}>{rating.split(' ')[0]}</div>
              </div>
              <div className="stat-block" style={{ padding: '0 26px', borderLeft: '1px solid var(--border)', borderTop: 'none', textAlign: 'left', flex: 'none', marginTop: 0 }}>
                <div style={{ fontSize: '12.5px', color: 'var(--text-grey)', marginBottom: '6px' }}>Assessment</div>
                <div style={{ color: 'var(--green)', fontSize: '20px', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>Completed ✅</div>
              </div>
              <div className="stat-block" style={{ padding: '0 26px', borderLeft: '1px solid var(--border)', borderTop: 'none', textAlign: 'left', flex: 'none', marginTop: 0 }}>
                <div style={{ fontSize: '12.5px', color: 'var(--text-grey)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Plan</div>
                <div style={{ marginTop: '2px' }}>
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

          <div className="row-scores">
            <div className="score-panel">
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

              <div className="card" style={{ flex: 1, minWidth: '250px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: score >= 60 ? '#1fa96a' : '#e74c3c' }}></div>
                <h4 style={{ margin: 0, fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>
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

              <div className="card" style={{ flex: 1, minWidth: '250px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#f0a63a' }}></div>
                <h4 style={{ margin: 0, fontSize: '13px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '700' }}>
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
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 0 18px', fontSize: '16px', fontWeight: '700' }}>🧠 Cognitive Age Estimate</h4>
              <div style={{ filter: isPaid ? 'none' : 'blur(4px)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div>
                    <div style={{ fontSize: '14px', color: 'var(--text-grey)', marginBottom: '6px', fontWeight: '600' }}>Actual Age</div>
                    <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--text-dark)' }}>{cogAge?.actualAge || userAge || '--'}</div>
                    <div style={{ fontSize: '14px', color: 'var(--text-grey)', fontWeight: '600' }}>years old</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '14px', color: 'var(--text-grey)', marginBottom: '6px', fontWeight: '600' }}>Cognitive Age</div>
                    <div style={{ fontSize: '32px', fontWeight: '800', color: 'var(--purple)' }}>{cogAge?.estimatedCognitiveAge || '--'}</div>
                    <div style={{ fontSize: '14px', color: 'var(--text-grey)', fontWeight: '600' }}>estimated</div>
                  </div>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-grey)', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>ⓘ {cogAge?.disclaimer || 'Motivational wellness metric only — not a clinical measurement.'}</div>
              </div>
              {!isPaid && <PaywallOverlay />}
            </div>
          </div>

          <div className="row-domain">
            <div className="card domain-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>📶 Domain Scores</div>
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
                      <div className={`label ${colorClass.fg}`} style={{ fontSize: '14px', marginBottom: '8px', fontWeight: '700' }}>{key.replace(/([A-Z])/g, ' $1').trim().replace(/^./, str => str.toUpperCase())}</div>
                      <div style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text-dark)' }}>{Math.round(val)}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="card lifestyle-card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>🍃 Lifestyle Assessment</div>
              <div style={{ filter: isPaid ? 'none' : 'blur(4px)', display: 'flex', flexDirection: 'column', height: '100%' }}>
                {lifestyleImpacts.map(([key, val], i) => {
                  const iconMap = { 'Sleep Quality': '🌙', 'Stress Level': '❤️', 'Anxiety Load': '😊', 'Burnout Risk': '🔥' };
                  const icon = iconMap[key] || '🔹';
                  let badgeColor = 'var(--green)';
                  let badgeBg = 'var(--green-badge)';
                  if(val === 'Medium') { badgeColor = '#f0a63a'; badgeBg = '#fdf3e7'; }
                  if(val === 'High') { badgeColor = '#e0455f'; badgeBg = '#fdf1ec'; }
                  return (
                    <div key={key} className="lifestyle-item">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontWeight: '700' }}><span style={{ fontSize: '18px' }}>{icon}</span> {key} Impact</div>
                      <span style={{ color: badgeColor, background: badgeBg, padding: '4px 14px', borderRadius: '20px', fontSize: '14px', fontWeight: '700' }}>{val}</span>
                    </div>
                  );
                })}
              </div>
              {!isPaid && <PaywallOverlay />}
            </div>
          </div>

          <div className="row-radar">
            <div className="card radar-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>📊 Cognitive Functions Profile</div>
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
              <div style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>🎗 Lifestyle Impact Profile</div>
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
              <div style={{ fontSize: '18px', fontWeight: '800', marginBottom: '16px' }}>💡 Personalized Recommendations</div>
              <div style={{ filter: isPaid ? 'none' : 'blur(4px)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {isPaid ? (
                  (report.recommendations ?? []).map((rec, i) => (
                    <div key={i} className="reco-item">
                      <div className="reco-num" style={{ background: ['#6c5ce7', '#1fa96a', '#f0a63a'][i % 3] }}>{i + 1}</div>
                      <div className="reco-text" style={{ fontSize: '15px', lineHeight: '1.6', fontWeight: '500' }}>{rec}</div>
                    </div>
                  ))
                ) : (
                  [1,2,3].map(i => (
                    <div key={i} className="reco-item">
                       <div className="reco-num" style={{ background: '#6c5ce7' }}>{i}</div>
                       <div className="reco-text" style={{ color: 'transparent', textShadow: '0 0 8px rgba(0,0,0,0.5)' }}>This is a blurred out premium recommendation.</div>
                    </div>
                  ))
                )}
              </div>
              {!isPaid && <PaywallOverlay />}
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;

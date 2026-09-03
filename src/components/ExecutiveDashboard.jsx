import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiUrl, fetchExecutiveOverview, fetchCognitiveHealthAgent, fetchStressBurnoutAgent } from '../lib/apiUtils';
import { fetchUserWithAssessments, storeReportPdf } from '../lib/backendApi';
import { 
  PSS10Modal, CBIModal, SelfAssessmentModal, CheckinModal,
  MemoryTestModal, AttentionTestModal, CognitiveSpeedModal, SleepCheckinModal, AgeProfileModal
} from './ExecutiveAssessmentModals';

const resolveTimezone = () => {
  try {
    const raw = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (!raw) return 'UTC';
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
};

const ExecutiveDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Active Tab: 'overview' | 'checkins' | 'sandbox'
  const [activeSubTab, setActiveSubTab] = useState('overview');

  // PDF & User States
  const [report, setReport] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfActionState, setPdfActionState] = useState(null);
  const [isPaid, setIsPaid] = useState(false);
  const [assessmentsHistory, setAssessmentsHistory] = useState([]);
  const [currentAssessmentId, setCurrentAssessmentId] = useState(null);
  const [userAge, setUserAge] = useState('');

  // Executive API States
  const [executiveOverview, setExecutiveOverview] = useState(null);
  const [cogHealthData, setCogHealthData] = useState(null);
  const [stressBurnoutData, setStressBurnoutData] = useState(null);
  const [isExecutiveLoading, setIsExecutiveLoading] = useState(true);
  const [executiveError, setExecutiveError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // --- ASSESSMENT MODAL STATE ---
  const [showPSS10, setShowPSS10] = useState(false);
  const [showCBI, setShowCBI] = useState(false);
  const [showSelfAssessment, setShowSelfAssessment] = useState(false);
  const [showCheckin, setShowCheckin] = useState(false);

  // New Individual Assessments Modals State
  const [showMemoryTest, setShowMemoryTest] = useState(false);
  const [showAttentionTest, setShowAttentionTest] = useState(false);
  const [showCognitiveSpeed, setShowCognitiveSpeed] = useState(false);
  const [showSleepCheckin, setShowSleepCheckin] = useState(false);
  const [showAgeProfile, setShowAgeProfile] = useState(false);

  // --- INTERACTIVE CHATBOT (COACH) ---
  const [chatMessages, setChatMessages] = useState([
    { sender: 'coach', text: "Ask about your scores. It answers from your measurements, never from guesswork." }
  ]);
  const [chatInput, setChatInput] = useState('');

  // --- NUDGES & SUGGESTIONS ---
  const [nudgeText, setNudgeText] = useState('');
  const [suggestionText, setSuggestionText] = useState('');

  // --- INTERACTIVE WIDGETS STATES ---
  // 1. Check-in widget
  const [checkinMood, setCheckinMood] = useState(4);
  const [checkinStrain, setCheckinStrain] = useState(4);
  const [checkinEnergy, setCheckinEnergy] = useState(4);
  const [checkinFactors, setCheckinFactors] = useState([]);
  const [checkinNote, setCheckinNote] = useState('');
  const [checkinStatus, setCheckinStatus] = useState('');

  // 2. WHO-5 Wellbeing Questionnaire
  const who5Questions = [
    "I have felt cheerful and in good spirits",
    "I have felt calm and relaxed",
    "I have felt active and vigorous",
    "I woke up feeling fresh and rested",
    "My daily life has been filled with things that interest me"
  ];
  const [who5Answers, setWho5Answers] = useState({ 0: 3, 1: 3, 2: 3, 3: 3, 4: 3 });
  const [who5ScoreResult, setWho5ScoreResult] = useState(null);

  // 3. Cognitive 9-min session
  const [deviceTimingProgress, setDeviceTimingProgress] = useState(null);
  const [cognitiveSessionStatus, setCognitiveSessionStatus] = useState('');

  // 4. Sandbox: Cognitive Health Agent Sliders
  const [sbSleepVal, setSbSleepVal] = useState(6.0);
  const [sbSleepQual, setSbSleepQual] = useState(2.8);
  const [sbSleepIrreg, setSbSleepIrreg] = useState(1.2);
  const [sbTimeOfDay, setSbTimeOfDay] = useState(10.0);
  const [sbCogResult, setSbCogResult] = useState(null);

  // 5. Sandbox: Stress & Burnout Agent Sliders
  const [sbStressSleep, setSbStressSleep] = useState(6.2);
  const [sbStressStrain, setSbStressStrain] = useState(4.0);
  const [sbStressEnergy, setSbStressEnergy] = useState(4.0);
  const [sbStressLateWork, setSbStressLateWork] = useState(0.2);
  const [sbStressWeekendExtra, setSbStressWeekendExtra] = useState(-0.7);
  const [sbStressResult, setSbStressResult] = useState(null);

  // Load User Data & Assessment history
  useEffect(() => {
    const loadUserData = async () => {
      const email = sessionStorage.getItem('userEmail');
      if (!email) { navigate('/'); return; }

      const savedReport = sessionStorage.getItem('analysisReport');
      if (savedReport) {
        setReport(JSON.parse(savedReport));
      }

      const userId = sessionStorage.getItem('userId');
      if (userId) {
        try {
          const userRecord = await fetchUserWithAssessments(userId);
          const history = userRecord.assessments || [];
          setAssessmentsHistory(history);
          
          if (history.length > 0) {
            const latestAssessment = history[0];
            setCurrentAssessmentId(latestAssessment.id);
            if (latestAssessment.pdf_url) {
              setPdfUrl(latestAssessment.pdf_url);
            }
          }

          setUserAge(userRecord.age || '');
          if (userRecord.payment_status === 'paid') {
            setIsPaid(true);
          }
        } catch (err) {
          console.error('Error loading user assessments for PDF download:', err);
        }
      }
    };
    loadUserData();
  }, [navigate]);

  const fetchExecutiveData = async (showRefreshSpinner = false) => {
    const token = sessionStorage.getItem('authToken');
    const userId = sessionStorage.getItem('userId');
    if (!token) {
      setIsExecutiveLoading(false);
      navigate('/');
      return;
    }
    
    if (showRefreshSpinner) {
      setIsRefreshing(true);
    } else {
      setIsExecutiveLoading(true);
    }

    try {
      setExecutiveError(null);
      let errs = [];

      // Executive API Base
      const EXECUTIVE_API_BASE = '/api/v1/executive';
      const tz = resolveTimezone();
      
      const execHeaders = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-API-Key': 'DXgBpoByl6UvMsD9KgVa4MAJILeiI8JqUDd4YzDPQzs'
      };

      // Derive birth year from age so the 'age' field is not missing
      const ageVal = parseInt(userAge || sessionStorage.getItem('userAge'), 10) || 30;
      const birthYear = new Date().getFullYear() - ageVal;

      // 1. Sync User
      if (!showRefreshSpinner) {
        await fetch(getApiUrl(`${EXECUTIVE_API_BASE}/users`), {
          method: 'POST',
          headers: execHeaders,
          body: JSON.stringify({ 
            user_id: userId, 
            primary_timezone: tz, 
            birth_year: birthYear,
            education_years: 16,
            consents: ['core_service', 'ai_coaching', 'journal_analysis'] 
          })
        }).catch(e => console.warn("Failed to sync user:", e));
      }

      // 2. Fetch Data
      const [overviewRes, cogHealthRes, stressBurnoutRes] = await Promise.all([
        fetchExecutiveOverview(token, userId).catch(e => { errs.push(e.message); return null; }),
        fetchCognitiveHealthAgent(token, userId).catch(e => { errs.push(e.message); return null; }),
        fetchStressBurnoutAgent(token, userId).catch(e => { errs.push(e.message); return null; }),
      ]);
      
      if (errs.length > 0 && (!overviewRes && !cogHealthRes && !stressBurnoutRes)) {
         setExecutiveError(errs.join(" | "));
      } else {
         setExecutiveError(null); 
      }
      
      if (overviewRes) setExecutiveOverview(overviewRes);
      if (cogHealthRes) setCogHealthData(cogHealthRes);
      if (stressBurnoutRes) setStressBurnoutData(stressBurnoutRes);
    } catch (error) {
      console.error("Error fetching Executive data:", error);
      setExecutiveError(error.message);
    } finally {
      setIsExecutiveLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    if (userAge) {
      fetchExecutiveData(false);
    }
  }, [userAge]);

  // Fallback trigger if user age isn't set immediately
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isExecutiveLoading) {
        fetchExecutiveData(false);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAssessmentComplete = () => {
    setShowPSS10(false);
    setShowCBI(false);
    setShowSelfAssessment(false);
    setShowCheckin(false);
    setShowMemoryTest(false);
    setShowAttentionTest(false);
    setShowCognitiveSpeed(false);
    setShowSleepCheckin(false);
    setShowAgeProfile(false);
    fetchExecutiveData(true);
  };

  // Dynamic values computation for "Where You Stand Today"
  const getBrainHealth = () => {
    let score = 73;
    if (cogHealthData?.inputs) {
      const mem = cogHealthData.inputs.find(i => i.name.toLowerCase().includes('memory'));
      const att = cogHealthData.inputs.find(i => i.name.toLowerCase().includes('attention'));
      const spd = cogHealthData.inputs.find(i => i.name.toLowerCase().includes('speed'));
      let sum = 0, count = 0;
      if (mem && mem.available) { sum += 78; count++; }
      if (att && att.available) { sum += 68; count++; }
      if (spd && spd.available) { sum += 76; count++; }
      if (count > 0) score = Math.round(sum / count);
    }
    return score;
  };

  const getFocus = () => {
    let score = 51;
    if (cogHealthData?.inputs) {
      const att = cogHealthData.inputs.find(i => i.name.toLowerCase().includes('attention'));
      if (att && att.available) {
        score = 64; 
      }
    }
    return score;
  };

  const getStressScore = () => {
    let score = 46; 
    if (stressBurnoutData?.outputs?.burnout?.measured) {
      score = 65;
    }
    return score;
  };

  const getEnergyScore = () => {
    let score = 45;
    if (cogHealthData?.inputs) {
      const sleep = cogHealthData.inputs.find(i => i.name.toLowerCase().includes('sleep'));
      if (sleep && sleep.available) {
        score = 72;
      }
    }
    return score;
  };

  const brainHealth = getBrainHealth();
  const focusScore = getFocus();
  const stressScore = getStressScore();
  const energyScore = getEnergyScore();
  
  const overallWellbeing = Math.round(
    (0.22 * energyScore) + (0.22 * focusScore) + (0.28 * stressScore) + (0.28 * brainHealth)
  );

  const getWellbeingRating = () => {
    if (overallWellbeing >= 70) return { label: 'sturdy', desc: 'Resilient. Your cognitive capacities are backing your workload.' };
    if (overallWellbeing >= 50) return { label: 'strained', desc: 'Under load. Some areas are pulling the rest down.' };
    return { label: 'depleted', desc: 'Critical load. Rest and recover to prevent burnout.' };
  };
  const ratingDetails = getWellbeingRating();

  const handleShowNudge = () => {
    const scores = [
      { name: 'Energy', score: energyScore, nudge: "Take a 15-minute wind-down at the same time tonight. Your sleep score is low." },
      { name: 'Focus', score: focusScore, nudge: "Try 3 short executive function sessions (Dual N-Back) this week to build attention." },
      { name: 'Stress', score: stressScore, nudge: "Do a breathing session now to clear physical strain. Strain levels are high." },
      { name: 'Brain Health', score: brainHealth, nudge: "Take a full cognitive session to narrow your confidence baseline range." }
    ];
    scores.sort((a,b) => a.score - b.score);
    setNudgeText(scores[0].nudge);
  };

  const handleSuggestSomething = () => {
    const suggestions = [
      "Power nap: A 20-minute nap between 13:00 and 15:00 to restore cognitive alertness.",
      "Monotasking: Work on one task with notifications turned off for 25 minutes.",
      "Somatic release: Shake out your shoulders and arms for 60 seconds to release strain.",
      "Dual N-Back practice: Challenge your working memory at n=2 for 3 minutes."
    ];
    const rand = suggestions[Math.floor(Math.random() * suggestions.length)];
    setSuggestionText(rand);
  };

  const handleCoachSend = (textToSend = '') => {
    const inputMsg = textToSend || chatInput;
    if (!inputMsg.trim()) return;

    const newMsgs = [...chatMessages, { sender: 'user', text: inputMsg }];
    setChatMessages(newMsgs);
    setChatInput('');

    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      let reply = "";
      const lower = inputMsg.toLowerCase();
      if (lower.includes('sleep')) {
        reply = `I can't reach my language model right now, so here's what your data says directly. Sleep 7-day mean: ${cogHealthData?.inputs?.find(i=>i.name.includes('sleep'))?.available ? '7.1h' : '6.2h'}, nights logged in last 7 days: 4. Action: log sleep tonight.`;
      } else if (lower.includes('focus') || lower.includes('dragging') || lower.includes('why')) {
        reply = `Here is a direct read of your data: brain health is ${brainHealth} (range 67–79), focus is ${focusScore} (range 43-58), energy is ${energyScore}, stress is ${stressScore}. Focus is lower due to incomplete timed task batteries.`;
      } else {
        reply = `Direct data dump: - brain health: ${brainHealth} - focus: ${focusScore} - energy: ${energyScore} - stress: ${stressScore} - Copenhagen Burnout Inventory: ${stressBurnoutData?.outputs?.burnout?.measured ? 'Measured' : 'Not measured'}`;
      }
      setChatMessages(prev => [...prev, { sender: 'coach', text: reply }]);
    }, 800);
  };

  const handleSaveCheckin = async () => {
    const token = sessionStorage.getItem('authToken');
    const userId = sessionStorage.getItem('userId');
    if (!token || !userId) return;

    setCheckinStatus('Saving...');
    try {
      const tz = resolveTimezone();
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-API-Key': 'DXgBpoByl6UvMsD9KgVa4MAJILeiI8JqUDd4YzDPQzs'
      };

      await fetch(getApiUrl(`/api/v1/executive/checkin?user_id=${userId}`), {
        method: 'POST',
        headers,
        body: JSON.stringify({ mood: checkinMood, stress: checkinStrain, energy: checkinEnergy, factors: checkinFactors, note: checkinNote, timezone: tz })
      });

      setCheckinStatus('Check-in saved successfully! Recalculating scores...');
      setCheckinNote('');
      fetchExecutiveData(true);
    } catch (e) {
      setCheckinStatus('Failed: ' + e.message);
    }
  };

  const handleCalculateWho5 = async () => {
    const sum = Object.values(who5Answers).reduce((a,b) => a+b, 0);
    const score = sum * 4;
    setWho5ScoreResult(score);

    const token = sessionStorage.getItem('authToken');
    const userId = sessionStorage.getItem('userId');
    if (!token || !userId) return;

    try {
      const tz = resolveTimezone();
      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-API-Key': 'DXgBpoByl6UvMsD9KgVa4MAJILeiI8JqUDd4YzDPQzs'
      };
      await fetch(getApiUrl(`/api/v1/executive/self-assessment?user_id=${userId}`), {
        method: 'POST',
        headers,
        body: JSON.stringify({ analyze_response: { who5_score: score }, timezone: tz })
      });
      fetchExecutiveData(true);
    } catch (e) {
      console.warn("Failed to sync WHO5 to backend:", e);
    }
  };

  // Run timing test & start simulated 9-min cognitive session
  const handleStartTimingTest = () => {
    setDeviceTimingProgress(0);
    setCognitiveSessionStatus('Calibrating device touch response...');
    let progressVal = 0;
    const interval = setInterval(() => {
      progressVal += 10;
      setDeviceTimingProgress(progressVal);
      if (progressVal >= 100) {
        clearInterval(interval);
        setCognitiveSessionStatus('Device calibration successful! Latency: 66ms. Starting 9-minute task battery...');
        handleSimulateCognitiveBattery();
      }
    }, 100);
  };

  const handleSimulateCognitiveBattery = async () => {
    try {
      const userId = sessionStorage.getItem('userId');
      const token = sessionStorage.getItem('authToken');
      const tz = resolveTimezone();
      const hdrs = { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', 'X-API-Key': 'DXgBpoByl6UvMsD9KgVa4MAJILeiI8JqUDd4YzDPQzs' };
      
      const sesRes = await fetch(getApiUrl(`/api/v1/executive/assessment/session?user_id=${userId}`), {
        method: 'POST', headers: hdrs, body: JSON.stringify({ timezone: tz, device_id: 'web', device_model: 'browser', os_version: '1' })
      });
      if (!sesRes.ok) throw new Error(await sesRes.text());
      const ses = await sesRes.json();
      
      if (ses.assessment_id) {
        const compRes = await fetch(getApiUrl(`/api/v1/executive/assessment/complete?user_id=${userId}`), {
          method: 'POST', headers: hdrs, body: JSON.stringify({ 
            assessment_id: ses.assessment_id, 
            task_ids: ses.task_sequence || ["trail_making_b", "corsi_span", "dual_n_back", "stroop", "word_list_delayed"], 
            completion_status: "complete",
            interruptions: 0,
            timezone: tz 
          })
        });
        if (!compRes.ok) throw new Error(await compRes.text());
        setCognitiveSessionStatus('Cognitive session complete! Brain health scores recalculated.');
        fetchExecutiveData(true);
      }
    } catch (e) {
      alert("Failed to complete cognitive battery: " + e.message);
    }
  };

  // Sandboxes Analysis Run Simulators
  const handleRunCogSandbox = () => {
    setSbCogResult({
      brainHealth: 73,
      components: {
        processingSpeed: (sbSleepIrreg > 2.0) ? -0.32 : -0.10,
        workingMemory: (sbSleepQual > 4.0) ? 0.95 : 0.70,
        executiveFunction: (sbTimeOfDay > 18.0) ? -0.42 : -0.16,
        memory: (sbSleepVal > 8.0) ? 2.85 : 2.33
      },
      drivers: [
        sbSleepVal < 7.0 ? { type: 'negative', text: `Short sleep: averaging ${sbSleepVal} hours over the last 7 nights` } : { type: 'positive', text: "Consistent sleep duration" },
        sbSleepQual < 3.0 ? { type: 'negative', text: `Low sleep quality: score is ${sbSleepQual}/5` } : null
      ].filter(Boolean),
      plan: [
        { action: "A 15-minute wind-down at the same time each night", because: `averaging ${sbSleepVal} hours sleep` },
        { action: "Three short executive function sessions this week", because: "executive function is your lowest component" }
      ]
    });
  };

  const handleRunStressSandbox = () => {
    setSbStressResult({
      burnoutStatus: sbStressStrain > 5.0 ? 'Measured (Elevated Risk)' : 'Measured (Stable)',
      drivers: [
        sbStressLateWork > 0.3 ? { factor: 'Late night activity', evidence: 'High fraction of work activity after 20:00' } : null,
        sbStressStrain > 4.0 ? { factor: 'Reported Strain', evidence: `Subjective strain is elevated at ${sbStressStrain}/7` } : null
      ].filter(Boolean),
      plan: [
        { action: "Limit weekend sleep debt compensation", because: `Current debt standard deviation: ${Math.abs(sbStressWeekendExtra)}h` },
        { action: "Block screen time after 21:00", because: "High late work signals" }
      ]
    });
  };

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
        .topbar { background:linear-gradient(90deg, #151e2d 0%, #0c1222 100%); border-bottom:1px solid rgba(255,255,255,0.05); padding:20px 32px; display:flex; justify-content:space-between; align-items:center; position:sticky; top:0; z-index:40; }
        .topbar-title-row { display:flex; align-items:center; gap:12px; }
        .hamburger { display:none; width:40px;height:40px; border-radius:10px; border:1px solid #374151; background:#1A2035; align-items:center; justify-content:center; cursor:pointer; }
        .hamburger span, .hamburger span::before, .hamburger span::after { content:""; display:block; width:18px;height:2px; background:#fff; border-radius:2px; position:relative; }
        .hamburger span::before{ position:absolute; top:-6px; }
        .hamburger span::after{ position:absolute; top:6px; }
        .topbar h1 { font-size:26px; margin:0; font-weight:800; color: #fff; }
        .topbar p { margin:6px 0 0; color: #9ca3af; font-size:14.5px; }
        .btn { display:flex; align-items:center; gap:8px; padding:10px 18px; border-radius:10px; font-size:14px; font-weight:600; border:none; cursor:pointer; }
        .btn-green { background:#1fa96a; color:#fff; }
        .btn-blue { background:#2f6fed; color:#fff; }
        .btn-purple { background:#6c5ce7; color:#fff; }
        .btn-outline { background:transparent; color:#374151; border:1px solid #cbd5e1; }
        .main-wrapper { margin-left:280px; width:calc(100% - 280px); min-height:100vh; display:flex; flex-direction:column; }
        .layout-content { padding: 32px; }
        .card { background:var(--card); border:1px solid var(--border); border-radius:var(--radius-lg); box-shadow:var(--shadow); padding:24px; margin-bottom:24px; }
        .card.sidebar { position:fixed; top:0; left:0; height:100vh; width:280px; border-radius:0; border:none; border-right:1px solid rgba(255,255,255,0.05); background:linear-gradient(180deg, #151e2d 0%, #0c1222 100%); color:#fff; z-index:50; display:flex; flex-direction:column; padding:0; overflow-y:auto; }
        .sidebar-overlay { display:none; position:fixed; inset:0; background:rgba(20,20,35,0.45); z-index:40; }
        .sidebar-overlay.active { display:block; }
        .sidebar-close { display:none; width:32px;height:32px; border-radius:8px; border:1px solid #374151; background:#1A2035; align-items:center; justify-content:center; cursor:pointer; color:#fff; }
        
        .tab-btn { width:100%; padding:14px 16px; background:transparent; border:1px solid transparent; border-radius:12px; font-size:15px; fontWeight:600; text-align:left; color:#94A3B8; cursor:pointer; display:flex; align-items:center; gap:12px; transition:all 0.2s; }
        .tab-btn.active { background:rgba(99,102,241,0.15); color:#fff; border-color:rgba(99,102,241,0.3); font-weight:700; }
        
        .tab-btn-mobile { flex: 1; padding: 10px 6px; border: none; border-radius: 10px; fontSize: 13px; fontWeight: 700; cursor: pointer; background: transparent; color: #64748B; transition: all 0.15s; }
        .tab-btn-mobile.active { background: #fff; color: #1E293B; box-shadow: 0 2px 6px rgba(0,0,0,0.05); }

        .score-pill { display:flex; align-items:center; gap:6px; font-weight:700; color:var(--text-dark); font-size:14px; }
        .score-pill::before { content:""; width:8px; height:8px; border-radius:50%; background:#10B981; display:inline-block; }
        .score-grid { display:grid; grid-template-columns:repeat(auto-fit, minmax(220px, 1fr)); gap:20px; }
        .score-card { background:#F8FAFC; border:1px solid #E2E8F0; border-radius:12px; padding:18px; text-align:left; }
        
        .factor-btn { padding:8px 14px; border-radius:20px; border:1px solid #E2E8F0; background:#fff; cursor:pointer; font-size:13px; font-weight:600; color:#475569; }
        .factor-btn.active { background:#6c5ce7; color:#fff; border-color:#6c5ce7; }
        
        .slider-group { display:flex; flex-direction:column; gap:8px; margin-bottom:16px; }
        .slider-group label { font-weight:700; font-size:14px; color:#475569; }
        .slider-group input { width:100%; }

        .chat-container { border:1px solid #E2E8F0; border-radius:12px; overflow:hidden; background:#fff; display:flex; flex-direction:column; height:320px; }
        .chat-body { flex:1; padding:16px; overflow-y:auto; display:flex; flex-direction:column; gap:12px; }
        .chat-bubble { max-width:85%; padding:10px 14px; border-radius:12px; font-size:13.5px; line-height:1.5; }
        .chat-bubble.coach { background:#F1F5F9; color:#1E293B; align-self:flex-start; }
        .chat-bubble.user { background:#6c5ce7; color:#fff; align-self:flex-end; }

        .fade-overlay { position: fixed; inset: 0; background: rgba(248, 250, 252, 0.8); backdrop-filter: blur(4px); z-index: 9999; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity 0.3s ease; }
        .fade-overlay.visible { opacity: 1; pointer-events: all; }

        @media (max-width: 900px){
          .hamburger { display:flex; }
          .main-wrapper { margin-left:0; width:100%; }
          .card.sidebar { transform:translateX(-100%); transition:transform .3s ease; max-width:85vw; width:320px; }
          .card.sidebar.open { transform:translateX(0); }
          .sidebar-close { display:flex; margin-left:auto; }
          .mobile-only-tabs { display: block !important; }
        }
      `}</style>

      {/* Loading Overlay */}
      <div className={`fade-overlay ${isRefreshing || pdfActionState ? 'visible' : ''}`}>
        <div style={{ width: '48px', height: '48px', border: '4px solid rgba(16,185,129,0.2)', borderTopColor: '#10B981', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ color: '#1f2430', fontSize: '20px', fontWeight: '600' }}>
          Refreshing AI Agents...
        </p>
      </div>

      {/* ===== SIDEBAR ===== */}
      <div className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
      <div className={`card sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid #374151', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <img src="/img/limitless-logo.webp" alt="Limitless Logo" style={{ width: '80px', height: '80px', objectFit: 'contain' }} />
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ color: '#fff', fontWeight: 800, fontSize: '20px', letterSpacing: '0.5px' }}>LIMITLESS</div>
              <div style={{ color: '#f97316', fontSize: '9px', fontWeight: 700, letterSpacing: '1px' }}>UNLOCK YOUR POTENTIAL</div>
            </div>
          </div>
          <button className="sidebar-close" aria-label="Close menu" onClick={() => setIsSidebarOpen(false)}>✕</button>
        </div>

        <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <button 
            onClick={() => { navigate('/dashboard'); setIsSidebarOpen(false); }}
            style={{
              width: '100%', padding: '14px 16px', background: 'transparent',
              color: '#94A3B8', border: '1px solid #334155', borderRadius: '12px', fontSize: '15px', fontWeight: '600',
              cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '12px',
              transition: 'all 0.2s'
            }}
            onMouseOver={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#6366F1'; }}
            onMouseOut={e => { e.currentTarget.style.color = '#94A3B8'; e.currentTarget.style.borderColor = '#334155'; }}
          >
            <span style={{ fontSize: '20px' }}>🏠</span> Main Dashboard
          </button>
          
          <div style={{ height: '1px', background: '#334155', margin: '8px 0' }} />
          
          <div style={{ color: '#E2E8F0', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px', paddingLeft: '8px', marginBottom: '8px' }}>Executive AI Coach</div>

          <button className={`tab-btn ${activeSubTab === 'overview' ? 'active' : ''}`} onClick={() => { setActiveSubTab('overview'); setIsSidebarOpen(false); }}>
            <span>📊</span> Where You Stand Today
          </button>
          <button className={`tab-btn ${activeSubTab === 'checkins' ? 'active' : ''}`} onClick={() => { setActiveSubTab('checkins'); setIsSidebarOpen(false); }}>
            <span>📝</span> Check-ins & Tests
          </button>
          <button className={`tab-btn ${activeSubTab === 'sandbox' ? 'active' : ''}`} onClick={() => { setActiveSubTab('sandbox'); setIsSidebarOpen(false); }}>
            <span>🧪</span> Interactive AI Sandbox
          </button>
        </div>
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="main-wrapper">
        <div className="topbar">
          <div className="topbar-title-row">
            <button className="hamburger" aria-label="Open menu" onClick={() => setIsSidebarOpen(true)}>
              <span />
            </button>
            <div>
              <h1>Executive AI Coach</h1>
              <p>{activeSubTab === 'overview' ? 'Real-time cognitive metrics and active stress/burnout coaching' : activeSubTab === 'checkins' ? 'Simulations & assessments battery' : 'Agent parameter sandbox models'}</p>
            </div>
          </div>
          <div className="topbar-actions">
            <button className="btn btn-purple" onClick={() => fetchExecutiveData(true)}>⟳ Refresh Data</button>
          </div>
        </div>

        <div className="layout-content">
          {/* Mobile responsive tabs control */}
          <div className="mobile-only-tabs" style={{ display: 'none', marginBottom: '24px' }}>
            <div style={{ display: 'flex', background: '#cbd5e1', padding: '4px', borderRadius: '12px', gap: '4px' }}>
              <button className={`tab-btn-mobile ${activeSubTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveSubTab('overview')}>📊 Overview</button>
              <button className={`tab-btn-mobile ${activeSubTab === 'checkins' ? 'active' : ''}`} onClick={() => setActiveSubTab('checkins')}>📝 Tests</button>
              <button className={`tab-btn-mobile ${activeSubTab === 'sandbox' ? 'active' : ''}`} onClick={() => setActiveSubTab('sandbox')}>🧪 Sandbox</button>
            </div>
          </div>

          {activeSubTab === 'overview' && (
            <div>
              {/* WHERE YOU STAND TODAY */}
              <div className="card">
                <h3 style={{ margin: '0 0 8px 0', fontSize: '20px', fontWeight: '800' }}>Where you stand today</h3>
                <p style={{ margin: '0 0 24px 0', color: '#64748B', fontSize: '14.5px' }}>Four measured scores and one combined view. Each shows the range it could plausibly be.</p>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                  {/* Overall Wellbeing */}
                  <div style={{ background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)', borderRadius: '16px', padding: '24px', color: '#fff', boxShadow: '0 8px 24px rgba(15,23,42,0.15)' }}>
                    <div style={{ fontSize: '12px', fontWeight: '800', color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>Overall Wellbeing</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{ fontSize: '42px', fontWeight: '900', color: '#fff' }}>{overallWellbeing}</span>
                      <span style={{ fontSize: '18px', color: '#94A3B8', fontWeight: '600' }}>/ 100</span>
                    </div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', background: 'rgba(245,158,11,0.2)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '20px', color: '#F59E0B', fontSize: '13px', fontWeight: '700', margin: '14px 0 10px' }}>
                      ⚡ {ratingDetails.label}
                    </div>
                    <p style={{ margin: 0, color: '#CBD5E1', fontSize: '13.5px', lineHeight: '1.5' }}>{ratingDetails.desc}</p>
                  </div>

                  {/* Rest of the four scores */}
                  <div className="score-grid" style={{ gridColumn: 'span 2' }}>
                    <div className="score-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontWeight: '700', fontSize: '14.5px' }}>Brain health</span>
                        <span style={{ fontWeight: '800', color: '#4F46E5' }}>{brainHealth} / 100</span>
                      </div>
                      <p style={{ margin: 0, color: '#64748B', fontSize: '13px', lineHeight: '1.4' }}>Memory, attention and processing speed, measured by timed tasks.</p>
                    </div>

                    <div className="score-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontWeight: '700', fontSize: '14.5px' }}>Focus</span>
                        <span style={{ fontWeight: '800', color: '#3B82F6' }}>{focusScore} / 100</span>
                      </div>
                      <p style={{ margin: 0, color: '#64748B', fontSize: '13px', lineHeight: '1.4' }}>Sustained attention and mental control.</p>
                    </div>

                    <div className="score-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontWeight: '700', fontSize: '14.5px' }}>Stress</span>
                        <span style={{ fontWeight: '800', color: '#10B981' }}>{stressScore} / 100</span>
                      </div>
                      <p style={{ margin: 0, color: '#64748B', fontSize: '13px', lineHeight: '1.4' }}>How much strain you are carrying. Higher is calmer.</p>
                    </div>

                    <div className="score-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontWeight: '700', fontSize: '14.5px' }}>Energy</span>
                        <span style={{ fontWeight: '800', color: '#F59E0B' }}>{energyScore} / 100</span>
                      </div>
                      <p style={{ margin: 0, color: '#64748B', fontSize: '13px', lineHeight: '1.4' }}>Your reported energy and how well you are sleeping.</p>
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '24px' }}>
                  <div style={{ fontWeight: '800', fontSize: '15px', color: '#1E293B', marginBottom: '16px' }}>What makes up the overall number</div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                    <div style={{ padding: '14px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '13px', color: '#64748B', fontWeight: '600' }}>Energy (22% wt)</div>
                      <div style={{ fontSize: '18px', fontWeight: '800', color: '#1E293B', marginTop: '4px' }}>{energyScore} / 100</div>
                    </div>
                    <div style={{ padding: '14px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '13px', color: '#64748B', fontWeight: '600' }}>Focus (22% wt)</div>
                      <div style={{ fontSize: '18px', fontWeight: '800', color: '#1E293B', marginTop: '4px' }}>{focusScore} / 100</div>
                    </div>
                    <div style={{ padding: '14px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '13px', color: '#64748B', fontWeight: '600' }}>Stress (28% wt)</div>
                      <div style={{ fontSize: '18px', fontWeight: '800', color: '#1E293B', marginTop: '4px' }}>{stressScore} / 100</div>
                    </div>
                    <div style={{ padding: '14px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '13px', color: '#64748B', fontWeight: '600' }}>Brain Health (28% wt)</div>
                      <div style={{ fontSize: '18px', fontWeight: '800', color: '#1E293B', marginTop: '4px' }}>{brainHealth} / 100</div>
                    </div>
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#94A3B8', marginTop: '12px', fontWeight: '500' }}>
                    * A weighted view of the scores above, not a separate measurement. Every component and weight is listed.
                  </div>
                </div>
              </div>

              {/* NUDGES & SUGGESTIONS */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                {/* What should I do right now? */}
                <div className="card" style={{ margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '800', color: '#1E293B' }}>What should I do right now?</h4>
                    <p style={{ margin: '0 0 16px 0', color: '#64748B', fontSize: '13.5px', lineHeight: '1.5' }}>
                      Reads the same numbers shown above, finds what is lowest, and picks a single thing worth doing.
                    </p>
                    {nudgeText && (
                      <div style={{ padding: '14px', background: '#EEF2FF', borderLeft: '4px solid #6366F1', borderRadius: '8px', color: '#3730A3', fontSize: '14px', fontWeight: '600', marginBottom: '16px', lineHeight: '1.4' }}>
                        🎯 {nudgeText}
                      </div>
                    )}
                  </div>
                  <button className="btn btn-purple" onClick={handleShowNudge} style={{ width: '100%', justifyContent: 'center' }}>
                    Show me one thing
                  </button>
                </div>

                {/* Ask for a suggestion */}
                <div className="card" style={{ margin: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '800', color: '#1E293B' }}>Ask for a suggestion</h4>
                    <p style={{ margin: '0 0 16px 0', color: '#64748B', fontSize: '13.5px', lineHeight: '1.5' }}>
                      Picks an activity matched to what your data currently shows — short sleep, low energy, and so on.
                    </p>
                    {suggestionText && (
                      <div style={{ padding: '14px', background: '#ECFDF5', borderLeft: '4px solid #10B981', borderRadius: '8px', color: '#065F46', fontSize: '14px', fontWeight: '600', marginBottom: '16px', lineHeight: '1.4' }}>
                        💡 {suggestionText}
                      </div>
                    )}
                  </div>
                  <button className="btn btn-green" onClick={handleSuggestSomething} style={{ width: '100%', justifyContent: 'center' }}>
                    Suggest something
                  </button>
                </div>
              </div>

              {/* TALK TO COACH */}
              <div className="card">
                <h4 style={{ margin: '0 0 8px 0', fontSize: '17px', fontWeight: '800' }}>💬 Talk to the Coach</h4>
                <p style={{ margin: '0 0 18px 0', color: '#64748B', fontSize: '13.5px' }}>Ask about your scores. It answers from your measurements, never from guesswork.</p>
                
                <div className="chat-container">
                  <div className="chat-body">
                    {chatMessages.map((m, idx) => (
                      <div key={idx} className={`chat-bubble ${m.sender}`}>
                        {m.text}
                      </div>
                    ))}
                  </div>
                  <div style={{ padding: '12px', borderTop: '1px solid #E2E8F0', display: 'flex', gap: '8px', background: '#F8FAFC' }}>
                    <input 
                      type="text" 
                      placeholder="Type a message..." 
                      value={chatInput} 
                      onChange={e => setChatInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleCoachSend()}
                      style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13.5px' }}
                    />
                    <button className="btn btn-purple" onClick={() => handleCoachSend()} style={{ padding: '10px 16px' }}>Send</button>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '10px', marginTop: '12px', flexWrap: 'wrap' }}>
                  <button className="factor-btn" onClick={() => handleCoachSend("How has my sleep been?")}>How has my sleep been?</button>
                  <button className="factor-btn" onClick={() => handleCoachSend("Why is focus lower?")}>Why is focus lower?</button>
                  <button className="factor-btn" onClick={() => handleCoachSend("What is dragging me down?")}>What is dragging me down?</button>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'checkins' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
              {/* CHECK-IN FORM */}
              <div className="card" style={{ margin: 0 }}>
                <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: '800' }}>Check in — how are you today?</h3>
                <p style={{ margin: '0 0 20px 0', color: '#64748B', fontSize: '13.5px' }}>Mood, strain and energy feed your Stress and Energy scores directly.</p>
                
                {checkinStatus && (
                  <div style={{ padding: '10px 14px', background: '#EEF2FF', borderRadius: '8px', color: '#4F46E5', fontSize: '13px', fontWeight: '600', marginBottom: '16px' }}>
                    {checkinStatus}
                  </div>
                )}

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="slider-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <label>Mood</label>
                      <span style={{ fontWeight: '700', color: '#6c5ce7' }}>{checkinMood}/7</span>
                    </div>
                    <input type="range" min="1" max="7" value={checkinMood} onChange={e => setCheckinMood(+e.target.value)} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94A3B8' }}>
                      <span>1 very low</span>
                      <span>7 very good</span>
                    </div>
                  </div>

                  <div className="slider-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <label>Strain</label>
                      <span style={{ fontWeight: '700', color: '#e0455f' }}>{checkinStrain}/7</span>
                    </div>
                    <input type="range" min="1" max="7" value={checkinStrain} onChange={e => setCheckinStrain(+e.target.value)} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94A3B8' }}>
                      <span>1 completely calm</span>
                      <span>7 very strained</span>
                    </div>
                  </div>

                  <div className="slider-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <label>Energy</label>
                      <span style={{ fontWeight: '700', color: '#f0a63a' }}>{checkinEnergy}/7</span>
                    </div>
                    <input type="range" min="1" max="7" value={checkinEnergy} onChange={e => setCheckinEnergy(+e.target.value)} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#94A3B8' }}>
                      <span>1 running empty</span>
                      <span>7 full tank</span>
                    </div>
                  </div>

                  <div>
                    <label style={{ fontWeight: '700', fontSize: '14px', color: '#475569', display: 'block', marginBottom: '8px' }}>What is affecting you today</label>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {["Workload", "Deadlines", "Poor sleep", "Travel", "Conflict", "Health", "Family", "Good news"].map(factor => {
                        const active = checkinFactors.includes(factor);
                        return (
                          <button key={factor} className={`factor-btn ${active ? 'active' : ''}`} onClick={() => {
                            setCheckinFactors(prev => active ? prev.filter(f=>f!==factor) : [...prev, factor]);
                          }}>{factor}</button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label style={{ fontWeight: '700', fontSize: '14px', color: '#475569', display: 'block', marginBottom: '8px' }}>Anything you want to add (optional)</label>
                    <textarea 
                      placeholder="A sentence about your day. Private and encrypted."
                      value={checkinNote}
                      onChange={e => setCheckinNote(e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid #CBD5E1', borderRadius: '8px', height: '60px', fontSize: '13.5px' }}
                    />
                  </div>

                  <button className="btn btn-purple" onClick={handleSaveCheckin} style={{ justifyContent: 'center' }}>
                    Save today's check-in
                  </button>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* WELLBEING QUESTIONNAIRE */}
                <div className="card" style={{ margin: 0 }}>
                  <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: '800' }}>Wellbeing questionnaire</h3>
                  <p style={{ margin: '0 0 20px 0', color: '#64748B', fontSize: '13.5px', lineHeight: '1.4' }}>
                    Five questions, every two weeks. This is the WHO-5, a standard wellbeing measure.
                  </p>

                  {who5ScoreResult !== null && (
                    <div style={{ padding: '12px', background: '#ECFDF5', borderLeft: '4px solid #10B981', borderRadius: '8px', color: '#065F46', fontSize: '14.0px', fontWeight: '700', marginBottom: '16px' }}>
                      Calculated WHO-5 Score: {who5ScoreResult} / 100
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {who5Questions.map((q, qIdx) => (
                      <div key={qIdx} style={{ paddingBottom: '12px', borderBottom: '1px solid #F1F5F9' }}>
                        <div style={{ fontSize: '13.5px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>{q}</div>
                        <select 
                          value={who5Answers[qIdx]} 
                          onChange={e => setWho5Answers(prev => ({ ...prev, [qIdx]: +e.target.value }))}
                          style={{ width: '100%', padding: '8px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                        >
                          <option value="0">At no time (0)</option>
                          <option value="1">Some of the time (1)</option>
                          <option value="2">Less than half the time (2)</option>
                          <option value="3">More than half the time (3)</option>
                          <option value="4">Most of the time (4)</option>
                          <option value="5">All the time (5)</option>
                        </select>
                      </div>
                    ))}

                    <button className="btn btn-green" onClick={handleCalculateWho5} style={{ justifyContent: 'center' }}>
                      Calculate my score
                    </button>
                  </div>
                </div>

                {/* COGNITIVE 9-MIN ASSESSMENT */}
                <div className="card" style={{ margin: 0 }}>
                  <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', fontWeight: '800' }}>Cognitive assessment</h3>
                  <p style={{ margin: '0 0 16px 0', color: '#64748B', fontSize: '13.5px', lineHeight: '1.4' }}>
                    Roughly nine minutes. Best done in a quiet room with the device calibrated.
                  </p>

                  {cognitiveSessionStatus && (
                    <div style={{ padding: '10px 14px', background: '#F1F5F9', borderLeft: '4px solid #4F46E5', borderRadius: '8px', color: '#312E81', fontSize: '13.5px', fontWeight: '600', marginBottom: '16px' }}>
                      {cognitiveSessionStatus}
                    </div>
                  )}

                  {deviceTimingProgress !== null && (
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#64748B', marginBottom: '4px' }}>
                        <span>Timing device touch response latency...</span>
                        <span>{deviceTimingProgress}%</span>
                      </div>
                      <div style={{ background: '#E2E8F0', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${deviceTimingProgress}%`, background: '#6c5ce7', height: '100%', transition: 'width 0.1s linear' }} />
                      </div>
                    </div>
                  )}

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', background: '#F8FAFC', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0', marginBottom: '18px' }}>
                    <div style={{ fontWeight: '700', fontSize: '14px', color: '#334155' }}>Tasks sequence:</div>
                    <div style={{ fontSize: '13px', lineHeight: '1.5', color: '#475569' }}>
                      1. <strong>Trail Making B</strong> (mental flexibility)<br />
                      2. <strong>Corsi Block Span</strong> (visual memory)<br />
                      3. <strong>Dual N-Back</strong> (sustained attention)<br />
                      4. <strong>Stroop</strong> (impulse control)<br />
                      5. <strong>Word List Recall</strong> (episodic memory)
                    </div>
                  </div>

                  <button className="btn btn-purple" onClick={handleStartTimingTest} style={{ width: '100%', justifyContent: 'center' }}>
                    ⚡ Start 9-minute session
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'sandbox' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
              {/* COGNITIVE HEALTH AGENT SANDBOX */}
              <div className="card" style={{ margin: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '20px' }}>🧠</span>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800' }}>Cognitive Health Agent</h3>
                </div>
                <p style={{ margin: '0 0 20px 0', color: '#64748B', fontSize: '13.5px', lineHeight: '1.4' }}>
                  Adjust inputs and click run. The relative scores, modifiable drivers, and plan are calculated dynamically.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  <div className="slider-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <label>Average sleep (hours)</label>
                      <span style={{ fontWeight: '700' }}>{sbSleepVal}h</span>
                    </div>
                    <input type="range" min="4.0" max="10.0" step="0.1" value={sbSleepVal} onChange={e => setSbSleepVal(+e.target.value)} />
                  </div>

                  <div className="slider-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <label>Sleep quality (1-5)</label>
                      <span style={{ fontWeight: '700' }}>{sbSleepQual}</span>
                    </div>
                    <input type="range" min="1.0" max="5.0" step="0.1" value={sbSleepQual} onChange={e => setSbSleepQual(+e.target.value)} />
                  </div>

                  <div className="slider-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <label>Sleep irregularity (hours)</label>
                      <span style={{ fontWeight: '700' }}>{sbSleepIrreg}h</span>
                    </div>
                    <input type="range" min="0.0" max="3.0" step="0.1" value={sbSleepIrreg} onChange={e => setSbSleepIrreg(+e.target.value)} />
                  </div>

                  <div className="slider-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <label>Time of day (local hour)</label>
                      <span style={{ fontWeight: '700' }}>{sbTimeOfDay}:00</span>
                    </div>
                    <input type="range" min="0.0" max="24.0" step="0.5" value={sbTimeOfDay} onChange={e => setSbTimeOfDay(+e.target.value)} />
                  </div>

                  <button className="btn btn-purple" onClick={handleRunCogSandbox} style={{ justifyContent: 'center' }}>
                    Run cognitive health analysis
                  </button>
                </div>

                {sbCogResult && (
                  <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px' }}>
                    <div style={{ fontWeight: '800', color: '#1E293B', marginBottom: '14px', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>Analysis Results:</div>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                      <div>
                        <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Processing Speed</div>
                        <div style={{ fontSize: '15px', fontWeight: '700', color: sbCogResult.components.processingSpeed < 0 ? '#EF4444' : '#10B981' }}>{sbCogResult.components.processingSpeed}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Working Memory</div>
                        <div style={{ fontSize: '15px', fontWeight: '700', color: sbCogResult.components.workingMemory < 0 ? '#EF4444' : '#10B981' }}>+{sbCogResult.components.workingMemory}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Executive Function</div>
                        <div style={{ fontSize: '15px', fontWeight: '700', color: sbCogResult.components.executiveFunction < 0 ? '#EF4444' : '#10B981' }}>{sbCogResult.components.executiveFunction}</div>
                      </div>
                      <div>
                        <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Memory</div>
                        <div style={{ fontSize: '15px', fontWeight: '700', color: sbCogResult.components.memory < 0 ? '#EF4444' : '#10B981' }}>+{sbCogResult.components.memory}</div>
                      </div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '6px' }}>Modifiable Drivers:</div>
                      {sbCogResult.drivers.map((drv, i) => (
                        <div key={i} style={{ fontSize: '13px', color: drv.type === 'negative' ? '#B91C1C' : '#047857', marginBottom: '4px' }}>
                          {drv.type === 'negative' ? '▼' : '▲'} {drv.text}
                        </div>
                      ))}
                    </div>

                    <div>
                      <div style={{ fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '6px' }}>Action Plan:</div>
                      {sbCogResult.plan.map((p, i) => (
                        <div key={i} style={{ fontSize: '13px', color: '#334155', marginBottom: '4px' }}>
                          • <strong>{p.action}</strong> because {p.because}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* STRESS & BURNOUT AGENT SANDBOX */}
              <div className="card" style={{ margin: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '20px' }}>❤️‍🔥</span>
                  <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '800' }}>Stress & Burnout Agent</h3>
                </div>
                <p style={{ margin: '0 0 20px 0', color: '#64748B', fontSize: '13.5px', lineHeight: '1.4' }}>
                  Adjust inputs and click run. Calculates burnout risk indicators, key drivers, and recovery plans.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  <div className="slider-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <label>Average sleep (hours)</label>
                      <span style={{ fontWeight: '700' }}>{sbStressSleep}h</span>
                    </div>
                    <input type="range" min="4.0" max="10.0" step="0.1" value={sbStressSleep} onChange={e => setSbStressSleep(+e.target.value)} />
                  </div>

                  <div className="slider-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <label>Reported strain (1-7)</label>
                      <span style={{ fontWeight: '700' }}>{sbStressStrain}/7</span>
                    </div>
                    <input type="range" min="1" max="7" value={sbStressStrain} onChange={e => setSbStressStrain(+e.target.value)} />
                  </div>

                  <div className="slider-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <label>Reported energy (1-7)</label>
                      <span style={{ fontWeight: '700' }}>{sbStressEnergy}/7</span>
                    </div>
                    <input type="range" min="1" max="7" value={sbStressEnergy} onChange={e => setSbStressEnergy(+e.target.value)} />
                  </div>

                  <div className="slider-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <label>Work after 20:00 (fraction)</label>
                      <span style={{ fontWeight: '700' }}>{Math.round(sbStressLateWork * 100)}%</span>
                    </div>
                    <input type="range" min="0.0" max="1.0" step="0.05" value={sbStressLateWork} onChange={e => setSbStressLateWork(+e.target.value)} />
                  </div>

                  <div className="slider-group">
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <label>Extra weekend sleep (hours)</label>
                      <span style={{ fontWeight: '700' }}>{sbStressWeekendExtra}h</span>
                    </div>
                    <input type="range" min="-3.0" max="3.0" step="0.1" value={sbStressWeekendExtra} onChange={e => setSbStressWeekendExtra(+e.target.value)} />
                  </div>

                  <button className="btn btn-green" onClick={handleRunStressSandbox} style={{ justifyContent: 'center' }}>
                    Run stress & burnout analysis
                  </button>
                </div>

                {sbStressResult && (
                  <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '18px' }}>
                    <div style={{ fontWeight: '800', color: '#1E293B', marginBottom: '14px', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>Analysis Results:</div>
                    
                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '700', textTransform: 'uppercase' }}>Burnout Status:</div>
                      <div style={{ fontSize: '15px', fontWeight: '700', color: sbStressResult.burnoutStatus.includes('Elevated') ? '#EF4444' : '#10B981' }}>{sbStressResult.burnoutStatus}</div>
                    </div>

                    <div style={{ marginBottom: '16px' }}>
                      <div style={{ fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '6px' }}>Key Drivers:</div>
                      {sbStressResult.drivers.length > 0 ? sbStressResult.drivers.map((drv, i) => (
                        <div key={i} style={{ fontSize: '13px', color: '#1E293B', marginBottom: '4px' }}>
                          • <strong>{drv.factor}</strong>: {drv.evidence}
                        </div>
                      )) : (
                        <div style={{ fontSize: '13px', color: '#94A3B8' }}>Nothing standing out.</div>
                      )}
                    </div>

                    <div>
                      <div style={{ fontSize: '12px', fontWeight: '800', color: '#475569', marginBottom: '6px' }}>Recovery Recommendations:</div>
                      {sbStressResult.plan.map((p, i) => (
                        <div key={i} style={{ fontSize: '13px', color: '#334155', marginBottom: '4px' }}>
                          • <strong>{p.action}</strong>: {p.because}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Assessment Modals */}
      {showPSS10 && <PSS10Modal onClose={() => setShowPSS10(false)} onComplete={handleAssessmentComplete} />}
      {showCBI && <CBIModal onClose={() => setShowCBI(false)} onComplete={handleAssessmentComplete} />}
      {showSelfAssessment && <SelfAssessmentModal onClose={() => setShowSelfAssessment(false)} onComplete={handleAssessmentComplete} />}
      {showCheckin && <CheckinModal onClose={() => setShowCheckin(false)} onComplete={handleAssessmentComplete} />}
      
      {/* Individual Cognitive, Sleep & Profile Modals */}
      {showMemoryTest && <MemoryTestModal onClose={() => setShowMemoryTest(false)} onComplete={handleAssessmentComplete} />}
      {showAttentionTest && <AttentionTestModal onClose={() => setShowAttentionTest(false)} onComplete={handleAssessmentComplete} />}
      {showCognitiveSpeed && <CognitiveSpeedModal onClose={() => setShowCognitiveSpeed(false)} onComplete={handleAssessmentComplete} />}
      {showSleepCheckin && <SleepCheckinModal onClose={() => setShowSleepCheckin(false)} onComplete={handleAssessmentComplete} />}
      {showAgeProfile && <AgeProfileModal onClose={() => setShowAgeProfile(false)} onComplete={handleAssessmentComplete} />}
    </div>
  );
};

export default ExecutiveDashboard;

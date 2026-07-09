
const fs = require('fs');

const path = 'src/components/Dashboard.jsx';
const content = fs.readFileSync(path, 'utf8');
const lines = content.split('\n');

// Find where the `return (` block starts
const returnIndex = lines.findIndex(line => line.includes('return (') && line.includes('<div style={{ minHeight: \'100vh\''));

const topLogic = lines.slice(0, returnIndex).join('\n');

const newReturnBlock = `  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif", color: 'var(--text-dark)', overflowX: 'hidden' }}>
      <style>{\`
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
        .topbar { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:22px; flex-wrap:wrap; gap:16px; padding: 28px 32px 0; }
        .topbar-title-row { display:flex; align-items:center; gap:12px; }
        .hamburger { display:none; width:40px;height:40px; flex-shrink:0; border-radius:10px; border:1px solid var(--border); background:#fff; align-items:center; justify-content:center; cursor:pointer; box-shadow:var(--shadow); }
        .hamburger span, .hamburger span::before, .hamburger span::after { content:""; display:block; width:18px;height:2px; background:var(--text-dark); border-radius:2px; position:relative; transition:all .2s ease; }
        .hamburger span::before{ position:absolute; top:-6px; }
        .hamburger span::after{ position:absolute; top:6px; }
        .topbar h1 { font-size:28px; margin:0 0 4px 0; font-weight:700; }
        .topbar p { margin:0; color:var(--text-grey); font-size:14px; }
        .topbar-actions { display:flex; gap:10px; flex-wrap:wrap; }
        .btn { display:flex; align-items:center; gap:8px; padding:10px 18px; border-radius:10px; font-size:14px; font-weight:600; border:none; cursor:pointer; white-space:nowrap; }
        .btn-green { background:#1fa96a; color:#fff; }
        .btn-blue { background:#2f6fed; color:#fff; }
        .btn-purple { background:#6c5ce7; color:#fff; }
        .btn-outline-red { background:#fff; color:var(--red); border:1.5px solid var(--red); }
        .layout { display:grid; grid-template-columns:270px 1fr; gap:24px; align-items:start; padding: 0 32px 28px; }
        .card { background:var(--card); border:1px solid var(--border); border-radius:var(--radius-lg); box-shadow:var(--shadow); padding:20px; }
        .sidebar-overlay { display:none; position:fixed; inset:0; background:rgba(20,20,35,0.45); z-index:40; }
        .sidebar-overlay.active { display:block; }
        .sidebar-close { display:none; width:32px;height:32px; border-radius:8px; border:1px solid var(--border); background:#fff; align-items:center; justify-content:center; cursor:pointer; font-size:16px; color:var(--text-grey); }
        .sidebar-header { display:flex; align-items:center; gap:10px; margin-bottom:16px; }
        .icon-circle { width:34px;height:34px; border-radius:50%; background:var(--purple-light); color:var(--purple); display:flex;align-items:center;justify-content:center; font-size:16px; flex-shrink:0; }
        .sidebar-header h3 { margin:0; font-size:16px; font-weight:700; }
        .assessment-item { background:var(--purple-light); border:1px solid #e3daf9; border-radius:var(--radius-md); padding:14px 14px; margin-bottom:16px; cursor:pointer; transition:all 0.2s; }
        .assessment-item:hover { transform:translateY(-2px); box-shadow:0 4px 12px rgba(108,92,231,0.15); }
        .assessment-item-top { display:flex; justify-content:space-between; align-items:center; margin-bottom:6px; }
        .assessment-item-top span.title { font-weight:700; color:var(--purple); font-size:14px; }
        .score-pill { display:flex;align-items:center;gap:5px; font-weight:700;color:var(--green);font-size:13px; }
        .score-pill::before { content:""; width:7px;height:7px;border-radius:50%; background:var(--green);display:inline-block; }
        .assessment-item .date { color:var(--text-grey);font-size:12.5px; }
        .btn-view-all { width:100%; padding:11px; border-radius:10px; border:1.5px solid #d9d4f5; background:#fff; color:var(--purple); font-weight:600; font-size:14px; cursor:pointer; margin-top:24px; }
        .main { display:flex; flex-direction:column; gap:20px; }
        .profile-card { display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:20px; }
        .profile-left { display:flex; align-items:center; gap:16px; }
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
        .stat-label { font-size:12.5px;color:var(--text-grey);margin-bottom:6px; }
        .stat-value { font-size:20px;font-weight:700; }
        .stat-value.green { color:var(--green); }
        .stat-value.copy { display:flex;align-items:center;gap:6px;font-size:17px;color:var(--text-dark); }
        .stat-value.check { display:flex;align-items:center;gap:6px; }
        .row-scores { display:flex; gap:20px; align-items:stretch; flex-wrap:wrap; }
        .score-panel { display:flex; flex:2; min-width:340px; }
        .score-sub { flex:1; padding:4px 20px; border-right:1px solid var(--border); display:flex; flex-direction:column; align-items:center; text-align:center; justify-content:flex-start; }
        .score-sub:last-child { border-right:none; }
        .score-sub h4 { display:flex;align-items:center;gap:6px; font-size:14px;margin:0 0 16px 0;align-self:flex-start; }
        .score-sub.first h4 { align-self:center; }
        .gauge-wrap { position:relative;width:150px;height:150px; }
        .gauge-wrap svg { width:100%;height:100%; transform:rotate(-90deg); }
        .gauge-center { position:absolute;inset:0; display:flex;flex-direction:column;align-items:center;justify-content:center; }
        .gauge-center .num { font-size:26px;font-weight:700; }
        .gauge-center .den { font-size:12px;color:var(--text-grey); }
        .gauge-good-badge { margin-top:14px; background:var(--green-badge);color:var(--green); font-size:12px;font-weight:700; padding:4px 14px;border-radius:20px; display:flex;align-items:center;gap:5px; }
        .gauge-good-badge::before { content:"";width:6px;height:6px;border-radius:50%;background:var(--green); }
        .risk-check { width:56px;height:56px;border-radius:50%; border:2px solid var(--green); display:flex;align-items:center;justify-content:center; color:var(--green);font-size:24px;margin:20px 0 14px 0; }
        .risk-text { font-size:13.5px;color:var(--text-dark); }
        .strength-star { color:var(--purple);font-size:22px;margin:22px 0 12px 0; }
        .strength-text { display:flex;align-items:center;gap:6px;font-size:13.5px;color:var(--purple);font-weight:600; }
        .age-card { flex:1; min-width:260px; position:relative; overflow:hidden; }
        .age-card h4 { display:flex;align-items:center;gap:8px;margin:0 0 18px 0;font-size:15px; }
        .age-values { display:flex; justify-content:space-between; margin-bottom:16px; }
        .age-values div { text-align:left; }
        .age-label { font-size:12.5px;color:var(--text-grey);margin-bottom:6px; }
        .age-num { font-size:26px;font-weight:700; }
        .age-num.grey { color:var(--text-dark); }
        .age-num.purple { color:var(--purple); }
        .age-unit { font-size:12px;color:var(--text-grey); }
        .age-note { font-size:11.5px;color:var(--text-grey); display:flex;gap:6px;align-items:flex-start; border-top:1px solid var(--border); padding-top:12px; }
        .row-domain { display:flex;gap:20px;flex-wrap:wrap; }
        .domain-card { flex:2;min-width:420px; }
        .card-title { display:flex;align-items:center;gap:8px; font-size:15px;font-weight:700;margin:0 0 16px 0; }
        .domain-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; }
        .domain-box { border-radius:12px; padding:14px 16px; }
        .domain-box .label { font-size:12.5px;margin-bottom:8px;font-weight:600; }
        .domain-box .value { font-size:22px;font-weight:700;color:var(--text-dark); }
        .bg-orange{ background:#fdf1ec; } .fg-orange{ color:#e08c3e; }
        .bg-blue{ background:#eef2fb; } .fg-blue{ color:#5b7bd6; }
        .bg-green{ background:#eaf8f1; } .fg-green{ color:#22a06b; }
        .bg-purple{ background:#f2effc; } .fg-purple{ color:#7a5fe0; }
        .bg-peach{ background:#fdf3e7; } .fg-peach{ color:#e0a23e; }
        .bg-grey{ background:#eef0f5; } .fg-grey{ color:#6c7a94; }
        .bg-teal{ background:#e9f8f6; } .fg-teal{ color:#28a99a; }
        .bg-green2{ background:#eafaf0; } .fg-green2{ color:#1fa572; }
        .lifestyle-card { flex:1;min-width:320px; position:relative; overflow:hidden; }
        .lifestyle-item { display:flex;align-items:center;justify-content:space-between; padding:12px 0; border-bottom:1px solid var(--border); font-size:13.5px; }
        .lifestyle-item:last-child { border-bottom:none; }
        .lifestyle-item .left { display:flex;align-items:center;gap:10px;color:var(--text-dark);font-weight:500; }
        .lifestyle-icon { font-size:16px; }
        .low-badge { background:var(--green-badge);color:var(--green); font-size:12px;font-weight:700; padding:3px 12px;border-radius:20px; }
        .row-radar { display:flex;gap:20px;flex-wrap:wrap; }
        .radar-card { flex:1;min-width:320px; }
        .reco-card { flex:1;min-width:320px; position:relative; overflow:hidden; }
        .reco-item { display:flex;gap:12px; padding:12px 0; align-items:flex-start; }
        .reco-num { width:24px;height:24px;border-radius:50%; color:#fff;font-size:12px;font-weight:700; display:flex;align-items:center;justify-content:center; flex-shrink:0;margin-top:2px; }
        .reco-num.n1 { background:#6c5ce7; }
        .reco-num.n2 { background:#1fa96a; }
        .reco-num.n3 { background:#f0a63a; }
        .reco-text { font-size:13.5px;color:var(--text-dark);line-height:1.5; }
        
        .fade-overlay { position: fixed; inset: 0; background: rgba(248, 250, 252, 0.8); backdrop-filter: blur(4px); z-index: 9999; display: flex; flex-direction: column; align-items: center; justify-content: center; opacity: 0; pointer-events: none; transition: opacity 0.3s ease; }
        .fade-overlay.visible { opacity: 1; pointer-events: all; }

        @media (max-width: 900px){
          .hamburger{ display:flex; }
          .layout{ grid-template-columns:1fr; }
          .sidebar{ position:fixed; top:0; left:0; height:100vh; width:280px; max-width:80vw; z-index:50; border-radius:0; transform:translateX(-100%); transition:transform .25s ease; overflow-y:auto; }
          .sidebar.open{ transform:translateX(0); }
          .sidebar-close{ display:flex; margin-left:auto; }
          .btn-view-all{ margin-top:24px; }
          .row-scores, .row-domain, .row-radar{ flex-direction:column; }
          .score-panel{ flex-direction:column; }
          .score-sub{ border-right:none; border-bottom:1px solid var(--border); padding:16px 0; }
          .score-sub:last-child{ border-bottom:none; }
          .score-sub h4{ align-self:center !important; }
        }
        @media (max-width: 600px){
          body{ padding:16px; }
          .topbar h1{ font-size:22px; }
          .topbar-actions{ width:100%; }
          .topbar-actions .btn{ flex:1 1 calc(50% - 5px); justify-content:center; padding:10px 8px; font-size:13px; }
          .layout{ gap:16px; padding: 0 16px 28px; }
          .topbar { padding: 16px 16px 0; }
          .card{ padding:16px; border-radius:14px; }
          .profile-card{ flex-direction:column;align-items:flex-start; }
          .profile-stats{ width:100%; flex-wrap:wrap; }
          .stat-block{ flex:1 1 45%; border-left:none; border-top:1px solid var(--border); padding:12px 0 0 0; margin-top:10px; }
          .stat-block:nth-child(odd){ padding-right:12px; }
          .stat-block:nth-child(even){ padding-left:12px;border-left:1px solid var(--border); }
          .domain-grid{ grid-template-columns:repeat(2,1fr); }
          .gauge-wrap{ width:130px;height:130px; }
          .age-values{ gap:10px; }
          .reco-item .reco-text{ font-size:13px; }
        }
        @media (max-width: 380px){
          .domain-grid{ grid-template-columns:1fr 1fr; }
          .topbar-actions .btn{ flex:1 1 100%; }
        }
      \`}</style>

      {/* Loading Overlay */}
      <div className={\`fade-overlay \${isSwitchingAssessment ? 'visible' : ''}\`}>
        <div style={{ width: '48px', height: '48px', border: '4px solid rgba(108,92,231,0.2)', borderTopColor: '#6c5ce7', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
        <p style={{ color: '#1f2430', fontSize: '20px', fontWeight: '600' }}>Loading Assessment...</p>
      </div>

      {/* ===== TOP HEADER ===== */}
      <div className="topbar">
        <div className="topbar-title-row">
          <button className="hamburger" aria-label="Open menu" onClick={() => setIsSidebarOpen(true)}><span></span></button>
          <div>
            <h1>Dashboard</h1>
            <p>Welcome back, <strong>{sessionStorage.getItem('name') || 'User'}</strong>! Here's your cognitive overview.</p>
          </div>
        </div>
        <div className="topbar-actions">
          <button className="btn btn-green" onClick={() => {
            if (!isPaid) {
              alert("Please complete your payment to unlock unlimited retakes.");
              return;
            }
            startLoggedInAssessment(navigate, setIsSwitchingAssessment);
          }}>⟳ Retake Assessment</button>
          <button className="btn btn-blue" onClick={() => handleGeneratePdf('download')} disabled={isGeneratingPdf}>
            {isGeneratingPdf ? 'Generating...' : (pdfUrl && isPaid ? '📄 View PDF' : (isPaid ? '⬇ Save PDF' : '⬇ Save Free PDF'))}
          </button>
          <button className="btn btn-purple" onClick={() => handleGeneratePdf('share')} disabled={isGeneratingPdf}>
             {isGeneratingPdf ? 'Generating...' : (isPaid ? '↗ Share PDF' : '↗ Share Free PDF')}
          </button>
          <button className="btn btn-outline-red" onClick={() => { sessionStorage.clear(); navigate('/'); }}>⏻ Logout</button>
        </div>
      </div>

      <div className={\`sidebar-overlay \${isSidebarOpen ? 'active' : ''}\`} onClick={() => setIsSidebarOpen(false)}></div>

      <div className="layout">
        {/* ===== SIDEBAR ===== */}
        <div className={\`card sidebar \${isSidebarOpen ? 'open' : ''}\`}>
          <div className="sidebar-header">
            <div className="icon-circle">🕐</div>
            <h3>Assessment History</h3>
            <button className="sidebar-close" aria-label="Close menu" onClick={() => setIsSidebarOpen(false)}>✕</button>
          </div>

          {assessmentsHistory && assessmentsHistory.length > 0 ? (
            assessmentsHistory.map((hist) => (
              <div 
                key={hist.id}
                className="assessment-item"
                style={{
                  border: currentAssessmentId === hist.id ? '2px solid #6c5ce7' : '1px solid #e3daf9',
                  background: currentAssessmentId === hist.id ? '#efe9fd' : 'var(--purple-light)',
                  opacity: currentAssessmentId === hist.id ? 1 : 0.7
                }}
                onClick={() => {
                  setCurrentAssessmentId(hist.id);
                  if (hist.report_json) setReport(hist.report_json);
                  if (hist.pdf_url) setPdfUrl(hist.pdf_url);
                  else setPdfUrl(null);
                  if (window.innerWidth <= 900) setIsSidebarOpen(false);
                }}
              >
                <div className="assessment-item-top">
                  <span className="title">Assessment {new Date(hist.created_at).toLocaleDateString()}</span>
                  <span className="score-pill" style={{ color: hist.report_json?.overall?.score >= 70 ? 'var(--green)' : '#f0a63a' }}>
                    {Math.round(hist.report_json?.overall?.score || 0)}
                  </span>
                </div>
                <div className="date">{new Date(hist.created_at).toLocaleString([], { hour: '2-digit', minute: '2-digit' })}</div>
              </div>
            ))
          ) : (
            <p style={{ fontSize: '13px', color: 'var(--text-grey)' }}>No past assessments.</p>
          )}

          <button className="btn-view-all" onClick={() => navigate('/history')}>View All History</button>
        </div>

        {/* ===== MAIN CONTENT ===== */}
        <div className="main">
          
          {/* Profile / stats row */}
          <div className="card profile-card">
            <div className="profile-left">
              <div className="avatar">{(sessionStorage.getItem('name') || 'U').charAt(0).toUpperCase()}</div>
              <div>
                <div className="profile-name-row">
                  <h2>{sessionStorage.getItem('name') || 'User'}</h2>
                  {isPaid ? <span className="badge-paid">Paid</span> : <span className="badge-free">Free</span>}
                </div>
                <div className="profile-email">{sessionStorage.getItem('userEmail') || 'user@example.com'}</div>
                <div className="profile-meta">
                  {userAge && <span>🎂 Age {userAge}</span>}
                  <span>📅 {new Date().toLocaleDateString()}</span>
                </div>
              </div>
            </div>

            <div className="profile-stats">
              <div className="stat-block">
                <div className="stat-label">Overall Score</div>
                <div className="stat-value green" style={{ color: scoreColor }}>{Math.round(score)} / 100</div>
              </div>
              <div className="stat-block">
                <div className="stat-label">Rating</div>
                <div className="stat-value green" style={{ color: scoreColor }}>{rating.split(' ')[0]}</div>
              </div>
              <div className="stat-block">
                <div className="stat-label">Assessment</div>
                <div className="stat-value check" style={{ color: 'var(--green)' }}>Completed ✅</div>
              </div>
            </div>
          </div>

          {/* Cognitive score / risk / strengths / age row */}
          <div className="row-scores">
            <div className="card score-panel">
              <div className="score-sub first">
                <h4>📊 Cognitive Score</h4>
                <div className="gauge-wrap">
                  <svg viewBox="0 0 150 150">
                    <circle cx="75" cy="75" r="62" fill="none" stroke="#e9ebf2" strokeWidth="12"/>
                    <circle cx="75" cy="75" r="62" fill="none" stroke={scoreColor} strokeWidth="12"
                      strokeLinecap="round"
                      strokeDasharray="389.5"
                      strokeDashoffset={389.5 - (389.5 * (score / 100))}/>
                  </svg>
                  <div className="gauge-center">
                    <div className="num" style={{ color: scoreColor }}>{Math.round(score)}</div>
                    <div className="den">/ 100</div>
                  </div>
                </div>
                <div className="gauge-good-badge" style={{ color: scoreColor, background: scoreColor + '20' }}>
                  {rating.split(' ')[0]}
                </div>
              </div>

              <div className="score-sub">
                <h4>⚠️ Risk Indicators</h4>
                <div className="risk-check" style={{ borderColor: score >= 60 ? 'var(--green)' : '#f0a63a', color: score >= 60 ? 'var(--green)' : '#f0a63a' }}>
                  {score >= 60 ? '✓' : '!'}
                </div>
                <div className="risk-text">{score >= 60 ? 'No significant risks' : 'Some areas need attention'}</div>
              </div>

              <div className="score-sub">
                <h4>⭐ Key Strengths</h4>
                <div className="strength-star">★</div>
                <div className="strength-text">
                  ★ {domains.length > 0 ? [...domains].sort((a,b) => b[1] - a[1])[0][0] : 'Mental clarity'}
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
                    <div key={key} className={\`domain-box \${colorClass.bg}\`}>
                      <div className={\`label \${colorClass.fg}\`}>{key}</div>
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
            <div className="card radar-card">
              <div className="card-title">📊 Cognitive Functions Profile</div>
              <div style={{ height: '300px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                    <PolarGrid stroke="#e9ebf2" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#555', fontSize: 11 }} />
                    <Radar name="Score" dataKey="A" stroke="#6c5ce7" fill="#6c5ce7" fillOpacity={0.25} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card radar-card">
              <div className="card-title">🎗 Lifestyle Impact Profile</div>
              <div style={{ height: '300px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e9ebf2" />
                    <XAxis type="number" domain={[0, 100]} stroke="#8a8fa3" tick={{fontSize: 12}} />
                    <YAxis dataKey="name" type="category" stroke="#8a8fa3" tick={{fontSize: 12}} width={90} />
                    <Tooltip cursor={{fill: 'transparent'}} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {barData.map((entry, index) => (
                        <Cell key={\`cell-\${index}\`} fill={['#6c5ce7', '#1ea672', '#f0a63a', '#e0455f'][index % 4]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card reco-card">
              <div className="card-title">💡 Personalized Recommendations</div>
              <div style={{ filter: isPaid ? 'none' : 'blur(4px)', pointerEvents: isPaid ? 'auto' : 'none', userSelect: isPaid ? 'auto' : 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {isPaid ? (
                  (report.recommendations ?? []).map((rec, i) => (
                    <div key={i} className="reco-item">
                      <div className={\`reco-num n\${(i % 3) + 1}\`}>{i + 1}</div>
                      <div className="reco-text">{rec}</div>
                    </div>
                  ))
                ) : (
                  [1,2,3].map(i => (
                    <div key={i} className="reco-item">
                       <div className={\`reco-num n\${i}\`}>{i}</div>
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
  );
};

export default Dashboard;
`;

fs.writeFileSync(path, topLogic + '\n' + newReturnBlock);
console.log('Successfully applied new dashboard template.');

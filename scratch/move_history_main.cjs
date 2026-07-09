const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/components/Dashboard.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Remove hamburger button from navbar
content = content.replace(
  /<button className="hamburger-btn" onClick=\{\(\) => setIsSidebarOpen\(true\)\}>☰<\/button>/g,
  ""
);

// 2. Extract the assessment history mapping logic and remove the sidebar DOM
const historyStartStr = "{/* ── AMAZON SIDEBAR OVERLAY ── */}";
const historyStartIndex = content.indexOf(historyStartStr);

const historyEndStr = "      <div className=\"dash-container dash-content\" style={{ position: 'relative', zIndex: 1, width: '100%' }}>";
const historyEndIndex = content.indexOf(historyEndStr);

if (historyStartIndex !== -1 && historyEndIndex !== -1) {
  // Remove the sidebar from the DOM entirely
  content = content.substring(0, historyStartIndex) + content.substring(historyEndIndex);
}

// 3. Define the new History Section to go inside the dash-content
const newHistorySection = `
        {/* ── ASSESSMENT HISTORY (MAIN) ── */}
        <div className="dash-card" style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '24px', padding: '32px' }}>
          <h2 style={{ color: '#0F172A', fontSize: '24px', fontWeight: '800', margin: '0 0 24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '28px' }}>🕒</span> Assessment History
          </h2>
          {assessmentsHistory && assessmentsHistory.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '20px' }} className="history-boxes-grid">
              {assessmentsHistory.map((assessment, i) => {
                const dateObj = new Date(assessment.created_at);
                const dateStr = dateObj.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
                const score = assessment.report_json?.overall?.score ?? '--';
                const isCurrent = report && JSON.stringify(report) === JSON.stringify(assessment.report_json);
                return (
                  <div key={assessment.id || i} className="dash-history-box" style={{ 
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', 
                    padding: '16px', background: isCurrent ? 'rgba(99,102,241,0.1)' : '#FFFFFF', 
                    borderRadius: '16px', border: isCurrent ? '2px solid rgba(99,102,241,0.4)' : '1px solid #E2E8F0', 
                    boxShadow: '0 4px 12px rgba(0,0,0,0.03)', aspectRatio: '1 / 1', transition: 'all 0.3s',
                    textAlign: 'center', position: 'relative', overflow: 'hidden'
                  }}>
                    {isCurrent && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, background: '#6366F1', color: '#fff', fontSize: '10px', fontWeight: '800', textTransform: 'uppercase', padding: '2px 0' }}>Current</div>}
                    
                    <div style={{ color: '#64748B', fontSize: '13px', fontWeight: '700', marginBottom: '8px', marginTop: isCurrent ? '12px' : '0' }}>{dateStr}</div>
                    
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(15,23,42,0.03)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '12px', border: '1px solid rgba(0,0,0,0.05)' }}>
                      <span style={{ color: '#0F172A', fontSize: '20px', fontWeight: '900', lineHeight: 1 }}>{score}</span>
                      <span style={{ fontSize: '10px', color: '#64748B', fontWeight: '700', marginTop: '2px' }}>SCORE</span>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
                      <button 
                        disabled={isCurrent}
                        onClick={() => {
                          setIsSwitchingAssessment(true);
                          setTimeout(() => {
                            setReport(assessment.report_json);
                            setPdfUrl(assessment.pdf_url);
                            setCurrentAssessmentId(assessment.id);
                            sessionStorage.setItem('analysisReport', JSON.stringify(assessment.report_json));
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                            setIsSwitchingAssessment(false);
                          }, 600);
                        }}
                        style={{ padding: '6px 4px', background: isCurrent ? 'rgba(255,255,255,0.5)' : '#6366F1', color: isCurrent ? '#94A3B8' : '#FFF', border: 'none', borderRadius: '6px', fontSize: '11px', fontWeight: '700', cursor: isCurrent ? 'default' : 'pointer', width: '100%' }}
                      >
                        {isCurrent ? 'Viewing' : 'View Report'}
                      </button>
                      {assessment.pdf_url && (
                        <button 
                          onClick={() => window.open(assessment.pdf_url, '_blank')}
                          style={{ padding: '6px 4px', background: 'rgba(16,185,129,0.1)', color: '#10B981', border: 'none', borderRadius: '6px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', width: '100%' }}
                        >
                          View PDF
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div style={{ padding: '40px', background: '#F8FAFC', borderRadius: '16px', textAlign: 'center', border: '1px dashed #CBD5E1' }}>
              <span style={{ fontSize: '32px', display: 'block', marginBottom: '12px' }}>📂</span>
              <p style={{ color: '#475569', margin: 0, fontSize: '16px', fontWeight: '600' }}>No past assessments found.</p>
              <p style={{ color: '#94A3B8', margin: '4px 0 0', fontSize: '14px' }}>Take your first assessment to build your history.</p>
            </div>
          )}
        </div>
`;

// 4. Inject the new History Section before the DISCLAIMERS block
const disclaimersMarker = "{/* ── DISCLAIMERS ── */}";
if (content.includes(disclaimersMarker)) {
  content = content.replace(
    disclaimersMarker,
    newHistorySection + '\n        ' + disclaimersMarker
  );
}

// 5. Add responsive CSS for history boxes grid
const additionalCSS = `
          .dash-history-box:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.08) !important; border-color: rgba(99,102,241,0.5) !important; }
          @media (max-width: 1400px) { .history-boxes-grid { grid-template-columns: repeat(4, 1fr) !important; } }
          @media (max-width: 1024px) { .history-boxes-grid { grid-template-columns: repeat(3, 1fr) !important; } }
          @media (max-width: 768px) { .history-boxes-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 480px) { .history-boxes-grid { grid-template-columns: repeat(1, 1fr) !important; aspect-ratio: auto !important; padding: 24px !important; } }
`;

content = content.replace("`}</style>", additionalCSS + "\n        `}</style>");

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Moved Assessment History into main dashboard view as 6 square boxes.');

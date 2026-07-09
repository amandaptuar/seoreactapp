const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/components/Dashboard.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Update Container to remove max-width
const oldContainerStr = `<div className="dash-container" style={{ position: 'relative', zIndex: 1, maxWidth: '1320px', margin: '0 auto', padding: '100px 32px 80px' }}>`;

const newHeaderAndContainer = `
      {/* ── TOP NAVBAR ── */}
      <div style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #E2E8F0', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }} className="dash-navbar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, #F59E0B, #FB923C)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px' }}>🧠</div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ color: '#0F172A', fontSize: '20px', fontWeight: '800', letterSpacing: '-0.5px' }}>Cognitive Analysis</span>
              <span style={{ padding: '4px 10px', background: isPaid ? 'rgba(16, 185, 129, 0.15)' : 'rgba(71, 85, 105, 0.15)', color: isPaid ? '#10B981' : '#64748B', border: \`1px solid \${isPaid ? 'rgba(16, 185, 129, 0.3)' : 'rgba(71, 85, 105, 0.3)'}\`, borderRadius: '99px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {isPaid ? '🌟 Premium' : '🆓 Free'}
              </span>
            </div>
            <p style={{ color: '#64748B', margin: '2px 0 0', fontSize: '13px', fontWeight: '500' }}>
              {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
        </div>
        
        <div className="dash-header-btns" style={{ display: 'flex', gap: '12px' }}>
          <button className="dash-btn-ghost" onClick={() => navigate('/')} style={{ padding: '10px 16px', background: '#FFFFFF', color: '#64748B', border: '1px solid #E2E8F0', borderRadius: '10px', fontWeight: '600', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s', fontFamily: 'inherit' }}>
            ← Home
          </button>
          <button className="dash-btn-primary" onClick={() => navigate('/question')} style={{ padding: '10px 18px', background: 'linear-gradient(135deg, #10B981, #059669)', color: '#FFFFFF', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s', boxShadow: '0 4px 12px rgba(16,185,129,0.25)', fontFamily: 'inherit' }}>
            🔄 Retake
          </button>
          <button className="dash-btn-primary" onClick={() => handleGeneratePdf('download')} disabled={isGeneratingPdf} style={{ padding: '10px 18px', background: 'linear-gradient(135deg, #3B82F6, #2563EB)', color: '#FFFFFF', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '15px', cursor: isGeneratingPdf ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s', opacity: isGeneratingPdf ? 0.7 : 1, boxShadow: '0 4px 12px rgba(59,130,246,0.25)', fontFamily: 'inherit' }}>
            {isGeneratingPdf ? (
              <><div style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Generating…</>
            ) : (
              <>{(pdfUrl && isPaid) ? '📄 View PDF' : (isPaid ? '⬇ Save PDF' : '⬇ Save Free PDF')}</>
            )}
          </button>
          <button className="dash-btn-primary" onClick={() => handleGeneratePdf('share')} disabled={isGeneratingPdf} style={{ padding: '10px 18px', background: 'linear-gradient(135deg, #6366F1, #8B5CF6)', color: '#FFFFFF', border: 'none', borderRadius: '10px', fontWeight: '700', fontSize: '15px', cursor: isGeneratingPdf ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s', opacity: isGeneratingPdf ? 0.7 : 1, boxShadow: '0 4px 12px rgba(99,102,241,0.25)', fontFamily: 'inherit' }}>
            {isGeneratingPdf ? (
              <><div style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} /> Generating…</>
            ) : (
              <>{isPaid ? '📤 Share PDF' : '📤 Share Free PDF'}</>
            )}
          </button>
        </div>
      </div>

      <div className="dash-container" style={{ position: 'relative', zIndex: 1, width: '100%', padding: '32px' }}>
`;

// Extract old header
const startIdx = content.indexOf(oldContainerStr);
const endHeaderIdx = content.indexOf(`{/* ── ASSESSMENT HISTORY ── */}`);
if (startIdx !== -1 && endHeaderIdx !== -1) {
    const oldHeaderStr = content.substring(startIdx, endHeaderIdx);
    content = content.replace(oldHeaderStr, newHeaderAndContainer + "\n        ");
}

// 2. Adjust Grid for full screen. (Using 4-columns or wider)
content = content.replace(/gridTemplateColumns: '1fr 1fr 1fr'/g, "gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))'");
content = content.replace(/gridTemplateColumns: '1fr 1fr'/g, "gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))'");
content = content.replace(/gridTemplateColumns: 'repeat\(4, 1fr\)'/g, "gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))'");

// 3. Media queries for navbar
const mobileMedia = `
          .dash-navbar { flex-direction: column !important; align-items: flex-start !important; padding: 16px !important; gap: 16px !important; }
`;
content = content.replace(/@media \(max-width: 768px\) \{/, `@media (max-width: 768px) {${mobileMedia}`);

// Let's also fix History section top padding (marginBottom -> margin: '0 0 28px 0')
content = content.replace(/margin: '0 0 20px'/g, "margin: '0 0 24px'"); 

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Done transforming to full screen.');

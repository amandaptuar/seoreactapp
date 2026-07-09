const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/components/Dashboard.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Remove CSS classes
const newCSS = `          .dash-history-item { transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1); }
          .dash-history-item:hover { transform: translateY(-2px); box-shadow: 0 12px 24px rgba(15,23,42,0.06) !important; }
          .history-btn-view { padding: 10px 8px; border: none; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; width: 100%; text-align: center; }
          .history-btn-view:hover:not(:disabled) { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(99,102,241,0.2); }
          .history-btn-pdf { padding: 10px 8px; background: rgba(16,185,129,0.1); color: #10B981; border: none; border-radius: 8px; font-size: 14px; font-weight: 700; cursor: pointer; transition: all 0.2s; width: 100%; text-align: center; }
          .history-btn-pdf:hover { transform: translateY(-1px); background: rgba(16,185,129,0.15); box-shadow: 0 4px 12px rgba(16,185,129,0.2); }
        \`}</style>`;

content = content.replace(newCSS, '`}</style>');

// 2. Revert the buttons in the JSX
content = content.replace(
  /className="history-btn-view" style=\{\{ background: isCurrent \? 'rgba\(241,245,249,0\.8\)' : 'rgba\(99,102,241,0\.1\)', color: isCurrent \? '#94A3B8' : '#6366F1', cursor: isCurrent \? 'default' : 'pointer' \}\}/g,
  "style={{ padding: '8px 4px', background: isCurrent ? 'rgba(255,255,255,0.5)' : 'rgba(99,102,241,0.1)', color: isCurrent ? '#94A3B8' : '#6366F1', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: isCurrent ? 'default' : 'pointer', transition: 'all 0.2s', width: '100%' }}"
);

content = content.replace(
  /className="history-btn-pdf"/g,
  "style={{ padding: '8px 4px', background: 'rgba(16,185,129,0.1)', color: '#10B981', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.2s', width: '100%' }}"
);

// 3. Revert dashboard background
content = content.replace(
  /background: 'rgba\(255,255,255,0\.9\)', backdropFilter: 'blur\(10px\)', position: 'sticky', top: 0, zIndex: 10/g,
  "background: '#FFFFFF', position: 'sticky', top: 0, zIndex: 10"
);

// 4. Revert score badge
content = content.replace(
  /<div style=\{\{ background: 'linear-gradient\(135deg, #F59E0B, #FB923C\)', padding: '4px 12px', borderRadius: '99px', color: '#FFF', fontSize: '13px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px', boxShadow: '0 2px 6px rgba\(245,158,11,0\.2\)' \}\}>★ \{score\}<\/div>/g,
  "<div style={{ background: 'rgba(15,23,42,0.05)', padding: '4px 10px', borderRadius: '8px', color: '#0F172A', fontSize: '14px', fontWeight: '800' }}>Score: {score}</div>"
);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Sidebar UI reverted successfully.');

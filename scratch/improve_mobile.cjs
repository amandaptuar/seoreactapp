const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/components/Dashboard.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

const newCSS = `
        .dash-history-item { transition: all 0.2s; }
        .dash-history-btns { display: flex; gap: 10px; }
        .dash-score-circle { width: 160px; height: 160px; }
        .dash-score-inner { width: 130px; height: 130px; }
        .dash-score-num { font-size: 54px; }
        .dash-nav-logo { width: 40px; height: 40px; font-size: 26px; }
        .dash-nav-title { font-size: 20px; }
        .dash-nav-badge { font-size: 12px; padding: 4px 10px; }
        
        @media (max-width: 1024px) {
          .dash-grid-3 { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .dash-navbar { flex-direction: column !important; align-items: stretch !important; padding: 16px 20px !important; gap: 16px !important; }
          .dash-navbar > div:first-child { justify-content: center; margin-bottom: 8px; }
          .dash-header-btns { display: grid !important; grid-template-columns: 1fr 1fr; gap: 12px !important; }
          .dash-header-btns button { width: 100% !important; justify-content: center !important; font-size: 14px !important; padding: 10px !important; }
          
          .dash-grid-3 { grid-template-columns: 1fr !important; }
          .dash-grid-2 { grid-template-columns: 1fr !important; }
          
          .dash-history-item { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
          .dash-history-btns { width: 100% !important; display: grid !important; grid-template-columns: 1fr 1fr; }
          .dash-history-btns button { width: 100% !important; justify-content: center !important; }
          .dash-card { padding: 20px !important; border-radius: 20px !important; }
          
          .dash-score-circle { width: 140px; height: 140px; }
          .dash-score-inner { width: 110px; height: 110px; }
          .dash-score-num { font-size: 44px; }
        }
        @media (max-width: 480px) {
          .dash-container { padding: 16px !important; }
          .dash-navbar { padding: 16px !important; }
          .dash-header-btns { grid-template-columns: 1fr; }
          .dash-history-btns { grid-template-columns: 1fr; }
          .dash-card { padding: 16px !important; border-radius: 16px !important; }
          
          .dash-score-circle { width: 120px; height: 120px; }
          .dash-score-inner { width: 94px; height: 94px; }
          .dash-score-num { font-size: 38px; }
          .dash-nav-logo { width: 32px; height: 32px; font-size: 20px; }
          .dash-nav-title { font-size: 18px; }
          .dash-nav-badge { font-size: 10px; padding: 2px 8px; }
        }
      \`}</style>`;

// Replace old CSS block with new one
content = content.replace(/\.dash-history-item \{ transition: all 0\.2s; \}[\s\S]*?`\}<\/style>/m, newCSS);

// Now apply these new classes in the JSX
// Top navbar logo & title
content = content.replace(
  /style=\{\{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient\(135deg, #F59E0B, #FB923C\)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px' \}\}/g,
  `className="dash-nav-logo" style={{ borderRadius: '12px', background: 'linear-gradient(135deg, #F59E0B, #FB923C)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}`
);
content = content.replace(
  /style=\{\{ color: '#0F172A', fontSize: '20px', fontWeight: '800', letterSpacing: '-0\.5px' \}\}/g,
  `className="dash-nav-title" style={{ color: '#0F172A', fontWeight: '800', letterSpacing: '-0.5px' }}`
);
content = content.replace(
  /style=\{\{ padding: '4px 10px'(.*?) fontSize: '12px'/g,
  `className="dash-nav-badge" style={{ padding: '4px 10px'$1` // Not fully exact, let's target more specifically
);

// precise replacement for the badge:
content = content.replace(
  /<span style=\{\{ padding: '4px 10px', background: isPaid \? 'rgba\(16, 185, 129, 0\.15\)' : 'rgba\(71, 85, 105, 0\.15\)', color: isPaid \? '#10B981' : '#64748B', border: `1px solid \$\{isPaid \? 'rgba\(16, 185, 129, 0\.3\)' : 'rgba\(71, 85, 105, 0\.3\)'\}`, borderRadius: '99px', fontSize: '12px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0\.5px' \}\}>/g,
  `<span className="dash-nav-badge" style={{ background: isPaid ? 'rgba(16, 185, 129, 0.15)' : 'rgba(71, 85, 105, 0.15)', color: isPaid ? '#10B981' : '#64748B', border: \`1px solid \${isPaid ? 'rgba(16, 185, 129, 0.3)' : 'rgba(71, 85, 105, 0.3)'}\`, borderRadius: '99px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>`
);

// Big score circle classes
content = content.replace(
  /style=\{\{ width: '160px', height: '160px', borderRadius: '50%', background: `conic-gradient\(\$\{scoreColor\} \$\{score \* 3\.6\}deg, rgba\(255,255,255,0\.05\) 0deg\)`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', position: 'relative' \}\}/g,
  `className="dash-score-circle" style={{ borderRadius: '50%', background: \`conic-gradient(\${scoreColor} \${score * 3.6}deg, rgba(15,23,42,0.05) 0deg)\`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', position: 'relative' }}`
);

content = content.replace(
  /style=\{\{ width: '130px', height: '130px', borderRadius: '50%', background: '#FFFFFF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' \}\}/g,
  `className="dash-score-inner" style={{ borderRadius: '50%', background: '#FFFFFF', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: 'inset 0 4px 6px rgba(0,0,0,0.02)' }}`
);

content = content.replace(
  /className="dash-score-num" style=\{\{ fontSize: '54px', fontWeight: '900', color: '#0F172A', lineHeight: 1 \}\}/g,
  `className="dash-score-num" style={{ fontWeight: '900', color: '#0F172A', lineHeight: 1 }}`
);

// We need to fix the grid layout for Domain Scores too, changing repeat(auto-fit, minmax(220px, 1fr)) 
// to ensure it stacks perfectly 2x2 on mobile. Actually `dash-grid-3` logic will handle most of the top components. 
// For domain scores it's `dash-grid-3` with an inline style, let's remove the inline `gridTemplateColumns` to rely on CSS.
content = content.replace(
  /<div className="dash-grid-3" style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(auto-fit, minmax\(220px, 1fr\)\)', gap: '16px' \}\}>/g,
  `<div className="dash-grid-3" style={{ display: 'grid', gap: '16px' }}>`
);

// Also remove inline from score hero section so the CSS class can take over completely for responsiveness.
content = content.replace(
  /<div className="dash-grid-3" style=\{\{ display: 'grid', gridTemplateColumns: 'repeat\(auto-fit, minmax\(320px, 1fr\)\)', gap: '24px', alignItems: 'center' \}\}>/g,
  `<div className="dash-grid-3" style={{ display: 'grid', gap: '24px', alignItems: 'center' }}>`
);

// Now update CSS for dash-grid-3 default to fallback properly
// Just add `.dash-grid-3 { grid-template-columns: repeat(3, 1fr); }` to the top of newCSS.
content = content.replace(
  /\.dash-history-item \{ transition: all 0\.2s; \}/g,
  `.dash-grid-3 { grid-template-columns: repeat(3, 1fr); }
        .dash-history-item { transition: all 0.2s; }`
);


// In Assessment History, fix buttons grid:
// The class is `className="dash-history-btns"` but it has `style={{ display: 'flex', gap: '10px' }}` inline. Remove inline display.
// Wait, I did that in previous script? Let's check:
content = content.replace(
  /className="dash-history-btns" style=\{\{ display: 'flex', gap: '10px' \}\}/g,
  `className="dash-history-btns"` // relying on CSS
);

// For the main padding to be uniform, `dash-container` has `padding: 32px` inline. Let's remove inline padding and rely on CSS.
content = content.replace(
  /<div className="dash-container" style=\{\{ position: 'relative', zIndex: 1, width: '100%', padding: '32px' \}\}>/g,
  `<div className="dash-container" style={{ position: 'relative', zIndex: 1, width: '100%' }}>`
);
content = content.replace(
  /\.dash-container \{ padding: 16px !important; \}/g,
  `.dash-container { padding: 16px !important; }`
);
// default padding to dash-container
content = content.replace(
  /\.dash-pill-badge \{([^}]+)\}/g,
  `.dash-pill-badge {$1}
        .dash-container { padding: 32px; max-width: 1600px; margin: 0 auto; }`
);


fs.writeFileSync(filePath, content, 'utf-8');
console.log('Done improving mobile UI.');

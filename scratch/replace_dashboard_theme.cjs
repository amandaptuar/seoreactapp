const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/components/Dashboard.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Replace backgrounds
content = content.replace(/background: '#020617'/g, "background: '#F8FAFC'");
content = content.replace(/background: 'rgba\(15, 23, 42, 0\.7\)'/g, "background: '#FFFFFF'");
content = content.replace(/background: 'rgba\(255,255,255,0\.03\)'/g, "background: '#F1F5F9'");
content = content.replace(/background: 'rgba\(255,255,255,0\.05\)'/g, "background: '#E2E8F0'");
content = content.replace(/background: '#020617'/g, "background: '#F1F5F9'");
content = content.replace(/background: 'rgba\(2, 6, 23, 0\.82\)'/g, "background: 'rgba(255, 255, 255, 0.7)'");
content = content.replace(/backdropFilter: 'blur\(6px\)'/g, "backdropFilter: 'blur(8px)'");

// Replace borders
content = content.replace(/border: '1px solid rgba\(255,255,255,0\.07\)'/g, "border: '1px solid #E2E8F0'");
content = content.replace(/border: '1px solid rgba\(255,255,255,0\.05\)'/g, "border: '1px solid #E2E8F0'");

// Replace text colors
content = content.replace(/color: '#F8FAFC'/g, "color: '#0F172A'");
content = content.replace(/color: '#94A3B8'/g, "color: '#64748B'");
content = content.replace(/color: '#E2E8F0'/g, "color: '#0F172A'");
content = content.replace(/color: '#CBD5E1'/g, "color: '#334155'");
content = content.replace(/color: '#475569'/g, "color: '#475569'"); // keep same but ensure standard
content = content.replace(/color: '#fff'/g, "color: '#FFFFFF'"); // just in case

// Tooltips & Charts
content = content.replace(/background: '#0F172A'/g, "background: '#FFFFFF'");
content = content.replace(/stroke="rgba\(255,255,255,0\.06\)"/g, 'stroke="#E2E8F0"');
content = content.replace(/cursor={{ fill: 'rgba\(255,255,255,0\.05\)' }}/g, "cursor={{ fill: '#F1F5F9' }}");
content = content.replace(/stroke="rgba\(255,255,255,0\.05\)"/g, 'stroke="#E2E8F0"');

// Shadows
content = content.replace(/boxShadow: '0 20px 60px rgba\(0,0,0,0\.4\)'/g, "boxShadow: '0 10px 40px rgba(0,0,0,0.05)'");
content = content.replace(/boxShadow: '0 10px 40px rgba\(0,0,0,0\.3\)'/g, "boxShadow: '0 10px 30px rgba(0,0,0,0.03)'");

// Blobs
content = content.replace(/background: 'radial-gradient\(circle, rgba\(99,102,241,0\.12\) 0%, transparent 70%\)'/g, "background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)'");
content = content.replace(/background: 'radial-gradient\(circle, rgba\(59,130,246,0\.1\) 0%, transparent 70%\)'/g, "background: 'radial-gradient(circle, rgba(59,130,246,0.06) 0%, transparent 70%)'");

// Button updates in header (so we can find and replace easier)
content = content.replace(
  /background: 'rgba\(15, 23, 42, 0\.7\)', color: '#94A3B8', border: '1px solid rgba\(255,255,255,0\.07\)'/g,
  "background: 'rgba(255, 255, 255, 0.7)', color: '#475569', border: '1px solid #E2E8F0'"
);
content = content.replace(/color: '#94A3B8', border: '1px solid rgba\(255,255,255,0\.07\)'/g, "color: '#64748B', border: '1px solid #E2E8F0'");

// Specific Paywall adjustments
content = content.replace(/color: '#F8FAFC', fontSize: '18px', fontWeight: '700'/g, "color: '#0F172A', fontSize: '18px', fontWeight: '800'");

// History list adjustments
content = content.replace(/background: isCurrent \? 'rgba\(99,102,241,0\.1\)' : '#020617'/g, "background: isCurrent ? 'rgba(99,102,241,0.1)' : '#F1F5F9'");
content = content.replace(/background: '#020617'/g, "background: '#F1F5F9'"); // catch any remaining

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Done!');

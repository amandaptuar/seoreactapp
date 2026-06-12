const fs = require('fs');
const file = 'src/components/Dashboard.jsx';
let content = fs.readFileSync(file, 'utf8');

// Global Background
content = content.replace(/background:\s*'#F8FAFC'/g, "background: '#020617'");
// Global Text Color
content = content.replace(/color:\s*'#0F172A'/g, "color: '#F8FAFC'");

// Cards
content = content.replace(/background:\s*'#FFFFFF'/g, "background: 'rgba(15, 23, 42, 0.7)'");
content = content.replace(/border:\s*'1px solid #E2E8F0'/g, "border: '1px solid rgba(255,255,255,0.07)'");
content = content.replace(/border:\s*'1px solid #F1F5F9'/g, "border: '1px solid rgba(255,255,255,0.05)'");
content = content.replace(/boxShadow:\s*'0 10px 30px rgba\(15,23,42,0\.06\)'/g, "boxShadow: '0 10px 40px rgba(0,0,0,0.3)'");
content = content.replace(/boxShadow:\s*'0 24px 48px rgba\(15,23,42,0\.1\) !important'/g, "boxShadow: '0 20px 40px rgba(0,0,0,0.5) !important'");

// Top Hero Card
content = content.replace(/boxShadow:\s*'0 20px 40px rgba\(15,23,42,0\.08\)'/g, "boxShadow: '0 20px 60px rgba(0,0,0,0.4)'");

// Big Score Circle
content = content.replace(/#F1F5F9/g, "rgba(255,255,255,0.05)");

// Header text & Back Button
content = content.replace(/color:\s*'#1E293B'/g, "color: '#E2E8F0'");
content = content.replace(/color:\s*'#64748B'/g, "color: '#94A3B8'");
content = content.replace(/color:\s*'#334155'/g, "color: '#CBD5E1'");

// Charts
content = content.replace(/stroke="#E2E8F0"/g, 'stroke="rgba(255,255,255,0.06)"');
content = content.replace(/contentStyle=\{\{\s*background:\s*'rgba\(15, 23, 42, 0\.7\)'/g, "contentStyle={{ background: '#0F172A'");

fs.writeFileSync(file, content);
console.log('Dashboard Unskinned successfully!');

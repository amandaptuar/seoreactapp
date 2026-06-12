const fs = require('fs');
const file = 'src/components/Dashboard.jsx';
let content = fs.readFileSync(file, 'utf8');

// Global Background
content = content.replace(/background:\s*'#020617'/g, "background: '#F8FAFC'");
// Global Text Color
content = content.replace(/color:\s*'#F8FAFC'/g, "color: '#0F172A'");

// Cards
content = content.replace(/background:\s*'rgba\(15,\s*23,\s*42,\s*0\.7\)'/g, "background: '#FFFFFF'");
content = content.replace(/background:\s*'rgba\(15,23,42,0\.7\)'/g, "background: '#FFFFFF'");
content = content.replace(/background:\s*'rgba\(15,\s*23,\s*42,\s*0\.5\)'/g, "background: '#FFFFFF'");
content = content.replace(/background:\s*'rgba\(15,23,42,0\.5\)'/g, "background: '#FFFFFF'");
content = content.replace(/border:\s*'1px solid rgba\(255,255,255,0\.07\)'/g, "border: '1px solid #E2E8F0'");
content = content.replace(/border:\s*'1px solid rgba\(255,255,255,0\.05\)'/g, "border: '1px solid #F1F5F9'");
content = content.replace(/boxShadow:\s*'0 10px 40px rgba\(0,0,0,0\.3\)'/g, "boxShadow: '0 10px 30px rgba(15,23,42,0.06)'");

// Top Hero Card
content = content.replace(/background:\s*'linear-gradient\(135deg, rgba\(99,102,241,0\.15\) 0%, rgba\(30,41,59,0\.6\) 60%\)'/g, "background: '#FFFFFF'");
content = content.replace(/boxShadow:\s*'0 20px 60px rgba\(0,0,0,0\.4\)'/g, "boxShadow: '0 20px 40px rgba(15,23,42,0.08)'");

// Big Score Circle
content = content.replace(/background:\s*'#0F172A'/g, "background: '#FFFFFF'");
content = content.replace(/rgba\(255,255,255,0\.05\)/g, "#F1F5F9");

// Header text & Back Button
content = content.replace(/color:\s*'#FFFFFF'/g, "color: '#0F172A'");
content = content.replace(/color:\s*'#fff'/g, "color: '#FFFFFF'"); // Primary button text remains white
content = content.replace(/color:\s*'#E2E8F0'/g, "color: '#1E293B'");
content = content.replace(/color:\s*'#94A3B8'/g, "color: '#64748B'");
content = content.replace(/color:\s*'#CBD5E1'/g, "color: '#334155'");
content = content.replace(/background:\s*'rgba\(255,255,255,0\.04\)'/g, "background: '#FFFFFF'");
content = content.replace(/border:\s*'1px solid rgba\(255,255,255,0\.08\)'/g, "border: '1px solid #E2E8F0'");

// Sub-cards & List items inside cards
content = content.replace(/background:\s*'rgba\(255,255,255,0\.03\)'/g, "background: '#F8FAFC'");
content = content.replace(/background:\s*'rgba\(255,255,255,0\.02\)'/g, "background: '#F8FAFC'");
content = content.replace(/border:\s*'1px solid rgba\(255,255,255,0\.06\)'/g, "border: '1px solid #E2E8F0'");
content = content.replace(/background:\s*'rgba\(255,255,255,0\.06\)'/g, "background: '#E2E8F0'");
content = content.replace(/rgba\(255,255,255,0\.06\)/g, "#E2E8F0"); // General lines

// Charts
content = content.replace(/stroke="rgba\(255,255,255,0\.06\)"/g, 'stroke="#E2E8F0"');
content = content.replace(/stroke="rgba\(255,255,255,0\.04\)"/g, 'stroke="#F1F5F9"');
content = content.replace(/contentStyle=\{\{\s*background:\s*'#0F172A'/g, "contentStyle={{ background: '#FFFFFF'");
content = content.replace(/color:\s*'#F8FAFC'/g, "color: '#0F172A'");
content = content.replace(/border:\s*'1px solid rgba\(99,102,241,0\.3\)'/g, "border: '1px solid #E2E8F0'");
content = content.replace(/border:\s*'1px solid rgba\(255,255,255,0\.1\)'/g, "border: '1px solid #E2E8F0'");
content = content.replace(/cursor=\{\{\s*fill:\s*'rgba\(255,255,255,0\.03\)'\s*\}\}/g, "cursor={{ fill: '#F1F5F9' }}");

// Fix primary button to Amber (matching app theme)
content = content.replace(/linear-gradient\(135deg, #6366F1, #3B82F6\)/g, "linear-gradient(135deg, #F59E0B, #FB923C)");
content = content.replace(/rgba\(99,102,241,0\.35\)/g, "rgba(245,158,11,0.35)");

fs.writeFileSync(file, content);
console.log('Dashboard Reskinned successfully!');

const fs = require('fs');
const file = 'src/components/Dashboard.jsx';
let content = fs.readFileSync(file, 'utf8');

// Bump standard inline fontSize
content = content.replace(/fontSize:\s*'(\d+)px'/g, (match, p1) => {
  const newSize = parseInt(p1) + 4;
  return `fontSize: '${newSize}px'`;
});

// Bump standard inline fontSize with double quotes if any
content = content.replace(/fontSize:\s*"(\d+)px"/g, (match, p1) => {
  const newSize = parseInt(p1) + 4;
  return `fontSize: "${newSize}px"`;
});

// Bump recharts fontSize inside tick={{ fontSize: 11 }}
content = content.replace(/fontSize:\s*(\d+)\b/g, (match, p1) => {
  const newSize = parseInt(p1) + 4;
  return `fontSize: ${newSize}`;
});

// Write back
fs.writeFileSync(file, content);
console.log('Dashboard fonts bumped.');

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/components/Dashboard.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Update .amazon-sidebar to full screen width
content = content.replace(
  /position: fixed; top: 0; left: -400px; bottom: 0; width: 400px; max-width: 90vw;/g,
  "position: fixed; top: 0; left: -100vw; bottom: 0; width: 100vw; max-width: 100vw;"
);

// 2. Add grid class to <style> block
const gridStyle = `          .history-grid { display: grid; grid-template-columns: repeat(6, 1fr); gap: 24px; }
          @media (max-width: 1400px) { .history-grid { grid-template-columns: repeat(4, 1fr); } }
          @media (max-width: 1024px) { .history-grid { grid-template-columns: repeat(3, 1fr); } }
          @media (max-width: 768px) { .history-grid { grid-template-columns: repeat(2, 1fr); } }
          @media (max-width: 480px) { .history-grid { grid-template-columns: repeat(1, 1fr); } }
          
          .dash-history-item { aspect-ratio: 1; display: flex !important; flex-direction: column !important; justify-content: space-between !important; }`;

if (!content.includes('.history-grid { display: grid')) {
  content = content.replace(
    '.amazon-sidebar {',
    gridStyle + '\n\n          .amazon-sidebar {'
  );
}

// 3. Replace the flex-column wrapper for assessments with the new grid class
content = content.replace(
  /<div style=\{\{ display: 'flex', flexDirection: 'column', gap: '16px' \}\}>/g,
  '<div className="history-grid">'
);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Sidebar UI updated to full-screen grid.');

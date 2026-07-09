const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/components/Dashboard.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

// 1. Add CSS for mobile responsiveness
const newCss = `
        .dash-history-item { transition: all 0.2s; }
        .dash-history-btns { display: flex; gap: 10px; }
        @media (max-width: 1024px) {`;

content = content.replace(/@media \(max-width: 1024px\) \{/, newCss);

const mobileCss = `
          .dash-history-item { flex-direction: column !important; align-items: flex-start !important; gap: 12px !important; }
          .dash-history-btns { width: 100% !important; flex-wrap: wrap; }
          .dash-history-btns button { flex: 1 !important; min-width: 120px; justify-content: center !important; }
          .dash-card { padding: 24px !important; }
        }
        @media (max-width: 480px) {`;
content = content.replace(/\}[\s]*@media \(max-width: 480px\) \{/, mobileCss);

const extraMobileCss = `
          .dash-card { padding: 16px !important; }
          .dash-header-row { padding: 16px !important; }
          .dash-title { font-size: 24px !important; }
        }
      \`}</style>`;
content = content.replace(/\}[ \n]*\}[ \n]*`\}<\/style>/, extraMobileCss);


// 2. Extract and remove the history section
const historyStartStr = "{/* ── ASSESSMENT HISTORY ── */}";
const historyStartIndex = content.indexOf(historyStartStr);
let historyBlock = "";

if (historyStartIndex !== -1) {
  // Find the end of the history block. It's followed by `</div>` for the container and then `</div>` for the page.
  // Actually, we can just grab everything from historyStartStr to the first `</div>\n    </div>\n  );\n}` basically.
  
  // Let's use a robust string extraction based on exact lines from view_file.
  const historyEndStr = "</div>\n        )}"; // This is line 734-735
  const block = content.substring(historyStartIndex, content.indexOf(historyEndStr, historyStartIndex) + historyEndStr.length);
  
  // Replace the marginTop: '28px' to marginBottom: '28px' because it's now at the top
  historyBlock = block.replace(/marginTop: '28px'/g, "marginBottom: '28px'");
  // add the class names for mobile styling
  historyBlock = historyBlock.replace(/<div key=\{assessment.id \|\| i\}/, `<div className="dash-history-item" key={assessment.id || i}`);
  historyBlock = historyBlock.replace(/<div style=\{\{ display: 'flex', gap: '10px' \}\}>/, `<div className="dash-history-btns">`);
  // also add it globally if there are multiple maps
  historyBlock = historyBlock.replace(/<div key=\{assessment\.id \|\| i\} style/g, `<div className="dash-history-item" key={assessment.id || i} style`);
  historyBlock = historyBlock.replace(/<div style=\{\{ display: 'flex', gap: '10px' \}\}>/g, `<div className="dash-history-btns" style={{ display: 'flex', gap: '10px' }}>`);

  // Remove it from the bottom
  content = content.replace(block, "");
}

// 3. Insert it right before SCORE HERO SECTION
const scoreHeroStr = "{/* ── SCORE HERO SECTION ── */}";
if (historyBlock) {
  content = content.replace(scoreHeroStr, historyBlock + "\n\n        " + scoreHeroStr);
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Moved history section and added mobile CSS.');

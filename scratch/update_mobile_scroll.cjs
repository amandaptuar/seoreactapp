const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/components/Dashboard.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

const oldCssGrid = `.dash-header-btns { display: grid !important; grid-template-columns: 1fr 1fr; gap: 12px !important; }
          .dash-header-btns button { width: 100% !important; justify-content: center !important; font-size: 14px !important; padding: 10px !important; }`;

const newScrollFlex = `.dash-header-btns { 
            display: flex !important; 
            flex-direction: row !important; 
            overflow-x: auto !important; 
            width: calc(100% + 40px) !important; 
            margin: 0 -20px !important; 
            padding: 4px 20px 12px !important; 
            gap: 12px !important; 
            scroll-snap-type: x mandatory;
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .dash-header-btns::-webkit-scrollbar { display: none; }
          .dash-header-btns button { 
            width: auto !important; 
            flex: 0 0 auto !important; 
            justify-content: center !important; 
            font-size: 14px !important; 
            padding: 10px 16px !important; 
            scroll-snap-align: start;
            white-space: nowrap;
          }`;

content = content.replace(oldCssGrid, newScrollFlex);

// Now for 480px we had: `.dash-header-btns { grid-template-columns: 1fr; }`
// We need to remove that since it's now flex
content = content.replace(`.dash-header-btns { grid-template-columns: 1fr; }`, `/* removed */`);

// Wait, at max-width: 480px, the navbar padding is 16px, so we need to adjust margin and padding for scroll container
content = content.replace(
  `.dash-navbar { padding: 16px !important; }`,
  `.dash-navbar { padding: 16px !important; }
          .dash-header-btns { width: calc(100% + 32px) !important; margin: 0 -16px !important; padding: 4px 16px 12px !important; }`
);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Mobile scrollable nav updated.');

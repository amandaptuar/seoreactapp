const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/components/Dashboard.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

const oldScrollFlex = `.dash-header-btns { 
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

const newWrapGrid = `.dash-header-btns { 
            display: flex !important; 
            flex-wrap: wrap !important; 
            width: 100% !important; 
            margin: 0 !important; 
            padding: 0 !important; 
            gap: 8px !important; 
          }
          .dash-header-btns button { 
            flex: 1 1 calc(50% - 8px) !important; 
            justify-content: center !important; 
            font-size: 13px !important; 
            padding: 10px 8px !important; 
            white-space: nowrap;
          }`;

content = content.replace(oldScrollFlex, newWrapGrid);

content = content.replace(
  `.dash-header-btns { width: calc(100% + 32px) !important; margin: 0 -16px !important; padding: 4px 16px 12px !important; }`,
  `/* header btns use flex-wrap globally for mobile */`
);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Mobile buttons updated to flex-wrap.');

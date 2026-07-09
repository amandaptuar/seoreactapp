const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/components/Dashboard.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

const historyMarker = "{/* ── ASSESSMENT HISTORY (MAIN) ── */}";
const disclaimersMarker = "{/* ── DISCLAIMERS ── */}";
const mainContentMarker = "{/* ── MAIN CONTENT ── */}";

const historyIndex = content.indexOf(historyMarker);
const disclaimersIndex = content.indexOf(disclaimersMarker);
const mainContentIndex = content.indexOf(mainContentMarker);

if (historyIndex !== -1 && disclaimersIndex !== -1 && mainContentIndex !== -1) {
  // Extract the history block
  const historyBlock = content.substring(historyIndex, disclaimersIndex);
  
  // Remove it from its current position
  content = content.substring(0, historyIndex) + content.substring(disclaimersIndex);
  
  // Re-calculate the mainContentIndex since content string length changed
  const newMainContentIndex = content.indexOf(mainContentMarker);
  
  // Insert it after the MAIN CONTENT marker
  const insertionPoint = newMainContentIndex + mainContentMarker.length;
  content = content.substring(0, insertionPoint) + '\n\n        ' + historyBlock + content.substring(insertionPoint);
  
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log('Moved Assessment History to the top.');
} else {
  console.log('Markers not found.');
}

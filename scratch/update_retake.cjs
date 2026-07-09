const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/components/Dashboard.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Add import
if (!content.includes('import { startLoggedInAssessment }')) {
  content = content.replace(
    "import { getApiUrl } from '../lib/apiUtils';",
    "import { getApiUrl } from '../lib/apiUtils';\nimport { startLoggedInAssessment } from '../lib/assessmentFlow';"
  );
}

// Update the retake button
content = content.replace(
  /onClick=\{\(\) => navigate\('\/question'\)\}/g,
  "onClick={() => startLoggedInAssessment(navigate, setIsSwitchingAssessment)}"
);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Updated Dashboard.jsx to use startLoggedInAssessment.');

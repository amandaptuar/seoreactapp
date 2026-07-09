const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/components/Header.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Replace import
content = content.replace(
  "import EnquiryModal from './EnquiryModal';",
  "import AssessmentModal from './AssessmentModal';"
);

// Replace state and JSX
content = content.replace(/isEnquiryOpen/g, 'isAssessmentOpen');
content = content.replace(/setIsEnquiryOpen/g, 'setIsAssessmentOpen');
content = content.replace(
  /<EnquiryModal isOpen=\{isAssessmentOpen\} onClose=\{\(\) => setIsAssessmentOpen\(false\)\} \/>/g,
  "<AssessmentModal isOpen={isAssessmentOpen} onClose={() => setIsAssessmentOpen(false)} />"
);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Header.jsx updated to use AssessmentModal.');

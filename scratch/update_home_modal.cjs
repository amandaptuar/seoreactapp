const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../src/pages/Home.jsx');
let content = fs.readFileSync(filePath, 'utf-8');

// Ensure AssessmentModal is imported
if (!content.includes("import AssessmentModal from '../components/AssessmentModal';")) {
  content = content.replace(
    "import LoginModal from '../components/LoginModal';",
    "import LoginModal from '../components/LoginModal';\nimport AssessmentModal from '../components/AssessmentModal';"
  );
}

// Extract out the inline modal code
// Find start of modal
const modalStartStr = "{/* ===== REGISTRATION MODAL ===== */}";
const modalStartIndex = content.indexOf(modalStartStr);
// Find end of modal, which is before {/* ===== LOGIN MODAL ===== */}
const modalEndStr = "{/* ===== LOGIN MODAL ===== */}";
const modalEndIndex = content.indexOf(modalEndStr);

if (modalStartIndex !== -1 && modalEndIndex !== -1) {
  content = content.substring(0, modalStartIndex) + 
            "      {/* ===== REGISTRATION MODAL ===== */}\n      <AssessmentModal isOpen={showModal} onClose={() => setShowModal(false)} />\n\n      " + 
            content.substring(modalEndIndex);
}

// Remove the unused handleFormSubmit function and related states to clean up Home.jsx
// It starts at "const [formData, setFormData] =" and ends at the closing brace of handleFormSubmit
const formSubmitStartStr = "const [formData, setFormData] = React.useState({ name: '', email: '', age: '', gender: '' });";
const handleStartAssessmentStr = "const handleStartAssessment = () => {";
// We don't want to remove handleStartAssessment, it just opens the modal.
// But we want to remove the states and handleFormSubmit.

const statesToRemove = `  const [formData, setFormData] = React.useState({ name: '', email: '', age: '', gender: '' });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formError, setFormError] = React.useState('');`;

content = content.replace(statesToRemove, "");

const handleChangeStart = "const handleChange = (e) => {";
const useEffectStart = "useEffect(() => {";
const handleChangeIndex = content.indexOf(handleChangeStart);
const useEffectIndex = content.indexOf(useEffectStart);

if (handleChangeIndex !== -1 && useEffectIndex !== -1) {
  content = content.substring(0, handleChangeIndex) + content.substring(useEffectIndex);
}

// Fix handleStartAssessment so it doesn't clear state that was just removed
content = content.replace(
  /setShowModal\(true\);\n    setFormError\(''\);\n    setFormData\(\{ name: '', email: '', age: '', gender: '' \}\);/g,
  "setShowModal(true);"
);

fs.writeFileSync(filePath, content, 'utf-8');
console.log('Home.jsx updated to use AssessmentModal.');

const fs = require('fs');
const path = require('path');

const files = [
  'Features.jsx',
  'Benefits.jsx',
  'HowItWorksPage.jsx',
];

const basePath = path.join(__dirname, '../src/pages');

for (const file of files) {
  const filePath = path.join(basePath, file);
  if (!fs.existsSync(filePath)) continue;

  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('import { startLoggedInAssessment }')) {
    content = content.replace(
      "import { useNavigate } from 'react-router-dom';",
      "import { useNavigate } from 'react-router-dom';\nimport { startLoggedInAssessment } from '../lib/assessmentFlow';"
    );
  }

  if (!content.includes('const [isSubmitting, setIsSubmitting] = useState(false);')) {
    content = content.replace(
      'const navigate = useNavigate();',
      'const navigate = useNavigate();\n  const [isSubmitting, setIsSubmitting] = useState(false);'
    );
  }

  if (content.includes('const goToAssessment = () => navigate(\'/join\');')) {
    content = content.replace(
      "const goToAssessment = () => navigate('/join');",
      `const goToAssessment = () => {
    if (isLoggedIn) {
      startLoggedInAssessment(navigate, setIsSubmitting);
    } else {
      navigate('/join');
    }
  };`
    );
  }

  // Replace {isLoggedIn ? 'Take Assessment Again' : '...'} with {isSubmitting ? 'Generating Questionnaire...' : isLoggedIn ? 'Take Assessment Again' : '...'}
  content = content.replace(/\{isLoggedIn \? 'Take Assessment Again' : /g, "{isSubmitting ? 'Generating Questionnaire...' : isLoggedIn ? 'Take Assessment Again' : ");

  fs.writeFileSync(filePath, content, 'utf8');
}

// Now for Home.jsx (in pages)
const homePath = path.join(__dirname, '../src/pages/Home.jsx');
if (fs.existsSync(homePath)) {
  let home = fs.readFileSync(homePath, 'utf8');
  home = home.replace(/\{isLoggedIn \? 'Take Assessment Again' : /g, "{isSubmitting ? 'Generating Questionnaire...' : isLoggedIn ? 'Take Assessment Again' : ");
  fs.writeFileSync(homePath, home, 'utf8');
}

// Now for Hero.jsx (in components)
const heroPath = path.join(__dirname, '../src/components/Hero.jsx');
if (fs.existsSync(heroPath)) {
  let hero = fs.readFileSync(heroPath, 'utf8');
  hero = hero.replace(/\{isLoggedIn \? 'Take Assessment Again' : isSubmitting \? 'Starting\.\.\.' :/g, "{isSubmitting ? 'Generating Questionnaire...' : isLoggedIn ? 'Take Assessment Again' :");
  fs.writeFileSync(heroPath, hero, 'utf8');
}

// Now for EnquiryModal.jsx (in components)
const enquiryPath = path.join(__dirname, '../src/components/EnquiryModal.jsx');
if (fs.existsSync(enquiryPath)) {
  let enquiry = fs.readFileSync(enquiryPath, 'utf8');
  enquiry = enquiry.replace(/\{isLoggedIn \? 'Take Assessment Again' : isSubmitting \? 'Starting\.\.\.' :/g, "{isSubmitting ? 'Generating Questionnaire...' : isLoggedIn ? 'Take Assessment Again' :");
  fs.writeFileSync(enquiryPath, enquiry, 'utf8');
}

// Now for JoinUsPage.jsx (in pages)
const joinUsPath = path.join(__dirname, '../src/pages/JoinUsPage.jsx');
if (fs.existsSync(joinUsPath)) {
  let joinUs = fs.readFileSync(joinUsPath, 'utf8');
  joinUs = joinUs.replace(/\{isSubmitting \? 'Generating\.\.\.' : 'Generate More Assessment'\}/g, "{isSubmitting ? 'Generating Questionnaire...' : 'Generate More Assessment'}");
  fs.writeFileSync(joinUsPath, joinUs, 'utf8');
}

console.log("All patches applied.");

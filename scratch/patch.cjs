const fs = require('fs');
const files = [
  'src/pages/DemoPage.jsx',
  'src/pages/Home.jsx',
  'src/pages/JoinUsPage.jsx',
  'src/components/AssessmentModal.jsx',
  'src/components/EnquiryModal.jsx',
  'src/components/Hero.jsx'
];

files.forEach(file => {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  
  if (!content.includes('sendCredentialsEmail')) {
    content = content.replace(
      /import \{ generateAssessmentQuestions \} from '..\/lib\/apiUtils';/g, 
      "import { generateAssessmentQuestions } from '../lib/apiUtils';\nimport { sendCredentialsEmail } from '../lib/emailService';"
    );
  }

  const insertPattern = /const questionsData = await generateAssessmentQuestions\(formData\.age, formData\.gender\);/;
  if (content.includes('generateAssessmentQuestions(formData.age, formData.gender)') && !content.includes('sendCredentialsEmail({')) {
    content = content.replace(
      insertPattern,
      `const questionsData = await generateAssessmentQuestions(formData.age, formData.gender);
      
      try {
        await sendCredentialsEmail({
          name: formData.name,
          email: formData.email,
          tempPassword: generatedPassword,
        });
      } catch (emailErr) {
        console.warn('Credentials email failed (non-fatal):', emailErr);
      }`
    );
    fs.writeFileSync(file, content);
    console.log('Patched', file);
  } else {
    console.log('Skipped or already patched', file);
  }
});

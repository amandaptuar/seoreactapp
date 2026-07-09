const fs = require('fs');
const path = require('path');

const heroPath = path.join(__dirname, '../src/components/Hero.jsx');
let heroContent = fs.readFileSync(heroPath, 'utf8');

heroContent = heroContent.replace(
  '  const handleSubmit = async (e) => {\n    e.preventDefault();\n    setIsSubmitting(true);\n    setFormError(\'\');',
  `  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      return startLoggedInAssessment(navigate, setIsSubmitting);
    }
    setIsSubmitting(true);
    setFormError('');`
);

heroContent = heroContent.replace(
  /disabled={isSubmitting \|\| isLoggedIn}/g,
  'disabled={isSubmitting}'
);

heroContent = heroContent.replace(
  /opacity: \(isSubmitting \|\| isLoggedIn\) \? 0\.7 : 1/g,
  'opacity: isSubmitting ? 0.7 : 1'
);

heroContent = heroContent.replace(
  /cursor: \(isSubmitting \|\| isLoggedIn\) \? 'not-allowed' : 'pointer'/g,
  "cursor: isSubmitting ? 'not-allowed' : 'pointer'"
);

heroContent = heroContent.replace(
  /if\(\!isSubmitting && \!isLoggedIn\)/g,
  'if(!isSubmitting)'
);

fs.writeFileSync(heroPath, heroContent, 'utf8');
console.log("Hero patched.");

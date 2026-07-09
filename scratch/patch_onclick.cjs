const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../src');

function findAndReplace(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      findAndReplace(fullPath);
    } else if (fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;

      if (content.includes('onClick={isLoggedIn ? undefined : goToAssessment}')) {
        content = content.replace(/onClick={isLoggedIn \? undefined : goToAssessment}/g, 'onClick={goToAssessment}');
        modified = true;
      }
      
      if (content.includes("onClick={isLoggedIn ? undefined : () => navigate('/join')}")) {
        content = content.replace(/onClick={isLoggedIn \? undefined : \(\) => navigate\('\/join'\)}/g, "onClick={() => navigate('/join')}");
        modified = true;
      }

      if (content.includes("onClick={isLoggedIn ? undefined : () => setShowAssessment(true)}")) {
        content = content.replace(/onClick={isLoggedIn \? undefined : \(\) => setShowAssessment\(true\)}/g, "onClick={() => setShowAssessment(true)}");
        modified = true;
      }

      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

findAndReplace(directoryPath);
console.log("Done");

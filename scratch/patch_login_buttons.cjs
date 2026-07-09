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

      // Replace disabled={isLoggedIn}
      if (content.includes('disabled={isLoggedIn}')) {
        content = content.replace(/disabled={isLoggedIn}/g, '');
        modified = true;
      }

      // Replace 'Already Logged In' text
      if (content.includes("'Already Logged In'")) {
        content = content.replace(/'Already Logged In'/g, "'Take Assessment Again'");
        modified = true;
      }
      if (content.includes("'You are already logged in'")) {
        content = content.replace(/'You are already logged in'/g, "'Take Assessment Again'");
        modified = true;
      }
      
      // Remove opacity and cursor styles related to isLoggedIn
      if (content.includes("cursor: isLoggedIn ? 'not-allowed' : 'pointer'")) {
        content = content.replace(/cursor: isLoggedIn \? 'not-allowed' : 'pointer',?/g, "cursor: 'pointer',");
        modified = true;
      }
      if (content.includes("opacity: isLoggedIn ? 0.6 : 1")) {
        content = content.replace(/opacity: isLoggedIn \? 0\.6 : 1,?/g, "");
        modified = true;
      }
      if (content.includes("cursor: isLoggedIn ? 'not-allowed' : 'pointer'")) {
        content = content.replace(/cursor: isLoggedIn \? 'not-allowed' : 'pointer',?/g, "cursor: 'pointer',");
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

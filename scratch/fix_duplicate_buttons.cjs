const fs = require('fs');
const path = require('path');

const srcPath = path.join(__dirname, '../src');

function walkDir(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkDir(filePath));
    } else if (filePath.endsWith('.jsx')) {
      results.push(filePath);
    }
  });
  return results;
}

const jsxFiles = walkDir(srcPath);

jsxFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;

  // Replace erroneous sample report button text changes
  content = content.replace(
    /\{isSubmitting \? 'Generating Questionnaire\.\.\.' : isLoggedIn \? 'Take Assessment Again' : 'View Sample Report'\}/g,
    "'View Sample Report'"
  );

  content = content.replace(
    /\{isSubmitting \? 'Generating Questionnaire\.\.\.' : isLoggedIn \? 'Take Assessment Again' : 'View Sample Report ➔'\}/g,
    "'View Sample Report ➔'"
  );

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed:', path.basename(file));
  }
});

console.log("Fix complete.");

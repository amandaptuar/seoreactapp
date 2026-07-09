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

  // Replace all instances of 'Take Assessment Again' with 'Take Real Assessment'
  content = content.replace(/'Take Assessment Again'/g, "'Take Real Assessment'");
  // Just in case it's not wrapped in single quotes:
  content = content.replace(/>Take Assessment Again</g, ">Take Real Assessment<");

  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated:', path.basename(file));
  }
});

console.log("Renaming complete.");

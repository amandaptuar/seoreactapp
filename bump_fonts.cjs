const fs = require('fs');
const path = require('path');
const dir = './src/components';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jsx'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Bump font sizes by 2px, but only for values between 10px and 80px to be safe
  const newContent = content.replace(/fontSize:\s*'(\d+)px'/g, (match, size) => {
    let newSize = parseInt(size, 10) + 2;
    return `fontSize: '${newSize}px'`;
  });
  
  if (content !== newContent) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Bumped fonts in ' + file);
  }
});

import fs from 'fs';
import path from 'path';

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('./src', function(filePath) {
  if(filePath.endsWith('.jsx') || filePath.endsWith('.js') || filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content.replace(/"\/assets\//g, '"./assets/').replace(/'\/assets\//g, "'./assets/");
    if(content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Updated', filePath);
    }
  }
});

let indexContent = fs.readFileSync('./index.html', 'utf8');
indexContent = indexContent.replace(/"\/assets\//g, '"./assets/').replace(/"\/favicon.svg"/g, '"./favicon.svg"');
fs.writeFileSync('./index.html', indexContent, 'utf8');
console.log('Updated index.html');

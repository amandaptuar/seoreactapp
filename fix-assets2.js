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
  if(filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let newContent = content.split('"/assets/').join('"./assets/').split("'/assets/").join("'./assets/");
    if(content !== newContent) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log('Fixed:', filePath);
    }
  }
});

let indexContent = fs.readFileSync('./index.html', 'utf8');
let newIndexContent = indexContent.split('"/assets/').join('"./assets/').split('"/favicon.svg"').join('"./favicon.svg"');
if (indexContent !== newIndexContent) {
  fs.writeFileSync('./index.html', newIndexContent, 'utf8');
  console.log('Fixed: index.html');
}

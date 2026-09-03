const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\amand\\.gemini\\antigravity\\brain';
const dirs = fs.readdirSync(brainDir);
const results = {};

const thirtyDaysAgo = new Date();
thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 35);

for (const dir of dirs) {
  const dirPath = path.join(brainDir, dir);
  const stat = fs.statSync(dirPath);
  
  if (stat.mtime >= thirtyDaysAgo) {
    const overviewPath = path.join(dirPath, '.system_generated', 'logs', 'overview.txt');
    if (fs.existsSync(overviewPath)) {
      const content = fs.readFileSync(overviewPath, 'utf8');
      
      const dateStr = stat.mtime.toISOString().split('T')[0];
      
      let summary = "Task";
      const userReqMatch = content.match(/<USER_REQUEST>([\s\S]*?)<\/USER_REQUEST>/);
      if (userReqMatch && userReqMatch[1]) {
        summary = userReqMatch[1].trim().replace(/\n/g, ' ').substring(0, 150) + '...';
      } else {
        summary = content.split('\n').slice(0, 3).join(' ').substring(0, 150);
      }
      
      if (!results[dateStr]) {
        results[dateStr] = [];
      }
      results[dateStr].push(summary);
    }
  }
}

console.log(JSON.stringify(results, null, 2));

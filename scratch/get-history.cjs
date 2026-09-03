const fs = require('fs');
const path = require('path');

const brainDir = 'C:\\Users\\amand\\.gemini\\antigravity\\brain';
const dirs = fs.readdirSync(brainDir);
const results = {};

const twentyDaysAgo = new Date();
twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 20);

for (const dir of dirs) {
  const metaPath = path.join(brainDir, dir, 'metadata.json');
  if (fs.existsSync(metaPath)) {
    try {
      const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
      const dateStr = meta.created || meta.timestamp;
      if (dateStr) {
        const date = new Date(dateStr);
        if (date >= twentyDaysAgo) {
          const day = date.toISOString().split('T')[0];
          if (!results[day]) results[day] = [];
          results[day].push(meta.title || meta.objective || 'Task');
        }
      }
    } catch (e) {
      // Ignore parse errors
    }
  } else {
    // If there is no metadata.json, look for a conversation log or something? No, let's just ignore.
  }
}

console.log(JSON.stringify(results, null, 2));

const fs = require('fs');
const path = 'src/pages/Dashboard.jsx';
const text = fs.readFileSync(path, 'utf8');
const lines = text.split(/\r?\n/);
console.log('line count', lines.length);
for (let i = 1; i <= lines.length; i++) {
  const line = lines[i-1];
  if (i >= 280 && i <= 305) {
    console.log(`${i}: ${line}`);
  }
}
console.log('--- char codes around 280-305 ---');
const start = text.indexOf(lines[279] || '');
console.log(start);

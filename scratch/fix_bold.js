import fs from 'fs';
const p = 'C:/We_are_as_Gods/src/data/sessionsData.js';
let c = fs.readFileSync(p, 'utf-8');
// Fix double bold markers: ****text:**** -> **text:**
c = c.replaceAll('****', '**');
fs.writeFileSync(p, c, 'utf-8');
console.log('Fixed double-bold formatting artifacts.');

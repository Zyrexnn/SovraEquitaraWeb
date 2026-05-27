const fs = require('fs');
const content = fs.readFileSync('c:/Users/ikhsa/Documents/SovraEquitara/fe/src/pages/superadmin/dashboard.astro', 'utf8');
const scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/);
if (scriptMatch) {
  fs.writeFileSync('script.ts', scriptMatch[1]);
  console.log("Extracted script.ts");
} else {
  console.log("No <script> tag found");
}

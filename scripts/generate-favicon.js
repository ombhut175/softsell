const fs = require('fs');
const path = require('path');

// Create public directory if it doesn't exist
const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

// SVG favicon content
const svgContent = `
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="8" fill="url(#gradient)"/>
  <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="white" font-family="Arial" font-weight="bold" font-size="20">S</text>
  <circle cx="24" cy="8" r="4" fill="#4ADE80" stroke="white" stroke-width="2"/>
  <defs>
    <linearGradient id="gradient" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#4F46E5"/>
      <stop offset="100%" stop-color="#9333EA"/>
    </linearGradient>
  </defs>
</svg>
`;

// Write SVG file
fs.writeFileSync(path.join(publicDir, 'favicon.svg'), svgContent);

console.log('Favicon files generated successfully!');
console.log('Please convert the SVG to ICO and PNG formats using a tool like https://realfavicongenerator.net/'); 
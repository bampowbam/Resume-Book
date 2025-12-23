const { createCanvas } = require('canvas');
const fs = require('fs');

// Create canvas
const canvas = createCanvas(400, 600);
const ctx = canvas.getContext('2d');

// Background gradient (dark book cover)
const gradient = ctx.createLinearGradient(0, 0, 400, 600);
gradient.addColorStop(0, '#1a1a1a');
gradient.addColorStop(1, '#333333');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 400, 600);

// Add some texture/noise
ctx.fillStyle = 'rgba(255,255,255,0.02)';
for (let i = 0; i < 1000; i++) {
  const x = Math.random() * 400;
  const y = Math.random() * 600;
  ctx.fillRect(x, y, 1, 1);
}

// Title area border
ctx.strokeStyle = 'rgba(255,255,255,0.1)';
ctx.lineWidth = 2;
ctx.strokeRect(40, 100, 320, 200);

// Main title
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 32px Georgia, serif';
ctx.textAlign = 'center';
ctx.fillText('CodePen', 200, 160);
ctx.fillText('Showcase', 200, 200);

// Subtitle
ctx.font = '24px Georgia, serif';
ctx.fillStyle = '#cccccc';
ctx.fillText('Interactive Book', 200, 240);

// Decorative circle
ctx.strokeStyle = 'rgba(255,255,255,0.2)';
ctx.lineWidth = 2;
ctx.beginPath();
ctx.arc(200, 350, 40, 0, Math.PI * 2);
ctx.stroke();

ctx.beginPath();
ctx.arc(200, 350, 25, 0, Math.PI * 2);
ctx.stroke();

// Bottom text
ctx.font = '16px Georgia, serif';
ctx.fillStyle = '#888888';
ctx.fillText('Scroll to Explore', 200, 520);

ctx.font = '14px Georgia, serif';
ctx.fillStyle = '#666666';
ctx.fillText('20 Amazing Demos', 200, 545);

// Save as PNG
const buffer = canvas.toBuffer('image/png');
fs.writeFileSync('public/BookCover.png', buffer);
console.log('BookCover.png created successfully!');

const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Backgrounds
      content = content.replace(/bg-\[#0e0e10\]/g, 'bg-background');
      content = content.replace(/bg-\[#131316\]/g, 'bg-card');
      content = content.replace(/bg-\[#1a1a1e\]/g, 'bg-secondary');
      
      // Text
      content = content.replace(/text-white\/[0-9]+/g, 'text-foreground');
      content = content.replace(/text-white/g, 'text-foreground');
      content = content.replace(/text-\[#70707b\]/g, 'text-muted-foreground');
      content = content.replace(/text-\[#a0a0ab\]/g, 'text-muted-foreground');
      content = content.replace(/text-\[#a48afb\]/g, 'text-primary');
      content = content.replace(/text-\[#875bf7\]/g, 'text-primary');
      content = content.replace(/text-\[#6d4ed4\]/g, 'text-primary');
      
      // Borders
      content = content.replace(/border-white\/[0-9]+/g, 'border-border');
      content = content.replace(/border-\[#1a1a1e\]/g, 'border-border');
      content = content.replace(/border-\[#26272b\]/g, 'border-border');
      
      // Brand / Primary
      content = content.replace(/bg-\[#875bf7\]/g, 'bg-primary');
      content = content.replace(/from-\[#875bf7\]/g, 'from-primary');
      content = content.replace(/to-\[#875bf7\]/g, 'to-primary');
      content = content.replace(/from-\[#a48afb\]/g, 'from-primary');
      content = content.replace(/from-\[#6d4ed4\]/g, 'from-primary');
      content = content.replace(/to-\[#6d4ed4\]/g, 'to-primary');
      content = content.replace(/shadow-\[#875bf7\]/g, 'shadow-primary');
      
      fs.writeFileSync(fullPath, content);
    }
  }
}

processDir(path.join(__dirname, 'app'));
processDir(path.join(__dirname, 'components'));
console.log("Refactoring complete.");

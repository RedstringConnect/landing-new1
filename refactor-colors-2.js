const fs = require('fs');
const path = require('path');

const colorMap = {
  '#0e0e10': 'background',
  '#131316': 'background',
  '#1a1a1e': 'border',
  '#26272b': 'secondary',
  '#3f3f46': 'muted-foreground',
  '#52525b': 'muted-foreground',
  '#70707b': 'muted-foreground',
  '#a0a0ab': 'muted-foreground',
  '#875bf7': 'primary',
  '#a48afb': 'primary',
  '#6d4ed4': 'primary',
  '#c4b5fd': 'primary',
  '#7c3aed': 'primary',
  '#7b4ee8': 'primary',
  '#ffffff': 'foreground'
};

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace dynamic hexes
      content = content.replace(/([a-z]+)-\[([^\]]+)\]/gi, (match, prefix, hex) => {
        if(hex.startsWith('#')) {
          const lowerHex = hex.toLowerCase();
          if (colorMap[lowerHex]) {
             if(prefix === 'text' && lowerHex === '#ffffff') return 'text-foreground';
             if(prefix === 'border' && lowerHex === '#ffffff') return 'border-border';
             if(prefix === 'bg' && lowerHex === '#ffffff') return 'bg-background';
             
             if(prefix === 'text' && colorMap[lowerHex] === 'border') return 'text-muted-foreground';
             if(prefix === 'border' && colorMap[lowerHex] === 'muted-foreground') return 'border-border';
             if(prefix === 'border' && colorMap[lowerHex] === 'background') return 'border-border';
             if(prefix === 'from' && lowerHex === '#0e0e10') return 'from-background';
             if(prefix === 'from' && lowerHex === '#131316') return 'from-background';

             return `${prefix}-${colorMap[lowerHex]}`;
          }
        }
        return match;
      });

      fs.writeFileSync(fullPath, content);
    }
  }
}

processDir(path.join(__dirname, 'app'));
processDir(path.join(__dirname, 'components'));
console.log("Deep color refactoring complete.");

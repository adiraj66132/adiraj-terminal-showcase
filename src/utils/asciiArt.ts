
export const getWelcomeAscii = (screenSize: 'mobile' | 'tablet' | 'desktop') => {
  switch (screenSize) {
    case 'mobile':
      return `
┌─────────────────────────────────┐
│        WELCOME TO THE           │
│           MATRIX                │
│                                 │
│    █████╗ ██████╗ ██╗██████╗    │
│   ██╔══██╗██╔══██╗██║██╔══██╗   │
│   ███████║██║  ██║██║██████╔╝   │
│   ██╔══██║██║  ██║██║██╔══██╗   │
│   ██║  ██║██████╔╝██║██║  ██║   │
│   ╚═╝  ╚═╝╚═════╝ ╚═╝╚═╝  ╚═╝   │
│                                 │
│      KASHYAP - Frontend         │
│         Developer               │
│                                 │
└─────────────────────────────────┘`;

    case 'tablet':
      return `
╔═══════════════════════════════════════════════════╗
║                WELCOME TO THE MATRIX              ║
║                                                   ║
║    █████╗ ██████╗ ██╗██████╗  █████╗      ██╗    ║
║   ██╔══██╗██╔══██╗██║██╔══██╗██╔══██╗     ██║    ║
║   ███████║██║  ██║██║██████╔╝███████║     ██║    ║
║   ██╔══██║██║  ██║██║██╔══██╗██╔══██║██   ██║    ║
║   ██║  ██║██████╔╝██║██║  ██║██║  ██║╚█████╔╝    ║
║   ╚═╝  ╚═╝╚═════╝ ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚════╝     ║
║                                                   ║
║            KASHYAP - Frontend Developer           ║
║                                                   ║
╚═══════════════════════════════════════════════════╝`;

    case 'desktop':
    default:
      return `
╔════════════════════════════════════════════════════════════╗
║                    WELCOME TO THE MATRIX                   ║
║                                                            ║
║     █████╗ ██████╗ ██╗██████╗  █████╗      ██╗            ║
║    ██╔══██╗██╔══██╗██║██╔══██╗██╔══██╗     ██║            ║
║    ███████║██║  ██║██║██████╔╝███████║     ██║            ║
║    ██╔══██║██║  ██║██║██╔══██╗██╔══██║██   ██║            ║
║    ██║  ██║██████╔╝██║██║  ██║██║  ██║╚█████╔╝            ║
║    ╚═╝  ╚═╝╚═════╝ ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚════╝             ║
║                                                            ║
║              KASHYAP - Frontend Developer                  ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝`;
  }
};

export const getMatrixRainChars = () => {
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return chars.split('');
};

export const createMatrixRain = (screenSize: 'mobile' | 'tablet' | 'desktop') => {
  const width = screenSize === 'mobile' ? 35 : screenSize === 'tablet' ? 50 : 62;
  const height = screenSize === 'mobile' ? 15 : screenSize === 'tablet' ? 18 : 20;
  const chars = getMatrixRainChars();
  
  let rain = '';
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      rain += chars[Math.floor(Math.random() * chars.length)];
    }
    rain += '\n';
  }
  return rain;
};

export const createMatrixTransition = (screenSize: 'mobile' | 'tablet' | 'desktop', progress: number) => {
  const finalAscii = getWelcomeAscii(screenSize);
  const rain = createMatrixRain(screenSize);
  
  const finalLines = finalAscii.split('\n');
  const rainLines = rain.split('\n');
  
  const result = finalLines.map((line, index) => {
    if (index < progress) {
      return line; // Show final ASCII for completed lines
    } else if (index === progress) {
      // Show partial line based on character progress
      const charProgress = Math.floor((progress - Math.floor(progress)) * line.length);
      return line.slice(0, charProgress) + (rainLines[index] || '').slice(charProgress);
    } else {
      return rainLines[index] || ''; // Show rain for future lines
    }
  });
  
  return result.join('\n');
};

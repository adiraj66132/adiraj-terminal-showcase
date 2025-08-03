
import React, { useState, useEffect, useRef } from 'react';
import { User, Code, Mail, Github, Linkedin, ExternalLink } from 'lucide-react';

interface TerminalLine {
  id: number;
  content: string;
  type: 'input' | 'output' | 'error';
}

const Terminal = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [lineCounter, setLineCounter] = useState(0);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const skills = [
    'React.js', 'Next.js', 'TypeScript', 'JavaScript (ES6+)',
    'HTML5', 'CSS3', 'Tailwind CSS', 'Styled Components',
    'Redux', 'Zustand', 'React Query', 'Git & GitHub',
    'Responsive Design', 'REST APIs', 'GraphQL', 'Webpack',
    'Vite', 'Jest', 'Cypress', 'Figma'
  ];

  const projects = [
    {
      name: 'BTD Union: The Elite Squad',
      tech: 'Vite, TypeScript, Tailwind CSS, React, shadcn/ui',
      description: 'A concept site for Bloons Tower Defense Union, showcasing dynamic UI design and smooth transitions'
    },
    {
      name: 'GTA-6 Demo App',
      tech: 'Vite, TypeScript, Tailwind CSS, React, shadcn/ui',
      description: 'GTA 6 Demo Page – A sleek and interactive concept demo built with modern web technologies'
    },
    {
      name: 'Modern Dashboard',
      tech: 'React, TypeScript, Tailwind',
      description: 'Responsive admin dashboard with real-time data visualization'
    },
    {
      name: 'E-commerce Platform',
      tech: 'Next.js, Redux, Stripe API',
      description: 'Full-featured online store with payment integration'
    },
    {
      name: 'Weather App',
      tech: 'React, OpenWeather API, Chart.js',
      description: 'Real-time weather tracking with interactive charts'
    }
  ];

  const typeText = async (text: string, delay: number = 30) => {
    setIsTyping(true);
    for (let i = 0; i <= text.length; i++) {
      await new Promise(resolve => setTimeout(resolve, delay));
      setLines(prev => {
        const newLines = [...prev];
        if (newLines.length > 0) {
          newLines[newLines.length - 1].content = text.slice(0, i);
        }
        return newLines;
      });
    }
    setIsTyping(false);
  };

  const addLine = (content: string, type: 'input' | 'output' | 'error' = 'output') => {
    const newLine = { id: lineCounter, content, type };
    setLines(prev => [...prev, newLine]);
    setLineCounter(prev => prev + 1);
    return newLine;
  };

  const handleCommand = async (command: string) => {
    addLine(`adiraj@portfolio:~$ ${command}`, 'input');

    switch (command.toLowerCase().trim()) {
      case 'help':
        const helpLine = addLine('', 'output');
        await typeText(`Available commands:
  help      - Show available commands
  about     - About Adiraj Kashyap
  skills    - Frontend development skills
  projects  - Featured projects
  contact   - Contact information
  clear     - Clear terminal
  whoami    - Current user info`);
        break;

      case 'about':
        const aboutLine = addLine('', 'output');
        await typeText(`👋 Hello! I'm Adiraj Kashyap

🚀 Frontend Developer passionate about creating exceptional user experiences
💻 Specializing in modern JavaScript frameworks and responsive design
🎯 Focus on clean code, performance optimization, and user-centric development
📍 Building the future, one component at a time

"Code is poetry written in logic"`);
        break;

      case 'skills':
        const skillsLine = addLine('', 'output');
        await typeText(`🛠️  FRONTEND SKILLS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${skills.map((skill, index) => `  ${index % 2 === 0 ? '▸' : '▹'} ${skill}`).join('\n')}

Proficiency Level: ████████████████████ 95%`);
        break;

      case 'projects':
        const projectsLine = addLine('', 'output');
        await typeText(`📂 FEATURED PROJECTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${projects.map((project, index) => 
  `${index + 1}. ${project.name}
   Tech Stack: ${project.tech}
   Description: ${project.description}
   Status: ✅ Completed\n`
).join('\n')}`);
        break;

      case 'contact':
        const contactLine = addLine('', 'output');
        await typeText(`📧 CONTACT INFORMATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  📧 Email: adiraj.kashyap@example.com
  💼 LinkedIn: linkedin.com/in/adirajkashyap
  🐱 GitHub: github.com/adirajkashyap
  🌐 Portfolio: adirajkashyap.dev

Let's connect and build something amazing together! 🚀`);
        break;

      case 'whoami':
        const whoamiLine = addLine('', 'output');
        await typeText('adiraj_kashyap');
        break;

      case 'clear':
        setLines([]);
        setLineCounter(0);
        break;

      case '':
        break;

      default:
        const errorLine = addLine('', 'error');
        await typeText(`Command not found: ${command}. Type 'help' for available commands.`);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentInput.trim()) {
      handleCommand(currentInput);
      setCurrentInput('');
    }
  };

  useEffect(() => {
    const initTerminal = async () => {
      const welcomeLine = addLine('', 'output');
      await typeText(`
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
╚════════════════════════════════════════════════════════════╝

System initialized... Type 'help' to get started.`, 20);
    };

    initTerminal();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    if (inputRef.current && !isTyping) {
      inputRef.current.focus();
    }
  }, [isTyping]);

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-green font-mono">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-6 mb-8 p-6 bg-black/50 rounded-lg border border-terminal-green/30">
          <div className="relative">
            <img 
              src="/lovable-uploads/b43f1708-232d-4cbe-a4fa-b005fa5cffab.png" 
              alt="Adiraj Kashyap" 
              className="w-24 h-24 rounded-full border-2 border-terminal-green shadow-lg shadow-terminal-green/20"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-terminal-green rounded-full border-2 border-terminal-bg flex items-center justify-center">
              <div className="w-2 h-2 bg-terminal-bg rounded-full animate-pulse"></div>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-terminal-green mb-1">Adiraj Kashyap</h1>
            <p className="text-terminal-blue text-lg mb-2">Frontend Developer</p>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></div>
                <span className="text-terminal-gray">Online</span>
              </span>
              <span className="text-terminal-gray">Ready to code</span>
            </div>
          </div>
        </div>

        {/* Terminal */}
        <div className="bg-black rounded-lg border border-terminal-green/30 shadow-2xl shadow-terminal-green/10 overflow-hidden">
          {/* Terminal Header */}
          <div className="flex items-center gap-2 bg-terminal-gray/20 px-4 py-2 border-b border-terminal-green/30">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-terminal-green rounded-full"></div>
            </div>
            <div className="flex-1 text-center text-terminal-gray text-sm">
              adiraj@portfolio: ~
            </div>
          </div>

          {/* Terminal Content */}
          <div 
            ref={terminalRef}
            className="h-[600px] overflow-y-auto p-4 bg-terminal-bg"
          >
            {lines.map((line) => (
              <div key={line.id} className="mb-2">
                <div className={`whitespace-pre-wrap ${
                  line.type === 'input' ? 'text-terminal-blue' : 
                  line.type === 'error' ? 'text-terminal-red' : 'text-terminal-green'
                }`}>
                  {line.content}
                </div>
              </div>
            ))}
            
            {/* Input Line */}
            <form onSubmit={handleSubmit} className="flex items-center mt-4">
              <span className="text-terminal-blue mr-2">adiraj@portfolio:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                disabled={isTyping}
                className="flex-1 bg-transparent text-terminal-green outline-none caret-terminal-green"
                autoComplete="off"
                spellCheck="false"
              />
              <span className="animate-blink text-terminal-green">█</span>
            </form>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex flex-wrap gap-2 justify-center">
          {['help', 'about', 'skills', 'projects', 'contact'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              disabled={isTyping}
              className="px-3 py-1 text-xs bg-terminal-green/10 border border-terminal-green/30 rounded text-terminal-green hover:bg-terminal-green/20 transition-colors disabled:opacity-50"
            >
              {cmd}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Terminal;

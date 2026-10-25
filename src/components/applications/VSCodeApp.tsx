'use client';

import React, { useState } from 'react';
import {
  ExternalLink,
  RotateCw,
  FolderTree,
  Code2,
  FileCode,
  Search,
  GitBranch,
  Settings,
  Copy,
  Check,
  ChevronRight,
  FileJson,
  FileSpreadsheet,
} from 'lucide-react';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { experiences } from '@/data/experience';
import { useDesktopStore } from '@/stores/useDesktopStore';

type FileTabId = 'about-me.ts' | 'projects.json' | 'skills.tsx' | 'experience.ts' | 'package.json';

const CODE_FILES: Record<
  FileTabId,
  {
    language: string;
    icon: string;
    code: string;
  }
> = {
  'about-me.ts': {
    language: 'TypeScript',
    icon: 'ts',
    code: `import { SoftwareEngineer, Education } from '@raj/types';

export const engineer: SoftwareEngineer = {
  name: "Raj Vishvakarma",
  role: "Software Engineer · AI & Robotics Student",
  location: "Balaghat, Madhya Pradesh, India",
  openForOpportunities: true,

  education: {
    university: "Madhav Institute of Technology and Science (MITS), Gwalior",
    degree: "B.Tech in Artificial Intelligence & Robotics",
    duration: "2023 – 2027",
    cgpa: "7.9 / 10.0",
  },

  passion: [
    "Autonomous Robotics & Embedded Systems",
    "High-Performance Full-Stack Web Development",
    "AI Agent Workflows & Machine Learning",
  ],

  contact: {
    github: "https://github.com/rajvishvakarma",
    email: "rajvishvakarma.dev@gmail.com",
    portfolio: "https://raj-vishvakarma.vercel.app",
  },
};

export default engineer;`,
  },
  'projects.json': {
    language: 'JSON',
    icon: 'json',
    code: JSON.stringify(
      {
        developer: 'Raj Vishvakarma',
        featuredProjects: projects.map((p) => ({
          id: p.id,
          name: p.title,
          summary: p.shortDescription,
          techStack: p.tags,
          github: p.githubUrl,
          demo: p.demoUrl,
        })),
      },
      null,
      2
    ),
  },
  'skills.tsx': {
    language: 'TypeScript React',
    icon: 'tsx',
    code: `import React from 'react';

export const CoreTechStack = () => {
  const skills = {
    languages: ["TypeScript", "JavaScript", "Python", "C++", "SQL", "Bash"],
    frontend: ["Next.js 16 (App Router)", "React 19", "TailwindCSS", "Framer Motion"],
    backend: ["Node.js", "FastAPI", "Express", "REST APIs", "PostgreSQL"],
    roboticsAndAI: ["ROS2", "Computer Vision", "PyTorch", "Gazebo", "SLAM"],
    devopsAndTools: ["Docker", "Git / GitHub", "Vercel", "Linux", "VS Code"],
  };

  return (
    <div className="tech-stack-container">
      <h1>Raj Vishvakarma Technical Expertise</h1>
      <pre>{JSON.stringify(skills, null, 2)}</pre>
    </div>
  );
};`,
  },
  'experience.ts': {
    language: 'TypeScript',
    icon: 'ts',
    code: `export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  location: string;
  achievements: string[];
}

export const careerTimeline: WorkExperience[] = [
  {
    company: "Metheus Lab",
    role: "Software Engineering Intern / Researcher",
    period: "2024 – Present",
    location: "Remote / Hybrid",
    achievements: [
      "Engineered full-stack responsive web tools and real-time visualization dashboards.",
      "Optimized frontend load times and dynamic asset delivery by 40%.",
      "Collaborated on autonomous robotics simulation pipelines.",
    ],
  },
  {
    company: "MITS Gwalior Robotics Club",
    role: "Technical Lead & Developer",
    period: "2023 – Present",
    location: "Gwalior, MP, India",
    achievements: [
      "Designed autonomous navigation controllers with ROS2 & SLAM.",
      "Mentored junior developers in Git workflows and Python development.",
    ],
  },
];`,
  },
  'package.json': {
    language: 'JSON',
    icon: 'json',
    code: `{
  "name": "raj-vishvakarma-portfolio",
  "version": "2.4.0",
  "private": true,
  "author": "Raj Vishvakarma <rajvishvakarma.dev@gmail.com>",
  "description": "Authentic macOS Desktop & Mobile simulation portfolio",
  "dependencies": {
    "next": "16.4.3",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    "framer-motion": "^12.0.0",
    "lucide-react": "^0.469.0",
    "zustand": "^5.0.0"
  }
}`,
  },
};

export const VSCodeApp: React.FC = () => {
  const { theme, isMobile } = useDesktopStore();
  const isDark = theme === 'dark';

  const [activeFile, setActiveFile] = useState<FileTabId>('about-me.ts');
  const [copied, setCopied] = useState(false);
  const [useIframeMode, setUseIframeMode] = useState(!isMobile);
  const [isLoading, setIsLoading] = useState(false);

  const currentFile = CODE_FILES[activeFile];
  const fileList: FileTabId[] = [
    'about-me.ts',
    'projects.json',
    'skills.tsx',
    'experience.ts',
    'package.json',
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReload = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 400);
  };

  // Syntax highlighting helper for code lines
  const renderHighlightedLine = (line: string) => {
    // Basic clean tokenizing for visual appeal
    if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) {
      return <span className="text-[#6a9955]">{line}</span>;
    }
    if (line.includes('export') || line.includes('import') || line.includes('from') || line.includes('const') || line.includes('return') || line.includes('interface')) {
      return (
        <span>
          {line.split(/(export|import|from|const|return|interface|default)/g).map((part, i) => {
            if (['export', 'import', 'from', 'const', 'return', 'interface', 'default'].includes(part)) {
              return <span key={i} className="text-[#c586c0] font-semibold">{part}</span>;
            }
            if (part.includes('"') || part.includes("'")) {
              return <span key={i} className="text-[#ce9178]">{part}</span>;
            }
            return <span key={i} className="text-[#9cdcfe]">{part}</span>;
          })}
        </span>
      );
    }
    if (line.includes('"') || line.includes("'")) {
      return <span className="text-[#ce9178]">{line}</span>;
    }
    if (line.includes(':') && !line.includes('{')) {
      return <span className="text-[#4ec9b0]">{line}</span>;
    }
    return <span className="text-[#d4d4d4]">{line}</span>;
  };

  return (
    <div
      className={`flex h-full w-full flex-col select-none overflow-hidden font-[-apple-system,BlinkMacSystemFont,sans-serif] ${
        isDark ? 'bg-[#1e1e1e] text-white' : 'bg-[#1e1e1e] text-white'
      }`}
    >
      {/* VS Code Top Header Bar */}
      <div className="h-9 border-b border-[#252526] bg-[#323233] flex items-center justify-between px-2 sm:px-3 text-xs shrink-0 text-neutral-300">
        <div className="flex items-center gap-2 min-w-0">
          <Code2 size={16} className="text-[#007acc] shrink-0" />
          <span className="font-medium text-white truncate text-xs">
            VS Code — rajvishvakarma/my-portfolio
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {!isMobile && (
            <button
              onClick={() => setUseIframeMode(!useIframeMode)}
              className="px-2 py-0.5 rounded text-[11px] font-medium bg-white/10 hover:bg-white/15 text-white transition-colors"
            >
              {useIframeMode ? 'Native View' : 'Web Editor'}
            </button>
          )}

          <a
            href="https://github1s.com/rajvishvakarma/my-portfolio"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-[#007acc] hover:bg-[#0088e0] text-white transition-colors"
            title="Open in Full Web Tab"
          >
            <span>Full Tab</span>
            <ExternalLink size={11} />
          </a>
        </div>
      </div>

      {useIframeMode && !isMobile ? (
        /* Desktop Iframe Mode */
        <div className="flex-1 w-full h-full relative bg-[#1e1e1e]">
          <iframe
            src="https://github1s.com/rajvishvakarma/my-portfolio"
            title="Visual Studio Code"
            className="w-full h-full border-none"
            allow="clipboard-read; clipboard-write"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
          />
        </div>
      ) : (
        /* Mobile & Responsive Native Monaco-style Workspace */
        <div className="flex-1 flex flex-col min-h-0 bg-[#1e1e1e] text-[#d4d4d4]">
          {/* File Tabs Strip */}
          <div className="flex items-center bg-[#252526] overflow-x-auto no-scrollbar shrink-0 border-b border-[#1e1e1e]">
            {fileList.map((fileName) => {
              const isActive = activeFile === fileName;
              return (
                <button
                  key={fileName}
                  onClick={() => setActiveFile(fileName)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-xs font-mono border-r border-[#1e1e1e] transition-colors whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-[#1e1e1e] text-white border-t-2 border-t-[#007acc] font-medium'
                      : 'bg-[#2d2d2d] text-neutral-400 hover:bg-[#282828] hover:text-neutral-200'
                  }`}
                >
                  {fileName.endsWith('.ts') || fileName.endsWith('.tsx') ? (
                    <span className="text-[#3178c6] text-[11px] font-bold">TS</span>
                  ) : fileName.endsWith('.json') ? (
                    <span className="text-[#cbcb41] text-[11px] font-bold">{'{}'}</span>
                  ) : (
                    <FileCode size={13} className="text-neutral-400" />
                  )}
                  <span>{fileName}</span>
                </button>
              );
            })}

            {/* Copy button on far right */}
            <div className="ml-auto px-2 flex items-center">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2 py-1 rounded text-[11px] font-mono text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Copy file contents"
              >
                {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Breadcrumbs */}
          <div className="h-6 px-3 bg-[#1e1e1e] flex items-center gap-1.5 text-[11px] text-neutral-500 font-mono border-b border-[#2d2d2d] shrink-0">
            <span>src</span>
            <ChevronRight size={12} />
            <span className="text-neutral-300 font-semibold">{activeFile}</span>
          </div>

          {/* Code Viewer Area with Line Numbers */}
          <div className="flex-1 min-h-0 overflow-auto font-mono text-xs sm:text-[13px] leading-relaxed p-2 sm:p-3 selection:bg-[#264f78] selection:text-white">
            <div className="flex min-w-full w-fit">
              {/* Line Numbers Column */}
              <div className="select-none text-right pr-4 text-neutral-600 font-mono text-xs shrink-0">
                {currentFile.code.split('\n').map((_, index) => (
                  <div key={index} className="h-5 leading-5">
                    {index + 1}
                  </div>
                ))}
              </div>

              {/* Code Content Lines */}
              <div className="flex-1 whitespace-pre select-text font-mono">
                {currentFile.code.split('\n').map((line, index) => (
                  <div key={index} className="h-5 leading-5 pl-1">
                    {renderHighlightedLine(line)}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* VS Code Bottom Status Bar */}
          <div className="h-6 px-3 bg-[#007acc] text-white flex items-center justify-between text-[11px] font-mono shrink-0 select-none">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <GitBranch size={11} />
                <span>main*</span>
              </span>
              <span className="hidden sm:inline">0 errors, 0 warnings</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Ln {currentFile.code.split('\n').length}, Col 1</span>
              <span>Spaces: 2</span>
              <span>UTF-8</span>
              <span className="font-semibold">{currentFile.language}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

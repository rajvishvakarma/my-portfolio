'use client';

import React, { useState, useRef, useEffect } from 'react';
import { appsData } from '@/data/apps';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { experiences, educations } from '@/data/experience';
import { skills } from '@/data/skills';
import { AppId } from '@/types/desktop';
import { useDesktopStore } from '@/stores/useDesktopStore';

interface CommandOutput {
  id: string;
  command: string;
  output: React.ReactNode;
  isError?: boolean;
}

const VIRTUAL_FS: Record<string, string[]> = {
  '~': ['about', 'projects', 'skills', 'experience', 'resume.pdf', 'contact.txt'],
  '~/about': ['bio.txt', 'education.txt', 'interests.txt'],
  '~/projects': ['android-agent.md', 'convoy-telemetry.md', 'ecommerce-engine.md', 'portfolio.md'],
  '~/skills': ['frontend.txt', 'backend.txt', 'mobile.txt', 'tools.txt'],
  '~/experience': ['metheus-lab.txt', 'gravit-infosystems.txt'],
};

const FILE_CONTENTS: Record<string, string> = {
  'resume.pdf': '[Binary PDF file] Type "open resume" or "resume" to view the interactive PDF viewer.',
  'contact.txt': `Email: ${profile.email}\nGitHub: ${profile.github}\nWebsite: ${profile.website}\nLocation: ${profile.location}`,
  'bio.txt': `${profile.name} — ${profile.role}\n${profile.shortBio}`,
  'education.txt': `${educations[0]?.degree} at ${educations[0]?.institution} (${educations[0]?.period})`,
  'interests.txt': profile.interests.join(', '),
  'android-agent.md': 'Autonomous Android task automation agent using accessibility APIs and vision models.',
  'convoy-telemetry.md': 'Real-time geospatial convoy telemetry, route orchestration, and incident broadcasting.',
  'ecommerce-engine.md': 'High-throughput concurrency engine for product monitoring, price alert streams & automation.',
  'portfolio.md': 'Interactive macOS Developer Portfolio built with Next.js 16, TypeScript, and Liquid Glass theme.',
  'frontend.txt': 'React, Next.js, TypeScript, Tailwind CSS, Framer Motion, HTML5/CSS3',
  'backend.txt': 'Node.js, Express, REST APIs, GraphQL, Firebase, PostgreSQL',
  'mobile.txt': 'Flutter, Dart, Kotlin, Android SDK, MVVM, Architecture Components',
  'tools.txt': 'Git, GitHub, Docker, Postman, VS Code, Android Studio, Figma',
  'metheus-lab.txt': 'Metheus Lab — Software Architect & Product Engineer (2025–Present)',
  'gravit-infosystems.txt': 'Gravit InfoSystems — Flutter & Mobile Engineering Intern (2024)',
};

export const TerminalApp: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);
  const [cwd, setCwd] = useState('~');
  const [isMatrixActive, setIsMatrixActive] = useState(false);
  const [entries, setEntries] = useState<CommandOutput[]>([
    {
      id: 'welcome',
      command: '',
      output: (
        <div className="text-[13px] text-neutral-200 mb-1">
          Last login: Fri Oct 23 23:16:45 on ttys007
        </div>
      ),
    },
  ]);

  const { openApp, setTheme, theme } = useDesktopStore();
  const isDark = theme === 'dark';
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [entries]);

  // Matrix digital rain canvas effect
  useEffect(() => {
    if (!isMatrixActive || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = canvas.parentElement?.clientWidth || 700;
    canvas.height = canvas.parentElement?.clientHeight || 400;

    const chars = '0123456789ABCDEFRAJVISHVAKARMAアイウエオカキクケコサシスセソタチツテト';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = Array(columns).fill(1);

    const interval = setInterval(() => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px monospace`;

      drops.forEach((y, x) => {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, x * fontSize, y * fontSize);
        if (y * fontSize > canvas.height && Math.random() > 0.975) {
          drops[x] = 0;
        }
        drops[x]++;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [isMatrixActive]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length === 0) return;
      const nextPtr = historyPointer === -1 ? history.length - 1 : Math.max(0, historyPointer - 1);
      setHistoryPointer(nextPtr);
      setInput(history[nextPtr] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer === -1) return;
      const nextPtr = historyPointer + 1;
      if (nextPtr >= history.length) {
        setHistoryPointer(-1);
        setInput('');
      } else {
        setHistoryPointer(nextPtr);
        setInput(history[nextPtr] || '');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Auto complete file / dir names
      const currentFiles = VIRTUAL_FS[cwd] || [];
      const parts = input.split(' ');
      const last = parts[parts.length - 1];
      const match = currentFiles.find((f) => f.startsWith(last));
      if (match) {
        parts[parts.length - 1] = match;
        setInput(parts.join(' '));
      }
    }
  };

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const raw = input.trim();
    if (!raw) return;

    setHistory((prev) => [...prev, raw]);
    setHistoryPointer(-1);
    setInput('');

    const [cmd, ...args] = raw.split(/\s+/);
    const arg = args.join(' ');
    const lowerCmd = cmd.toLowerCase();

    let outputNode: React.ReactNode = null;
    let isError = false;

    switch (lowerCmd) {
      case 'help':
      case 'commands':
        outputNode = (
          <div className="space-y-1 text-xs">
            <p className="text-yellow-400 font-semibold mb-1">Available Commands:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-neutral-300">
              <div><strong className="text-emerald-400">about / whoami</strong> — Developer summary</div>
              <div><strong className="text-emerald-400">projects</strong> — View featured engineering builds</div>
              <div><strong className="text-emerald-400">skills</strong> — View technical competencies</div>
              <div><strong className="text-emerald-400">experience</strong> — Roles at Metheus Lab & Gravit</div>
              <div><strong className="text-emerald-400">contact</strong> — Email, socials & website</div>
              <div><strong className="text-emerald-400">ls [-la]</strong> — List directory contents</div>
              <div><strong className="text-emerald-400">cd &lt;dir&gt;</strong> — Change directory (~, .., projects)</div>
              <div><strong className="text-emerald-400">cat &lt;file&gt;</strong> — Display file contents</div>
              <div><strong className="text-emerald-400">open &lt;app&gt;</strong> — Launch app (safari, chrome, github)</div>
              <div><strong className="text-emerald-400">theme &lt;light|dark&gt;</strong> — Switch desktop appearance</div>
              <div><strong className="text-emerald-400">matrix</strong> — Digital rain easter egg</div>
              <div><strong className="text-emerald-400">clear</strong> — Clear terminal screen</div>
              <div><strong className="text-emerald-400">date / pwd / echo</strong> — Standard shell utilities</div>
            </div>
          </div>
        );
        break;

      case 'about':
      case 'whoami':
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="font-bold text-white">{profile.name} — {profile.role}</p>
            <p className="text-neutral-300">{profile.shortBio}</p>
            <p className="text-neutral-400">📍 {profile.location} · ✉️ {profile.email}</p>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="space-y-3 text-xs">
            <p className="font-bold text-yellow-400">Featured Engineering Projects:</p>
            {projects.map((p) => (
              <div key={p.id} className="border-l-2 border-emerald-500 pl-3">
                <p className="font-semibold text-white">{p.title} <span className="text-neutral-400 font-normal">({p.tags.join(', ')})</span></p>
                <p className="text-neutral-300 text-[11px]">{p.shortDescription}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="space-y-2 text-xs">
            <p className="font-bold text-yellow-400">Technical Skills & Arsenal:</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {skills.map((s) => (
                <span key={s.name} className="rounded-md bg-white/10 px-2 py-0.5 text-[11px] text-emerald-300">
                  {s.name} ({s.category})
                </span>
              ))}
            </div>
          </div>
        );
        break;

      case 'experience':
        outputNode = (
          <div className="space-y-3 text-xs">
            <p className="font-bold text-yellow-400">Professional Experience:</p>
            {experiences.map((exp, idx) => (
              <div key={idx} className="border-l-2 border-blue-500 pl-3">
                <p className="font-semibold text-white">{exp.role} @ {exp.organization}</p>
                <p className="text-[11px] text-neutral-400">{exp.period} · {exp.location}</p>
                <p className="text-[11px] text-neutral-300 mt-0.5">{exp.description}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="space-y-1 text-xs text-neutral-300">
            <p>Email: <a href={`mailto:${profile.email}`} className="text-blue-400 underline">{profile.email}</a></p>
            <p>GitHub: <a href={profile.github} target="_blank" rel="noreferrer" className="text-blue-400 underline">{profile.github}</a></p>
            <p>Website: <a href={profile.website} target="_blank" rel="noreferrer" className="text-blue-400 underline">{profile.website}</a></p>
          </div>
        );
        break;

      case 'ls': {
        const files = VIRTUAL_FS[cwd] || [];
        outputNode = (
          <div className="flex flex-wrap gap-4 text-xs font-mono">
            {files.map((f) => (
              <span
                key={f}
                className={f.includes('.') ? 'text-neutral-200' : 'text-blue-400 font-bold'}
              >
                {f}{f.includes('.') ? '' : '/'}
              </span>
            ))}
          </div>
        );
        break;
      }

      case 'cd': {
        if (!arg || arg === '~') {
          setCwd('~');
        } else if (arg === '..' || arg === '../') {
          setCwd('~');
        } else {
          const target = cwd === '~' ? `~/${arg.replace(/\/$/, '')}` : arg;
          if (VIRTUAL_FS[target]) {
            setCwd(target);
          } else {
            outputNode = <span className="text-red-400">cd: no such file or directory: {arg}</span>;
            isError = true;
          }
        }
        break;
      }

      case 'cat': {
        if (!arg) {
          outputNode = <span className="text-red-400">cat: missing file operand</span>;
          isError = true;
        } else {
          const content = FILE_CONTENTS[arg];
          if (content) {
            outputNode = <pre className="whitespace-pre-wrap text-xs text-neutral-300 font-mono">{content}</pre>;
          } else {
            outputNode = <span className="text-red-400">cat: {arg}: No such file or directory</span>;
            isError = true;
          }
        }
        break;
      }

      case 'pwd':
        outputNode = <span className="text-neutral-300">{cwd === '~' ? '/Users/rajvishvakarma' : `/Users/rajvishvakarma/${cwd.replace('~/', '')}`}</span>;
        break;

      case 'date':
        outputNode = <span className="text-neutral-300">{new Date().toString()}</span>;
        break;

      case 'uname':
        outputNode = <span className="text-neutral-300">Darwin MacBook-Pro 26.0.0 Darwin Kernel Version 26.0.0 arm64</span>;
        break;

      case 'open': {
        const targetApp = appsData.find((a) => a.id.toLowerCase() === arg.toLowerCase() || a.title.toLowerCase() === arg.toLowerCase());
        if (targetApp) {
          openApp(targetApp.id);
          outputNode = <span className="text-emerald-400">Opened {targetApp.title}</span>;
        } else if (arg === 'resume' || arg === 'resume.pdf') {
          openApp('resume');
          outputNode = <span className="text-emerald-400">Opened Resume</span>;
        } else {
          outputNode = <span className="text-red-400">App not found: {arg}. Try open safari, open chrome, or open projects.</span>;
          isError = true;
        }
        break;
      }

      case 'theme': {
        if (arg === 'light' || arg === 'dark') {
          setTheme(arg);
          outputNode = <span className="text-emerald-400">Theme set to {arg} mode.</span>;
        } else {
          outputNode = <span className="text-yellow-400">Usage: theme light | theme dark</span>;
        }
        break;
      }

      case 'matrix':
      case 'sudo':
        if (raw.includes('rm -rf') || lowerCmd === 'matrix') {
          setIsMatrixActive(true);
          outputNode = <span className="text-emerald-400">Entering Matrix digital stream... (click "Exit Matrix" to return)</span>;
        } else {
          outputNode = <span className="text-red-400">Permission denied.</span>;
        }
        break;

      case 'clear':
        setEntries([]);
        return;

      default:
        outputNode = (
          <span className="text-red-400">
            zsh: command not found: {cmd}. Type <span className="text-yellow-300">help</span> for assistance.
          </span>
        );
        isError = true;
        break;
    }

    setEntries((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        command: raw,
        output: outputNode,
        isError,
      },
    ]);
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className={`relative flex h-full flex-col font-mono text-[13px] leading-relaxed select-text p-4 overflow-y-auto cursor-text ${
        isDark ? 'bg-[#18191c] text-neutral-100' : 'bg-[#ffffff] text-neutral-900'
      }`}
    >
      {/* Matrix Mode Overlay */}
      {isMatrixActive ? (
        <div className="absolute inset-0 z-50 flex flex-col bg-black">
          <canvas ref={canvasRef} className="h-full w-full" />
          <div className="absolute bottom-6 right-6">
            <button
              onClick={() => setIsMatrixActive(false)}
              className="rounded-lg bg-emerald-600 px-4 py-2 font-bold text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
            >
              Exit Matrix
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 space-y-1.5">
          {/* Previous Command Streams */}
          {entries.map((item) => (
            <div key={item.id} className="space-y-1">
              {item.command && (
                <div className="flex items-center gap-1.5">
                  <span className={`font-semibold ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>
                    rajvishvakarma@Rajs-MacBook
                  </span>
                  <span className={`font-semibold ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {cwd} %
                  </span>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-neutral-950 font-semibold'}`}>
                    {item.command}
                  </span>
                </div>
              )}
              {item.output && (
                <div className={isDark ? 'text-neutral-300' : 'text-neutral-700'}>
                  {item.output}
                </div>
              )}
            </div>
          ))}

          {/* Active Inline Command Input */}
          <form
            onSubmit={handleCommand}
            className="flex items-center gap-1.5 mt-1"
          >
            <span className={`font-semibold shrink-0 ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>
              rajvishvakarma@Rajs-MacBook
            </span>
            <span className={`font-semibold shrink-0 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
              {cwd} %
            </span>
            <div className="relative flex-1 flex items-center min-w-[100px]">
              <input
                ref={inputRef}
                type="text"
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Terminal command input"
                className={`w-full bg-transparent outline-none font-mono text-[13px] caret-transparent ${
                  isDark ? 'text-white' : 'text-neutral-950 font-semibold'
                }`}
              />
              {/* Authentic Solid Blinking Block Cursor */}
              <span
                className={`absolute pointer-events-none animate-pulse font-mono text-[13px] ${
                  isDark ? 'text-white/90' : 'text-neutral-900/90'
                }`}
                style={{
                  left: `${input.length * 7.8}px`,
                }}
              >
                █
              </span>
            </div>
          </form>
          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
};

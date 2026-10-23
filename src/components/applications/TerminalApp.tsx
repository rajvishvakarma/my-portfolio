'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useDesktopStore } from '@/stores/useDesktopStore';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { skills } from '@/data/skills';
import { experiences } from '@/data/experience';
import { AppId } from '@/types/desktop';

interface CommandOutput {
  id: string;
  command: string;
  output: React.ReactNode;
}

const KNOWN_COMMANDS = [
  'help',
  'about',
  'whoami',
  'skills',
  'projects',
  'experience',
  'education',
  'contact',
  'github',
  'resume',
  'date',
  'clear',
  'neofetch',
  'theme',
  'open',
  'echo',
  'history',
];

export const TerminalApp: React.FC = () => {
  const { openApp, toggleTheme, setTheme, addNotification } = useDesktopStore();
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandOutput[]>([
    {
      id: 'init-1',
      command: 'neofetch',
      output: (
        <div className="flex flex-col sm:flex-row gap-4 py-2 font-mono text-xs">
          <div className="text-emerald-400 select-none whitespace-pre leading-tight">
{`                    'c.
                 ,xNMM.
               .OMMMMo
               OMMM0,
     .;loddo:' loolloddol;.
   cKMMMMMMMMMMNWMMMMMMMMMM0:
 .KMMMMMMMMMMMMMMMMMMMMMMMWd.
 XMMMMMMMMMMMMMMMMMMMMMMMX.
;MMMMMMMMMMMMMMMMMMMMMMMM:
:MMMMMMMMMMMMMMMMMMMMMMMM:
.MMMMMMMMMMMMMMMMMMMMMMMX.
 kMMMMMMMMMMMMMMMMMMMMMMWd.
 .XMMMMMMMMMMMMMMMMMMMMMMk
  .XMMMMMMMMMMMMMMMMMMMMK.
    kMMMMMMMMMMMMMMMMMMd
     ;KMMMMMMMWXXWMMMM:
       .cooc,.    .,coo.`}
          </div>
          <div className="space-y-1 text-neutral-300">
            <div className="font-bold text-white">raj@macbook-pro</div>
            <div className="text-neutral-500">----------------------</div>
            <div><span className="text-blue-400 font-semibold">OS:</span> macOS Tahoe 26.0 (ARM64)</div>
            <div><span className="text-blue-400 font-semibold">Host:</span> Apple Silicon M3 Max</div>
            <div><span className="text-blue-400 font-semibold">Kernel:</span> Darwin 24.1.0</div>
            <div><span className="text-blue-400 font-semibold">Uptime:</span> 9 days, 4 hours, 12 mins</div>
            <div><span className="text-blue-400 font-semibold">Shell:</span> zsh 5.9 (x86_64-apple-darwin24.0)</div>
            <div><span className="text-blue-400 font-semibold">Terminal:</span> macOS Terminal (Next.js Edition)</div>
            <div><span className="text-blue-400 font-semibold">Role:</span> Software Engineer @ Bengaluru</div>
            <div><span className="text-blue-400 font-semibold">Status:</span> Crafting elegant systems & UI</div>
            <div className="pt-2 flex space-x-1.5">
              <span className="inline-block w-3 h-3 rounded-full bg-red-500" />
              <span className="inline-block w-3 h-3 rounded-full bg-yellow-500" />
              <span className="inline-block w-3 h-3 rounded-full bg-green-500" />
              <span className="inline-block w-3 h-3 rounded-full bg-cyan-500" />
              <span className="inline-block w-3 h-3 rounded-full bg-blue-500" />
              <span className="inline-block w-3 h-3 rounded-full bg-purple-500" />
            </div>
          </div>
        </div>
      ),
    },
  ]);

  const [commandList, setCommandList] = useState<string[]>(['neofetch']);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const executeCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    setCommandList((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    let outputNode: React.ReactNode = null;

    switch (command) {
      case 'help':
        outputNode = (
          <div className="space-y-1 text-xs">
            <div className="text-neutral-400 mb-1">Available Portfolio Terminal Commands:</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 font-mono">
              <div><span className="text-emerald-400 font-bold">about</span> - About Raj Vishvakarma</div>
              <div><span className="text-emerald-400 font-bold">whoami</span> - Current engineer persona</div>
              <div><span className="text-emerald-400 font-bold">projects</span> - View showcased engineering projects</div>
              <div><span className="text-emerald-400 font-bold">skills</span> - List technical competencies</div>
              <div><span className="text-emerald-400 font-bold">experience</span> - Work & career history</div>
              <div><span className="text-emerald-400 font-bold">education</span> - Academic background</div>
              <div><span className="text-emerald-400 font-bold">contact</span> - Display email and social handles</div>
              <div><span className="text-emerald-400 font-bold">github</span> - GitHub profile & repository links</div>
              <div><span className="text-emerald-400 font-bold">resume</span> - Download or view PDF resume</div>
              <div><span className="text-emerald-400 font-bold">neofetch</span> - System specs & ASCII apple</div>
              <div><span className="text-emerald-400 font-bold">open &lt;app&gt;</span> - Launch application window</div>
              <div><span className="text-emerald-400 font-bold">theme &lt;dark|light&gt;</span> - Switch desktop appearance</div>
              <div><span className="text-emerald-400 font-bold">date</span> - Current system date and time</div>
              <div><span className="text-emerald-400 font-bold">clear</span> - Clear terminal buffer</div>
            </div>
            <div className="text-neutral-500 mt-2 text-[11px]">
              Tip: Use [Up] and [Down] arrows for history, and [Tab] for autocomplete.
            </div>
          </div>
        );
        break;

      case 'about':
        outputNode = (
          <div className="space-y-2 text-xs">
            <div className="text-blue-400 font-bold text-sm">{profile.name} — {profile.role}</div>
            <p className="text-neutral-300 leading-relaxed">{profile.shortBio}</p>
            <div className="text-neutral-400">{profile.location} • {profile.email}</div>
          </div>
        );
        break;

      case 'whoami':
        outputNode = <div className="text-xs text-neutral-300">raj — Software Engineer (Bengaluru, India)</div>;
        break;

      case 'skills':
        outputNode = (
          <div className="space-y-2 text-xs">
            <div className="text-neutral-400">Core Engineering Skills:</div>
            <div className="flex flex-wrap gap-1.5">
              {skills.slice(0, 16).map((s) => (
                <span key={s.name} className="px-2 py-0.5 rounded bg-white/10 text-neutral-200">
                  {s.name} ({s.proficiency})
                </span>
              ))}
            </div>
            <div className="text-neutral-500 text-[11px]">Type &apos;open skills&apos; to view all 50+ categorised technologies.</div>
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="space-y-2 text-xs">
            <div className="text-neutral-400">Featured Projects:</div>
            {projects.slice(0, 4).map((p, i) => (
              <div key={p.id} className="text-neutral-300">
                <span className="text-emerald-400 font-semibold">{i + 1}. {p.title}</span> — {p.shortDescription}
                <div className="text-neutral-500 text-[11px]">Stack: {p.tags.join(', ')}</div>
              </div>
            ))}
            <div className="text-neutral-500 text-[11px] pt-1">Type &apos;open projects&apos; to explore the visual gallery.</div>
          </div>
        );
        break;

      case 'experience':
        outputNode = (
          <div className="space-y-2 text-xs">
            <div className="text-neutral-400">Work Experience:</div>
            {experiences.map((e) => (
              <div key={e.id} className="text-neutral-300">
                <span className="text-blue-400 font-bold">{e.role}</span> @ {e.organization} ({e.period})
                <div className="text-neutral-400 text-[11px]">{e.description}</div>
              </div>
            ))}
          </div>
        );
        break;

      case 'education':
        outputNode = (
          <div className="text-xs text-neutral-300">
            <div className="font-bold text-purple-400">Bachelor of Technology (B.Tech) - Computer Science & Engineering</div>
            <div className="text-neutral-400">Visvesvaraya Technological University (VTU), Bengaluru • 2018 - 2022</div>
            <div className="text-emerald-400 text-[11px]">First Class with Distinction (CGPA: 8.8 / 10)</div>
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="space-y-1 text-xs text-neutral-300">
            <div><span className="text-neutral-400">Email:</span> {profile.email}</div>
            <div><span className="text-neutral-400">GitHub:</span> {profile.github}</div>
            <div><span className="text-neutral-400">LinkedIn:</span> {profile.linkedin}</div>
            <div><span className="text-neutral-400">Location:</span> {profile.location}</div>
          </div>
        );
        break;

      case 'github':
        outputNode = (
          <div className="text-xs text-neutral-300 space-y-1">
            <div>GitHub: <a href={profile.github} target="_blank" rel="noreferrer" className="text-blue-400 underline">{profile.github}</a></div>
            <div className="text-neutral-400">Type &apos;open github&apos; to inspect repositories directly in window.</div>
          </div>
        );
        break;

      case 'resume':
        openApp('resume');
        outputNode = (
          <div className="text-xs text-neutral-300">
            Opening Resume Viewer...
          </div>
        );
        break;

      case 'date':
        outputNode = <div className="text-xs text-neutral-300">{new Date().toString()}</div>;
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'neofetch':
        outputNode = (
          <div className="flex flex-col sm:flex-row gap-4 py-2 font-mono text-xs">
            <div className="text-emerald-400 select-none whitespace-pre leading-tight">
{`                    'c.
                 ,xNMM.
               .OMMMMo
               OMMM0,
     .;loddo:' loolloddol;.
   cKMMMMMMMMMMNWMMMMMMMMMM0:
 .KMMMMMMMMMMMMMMMMMMMMMMMWd.
 XMMMMMMMMMMMMMMMMMMMMMMMX.
;MMMMMMMMMMMMMMMMMMMMMMMM:
:MMMMMMMMMMMMMMMMMMMMMMMM:
.MMMMMMMMMMMMMMMMMMMMMMMX.
 kMMMMMMMMMMMMMMMMMMMMMMWd.
 .XMMMMMMMMMMMMMMMMMMMMMMk
  .XMMMMMMMMMMMMMMMMMMMMK.
    kMMMMMMMMMMMMMMMMMMd
     ;KMMMMMMMWXXWMMMM:
       .cooc,.    .,coo.`}
            </div>
            <div className="space-y-1 text-neutral-300">
              <div className="font-bold text-white">raj@macbook-pro</div>
              <div className="text-neutral-500">----------------------</div>
              <div><span className="text-blue-400 font-semibold">OS:</span> macOS Tahoe 26.0 (ARM64)</div>
              <div><span className="text-blue-400 font-semibold">Host:</span> Apple Silicon M3 Max</div>
              <div><span className="text-blue-400 font-semibold">Kernel:</span> Darwin 24.1.0</div>
              <div><span className="text-blue-400 font-semibold">Shell:</span> zsh 5.9</div>
              <div><span className="text-blue-400 font-semibold">Role:</span> Software Engineer @ Bengaluru</div>
            </div>
          </div>
        );
        break;

      case 'open':
        const targetApp = args[0]?.toLowerCase() as AppId;
        const validApps: AppId[] = [
          'finder',
          'about',
          'projects',
          'skills',
          'experience',
          'resume',
          'contact',
          'terminal',
          'github',
          'trash',
          'settings',
        ];

        if (targetApp && validApps.includes(targetApp)) {
          openApp(targetApp);
          outputNode = <div className="text-xs text-emerald-400">Launched application: {targetApp}</div>;
        } else {
          outputNode = (
            <div className="text-xs text-red-400">
              Application &apos;{args[0]}&apos; not recognized. Valid options: {validApps.join(', ')}
            </div>
          );
        }
        break;

      case 'theme':
        const targetTheme = args[0]?.toLowerCase();
        if (targetTheme === 'light' || targetTheme === 'dark') {
          setTheme(targetTheme);
          outputNode = <div className="text-xs text-emerald-400">Desktop appearance set to {targetTheme}.</div>;
        } else {
          toggleTheme();
          outputNode = <div className="text-xs text-emerald-400">Toggled desktop theme.</div>;
        }
        break;

      case 'echo':
        outputNode = <div className="text-xs text-neutral-300">{args.join(' ')}</div>;
        break;

      case 'history':
        outputNode = (
          <div className="space-y-0.5 text-xs text-neutral-400 font-mono">
            {commandList.map((c, i) => (
              <div key={i}>{i + 1}  {c}</div>
            ))}
          </div>
        );
        break;

      default:
        outputNode = (
          <div className="text-xs text-red-400">
            zsh: command not found: {command}. Type <span className="text-white underline font-semibold">help</span> for available commands.
          </div>
        );
    }

    setHistory((prev) => [
      ...prev,
      {
        id: 'cmd-' + Date.now(),
        command: trimmed,
        output: outputNode,
      },
    ]);

    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandList.length === 0) return;
      const nextIndex = historyIndex === -1 ? commandList.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInputVal(commandList[nextIndex] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex === -1) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= commandList.length) {
        setHistoryIndex(-1);
        setInputVal('');
      } else {
        setHistoryIndex(nextIndex);
        setInputVal(commandList[nextIndex] || '');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const current = inputVal.trim().toLowerCase();
      if (!current) return;
      const match = KNOWN_COMMANDS.find((cmd) => cmd.startsWith(current));
      if (match) {
        setInputVal(match);
      }
    }
  };

  return (
    <div
      onClick={() => inputRef.current?.focus()}
      className="flex flex-col h-full bg-[#18181b]/95 text-neutral-200 font-mono text-xs select-text overflow-hidden p-4 cursor-text"
    >
      <div className="flex-1 overflow-y-auto space-y-3">
        <div className="text-neutral-500 text-[11px] select-none">
          Last login: Sat Oct 24 on ttys001
          <br />Type &apos;<span className="text-emerald-400">help</span>&apos; to view all portfolio CLI commands.
        </div>

        {history.map((item) => (
          <div key={item.id} className="space-y-1.5">
            <div className="flex items-center space-x-2 text-neutral-400">
              <span className="text-emerald-400 font-bold">raj@macbook-pro</span>
              <span className="text-blue-400 font-semibold">~</span>
              <span className="text-neutral-500">%</span>
              <span className="text-white font-medium">{item.command}</span>
            </div>
            <div className="pl-2">{item.output}</div>
          </div>
        ))}

        {/* Active prompt */}
        <div className="flex items-center space-x-2 pt-1">
          <span className="text-emerald-400 font-bold shrink-0">raj@macbook-pro</span>
          <span className="text-blue-400 font-semibold shrink-0">~</span>
          <span className="text-neutral-500 shrink-0">%</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none outline-none text-white font-mono text-xs p-0 focus:ring-0"
            autoFocus
            spellCheck={false}
          />
        </div>

        <div ref={bottomRef} />
      </div>
    </div>
  );
};

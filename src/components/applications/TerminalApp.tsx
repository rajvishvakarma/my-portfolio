'use client';

import React, { useState } from 'react';
import { appsData } from '@/data/apps';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { experiences, educations } from '@/data/experience';
import { skills } from '@/data/skills';
import { AppId } from '@/types/desktop';
import { useDesktopStore } from '@/stores/useDesktopStore';

type Entry = { command: string; output: string };
export const TerminalApp: React.FC = () => {
  const [input, setInput] = useState('');
  const [entries, setEntries] = useState<Entry[]>([{ command: 'help', output: 'Commands: help, about, projects, experience, education, skills, contact, date, open <app>, theme <light|dark>, clear' }]);
  const { openApp, setTheme } = useDesktopStore();
  const execute = (event: React.FormEvent) => {
    event.preventDefault(); const raw = input.trim(); if (!raw) return; setInput(''); const [command, arg] = raw.toLowerCase().split(/\s+/); let output = '';
    switch (command) {
      case 'help': output = 'Commands: help, about, projects, experience, education, skills, contact, date, open <app>, theme <light|dark>, clear'; break;
      case 'about': output = `${profile.name} — ${profile.role}\n${profile.shortBio}`; break;
      case 'whoami': output = `${profile.name} · ${profile.location}`; break;
      case 'projects': output = projects.map((project) => `${project.title}: ${project.shortDescription}`).join('\n'); break;
      case 'experience': output = experiences.map((item) => `${item.role} · ${item.organization} · ${item.period}`).join('\n'); break;
      case 'education': output = educations.map((item) => `${item.degree} · ${item.institution} · ${item.period}`).join('\n'); break;
      case 'skills': output = skills.map((item) => item.name).join(' · '); break;
      case 'contact': output = `${profile.email}\n${profile.github}`; break;
      case 'github': output = profile.github; break;
      case 'resume': openApp('resume'); output = 'Opened Resume'; break;
      case 'date': output = new Date().toLocaleString(); break;
      case 'theme': if (arg === 'light' || arg === 'dark') { setTheme(arg); output = `Theme: ${arg}`; } else output = 'Usage: theme light|dark'; break;
      case 'open': if (appsData.some((app) => app.id === arg)) { openApp(arg as AppId); output = `Opened ${arg}`; } else output = 'App not found. Try open projects or open spotify.'; break;
      case 'clear': setEntries([]); return;
      default: output = `Unknown command: ${command}. Type help.`;
    }
    setEntries((current) => [...current, { command: raw, output }]);
  };
  return <div className="flex h-full flex-col bg-[#15181d] p-5 font-mono text-xs text-neutral-200"><div className="min-h-0 flex-1 space-y-4 overflow-y-auto">{entries.map((entry, index) => <div key={index}><p><span className="text-emerald-400">raj@portfolio ~ %</span> {entry.command}</p><pre className="mt-1 whitespace-pre-wrap font-mono leading-5 text-neutral-300">{entry.output}</pre></div>)}</div><form onSubmit={execute} className="flex border-t border-white/10 pt-3"><span className="whitespace-nowrap text-emerald-400">raj@portfolio ~ %&nbsp;</span><input autoFocus value={input} onChange={(event) => setInput(event.target.value)} aria-label="Terminal command" className="min-w-0 flex-1 bg-transparent outline-none"/></form></div>;
};

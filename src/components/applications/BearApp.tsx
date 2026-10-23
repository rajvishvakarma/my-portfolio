'use client';

import React, { useState } from 'react';
import {
  PawPrint,
  GitBranch,
  ShieldCheck,
  Globe,
  CreditCard,
  CloudOff,
  SlidersHorizontal,
  ExternalLink,
  Code2,
  Bookmark,
} from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from '@/components/shared/Icons';

interface NoteItem {
  id: string;
  title: string;
  excerpt: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

export const BearApp: React.FC = () => {
  const [curSidebar, setCurSidebar] = useState<'profile' | 'projects'>('profile');
  const [curNoteId, setCurNoteId] = useState<string>('about-me');

  const profileNotes: NoteItem[] = [
    {
      id: 'about-me',
      title: 'About Me',
      excerpt: "Hey there! I'm the one who is building his own universe...",
      icon: <ShieldCheck size={16} className="text-neutral-500" />,
      content: (
        <div className="markdown text-neutral-800 dark:text-neutral-200">
          <h1>About Me</h1>
          <h2>Introduction</h2>
          <p>Hey there! 👋</p>
          <p>
            I&apos;m a B.Tech student at the{' '}
            <span className="text-red-500 font-medium">Computer Science and Engineering</span>{' '}
            department of <span className="text-red-500 font-medium">MBM University</span>.
          </p>
          <p>
            🚀 Passionate about Open Source, I&apos;ve contributed to various organizations, helping
            build and improve projects that benefit the community. Coding for Open Source is not
            just a hobby for me — <em>it&apos;s a way of life!</em>
          </p>
          <p>
            💻 With experience as a full stack developer, I&apos;m constantly evolving and
            embracing new technologies.
          </p>
          <p>
            🌱 Currently diving deep into Next.js, TypeScript, and WebSockets, while also working on
            building high-performance interactive web tools.
          </p>
          <p>🤝 Always excited to collaborate on impactful Open Source projects.</p>
          <p>Let&apos;s build something amazing together! 🌟</p>

          <h2>Contact</h2>
          <p>Contact me by:</p>
          <ul className="space-y-1.5 mt-3">
            <li>
              Email:{' '}
              <a href="mailto:rajvishvakarma.dev@gmail.com">rajvishvakarma.dev@gmail.com</a>
            </li>
            <li>
              Github:{' '}
              <a href="https://github.com/rajvishvakarma" target="_blank" rel="noreferrer">
                @rajvishvakarma
              </a>
            </li>
            <li>
              Linkedin:{' '}
              <a href="https://linkedin.com/in/rajvishvakarma" target="_blank" rel="noreferrer">
                rajvishvakarma
              </a>
            </li>
            <li>
              Personal Website:{' '}
              <a href="https://rajvishvakarma.dev" target="_blank" rel="noreferrer">
                rajvishvakarma.dev
              </a>
            </li>
          </ul>

          <h2>Resume</h2>
          <p>
            Download:{' '}
            <a href="/resume.pdf" download="Raj_Vishvakarma_Resume.pdf">
              English (PDF)
            </a>
          </p>
        </div>
      ),
    },
    {
      id: 'github-stats',
      title: 'Github Stats',
      excerpt: 'Here are some status about my github account...',
      icon: <GitHubIcon size={15} className="text-neutral-500" />,
      content: (
        <div className="markdown text-neutral-800 dark:text-neutral-200">
          <h1>GitHub Stats</h1>
          <h2>Engineering Activity</h2>
          <p>
            Actively building open-source developer tooling, system simulations, and scalable web
            architectures.
          </p>
          <ul className="space-y-2 mt-4">
            <li><strong>Total Commits:</strong> 650+ across production & open-source repositories</li>
            <li><strong>Primary Languages:</strong> TypeScript, Kotlin, Python, Go, SQL</li>
            <li><strong>Open Source Contributions:</strong> GirlScript Summer of Code (GSSoC), Developer Communities</li>
            <li><strong>Repositories:</strong> 25+ public repositories</li>
          </ul>
        </div>
      ),
    },
    {
      id: 'about-site',
      title: 'About This Site',
      excerpt: 'Something about this personal portfolio site...',
      icon: <Globe size={15} className="text-neutral-500" />,
      content: (
        <div className="markdown text-neutral-800 dark:text-neutral-200">
          <h1>About This Site</h1>
          <h2>macOS Tahoe Experience</h2>
          <p>
            This portfolio is built to recreate the tactile feel of macOS with liquid glass shaders,
            multi-window management, interactive traffic lights, dock magnification, and native app sandboxes.
          </p>
          <h2>Tech Stack</h2>
          <ul className="space-y-1.5 mt-3">
            <li><strong>Framework:</strong> Next.js 16 (App Router) & React 19</li>
            <li><strong>State Management:</strong> Zustand</li>
            <li><strong>Styling:</strong> Tailwind CSS & Liquid Glass (pdfx theme)</li>
            <li><strong>Animations:</strong> Framer Motion springs</li>
          </ul>
        </div>
      ),
    },
  ];

  const projectNotes: NoteItem[] = [
    {
      id: 'paytm-web',
      title: 'PaytmWeb',
      excerpt: 'A demonstration Project For Paytm transactions...',
      icon: <CreditCard size={15} className="text-neutral-500" />,
      content: (
        <div className="markdown text-neutral-800 dark:text-neutral-200">
          <h1>PaytmWeb</h1>
          <h2>Fintech Payment Simulator</h2>
          <p>
            A high-throughput payment transaction gateway demonstration simulating peer-to-peer money transfers,
            webhook callbacks, and encrypted ledger persistence.
          </p>
          <p>
            <a href="https://github.com/rajvishvakarma/macos-portfolio" target="_blank" rel="noreferrer">
              View on GitHub →
            </a>
          </p>
        </div>
      ),
    },
    {
      id: 'portfolio-macos',
      title: 'Portfolio macOS',
      excerpt: "My portfolio website simulating macOS's GUI...",
      icon: <Globe size={15} className="text-neutral-500" />,
      content: (
        <div className="markdown text-neutral-800 dark:text-neutral-200">
          <h1>Portfolio macOS</h1>
          <h2>Interactive Web Operating System</h2>
          <p>
            Comprehensive simulation of Apple&apos;s macOS desktop environment directly in the browser with
            liquid glass surfaces, terminal emulator, and responsive mobile adaptation.
          </p>
        </div>
      ),
    },
    {
      id: 'medium-2',
      title: 'Medium 2.0',
      excerpt: 'A medium modified version with serverless backend...',
      icon: <Code2 size={15} className="text-neutral-500" />,
      content: (
        <div className="markdown text-neutral-800 dark:text-neutral-200">
          <h1>Medium 2.0</h1>
          <h2>Serverless Publishing Platform</h2>
          <p>
            Full-stack publishing application engineered on Cloudflare Workers, Hono, Prisma, and PostgreSQL.
          </p>
        </div>
      ),
    },
  ];

  const currentNotes = curSidebar === 'profile' ? profileNotes : projectNotes;
  const activeNote = currentNotes.find((n) => n.id === curNoteId) || currentNotes[0];

  return (
    <div className="bear flex h-full w-full select-text overflow-hidden font-avenir">
      {/* Column 1: Leftmost Sidebar (Translucent Blue/Teal) */}
      <div className="w-40 sm:w-44 bg-[#759bb8]/70 dark:bg-[#1a2d3d]/70 backdrop-blur-2xl flex flex-col justify-between shrink-0 border-r border-black/10 dark:border-white/10 select-none">
        <div>
          {/* Top Icons */}
          <div className="h-10 px-4 flex items-center justify-end space-x-3 text-white/80">
            <button className="hover:text-white transition-colors" title="Sync Status">
              <CloudOff size={16} />
            </button>
            <button className="hover:text-white transition-colors" title="Settings">
              <SlidersHorizontal size={15} />
            </button>
          </div>

          {/* Navigation Items */}
          <div className="px-2 space-y-1">
            <button
              onClick={() => {
                setCurSidebar('profile');
                setCurNoteId('about-me');
              }}
              className={`w-full flex items-center space-x-2.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                curSidebar === 'profile'
                  ? 'bg-[#e53935] text-white shadow-xs'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <PawPrint size={15} />
              <span>Profile</span>
            </button>

            <button
              onClick={() => {
                setCurSidebar('projects');
                setCurNoteId('paytm-web');
              }}
              className={`w-full flex items-center space-x-2.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                curSidebar === 'projects'
                  ? 'bg-[#e53935] text-white shadow-xs'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              <GitBranch size={15} />
              <span>Projects</span>
            </button>
          </div>
        </div>
      </div>

      {/* Column 2: Middle List of Notes */}
      <div className="w-56 sm:w-64 bg-[#e6ebf0]/95 dark:bg-[#1f2329]/95 border-r border-black/10 dark:border-white/10 overflow-y-auto shrink-0 select-none">
        <div className="divide-y divide-black/5 dark:divide-white/5">
          {currentNotes.map((note) => {
            const isSelected = activeNote.id === note.id;
            return (
              <div
                key={note.id}
                onClick={() => setCurNoteId(note.id)}
                className={`p-3.5 cursor-pointer transition-colors border-l-2 ${
                  isSelected
                    ? 'border-[#e53935] bg-white dark:bg-[#181a1f] shadow-xs'
                    : 'border-transparent hover:bg-white/60 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  <span className="shrink-0">{note.icon}</span>
                  <span className="font-bold text-xs text-neutral-900 dark:text-white truncate">
                    {note.title}
                  </span>
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-2 pl-6 leading-relaxed">
                  {note.excerpt}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Column 3: Right Reading Pane */}
      <div className="flex-1 overflow-y-auto bg-[#fafafa] dark:bg-[#16181d] px-6 sm:px-12 py-8">
        <div className="max-w-2xl mx-auto">{activeNote.content}</div>
      </div>
    </div>
  );
};

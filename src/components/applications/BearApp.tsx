'use client';

import React, { useState } from 'react';
import {
  Shield,
  Layout,
  BookOpen,
  Sliders,
  EyeOff,
  GitBranch,
  ExternalLink,
  ChevronLeft,
} from 'lucide-react';
import { FaPaw, FaGithub } from 'react-icons/fa';
import { projects } from '@/data/projects';
import { experiences } from '@/data/experience';

export const BearApp: React.FC = () => {
  const [selectedTag, setSelectedTag] = useState<'profile' | 'projects'>('profile');
  const [selectedNote, setSelectedNote] = useState<string>('about-me');
  const [mobileScreen, setMobileScreen] = useState<'notes' | 'document'>('notes');

  const profileNotes = [
    {
      id: 'about-me',
      title: 'About Me',
      snippet: "Hey there! I'm the one who is building his own universe...",
      icon: Shield,
    },
    {
      id: 'github-stats',
      title: 'Github Stats',
      snippet: 'Here are some status about my github account...',
      icon: FaGithub,
    },
    {
      id: 'about-this-site',
      title: 'About This Site',
      snippet: 'Something about this personal portfolio site...',
      icon: Layout,
    },
  ];

  const projectNotes = projects.map((p) => ({
    id: p.id,
    title: p.title,
    snippet: p.shortDescription,
    icon: BookOpen,
  }));

  const activeNotesList = selectedTag === 'profile' ? profileNotes : projectNotes;

  return (
    <div className="flex flex-col md:flex-row h-full w-full bg-[#f4f5f7] text-neutral-900 select-none overflow-hidden font-[-apple-system,BlinkMacSystemFont,sans-serif]">
      {/* Column 1: Left Slate/Blue Tag Sidebar (Desktop) */}
      <div className="hidden md:flex w-44 bg-[#5b8da8] dark:bg-[#3c637a] flex-col justify-between p-2.5 shrink-0 text-white">
        <div>
          {/* Header Action Icons */}
          <div className="flex items-center justify-end gap-2 px-1 py-1 mb-3 text-white/85">
            <button
              className="p-1 hover:text-white transition-colors rounded hover:bg-white/10"
              title="Toggle View"
            >
              <EyeOff size={15} />
            </button>
            <button
              className="p-1 hover:text-white transition-colors rounded hover:bg-white/10"
              title="Settings"
            >
              <Sliders size={15} />
            </button>
          </div>

          {/* Tags Navigation */}
          <nav className="space-y-1">
            <button
              onClick={() => {
                setSelectedTag('profile');
                setSelectedNote('about-me');
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold transition-all ${
                selectedTag === 'profile'
                  ? 'bg-[#d85842] text-white shadow-xs rounded-l-lg -mr-2.5 pr-4'
                  : 'text-white/85 hover:bg-white/10 hover:text-white rounded-lg'
              }`}
            >
              <FaPaw size={13} className="shrink-0" />
              <span>Profile</span>
            </button>

            <button
              onClick={() => {
                setSelectedTag('projects');
                setSelectedNote(projects[0]?.id || '');
              }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold transition-all ${
                selectedTag === 'projects'
                  ? 'bg-[#d85842] text-white shadow-xs rounded-l-lg -mr-2.5 pr-4'
                  : 'text-white/85 hover:bg-white/10 hover:text-white rounded-lg'
              }`}
            >
              <GitBranch size={14} className="shrink-0" />
              <span>Projects</span>
            </button>
          </nav>
        </div>

        {/* Bottom Tag Count */}
        <div className="px-2 py-2 text-[11px] text-white/60 border-t border-white/10">
          2 tags · {profileNotes.length + projectNotes.length} notes
        </div>
      </div>

      {/* Column 2: Notes List (On mobile visible when mobileScreen === 'notes') */}
      <div
        className={`${
          mobileScreen === 'notes' ? 'flex flex-col w-full' : 'hidden md:flex'
        } md:w-64 bg-[#eaedf1] dark:bg-[#1a1c22] border-r border-black/10 dark:border-white/10 shrink-0 overflow-y-auto`}
      >
        {/* Mobile Tag Switcher Header */}
        <div className="flex md:hidden items-center justify-between p-2.5 bg-[#5b8da8] dark:bg-[#3c637a] text-white shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSelectedTag('profile');
                setSelectedNote('about-me');
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                selectedTag === 'profile' ? 'bg-[#d85842] text-white shadow-xs' : 'bg-white/15 text-white/90'
              }`}
            >
              <FaPaw size={11} />
              <span>Profile</span>
            </button>
            <button
              onClick={() => {
                setSelectedTag('projects');
                setSelectedNote(projects[0]?.id || '');
              }}
              className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                selectedTag === 'projects' ? 'bg-[#d85842] text-white shadow-xs' : 'bg-white/15 text-white/90'
              }`}
            >
              <GitBranch size={11} />
              <span>Projects</span>
            </button>
          </div>
          <span className="text-[11px] text-white/75">{activeNotesList.length} notes</span>
        </div>

        <div className="divide-y divide-black/5 dark:divide-white/5 flex-1 overflow-y-auto">
          {activeNotesList.map((note) => {
            const Icon = note.icon;
            const isSelected = selectedNote === note.id;
            return (
              <div
                key={note.id}
                onClick={() => {
                  setSelectedNote(note.id);
                  setMobileScreen('document');
                }}
                className={`p-3.5 cursor-pointer transition-all border-l-4 ${
                  isSelected
                    ? 'bg-white dark:bg-[#252830] border-[#d85842] shadow-2xs'
                    : 'border-transparent hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon size={14} className="text-neutral-600 dark:text-neutral-400 shrink-0" />
                  <h3 className="text-xs font-bold text-neutral-900 dark:text-white truncate">
                    {note.title}
                  </h3>
                </div>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-2 leading-relaxed">
                  {note.snippet}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Column 3: Markdown Document Reader (On mobile visible when mobileScreen === 'document') */}
      <div
        className={`${
          mobileScreen === 'document' ? 'block' : 'hidden md:block'
        } flex-1 bg-white dark:bg-[#15161a] text-neutral-900 dark:text-neutral-100 overflow-y-auto p-6 md:p-10`}
      >
        {/* Mobile Back Button to return to notes list */}
        <button
          onClick={() => setMobileScreen('notes')}
          className="md:hidden flex items-center gap-1.5 text-[#d85842] font-semibold text-xs mb-5 py-1.5 px-3 rounded-lg bg-black/5 dark:bg-white/10 active:opacity-75 w-fit"
        >
          <ChevronLeft size={16} />
          <span>Back to Notes</span>
        </button>

        {selectedNote === 'about-me' ? (
          <div className="max-w-3xl space-y-6">
            {/* Main Title - No H1 badge */}
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              About Me
            </h1>

            {/* Profile Hero Card with Photo on Left */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-[#f8f9fb] dark:bg-white/5 border border-black/5 dark:border-white/10 shadow-xs">
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white dark:border-white/20 shadow-md shrink-0">
                <img
                  src="/img/raj.jpg?v=5"
                  alt="Raj Vishvakarma"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg md:text-xl font-bold text-neutral-900 dark:text-white">
                    Raj Vishvakarma
                  </h2>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">
                    Open for SDE Roles
                  </span>
                </div>
                <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-0.5">
                  Software Engineer · AI & Robotics Undergraduate
                </p>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1.5 text-xs text-neutral-500 dark:text-neutral-400">
                  <span>📍 Balaghat, MP, India</span>
                  <span>🎓 MITS Gwalior (2023–2027)</span>
                  <span>⭐ GPA: 7.9/10</span>
                </div>
              </div>
            </div>

            {/* Introduction - No H2 badge */}
            <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 pt-2">
              Introduction
            </h2>

            <p className="text-base text-neutral-800 dark:text-neutral-200">
              Hey there! 👋
            </p>

            <p className="text-sm md:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
              I&apos;m an Information Technology undergraduate student in the{' '}
              <span className="text-[#d85842] font-semibold">
                Artificial Intelligence & Robotics
              </span>{' '}
              department of{' '}
              <span className="text-[#d85842] font-semibold">
                Madhav Institute of Technology and Science (MITS), Gwalior
              </span>.
            </p>

            <p className="text-sm md:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
              🚀 Passionate about Open Source and resilient systems, I&apos;ve founded Metheus Lab, engineered production Flutter & AI applications, and built scalable full-stack software that benefits the community. Coding for Open Source is not just a hobby for me —{' '}
              <em className="italic font-medium text-neutral-900 dark:text-white">
                it&apos;s a way of life!
              </em>
            </p>

            {/* Quick Facts Grid */}
            <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-[#f8f9fb] dark:bg-white/5 space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 block">
                Quick Facts
              </span>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-white dark:bg-white/5 border border-black/5 dark:border-white/5">
                  <div className="text-neutral-400 text-[10px] uppercase font-bold">Institution</div>
                  <div className="font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5">MITS Gwalior</div>
                </div>
                <div className="p-2.5 rounded-lg bg-white dark:bg-white/5 border border-black/5 dark:border-white/5">
                  <div className="text-neutral-400 text-[10px] uppercase font-bold">Degree & GPA</div>
                  <div className="font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5">B.Tech IT · 7.9/10</div>
                </div>
                <div className="p-2.5 rounded-lg bg-white dark:bg-white/5 border border-black/5 dark:border-white/5">
                  <div className="text-neutral-400 text-[10px] uppercase font-bold">Specialization</div>
                  <div className="font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5">AI & Robotics</div>
                </div>
                <div className="p-2.5 rounded-lg bg-white dark:bg-white/5 border border-black/5 dark:border-white/5">
                  <div className="text-neutral-400 text-[10px] uppercase font-bold">DSA Solved</div>
                  <div className="font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5">120+ Problems</div>
                </div>
              </div>
            </div>

            {/* Core Tech Stack */}
            <div className="space-y-2.5 pt-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Core Technologies & Languages
              </h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {['Kotlin', 'Flutter', 'Dart', 'TypeScript', 'Next.js', 'React Native', 'Node.js', 'Python', 'C++', 'Java', 'Firebase', 'Supabase', 'PostgreSQL', 'PostGIS', 'Jetpack Compose', 'MVVM'].map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-lg bg-neutral-100 dark:bg-white/10 text-neutral-800 dark:text-neutral-200 font-medium border border-black/5 dark:border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Experience Section */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
                Experience
              </h3>
              <div className="space-y-3">
                {experiences.map((exp) => (
                  <div
                    key={exp.id}
                    className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-[#f8f9fb] dark:bg-white/5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-1">
                      <span className="font-bold text-sm text-neutral-900 dark:text-white">
                        {exp.role}
                      </span>
                      <span className="text-xs font-mono text-neutral-400">{exp.period}</span>
                    </div>
                    <div className="text-xs text-[#d85842] dark:text-[#ff7864] font-medium mt-0.5">
                      {exp.organization} · {exp.location}
                    </div>
                    <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-2 leading-relaxed">
                      {exp.description}
                    </p>
                    <ul className="mt-2 list-disc pl-4 text-xs text-neutral-600 dark:text-neutral-400 space-y-1">
                      {exp.achievements.map((ach, i) => (
                        <li key={i}>{ach}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : selectedNote === 'github-stats' ? (
          <div className="max-w-2xl space-y-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              Github Stats
            </h1>
            <p className="text-sm text-neutral-600 dark:text-neutral-300">
              Active open source contributions and repositories:
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-[#f8f9fb] dark:bg-white/5">
                <span className="text-xs text-neutral-500">Total Public Repositories</span>
                <p className="text-2xl font-bold mt-1 text-neutral-900 dark:text-white">18</p>
              </div>
              <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-[#f8f9fb] dark:bg-white/5">
                <span className="text-xs text-neutral-500">Annual Contributions</span>
                <p className="text-2xl font-bold mt-1 text-neutral-900 dark:text-white">480+</p>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-[#f8f9fb] dark:bg-white/5 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">
                Primary Languages
              </span>
              <div className="flex flex-wrap gap-2 text-xs">
                {['TypeScript (42%)', 'Dart & Flutter (31%)', 'Kotlin (15%)', 'Python (12%)'].map((lang) => (
                  <span
                    key={lang}
                    className="px-2.5 py-1 rounded-md bg-neutral-100 dark:bg-white/10 text-neutral-700 dark:text-neutral-300 font-mono"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <a
              href="https://github.com/rajvishvakarma"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold hover:opacity-90 transition-opacity"
            >
              <FaGithub size={14} /> Open GitHub Profile <ExternalLink size={12} />
            </a>
          </div>
        ) : selectedNote === 'about-this-site' ? (
          <div className="max-w-2xl space-y-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
              About This Site
            </h1>
            <p className="text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">
              This portfolio is an interactive macOS 27 Golden Gate simulation built with Next.js 16, React, TypeScript, and Tailwind CSS.
            </p>
            <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-[#f8f9fb] dark:bg-white/5 space-y-2 text-xs text-neutral-600 dark:text-neutral-300">
              <p>✨ <strong>Liquid Glass UI:</strong> Authentic frosted glass reflections, dynamic light/dark mode adaptation.</p>
              <p>🪟 <strong>Window Manager:</strong> Center-positioned windows with z-index elevation, drag, and maximize support.</p>
              <p>📱 <strong>Native Embedded Apps:</strong> Custom YouTube player, GitHub Explorer, Terminal emulator, Calculator, and Bear notes.</p>
            </div>
          </div>
        ) : (
          /* Render Project Note if in projects */
          (() => {
            const currentProject = projects.find((p) => p.id === selectedNote);
            if (!currentProject) return null;
            return (
              <div className="max-w-2xl space-y-6">
                <div>
                  <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest">
                    PROJECT
                  </span>
                  <h1 className="text-3xl font-bold mt-1 text-neutral-900 dark:text-white">
                    {currentProject.title}
                  </h1>
                  <p className="text-sm text-[#d85842] font-medium mt-1">
                    {currentProject.tags.join(' · ')}
                  </p>
                </div>
                <p className="text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                  {currentProject.description}
                </p>
                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    Key Highlights
                  </h3>
                  <ul className="list-disc pl-5 space-y-1.5 text-sm text-neutral-700 dark:text-neutral-300">
                    {currentProject.keyFeatures.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })()
        )}
      </div>
    </div>
  );
};

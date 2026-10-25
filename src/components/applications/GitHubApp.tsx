'use client';

import React, { useState, useRef } from 'react';
import {
  ExternalLink,
  GitFork,
  Star,
  BookOpen,
  MapPin,
  Mail,
  Link2,
  Users,
  Search,
  CheckCircle2,
  GitPullRequest,
  GitCommit,
  FolderGit2,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Home,
  Lock,
  Globe,
  Share2,
} from 'lucide-react';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { useDesktopStore } from '@/stores/useDesktopStore';

const PINNED_REPOS = [
  {
    name: 'my-portfolio',
    desc: 'Interactive macOS Developer Portfolio with Liquid Glass aesthetics, interactive widgets & apps.',
    lang: 'TypeScript',
    langColor: '#3178c6',
    stars: 18,
    forks: 4,
    url: 'https://github.com/rajvishvakarma/my-portfolio',
  },
  {
    name: 'android-computer-use',
    desc: 'Autonomous Android task execution agent using accessibility APIs and vision models.',
    lang: 'Kotlin',
    langColor: '#A97BFF',
    stars: 42,
    forks: 7,
    url: 'https://github.com/rajvishvakarma',
  },
  {
    name: 'metheus-convoy',
    desc: 'Real-time geospatial convoy telemetry, route orchestration, and incident broadcasting platform.',
    lang: 'Dart / Flutter',
    langColor: '#00B4AB',
    stars: 31,
    forks: 5,
    url: 'https://github.com/rajvishvakarma',
  },
  {
    name: 'automate-amaz',
    desc: 'High-throughput concurrency engine for product monitoring, price alert streams & automation.',
    lang: 'Python',
    langColor: '#3572A5',
    stars: 26,
    forks: 3,
    url: 'https://github.com/rajvishvakarma',
  },
  {
    name: 'autonomous-drone-swarm',
    desc: 'Decentralized consensus protocol for multi-rotor UAV path planning in dynamic GPS-denied environments.',
    lang: 'C++',
    langColor: '#f34b7d',
    stars: 38,
    forks: 9,
    url: 'https://github.com/rajvishvakarma',
  },
  {
    name: 'edge-cv-telemetry',
    desc: 'Ultra-low latency edge computer vision pipeline for real-time robotic telemetry and telemetry streaming.',
    lang: 'Rust',
    langColor: '#dea584',
    stars: 29,
    forks: 6,
    url: 'https://github.com/rajvishvakarma',
  },
];

// Generate authentic GitHub contribution graph squares (30 weeks x 7 days)
const generateContributions = () => {
  const weeks = [];
  for (let w = 0; w < 32; w++) {
    const days = [];
    for (let d = 0; d < 7; d++) {
      const rand = Math.random();
      const level = rand > 0.35 ? (rand > 0.8 ? 4 : rand > 0.6 ? 3 : rand > 0.45 ? 2 : 1) : 0;
      days.push(level);
    }
    weeks.push(days);
  }
  return weeks;
};

const CONTRIBUTION_COLORS = [
  'bg-neutral-200 dark:bg-[#161b22]',
  'bg-[#9be9a8] dark:bg-[#0e4429]',
  'bg-[#40c463] dark:bg-[#006d32]',
  'bg-[#30a14e] dark:bg-[#26a641]',
  'bg-[#216e39] dark:bg-[#39d353]',
];

export const GitHubApp: React.FC = () => {
  const defaultUrl = 'https://github.com/rajvishvakarma';
  const [urlInput, setUrlInput] = useState(defaultUrl);
  const [currentUrl, setCurrentUrl] = useState(defaultUrl);
  const [history, setHistory] = useState<string[]>([defaultUrl]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'profile' | 'web'>('profile');
  const [activeTab, setActiveTab] = useState<'overview' | 'repositories'>('overview');
  const [searchFilter, setSearchFilter] = useState('');
  const { addNotification } = useDesktopStore();
  const weeks = React.useMemo(() => generateContributions(), []);

  const navigateTo = (target: string) => {
    let clean = target.trim();
    if (!clean.startsWith('http://') && !clean.startsWith('https://')) {
      clean = 'https://' + clean;
    }
    setUrlInput(clean);
    setCurrentUrl(clean);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);

    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push(clean);
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    if (urlInput.includes('github.com/rajvishvakarma') || urlInput === 'github.com') {
      setViewMode('profile');
    } else {
      setViewMode('web');
    }
    navigateTo(urlInput);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const prev = history[historyIndex - 1];
      setHistoryIndex(historyIndex - 1);
      setCurrentUrl(prev);
      setUrlInput(prev);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const next = history[historyIndex + 1];
      setHistoryIndex(historyIndex + 1);
      setCurrentUrl(next);
      setUrlInput(next);
    }
  };

  const handleReload = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 450);
  };

  const handleHome = () => {
    setViewMode('profile');
    navigateTo(defaultUrl);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(currentUrl);
    addNotification('GitHub', 'Copied profile URL to clipboard!');
  };

  return (
    <div className="flex h-full flex-col bg-[#ffffff] text-[#1f2328] select-none dark:bg-[#0d1117] dark:text-[#e6edf3] font-[-apple-system,BlinkMacSystemFont,sans-serif]">
      {/* Safari-style Browser Control Bar */}
      <div className="flex items-center gap-2 border-b border-[#d0d7de] bg-[#f6f8fa] px-3 py-2 dark:border-[#30363d] dark:bg-[#161b22] shrink-0">
        {/* Navigation Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={goBack}
            disabled={historyIndex === 0}
            className={`p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${
              historyIndex === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-80'
            }`}
            title="Back"
          >
            <ArrowLeft size={15} />
          </button>
          <button
            onClick={goForward}
            disabled={historyIndex >= history.length - 1}
            className={`p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors ${
              historyIndex >= history.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-80'
            }`}
            title="Forward"
          >
            <ArrowRight size={15} />
          </button>
          <button
            onClick={handleReload}
            className={`p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors opacity-80 ${
              isLoading ? 'animate-spin' : ''
            }`}
            title="Reload"
          >
            <RotateCw size={14} />
          </button>
          <button
            onClick={handleHome}
            className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors opacity-80"
            title="GitHub Home"
          >
            <Home size={15} />
          </button>
        </div>

        {/* Address Bar */}
        <form onSubmit={handleUrlSubmit} className="flex-1 flex items-center min-w-0 max-w-2xl mx-auto">
          <div className="w-full flex items-center gap-2 rounded-lg border border-[#d0d7de] bg-white px-3 py-1 shadow-2xs dark:border-[#30363d] dark:bg-[#0d1117]">
            <Lock size={13} className="text-emerald-500 shrink-0" />
            <span className="text-xs text-neutral-400 select-none hidden sm:inline">https://</span>
            <input
              type="text"
              value={urlInput.replace(/^https?:\/\//, '')}
              onChange={(e) => setUrlInput(e.target.value)}
              className="w-full bg-transparent text-xs text-neutral-800 dark:text-neutral-200 outline-none"
            />
          </div>
        </form>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setViewMode(viewMode === 'profile' ? 'web' : 'profile')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md border border-[#d0d7de] dark:border-[#30363d] transition-colors ${
              viewMode === 'web'
                ? 'bg-blue-600 text-white'
                : 'bg-white dark:bg-[#21262d] text-neutral-700 dark:text-neutral-300 hover:bg-black/5 dark:hover:bg-white/5'
            }`}
            title="Toggle between Profile and Live Web view"
          >
            {viewMode === 'profile' ? 'Live Web' : 'Profile'}
          </button>

          <button
            onClick={handleShare}
            className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors opacity-80"
            title="Copy URL"
          >
            <Share2 size={14} />
          </button>

          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition-colors opacity-80 text-blue-600 dark:text-blue-400"
            title="Open in External Browser"
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === 'web' ? (
        <div className="flex-1 w-full h-full relative bg-neutral-900">
          <iframe
            src={currentUrl}
            title="GitHub Browser"
            className="w-full h-full border-none"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      ) : (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* GitHub Header Navigation Strip */}
          <div className="flex h-12 items-center justify-between border-b border-[#d0d7de] bg-[#f6f8fa] px-6 dark:border-[#30363d] dark:bg-[#010409] shrink-0">
            <div className="flex items-center gap-3">
              <svg className="w-7 h-7 fill-current text-neutral-900 dark:text-white" viewBox="0 0 16 16">
                <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
              </svg>
              <span className="text-sm font-semibold tracking-tight">rajvishvakarma</span>

              <div className="hidden sm:flex items-center gap-2 rounded-md border border-[#d0d7de] bg-white px-2.5 py-1 text-xs text-neutral-500 shadow-2xs dark:border-[#30363d] dark:bg-[#0d1117]">
                <Search size={12} />
                <input
                  type="text"
                  placeholder="Search repositories..."
                  className="w-36 bg-transparent outline-none placeholder:text-neutral-400"
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-md bg-[#1f883d] px-3 py-1.5 text-xs font-semibold text-white shadow-xs transition-colors hover:bg-[#1a7f37]"
              >
                <span>Follow on GitHub</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Secondary Tab Strip: Overview & Repositories */}
          <div className="flex border-b border-[#d0d7de] px-6 text-xs font-medium dark:border-[#30363d] shrink-0">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center gap-2 border-b-2 py-3 px-3 transition-colors ${
                activeTab === 'overview'
                  ? 'border-[#fd8c73] font-semibold text-[#1f2328] dark:border-[#f78166] dark:text-white'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              <BookOpen size={14} />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('repositories')}
              className={`flex items-center gap-2 border-b-2 py-3 px-3 transition-colors ${
                activeTab === 'repositories'
                  ? 'border-[#fd8c73] font-semibold text-[#1f2328] dark:border-[#f78166] dark:text-white'
                  : 'border-transparent text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white'
              }`}
            >
              <FolderGit2 size={14} />
              <span>Repositories</span>
              <span className="rounded-full bg-black/10 px-1.5 py-0.5 text-[10px] dark:bg-white/10 font-bold">
                {PINNED_REPOS.length}
              </span>
            </button>
          </div>

          {/* Profile Content Body */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="mx-auto max-w-5xl flex flex-col md:flex-row gap-8">
              {/* Left Column: User Profile Card */}
              <div className="w-full md:w-64 shrink-0 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="relative mb-3 h-28 w-28 overflow-hidden rounded-full border-2 border-[#d0d7de] dark:border-[#30363d] shadow-md">
                  <img
                    src="/img/ui/avatar.jpg"
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                  {profile.name}
                </h1>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">@rajvishvakarma</p>
                <p className="mt-3 text-xs leading-5 text-neutral-700 dark:text-neutral-300">
                  {profile.tagline}
                </p>

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#d0d7de] bg-[#f6f8fa] py-1.5 text-xs font-semibold shadow-2xs hover:bg-[#eaeef2] dark:border-[#30363d] dark:bg-[#21262d] dark:hover:bg-[#30363d]"
                >
                  View on GitHub <ExternalLink size={12} />
                </a>

                <div className="mt-5 space-y-2 text-xs text-neutral-600 dark:text-neutral-400">
                  <div className="flex items-center gap-2">
                    <Users size={14} />
                    <span><strong className="text-neutral-900 dark:text-white">48</strong> followers · <strong className="text-neutral-900 dark:text-white">52</strong> following</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={14} />
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={14} />
                    <span className="truncate">{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link2 size={14} />
                    <a href={profile.website} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline dark:text-blue-400 truncate">
                      {profile.website}
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Repositories & Contribution Graph */}
              <div className="flex-1 min-w-0">
                {activeTab === 'overview' ? (
                  <div>
                    {/* Pinned Repos Section */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-3">
                        <h2 className="text-sm font-semibold text-neutral-900 dark:text-white">
                          Pinned Repositories
                        </h2>
                        <span className="text-xs text-neutral-500">Customize pins</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {PINNED_REPOS.filter((r) =>
                          `${r.name} ${r.desc}`.toLowerCase().includes(searchFilter.toLowerCase())
                        ).map((repo) => (
                          <div
                            key={repo.name}
                            className="flex flex-col justify-between rounded-xl border border-[#d0d7de] bg-white p-4 shadow-2xs transition-all hover:border-blue-500/50 hover:shadow-xs dark:border-[#30363d] dark:bg-[#161b22]"
                          >
                            <div>
                              <div className="flex items-center justify-between">
                                <a
                                  href={repo.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="font-semibold text-xs text-blue-600 hover:underline dark:text-[#58a6ff] flex items-center gap-1.5"
                                >
                                  <BookOpen size={13} />
                                  <span>{repo.name}</span>
                                </a>
                                <span className="rounded-full border border-[#d0d7de] px-1.5 py-0.5 text-[10px] text-neutral-500 dark:border-[#30363d]">
                                  Public
                                </span>
                              </div>
                              <p className="mt-2 text-[11px] leading-4 text-neutral-600 dark:text-neutral-400">
                                {repo.desc}
                              </p>
                            </div>

                            <div className="mt-4 flex items-center gap-4 text-[11px] text-neutral-500 dark:text-neutral-400">
                              <span className="flex items-center gap-1.5">
                                <span
                                  className="h-2.5 w-2.5 rounded-full inline-block"
                                  style={{ backgroundColor: repo.langColor }}
                                />
                                <span>{repo.lang}</span>
                              </span>
                              <span className="flex items-center gap-1">
                                <Star size={12} />
                                <span>{repo.stars}</span>
                              </span>
                              <span className="flex items-center gap-1">
                                <GitFork size={12} />
                                <span>{repo.forks}</span>
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Authentic Contribution Heatmap */}
                    <div className="mb-6 rounded-xl border border-[#d0d7de] bg-white p-4 shadow-2xs dark:border-[#30363d] dark:bg-[#161b22]">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xs font-semibold text-neutral-900 dark:text-white">
                          482 contributions in the last year
                        </h3>
                        <span className="text-[10px] text-neutral-500">Contribution settings</span>
                      </div>

                      <div className="overflow-x-auto pb-2">
                        <div className="inline-flex gap-1">
                          {weeks.map((week, wIndex) => (
                            <div key={wIndex} className="flex flex-col gap-1">
                              {week.map((level, dIndex) => (
                                <div
                                  key={dIndex}
                                  className={`h-2.5 w-2.5 rounded-2xs ${CONTRIBUTION_COLORS[level]} transition-transform hover:scale-125`}
                                  title={`${level * 2 + 1} contributions on day ${dIndex + 1}`}
                                />
                              ))}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between text-[10px] text-neutral-500">
                        <span>Learn how we count contributions</span>
                        <div className="flex items-center gap-1.5">
                          <span>Less</span>
                          {CONTRIBUTION_COLORS.map((c, i) => (
                            <span key={i} className={`h-2.5 w-2.5 rounded-2xs ${c}`} />
                          ))}
                          <span>More</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Repositories Tab */
                  <div className="space-y-3">
                    {PINNED_REPOS.filter((r) =>
                      `${r.name} ${r.desc}`.toLowerCase().includes(searchFilter.toLowerCase())
                    ).map((repo) => (
                      <div
                        key={repo.name}
                        className="rounded-xl border border-[#d0d7de] bg-white p-4 shadow-2xs dark:border-[#30363d] dark:bg-[#161b22] flex flex-col justify-between"
                      >
                        <div className="flex items-center justify-between">
                          <a
                            href={repo.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm font-bold text-blue-600 hover:underline dark:text-[#58a6ff] flex items-center gap-2"
                          >
                            <BookOpen size={15} />
                            <span>{repo.name}</span>
                          </a>
                          <span className="rounded-full border border-[#d0d7de] px-2 py-0.5 text-xs text-neutral-500 dark:border-[#30363d]">
                            Public
                          </span>
                        </div>
                        <p className="mt-2 text-xs text-neutral-600 dark:text-neutral-400">
                          {repo.desc}
                        </p>
                        <div className="mt-4 flex items-center gap-4 text-xs text-neutral-500">
                          <span className="flex items-center gap-1.5">
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: repo.langColor }}
                            />
                            {repo.lang}
                          </span>
                          <span className="flex items-center gap-1">
                            <Star size={13} /> {repo.stars}
                          </span>
                          <span className="flex items-center gap-1">
                            <GitFork size={13} /> {repo.forks}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

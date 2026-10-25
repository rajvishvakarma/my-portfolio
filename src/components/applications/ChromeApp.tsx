'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Star,
  Plus,
  X,
  Search,
  ExternalLink,
  Mic,
  Camera,
  MoreVertical,
  Puzzle,
  Globe,
} from 'lucide-react';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { useDesktopStore } from '@/stores/useDesktopStore';
import { YouTubeEmbedView } from './YouTubeEmbedView';
import { GitHubApp } from './GitHubApp';

interface ChromeTab {
  id: string;
  title: string;
  url: string;
}

const CHROME_SHORTCUTS = [
  {
    title: 'GitHub',
    url: 'https://github.com/rajvishvakarma',
    icon: '/img/sites/github.svg',
    isExternal: true,
  },
  {
    title: 'Projects',
    url: 'raj-portfolio://projects',
    icon: '/img/icons/codefile.png',
    appId: 'projects',
  },
  {
    title: 'Resume',
    url: 'raj-portfolio://resume',
    icon: '/img/icons/sf-icons/pdf.svg',
    appId: 'resume',
  },
  {
    title: 'Experience',
    url: 'raj-portfolio://experience',
    icon: '/img/icons/sf-icons/work.svg',
    appId: 'experience',
  },
  {
    title: 'Skills',
    url: 'raj-portfolio://skills',
    icon: '/img/icons/settings.png',
    appId: 'skills',
  },
  {
    title: 'LeetCode',
    url: 'https://leetcode.com',
    icon: '/img/sites/leetcode.svg',
    isExternal: true,
  },
  {
    title: 'Metheus Lab',
    url: 'https://metheuslab.com',
    icon: '/img/icons/macos-27.png',
    isExternal: true,
  },
];

export const ChromeApp: React.FC = () => {
  const [tabs, setTabs] = useState<ChromeTab[]>([
    { id: '1', title: 'New Tab', url: 'chrome://newtab' },
  ]);
  const [activeTabId, setActiveTabId] = useState('1');
  const [omniboxInput, setOmniboxInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const openApp = useDesktopStore((state) => state.openApp);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const extractVideoId = (testUrl: string) => {
    const match = testUrl.match(/(?:watch\?v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : undefined;
  };

  const isCurrentTabYouTube =
    activeTab.url.toLowerCase().includes('youtube') ||
    activeTab.url.toLowerCase().includes('youtu.be');
  const isCurrentTabGitHub = activeTab.url.toLowerCase().includes('github.com');

  const navigateTo = (url: string, title?: string) => {
    setIsLoading(true);

    let targetUrl = url;
    if (url.toLowerCase().includes('youtube.com') || url.toLowerCase() === 'youtube') {
      const match = url.match(/(?:watch\?v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
      targetUrl = match ? `https://www.youtube.com/watch?v=${match[1]}` : 'https://www.youtube.com';
    } else if (url.toLowerCase().includes('github.com') || url.toLowerCase() === 'github') {
      targetUrl = 'https://github.com/rajvishvakarma';
    }

    setOmniboxInput(targetUrl === 'chrome://newtab' ? '' : targetUrl);
    setTabs((current) =>
      current.map((t) =>
        t.id === activeTabId
          ? {
              ...t,
              url: targetUrl,
              title:
                title ||
                (targetUrl.includes('youtube')
                  ? 'YouTube'
                  : targetUrl.includes('github')
                  ? 'GitHub - rajvishvakarma'
                  : targetUrl.includes('google.com/search')
                  ? `${getSearchQuery(targetUrl) || 'Search'} - Google Search`
                  : targetUrl.includes('google')
                  ? 'Google'
                  : targetUrl),
            }
          : t
      )
    );
    setTimeout(() => setIsLoading(false), 300);
  };

  const getSearchQuery = (url: string) => {
    try {
      const match = url.match(/[?&]q=([^&]+)/);
      if (match) {
        return decodeURIComponent(match[1].replace(/\+/g, ' '));
      }
    } catch {
      // fallback
    }
    return '';
  };

  const isCurrentTabGoogleSearch = activeTab.url.includes('google.com/search');
  const currentQuery = isCurrentTabGoogleSearch ? getSearchQuery(activeTab.url) : '';

  const handleOmniboxSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = omniboxInput.trim();
    if (!val) return;
    if (val.startsWith('http://') || val.startsWith('https://')) {
      navigateTo(val);
    } else if (val.includes('.') && !val.includes(' ')) {
      navigateTo(`https://${val}`);
    } else {
      navigateTo(
        `https://www.google.com/search?q=${encodeURIComponent(val)}`,
        `${val} - Google Search`
      );
    }
  };

  const addTab = () => {
    const newId = String(Date.now());
    setTabs((prev) => [...prev, { id: newId, title: 'New Tab', url: 'chrome://newtab' }]);
    setActiveTabId(newId);
    setOmniboxInput('');
  };

  const closeTab = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (tabs.length === 1) {
      navigateTo('chrome://newtab', 'New Tab');
      return;
    }
    const idx = tabs.findIndex((t) => t.id === id);
    const filtered = tabs.filter((t) => t.id !== id);
    setTabs(filtered);
    if (activeTabId === id) {
      const nextActive = filtered[Math.max(0, idx - 1)];
      setActiveTabId(nextActive.id);
      setOmniboxInput(nextActive.url === 'chrome://newtab' ? '' : nextActive.url);
    }
  };

  const isQueryRajRelated = (q: string) => {
    const lower = q.toLowerCase();
    return (
      lower.includes('raj') ||
      lower.includes('vishvakarma') ||
      lower.includes('portfolio') ||
      lower.includes('resume') ||
      lower.includes('projects') ||
      lower.includes('project') ||
      lower.includes('skills') ||
      lower.includes('experience') ||
      lower.includes('contact') ||
      lower.includes('developer') ||
      lower.includes('robotics') ||
      lower.includes('mits') ||
      lower.trim() === ''
    );
  };

  return (
    <div className="flex h-full flex-col bg-[#f1f3f4] text-[#202124] select-none dark:bg-[#202124] dark:text-[#e8eaed] overflow-hidden">
      {/* Chrome Tab Strip */}
      <div className="flex items-center gap-1 bg-[#dfe1e5] px-2 pt-1.5 dark:bg-[#1a1a1a] shrink-0">
        <div className="flex max-w-full flex-1 items-center gap-1 overflow-x-auto no-scrollbar">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <div
                key={tab.id}
                onClick={() => {
                  setActiveTabId(tab.id);
                  setOmniboxInput(tab.url === 'chrome://newtab' ? '' : tab.url);
                }}
                className={`group flex h-8 min-w-[100px] sm:min-w-[140px] max-w-[200px] flex-1 items-center gap-1.5 rounded-t-lg px-2.5 text-xs transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-white font-medium text-neutral-900 shadow-xs dark:bg-[#282a2d] dark:text-neutral-100'
                    : 'text-neutral-600 hover:bg-white/40 dark:text-neutral-400 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex h-3.5 w-3.5 shrink-0 items-center justify-center">
                  <Image
                    src="/img/icons/chrome.png"
                    alt="Chrome"
                    width={14}
                    height={14}
                    className="h-3.5 w-3.5 object-contain"
                  />
                </div>
                <span className="min-w-0 flex-1 truncate text-[11px] sm:text-xs">{tab.title}</span>
                <button
                  onClick={(e) => closeTab(e, tab.id)}
                  aria-label="Close tab"
                  className="rounded-full p-0.5 opacity-60 hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10"
                >
                  <X size={11} />
                </button>
              </div>
            );
          })}
        </div>

        {/* New Tab Button */}
        <button
          onClick={addTab}
          aria-label="New tab"
          className="rounded-full p-1 text-neutral-600 hover:bg-white/60 dark:text-neutral-300 dark:hover:bg-white/10 shrink-0"
        >
          <Plus size={14} />
        </button>
      </div>

      {/* Chrome Navigation & Omnibox Toolbar */}
      <div className="flex h-10 items-center gap-1.5 sm:gap-2 border-b border-black/10 bg-white px-2 sm:px-3 dark:border-white/10 dark:bg-[#282a2d] shrink-0">
        <div className="flex items-center gap-0.5 shrink-0">
          <button
            onClick={() => navigateTo('chrome://newtab', 'New Tab')}
            aria-label="Back"
            className="rounded-full p-1.5 text-neutral-600 hover:bg-black/5 dark:text-neutral-300 dark:hover:bg-white/10"
          >
            <ArrowLeft size={15} />
          </button>
          <button
            aria-label="Forward"
            className="rounded-full p-1.5 text-neutral-400 hover:bg-black/5 disabled:opacity-40 dark:text-neutral-500 hidden sm:block"
            disabled
          >
            <ArrowRight size={15} />
          </button>
          <button
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 300);
            }}
            aria-label="Reload"
            className={`rounded-full p-1.5 text-neutral-600 hover:bg-black/5 dark:text-neutral-300 dark:hover:bg-white/10 ${
              isLoading ? 'animate-spin' : ''
            }`}
          >
            <RotateCw size={13} />
          </button>
        </div>

        {/* Omnibox */}
        <form
          onSubmit={handleOmniboxSubmit}
          className="flex flex-1 min-w-0 items-center gap-2 rounded-full bg-[#f1f3f4] px-3 py-1 text-xs text-neutral-800 focus-within:bg-white focus-within:shadow-md focus-within:ring-2 focus-within:ring-blue-500/30 dark:bg-[#1f2023] dark:text-neutral-100 dark:focus-within:bg-[#2b2d31]"
        >
          <Search size={13} className="text-neutral-400 shrink-0" />
          <input
            type="text"
            value={omniboxInput}
            onChange={(e) => setOmniboxInput(e.target.value)}
            placeholder="Search Google or type a URL"
            className="min-w-0 flex-1 bg-transparent text-xs outline-none select-text placeholder:text-neutral-400"
          />
          {omniboxInput && (
            <button
              type="button"
              onClick={() => setOmniboxInput('')}
              className="text-neutral-400 hover:text-neutral-600 shrink-0"
            >
              <X size={12} />
            </button>
          )}
        </form>

        {/* Profile / Menu */}
        <div className="flex items-center gap-1 text-neutral-600 dark:text-neutral-300 shrink-0">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 font-bold text-[10px] text-white">
            R
          </div>
          <button aria-label="Menu" className="rounded-full p-1 hover:bg-black/5 dark:hover:bg-white/10">
            <MoreVertical size={15} />
          </button>
        </div>
      </div>

      {/* Chrome Web Content Area */}
      <div className="flex-1 overflow-y-auto bg-white dark:bg-[#1f2023]">
        {activeTab.url === 'chrome://newtab' ? (
          /* Google Chrome New Tab Home */
          <div className="mx-auto flex max-w-2xl flex-col items-center px-4 pt-10 sm:pt-16 pb-12 text-center">
            {/* Google Logo */}
            <div className="mb-6 sm:mb-8 flex items-center justify-center select-none">
              <span className="text-4xl sm:text-5xl font-bold tracking-tight text-[#4285F4]">G</span>
              <span className="text-4xl sm:text-5xl font-bold tracking-tight text-[#EA4335]">o</span>
              <span className="text-4xl sm:text-5xl font-bold tracking-tight text-[#FBBC05]">o</span>
              <span className="text-4xl sm:text-5xl font-bold tracking-tight text-[#4285F4]">g</span>
              <span className="text-4xl sm:text-5xl font-bold tracking-tight text-[#34A853]">l</span>
              <span className="text-4xl sm:text-5xl font-bold tracking-tight text-[#EA4335]">e</span>
            </div>

            {/* Google Search Pill Box */}
            <form
              onSubmit={handleOmniboxSubmit}
              className="flex w-full items-center gap-2.5 sm:gap-3 rounded-full border border-neutral-300 bg-white px-3.5 sm:px-4 py-2.5 sm:py-3 shadow-md hover:shadow-lg focus-within:shadow-xl dark:border-neutral-700 dark:bg-[#2b2d31]"
            >
              <Search size={17} className="text-neutral-400 shrink-0" />
              <input
                type="text"
                value={omniboxInput}
                onChange={(e) => setOmniboxInput(e.target.value)}
                placeholder="Search Google or type a URL"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none select-text placeholder:text-neutral-400 dark:text-white"
              />
              <button
                type="submit"
                className="px-2.5 py-1 rounded-full bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shrink-0"
              >
                Search
              </button>
            </form>

            {/* Google Shortcuts Grid */}
            <div className="mt-8 grid grid-cols-4 gap-3 sm:gap-6 w-full max-w-lg">
              {CHROME_SHORTCUTS.map((sc, i) => (
                <button
                  key={i}
                  onClick={() => {
                    if (sc.appId) {
                      openApp(sc.appId as any);
                    } else if (sc.isExternal) {
                      window.open(sc.url, '_blank');
                    } else {
                      navigateTo(sc.url, sc.title);
                    }
                  }}
                  className="group flex flex-col items-center gap-1.5 rounded-xl p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/5 active:scale-95"
                >
                  <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-neutral-100 p-2.5 shadow-xs transition-transform group-hover:scale-105 dark:bg-[#323639]">
                    <Image
                      src={sc.icon}
                      alt={sc.title}
                      width={22}
                      height={22}
                      className="h-5 w-5 sm:h-6 sm:w-6 object-contain"
                    />
                  </div>
                  <span className="max-w-[70px] truncate text-[11px] sm:text-xs font-medium text-neutral-700 dark:text-neutral-300">
                    {sc.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : isCurrentTabGoogleSearch ? (
          /* Google Search Results View (Interactive & Authentic) */
          <div className="flex flex-col min-h-full bg-white dark:bg-[#202124] text-neutral-800 dark:text-neutral-200">
            {/* Search Results Navigation Subheader */}
            <div className="border-b border-neutral-200 dark:border-neutral-800 px-4 pt-3 pb-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-[#f8f9fa] dark:bg-[#282a2d]">
              <div className="flex items-center gap-3 overflow-x-auto no-scrollbar text-xs font-medium text-neutral-600 dark:text-neutral-400">
                <span className="text-blue-600 dark:text-blue-400 font-semibold border-b-2 border-blue-600 dark:border-blue-400 pb-1 cursor-pointer">
                  All
                </span>
                <span className="hover:text-neutral-900 dark:hover:text-white cursor-pointer pb-1">Images</span>
                <span className="hover:text-neutral-900 dark:hover:text-white cursor-pointer pb-1">Videos</span>
                <span className="hover:text-neutral-900 dark:hover:text-white cursor-pointer pb-1">News</span>
                <span className="hover:text-neutral-900 dark:hover:text-white cursor-pointer pb-1">Maps</span>
              </div>
              <button
                onClick={() => window.open(activeTab.url, '_blank')}
                className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-medium hover:underline shrink-0"
              >
                <span>Open in real Google.com</span>
                <ExternalLink size={12} />
              </button>
            </div>

            <div className="p-4 sm:p-6 max-w-4xl space-y-6">
              {/* Query Stats */}
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                About 1,840,000 results (0.34 seconds) for <span className="font-semibold text-neutral-800 dark:text-neutral-200">&quot;{currentQuery}&quot;</span>
              </p>

              {/* If query matches Raj / Portfolio */}
              {isQueryRajRelated(currentQuery) ? (
                <>
                  {/* Verified Knowledge Panel */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/80 shadow-xs flex flex-col sm:flex-row gap-4 items-start">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border border-neutral-300 dark:border-neutral-600 shrink-0">
                      <Image
                        src="/img/raj.jpg?v=5"
                        alt="Raj Vishvakarma"
                        width={80}
                        height={80}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white">
                          Raj Vishvakarma
                        </h2>
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 text-[10px] font-semibold">
                          Verified Profile
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-1">
                        Software Engineer · AI & Robotics Undergraduate at MITS Gwalior (2023–2027)
                      </p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                        Balaghat, Madhya Pradesh, India · Full-Stack Web, AI Agents, Python & Next.js
                      </p>

                      {/* Quick Interactive Actions */}
                      <div className="flex flex-wrap items-center gap-2 mt-3.5">
                        <button
                          onClick={() => openApp('bear')}
                          className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-2xs"
                        >
                          Open Intro Card
                        </button>
                        <button
                          onClick={() => openApp('projects')}
                          className="px-3 py-1.5 rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white text-xs font-semibold hover:bg-neutral-300 transition-colors"
                        >
                          Projects
                        </button>
                        <button
                          onClick={() => openApp('resume')}
                          className="px-3 py-1.5 rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white text-xs font-semibold hover:bg-neutral-300 transition-colors"
                        >
                          Resume
                        </button>
                        <button
                          onClick={() => window.open('https://github.com/rajvishvakarma', '_blank')}
                          className="px-3 py-1.5 rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white text-xs font-semibold hover:bg-neutral-300 transition-colors"
                        >
                          GitHub ↗
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Organic Result 1: Main Portfolio */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                      <span className="font-medium text-neutral-800 dark:text-neutral-200">raj-vishvakarma.vercel.app</span>
                      <span>›</span>
                      <span>portfolio</span>
                    </div>
                    <h3
                      onClick={() => openApp('bear')}
                      className="text-base sm:text-lg font-medium text-blue-700 dark:text-blue-400 hover:underline cursor-pointer"
                    >
                      Raj Vishvakarma — Interactive macOS Portfolio & Systems
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      Official website of Raj Vishvakarma. High performance macOS simulation with integrated applications, real-time terminal, resume viewer, and showcase of machine learning & robotics projects.
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
                      <button
                        onClick={() => openApp('projects')}
                        className="text-left text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Projects & Apps
                      </button>
                      <button
                        onClick={() => openApp('resume')}
                        className="text-left text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Download Resume
                      </button>
                      <button
                        onClick={() => openApp('skills')}
                        className="text-left text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Technical Skills
                      </button>
                      <button
                        onClick={() => openApp('contact')}
                        className="text-left text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        Contact & Email
                      </button>
                    </div>
                  </div>

                  {/* Organic Result 2: GitHub */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs text-neutral-600 dark:text-neutral-400">
                      <span className="font-medium text-neutral-800 dark:text-neutral-200">github.com</span>
                      <span>›</span>
                      <span>rajvishvakarma</span>
                    </div>
                    <a
                      href="https://github.com/rajvishvakarma"
                      target="_blank"
                      rel="noreferrer"
                      className="text-base sm:text-lg font-medium text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1.5"
                    >
                      <span>rajvishvakarma (Raj Vishvakarma) · GitHub</span>
                      <ExternalLink size={13} />
                    </a>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      Follow @rajvishvakarma on GitHub. AI algorithms, full-stack Next.js applications, robotics simulation models, and open source contributions.
                    </p>
                  </div>
                </>
              ) : (
                /* Dynamic query results */
                <div className="space-y-5">
                  <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-semibold text-blue-900 dark:text-blue-200">
                        Searching for &quot;{currentQuery}&quot;
                      </h4>
                      <p className="text-xs text-blue-700 dark:text-blue-300 mt-0.5">
                        You can view simulated instant results below or open live Google in a new browser tab.
                      </p>
                    </div>
                    <button
                      onClick={() => window.open(activeTab.url, '_blank')}
                      className="px-3.5 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors shadow-2xs shrink-0"
                    >
                      Open in Google ↗
                    </button>
                  </div>

                  {/* Generated result 1 */}
                  <div className="space-y-1">
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">
                      en.wikipedia.org › wiki › {encodeURIComponent(currentQuery)}
                    </div>
                    <a
                      href={`https://en.wikipedia.org/wiki/${encodeURIComponent(currentQuery)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-base sm:text-lg font-medium text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <span>{currentQuery} — Overview & Encyclopedia</span>
                      <ExternalLink size={13} />
                    </a>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
                      Explore detailed background, history, core concepts, and documentation for {currentQuery}.
                    </p>
                  </div>

                  {/* Generated result 2 */}
                  <div className="space-y-1">
                    <div className="text-xs text-neutral-500 dark:text-neutral-400">
                      github.com › topics › {encodeURIComponent(currentQuery.toLowerCase())}
                    </div>
                    <a
                      href={`https://github.com/search?q=${encodeURIComponent(currentQuery)}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-base sm:text-lg font-medium text-blue-700 dark:text-blue-400 hover:underline flex items-center gap-1"
                    >
                      <span>{currentQuery} · GitHub Repositories & Topics</span>
                      <ExternalLink size={13} />
                    </a>
                    <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300">
                      Browse open-source code repositories, libraries, tools, and developer projects related to {currentQuery}.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* General Web Content / Iframe */
          <div className="flex h-full w-full flex-col">
            <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-100 px-3 py-1.5 text-xs text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300 shrink-0">
              <span className="truncate max-w-[220px] sm:max-w-md">
                URL: <code className="font-mono text-[11px]">{activeTab.url}</code>
              </span>
              <button
                onClick={() => window.open(activeTab.url, '_blank')}
                className="flex items-center gap-1 font-semibold text-blue-600 hover:underline dark:text-blue-400 shrink-0"
              >
                <span>Open in browser</span>
                <ExternalLink size={11} />
              </button>
            </div>
            {isCurrentTabYouTube ? (
              <div className="flex-1 w-full overflow-hidden bg-neutral-950">
                <YouTubeEmbedView
                  initialVideoId={extractVideoId(activeTab.url)}
                  isDark={true}
                />
              </div>
            ) : isCurrentTabGitHub ? (
              <div className="flex-1 w-full overflow-y-auto">
                <GitHubApp />
              </div>
            ) : (
              <iframe
                title="Chrome Frame"
                src={activeTab.url}
                className="h-full w-full flex-1 border-none bg-white"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

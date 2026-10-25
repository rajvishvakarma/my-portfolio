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
                  : targetUrl.includes('google')
                  ? 'Google Search'
                  : targetUrl),
            }
          : t
      )
    );
    setTimeout(() => setIsLoading(false), 300);
  };

  const handleOmniboxSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = omniboxInput.trim();
    if (!val) return;
    if (val.startsWith('http://') || val.startsWith('https://')) {
      navigateTo(val);
    } else if (val.includes('.') && !val.includes(' ')) {
      navigateTo(`https://${val}`);
    } else {
      navigateTo(`https://www.google.com/search?q=${encodeURIComponent(val)}`);
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

  return (
    <div className="flex h-full flex-col bg-[#f1f3f4] text-[#202124] select-none dark:bg-[#202124] dark:text-[#e8eaed]">
      {/* Chrome Tab Strip */}
      <div className="flex items-center gap-1 bg-[#dfe1e5] px-3 pt-2 dark:bg-[#1a1a1a]">
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
                className={`group flex h-9 min-w-[140px] max-w-[220px] flex-1 items-center gap-2 rounded-t-lg px-3 text-xs transition-colors cursor-default ${
                  isActive
                    ? 'bg-white font-medium text-neutral-900 shadow-xs dark:bg-[#282a2d] dark:text-neutral-100'
                    : 'text-neutral-600 hover:bg-white/40 dark:text-neutral-400 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex h-4 w-4 shrink-0 items-center justify-center">
                  <Image
                    src="/img/icons/chrome.png"
                    alt="Chrome"
                    width={14}
                    height={14}
                    className="h-3.5 w-3.5 object-contain"
                  />
                </div>
                <span className="min-w-0 flex-1 truncate">{tab.title}</span>
                <button
                  onClick={(e) => closeTab(e, tab.id)}
                  aria-label="Close tab"
                  className="rounded-full p-0.5 opacity-0 group-hover:opacity-100 hover:bg-black/10 dark:hover:bg-white/10"
                >
                  <X size={12} />
                </button>
              </div>
            );
          })}
        </div>

        {/* New Tab Button */}
        <button
          onClick={addTab}
          aria-label="New tab"
          className="rounded-full p-1.5 text-neutral-600 hover:bg-white/60 dark:text-neutral-300 dark:hover:bg-white/10"
        >
          <Plus size={15} />
        </button>
      </div>

      {/* Chrome Navigation & Omnibox Toolbar */}
      <div className="flex h-11 items-center gap-2 border-b border-black/10 bg-white px-3 dark:border-white/10 dark:bg-[#282a2d]">
        <div className="flex items-center gap-0.5">
          <button
            onClick={() => navigateTo('chrome://newtab', 'New Tab')}
            aria-label="Back"
            className="rounded-full p-1.5 text-neutral-600 hover:bg-black/5 dark:text-neutral-300 dark:hover:bg-white/10"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            aria-label="Forward"
            className="rounded-full p-1.5 text-neutral-400 hover:bg-black/5 disabled:opacity-40 dark:text-neutral-500"
            disabled
          >
            <ArrowRight size={16} />
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
            <RotateCw size={14} />
          </button>
        </div>

        {/* Omnibox */}
        <form
          onSubmit={handleOmniboxSubmit}
          className="flex flex-1 items-center gap-2 rounded-full bg-[#f1f3f4] px-3.5 py-1.5 text-xs text-neutral-800 focus-within:bg-white focus-within:shadow-md focus-within:ring-2 focus-within:ring-blue-500/30 dark:bg-[#1f2023] dark:text-neutral-100 dark:focus-within:bg-[#2b2d31]"
        >
          <Search size={14} className="text-neutral-400" />
          <input
            type="text"
            value={omniboxInput}
            onChange={(e) => setOmniboxInput(e.target.value)}
            placeholder="Search Google or type a URL"
            className="min-w-0 flex-1 bg-transparent outline-none select-text placeholder:text-neutral-400"
          />
          <button
            type="button"
            title="Bookmark this tab"
            className="text-neutral-400 hover:text-amber-500"
          >
            <Star size={14} />
          </button>
        </form>

        {/* Extensions & Profile */}
        <div className="flex items-center gap-1 text-neutral-600 dark:text-neutral-300">
          <button aria-label="Extensions" className="rounded-full p-1.5 hover:bg-black/5 dark:hover:bg-white/10">
            <Puzzle size={15} />
          </button>
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 font-bold text-[10px] text-white">
            R
          </div>
          <button aria-label="Menu" className="rounded-full p-1.5 hover:bg-black/5 dark:hover:bg-white/10">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      {/* Chrome Web Content Area */}
      <div className="flex-1 overflow-y-auto bg-white dark:bg-[#1f2023]">
        {activeTab.url === 'chrome://newtab' ? (
          <div className="mx-auto flex max-w-2xl flex-col items-center px-4 pt-16 pb-12 text-center">
            {/* Google Logo */}
            <div className="mb-8 flex items-center justify-center select-none">
              <span className="text-5xl font-bold tracking-tight text-[#4285F4]">G</span>
              <span className="text-5xl font-bold tracking-tight text-[#EA4335]">o</span>
              <span className="text-5xl font-bold tracking-tight text-[#FBBC05]">o</span>
              <span className="text-5xl font-bold tracking-tight text-[#4285F4]">g</span>
              <span className="text-5xl font-bold tracking-tight text-[#34A853]">l</span>
              <span className="text-5xl font-bold tracking-tight text-[#EA4335]">e</span>
            </div>

            {/* Google Search Pill Box */}
            <form
              onSubmit={handleOmniboxSubmit}
              className="flex w-full items-center gap-3 rounded-full border border-neutral-300 bg-white px-4 py-3 shadow-md hover:shadow-lg focus-within:shadow-xl dark:border-neutral-700 dark:bg-[#2b2d31]"
            >
              <Search size={18} className="text-neutral-400" />
              <input
                type="text"
                value={omniboxInput}
                onChange={(e) => setOmniboxInput(e.target.value)}
                placeholder="Search Google or type a URL"
                className="min-w-0 flex-1 bg-transparent text-sm outline-none select-text placeholder:text-neutral-400 dark:text-white"
              />
              <button type="button" aria-label="Voice search" className="text-neutral-500 hover:text-blue-500">
                <Mic size={17} />
              </button>
              <button type="button" aria-label="Lens search" className="text-neutral-500 hover:text-blue-500">
                <Camera size={17} />
              </button>
            </form>

            {/* Google Shortcuts Grid */}
            <div className="mt-10 grid grid-cols-4 gap-6 sm:grid-cols-4">
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
                  className="group flex flex-col items-center gap-2 rounded-xl p-2 transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 p-2.5 shadow-xs transition-transform group-hover:scale-105 dark:bg-[#323639]">
                    <Image
                      src={sc.icon}
                      alt={sc.title}
                      width={24}
                      height={24}
                      className="h-6 w-6 object-contain"
                    />
                  </div>
                  <span className="max-w-[70px] truncate text-xs font-medium text-neutral-700 dark:text-neutral-300">
                    {sc.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex h-full w-full flex-col">
            <div className="flex items-center justify-between border-b border-neutral-200 bg-neutral-100 px-4 py-2 text-xs text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300">
              <span className="truncate">URL: <code className="font-mono">{activeTab.url}</code></span>
              <button
                onClick={() => window.open(activeTab.url, '_blank')}
                className="flex items-center gap-1 font-semibold text-blue-600 hover:underline dark:text-blue-400"
              >
                Open in actual browser <ExternalLink size={12} />
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

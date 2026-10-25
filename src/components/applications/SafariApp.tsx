'use client';

import React, { useState, useRef } from 'react';
import {
  FiSearch,
  FiArrowLeft,
  FiArrowRight,
  FiRefreshCw,
  FiLock,
  FiExternalLink,
  FiPlus,
  FiClock,
  FiStar,
  FiShield,
  FiGrid,
  FiChevronDown,
  FiSliders,
  FiBookOpen,
  FiLayers,
  FiX,
  FiDownload,
} from 'react-icons/fi';
import { WindowControls } from '@/components/windows/WindowControls';
import { useDesktopStore } from '@/stores/useDesktopStore';
import { YouTubeEmbedView } from './YouTubeEmbedView';
import { GitHubApp } from './GitHubApp';

const CLEAN_FAVORITES = [
  { name: 'Google', url: 'https://www.google.com/webhp?igu=1' },
  { name: 'GitHub', url: 'https://github.com/rajvishvakarma' },
  { name: 'Wikipedia', url: 'https://en.m.wikipedia.org/wiki/Main_Page' },
  { name: 'Apple', url: 'https://www.apple.com' },
  { name: 'My Resume', url: 'resume' },
  { name: 'Metheus Lab', url: 'https://github.com/rajvishvakarma' },
];

export const SafariApp: React.FC = () => {
  const { theme, addNotification, openApp } = useDesktopStore();
  const isDarkMode = theme === 'dark';

  // Start on Safari Startpage by default
  const [currentUrl, setCurrentUrl] = useState<string>('');
  const [inputUrl, setInputUrl] = useState<string>('');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[]>(['']);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState('');
  const [downloadStatus, setDownloadStatus] = useState<{ success: boolean; filename: string } | null>(null);
  const [wallpaperChoice, setWallpaperChoice] = useState<'mountain' | 'tahoe'>('mountain');

  const iframeRef = useRef<HTMLIFrameElement>(null);

  const extractVideoId = (testUrl: string) => {
    const match = testUrl.match(/(?:watch\?v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : undefined;
  };

  const isStartPage = !currentUrl || currentUrl === 'safari://startpage';
  const isYouTube = currentUrl.toLowerCase().includes('youtube') || currentUrl.toLowerCase().includes('youtu.be');
  const isGitHub = currentUrl.toLowerCase().includes('github.com');
  const isApple = currentUrl.toLowerCase().includes('apple.com');

  const processUrl = (input: string) => {
    const trimmed = input.trim();
    if (!trimmed) return '';

    if (trimmed.toLowerCase() === 'resume') {
      openApp('resume');
      return '';
    }

    if (trimmed.toLowerCase().includes('youtube.com') || trimmed.toLowerCase() === 'youtube') {
      const match = trimmed.match(/(?:watch\?v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
      return match ? `https://www.youtube.com/watch?v=${match[1]}` : 'https://www.youtube.com';
    }

    if (trimmed.toLowerCase().includes('github.com') || trimmed.toLowerCase() === 'github') {
      return 'https://github.com/rajvishvakarma';
    }

    if (trimmed.toLowerCase().includes('apple.com') || trimmed.toLowerCase() === 'apple') {
      return 'https://www.apple.com';
    }

    if (!trimmed.includes('.') || trimmed.includes(' ')) {
      return `https://www.google.com/search?igu=1&q=${encodeURIComponent(trimmed)}`;
    }

    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://')) {
      return 'https://' + trimmed;
    }

    return trimmed;
  };

  const navigate = (destination: string) => {
    const processed = processUrl(destination);
    if (!processed && destination.toLowerCase() === 'resume') return;

    setCurrentUrl(processed);
    setInputUrl(processed);
    setIsLoading(true);

    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(processed);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputUrl.trim()) return;
    navigate(inputUrl);
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentUrl(history[newIndex]);
      setInputUrl(history[newIndex]);
      setIsLoading(true);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentUrl(history[newIndex]);
      setInputUrl(history[newIndex]);
      setIsLoading(true);
    }
  };

  const refresh = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      try {
        iframeRef.current.contentWindow?.location.reload();
      } catch {
        iframeRef.current.src = iframeRef.current.src;
      }
    }
  };

  const openNewTab = () => {
    setCurrentUrl('');
    setInputUrl('');
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push('');
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const openExternal = () => {
    if (currentUrl) {
      window.open(currentUrl.replace('?igu=1', '').replace('&igu=1', ''), '_blank');
    }
  };

  const downloadImageToOS = (imageUrl: string) => {
    if (!imageUrl.trim()) return;
    let filename = imageUrl.split('/').pop()?.split('?')[0] || '';
    if (!filename.includes('.')) {
      filename = `image_${Date.now()}.jpg`;
    }

    const newFile = {
      id: Date.now().toString(),
      name: filename,
      url: imageUrl,
      type: 'image',
      date: new Date().toISOString(),
      size: null,
      source: 'Safari',
    };

    try {
      const existing = JSON.parse(localStorage.getItem('os_downloads') || '[]');
      const updated = [newFile, ...existing.filter((f: any) => f.id !== newFile.id)];
      localStorage.setItem('os_downloads', JSON.stringify(updated));
    } catch {}

    window.dispatchEvent(new CustomEvent('os_file_download', { detail: newFile }));
    addNotification('Safari Downloads', `Downloaded ${filename}`);

    setDownloadStatus({ success: true, filename });
    setTimeout(() => {
      setDownloadStatus(null);
      setShowDownloadModal(false);
      setDownloadUrl('');
    }, 2000);
  };

  // Startpage mountain wallpaper selection adaptive to dark/light theme
  const getStartPageWallpaper = () => {
    if (wallpaperChoice === 'tahoe') {
      return isDarkMode
        ? '/wallpapers/27-golden-gate-night.jpg'
        : '/wallpapers/27-golden-gate-day.jpg';
    }
    // Default: macOS Big Sur Mountain Vector Artwork matching user screenshot
    return isDarkMode
      ? '/Wallpaper/big-sur-mountains-night-dark-macos-big-sur-stock-california-6016x6016-1493.jpg'
      : '/Wallpaper/11-0-Big-Sur-Day-6k.jpg';
  };

  return (
    <div
      className={`w-full h-full flex flex-col overflow-hidden select-none font-[-apple-system,BlinkMacSystemFont,sans-serif] ${
        isDarkMode ? 'bg-[#1e1e20] text-neutral-100' : 'bg-[#f5f5f7] text-neutral-800'
      }`}
    >
      {/* =========================================================
          AUTHENTIC MACOS SAFARI UNIFIED SINGLE-ROW TOOLBAR
          ========================================================= */}
      <div
        data-window-drag
        className={`h-[52px] shrink-0 px-3 flex items-center justify-between border-b transition-colors cursor-default select-none ${
          isDarkMode
            ? 'bg-[#242426]/95 border-white/10 text-neutral-200'
            : 'bg-[#ebebed]/95 border-black/10 text-neutral-700'
        } backdrop-blur-2xl`}
      >
        {/* Left cluster: Traffic Lights + Tab Pill + Navigation + Grid */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Traffic Lights */}
          <div className="flex items-center pr-1">
            <WindowControls appId="safari" />
          </div>

          {/* Active Tab Capsule matching reference screenshot */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold shadow-2xs border transition-all ${
              isDarkMode
                ? 'bg-white/15 border-white/15 text-white hover:bg-white/20'
                : 'bg-white/90 border-black/10 text-neutral-800 hover:bg-white'
            }`}
            title="Active Tab"
          >
            <span className="text-xs">🔨</span>
            <span className="truncate max-w-[130px]">
              {isStartPage ? 'metheuslab' : isYouTube ? 'YouTube' : isGitHub ? 'GitHub' : isApple ? 'Apple' : 'Web Page'}
            </span>
            <FiChevronDown size={11} className="opacity-60 shrink-0" />
          </div>

          {/* Nav Controls Capsule (< >) */}
          <div
            className={`flex items-center rounded-xl p-0.5 border ${
              isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/5'
            }`}
          >
            <button
              onClick={goBack}
              disabled={historyIndex <= 0}
              className={`p-1.5 rounded-lg transition-colors ${
                historyIndex > 0
                  ? isDarkMode
                    ? 'hover:bg-white/15 text-white active:scale-95'
                    : 'hover:bg-black/10 text-neutral-800 active:scale-95'
                  : 'opacity-30 cursor-not-allowed text-neutral-500'
              }`}
              title="Back"
            >
              <FiArrowLeft size={14} />
            </button>
            <button
              onClick={goForward}
              disabled={historyIndex >= history.length - 1}
              className={`p-1.5 rounded-lg transition-colors ${
                historyIndex < history.length - 1
                  ? isDarkMode
                    ? 'hover:bg-white/15 text-white active:scale-95'
                    : 'hover:bg-black/10 text-neutral-800 active:scale-95'
                  : 'opacity-30 cursor-not-allowed text-neutral-500'
              }`}
              title="Forward"
            >
              <FiArrowRight size={14} />
            </button>
          </div>

          {/* Grid / Tab Overview icon */}
          <button
            onClick={() => setCurrentUrl('')}
            className={`p-1.5 rounded-xl transition-colors ${
              isDarkMode ? 'hover:bg-white/10 text-neutral-300' : 'hover:bg-black/5 text-neutral-600'
            }`}
            title="Start Page Grid"
          >
            <FiGrid size={15} />
          </button>
        </div>

        {/* Center: Address Bar (Omnibox Capsule) matching reference screenshot */}
        <div className="flex-1 max-w-[500px] mx-3">
          <form onSubmit={handleFormSubmit} className="relative w-full">
            <div
              className={`flex items-center gap-2 rounded-xl px-3.5 py-1.5 text-xs transition-all border ${
                isFocused
                  ? isDarkMode
                    ? 'bg-[#18181a] border-blue-500/80 ring-2 ring-blue-500/30'
                    : 'bg-white border-blue-500/80 ring-2 ring-blue-500/30'
                  : isDarkMode
                  ? 'bg-[#18181a]/90 border-white/10 hover:border-white/20'
                  : 'bg-white/90 border-black/10 hover:border-black/20 shadow-2xs'
              }`}
            >
              <FiSearch
                size={13}
                className={`shrink-0 ${
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-500'
                }`}
              />
              <input
                type="text"
                value={isFocused ? inputUrl : isStartPage ? '' : currentUrl.replace('?igu=1', '').replace('&igu=1', '')}
                onFocus={() => {
                  setIsFocused(true);
                  setInputUrl(isStartPage ? '' : currentUrl.replace('?igu=1', '').replace('&igu=1', ''));
                }}
                onBlur={() => {
                  setIsFocused(false);
                }}
                onChange={(e) => setInputUrl(e.target.value)}
                placeholder="Search or enter website name"
                className={`w-full bg-transparent outline-none text-xs font-normal text-center focus:text-left ${
                  isDarkMode
                    ? 'text-white placeholder:text-neutral-400'
                    : 'text-neutral-800 placeholder:text-neutral-400'
                }`}
              />

              {!isStartPage && (
                <button
                  type="button"
                  onClick={refresh}
                  className={`p-0.5 rounded transition-transform active:rotate-180 ${
                    isDarkMode ? 'text-neutral-400 hover:text-white' : 'text-neutral-500 hover:text-neutral-900'
                  } ${isLoading ? 'animate-spin' : ''}`}
                  title="Reload"
                >
                  <FiRefreshCw size={12} />
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Right cluster: Action Buttons matching reference screenshot */}
        <div className="flex items-center gap-1 shrink-0">
          {/* New Tab (+) */}
          <button
            onClick={openNewTab}
            className={`p-1.5 rounded-xl transition-colors ${
              isDarkMode ? 'hover:bg-white/10 text-neutral-300' : 'hover:bg-black/5 text-neutral-700'
            }`}
            title="New Tab (Start Page)"
          >
            <FiPlus size={15} />
          </button>

          {/* Reader / Notes */}
          <button
            onClick={() => openApp('bear')}
            className={`p-1.5 rounded-xl transition-colors hidden sm:flex ${
              isDarkMode ? 'hover:bg-white/10 text-neutral-300' : 'hover:bg-black/5 text-neutral-700'
            }`}
            title="Open Notes / Resume"
          >
            <FiBookOpen size={14} />
          </button>

          {/* History */}
          <button
            className={`p-1.5 rounded-xl transition-colors hidden sm:flex ${
              isDarkMode ? 'hover:bg-white/10 text-neutral-300' : 'hover:bg-black/5 text-neutral-700'
            }`}
            title="History"
          >
            <FiClock size={14} />
          </button>

          {/* Bookmarks */}
          <button
            onClick={() => setCurrentUrl('')}
            className={`p-1.5 rounded-xl transition-colors hidden sm:flex ${
              isDarkMode ? 'hover:bg-white/10 text-neutral-300' : 'hover:bg-black/5 text-neutral-700'
            }`}
            title="Favorites"
          >
            <FiStar size={14} />
          </button>

          {/* Privacy Shield */}
          <button
            className={`p-1.5 rounded-xl transition-colors ${
              isDarkMode ? 'hover:bg-white/10 text-neutral-300' : 'hover:bg-black/5 text-neutral-700'
            }`}
            title="Privacy Report"
          >
            <FiShield size={14} />
          </button>

          {/* Share / Open External */}
          <button
            onClick={openExternal}
            className={`p-1.5 rounded-xl transition-colors ${
              isDarkMode ? 'hover:bg-white/10 text-neutral-300' : 'hover:bg-black/5 text-neutral-700'
            }`}
            title="Open in external browser"
          >
            <FiExternalLink size={14} />
          </button>

          {/* Tab Overview */}
          <button
            onClick={openNewTab}
            className={`p-1.5 rounded-xl transition-colors ${
              isDarkMode ? 'hover:bg-white/10 text-neutral-300' : 'hover:bg-black/5 text-neutral-700'
            }`}
            title="Tabs Overview"
          >
            <FiLayers size={14} />
          </button>
        </div>
      </div>

      {/* =========================================================
          SAFARI VIEWPORT CANVAS (Start Page vs Loaded Website)
          ========================================================= */}
      <div className="flex-1 relative flex flex-col w-full h-full overflow-hidden">
        {/* CASE 1: START PAGE (Dynamic Mountain Wallpaper, No App Icons) */}
        {isStartPage ? (
          <div
            className="flex-1 w-full h-full relative flex flex-col justify-between p-8 md:p-12 bg-cover bg-center overflow-y-auto transition-all duration-300"
            style={{
              backgroundImage: `url("${getStartPageWallpaper()}")`,
            }}
          >
            {/* Soft Ambient Overlay for Light/Dark Adaptation */}
            <div
              className={`absolute inset-0 pointer-events-none transition-colors duration-300 ${
                isDarkMode ? 'bg-black/25' : 'bg-white/10'
              }`}
            />

            {/* Top Area: Clean Favorites Header (WITHOUT app icons) */}
            <div className="relative z-10 max-w-4xl space-y-4">
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white drop-shadow-md">
                Favorites
              </h1>

              {/* Clean Frosted Glass Pills (Zero App Logos, Pure Minimalist Elegance) */}
              <div className="flex flex-wrap gap-2.5 pt-1">
                {CLEAN_FAVORITES.map((fav) => (
                  <button
                    key={fav.name}
                    onClick={() => navigate(fav.url)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-white/20 hover:bg-white/35 active:scale-95 backdrop-blur-md border border-white/25 shadow-xs transition-all duration-150 cursor-pointer"
                  >
                    {fav.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom-Right "Edit" Capsule matching reference screenshot */}
            <div className="relative z-10 self-end mt-8">
              <button
                onClick={() => setShowEditMenu(!showEditMenu)}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium text-white/90 hover:text-white bg-black/40 hover:bg-black/60 active:scale-95 backdrop-blur-md border border-white/20 shadow-md flex items-center gap-1.5 transition-all"
              >
                <FiSliders size={12} />
                <span>Edit</span>
              </button>

              {/* Edit Options Popup */}
              {showEditMenu && (
                <div
                  className={`absolute bottom-10 right-0 w-60 rounded-2xl p-3 shadow-2xl border backdrop-blur-2xl z-30 space-y-2 text-xs ${
                    isDarkMode ? 'bg-[#222224]/95 border-white/15 text-white' : 'bg-white/95 border-black/10 text-neutral-800'
                  }`}
                >
                  <div className="flex items-center justify-between pb-1 border-b border-white/10 font-bold">
                    <span>Customize Start Page</span>
                    <button onClick={() => setShowEditMenu(false)} className="p-1 hover:opacity-70">
                      <FiX size={12} />
                    </button>
                  </div>
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-medium opacity-60">Background Image</span>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => setWallpaperChoice('mountain')}
                        className={`p-2 rounded-lg text-left text-[11px] font-medium border ${
                          wallpaperChoice === 'mountain' ? 'border-blue-500 bg-blue-500/20' : 'border-white/10 hover:bg-white/10'
                        }`}
                      >
                        Big Sur Mountains
                      </button>
                      <button
                        onClick={() => setWallpaperChoice('tahoe')}
                        className={`p-2 rounded-lg text-left text-[11px] font-medium border ${
                          wallpaperChoice === 'tahoe' ? 'border-blue-500 bg-blue-500/20' : 'border-white/10 hover:bg-white/10'
                        }`}
                      >
                        Golden Gate
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : isYouTube ? (
          /* CASE 2: YOUTUBE EMBED PLAYER (Zero Refused to Connect Errors) */
          <div className="w-full h-full overflow-hidden bg-neutral-950">
            <YouTubeEmbedView
              initialVideoId={extractVideoId(currentUrl)}
              isDark={true}
            />
          </div>
        ) : isGitHub ? (
          /* CASE 3: GITHUB EXPLORER APP (Zero Refused to Connect Errors) */
          <div className="w-full h-full overflow-y-auto">
            <GitHubApp />
          </div>
        ) : isApple ? (
          /* CASE 4: APPLE SHOWCASE */
          <div
            className={`flex-1 flex flex-col items-center justify-center p-8 text-center ${
              isDarkMode ? 'bg-[#141416] text-white' : 'bg-neutral-50 text-neutral-800'
            }`}
          >
            <div className="w-16 h-16 mb-4 rounded-2xl bg-gradient-to-br from-neutral-700 to-black flex items-center justify-center text-3xl shadow-xl">
              🍎
            </div>
            <h2 className="text-xl font-semibold mb-2">Apple Official Website</h2>
            <p className="text-xs text-neutral-400 max-w-sm mb-6 leading-relaxed">
              Due to Apple&apos;s HTTP security policies (<code className="text-[#0a84ff]">X-Frame-Options: SAMEORIGIN</code>), Apple does not permit direct embedding inside web iframes.
            </p>
            <button
              onClick={openExternal}
              className="px-5 py-2.5 rounded-xl bg-[#0a84ff] hover:bg-[#0071e3] text-white text-xs font-medium flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all active:scale-95"
            >
              Open Apple.com in New Tab <FiExternalLink size={13} />
            </button>
          </div>
        ) : (
          /* CASE 5: WEB PAGE WITH TOP HELPER BAR */
          <div className="flex-1 flex flex-col relative w-full h-full overflow-hidden">
            <div
              className={`flex items-center justify-between px-4 py-1.5 text-[11px] border-b shrink-0 ${
                isDarkMode ? 'bg-[#18181a] border-white/5 text-neutral-400' : 'bg-neutral-100 border-black/5 text-neutral-600'
              }`}
            >
              <span className="truncate max-w-[70%]">
                Viewing: <code className="font-mono text-[10px]">{currentUrl}</code>
              </span>
              <button
                onClick={openExternal}
                className="flex items-center gap-1 font-semibold text-[#0a84ff] hover:underline"
              >
                Open in real tab <FiExternalLink size={11} />
              </button>
            </div>
            <div className="flex-1 relative w-full h-full">
              {isLoading && (
                <div
                  className={`absolute inset-0 flex items-center justify-center z-10 ${
                    isDarkMode ? 'bg-[#1c1c1e]/85' : 'bg-white/85'
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-7 h-7 border-2 border-[#0a84ff] border-t-transparent rounded-full animate-spin" />
                    <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      Connecting…
                    </span>
                  </div>
                </div>
              )}
              <iframe
                ref={iframeRef}
                src={currentUrl}
                onLoad={() => setIsLoading(false)}
                className="w-full h-full border-none"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
                title="Safari Viewport"
              />
            </div>
          </div>
        )}
      </div>

      {/* Download Image to OS Modal */}
      {showDownloadModal && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div
            className={`rounded-2xl shadow-2xl border w-[380px] overflow-hidden ${
              isDarkMode ? 'bg-[#2c2c2e] border-white/15 text-white' : 'bg-white border-black/10 text-gray-800'
            }`}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-black/10 dark:border-white/10">
              <span className="text-xs font-bold flex items-center gap-1.5">
                <FiDownload size={13} className="text-emerald-500" /> Save Image to OS
              </span>
              <button onClick={() => setShowDownloadModal(false)} className="p-1 hover:opacity-70">
                <FiX size={14} />
              </button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); downloadImageToOS(downloadUrl); }} className="p-4 space-y-3">
              <input
                type="url"
                value={downloadUrl}
                onChange={(e) => setDownloadUrl(e.target.value)}
                placeholder="Paste image URL (https://...)"
                className="w-full px-3 py-2 rounded-xl text-xs border outline-none bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/15 focus:border-blue-500"
              />
              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-[#0a84ff] text-white text-xs font-semibold"
              >
                Download Image
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

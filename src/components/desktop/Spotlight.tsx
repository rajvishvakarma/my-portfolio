'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic,
  X,
  Folder,
  Layers,
  Copy,
  Check,
  Moon,
  Sun,
  Lock,
  Wifi,
  ExternalLink,
  FileText,
  Search,
} from 'lucide-react';
import { useDesktopStore } from '@/stores/useDesktopStore';
import { appsData } from '@/data/apps';
import { AppId } from '@/types/desktop';

export const Spotlight: React.FC = () => {
  const {
    spotlightOpen,
    setSpotlightOpen,
    openApp,
    theme,
    toggleTheme,
    setLocked,
    toggleWifi,
    wifi,
    addNotification,
  } = useDesktopStore();

  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'apps' | 'files' | 'actions' | 'clipboard'>('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input on open
  useEffect(() => {
    if (spotlightOpen) {
      setQuery('');
      setActiveCategory('all');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [spotlightOpen]);

  // Handle Cmd+1, Cmd+2, Cmd+3, Cmd+4 inside Spotlight
  useEffect(() => {
    if (!spotlightOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        if (e.key === '1') {
          e.preventDefault();
          setActiveCategory((prev) => (prev === 'apps' ? 'all' : 'apps'));
          setSelectedIndex(0);
        } else if (e.key === '2') {
          e.preventDefault();
          setActiveCategory((prev) => (prev === 'files' ? 'all' : 'files'));
          setSelectedIndex(0);
        } else if (e.key === '3') {
          e.preventDefault();
          setActiveCategory((prev) => (prev === 'actions' ? 'all' : 'actions'));
          setSelectedIndex(0);
        } else if (e.key === '4') {
          e.preventDefault();
          setActiveCategory((prev) => (prev === 'clipboard' ? 'all' : 'clipboard'));
          setSelectedIndex(0);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [spotlightOpen]);

  // Actions list
  const actions = [
    {
      id: 'toggle-theme',
      title: theme === 'dark' ? 'Switch to Light Appearance' : 'Switch to Dark Appearance',
      subtitle: 'System Action',
      icon: theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-indigo-300" />,
      run: () => toggleTheme(),
    },
    {
      id: 'lock-screen',
      title: 'Lock Screen',
      subtitle: 'System Action',
      icon: <Lock size={18} className="text-white/80" />,
      run: () => setLocked(true),
    },
    {
      id: 'toggle-wifi',
      title: wifi ? 'Turn Wi-Fi Off' : 'Turn Wi-Fi On',
      subtitle: 'Network Action',
      icon: <Wifi size={18} className="text-blue-400" />,
      run: () => toggleWifi(),
    },
  ];

  // Clipboard items
  const clipboardItems = [
    {
      id: 'clip-email',
      title: 'rajvishvakarma088@gmail.com',
      subtitle: 'Email Address · Click to Copy',
      text: 'rajvishvakarma088@gmail.com',
    },
    {
      id: 'clip-github',
      title: 'github.com/rajvishvakarma',
      subtitle: 'GitHub Profile · Click to Copy',
      text: 'https://github.com/rajvishvakarma',
    },
    {
      id: 'clip-portfolio',
      title: 'Full Stack & Mobile Engineer Portfolio',
      subtitle: 'Portfolio Summary · Click to Copy',
      text: 'Raj Vishvakarma - Full Stack & Mobile Engineer specializing in Next.js, Flutter, and scalable web apps.',
    },
  ];

  // Files & projects
  const fileItems = [
    {
      id: 'convoy',
      title: 'Just Convoy Project',
      subtitle: 'Flutter & Node.js Logistics Platform',
      icon: '/img/icons/projects.png',
      appId: 'projects' as AppId,
    },
    {
      id: 'resume-doc',
      title: 'Raj_Vishvakarma_Resume.pdf',
      subtitle: 'PDF Document · Curriculum Vitae',
      icon: '/img/icons/resume.png',
      appId: 'resume' as AppId,
    },
    {
      id: 'skills-doc',
      title: 'Technical Skills Matrix',
      subtitle: 'Full Stack & AI Development Stack',
      icon: '/img/icons/skills.png',
      appId: 'skills' as AppId,
    },
  ];

  // Filtered search results
  const q = query.trim().toLowerCase();

  let searchResults: Array<{
    id: string;
    title: string;
    subtitle: string;
    icon?: React.ReactNode | string;
    onSelect: () => void;
  }> = [];

  if (q) {
    // Search Apps
    appsData
      .filter((app) => `${app.title} ${app.dockTitle} ${app.id}`.toLowerCase().includes(q))
      .forEach((app) => {
        searchResults.push({
          id: `app-${app.id}`,
          title: app.dockTitle,
          subtitle: 'Application',
          icon: app.icon,
          onSelect: () => openApp(app.id),
        });
      });

    // Search Files
    fileItems
      .filter((f) => `${f.title} ${f.subtitle}`.toLowerCase().includes(q))
      .forEach((f) => {
        searchResults.push({
          id: `file-${f.id}`,
          title: f.title,
          subtitle: f.subtitle,
          icon: f.icon,
          onSelect: () => openApp(f.appId),
        });
      });

    // Search Actions
    actions
      .filter((a) => a.title.toLowerCase().includes(q))
      .forEach((a) => {
        searchResults.push({
          id: `action-${a.id}`,
          title: a.title,
          subtitle: a.subtitle,
          icon: a.icon,
          onSelect: a.run,
        });
      });
  } else if (activeCategory === 'apps') {
    searchResults = appsData.slice(0, 8).map((app) => ({
      id: `app-${app.id}`,
      title: app.dockTitle,
      subtitle: 'Application',
      icon: app.icon,
      onSelect: () => openApp(app.id),
    }));
  } else if (activeCategory === 'files') {
    searchResults = fileItems.map((f) => ({
      id: `file-${f.id}`,
      title: f.title,
      subtitle: f.subtitle,
      icon: f.icon,
      onSelect: () => openApp(f.appId),
    }));
  } else if (activeCategory === 'actions') {
    searchResults = actions.map((a) => ({
      id: `action-${a.id}`,
      title: a.title,
      subtitle: a.subtitle,
      icon: a.icon,
      onSelect: a.run,
    }));
  } else if (activeCategory === 'clipboard') {
    searchResults = clipboardItems.map((c) => ({
      id: c.id,
      title: c.title,
      subtitle: c.subtitle,
      icon: copiedId === c.id ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} className="text-white/70" />,
      onSelect: () => {
        navigator.clipboard?.writeText(c.text);
        setCopiedId(c.id);
        addNotification('Copied to Clipboard', c.title);
        setTimeout(() => setCopiedId(null), 2000);
      },
    }));
  }

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') {
      setSpotlightOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (searchResults.length > 0) {
        setSelectedIndex((prev) => (prev + 1) % searchResults.length);
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (searchResults.length > 0) {
        setSelectedIndex((prev) => (prev - 1 + searchResults.length) % searchResults.length);
      }
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (searchResults[selectedIndex]) {
        searchResults[selectedIndex].onSelect();
        if (activeCategory !== 'clipboard' || q) {
          setSpotlightOpen(false);
        }
      }
    }
  };

  if (!spotlightOpen) return null;

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[9998] bg-black/40 backdrop-blur-md flex flex-col items-center pt-[14vh] px-4 select-none"
        onMouseDown={() => setSpotlightOpen(false)}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -8 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-[540px] flex flex-col items-center"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {/* Top Capsule Search Bar (Exact liquid glass match to Image 1) */}
          <div
            className="w-full h-[54px] rounded-full px-5 flex items-center gap-3.5 text-white border border-white/20 backdrop-blur-3xl shadow-[0_24px_60px_rgba(0,0,0,0.65),inset_0_1px_1.5px_rgba(255,255,255,0.4)]"
            style={{
              background: 'linear-gradient(180deg, rgba(32, 32, 40, 0.82) 0%, rgba(18, 18, 23, 0.88) 100%)',
            }}
          >
            {/* Luminous Glowing Iridescent Cursor Beam (Exact from Image 1) */}
            <div
              className="w-[2.5px] h-6 rounded-full bg-white shrink-0 animate-pulse"
              style={{
                boxShadow: '0 0 8px rgba(255, 238, 175, 0.95), 0 0 16px rgba(255, 180, 70, 0.75)',
              }}
            />

            {/* Input with exact "Search or Ask" placeholder */}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search or Ask"
              aria-label="Search or Ask"
              className="w-full bg-transparent text-[17px] font-normal text-white outline-none placeholder:text-white/45 tracking-tight"
            />

            {/* Clear Button if query present */}
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  setSelectedIndex(0);
                  inputRef.current?.focus();
                }}
                className="p-1 rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors"
                title="Clear"
              >
                <X size={15} />
              </button>
            )}

            {/* Microphone Icon (Exact from Image 1) */}
            <button
              onClick={() => {
                addNotification('Siri & Voice Search', 'Voice recognition is ready.');
              }}
              className="text-white/65 hover:text-white transition-colors cursor-pointer p-1"
              title="Voice Search"
            >
              <Mic size={19} />
            </button>
          </div>

          {/* Detached Floating Card Below (Exact liquid glass match to Image 1) */}
          <div
            className="w-full mt-3 rounded-[26px] p-2 text-white border border-white/15 backdrop-blur-3xl shadow-[0_30px_70px_rgba(0,0,0,0.7),inset_0_1px_1.5px_rgba(255,255,255,0.25)] overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, rgba(28, 28, 35, 0.78) 0%, rgba(16, 16, 21, 0.85) 100%)',
            }}
          >
            {/* If NO query and NO category selected: Show 4 exact rows from Image 1 */}
            {!query && activeCategory === 'all' && (
              <div className="space-y-0.5">
                {/* 1. Applications (App Store icon, ⌘ 1) */}
                <div
                  onClick={() => {
                    setActiveCategory('apps');
                    setSelectedIndex(0);
                  }}
                  className="flex items-center justify-between px-3.5 py-3 rounded-[16px] hover:bg-white/10 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5">
                    {/* App Store Compass / Tripod 'A' Symbol */}
                    <div className="w-5 h-5 flex items-center justify-center text-white/80 group-hover:text-white">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                        <path d="M12 2L4 18h16L12 2z" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                      </svg>
                    </div>
                    <span className="text-[15px] font-medium text-white/90 group-hover:text-white tracking-tight">
                      Applications
                    </span>
                  </div>
                  <span className="text-[13px] font-mono text-white/40 group-hover:text-white/65 tracking-wider">
                    ⌘ 1
                  </span>
                </div>

                {/* 2. Files (Folder icon, ⌘ 2) */}
                <div
                  onClick={() => {
                    setActiveCategory('files');
                    setSelectedIndex(0);
                  }}
                  className="flex items-center justify-between px-3.5 py-3 rounded-[16px] hover:bg-white/10 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5">
                    <Folder size={19} className="text-white/80 group-hover:text-white" />
                    <span className="text-[15px] font-medium text-white/90 group-hover:text-white tracking-tight">
                      Files
                    </span>
                  </div>
                  <span className="text-[13px] font-mono text-white/40 group-hover:text-white/65 tracking-wider">
                    ⌘ 2
                  </span>
                </div>

                {/* 3. Actions (Layers icon, ⌘ 3) */}
                <div
                  onClick={() => {
                    setActiveCategory('actions');
                    setSelectedIndex(0);
                  }}
                  className="flex items-center justify-between px-3.5 py-3 rounded-[16px] hover:bg-white/10 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5">
                    <Layers size={19} className="text-white/80 group-hover:text-white" />
                    <span className="text-[15px] font-medium text-white/90 group-hover:text-white tracking-tight">
                      Actions
                    </span>
                  </div>
                  <span className="text-[13px] font-mono text-white/40 group-hover:text-white/65 tracking-wider">
                    ⌘ 3
                  </span>
                </div>

                {/* 4. Clipboard (Clipboard / Documents icon, ⌘ 4) */}
                <div
                  onClick={() => {
                    setActiveCategory('clipboard');
                    setSelectedIndex(0);
                  }}
                  className="flex items-center justify-between px-3.5 py-3 rounded-[16px] hover:bg-white/10 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5">
                    <Copy size={19} className="text-white/80 group-hover:text-white" />
                    <span className="text-[15px] font-medium text-white/90 group-hover:text-white tracking-tight">
                      Clipboard
                    </span>
                  </div>
                  <span className="text-[13px] font-mono text-white/40 group-hover:text-white/65 tracking-wider">
                    ⌘ 4
                  </span>
                </div>
              </div>
            )}

            {/* If query IS typed OR a category is active: show search results */}
            {(query || activeCategory !== 'all') && (
              <div className="space-y-1">
                {/* Category back button if inside category and no query */}
                {!query && activeCategory !== 'all' && (
                  <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/10 mb-1">
                    <span className="text-xs uppercase tracking-wider font-semibold text-white/50">
                      {activeCategory}
                    </span>
                    <button
                      onClick={() => setActiveCategory('all')}
                      className="text-xs text-white/60 hover:text-white underline cursor-pointer"
                    >
                      Show All Categories
                    </button>
                  </div>
                )}

                {searchResults.length > 0 ? (
                  searchResults.map((item, index) => {
                    const isSelected = index === selectedIndex;
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          item.onSelect();
                          if (activeCategory !== 'clipboard' || query) {
                            setSpotlightOpen(false);
                          }
                        }}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`flex items-center justify-between px-3.5 py-2.5 rounded-[14px] cursor-pointer transition-colors ${
                          isSelected ? 'bg-white/18 text-white' : 'hover:bg-white/10 text-white/90'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          {typeof item.icon === 'string' ? (
                            <img
                              src={item.icon}
                              alt=""
                              className="w-7 h-7 rounded-lg object-contain shrink-0"
                            />
                          ) : (
                            <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center shrink-0">
                              {item.icon}
                            </div>
                          )}
                          <div className="min-w-0">
                            <div className="font-medium text-[14.5px] truncate text-white">
                              {item.title}
                            </div>
                            <div className="text-[11.5px] text-white/50 truncate">
                              {item.subtitle}
                            </div>
                          </div>
                        </div>

                        {isSelected && (
                          <span className="text-[11px] font-medium text-white/60 px-2 py-0.5 rounded-md bg-white/10 shrink-0">
                            ↵ Return
                          </span>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="py-8 text-center text-white/50 text-sm">
                    No results found for &ldquo;{query}&rdquo;
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

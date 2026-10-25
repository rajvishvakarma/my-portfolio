'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useDesktopStore } from '@/stores/useDesktopStore';

interface MenuDropdownProps {
  menu?: string;
}

export const MenuDropdown: React.FC<MenuDropdownProps> = ({ menu }) => {
  const {
    activeMenuDropdown,
    setActiveMenuDropdown,
    activeWindowId,
    closeWindow,
    maximizeWindow,
    minimizeWindow,
    openApp,
    toggleTheme,
    setWallpaper,
    addNotification,
  } = useDesktopStore();

  const currentMenu = menu || activeMenuDropdown;
  if (!currentMenu) return null;

  const itemClass =
    'w-full flex items-center justify-between px-3 py-1.5 text-left rounded-xl text-[13px] text-white transition-colors hover:bg-white/15 dark:hover:bg-white/15 group select-none';
  const shortcutClass = 'text-[11px] text-white/50 font-mono group-hover:text-white/80';
  const dividerClass = 'my-1 border-t border-white/15';

  return (
    <motion.div
      initial={{ opacity: 0, y: -6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -4, scale: 0.98 }}
      transition={{ duration: 0.12, ease: 'easeOut' }}
      onClick={(e) => e.stopPropagation()}
      className="mac-status-menu absolute top-full left-0 mt-1.5 min-w-[220px] w-56 rounded-[20px] p-2 z-[9999] text-xs text-white select-none space-y-0.5 shadow-2xl"
    >
      {currentMenu === 'File' && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              openApp('finder');
              setActiveMenuDropdown(null);
            }}
            className={itemClass}
          >
            <span>New Finder Window</span>
            <span className={shortcutClass}>⌘N</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (activeWindowId) closeWindow(activeWindowId);
              setActiveMenuDropdown(null);
            }}
            className={itemClass}
          >
            <span>Close Active Window</span>
            <span className={shortcutClass}>⌘W</span>
          </button>
          <div className={dividerClass} />
          <button
            onClick={(e) => {
              e.stopPropagation();
              window.print();
              setActiveMenuDropdown(null);
            }}
            className={itemClass}
          >
            <span>Print…</span>
            <span className={shortcutClass}>⌘P</span>
          </button>
        </>
      )}

      {currentMenu === 'Edit' && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addNotification('Edit', 'Undo simulated.');
              setActiveMenuDropdown(null);
            }}
            className={itemClass}
          >
            <span>Undo</span>
            <span className={shortcutClass}>⌘Z</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addNotification('Edit', 'Redo simulated.');
              setActiveMenuDropdown(null);
            }}
            className={itemClass}
          >
            <span>Redo</span>
            <span className={shortcutClass}>⇧⌘Z</span>
          </button>
          <div className={dividerClass} />
          <button
            onClick={(e) => {
              e.stopPropagation();
              addNotification('Edit', 'Text copied to clipboard.');
              setActiveMenuDropdown(null);
            }}
            className={itemClass}
          >
            <span>Copy</span>
            <span className={shortcutClass}>⌘C</span>
          </button>
        </>
      )}

      {currentMenu === 'View' && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleTheme();
              setActiveMenuDropdown(null);
            }}
            className={itemClass}
          >
            <span>Toggle Dark Mode</span>
            <span className={shortcutClass}>⌥⌘T</span>
          </button>
          <div className={dividerClass} />
          <button
            onClick={(e) => {
              e.stopPropagation();
              setWallpaper('golden-gate');
              setActiveMenuDropdown(null);
            }}
            className={itemClass}
          >
            <span>Switch to Golden Gate Daylight</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setWallpaper('golden-gate-sunset');
              setActiveMenuDropdown(null);
            }}
            className={itemClass}
          >
            <span>Switch to Golden Gate Sunset</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setWallpaper('golden-gate-night');
              setActiveMenuDropdown(null);
            }}
            className={itemClass}
          >
            <span>Switch to Golden Gate Night</span>
          </button>
        </>
      )}

      {currentMenu === 'Window' && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (activeWindowId) minimizeWindow(activeWindowId);
              setActiveMenuDropdown(null);
            }}
            className={itemClass}
          >
            <span>Minimize</span>
            <span className={shortcutClass}>⌘M</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (activeWindowId) maximizeWindow(activeWindowId);
              setActiveMenuDropdown(null);
            }}
            className={itemClass}
          >
            <span>Zoom / Fullscreen</span>
          </button>
          <div className={dividerClass} />
          <button
            onClick={(e) => {
              e.stopPropagation();
              openApp('about');
              setActiveMenuDropdown(null);
            }}
            className={itemClass}
          >
            <span>Bring About to Front</span>
          </button>
        </>
      )}

      {currentMenu === 'Go' && (
        <>
          {([
            ['Recents', 'finder'],
            ['Projects', 'projects'],
            ['Documents', 'resume'],
            ['Applications', 'app-store'],
          ] as const).map(([label, appId]) => (
            <button
              key={label}
              onClick={(e) => {
                e.stopPropagation();
                openApp(appId);
                setActiveMenuDropdown(null);
              }}
              className={itemClass}
            >
              <span>{label}</span>
            </button>
          ))}
        </>
      )}

      {currentMenu === 'Help' && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              openApp('terminal');
              setActiveMenuDropdown(null);
            }}
            className={itemClass}
          >
            <span>macOS Portfolio Guide</span>
          </button>
          <a
            href="https://github.com/rajvishvakarma088-star"
            target="_blank"
            rel="noreferrer"
            className={itemClass}
          >
            <span>GitHub Repository</span>
            <span className={shortcutClass}>↗</span>
          </a>
          <div className={dividerClass} />
          <button
            onClick={(e) => {
              e.stopPropagation();
              openApp('contact');
              setActiveMenuDropdown(null);
            }}
            className={itemClass}
          >
            <span>Contact Raj</span>
          </button>
        </>
      )}
    </motion.div>
  );
};

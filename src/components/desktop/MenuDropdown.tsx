'use client';

import React from 'react';
import { useDesktopStore } from '@/stores/useDesktopStore';

export const MenuDropdown: React.FC = () => {
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

  if (!activeMenuDropdown) return null;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="mac-popover fixed top-8 left-14 w-52 rounded-xl p-1.5 z-[9999] text-xs text-neutral-800 dark:text-neutral-200 select-none space-y-0.5"
    >
      {activeMenuDropdown === 'File' && (
        <>
          <button
            onClick={() => {
              openApp('finder');
              setActiveMenuDropdown(null);
            }}
            className="w-full flex justify-between px-2.5 py-1 text-left rounded-md hover:bg-blue-600 hover:text-white transition-colors"
          >
            <span>New Finder Window</span>
            <span className="text-[10px] opacity-60">⌘N</span>
          </button>
          <button
            onClick={() => {
              if (activeWindowId) closeWindow(activeWindowId);
              setActiveMenuDropdown(null);
            }}
            className="w-full flex justify-between px-2.5 py-1 text-left rounded-md hover:bg-blue-600 hover:text-white transition-colors"
          >
            <span>Close Active Window</span>
            <span className="text-[10px] opacity-60">⌘W</span>
          </button>
          <button
            onClick={() => {
              window.print();
              setActiveMenuDropdown(null);
            }}
            className="w-full flex justify-between px-2.5 py-1 text-left rounded-md hover:bg-blue-600 hover:text-white transition-colors"
          >
            <span>Print...</span>
            <span className="text-[10px] opacity-60">⌘P</span>
          </button>
        </>
      )}

      {activeMenuDropdown === 'Edit' && (
        <>
          <button
            onClick={() => {
              addNotification('Edit', 'Undo simulated.');
              setActiveMenuDropdown(null);
            }}
            className="w-full flex justify-between px-2.5 py-1 text-left rounded-md hover:bg-blue-600 hover:text-white transition-colors"
          >
            <span>Undo</span>
            <span className="text-[10px] opacity-60">⌘Z</span>
          </button>
          <button
            onClick={() => {
              addNotification('Edit', 'Redo simulated.');
              setActiveMenuDropdown(null);
            }}
            className="w-full flex justify-between px-2.5 py-1 text-left rounded-md hover:bg-blue-600 hover:text-white transition-colors"
          >
            <span>Redo</span>
            <span className="text-[10px] opacity-60">⇧⌘Z</span>
          </button>
          <button
            onClick={() => {
              addNotification('Edit', 'Text copied to clipboard.');
              setActiveMenuDropdown(null);
            }}
            className="w-full flex justify-between px-2.5 py-1 text-left rounded-md hover:bg-blue-600 hover:text-white transition-colors"
          >
            <span>Copy</span>
            <span className="text-[10px] opacity-60">⌘C</span>
          </button>
        </>
      )}

      {activeMenuDropdown === 'View' && (
        <>
          <button
            onClick={() => {
              toggleTheme();
              setActiveMenuDropdown(null);
            }}
            className="w-full flex justify-between px-2.5 py-1 text-left rounded-md hover:bg-blue-600 hover:text-white transition-colors"
          >
            <span>Toggle Dark Appearance</span>
            <span className="text-[10px] opacity-60">⌥⌘T</span>
          </button>
          <button
            onClick={() => {
              setWallpaper('tahoe-aerial');
              setActiveMenuDropdown(null);
            }}
            className="w-full px-2.5 py-1 text-left rounded-md hover:bg-blue-600 hover:text-white transition-colors"
          >
            <span>Switch to Tahoe Aerial</span>
          </button>
          <button
            onClick={() => {
              setWallpaper('tahoe-beach-day');
              setActiveMenuDropdown(null);
            }}
            className="w-full px-2.5 py-1 text-left rounded-md hover:bg-blue-600 hover:text-white transition-colors"
          >
            <span>Switch to Beach Day</span>
          </button>
        </>
      )}

      {activeMenuDropdown === 'Window' && (
        <>
          <button
            onClick={() => {
              if (activeWindowId) minimizeWindow(activeWindowId);
              setActiveMenuDropdown(null);
            }}
            className="w-full flex justify-between px-2.5 py-1 text-left rounded-md hover:bg-blue-600 hover:text-white transition-colors"
          >
            <span>Minimize</span>
            <span className="text-[10px] opacity-60">⌘M</span>
          </button>
          <button
            onClick={() => {
              if (activeWindowId) maximizeWindow(activeWindowId);
              setActiveMenuDropdown(null);
            }}
            className="w-full px-2.5 py-1 text-left rounded-md hover:bg-blue-600 hover:text-white transition-colors"
          >
            <span>Zoom / Fullscreen</span>
          </button>
          <button
            onClick={() => {
              openApp('about');
              setActiveMenuDropdown(null);
            }}
            className="w-full px-2.5 py-1 text-left rounded-md hover:bg-blue-600 hover:text-white transition-colors"
          >
            <span>Bring About to Front</span>
          </button>
        </>
      )}

      {activeMenuDropdown === 'Go' && (
        <>
          {([['Recents', 'finder'], ['Projects', 'projects'], ['Documents', 'resume'], ['Applications', 'app-store']] as const).map(([label, appId]) => (
            <button key={label} onClick={() => { openApp(appId); setActiveMenuDropdown(null); }} className="w-full rounded-md px-2.5 py-1 text-left hover:bg-blue-600 hover:text-white">{label}</button>
          ))}
        </>
      )}

      {activeMenuDropdown === 'Help' && (
        <>
          <button
            onClick={() => {
              openApp('terminal');
              setActiveMenuDropdown(null);
            }}
            className="w-full px-2.5 py-1 text-left rounded-md hover:bg-blue-600 hover:text-white transition-colors"
          >
            <span>macOS Portfolio Guide</span>
          </button>
          <a
            href="https://github.com/rajvishvakarma088-star"
            target="_blank"
            rel="noreferrer"
            className="block w-full px-2.5 py-1 text-left rounded-md hover:bg-blue-600 hover:text-white transition-colors"
          >
            <span>GitHub Repository</span>
          </a>
          <button
            onClick={() => {
              openApp('contact');
              setActiveMenuDropdown(null);
            }}
            className="w-full px-2.5 py-1 text-left rounded-md hover:bg-blue-600 hover:text-white transition-colors"
          >
            <span>Contact Raj</span>
          </button>
        </>
      )}
    </div>
  );
};

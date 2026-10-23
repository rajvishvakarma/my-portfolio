'use client';

import React from 'react';
import { useDesktopStore } from '@/stores/useDesktopStore';

export const AppleMenuDropdown: React.FC = () => {
  const {
    appleMenuOpen,
    setAppleMenuOpen,
    setAboutThisMacOpen,
    openApp,
    completeBoot,
    addNotification,
  } = useDesktopStore();

  if (!appleMenuOpen) return null;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed top-7 left-2 w-56 bg-neutral-100/90 dark:bg-[#202020]/90 backdrop-blur-2xl rounded-xl p-1.5 shadow-2xl border border-black/10 dark:border-white/10 z-[9999] text-xs text-neutral-800 dark:text-neutral-200 select-none divide-y divide-black/5 dark:divide-white/5"
    >
      <div className="py-0.5 space-y-0.5">
        <button
          onClick={() => {
            setAboutThisMacOpen(true);
            setAppleMenuOpen(false);
          }}
          className="w-full px-2.5 py-1 text-left rounded-md hover:bg-blue-600 hover:text-white transition-colors"
        >
          About This Mac
        </button>
      </div>

      <div className="py-0.5 space-y-0.5">
        <button
          onClick={() => {
            openApp('settings');
            setAppleMenuOpen(false);
          }}
          className="w-full px-2.5 py-1 text-left rounded-md hover:bg-blue-600 hover:text-white transition-colors"
        >
          System Settings...
        </button>
        <button
          onClick={() => {
            openApp('projects');
            setAppleMenuOpen(false);
          }}
          className="w-full px-2.5 py-1 text-left rounded-md hover:bg-blue-600 hover:text-white transition-colors"
        >
          App Store / Projects...
        </button>
      </div>

      <div className="py-0.5 space-y-0.5">
        <button
          onClick={() => {
            openApp('terminal');
            setAppleMenuOpen(false);
          }}
          className="w-full px-2.5 py-1 text-left rounded-md hover:bg-blue-600 hover:text-white transition-colors"
        >
          Developer Console...
        </button>
      </div>

      <div className="py-0.5 space-y-0.5">
        <button
          onClick={() => {
            setAppleMenuOpen(false);
            addNotification('Sleep Mode', 'Zzz... Entering simulated display idle.');
          }}
          className="w-full px-2.5 py-1 text-left rounded-md hover:bg-blue-600 hover:text-white transition-colors"
        >
          Sleep
        </button>
        <button
          onClick={() => {
            setAppleMenuOpen(false);
            if (typeof window !== 'undefined') window.location.reload();
          }}
          className="w-full px-2.5 py-1 text-left rounded-md hover:bg-blue-600 hover:text-white transition-colors"
        >
          Restart...
        </button>
        <button
          onClick={() => {
            setAppleMenuOpen(false);
            addNotification('Lock Screen', 'Desktop locked. Click anytime to resume.');
          }}
          className="w-full px-2.5 py-1 text-left rounded-md hover:bg-blue-600 hover:text-white transition-colors"
        >
          Lock Screen
        </button>
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  AppWindow,
  Clock3,
  LockKeyhole,
  LogOut,
  Monitor,
  Moon,
  Power,
  RotateCcw,
  Settings,
  XCircle,
} from 'lucide-react';
import { useDesktopStore } from '@/stores/useDesktopStore';

export const AppleMenuDropdown = () => {
  const {
    appleMenuOpen,
    setAppleMenuOpen,
    setAboutThisMacOpen,
    openApp,
    activeWindowId,
    closeWindow,
    addNotification,
    setLocked,
  } = useDesktopStore();

  if (!appleMenuOpen) return null;

  const dismiss = () => setAppleMenuOpen(false);

  const row = (
    label: string,
    Icon: React.ComponentType<{ size?: number }>,
    action: () => void,
    shortcut?: string
  ) => (
    <button
      key={label}
      onClick={(e) => {
        e.stopPropagation();
        action();
        dismiss();
      }}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-1.5 text-left text-[13px] text-white transition-colors hover:bg-white/15 dark:hover:bg-white/15 group select-none"
    >
      <Icon size={15} />
      <span className="flex-1">{label}</span>
      {shortcut && (
        <small className="text-[11px] text-white/50 font-mono group-hover:text-white/80">
          {shortcut}
        </small>
      )}
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: -6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -4, scale: 0.98 }}
      transition={{ duration: 0.12, ease: 'easeOut' }}
      onClick={(event) => event.stopPropagation()}
      className="mac-status-menu absolute top-full left-0 mt-1.5 z-[9999] w-[280px] rounded-[20px] p-2 text-white shadow-2xl select-none space-y-0.5"
    >
      <div>{row('About This Mac', Monitor, () => setAboutThisMacOpen(true))}</div>
      <div className="my-1 border-t border-white/15" />
      <div>
        {row('System Settings…', Settings, () => openApp('settings'))}
        {row('App Store', AppWindow, () => openApp('app-store'))}
      </div>
      <div className="my-1 border-t border-white/15" />
      <div>{row('Recent Items', Clock3, () => openApp('finder'))}</div>
      <div className="my-1 border-t border-white/15" />
      <div>
        {row(
          'Force Quit…',
          XCircle,
          () => activeWindowId && closeWindow(activeWindowId),
          '⌥⌘⎋'
        )}
      </div>
      <div className="my-1 border-t border-white/15" />
      <div>
        {row('Sleep', Moon, () =>
          addNotification('Sleep', 'The portfolio is ready when you return.')
        )}
        {row('Restart…', RotateCcw, () => window.location.reload())}
        {row('Shut Down…', Power, () =>
          addNotification('Shut Down', 'Close this browser tab to leave the portfolio.')
        )}
      </div>
      <div className="my-1 border-t border-white/15" />
      <div>
        {row('Lock Screen', LockKeyhole, () => setLocked(true))}
        {row('Log Out Raj Vishvakarma…', LogOut, () =>
          addNotification('Log Out', 'This portfolio has no account session.')
        )}
      </div>
    </motion.div>
  );
};

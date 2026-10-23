'use client';

import React from 'react';
import { AppWindow, Clock3, LockKeyhole, LogOut, Monitor, Moon, Power, RotateCcw, Settings, XCircle } from 'lucide-react';
import { useDesktopStore } from '@/stores/useDesktopStore';

export const AppleMenuDropdown = () => {
  const { appleMenuOpen, setAppleMenuOpen, setAboutThisMacOpen, openApp, activeWindowId, closeWindow, addNotification } = useDesktopStore();
  if (!appleMenuOpen) return null;

  const dismiss = () => setAppleMenuOpen(false);
  const row = (label: string, Icon: React.ComponentType<{ size?: number }>, action: () => void, shortcut?: string) => <button key={label} onClick={() => { action(); dismiss(); }} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-[13px] transition-colors hover:bg-white/12"><Icon size={15} /><span className="flex-1">{label}</span>{shortcut && <small className="text-[11px] text-white/40">{shortcut}</small>}</button>;

  return <div onClick={(event) => event.stopPropagation()} className="mac-status-menu fixed left-2 top-9 z-[9999] w-[290px] rounded-[20px] p-2 text-white shadow-2xl">
    <div>{row('About This Mac', Monitor, () => setAboutThisMacOpen(true))}</div>
    <div className="my-1 border-t border-white/15" />
    <div>{row('System Settings…', Settings, () => openApp('settings'))}{row('App Store', AppWindow, () => openApp('app-store'))}</div>
    <div className="my-1 border-t border-white/15" />
    <div>{row('Recent Items', Clock3, () => openApp('finder'))}</div>
    <div className="my-1 border-t border-white/15" />
    <div>{row('Force Quit…', XCircle, () => activeWindowId && closeWindow(activeWindowId), '⌥⌘⎋')}</div>
    <div className="my-1 border-t border-white/15" />
    <div>{row('Sleep', Moon, () => addNotification('Sleep', 'The portfolio is ready when you return.'))}{row('Restart…', RotateCcw, () => window.location.reload())}{row('Shut Down…', Power, () => addNotification('Shut Down', 'Close this browser tab to leave the portfolio.'))}</div>
    <div className="my-1 border-t border-white/15" />
    <div>{row('Lock Screen', LockKeyhole, () => addNotification('Lock Screen', 'This is a browser portfolio.'))}{row('Log Out Raj Vishvakarma…', LogOut, () => addNotification('Log Out', 'This portfolio has no account session.'))}</div>
  </div>;
};

'use client';

import React from 'react';
import {
  Wifi,
  Battery,
  Sliders,
  Search,
  Settings,
} from 'lucide-react';
import { useDesktopStore } from '@/stores/useDesktopStore';
import { useClock } from '@/hooks/useClock';
import { AppleMenuDropdown } from './AppleMenuDropdown';
import { MenuDropdown } from './MenuDropdown';
import { DynamicIsland } from './DynamicIsland';
import { getAppMetadata } from '@/data/apps';

export const MenuBar: React.FC = () => {
  const {
    activeWindowId,
    appleMenuOpen,
    setAppleMenuOpen,
    activeMenuDropdown,
    setActiveMenuDropdown,
    controlCenterOpen,
    setControlCenterOpen,
    wifi,
    openApp,
  } = useDesktopStore();

  const { timeString, dateString } = useClock();

  const activeAppMeta = activeWindowId ? getAppMetadata(activeWindowId) : undefined;
  const activeAppName = activeAppMeta ? activeAppMeta.dockTitle : 'Finder';

  const menuItems = ['File', 'Edit', 'View', 'Window', 'Help'];

  return (
    <>
      <header
        style={{
          background: 'rgba(255, 255, 255, 0.14)',
          backdropFilter: 'var(--lg-blur-menu)',
          WebkitBackdropFilter: 'var(--lg-blur-menu)',
          borderBottom: '0.5px solid rgba(255, 255, 255, 0.18)',
        }}
        className="fixed top-0 left-0 right-0 h-7 z-[9990] flex items-center justify-between px-3 text-xs select-none text-neutral-900 dark:text-white font-medium"
      >
        {/* Left Section: Apple Logo + Menus */}
        <div className="flex items-center space-x-1.5">
          {/* Apple Logo */}
          <button
            onClick={() => setAppleMenuOpen(!appleMenuOpen)}
            className={`px-2 py-0.5 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors ${
              appleMenuOpen ? 'bg-black/15 dark:bg-white/20' : ''
            }`}
            title="Apple Menu"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.7-11.7-13.97-5.53-8.47-9.93-18.43-13.19-29.87-3.26-11.44-4.89-22.39-4.89-32.85 0-14.8 3.59-27.13 10.77-36.99 7.18-9.87 16.48-14.88 27.91-15.02 5.01 0 10.45 1.25 16.32 3.75 5.87 2.5 9.94 3.82 12.23 3.96 1.84-.14 6.07-1.5 12.7-4.08 6.64-2.58 12.28-3.76 16.94-3.54 12.98.68 23.3 5.37 30.96 14.07-11.37 6.89-16.95 16.48-16.74 28.77.21 9.87 4.02 18.06 11.43 24.58 7.41 6.51 16.3 10.15 26.68 10.9-2.41 7.29-5.46 14.43-9.16 21.41zM119.22 31.84c0-7.39 2.67-14.42 8.01-21.09 5.34-6.67 11.95-10.75 19.83-12.25.13 1.21.2 2.29.2 3.25 0 7.39-2.73 14.61-8.19 21.66-5.46 7.05-12.16 11.23-20.1 12.54-.14-1.22-.21-2.29-.21-3.25z" />
            </svg>
          </button>

          {/* Active Application Name */}
          <span className="font-bold text-xs px-1.5 tracking-tight">
            {activeAppName}
          </span>

          {/* Menus */}
          <div className="hidden sm:flex items-center space-x-0.5 text-xs text-neutral-800 dark:text-neutral-200">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() =>
                  setActiveMenuDropdown(activeMenuDropdown === item ? null : item)
                }
                className={`px-2 py-0.5 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors ${
                  activeMenuDropdown === item ? 'bg-black/15 dark:bg-white/20' : ''
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Center: Dynamic Island */}
        <div className="hidden md:block">
          <DynamicIsland />
        </div>

        {/* Right Section: Battery + Wi-Fi + Spotlight + Control Center + Clock */}
        <div className="flex items-center space-x-3 text-xs">
          {/* Battery Status */}
          <div className="flex items-center space-x-1.5">
            <span className="text-[11px] font-semibold">100%</span>
            <div className="w-5 h-2.5 rounded-[3px] border border-current p-0.5 flex items-center">
              <div className="w-full h-full bg-emerald-400 rounded-[1px]" />
            </div>
          </div>

          {/* Wi-Fi Icon */}
          <span className="p-0.5" title={wifi ? 'Wi-Fi: Connected' : 'Wi-Fi: Off'}>
            <Wifi size={14} className={wifi ? 'opacity-100' : 'opacity-40'} />
          </span>

          {/* Spotlight Icon */}
          <button
            onClick={() => openApp('finder')}
            className="p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            title="Spotlight Search"
          >
            <Search size={13} />
          </button>

          {/* Control Center Toggle */}
          <button
            onClick={() => setControlCenterOpen(!controlCenterOpen)}
            className={`p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors ${
              controlCenterOpen ? 'bg-black/15 dark:bg-white/20' : ''
            }`}
            title="Control Center"
          >
            <Sliders size={13} className="rotate-90" />
          </button>

          {/* Clock & Date */}
          <div className="flex items-center space-x-1 px-1 font-medium text-xs tracking-tight">
            <span>{dateString}</span>
            <span>{timeString || '1:44 AM'}</span>
          </div>
        </div>
      </header>

      {/* Popovers */}
      <AppleMenuDropdown />
      <MenuDropdown />
    </>
  );
};

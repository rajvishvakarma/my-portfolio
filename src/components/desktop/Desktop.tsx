'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDesktopStore } from '@/stores/useDesktopStore';
import { Wallpaper } from './Wallpaper';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { DesktopIcon } from './DesktopIcon';
import { ControlCenter } from './ControlCenter';
import { NotificationBanner } from './NotificationBanner';
import { AboutThisMacModal } from './AboutThisMacModal';
import { BootScreen } from './BootScreen';
import { LockScreen } from './LockScreen';
import { CalendarWidget } from './CalendarWidget';
import { WeatherWidget } from './WeatherWidget';
import { WidgetsSidebar } from './WidgetsSidebar';
import { WindowManager } from '../windows/WindowManager';
import { MobileDesktop } from '../mobile/MobileDesktop';
import { MediaPlayer } from './MediaPlayer';
import { Spotlight } from './Spotlight';
import { AppId } from '@/types/desktop';
import { appsData } from '@/data/apps';

const DESKTOP_SHORTCUT_IDS: AppId[] = [
  'bear',
  'projects',
  'skills',
  'experience',
  'resume',
  'contact',
  'github',
  'terminal',
];

export const Desktop: React.FC = () => {
  const {
    theme,
    closeAllMenus,
    openApp,
    isLocked,
    isMobile,
    setIsMobile,
    toggleSpotlight,
  } = useDesktopStore();

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, [setIsMobile]);

  // Global Cmd+Space or Ctrl+Space to toggle Spotlight
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.code === 'Space' || e.key === ' ')) {
        e.preventDefault();
        toggleSpotlight();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleSpotlight]);

  const handleDesktopClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    closeAllMenus();
  };

  const desktopIcons = DESKTOP_SHORTCUT_IDS.map((id) =>
    appsData.find((a) => a.id === id)
  ).filter(Boolean);

  return (
    <div
      onClick={handleDesktopClick}
      className={`relative w-screen h-screen overflow-hidden select-none font-sans ${theme === 'dark' ? 'dark' : ''
        }`}
    >
      {/* Background Wallpaper */}
      <Wallpaper />
      <MediaPlayer />

      {/* Lock Screen (first screen on open) */}
      <LockScreen />

      {/* Boot Animation Screen */}
      <BootScreen />

      {/* Notification Toast Banners */}
      <NotificationBanner />

      {/* About This Mac Modal */}
      <AboutThisMacModal />

      {/* Desktop Workspace with Smooth macOS Unlock Transition */}
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.98,
          filter: 'blur(16px)',
        }}
        animate={{
          opacity: isLocked ? 0 : 1,
          scale: isLocked ? 0.98 : 1,
          filter: isLocked ? 'blur(16px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="w-full h-full pointer-events-auto"
        style={{ pointerEvents: isLocked ? 'none' : 'auto' }}
      >
        {isMobile ? (
          /* Dedicated Mobile App Launcher */
          <MobileDesktop />
        ) : (
          /* Full macOS Desktop Experience */
          <>
            {/* Top Menu Bar */}
            <MenuBar />

            {/* Top Left Desktop Widgets (Calendar & Weather from screenshot) */}
            <div className="absolute top-10 left-5 flex items-start space-x-3.5 z-10 pointer-events-auto hidden md:flex">
              <CalendarWidget />
              <WeatherWidget />
            </div>

            {/* Top Right Desktop Folder for Resume (Matches Image 3) */}
            <div className="absolute top-12 right-6 z-10 pointer-events-auto flex flex-col items-center select-none">
              <div
                onClick={() => openApp('resume')}
                onDoubleClick={() => openApp('resume')}
                className="group flex flex-col items-center cursor-pointer p-2 rounded-xl hover:bg-white/10 transition-all duration-150 text-center"
                title="My Resume · Click to open"
              >
                <div className="w-16 h-16 relative mb-1 transition-transform duration-150 group-active:scale-95 group-hover:scale-105">
                  <img
                    src="/img/icons/mac-folder.png?v=5"
                    alt=""
                    className="w-full h-full object-contain drop-shadow-[0_6px_12px_rgba(0,0,0,0.5)]"
                  />
                </div>

                {/* Clean label: My Resume */}
                <div className="px-2 py-0.5 rounded-sm">
                  <span className="text-[13px] font-medium text-white tracking-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.95)]">
                    My Resume
                  </span>
                </div>
              </div>
            </div>

            {/* Window Management Layer */}
            <div className="absolute inset-0 pointer-events-none z-20">
              <WindowManager />
            </div>

            {/* Floating Liquid Glass Bottom Dock */}
            <Dock />
          </>
        )}
      </motion.div>

      {/* Control Center Modal (Desktop & Mobile) */}
      <ControlCenter />

      {/* Widgets Sidebar / Notification Center (Desktop & Mobile) */}
      <WidgetsSidebar />

      {/* Liquid Glass Spotlight (Desktop mode) */}
      <Spotlight />
    </div>
  );
};

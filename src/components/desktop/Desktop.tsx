'use client';

import React, { useState, useEffect } from 'react';
import { useDesktopStore } from '@/stores/useDesktopStore';
import { Wallpaper } from './Wallpaper';
import { MenuBar } from './MenuBar';
import { Dock } from './Dock';
import { DesktopIcon } from './DesktopIcon';
import { ControlCenter } from './ControlCenter';
import { NotificationBanner } from './NotificationBanner';
import { AboutThisMacModal } from './AboutThisMacModal';
import { BootScreen } from './BootScreen';
import { CalendarWidget } from './CalendarWidget';
import { WeatherWidget } from './WeatherWidget';
import { WindowManager } from '../windows/WindowManager';
import { MobileDesktop } from '../mobile/MobileDesktop';
import { MediaPlayer } from './MediaPlayer';
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
    setSelectedDesktopIcon,
    setAppleMenuOpen,
    setActiveMenuDropdown,
    setControlCenterOpen,
  } = useDesktopStore();

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkViewport();
    window.addEventListener('resize', checkViewport);
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  const handleDesktopClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) return;
    setSelectedDesktopIcon(null);
    setAppleMenuOpen(false);
    setActiveMenuDropdown(null);
    setControlCenterOpen(false);
  };

  const desktopIcons = DESKTOP_SHORTCUT_IDS.map((id) =>
    appsData.find((a) => a.id === id)
  ).filter(Boolean);

  return (
    <div
      onClick={handleDesktopClick}
      className={`relative w-screen h-screen overflow-hidden select-none font-sans ${
        theme === 'dark' ? 'dark' : ''
      }`}
    >
      {/* Background Wallpaper */}
      <Wallpaper />
      <MediaPlayer />

      {/* Boot Animation Screen */}
      <BootScreen />

      {/* Notification Toast Banners */}
      <NotificationBanner />

      {/* About This Mac Modal */}
      <AboutThisMacModal />

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

          {/* Control Center Modal */}
          <ControlCenter />

          {/* Window Management Layer */}
          <div className="absolute inset-0 pointer-events-none z-20">
            <div className="pointer-events-auto w-full h-full">
              <WindowManager />
            </div>
          </div>

          {/* Floating Liquid Glass Bottom Dock */}
          <Dock />
        </>
      )}
    </div>
  );
};

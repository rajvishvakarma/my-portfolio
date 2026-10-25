'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wifi,
  Battery,
  BatteryCharging,
  Bluetooth,
  CirclePlay,
  Clock3,
  PawPrint,
  Sliders,
  Search,
  X,
} from 'lucide-react';
import { useDesktopStore } from '@/stores/useDesktopStore';
import { useClock } from '@/hooks/useClock';
import { AppleMenuDropdown } from './AppleMenuDropdown';
import { MenuDropdown } from './MenuDropdown';
import { DynamicIsland } from './DynamicIsland';
import { getAppMetadata } from '@/data/apps';
import { appsData } from '@/data/apps';
import { useMediaStore } from '@/stores/useMediaStore';

export const MenuBar: React.FC = () => {
  const {
    activeWindowId,
    appleMenuOpen,
    setAppleMenuOpen,
    activeMenuDropdown,
    setActiveMenuDropdown,
    controlCenterOpen,
    setControlCenterOpen,
    widgetsOpen,
    setWidgetsOpen,
    statusMenu,
    setStatusMenu,
    selectedDesktopIcon,
    closeAllMenus,
    wifi,
    toggleWifi,
    bluetooth,
    toggleBluetooth,
    openApp,
    spotlightOpen,
    setSpotlightOpen,
    toggleSpotlight,
  } = useDesktopStore();

  const { timeString, dateString } = useClock();
  const [battery, setBattery] = useState<{ level: number; charging: boolean } | null>(null);
  const mediaToggle = useMediaStore((state) => state.toggle);
  const mediaPlaying = useMediaStore((state) => state.playing);

  useEffect(() => {
    const nav = navigator as Navigator & { getBattery?: () => Promise<{ level: number; charging: boolean }> };
    nav.getBattery?.().then((result) => setBattery({ level: Math.round(result.level * 100), charging: result.charging })).catch(() => {});
  }, []);

  // Global click outside and escape listener
  useEffect(() => {
    const isAnyMenuOpen = Boolean(
      statusMenu ||
      controlCenterOpen ||
      widgetsOpen ||
      appleMenuOpen ||
      activeMenuDropdown ||
      selectedDesktopIcon ||
      spotlightOpen
    );

    if (!isAnyMenuOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      // Click inside any open dropdown/popover/modal/sidebar? Keep open
      if (
        target.closest('.mac-status-menu') ||
        target.closest('.mac-popover') ||
        target.closest('.control-center') ||
        target.closest('aside')
      ) {
        return;
      }

      // Click on a menu bar button or bar? Let the button onClick handle toggle/switching
      if (target.closest('.mac-menu-bar')) {
        return;
      }

      // Click on a desktop shortcut icon? Let DesktopIcon manage it
      if (target.closest('[data-desktop-icon]')) {
        return;
      }

      // Clicked outside! Close all menus and deselect icons
      closeAllMenus();
      setSpotlightOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeAllMenus();
        setSpotlightOpen(false);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [
    statusMenu,
    controlCenterOpen,
    appleMenuOpen,
    activeMenuDropdown,
    selectedDesktopIcon,
    spotlightOpen,
    closeAllMenus,
  ]);

  const activeAppMeta = activeWindowId ? getAppMetadata(activeWindowId) : undefined;
  const activeAppName = activeAppMeta ? activeAppMeta.dockTitle : 'Finder';

  const menuItems = ['File', 'Edit', 'View', 'Go', 'Window', 'Help'];

  return (
    <>
      <header
        onClick={(e) => {
          if (e.target === e.currentTarget) closeAllMenus();
        }}
        className="mac-menu-bar fixed top-0 left-0 right-0 h-8 z-[9990] flex items-center justify-between px-3 text-xs select-none text-white font-medium"
      >
        {/* Left Section: Apple Logo + Menus */}
        <div className="flex items-center gap-1">
          {/* Apple Logo */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                const willOpen = !appleMenuOpen;
                closeAllMenus();
                setSpotlightOpen(false);
                if (willOpen) setAppleMenuOpen(true);
              }}
              className={`px-2 py-0.5 rounded-md transition-colors text-white ${
                appleMenuOpen
                  ? 'bg-white/20 backdrop-blur-md'
                  : 'hover:bg-white/15'
              }`}
              title="Apple Menu"
            >
              <svg className="w-[14px] h-[17px] fill-current" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929 0.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.378 0-10.857 2.346-20.221 7.045-28.068 3.693-6.303 8.606-11.275 14.755-14.925s12.793-5.51 19.948-5.629c3.915 0 9.049 1.211 15.429 3.591 6.362 2.388 10.447 3.599 12.238 3.599 1.339 0 5.877-1.416 13.57-4.239 7.275-2.618 13.415-3.702 18.445-3.275 13.63 1.1 23.87 6.473 30.68 16.153-12.19 7.386-18.22 17.731-18.1 31.002 0.11 10.337 3.86 18.939 11.23 25.769 3.34 3.17 7.07 5.62 11.22 7.36-0.9 2.61-1.85 5.11-2.86 7.51zM119.11 7.24c0 8.102-2.96 15.667-8.86 22.669-7.12 8.324-15.732 13.134-25.071 12.375-0.119-0.972-0.188-1.995-0.188-3.07 0-7.778 3.386-16.102 9.399-22.908 3.002-3.446 6.82-6.311 11.45-8.597 4.62-2.252 8.99-3.497 13.1-3.71 0.12 1.083 0.17 2.166 0.17 3.241z"/>
              </svg>
            </button>
            <AppleMenuDropdown />
          </div>

          {/* Active Application Name */}
          <span className="font-bold text-xs px-1.5 tracking-tight text-white">
            {activeAppName}
          </span>

          {/* Menus */}
          <div className="hidden sm:flex items-center space-x-0.5 text-xs text-white">
            {menuItems.map((item) => (
              <div key={item} className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const willOpen = activeMenuDropdown !== item;
                    closeAllMenus();
                    setSpotlightOpen(false);
                    if (willOpen) setActiveMenuDropdown(item);
                  }}
                  className={`px-2.5 py-0.5 rounded-md transition-colors text-white ${
                    activeMenuDropdown === item
                      ? 'bg-white/20 backdrop-blur-md'
                      : 'hover:bg-white/15'
                  }`}
                >
                  {item}
                </button>
                {activeMenuDropdown === item && <MenuDropdown menu={item} />}
              </div>
            ))}
          </div>
        </div>

        {/* Center: Dynamic Island */}
        <div className="hidden md:block">
          <DynamicIsland />
        </div>

        {/* Right Section: Battery + Wi-Fi + Spotlight + Control Center + Clock */}
        <div className="flex items-center gap-1.5 text-xs text-white">
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeAllMenus();
              setSpotlightOpen(false);
              openApp('about');
            }}
            className="hidden rounded-md p-1 hover:bg-white/15 md:block transition-colors text-white"
            title="About Raj"
          >
            <PawPrint size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeAllMenus();
              setSpotlightOpen(false);
              openApp('clock');
            }}
            className="hidden rounded-md p-1 hover:bg-white/15 md:block transition-colors text-white"
            title="Clock"
          >
            <Clock3 size={16} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeAllMenus();
              setSpotlightOpen(false);
              mediaToggle();
            }}
            className="hidden rounded-md p-1 hover:bg-white/15 md:block transition-colors text-white"
            title={mediaPlaying ? 'Pause music' : 'Play music'}
          >
            <CirclePlay size={16} className={mediaPlaying ? 'text-green-400' : ''} />
          </button>

          {/* Battery Status Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const willOpen = statusMenu !== 'battery';
              closeAllMenus();
              setSpotlightOpen(false);
              if (willOpen) setStatusMenu('battery');
            }}
            className={`flex items-center gap-1 rounded-md px-1.5 py-0.5 hover:bg-white/15 transition-colors text-white ${
              statusMenu === 'battery' ? 'bg-white/20' : ''
            }`}
            title="Battery status"
          >
            <span className="text-[11px] font-medium">{battery ? `${battery.level}%` : '100%'}</span>
            {battery?.charging ? <BatteryCharging size={17} /> : <Battery size={17} />}
          </button>

          {/* Wi-Fi Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const willOpen = statusMenu !== 'wifi';
              closeAllMenus();
              setSpotlightOpen(false);
              if (willOpen) setStatusMenu('wifi');
            }}
            className={`rounded-md p-1 hover:bg-white/15 transition-colors text-white ${
              statusMenu === 'wifi' ? 'bg-white/20' : ''
            }`}
            title={wifi ? 'Wi-Fi: On' : 'Wi-Fi: Off'}
          >
            <Wifi size={14} className={wifi ? 'opacity-100' : 'opacity-40'} />
          </button>

          {/* Bluetooth Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeAllMenus();
              setSpotlightOpen(false);
              toggleBluetooth();
            }}
            className="hidden rounded-md p-1 hover:bg-white/15 sm:block transition-colors text-white"
            title={bluetooth ? 'Bluetooth: On' : 'Bluetooth: Off'}
          >
            <Bluetooth size={15} className={bluetooth ? '' : 'opacity-40'} />
          </button>

          {/* Spotlight Icon */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSpotlight();
            }}
            className={`p-1 rounded-md hover:bg-white/15 transition-colors text-white ${
              spotlightOpen ? 'bg-white/20' : ''
            }`}
            title="Spotlight Search (⌘ Space)"
          >
            <Search size={13} />
          </button>

          {/* Control Center Toggle */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              const willOpen = !controlCenterOpen;
              closeAllMenus();
              setSpotlightOpen(false);
              if (willOpen) setControlCenterOpen(true);
            }}
            className={`px-2 py-0.5 rounded-[7px] transition-all flex items-center justify-center ${
              controlCenterOpen
                ? 'bg-white/20 backdrop-blur-md text-white shadow-sm'
                : 'hover:bg-white/15 text-white'
            }`}
            title="Control Center"
          >
            <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M3.25 2C1.73122 2 0.5 3.23122 0.5 4.75C0.5 6.26878 1.73122 7.5 3.25 7.5H11.75C13.2688 7.5 14.5 6.26878 14.5 4.75C14.5 3.23122 13.2688 2 11.75 2H3.25ZM11.75 3.5H3.25C2.55964 3.5 2 4.05964 2 4.75C2 5.44036 2.55964 6 3.25 6H11.75C12.4404 6 13 5.44036 13 4.75C13 4.05964 12.4404 3.5 11.75 3.5Z" />
              <path d="M4.25 3.5C3.55964 3.5 3 4.05964 3 4.75C3 5.44036 3.55964 6 4.25 6H5.25C5.94036 6 6.5 5.44036 6.5 4.75C6.5 4.05964 5.94036 3.5 5.25 3.5H4.25Z" />
              <path fillRule="evenodd" clipRule="evenodd" d="M3.25 8.5C1.73122 8.5 0.5 9.73122 0.5 11.25C0.5 12.7688 1.73122 14 3.25 14H11.75C13.2688 14 14.5 12.7688 14.5 11.25C14.5 9.73122 13.2688 8.5 11.75 8.5H3.25ZM12.75 11.25C12.75 11.9404 12.1904 12.5 11.5 12.5C10.8096 12.5 10.25 11.9404 10.25 11.25C10.25 10.5596 10.8096 10 11.5 10C12.1904 10 12.75 10.5596 12.75 11.25Z" />
            </svg>
          </button>

          {/* Clock & Date (Toggles Widgets Sidebar) */}
          <div
            onClick={(e) => {
              e.stopPropagation();
              const willOpen = !widgetsOpen;
              closeAllMenus();
              setSpotlightOpen(false);
              if (willOpen) setWidgetsOpen(true);
            }}
            className={`flex items-center gap-1 px-1 font-medium text-xs tracking-tight whitespace-nowrap cursor-pointer rounded-md transition-colors text-white ${
              widgetsOpen ? 'bg-white/20' : 'hover:bg-white/15'
            }`}
            title="Widgets & Notification Center"
          >
            <span>{dateString}</span>
            <span>{timeString || '1:44 AM'}</span>
          </div>
        </div>
      </header>

      {/* Battery / Wi-Fi Status Menu */}
      <AnimatePresence>
        {statusMenu && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.12, ease: 'easeOut' }}
            onClick={(e) => e.stopPropagation()}
            className="mac-status-menu fixed right-14 top-9 z-[9999] w-72 rounded-[20px] p-4 text-sm text-white select-none shadow-2xl"
          >
            {statusMenu === 'wifi' ? (
              <>
                <div className="flex items-center justify-between">
                  <strong className="text-sm font-semibold">Wi-Fi</strong>
                  <button
                    aria-label="Toggle Wi-Fi"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWifi();
                    }}
                    className={`h-6 w-11 rounded-full p-0.5 transition-colors ${
                      wifi ? 'bg-blue-500' : 'bg-white/20'
                    }`}
                  >
                    <span
                      className={`block h-5 w-5 rounded-full bg-white transition-transform ${
                        wifi ? 'translate-x-5' : ''
                      }`}
                    />
                  </button>
                </div>
                <p className="mt-4 text-xs text-white/65">
                  {wifi ? 'Portfolio connection is on' : 'Wi-Fi is off'}
                </p>
                <div className="mt-4 border-t border-white/15 pt-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeAllMenus();
                      openApp('settings');
                    }}
                    className="text-xs font-semibold hover:underline"
                  >
                    Wi-Fi Settings…
                  </button>
                </div>
              </>
            ) : (
              <>
                <strong className="text-sm font-semibold">Battery</strong>
                <p className="mt-4 text-xs text-white/75">
                  {battery
                    ? `${battery.level}% ${battery.charging ? '· Charging' : '· On battery'}`
                    : '100% · Charging'}
                </p>
                <div className="mt-4 border-t border-white/15 pt-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      closeAllMenus();
                      openApp('settings');
                    }}
                    className="text-xs font-semibold hover:underline"
                  >
                    Battery Settings…
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

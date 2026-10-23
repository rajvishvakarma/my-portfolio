'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
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
    wifi,
    toggleWifi,
    bluetooth,
    toggleBluetooth,
    openApp,
  } = useDesktopStore();

  const { timeString, dateString } = useClock();
  const [statusMenu, setStatusMenu] = useState<'wifi' | 'battery' | null>(null);
  const [spotlightOpen, setSpotlightOpen] = useState(false);
  const [spotlightQuery, setSpotlightQuery] = useState('');
  const [battery, setBattery] = useState<{ level: number; charging: boolean } | null>(null);
  const mediaToggle = useMediaStore((state) => state.toggle);
  const mediaPlaying = useMediaStore((state) => state.playing);

  useEffect(() => {
    const nav = navigator as Navigator & { getBattery?: () => Promise<{ level: number; charging: boolean }> };
    nav.getBattery?.().then((result) => setBattery({ level: Math.round(result.level * 100), charging: result.charging })).catch(() => {});
  }, []);

  const activeAppMeta = activeWindowId ? getAppMetadata(activeWindowId) : undefined;
  const activeAppName = activeAppMeta ? activeAppMeta.dockTitle : 'Finder';

  const menuItems = ['File', 'Edit', 'View', 'Go', 'Window', 'Help'];
  const spotlightResults = appsData.filter((app) => `${app.dockTitle} ${app.id}`.toLowerCase().includes(spotlightQuery.toLowerCase())).slice(0, 7);
  const openSpotlightResult = (id: typeof appsData[number]['id']) => {
    openApp(id);
    setSpotlightOpen(false);
    setSpotlightQuery('');
  };

  return (
    <>
      <header className="mac-menu-bar fixed top-0 left-0 right-0 h-8 z-[9990] flex items-center justify-between px-3 text-xs select-none text-neutral-900 dark:text-white font-medium">
        {/* Left Section: Apple Logo + Menus */}
        <div className="flex items-center gap-1">
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
        <div className="flex items-center gap-1.5 text-xs">
          <button onClick={() => openApp('about')} className="hidden rounded-md p-1 hover:bg-white/15 md:block" title="About Raj"><PawPrint size={16} /></button>
          <button onClick={() => openApp('clock')} className="hidden rounded-md p-1 hover:bg-white/15 md:block" title="Clock"><Clock3 size={16} /></button>
          <button onClick={mediaToggle} className="hidden rounded-md p-1 hover:bg-white/15 md:block" title={mediaPlaying ? 'Pause music' : 'Play music'}><CirclePlay size={16} className={mediaPlaying ? 'text-green-400' : ''} /></button>
          <button onClick={() => setStatusMenu(statusMenu === 'battery' ? null : 'battery')} className="flex items-center gap-1 rounded-md px-1 py-0.5 hover:bg-white/15" title="Battery status"><span className="text-[11px]">{battery ? `${battery.level}%` : ''}</span>{battery?.charging ? <BatteryCharging size={17} /> : <Battery size={17} />}</button>
          {/* Wi-Fi Icon */}
          <button onClick={() => setStatusMenu(statusMenu === 'wifi' ? null : 'wifi')} className="rounded-md p-1 hover:bg-white/15" title={wifi ? 'Wi-Fi: On' : 'Wi-Fi: Off'}>
            <Wifi size={14} className={wifi ? 'opacity-100' : 'opacity-40'} />
          </button>
          <button onClick={toggleBluetooth} className="hidden rounded-md p-1 hover:bg-white/15 sm:block" title={bluetooth ? 'Bluetooth: On' : 'Bluetooth: Off'}><Bluetooth size={15} className={bluetooth ? '' : 'opacity-40'} /></button>

          {/* Spotlight Icon */}
          <button
            onClick={() => { setSpotlightOpen(!spotlightOpen); setSpotlightQuery(''); }}
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
          <div className="flex items-center gap-1 px-1 font-medium text-xs tracking-tight whitespace-nowrap">
            <span>{dateString}</span>
            <span>{timeString || '1:44 AM'}</span>
          </div>
        </div>
      </header>

      {/* Popovers */}
      <AppleMenuDropdown />
      <MenuDropdown />
      {spotlightOpen && <div className="fixed inset-0 z-[9998] bg-black/15" onMouseDown={() => setSpotlightOpen(false)}>
        <div className="mac-status-menu mx-auto mt-[13vh] w-[min(620px,calc(100vw-32px))] overflow-hidden rounded-[22px] p-0 text-white" onMouseDown={(event) => event.stopPropagation()}>
          <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4"><Search size={22} className="text-white/70" /><input autoFocus value={spotlightQuery} onChange={(event) => setSpotlightQuery(event.target.value)} onKeyDown={(event) => { if (event.key === 'Escape') setSpotlightOpen(false); if (event.key === 'Enter' && spotlightResults[0]) openSpotlightResult(spotlightResults[0].id); }} placeholder="Spotlight Search" aria-label="Spotlight Search" className="w-full bg-transparent text-xl outline-none placeholder:text-white/45" /></div>
          <div className="p-2">{spotlightResults.length ? spotlightResults.map((app) => <button key={app.id} onClick={() => openSpotlightResult(app.id)} className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm hover:bg-white/15"><Image src={app.icon} alt="" width={28} height={28} className="rounded-md" />{app.dockTitle}</button>) : <p className="px-3 py-4 text-sm text-white/60">No results</p>}</div>
        </div>
      </div>}
      {statusMenu && <div className="mac-status-menu fixed right-14 top-9 z-[9999] w-72 rounded-[20px] p-4 text-sm text-white">
        {statusMenu === 'wifi' ? <><div className="flex items-center justify-between"><strong>Wi-Fi</strong><button aria-label="Toggle Wi-Fi" onClick={toggleWifi} className={`h-6 w-11 rounded-full p-0.5 transition-colors ${wifi ? 'bg-blue-500' : 'bg-white/20'}`}><span className={`block h-5 w-5 rounded-full bg-white transition-transform ${wifi ? 'translate-x-5' : ''}`} /></button></div><p className="mt-4 text-xs text-white/65">{wifi ? 'Portfolio connection is on' : 'Wi-Fi is off'}</p><div className="mt-4 border-t border-white/15 pt-3"><button onClick={() => { openApp('settings'); setStatusMenu(null); }} className="text-xs font-semibold hover:underline">Wi-Fi Settings…</button></div></> : <><strong>Battery</strong><p className="mt-4 text-xs text-white/75">{battery ? `${battery.level}% ${battery.charging ? '· Charging' : '· On battery'}` : 'Battery status is unavailable in this browser.'}</p><div className="mt-4 border-t border-white/15 pt-3"><button onClick={() => { openApp('settings'); setStatusMenu(null); }} className="text-xs font-semibold hover:underline">Battery Settings…</button></div></>}
      </div>}
    </>
  );
};

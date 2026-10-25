'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeft,
  X,
  Battery,
  Wifi,
  Sun,
  Moon,
  Sparkles,
} from 'lucide-react';
import { useDesktopStore } from '@/stores/useDesktopStore';
import { appsData } from '@/data/apps';
import { profile } from '@/data/profile';
import { AppId } from '@/types/desktop';
import { useClock } from '@/hooks/useClock';

// App contents
import { BearApp } from '../applications/BearApp';
import { FinderApp } from '../applications/FinderApp';
import { AboutApp } from '../applications/AboutApp';
import { ProjectsApp } from '../applications/ProjectsApp';
import { SkillsApp } from '../applications/SkillsApp';
import { ExperienceApp } from '../applications/ExperienceApp';
import { ResumeApp } from '../applications/ResumeApp';
import { ContactApp } from '../applications/ContactApp';
import { TerminalApp } from '../applications/TerminalApp';
import { GitHubApp } from '../applications/GitHubApp';
import { TrashApp } from '../applications/TrashApp';
import { SettingsApp } from '../applications/SettingsApp';
import { WorkspaceApps } from '../applications/WorkspaceApps';
import { CalculatorApp } from '../applications/CalculatorApp';
import { ChromeApp } from '../applications/ChromeApp';
import { SafariApp } from '../applications/SafariApp';
import { MusicWorkspace } from '../applications/MusicWorkspace';
import { VSCodeApp } from '../applications/VSCodeApp';
import { AppStoreApp } from '../applications/AppStoreApp';
import { PhotosApp } from '../applications/PhotosApp';
import { MessagesApp } from '../applications/MessagesApp';
import { FaceTimeApp } from '../applications/FaceTimeApp';
import { MailApp } from '../applications/MailApp';
import { MapsApp } from '../applications/MapsApp';
import { CalendarApp } from '../applications/CalendarApp';
import { ContactsApp } from '../applications/ContactsApp';
import { RemindersApp } from '../applications/RemindersApp';
import { PhoneApp } from '../applications/PhoneApp';
import { TextEditApp } from '../applications/TextEditApp';

export const MobileDesktop: React.FC = () => {
  const {
    windows,
    activeWindowId,
    openApp,
    closeWindow,
    theme,
    toggleTheme,
    wifi,
    controlCenterOpen,
    setControlCenterOpen,
    widgetsOpen,
    setWidgetsOpen,
    closeAllMenus,
  } = useDesktopStore();

  const { timeString } = useClock();

  // Find active open window if any
  const activeWindow = activeWindowId ? windows[activeWindowId] : null;
  const isAnyAppOpen = activeWindow && activeWindow.isOpen && !activeWindow.isMinimized;

  const renderActiveAppContent = (id: AppId) => {
    switch (id) {
      case 'bear':
        return <BearApp />;
      case 'finder':
        return <FinderApp />;
      case 'about':
        return <AboutApp />;
      case 'projects':
        return <ProjectsApp />;
      case 'skills':
        return <SkillsApp />;
      case 'experience':
        return <ExperienceApp />;
      case 'resume':
        return <ResumeApp />;
      case 'contact':
        return <ContactApp />;
      case 'terminal':
        return <TerminalApp />;
      case 'github':
        return <GitHubApp />;
      case 'chrome':
        return <ChromeApp />;
      case 'safari':
        return <SafariApp />;
      case 'music':
        return <MusicWorkspace variant="music" />;
      case 'spotify':
        return <MusicWorkspace variant="spotify" />;
      case 'vscode':
        return <VSCodeApp />;
      case 'app-store':
        return <AppStoreApp />;
      case 'photos':
        return <PhotosApp />;
      case 'messages':
        return <MessagesApp />;
      case 'facetime':
        return <FaceTimeApp />;
      case 'mail':
        return <MailApp />;
      case 'maps':
        return <MapsApp />;
      case 'calendar':
        return <CalendarApp />;
      case 'contacts':
        return <ContactsApp />;
      case 'reminders':
        return <RemindersApp />;
      case 'phone':
        return <PhoneApp />;
      case 'textedit':
        return <TextEditApp />;
      case 'trash':
        return <TrashApp />;
      case 'settings':
        return <SettingsApp />;
      case 'calculator':
        return <CalculatorApp />;
      default:
        return <WorkspaceApps id={id} />;
    }
  };

  // Filter out YouTube from mobile apps
  const mobileApps = appsData.filter((app) => app.id !== 'youtube');

  return (
    <div
      onClick={closeAllMenus}
      className="relative w-full h-full h-[100dvh] flex flex-col justify-between overflow-hidden text-white select-none"
    >
      {/* Mobile Top Status Bar */}
      <div className="h-10 px-4 flex items-center justify-between text-xs font-semibold z-50 bg-black/25 backdrop-blur-md border-b border-white/5 shrink-0">
        {/* Left side: Time + indicator that opens Widgets / Notification section */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setWidgetsOpen(!widgetsOpen);
          }}
          className="flex items-center gap-1.5 py-1 px-2.5 -ml-1.5 rounded-full bg-white/5 hover:bg-white/15 active:scale-95 transition-all text-xs font-semibold cursor-pointer border border-white/10"
          title="Open Widgets & Notifications"
          aria-label="Open Widgets and Notifications"
        >
          <span>{timeString || '9:41'}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
        </button>

        {/* Right side: Wifi & Battery that opens Control Center */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setControlCenterOpen(!controlCenterOpen);
          }}
          className="flex items-center space-x-2 py-1 px-2.5 -mr-1.5 rounded-full bg-white/5 hover:bg-white/15 active:scale-95 transition-all cursor-pointer border border-white/10"
          title="Open Control Center"
          aria-label="Open Control Center"
        >
          <Wifi size={13} className={wifi ? 'opacity-100' : 'opacity-40'} />
          <Battery size={15} className="text-emerald-400 fill-emerald-400" />
        </button>
      </div>

      {/* Main Home Screen Grid (Scrollable without pushing dock off-screen) */}
      <div className="flex-1 min-h-0 overflow-y-auto px-4 pt-3 pb-4 space-y-4 z-10 no-scrollbar">
        {/* Profile Card Widget on Home Screen - Click to view Bear intro card */}
        <div
          onClick={() => openApp('bear')}
          className="p-4 rounded-3xl bg-black/40 backdrop-blur-2xl border border-white/10 flex items-center space-x-3.5 shadow-xl cursor-pointer active:scale-[0.98] transition-all hover:bg-black/50 hover:border-white/20 select-none group"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openApp('bear');
            }
          }}
          title="Raj Vishvakarma · Click to view intro"
        >
          <div className="w-13 h-13 rounded-2xl overflow-hidden border border-white/20 relative shrink-0 group-hover:scale-105 transition-transform">
            <Image src={profile.avatar} alt={profile.name} fill className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-bold text-sm text-white truncate group-hover:text-blue-300 transition-colors">
              {profile.name}
            </h2>
            <p className="text-xs text-blue-400 font-medium">{profile.role}</p>
            <p className="text-[11px] text-neutral-300 truncate mt-0.5">{profile.location}</p>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleTheme();
            }}
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors active:scale-90 shrink-0"
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>

        {/* Mobile App Grid */}
        <div className="grid grid-cols-4 gap-y-4 gap-x-2 justify-items-center">
          {mobileApps.map((app) => (
            <button
              key={app.id}
              onClick={() => openApp(app.id)}
              className="flex flex-col items-center space-y-1.5 focus:outline-none group active:scale-90 transition-transform"
            >
              <div className="w-14 h-14 rounded-2xl p-2 bg-black/30 backdrop-blur-xl border border-white/15 shadow-md flex items-center justify-center relative">
                <Image src={app.icon} alt={app.dockTitle} fill className="object-contain p-2" />
              </div>
              <span className="text-[11px] font-medium text-white text-center leading-tight truncate max-w-16 drop-shadow-sm">
                {app.dockTitle}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Floating Quick Dock - Always visible, locked at bottom with safe area */}
      <div className="shrink-0 w-full px-4 pt-2 pb-[max(1rem,env(safe-area-inset-bottom))] flex justify-center z-20">
        <div className="px-5 py-2.5 rounded-3xl bg-black/45 backdrop-blur-2xl border border-white/15 flex items-center space-x-5 shadow-2xl">
          {['finder', 'bear', 'safari', 'projects', 'contact'].map((appId) => {
            const app = appsData.find((a) => a.id === appId);
            if (!app) return null;
            return (
              <button
                key={app.id}
                onClick={() => openApp(app.id)}
                className="w-11 h-11 relative active:scale-90 transition-transform"
                title={app.title}
              >
                <Image src={app.icon} alt={app.dockTitle} fill className="object-contain" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Full-Screen App Modal Sheet on Mobile */}
      <AnimatePresence>
        {isAnyAppOpen && activeWindow && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 320 }}
            className="fixed inset-0 z-[9990] flex flex-col bg-white dark:bg-[#1a1a1a] text-neutral-900 dark:text-neutral-100 overflow-hidden"
          >
            {/* Top Navigation Bar with Back / Close Button */}
            <div className="h-12 px-4 border-b border-black/10 dark:border-white/10 flex items-center justify-between bg-neutral-100/90 dark:bg-[#242424]/90 backdrop-blur-md shrink-0">
              <button
                onClick={() => closeWindow(activeWindow.id)}
                className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 font-semibold text-xs active:opacity-70 py-1"
              >
                <ChevronLeft size={18} />
                <span>Home</span>
              </button>

              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 relative">
                  <Image src={activeWindow.icon} alt="" fill className="object-contain" />
                </div>
                <span className="font-bold text-xs truncate max-w-40">{activeWindow.title}</span>
              </div>

              <button
                onClick={() => closeWindow(activeWindow.id)}
                className="p-1 rounded-full bg-black/5 dark:bg-white/10 text-neutral-500 hover:text-neutral-900 dark:hover:text-white"
                title="Close"
              >
                <X size={15} />
              </button>
            </div>

            {/* Mobile App Body */}
            <div className="flex-1 overflow-hidden relative">
              {renderActiveAppContent(activeWindow.id)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

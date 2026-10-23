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

export const MobileDesktop: React.FC = () => {
  const {
    windows,
    activeWindowId,
    openApp,
    closeWindow,
    theme,
    toggleTheme,
    wifi,
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

  const mobileApps = appsData;

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden text-white select-none">
      {/* Mobile Top Status Bar */}
      <div className="h-10 px-5 flex items-center justify-between text-xs font-semibold z-50 bg-black/20 backdrop-blur-md">
        <span>{timeString || '9:41'}</span>
        <div className="flex items-center space-x-2">
          <Wifi size={14} className={wifi ? 'opacity-100' : 'opacity-40'} />
          <Battery size={16} className="text-emerald-400 fill-emerald-400" />
        </div>
      </div>

      {/* Main Home Screen Grid (When no app is currently open full-screen) */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col justify-center space-y-8 z-10">
        {/* Profile Card Widget on Home Screen */}
        <div className="p-4 rounded-3xl bg-black/40 backdrop-blur-2xl border border-white/10 flex items-center space-x-4 shadow-xl">
          <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/20 relative shrink-0">
            <Image src={profile.avatar} alt={profile.name} fill className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="font-bold text-sm text-white truncate">{profile.name}</h2>
            <p className="text-xs text-blue-400 font-medium">{profile.role}</p>
            <p className="text-[11px] text-neutral-300 truncate mt-0.5">{profile.location}</p>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            title="Toggle theme"
          >
            {theme === 'dark' ? <Moon size={15} /> : <Sun size={15} />}
          </button>
        </div>

        {/* Mobile App Grid */}
        <div className="grid grid-cols-4 gap-y-6 gap-x-2 justify-items-center">
          {mobileApps.map((app) => (
            <button
              key={app.id}
              onClick={() => openApp(app.id)}
              className="flex flex-col items-center space-y-1.5 focus:outline-none group active:scale-95 transition-transform"
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

      {/* Bottom Floating Quick Dock */}
      <div className="p-4 flex justify-center z-20">
        <div className="px-5 py-2.5 rounded-3xl bg-black/40 backdrop-blur-2xl border border-white/15 flex items-center space-x-5 shadow-2xl">
          {['finder', 'about', 'projects', 'contact'].map((appId) => {
            const app = appsData.find((a) => a.id === appId)!;
            return (
              <button
                key={app.id}
                onClick={() => openApp(app.id)}
                className="w-11 h-11 relative active:scale-90 transition-transform"
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
                className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 font-semibold text-xs active:opacity-70"
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
                className="p-1 rounded-full bg-black/5 dark:bg-white/10 text-neutral-500"
              >
                <X size={15} />
              </button>
            </div>

            {/* Mobile App Body */}
            <div className="flex-1 overflow-hidden">
              {renderActiveAppContent(activeWindow.id)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

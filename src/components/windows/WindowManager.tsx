'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useDesktopStore } from '@/stores/useDesktopStore';
import { WindowFrame } from './WindowFrame';
import { AppId } from '@/types/desktop';

// Applications
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
import { CalculatorApp } from '../applications/CalculatorApp';
import { SafariApp } from '../applications/SafariApp';
import { ChromeApp } from '../applications/ChromeApp';
import { MessagesApp } from '../applications/MessagesApp';
import { MapsApp } from '../applications/MapsApp';
import { FaceTimeApp } from '../applications/FaceTimeApp';
import { MailApp } from '../applications/MailApp';
import { CalendarApp } from '../applications/CalendarApp';
import { RemindersApp } from '../applications/RemindersApp';
import { ContactsApp } from '../applications/ContactsApp';
import { PhoneApp } from '../applications/PhoneApp';
import { TextEditApp } from '../applications/TextEditApp';
import { PhotosApp } from '../applications/PhotosApp';
import { AppStoreApp } from '../applications/AppStoreApp';
import { VSCodeApp } from '../applications/VSCodeApp';
import { WorkspaceApps } from '../applications/WorkspaceApps';
import { YouTubeEmbedView } from '../applications/YouTubeEmbedView';

const renderAppContent = (id: AppId) => {
  switch (id) {
    case 'vscode':
      return <VSCodeApp />;
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
    case 'safari':
      return <SafariApp />;
    case 'chrome':
      return <ChromeApp />;
    case 'youtube':
      return <YouTubeEmbedView isDark={true} />;
    case 'messages':
      return <MessagesApp />;
    case 'maps':
      return <MapsApp />;
    case 'facetime':
      return <FaceTimeApp />;
    case 'mail':
      return <MailApp />;
    case 'calendar':
      return <CalendarApp />;
    case 'reminders':
      return <RemindersApp />;
    case 'contacts':
      return <ContactsApp />;
    case 'phone':
      return <PhoneApp />;
    case 'textedit':
      return <TextEditApp />;
    case 'photos':
      return <PhotosApp />;
    case 'trash':
      return <TrashApp />;
    case 'settings':
      return <SettingsApp />;
    case 'calculator':
      return <CalculatorApp />;
    case 'app-store':
      return <AppStoreApp />;
    default:
      return <WorkspaceApps id={id} />;
  }
};

export const WindowManager: React.FC = () => {
  const { windows, closeAllMenus, updateWindowPosition } = useDesktopStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Center bear window on client mount according to current window size
    if (typeof window !== 'undefined') {
      const bear = windows['bear'];
      if (bear && bear.isOpen) {
        const cx = Math.max(20, Math.round((window.innerWidth - bear.size.width) / 2));
        const cy = Math.max(38, Math.round((window.innerHeight - bear.size.height) / 2) - 40);
        updateWindowPosition('bear', { x: cx, y: cy });
      }
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeAllMenus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeAllMenus]);

  if (!mounted) return null;

  return (
    <AnimatePresence mode="popLayout">
      {Object.values(windows)
        .filter((w) => w.isOpen && !w.isMinimized)
        .map((windowState) => (
          <WindowFrame key={windowState.id} windowState={windowState}>
            {renderAppContent(windowState.id)}
          </WindowFrame>
        ))}
    </AnimatePresence>
  );
};

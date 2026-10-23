'use client';

import React, { useEffect } from 'react';
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

const renderAppContent = (id: AppId) => {
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
      return <BearApp />;
  }
};

export const WindowManager: React.FC = () => {
  const { windows, setControlCenterOpen, setAppleMenuOpen, setActiveMenuDropdown } = useDesktopStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setControlCenterOpen(false);
        setAppleMenuOpen(false);
        setActiveMenuDropdown(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setControlCenterOpen, setAppleMenuOpen, setActiveMenuDropdown]);

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

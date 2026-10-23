'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { AppId } from '@/types/desktop';
import { appsData } from '@/data/apps';
import { useDesktopStore } from '@/stores/useDesktopStore';

const DOCK_APP_IDS: AppId[] = [
  'finder',
  'bear',
  'typora',
  'safari',
  'vscode',
  'facetime',
  'terminal',
  'spotify',
  'siri',
  'calculator',
  'settings',
  'notes',
  'music',
  'maps',
  'messages',
  'photos',
  'clock',
  'mail',
  'app-store',
  'github',
];

interface DockItemProps {
  id: AppId;
  title: string;
  icon: string;
  mouseX: any;
}

const DockItem: React.FC<DockItemProps> = ({ id, title, icon, mouseX }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const { windows, openApp, focusWindow, minimizeWindow, activeWindowId } = useDesktopStore();

  const windowState = windows[id];
  const isOpen = windowState?.isOpen;
  const isMinimized = windowState?.isMinimized;
  const isActive = activeWindowId === id;

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Smooth magnification curve: base 42px up to 60px
  const widthSync = useTransform(distance, [-120, 0, 120], [42, 60, 42]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 200, damping: 14 });

  const handleClick = () => {
    if (isMinimized) {
      focusWindow(id);
    } else if (isOpen) {
      if (isActive) {
        minimizeWindow(id);
      } else {
        focusWindow(id);
      }
    } else {
      openApp(id);
    }
  };

  return (
    <motion.div
      ref={ref}
      style={{ width }}
      onClick={handleClick}
      onMouseEnter={() => setTooltipVisible(true)}
      onMouseLeave={() => setTooltipVisible(false)}
      className="relative flex flex-col items-center justify-end aspect-square cursor-pointer active:scale-90 transition-transform origin-bottom"
    >
      {/* Tooltip */}
      {tooltipVisible && (
        <div
          style={{
            background: 'var(--lg-bg-tinted)',
            backdropFilter: 'var(--lg-blur-light)',
            WebkitBackdropFilter: 'var(--lg-blur-light)',
            border: 'var(--lg-border-strong)',
            boxShadow: 'var(--shadow-tooltip), var(--lg-inner-highlight)',
          }}
          className="absolute -top-10 px-2.5 py-1 rounded-md text-[11px] font-medium text-neutral-900 dark:text-white pointer-events-none whitespace-nowrap z-50 select-none"
        >
          {title}
        </div>
      )}

      {/* App Icon */}
      <div className="w-full h-full relative p-0.5">
        <Image
          src={icon}
          alt={title}
          fill
          sizes="60px"
          className="object-contain drop-shadow-[0_6px_10px_rgba(0,0,0,0.32)] select-none"
        />
      </div>

      {/* Active Indicator Dot (White circle under open app like screenshot) */}
      {isOpen && (
        <span
          className={`w-1 h-1 rounded-full mb-0.5 transition-colors ${
            isMinimized ? 'bg-white/40' : 'bg-white shadow-[0_0_4px_white]'
          }`}
        />
      )}
    </motion.div>
  );
};

export const Dock: React.FC = () => {
  const mouseX = useMotionValue(Infinity);

  const dockApps = DOCK_APP_IDS.map((id) => {
    const app = appsData.find((a) => a.id === id);
    return app!;
  }).filter(Boolean);

  return (
    <div className="fixed bottom-2.5 left-0 right-0 flex justify-center z-[9980] pointer-events-none select-none px-2">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        style={{
          background: 'var(--lg-bg-dock)',
          backdropFilter: 'var(--lg-blur-heavy)',
          WebkitBackdropFilter: 'var(--lg-blur-heavy)',
          border: 'var(--lg-border)',
          borderTop: '0.5px solid rgba(255, 255, 255, 0.45)',
          boxShadow: 'var(--shadow-dock), var(--lg-inner-highlight)',
        }}
        className="pointer-events-auto h-15 px-3 py-1.5 rounded-[22px] flex items-end space-x-1.5 overflow-visible max-w-full"
      >
        {dockApps.map((app) => (
          <DockItem
            key={app.id}
            id={app.id}
            title={app.dockTitle}
            icon={app.icon}
            mouseX={mouseX}
          />
        ))}
      </motion.div>
    </div>
  );
};

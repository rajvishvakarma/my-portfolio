'use client';

import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from 'framer-motion';
import { AppId } from '@/types/desktop';
import { appsData } from '@/data/apps';
import { useDesktopStore } from '@/stores/useDesktopStore';

const dockOrder: AppId[] = [
  'finder', 'bear', 'typora', 'safari', 'vscode', 'facetime', 'terminal',
  'spotify', 'siri', 'calculator', 'settings', 'notes', 'music', 'maps',
  'messages', 'photos', 'clock', 'mail', 'app-store', 'github',
];
const dockApps = dockOrder.map((id) => appsData.find((app) => app.id === id)!).filter(Boolean);

interface DockItemProps {
  id: AppId;
  title: string;
  icon: string;
  mouseX: MotionValue<number>;
  baseSize: number;
}

const DockItem: React.FC<DockItemProps> = ({ id, title, icon, mouseX, baseSize }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 });
  const { windows, openApp, focusWindow, minimizeWindow, activeWindowId } = useDesktopStore();

  const windowState = windows[id];
  const isOpen = windowState?.isOpen;
  const isMinimized = windowState?.isMinimized;
  const isActive = activeWindowId === id;

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-130, -80, -40, 0, 40, 80, 130], [baseSize, baseSize + 7, baseSize + 20, baseSize + 34, baseSize + 20, baseSize + 7, baseSize]);
  const width = useSpring(widthSync, { mass: 0.08, stiffness: 350, damping: 22 });

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
      onMouseEnter={() => {
        const bounds = ref.current?.getBoundingClientRect();
        if (bounds) setTooltipPosition({ left: bounds.left + bounds.width / 2, top: bounds.top - 34 });
        setTooltipVisible(true);
      }}
      onMouseLeave={() => setTooltipVisible(false)}
      role="button"
      tabIndex={0}
      aria-label={`Open ${title}`}
      onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); handleClick(); } }}
      className="relative mb-1 flex shrink-0 items-center justify-center aspect-square cursor-pointer active:scale-90 transition-transform origin-bottom"
    >
      {/* Tooltip */}
      {tooltipVisible && typeof document !== 'undefined' && createPortal((
        <div
          style={{
            position: 'fixed',
            left: tooltipPosition.left,
            top: tooltipPosition.top,
            transform: 'translateX(-50%)',
            background: 'var(--lg-bg-tinted)',
            backdropFilter: 'var(--lg-blur-light)',
            WebkitBackdropFilter: 'var(--lg-blur-light)',
            border: 'var(--lg-border-strong)',
            boxShadow: 'var(--shadow-tooltip), var(--lg-inner-highlight)',
          }}
          className="px-2.5 py-1 rounded-md text-[11px] font-medium text-neutral-900 dark:text-white pointer-events-none whitespace-nowrap z-[9999] select-none"
        >
          {title}
        </div>
      ), document.body)}

      {/* App Icon */}
      <div className="relative h-full w-full">
        <Image
          src={icon}
          alt={title}
          fill
          sizes="50px"
          className="object-contain drop-shadow-[0_4px_7px_rgba(0,0,0,0.2)] select-none"
        />
      </div>

      {/* Active Indicator Dot (White circle under open app like screenshot) */}
      {isOpen && (
        <span
          className={`absolute -bottom-1.5 h-1 w-1 rounded-full transition-colors ${
            isMinimized ? 'bg-white/40' : 'bg-white shadow-[0_0_4px_white]'
          }`}
        />
      )}
    </motion.div>
  );
};

export const Dock: React.FC = () => {
  const mouseX = useMotionValue(Infinity);
  const [baseSize, setBaseSize] = React.useState(40);
  React.useEffect(() => {
    const resize = () => setBaseSize(window.innerWidth >= 1600 ? 54 : window.innerWidth >= 1200 ? 44 : window.innerWidth >= 1000 ? 36 : 31);
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div className="fixed bottom-2.5 left-0 right-0 flex justify-center z-[9980] pointer-events-none select-none px-2">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        style={{ height: baseSize + 20 }}
        className="liquid-glass-dock pointer-events-auto flex max-w-full items-end gap-[3px] overflow-visible rounded-[24px] px-2.5 py-1.5"
      >
        {dockApps.map((app) => <React.Fragment key={app.id}>
          {app.id === 'github' && <span aria-hidden="true" className="mx-1 h-9 w-px shrink-0 self-center bg-neutral-700/25 dark:bg-white/30" />}
          <DockItem id={app.id} title={app.dockTitle} icon={app.icon} mouseX={mouseX} baseSize={baseSize} />
        </React.Fragment>)}
      </motion.div>
    </div>
  );
};

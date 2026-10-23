'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { WindowState } from '@/types/desktop';
import { useDesktopStore } from '@/stores/useDesktopStore';
import { WindowControls } from './WindowControls';

interface WindowFrameProps {
  windowState: WindowState;
  children: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({ windowState, children }) => {
  const {
    id,
    title,
    icon,
    isOpen,
    isMinimized,
    isMaximized,
    position,
    size,
    minSize,
    zIndex,
  } = windowState;

  const {
    activeWindowId,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
    maximizeWindow,
  } = useDesktopStore();

  const isFocused = activeWindowId === id;
  const frameRef = useRef<HTMLDivElement>(null);

  // Dragging state
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // Resizing state
  const isResizing = useRef(false);
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 });

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    focusWindow(id);

    if (isMaximized) return;

    isDragging.current = true;
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isDragging.current) return;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const newX = Math.min(
        Math.max(-size.width + 100, moveEvent.clientX - dragOffset.current.x),
        viewportWidth - 100
      );
      const newY = Math.min(
        Math.max(30, moveEvent.clientY - dragOffset.current.y),
        viewportHeight - 120
      );

      updateWindowPosition(id, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    focusWindow(id);

    if (isMaximized) return;

    isResizing.current = true;
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      w: size.width,
      h: size.height,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isResizing.current) return;

      const deltaX = moveEvent.clientX - resizeStart.current.x;
      const deltaY = moveEvent.clientY - resizeStart.current.y;

      const newWidth = Math.max(minSize.width, resizeStart.current.w + deltaX);
      const newHeight = Math.max(minSize.height, resizeStart.current.h + deltaY);

      updateWindowSize(id, { width: newWidth, height: newHeight });
    };

    const handleMouseUp = () => {
      isResizing.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  // Window titlebar color: for Bear, it has that iconic pastel blue/teal header from screenshot
  const isBear = id === 'bear';
  const titleBarBg = isBear
    ? 'rgba(125, 167, 197, 0.85)'
    : 'var(--window-bar-bg)';

  return (
    <motion.div
      ref={frameRef}
      initial={{ opacity: 0, scale: 0.65, y: 100, borderRadius: 28 }}
      animate={{ opacity: 1, scale: 1, y: 0, borderRadius: isMaximized ? 0 : 14 }}
      exit={{
        opacity: [1, 0.6, 0],
        scale: 0.25,
        y: 280,
        borderRadius: 28,
        transition: {
          duration: 0.35,
          ease: [0.32, 0.72, 0, 1],
          opacity: { times: [0, 0.6, 1], ease: 'easeOut' },
        },
      }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onMouseDown={() => focusWindow(id)}
      style={{
        left: isMaximized ? 0 : `${position.x}px`,
        top: isMaximized ? 28 : `${position.y}px`,
        width: isMaximized ? '100vw' : `${size.width}px`,
        height: isMaximized ? 'calc(100vh - 28px)' : `${size.height}px`,
        transformOrigin: '50% 100%',
        zIndex: zIndex,
        boxShadow: isMaximized
          ? 'none'
          : isFocused
          ? 'var(--shadow-window-focused), var(--lg-inner-highlight-strong)'
          : 'var(--shadow-window), var(--lg-inner-highlight)',
        border: isMaximized ? 'none' : 'var(--lg-border-subtle)',
        borderTop: isMaximized ? 'none' : isFocused ? '0.5px solid rgba(255,255,255,0.5)' : '0.5px solid rgba(255,255,255,0.3)',
      }}
      className={`fixed overflow-hidden flex flex-col select-none ${
        isMaximized ? 'rounded-none' : 'rounded-[14px]'
      }`}
    >
      {/* Liquid Glass Title Bar */}
      <div
        onMouseDown={handleTitleBarMouseDown}
        onDoubleClick={() => maximizeWindow(id)}
        style={{
          backgroundColor: titleBarBg,
          backdropFilter: 'var(--lg-blur-menu)',
          WebkitBackdropFilter: 'var(--lg-blur-menu)',
        }}
        className="h-8.5 px-3.5 flex items-center justify-between border-b border-black/10 dark:border-white/10 cursor-grab active:cursor-grabbing select-none"
      >
        {/* Left: Traffic Lights */}
        <div className="flex items-center w-24">
          <WindowControls appId={id} />
        </div>

        {/* Center: Title */}
        <div className="flex items-center space-x-1.5 truncate pointer-events-none">
          <span
            className={`text-[13px] font-medium tracking-tight truncate ${
              isBear
                ? 'text-neutral-800 font-semibold'
                : isFocused
                ? 'text-neutral-800 dark:text-neutral-100'
                : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            {title}
          </span>
        </div>

        {/* Right dummy spacer */}
        <div className="w-24" />
      </div>

      {/* Window Content Shell */}
      <div className="flex-1 overflow-hidden relative bg-white dark:bg-[#1a1a1a]">
        {children}
      </div>

      {/* Corner Resize Handle */}
      {!isMaximized && (
        <div
          onMouseDown={handleResizeMouseDown}
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize flex items-end justify-end p-0.5 z-20 group"
          title="Resize window"
        >
          <div className="w-1.5 h-1.5 border-r border-b border-neutral-400 dark:border-neutral-500 group-hover:border-blue-500" />
        </div>
      )}
    </motion.div>
  );
};

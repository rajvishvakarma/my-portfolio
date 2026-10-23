'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
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
  const responsiveWidth = `min(${size.width}px, calc(100vw - 100px))`;
  const responsiveHeight = `min(${size.height}px, calc(100vh - 108px))`;

  // Dragging state
  const isDragging = useRef(false);
  const dragOffset = useRef({ x: 0, y: 0 });

  // Resizing state
  const isResizing = useRef(false);
  const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 });

  const handleTitleBarMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, input')) return;
    focusWindow(id);

    if (isMaximized) return;

    isDragging.current = true;
    const bounds = frameRef.current?.getBoundingClientRect();
    let nextX = bounds?.left ?? position.x;
    let nextY = bounds?.top ?? position.y;
    dragOffset.current = {
      x: e.clientX - nextX,
      y: e.clientY - nextY,
    };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isDragging.current) return;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const newX = Math.min(
        Math.max(0, moveEvent.clientX - dragOffset.current.x),
        viewportWidth - 140
      );
      const newY = Math.min(
        Math.max(32, moveEvent.clientY - dragOffset.current.y),
        viewportHeight - 80
      );

      nextX = newX;
      nextY = newY;
      if (frameRef.current) {
        frameRef.current.style.left = `${newX}px`;
        frameRef.current.style.top = `${newY}px`;
      }
    };

    const handleMouseUp = () => {
      isDragging.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      updateWindowPosition(id, { x: nextX, y: nextY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleResizeMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    focusWindow(id);

    if (isMaximized) return;

    isResizing.current = true;
    const bounds = frameRef.current?.getBoundingClientRect();
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      w: bounds?.width ?? size.width,
      h: bounds?.height ?? size.height,
    };
    let nextWidth = resizeStart.current.w;
    let nextHeight = resizeStart.current.h;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isResizing.current) return;

      const deltaX = moveEvent.clientX - resizeStart.current.x;
      const deltaY = moveEvent.clientY - resizeStart.current.y;

      const newWidth = Math.max(minSize.width, resizeStart.current.w + deltaX);
      const newHeight = Math.max(minSize.height, resizeStart.current.h + deltaY);

      nextWidth = newWidth;
      nextHeight = newHeight;
      if (frameRef.current) {
        frameRef.current.style.width = `${newWidth}px`;
        frameRef.current.style.height = `${newHeight}px`;
      }
    };

    const handleMouseUp = () => {
      isResizing.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      updateWindowSize(id, { width: nextWidth, height: nextHeight });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <motion.div
      ref={frameRef}
      initial={{ opacity: 0, scale: 0.975, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.985, y: 5, transition: { duration: 0.12, ease: 'easeIn' } }}
      transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
      onMouseDown={(event) => {
        focusWindow(id);
        if (id === 'finder' && (event.target as HTMLElement).closest('[data-window-drag]') && !(event.target as HTMLElement).closest('button, input')) handleTitleBarMouseDown(event);
      }}
      style={{
        left: isMaximized ? 0 : position.x,
        top: isMaximized ? 32 : position.y,
        width: isMaximized ? '100vw' : responsiveWidth,
        height: isMaximized ? 'calc(100vh - 32px)' : responsiveHeight,
        transformOrigin: '50% 50%',
        zIndex: zIndex,
        boxShadow: isMaximized
          ? 'none'
          : isFocused
          ? 'var(--shadow-window-focused), var(--lg-inner-highlight-strong)'
          : 'var(--shadow-window), var(--lg-inner-highlight)',
        border: isMaximized ? 'none' : 'var(--lg-border-subtle)',
        borderTop: isMaximized ? 'none' : isFocused ? '0.5px solid rgba(255,255,255,0.5)' : '0.5px solid rgba(255,255,255,0.3)',
      }}
      className={`mac-window fixed overflow-hidden flex flex-col select-none ${
        isMaximized ? 'rounded-none' : 'rounded-[22px]'
      }`}
    >
      {/* Liquid Glass Title Bar */}
      {id !== 'finder' && <div
        onMouseDown={handleTitleBarMouseDown}
        onDoubleClick={() => maximizeWindow(id)}
        className="mac-window-toolbar h-[42px] shrink-0 px-3.5 flex items-center justify-between cursor-grab active:cursor-grabbing select-none"
      >
        {/* Left: Traffic Lights */}
        <div className="flex items-center w-24">
          <WindowControls appId={id} />
        </div>

        {/* Center: Title */}
        <div className="flex items-center space-x-1.5 truncate pointer-events-none">
          <span
            className={`text-[13px] font-semibold tracking-tight truncate ${
              isFocused
                ? 'text-neutral-800 dark:text-neutral-100'
                : 'text-neutral-500 dark:text-neutral-400'
            }`}
          >
            {title}
          </span>
        </div>

        {/* Right dummy spacer */}
        <div className="w-24" />
      </div>}

      {/* Window Content Shell */}
      <div className="mac-window-content flex-1 overflow-hidden relative">
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

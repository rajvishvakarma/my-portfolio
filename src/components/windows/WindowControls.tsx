'use client';

import React, { useState } from 'react';
import { AppId } from '@/types/desktop';
import { useDesktopStore } from '@/stores/useDesktopStore';

interface WindowControlsProps {
  appId: AppId;
}

export const WindowControls: React.FC<WindowControlsProps> = ({ appId }) => {
  const [hovered, setHovered] = useState(false);
  const { closeWindow, minimizeWindow, maximizeWindow, windows } = useDesktopStore();
  const isMax = windows[appId]?.isMaximized;

  const btnStyle = 'w-3 h-3 rounded-full flex items-center justify-center transition-transform active:scale-90 border-none outline-none';

  return (
    <div
      className="traffic-lights flex items-center gap-2 px-1 select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Red: Close */}
      <button
        style={{ backgroundColor: '#FF5F57' }}
        onClick={(e) => {
          e.stopPropagation();
          closeWindow(appId);
        }}
        className={btnStyle}
        title="Close"
      >
        {hovered && (
          <svg className="w-2 h-2 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        )}
      </button>

      {/* Yellow: Minimize */}
      <button
        style={{ backgroundColor: isMax ? '#999' : '#FDBC40', opacity: isMax ? 0.5 : 1 }}
        onClick={(e) => {
          e.stopPropagation();
          if (!isMax) minimizeWindow(appId);
        }}
        disabled={isMax}
        className={btnStyle}
        title="Minimize"
      >
        {hovered && !isMax && (
          <svg className="w-2 h-2 text-neutral-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        )}
      </button>

      {/* Green: Zoom / Maximize */}
      <button
        style={{ backgroundColor: '#28C840' }}
        onClick={(e) => {
          e.stopPropagation();
          maximizeWindow(appId);
        }}
        className={btnStyle}
        title="Zoom / Fullscreen"
      >
        {hovered && (
          <svg className="w-1.5 h-1.5 text-neutral-800 fill-current" viewBox="0 0 13 13">
            <path d="M9.26 12.03L.006 2.73v9.3H9.26zM2.735.012l9.3 9.3v-9.3h-9.3z" />
          </svg>
        )}
      </button>
    </div>
  );
};

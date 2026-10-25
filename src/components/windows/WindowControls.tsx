'use client';

import React from 'react';
import { AppId } from '@/types/desktop';
import { useDesktopStore } from '@/stores/useDesktopStore';

interface WindowControlsProps {
  appId: AppId;
}

export const WindowControls: React.FC<WindowControlsProps> = ({ appId }) => {
  const { closeWindow, minimizeWindow, maximizeWindow, windows } = useDesktopStore();
  const isMax = windows[appId]?.isMaximized;

  return (
    <div className="traffic-lights flex items-center gap-[8px] px-1 select-none">
      {/* Red: Close (macOS 27 Ultra-Glossy Liquid Glass with embossed cross) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          closeWindow(appId);
        }}
        className="group relative w-[14px] h-[14px] rounded-full flex items-center justify-center outline-none transition-all duration-150 hover:scale-[1.12] hover:brightness-110 active:scale-95 cursor-pointer shadow-[0_1.5px_3px_rgba(0,0,0,0.24),0_0.5px_1px_rgba(0,0,0,0.18),inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-1.5px_2px_rgba(0,0,0,0.4)] border border-[#c41e17] overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 35% 25%, #ffa39c 0%, #ff5246 38%, #e12b20 75%, #b81010 100%)',
        }}
        title="Close"
        aria-label="Close Window"
      >
        {/* Top curved specular glass reflection cap */}
        <span className="absolute top-[0.5px] left-[1.5px] right-[1.5px] h-[5px] rounded-full bg-gradient-to-b from-white/90 via-white/40 to-transparent pointer-events-none" />
        {/* Bottom caustic light refraction */}
        <span className="absolute bottom-[0.5px] left-[2.5px] right-[2.5px] h-[2.5px] rounded-full bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />

        <svg
          className="relative z-10 w-[7px] h-[7px] text-[#550000] drop-shadow-[0_0.5px_0.5px_rgba(255,255,255,0.25)] transition-opacity"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
        >
          <line x1="2" y1="2" x2="8" y2="8" />
          <line x1="8" y1="2" x2="2" y2="8" />
        </svg>
      </button>

      {/* Yellow: Minimize (macOS 27 Ultra-Glossy Liquid Glass with embossed minus) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          if (!isMax) minimizeWindow(appId);
        }}
        disabled={isMax}
        className={`group relative w-[14px] h-[14px] rounded-full flex items-center justify-center outline-none transition-all duration-150 overflow-hidden ${
          isMax
            ? 'opacity-40 cursor-default'
            : 'hover:scale-[1.12] hover:brightness-110 active:scale-95 cursor-pointer shadow-[0_1.5px_3px_rgba(0,0,0,0.24),0_0.5px_1px_rgba(0,0,0,0.18),inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-1.5px_2px_rgba(0,0,0,0.35)] border border-[#c47c00]'
        }`}
        style={{
          background: isMax
            ? '#a3a3a3'
            : 'radial-gradient(circle at 35% 25%, #fff38a 0%, #ffc633 38%, #f09b0a 75%, #c87600 100%)',
        }}
        title="Minimize"
        aria-label="Minimize Window"
      >
        {!isMax && (
          <>
            {/* Top curved specular glass reflection cap */}
            <span className="absolute top-[0.5px] left-[1.5px] right-[1.5px] h-[5px] rounded-full bg-gradient-to-b from-white/95 via-white/45 to-transparent pointer-events-none" />
            {/* Bottom caustic light refraction */}
            <span className="absolute bottom-[0.5px] left-[2.5px] right-[2.5px] h-[2.5px] rounded-full bg-gradient-to-t from-white/35 to-transparent pointer-events-none" />
          </>
        )}

        <svg
          className="relative z-10 w-[7px] h-[7px] text-[#5e2e00] drop-shadow-[0_0.5px_0.5px_rgba(255,255,255,0.25)] transition-opacity"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinecap="round"
        >
          <line x1="1.8" y1="5" x2="8.2" y2="5" />
        </svg>
      </button>

      {/* Green: Zoom / Fullscreen (macOS 27 Ultra-Glossy Liquid Glass with embossed plus) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          maximizeWindow(appId);
        }}
        className="group relative w-[14px] h-[14px] rounded-full flex items-center justify-center outline-none transition-all duration-150 hover:scale-[1.12] hover:brightness-110 active:scale-95 cursor-pointer shadow-[0_1.5px_3px_rgba(0,0,0,0.24),0_0.5px_1px_rgba(0,0,0,0.18),inset_0_1.5px_2px_rgba(255,255,255,0.95),inset_0_-1.5px_2px_rgba(0,0,0,0.38)] border border-[#148e26] overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 35% 25%, #8dfba0 0%, #34d44d 38%, #20b838 75%, #128e23 100%)',
        }}
        title="Zoom"
        aria-label="Zoom Window"
      >
        {/* Top curved specular glass reflection cap */}
        <span className="absolute top-[0.5px] left-[1.5px] right-[1.5px] h-[5px] rounded-full bg-gradient-to-b from-white/90 via-white/40 to-transparent pointer-events-none" />
        {/* Bottom caustic light refraction */}
        <span className="absolute bottom-[0.5px] left-[2.5px] right-[2.5px] h-[2.5px] rounded-full bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />

        <svg
          className="relative z-10 w-[7px] h-[7px] text-[#023e0a] drop-shadow-[0_0.5px_0.5px_rgba(255,255,255,0.25)] transition-opacity"
          viewBox="0 0 10 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
        >
          <line x1="5" y1="1.8" x2="5" y2="8.2" />
          <line x1="1.8" y1="5" x2="8.2" y2="5" />
        </svg>
      </button>
    </div>
  );
};

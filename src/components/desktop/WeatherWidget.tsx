'use client';

import React from 'react';
import { Moon, Droplets } from 'lucide-react';

export const WeatherWidget: React.FC = () => {
  return (
    <div className="w-48 p-4 rounded-2xl bg-black/45 dark:bg-black/60 backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.4)] select-none text-white">
      {/* Top Section */}
      <div className="flex justify-between items-start">
        <div>
          <div className="text-xs text-white/70 font-semibold mb-0.5">Memphis</div>
          <div className="text-4xl font-extralight tracking-tight leading-none">79°</div>
          <div className="text-xs text-white/70 mt-1 font-medium">Mostly Clear</div>
        </div>

        {/* Sun & Cloud SVG */}
        <div className="text-amber-400">
          <svg width="38" height="38" viewBox="0 0 24 24" fill="none">
            <circle cx="9" cy="8.5" r="3.5" fill="#FFD60A" opacity="0.95" />
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
              <line
                key={i}
                x1="9"
                y1="1.5"
                x2="9"
                y2="3.2"
                stroke="#FFD60A"
                strokeWidth="1.6"
                strokeLinecap="round"
                transform={`rotate(${deg} 9 8.5)`}
              />
            ))}
            <path
              d="M8 14a4.5 4.5 0 1 1 8.9-.9H18a2.8 2.8 0 0 1 0 5.6H9a3.4 3.4 0 0 1-1-6.35"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="1.4"
              fill="rgba(255,255,255,0.2)"
            />
          </svg>
        </div>
      </div>

      {/* Stats row */}
      <div className="flex items-center space-x-3 mt-3 pt-2.5 border-t border-white/10 text-[10px] text-white/60">
        <span>H:84° L:62°</span>
        <span className="flex items-center space-x-1">
          <Droplets size={10} className="text-cyan-400" />
          <span>52%</span>
        </span>
      </div>

      {/* Alert row */}
      <div className="flex items-center space-x-1.5 mt-2 pt-2 border-t border-white/10 text-[10px] text-white/50">
        <Moon size={11} className="text-blue-300" />
        <span>Air quality alert</span>
      </div>
    </div>
  );
};

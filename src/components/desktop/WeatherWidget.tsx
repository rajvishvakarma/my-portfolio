'use client';

import React from 'react';
import { useDesktopStore } from '@/stores/useDesktopStore';
import { ArrowRight } from 'lucide-react';

export const WeatherWidget: React.FC = () => {
  const { openApp, theme } = useDesktopStore();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={() => openApp('projects')}
      className={`w-[310px] md:w-[340px] min-h-[210px] p-5 rounded-2xl text-left transition-all duration-300 backdrop-blur-2xl select-none group flex flex-col justify-between hover:scale-[1.02] active:scale-[0.98] ${
        isDark
          ? 'bg-[#1e2330]/85 border border-white/15 text-white shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
          : 'bg-white/80 border border-black/10 text-slate-800 shadow-[0_8px_32px_rgba(0,0,0,0.12)]'
      }`}
    >
      {/* Top Header Row with photo on the LEFT side */}
      <div className="flex items-center gap-3.5">
        {/* User Image on Left Side */}
        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden border-2 border-white/60 dark:border-white/25 shrink-0 shadow-md group-hover:scale-105 transition-transform duration-200">
          <img
            src="/img/raj.jpg?v=5"
            alt="Raj Vishvakarma"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Role & Name to the right of avatar - completely untruncated */}
        <div className="flex-1">
          <span
            className={`text-[10px] md:text-[11px] font-bold uppercase tracking-wider block whitespace-nowrap ${
              isDark ? 'text-blue-400' : 'text-blue-600'
            }`}
          >
            SOFTWARE DEVELOPER
          </span>
          <strong className="block text-lg md:text-xl font-bold leading-tight tracking-tight mt-0.5 whitespace-nowrap">
            Raj Vishvakarma
          </strong>
        </div>
      </div>

      {/* Main Content */}
      <div className="my-2">
        <p
          className={`text-xs md:text-[13px] font-medium leading-relaxed ${
            isDark ? 'text-white/85' : 'text-slate-600'
          }`}
        >
          Apps that solve real problems with AI & autonomous agents.
        </p>
      </div>

      {/* Footer: Stacks & Explore Link */}
      <div className="pt-2.5 border-t border-black/5 dark:border-white/10 flex items-center justify-between">
        <div
          className={`text-xs font-medium tracking-tight ${
            isDark ? 'text-white/60' : 'text-slate-500'
          }`}
        >
          Next.js · Flutter · Kotlin · AI
        </div>

        <div
          className={`flex items-center gap-1.5 text-xs font-semibold group-hover:translate-x-1 transition-transform ${
            isDark ? 'text-blue-400' : 'text-blue-600'
          }`}
        >
          <span>Explore projects</span>
          <ArrowRight size={13} />
        </div>
      </div>
    </button>
  );
};

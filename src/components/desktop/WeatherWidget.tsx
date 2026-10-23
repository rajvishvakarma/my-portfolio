'use client';

import React from 'react';
import { useDesktopStore } from '@/stores/useDesktopStore';

export const WeatherWidget: React.FC = () => {
  const openApp = useDesktopStore((state) => state.openApp);
  return <button onClick={() => openApp('projects')} className="w-48 rounded-2xl border border-white/20 bg-[#252936]/85 p-4 text-left text-white shadow-xl backdrop-blur-xl transition-transform hover:scale-[1.02]"><span className="text-[11px] font-semibold uppercase tracking-widest text-blue-300">Now building</span><strong className="mt-2 block text-lg leading-tight">Apps that solve real problems.</strong><span className="mt-3 block text-[11px] text-white/70">AI · Mobile · Automation</span><span className="mt-4 block text-[11px] font-semibold text-blue-300">Explore projects →</span></button>;
};

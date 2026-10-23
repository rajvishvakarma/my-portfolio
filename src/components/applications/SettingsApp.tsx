'use client';

import React from 'react';
import Image from 'next/image';
import {
  Settings,
  Sun,
  Moon,
  Volume2,
  Sliders,
  Image as ImageIcon,
  Monitor,
  Wifi,
  Check,
} from 'lucide-react';
import { useDesktopStore } from '@/stores/useDesktopStore';
import { wallpapers } from '@/data/wallpapers';

export const SettingsApp: React.FC = () => {
  const {
    theme,
    setTheme,
    wallpaper,
    setWallpaper,
    brightness,
    setBrightness,
    volume,
    setVolume,
  } = useDesktopStore();

  return (
    <div className="flex flex-col h-full bg-white/95 dark:bg-[#1e1e1e]/95 text-neutral-800 dark:text-neutral-100 select-none overflow-hidden">
      {/* Top Header */}
      <div className="p-3 border-b border-black/10 dark:border-white/10 bg-neutral-100/70 dark:bg-[#282828]/70 backdrop-blur-md flex items-center space-x-2">
        <Settings size={16} className="text-neutral-500" />
        <span className="text-xs font-bold text-neutral-900 dark:text-white">System Settings</span>
      </div>

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-2xl mx-auto w-full">
        {/* Appearance Settings */}
        <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-3">
          <div className="flex items-center space-x-2">
            <Monitor size={15} className="text-blue-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Appearance Mode</h3>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <button
              onClick={() => setTheme('light')}
              className={`p-3 rounded-xl border flex flex-col items-center space-y-2 transition-all ${
                theme === 'light'
                  ? 'border-blue-500 bg-blue-500/10 shadow-xs'
                  : 'border-black/10 dark:border-white/10 hover:border-black/20'
              }`}
            >
              <div className="w-full h-12 rounded-lg bg-neutral-100 border border-neutral-300 flex items-center justify-center">
                <Sun size={20} className="text-amber-500" />
              </div>
              <span className="text-xs font-semibold text-neutral-900 dark:text-white">Light Mode</span>
            </button>

            <button
              onClick={() => setTheme('dark')}
              className={`p-3 rounded-xl border flex flex-col items-center space-y-2 transition-all ${
                theme === 'dark'
                  ? 'border-blue-500 bg-blue-500/10 shadow-xs'
                  : 'border-black/10 dark:border-white/10 hover:border-black/20'
              }`}
            >
              <div className="w-full h-12 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center">
                <Moon size={20} className="text-indigo-400" />
              </div>
              <span className="text-xs font-semibold text-neutral-900 dark:text-white">Dark Mode</span>
            </button>
          </div>
        </div>

        {/* Wallpaper Picker */}
        <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-3">
          <div className="flex items-center space-x-2">
            <ImageIcon size={15} className="text-blue-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Desktop Wallpaper</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
            {wallpapers.map((wp) => (
              <button
                key={wp.id}
                onClick={() => setWallpaper(wp.id)}
                className={`relative group rounded-xl overflow-hidden border-2 transition-all aspect-video ${
                  wallpaper === wp.id ? 'border-blue-500 ring-2 ring-blue-500/30' : 'border-transparent hover:border-white/40'
                }`}
              >
                <Image src={wp.thumbnail} alt={wp.name} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-end p-1.5">
                  <span className="text-[10px] font-medium text-white truncate drop-shadow-sm">{wp.name}</span>
                </div>
                {wallpaper === wp.id && (
                  <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-xs">
                    <Check size={10} />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Display & Sound Controls */}
        <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-white/5 border border-black/10 dark:border-white/10 space-y-4">
          <div className="flex items-center space-x-2">
            <Sliders size={15} className="text-blue-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">Display & Audio</h3>
          </div>

          <div className="space-y-4 pt-1">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="flex items-center space-x-1.5">
                  <Sun size={13} className="text-amber-500" />
                  <span>Desktop Brightness</span>
                </span>
                <span className="text-neutral-500">{brightness}%</span>
              </div>
              <input
                type="range"
                min="30"
                max="100"
                value={brightness}
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="w-full h-1.5 bg-black/10 dark:bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium">
                <span className="flex items-center space-x-1.5">
                  <Volume2 size={13} className="text-blue-500" />
                  <span>Audio Volume</span>
                </span>
                <span className="text-neutral-500">{volume}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => setVolume(Number(e.target.value))}
                className="w-full h-1.5 bg-black/10 dark:bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-2 bg-neutral-100/70 dark:bg-[#1a1a1a]/70 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] text-neutral-500">
        <span>macOS Tahoe 26.0</span>
        <span>Theme and wallpaper persist in this browser</span>
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wifi,
  Bluetooth,
  Moon,
  Sun,
  Volume2,
  Sliders,
  Battery,
  Shield,
  Sparkles,
  Check,
} from 'lucide-react';
import { useDesktopStore } from '@/stores/useDesktopStore';

export const ControlCenter: React.FC = () => {
  const {
    controlCenterOpen,
    theme,
    toggleTheme,
    wifi,
    toggleWifi,
    bluetooth,
    toggleBluetooth,
    focusMode,
    toggleFocus,
    brightness,
    setBrightness,
    volume,
    setVolume,
    setControlCenterOpen,
    openApp,
  } = useDesktopStore();

  if (!controlCenterOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -10, scale: 0.98 }}
        transition={{ duration: 0.15 }}
        className="fixed top-8 right-3 w-80 bg-neutral-200/80 dark:bg-[#1e1e1e]/85 backdrop-blur-3xl rounded-2xl p-3 shadow-2xl border border-white/20 dark:border-white/10 z-[9999] select-none text-neutral-800 dark:text-neutral-100"
      >
        {/* Top 2x2 Feature Grid */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          {/* Connectivity Box */}
          <div className="p-2.5 rounded-xl bg-white/70 dark:bg-white/10 border border-black/5 dark:border-white/5 space-y-2">
            {/* Wi-Fi */}
            <button
              onClick={toggleWifi}
              className="flex items-center space-x-2.5 w-full text-left group"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                  wifi
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-black/10 dark:bg-white/10 text-neutral-400'
                }`}
              >
                <Wifi size={14} />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-semibold leading-tight">Wi-Fi</div>
                <div className="text-[9px] text-neutral-500 truncate">
                  {wifi ? 'PortfolioNet' : 'Off'}
                </div>
              </div>
            </button>

            {/* Bluetooth */}
            <button
              onClick={toggleBluetooth}
              className="flex items-center space-x-2.5 w-full text-left group"
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                  bluetooth
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-black/10 dark:bg-white/10 text-neutral-400'
                }`}
              >
                <Bluetooth size={14} />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-semibold leading-tight">Bluetooth</div>
                <div className="text-[9px] text-neutral-500 truncate">
                  {bluetooth ? 'Active' : 'Off'}
                </div>
              </div>
            </button>
          </div>

          {/* Quick Toggles Column */}
          <div className="flex flex-col gap-2">
            {/* Focus Mode */}
            <button
              onClick={toggleFocus}
              className={`flex-1 p-2.5 rounded-xl border flex items-center space-x-2.5 transition-all text-left ${
                focusMode
                  ? 'bg-indigo-600 text-white border-indigo-500 shadow-xs'
                  : 'bg-white/70 dark:bg-white/10 border-black/5 dark:border-white/5'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center ${
                  focusMode ? 'bg-white/20' : 'bg-black/10 dark:bg-white/10 text-neutral-400'
                }`}
              >
                <Moon size={14} />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-semibold leading-tight">Focus</div>
                <div className="text-[9px] opacity-75">{focusMode ? 'On' : 'Off'}</div>
              </div>
            </button>

            {/* Dark / Light Mode */}
            <button
              onClick={toggleTheme}
              className="flex-1 p-2.5 rounded-xl bg-white/70 dark:bg-white/10 border border-black/5 dark:border-white/5 flex items-center space-x-2.5 text-left transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center text-amber-500 dark:text-indigo-400">
                {theme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
              </div>
              <div className="min-w-0">
                <div className="text-[11px] font-semibold leading-tight">Theme</div>
                <div className="text-[9px] text-neutral-500 capitalize">{theme} Mode</div>
              </div>
            </button>
          </div>
        </div>

        {/* Display Brightness Slider */}
        <div className="p-2.5 rounded-xl bg-white/70 dark:bg-white/10 border border-black/5 dark:border-white/5 mb-2 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-semibold px-0.5">
            <span className="flex items-center space-x-1.5">
              <Sun size={13} className="text-amber-500" />
              <span>Display Brightness</span>
            </span>
            <span className="text-[10px] text-neutral-400">{brightness}%</span>
          </div>
          <input
            type="range"
            min="25"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="w-full h-2 bg-black/10 dark:bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {/* Audio Volume Slider */}
        <div className="p-2.5 rounded-xl bg-white/70 dark:bg-white/10 border border-black/5 dark:border-white/5 mb-2 space-y-1.5">
          <div className="flex items-center justify-between text-[11px] font-semibold px-0.5">
            <span className="flex items-center space-x-1.5">
              <Volume2 size={13} className="text-blue-500" />
              <span>Sound Volume</span>
            </span>
            <span className="text-[10px] text-neutral-400">{volume}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            className="w-full h-2 bg-black/10 dark:bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
        </div>

        {/* Bottom Quick Action: Open Settings */}
        <button
          onClick={() => {
            openApp('settings');
            setControlCenterOpen(false);
          }}
          className="w-full py-1.5 text-center text-xs text-blue-600 dark:text-blue-400 hover:underline font-medium"
        >
          Open Desktop Preferences...
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

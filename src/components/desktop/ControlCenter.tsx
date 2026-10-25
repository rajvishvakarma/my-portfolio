'use client';

import React, { useState } from 'react';
import {
  Airplay,
  Bluetooth,
  Calculator,
  Moon,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Sun,
  Volume1,
  Volume2,
  Wifi,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDesktopStore } from '@/stores/useDesktopStore';
import { useMediaStore } from '@/stores/useMediaStore';

// Custom SVG matching screenshot 2 exactly
const StageManagerIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <rect x="3" y="4" width="4" height="4" rx="1.2" opacity="0.95" />
    <rect x="3" y="10" width="4" height="4" rx="1.2" opacity="0.95" />
    <rect x="3" y="16" width="4" height="4" rx="1.2" opacity="0.95" />
    <rect
      x="9.5"
      y="4.5"
      width="11.5"
      height="15"
      rx="2.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
  </svg>
);

const ScreenMirroringIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="7" width="12" height="11" rx="2.5" />
    <rect x="8" y="4" width="13" height="11" rx="2.5" />
  </svg>
);

const AirDropIcon = () => (
  <svg
    className="w-5 h-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5.5 16.5a8 8 0 0 1 0-9" />
    <path d="M8.5 13.5a4 4 0 0 1 0-3" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <path d="M15.5 10.5a4 4 0 0 1 0 3" />
    <path d="M18.5 7.5a8 8 0 0 1 0 9" />
    <path d="M12 17v4" />
  </svg>
);

// Screen Recording Circle Icon from screenshot 2
const ScreenRecordingIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.2" />
    <circle cx="12" cy="12" r="4.5" fill="currentColor" />
  </svg>
);

export const ControlCenter: React.FC = () => {
  const {
    controlCenterOpen,
    setControlCenterOpen,
    isMobile,
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
    toggleTheme,
    openApp,
    addNotification,
  } = useDesktopStore();

  const { playing, toggle, next, previous } = useMediaStore();
  const [airdrop, setAirdrop] = useState(true);
  const [stageManager, setStageManager] = useState(true);
  const [screenMirroring, setScreenMirroring] = useState(true);
  const [recording, setRecording] = useState(false);

  return (
    <AnimatePresence>
      {controlCenterOpen && isMobile && (
        <motion.div
          key="cc-mobile-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setControlCenterOpen(false)}
          className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
        />
      )}
      {controlCenterOpen && (
        <motion.div
          key="cc-panel"
          initial={isMobile ? { y: '-100%', opacity: 0 } : { opacity: 0, y: -14, scale: 0.95 }}
          animate={isMobile ? { y: 0, opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
          exit={isMobile ? { y: '-100%', opacity: 0 } : { opacity: 0, y: -10, scale: 0.96 }}
          transition={{ type: 'spring', stiffness: 380, damping: isMobile ? 30 : 32 }}
          onClick={(e) => e.stopPropagation()}
          className={
            isMobile
              ? 'control-center fixed top-0 inset-x-0 z-[9999] max-h-[92vh] overflow-y-auto rounded-b-[36px] bg-[#141620]/95 backdrop-blur-3xl border-b border-white/20 p-5 shadow-2xl select-none text-white no-scrollbar pointer-events-auto'
              : 'control-center fixed right-3 md:right-4 top-12 md:top-10 z-[9999] w-[345px] max-w-[calc(100vw-24px)] select-none bg-transparent border-0 shadow-none p-0 text-white outline-none ring-0 pointer-events-auto'
          }
          style={isMobile ? {} : { background: 'transparent', border: 'none', boxShadow: 'none' }}
        >
          {/* Mobile Header Bar */}
          {isMobile && (
            <div className="flex items-center justify-between pb-3.5 mb-2.5 border-b border-white/10">
              <span className="text-base font-bold tracking-tight text-white">Control Centre</span>
              <button
                onClick={() => setControlCenterOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white active:scale-90 transition-all cursor-pointer"
                aria-label="Close Control Centre"
              >
                <X size={18} />
              </button>
            </div>
          )}

          {/* Top 3 Rows: Connectivity (Left) + Media Card & Display Buttons (Right) */}
          <div className="grid grid-cols-2 gap-2.5">
            {/* Left Column: Wi-Fi, Bluetooth, AirDrop */}
            <div className="flex flex-col gap-2.5">
              {/* Wi-Fi Pill */}
              <motion.button
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.96 }}
                onClick={toggleWifi}
                className="h-[58px] w-full rounded-full px-2.5 py-1.5 flex items-center gap-2.5 text-left transition-all liquid-glass-frosted text-white"
              >
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-sm transition-colors ${
                  wifi ? 'bg-white text-[#007aff]' : 'bg-white/20 text-white/70'
                }`}>
                  <Wifi size={19} strokeWidth={2.6} />
                </span>
                <span className="min-w-0 flex-1 leading-tight">
                  <strong className="block text-[13px] font-bold truncate">Wi-Fi</strong>
                  <small className="block text-[11px] text-white/80 truncate">
                    {wifi ? 'Airtel_ra-j0_6410' : 'Off'}
                  </small>
                </span>
              </motion.button>

              {/* Bluetooth Pill */}
              <motion.button
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.96 }}
                onClick={toggleBluetooth}
                className="h-[58px] w-full rounded-full px-2.5 py-1.5 flex items-center gap-2.5 text-left transition-all liquid-glass-frosted text-white"
              >
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-sm transition-colors ${
                  bluetooth ? 'bg-white text-[#007aff]' : 'bg-white/20 text-white/70'
                }`}>
                  <Bluetooth size={19} strokeWidth={2.5} />
                </span>
                <span className="min-w-0 flex-1 leading-tight">
                  <strong className="block text-[13px] font-bold truncate">Bluetooth</strong>
                  <small className="block text-[11px] text-white/80 truncate">
                    {bluetooth ? 'On' : 'Off'}
                  </small>
                </span>
              </motion.button>

              {/* AirDrop Pill */}
              <motion.button
                whileHover={{ scale: 1.025 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setAirdrop(!airdrop)}
                className="h-[58px] w-full rounded-full px-2.5 py-1.5 flex items-center gap-2.5 text-left transition-all liquid-glass-frosted text-white"
              >
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full shadow-sm transition-colors ${
                  airdrop ? 'bg-white text-[#007aff]' : 'bg-white/20 text-white/70'
                }`}>
                  <AirDropIcon />
                </span>
                <span className="min-w-0 flex-1 leading-tight">
                  <strong className="block text-[13px] font-bold truncate">AirDrop</strong>
                  <small className="block text-[11px] text-white/80 truncate">
                    {airdrop ? 'Contacts Only' : 'Off'}
                  </small>
                </span>
              </motion.button>
            </div>

            {/* Right Column: Media Card + Stage Manager & Screen Mirroring */}
            <div className="flex flex-col gap-2.5">
              {/* Media Card (spans height of rows 1 and 2) */}
              <div className="liquid-glass-frosted h-[126px] w-full rounded-[26px] p-3 flex flex-col justify-between text-white">
                <div className="flex items-center gap-2.5">
                  {/* Sports thumbnail matching Image 2 ("Tilak Varma Finis... / Sony Sports Network") */}
                  <div className="h-9 w-9 shrink-0 rounded-xl overflow-hidden shadow-md border border-white/30 bg-[#08142b] relative flex items-center justify-center">
                    <svg viewBox="0 0 36 36" className="w-full h-full">
                      <rect width="36" height="36" fill="#08142b" />
                      <circle cx="18" cy="11" r="5" fill="#facc15" />
                      <path d="M11 27 C11 20, 25 20, 25 27 Z" fill="#0284c7" />
                      <line x1="21" y1="13" x2="29" y2="21" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-bold leading-tight">
                      Tilak Varma Finis...
                    </p>
                    <p className="truncate text-[11px] text-white/75 leading-tight">
                      Sony Sports Network
                    </p>
                  </div>
                </div>

                {/* Media Playback Controls */}
                <div className="flex items-center justify-between px-2 text-white">
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    aria-label="Previous track"
                    onClick={previous}
                    className="hover:opacity-80 transition-opacity p-1"
                  >
                    <SkipBack size={18} fill="currentColor" />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    aria-label={playing ? 'Pause music' : 'Play music'}
                    onClick={toggle}
                    className="hover:opacity-80 transition-opacity p-1"
                  >
                    {playing ? (
                      <Pause size={25} fill="currentColor" />
                    ) : (
                      <Play size={25} fill="currentColor" />
                    )}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    aria-label="Next track"
                    onClick={next}
                    className="hover:opacity-80 transition-opacity p-1"
                  >
                    <SkipForward size={18} fill="currentColor" />
                  </motion.button>
                </div>
              </div>

              {/* Stage Manager & Screen Mirroring Circles */}
              <div className="flex items-center gap-2.5">
                {/* Stage Manager Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => {
                    setStageManager(!stageManager);
                    addNotification(
                      'Stage Manager',
                      !stageManager ? 'Stage Manager enabled.' : 'Stage Manager disabled.'
                    );
                  }}
                  className={`h-[58px] flex-1 rounded-full flex items-center justify-center transition-all liquid-glass-frosted ${
                    stageManager ? 'text-white bg-white/20' : 'text-white/70'
                  }`}
                  title="Stage Manager"
                >
                  <StageManagerIcon />
                </motion.button>

                {/* Screen Mirroring Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.94 }}
                  onClick={() => {
                    setScreenMirroring(!screenMirroring);
                    addNotification(
                      'Screen Mirroring',
                      !screenMirroring
                        ? 'Looking for AirPlay displays…'
                        : 'Screen Mirroring disconnected.'
                    );
                  }}
                  className="h-[58px] flex-1 rounded-full flex items-center justify-center transition-all liquid-glass-frosted text-white"
                  title="Screen Mirroring"
                >
                  <ScreenMirroringIcon />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Row 4: Appearance Toggle + Calculator + Focus Pill */}
          <div className="mt-2.5 flex items-center gap-2.5">
            {/* Dark/Light Appearance Circle Button (pure white circle with half-black half-white disc) */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              onClick={toggleTheme}
              aria-label="Toggle appearance mode"
              className="h-[54px] w-[54px] shrink-0 rounded-full bg-white text-black shadow-lg flex items-center justify-center transition-transform border border-white/70"
              title="Toggle Appearance"
            >
              <div className="w-5 h-5 rounded-full border-2 border-black flex overflow-hidden">
                <div className="w-1/2 h-full bg-black" />
                <div className="w-1/2 h-full bg-transparent" />
              </div>
            </motion.button>

            {/* Calculator Circle Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => openApp('calculator')}
              aria-label="Open Calculator"
              className="liquid-glass-frosted h-[54px] w-[54px] shrink-0 rounded-full flex items-center justify-center text-white"
              title="Calculator"
            >
              <Calculator size={20} strokeWidth={2.4} />
            </motion.button>

            {/* Focus Pill */}
            <motion.button
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.96 }}
              onClick={toggleFocus}
              className="h-[54px] flex-1 rounded-full px-3.5 py-1.5 flex items-center gap-3 transition-all liquid-glass-frosted text-white"
              title="Focus Mode"
            >
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white shadow-xs transition-colors ${
                focusMode ? 'bg-[#007aff]' : 'bg-white/20'
              }`}>
                <Moon size={18} fill="currentColor" />
              </span>
              <span className="text-[13px] font-bold">Focus</span>
            </motion.button>
          </div>

          {/* Row 5: Display Slider Capsule */}
          <div className="liquid-glass-frosted mt-2.5 rounded-[26px] px-3.5 py-2.5 flex flex-col justify-center gap-1.5">
            <div className="flex items-center justify-between text-[11.5px] font-semibold text-white/95 px-0.5">
              <span>Display</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Sun size={14} className="text-white shrink-0" />
              <div className="relative flex-1 h-[22px] rounded-full bg-white/25 overflow-hidden border border-white/20 flex items-center">
                <div
                  className="h-full bg-white rounded-full transition-[width] duration-75 shadow-xs"
                  style={{ width: `${brightness}%` }}
                />
                <input
                  aria-label="Display brightness"
                  type="range"
                  min="20"
                  max="100"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
              </div>
              <Sun size={18} className="text-white shrink-0" />
            </div>
          </div>

          {/* Row 6: Sound Slider Capsule */}
          <div className="liquid-glass-frosted mt-2.5 rounded-[26px] px-3.5 py-2.5 flex flex-col justify-center gap-1.5">
            <div className="flex items-center justify-between text-[11.5px] font-semibold text-white/95 px-0.5">
              <span>Sound</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Volume1 size={16} className="text-white shrink-0" />
              <div className="relative flex-1 h-[22px] rounded-full bg-white/25 overflow-hidden border border-white/20 flex items-center">
                <div
                  className="h-full bg-white rounded-full transition-[width] duration-75 shadow-xs"
                  style={{ width: `${volume}%` }}
                />
                <input
                  aria-label="Sound volume"
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                />
              </div>
              <Volume2 size={18} className="text-white shrink-0" />
              <button
                onClick={() =>
                  addNotification(
                    'Sound Output',
                    'MacBook Pro Speakers (AirPlay Audio)'
                  )
                }
                title="AirPlay Audio"
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors"
              >
                <Airplay size={14} />
              </button>
            </div>
          </div>

          {/* Row 7: Screen Recording Circle (below Sound on the left) */}
          <div className="mt-2.5 flex items-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => {
                const nextState = !recording;
                setRecording(nextState);
                addNotification(
                  'Screen Recording',
                  nextState ? 'Recording started…' : 'Screen Recording saved to Desktop.'
                );
              }}
              className={`h-[56px] w-[56px] rounded-full flex items-center justify-center transition-all ${
                recording
                  ? 'liquid-glass-frosted text-red-400'
                  : 'liquid-glass-frosted text-white'
              }`}
              title="Screen Recording"
            >
              <ScreenRecordingIcon />
            </motion.button>
          </div>

          {/* Row 8: Edit Controls Button (centered at bottom) */}
          <div className="mt-3 flex justify-center pb-1">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() =>
                addNotification(
                  'Control Center',
                  'Drag controls to customize your layout.'
                )
              }
              className="rounded-full px-5 py-1 text-xs font-semibold text-white/90 bg-black/35 hover:bg-black/50 backdrop-blur-2xl border border-white/25 shadow-md transition-colors"
            >
              Edit Controls
            </motion.button>
          </div>

          {/* Mobile Bottom Dismiss Indicator Pill */}
          {isMobile && (
            <div className="mt-3 flex justify-center pb-1">
              <button
                onClick={() => setControlCenterOpen(false)}
                className="w-16 h-1.5 rounded-full bg-white/30 hover:bg-white/50 active:scale-95 transition-all cursor-pointer"
                aria-label="Dismiss Control Centre"
              />
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

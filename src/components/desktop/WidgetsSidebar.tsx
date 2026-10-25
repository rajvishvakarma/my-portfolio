'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDesktopStore } from '@/stores/useDesktopStore';
import { X, Navigation } from 'lucide-react';

interface WorldClockProps {
  city: string;
  subtext: string;
  hour: number;
  minute: number;
  isNight?: boolean;
}

const AnalogClock: React.FC<WorldClockProps> = ({ city, subtext, hour, minute, isNight }) => {
  const hourAngle = (hour % 12) * 30 + (minute / 60) * 30;
  const minuteAngle = minute * 6;

  return (
    <div className="flex flex-col items-center text-center">
      <div
        className={`w-12 h-12 rounded-full relative flex items-center justify-center shadow-md border ${
          isNight
            ? 'bg-[#1b1c22] border-white/20'
            : 'bg-white border-black/10'
        }`}
      >
        {/* Hour marks 12, 3, 6, 9 */}
        <span className={`absolute top-0.5 text-[8px] font-bold ${isNight ? 'text-white/60' : 'text-black/60'}`}>12</span>
        <span className={`absolute right-1 text-[8px] font-bold ${isNight ? 'text-white/60' : 'text-black/60'}`}>3</span>
        <span className={`absolute bottom-0.5 text-[8px] font-bold ${isNight ? 'text-white/60' : 'text-black/60'}`}>6</span>
        <span className={`absolute left-1 text-[8px] font-bold ${isNight ? 'text-white/60' : 'text-black/60'}`}>9</span>

        {/* Center pin */}
        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 z-10" />

        {/* Hour hand */}
        <div
          className={`absolute w-0.5 h-3.5 rounded-full origin-bottom bottom-6 left-[23px] ${
            isNight ? 'bg-white' : 'bg-black'
          }`}
          style={{ transform: `rotate(${hourAngle}deg)` }}
        />

        {/* Minute hand */}
        <div
          className={`absolute w-[1.5px] h-4.5 rounded-full origin-bottom bottom-6 left-[23.25px] ${
            isNight ? 'bg-white' : 'bg-black'
          }`}
          style={{ transform: `rotate(${minuteAngle}deg)` }}
        />

        {/* Orange second hand */}
        <div
          className="absolute w-[1px] h-5 bg-orange-500 origin-bottom bottom-6 left-[23.5px]"
          style={{ transform: 'rotate(72deg)' }}
        />
      </div>

      <span className="text-[11px] font-bold text-white mt-1.5 truncate max-w-[64px]">{city}</span>
      <span className="text-[9px] text-neutral-400 font-medium tracking-tight mt-0.5">{subtext}</span>
    </div>
  );
};

export const WidgetsSidebar: React.FC = () => {
  const { widgetsOpen, setWidgetsOpen, openApp, isMobile } = useDesktopStore();

  return (
    <AnimatePresence>
      {widgetsOpen && isMobile && (
        <motion.div
          key="widgets-mobile-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setWidgetsOpen(false)}
          className="fixed inset-0 z-[9998] bg-black/60 backdrop-blur-sm"
        />
      )}
      {widgetsOpen && (
        <motion.aside
          key="mac-widgets-sidebar"
          initial={isMobile ? { y: '-100%', opacity: 0 } : { x: 380, opacity: 0 }}
          animate={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
          exit={isMobile ? { y: '-100%', opacity: 0 } : { x: 380, opacity: 0 }}
          transition={{ type: 'spring', damping: isMobile ? 30 : 32, stiffness: 350 }}
          onClick={(e) => e.stopPropagation()}
          className={
            isMobile
              ? 'fixed top-0 inset-x-0 z-[9999] max-h-[92vh] overflow-y-auto rounded-b-[36px] bg-[#141620]/95 backdrop-blur-3xl border-b border-white/20 p-5 shadow-2xl select-none text-white space-y-4 no-scrollbar pointer-events-auto'
              : 'fixed top-12 right-3 bottom-3 w-[calc(100vw-24px)] max-w-[360px] z-[9999] overflow-y-auto no-scrollbar space-y-3 pr-1 select-none pointer-events-auto'
          }
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-1 pb-1 border-b border-white/10">
            <span className="text-sm font-bold text-white drop-shadow-sm">Notifications & Widgets</span>
            <button
              onClick={() => setWidgetsOpen(false)}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white active:scale-90 transition-all cursor-pointer"
              title="Close Widgets"
              aria-label="Close Widgets"
            >
              <X size={15} />
            </button>
          </div>

          {/* ==========================================
              TOP ROW: WEATHER & CALENDAR WIDGETS
              ========================================== */}
          <div className="grid grid-cols-2 gap-3">
            {/* Weather Widget */}
            <div
              onClick={() => openApp('safari')}
              className="bg-[#1b2138]/90 border border-white/15 text-white rounded-[24px] p-4 flex flex-col justify-between shadow-2xl backdrop-blur-2xl cursor-pointer hover:border-white/30 transition-all duration-150 aspect-square"
            >
              <div>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-white/90">
                  <span>New Delhi</span>
                  <Navigation size={10} className="fill-white rotate-45" />
                </div>
                <div className="text-4xl font-light tracking-tight mt-1">21°</div>
              </div>

              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5 text-xs font-medium">
                  <span className="text-sm">🌙</span>
                  <span>Mostly Clear</span>
                </div>
                <div className="text-[11px] text-white/60 font-medium">H:31° L:20°</div>
              </div>
            </div>

            {/* Calendar / Date Widget */}
            <div
              onClick={() => openApp('calendar')}
              className="bg-[#21232b]/90 border border-white/15 text-white rounded-[24px] p-4 flex flex-col justify-between shadow-2xl backdrop-blur-2xl cursor-pointer hover:border-white/30 transition-all duration-150 aspect-square"
            >
              <div>
                <span className="text-red-500 font-bold text-xs uppercase tracking-wider block">
                  SUNDAY
                </span>
                <span className="text-4xl font-light text-white block mt-0.5">
                  25
                </span>
              </div>

              <div className="text-xs text-neutral-400 font-medium">
                No Events Today
              </div>
            </div>
          </div>

          {/* ==========================================
              STOCKS WIDGET
              ========================================== */}
          <div className="bg-[#21232b]/90 border border-white/15 text-white rounded-[24px] p-4 shadow-2xl backdrop-blur-2xl space-y-3">
            <div className="space-y-1.5 text-xs font-medium">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-red-400 font-semibold">
                  <span>▼</span> DOW
                </span>
                <span className="font-mono text-neutral-100">52,215</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-red-400 font-semibold">
                  <span>▼</span> ^NSEI
                </span>
                <span className="font-mono text-neutral-100">22,600</span>
              </div>

              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1 text-red-400 font-semibold">
                  <span>▼</span> AAPL
                </span>
                <span className="font-mono text-neutral-100">347.72</span>
              </div>
            </div>

            <div className="pt-2 border-t border-white/10">
              <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wide block">
                Investing.com
              </span>
              <p className="text-xs font-semibold text-neutral-200 mt-0.5 leading-snug line-clamp-2">
                United States shares lower at close of trade; Dow Jones falls 0.4%
              </p>
            </div>
          </div>

          {/* ==========================================
              WORLD CLOCKS WIDGET
              ========================================== */}
          <div className="bg-[#21232b]/90 border border-white/15 text-white rounded-[24px] p-4 shadow-2xl backdrop-blur-2xl">
            <div className="grid grid-cols-4 gap-2">
              <AnalogClock city="Cupertino" subtext="Yesterday -12:30" hour={1} minute={12} />
              <AnalogClock city="Tokyo" subtext="Today +3:30" hour={5} minute={12} />
              <AnalogClock city="Sydney" subtext="Today +5:30" hour={7} minute={12} />
              <AnalogClock city="Paris" subtext="Today -3:30" hour={10} minute={12} isNight={true} />
            </div>
          </div>

          {/* ==========================================
              SCREEN TIME WIDGET
              ========================================== */}
          <div className="bg-[#21232b]/90 border border-white/15 text-white rounded-[24px] p-4 shadow-2xl backdrop-blur-2xl">
            <div className="text-lg font-bold tracking-tight mb-3">3h 38m</div>

            <div className="grid grid-cols-12 gap-3 items-end">
              {/* Left Bar Chart (60%) */}
              <div className="col-span-7 h-28 relative flex items-end justify-between px-2 pb-5 border-b border-white/15">
                {/* Horizontal reference lines */}
                <div className="absolute top-2 left-0 right-0 border-t border-dashed border-white/10 flex justify-end">
                  <span className="text-[8px] text-neutral-400 -mt-2">60m</span>
                </div>
                <div className="absolute top-14 left-0 right-0 border-t border-dashed border-white/10 flex justify-end">
                  <span className="text-[8px] text-neutral-400 -mt-2">30m</span>
                </div>

                {/* Bars */}
                <div className="w-2.5 h-20 rounded-full bg-gradient-to-t from-blue-600 to-cyan-400" />
                <div className="w-2.5 h-24 rounded-full bg-gradient-to-t from-blue-600 to-cyan-400" />
                <div className="w-2.5 h-22 rounded-full bg-gradient-to-t from-blue-600 to-cyan-400" />
                <div className="w-2.5 h-14 rounded-full bg-gradient-to-t from-blue-600 to-cyan-400" />
                <div className="w-2.5 h-8 rounded-full bg-neutral-600" />
                <div className="w-2.5 h-4 rounded-full bg-neutral-600" />

                {/* Time markers */}
                <span className="absolute bottom-1 left-2 text-[8px] text-neutral-400 font-mono">12 AM</span>
                <span className="absolute bottom-1 left-16 text-[8px] text-neutral-400 font-mono">6 AM</span>
                <span className="absolute bottom-1 right-2 text-[8px] text-neutral-400 font-mono">12 PM</span>
              </div>

              {/* Right App Breakdown (40%) */}
              <div className="col-span-5 space-y-2 text-xs font-medium">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="text-sm">🦁</span> Brave
                  </span>
                  <span className="text-[11px] text-neutral-400">1h 21m</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="text-sm">🅰️</span> Cursor
                  </span>
                  <span className="text-[11px] text-neutral-400">27m</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="text-sm">📁</span> Finder
                  </span>
                  <span className="text-[11px] text-neutral-400">2m</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 truncate">
                    <span className="text-sm">📷</span> Photos
                  </span>
                  <span className="text-[11px] text-neutral-400">51s</span>
                </div>
              </div>
            </div>
          </div>

          {/* ==========================================
              BOTTOM ACTION: EDIT WIDGETS & CLOSE
              ========================================== */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <button
              onClick={() => setWidgetsOpen(false)}
              className="px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 text-xs font-semibold text-white shadow-md backdrop-blur-md border border-white/20 transition-all"
            >
              Edit Widgets
            </button>
            <button
              onClick={() => setWidgetsOpen(false)}
              className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 active:scale-95 flex items-center justify-center text-white/90 shadow-md backdrop-blur-md border border-white/20 transition-all"
              title="Close Widgets"
            >
              <X size={13} />
            </button>
          </div>

          {/* Mobile Bottom Dismiss Indicator Pill */}
          {isMobile && (
            <div className="flex justify-center pt-2 pb-1">
              <button
                onClick={() => setWidgetsOpen(false)}
                className="w-16 h-1.5 rounded-full bg-white/30 hover:bg-white/50 active:scale-95 transition-all cursor-pointer"
                aria-label="Dismiss"
              />
            </div>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

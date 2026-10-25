'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDesktopStore } from '@/stores/useDesktopStore';

export const LockScreen: React.FC = () => {
  const { isLocked, setLocked } = useDesktopStore();
  const [timeStr, setTimeStr] = useState('');
  const [dateStr, setDateStr] = useState('');

  // Clock tick
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      hours = hours % 12 || 12;
      const minutes = String(now.getMinutes()).padStart(2, '0');
      setTimeStr(`${hours}:${minutes}`);

      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      setDateStr(`${days[now.getDay()]}, ${months[now.getMonth()]} ${now.getDate()}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Unlock on Enter or Space key press
  useEffect(() => {
    if (!isLocked) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        setLocked(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLocked, setLocked]);

  return (
    <AnimatePresence>
      {isLocked && (
        <motion.div
          key="lockscreen-root"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
          }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          onClick={() => setLocked(false)}
          className="fixed inset-0 z-[999999] select-none cursor-pointer flex flex-col justify-between items-center py-16 px-6 overflow-hidden bg-transparent"
          style={{ willChange: 'opacity', transform: 'translateZ(0)' }}
        >
          {/* Center Clock & Date with smooth glide up, blur and slow iPhone-style fade out */}
          <motion.div
            initial={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{
              y: -80,
              opacity: 0,
              filter: 'blur(20px)',
              scale: 1.05,
              transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
            }}
            className="flex flex-col items-center mt-12 text-center text-white drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
            style={{ willChange: 'transform, opacity, filter' }}
          >
            <h1 className="text-[96px] md:text-[124px] font-bold leading-none tracking-tight font-sans tabular-nums">
              {timeStr || '1:12'}
            </h1>
            <p className="text-xl md:text-2xl font-medium mt-3 text-white/95 tracking-wide">
              {dateStr || 'Sunday, October 25'}
            </p>
          </motion.div>

          {/* Bottom Profile & Hint with smooth glide down, blur and slow fade out */}
          <motion.div
            initial={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{
              y: 50,
              opacity: 0,
              filter: 'blur(16px)',
              scale: 0.92,
              transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
            }}
            className="flex flex-col items-center space-y-3 pb-4 text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.65)]"
            style={{ willChange: 'transform, opacity, filter' }}
          >
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-white/60 shadow-2xl backdrop-blur-xs">
              <img
                src="/img/raj.jpg?v=5"
                alt="Raj Vishvakarma"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <div className="text-center">
              <span className="text-sm md:text-base font-semibold text-white block drop-shadow-sm">
                Raj Vishvakarma
              </span>
              <p className="text-xs text-white/80 animate-pulse mt-1 flex items-center justify-center gap-1.5 font-medium">
                <span>Press</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/20 border border-white/30 text-[11px] font-mono shadow-xs">
                  ↵ Enter
                </kbd>
                <span>or click to unlock</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

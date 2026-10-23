'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDesktopStore } from '@/stores/useDesktopStore';
import { ArrowRight, Sparkles } from 'lucide-react';

export const BootScreen: React.FC = () => {
  const { bootCompleted, completeBoot } = useDesktopStore();
  const [progress, setProgress] = useState(0);
  const [readyToEnter, setReadyToEnter] = useState(false);

  useEffect(() => {
    // Check if user already booted during this session
    if (typeof window !== 'undefined') {
      const alreadyBooted = sessionStorage.getItem('macos_boot_done');
      if (alreadyBooted === 'true') {
        completeBoot();
        return;
      }
    }

    // Smooth simulated loading bar
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setReadyToEnter(true);
          return 100;
        }
        return prev + 15;
      });
    }, 120);

    return () => clearInterval(interval);
  }, [completeBoot]);

  if (bootCompleted) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        className="fixed inset-0 z-[99999] bg-black text-white flex flex-col items-center justify-center p-6 select-none"
      >
        <div className="flex flex-col items-center space-y-8 max-w-sm w-full">
          {/* Apple Logo */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="w-16 h-16 fill-white"
          >
            <svg className="w-full h-full fill-current" viewBox="0 0 170 170">
              <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.7-11.7-13.97-5.53-8.47-9.93-18.43-13.19-29.87-3.26-11.44-4.89-22.39-4.89-32.85 0-14.8 3.59-27.13 10.77-36.99 7.18-9.87 16.48-14.88 27.91-15.02 5.01 0 10.45 1.25 16.32 3.75 5.87 2.5 9.94 3.82 12.23 3.96 1.84-.14 6.07-1.5 12.7-4.08 6.64-2.58 12.28-3.76 16.94-3.54 12.98.68 23.3 5.37 30.96 14.07-11.37 6.89-16.95 16.48-16.74 28.77.21 9.87 4.02 18.06 11.43 24.58 7.41 6.51 16.3 10.15 26.68 10.9-2.41 7.29-5.46 14.43-9.16 21.41zM119.22 31.84c0-7.39 2.67-14.42 8.01-21.09 5.34-6.67 11.95-10.75 19.83-12.25.13 1.21.2 2.29.2 3.25 0 7.39-2.73 14.61-8.19 21.66-5.46 7.05-12.16 11.23-20.1 12.54-.14-1.22-.21-2.29-.21-3.25z" />
            </svg>
          </motion.div>

          {/* Loading progress bar */}
          <div className="w-52 h-1 bg-neutral-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white rounded-full"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* Enter / Skip Buttons */}
          <div className="flex flex-col items-center space-y-3 pt-4">
            <button
              onClick={completeBoot}
              className="px-5 py-2 rounded-full bg-white text-black text-xs font-semibold hover:bg-neutral-200 transition-colors flex items-center space-x-1.5 shadow-lg active:scale-95 cursor-pointer"
            >
              <span>{readyToEnter ? 'Enter macOS Desktop' : 'Skip Intro'}</span>
              <ArrowRight size={13} />
            </button>
            <span className="text-[11px] text-neutral-500">
              Raj Vishvakarma • Interactive Portfolio
            </span>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

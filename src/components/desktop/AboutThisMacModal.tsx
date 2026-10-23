'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Cpu, HardDrive, Monitor, ShieldCheck } from 'lucide-react';
import { useDesktopStore } from '@/stores/useDesktopStore';

export const AboutThisMacModal: React.FC = () => {
  const { aboutThisMacOpen, setAboutThisMacOpen } = useDesktopStore();

  if (!aboutThisMacOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs select-none">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.15 }}
        className="w-full max-w-sm bg-neutral-100/95 dark:bg-[#202020]/95 backdrop-blur-3xl rounded-2xl shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden text-neutral-800 dark:text-neutral-200"
      >
        {/* Title Bar with Close Button */}
        <div className="h-8 px-3 flex items-center justify-between border-b border-black/10 dark:border-white/10 bg-neutral-200/50 dark:bg-white/5">
          <button
            onClick={() => setAboutThisMacOpen(false)}
            className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e] flex items-center justify-center hover:opacity-80 active:scale-90"
            title="Close"
          >
            <X size={8} className="text-[#4c0000] stroke-[2.5]" />
          </button>
          <span className="text-xs font-semibold text-neutral-600 dark:text-neutral-400">About This Portfolio</span>
          <div className="w-3" />
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col items-center text-center space-y-4">
          <div className="w-20 h-20 relative">
            <Image
              src="/img/icons/macos-tahoe.png"
              alt="macOS Tahoe"
              fill
              className="object-contain drop-shadow-md"
            />
          </div>

          <div>
            <h2 className="text-lg font-bold text-neutral-900 dark:text-white">Raj’s macOS Portfolio</h2>
            <p className="text-xs text-neutral-500">A browser desktop inspired by macOS Tahoe</p>
          </div>

          <div className="w-full bg-black/5 dark:bg-white/5 rounded-xl p-3 text-left space-y-2 text-xs border border-black/5 dark:border-white/5">
            <div className="flex justify-between items-center">
              <span className="text-neutral-500 flex items-center space-x-1.5">
                <Cpu size={13} className="text-blue-500" />
                <span>Built with</span>
              </span>
              <span className="font-semibold text-neutral-900 dark:text-white">Next.js 16 + React 19</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-500 flex items-center space-x-1.5">
                <ShieldCheck size={13} className="text-emerald-500" />
                <span>State</span>
              </span>
              <span className="font-semibold text-neutral-900 dark:text-white">64 GB Unified State</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-500 flex items-center space-x-1.5">
                <HardDrive size={13} className="text-purple-500" />
                <span>Projects</span>
              </span>
              <span className="font-semibold text-neutral-900 dark:text-white">4 from my resume</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-neutral-500 flex items-center space-x-1.5">
                <Monitor size={13} className="text-amber-500" />
                <span>Interface</span>
              </span>
              <span className="font-semibold text-neutral-900 dark:text-white">Responsive window manager</span>
            </div>
          </div>

          <p className="text-[11px] text-neutral-400">
            Crafted with passion by Raj Vishvakarma • Software Engineer
          </p>

          <button
            onClick={() => setAboutThisMacOpen(false)}
            className="w-full py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            Done
          </button>
        </div>
      </motion.div>
    </div>
  );
};

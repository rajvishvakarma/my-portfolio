'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, Check, Volume2 } from 'lucide-react';

export const DynamicIsland: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="fixed top-1 left-1/2 -translate-x-1/2 z-[9995] pointer-events-auto select-none">
      <motion.div
        layout
        onClick={() => setExpanded(!expanded)}
        initial={false}
        animate={{
          width: expanded ? 320 : 124,
          height: expanded ? 72 : 24,
          borderRadius: expanded ? 22 : 30,
        }}
        transition={{ type: 'spring', stiffness: 380, damping: 28 }}
        className="bg-black/95 text-white shadow-[0_4px_24px_rgba(0,0,0,0.6)] border border-white/10 cursor-pointer overflow-hidden flex items-center justify-between px-3"
      >
        {expanded ? (
          <div className="w-full flex items-center justify-between px-1">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md">
                <Music size={18} />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">Starboy</div>
                <div className="text-[10px] text-neutral-400 truncate">The Weeknd • Daft Punk</div>
              </div>
            </div>

            {/* Sound Wave Bars */}
            <div className="flex items-center space-x-0.5 pr-2">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  animate={{ height: [4, 16, 8, 20, 4] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: 'easeInOut',
                  }}
                  className="w-1 rounded-full bg-emerald-400"
                />
              ))}
            </div>
          </div>
        ) : (
          /* Compact Dynamic Island Pill (matches screenshot) */
          <div className="w-full flex items-center justify-between text-neutral-400 px-0.5">
            <div className="flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="w-2 h-2 rounded-full bg-neutral-800 border border-neutral-700 shadow-inner" />
          </div>
        )}
      </motion.div>
    </div>
  );
};

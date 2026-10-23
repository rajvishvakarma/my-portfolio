'use client';

import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useDesktopStore } from '@/stores/useDesktopStore';

export const NotificationBanner: React.FC = () => {
  const { notifications, removeNotification } = useDesktopStore();

  return (
    <div className="fixed top-9 right-3 z-[9995] flex flex-col space-y-2 pointer-events-none select-none max-w-sm w-full">
      <AnimatePresence>
        {notifications.map((notif) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto p-3.5 rounded-2xl bg-white/80 dark:bg-[#1f1f1f]/85 backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-xl flex items-start space-x-3 text-neutral-800 dark:text-neutral-100 group"
          >
            {notif.icon ? (
              <div className="w-8 h-8 relative shrink-0">
                <Image src={notif.icon} alt="" fill className="object-contain" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center font-bold text-xs shrink-0">
                ⌘
              </div>
            )}

            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-xs leading-tight text-neutral-900 dark:text-white truncate">
                  {notif.title}
                </h4>
                <span className="text-[10px] text-neutral-400 shrink-0">{notif.time}</span>
              </div>
              <p className="text-[11px] text-neutral-600 dark:text-neutral-300 mt-1 leading-normal">
                {notif.message}
              </p>
            </div>

            <button
              onClick={() => removeNotification(notif.id)}
              className="p-1 rounded-full text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors shrink-0"
              title="Dismiss notification"
            >
              <X size={12} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

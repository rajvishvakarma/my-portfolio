'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { AppId } from '@/types/desktop';
import { useDesktopStore } from '@/stores/useDesktopStore';

interface DesktopIconProps {
  id: AppId;
  title: string;
  icon: string;
  index: number;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ id, title, icon, index }) => {
  const { openApp, selectedDesktopIcon, setSelectedDesktopIcon } = useDesktopStore();
  const isSelected = selectedDesktopIcon === id;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDesktopIcon(id);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openApp(id);
  };

  return (
    <motion.div
      data-desktop-icon="true"
      drag
      dragMomentum={false}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      className={`group w-22 flex flex-col items-center justify-center p-2 rounded-lg cursor-pointer transition-colors duration-150 select-none ${
        isSelected
          ? 'bg-blue-600/30 border border-blue-400/50 backdrop-blur-xs'
          : 'hover:bg-white/10 dark:hover:bg-black/20 border border-transparent'
      }`}
    >
      <div className="w-12 h-12 relative mb-1.5 transition-transform duration-150 group-active:scale-95">
        <Image
          src={icon}
          alt={title}
          fill
          sizes="48px"
          className="object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]"
        />
      </div>

      <span
        className={`text-xs font-medium text-center text-white px-1.5 py-0.5 rounded leading-tight tracking-tight line-clamp-2 drop-shadow-[0_1px_3px_rgba(0,0,0,0.85)] ${
          isSelected ? 'bg-blue-600 text-white shadow-xs' : ''
        }`}
      >
        {title}
      </span>
    </motion.div>
  );
};

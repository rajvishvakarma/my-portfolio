'use client';

import React from 'react';
import Image from 'next/image';
import { useDesktopStore } from '@/stores/useDesktopStore';
import { wallpapers } from '@/data/wallpapers';

export const Wallpaper: React.FC = () => {
  const { wallpaper: currentWallpaperId, theme, brightness } = useDesktopStore();

  const selectedWallpaper =
    wallpapers.find((w) => w.id === currentWallpaperId) || wallpapers[0];

  const imageSrc =
    theme === 'dark' ? selectedWallpaper.darkImage : selectedWallpaper.lightImage;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Background Image */}
      <div
        className="relative w-full h-full transition-all duration-500 ease-out"
        style={{
          filter: `brightness(${brightness}%)`,
        }}
      >
        <Image
          src={imageSrc}
          alt="macOS Desktop Wallpaper"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Subtle translucent vignette overlay for contrast and depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/15 via-transparent to-black/10 pointer-events-none" />
    </div>
  );
};

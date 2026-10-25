'use client';

import React from 'react';
import { useDesktopStore } from '@/stores/useDesktopStore';
import { wallpapers } from '@/data/wallpapers';

export const Wallpaper: React.FC = () => {
  const { wallpaper: currentWallpaperId, theme, brightness } = useDesktopStore();

  const selectedWallpaper = wallpapers.find((w) => w.id === currentWallpaperId);

  const imageSrc = currentWallpaperId.startsWith('/')
    ? currentWallpaperId
    : selectedWallpaper
      ? theme === 'dark'
        ? selectedWallpaper.darkImage
        : selectedWallpaper.lightImage
      : wallpapers[0].lightImage;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-black"
      style={{
        backgroundImage: `url("${imageSrc}")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        filter: `brightness(${brightness}%)`,
        transition: 'filter 0.3s ease-out, background-image 0.4s ease-out',
      }}
    />
  );
};

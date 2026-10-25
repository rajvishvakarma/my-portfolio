'use client';

import React, { useState, useEffect } from 'react';
import { useDesktopStore } from '@/stores/useDesktopStore';
import { wallpapers } from '@/data/wallpapers';

export const Wallpaper: React.FC = () => {
  const { wallpaper: currentWallpaperId, theme, brightness } = useDesktopStore();
  const [loaded, setLoaded] = useState(false);

  const selectedWallpaper = wallpapers.find((w) => w.id === currentWallpaperId);

  const imageSrc = currentWallpaperId.startsWith('/')
    ? currentWallpaperId
    : selectedWallpaper
    ? theme === 'dark'
      ? selectedWallpaper.darkImage
      : selectedWallpaper.lightImage
    : wallpapers[0].lightImage;

  useEffect(() => {
    const img = new Image();
    img.src = imageSrc;
    if (img.complete) {
      setLoaded(true);
    } else {
      img.onload = () => setLoaded(true);
    }
  }, [imageSrc]);

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-neutral-950 transition-opacity duration-300 ease-out ${
        loaded ? 'opacity-100' : 'opacity-80'
      }`}
      style={{
        backgroundImage: `url("${imageSrc}")`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        filter: `brightness(${brightness}%)`,
        willChange: 'transform, opacity',
        transform: 'translateZ(0)',
      }}
    />
  );
};

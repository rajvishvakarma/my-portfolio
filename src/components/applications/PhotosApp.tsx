'use client';

import React, { useState, useEffect } from 'react';
import {
  Image as ImageIcon,
  Heart,
  Download,
  RotateCw,
  Play,
  Pause,
  Info,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  Check,
  Monitor,
  Grid,
} from 'lucide-react';
import { useDesktopStore } from '@/stores/useDesktopStore';

const WALLPAPERS = [
  '/Wallpaper/27-golden-gate-day.jpg',
  '/Wallpaper/27-golden-gate-sunset.jpg',
  '/Wallpaper/27-golden-gate-night.jpg',
  '/Wallpaper/27-golden-gate-dusk.jpg',
  '/wallpapers/26-Tahoe-Beach-Day.png',
  '/Wallpaper/11-0-Big-Sur-Day-6k.jpg',
  '/Wallpaper/13-Ventura-Light.jpg',
  '/Wallpaper/26-Tahoe-Beach-Dawn-thumb.jpeg',
  '/Wallpaper/26-Tahoe-Light-6K-thumb.jpeg',
  '/Wallpaper/GoldenGate_6k.png',
  '/Wallpaper/Golden_Dark_6k.png',
  '/Wallpaper/big-sur-mountains-night-dark-macos-big-sur-stock-california-6016x6016-1493.jpg',
  '/Wallpaper/macOS-Catalina-Dark-Mode.jpg',
  '/Wallpaper/macOS-Sonoma-light.jpg',
  '/Wallpaper/macOS-Sonomaa-dark.jpg',
  '/Wallpaper/macos-big-sur-stock-night-lone-tree-sedimentary-rocks-6016x6016-3776.jpg',
  '/Wallpaper/FGrad_Feb21_Mac.png',
  '/Wallpaper/15-inch-MacBook-Air-wallpaper-1.webp',
  '/Wallpaper/1175801.jpg',
  '/Wallpaper/451898.jpg',
  '/Wallpaper/GtB-Ex7WYAA9yAD.jpeg',
  '/Wallpaper/HJv1q-1bAAAxn-W.jpg',
  '/Wallpaper/HKT-kq1W8AA8dat.jpg',
  '/Wallpaper/HKfYptPbkAArZ5W.jpg',
  '/Wallpaper/chris-brignola-n7n-nkadHRM-unsplash.jpg',
  '/Wallpaper/five.png',
  '/Wallpaper/formula-1-formula-cars-ferrari-ferrari-f1-ferrari-formula-1-hd-wallpaper-79f662068bca0f4ad0cb02dae8b765b3.jpg',
  '/Wallpaper/golden-gate-bridge-san-francicso-lg.jpg',
  '/Wallpaper/three.jpg',
];

const getThumbSrc = (fullSrc: string) => {
  const filename = fullSrc.split('/').pop();
  return filename ? `/Wallpaper/thumbs/${filename}` : fullSrc;
};

export function PhotosApp() {
  const [selectedAlbum, setSelectedAlbum] = useState<'all' | 'wallpapers' | 'favorites'>('all');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        return JSON.parse(localStorage.getItem('os_photo_favorites') || '[]');
      } catch {
        return [];
      }
    }
    return [];
  });
  const [isPlayingSlideshow, setIsPlayingSlideshow] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const [wallpaperSetNotice, setWallpaperSetNotice] = useState(false);

  const { setWallpaper } = useDesktopStore();

  const displayedPhotos =
    selectedAlbum === 'favorites'
      ? WALLPAPERS.filter((p) => favorites.includes(p))
      : WALLPAPERS;

  const toggleFavorite = (src: string) => {
    setFavorites((prev) => {
      const next = prev.includes(src) ? prev.filter((p) => p !== src) : [...prev, src];
      if (typeof window !== 'undefined') {
        localStorage.setItem('os_photo_favorites', JSON.stringify(next));
      }
      return next;
    });
  };

  // Slideshow auto-advance
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlayingSlideshow && lightboxIndex !== null) {
      interval = setInterval(() => {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % displayedPhotos.length : 0
        );
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isPlayingSlideshow, lightboxIndex, displayedPhotos.length]);

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % displayedPhotos.length);
      setRotation(0);
    }
  };

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + displayedPhotos.length) % displayedPhotos.length);
      setRotation(0);
    }
  };

  const handleApplyWallpaper = (src: string) => {
    setWallpaper(src);
    setWallpaperSetNotice(true);
    setTimeout(() => setWallpaperSetNotice(false), 2500);
  };

  const handleDownload = (src: string) => {
    const a = document.createElement('a');
    a.href = src;
    a.download = src.split('/').pop() || 'wallpaper.jpg';
    a.click();
  };

  const activePhoto = lightboxIndex !== null ? displayedPhotos[lightboxIndex] : null;

  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-[#f6f6f6] dark:bg-[#1e1e1e] text-slate-800 dark:text-slate-100 select-none overflow-hidden font-[-apple-system,BlinkMacSystemFont,sans-serif]">
      {/* Sidebar */}
      <div className="w-full md:w-56 h-auto md:h-full border-r border-black/10 dark:border-white/10 p-3 bg-white/60 dark:bg-[#252526]/70 backdrop-blur-xl shrink-0 flex flex-col justify-between">
        <div className="space-y-4">
          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider px-2">
            Photos
          </div>
          <div className="space-y-0.5">
            <button
              onClick={() => setSelectedAlbum('all')}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedAlbum === 'all'
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                <span>All Photos</span>
              </div>
              <span className="text-[10px] opacity-80">{WALLPAPERS.length}</span>
            </button>

            <button
              onClick={() => setSelectedAlbum('wallpapers')}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedAlbum === 'wallpapers'
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4" />
                <span>Wallpapers</span>
              </div>
              <span className="text-[10px] opacity-80">{WALLPAPERS.length}</span>
            </button>

            <button
              onClick={() => setSelectedAlbum('favorites')}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                selectedAlbum === 'favorites'
                  ? 'bg-blue-500 text-white'
                  : 'hover:bg-black/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-red-500" />
                <span>Favorites</span>
              </div>
              <span className="text-[10px] opacity-80">{favorites.length}</span>
            </button>
          </div>
        </div>

        {wallpaperSetNotice && (
          <div className="p-2.5 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-xs flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0" />
            <span>Desktop wallpaper updated!</span>
          </div>
        )}
      </div>

      {/* Main Grid Pane */}
      <div className="flex-1 h-full overflow-y-auto p-4 md:p-6 relative">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-black/5 dark:border-white/5">
          <h2 className="text-sm font-semibold capitalize">
            {selectedAlbum === 'all'
              ? 'All Photos'
              : selectedAlbum === 'wallpapers'
              ? 'macOS Wallpapers'
              : 'Favorites'}
          </h2>
          <span className="text-xs text-slate-400">
            {displayedPhotos.length} {displayedPhotos.length === 1 ? 'item' : 'items'}
          </span>
        </div>

        {displayedPhotos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400 text-xs">
            <Heart className="w-8 h-8 mb-2 opacity-40" />
            <span>No favorites marked yet</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {displayedPhotos.map((src, idx) => {
              const isFav = favorites.includes(src);
              return (
                <div
                  key={src}
                  onClick={() => {
                    setLightboxIndex(idx);
                    setRotation(0);
                  }}
                  className="group relative aspect-[16/10] rounded-xl overflow-hidden shadow-sm hover:shadow-md cursor-pointer border border-black/5 dark:border-white/10 bg-black/5"
                >
                  <img
                    src={getThumbSrc(src)}
                    alt={src.split('/').pop()}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = src;
                    }}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between p-2.5 text-white">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(src);
                      }}
                      className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
                      title="Favorite"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${
                          isFav ? 'fill-red-500 text-red-500' : 'text-white'
                        }`}
                      />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleApplyWallpaper(src);
                      }}
                      className="px-2 py-1 rounded bg-black/50 hover:bg-black/70 text-[10px] font-medium flex items-center gap-1 backdrop-blur-sm"
                      title="Set as Wallpaper"
                    >
                      <Monitor className="w-3 h-3" />
                      <span>Set Wallpaper</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && activePhoto && (
        <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col justify-between p-4 text-white">
          {/* Lightbox Header Bar */}
          <div className="flex items-center justify-between">
            <div className="text-xs font-medium truncate max-w-xs text-white/80">
              {activePhoto.split('/').pop()}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlayingSlideshow(!isPlayingSlideshow)}
                className={`p-2 rounded-lg transition-colors ${
                  isPlayingSlideshow ? 'bg-blue-600 text-white' : 'bg-white/10 hover:bg-white/20'
                }`}
                title={isPlayingSlideshow ? 'Pause Slideshow' : 'Play Slideshow'}
              >
                {isPlayingSlideshow ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setRotation((r) => (r + 90) % 360)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                title="Rotate 90°"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              <button
                onClick={() => toggleFavorite(activePhoto)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                title="Favorite"
              >
                <Heart
                  className={`w-4 h-4 ${
                    favorites.includes(activePhoto)
                      ? 'fill-red-500 text-red-500'
                      : 'text-white'
                  }`}
                />
              </button>

              <button
                onClick={() => handleApplyWallpaper(activePhoto)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-xs font-medium transition-colors"
                title="Set as Desktop Wallpaper"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Set Wallpaper</span>
              </button>

              <button
                onClick={() => handleDownload(activePhoto)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                title="Download"
              >
                <Download className="w-4 h-4" />
              </button>

              <button
                onClick={() => setShowInfo(!showInfo)}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                title="Info"
              >
                <Info className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setLightboxIndex(null);
                  setIsPlayingSlideshow(false);
                }}
                className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                title="Close Lightbox"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Lightbox Image Preview Area */}
          <div className="relative flex-1 flex items-center justify-center overflow-hidden my-4">
            <button
              onClick={handlePrev}
              className="absolute left-2 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white z-10 transition-colors"
              title="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={activePhoto}
              alt="Viewing photo"
              style={{ transform: `rotate(${rotation}deg)` }}
              className="max-h-full max-w-full object-contain rounded-lg shadow-2xl transition-transform duration-200"
            />

            <button
              onClick={handleNext}
              className="absolute right-2 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white z-10 transition-colors"
              title="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Info Drawer */}
            {showInfo && (
              <div className="absolute right-4 top-4 p-4 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-xs space-y-2 max-w-xs z-20">
                <div className="font-semibold text-white/90">Image Details</div>
                <div className="text-white/60">
                  <span className="font-medium text-white/80">File: </span>
                  {activePhoto.split('/').pop()}
                </div>
                <div className="text-white/60">
                  <span className="font-medium text-white/80">Path: </span>
                  {activePhoto}
                </div>
                <div className="text-white/60">
                  <span className="font-medium text-white/80">Resolution: </span>
                  6016 x 6016 (6K Retina)
                </div>
                <div className="text-white/60">
                  <span className="font-medium text-white/80">Color Space: </span>
                  Apple Display P3
                </div>
              </div>
            )}
          </div>

          {/* Bottom Thumbnails */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
            {displayedPhotos.map((src, i) => (
              <button
                key={src}
                onClick={() => {
                  setLightboxIndex(i);
                  setRotation(0);
                }}
                className={`w-12 h-8 rounded overflow-hidden shrink-0 border-2 transition-all ${
                  lightboxIndex === i
                    ? 'border-blue-500 scale-105'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={src} alt="thumb" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

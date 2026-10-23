export interface WallpaperInfo {
  id: string;
  name: string;
  thumbnail: string;
  lightImage: string;
  darkImage: string;
}

export const wallpapers: WallpaperInfo[] = [
  {
    id: 'tahoe',
    name: 'macOS Tahoe Beach',
    thumbnail: '/wallpapers/26-Tahoe-Beach-Day.png',
    lightImage: '/wallpapers/26-Tahoe-Beach-Day.png',
    darkImage: '/wallpapers/26-Tahoe-Beach-Day.png',
  },
  {
    id: 'tahoe-aerial',
    name: 'Tahoe Aerial Default',
    thumbnail: '/wallpapers/macOS_Tahoe_Default.jpg',
    lightImage: '/wallpapers/macOS_Tahoe_Default.jpg',
    darkImage: '/wallpapers/macOS_Tahoe_DefaultDark.jpg',
  },
  {
    id: 'tahoe-beach-day',
    name: 'Tahoe Beach Day',
    thumbnail: '/wallpapers/26-Tahoe-Beach-Day.png',
    lightImage: '/wallpapers/26-Tahoe-Beach-Day.png',
    darkImage: '/wallpapers/macOS_Tahoe_DefaultDark.jpg',
  },
  {
    id: 'mobile-minimal',
    name: 'Minimal Gradient',
    thumbnail: '/wallpapers/mobile-dark.jpg',
    lightImage: '/wallpapers/mobile-light.jpg',
    darkImage: '/wallpapers/mobile-dark.jpg',
  },
];

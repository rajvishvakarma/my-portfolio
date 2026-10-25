'use client';

import React, { useState } from 'react';
import {
  Search,
  Star,
  Gamepad2,
  Wand2,
  Send,
  Rocket,
  Hammer,
  LayoutGrid,
  Download,
  Play,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useDesktopStore } from '@/stores/useDesktopStore';

interface AppStoreItem {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  icon: string;
  rating: number;
}

export function AppStoreApp() {
  const { theme } = useDesktopStore();
  const isDark = theme === 'dark';

  type TabType = 'discover' | 'arcade' | 'create' | 'work' | 'play' | 'develop' | 'categories' | 'updates';
  const [activeTab, setActiveTab] = useState<TabType>('discover');
  const [search, setSearch] = useState('');

  interface NavItem {
    id: TabType;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string;
  }

  const navItems: NavItem[] = [
    { id: 'discover', label: 'Discover', icon: Star },
    { id: 'arcade', label: 'Arcade', icon: Gamepad2 },
    { id: 'create', label: 'Create', icon: Wand2 },
    { id: 'work', label: 'Work', icon: Send },
    { id: 'play', label: 'Play', icon: Rocket },
    { id: 'develop', label: 'Develop', icon: Hammer },
    { id: 'categories', label: 'Categories', icon: LayoutGrid },
    { id: 'updates', label: 'Updates', icon: Download, badge: '1' },
  ];

  return (
    <div className={`w-full h-full flex select-none overflow-hidden font-[-apple-system,BlinkMacSystemFont,sans-serif] ${
      isDark ? 'bg-[#1e1e1e] text-white' : 'bg-[#f5f5f7] text-neutral-900'
    }`}>
      {/* Left Sidebar */}
      <div className={`w-56 h-full border-r flex flex-col justify-between p-3.5 shrink-0 backdrop-blur-xl ${
        isDark ? 'bg-[#181818]/90 border-white/5' : 'bg-[#e8e8ed]/90 border-black/10'
      }`}>
        <div className="space-y-4">
          {/* Search Box */}
          <div className="relative">
            <Search className={`w-3.5 h-3.5 absolute left-3 top-2.5 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`} />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-8 pr-3 py-1.5 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500/50 ${
                isDark
                  ? 'bg-neutral-800/80 border border-white/5 text-white placeholder-neutral-400'
                  : 'bg-white/80 border border-black/10 text-neutral-900 placeholder-neutral-500 shadow-2xs'
              }`}
            />
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? isDark
                        ? 'bg-neutral-800 text-white'
                        : 'bg-black/10 text-neutral-900 font-semibold'
                      : isDark
                        ? 'text-neutral-400 hover:text-white hover:bg-white/5'
                        : 'text-neutral-600 hover:text-black hover:bg-black/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon
                      className={`w-4 h-4 ${
                        isActive && item.id === 'discover'
                          ? isDark ? 'text-blue-400' : 'text-blue-600'
                          : ''
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold ${
                      isDark ? 'bg-neutral-700 text-neutral-300' : 'bg-neutral-300 text-neutral-700'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* User Profile Pill at Bottom */}
        <div className={`pt-3 border-t flex items-center gap-2.5 px-2 ${
          isDark ? 'border-white/5' : 'border-black/10'
        }`}>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
            isDark ? 'bg-neutral-700 text-white' : 'bg-neutral-300 text-neutral-800'
          }`}>
            RV
          </div>
          <div className="min-w-0 flex-1">
            <div className={`text-xs font-semibold truncate ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Raj vishvakarma
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 h-full overflow-y-auto p-6 md:p-8 space-y-6">
        <h1 className={`text-3xl font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
          Discover
        </h1>

        {/* Hero Banner: "Fear these games!" matching user image */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#201825] via-[#331c42] to-[#601a4e] p-7 flex flex-col md:flex-row justify-between items-center border border-white/10 shadow-xl min-h-[220px]">
          {/* Left Text */}
          <div className="flex flex-col justify-between h-full space-y-4 max-w-sm z-10">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-purple-300">
                OUR FAVOURITES
              </span>
              <h2 className="text-3xl font-black mt-1 text-white leading-tight">
                Fear these games!
              </h2>
            </div>
            <p className="text-xs text-purple-200/90 font-medium pt-8">
              Have a fright night you won't forget.
            </p>
          </div>

          {/* Right Visual Composition: Rhombus / Diamond Gallery */}
          <div className="relative flex items-center justify-center gap-3 mt-4 md:mt-0 z-10">
            <div className="relative flex items-center -space-x-4">
              <div className="w-24 h-24 rotate-45 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-black/40">
                <img
                  src="/Wallpaper/macOS-Sonomaa-dark.jpg"
                  alt="Game 1"
                  className="w-full h-full object-cover -rotate-45 scale-150"
                />
              </div>
              <div className="w-28 h-28 rotate-45 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/30 bg-black/40 z-10 relative">
                <img
                  src="/Wallpaper/Golden_Dark_6k.png"
                  alt="Game 2"
                  className="w-full h-full object-cover -rotate-45 scale-150"
                />
                <div className="absolute inset-0 flex items-center justify-center -rotate-45">
                  <div className="w-10 h-10 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white shadow-lg">
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  </div>
                </div>
              </div>
              <div className="w-24 h-24 rotate-45 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 bg-black/40">
                <img
                  src="/Wallpaper/chris-brignola-n7n-nkadHRM-unsplash.jpg"
                  alt="Game 3"
                  className="w-full h-full object-cover -rotate-45 scale-150"
                />
              </div>
            </div>
          </div>

          {/* Subtle Ambient Background Gradient Glow */}
          <div className="absolute -right-10 -bottom-10 w-96 h-96 bg-fuchsia-600/30 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Second Row: Two Promo Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Card 1: Dark and Dangerous Games */}
          <div className={`rounded-2xl p-6 border flex items-center justify-between shadow-lg transition-colors ${
            isDark
              ? 'bg-[#282828] border-white/5 hover:border-white/10 text-white'
              : 'bg-white border-black/10 hover:border-black/20 text-neutral-900 shadow-sm'
          }`}>
            <div className="space-y-2 max-w-[220px]">
              <span className={`text-[10px] font-bold uppercase tracking-wider ${
                isDark ? 'text-neutral-400' : 'text-blue-600 font-bold'
              }`}>
                LIMITED TIME
              </span>
              <h3 className={`text-lg font-bold leading-snug ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Dark and Dangerous Games—Up to 90% Off
              </h3>
              <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Treat yourself to these terrific titles, discounted for a limited time.
              </p>
            </div>
            {/* Circular App Icons cluster */}
            <div className={`w-24 h-24 rounded-full overflow-hidden border-2 shadow-xl relative flex items-center justify-center shrink-0 ${
              isDark ? 'border-white/10 bg-black' : 'border-black/10 bg-neutral-100 shadow-md'
            }`}>
              <img
                src="/icons/PngItem_6452863.png"
                alt="Dark Games"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Card 2: Cyberpunk 2077 */}
          <div className={`rounded-2xl p-6 border flex items-center justify-between shadow-lg transition-colors ${
            isDark
              ? 'bg-[#282828] border-white/5 hover:border-white/10 text-white'
              : 'bg-white border-black/10 hover:border-black/20 text-neutral-900 shadow-sm'
          }`}>
            <div className="space-y-2 max-w-[220px]">
              <span className={`text-[10px] font-bold uppercase tracking-wider ${
                isDark ? 'text-neutral-400' : 'text-blue-600 font-bold'
              }`}>
                LIMITED TIME
              </span>
              <h3 className={`text-lg font-bold leading-snug ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Jack in to Cyberpunk 2077
              </h3>
              <p className={`text-xs ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                Experience the complete sci-fi epic – including Phantom Liberty!
              </p>
            </div>
            {/* Circular Cyberpunk screenshot */}
            <div className={`w-24 h-24 rounded-full overflow-hidden border-2 shadow-xl relative flex items-center justify-center shrink-0 ${
              isDark ? 'border-cyan-400/30 bg-black' : 'border-cyan-500/30 bg-neutral-100 shadow-md'
            }`}>
              <img
                src="/Wallpaper/formula-1-formula-cars-ferrari-ferrari-f1-ferrari-formula-1-hd-wallpaper-79f662068bca0f4ad0cb02dae8b765b3.jpg"
                alt="Cyberpunk"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Third Row: Featured Developer & App Showcase */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h3 className={`text-base font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>
              Popular Across Categories
            </h3>
            <span className={`text-xs hover:underline cursor-pointer ${isDark ? 'text-blue-400' : 'text-blue-600 font-semibold'}`}>
              See All
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
              isDark
                ? 'bg-neutral-800/60 border-white/5 hover:bg-neutral-800 text-white'
                : 'bg-white border-black/10 hover:bg-neutral-50 text-neutral-900 shadow-2xs'
            }`}>
              <img
                src="/img/icons/vscode.png"
                alt="VS Code"
                className={`w-12 h-12 rounded-xl object-contain p-1 ${isDark ? 'bg-black/40' : 'bg-neutral-100'}`}
              />
              <div className="min-w-0 flex-1">
                <div className={`text-xs font-semibold truncate ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  Visual Studio Code
                </div>
                <div className={`text-[11px] truncate ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  Developer Tool · Free
                </div>
              </div>
              <button className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 text-blue-400'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-600'
              }`}>
                GET
              </button>
            </div>

            <div className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
              isDark
                ? 'bg-neutral-800/60 border-white/5 hover:bg-neutral-800 text-white'
                : 'bg-white border-black/10 hover:bg-neutral-50 text-neutral-900 shadow-2xs'
            }`}>
              <img
                src="/img/icons/chrome.png"
                alt="Google Chrome"
                className={`w-12 h-12 rounded-xl object-contain p-1 ${isDark ? 'bg-black/40' : 'bg-neutral-100'}`}
              />
              <div className="min-w-0 flex-1">
                <div className={`text-xs font-semibold truncate ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  Google Chrome
                </div>
                <div className={`text-[11px] truncate ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  Web Browser · Fast
                </div>
              </div>
              <button className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 text-blue-400'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-600'
              }`}>
                OPEN
              </button>
            </div>

            <div className={`flex items-center gap-3 p-3 rounded-xl border transition-colors ${
              isDark
                ? 'bg-neutral-800/60 border-white/5 hover:bg-neutral-800 text-white'
                : 'bg-white border-black/10 hover:bg-neutral-50 text-neutral-900 shadow-2xs'
            }`}>
              <img
                src="/img/icons/spotify.png"
                alt="Spotify"
                className={`w-12 h-12 rounded-xl object-contain p-1 ${isDark ? 'bg-black/40' : 'bg-neutral-100'}`}
              />
              <div className="min-w-0 flex-1">
                <div className={`text-xs font-semibold truncate ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  Spotify: Music and Podcasts
                </div>
                <div className={`text-[11px] truncate ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                  Music · Free
                </div>
              </div>
              <button className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 text-blue-400'
                  : 'bg-blue-50 hover:bg-blue-100 text-blue-600'
              }`}>
                OPEN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

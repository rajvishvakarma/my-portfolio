'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Search,
  User,
  Wifi,
  Bluetooth,
  Globe,
  Shield,
  Battery,
  Settings as SettingsIcon,
  Eye,
  Sun,
  Moon,
  Sparkles,
  Layout,
  Monitor,
  Menu,
  Image as ImageIcon,
  Bell,
  Volume2,
  Hourglass,
  Lock,
  Laptop,
  HardDrive,
  Clock,
  Share2,
  RefreshCw,
  FolderSync,
  Layers,
  KeyRound,
  Check,
} from 'lucide-react';
import { useDesktopStore } from '@/stores/useDesktopStore';
import { wallpapers } from '@/data/wallpapers';
import { profile } from '@/data/profile';

type SettingsCategory =
  | 'wifi'
  | 'bluetooth'
  | 'network'
  | 'vpn'
  | 'battery'
  | 'general'
  | 'accessibility'
  | 'appearance'
  | 'siri'
  | 'desktop_dock'
  | 'displays'
  | 'menubar'
  | 'spotlight'
  | 'wallpaper'
  | 'notifications'
  | 'sound'
  | 'focus'
  | 'screentime'
  | 'lockscreen'
  | 'privacy';

export const SettingsApp: React.FC = () => {
  const {
    theme,
    setTheme,
    wallpaper,
    setWallpaper,
    brightness,
    setBrightness,
    volume,
    setVolume,
    wifi,
    toggleWifi,
    bluetooth,
    toggleBluetooth,
    setLocked,
    addNotification,
    isMobile,
  } = useDesktopStore();

  const [activeCategory, setActiveCategory] = useState<SettingsCategory>('general');
  const [search, setSearch] = useState('');
  const [subPage, setSubPage] = useState<string | null>(null);
  const [mobileShowDetail, setMobileShowDetail] = useState(false);

  const categories = [
    { id: 'wifi', label: 'Wi-Fi', icon: Wifi, color: 'bg-blue-500' },
    { id: 'bluetooth', label: 'Bluetooth', icon: Bluetooth, color: 'bg-blue-600' },
    { id: 'network', label: 'Network', icon: Globe, color: 'bg-blue-500' },
    { id: 'vpn', label: 'VPN', icon: Shield, color: 'bg-blue-500' },
    { id: 'battery', label: 'Battery', icon: Battery, color: 'bg-emerald-500' },
    { id: 'divider-1', isDivider: true },
    { id: 'general', label: 'General', icon: SettingsIcon, color: 'bg-neutral-500' },
    { id: 'accessibility', label: 'Accessibility', icon: Eye, color: 'bg-blue-500' },
    { id: 'appearance', label: 'Appearance', icon: Sun, color: 'bg-black dark:bg-white text-white dark:text-black' },
    { id: 'siri', label: 'Apple Intelligence & Siri', icon: Sparkles, color: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { id: 'desktop_dock', label: 'Desktop & Dock', icon: Layout, color: 'bg-indigo-500' },
    { id: 'displays', label: 'Displays', icon: Monitor, color: 'bg-blue-500' },
    { id: 'menubar', label: 'Menu Bar', icon: Menu, color: 'bg-neutral-500' },
    { id: 'spotlight', label: 'Spotlight', icon: Search, color: 'bg-blue-500' },
    { id: 'wallpaper', label: 'Wallpaper', icon: ImageIcon, color: 'bg-cyan-500' },
    { id: 'notifications', label: 'Notifications', icon: Bell, color: 'bg-red-500' },
    { id: 'sound', label: 'Sound', icon: Volume2, color: 'bg-red-500' },
    { id: 'focus', label: 'Focus', icon: Moon, color: 'bg-purple-600' },
    { id: 'screentime', label: 'Screen Time', icon: Hourglass, color: 'bg-indigo-600' },
    { id: 'lockscreen', label: 'Lock Screen', icon: Lock, color: 'bg-neutral-600' },
    { id: 'privacy', label: 'Privacy & Security', icon: Shield, color: 'bg-blue-600' },
  ];

  const generalRows = [
    { id: 'about', label: 'About', icon: Laptop, color: 'bg-neutral-600' },
    { id: 'software_update', label: 'Software Update', icon: RefreshCw, color: 'bg-neutral-500' },
    { id: 'storage', label: 'Storage', icon: HardDrive, color: 'bg-neutral-500' },
    { id: 'applecare', label: 'AppleCare & Warranty', icon: Sparkles, color: 'bg-red-500' },
    { id: 'airdrop', label: 'AirDrop & Continuity', icon: Share2, color: 'bg-blue-500' },
    { id: 'autofill', label: 'AutoFill & Passwords', icon: KeyRound, color: 'bg-neutral-600' },
    { id: 'date_time', label: 'Date & Time', icon: Clock, color: 'bg-blue-500' },
    { id: 'language', label: 'Language & Region', icon: Globe, color: 'bg-blue-500' },
    { id: 'login_items', label: 'Login Items & Extensions', icon: Layers, color: 'bg-neutral-600' },
    { id: 'sharing', label: 'Sharing', icon: Share2, color: 'bg-neutral-500' },
    { id: 'startup_disk', label: 'Startup Disk', icon: HardDrive, color: 'bg-neutral-600' },
    { id: 'time_machine', label: 'Time Machine', icon: FolderSync, color: 'bg-teal-500' },
    { id: 'device_management', label: 'Device Management', icon: Shield, color: 'bg-neutral-600' },
  ];

  const isDark = theme === 'dark';

  const filteredCategories = categories.filter((c) =>
    c.isDivider || c.label?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={`flex h-full w-full select-none overflow-hidden font-[-apple-system,BlinkMacSystemFont,sans-serif] ${
      isDark ? 'bg-[#1e1e24] text-neutral-100' : 'bg-[#f6f6f8] text-neutral-900'
    }`}>
      {/* Left Sidebar */}
      {(!isMobile || !mobileShowDetail) && (
        <div className={`${isMobile ? 'w-full' : 'w-60'} h-full border-r flex flex-col p-3 shrink-0 backdrop-blur-xl ${
          isDark ? 'border-white/5 bg-[#18181c]/95' : 'border-black/10 bg-[#ebebed]/95'
        }`}>
          {/* Search */}
          <div className="relative mb-3">
            <Search size={13} className={`absolute left-2.5 top-2 ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`} />
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={`w-full pl-8 pr-3 py-1 rounded-lg text-xs outline-none focus:ring-1 focus:ring-blue-500/50 ${
                isDark
                  ? 'bg-neutral-800/80 border border-white/5 text-white placeholder-neutral-400'
                  : 'bg-white/80 border border-black/10 text-neutral-900 placeholder-neutral-500 shadow-2xs'
              }`}
            />
          </div>

          {/* User Account Row */}
          <div className={`flex items-center gap-2.5 p-2 rounded-xl transition-colors mb-3 cursor-pointer ${
            isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'
          }`}>
            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
              isDark ? 'bg-neutral-600 text-white' : 'bg-neutral-300 text-neutral-700'
            }`}>
              <User size={18} />
            </div>
            <div className="min-w-0 flex-1">
              <p className={`text-xs font-semibold truncate ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                Raj vishvakarma
              </p>
              <p className={`text-[11px] truncate ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                Apple Account
              </p>
            </div>
          </div>

          {/* Category List */}
          <div className="flex-1 overflow-y-auto space-y-0.5 pr-1 no-scrollbar">
            {filteredCategories.map((item, idx) => {
              if (item.isDivider) {
                return <div key={`div-${idx}`} className={`h-[1px] my-2 mx-2 ${isDark ? 'bg-white/10' : 'bg-black/10'}`} />;
              }

              const Icon = item.icon!;
              const isActive = activeCategory === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveCategory(item.id as SettingsCategory);
                    setSubPage(null);
                    if (isMobile) setMobileShowDetail(true);
                  }}
                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : isDark
                        ? 'text-neutral-300 hover:text-white hover:bg-white/5'
                        : 'text-neutral-700 hover:text-black hover:bg-black/5'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md flex items-center justify-center text-white shrink-0 shadow-2xs ${item.color}`}
                  >
                    <Icon size={12} />
                  </div>
                  <span className="truncate flex-1 text-left">{item.label}</span>
                  {isMobile && <ChevronRight size={14} className="opacity-40" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Right Content Pane */}
      {(!isMobile || mobileShowDetail) && (
        <div className={`flex-1 flex flex-col h-full overflow-hidden ${isDark ? 'bg-[#1e1e24]' : 'bg-[#f6f6f8]'}`}>
          {/* Top Navigation Strip */}
          <div className={`h-11 border-b flex items-center px-4 shrink-0 backdrop-blur-md justify-between ${
            isDark ? 'border-white/5 bg-[#23232a]/80' : 'border-black/10 bg-[#f0f0f2]/90'
          }`}>
            <div className="flex items-center gap-2">
              {isMobile && (
                <button
                  onClick={() => setMobileShowDetail(false)}
                  className="flex items-center gap-1 text-xs font-semibold text-blue-500 hover:text-blue-600 transition-colors py-1 px-2 -ml-2 rounded-lg active:bg-blue-500/10"
                >
                  <ChevronLeft size={16} />
                  <span>Settings</span>
                </button>
              )}
              <div className={`flex items-center gap-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                <button
                  onClick={() => setSubPage(null)}
                  disabled={!subPage}
                  className={`p-1 rounded-md transition-colors ${
                    isDark ? 'hover:bg-white/10' : 'hover:bg-black/5'
                  } ${!subPage ? 'opacity-30 cursor-not-allowed' : 'opacity-80'}`}
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  disabled
                  className="p-1 rounded-md opacity-30 cursor-not-allowed"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
            {isMobile && (
              <span className="text-xs font-semibold text-neutral-400 truncate max-w-[140px]">
                {categories.find((c) => c.id === activeCategory)?.label || 'General'}
              </span>
            )}
          </div>

        {/* Main Category Body */}
        <div className="flex-1 overflow-y-auto p-6 max-w-2xl mx-auto w-full">
          {/* GENERAL VIEW (Matches Image 1 precisely) */}
          {activeCategory === 'general' && (
            <div>
              {/* Header */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center shadow-md mb-3 ${
                  isDark ? 'bg-[#2a2a32] border-white/10 text-white' : 'bg-white border-black/10 text-neutral-800 shadow-sm'
                }`}>
                  <SettingsIcon size={30} />
                </div>
                <h1 className={`text-xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  General
                </h1>
                <p className={`text-xs max-w-md mt-1 leading-5 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  Manage your overall setup and preferences for Mac, such as software updates, device language, AirDrop, and more.
                </p>
              </div>

              {/* Grouped Table Rows matching Image 1 */}
              <div className={`rounded-xl border overflow-hidden ${
                isDark
                  ? 'border-white/10 bg-[#26262e] divide-y divide-white/5'
                  : 'border-black/10 bg-white divide-y divide-black/5 shadow-2xs'
              }`}>
                {generalRows.map((row) => {
                  const Icon = row.icon;
                  return (
                    <div
                      key={row.id}
                      onClick={() => {
                        if (row.id === 'about') {
                          addNotification('System', `macOS 27 Golden Gate 27.0 · MacBook Pro 16" (Apple M3 Max)`);
                        } else if (row.id === 'software_update') {
                          addNotification('Software Update', 'Your Mac is running macOS 27 Golden Gate (latest version).');
                        }
                      }}
                      className={`flex items-center justify-between px-3.5 py-2.5 cursor-pointer transition-colors ${
                        isDark ? 'hover:bg-white/5' : 'hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-md flex items-center justify-center text-white shadow-2xs ${row.color}`}
                        >
                          <Icon size={14} />
                        </div>
                        <span className={`text-xs font-medium ${isDark ? 'text-neutral-200' : 'text-neutral-800'}`}>
                          {row.label}
                        </span>
                      </div>
                      <ChevronRight size={14} className={isDark ? 'text-neutral-500' : 'text-neutral-400'} />
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* APPEARANCE VIEW */}
          {activeCategory === 'appearance' && (
            <div className="space-y-6">
              <div>
                <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Appearance</h2>
                <p className={`text-xs mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  Select the overall visual look of macOS.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setTheme('light')}
                  className={`p-4 rounded-xl border flex flex-col items-center space-y-3 transition-all ${
                    theme === 'light'
                      ? 'border-blue-500 bg-blue-500/10 shadow-md ring-2 ring-blue-500/30'
                      : isDark
                        ? 'border-white/10 bg-white/5 hover:border-white/20'
                        : 'border-black/10 bg-white hover:border-black/20 shadow-2xs'
                  }`}
                >
                  <div className="w-full h-16 rounded-lg bg-neutral-200 border border-neutral-300 flex items-center justify-center text-neutral-800 shadow-2xs">
                    <Sun size={24} className="text-amber-500" />
                  </div>
                  <span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Light Mode</span>
                </button>

                <button
                  onClick={() => setTheme('dark')}
                  className={`p-4 rounded-xl border flex flex-col items-center space-y-3 transition-all ${
                    theme === 'dark'
                      ? 'border-blue-500 bg-blue-500/10 shadow-md ring-2 ring-blue-500/30'
                      : isDark
                        ? 'border-white/10 bg-white/5 hover:border-white/20'
                        : 'border-black/10 bg-white hover:border-black/20 shadow-2xs'
                  }`}
                >
                  <div className="w-full h-16 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white shadow-2xs">
                    <Moon size={24} className="text-indigo-400" />
                  </div>
                  <span className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Dark Mode</span>
                </button>
              </div>
            </div>
          )}

          {/* WALLPAPER VIEW */}
          {activeCategory === 'wallpaper' && (
            <div className="space-y-4">
              <div>
                <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Wallpaper</h2>
                <p className={`text-xs mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  Choose a desktop wallpaper background.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {wallpapers.map((wp) => (
                  <button
                    key={wp.id}
                    onClick={() => setWallpaper(wp.id)}
                    className={`relative rounded-xl overflow-hidden border transition-all text-left group ${
                      wallpaper === wp.id
                        ? 'border-blue-500 ring-2 ring-blue-500/50'
                        : isDark
                          ? 'border-white/10 hover:border-white/30'
                          : 'border-black/10 hover:border-black/30 shadow-2xs'
                    }`}
                  >
                    <div className="h-24 w-full relative">
                      <img
                        src={wp.thumbnail || wp.lightImage}
                        alt={wp.name}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      {wallpaper === wp.id && (
                        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-md">
                          <Check size={12} strokeWidth={3} />
                        </div>
                      )}
                    </div>
                    <div className={`p-2 text-[11px] font-medium truncate ${
                      isDark ? 'bg-neutral-900/90 text-white' : 'bg-white text-neutral-800 border-t border-black/5'
                    }`}>
                      {wp.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* DISPLAYS VIEW */}
          {activeCategory === 'displays' && (
            <div className="space-y-6">
              <div>
                <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Displays</h2>
                <p className={`text-xs mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  Liquid Retina XDR Display · 3456 × 2234
                </p>
              </div>

              <div className={`p-4 rounded-xl border space-y-4 ${
                isDark ? 'border-white/10 bg-[#26262e]' : 'border-black/10 bg-white shadow-2xs'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-neutral-900 font-semibold'}`}>
                    Brightness
                  </span>
                  <span className={`text-xs font-mono ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {brightness}%
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* SOUND VIEW */}
          {activeCategory === 'sound' && (
            <div className="space-y-6">
              <div>
                <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Sound</h2>
                <p className={`text-xs mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  Output volume and audio alert effects.
                </p>
              </div>

              <div className={`p-4 rounded-xl border space-y-4 ${
                isDark ? 'border-white/10 bg-[#26262e]' : 'border-black/10 bg-white shadow-2xs'
              }`}>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium ${isDark ? 'text-white' : 'text-neutral-900 font-semibold'}`}>
                    Output Volume
                  </span>
                  <span className={`text-xs font-mono ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {volume}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>
            </div>
          )}

          {/* WI-FI VIEW */}
          {activeCategory === 'wifi' && (
            <div className="space-y-6">
              <div>
                <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Wi-Fi</h2>
                <p className={`text-xs mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  Connect to available wireless networks.
                </p>
              </div>

              <div className={`p-4 rounded-xl border flex items-center justify-between ${
                isDark ? 'border-white/10 bg-[#26262e]' : 'border-black/10 bg-white shadow-2xs'
              }`}>
                <div>
                  <p className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Wi-Fi</p>
                  <p className={`text-[11px] ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {wifi ? 'Connected to Portfolio-5G' : 'Disconnected'}
                  </p>
                </div>
                <button
                  onClick={toggleWifi}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
                    wifi ? 'bg-blue-600' : isDark ? 'bg-white/20' : 'bg-neutral-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                      wifi ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* BLUETOOTH VIEW */}
          {activeCategory === 'bluetooth' && (
            <div className="space-y-6">
              <div>
                <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Bluetooth</h2>
                <p className={`text-xs mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  Manage wireless accessories & peripherals.
                </p>
              </div>

              <div className={`p-4 rounded-xl border flex items-center justify-between ${
                isDark ? 'border-white/10 bg-[#26262e]' : 'border-black/10 bg-white shadow-2xs'
              }`}>
                <div>
                  <p className={`text-xs font-semibold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Bluetooth</p>
                  <p className={`text-[11px] ${isDark ? 'text-neutral-400' : 'text-neutral-500'}`}>
                    {bluetooth ? 'On (Discoverable)' : 'Off'}
                  </p>
                </div>
                <button
                  onClick={toggleBluetooth}
                  className={`w-11 h-6 rounded-full p-0.5 transition-colors ${
                    bluetooth ? 'bg-blue-600' : isDark ? 'bg-white/20' : 'bg-neutral-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white shadow-xs transition-transform ${
                      bluetooth ? 'translate-x-5' : ''
                    }`}
                  />
                </button>
              </div>
            </div>
          )}

          {/* LOCK SCREEN VIEW */}
          {activeCategory === 'lockscreen' && (
            <div className="space-y-6">
              <div>
                <h2 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-neutral-900'}`}>Lock Screen</h2>
                <p className={`text-xs mt-1 ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
                  Lock Screen appearance and instant trigger.
                </p>
              </div>

              <div className={`p-4 rounded-xl border space-y-4 ${
                isDark ? 'border-white/10 bg-[#26262e]' : 'border-black/10 bg-white shadow-2xs'
              }`}>
                <p className={`text-xs leading-relaxed ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
                  You can lock your Mac at any time to display the digital clock and Golden Gate background.
                </p>
                <button
                  onClick={() => setLocked(true)}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors"
                >
                  Lock Screen Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      )}
    </div>
  );
};

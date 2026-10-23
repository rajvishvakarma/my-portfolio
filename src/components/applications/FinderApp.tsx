'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Folder,
  FileText,
  Terminal as TerminalIcon,
  Globe,
  Briefcase,
  Layers,
  User,
  Mail,
  ChevronLeft,
  ChevronRight,
  Search,
  Grid,
  List as ListIcon,
  Download,
  ExternalLink,
} from 'lucide-react';
import { useDesktopStore } from '@/stores/useDesktopStore';
import { profile } from '@/data/profile';
import { AppId } from '@/types/desktop';

export const FinderApp: React.FC = () => {
  const { openApp } = useDesktopStore();
  const [currentFolder, setCurrentFolder] = useState<'recents' | 'applications' | 'documents' | 'projects'>('recents');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  const finderItems = [
    {
      id: 'about',
      name: 'About Raj.app',
      kind: 'Application',
      size: '4.2 MB',
      date: 'Today, 10:15 AM',
      icon: '/img/icons/folder-generic.png',
      appId: 'about' as AppId,
      category: ['recents', 'applications'],
    },
    {
      id: 'projects',
      name: 'Projects.app',
      kind: 'Application',
      size: '18.4 MB',
      date: 'Yesterday, 4:20 PM',
      icon: '/img/icons/safari.png',
      appId: 'projects' as AppId,
      category: ['recents', 'applications', 'projects'],
    },
    {
      id: 'skills',
      name: 'Skills & Stack.app',
      kind: 'Application',
      size: '2.8 MB',
      date: 'Oct 22, 2024',
      icon: '/img/icons/app-store.png',
      appId: 'skills' as AppId,
      category: ['recents', 'applications'],
    },
    {
      id: 'experience',
      name: 'Experience Timeline.app',
      kind: 'Application',
      size: '3.1 MB',
      date: 'Oct 20, 2024',
      icon: '/img/icons/calendar.png',
      appId: 'experience' as AppId,
      category: ['recents', 'applications', 'documents'],
    },
    {
      id: 'resume',
      name: 'Raj_Vishvakarma_Resume.pdf',
      kind: 'PDF Document',
      size: '118 KB',
      date: 'Oct 18, 2024',
      icon: '/img/icons/codefile.png',
      appId: 'resume' as AppId,
      category: ['recents', 'documents'],
    },
    {
      id: 'terminal',
      name: 'Terminal.app',
      kind: 'Application',
      size: '1.2 MB',
      date: 'Just now',
      icon: '/img/icons/terminal.png',
      appId: 'terminal' as AppId,
      category: ['recents', 'applications'],
    },
    {
      id: 'github',
      name: 'GitHub Explorer.app',
      kind: 'Application',
      size: '6.5 MB',
      date: 'Oct 15, 2024',
      icon: '/img/icons/github.png',
      appId: 'github' as AppId,
      category: ['recents', 'applications', 'projects'],
    },
    {
      id: 'contact',
      name: 'Contact Raj.app',
      kind: 'Application',
      size: '950 KB',
      date: 'Oct 12, 2024',
      icon: '/img/icons/mail.png',
      appId: 'contact' as AppId,
      category: ['recents', 'applications'],
    },
  ];

  const filteredItems = finderItems
    .filter((item) => item.category.includes(currentFolder))
    .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex flex-col h-full bg-white/95 dark:bg-[#1e1e1e]/95 text-neutral-800 dark:text-neutral-100 select-none">
      {/* Finder Toolbar */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-black/10 dark:border-white/10 bg-neutral-100/70 dark:bg-[#282828]/70 backdrop-blur-md">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 text-neutral-400 dark:text-neutral-500">
            <button className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              <ChevronLeft size={16} />
            </button>
            <button className="p-1 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>
          <span className="font-semibold text-xs tracking-wide text-neutral-700 dark:text-neutral-200 capitalize ml-1">
            {currentFolder}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          {/* View mode toggle */}
          <div className="flex items-center bg-black/5 dark:bg-white/10 rounded-md p-0.5 border border-black/5 dark:border-white/10">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-neutral-700 shadow-sm text-blue-600 dark:text-blue-400'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
              title="Grid View"
            >
              <Grid size={14} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1 rounded ${
                viewMode === 'list'
                  ? 'bg-white dark:bg-neutral-700 shadow-sm text-blue-600 dark:text-blue-400'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
              title="List View"
            >
              <ListIcon size={14} />
            </button>
          </div>

          {/* Search bar */}
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search Finder"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-7 pr-3 py-1 text-xs rounded-md bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500 w-36 sm:w-48 placeholder-neutral-400 dark:placeholder-neutral-500"
            />
          </div>
        </div>
      </div>

      {/* Main Finder Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Finder Sidebar */}
        <div className="w-48 bg-neutral-100/50 dark:bg-[#1a1a1a]/50 border-r border-black/10 dark:border-white/10 p-3 space-y-4 text-xs overflow-y-auto hidden sm:block">
          <div>
            <div className="px-2 py-1 text-[10px] font-semibold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">
              Favorites
            </div>
            <div className="space-y-0.5 mt-1">
              <button
                onClick={() => setCurrentFolder('recents')}
                className={`w-full flex items-center space-x-2.5 px-2 py-1.5 rounded-md text-left transition-colors ${
                  currentFolder === 'recents'
                    ? 'bg-blue-500 text-white font-medium'
                    : 'hover:bg-black/5 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-300'
                }`}
              >
                <Folder size={14} className={currentFolder === 'recents' ? 'text-white' : 'text-blue-500'} />
                <span>All Files & Apps</span>
              </button>
              <button
                onClick={() => setCurrentFolder('applications')}
                className={`w-full flex items-center space-x-2.5 px-2 py-1.5 rounded-md text-left transition-colors ${
                  currentFolder === 'applications'
                    ? 'bg-blue-500 text-white font-medium'
                    : 'hover:bg-black/5 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-300'
                }`}
              >
                <Layers size={14} className={currentFolder === 'applications' ? 'text-white' : 'text-blue-500'} />
                <span>Applications</span>
              </button>
              <button
                onClick={() => setCurrentFolder('projects')}
                className={`w-full flex items-center space-x-2.5 px-2 py-1.5 rounded-md text-left transition-colors ${
                  currentFolder === 'projects'
                    ? 'bg-blue-500 text-white font-medium'
                    : 'hover:bg-black/5 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-300'
                }`}
              >
                <Briefcase size={14} className={currentFolder === 'projects' ? 'text-white' : 'text-blue-500'} />
                <span>Projects</span>
              </button>
              <button
                onClick={() => setCurrentFolder('documents')}
                className={`w-full flex items-center space-x-2.5 px-2 py-1.5 rounded-md text-left transition-colors ${
                  currentFolder === 'documents'
                    ? 'bg-blue-500 text-white font-medium'
                    : 'hover:bg-black/5 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-300'
                }`}
              >
                <FileText size={14} className={currentFolder === 'documents' ? 'text-white' : 'text-blue-500'} />
                <span>Documents</span>
              </button>
            </div>
          </div>

          <div>
            <div className="px-2 py-1 text-[10px] font-semibold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">
              Quick Shortcuts
            </div>
            <div className="space-y-0.5 mt-1">
              <button
                onClick={() => openApp('about')}
                className="w-full flex items-center space-x-2.5 px-2 py-1.5 rounded-md text-left hover:bg-black/5 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-300 transition-colors"
              >
                <User size={14} className="text-purple-500" />
                <span>About Me</span>
              </button>
              <button
                onClick={() => openApp('terminal')}
                className="w-full flex items-center space-x-2.5 px-2 py-1.5 rounded-md text-left hover:bg-black/5 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-300 transition-colors"
              >
                <TerminalIcon size={14} className="text-emerald-500" />
                <span>Open Terminal</span>
              </button>
              <button
                onClick={() => openApp('contact')}
                className="w-full flex items-center space-x-2.5 px-2 py-1.5 rounded-md text-left hover:bg-black/5 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-300 transition-colors"
              >
                <Mail size={14} className="text-amber-500" />
                <span>Send Message</span>
              </button>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col overflow-y-auto p-4 space-y-4">
          {/* Welcome Banner Card inside Finder */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 border border-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/60 dark:border-white/20 shadow-md relative shrink-0">
                <Image src={profile.avatar} alt={profile.name} fill className="object-cover" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-base font-bold text-neutral-900 dark:text-white">{profile.name}</h2>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500 text-white font-medium">
                    {profile.role}
                  </span>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-0.5 max-w-md line-clamp-2">
                  {profile.shortBio}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <button
                onClick={() => openApp('projects')}
                className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium shadow-sm transition-all"
              >
                View Projects
              </button>
              <button
                onClick={() => openApp('resume')}
                className="px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-neutral-800 dark:text-neutral-200 text-xs font-medium transition-all"
              >
                Resume
              </button>
            </div>
          </div>

          {/* Files List / Grid */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 pt-1">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  onDoubleClick={() => openApp(item.appId)}
                  onClick={() => openApp(item.appId)}
                  className="group flex flex-col items-center p-3 rounded-xl hover:bg-blue-500/10 dark:hover:bg-blue-500/20 border border-transparent hover:border-blue-500/30 cursor-pointer transition-all duration-150 text-center"
                >
                  <div className="w-14 h-14 relative mb-2 transition-transform duration-200 group-hover:scale-105">
                    <Image src={item.icon} alt={item.name} fill className="object-contain drop-shadow-md" />
                  </div>
                  <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {item.name}
                  </span>
                  <span className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-0.5">{item.kind}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="border border-black/10 dark:border-white/10 rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 px-3 py-1.5 bg-neutral-100/70 dark:bg-neutral-800/70 text-[11px] font-semibold text-neutral-400 dark:text-neutral-500 border-b border-black/10 dark:border-white/10">
                <div className="col-span-6">Name</div>
                <div className="col-span-3">Kind</div>
                <div className="col-span-3 text-right">Size</div>
              </div>
              <div className="divide-y divide-black/5 dark:divide-white/5">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => openApp(item.appId)}
                    className="grid grid-cols-12 items-center px-3 py-2 text-xs hover:bg-blue-500/10 dark:hover:bg-blue-500/20 cursor-pointer transition-colors"
                  >
                    <div className="col-span-6 flex items-center space-x-2.5">
                      <div className="w-5 h-5 relative shrink-0">
                        <Image src={item.icon} alt={item.name} fill className="object-contain" />
                      </div>
                      <span className="font-medium text-neutral-800 dark:text-neutral-200 truncate">{item.name}</span>
                    </div>
                    <div className="col-span-3 text-neutral-500 text-[11px]">{item.kind}</div>
                    <div className="col-span-3 text-right text-neutral-500 text-[11px]">{item.size}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Finder Status Footer */}
      <div className="px-4 py-1.5 bg-neutral-100/80 dark:bg-[#1a1a1a]/80 border-t border-black/10 dark:border-white/10 text-[11px] text-neutral-500 flex justify-between items-center">
        <span>{filteredItems.length} items</span>
        <span className="text-neutral-400">Double click an item to launch</span>
      </div>
    </div>
  );
};

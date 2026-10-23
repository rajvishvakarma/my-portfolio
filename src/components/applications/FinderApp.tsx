'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { AppWindow, ArrowLeft, ArrowRight, ChevronDown, Clock3, Cloud, Columns3, Download, FileText, Folder, Grid2X2, HardDrive, Home, Images, List, MoreHorizontal, Search, Share2, Tag, Trash2, Wifi } from 'lucide-react';
import { AppId } from '@/types/desktop';
import { appsData } from '@/data/apps';
import { projects } from '@/data/projects';
import { useDesktopStore } from '@/stores/useDesktopStore';
import { WindowControls } from '@/components/windows/WindowControls';

type ViewMode = 'grid' | 'list' | 'columns' | 'gallery';
type FileItem = { name: string; kind: string; opened: string; appId: AppId; icon?: string };

const recentFiles: FileItem[] = [
  { name: 'Raj_Vishvakarma_Resume.pdf', kind: 'PDF Document', opened: 'Today', appId: 'resume' },
  { name: 'About Raj Vishvakarma', kind: 'Document', opened: 'Today', appId: 'about' },
  ...projects.map((project) => ({ name: project.title, kind: 'Project Folder', opened: 'Yesterday', appId: 'projects' as AppId })),
  { name: 'Metheus Lab — Experience', kind: 'Document', opened: 'This week', appId: 'experience' },
  { name: 'Skills & Tech Stack', kind: 'Document', opened: 'This week', appId: 'skills' },
  { name: 'Contact Raj', kind: 'Internet Shortcut', opened: 'This month', appId: 'contact' },
];

const sidebarGroups = [
  { title: '', items: [{ label: 'Recents', icon: Clock3 }, { label: 'Shared', icon: Folder }] },
  { title: 'Favorites', items: [{ label: 'Downloads', icon: Download }, { label: 'Desktop', icon: AppWindow }, { label: 'Applications', icon: Grid2X2 }, { label: 'Documents', icon: FileText }] },
  { title: 'Locations', items: [{ label: 'iCloud Drive', icon: Cloud }, { label: 'Raj’s Mac', icon: Home }, { label: 'Macintosh HD', icon: HardDrive }, { label: 'AirDrop', icon: Wifi }, { label: 'Trash', icon: Trash2 }] },
];

export const FinderApp: React.FC = () => {
  const [section, setSection] = useState('Recents');
  const [query, setQuery] = useState('');
  const [view, setView] = useState<ViewMode>('list');
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const openApp = useDesktopStore((state) => state.openApp);

  const items = useMemo(() => {
    let all: FileItem[];
    if (section === 'Applications') all = appsData.map((app) => ({ name: app.dockTitle, kind: 'Application', opened: 'Recently', appId: app.id, icon: app.icon }));
    else if (section === 'Documents' || section === 'Downloads') all = recentFiles.filter((file) => file.kind.includes('Document') || file.name.endsWith('.pdf'));
    else if (section === 'Trash') all = [];
    else if (section === 'AirDrop') all = [{ name: 'Share Raj’s portfolio', kind: 'Internet Shortcut', opened: 'Today', appId: 'contact' }];
    else all = recentFiles;
    return all.filter((file) => `${file.name} ${file.kind}`.toLowerCase().includes(query.toLowerCase()));
  }, [section, query]);

  const changeSection = (next: string) => { if (next !== section) setHistory((current) => [...current, section]); setSection(next); setSelectedFile(null); };
  const selected = items.find((file) => file.name === selectedFile);
  const fileIcon = (file: FileItem) => file.icon ? <Image src={file.icon} alt="" width={22} height={22} className="h-5 w-5 object-contain" /> : file.kind === 'Project Folder' ? <Folder size={20} className="fill-blue-500/40 text-blue-500" /> : <FileText size={19} className="text-neutral-500 dark:text-neutral-300" />;

  return <div className="finder-window flex h-full min-h-0 overflow-hidden text-neutral-900 dark:text-[#f0eff4]">
    <aside className="finder-sidebar flex w-[205px] shrink-0 flex-col overflow-y-auto border-r border-black/10 px-3 pb-3 dark:border-white/10">
      <div className="flex h-[62px] shrink-0 items-center px-2"><WindowControls appId="finder" /></div>
      {sidebarGroups.map((group) => <div key={group.title || 'top'} className="mb-3">{group.title && <div className="px-2 pb-1 pt-3 text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">{group.title}</div>}{group.items.map(({ label, icon: Icon }) => <button key={label} onClick={() => changeSection(label)} className={`finder-sidebar-item flex w-full items-center gap-2 rounded-[9px] px-2 py-1.5 text-left text-[13px] font-medium ${section === label ? 'bg-black/10 text-[#0a84ff] dark:bg-white/11' : 'hover:bg-black/5 dark:hover:bg-white/7'}`}><Icon size={18} strokeWidth={1.9} className={section === label ? 'text-[#0a84ff]' : 'text-neutral-600 dark:text-neutral-200'} /><span className="truncate">{label}</span></button>)}</div>)}
    </aside>
    <div className="flex min-w-0 flex-1 flex-col">
      <div data-window-drag className="finder-toolbar flex h-[62px] shrink-0 items-center gap-3 border-b border-black/10 px-4 dark:border-white/10">
        <div className="finder-toolbar-cluster flex items-center rounded-full"><button aria-label="Back" onClick={() => { const last = history.at(-1); if (last) { setSection(last); setHistory((current) => current.slice(0, -1)); } }} className="rounded-full p-2 text-neutral-500 hover:text-white"><ArrowLeft size={17} /></button><span className="h-5 w-px bg-white/10" /><button aria-label="Forward" onClick={() => changeSection('Recents')} className="rounded-full p-2 text-neutral-500 hover:text-white"><ArrowRight size={17} /></button></div>
        <h2 className="min-w-0 flex-1 truncate text-[18px] font-bold tracking-tight">{section}</h2>
        <div className="finder-toolbar-cluster hidden items-center rounded-full sm:flex">{([['grid', Grid2X2], ['list', List], ['columns', Columns3], ['gallery', Images]] as const).map(([mode, Icon]) => <button key={mode} aria-label={`${mode} view`} onClick={() => setView(mode)} className={`rounded-full p-2 ${view === mode ? 'bg-white/15 text-white' : 'text-neutral-400 hover:text-white'}`}><Icon size={17} /></button>)}</div>
        <button aria-label="Share selected item" onClick={() => selected && openApp(selected.appId)} className="hidden rounded-full p-2 text-neutral-400 hover:bg-white/10 hover:text-white md:block"><Share2 size={17} /></button>
        <button aria-label="Tags" onClick={() => setView('grid')} className="hidden rounded-full p-2 text-neutral-400 hover:bg-white/10 hover:text-white md:block"><Tag size={17} /></button>
        <button aria-label="More Finder actions" onClick={() => openApp('settings')} className="hidden rounded-full p-2 text-neutral-400 hover:bg-white/10 hover:text-white md:block"><MoreHorizontal size={19} /></button>
        <div className="finder-search flex items-center gap-1 rounded-full px-2.5 py-1.5"><Search size={16} /><input aria-label="Search Finder" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search" className="w-20 bg-transparent text-[12px] outline-none placeholder:text-neutral-400 focus:w-28" /></div>
      </div>
      {view === 'list' ? <div className="flex min-h-0 flex-1 flex-col"><div className="finder-list-head grid shrink-0 grid-cols-[minmax(170px,1fr)_145px_150px] border-b border-black/10 px-4 py-2 text-[11px] font-semibold text-neutral-500 dark:border-white/10 dark:text-neutral-400"><span>Name</span><span>Kind</span><span>Date Last Opened <ChevronDown size={11} className="inline" /></span></div><div className="min-h-0 flex-1 overflow-y-auto px-3 py-2">{items.map((file) => <button key={file.name} onClick={() => setSelectedFile(file.name)} onDoubleClick={() => openApp(file.appId)} className={`finder-file-row grid w-full grid-cols-[minmax(170px,1fr)_145px_150px] items-center rounded-[8px] px-2 py-[5px] text-left text-[12px] ${selectedFile === file.name ? 'bg-[#0a84ff]/80 text-white' : 'odd:bg-white/5 hover:bg-white/10'}`}><span className="flex min-w-0 items-center gap-2">{fileIcon(file)}<span className="truncate font-medium">{file.name}</span></span><span className="truncate text-neutral-500 dark:text-neutral-400">{file.kind}</span><span className="truncate text-neutral-500 dark:text-neutral-400">{file.opened}</span></button>)}{items.length === 0 && <div className="p-8 text-center text-sm text-neutral-500">No items here.</div>}</div></div> : <div className="grid min-h-0 flex-1 auto-rows-min grid-cols-3 gap-4 overflow-y-auto p-6 sm:grid-cols-4">{items.map((file) => <button key={file.name} onClick={() => setSelectedFile(file.name)} onDoubleClick={() => openApp(file.appId)} className={`flex flex-col items-center gap-2 rounded-xl p-3 text-center text-[12px] hover:bg-white/10 ${selectedFile === file.name ? 'bg-blue-500/25' : ''}`}><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">{file.icon ? <Image src={file.icon} alt="" width={42} height={42} /> : fileIcon(file)}</span><span className="line-clamp-2">{file.name}</span></button>)}</div>}
      <div className="finder-status flex h-9 shrink-0 items-center justify-center border-t border-black/10 text-[11px] text-neutral-500 dark:border-white/10 dark:text-neutral-400">{items.length} {items.length === 1 ? 'item' : 'items'}{selected ? ` · ${selected.name}` : ''}</div>
    </div>
  </div>;
};

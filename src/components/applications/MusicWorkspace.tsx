'use client';

import React, { useState } from 'react';
import { Home, Library, Music2, Pause, Play, Search, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { tracks } from '@/data/tracks';
import { useMediaStore } from '@/stores/useMediaStore';
import { useDesktopStore } from '@/stores/useDesktopStore';

const formatTime = (time: number) => `${Math.floor(time / 60)}:${String(Math.floor(time % 60)).padStart(2, '0')}`;

export const MusicWorkspace = ({ variant }: { variant: 'spotify' | 'music' }) => {
  const { trackIndex, playing, currentTime, duration, toggle, playTrack, next, previous } = useMediaStore();
  const { volume, setVolume } = useDesktopStore();
  const [query, setQuery] = useState('');
  const [view, setView] = useState<'home' | 'search'>('home');
  const track = tracks[trackIndex];
  const accent = variant === 'spotify' ? 'bg-[#1ed760]' : 'bg-[#fa567b]';

  const seek = (time: number) => {
    const audio = document.querySelector<HTMLAudioElement>('audio[aria-label^="Playing "]');
    if (audio && Number.isFinite(time)) audio.currentTime = time;
  };

  return <div className="flex h-full min-h-0 flex-col bg-[#080808] text-white">
    <div className="flex min-h-0 flex-1 gap-2 p-2 pb-0">
      <aside className="hidden w-[220px] shrink-0 flex-col gap-2 sm:flex">
        <div className="rounded-xl bg-[#151515] p-4">
          <button onClick={() => setView('home')} className={`flex w-full items-center gap-3 py-2 text-[13px] font-semibold ${view === 'home' ? 'text-white' : 'text-neutral-400'}`}><Home size={20} /> Home</button>
          <button onClick={() => setView('search')} className={`flex w-full items-center gap-3 py-2 text-[13px] font-semibold ${view === 'search' ? 'text-white' : 'text-neutral-400'}`}><Search size={20} /> Search</button>
        </div>
        <div className="flex-1 rounded-xl bg-[#151515] p-4"><div className="flex items-center gap-2 text-sm font-semibold text-neutral-300"><Library size={19} /> Your Library</div><div className="mt-5 rounded-lg bg-[#252525] p-4"><p className="text-xs font-bold">Focus Sessions</p><p className="mt-2 text-[11px] text-neutral-400">Original ambient tracks for this portfolio.</p><button onClick={() => playTrack(0)} className="mt-4 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-black">Play playlist</button></div></div>
      </aside>
      <main className="min-w-0 flex-1 overflow-y-auto rounded-xl bg-gradient-to-b from-[#303b3c] via-[#1b1d1d] to-[#151515] p-5">
        <div className="flex items-center justify-between gap-4"><div className="flex items-center gap-3"><Music2 size={26} className={variant === 'spotify' ? 'text-[#1ed760]' : 'text-[#fa567b]'} /><strong className="text-lg">{variant === 'spotify' ? 'Spotify' : 'Music'}</strong></div><div className="flex items-center gap-2 rounded-full bg-[#252525] px-3 py-2"><Search size={15} className="text-neutral-400" /><input aria-label="Search tracks" value={query} onChange={(event) => { setQuery(event.target.value); setView('search'); }} placeholder="What do you want to play?" className="w-36 bg-transparent text-xs outline-none placeholder:text-neutral-400 sm:w-56" /></div></div>
        <div className="mt-7"><p className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">{view === 'home' ? 'Made for this desktop' : 'Search results'}</p><h2 className="mt-1 text-2xl font-bold tracking-tight">{view === 'home' ? 'Focus Sessions' : `Tracks matching “${query}”`}</h2><p className="mt-1 text-xs text-neutral-400">Three original instrumental loops. Select one and keep browsing.</p></div>
        <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-3">{tracks.map((item, index) => item.title.toLowerCase().includes(query.toLowerCase()) && <button key={item.title} onClick={() => playTrack(index)} className="group rounded-xl bg-[#232323] p-3 text-left transition-colors hover:bg-[#303030]"><div className={`relative flex aspect-square items-center justify-center rounded-lg bg-gradient-to-br ${item.color} text-4xl font-black tracking-tighter shadow-lg`}><span className="drop-shadow-lg">{item.glyph}</span><span className={`absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full ${accent} text-black shadow-xl transition-transform group-hover:scale-110`}>{trackIndex === index && playing ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" />}</span></div><strong className="mt-3 block text-sm">{item.title}</strong><span className="text-xs text-neutral-400">{item.artist}</span></button>)}</div>
        <details className="mt-6 border-t border-white/10 pt-4 text-xs text-neutral-400"><summary className="cursor-pointer font-semibold text-white">Play a Spotify playlist</summary><p className="my-2">Spotify controls this player and may ask you to sign in for full tracks.</p><iframe title="Spotify playlist" className="h-[352px] w-full rounded-xl" src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" /><a href="https://open.spotify.com/" target="_blank" rel="noreferrer" className="mt-2 inline-block text-[#1ed760] hover:underline">Open full Spotify ↗</a></details>
      </main>
    </div>
    <div className="grid min-h-[74px] grid-cols-[1fr_2fr_1fr] items-center gap-3 border-t border-white/10 bg-[#111] px-4">
      <div className="flex min-w-0 items-center gap-3"><div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-gradient-to-br ${track.color} text-xs font-bold`}>{track.glyph}</div><div className="min-w-0"><strong className="block truncate text-xs">{track.title}</strong><span className="block truncate text-[10px] text-neutral-400">{track.artist}</span></div></div>
      <div className="min-w-0"><div className="flex items-center justify-center gap-5"><button aria-label="Previous track" onClick={previous} className="text-neutral-300 hover:text-white"><SkipBack size={17} fill="currentColor" /></button><button aria-label={playing ? 'Pause music' : 'Play music'} onClick={toggle} className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105">{playing ? <Pause size={17} fill="currentColor" /> : <Play size={17} fill="currentColor" />}</button><button aria-label="Next track" onClick={next} className="text-neutral-300 hover:text-white"><SkipForward size={17} fill="currentColor" /></button></div><div className="mt-2 flex items-center gap-2 text-[10px] text-neutral-400"><span className="w-8 text-right">{formatTime(currentTime)}</span><input aria-label="Song position" type="range" min="0" max={duration || 24} step="0.1" value={Math.min(currentTime, duration || 24)} onChange={(event) => seek(Number(event.target.value))} className="h-1 min-w-0 flex-1 accent-white" /><span className="w-8">{formatTime(duration || 24)}</span></div></div>
      <div className="hidden items-center justify-end gap-2 sm:flex"><Volume2 size={15} className="text-neutral-400" /><input aria-label="Music volume" type="range" min="0" max="100" value={volume} onChange={(event) => setVolume(Number(event.target.value))} className="w-20 accent-white" /></div>
    </div>
  </div>;
};

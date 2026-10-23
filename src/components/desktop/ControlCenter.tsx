'use client';

import React, { useState } from 'react';
import { Airplay, Bluetooth, Calculator, Grid2X2, Moon, Pause, Play, SkipBack, SkipForward, Sun, Volume2, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDesktopStore } from '@/stores/useDesktopStore';
import { useMediaStore } from '@/stores/useMediaStore';
import { tracks } from '@/data/tracks';

export const ControlCenter = () => {
  const { controlCenterOpen, setControlCenterOpen, wifi, toggleWifi, bluetooth, toggleBluetooth, focusMode, toggleFocus, brightness, setBrightness, volume, setVolume, theme, toggleTheme, openApp } = useDesktopStore();
  const { trackIndex, playing, toggle, next, previous } = useMediaStore();
  const [airdrop, setAirdrop] = useState(false);
  const tile = 'rounded-[20px] border border-white/25 bg-white/20 shadow-[inset_0_1px_1px_rgba(255,255,255,.28),0_8px_20px_rgba(0,0,0,.13)]';

  return <AnimatePresence>{controlCenterOpen && <motion.div
    initial={{ opacity: 0, y: -12, scale: .96 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -10, scale: .97 }}
    transition={{ type: 'spring', stiffness: 420, damping: 35 }}
    className="control-center fixed right-3 top-10 z-[9999] w-[350px] max-w-[calc(100vw-24px)] select-none rounded-[28px] p-3 text-white"
  >
    <div className="grid grid-cols-2 gap-2.5">
      <div className="space-y-2.5">
        <button onClick={toggleWifi} className={`${tile} flex min-h-[72px] w-full items-center gap-3 p-3 text-left ${wifi ? 'ring-2 ring-[#58baf4]/70' : 'opacity-65'}`}><span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#0878d9]"><Wifi size={25} strokeWidth={3} /></span><span><strong className="block text-sm">Wi-Fi</strong><small className="block text-[11px] leading-tight text-white/75">{wifi ? 'On' : 'Off'}</small></span></button>
        <button onClick={toggleBluetooth} className={`${tile} flex min-h-[64px] w-full items-center gap-3 p-3 text-left ${bluetooth ? '' : 'opacity-65'}`}><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#0878d9]"><Bluetooth size={22} /></span><span><strong className="block text-sm">Bluetooth</strong><small className="block text-[11px] text-white/75">{bluetooth ? 'On' : 'Off'}</small></span></button>
        <button onClick={() => setAirdrop(!airdrop)} className={`${tile} flex min-h-[64px] w-full items-center gap-3 p-3 text-left ${airdrop ? '' : 'opacity-75'}`}><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#0878d9]"><Airplay size={21} /></span><span><strong className="block text-sm">AirDrop</strong><small className="block text-[11px] text-white/75">{airdrop ? 'Contacts Only' : 'Off'}</small></span></button>
      </div>
      <div className="space-y-2.5">
        <div className={`${tile} h-[146px] p-3`}><div className="flex h-full flex-col justify-between"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10"><span className="text-xs font-bold">{tracks[trackIndex].glyph}</span></div><div><p className="truncate text-sm font-semibold">{playing ? tracks[trackIndex].title : 'Not Playing'}</p><div className="mt-2 flex justify-between px-1 text-white/70"><button aria-label="Previous track" onClick={previous}><SkipBack size={22} fill="currentColor" /></button><button aria-label={playing ? 'Pause music' : 'Play music'} onClick={toggle} className="text-white">{playing ? <Pause size={26} fill="currentColor" /> : <Play size={26} fill="currentColor" />}</button><button aria-label="Next track" onClick={next}><SkipForward size={22} fill="currentColor" /></button></div></div></div></div>
        <div className="grid grid-cols-2 gap-2.5"><button onClick={() => openApp('finder')} aria-label="Open Finder" className={`${tile} flex h-[64px] items-center justify-center`}><Grid2X2 size={25} /></button><button onClick={() => { openApp('settings'); setControlCenterOpen(false); }} aria-label="Open settings" className={`${tile} flex h-[64px] items-center justify-center`}><Airplay size={26} /></button></div>
      </div>
    </div>
    <div className="mt-2.5 grid grid-cols-[1fr_1fr_2fr] gap-2.5"><button onClick={toggleTheme} aria-label="Toggle appearance" className={`${tile} flex h-[62px] items-center justify-center`}>{theme === 'dark' ? <Moon size={25} /> : <Sun size={25} />}</button><button onClick={() => openApp('calculator')} aria-label="Open Calculator" className={`${tile} flex h-[62px] items-center justify-center`}><Calculator size={23} /></button><button onClick={toggleFocus} className={`${tile} flex h-[62px] items-center gap-3 p-3 ${focusMode ? 'ring-2 ring-white/55' : ''}`}><span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20"><Moon size={21} /></span><span className="text-sm font-semibold">Focus</span></button></div>
    <div className={`${tile} mt-2.5 p-3`}><div className="mb-2 flex items-center justify-between text-sm font-semibold"><span>Display</span><span className="text-xs text-white/65">{brightness}%</span></div><div className="flex items-center gap-2"><Sun size={16} /><input aria-label="Display brightness" type="range" min="25" max="100" value={brightness} onChange={(event) => setBrightness(Number(event.target.value))} className="w-full accent-white" /><Sun size={20} /></div></div>
    <div className={`${tile} mt-2.5 p-3`}><div className="mb-2 flex items-center justify-between text-sm font-semibold"><span>Sound</span><span className="text-xs text-white/65">{volume}%</span></div><div className="flex items-center gap-2"><Volume2 size={16} /><input aria-label="Sound volume" type="range" min="0" max="100" value={volume} onChange={(event) => setVolume(Number(event.target.value))} className="w-full accent-white" /><Volume2 size={20} /></div></div>
  </motion.div>}</AnimatePresence>;
};

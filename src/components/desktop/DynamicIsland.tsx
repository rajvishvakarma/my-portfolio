'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music2, Wifi, WifiOff, Bell, Volume2, Pause, Play, SkipForward } from 'lucide-react';
import { useDesktopStore } from '@/stores/useDesktopStore';
import { useMediaStore } from '@/stores/useMediaStore';
import { tracks } from '@/data/tracks';

export const DynamicIsland = () => {
  const [expanded, setExpanded] = useState(false);
  const { wifi, volume, notifications, openApp, setControlCenterOpen } = useDesktopStore();
  const { playing, trackIndex, toggle, next } = useMediaStore();
  const latest = notifications[0];
  return <div className="fixed left-1/2 top-0 z-[9995] -translate-x-1/2 select-none">
    <motion.div layout initial={false} animate={{ width: expanded ? 320 : playing ? 166 : 145, height: expanded ? 100 : 32 }} transition={{ type: 'spring', stiffness: 380, damping: 30 }} className="overflow-hidden rounded-b-[16px] bg-[#050506] text-white shadow-[0_5px_22px_rgba(0,0,0,.45)]">
      {!expanded ? <button className="flex h-full w-full items-center justify-center px-3" onClick={() => setExpanded(true)} aria-label="Open Dynamic Island">{playing && <span className="flex items-center gap-2 truncate text-[10px] font-medium text-white/80"><span className="h-1.5 w-1.5 rounded-full bg-green-400" />{tracks[trackIndex].title}</span>}</button> : <div className="flex h-full flex-col justify-between p-3"><button onClick={() => setExpanded(false)} className="flex w-full items-center justify-between text-left"><span className="flex min-w-0 items-center gap-2 text-xs font-semibold">{playing ? <Music2 size={15} className="shrink-0 text-green-400" /> : <Bell size={15} className="shrink-0 text-blue-400" />}<span className="truncate">{playing ? tracks[trackIndex].title : latest?.title ?? 'Welcome to Raj’s desktop'}</span></span><span className="text-[10px] text-white/50">Close</span></button><p className="truncate pl-6 text-[11px] text-white/60">{playing ? tracks[trackIndex].artist : latest?.message ?? 'Explore the apps below'}</p><div className="flex items-center gap-2 pl-6"><button onClick={() => { openApp('spotify'); setExpanded(false); }} className="flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[10px]"><Music2 size={11} /> Music</button><button onClick={() => { setControlCenterOpen(true); setExpanded(false); }} className="flex items-center gap-1 rounded-full bg-white/15 px-2 py-1 text-[10px]">{wifi ? <Wifi size={11} /> : <WifiOff size={11} />} Wi-Fi</button><button aria-label={playing ? 'Pause music' : 'Play music'} onClick={toggle} className="ml-auto rounded-full bg-white/15 p-1">{playing ? <Pause size={13} /> : <Play size={13} />}</button><button aria-label="Next track" onClick={next} className="rounded-full bg-white/15 p-1"><SkipForward size={13} /></button><span className="flex items-center gap-1 text-[10px] text-white/60"><Volume2 size={11} />{volume}%</span></div></div>}
    </motion.div>
  </div>;
};

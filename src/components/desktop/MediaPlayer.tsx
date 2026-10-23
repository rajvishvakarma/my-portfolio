'use client';

import { useEffect, useRef } from 'react';
import { tracks } from '@/data/tracks';
import { useMediaStore } from '@/stores/useMediaStore';
import { useDesktopStore } from '@/stores/useDesktopStore';

export const MediaPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { trackIndex, playing, next, setPlaying, setProgress } = useMediaStore();
  const volume = useDesktopStore((state) => state.volume);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) audio.play().catch(() => setPlaying(false));
    else audio.pause();
  }, [playing, trackIndex, setPlaying]);

  return <audio
    ref={audioRef}
    src={tracks[trackIndex].src}
    preload="metadata"
    onEnded={next}
    onTimeUpdate={(event) => setProgress(event.currentTarget.currentTime, event.currentTarget.duration || 24)}
    onLoadedMetadata={(event) => setProgress(event.currentTarget.currentTime, event.currentTarget.duration || 24)}
    aria-label={`Playing ${tracks[trackIndex].title}`}
  />;
};

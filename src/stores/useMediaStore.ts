import { create } from 'zustand';
import { tracks } from '@/data/tracks';

interface MediaState {
  trackIndex: number;
  playing: boolean;
  currentTime: number;
  duration: number;
  setPlaying: (playing: boolean) => void;
  toggle: () => void;
  playTrack: (index: number) => void;
  next: () => void;
  previous: () => void;
  setProgress: (currentTime: number, duration: number) => void;
}

export const useMediaStore = create<MediaState>((set, get) => ({
  trackIndex: 0,
  playing: false,
  currentTime: 0,
  duration: 24,
  setPlaying: (playing) => set({ playing }),
  toggle: () => set({ playing: !get().playing }),
  playTrack: (index) => set({ trackIndex: index, playing: true, currentTime: 0 }),
  next: () => set({ trackIndex: (get().trackIndex + 1) % tracks.length, playing: true, currentTime: 0 }),
  previous: () => set({ trackIndex: (get().trackIndex + tracks.length - 1) % tracks.length, playing: true, currentTime: 0 }),
  setProgress: (currentTime, duration) => set({ currentTime, duration }),
}));

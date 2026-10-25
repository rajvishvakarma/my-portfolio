'use client';

import React, { useState } from 'react';
import { Search, Play, ExternalLink, ThumbsUp, Share2, Sparkles } from 'lucide-react';

interface YouTubeEmbedViewProps {
  initialVideoId?: string;
  isDark?: boolean;
}

interface VideoItem {
  id: string;
  title: string;
  channel: string;
  views: string;
  duration: string;
  thumbnail: string;
}

const FEATURED_VIDEOS: VideoItem[] = [
  {
    id: 'exM13DzQK1s',
    title: 'Apple Event — Scary Fast MacBook Pro with M3 Max',
    channel: 'Apple',
    views: '14M views',
    duration: '30:24',
    thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'jfKfPfyJRdk',
    title: 'lofi hip hop radio 📚 - beats to relax/study to',
    channel: 'Lofi Girl',
    views: '42K watching',
    duration: 'LIVE',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'wm5gMKuwSYk',
    title: 'Next.js 16 Full Course 2026 — App Router, Server Actions & Turbopack',
    channel: 'JavaScript Mastery',
    views: '850K views',
    duration: '4:15:20',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: 'fJ9rUzIMcZQ',
    title: 'Autonomous Mobile Robotics & Edge Computing Telemetry',
    channel: 'Raj Vishvakarma',
    views: '24K views',
    duration: '12:40',
    thumbnail: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&auto=format&fit=crop&q=60',
  },
  {
    id: '9vM4p9NN0Ts',
    title: 'Autonomous AI Agents: DeepSeek, OpenAI & Claude in Action',
    channel: 'AI Coffee Break',
    views: '410K views',
    duration: '21:05',
    thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500&auto=format&fit=crop&q=60',
  },
];

export const YouTubeEmbedView: React.FC<YouTubeEmbedViewProps> = ({
  initialVideoId = 'exM13DzQK1s',
  isDark = true,
}) => {
  const [selectedVideoId, setSelectedVideoId] = useState(initialVideoId);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeVideo, setActiveVideo] = useState<VideoItem>(
    FEATURED_VIDEOS.find((v) => v.id === initialVideoId) || FEATURED_VIDEOS[0]
  );
  const [isLiked, setIsLiked] = useState(false);

  const handleSelectVideo = (video: VideoItem) => {
    setSelectedVideoId(video.id);
    setActiveVideo(video);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    // Check if query is a direct YouTube link or video ID
    const match = searchQuery.match(/(?:watch\?v=|youtu\.be\/|embed\/|^)([a-zA-Z0-9_-]{11})/);
    if (match) {
      const id = match[1];
      setSelectedVideoId(id);
      setActiveVideo({
        id,
        title: `YouTube Video (${id})`,
        channel: 'YouTube',
        views: 'Now playing',
        duration: 'HD',
        thumbnail: '',
      });
    } else {
      // Find matching in list or load relevant demo
      const found = FEATURED_VIDEOS.find((v) =>
        v.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (found) {
        handleSelectVideo(found);
      } else {
        // Fallback to active video with query
        setSelectedVideoId('exM13DzQK1s');
      }
    }
  };

  return (
    <div
      className={`h-full w-full flex flex-col select-none overflow-y-auto font-[-apple-system,BlinkMacSystemFont,sans-serif] ${
        isDark ? 'bg-[#0f0f0f] text-white' : 'bg-white text-neutral-900'
      }`}
    >
      {/* YouTube Red Top Bar */}
      <div
        className={`h-14 border-b flex items-center justify-between px-4 gap-4 shrink-0 sticky top-0 z-30 ${
          isDark ? 'border-white/10 bg-[#0f0f0f]/95' : 'border-black/10 bg-white/95'
        } backdrop-blur-md`}
      >
        {/* Brand */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="w-7 h-5 rounded-md bg-[#ff0000] flex items-center justify-center text-white shadow-xs">
            <Play size={10} fill="white" />
          </div>
          <span className="font-bold text-base tracking-tighter">YouTube</span>
        </div>

        {/* Center Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex-1 max-w-xl flex items-center rounded-full border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-[#121212] overflow-hidden px-3 py-1 shadow-2xs"
        >
          <input
            type="text"
            placeholder="Search YouTube or paste video ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-xs outline-none placeholder:text-neutral-500"
          />
          <button type="submit" className="text-neutral-400 hover:text-red-500 transition-colors p-1">
            <Search size={14} />
          </button>
        </form>

        {/* Right External Link */}
        <a
          href={`https://www.youtube.com/watch?v=${selectedVideoId}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors shrink-0"
        >
          <span>Open Web</span>
          <ExternalLink size={12} />
        </a>
      </div>

      {/* Main Video View Area */}
      <div className="flex-1 p-4 md:p-6 max-w-5xl mx-auto w-full space-y-6">
        {/* Responsive 16:9 Video Player */}
        <div className="w-full aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10 relative">
          <iframe
            key={selectedVideoId}
            src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1&enablejsapi=1`}
            title={activeVideo.title}
            className="w-full h-full border-none"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {/* Video Information Header */}
        <div className="space-y-3">
          <h1 className="text-lg md:text-xl font-bold tracking-tight">
            {activeVideo.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-black/10 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white font-bold text-sm shadow-xs">
                {activeVideo.channel.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold">{activeVideo.channel}</p>
                <p className="text-xs text-neutral-500">{activeVideo.views}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                  isLiked
                    ? 'bg-red-600 text-white'
                    : 'bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700'
                }`}
              >
                <ThumbsUp size={13} fill={isLiked ? 'white' : 'none'} />
                <span>{isLiked ? 'Liked' : 'Like'}</span>
              </button>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${selectedVideoId}`);
                  alert('Copied video link to clipboard!');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
              >
                <Share2 size={13} />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Recommendations Grid */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-neutral-400">
            Recommended For You
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {FEATURED_VIDEOS.map((video) => {
              const isCurrent = video.id === selectedVideoId;
              return (
                <div
                  key={video.id}
                  onClick={() => handleSelectVideo(video)}
                  className={`flex flex-col rounded-xl overflow-hidden border cursor-pointer transition-all hover:scale-[1.02] ${
                    isCurrent
                      ? 'border-red-500 ring-2 ring-red-500/30'
                      : 'border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20'
                  } bg-neutral-100 dark:bg-[#181818]` }
                >
                  <div className="relative aspect-video bg-neutral-800">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg">
                        <Play size={16} fill="white" />
                      </div>
                    </div>
                    <span className="absolute bottom-1.5 right-1.5 px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white">
                      {video.duration}
                    </span>
                  </div>

                  <div className="p-3 space-y-1">
                    <h3 className="text-xs font-bold line-clamp-2 leading-tight">
                      {video.title}
                    </h3>
                    <p className="text-[11px] text-neutral-500">{video.channel}</p>
                    <p className="text-[10px] text-neutral-400">{video.views}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

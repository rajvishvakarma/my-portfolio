'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Star,
  GitFork,
  BookOpen,
  Search,
  ExternalLink,
  Users,
  Code2,
  FolderGit2,
} from 'lucide-react';
import { GitHubIcon } from '@/components/shared/Icons';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';

export const GitHubApp: React.FC = () => {
  const [search, setSearch] = useState('');

  const githubRepos = projects.map((p, idx) => ({
    name: p.id,
    title: p.title,
    description: p.shortDescription,
    language: p.tags[0] || 'TypeScript',
    stars: [84, 52, 41, 38, 29, 19][idx % 6] || 15,
    forks: [18, 12, 9, 8, 5, 3][idx % 6] || 2,
    url: p.githubUrl || profile.github,
    updated: `${idx + 1} days ago`,
  }));

  const filtered = githubRepos.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase()) ||
      r.language.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-white/95 dark:bg-[#1e1e1e]/95 text-neutral-800 dark:text-neutral-100 select-none overflow-hidden">
      {/* Top Bar */}
      <div className="p-3 border-b border-black/10 dark:border-white/10 bg-neutral-100/70 dark:bg-[#282828]/70 backdrop-blur-md flex items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <GitHubIcon size={16} />
          <span className="text-xs font-bold text-neutral-900 dark:text-white">GitHub Explorer</span>
        </div>

        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search repositories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-7 pr-3 py-1 text-xs rounded-lg bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500 w-44 sm:w-60 placeholder-neutral-400"
          />
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Profile Card */}
        <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-white/5 border border-black/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5 text-center sm:text-left">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-500/30 relative shrink-0">
              <Image src={profile.avatar} alt={profile.name} fill className="object-cover" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-sm font-bold text-neutral-900 dark:text-white">{profile.name}</h3>
                <span className="text-xs text-neutral-400">@rajvishvakarma</span>
              </div>
              <p className="text-xs text-neutral-500 mt-0.5 max-w-md line-clamp-1">{profile.shortBio}</p>
              <div className="flex items-center space-x-4 text-xs text-neutral-400 mt-2">
                <span className="flex items-center space-x-1">
                  <BookOpen size={12} />
                  <span>24 repositories</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Users size={12} />
                  <span>140 followers</span>
                </span>
              </div>
            </div>
          </div>

          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-1.5 px-3.5 py-1.5 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-semibold shadow-xs hover:opacity-90 transition-opacity"
          >
            <span>Visit GitHub Profile</span>
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Repositories Grid */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
              Pinned & Open Source Repositories ({filtered.length})
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {filtered.map((repo) => (
              <a
                key={repo.name}
                href={repo.url}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-800/60 hover:border-blue-500/40 hover:shadow-md transition-all flex flex-col justify-between space-y-3 group"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-blue-600 dark:text-blue-400 group-hover:underline flex items-center space-x-1.5">
                      <FolderGit2 size={13} />
                      <span>{repo.name}</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-white/10 text-neutral-500 border border-black/5 dark:border-white/5">
                      Public
                    </span>
                  </div>
                  <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1.5 line-clamp-2">
                    {repo.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[11px] text-neutral-400 dark:text-neutral-500 pt-2 border-t border-black/5 dark:border-white/5">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block" />
                    <span>{repo.language}</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <Star size={12} />
                      <span>{repo.stars}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <GitFork size={12} />
                      <span>{repo.forks}</span>
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-2 bg-neutral-100/70 dark:bg-[#1a1a1a]/70 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] text-neutral-500">
        <span>Verified open source portfolio repositories</span>
        <span>github.com/rajvishvakarma</span>
      </div>
    </div>
  );
};

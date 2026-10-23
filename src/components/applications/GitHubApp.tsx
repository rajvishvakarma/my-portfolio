'use client';

import React from 'react';
import { ExternalLink } from 'lucide-react';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { useDesktopStore } from '@/stores/useDesktopStore';

export const GitHubApp: React.FC = () => {
  const openApp = useDesktopStore((state) => state.openApp);
  return <div className="h-full overflow-y-auto bg-[#f5f6f8] p-6 text-neutral-900 dark:bg-[#202126] dark:text-white"><div className="mx-auto max-w-2xl space-y-6"><div className="rounded-2xl bg-white p-6 dark:bg-white/10"><h1 className="text-xl font-bold">Raj on GitHub</h1><p className="mt-1 text-sm text-neutral-500">@rajvishvakarma088-star</p><a href={profile.github} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-neutral-900 px-4 py-2 text-sm text-white dark:bg-white dark:text-neutral-900">Open GitHub profile <ExternalLink size={14}/></a></div><div><h2 className="mb-3 text-sm font-bold">Projects from my resume</h2><div className="grid gap-3 sm:grid-cols-2">{projects.map((project) => <button key={project.id} onClick={() => openApp('projects')} className="rounded-xl border border-black/10 bg-white p-4 text-left hover:border-blue-500 dark:border-white/10 dark:bg-white/10"><strong className="text-sm">{project.title}</strong><p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">{project.shortDescription}</p></button>)}</div></div></div></div>;
};

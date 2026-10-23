'use client';

import React from 'react';
import { profile } from '@/data/profile';
import { useDesktopStore } from '@/stores/useDesktopStore';

export const AboutApp: React.FC = () => {
  const openApp = useDesktopStore((state) => state.openApp);
  return <div className="h-full overflow-y-auto bg-[#f7f8fa] p-6 text-neutral-900 dark:bg-[#202126] dark:text-white"><div className="mx-auto max-w-2xl space-y-6"><header className="rounded-2xl bg-white p-6 shadow-sm dark:bg-white/10"><span className="text-xs font-bold uppercase tracking-widest text-blue-600">About me</span><h1 className="mt-2 text-3xl font-bold">{profile.name}</h1><p className="mt-1 text-sm font-semibold text-blue-600">{profile.role}</p><p className="mt-3 text-neutral-600 dark:text-neutral-300">{profile.tagline}</p><p className="mt-2 text-xs text-neutral-500">{profile.location}</p></header>{profile.fullBio.map((paragraph) => <p key={paragraph} className="rounded-xl bg-white p-5 text-sm leading-7 dark:bg-white/10">{paragraph}</p>)}<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{profile.stats.map((stat) => <div key={stat.label} className="rounded-xl bg-white p-4 text-center dark:bg-white/10"><div className="text-xl font-bold text-blue-600">{stat.value}</div><div className="mt-1 text-xs text-neutral-500">{stat.label}</div></div>)}</div><div className="flex flex-wrap gap-2"><button onClick={() => openApp('projects')} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">View projects</button><button onClick={() => openApp('resume')} className="rounded-lg bg-black/10 px-4 py-2 text-sm font-semibold dark:bg-white/10">View resume</button><a href={`mailto:${profile.email}`} className="rounded-lg bg-black/10 px-4 py-2 text-sm font-semibold dark:bg-white/10">Email Raj</a></div></div></div>;
};

'use client';

import React, { useState } from 'react';
import { skills, skillCategories } from '@/data/skills';
import { SkillCategory } from '@/types/portfolio';

export const SkillsApp: React.FC = () => {
  const [category, setCategory] = useState<SkillCategory | 'All'>('All');
  const [query, setQuery] = useState('');
  const filtered = skills.filter((skill) => (category === 'All' || skill.category === category) && skill.name.toLowerCase().includes(query.toLowerCase()));
  return <div className="flex h-full flex-col bg-[#f7f8fa] text-neutral-900 dark:bg-[#202126] dark:text-white"><header className="border-b border-black/10 bg-white/90 p-4 dark:border-white/10 dark:bg-[#303238]"><h2 className="text-sm font-bold">Skills & tools</h2><p className="text-xs text-neutral-500">Technologies listed in my resume</p></header><div className="flex min-h-0 flex-1"><aside className="hidden w-48 shrink-0 overflow-y-auto border-r border-black/10 bg-[#eceef1] p-3 sm:block dark:border-white/10 dark:bg-[#2b2d33]">{(['All', ...skillCategories] as const).map((item) => <button key={item} onClick={() => setCategory(item)} className={`mb-1 w-full rounded-lg px-3 py-2 text-left text-xs ${category === item ? 'bg-blue-600 text-white' : 'hover:bg-black/5 dark:hover:bg-white/10'}`}>{item}</button>)}</aside><div className="min-w-0 flex-1 overflow-y-auto p-5"><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a skill" className="mb-4 w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500 dark:border-white/10 dark:bg-white/10"/><div className="mb-4 flex gap-2 overflow-x-auto sm:hidden">{(['All', ...skillCategories] as const).map((item) => <button key={item} onClick={() => setCategory(item)} className={`shrink-0 rounded-full px-3 py-1 text-xs ${category === item ? 'bg-blue-600 text-white' : 'bg-white dark:bg-white/10'}`}>{item}</button>)}</div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((skill) => <div key={skill.name} className="rounded-xl border border-black/10 bg-white p-4 dark:border-white/10 dark:bg-white/10"><strong className="text-sm">{skill.name}</strong><p className="mt-1 text-xs text-neutral-500">{skill.category}</p></div>)}</div>{filtered.length === 0 && <p className="text-sm text-neutral-500">No matching skills.</p>}</div></div></div>;
};

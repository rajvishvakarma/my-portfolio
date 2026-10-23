'use client';

import React, { useState } from 'react';
import { profile } from '@/data/profile';
import { projects } from '@/data/projects';
import { experiences, educations } from '@/data/experience';

export const BearApp: React.FC = () => {
  const [selected, setSelected] = useState('welcome');
  const notes = [
    { id: 'welcome', title: 'Hello, I’m Raj' },
    { id: 'work', title: 'What I do' },
    ...projects.map((project) => ({ id: project.id, title: project.title })),
  ];
  const project = projects.find((item) => item.id === selected);

  return <div className="bear flex h-full bg-[#f7f8fa] text-neutral-900 dark:bg-[#202126] dark:text-white">
    <aside className="w-52 shrink-0 overflow-y-auto border-r border-black/10 bg-[#e7e9ed] p-3 dark:border-white/10 dark:bg-[#292b30]">
      <div className="px-2 pb-3 text-[11px] font-semibold uppercase tracking-widest text-neutral-500">Raj’s notebook</div>
      {notes.map((note) => <button key={note.id} onClick={() => setSelected(note.id)} className={`mb-1 w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${selected === note.id ? 'bg-white text-blue-700 shadow-sm dark:bg-white/15 dark:text-blue-300' : 'hover:bg-black/5 dark:hover:bg-white/10'}`}>{note.title}</button>)}
    </aside>
    <article className="min-w-0 flex-1 overflow-y-auto p-8 md:p-10">
      {selected === 'welcome' ? <div className="max-w-2xl space-y-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">Welcome to my desktop</p>
        <h1 className="text-4xl font-bold tracking-tight">Hi, I’m Raj Vishvakarma.</h1>
        <p className="text-lg text-neutral-600 dark:text-neutral-300">{profile.tagline}</p>
        {profile.fullBio.map((paragraph) => <p key={paragraph} className="leading-7 text-neutral-700 dark:text-neutral-300">{paragraph}</p>)}
        <div className="flex flex-wrap gap-2 pt-3"><a className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white" href="/resume.pdf" target="_blank">View resume</a><a className="rounded-full border border-black/10 px-4 py-2 text-sm font-semibold dark:border-white/20" href={`mailto:${profile.email}`}>Get in touch</a></div>
      </div> : selected === 'work' ? <div className="max-w-2xl space-y-5"><h1 className="text-3xl font-bold">Experience & education</h1>{experiences.map((item) => <section key={item.id} className="rounded-xl border border-black/10 p-4 dark:border-white/10"><h2 className="font-semibold">{item.role} · {item.organization}</h2><p className="text-sm text-neutral-500">{item.period} · {item.location}</p><p className="mt-2 text-sm">{item.description}</p></section>)}{educations.map((item) => <section key={item.id} className="rounded-xl border border-black/10 p-4 dark:border-white/10"><h2 className="font-semibold">{item.degree}</h2><p className="text-sm text-neutral-500">{item.institution} · {item.period}</p></section>)}</div> : project ? <div className="max-w-2xl space-y-5"><p className="text-xs font-semibold uppercase tracking-widest text-blue-600">Project note</p><h1 className="text-3xl font-bold">{project.title}</h1><p className="text-lg text-neutral-600 dark:text-neutral-300">{project.shortDescription}</p><p className="leading-7">{project.description}</p><ul className="list-disc space-y-2 pl-5 text-sm">{project.keyFeatures.map((feature) => <li key={feature}>{feature}</li>)}</ul><div className="flex flex-wrap gap-2">{project.tags.map((tag) => <span key={tag} className="rounded-full bg-black/5 px-3 py-1 text-xs dark:bg-white/10">{tag}</span>)}</div></div> : null}
    </article>
  </div>;
};

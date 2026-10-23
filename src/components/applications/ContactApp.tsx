'use client';

import React, { useState } from 'react';
import { Mail, Copy, Check, ExternalLink } from 'lucide-react';
import { profile } from '@/data/profile';

export const ContactApp: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const send = (event: React.FormEvent) => { event.preventDefault(); const body = `${name ? `From: ${name}\n\n` : ''}${message}`; window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject || 'Hello Raj')}&body=${encodeURIComponent(body)}`; };
  return <div className="h-full overflow-y-auto bg-[#f5f6f8] p-6 text-neutral-900 dark:bg-[#202126] dark:text-white"><div className="mx-auto max-w-xl space-y-6"><div><h1 className="text-2xl font-bold">Let’s connect</h1><p className="mt-1 text-sm text-neutral-500">Your message opens in your email app, ready for you to send.</p></div><div className="flex flex-wrap items-center gap-2 rounded-xl bg-white p-4 dark:bg-white/10"><Mail size={18}/><a className="min-w-0 flex-1 truncate text-sm text-blue-600 dark:text-blue-400" href={`mailto:${profile.email}`}>{profile.email}</a><button title="Copy email" onClick={async () => { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="rounded-lg bg-black/5 p-2 dark:bg-white/10">{copied ? <Check size={16}/> : <Copy size={16}/>}</button></div><form onSubmit={send} className="space-y-3 rounded-xl bg-white p-5 dark:bg-white/10"><label className="block text-xs font-semibold">Your name<input value={name} onChange={(event) => setName(event.target.value)} className="mt-1 block w-full rounded-lg border border-black/10 bg-transparent p-2 text-sm dark:border-white/20"/></label><label className="block text-xs font-semibold">Subject<input value={subject} onChange={(event) => setSubject(event.target.value)} className="mt-1 block w-full rounded-lg border border-black/10 bg-transparent p-2 text-sm dark:border-white/20"/></label><label className="block text-xs font-semibold">Message<textarea required value={message} onChange={(event) => setMessage(event.target.value)} rows={5} className="mt-1 block w-full resize-none rounded-lg border border-black/10 bg-transparent p-2 text-sm dark:border-white/20"/></label><button type="submit" className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white">Open email draft</button></form><a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400">GitHub profile <ExternalLink size={14}/></a></div></div>;
};

'use client';

import React, { useState } from 'react';
import {
  Mail,
  Send,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  MessageSquare,
  Globe,
} from 'lucide-react';
import { LinkedInIcon, GitHubIcon } from '@/components/shared/Icons';
import { profile } from '@/data/profile';
import { useDesktopStore } from '@/stores/useDesktopStore';

export const ContactApp: React.FC = () => {
  const { addNotification } = useDesktopStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    addNotification('Clipboard', 'Email address copied to clipboard!');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      return;
    }

    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      addNotification('Message Delivered', `Thanks ${formData.name}! Your message simulation was successful.`);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full bg-white/95 dark:bg-[#1e1e1e]/95 text-neutral-800 dark:text-neutral-100 select-none overflow-hidden">
      {/* Top Bar */}
      <div className="p-3 border-b border-black/10 dark:border-white/10 bg-neutral-100/70 dark:bg-[#282828]/70 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Mail size={15} className="text-blue-500" />
          <h2 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
            New Message • Contact Raj
          </h2>
        </div>
        <span className="text-[11px] text-neutral-500 font-medium">rajvishvakarma.dev@gmail.com</span>
      </div>

      {/* Main Split Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Direct Connect Sidebar */}
        <div className="w-64 bg-neutral-50/70 dark:bg-[#181818]/70 border-r border-black/10 dark:border-white/10 p-5 space-y-5 overflow-y-auto hidden md:block">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-3">
              Direct Channels
            </h3>
            <div className="space-y-2">
              <button
                onClick={handleCopyEmail}
                className="w-full p-3 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-blue-500/30 transition-all text-left flex items-center justify-between group"
              >
                <div className="min-w-0 pr-2">
                  <div className="text-[10px] text-neutral-400 uppercase font-semibold">Email</div>
                  <div className="text-xs font-medium text-neutral-900 dark:text-white truncate">
                    {profile.email}
                  </div>
                </div>
                <div className="p-1 rounded text-neutral-400 group-hover:text-blue-500 shrink-0">
                  {copiedEmail ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                </div>
              </button>

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="w-full p-3 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-blue-500/30 transition-all flex items-center space-x-3 group"
              >
                <GitHubIcon size={16} className="text-neutral-600 dark:text-neutral-400 group-hover:text-black dark:group-hover:text-white" />
                <div className="min-w-0">
                  <div className="text-[10px] text-neutral-400 uppercase font-semibold">GitHub</div>
                  <div className="text-xs font-medium text-neutral-900 dark:text-white truncate">
                    @rajvishvakarma
                  </div>
                </div>
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-full p-3 rounded-xl bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-blue-500/30 transition-all flex items-center space-x-3 group"
              >
                <LinkedInIcon size={16} className="text-blue-500" />
                <div className="min-w-0">
                  <div className="text-[10px] text-neutral-400 uppercase font-semibold">LinkedIn</div>
                  <div className="text-xs font-medium text-neutral-900 dark:text-white truncate">
                    rajvishvakarma
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-xs text-neutral-600 dark:text-neutral-300 space-y-1.5">
            <div className="flex items-center space-x-1.5 font-bold text-blue-600 dark:text-blue-400">
              <MapPin size={13} />
              <span>Location</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Based in Bengaluru, India. Open to high-impact remote and hybrid software engineering positions worldwide.
            </p>
          </div>
        </div>

        {/* Right Form Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-xl mx-auto space-y-4">
            <div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white">Send a Message</h3>
              <p className="text-xs text-neutral-500 mt-0.5">
                Have an inquiry, project proposal, or just want to connect? Fill out the fields below.
              </p>
            </div>

            {status === 'success' && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 flex items-start space-x-3 text-xs">
                <CheckCircle2 size={16} className="shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold">Message simulation recorded!</div>
                  <p className="mt-0.5 leading-relaxed">
                    Thank you for reaching out. In production, connect this form to Resend, Formspree, or your backend webhook service.
                  </p>
                </div>
              </div>
            )}

            {status === 'error' && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 flex items-center space-x-2 text-xs">
                <AlertCircle size={15} />
                <span>Please fill in all required fields (Name, Email, Message).</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ada Lovelace"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-neutral-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                    Your Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ada@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-neutral-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Software Engineering Collaboration"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-neutral-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
                  Message *
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Hi Raj, I reviewed your macOS portfolio and would love to discuss..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500 placeholder-neutral-400 resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <p className="text-[11px] text-neutral-400">Response time: usually within 24 hours.</p>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="flex items-center space-x-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs disabled:opacity-50 transition-colors cursor-pointer"
                >
                  <Send size={13} />
                  <span>{status === 'sending' ? 'Sending...' : 'Send Message'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

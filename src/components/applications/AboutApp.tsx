'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  User,
  BookOpen,
  Compass,
  BarChart2,
  Mail,
  MapPin,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  Cpu,
  Code2,
} from 'lucide-react';
import { LinkedInIcon, GitHubIcon } from '@/components/shared/Icons';
import { profile } from '@/data/profile';
import { useDesktopStore } from '@/stores/useDesktopStore';

export const AboutApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'story' | 'philosophy' | 'stats'>('overview');
  const { openApp } = useDesktopStore();

  return (
    <div className="flex flex-col h-full bg-white/95 dark:bg-[#1e1e1e]/95 text-neutral-800 dark:text-neutral-100 select-none overflow-hidden">
      {/* Header Profile Bar */}
      <div className="p-6 pb-4 border-b border-black/10 dark:border-white/10 bg-gradient-to-b from-blue-500/5 to-transparent">
        <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-5 text-center sm:text-left">
          <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-white dark:border-white/10 relative shrink-0">
            <Image src={profile.avatar} alt={profile.name} fill className="object-cover" priority />
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h1 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">{profile.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-600 text-white shadow-xs">
                {profile.role}
              </span>
            </div>

            <p className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center justify-center sm:justify-start gap-1.5 mt-1">
              <MapPin size={13} className="text-red-500" />
              <span>{profile.location}</span>
              <span>•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">Available for Opportunities</span>
            </p>

            <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-2 max-w-xl">{profile.tagline}</p>
          </div>

          <div className="flex sm:flex-col gap-2 shrink-0">
            <button
              onClick={() => openApp('contact')}
              className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium shadow-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Mail size={13} />
              <span>Get in Touch</span>
            </button>
            <button
              onClick={() => openApp('resume')}
              className="px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-neutral-800 dark:text-neutral-200 text-xs font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              <ExternalLink size={13} />
              <span>View Resume</span>
            </button>
          </div>
        </div>

        {/* Segmented Control Tabs */}
        <div className="flex items-center justify-center mt-5 pt-2">
          <div className="flex p-1 bg-black/5 dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5 space-x-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'overview'
                  ? 'bg-white dark:bg-neutral-800 shadow-xs text-neutral-900 dark:text-white'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              <User size={13} />
              <span>Overview</span>
            </button>
            <button
              onClick={() => setActiveTab('story')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'story'
                  ? 'bg-white dark:bg-neutral-800 shadow-xs text-neutral-900 dark:text-white'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              <BookOpen size={13} />
              <span>Background</span>
            </button>
            <button
              onClick={() => setActiveTab('philosophy')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'philosophy'
                  ? 'bg-white dark:bg-neutral-800 shadow-xs text-neutral-900 dark:text-white'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              <Compass size={13} />
              <span>Philosophy</span>
            </button>
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                activeTab === 'stats'
                  ? 'bg-white dark:bg-neutral-800 shadow-xs text-neutral-900 dark:text-white'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
            >
              <BarChart2 size={13} />
              <span>Stats & Metrics</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {activeTab === 'overview' && (
          <div className="space-y-6 max-w-2xl mx-auto">
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Introduction
              </h3>
              <p className="text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">
                {profile.fullBio[0]}
              </p>
              <p className="text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">
                {profile.fullBio[1]}
              </p>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-3">
                Core Engineering Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {profile.interests.map((interest) => (
                  <span
                    key={interest}
                    className="flex items-center space-x-1 px-3 py-1 rounded-lg text-xs bg-neutral-100 dark:bg-white/10 text-neutral-800 dark:text-neutral-200 border border-black/5 dark:border-white/5"
                  >
                    <Sparkles size={11} className="text-blue-500" />
                    <span>{interest}</span>
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <div className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 mb-1">
                  <Code2 size={16} />
                  <span className="text-xs font-bold">Modern Web Systems</span>
                </div>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-300 leading-normal">
                  Building reactive interfaces using Next.js App Router, Tailwind CSS, and resilient state synchronization.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/20">
                <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400 mb-1">
                  <Cpu size={16} />
                  <span className="text-xs font-bold">Distributed Architecture</span>
                </div>
                <p className="text-[11px] text-neutral-600 dark:text-neutral-300 leading-normal">
                  Designing microservices, event streams with Kafka, and caching tiers with Redis and PostgreSQL.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'story' && (
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-3 text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">
              <h3 className="font-semibold text-neutral-900 dark:text-white text-sm">
                The Journey of Software Craftsmanship
              </h3>
              <p>
                My passion for programming ignited from an urge to understand what happens under the surface of digital machines. From my earliest days hacking together custom scripts to designing enterprise-grade event-driven architectures, I have approached engineering with curiosity and care.
              </p>
              <p>
                Throughout my academic and professional career, I specialized in full-stack web technologies, native Android engineering with Jetpack Compose, and distributed systems. I believe that engineering excellence is not just about writing algorithms, but about empathy: delivering software that solves tangible human problems seamlessly.
              </p>
              <p>
                Today, I stay on the cutting edge of modern software: embracing TypeScript, Rust, autonomous agents, and reactive web applications like this very macOS desktop simulation.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'philosophy' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {profile.philosophies.map((item) => (
              <div
                key={item.title}
                className="p-4 rounded-xl bg-neutral-50 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col space-y-2 hover:border-blue-500/30 transition-colors"
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle2 size={15} className="text-blue-500 shrink-0" />
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white">{item.title}</h4>
                </div>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="space-y-5 max-w-2xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {profile.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-white/5 dark:to-white/10 border border-black/5 dark:border-white/5 text-center"
                >
                  <div className="text-2xl font-black text-blue-600 dark:text-blue-400">{stat.value}</div>
                  <div className="text-[11px] font-medium text-neutral-500 dark:text-neutral-400 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-neutral-50 dark:bg-white/5 border border-black/5 dark:border-white/5 text-xs text-neutral-600 dark:text-neutral-300 space-y-2">
              <div className="font-semibold text-neutral-900 dark:text-white">Continuous Evolution</div>
              <p>
                Code commits and completed architectures reflect thousands of hours invested in deep problem-solving, test automation, and code review rigor.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Footer bar */}
      <div className="px-6 py-2.5 bg-neutral-100/70 dark:bg-[#1a1a1a]/70 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] text-neutral-500">
        <span>Software Engineer • Bengaluru, India</span>
        <div className="flex items-center space-x-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-1 hover:text-blue-500 transition-colors"
          >
            <GitHubIcon size={12} />
            <span>GitHub</span>
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-1 hover:text-blue-500 transition-colors"
          >
            <LinkedInIcon size={12} />
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  );
};

'use client';

import React, { useState } from 'react';
import {
  Download,
  ExternalLink,
  Printer,
  FileText,
  Mail,
  MapPin,
  CheckCircle,
  Briefcase,
  GraduationCap,
  Sparkles,
} from 'lucide-react';
import { profile } from '@/data/profile';
import { experiences, educations } from '@/data/experience';
import { skills } from '@/data/skills';
import { useDesktopStore } from '@/stores/useDesktopStore';

export const ResumeApp: React.FC = () => {
  const [viewType, setViewType] = useState<'interactive' | 'pdf'>('interactive');
  const { addNotification } = useDesktopStore();

  const handleDownload = () => {
    addNotification('Resume Download', 'Starting download: Raj_Vishvakarma_Resume.pdf');
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = 'Raj_Vishvakarma_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="flex flex-col h-full bg-neutral-100 dark:bg-[#1e1e1e] text-neutral-800 dark:text-neutral-100 select-none overflow-hidden">
      {/* Top Toolbar */}
      <div className="p-3 border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-[#282828]/80 backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <FileText size={16} className="text-blue-500" />
          <span className="text-xs font-bold text-neutral-900 dark:text-white">
            Raj_Vishvakarma_Resume.pdf
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium">
            Updated Oct 2024
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Switcher between formatted interactive resume and embedded PDF */}
          <div className="flex p-0.5 bg-black/5 dark:bg-white/10 rounded-lg space-x-1">
            <button
              onClick={() => setViewType('interactive')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                viewType === 'interactive'
                  ? 'bg-white dark:bg-neutral-700 shadow-xs text-blue-600 dark:text-blue-400'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Interactive Document
            </button>
            <button
              onClick={() => setViewType('pdf')}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                viewType === 'pdf'
                  ? 'bg-white dark:bg-neutral-700 shadow-xs text-blue-600 dark:text-blue-400'
                  : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              Raw PDF View
            </button>
          </div>

          <button
            onClick={handleDownload}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <Download size={13} />
            <span>Download</span>
          </button>

          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-neutral-800 dark:text-neutral-200 text-xs font-medium transition-colors"
            title="Open PDF in new browser tab"
          >
            <ExternalLink size={13} />
            <span className="hidden sm:inline">New Tab</span>
          </a>

          <button
            onClick={handlePrint}
            className="p-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-neutral-800 dark:text-neutral-200 transition-colors"
            title="Print Document"
          >
            <Printer size={14} />
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex justify-center bg-neutral-200/50 dark:bg-neutral-900/50">
        {viewType === 'pdf' ? (
          <div className="w-full h-full max-w-4xl bg-white dark:bg-neutral-900 rounded-xl overflow-hidden shadow-xl border border-black/10 dark:border-white/10">
            <iframe src="/resume.pdf" className="w-full h-full" title="Resume PDF" />
          </div>
        ) : (
          /* Formatted High-Quality Document */
          <div className="w-full max-w-3xl bg-white text-neutral-900 rounded-xl shadow-2xl border border-black/10 p-8 sm:p-12 space-y-6">
            {/* Header */}
            <div className="border-b border-neutral-200 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-neutral-900">{profile.name}</h1>
                <p className="text-sm font-semibold text-blue-600 mt-0.5">{profile.role}</p>
                <p className="text-xs text-neutral-500 mt-1 max-w-md">{profile.tagline}</p>
              </div>

              <div className="text-xs text-neutral-600 space-y-1 text-left sm:text-right">
                <div className="flex items-center sm:justify-end gap-1.5">
                  <MapPin size={12} className="text-neutral-400" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center sm:justify-end gap-1.5">
                  <Mail size={12} className="text-neutral-400" />
                  <span>{profile.email}</span>
                </div>
                <div className="text-blue-600 font-medium">github.com/rajvishvakarma</div>
              </div>
            </div>

            {/* Summary */}
            <div className="space-y-1.5">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-100 pb-1">
                Professional Summary
              </h2>
              <p className="text-xs leading-relaxed text-neutral-700">{profile.shortBio}</p>
            </div>

            {/* Experience */}
            <div className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-100 pb-1">
                Work Experience
              </h2>
              {experiences.map((exp) => (
                <div key={exp.id} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                    <span className="text-xs font-bold text-neutral-900">
                      {exp.role} <span className="font-normal text-neutral-500">at</span> {exp.organization}
                    </span>
                    <span className="text-[11px] text-neutral-500">{exp.period}</span>
                  </div>
                  <p className="text-[11px] text-neutral-600 leading-relaxed">{exp.description}</p>
                  <ul className="list-disc list-inside space-y-1 pl-1 text-[11px] text-neutral-700">
                    {exp.achievements.map((ach, i) => (
                      <li key={i}>{ach}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Technical Skills */}
            <div className="space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-100 pb-1">
                Core Technical Skills
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="font-semibold text-neutral-900">Languages & Core:</span>{' '}
                  <span className="text-neutral-600">TypeScript, JavaScript, Python, Kotlin, Java, Go, SQL</span>
                </div>
                <div>
                  <span className="font-semibold text-neutral-900">Frontend & Mobile:</span>{' '}
                  <span className="text-neutral-600">React, Next.js, Jetpack Compose, Tailwind CSS, Framer Motion</span>
                </div>
                <div>
                  <span className="font-semibold text-neutral-900">Backend & Cloud:</span>{' '}
                  <span className="text-neutral-600">Node.js, FastAPI, Kafka, Docker, Kubernetes, AWS, gRPC</span>
                </div>
                <div>
                  <span className="font-semibold text-neutral-900">Databases:</span>{' '}
                  <span className="text-neutral-600">PostgreSQL, MongoDB, Redis, SQLite, Supabase</span>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="space-y-2">
              <h2 className="text-xs font-bold uppercase tracking-wider text-neutral-400 border-b border-neutral-100 pb-1">
                Education
              </h2>
              {educations.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start text-xs">
                  <div>
                    <span className="font-bold text-neutral-900">{edu.degree}</span>
                    <div className="text-neutral-600">{edu.institution}</div>
                  </div>
                  <span className="text-neutral-500 text-[11px]">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-2 bg-white/80 dark:bg-[#1a1a1a]/80 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] text-neutral-500">
        <span>Ready for distribution</span>
        <span>A4 Format • Screen & Print Optimized</span>
      </div>
    </div>
  );
};

'use client';

import React, { useState } from 'react';
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
  Building2,
  ChevronRight,
  Award,
} from 'lucide-react';
import { experiences, educations } from '@/data/experience';

export const ExperienceApp: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'all' | 'work' | 'education'>('all');

  return (
    <div className="flex flex-col h-full bg-white/95 dark:bg-[#1e1e1e]/95 text-neutral-800 dark:text-neutral-100 select-none overflow-hidden">
      {/* Top Filter Bar */}
      <div className="p-3 border-b border-black/10 dark:border-white/10 bg-neutral-100/70 dark:bg-[#282828]/70 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Briefcase size={15} className="text-blue-500" />
          <h2 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
            Career Timeline & Education
          </h2>
        </div>

        <div className="flex p-0.5 bg-black/5 dark:bg-white/10 rounded-lg space-x-1">
          <button
            onClick={() => setActiveSection('all')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              activeSection === 'all'
                ? 'bg-white dark:bg-neutral-700 shadow-xs text-neutral-900 dark:text-white'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setActiveSection('work')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              activeSection === 'work'
                ? 'bg-white dark:bg-neutral-700 shadow-xs text-neutral-900 dark:text-white'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Work Experience
          </button>
          <button
            onClick={() => setActiveSection('education')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
              activeSection === 'education'
                ? 'bg-white dark:bg-neutral-700 shadow-xs text-neutral-900 dark:text-white'
                : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            Education
          </button>
        </div>
      </div>

      {/* Main Content Timeline */}
      <div className="flex-1 overflow-y-auto p-6 max-w-3xl mx-auto w-full space-y-8">
        {/* Work Experience Section */}
        {(activeSection === 'all' || activeSection === 'work') && (
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500">
                <Briefcase size={15} />
              </span>
              <h3 className="text-sm font-bold tracking-tight text-neutral-900 dark:text-white">
                Work Experience
              </h3>
            </div>

            <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-500/30">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative group">
                  {/* Timeline dot */}
                  <div className="absolute -left-6 top-1.5 w-4 h-4 rounded-full border-2 border-blue-500 bg-white dark:bg-neutral-900 group-hover:scale-125 transition-transform" />

                  <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50/50 dark:bg-white/5 hover:border-blue-500/30 transition-all space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h4 className="font-bold text-sm text-neutral-900 dark:text-white">{exp.role}</h4>
                        <div className="flex items-center space-x-2 text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                          <Building2 size={13} className="text-blue-500" />
                          <span>{exp.organization}</span>
                          <span>•</span>
                          <span className="flex items-center space-x-1">
                            <MapPin size={11} />
                            <span>{exp.location}</span>
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-neutral-500 flex items-center space-x-1">
                          <Calendar size={12} />
                          <span>{exp.period}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-blue-500/10 text-blue-600 dark:text-blue-400">
                          {exp.type}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="space-y-1.5 pt-1">
                      {exp.achievements.map((ach, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-neutral-700 dark:text-neutral-300">
                          <CheckCircle2 size={13} className="text-blue-500 shrink-0 mt-0.5" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-black/5 dark:border-white/5">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[10px] font-medium bg-black/5 dark:bg-white/10 text-neutral-600 dark:text-neutral-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education Section */}
        {(activeSection === 'all' || activeSection === 'education') && (
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <span className="p-1.5 rounded-lg bg-purple-500/10 text-purple-500">
                <GraduationCap size={15} />
              </span>
              <h3 className="text-sm font-bold tracking-tight text-neutral-900 dark:text-white">
                Education & Academics
              </h3>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-purple-500/30">
              {educations.map((edu) => (
                <div key={edu.id} className="relative group">
                  <div className="absolute -left-6 top-1.5 w-4 h-4 rounded-full border-2 border-purple-500 bg-white dark:bg-neutral-900 group-hover:scale-125 transition-transform" />

                  <div className="p-4 rounded-xl border border-black/10 dark:border-white/10 bg-neutral-50/50 dark:bg-white/5 hover:border-purple-500/30 transition-all space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <div>
                        <h4 className="font-bold text-sm text-neutral-900 dark:text-white">{edu.degree}</h4>
                        <div className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
                          {edu.institution} • {edu.location}
                        </div>
                      </div>
                      <span className="text-xs text-neutral-500 flex items-center space-x-1">
                        <Calendar size={12} />
                        <span>{edu.period}</span>
                      </span>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      {edu.details.map((detail, idx) => (
                        <div key={idx} className="flex items-start space-x-2 text-xs text-neutral-700 dark:text-neutral-300">
                          <Award size={13} className="text-purple-500 shrink-0 mt-0.5" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-2.5 bg-neutral-100/70 dark:bg-[#1a1a1a]/70 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] text-neutral-500">
        <span>Curated professional track record</span>
        <span>Balaghat, Madhya Pradesh</span>
      </div>
    </div>
  );
};

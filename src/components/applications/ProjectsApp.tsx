'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  Search,
  Grid,
  List as ListIcon,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { GitHubIcon } from '@/components/shared/Icons';
import { projects } from '@/data/projects';
import { ProjectCategory, ProjectItem } from '@/types/portfolio';

const categories: ProjectCategory[] = [
  'All',
  'Full Stack',
  'Mobile & Android',
  'AI & Machine Learning',
  'Dev Tools & Systems',
];

export const ProjectsApp: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  const filteredProjects = projects
    .filter((p) => (selectedCategory === 'All' ? true : p.category === selectedCategory))
    .filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  return (
    <div className="flex flex-col h-full bg-white/95 dark:bg-[#1e1e1e]/95 text-neutral-800 dark:text-neutral-100 select-none overflow-hidden">
      {/* Top Filter and Search Bar */}
      <div className="p-3 border-b border-black/10 dark:border-white/10 bg-neutral-100/70 dark:bg-[#282828]/70 backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
        {selectedProject ? (
          <button
            onClick={() => setSelectedProject(null)}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-xs font-medium transition-colors"
          >
            <ArrowLeft size={14} />
            <span>Back to All Projects</span>
          </button>
        ) : (
          <div className="flex items-center space-x-1 overflow-x-auto py-0.5 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-neutral-600 dark:text-neutral-400 hover:bg-black/5 dark:hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center space-x-3 ml-auto">
          {/* View mode toggle */}
          {!selectedProject && (
            <div className="flex items-center bg-black/5 dark:bg-white/10 rounded-lg p-0.5 border border-black/5 dark:border-white/10">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1 rounded-md ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-neutral-700 shadow-xs text-blue-600 dark:text-blue-400'
                    : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
                title="Grid View"
              >
                <Grid size={13} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1 rounded-md ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-neutral-700 shadow-xs text-blue-600 dark:text-blue-400'
                    : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
                title="List View"
              >
                <ListIcon size={13} />
              </button>
            </div>
          )}

          {/* Search bar */}
          <div className="relative">
            <Search size={13} className="absolute left-2.5 top-2 text-neutral-400" />
            <input
              type="text"
              placeholder="Filter projects or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-7 pr-3 py-1 text-xs rounded-lg bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500 w-44 sm:w-56 placeholder-neutral-400 dark:placeholder-neutral-500"
            />
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto p-5">
        {selectedProject ? (
          /* Detailed Single Project View */
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden shadow-lg border border-black/10 dark:border-white/10">
              <Image src={selectedProject.image} alt={selectedProject.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6 text-white">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-500 text-white">
                    {selectedProject.category}
                  </span>
                  <span className="text-xs text-white/80">{selectedProject.year}</span>
                  <span className="text-xs text-white/80">•</span>
                  <span className="text-xs text-emerald-400 font-medium">{selectedProject.status}</span>
                </div>
                <h2 className="text-2xl font-bold tracking-tight">{selectedProject.title}</h2>
                <p className="text-xs text-white/90 mt-1 max-w-xl">{selectedProject.shortDescription}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {selectedProject.demoUrl && (
                <a
                  href={selectedProject.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  <ExternalLink size={13} />
                  <span>Live Demo</span>
                </a>
              )}
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-neutral-900 dark:text-white text-xs font-semibold transition-colors border border-black/10 dark:border-white/10"
                >
                  <GitHubIcon size={13} />
                  <span>Source Code</span>
                </a>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-5">
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2">
                    Project Architecture & Overview
                  </h3>
                  <p className="text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2">
                    Key Features & Technical Highlights
                  </h3>
                  <div className="space-y-2">
                    {selectedProject.keyFeatures.map((feat, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-neutral-700 dark:text-neutral-300">
                        <CheckCircle2 size={14} className="text-blue-500 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-2">
                    Engineering Contribution
                  </h3>
                  <p className="text-xs leading-relaxed text-neutral-700 dark:text-neutral-300 bg-neutral-50 dark:bg-white/5 p-3.5 rounded-xl border border-black/5 dark:border-white/5">
                    {selectedProject.contribution}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-neutral-50 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-3">
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-white">Tech Stack</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white dark:bg-white/10 text-neutral-700 dark:text-neutral-300 border border-black/5 dark:border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Projects Directory (Grid / List) */
          <div>
            {filteredProjects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <p className="text-sm font-medium text-neutral-500">No projects found matching your query.</p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                  }}
                  className="mt-3 text-xs text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Reset filters
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProjects.map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => setSelectedProject(proj)}
                    className="group rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-800/70 hover:shadow-xl hover:border-blue-500/40 transition-all duration-200 cursor-pointer flex flex-col"
                  >
                    <div className="relative h-40 w-full overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                      <Image
                        src={proj.image}
                        alt={proj.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-2.5 left-2.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-black/60 backdrop-blur-md text-white">
                          {proj.category}
                        </span>
                      </div>
                      <div className="absolute top-2.5 right-2.5">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-500/90 text-white">
                          {proj.status}
                        </span>
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h3 className="font-bold text-sm text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {proj.title}
                        </h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 line-clamp-2">
                          {proj.shortDescription}
                        </p>
                      </div>

                      <div>
                        <div className="flex flex-wrap gap-1 mb-3">
                          {proj.tags.slice(0, 3).map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded-md text-[10px] bg-neutral-100 dark:bg-neutral-700/60 text-neutral-600 dark:text-neutral-300"
                            >
                              {t}
                            </span>
                          ))}
                          {proj.tags.length > 3 && (
                            <span className="px-1.5 py-0.5 rounded-md text-[10px] text-neutral-400">
                              +{proj.tags.length - 3}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between text-xs text-blue-600 dark:text-blue-400 font-medium pt-2 border-t border-black/5 dark:border-white/5">
                          <span>View Details & Specs</span>
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* List View */
              <div className="border border-black/10 dark:border-white/10 rounded-xl overflow-hidden divide-y divide-black/5 dark:divide-white/5">
                {filteredProjects.map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => setSelectedProject(proj)}
                    className="p-3 hover:bg-blue-500/10 dark:hover:bg-blue-500/20 cursor-pointer transition-colors flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                        <Image src={proj.image} alt={proj.title} fill className="object-cover" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-xs text-neutral-900 dark:text-white truncate">
                          {proj.title}
                        </h4>
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                          {proj.shortDescription}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 shrink-0">
                      <span className="hidden sm:inline-block text-[11px] text-neutral-400">{proj.category}</span>
                      <div className="flex gap-1 hidden md:flex">
                        {proj.tags.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="px-2 py-0.5 rounded text-[10px] bg-neutral-100 dark:bg-white/10 text-neutral-600 dark:text-neutral-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <button className="text-xs text-blue-600 dark:text-blue-400 font-medium">Open</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-2 bg-neutral-100/70 dark:bg-[#1a1a1a]/70 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] text-neutral-500">
        <span>{filteredProjects.length} Projects Shown</span>
        <span>Click any card for full system breakdown</span>
      </div>
    </div>
  );
};

'use client';

import React, { useState } from 'react';
import {
  Code,
  Layout,
  Smartphone,
  Server,
  Database,
  Terminal,
  Bot,
  Search,
  CheckCircle,
  Award,
  Layers,
  Sparkles,
} from 'lucide-react';
import { skills, skillCategories } from '@/data/skills';
import { SkillCategory } from '@/types/portfolio';

const categoryIcons: Record<SkillCategory, React.ReactNode> = {
  'Programming Languages': <Code size={14} />,
  'Frontend Development': <Layout size={14} />,
  'Android Development': <Smartphone size={14} />,
  'Backend Development': <Server size={14} />,
  Databases: <Database size={14} />,
  'Tools & Platforms': <Terminal size={14} />,
  'AI & Robotics': <Bot size={14} />,
};

export const SkillsApp: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSkills = skills
    .filter((s) => (activeCategory === 'All' ? true : s.category === activeCategory))
    .filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const getBadgeStyle = (level: string) => {
    switch (level) {
      case 'Master':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
      case 'Advanced':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'Proficient':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      default:
        return 'bg-neutral-500/10 text-neutral-600 dark:text-neutral-400 border-neutral-500/20';
    }
  };

  return (
    <div className="flex flex-col h-full bg-white/95 dark:bg-[#1e1e1e]/95 text-neutral-800 dark:text-neutral-100 select-none overflow-hidden">
      {/* Top Bar with Search */}
      <div className="p-3 border-b border-black/10 dark:border-white/10 bg-neutral-100/70 dark:bg-[#282828]/70 backdrop-blur-md flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <Layers size={15} className="text-blue-500" />
          <h2 className="text-xs font-bold text-neutral-900 dark:text-white uppercase tracking-wider">
            Technical Competencies
          </h2>
        </div>

        <div className="relative">
          <Search size={13} className="absolute left-2.5 top-2 text-neutral-400" />
          <input
            type="text"
            placeholder="Search language, tool or framework..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-7 pr-3 py-1 text-xs rounded-lg bg-black/5 dark:bg-white/10 border border-black/10 dark:border-white/10 focus:outline-none focus:ring-1 focus:ring-blue-500 w-48 sm:w-64 placeholder-neutral-400 dark:placeholder-neutral-500"
          />
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Category Navigation */}
        <div className="w-52 bg-neutral-50/60 dark:bg-[#181818]/60 border-r border-black/10 dark:border-white/10 p-3 space-y-1 overflow-y-auto hidden sm:block">
          <div className="px-2 py-1 text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">
            Domains ({skillCategories.length})
          </div>

          <button
            onClick={() => setActiveCategory('All')}
            className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              activeCategory === 'All'
                ? 'bg-blue-600 text-white'
                : 'hover:bg-black/5 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-300'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Sparkles size={13} />
              <span>All Disciplines</span>
            </div>
            <span className="text-[10px] opacity-75">{skills.length}</span>
          </button>

          {skillCategories.map((cat) => {
            const count = skills.filter((s) => s.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white'
                    : 'hover:bg-black/5 dark:hover:bg-white/10 text-neutral-600 dark:text-neutral-300'
                }`}
              >
                <div className="flex items-center space-x-2 truncate mr-1">
                  {categoryIcons[cat]}
                  <span className="truncate">{cat}</span>
                </div>
                <span className="text-[10px] opacity-75 shrink-0">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Right Skills Grid */}
        <div className="flex-1 flex flex-col overflow-y-auto p-5 space-y-4">
          {/* Mobile Category Dropdown / Scrollbar */}
          <div className="flex sm:hidden overflow-x-auto space-x-1 pb-1">
            <button
              onClick={() => setActiveCategory('All')}
              className={`px-3 py-1 rounded-md text-xs whitespace-nowrap font-medium ${
                activeCategory === 'All' ? 'bg-blue-600 text-white' : 'bg-black/5 dark:bg-white/10'
              }`}
            >
              All
            </button>
            {skillCategories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`px-3 py-1 rounded-md text-xs whitespace-nowrap font-medium ${
                  activeCategory === c ? 'bg-blue-600 text-white' : 'bg-black/5 dark:bg-white/10'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filteredSkills.map((skill) => (
              <div
                key={skill.name}
                className="p-3.5 rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-800/60 hover:border-blue-500/40 hover:shadow-md transition-all flex flex-col justify-between space-y-2.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    <span className="p-1 rounded-md bg-black/5 dark:bg-white/10 text-blue-500">
                      {categoryIcons[skill.category]}
                    </span>
                    <span className="font-semibold text-xs text-neutral-900 dark:text-white leading-tight">
                      {skill.name}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${getBadgeStyle(
                      skill.proficiency
                    )}`}
                  >
                    {skill.proficiency}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-neutral-400 dark:text-neutral-500 pt-1 border-t border-black/5 dark:border-white/5">
                  <span className="truncate">{skill.category}</span>
                  <span className="font-medium text-neutral-600 dark:text-neutral-300 shrink-0">
                    {skill.years}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Summary */}
      <div className="px-5 py-2 bg-neutral-100/70 dark:bg-[#1a1a1a]/70 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] text-neutral-500">
        <span>Displaying {filteredSkills.length} skills across engineering domains</span>
        <span>No arbitrary percentages • Validated in production systems</span>
      </div>
    </div>
  );
};

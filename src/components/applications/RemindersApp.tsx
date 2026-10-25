'use client';

import React, { useState } from 'react';
import {
  Calendar,
  CalendarDays,
  Inbox,
  Flag,
  Check,
  Plus,
  Trash2,
  ChevronLeft,
  List as ListIcon,
} from 'lucide-react';
import { useDesktopStore } from '@/stores/useDesktopStore';

interface ReminderItem {
  id: string;
  title: string;
  date?: string;
  completed: boolean;
  category: 'today' | 'scheduled' | 'all' | 'flagged';
}

const INITIAL_REMINDERS: ReminderItem[] = [
  { id: '1', title: 'Polish macOS liquid glass Control Center animations', completed: true, category: 'today' },
  { id: '2', title: 'Connect audio tracks for Spotify & Music app', completed: true, category: 'today' },
  { id: '3', title: 'Review Autonomous Navigation Rover code repo', completed: false, category: 'today' },
  { id: '4', title: 'Deploy portfolio update to production Vercel instance', completed: false, category: 'scheduled', date: 'Tomorrow' },
  { id: '5', title: 'Publish tech blog on LinkedIn', completed: false, category: 'flagged' },
];

export const RemindersApp: React.FC = () => {
  const { theme, addNotification, isMobile } = useDesktopStore();
  const isDarkMode = theme === 'dark';

  const [reminders, setReminders] = useState<ReminderItem[]>(INITIAL_REMINDERS);
  const [activeCategory, setActiveCategory] = useState<'today' | 'scheduled' | 'all' | 'flagged'>('today');
  const [newTaskInput, setNewTaskInput] = useState('');
  const [mobileShowTasks, setMobileShowTasks] = useState(false);

  const toggleTask = (id: string) => {
    setReminders((prev) =>
      prev.map((r) => (r.id === id ? { ...r, completed: !r.completed } : r))
    );
  };

  const deleteTask = (id: string) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskInput.trim()) return;

    const newR: ReminderItem = {
      id: Date.now().toString(),
      title: newTaskInput.trim(),
      completed: false,
      category: activeCategory,
    };

    setReminders([...reminders, newR]);
    setNewTaskInput('');
    addNotification('Reminders', `Added reminder "${newR.title}"`);
  };

  const filteredTasks =
    activeCategory === 'all'
      ? reminders
      : reminders.filter((r) => r.category === activeCategory);

  const counts = {
    today: reminders.filter((r) => r.category === 'today').length,
    scheduled: reminders.filter((r) => r.category === 'scheduled').length,
    all: reminders.length,
    flagged: reminders.filter((r) => r.category === 'flagged').length,
  };

  return (
    <div
      className={`h-full flex select-none ${
        isDarkMode ? 'bg-[#1e1e1e] text-white' : 'bg-white text-neutral-900'
      }`}
    >
      {/* Left Sidebar */}
      {(!isMobile || !mobileShowTasks) && (
        <div
          className={`${isMobile ? 'w-full' : 'w-64'} shrink-0 flex flex-col border-r p-3 transition-colors ${
            isDarkMode ? 'bg-[#232326] border-white/10' : 'bg-[#f4f5f7] border-black/10'
          }`}
        >
          {/* Smart Categories 2x2 Grid */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <button
              onClick={() => {
                setActiveCategory('today');
                if (isMobile) setMobileShowTasks(true);
              }}
              className={`p-2.5 rounded-xl border flex flex-col justify-between text-left transition-colors ${
                activeCategory === 'today'
                  ? 'bg-blue-600 text-white border-transparent'
                  : isDarkMode
                  ? 'bg-white/5 border-white/5 hover:bg-white/10'
                  : 'bg-white border-black/5 hover:bg-black/5 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="p-1.5 rounded-full bg-blue-500/20 text-blue-500">
                  <Calendar size={14} />
                </span>
                <strong className="text-base font-bold">{counts.today}</strong>
              </div>
              <span className="text-xs font-semibold mt-2">Today</span>
            </button>

            <button
              onClick={() => {
                setActiveCategory('scheduled');
                if (isMobile) setMobileShowTasks(true);
              }}
              className={`p-2.5 rounded-xl border flex flex-col justify-between text-left transition-colors ${
                activeCategory === 'scheduled'
                  ? 'bg-blue-600 text-white border-transparent'
                  : isDarkMode
                  ? 'bg-white/5 border-white/5 hover:bg-white/10'
                  : 'bg-white border-black/5 hover:bg-black/5 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="p-1.5 rounded-full bg-red-500/20 text-red-500">
                  <CalendarDays size={14} />
                </span>
                <strong className="text-base font-bold">{counts.scheduled}</strong>
              </div>
              <span className="text-xs font-semibold mt-2">Scheduled</span>
            </button>

            <button
              onClick={() => {
                setActiveCategory('all');
                if (isMobile) setMobileShowTasks(true);
              }}
              className={`p-2.5 rounded-xl border flex flex-col justify-between text-left transition-colors ${
                activeCategory === 'all'
                  ? 'bg-blue-600 text-white border-transparent'
                  : isDarkMode
                  ? 'bg-white/5 border-white/5 hover:bg-white/10'
                  : 'bg-white border-black/5 hover:bg-black/5 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="p-1.5 rounded-full bg-neutral-500/20 text-neutral-400">
                  <Inbox size={14} />
                </span>
                <strong className="text-base font-bold">{counts.all}</strong>
              </div>
              <span className="text-xs font-semibold mt-2">All</span>
            </button>

            <button
              onClick={() => {
                setActiveCategory('flagged');
                if (isMobile) setMobileShowTasks(true);
              }}
              className={`p-2.5 rounded-xl border flex flex-col justify-between text-left transition-colors ${
                activeCategory === 'flagged'
                  ? 'bg-blue-600 text-white border-transparent'
                  : isDarkMode
                  ? 'bg-white/5 border-white/5 hover:bg-white/10'
                  : 'bg-white border-black/5 hover:bg-black/5 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="p-1.5 rounded-full bg-amber-500/20 text-amber-500">
                  <Flag size={14} />
                </span>
                <strong className="text-base font-bold">{counts.flagged}</strong>
              </div>
              <span className="text-xs font-semibold mt-2">Flagged</span>
            </button>
          </div>

          {/* My Lists Header */}
          <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider opacity-50">
            My Lists
          </span>
          <button
            onClick={() => {
              setActiveCategory('today');
              if (isMobile) setMobileShowTasks(true);
            }}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl text-xs font-medium bg-blue-600/15 text-blue-500 text-left"
          >
            <ListIcon size={14} /> Reminders
          </button>
        </div>
      )}

      {/* Right Task View */}
      {(!isMobile || mobileShowTasks) && (
        <div className="flex-1 flex flex-col p-4 md:p-6 min-w-0 w-full h-full">
          {isMobile && (
            <button
              onClick={() => setMobileShowTasks(false)}
              className="flex items-center gap-1 text-xs font-semibold text-blue-500 hover:text-blue-600 transition-colors py-1 px-2 -ml-2 rounded-lg mb-2 w-fit"
            >
              <ChevronLeft size={16} />
              <span>Lists</span>
            </button>
          )}
          <h2 className="text-2xl font-bold capitalize mb-4 text-blue-500">
            {activeCategory}
          </h2>

        {/* Task List */}
        <div className="flex-1 overflow-y-auto space-y-2">
          {filteredTasks.map((t) => (
            <div
              key={t.id}
              className={`flex items-center justify-between p-3 rounded-xl border group transition-all ${
                isDarkMode ? 'bg-white/5 border-white/5' : 'bg-white border-black/5 shadow-xs'
              }`}
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <button
                  onClick={() => toggleTask(t.id)}
                  className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${
                    t.completed
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'border-white/30 hover:border-blue-500'
                  }`}
                >
                  {t.completed && <Check size={12} strokeWidth={3} />}
                </button>
                <span
                  className={`text-xs font-medium truncate ${
                    t.completed ? 'line-through opacity-40' : ''
                  }`}
                >
                  {t.title}
                </span>
                {t.date && (
                  <span className="text-[10px] text-red-400 font-semibold shrink-0">
                    {t.date}
                  </span>
                )}
              </div>

              <button
                onClick={() => deleteTask(t.id)}
                className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-red-400 hover:bg-red-500/10 transition"
                title="Delete"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Add New Task Form */}
        <form onSubmit={handleAddTask} className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
          <Plus size={16} className="text-blue-500 shrink-0" />
          <input
            type="text"
            value={newTaskInput}
            onChange={(e) => setNewTaskInput(e.target.value)}
            placeholder="New Reminder"
            className="w-full bg-transparent outline-none text-xs placeholder:text-neutral-500"
          />
        </form>
      </div>
      )}
    </div>
  );
};

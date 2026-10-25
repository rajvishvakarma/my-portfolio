'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  X,
  Check,
  Trash2,
  Tag,
} from 'lucide-react';
import { useDesktopStore } from '@/stores/useDesktopStore';

export interface CalendarEvent {
  id: string;
  title: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  category: 'personal' | 'work' | 'tech' | 'meetups' | 'deadlines';
  location?: string;
  notes?: string;
}

const CATEGORY_CONFIG = {
  personal: { label: 'Personal', color: '#3b82f6', bg: 'bg-blue-500', text: 'text-blue-500' },
  work: { label: 'Work', color: '#10b981', bg: 'bg-emerald-500', text: 'text-emerald-500' },
  tech: { label: 'Tech & Projects', color: '#8b5cf6', bg: 'bg-purple-500', text: 'text-purple-500' },
  meetups: { label: 'Meetups & Hackathons', color: '#f97316', bg: 'bg-orange-500', text: 'text-orange-500' },
  deadlines: { label: 'Deadlines', color: '#ef4444', bg: 'bg-red-500', text: 'text-red-500' },
};

const INITIAL_EVENTS: CalendarEvent[] = [
  {
    id: '1',
    title: 'Autonomous Robotics Demo',
    date: '2026-10-25',
    startTime: '14:00',
    endTime: '15:30',
    category: 'tech',
    location: 'Lab 4, Engineering Center',
    notes: 'Demoing vision-based robot navigation system with real-time obstacle avoidance.',
  },
  {
    id: '2',
    title: 'Portfolio Architecture Review',
    date: '2026-10-25',
    startTime: '10:00',
    endTime: '11:30',
    category: 'work',
    location: 'Google Meet',
    notes: 'Reviewing macOS portfolio simulator components & liquid glass styling.',
  },
  {
    id: '3',
    title: 'Next.js 16 Full-Stack Sprint',
    date: '2026-10-28',
    startTime: '16:00',
    endTime: '18:00',
    category: 'tech',
    location: 'Workstation',
    notes: 'Optimization and Turbopack build profiling.',
  },
  {
    id: '4',
    title: 'Balaghat Tech Community Catchup',
    date: '2026-10-29',
    startTime: '18:30',
    endTime: '20:00',
    category: 'meetups',
    location: 'City Tech Hub',
    notes: 'Monthly meetup discussing modern web ecosystems and AI integration.',
  },
  {
    id: '5',
    title: 'Final Semester Project Submission',
    date: '2026-10-31',
    startTime: '23:59',
    endTime: '23:59',
    category: 'deadlines',
    location: 'Online Portal',
    notes: 'Upload final paper and GitHub repository links.',
  },
];

export const CalendarApp: React.FC = () => {
  const { theme, addNotification, isMobile } = useDesktopStore();
  const isDark = theme === 'dark';

  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 9, 25)); // Oct 25, 2026
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 9, 25));
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month' | 'year'>('month');
  const [events, setEvents] = useState<CalendarEvent[]>(INITIAL_EVENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileShowAll, setMobileShowAll] = useState(false);
  const [visibleCategories, setVisibleCategories] = useState({
    personal: true,
    work: true,
    tech: true,
    meetups: true,
    deadlines: true,
  });

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CalendarEvent | null>(null);
  const [formTitle, setFormTitle] = useState('');
  const [formDate, setFormDate] = useState('2026-10-25');
  const [formStartTime, setFormStartTime] = useState('10:00');
  const [formEndTime, setFormEndTime] = useState('11:00');
  const [formCategory, setFormCategory] = useState<CalendarEvent['category']>('tech');
  const [formLocation, setFormLocation] = useState('');
  const [formNotes, setFormNotes] = useState('');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  // Navigation handlers
  const handlePrev = () => {
    if (viewMode === 'day') {
      setCurrentDate(new Date(year, month, currentDate.getDate() - 1));
    } else if (viewMode === 'week') {
      setCurrentDate(new Date(year, month, currentDate.getDate() - 7));
    } else if (viewMode === 'month') {
      setCurrentDate(new Date(year, month - 1, 1));
    } else {
      setCurrentDate(new Date(year - 1, month, 1));
    }
  };

  const handleNext = () => {
    if (viewMode === 'day') {
      setCurrentDate(new Date(year, month, currentDate.getDate() + 1));
    } else if (viewMode === 'week') {
      setCurrentDate(new Date(year, month, currentDate.getDate() + 7));
    } else if (viewMode === 'month') {
      setCurrentDate(new Date(year, month + 1, 1));
    } else {
      setCurrentDate(new Date(year + 1, month, 1));
    }
  };

  const handleToday = () => {
    const today = new Date(2026, 9, 25);
    setCurrentDate(today);
    setSelectedDate(today);
  };

  const openNewEventModal = (dateStr?: string) => {
    setEditingEvent(null);
    setFormTitle('');
    setFormDate(dateStr || `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`);
    setFormStartTime('10:00');
    setFormEndTime('11:00');
    setFormCategory('tech');
    setFormLocation('');
    setFormNotes('');
    setModalOpen(true);
  };

  const openEditModal = (event: CalendarEvent) => {
    setEditingEvent(event);
    setFormTitle(event.title);
    setFormDate(event.date);
    setFormStartTime(event.startTime);
    setFormEndTime(event.endTime);
    setFormCategory(event.category);
    setFormLocation(event.location || '');
    setFormNotes(event.notes || '');
    setModalOpen(true);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    if (editingEvent) {
      setEvents((prev) =>
        prev.map((ev) =>
          ev.id === editingEvent.id
            ? {
                ...ev,
                title: formTitle.trim(),
                date: formDate,
                startTime: formStartTime,
                endTime: formEndTime,
                category: formCategory,
                location: formLocation.trim(),
                notes: formNotes.trim(),
              }
            : ev
        )
      );
      addNotification('Calendar', `Updated event: ${formTitle}`);
    } else {
      const newEv: CalendarEvent = {
        id: Date.now().toString(),
        title: formTitle.trim(),
        date: formDate,
        startTime: formStartTime,
        endTime: formEndTime,
        category: formCategory,
        location: formLocation.trim(),
        notes: formNotes.trim(),
      };
      setEvents((prev) => [...prev, newEv]);
      addNotification('Calendar', `Created event: ${formTitle}`);
    }
    setModalOpen(false);
  };

  const handleDeleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((ev) => ev.id !== id));
    setModalOpen(false);
  };

  // Filter events by category and search
  const filteredEvents = events.filter((ev) => {
    if (!visibleCategories[ev.category]) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return ev.title.toLowerCase().includes(q) || (ev.location && ev.location.toLowerCase().includes(q));
    }
    return true;
  });

  return (
    <div
      className={`h-full w-full flex flex-col select-none overflow-hidden font-[-apple-system,BlinkMacSystemFont,sans-serif] ${
        isDark ? 'bg-[#1e1e1e] text-white' : 'bg-[#f6f6f6] text-neutral-900'
      }`}
    >
      {/* Top Toolbar */}
      {isMobile ? (
        <div
          className={`border-b p-3 flex flex-col gap-2 shrink-0 ${
            isDark ? 'border-white/10 bg-[#252525]/90' : 'border-black/10 bg-white/90'
          } backdrop-blur-md`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center rounded-lg border border-black/10 dark:border-white/10 overflow-hidden bg-black/5 dark:bg-white/5">
                <button
                  onClick={handlePrev}
                  className="p-1.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                  title="Previous"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  onClick={handleNext}
                  className="p-1.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                  title="Next"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

              <button
                onClick={handleToday}
                className="px-2.5 py-1 text-xs font-semibold rounded-md border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                Today
              </button>

              <span className="text-sm font-bold tracking-tight">
                {monthNames[month]} {year}
              </span>
            </div>

            <button
              onClick={() => openNewEventModal()}
              className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-full shadow-xs transition-colors"
            >
              <Plus size={14} />
              <span>Event</span>
            </button>
          </div>

          {/* Horizontal Date Picker Strip */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const dayEvCount = filteredEvents.filter((ev) => ev.date === dateStr).length;
              const isSel = !mobileShowAll && day === selectedDate.getDate() && month === selectedDate.getMonth();
              const isToday = day === 25 && month === 9 && year === 2026;
              const dayOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'][new Date(year, month, day).getDay()];

              return (
                <button
                  key={day}
                  onClick={() => {
                    setSelectedDate(new Date(year, month, day));
                    setMobileShowAll(false);
                  }}
                  className={`flex flex-col items-center justify-center min-w-[38px] py-1.5 rounded-xl text-center transition-all ${
                    isSel
                      ? 'bg-blue-600 text-white font-bold shadow-md'
                      : isToday
                      ? 'bg-red-500/20 text-red-500 font-bold border border-red-500/30'
                      : 'hover:bg-black/5 dark:hover:bg-white/5 text-neutral-600 dark:text-neutral-300'
                  }`}
                >
                  <span className="text-[10px] font-medium opacity-60">{dayOfWeek}</span>
                  <span className="text-xs font-bold mt-0.5">{day}</span>
                  <div
                    className={`w-1 h-1 rounded-full mt-1 ${
                      dayEvCount > 0 ? (isSel ? 'bg-white' : 'bg-blue-500') : 'opacity-0'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <div
          className={`h-12 border-b flex items-center justify-between px-4 shrink-0 ${
            isDark ? 'border-white/10 bg-[#252525]/90' : 'border-black/10 bg-white/90'
          } backdrop-blur-md`}
        >
          {/* Left: Prev/Next/Today & Title */}
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-lg border border-black/10 dark:border-white/10 overflow-hidden bg-black/5 dark:bg-white/5">
              <button
                onClick={handlePrev}
                className="p-1.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                title="Previous"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="p-1.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                title="Next"
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <button
              onClick={handleToday}
              className="px-2.5 py-1 text-xs font-semibold rounded-md border border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
            >
              Today
            </button>

            <span className="text-sm font-bold tracking-tight">
              {monthNames[month]} {year}
            </span>
          </div>

          {/* Center: View Switcher */}
          <div className="flex items-center p-0.5 rounded-lg bg-black/10 dark:bg-white/10 text-xs font-medium">
            {(['day', 'week', 'month', 'year'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 rounded-md capitalize transition-all ${
                  viewMode === mode
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white font-semibold shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          {/* Right: Search & Add Event */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-2.5 top-2 text-neutral-400" />
              <input
                type="text"
                placeholder="Search events"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-36 pl-8 pr-3 py-1 text-xs rounded-md bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={() => openNewEventModal()}
              className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-md shadow-xs transition-colors"
            >
              <Plus size={14} />
              <span>Event</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Workspace Layout */}
      {isMobile ? (
        <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
          <div className="flex items-center justify-between pb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
              {mobileShowAll
                ? `All Events (${filteredEvents.length})`
                : `${selectedDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}`}
            </span>
            <button
              onClick={() => setMobileShowAll(!mobileShowAll)}
              className="text-xs font-semibold text-blue-500 hover:underline"
            >
              {mobileShowAll ? 'Show Selected Day' : 'View All Events'}
            </button>
          </div>

          {/* Events List */}
          {(() => {
            const selectedDateStr = `${year}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(
              selectedDate.getDate()
            ).padStart(2, '0')}`;
            const displayEvents = mobileShowAll
              ? filteredEvents
              : filteredEvents.filter((ev) => ev.date === selectedDateStr);

            if (displayEvents.length === 0) {
              return (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-neutral-400">
                    <CalendarIcon size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      No events scheduled
                    </p>
                    <p className="text-xs text-neutral-400 mt-0.5">
                      Tap another date or click Add to create an event
                    </p>
                  </div>
                  <button
                    onClick={() => openNewEventModal(selectedDateStr)}
                    className="px-4 py-1.5 rounded-full bg-blue-600 text-white text-xs font-semibold hover:bg-blue-500 transition-colors"
                  >
                    + Create Event
                  </button>
                </div>
              );
            }

            return displayEvents.map((ev) => {
              const cat = CATEGORY_CONFIG[ev.category] || CATEGORY_CONFIG.tech;
              return (
                <div
                  key={ev.id}
                  onClick={() => openEditModal(ev)}
                  className="p-3.5 rounded-2xl bg-white dark:bg-[#252528] border border-black/5 dark:border-white/10 shadow-sm flex items-center justify-between active:scale-[0.98] transition-all cursor-pointer hover:border-blue-500/30"
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div
                      className="w-1.5 h-12 rounded-full shrink-0 mt-0.5"
                      style={{ backgroundColor: cat.color }}
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-blue-500 flex items-center gap-1">
                          <Clock size={12} />
                          {ev.startTime} - {ev.endTime}
                        </span>
                        <span
                          className="text-[10px] px-2 py-0.5 rounded-full font-medium text-white"
                          style={{ backgroundColor: cat.color }}
                        >
                          {cat.label}
                        </span>
                      </div>
                      <h4 className="font-bold text-sm text-neutral-900 dark:text-white truncate mt-1">
                        {ev.title}
                      </h4>
                      {ev.location && (
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 flex items-center gap-1 mt-0.5 truncate">
                          <MapPin size={11} /> {ev.location}
                        </p>
                      )}
                      {ev.notes && (
                        <p className="text-[11px] text-neutral-400 mt-1 line-clamp-1">{ev.notes}</p>
                      )}
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-neutral-400 shrink-0 ml-2" />
                </div>
              );
            });
          })()}
        </div>
      ) : (
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div
          className={`w-56 p-4 border-r hidden md:flex flex-col justify-between shrink-0 ${
            isDark ? 'border-white/10 bg-[#1a1a1a]/80' : 'border-black/10 bg-white/60'
          }`}
        >
          <div className="space-y-5">
            {/* Mini Month Calendar */}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-red-500 mb-2">
                {monthNames[month]}
              </p>
              <div className="grid grid-cols-7 gap-1 text-center text-[10px]">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                  <span key={i} className="font-semibold text-neutral-400">
                    {d}
                  </span>
                ))}
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                  <span key={`empty-${i}`} />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const isToday = day === 25 && month === 9 && year === 2026;
                  const isSel = day === selectedDate.getDate() && month === selectedDate.getMonth();
                  return (
                    <button
                      key={day}
                      onClick={() => setSelectedDate(new Date(year, month, day))}
                      className={`h-5 w-5 flex items-center justify-center rounded-full mx-auto transition-colors ${
                        isToday
                          ? 'bg-red-500 text-white font-bold'
                          : isSel
                          ? 'bg-blue-600 text-white font-bold'
                          : 'hover:bg-black/10 dark:hover:bg-white/10'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* My Calendars Categories */}
            <div>
              <p className="text-xs font-bold text-neutral-400 uppercase tracking-wider mb-2.5">
                My Calendars
              </p>
              <div className="space-y-1.5">
                {(Object.keys(CATEGORY_CONFIG) as Array<keyof typeof CATEGORY_CONFIG>).map((cat) => {
                  const cfg = CATEGORY_CONFIG[cat];
                  const checked = visibleCategories[cat];
                  return (
                    <button
                      key={cat}
                      onClick={() =>
                        setVisibleCategories((prev) => ({ ...prev, [cat]: !prev[cat] }))
                      }
                      className="w-full flex items-center gap-2.5 px-2 py-1 rounded-md text-xs hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left"
                    >
                      <div
                        className="w-3.5 h-3.5 rounded flex items-center justify-center text-white"
                        style={{ backgroundColor: checked ? cfg.color : 'transparent', border: `1.5px solid ${cfg.color}` }}
                      >
                        {checked && <Check size={10} strokeWidth={3} />}
                      </div>
                      <span className="truncate">{cfg.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="text-[11px] text-neutral-400 pt-3 border-t border-black/10 dark:border-white/10">
            <span>{filteredEvents.length} events scheduled</span>
          </div>
        </div>

        {/* Calendar View Body */}
        <div className="flex-1 overflow-auto p-4">
          {/* MONTH VIEW */}
          {viewMode === 'month' && (
            <div className="h-full flex flex-col min-w-[500px]">
              {/* Day Headers */}
              <div className="grid grid-cols-7 border-b border-black/10 dark:border-white/10 pb-2 mb-2 text-center text-xs font-semibold text-neutral-400">
                <span>SUN</span>
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
                <span>SAT</span>
              </div>

              {/* Month Grid */}
              <div className="grid grid-cols-7 grid-rows-5 gap-1.5 flex-1 min-h-[460px]">
                {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                  <div
                    key={`empty-cell-${i}`}
                    className="p-1 rounded-lg border border-black/5 dark:border-white/5 opacity-30"
                  />
                ))}

                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                  const dayEvents = filteredEvents.filter((ev) => ev.date === dateStr);
                  const isToday = day === 25 && month === 9 && year === 2026;
                  const isSel = day === selectedDate.getDate() && month === selectedDate.getMonth();

                  return (
                    <div
                      key={day}
                      onClick={() => setSelectedDate(new Date(year, month, day))}
                      onDoubleClick={() => openNewEventModal(dateStr)}
                      className={`p-1.5 rounded-lg border transition-all cursor-pointer flex flex-col justify-between overflow-hidden ${
                        isSel
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span
                          className={`text-xs w-6 h-6 flex items-center justify-center rounded-full font-semibold ${
                            isToday
                              ? 'bg-red-500 text-white'
                              : isSel
                              ? 'text-blue-500 font-bold'
                              : ''
                          }`}
                        >
                          {day}
                        </span>
                        {dayEvents.length > 0 && (
                          <span className="text-[10px] text-neutral-400 font-medium">
                            {dayEvents.length}
                          </span>
                        )}
                      </div>

                      {/* Event Chips */}
                      <div className="space-y-1 overflow-y-auto max-h-16">
                        {dayEvents.map((ev) => {
                          const cfg = CATEGORY_CONFIG[ev.category];
                          return (
                            <div
                              key={ev.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                openEditModal(ev);
                              }}
                              className="px-1.5 py-0.5 rounded text-[10px] font-medium truncate text-white shadow-2xs hover:opacity-85 transition-opacity"
                              style={{ backgroundColor: cfg.color }}
                              title={`${ev.title} (${ev.startTime} - ${ev.endTime})`}
                            >
                              {ev.startTime} {ev.title}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* DAY VIEW */}
          {viewMode === 'day' && (
            <div className="h-full flex flex-col">
              <div className="border-b border-black/10 dark:border-white/10 pb-3 mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">
                    {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </h2>
                  <p className="text-xs text-neutral-400 mt-0.5">
                    {filteredEvents.filter((ev) => ev.date === `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`).length} events for today
                  </p>
                </div>
                <button
                  onClick={() => openNewEventModal(`${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`)}
                  className="px-3 py-1.5 bg-blue-600 text-white text-xs font-semibold rounded-md shadow-xs flex items-center gap-1.5"
                >
                  <Plus size={14} /> Add Event
                </button>
              </div>

              {/* Day Time Slots */}
              <div className="flex-1 overflow-y-auto space-y-2">
                {[8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((hour) => {
                  const hourStr = `${String(hour).padStart(2, '0')}:00`;
                  const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`;
                  const slotEvents = filteredEvents.filter(
                    (ev) => ev.date === dateStr && parseInt(ev.startTime.split(':')[0], 10) === hour
                  );

                  return (
                    <div key={hour} className="flex gap-4 border-t border-black/5 dark:border-white/5 pt-2 min-h-14">
                      <span className="w-16 text-xs text-neutral-400 font-mono shrink-0">
                        {hour > 12 ? `${hour - 12}:00 PM` : `${hour}:00 AM`}
                      </span>
                      <div className="flex-1 space-y-1.5">
                        {slotEvents.map((ev) => {
                          const cfg = CATEGORY_CONFIG[ev.category];
                          return (
                            <div
                              key={ev.id}
                              onClick={() => openEditModal(ev)}
                              className="p-2.5 rounded-lg border cursor-pointer hover:shadow-md transition-all flex items-start justify-between"
                              style={{ borderColor: `${cfg.color}55`, backgroundColor: `${cfg.color}15` }}
                            >
                              <div>
                                <h4 className="text-xs font-bold" style={{ color: cfg.color }}>
                                  {ev.title}
                                </h4>
                                <p className="text-[11px] text-neutral-500 mt-0.5">
                                  {ev.startTime} - {ev.endTime} {ev.location && `· ${ev.location}`}
                                </p>
                                {ev.notes && (
                                  <p className="text-[11px] text-neutral-400 mt-1">{ev.notes}</p>
                                )}
                              </div>
                              <span
                                className="px-2 py-0.5 rounded text-[10px] font-semibold text-white uppercase tracking-wider"
                                style={{ backgroundColor: cfg.color }}
                              >
                                {cfg.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* WEEK VIEW */}
          {viewMode === 'week' && (
            <div className="h-full flex flex-col min-w-[600px]">
              <div className="grid grid-cols-7 border-b border-black/10 dark:border-white/10 pb-2 mb-2 text-center text-xs font-semibold">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, i) => (
                  <div key={day} className="text-neutral-400">
                    <div>{day}</div>
                    <div className="text-sm font-bold text-neutral-900 dark:text-white mt-1">
                      {21 + i}
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2 flex-1 overflow-y-auto">
                {Array.from({ length: 7 }).map((_, i) => {
                  const dayNum = 21 + i;
                  const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayNum).padStart(2, '0')}`;
                  const dayEvents = filteredEvents.filter((ev) => ev.date === dateStr);

                  return (
                    <div
                      key={dayNum}
                      className="border border-black/10 dark:border-white/10 rounded-lg p-2 flex flex-col gap-1.5 min-h-[300px]"
                    >
                      {dayEvents.map((ev) => {
                        const cfg = CATEGORY_CONFIG[ev.category];
                        return (
                          <div
                            key={ev.id}
                            onClick={() => openEditModal(ev)}
                            className="p-2 rounded text-[11px] cursor-pointer hover:opacity-85 text-white shadow-2xs"
                            style={{ backgroundColor: cfg.color }}
                          >
                            <p className="font-bold truncate">{ev.title}</p>
                            <p className="text-[10px] opacity-80 mt-0.5">{ev.startTime} - {ev.endTime}</p>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* YEAR VIEW */}
          {viewMode === 'year' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-2 overflow-y-auto">
              {monthNames.map((name, mIdx) => (
                <div
                  key={name}
                  onClick={() => {
                    setCurrentDate(new Date(year, mIdx, 1));
                    setViewMode('month');
                  }}
                  className="p-3 rounded-xl border border-black/10 dark:border-white/10 hover:border-blue-500/50 cursor-pointer transition-all"
                >
                  <h4 className="text-xs font-bold text-red-500 mb-2 uppercase">{name}</h4>
                  <div className="grid grid-cols-7 gap-1 text-[9px] text-center text-neutral-400">
                    <span>S</span>
                    <span>M</span>
                    <span>T</span>
                    <span>W</span>
                    <span>T</span>
                    <span>F</span>
                    <span>S</span>
                    {Array.from({ length: 30 }).map((_, d) => (
                      <span key={d} className="p-0.5 hover:text-white">
                        {d + 1}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      )}

      {/* Add / Edit Event Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className={`w-full max-w-md rounded-2xl p-6 shadow-2xl border ${
              isDark ? 'bg-[#252525] border-white/15 text-white' : 'bg-white border-black/10 text-neutral-900'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold">
                {editingEvent ? 'Edit Event' : 'New Event'}
              </h3>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="Event title"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-sm outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">
                    Date
                  </label>
                  <input
                    type="date"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">
                    Start
                  </label>
                  <input
                    type="time"
                    required
                    value={formStartTime}
                    onChange={(e) => setFormStartTime(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-neutral-400 mb-1">
                    End
                  </label>
                  <input
                    type="time"
                    required
                    value={formEndTime}
                    onChange={(e) => setFormEndTime(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">
                  Calendar
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value as CalendarEvent['category'])}
                  className="w-full px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="tech">Tech & Projects (Purple)</option>
                  <option value="work">Work (Green)</option>
                  <option value="personal">Personal (Blue)</option>
                  <option value="meetups">Meetups & Hackathons (Orange)</option>
                  <option value="deadlines">Deadlines (Red)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  placeholder="Optional location or meeting link"
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-400 mb-1">
                  Notes
                </label>
                <textarea
                  rows={2}
                  placeholder="Optional notes or details"
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-xs outline-none resize-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-black/10 dark:border-white/10">
                {editingEvent ? (
                  <button
                    type="button"
                    onClick={() => handleDeleteEvent(editingEvent.id)}
                    className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                ) : <span />}

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-1.5 rounded-lg border border-black/10 dark:border-white/10 text-xs font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    {editingEvent ? 'Save Changes' : 'Create Event'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

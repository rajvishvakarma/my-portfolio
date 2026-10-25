'use client';

import React from 'react';
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
  isSameMonth,
} from 'date-fns';

import { useDesktopStore } from '@/stores/useDesktopStore';

export const CalendarWidget: React.FC = () => {
  const { theme } = useDesktopStore();
  const isDark = theme === 'dark';
  const [today, setToday] = React.useState<Date>(() => new Date());

  React.useEffect(() => {
    const timer = window.setTimeout(() => setToday(new Date()), 0);
    return () => window.clearTimeout(timer);
  }, []);

  const start = startOfWeek(startOfMonth(today));
  const end = endOfWeek(endOfMonth(today));
  const days = eachDayOfInterval({ start, end });
  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div
      className={`w-56 md:w-60 min-h-[210px] p-4 rounded-2xl backdrop-blur-2xl transition-all duration-300 select-none flex flex-col justify-between ${
        isDark
          ? 'bg-black/60 border border-white/15 text-white shadow-[0_8px_32px_rgba(0,0,0,0.4)]'
          : 'bg-white/80 border border-black/10 text-slate-800 shadow-[0_8px_32px_rgba(0,0,0,0.12)]'
      }`}
    >
      {/* Month header — red, uppercase, SF style */}
      <div className="mb-2">
        <span className="text-[11px] font-bold text-[#FF3B30] uppercase tracking-wider block">
          {format(today, 'MMMM')}
        </span>
      </div>

      {/* Day of week labels */}
      <div className="grid grid-cols-7 mb-1 text-center">
        {dayLabels.map((d, i) => (
          <div
            key={i}
            className={`text-[9px] font-semibold pb-1 ${
              isDark ? 'text-white/40' : 'text-slate-400'
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => {
          const isToday = isSameDay(day, today);
          const inMonth = isSameMonth(day, today);
          return (
            <div
              key={day.toISOString()}
              className={`text-center text-[10px] w-5 h-5 flex items-center justify-center rounded-full mx-auto transition-colors ${
                isToday
                  ? 'bg-[#FF3B30] text-white font-bold shadow-xs'
                  : inMonth
                  ? isDark
                    ? 'text-white/85 font-medium hover:bg-white/10'
                    : 'text-slate-800 font-medium hover:bg-black/5'
                  : isDark
                  ? 'text-white/20'
                  : 'text-slate-300'
              }`}
            >
              {format(day, 'd')}
            </div>
          );
        })}
      </div>
    </div>
  );
};

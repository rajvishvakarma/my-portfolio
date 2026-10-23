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

export const CalendarWidget: React.FC = () => {
  const [today, setToday] = React.useState<Date>(() => new Date(2024, 9, 24));

  React.useEffect(() => {
    setToday(new Date());
  }, []);

  const start = startOfWeek(startOfMonth(today));
  const end = endOfWeek(endOfMonth(today));
  const days = eachDayOfInterval({ start, end });
  const dayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="w-48 p-3.5 rounded-2xl bg-black/45 dark:bg-black/60 backdrop-blur-2xl border border-white/15 shadow-[0_8px_32px_rgba(0,0,0,0.4)] select-none text-white">
      {/* Month header — red, uppercase, SF style */}
      <div className="mb-2">
        <span className="text-[11px] font-bold text-[#FF3B30] uppercase tracking-wider block">
          {format(today, 'MMMM')}
        </span>
      </div>

      {/* Day of week labels */}
      <div className="grid grid-cols-7 mb-1 text-center">
        {dayLabels.map((d, i) => (
          <div key={i} className="text-[9px] font-semibold text-white/40 pb-1">
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
                  ? 'text-white/85 font-medium'
                  : 'text-white/20'
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

"use client";

import React, { useState, useEffect, useRef } from "react";
import { Plus, ChevronDown, Check } from "lucide-react";
import { useDesktopStore } from "@/stores/useDesktopStore";
import { WindowControls } from "@/components/windows/WindowControls";

type ClockTab = "World Clock" | "Alarms" | "Stopwatch" | "Timers";

interface AlarmItem {
  id: string;
  time: string;
  period: "AM" | "PM";
  title: string;
  repeat: string;
  sound: string;
  enabled: boolean;
}

interface WorldCity {
  id: string;
  name: string;
  country: string;
  timeZone: string;
  offset: string;
}

const DEFAULT_CITIES: WorldCity[] = [
  { id: "delhi", name: "New Delhi", country: "India", timeZone: "Asia/Kolkata", offset: "+0HRS" },
  { id: "london", name: "London", country: "United Kingdom", timeZone: "Europe/London", offset: "-5.5HRS" },
  { id: "tokyo", name: "Tokyo", country: "Japan", timeZone: "Asia/Tokyo", offset: "+3.5HRS" },
  { id: "ny", name: "New York", country: "United States", timeZone: "America/New_York", offset: "-10.5HRS" },
];

export const ClockApp: React.FC = () => {
  const { theme } = useDesktopStore();
  const isDark = theme === "dark";

  const [activeTab, setActiveTab] = useState<ClockTab>("Timers");

  // ==================== Real-time clock for World Clock ====================
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // ==================== World Clock State ====================
  const [cities, setCities] = useState<WorldCity[]>(DEFAULT_CITIES);
  const [showAddCity, setShowAddCity] = useState(false);

  // ==================== Alarms State ====================
  const [alarms, setAlarms] = useState<AlarmItem[]>([
    { id: "1", time: "3:00", period: "AM", title: "Alarm", repeat: "Never", sound: "Radial", enabled: false },
    { id: "2", time: "6:00", period: "AM", title: "Alarm", repeat: "Never", sound: "Radial", enabled: false },
    { id: "3", time: "10:07", period: "PM", title: "Alarm", repeat: "Never", sound: "Radial", enabled: false },
  ]);
  const [showAddAlarm, setShowAddAlarm] = useState(false);
  const [newAlarmTime, setNewAlarmTime] = useState("07:00");

  const toggleAlarm = (id: string) => {
    setAlarms((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    );
  };

  const handleAddAlarm = () => {
    const [h, m] = newAlarmTime.split(":").map(Number);
    const period: "AM" | "PM" = h >= 12 ? "PM" : "AM";
    const hour12 = h % 12 || 12;
    const timeFormatted = `${hour12}:${String(m).padStart(2, "0")}`;
    const newAlarm: AlarmItem = {
      id: Date.now().toString(),
      time: timeFormatted,
      period,
      title: "Alarm",
      repeat: "Never",
      sound: "Radial",
      enabled: true,
    };
    setAlarms((prev) => [...prev, newAlarm]);
    setShowAddAlarm(false);
  };

  // ==================== Stopwatch State ====================
  const [swTime, setSwTime] = useState(0); // in ms
  const [swRunning, setSwRunning] = useState(false);
  const [laps, setLaps] = useState<{ id: number; split: number; total: number }[]>([]);
  const swRafRef = useRef<number | null>(null);
  const swStartTimeRef = useRef<number>(0);

  useEffect(() => {
    if (swRunning) {
      swStartTimeRef.current = performance.now() - swTime;
      const update = () => {
        setSwTime(performance.now() - swStartTimeRef.current);
        swRafRef.current = requestAnimationFrame(update);
      };
      swRafRef.current = requestAnimationFrame(update);
    } else if (swRafRef.current) {
      cancelAnimationFrame(swRafRef.current);
    }
    return () => {
      if (swRafRef.current) cancelAnimationFrame(swRafRef.current);
    };
  }, [swRunning]);

  const handleSwToggle = () => {
    setSwRunning((prev) => !prev);
  };

  const handleSwLapOrReset = () => {
    if (swRunning) {
      // Add lap
      const lastTotal = laps.length > 0 ? laps[0].total : 0;
      const split = swTime - lastTotal;
      setLaps((prev) => [{ id: prev.length + 1, split, total: swTime }, ...prev]);
    } else {
      // Reset
      setSwTime(0);
      setLaps([]);
    }
  };

  const formatStopwatch = (ms: number) => {
    const totalHundredths = Math.floor(ms / 10);
    const hundredths = totalHundredths % 100;
    const totalSeconds = Math.floor(totalHundredths / 100);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor(totalSeconds / 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(hundredths).padStart(2, "0")}`;
  };

  // ==================== Timers State ====================
  const [timerHours, setTimerHours] = useState(2);
  const [timerMinutes, setTimerMinutes] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRemaining, setTimerRemaining] = useState(2 * 3600); // 2 hours default
  const [timerRunning, setTimerRunning] = useState(false);
  const [timerSelectedSound, setTimerSelectedSound] = useState("Radial (Default)");
  const [showSoundDropdown, setShowSoundDropdown] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning && timerRemaining > 0) {
      interval = setInterval(() => {
        setTimerRemaining((prev) => {
          if (prev <= 1) {
            setTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerRemaining]);

  const handleTimerStartPause = () => {
    if (!timerRunning && timerRemaining === 0) {
      // Reset from chosen values
      const total = timerHours * 3600 + timerMinutes * 60 + timerSeconds;
      setTimerRemaining(total > 0 ? total : 7200);
    }
    setTimerRunning((prev) => !prev);
  };

  const handleTimerCancel = () => {
    setTimerRunning(false);
    const total = timerHours * 3600 + timerMinutes * 60 + timerSeconds;
    setTimerRemaining(total > 0 ? total : 7200);
  };

  const formatTimerDisplay = (totalSec: number) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return {
      h: String(h).padStart(2, "0"),
      m: String(m).padStart(2, "0"),
      s: String(s).padStart(2, "0"),
    };
  };

  const currentTimer = formatTimerDisplay(timerRemaining);

  // Plus button handler based on active tab
  const handlePlusClick = () => {
    if (activeTab === "Alarms") {
      setShowAddAlarm(true);
    } else if (activeTab === "World Clock") {
      setShowAddCity(true);
    }
  };

  return (
    <div
      className={`clock-window flex flex-col h-full w-full select-none overflow-hidden transition-colors duration-200 ${
        isDark ? "bg-[#1c1c1e] text-white" : "bg-[#f5f5f7] text-[#1d1d1f]"
      }`}
    >
      {/* ==================== macOS Unified Title Bar ==================== */}
      <div
        data-window-drag
        className={`h-[52px] shrink-0 px-4 flex items-center justify-between border-b ${
          isDark ? "border-white/10 bg-[#252528]/85" : "border-black/10 bg-[#ebebed]/90"
        } backdrop-blur-xl`}
      >
        {/* Left: Window Traffic Lights */}
        <div className="flex items-center w-24">
          <WindowControls appId="clock" />
        </div>

        {/* Center: Segmented Control (World Clock | Alarms | Stopwatch | Timers) */}
        <div
          className={`flex items-center p-[2px] rounded-full border text-[13px] font-medium shadow-2xs ${
            isDark
              ? "bg-[#1f1f21] border-white/10 text-neutral-300"
              : "bg-black/[0.06] border-black/8 text-neutral-600"
          }`}
        >
          {(["World Clock", "Alarms", "Stopwatch", "Timers"] as ClockTab[]).map(
            (tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1 rounded-full transition-all duration-150 cursor-pointer ${
                    isActive
                      ? isDark
                        ? "bg-[#636366] text-white shadow-xs font-semibold"
                        : "bg-white text-neutral-900 shadow-xs font-semibold"
                      : "hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              );
            }
          )}
        </div>

        {/* Right: Plus Button (+) matching reference screenshots */}
        <div className="w-24 flex justify-end items-center">
          <button
            onClick={handlePlusClick}
            aria-label="Add"
            title="Add"
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              isDark
                ? "bg-white/10 hover:bg-white/20 text-white"
                : "bg-black/8 hover:bg-black/15 text-neutral-800"
            }`}
          >
            <Plus size={16} strokeWidth={2.4} />
          </button>
        </div>
      </div>

      {/* ==================== Tab Contents ==================== */}
      <div className="flex-1 min-h-0 overflow-y-auto relative">
        {/* ----------------- 1. TIMERS ----------------- */}
        {activeTab === "Timers" && (
          <div className="h-full flex flex-col justify-between py-10 px-8 max-w-2xl mx-auto">
            <div className="flex-1 flex flex-col items-center justify-center">
              {/* Unit Labels (hr, min, sec) */}
              <div className="grid grid-cols-3 w-[360px] text-center text-[13px] font-medium opacity-60 mb-1">
                <span>hr</span>
                <span>min</span>
                <span>sec</span>
              </div>

              {/* Giant Digital Readout: 02:00:00 */}
              <div className="flex items-center justify-center font-light tracking-tight text-[84px] md:text-[98px] leading-none tabular-nums font-sans">
                <span>{currentTimer.h}</span>
                <span className="mx-1 opacity-40 font-extralight">:</span>
                <span>{currentTimer.m}</span>
                <span className="mx-1 opacity-40 font-extralight">:</span>
                <span>{currentTimer.s}</span>
              </div>

              {/* Timer Sound Selector */}
              <div className="mt-8 flex flex-col items-center relative">
                <span className="text-[12px] opacity-60 mb-1 font-medium">Timer</span>
                <button
                  onClick={() => setShowSoundDropdown(!showSoundDropdown)}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[13px] font-medium border cursor-pointer ${
                    isDark
                      ? "bg-white/10 hover:bg-white/15 border-white/10 text-white"
                      : "bg-white hover:bg-neutral-50 border-black/10 text-neutral-800 shadow-2xs"
                  }`}
                >
                  <span>{timerSelectedSound}</span>
                  <ChevronDown size={14} className="opacity-70" />
                </button>

                {showSoundDropdown && (
                  <div
                    className={`absolute top-full mt-2 z-50 min-w-[200px] rounded-xl border p-1 shadow-xl backdrop-blur-2xl ${
                      isDark ? "bg-[#28282b]/95 border-white/15 text-white" : "bg-white/95 border-black/10 text-neutral-800"
                    }`}
                  >
                    {["Radial (Default)", "Sencha", "By the Seaside", "Chimes", "Constellation", "Waves"].map((sound) => (
                      <button
                        key={sound}
                        onClick={() => {
                          setTimerSelectedSound(sound);
                          setShowSoundDropdown(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[13px] text-left hover:bg-blue-600 hover:text-white cursor-pointer ${
                          timerSelectedSound === sound ? "font-semibold text-blue-500" : ""
                        }`}
                      >
                        <span>{sound}</span>
                        {timerSelectedSound === sound && <Check size={14} />}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Controls (Cancel & Start/Pause) */}
            <div className="flex items-center justify-center gap-6 pt-6">
              <button
                onClick={handleTimerCancel}
                className={`px-8 py-2 rounded-full text-[14px] font-medium transition-all active:scale-95 cursor-pointer ${
                  isDark ? "bg-white/10 text-neutral-300 hover:bg-white/15" : "bg-black/8 text-neutral-700 hover:bg-black/12"
                }`}
              >
                Cancel
              </button>

              <button
                onClick={handleTimerStartPause}
                className={`px-9 py-2 rounded-full text-[14px] font-semibold text-white shadow-md transition-all active:scale-95 cursor-pointer ${
                  timerRunning ? "bg-[#ff9f0a] hover:bg-[#ff9500]" : "bg-[#30d158] hover:bg-[#34c759]"
                }`}
              >
                {timerRunning ? "Pause" : "Start"}
              </button>
            </div>
          </div>
        )}

        {/* ----------------- 2. WORLD CLOCK ----------------- */}
        {activeTab === "World Clock" && (
          <div className="h-full flex flex-col">
            {/* Top: World Map with Solar Terminator */}
            <div className="relative h-[230px] shrink-0 overflow-hidden border-b border-black/10 dark:border-white/10 bg-[#0d0d10]">
              {/* World map silhouette SVG */}
              <svg
                viewBox="0 0 1000 480"
                className="w-full h-full object-cover opacity-85"
                preserveAspectRatio="none"
              >
                {/* Continents outlines / silhouette */}
                <path
                  d="M150,120 Q180,90 220,100 T280,140 T240,220 T180,200 Z M190,260 Q230,240 260,290 T280,380 T230,420 T200,340 Z M460,80 Q520,70 560,110 T520,160 T460,140 Z M460,170 Q520,180 540,240 T520,340 T460,320 Z M640,90 Q720,80 800,120 T840,220 T740,240 T660,160 Z M760,280 Q840,260 860,330 T800,380 T760,320 Z"
                  fill="#323236"
                />
                {/* Solar terminator daylight illumination curve */}
                <path
                  d="M0,80 Q250,20 500,240 T1000,80 L1000,480 L0,480 Z"
                  fill="none"
                  stroke="rgba(255,255,255,0.35)"
                  strokeWidth="1.5"
                />
                {/* Dark night shading overlay */}
                <path
                  d="M0,80 Q250,20 500,240 T1000,80 L1000,480 L0,480 Z"
                  fill="rgba(0,0,0,0.4)"
                />
              </svg>

              {/* Pin marker for New Delhi */}
              <div className="absolute top-[88px] left-[70%] -translate-x-1/2 flex items-center gap-1.5 pointer-events-none drop-shadow-md">
                <span className="w-2.5 h-2.5 rounded-full bg-[#0a84ff] shadow-[0_0_8px_#0a84ff]" />
                <div className="text-white text-[12px] font-semibold leading-tight drop-shadow-md">
                  <div>New Delhi</div>
                  <div className="text-[10px] text-white/80 font-normal">
                    {now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom: City Cards Grid */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {cities.map((city) => {
                  const cityTime = new Date(
                    now.toLocaleString("en-US", { timeZone: city.timeZone })
                  );
                  const hours = cityTime.getHours();
                  const minutes = cityTime.getMinutes();
                  const seconds = cityTime.getSeconds();
                  const hourAngle = (hours % 12) * 30 + minutes * 0.5;
                  const minuteAngle = minutes * 6;
                  const secondAngle = seconds * 6;

                  return (
                    <div
                      key={city.id}
                      className={`p-4 rounded-2xl flex flex-col items-center justify-between transition-all ${
                        isDark ? "bg-white/[0.07] border border-white/5" : "bg-white border border-black/8 shadow-xs"
                      }`}
                    >
                      {/* Analog Clock Face matching screenshot */}
                      <div className="relative w-28 h-28 rounded-full bg-white text-black shadow-inner flex items-center justify-center my-2">
                        {/* Numbers 1 to 12 */}
                        {[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((num, i) => {
                          const angle = i * 30 * (Math.PI / 180);
                          const radius = 42;
                          const x = Math.sin(angle) * radius;
                          const y = -Math.cos(angle) * radius;
                          return (
                            <span
                              key={num}
                              className="absolute text-[9px] font-bold text-neutral-800 select-none"
                              style={{ transform: `translate(${x}px, ${y}px)` }}
                            >
                              {num}
                            </span>
                          );
                        })}

                        {/* Hour Hand */}
                        <div
                          className="absolute w-[3px] h-[26px] bg-black rounded-full origin-bottom"
                          style={{
                            bottom: "50%",
                            left: "calc(50% - 1.5px)",
                            transform: `rotate(${hourAngle}deg)`,
                          }}
                        />

                        {/* Minute Hand */}
                        <div
                          className="absolute w-[2px] h-[34px] bg-black rounded-full origin-bottom"
                          style={{
                            bottom: "50%",
                            left: "calc(50% - 1px)",
                            transform: `rotate(${minuteAngle}deg)`,
                          }}
                        />

                        {/* Blue Second Hand */}
                        <div
                          className="absolute w-[1px] h-[38px] bg-[#0a84ff] rounded-full origin-bottom z-10"
                          style={{
                            bottom: "50%",
                            left: "calc(50% - 0.5px)",
                            transform: `rotate(${secondAngle}deg)`,
                          }}
                        />

                        {/* Center Pin */}
                        <div className="w-2 h-2 rounded-full bg-[#0a84ff] z-20" />
                      </div>

                      <div className="text-center mt-2">
                        <div className="text-[14px] font-semibold">{city.name}</div>
                        <div className="text-[11px] opacity-60">
                          Today, {city.offset} · {cityTime.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ----------------- 3. ALARMS ----------------- */}
        {activeTab === "Alarms" && (
          <div className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {alarms.map((alarm) => (
                <div
                  key={alarm.id}
                  className={`p-5 rounded-2xl flex flex-col justify-between min-h-[160px] transition-all ${
                    isDark ? "bg-white/[0.07] border border-white/5" : "bg-white border border-black/8 shadow-xs"
                  }`}
                >
                  <div>
                    {/* Time (3:00 AM) */}
                    <div className="flex items-baseline gap-1 font-light tracking-tight">
                      <span className="text-[34px] leading-none">{alarm.time}</span>
                      <span className="text-[18px] opacity-70 font-normal">{alarm.period}</span>
                    </div>

                    <div className="text-[12px] opacity-70 mt-2 font-medium">{alarm.title}</div>
                    <div className="text-[11px] opacity-50">
                      Repeat: {alarm.repeat}
                    </div>
                    <div className="text-[11px] opacity-50">
                      Sound: {alarm.sound}
                    </div>
                  </div>

                  {/* macOS / iOS Toggle Switch */}
                  <div className="mt-4">
                    <button
                      onClick={() => toggleAlarm(alarm.id)}
                      aria-label="Toggle Alarm"
                      className={`w-12 h-7 rounded-full p-0.5 transition-colors duration-200 flex items-center cursor-pointer ${
                        alarm.enabled
                          ? "bg-[#30d158]"
                          : isDark
                          ? "bg-[#3a3a3c]"
                          : "bg-neutral-300"
                      }`}
                    >
                      <div
                        className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                          alarm.enabled ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ----------------- 4. STOPWATCH ----------------- */}
        {activeTab === "Stopwatch" && (
          <div className="h-full flex flex-col justify-between py-8 px-6 max-w-2xl mx-auto">
            {/* Giant Stopwatch Readout: 00:00.00 */}
            <div className="flex flex-col items-center justify-center my-6">
              <div className="font-light tracking-tight text-[84px] md:text-[98px] leading-none tabular-nums font-sans">
                {formatStopwatch(swTime)}
              </div>
            </div>

            {/* Laps Table Header & List */}
            <div className="flex-1 min-h-[140px] max-h-[220px] overflow-y-auto px-2">
              <div className="grid grid-cols-3 text-[12px] font-medium opacity-50 border-b border-white/10 pb-2 mb-2">
                <span>Lap No.</span>
                <span className="text-center">Split</span>
                <span className="text-right">Total</span>
              </div>

              {laps.length === 0 ? (
                <div className="text-center py-6 text-[13px] opacity-40">
                  No laps recorded
                </div>
              ) : (
                <div className="space-y-1.5">
                  {laps.map((lap) => (
                    <div
                      key={lap.id}
                      className="grid grid-cols-3 text-[13px] tabular-nums py-1 border-b border-black/5 dark:border-white/5"
                    >
                      <span>Lap {lap.id}</span>
                      <span className="text-center opacity-80">{formatStopwatch(lap.split)}</span>
                      <span className="text-right font-medium">{formatStopwatch(lap.total)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Controls (Lap/Reset & Start/Stop) */}
            <div className="flex items-center justify-center gap-6 pt-6">
              <button
                onClick={handleSwLapOrReset}
                disabled={!swRunning && swTime === 0}
                className={`px-8 py-2 rounded-full text-[14px] font-medium transition-all active:scale-95 cursor-pointer ${
                  !swRunning && swTime === 0
                    ? "opacity-40 cursor-default bg-white/5"
                    : isDark
                    ? "bg-white/10 text-neutral-300 hover:bg-white/15"
                    : "bg-black/8 text-neutral-700 hover:bg-black/12"
                }`}
              >
                {swRunning ? "Lap" : "Reset"}
              </button>

              <button
                onClick={handleSwToggle}
                className={`px-9 py-2 rounded-full text-[14px] font-semibold text-white shadow-md transition-all active:scale-95 cursor-pointer ${
                  swRunning ? "bg-[#ff453a] hover:bg-[#ff3b30]" : "bg-[#30d158] hover:bg-[#34c759]"
                }`}
              >
                {swRunning ? "Stop" : "Start"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal for Adding Alarm */}
      {showAddAlarm && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className={`w-[320px] p-6 rounded-2xl shadow-2xl border ${
              isDark ? "bg-[#252528] border-white/10 text-white" : "bg-white border-black/10 text-neutral-900"
            }`}
          >
            <h3 className="text-[16px] font-bold mb-4">Add Alarm</h3>
            <label className="text-[12px] opacity-70 block mb-1">Time</label>
            <input
              type="time"
              value={newAlarmTime}
              onChange={(e) => setNewAlarmTime(e.target.value)}
              className={`w-full p-2.5 rounded-xl border text-[14px] mb-6 outline-none ${
                isDark ? "bg-white/10 border-white/10 text-white" : "bg-neutral-100 border-black/10"
              }`}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddAlarm(false)}
                className="px-4 py-1.5 rounded-full text-[13px] hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAlarm}
                className="px-5 py-1.5 rounded-full text-[13px] font-semibold bg-[#0a84ff] text-white hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for Adding City */}
      {showAddCity && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div
            className={`w-[340px] p-6 rounded-2xl shadow-2xl border ${
              isDark ? "bg-[#252528] border-white/10 text-white" : "bg-white border-black/10 text-neutral-900"
            }`}
          >
            <h3 className="text-[16px] font-bold mb-3">Choose a City</h3>
            <div className="space-y-1 max-h-[220px] overflow-y-auto mb-4">
              {[
                { name: "Paris", country: "France", timeZone: "Europe/Paris", offset: "-4.5HRS" },
                { name: "Sydney", country: "Australia", timeZone: "Australia/Sydney", offset: "+5.5HRS" },
                { name: "Dubai", country: "United Arab Emirates", timeZone: "Asia/Dubai", offset: "-1.5HRS" },
                { name: "Singapore", country: "Singapore", timeZone: "Asia/Singapore", offset: "+2.5HRS" },
                { name: "San Francisco", country: "United States", timeZone: "America/Los_Angeles", offset: "-13.5HRS" },
              ].map((c) => (
                <button
                  key={c.name}
                  onClick={() => {
                    setCities((prev) => [
                      ...prev,
                      { id: c.name.toLowerCase(), name: c.name, country: c.country, timeZone: c.timeZone, offset: c.offset },
                    ]);
                    setShowAddCity(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-[13px] hover:bg-[#0a84ff] hover:text-white flex justify-between"
                >
                  <span className="font-medium">{c.name}</span>
                  <span className="opacity-60">{c.country}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-end">
              <button
                onClick={() => setShowAddCity(false)}
                className="px-4 py-1.5 rounded-full text-[13px] hover:bg-white/10"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClockApp;

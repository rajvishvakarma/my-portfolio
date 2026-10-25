'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Video, VideoOff, Mic, MicOff, PhoneOff, Phone, Users, Plus, Shield } from 'lucide-react';
import { useDesktopStore } from '@/stores/useDesktopStore';

const CONTACTS = [
  { id: 'raj', name: 'Raj Vishvakarma', email: 'rajvishvakarma@example.com', avatar: '/img/ui/avatar.jpg' },
  { id: 'ashley', name: 'Ashley Cooper', email: 'ashley@example.com', avatar: '/icons/PngItem_4082636.png' },
  { id: 'dawn', name: 'Dawn Martinez', email: 'dawn@example.com', avatar: '/icons/PngItem_4409921.png' },
  { id: 'rico', name: 'Rico Team', email: 'rico@example.com', avatar: '/icons/PngItem_4608119.png' },
];

export const FaceTimeApp: React.FC = () => {
  const { theme, addNotification } = useDesktopStore();
  const isDarkMode = theme === 'dark';

  const [activeCall, setActiveCall] = useState<string | null>(null);
  const [micMuted, setMicMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Bind local webcam or fallback
  useEffect(() => {
    let stream: MediaStream | null = null;
    navigator.mediaDevices
      ?.getUserMedia({ video: true, audio: false })
      .then((s) => {
        stream = s;
        if (videoRef.current) videoRef.current.srcObject = s;
      })
      .catch(() => {});

    return () => {
      stream?.getTracks().forEach((t) => t.stop());
    };
  }, [activeCall]);

  useEffect(() => {
    if (!activeCall) {
      setCallDuration(0);
      return;
    }
    const timer = setInterval(() => setCallDuration((d) => d + 1), 1000);
    return () => clearInterval(timer);
  }, [activeCall]);

  const formatDuration = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const s = sec % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const startCall = (name: string) => {
    setActiveCall(name);
    addNotification('FaceTime', `FaceTime call connected with ${name}`);
  };

  const endCall = () => {
    setActiveCall(null);
    addNotification('FaceTime', 'Call ended');
  };

  return (
    <div
      className={`h-full flex flex-col select-none ${
        isDarkMode ? 'bg-[#18181b] text-white' : 'bg-neutral-900 text-white'
      }`}
    >
      {activeCall ? (
        // Active Call Video Screen
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden">
          {cameraOff ? (
            <div className="flex flex-col items-center justify-center gap-3">
              <div className="w-24 h-24 rounded-full bg-emerald-600 flex items-center justify-center text-3xl font-bold shadow-2xl">
                {activeCall[0]}
              </div>
              <h3 className="text-xl font-bold">{activeCall}</h3>
              <span className="text-sm text-emerald-400 font-mono">
                {formatDuration(callDuration)}
              </span>
            </div>
          ) : (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover transform -scale-x-100"
            />
          )}

          {/* Floating Caller Badge */}
          <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-2 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold">{activeCall}</span>
            <span className="text-xs text-white/70 font-mono">
              {formatDuration(callDuration)}
            </span>
          </div>

          {/* Bottom Floating Control Bar */}
          <div className="absolute bottom-6 inset-x-0 flex justify-center items-center gap-4 z-20">
            <button
              onClick={() => setMicMuted(!micMuted)}
              className={`p-3 rounded-full backdrop-blur-md border transition-all ${
                micMuted
                  ? 'bg-red-500/80 border-red-400 text-white'
                  : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
              }`}
              title={micMuted ? 'Unmute' : 'Mute'}
            >
              {micMuted ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            <button
              onClick={() => setCameraOff(!cameraOff)}
              className={`p-3 rounded-full backdrop-blur-md border transition-all ${
                cameraOff
                  ? 'bg-red-500/80 border-red-400 text-white'
                  : 'bg-white/20 border-white/30 text-white hover:bg-white/30'
              }`}
              title={cameraOff ? 'Turn on Camera' : 'Turn off Camera'}
            >
              {cameraOff ? <VideoOff size={20} /> : <Video size={20} />}
            </button>
            <button
              onClick={endCall}
              className="p-3.5 rounded-full bg-red-600 text-white shadow-lg hover:bg-red-700 transition active:scale-95"
              title="End Call"
            >
              <PhoneOff size={22} />
            </button>
          </div>
        </div>
      ) : (
        // FaceTime Home & Contact List
        <div className="flex h-full">
          {/* Left Sidebar */}
          <div
            className={`w-72 shrink-0 flex flex-col border-r transition-colors ${
              isDarkMode ? 'bg-[#222225] border-white/10' : 'bg-[#f4f5f7] border-black/10 text-neutral-900'
            }`}
          >
            <div className="p-3 border-b border-white/10 flex items-center justify-between">
              <span className="font-bold text-sm">FaceTime</span>
              <button
                onClick={() => startCall('Raj Vishvakarma')}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-500 transition"
              >
                <Plus size={14} /> New FaceTime
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              <span className="px-2 py-1 block text-[10px] font-bold uppercase tracking-wider opacity-50">
                Recent Contacts
              </span>
              {CONTACTS.map((c) => (
                <div
                  key={c.id}
                  className={`flex items-center justify-between p-2.5 rounded-xl transition-colors ${
                    isDarkMode ? 'hover:bg-white/10' : 'hover:bg-black/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="w-9 h-9 rounded-full object-cover p-0.5 border border-white/20 bg-white/20 shrink-0"
                    />
                    <div className="min-w-0">
                      <strong className="block text-xs font-semibold truncate">{c.name}</strong>
                      <span className="block text-[10px] opacity-60 truncate">{c.email}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => startCall(c.name)}
                    className="p-2 rounded-full bg-emerald-600/20 text-emerald-500 hover:bg-emerald-600 hover:text-white transition"
                    title={`Call ${c.name}`}
                  >
                    <Video size={15} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Right Live Camera Preview */}
          <div className="flex-1 relative bg-black flex items-center justify-center">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="w-full h-full object-cover transform -scale-x-100 opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
            <div className="absolute bottom-6 flex flex-col items-center gap-2 text-center z-10">
              <h2 className="text-xl font-bold tracking-tight">Ready to FaceTime?</h2>
              <p className="text-xs text-white/70 max-w-sm">
                Select a contact on the left to start a real-time interactive video session.
              </p>
              <button
                onClick={() => startCall('Raj Vishvakarma')}
                className="mt-2 px-6 py-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition shadow-lg flex items-center gap-2"
              >
                <Video size={15} /> Call Raj Vishvakarma
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

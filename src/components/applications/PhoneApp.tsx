'use client';

import React, { useState, useEffect } from 'react';
import {
  Phone as PhoneIcon,
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  User,
  Clock,
  Grid,
  Search,
  Delete,
  Video,
  MessageSquare,
  Voicemail,
  ChevronRight,
  Info,
} from 'lucide-react';
import { useDesktopStore } from '@/stores/useDesktopStore';

interface CallRecord {
  id: string;
  name: string;
  number: string;
  type: 'incoming' | 'outgoing' | 'missed';
  time: string;
  avatar?: string;
}

const mockRecents: CallRecord[] = [
  {
    id: '1',
    name: 'Antonio Manriquez',
    number: '(919) 555-0192',
    type: 'incoming',
    time: '10:42 AM',
    avatar: '/icons/PngItem_6452863.png',
  },
  {
    id: '2',
    name: 'Magico Martinez',
    number: '(919) 555-0143',
    type: 'missed',
    time: 'Yesterday',
    avatar: '/icons/PngItem_5031003.png',
  },
  {
    id: '3',
    name: 'Graham Kaufman',
    number: '(919) 555-0118',
    type: 'outgoing',
    time: 'Thursday',
    avatar: '/icons/PngItem_4608119.png',
  },
  {
    id: '4',
    name: 'Fauzia Farooqui',
    number: '(919) 555-0164',
    type: 'incoming',
    time: 'Wednesday',
    avatar: '/icons/PngItem_4409921.png',
  },
  {
    id: '5',
    name: 'Raj Vishvakarma',
    number: '+91 98765 43210',
    type: 'outgoing',
    time: 'Tuesday',
    avatar: '/icons/Hello16MacBookProBlk.png',
  },
];

const keypadButtons = [
  { num: '1', letters: '' },
  { num: '2', letters: 'ABC' },
  { num: '3', letters: 'DEF' },
  { num: '4', letters: 'GHI' },
  { num: '5', letters: 'JKL' },
  { num: '6', letters: 'MNO' },
  { num: '7', letters: 'PQRS' },
  { num: '8', letters: 'TUV' },
  { num: '9', letters: 'WXYZ' },
  { num: '*', letters: '' },
  { num: '0', letters: '+' },
  { num: '#', letters: '' },
];

export function PhoneApp() {
  const [activeTab, setActiveTab] = useState<'keypad' | 'recents' | 'contacts'>('keypad');
  const [dialedNumber, setDialedNumber] = useState('');
  const [inCall, setInCall] = useState(false);
  const [callContact, setCallContact] = useState<{ name: string; number: string; avatar?: string } | null>(null);
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(false);

  const { openApp } = useDesktopStore();

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (inCall) {
      timer = setInterval(() => {
        setCallDuration((d) => d + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(timer);
  }, [inCall]);

  const handleKeyPress = (val: string) => {
    if (dialedNumber.length < 15) {
      setDialedNumber((prev) => prev + val);
    }
  };

  const handleBackspace = () => {
    setDialedNumber((prev) => prev.slice(0, -1));
  };

  const startCall = (name: string, number: string, avatar?: string) => {
    setCallContact({ name, number, avatar });
    setInCall(true);
  };

  const endCall = () => {
    setInCall(false);
    setCallContact(null);
  };

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#f5f5f7] dark:bg-[#1c1c1e] text-slate-800 dark:text-slate-100 select-none overflow-hidden font-[-apple-system,BlinkMacSystemFont,sans-serif]">
      {/* Active Call Overlay Screen */}
      {inCall ? (
        <div className="w-full h-full flex flex-col justify-between items-center py-10 px-6 bg-gradient-to-b from-[#2c2c2e] to-[#1c1c1e] text-white">
          <div className="flex flex-col items-center mt-6 space-y-2">
            {callContact?.avatar ? (
              <img
                src={callContact.avatar}
                alt={callContact.name}
                className="w-24 h-24 rounded-full object-cover shadow-2xl border-2 border-white/20"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-3xl font-light">
                {callContact?.name?.[0] || 'P'}
              </div>
            )}
            <h2 className="text-xl font-bold tracking-tight mt-3">
              {callContact?.name || dialedNumber || 'Unknown'}
            </h2>
            <p className="text-xs text-white/60">
              {callDuration > 0 ? formatTimer(callDuration) : 'Calling...'}
            </p>
          </div>

          {/* Call In-progress Controls */}
          <div className="grid grid-cols-3 gap-6 max-w-xs w-full">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className={`p-4 rounded-full flex flex-col items-center justify-center gap-1.5 transition-all ${
                isMuted ? 'bg-white text-black' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              <span className="text-[10px]">{isMuted ? 'Muted' : 'Mute'}</span>
            </button>

            <button
              onClick={() => setIsSpeaker(!isSpeaker)}
              className={`p-4 rounded-full flex flex-col items-center justify-center gap-1.5 transition-all ${
                isSpeaker ? 'bg-white text-black' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              {isSpeaker ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
              <span className="text-[10px]">Speaker</span>
            </button>

            <button
              onClick={() => {
                endCall();
                openApp('facetime');
              }}
              className="p-4 rounded-full bg-white/10 hover:bg-white/20 flex flex-col items-center justify-center gap-1.5 transition-all text-white"
            >
              <Video className="w-6 h-6" />
              <span className="text-[10px]">FaceTime</span>
            </button>
          </div>

          {/* End Call Button */}
          <button
            onClick={endCall}
            className="w-16 h-16 rounded-full bg-red-600 hover:bg-red-700 flex items-center justify-center text-white shadow-lg active:scale-95 transition-all"
            title="End Call"
          >
            <PhoneOff className="w-8 h-8" />
          </button>
        </div>
      ) : (
        <>
          {/* Top Segmented Navigation */}
          <div className="px-4 pt-3 pb-2 border-b border-black/10 dark:border-white/10 flex justify-center bg-white/70 dark:bg-[#252526]/80 backdrop-blur-xl">
            <div className="flex bg-black/5 dark:bg-white/10 p-1 rounded-lg text-xs font-medium">
              <button
                onClick={() => setActiveTab('keypad')}
                className={`px-4 py-1 rounded-md transition-all ${
                  activeTab === 'keypad'
                    ? 'bg-white dark:bg-black/40 text-black dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Keypad
              </button>
              <button
                onClick={() => setActiveTab('recents')}
                className={`px-4 py-1 rounded-md transition-all ${
                  activeTab === 'recents'
                    ? 'bg-white dark:bg-black/40 text-black dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Recents
              </button>
              <button
                onClick={() => setActiveTab('contacts')}
                className={`px-4 py-1 rounded-md transition-all ${
                  activeTab === 'contacts'
                    ? 'bg-white dark:bg-black/40 text-black dark:text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Contacts
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto flex flex-col justify-center items-center p-4">
            {activeTab === 'keypad' && (
              <div className="w-full max-w-[280px] flex flex-col items-center">
                {/* Number Display */}
                <div className="h-14 flex items-center justify-center w-full relative mb-3">
                  <span className="text-2xl font-semibold tracking-wide text-center">
                    {dialedNumber || '\u00A0'}
                  </span>
                  {dialedNumber && (
                    <button
                      onClick={handleBackspace}
                      className="absolute right-0 p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                      <Delete className="w-5 h-5" />
                    </button>
                  )}
                </div>

                {/* Keypad Grid */}
                <div className="grid grid-cols-3 gap-3 w-full">
                  {keypadButtons.map((btn) => (
                    <button
                      key={btn.num}
                      onClick={() => handleKeyPress(btn.num)}
                      className="w-16 h-16 mx-auto rounded-full bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/20 active:scale-95 transition-all flex flex-col items-center justify-center"
                    >
                      <span className="text-xl font-normal leading-tight">{btn.num}</span>
                      {btn.letters && (
                        <span className="text-[9px] font-semibold text-slate-400 tracking-wider">
                          {btn.letters}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Call Button */}
                <div className="mt-5">
                  <button
                    onClick={() => {
                      if (dialedNumber) {
                        startCall(dialedNumber, dialedNumber);
                      }
                    }}
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-white shadow-md active:scale-95 transition-all ${
                      dialedNumber
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-green-500/50 cursor-not-allowed'
                    }`}
                  >
                    <PhoneCall className="w-7 h-7" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'recents' && (
              <div className="w-full h-full max-w-md divide-y divide-black/5 dark:divide-white/5">
                {mockRecents.map((r) => (
                  <div
                    key={r.id}
                    className="py-3 px-2 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 rounded-xl cursor-pointer transition-colors"
                    onClick={() => startCall(r.name, r.number, r.avatar)}
                  >
                    <div className="flex items-center gap-3">
                      <PhoneIcon
                        className={`w-4 h-4 shrink-0 ${
                          r.type === 'missed' ? 'text-red-500' : 'text-slate-400'
                        }`}
                      />
                      <div>
                        <div
                          className={`text-sm font-medium ${
                            r.type === 'missed' ? 'text-red-500 font-semibold' : ''
                          }`}
                        >
                          {r.name}
                        </div>
                        <div className="text-xs text-slate-400">{r.number}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400">{r.time}</span>
                      <Info className="w-4 h-4 text-blue-500" />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'contacts' && (
              <div className="w-full h-full max-w-md divide-y divide-black/5 dark:divide-white/5">
                {mockRecents.map((r) => (
                  <div
                    key={r.id}
                    className="py-2.5 px-2 flex items-center justify-between hover:bg-black/5 dark:hover:bg-white/5 rounded-xl cursor-pointer transition-colors"
                    onClick={() => startCall(r.name, r.number, r.avatar)}
                  >
                    <div className="flex items-center gap-3">
                      {r.avatar ? (
                        <img
                          src={r.avatar}
                          alt={r.name}
                          className="w-8 h-8 rounded-full object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center text-xs font-semibold">
                          {r.name[0]}
                        </div>
                      )}
                      <div>
                        <div className="text-xs font-semibold">{r.name}</div>
                        <div className="text-[11px] text-slate-400">{r.number}</div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        startCall(r.name, r.number, r.avatar);
                      }}
                      className="p-2 rounded-full bg-green-500/10 hover:bg-green-500/20 text-green-500"
                    >
                      <PhoneIcon className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

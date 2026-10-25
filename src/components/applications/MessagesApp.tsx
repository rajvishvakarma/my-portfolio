'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, Video, SquarePen, Smile, Send, ChevronRight } from 'lucide-react';
import { useDesktopStore } from '@/stores/useDesktopStore';

interface Message {
  id: number;
  sender: string;
  text: string;
  time: string;
  isMe?: boolean;
}

interface Conversation {
  id: string;
  name: string;
  avatar: string;
  isImage?: boolean;
  date: string;
  messages: Message[];
}

export const MessagesApp: React.FC = () => {
  const { theme, addNotification } = useDesktopStore();
  const isDarkMode = theme === 'dark';

  const [activeChatId, setActiveChatId] = useState('ashley');
  const [searchQuery, setSearchQuery] = useState('');
  const [inputVal, setInputVal] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const pinnedContacts = [
    { id: 'ashley', name: 'Ashley', avatar: '/icons/PngItem_4082636.png', unread: true },
    { id: 'dawn', name: 'Dawn', avatar: '/icons/PngItem_4409921.png', unread: false },
    { id: 'rico', name: 'Rico Family', avatar: '/icons/PngItem_4608119.png', unread: true },
    { id: 'olivia', name: 'Olivia', avatar: '/icons/PngItem_5031003.png', unread: false },
    { id: 'will', name: 'Will', avatar: '/icons/PngItem_6304991.png', unread: false },
  ];

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: 'ashley',
      name: 'Ashley',
      avatar: '/icons/PngItem_4082636.png',
      date: '10:42 AM',
      messages: [
        { id: 1, sender: 'Ashley', text: 'Hey Raj! Loved checking out your new macOS portfolio website!', time: '10:30 AM' },
        { id: 2, sender: 'Me', text: 'Thank you Ashley! Built with Next.js, React 19, and authentic liquid glass UI.', time: '10:35 AM', isMe: true },
        { id: 3, sender: 'Ashley', text: 'The Control Center and Safari browser look so sleek! Are all apps interactive?', time: '10:42 AM' },
      ],
    },
    {
      id: 'dawn',
      name: 'Dawn',
      avatar: '/icons/PngItem_4409921.png',
      date: 'Yesterday',
      messages: [
        { id: 1, sender: 'Dawn', text: 'Can we schedule a call regarding the full-stack engineering role?', time: 'Yesterday 3:15 PM' },
        { id: 2, sender: 'Me', text: 'Definitely! Feel free to email me or use the FaceTime/Mail app here.', time: 'Yesterday 3:20 PM', isMe: true },
      ],
    },
    {
      id: 'rico',
      name: 'Rico Family',
      avatar: '/icons/PngItem_4608119.png',
      date: 'Sunday',
      messages: [
        { id: 1, sender: 'Rico', text: 'Hey, are you free for family game night this weekend?', time: 'Sunday 12:00 PM' },
        { id: 2, sender: 'Me', text: 'Count me in! Bringing the board games.', time: 'Sunday 12:05 PM', isMe: true },
      ],
    },
    {
      id: 'olivia',
      name: 'Olivia',
      avatar: '/icons/PngItem_5031003.png',
      date: 'Saturday',
      messages: [
        { id: 1, sender: 'Olivia', text: 'Great job on the AI robotics autonomous rover project!', time: 'Saturday 2:10 PM' },
      ],
    },
    {
      id: 'will',
      name: 'Will',
      avatar: '/icons/PngItem_6304991.png',
      date: 'Oct 20',
      messages: [
        { id: 1, sender: 'Will', text: 'Check out the new Spotify playlist when you have time.', time: 'Oct 20' },
      ],
    },
  ]);

  const activeChat = conversations.find((c) => c.id === activeChatId) || conversations[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeChat?.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const newMsg: Message = {
      id: Date.now(),
      sender: 'Me',
      text: inputVal.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeChatId ? { ...c, messages: [...c.messages, newMsg] } : c
      )
    );
    const sentText = inputVal.trim();
    setInputVal('');

    // Simulated reply
    setTimeout(() => {
      const replyMsg: Message = {
        id: Date.now() + 1,
        sender: activeChat.name,
        text: `Got your message: "${sentText}". Looks awesome! ✨`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeChatId ? { ...c, messages: [...c.messages, replyMsg] } : c
        )
      );
      addNotification(`New Message from ${activeChat.name}`, replyMsg.text);
    }, 1200);
  };

  const filteredConversations = conversations.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.messages.some((m) => m.text.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div
      className={`h-full flex select-none ${
        isDarkMode ? 'bg-[#1e1e1e] text-white' : 'bg-white text-neutral-900'
      }`}
    >
      {/* Left Sidebar: Search, Pinned, Conversations */}
      <div
        className={`w-72 shrink-0 flex flex-col border-r transition-colors ${
          isDarkMode ? 'bg-[#252528] border-white/10' : 'bg-[#f4f5f7] border-black/10'
        }`}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-3 py-2.5">
          <span className="font-semibold text-sm">Messages</span>
          <button
            onClick={() => addNotification('Messages', 'Start a new conversation')}
            className="p-1 rounded-md hover:bg-white/10"
            title="Compose new message"
          >
            <SquarePen size={16} />
          </button>
        </div>

        {/* Search */}
        <div className="px-3 pb-2">
          <div
            className={`flex items-center gap-2 rounded-lg px-2.5 py-1 text-xs border ${
              isDarkMode
                ? 'bg-white/10 border-white/10 text-white'
                : 'bg-black/5 border-black/10 text-neutral-900'
            }`}
          >
            <Search size={14} className="opacity-50" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent outline-none placeholder:text-neutral-400"
            />
          </div>
        </div>

        {/* Pinned Contacts */}
        <div className="px-3 py-2 flex items-center justify-between border-b border-white/10">
          {pinnedContacts.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveChatId(c.id)}
              className={`flex flex-col items-center gap-1 group transition-transform ${
                activeChatId === c.id ? 'scale-105' : 'hover:scale-105'
              }`}
            >
              <div className="relative">
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="w-10 h-10 rounded-full object-cover shadow-sm bg-white/20 p-0.5 border border-white/20"
                />
                {c.unread && (
                  <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-[#252528]" />
                )}
              </div>
              <span className="text-[10px] font-medium truncate w-12 text-center">
                {c.name}
              </span>
            </button>
          ))}
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto divide-y divide-white/5">
          {filteredConversations.map((c) => {
            const lastMsg = c.messages[c.messages.length - 1];
            return (
              <button
                key={c.id}
                onClick={() => setActiveChatId(c.id)}
                className={`w-full flex items-center gap-3 p-3 text-left transition-colors ${
                  activeChatId === c.id
                    ? isDarkMode
                      ? 'bg-blue-600/30'
                      : 'bg-blue-50'
                    : isDarkMode
                    ? 'hover:bg-white/5'
                    : 'hover:bg-black/5'
                }`}
              >
                <img
                  src={c.avatar}
                  alt={c.name}
                  className="w-10 h-10 rounded-full object-cover shrink-0 bg-white/20 p-0.5 border border-white/15"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-xs font-semibold truncate">{c.name}</strong>
                    <span className="text-[10px] opacity-50 shrink-0">{c.date}</span>
                  </div>
                  <p className="text-[11px] opacity-70 truncate mt-0.5">
                    {lastMsg?.text || 'No messages'}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Pane: Active Chat Room */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div
          className={`h-12 px-4 flex items-center justify-between border-b transition-colors ${
            isDarkMode ? 'bg-[#202022] border-white/10' : 'bg-[#fbfbfb] border-black/10'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <img
              src={activeChat.avatar}
              alt={activeChat.name}
              className="w-7 h-7 rounded-full object-cover bg-white/20 p-0.5 border border-white/20"
            />
            <div>
              <h4 className="text-xs font-bold leading-tight">{activeChat.name}</h4>
              <span className="text-[10px] text-emerald-500 font-medium">iMessage · Active</span>
            </div>
          </div>
          <button
            onClick={() => addNotification('FaceTime', `Calling ${activeChat.name}…`)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-emerald-500 transition-colors"
            title="Start FaceTime Video Call"
          >
            <Video size={17} />
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {activeChat.messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.isMe ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-[70%] px-3.5 py-2 rounded-2xl text-[13px] leading-relaxed shadow-sm ${
                  m.isMe
                    ? 'bg-[#007aff] text-white rounded-br-sm'
                    : isDarkMode
                    ? 'bg-[#323236] text-white rounded-bl-sm'
                    : 'bg-[#e9e9eb] text-neutral-900 rounded-bl-sm'
                }`}
              >
                {m.text}
              </div>
              <span className="text-[9px] opacity-40 px-1 mt-0.5">{m.time}</span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input Form */}
        <form
          onSubmit={handleSendMessage}
          className={`p-3 border-t flex items-center gap-2 ${
            isDarkMode ? 'bg-[#202022] border-white/10' : 'bg-[#fbfbfb] border-black/10'
          }`}
        >
          <div
            className={`flex-1 flex items-center gap-2 rounded-full px-3.5 py-1.5 border ${
              isDarkMode
                ? 'bg-[#1a1a1c] border-white/15 focus-within:border-blue-500'
                : 'bg-white border-black/15 focus-within:border-blue-500'
            }`}
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={`iMessage to ${activeChat.name}`}
              className="w-full bg-transparent outline-none text-xs"
            />
          </div>
          <button
            type="submit"
            disabled={!inputVal.trim()}
            className="w-8 h-8 rounded-full bg-[#007aff] text-white flex items-center justify-center hover:bg-blue-600 transition disabled:opacity-40"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
};

'use client';

import React, { useState } from 'react';
import {
  Inbox,
  Send,
  FileText,
  Trash2,
  Archive,
  SquarePen,
  Reply,
  ReplyAll,
  Forward,
  Search,
  Paperclip,
  X,
  ChevronLeft,
  Mail as MailIcon,
} from 'lucide-react';
import { useDesktopStore } from '@/stores/useDesktopStore';
import { profile } from '@/data/profile';

interface Email {
  id: number;
  sender: string;
  email: string;
  avatar: string;
  subject: string;
  date: string;
  excerpt: string;
  body: string;
  unread?: boolean;
}

const INITIAL_EMAILS: Email[] = [
  {
    id: 1,
    sender: 'Tech Talent Partners',
    email: 'recruiting@techtalent.io',
    avatar: '/icons/PngItem_5031003.png',
    subject: 'Opportunity: Senior Full-Stack Engineer / AI Specialist',
    date: 'Today 10:15 AM',
    excerpt: 'Hi Raj, We came across your macOS web portfolio and robotics work. Your Next.js and AI background is a great fit…',
    body: `Hi Raj,\n\nWe came across your portfolio and were really impressed by your projects, especially the robotics autonomous navigation system and full-stack engineering builds.\n\nWe would love to schedule a quick 20-minute introductory call to discuss our engineering opening and see if this aligns with your career goals.\n\nLooking forward to hearing from you!\n\nBest regards,\nTech Talent Partners Team`,
    unread: true,
  },
  {
    id: 2,
    sender: 'GitHub Notifications',
    email: 'notifications@github.com',
    avatar: '/icons/PngItem_4082636.png',
    subject: '[GitHub] Your repository starred by 12 developers',
    date: 'Yesterday',
    excerpt: 'Your repository rajvishvakarma088-star/macos-portfolio received new stars and forks this week…',
    body: `Hello Raj,\n\nGreat news! Your project repository has gained 12 new stars and 4 forks over the past 48 hours.\n\nKeep up the great open source work!\n\n- The GitHub Team`,
    unread: false,
  },
  {
    id: 3,
    sender: 'Spotify Developers',
    email: 'dev@spotify.com',
    avatar: '/icons/PngItem_4608119.png',
    subject: 'Welcome to Spotify Web API Integration',
    date: 'Oct 22',
    excerpt: 'Your application credentials have been validated. You can now stream playback and query track metadata…',
    body: `Hi Raj,\n\nYour Spotify Web API credentials are confirmed and ready for audio integration.\n\nHappy coding!\n\nSpotify Developer Platform`,
    unread: false,
  },
];

export const MailApp: React.FC = () => {
  const { theme, addNotification, isMobile } = useDesktopStore();
  const isDarkMode = theme === 'dark';

  const [emails, setEmails] = useState<Email[]>(INITIAL_EMAILS);
  const [selectedEmailId, setSelectedEmailId] = useState<number>(1);
  const [activeMailbox, setActiveMailbox] = useState<'inbox' | 'sent' | 'drafts' | 'trash'>('inbox');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCompose, setShowCompose] = useState(false);
  const [composeTo, setComposeTo] = useState(profile.email);
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');
  const [mobileShowReader, setMobileShowReader] = useState(false);

  const selectedEmail = emails.find((e) => e.id === selectedEmailId) || emails[0];

  const handleSendCompose = (e: React.FormEvent) => {
    e.preventDefault();
    if (!composeTo.trim()) return;

    const newEmail: Email = {
      id: Date.now(),
      sender: 'Me',
      email: 'me@raj-portfolio.dev',
      avatar: '/icons/PngItem_6452863.png',
      subject: composeSubject || 'No Subject',
      date: 'Just now',
      excerpt: composeBody.slice(0, 60) + '…',
      body: composeBody,
      unread: false,
    };

    setEmails([newEmail, ...emails]);
    setShowCompose(false);
    setComposeSubject('');
    setComposeBody('');
    addNotification('Mail Sent', `Sent "${newEmail.subject}" to ${composeTo}`);
  };

  const deleteCurrentEmail = () => {
    if (!selectedEmail) return;
    setEmails((prev) => prev.filter((e) => e.id !== selectedEmail.id));
    addNotification('Mail', 'Email moved to Trash');
  };

  return (
    <div
      className={`h-full flex select-none ${
        isDarkMode ? 'bg-[#1e1e1e] text-white' : 'bg-white text-neutral-900'
      }`}
    >
      {/* Column 1: Mailboxes */}
      {!isMobile && (
        <div
          className={`w-52 shrink-0 flex flex-col border-r transition-colors ${
            isDarkMode ? 'bg-[#222225] border-white/10' : 'bg-[#f4f5f7] border-black/10'
          }`}
        >
          <div className="p-3 border-b border-white/10 flex items-center justify-between">
            <span className="font-bold text-xs uppercase tracking-wider opacity-60">Mailboxes</span>
            <button
              onClick={() => setShowCompose(true)}
              className="p-1 rounded-md hover:bg-white/10"
              title="Compose New Message"
            >
              <SquarePen size={15} />
            </button>
          </div>

          <nav className="p-2 space-y-0.5 text-xs font-medium">
            <button
              onClick={() => setActiveMailbox('inbox')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors ${
                activeMailbox === 'inbox' ? 'bg-blue-600 text-white' : 'hover:bg-white/10'
              }`}
            >
              <span className="flex items-center gap-2">
                <Inbox size={15} /> Inbox
              </span>
              <span className="text-[10px] font-bold opacity-75">{emails.length}</span>
            </button>
            <button
              onClick={() => setActiveMailbox('sent')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors ${
                activeMailbox === 'sent' ? 'bg-blue-600 text-white' : 'hover:bg-white/10'
              }`}
            >
              <span className="flex items-center gap-2">
                <Send size={15} /> Sent
              </span>
            </button>
            <button
              onClick={() => setActiveMailbox('drafts')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors ${
                activeMailbox === 'drafts' ? 'bg-blue-600 text-white' : 'hover:bg-white/10'
              }`}
            >
              <span className="flex items-center gap-2">
                <FileText size={15} /> Drafts
              </span>
            </button>
            <button
              onClick={() => setActiveMailbox('trash')}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition-colors ${
                activeMailbox === 'trash' ? 'bg-blue-600 text-white' : 'hover:bg-white/10'
              }`}
            >
              <span className="flex items-center gap-2">
                <Trash2 size={15} /> Trash
              </span>
            </button>
          </nav>
        </div>
      )}

      {/* Column 2: Email List */}
      {(!isMobile || !mobileShowReader) && (
        <div
          className={`${isMobile ? 'w-full' : 'w-72'} shrink-0 flex flex-col border-r transition-colors ${
            isDarkMode ? 'bg-[#1a1a1c] border-white/10' : 'bg-white border-black/10'
          }`}
        >
          {isMobile && (
            <div className="p-3 border-b border-white/10 flex items-center justify-between">
              <span className="font-bold text-xs uppercase tracking-wider opacity-60">All Inboxes</span>
              <button
                onClick={() => setShowCompose(true)}
                className="p-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 text-xs flex items-center gap-1 font-semibold"
                title="Compose New Message"
              >
                <SquarePen size={14} /> Compose
              </button>
            </div>
          )}
          <div className="p-2 border-b border-white/10">
            <div
              className={`flex items-center gap-2 rounded-lg px-2.5 py-1 text-xs border ${
                isDarkMode ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
              }`}
            >
              <Search size={13} className="opacity-40" />
              <input
                type="text"
                placeholder="Search Emails"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-white/5">
            {emails
              .filter(
                (e) =>
                  e.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  e.sender.toLowerCase().includes(searchQuery.toLowerCase())
              )
              .map((email) => (
                <button
                  key={email.id}
                  onClick={() => {
                    setSelectedEmailId(email.id);
                    if (isMobile) setMobileShowReader(true);
                  }}
                  className={`w-full p-3 text-left transition-colors flex flex-col gap-1 ${
                    selectedEmailId === email.id
                      ? isDarkMode
                        ? 'bg-blue-600/30'
                        : 'bg-blue-50'
                      : isDarkMode
                      ? 'hover:bg-white/5'
                      : 'hover:bg-black/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold truncate flex items-center gap-1.5">
                      {email.unread && (
                        <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                      )}
                      {email.sender}
                    </span>
                    <span className="text-[10px] opacity-50 shrink-0">{email.date}</span>
                  </div>
                  <h5 className="text-xs font-semibold truncate leading-tight">{email.subject}</h5>
                  <p className="text-[11px] opacity-60 line-clamp-2 leading-relaxed">
                    {email.excerpt}
                  </p>
                </button>
              ))}
          </div>
        </div>
      )}

      {/* Column 3: Email Reader Pane */}
      {(!isMobile || mobileShowReader) && (
        <div className="flex-1 flex flex-col min-w-0 w-full h-full">
          {selectedEmail ? (
            <>
              {/* Reader Toolbar */}
              <div
                className={`h-11 px-4 flex items-center justify-between border-b ${
                  isDarkMode ? 'border-white/10 bg-[#252528]' : 'border-black/10 bg-[#fafafa]'
                }`}
              >
                <div className="flex items-center gap-2">
                  {isMobile && (
                    <button
                      onClick={() => setMobileShowReader(false)}
                      className="flex items-center gap-1 text-xs font-semibold text-blue-500 hover:text-blue-600 transition-colors py-1 px-2 -ml-2 rounded-lg"
                    >
                      <ChevronLeft size={16} />
                      <span>Inbox</span>
                    </button>
                  )}
                  <button
                    onClick={() => setShowCompose(true)}
                    className="p-1.5 rounded-lg hover:bg-white/10 text-xs flex items-center gap-1"
                    title="Reply"
                  >
                    <Reply size={15} /> Reply
                  </button>
                  <button
                    onClick={() => setShowCompose(true)}
                  className="p-1.5 rounded-lg hover:bg-white/10 text-xs flex items-center gap-1"
                  title="Forward"
                >
                  <Forward size={15} /> Forward
                </button>
              </div>
              <button
                onClick={deleteCurrentEmail}
                className="p-1.5 rounded-lg hover:bg-red-500/20 text-red-400 text-xs flex items-center gap-1"
                title="Delete"
              >
                <Trash2 size={15} />
              </button>
            </div>

            {/* Email Header */}
            <div className="p-5 border-b border-white/10">
              <h2 className="text-base font-bold mb-3">{selectedEmail.subject}</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={selectedEmail.avatar}
                    alt={selectedEmail.sender}
                    className="w-10 h-10 rounded-full object-cover p-0.5 border border-white/20 bg-white/20"
                  />
                  <div>
                    <h4 className="text-xs font-bold leading-tight">{selectedEmail.sender}</h4>
                    <span className="text-[11px] opacity-60">{selectedEmail.email}</span>
                  </div>
                </div>
                <span className="text-xs opacity-50">{selectedEmail.date}</span>
              </div>
            </div>

            {/* Email Content Body */}
            <div className="flex-1 overflow-y-auto p-6 whitespace-pre-wrap text-sm leading-relaxed opacity-90 select-text">
              {selectedEmail.body}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-xs opacity-50">
            No message selected
          </div>
        )}
      </div>
      )}

      {/* Compose Email Modal */}
      {showCompose && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs">
          <form
            onSubmit={handleSendCompose}
            className={`w-[520px] rounded-2xl shadow-2xl border overflow-hidden flex flex-col ${
              isDarkMode ? 'bg-[#28282b] border-white/15 text-white' : 'bg-white border-black/10'
            }`}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <span className="font-bold text-xs">New Message</span>
              <button
                type="button"
                onClick={() => setShowCompose(false)}
                className="p-1 rounded-md hover:bg-white/10"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-3 border-b border-white/10 flex items-center gap-2 text-xs">
              <span className="opacity-50 w-12">To:</span>
              <input
                type="email"
                value={composeTo}
                onChange={(e) => setComposeTo(e.target.value)}
                className="flex-1 bg-transparent outline-none font-medium"
                required
              />
            </div>
            <div className="p-3 border-b border-white/10 flex items-center gap-2 text-xs">
              <span className="opacity-50 w-12">Subject:</span>
              <input
                type="text"
                value={composeSubject}
                onChange={(e) => setComposeSubject(e.target.value)}
                placeholder="Subject line"
                className="flex-1 bg-transparent outline-none font-medium"
              />
            </div>
            <textarea
              rows={8}
              value={composeBody}
              onChange={(e) => setComposeBody(e.target.value)}
              placeholder="Compose your email message here…"
              className="p-4 bg-transparent outline-none text-xs leading-relaxed resize-none flex-1"
            />
            <div className="p-3 border-t border-white/10 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowCompose(false)}
                className="px-4 py-1.5 rounded-lg text-xs hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md"
              >
                <Send size={13} /> Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

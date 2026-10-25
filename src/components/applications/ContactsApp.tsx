'use client';

import React, { useState } from 'react';
import {
  MessageSquare,
  Phone,
  Video,
  Mail,
  Search,
  Plus,
  ChevronRight,
  ChevronLeft,
  X,
  Check,
  MapPin,
  Calendar as CalendarIcon,
  User,
} from 'lucide-react';
import { useDesktopStore } from '@/stores/useDesktopStore';

interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  avatarBg?: string;
  gradient?: string;
  phone: string;
  email: string;
  workEmail?: string;
  address?: string;
  birthday?: string;
  notes?: string;
}

const defaultContacts: Contact[] = [
  {
    id: 'antonio',
    firstName: 'Antonio',
    lastName: 'Manriquez',
    avatar: '/icons/PngItem_6452863.png',
    avatarBg: 'bg-orange-100 dark:bg-orange-950/40',
    gradient: 'from-[#ff9f0a]/80 to-[#ff3b30]/80',
    phone: '(919) 555-0192',
    email: 'antonio.m@icloud.com',
    workEmail: 'amanriquez@trioceramics.com',
    address: '124 Market St, San Francisco CA 94102',
    birthday: 'Jan 12',
    notes: 'Met at the ceramics workshop.',
  },
  {
    id: 'magico',
    firstName: 'Magico',
    lastName: 'Martinez',
    avatar: '/icons/PngItem_5031003.png',
    avatarBg: 'bg-emerald-100 dark:bg-emerald-950/40',
    gradient: 'from-[#30d158]/80 to-[#116928]/80',
    phone: '(919) 555-0143',
    email: 'magico.m@icloud.com',
    workEmail: 'mmartinez@apple.com',
    address: '455 Cupertino Way, Cupertino CA 95014',
    birthday: 'Mar 05',
    notes: 'App designer.',
  },
  {
    id: 'graham',
    firstName: 'Graham',
    lastName: 'Kaufman',
    avatar: '/icons/PngItem_4608119.png',
    avatarBg: 'bg-sky-100 dark:bg-sky-950/40',
    gradient: 'from-[#0a84ff]/80 to-[#5e5ce6]/80',
    phone: '(919) 555-0118',
    email: 'gkaufman@icloud.com',
    workEmail: 'graham@studioblend.design',
    address: '88 Franklin Blvd, Austin TX 78701',
    birthday: 'Jul 21',
    notes: 'Architect & 3D visualization specialist.',
  },
  {
    id: 'fauzia',
    firstName: 'Fauzia',
    lastName: 'Farooqui',
    avatar: '/icons/PngItem_4409921.png',
    avatarBg: 'bg-pink-100 dark:bg-pink-950/40',
    gradient: 'from-[#ff375f]/80 to-[#bf5af2]/80',
    phone: '(919) 555-0164',
    email: 'fauzia.f@icloud.com',
    workEmail: 'ffarooqui@mit.edu',
    address: '77 Massachusetts Ave, Cambridge MA 02139',
    birthday: 'Sep 18',
    notes: 'Robotics PhD candidate. Working on spatial compute.',
  },
  {
    id: 'kunal',
    firstName: 'Kunal',
    lastName: 'Kushwaha',
    avatar: '/icons/PngItem_4082636.png',
    avatarBg: 'bg-blue-100 dark:bg-blue-950/40',
    gradient: 'from-[#5e5ce6]/80 to-[#0a84ff]/80',
    phone: '(919) 555-0177',
    email: 'kunal@kubesphere.io',
    workEmail: 'kunal@civo.com',
    address: 'Remote / London UK',
    birthday: 'Nov 02',
    notes: 'DevOps & open source advocate.',
  },
  {
    id: 'raj',
    firstName: 'Raj',
    lastName: 'Vishvakarma',
    avatar: '/icons/Hello16MacBookProBlk.png',
    avatarBg: 'bg-purple-100 dark:bg-purple-950/40',
    gradient: 'from-[#bf5af2]/80 to-[#0a84ff]/80',
    phone: '+91 98765 43210',
    email: 'raj@example.com',
    workEmail: 'rajvishvakarma@portfolio.dev',
    address: 'Balaghat, Madhya Pradesh, India',
    birthday: 'Aug 14',
    notes: 'Full Stack Engineer & macOS portfolio creator.',
  },
];

export function ContactsApp() {
  const [contacts, setContacts] = useState<Contact[]>(defaultContacts);
  const [selectedId, setSelectedId] = useState<string>('antonio');
  const [search, setSearch] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [mobileShowDetail, setMobileShowDetail] = useState(false);

  const { openApp, isMobile } = useDesktopStore();

  const [formData, setFormData] = useState<Partial<Contact>>({});

  const filtered = contacts.filter((c) => {
    const full = `${c.firstName} ${c.lastName}`.toLowerCase();
    return full.includes(search.toLowerCase()) || c.phone.includes(search);
  });

  const selectedContact = contacts.find((c) => c.id === selectedId) || contacts[0];

  const handleStartCreate = () => {
    setFormData({
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      address: '',
      notes: '',
      birthday: '',
    });
    setIsCreating(true);
    setIsEditing(false);
    if (isMobile) setMobileShowDetail(true);
  };

  const handleSaveContact = () => {
    if (!formData.firstName) return;
    if (isCreating) {
      const newContact: Contact = {
        id: `contact_${Date.now()}`,
        firstName: formData.firstName || '',
        lastName: formData.lastName || '',
        phone: formData.phone || '',
        email: formData.email || '',
        workEmail: formData.workEmail || '',
        address: formData.address || '',
        birthday: formData.birthday || '',
        notes: formData.notes || '',
        avatarBg: 'bg-sky-100 dark:bg-sky-950/40',
        gradient: 'from-[#0a84ff]/80 to-[#5e5ce6]/80',
      };
      setContacts((prev) => [newContact, ...prev]);
      setSelectedId(newContact.id);
      setIsCreating(false);
    } else if (isEditing && selectedContact) {
      setContacts((prev) =>
        prev.map((c) => (c.id === selectedContact.id ? { ...c, ...formData } : c))
      );
      setIsEditing(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col md:flex-row bg-[#f6f6f6] dark:bg-[#1e1e1e] text-slate-800 dark:text-slate-100 select-none overflow-hidden font-[-apple-system,BlinkMacSystemFont,sans-serif]">
      {/* Left List Pane */}
      {(!isMobile || !mobileShowDetail) && (
        <div className="w-full md:w-80 h-full border-r border-black/10 dark:border-white/10 flex flex-col bg-white/70 dark:bg-[#252526]/80 backdrop-blur-xl shrink-0">
          {/* Header / Search */}
          <div className="p-3 border-b border-black/5 dark:border-white/5 space-y-2">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold tracking-wide text-slate-700 dark:text-slate-200">
                All Contacts ({contacts.length})
              </h2>
              <button
                onClick={handleStartCreate}
                className="p-1.5 rounded-md hover:bg-black/5 dark:hover:bg-white/10 text-blue-500 transition-colors"
                title="Add Contact"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 text-xs bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg outline-none focus:ring-2 focus:ring-blue-500/50"
              />
            </div>
          </div>

          {/* Contact List */}
          <div className="flex-1 overflow-y-auto divide-y divide-black/5 dark:divide-white/5">
            {filtered.map((c) => {
              const isSel = c.id === selectedContact?.id;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedId(c.id);
                    setIsCreating(false);
                    setIsEditing(false);
                    if (isMobile) setMobileShowDetail(true);
                  }}
                  className={`w-full px-3 py-2.5 flex items-center gap-3 text-left transition-colors ${
                    isSel
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-black/5 dark:hover:bg-white/5 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  {c.avatar ? (
                    <img
                      src={c.avatar}
                      alt={c.firstName}
                      className="w-8 h-8 rounded-full object-cover bg-black/10 shrink-0"
                    />
                  ) : (
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-medium text-xs text-white shrink-0 bg-gradient-to-tr ${
                        c.gradient || 'from-blue-500 to-indigo-600'
                      }`}
                    >
                      {c.firstName[0]}
                      {c.lastName?.[0] || ''}
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-semibold truncate">
                      {c.firstName} {c.lastName}
                    </div>
                    <div
                      className={`text-[11px] truncate ${
                        isSel ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {c.phone || c.email}
                    </div>
                  </div>
                  <ChevronRight
                    className={`w-3.5 h-3.5 shrink-0 ${
                      isSel ? 'text-white/80' : 'text-slate-300 dark:text-slate-600'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Right Detail Pane */}
      {(!isMobile || mobileShowDetail) && (
        <div className="flex-1 h-full overflow-y-auto p-4 md:p-8 flex flex-col justify-start">
          {/* Mobile Back Button */}
          {isMobile && (
            <div className="mb-3 pb-2 border-b border-black/10 dark:border-white/10 flex items-center justify-between shrink-0">
              <button
                onClick={() => setMobileShowDetail(false)}
                className="flex items-center gap-1 text-xs font-semibold text-blue-500 hover:text-blue-600 transition-colors py-1 px-2 -ml-2 rounded-lg"
              >
                <ChevronLeft size={16} />
                <span>Contacts</span>
              </button>
            </div>
          )}
        {isCreating || isEditing ? (
          <div className="max-w-md w-full mx-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/10 dark:border-white/10">
              <h3 className="text-base font-semibold">
                {isCreating ? 'New Contact' : 'Edit Contact'}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setIsEditing(false);
                  }}
                  className="px-3 py-1 text-xs rounded-md bg-black/5 dark:bg-white/10 hover:bg-black/10"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveContact}
                  className="px-3 py-1 text-xs font-semibold rounded-md bg-blue-500 text-white hover:bg-blue-600"
                >
                  Save
                </button>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-slate-500 block mb-1">First Name</label>
                <input
                  type="text"
                  value={formData.firstName || ''}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 outline-none"
                />
              </div>
              <div>
                <label className="text-slate-500 block mb-1">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName || ''}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 outline-none"
                />
              </div>
              <div>
                <label className="text-slate-500 block mb-1">Phone</label>
                <input
                  type="text"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 outline-none"
                />
              </div>
              <div>
                <label className="text-slate-500 block mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 outline-none"
                />
              </div>
              <div>
                <label className="text-slate-500 block mb-1">Address</label>
                <input
                  type="text"
                  value={formData.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 outline-none"
                />
              </div>
              <div>
                <label className="text-slate-500 block mb-1">Notes</label>
                <textarea
                  rows={3}
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 outline-none resize-none"
                />
              </div>
            </div>
          </div>
        ) : selectedContact ? (
          <div className="max-w-md w-full mx-auto space-y-6">
            {/* Contact Header */}
            <div className="flex flex-col items-center text-center space-y-3">
              {selectedContact.avatar ? (
                <img
                  src={selectedContact.avatar}
                  alt={selectedContact.firstName}
                  className="w-24 h-24 rounded-full object-cover shadow-lg border-2 border-white/20"
                />
              ) : (
                <div
                  className={`w-24 h-24 rounded-full flex items-center justify-center font-semibold text-2xl text-white shadow-lg bg-gradient-to-tr ${
                    selectedContact.gradient || 'from-blue-500 to-indigo-600'
                  }`}
                >
                  {selectedContact.firstName[0]}
                  {selectedContact.lastName?.[0] || ''}
                </div>
              )}
              <div>
                <h1 className="text-xl font-bold text-slate-800 dark:text-white">
                  {selectedContact.firstName} {selectedContact.lastName}
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {selectedContact.notes?.split('.')[0] || 'Contact'}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => openApp('messages')}
                  className="flex flex-col items-center gap-1 p-2 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 text-blue-500 transition-colors w-16"
                  title="Message"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span className="text-[10px] font-medium">Message</span>
                </button>
                <button
                  onClick={() => openApp('phone')}
                  className="flex flex-col items-center gap-1 p-2 rounded-xl bg-green-500/10 hover:bg-green-500/20 text-green-500 transition-colors w-16"
                  title="Call"
                >
                  <Phone className="w-5 h-5" />
                  <span className="text-[10px] font-medium">Call</span>
                </button>
                <button
                  onClick={() => openApp('facetime')}
                  className="flex flex-col items-center gap-1 p-2 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-500 transition-colors w-16"
                  title="FaceTime"
                >
                  <Video className="w-5 h-5" />
                  <span className="text-[10px] font-medium">FaceTime</span>
                </button>
                <button
                  onClick={() => openApp('mail')}
                  className="flex flex-col items-center gap-1 p-2 rounded-xl bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-500 transition-colors w-16"
                  title="Mail"
                >
                  <Mail className="w-5 h-5" />
                  <span className="text-[10px] font-medium">Mail</span>
                </button>
              </div>
            </div>

            {/* Info Cards */}
            <div className="space-y-3 bg-white/60 dark:bg-white/5 rounded-2xl p-4 border border-black/5 dark:border-white/10 shadow-sm text-xs">
              <div className="flex justify-between items-center py-1 border-b border-black/5 dark:border-white/5">
                <span className="text-slate-400">phone</span>
                <span className="text-blue-500 font-medium">{selectedContact.phone}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-black/5 dark:border-white/5">
                <span className="text-slate-400">email</span>
                <span className="text-blue-500 font-medium">{selectedContact.email}</span>
              </div>
              {selectedContact.workEmail && (
                <div className="flex justify-between items-center py-1 border-b border-black/5 dark:border-white/5">
                  <span className="text-slate-400">work</span>
                  <span className="text-blue-500 font-medium">{selectedContact.workEmail}</span>
                </div>
              )}
              {selectedContact.address && (
                <div className="flex justify-between items-start py-1 border-b border-black/5 dark:border-white/5">
                  <span className="text-slate-400">address</span>
                  <span className="text-slate-700 dark:text-slate-300 text-right max-w-[200px]">
                    {selectedContact.address}
                  </span>
                </div>
              )}
              {selectedContact.birthday && (
                <div className="flex justify-between items-center py-1 border-b border-black/5 dark:border-white/5">
                  <span className="text-slate-400">birthday</span>
                  <span className="text-slate-700 dark:text-slate-300">{selectedContact.birthday}</span>
                </div>
              )}
              {selectedContact.notes && (
                <div className="pt-1">
                  <span className="text-slate-400 block mb-1">notes</span>
                  <p className="text-slate-700 dark:text-slate-300 italic">{selectedContact.notes}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  setFormData(selectedContact);
                  setIsEditing(true);
                  setIsCreating(false);
                }}
                className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
              >
                Edit Contact
              </button>
            </div>
          </div>
        ) : (
          <div className="m-auto text-center text-slate-400 text-xs">No Contact Selected</div>
        )}
      </div>
      )}
    </div>
  );
}

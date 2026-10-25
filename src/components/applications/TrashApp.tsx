'use client';

import React, { useState, useEffect } from 'react';
import {
  Trash2,
  RotateCcw,
  AlertTriangle,
  FileText,
  Image as ImageIcon,
  Folder,
  Music,
  Check,
} from 'lucide-react';

interface TrashItem {
  id: string;
  name: string;
  size?: string;
  deletedAt?: string;
  type?: string;
  content?: string;
}

const defaultTrash: TrashItem[] = [
  {
    id: 'trash_1',
    name: 'old_resume_draft_v1.docx',
    size: '142 KB',
    deletedAt: 'Oct 20, 2024',
    type: 'doc',
  },
  {
    id: 'trash_2',
    name: 'screenshot_2024-10-18.png',
    size: '1.2 MB',
    deletedAt: 'Oct 18, 2024',
    type: 'image',
  },
  {
    id: 'trash_3',
    name: 'temporary_build_cache.log',
    size: '48 KB',
    deletedAt: 'Oct 15, 2024',
    type: 'log',
  },
];

export function TrashApp() {
  const [trashItems, setTrashItems] = useState<TrashItem[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('os_trash');
        return saved ? JSON.parse(saved) : defaultTrash;
      } catch {
        return defaultTrash;
      }
    }
    return defaultTrash;
  });

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showConfirmEmpty, setShowConfirmEmpty] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('os_trash', JSON.stringify(trashItems));
      window.dispatchEvent(
        new CustomEvent('os_trash_updated', {
          detail: { hasFiles: trashItems.length > 0 },
        })
      );
    }
  }, [trashItems]);

  const handleEmptyTrash = () => {
    setTrashItems([]);
    setSelectedId(null);
    setShowConfirmEmpty(false);
  };

  const handleRestore = (item: TrashItem) => {
    setTrashItems((prev) => prev.filter((i) => i.id !== item.id));
    if (selectedId === item.id) setSelectedId(null);
    // Dispatch restore event for Finder
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('os_file_restored', {
          detail: item,
        })
      );
    }
  };

  const getItemIcon = (type?: string) => {
    switch (type) {
      case 'image':
        return <ImageIcon className="w-5 h-5 text-purple-500" />;
      case 'music':
        return <Music className="w-5 h-5 text-red-500" />;
      case 'folder':
        return <Folder className="w-5 h-5 text-blue-500" />;
      default:
        return <FileText className="w-5 h-5 text-slate-400" />;
    }
  };

  const selectedItem = trashItems.find((i) => i.id === selectedId);

  return (
    <div className="w-full h-full flex flex-col bg-[#f6f6f6] dark:bg-[#1e1e1e] text-slate-800 dark:text-slate-100 select-none overflow-hidden font-[-apple-system,BlinkMacSystemFont,sans-serif]">
      {/* Top Toolbar */}
      <div className="px-4 py-2 border-b border-black/10 dark:border-white/10 flex items-center justify-between bg-white/70 dark:bg-[#252526]/80 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <Trash2 className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-semibold">Trash ({trashItems.length})</span>
        </div>

        <div className="flex items-center gap-2">
          {selectedItem && (
            <button
              onClick={() => handleRestore(selectedItem)}
              className="flex items-center gap-1 px-3 py-1 text-xs rounded-lg bg-black/5 dark:bg-white/10 hover:bg-black/10 transition-colors"
              title="Put Back"
            >
              <RotateCcw className="w-3.5 h-3.5 text-blue-500" />
              <span>Put Back</span>
            </button>
          )}

          {trashItems.length > 0 && (
            <button
              onClick={() => setShowConfirmEmpty(true)}
              className="px-3 py-1 text-xs font-semibold rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 transition-colors"
            >
              Empty Trash
            </button>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmEmpty && (
        <div className="p-3 bg-red-500/10 border-b border-red-500/20 flex items-center justify-between text-xs text-red-600 dark:text-red-300">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4" />
            <span>Are you sure you want to permanently erase the items in the Trash?</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowConfirmEmpty(false)}
              className="px-2.5 py-1 rounded bg-black/5 dark:bg-white/10 text-slate-700 dark:text-slate-200"
            >
              Cancel
            </button>
            <button
              onClick={handleEmptyTrash}
              className="px-2.5 py-1 rounded bg-red-600 text-white font-semibold"
            >
              Empty
            </button>
          </div>
        </div>
      )}

      {/* Body Area */}
      <div className="flex-1 overflow-y-auto p-4">
        {trashItems.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 text-xs">
            <img src="/icons/trash.png" alt="Trash" className="w-16 h-16 mb-2 object-contain opacity-75 drop-shadow-sm select-none" />
            <span className="font-medium text-neutral-500 dark:text-neutral-400">Trash is Empty</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {trashItems.map((item) => {
              const isSel = item.id === selectedId;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedId(item.id)}
                  onDoubleClick={() => handleRestore(item)}
                  className={`flex flex-col items-center p-3 rounded-xl cursor-pointer text-center transition-all ${
                    isSel
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <div className="w-12 h-12 flex items-center justify-center mb-1.5">
                    {getItemIcon(item.type)}
                  </div>
                  <span className="text-xs font-medium truncate max-w-full leading-tight">
                    {item.name}
                  </span>
                  <span
                    className={`text-[10px] mt-0.5 ${
                      isSel ? 'text-blue-100' : 'text-slate-400'
                    }`}
                  >
                    {item.size || '0 KB'}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Bottom Info Bar */}
      <div className="px-4 py-1.5 border-t border-black/5 dark:border-white/5 bg-[#f6f6f6]/60 dark:bg-[#252526]/60 text-[11px] text-slate-400 flex items-center justify-between">
        <span>{trashItems.length} items in Trash</span>
        <span>Items in Trash can be put back to Finder</span>
      </div>
    </div>
  );
}

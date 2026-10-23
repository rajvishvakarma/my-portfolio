'use client';

import React, { useState } from 'react';
import { Trash2, RotateCcw, AlertTriangle, FileCode, CheckCircle2 } from 'lucide-react';
import { useDesktopStore } from '@/stores/useDesktopStore';

interface TrashItem {
  id: string;
  name: string;
  size: string;
  dateDeleted: string;
  kind: string;
}

const initialTrashItems: TrashItem[] = [
  { id: '1', name: 'legacy_jquery_plugins.js', size: '2.4 MB', dateDeleted: 'Yesterday', kind: 'JavaScript' },
  { id: '2', name: 'unresolved_merge_conflict_final_v2.txt', size: '14 KB', dateDeleted: '3 days ago', kind: 'Plain Text' },
  { id: '3', name: 'old_node_modules_backup.tar.gz', size: '482 MB', dateDeleted: 'Last week', kind: 'Gzip Archive' },
  { id: '4', name: 'todo_from_2021_dont_delete.md', size: '3.2 KB', dateDeleted: '2 weeks ago', kind: 'Markdown' },
];

export const TrashApp: React.FC = () => {
  const [items, setItems] = useState<TrashItem[]>(initialTrashItems);
  const { addNotification } = useDesktopStore();

  const handleEmptyTrash = () => {
    setItems([]);
    addNotification('Trash Emptied', 'All items permanently removed from Trash.');
  };

  const handleRestore = (id: string, name: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    addNotification('Item Restored', `Restored ${name} to Desktop.`);
  };

  return (
    <div className="flex flex-col h-full bg-white/95 dark:bg-[#1e1e1e]/95 text-neutral-800 dark:text-neutral-100 select-none overflow-hidden">
      {/* Top Bar */}
      <div className="p-3 border-b border-black/10 dark:border-white/10 bg-neutral-100/70 dark:bg-[#282828]/70 backdrop-blur-md flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Trash2 size={16} className="text-neutral-500" />
          <span className="text-xs font-bold text-neutral-900 dark:text-white">Trash</span>
          <span className="text-xs text-neutral-400">({items.length} items)</span>
        </div>

        {items.length > 0 && (
          <button
            onClick={handleEmptyTrash}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <span>Empty Trash</span>
          </button>
        )}
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto p-5">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-16 space-y-3">
            <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-white/5 flex items-center justify-center text-neutral-400">
              <CheckCircle2 size={32} className="text-emerald-500" />
            </div>
            <div>
              <h4 className="font-bold text-sm text-neutral-900 dark:text-white">Trash is Empty</h4>
              <p className="text-xs text-neutral-400 mt-1 max-w-xs">
                Zero garbage in this codebase! Clean, modular, and optimized architecture.
              </p>
            </div>
            <button
              onClick={() => setItems(initialTrashItems)}
              className="mt-2 text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              Reset sample trash items
            </button>
          </div>
        ) : (
          <div className="border border-black/10 dark:border-white/10 rounded-xl overflow-hidden">
            <div className="grid grid-cols-12 px-3.5 py-2 bg-neutral-100/70 dark:bg-neutral-800/70 text-[11px] font-semibold text-neutral-400 border-b border-black/10 dark:border-white/10">
              <div className="col-span-5">Name</div>
              <div className="col-span-3">Date Deleted</div>
              <div className="col-span-2">Size</div>
              <div className="col-span-2 text-right">Action</div>
            </div>
            <div className="divide-y divide-black/5 dark:divide-white/5">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 items-center px-3.5 py-2.5 text-xs hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <div className="col-span-5 flex items-center space-x-2 truncate pr-2">
                    <FileCode size={14} className="text-neutral-400 shrink-0" />
                    <span className="font-medium text-neutral-800 dark:text-neutral-200 truncate">{item.name}</span>
                  </div>
                  <div className="col-span-3 text-neutral-500 text-[11px]">{item.dateDeleted}</div>
                  <div className="col-span-2 text-neutral-500 text-[11px]">{item.size}</div>
                  <div className="col-span-2 text-right">
                    <button
                      onClick={() => handleRestore(item.id, item.name)}
                      className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 text-neutral-700 dark:text-neutral-300 transition-colors"
                      title="Put back item"
                    >
                      <RotateCcw size={10} />
                      <span>Restore</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-5 py-2 bg-neutral-100/70 dark:bg-[#1a1a1a]/70 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] text-neutral-500">
        <span>Trash Bin Simulator</span>
        <span>Items deleted from portfolio will not impact actual files</span>
      </div>
    </div>
  );
};

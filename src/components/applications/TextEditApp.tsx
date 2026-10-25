'use client';

import React, { useState, useEffect } from 'react';
import {
  Save,
  Download,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  FileText,
  Copy,
  Check,
} from 'lucide-react';

export function TextEditApp() {
  const [title, setTitle] = useState('Untitled.txt');
  const [content, setContent] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('os_textedit_current') || 
`# Welcome to TextEdit

This is your macOS TextEdit notepad. You can write notes, draft markdown documents, or copy text here.

- Supports instant autosave to local memory
- Export document as .txt file
- Character and word count metrics
`;
    }
    return '';
  });
  const [saved, setSaved] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('os_textedit_current', content);
    }
  }, [content]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setSaved(false);
  };

  const handleSave = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('os_textedit_current', content);
      // Dispatch custom event to notify Finder of the file save event
      window.dispatchEvent(
        new CustomEvent('os_file_saved', {
          detail: {
            id: `doc_${Date.now()}`,
            name: title.endsWith('.txt') ? title : `${title}.txt`,
            content,
            size: `${content.length} B`,
            date: new Date().toLocaleDateString(),
          },
        })
      );
    }
    setSaved(true);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = title.endsWith('.txt') ? title : `${title}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const chars = content.length;

  return (
    <div className="w-full h-full flex flex-col bg-[#ffffff] dark:bg-[#1e1e1e] text-slate-800 dark:text-slate-100 select-none overflow-hidden font-[-apple-system,BlinkMacSystemFont,sans-serif]">
      {/* Top Toolbar */}
      <div className="px-4 py-2 border-b border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-3 bg-[#f6f6f6]/90 dark:bg-[#252526]/90 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-500" />
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xs font-semibold bg-transparent border-b border-transparent hover:border-black/20 dark:hover:border-white/20 focus:border-blue-500 outline-none px-1 py-0.5"
          />
          {!saved && <span className="w-2 h-2 rounded-full bg-amber-500" title="Unsaved changes" />}
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
          <button
            onClick={handleSave}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-xs bg-black/5 dark:bg-white/10 hover:bg-black/10 transition-colors"
            title="Save Document"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saved ? 'Saved' : 'Save'}</span>
          </button>

          <button
            onClick={handleDownload}
            className="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            title="Download .txt"
          >
            <Download className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleCopy}
            className="p-1.5 rounded hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
            title="Copy Text"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="flex-1 p-4 md:p-6 overflow-hidden flex flex-col">
        <textarea
          value={content}
          onChange={handleChange}
          placeholder="Start typing..."
          className="w-full flex-1 resize-none bg-transparent outline-none font-mono text-sm leading-relaxed text-slate-800 dark:text-slate-200 placeholder-slate-400 select-text"
          spellCheck={false}
        />
      </div>

      {/* Status Bar */}
      <div className="px-4 py-1.5 border-t border-black/5 dark:border-white/5 bg-[#f6f6f6]/60 dark:bg-[#252526]/60 text-[11px] text-slate-400 flex items-center justify-between">
        <span>UTF-8 Plain Text</span>
        <div className="flex items-center gap-4">
          <span>{words} words</span>
          <span>{chars} characters</span>
        </div>
      </div>
    </div>
  );
}

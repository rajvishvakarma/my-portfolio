'use client';

import React, { useState } from 'react';
import {
  ExternalLink,
  RotateCw,
  FolderTree,
  Code2,
  FileCode,
  Search,
  GitBranch,
  Play,
  Settings,
} from 'lucide-react';
import { profile } from '@/data/profile';
import { useDesktopStore } from '@/stores/useDesktopStore';

export const VSCodeApp: React.FC = () => {
  const { theme } = useDesktopStore();
  const isDark = theme === 'dark';

  const initialUrl = 'https://github1s.com/rajvishvakarma/my-portfolio';
  const [currentUrl, setCurrentUrl] = useState(initialUrl);
  const [isLoading, setIsLoading] = useState(false);

  const handleReload = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className={`flex h-full w-full flex-col select-none overflow-hidden font-[-apple-system,BlinkMacSystemFont,sans-serif] ${
      isDark ? 'bg-[#1e1e1e] text-white' : 'bg-[#f3f3f3] text-neutral-800'
    }`}>
      {/* VS Code Top Bar */}
      <div className={`h-9 border-b flex items-center justify-between px-3 text-xs shrink-0 ${
        isDark ? 'bg-[#323233] border-[#252526] text-neutral-300' : 'bg-[#e8e8ed] border-black/10 text-neutral-700'
      }`}>
        <div className="flex items-center gap-2">
          <Code2 size={16} className="text-[#007acc]" />
          <span className={`font-medium truncate ${isDark ? 'text-white' : 'text-neutral-900 font-semibold'}`}>
            Visual Studio Code — rajvishvakarma/my-portfolio
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentUrl('https://github1s.com/rajvishvakarma/my-portfolio')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              currentUrl.includes('github1s')
                ? 'bg-[#007acc] text-white'
                : isDark ? 'hover:bg-white/10 text-neutral-300' : 'hover:bg-black/5 text-neutral-700'
            }`}
          >
            Portfolio Repo
          </button>

          <button
            onClick={() => setCurrentUrl('https://vscode.dev')}
            className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
              currentUrl.includes('vscode.dev')
                ? 'bg-[#007acc] text-white'
                : isDark ? 'hover:bg-white/10 text-neutral-300' : 'hover:bg-black/5 text-neutral-700'
            }`}
          >
            vscode.dev
          </button>

          <button
            onClick={handleReload}
            className={`p-1 rounded transition-colors ${isDark ? 'hover:bg-white/10 text-neutral-300' : 'hover:bg-black/5 text-neutral-700'}`}
            title="Reload Editor"
          >
            <RotateCw size={13} className={isLoading ? 'animate-spin' : ''} />
          </button>

          <a
            href="https://github1s.com/rajvishvakarma/my-portfolio"
            target="_blank"
            rel="noreferrer"
            className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] transition-colors ${
              isDark
                ? 'bg-white/10 hover:bg-white/15 text-white'
                : 'bg-black/5 hover:bg-black/10 text-neutral-900 font-medium'
            }`}
            title="Open in Full Tab"
          >
            <span>Full Window</span>
            <ExternalLink size={11} />
          </a>
        </div>
      </div>

      {/* Embedded Real Visual Studio Code Web Editor */}
      <div className={`flex-1 w-full h-full relative ${isDark ? 'bg-[#1e1e1e]' : 'bg-[#ffffff]'}`}>
        <iframe
          src={currentUrl}
          title="Visual Studio Code"
          className="w-full h-full border-none"
          allow="clipboard-read; clipboard-write"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
        />
      </div>
    </div>
  );
};

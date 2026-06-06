/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Menu, Sun, Moon, Sparkles } from 'lucide-react';

interface ToolbarProps {
  onMenuClick: () => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  appName: string;
}

export default function Toolbar({ onMenuClick, theme, onThemeToggle, appName }: ToolbarProps) {
  return (
    <header 
      className="sticky top-0 z-30 w-full border-b backdrop-blur-md bg-opacity-70 flex justify-between items-center px-4 pb-3 shadow-sm border-neutral-200/50 bg-white/80 dark:border-zinc-800/80 dark:bg-zinc-950/80 transition-colors duration-300"
      style={{ paddingTop: 'calc(14px + env(safe-area-inset-top, 0px))' }}
    >
      {/* Right section: Sidebar menu button & App Title (Pasho is RTL) */}
      <div className="flex items-center gap-3">
        <button
          id="sidebar-trigger-btn"
          onClick={onMenuClick}
          className="p-2 mr-1 rounded-xl transition-all active:scale-95 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-300 border border-transparent dark:border-zinc-800"
          aria-label="مينيو"
        >
          <Menu className="w-5 h-5 pointer-events-none" />
        </button>

        <div className="flex flex-col text-right">
          <div className="flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <h1 className="text-base font-bold tracking-tight text-neutral-900 dark:text-white font-sans">
              {appName}
            </h1>
          </div>
        </div>
      </div>

      {/* Left section: Switch theme with gorgeous transitions */}
      <div className="flex items-center gap-2">
        <button
          id="theme-switch-btn"
          onClick={onThemeToggle}
          className="relative p-2 rounded-xl transition-all active:scale-90 bg-neutral-100/80 hover:bg-neutral-200 text-neutral-700 dark:bg-zinc-900/80 dark:hover:bg-zinc-800 dark:text-zinc-200 border border-neutral-200 dark:border-zinc-800 w-10 h-10 flex items-center justify-center overflow-hidden"
          title={theme === 'dark' ? 'روښانه موډ' : 'تیاره موډ'}
        >
          {/* We animate inside with rotating transitions */}
          <motion.div
            key={theme}
            initial={{ y: 20, rotate: -45, opacity: 0 }}
            animate={{ y: 0, rotate: 0, opacity: 1 }}
            exit={{ y: -20, rotate: 45, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 15 }}
            className="flex items-center justify-center pointer-events-none"
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400 fill-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-indigo-600 fill-indigo-600/10" />
            )}
          </motion.div>
        </button>
      </div>
    </header>
  );
}


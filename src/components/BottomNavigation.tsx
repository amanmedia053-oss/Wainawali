/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Home, Search, Info } from 'lucide-react';

interface BottomNavigationProps {
  activeTab: 'home' | 'search' | 'about';
  onChange: (tab: 'home' | 'search' | 'about') => void;
  themeAccent?: string;
}

export default function BottomNavigation({ activeTab, onChange, themeAccent }: BottomNavigationProps) {
  const navItems = [
    { id: 'home', label: 'کورپاڼه', icon: Home },
    { id: 'search', label: 'پلټنه', icon: Search },
    { id: 'about', label: 'زمونږ په اړه', icon: Info },
  ] as const;

  const accent = themeAccent || 'indigo';
  const activeStyles: Record<string, { inlineHex: string; text: string; bg: string; dot: string }> = {
    indigo: { inlineHex: '#4f46e5', text: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-indigo-500/10', dot: 'bg-indigo-600 dark:bg-indigo-400' },
    teal: { inlineHex: '#0d9488', text: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-teal-500/10', dot: 'bg-teal-600 dark:bg-teal-400' },
    emerald: { inlineHex: '#10b981', text: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10', dot: 'bg-emerald-600 dark:bg-emerald-400' },
    amber: { inlineHex: '#f59e0b', text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-500/10', dot: 'bg-amber-600 dark:bg-amber-400' },
    rose: { inlineHex: '#f43f5e', text: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-500/10', dot: 'bg-rose-500 dark:bg-rose-400' },
    violet: { inlineHex: '#8b5cf6', text: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-violet-500/10', dot: 'bg-violet-600 dark:bg-violet-400' },
    sky: { inlineHex: '#0ea5e9', text: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-sky-500/10', dot: 'bg-sky-600 dark:bg-sky-400' },
    orange: { inlineHex: '#f97316', text: 'text-orange-500 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-500/10', dot: 'bg-orange-500 dark:bg-orange-400' },
    red: { inlineHex: '#ef4444', text: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-500/10', dot: 'bg-red-600 dark:bg-red-400' },
    fuchsia: { inlineHex: '#d946ef', text: 'text-fuchsia-600 dark:text-fuchsia-400', bg: 'bg-fuchsia-50 dark:bg-fuchsia-500/10', dot: 'bg-fuchsia-600 dark:bg-fuchsia-400' },
    cyan: { inlineHex: '#06b6d4', text: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-50 dark:bg-cyan-500/10', dot: 'bg-cyan-600 dark:bg-cyan-400' },
    lime: { inlineHex: '#84cc16', text: 'text-lime-600 dark:text-lime-400', bg: 'bg-lime-50 dark:bg-lime-500/10', dot: 'bg-lime-600 dark:bg-lime-400' },
    yellow: { inlineHex: '#eab308', text: 'text-yellow-500 dark:text-yellow-405', bg: 'bg-yellow-50 dark:bg-yellow-500/10', dot: 'bg-yellow-500 dark:bg-yellow-400' },
    pink: { inlineHex: '#ec4899', text: 'text-pink-500 dark:text-pink-400', bg: 'bg-pink-50 dark:bg-pink-500/10', dot: 'bg-pink-500 dark:bg-pink-400' },
    slate: { inlineHex: '#64748b', text: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-50 dark:bg-slate-500/10', dot: 'bg-slate-600 dark:bg-slate-400' }
  };
  const activeStyle = activeStyles[accent] || activeStyles.indigo;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-30 pb-safe border-t shadow-lg bg-white/95 border-neutral-200 dark:bg-zinc-950/95 dark:border-zinc-800 backdrop-blur-md select-none" dir="rtl">
      <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const IconComponent = item.icon;

          return (
            <button
              key={item.id}
              id={`nav-btn-${item.id}`}
              onClick={() => onChange(item.id)}
              className="relative py-2 flex flex-col items-center justify-center flex-1 text-center transition-all group"
            >
              {/* Highlight background pill */}
              <div 
                className={`absolute w-12 h-8 rounded-full -z-10 transition-colors duration-300 ${
                  isActive 
                    ? `${activeStyle.bg} scale-100` 
                    : "scale-75 opacity-0 group-hover:scale-90 group-hover:opacity-100 group-hover:bg-neutral-50 dark:group-hover:bg-zinc-900/40"
                }`} 
              />

              {/* Icon */}
              <span className={`transition-all duration-300 ${
                isActive 
                  ? `${activeStyle.text} scale-110 -translate-y-0.5` 
                  : "text-neutral-500 hover:text-neutral-700 dark:text-zinc-400 dark:hover:text-zinc-200"
              }`}>
                <IconComponent className="w-5 h-5" />
              </span>

              {/* Label */}
              <span className={`text-[10px] sm:text-xs font-sans font-medium transition-all duration-300 ${
                isActive 
                  ? `${activeStyle.text} mt-1 font-bold` 
                  : "text-neutral-400 dark:text-zinc-500 mt-0.5"
              }`}>
                {item.label}
              </span>

              {/* Tiny Dot indicator */}
              {isActive && (
                <motion.div 
                  layoutId="bottom-nav-active-dot"
                  className={`absolute bottom-0 w-1 h-1 rounded-full ${activeStyle.dot}`}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

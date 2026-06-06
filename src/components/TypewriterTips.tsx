/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Lightbulb, Sparkles } from 'lucide-react';
import { segmentText } from '../utils/text';

interface TypewriterTipsProps {
  themeAccent?: string;
  tips: string[];
}

export default function TypewriterTips({ themeAccent, tips }: TypewriterTipsProps) {
  const [currentTipIdx, setCurrentTipIdx] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(70);

  const accent = themeAccent || 'indigo';
  const accentStyles: Record<string, { hex: string; bg: string; border: string; pillBg: string }> = {
    indigo: { hex: '#4f46e5', bg: 'bg-indigo-50/10 dark:bg-zinc-900/30', border: 'border-indigo-100 dark:border-indigo-950/20', pillBg: 'bg-indigo-500/10 text-indigo-500' },
    teal: { hex: '#0d9488', bg: 'bg-teal-50/10 dark:bg-zinc-900/30', border: 'border-teal-100 dark:border-teal-950/20', pillBg: 'bg-teal-500/10 text-teal-500' },
    emerald: { hex: '#10b981', bg: 'bg-emerald-50/10 dark:bg-zinc-900/30', border: 'border-emerald-100 dark:border-emerald-950/20', pillBg: 'bg-emerald-500/10 text-emerald-500' },
    amber: { hex: '#f59e0b', bg: 'bg-amber-50/10 dark:bg-zinc-900/30', border: 'border-amber-100 dark:border-amber-950/20', pillBg: 'bg-amber-500/10 text-amber-500' },
    rose: { hex: '#f43f5e', bg: 'bg-rose-50/10 dark:bg-zinc-900/30', border: 'border-rose-100 dark:border-rose-950/20', pillBg: 'bg-rose-500/10 text-rose-500' },
    violet: { hex: '#8b5cf6', bg: 'bg-violet-50/10 dark:bg-zinc-900/30', border: 'border-violet-100 dark:border-violet-950/20', pillBg: 'bg-violet-500/10 text-violet-500' },
    sky: { hex: '#0ea5e9', bg: 'bg-sky-50/10 dark:bg-zinc-900/30', border: 'border-sky-100 dark:border-sky-950/20', pillBg: 'bg-sky-500/10 text-sky-500' },
    orange: { hex: '#f97316', bg: 'bg-orange-50/10 dark:bg-zinc-900/30', border: 'border-orange-100 dark:border-orange-950/20', pillBg: 'bg-orange-500/10 text-orange-500' },
    red: { hex: '#ef4444', bg: 'bg-red-50/10 dark:bg-zinc-900/30', border: 'border-red-100 dark:border-red-950/20', pillBg: 'bg-red-500/10 text-red-500' },
    fuchsia: { hex: '#d946ef', bg: 'bg-fuchsia-50/10 dark:bg-zinc-900/30', border: 'border-fuchsia-100 dark:border-fuchsia-950/20', pillBg: 'bg-fuchsia-500/10 text-fuchsia-500' },
    cyan: { hex: '#06b6d4', bg: 'bg-cyan-50/10 dark:bg-zinc-900/30', border: 'border-cyan-100 dark:border-cyan-950/20', pillBg: 'bg-cyan-500/10 text-cyan-500' },
    lime: { hex: '#84cc16', bg: 'bg-lime-50/10 dark:bg-zinc-900/30', border: 'border-lime-100 dark:border-lime-950/20', pillBg: 'bg-lime-500/10 text-lime-500' },
    yellow: { hex: '#eab308', bg: 'bg-yellow-50/10 dark:bg-zinc-900/30', border: 'border-yellow-100 dark:border-yellow-950/20', pillBg: 'bg-yellow-500/10 text-yellow-500' },
    pink: { hex: '#ec4899', bg: 'bg-pink-50/10 dark:bg-zinc-900/30', border: 'border-pink-100 dark:border-pink-950/20', pillBg: 'bg-pink-500/10 text-pink-500' },
    slate: { hex: '#64748b', bg: 'bg-slate-50/10 dark:bg-zinc-900/30', border: 'border-slate-100 dark:border-slate-950/20', pillBg: 'bg-slate-500/10 text-slate-500' }
  };
  const activeStyle = accentStyles[accent] || accentStyles.indigo;

  useEffect(() => {
    if (!tips || tips.length === 0) return;

    let timer: NodeJS.Timeout;
    const currentTip = tips[currentTipIdx];
    const segments = segmentText(currentTip);
    const currentSegmentLength = segmentText(displayedText).length;

    const handleTypewriting = () => {
      if (!isDeleting) {
        // Typing text state
        if (currentSegmentLength < segments.length) {
          const nextSegmentLength = currentSegmentLength + 1;
          const newText = segments.slice(0, nextSegmentLength).join('');
          setDisplayedText(newText);
          setTypingSpeed(75);
        } else {
          // Finished typing, pause for reading
          setTypingSpeed(3000); // pause for 3 seconds before deleting
          setIsDeleting(true);
        }
      } else {
        // Deleting text state
        if (currentSegmentLength > 0) {
          const nextSegmentLength = currentSegmentLength - 1;
          const newText = segments.slice(0, nextSegmentLength).join('');
          setDisplayedText(newText);
          setTypingSpeed(40);
        } else {
          // Finished deleting, load next tip
          setIsDeleting(false);
          setCurrentTipIdx((prev) => (prev + 1) % tips.length);
          setTypingSpeed(600); // pause briefly before typing next
        }
      }
    };

    timer = setTimeout(handleTypewriting, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentTipIdx, tips, typingSpeed]);

  return (
    <div 
      className={`border rounded-2xl p-5 shadow-xs transition-all duration-300 mt-2 ${activeStyle.bg} ${activeStyle.border}`}
      dir="rtl"
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${activeStyle.hex}15`, color: activeStyle.hex }}>
            <Lightbulb className="w-4 h-4 animate-pulse" />
          </span>
          <h4 className="text-sm font-extrabold text-neutral-800 dark:text-zinc-100 font-sans">
            د ویناوالۍ په زړه پورې مشوره (Daily Tip)
          </h4>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-neutral-400 dark:text-zinc-500 font-mono">
          <span>{currentTipIdx + 1}</span>
          <span>/</span>
          <span>{tips.length}</span>
        </div>
      </div>

      <div className="min-h-[88px] flex items-center justify-center bg-white/70 dark:bg-zinc-950/60 rounded-xl p-4.5 border border-dashed border-neutral-150 dark:border-zinc-900/60">
        <p className="text-xs sm:text-sm text-neutral-700 dark:text-zinc-200 leading-relaxed font-sans text-center font-bold tracking-tight">
          “ {displayedText} <span className="inline-block w-1.5 h-4 ml-0.5 bg-indigo-500 animate-[pulse_0.8s_infinite] align-middle" style={{ backgroundColor: activeStyle.hex }} /> ”
        </p>
      </div>

      <p className="text-[10px] text-neutral-400 dark:text-zinc-500 text-center font-sans mt-2">
        دا لارښوونې په ورځني ژوند کې د وینا پیاوړتیا لپاره مهمې بېلګې دي.
      </p>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Award, 
  BookMarked, 
  RotateCcw, 
  HelpCircle, 
  Heart, 
  Sparkles,
  Bookmark,
  Coffee
} from 'lucide-react';
import { Topic, UserProgress } from '../types';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  topics: Topic[];
  progress: Record<string, UserProgress>;
  onResetProgress: () => void;
  onNavigate: (tab: 'home' | 'search' | 'about') => void;
  favoritesCount: number;
}

export default function Sidebar({
  isOpen,
  onClose,
  topics,
  progress,
  onResetProgress,
  onNavigate,
  favoritesCount
}: SidebarProps) {
  // Calculate analytics
  const completedCount = Object.values(progress).filter(p => p.isCompleted).length;
  const totalTopics = topics.length;
  
  // Overall percentage
  let totalPercentSum = 0;
  topics.forEach(t => {
    totalPercentSum += progress[t.id]?.progressPercent || 0;
  });
  const overallProgress = totalTopics > 0 ? Math.round(totalPercentSum / totalTopics) : 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          />

          {/* Drawer Panel (RTL layout) */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed inset-y-0 right-0 z-50 w-80 max-w-[85vw] bg-white dark:bg-zinc-950 shadow-2xl flex flex-col justify-between border-l border-neutral-100 dark:border-zinc-800"
            dir="rtl"
          >
            {/* Top Side */}
            <div>
              {/* Header */}
              <div className="flex justify-between items-center p-5 border-b border-neutral-100 dark:border-zinc-900 bg-neutral-50/50 dark:bg-zinc-900/10">
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                    <Award className="w-5 h-5" />
                  </span>
                  <div>
                    <h2 className="font-bold text-base text-neutral-900 dark:text-white font-sans">
                      اصلي غورنۍ (مينيو)
                    </h2>
                    <p className="text-[10px] text-neutral-400 dark:text-zinc-500">
                      ستاسو شخصي ریکارډونه
                    </p>
                  </div>
                </div>
                <button
                  id="close-sidebar-btn"
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:text-zinc-500 dark:hover:text-zinc-300 hover:bg-neutral-100 dark:hover:bg-zinc-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Progress Summary Section */}
              <div className="p-5 border-b border-neutral-100 dark:border-zinc-900">
                <h3 className="text-xs font-semibold uppercase text-neutral-400 dark:text-zinc-500 tracking-wider mb-3">
                  ستاسو د مطالعې پوهه
                </h3>
                
                {/* Circular / Blocky Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-neutral-50 dark:bg-zinc-900/50 rounded-xl p-3 border border-neutral-100 dark:border-zinc-900">
                    <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                      {completedCount} <span className="text-xs font-normal text-zinc-400">/ {totalTopics}</span>
                    </div>
                    <span className="text-xs text-neutral-500 dark:text-zinc-400 font-sans block mt-1">
                      لوستل شوې برخې
                    </span>
                  </div>
                  
                  <div className="bg-neutral-50 dark:bg-zinc-900/50 rounded-xl p-3 border border-neutral-100 dark:border-zinc-900">
                    <div className="text-2xl font-bold text-rose-500 dark:text-rose-400 flex items-center gap-1">
                      {favoritesCount} <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                    </div>
                    <span className="text-xs text-neutral-500 dark:text-zinc-400 font-sans block mt-1">
                      خوښې موضوعګانې
                    </span>
                  </div>
                </div>

                {/* Overall Progress bar */}
                <div>
                  <div className="flex justify-between items-center mb-1 text-xs">
                    <span className="text-neutral-600 dark:text-zinc-300 font-sans">بشپړ پرمختګ</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{overallProgress}%</span>
                  </div>
                  <div className="w-full bg-neutral-100 dark:bg-zinc-900 h-2.5 rounded-full overflow-hidden">
                    <motion.div 
                      className="bg-gradient-to-l from-indigo-500 to-teal-400 h-full rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${overallProgress}%` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </div>

              {/* Quick Shortcuts */}
              <div className="p-4 flex flex-col gap-1 max-h-[40vh] overflow-y-auto">
                <span className="text-[10px] font-semibold text-neutral-400 dark:text-zinc-500 uppercase tracking-widest px-2 mb-1 block">
                  سمستي مینوګانې
                </span>
                
                <button
                  id="menu-shortcut-home"
                  onClick={() => { onNavigate('home'); onClose(); }}
                  className="w-full text-right flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-neutral-50 dark:hover:bg-zinc-900 text-neutral-700 dark:text-zinc-300 transition-all active:scale-[0.98] group"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-zinc-900 text-indigo-500 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                      <BookMarked className="w-4 h-4" />
                    </span>
                    <span className="text-sm font-sans font-bold">کور پاڼه</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500">موضوعات</span>
                </button>

                <button
                  id="menu-shortcut-search"
                  onClick={() => { onNavigate('search'); onClose(); }}
                  className="w-full text-right flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-neutral-50 dark:hover:bg-zinc-900 text-neutral-700 dark:text-zinc-300 transition-all active:scale-[0.98] group"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-1.5 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400 dark:bg-zinc-900 group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-white transition-all">
                      <HelpCircle className="w-4 h-4" />
                    </span>
                    <span className="text-sm font-sans font-bold">د اصولو پلټنه</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500">پلټونکی</span>
                </button>

                <button
                  id="menu-shortcut-about"
                  onClick={() => { onNavigate('about'); onClose(); }}
                  className="w-full text-right flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-neutral-50 dark:hover:bg-zinc-900 text-neutral-700 dark:text-zinc-300 transition-all active:scale-[0.98] group"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-1.5 rounded-lg bg-amber-50 dark:bg-zinc-900 text-amber-500 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all">
                      <Sparkles className="w-4 h-4" />
                    </span>
                    <span className="text-sm font-sans font-bold">جوړونکی او موخه</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500">زمونږ په اړه</span>
                </button>

                <div className="h-px bg-neutral-150 dark:bg-zinc-900 my-2" />

                <span className="text-[10px] font-semibold text-neutral-400 dark:text-zinc-500 uppercase tracking-widest px-2 mb-1 block">
                  د اپلیکیشن کړنې او ملاتړ
                </span>

                {/* Additional premium buttons */}
                <button
                  id="menu-shortcut-share"
                  onClick={() => {
                    if (navigator.share) {
                      navigator.share({
                        title: 'پښتو د ویناوالۍ ښوونکی',
                        text: 'خپله ویناوالي او ژبنیز مهارتونه په پښتو ژبه مګر د پخواني اصولونو لوستلو سره لوړ کړئ.',
                        url: window.location.href
                      }).catch(() => {});
                    } else {
                      navigator.clipboard.writeText(window.location.href);
                      alert('د شریکولو لینک په بریالیتوب سره کاپي شو!');
                    }
                  }}
                  className="w-full text-right flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-neutral-50 dark:hover:bg-zinc-900 text-neutral-700 dark:text-zinc-300 transition-all active:scale-[0.98] group"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-zinc-900 text-emerald-500 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                      <Bookmark className="w-4 h-4" />
                    </span>
                    <span className="text-sm font-sans font-bold">له نورو سره شریکول</span>
                  </div>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-500">لینک کاپي</span>
                </button>

                <button
                  id="menu-shortcut-rate"
                  onClick={() => {
                    alert('له ملاتړ او عالي فکربک څخه مو ډیره مننه! ستاسو نظر زمونږ د پرمختګ وسیله ده. 🌟');
                  }}
                  className="w-full text-right flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-neutral-50 dark:hover:bg-zinc-900 text-neutral-700 dark:text-zinc-300 transition-all active:scale-[0.98] group"
                >
                  <div className="flex items-center gap-3">
                    <span className="p-1.5 rounded-lg bg-yellow-50 dark:bg-zinc-900 text-yellow-500 group-hover:scale-110 group-hover:bg-yellow-500 group-hover:text-white transition-all">
                      <Award className="w-4 h-4" />
                    </span>
                    <span className="text-sm font-sans font-bold">اپلیکیشن ته ستوري ورکړل</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-yellow-550 dark:text-yellow-400">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </button>
              </div>
            </div>

            {/* Bottom Side Footer */}
            <div className="p-5 border-t border-neutral-100 dark:border-zinc-900 bg-neutral-50/50 dark:bg-zinc-900/10 flex flex-col gap-4">
              {/* Reset progress button */}
              <button
                id="reset-progress-btn"
                onClick={() => {
                  if (confirm("ایا غواړئ چې د مطالعې ټول تاریخچه او نمرې له سره صفر کړئ؟")) {
                    onResetProgress();
                    onClose();
                  }
                }}
                className="w-full px-3 py-2.5 text-xs text-rose-500 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300 bg-rose-50 hover:bg-rose-100/80 dark:bg-rose-950/20 dark:hover:bg-rose-950/40 rounded-xl transition-all flex items-center justify-center gap-2 border border-rose-100 dark:border-rose-900/50"
              >
                <RotateCcw className="w-4 h-4" />
                <span className="font-sans font-semibold">د پرمختګ له سره پیل کول</span>
              </button>

              <div className="flex flex-col items-center gap-1 text-center text-[10px] text-neutral-400 dark:text-zinc-500">
                <span className="flex items-center gap-1">
                  له ډک زړه سره پښتو د ویناوالۍ ښوونکی <Coffee className="w-3 h-3 text-emerald-500 animate-bounce" />
                </span>
                <span>نسخه دوبی ۲۰۲۶ • v1.1.0</span>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

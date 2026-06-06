/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Palette, 
  Sun, 
  Moon, 
  RefreshCw, 
  Check, 
  Calendar, 
  Sparkles, 
  Sliders, 
  BookOpen, 
  Bookmark, 
  Award,
  Zap,
  Volume2
} from 'lucide-react';
import { AppSettings, UserProgress, Topic } from '../types';

interface PremiumSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AppSettings;
  progress: Record<string, UserProgress>;
  topics: Topic[];
  onUpdateSettings: (newSettings: Partial<AppSettings>) => void;
  onResetProgress: () => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
}

export const ACCENT_PALETTE = [
  { id: 'indigo', name: 'شاهي نیلي', hex: '#4f46e5', bg: 'bg-indigo-600', text: 'text-indigo-600 hover:text-indigo-400' },
  { id: 'teal', name: 'شین زرغون', hex: '#0d9488', bg: 'bg-teal-600', text: 'text-teal-600 hover:text-teal-400' },
  { id: 'emerald', name: 'زمرود شین', hex: '#10b981', bg: 'bg-emerald-600', text: 'text-emerald-600 hover:text-emerald-400' },
  { id: 'amber', name: 'ژیړ عنبر', hex: '#f59e0b', bg: 'bg-amber-600', text: 'text-amber-600 hover:text-amber-400' },
  { id: 'rose', name: 'لاله ګلابي', hex: '#f43f5e', bg: 'bg-rose-600', text: 'text-rose-600 hover:text-rose-400' },
  { id: 'violet', name: 'بنفش', hex: '#8b5cf6', bg: 'bg-violet-600', text: 'text-violet-600 hover:text-violet-400' },
  { id: 'sky', name: 'اسمانی شین', hex: '#0ea5e9', bg: 'bg-sky-600', text: 'text-sky-600 hover:text-sky-400' },
  { id: 'orange', name: 'مالټه رنګ', hex: '#f97316', bg: 'bg-orange-500', text: 'text-orange-500 hover:text-orange-400' },
  { id: 'red', name: 'لاله سور', hex: '#ef4444', bg: 'bg-red-600', text: 'text-red-600 hover:text-red-400' },
  { id: 'fuchsia', name: 'ګل فوشیا', hex: '#d946ef', bg: 'bg-fuchsia-600', text: 'text-fuchsia-600 hover:text-fuchsia-400' },
  { id: 'cyan', name: 'روښانه ساو', hex: '#06b6d4', bg: 'bg-cyan-600', text: 'text-cyan-600 hover:text-cyan-400' },
  { id: 'lime', name: 'لیمو تازه', hex: '#84cc16', bg: 'bg-lime-600', text: 'text-lime-600 hover:text-lime-400' },
  { id: 'yellow', name: 'طلایي زیړ', hex: '#eab308', bg: 'bg-yellow-500', text: 'text-yellow-500 hover:text-yellow-400' },
  { id: 'pink', name: 'پیازي رنګ', hex: '#ec4899', bg: 'bg-pink-500', text: 'text-pink-500 hover:text-pink-400' },
  { id: 'slate', name: 'خړ کاڼی', hex: '#64748b', bg: 'bg-slate-600', text: 'text-slate-600 hover:text-slate-400' }
];

export const getAccent = (id?: string) => {
  return ACCENT_PALETTE.find(a => a.id === id) || ACCENT_PALETTE[0];
};

export default function PremiumSettings({
  isOpen,
  onClose,
  settings,
  progress,
  topics,
  onUpdateSettings,
  onResetProgress,
  theme,
  onThemeToggle
}: PremiumSettingsProps) {
  const [showConfirmReset, setShowConfirmReset] = useState(false);
  const [dailyGoal, setDailyGoal] = useState('15'); // default 15 mins daily

  if (!isOpen) return null;

  const currentAccent = getAccent(settings.themeAccent);

  // Stats derivation
  const completedProgressCount = Object.values(progress).filter(p => p.isCompleted).length;
  const inProgressCount = Object.values(progress).filter(p => p.progressPercent > 0 && p.progressPercent < 100).length;
  
  // Calculate learning score
  const totalReadPercent = Object.values(progress).reduce((acc, curr) => acc + (curr.progressPercent || 0), 0);
  const totalTopicsCount = topics.length || 1;
  const overallFinishPercent = Math.min(100, Math.round(totalReadPercent / totalTopicsCount));

  // Handle Reset with safe closure
  const triggerReset = () => {
    onResetProgress();
    setShowConfirmReset(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
        {/* Backdrop overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-xs"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className={`relative w-full max-w-md max-h-[90vh] overflow-y-auto rounded-3xl p-6 shadow-2xl border transition-all duration-300 ${
            theme === 'dark' 
              ? 'bg-zinc-950 text-white border-zinc-900' 
              : 'bg-white text-neutral-800 border-neutral-150'
          }`}
          dir="rtl"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-5 border-b pb-4 border-neutral-100 dark:border-zinc-900">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-indigo-500/10 text-indigo-500">
                <Palette className="w-5 h-5" style={{ color: currentAccent.hex }} />
              </span>
              <div>
                <h3 className="font-extrabold text-base font-sans">
                  د اپلیکیشن ډیزاین او تنظیمات
                </h3>
                <p className="text-[10px] text-neutral-400 dark:text-zinc-500 font-sans">
                  خپل رنګونه غوره کړئ او زده کړه چټکه کړئ
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full transition-colors bg-neutral-100 dark:bg-zinc-900 hover:bg-neutral-200 dark:hover:bg-zinc-800 text-neutral-500 dark:text-zinc-400"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 1. Theme Mode selection (Light/Dark fully verified) */}
          <div className="mb-6">
            <h4 className="text-xs font-bold font-sans text-neutral-400 dark:text-zinc-500 uppercase tracking-wider mb-2.5">
              د روښانتیا بڼه (موډ)
            </h4>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => theme !== 'light' && onThemeToggle()}
                className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-sm font-bold font-sans transition-all active:scale-95 ${
                  theme === 'light'
                    ? 'bg-neutral-100 border-neutral-300 text-neutral-900'
                    : 'bg-transparent border-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                <Sun className={`w-4 h-4 ${theme === 'light' ? 'text-amber-500' : ''}`} />
                <span>روښانه سپین</span>
              </button>

              <button
                onClick={() => theme !== 'dark' && onThemeToggle()}
                className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-sm font-bold font-sans transition-all active:scale-95 ${
                  theme === 'dark'
                    ? 'bg-zinc-900 border-zinc-800 text-white'
                    : 'bg-transparent border-neutral-200 text-neutral-600 hover:text-neutral-900'
                }`}
              >
                <Moon className={`w-4 h-4 ${theme === 'dark' ? 'text-indigo-400' : ''}`} />
                <span>شپه تور موډ</span>
              </button>
            </div>
          </div>

          {/* 2. Premium 15 Accent Colors Palette selection */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2.5">
              <h4 className="text-xs font-bold font-sans text-neutral-400 dark:text-zinc-500 uppercase tracking-wider">
                د اپلیکیشن عمومي رنګ (۱۵ رنګونه)
              </h4>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-500" style={{ color: currentAccent.hex, backgroundColor: `${currentAccent.hex}15` }}>
                {currentAccent.name}
              </span>
            </div>

            <div className="grid grid-cols-5 gap-3 bg-neutral-50 dark:bg-zinc-900/40 p-3.5 rounded-2xl border border-neutral-100 dark:border-zinc-900/60">
              {ACCENT_PALETTE.map((acc) => {
                const isSelected = settings.themeAccent === acc.id || (!settings.themeAccent && acc.id === 'indigo');
                return (
                  <button
                    key={acc.id}
                    onClick={() => onUpdateSettings({ themeAccent: acc.id })}
                    className="relative w-10 h-10 rounded-full flex items-center justify-center focus:outline-none transition-transform hover:scale-110 active:scale-95 shadow-sm shrink-0"
                    style={{ backgroundColor: acc.hex }}
                    title={acc.name}
                  >
                    {isSelected && (
                      <motion.div 
                        layoutId="activeAccentCircle"
                        className="absolute inset-0 rounded-full border-4 border-white dark:border-zinc-950 flex items-center justify-center"
                      >
                        <Check className="w-3.5 h-3.5 text-white stroke-[3.5]" />
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Text size tuner */}
          <div className="mb-6">
            <h4 className="text-xs font-bold font-sans text-neutral-400 dark:text-zinc-500 uppercase tracking-wider mb-2.5">
              د فاونټ غټوالی (د مطالعې متن)
            </h4>
            <div className="grid grid-cols-3 gap-2 bg-neutral-50 dark:bg-zinc-900/40 p-1.5 rounded-2xl border border-neutral-100 dark:border-zinc-900/60">
              {(['sm', 'base', 'lg'] as const).map((sz) => {
                const label = sz === 'sm' ? 'وړوکی' : sz === 'base' ? 'عادي' : 'غټ متن';
                const isSelected = settings.textSize === sz;
                return (
                  <button
                    key={sz}
                    onClick={() => onUpdateSettings({ textSize: sz })}
                    className={`p-2 rounded-xl text-xs font-bold font-sans text-center transition-all ${
                      isSelected
                        ? 'bg-white dark:bg-zinc-800 text-neutral-900 dark:text-white shadow-xs'
                        : 'text-neutral-500 hover:text-neutral-800 dark:text-zinc-400 dark:hover:text-zinc-200'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Beautiful Smart features indicators */}
          <div className="mb-6">
            <h4 className="text-xs font-bold font-sans text-neutral-400 dark:text-zinc-500 uppercase tracking-wider mb-2.5">
              ښکلي اضافي فیچرونه
            </h4>
            <div className="space-y-3">
              {/* Daily Target Setting */}
              <div className="flex items-center justify-between p-3 rounded-2xl border border-neutral-100 dark:border-zinc-900 bg-neutral-50/50 dark:bg-zinc-900/20">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-neutral-400 dark:text-zinc-500" style={{ color: currentAccent.hex }} />
                  <span className="text-xs font-extrabold font-sans">ورځنی هدف مطبوعات</span>
                </div>
                <select 
                  value={dailyGoal}
                  onChange={(e) => setDailyGoal(e.target.value)}
                  className="bg-white dark:bg-zinc-900 text-xs border border-neutral-200 dark:border-zinc-800 p-1 px-2 rounded-lg font-sans outline-none font-bold"
                >
                  <option value="10">۱۰ دقيقې</option>
                  <option value="15">۱۵ دقيقې</option>
                  <option value="25">۲۵ دقيقې (موصي)</option>
                  <option value="40">۴۰ دقيقې</option>
                </select>
              </div>
            </div>
          </div>

          {/* 5. Statistics display */}
          <div className="mb-6 bg-indigo-500/5 dark:bg-zinc-900/40 p-4 rounded-2xl border border-indigo-500/10 dark:border-zinc-900/40">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-extrabold font-sans flex items-center gap-1.5" style={{ color: currentAccent.hex }}>
                <Award className="w-4 h-4" />
                ستاسو د زده کړې کچه
              </span>
              <span className="text-xs font-mono font-bold" style={{ color: currentAccent.hex }}>
                {overallFinishPercent}% بشپړ
              </span>
            </div>

            {/* Custom mini bar */}
            <div className="h-2 w-full bg-neutral-150 dark:bg-zinc-800 rounded-full overflow-hidden mb-3">
              <div 
                className="h-full rounded-full transition-all duration-300"
                style={{ width: `${overallFinishPercent}%`, backgroundColor: currentAccent.hex }}
              />
            </div>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="bg-white/50 dark:bg-zinc-950/40 p-1.5 rounded-xl">
                <span className="text-[9px] text-neutral-450 dark:text-zinc-500 font-sans block">لوستل شوي</span>
                <span className="font-extrabold text-sm font-sans block text-emerald-500">{completedProgressCount}</span>
              </div>
              <div className="bg-white/50 dark:bg-zinc-950/40 p-1.5 rounded-xl border-x dark:border-zinc-900">
                <span className="text-[9px] text-neutral-450 dark:text-zinc-500 font-sans block">په جریان کې</span>
                <span className="font-extrabold text-sm font-sans block text-amber-500">{inProgressCount}</span>
              </div>
              <div className="bg-white/50 dark:bg-zinc-950/40 p-1.5 rounded-xl">
                <span className="text-[9px] text-neutral-450 dark:text-zinc-500 font-sans block">نمرې</span>
                <span className="font-extrabold text-sm font-sans block text-indigo-500" style={{ color: currentAccent.hex }}>
                  {completedProgressCount * 12 + inProgressCount * 4}
                </span>
              </div>
            </div>
          </div>

          {/* 6. Advanced progress reset action (localized confirmation) */}
          <div>
            {!showConfirmReset ? (
              <button
                onClick={() => setShowConfirmReset(true)}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl border border-rose-500/10 hover:border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 text-rose-500 text-xs font-bold font-sans transition-all active:scale-95"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>د مطالعې ټول معلومات پاک کړئ (ريسیټ)</span>
              </button>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-rose-500/10 border border-rose-500/20 p-4 rounded-2xl flex flex-col gap-3 text-right"
              >
                <p className="text-xs text-rose-500 font-sans leading-relaxed">
                  ایا تاسو واقعیا غواړئ د خپلې مطالعې ټول تاریخچه او پرمختګ پاک کړئ؟ دا کار بیرته نه راځي.
                </p>
                <div className="flex gap-2 justify-end">
                  <button
                    onClick={() => setShowConfirmReset(false)}
                    className="p-1 px-3 text-neutral-500 dark:text-zinc-400 text-xs font-bold font-sans rounded-lg bg-neutral-100 dark:bg-zinc-900 border"
                  >
                    نه، بیرته شه
                  </button>
                  <button
                    onClick={triggerReset}
                    className="p-1 px-3 bg-rose-600 text-white text-xs font-bold font-sans rounded-lg hover:bg-rose-700 shadow-sm"
                  >
                    هو، پاک یې کړه!
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

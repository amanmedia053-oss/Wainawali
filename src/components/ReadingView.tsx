/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, 
  Copy, 
  Share2, 
  Settings, 
  CheckCircle, 
  Heart, 
  Bookmark, 
  Check,
  Type,
  Maximize2,
  Minimize2,
  Clock
} from 'lucide-react';
import { Topic, UserProgress, AppSettings } from '../types';
import { segmentText } from '../utils/text';

// Custom clean typewriter rendering component for elegant Pashto title layouts
function TypewriterText({ text, speed = 40, delay = 0 }: { text: string; speed?: number; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setComplete(false);
    let timer: NodeJS.Timeout;
    const segments = segmentText(text);
    let index = 0;

    const startTimeout = setTimeout(() => {
      timer = setInterval(() => {
        if (index < segments.length) {
          setDisplayedText((prev) => prev + segments[index]);
          index++;
        } else {
          setComplete(true);
          clearInterval(timer);
        }
      }, speed);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (timer) clearInterval(timer);
    };
  }, [text, speed, delay]);

  return (
    <span className="inline-flex items-center">
      <span>{displayedText}</span>
      {!complete && (
        <span className="inline-block w-1 h-4 ml-0.5 bg-current animate-[pulse_0.8s_infinite] align-middle opacity-70" />
      )}
    </span>
  );
}

interface ReadingViewProps {
  topic: Topic;
  progress: UserProgress;
  onBack: () => void;
  onUpdateProgress: (topicId: string, stats: Partial<UserProgress>) => void;
  settings: AppSettings;
  onUpdateSettings: (settings: Partial<AppSettings>) => void;
}

export default function ReadingView({
  topic,
  progress,
  onBack,
  onUpdateProgress,
  settings,
  onUpdateSettings
}: ReadingViewProps) {
  const [copiedSectionIndex, setCopiedSectionIndex] = useState<number | null>(null);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  const [scrollPercentage, setScrollPercentage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const accent = settings.themeAccent || 'indigo';
  const accentStyles: Record<string, { hex: string; text: string; bg: string; border: string; bgBtn: string; bgPill: string }> = {
    indigo: { hex: '#4f46e5', text: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-zinc-900', border: 'border-indigo-500 dark:border-indigo-400/20', bgBtn: 'bg-indigo-600', bgPill: 'bg-indigo-500/15 text-indigo-500' },
    teal: { hex: '#0d9488', text: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-zinc-900', border: 'border-teal-500 dark:border-teal-400/20', bgBtn: 'bg-teal-600', bgPill: 'bg-teal-500/15 text-teal-505' },
    emerald: { hex: '#10b981', text: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-zinc-900', border: 'border-emerald-500 dark:border-emerald-400/20', bgBtn: 'bg-emerald-600', bgPill: 'bg-emerald-500/15 text-emerald-500' },
    amber: { hex: '#f59e0b', text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-zinc-900', border: 'border-amber-500 dark:border-amber-400/20', bgBtn: 'bg-amber-600', bgPill: 'bg-amber-500/15 text-amber-505' },
    rose: { hex: '#f43f5e', text: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-zinc-900', border: 'border-rose-500 dark:border-rose-400/20', bgBtn: 'bg-rose-600', bgPill: 'bg-rose-500/15 text-rose-500' },
    violet: { hex: '#8b5cf6', text: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-zinc-900', border: 'border-violet-500 dark:border-violet-400/20', bgBtn: 'bg-violet-600', bgPill: 'bg-violet-500/15 text-violet-500' },
    sky: { hex: '#0ea5e9', text: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-zinc-900', border: 'border-sky-500 dark:border-sky-400/20', bgBtn: 'bg-sky-600', bgPill: 'bg-sky-500/15 text-sky-505' },
    orange: { hex: '#f97316', text: 'text-orange-500 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-zinc-900', border: 'border-orange-500 dark:border-orange-400/20', bgBtn: 'bg-orange-600', bgPill: 'bg-orange-500/15 text-orange-500' },
    red: { hex: '#ef4444', text: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-zinc-900', border: 'border-red-500 dark:border-red-400/20', bgBtn: 'bg-red-600', bgPill: 'bg-red-500/15 text-red-500' },
    fuchsia: { hex: '#d946ef', text: 'text-fuchsia-600 dark:text-fuchsia-400', bg: 'bg-fuchsia-50 dark:bg-zinc-900', border: 'border-fuchsia-500 dark:border-fuchsia-400/20', bgBtn: 'bg-fuchsia-600', bgPill: 'bg-fuchsia-500/15 text-fuchsia-500' },
    cyan: { hex: '#06b6d4', text: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-50 dark:bg-zinc-900', border: 'border-cyan-500 dark:border-cyan-400/20', bgBtn: 'bg-cyan-600', bgPill: 'bg-cyan-500/15 text-cyan-505' },
    lime: { hex: '#84cc16', text: 'text-lime-600 dark:text-lime-400', bg: 'bg-lime-50 dark:bg-zinc-900', border: 'border-lime-500 dark:border-lime-400/20', bgBtn: 'bg-lime-600', bgPill: 'bg-lime-500/15 text-lime-500' },
    yellow: { hex: '#eab308', text: 'text-yellow-600 dark:text-yellow-405', bg: 'bg-yellow-50 dark:bg-zinc-900', border: 'border-yellow-500 dark:border-yellow-400/20', bgBtn: 'bg-yellow-600', bgPill: 'bg-yellow-500/15 text-yellow-500' },
    pink: { hex: '#ec4899', text: 'text-pink-500 dark:text-pink-400', bg: 'bg-pink-50 dark:bg-zinc-900', border: 'border-pink-500 dark:border-pink-400/20', bgBtn: 'bg-pink-600', bgPill: 'bg-pink-500/15 text-pink-505' },
    slate: { hex: '#64748b', text: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-50 dark:bg-zinc-900', border: 'border-slate-500 dark:border-slate-400/20', bgBtn: 'bg-slate-600', bgPill: 'bg-slate-500/15 text-slate-505' }
  };
  const activeStyle = accentStyles[accent] || accentStyles.indigo;

  // Monitor Scroll Progress
  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    if (scrollHeight === clientHeight) {
      setScrollPercentage(100);
      return;
    }
    const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
    const currentMax = Math.max(Math.round(scrolled), progress.progressPercent || 0);

    setScrollPercentage(Math.round(scrolled));

    // Live update progress if it exceeded previous percent
    if (currentMax > progress.progressPercent && currentMax <= 100) {
      onUpdateProgress(topic.id, {
        progressPercent: currentMax,
        isCompleted: currentMax >= 95 ? true : progress.isCompleted,
        lastReadTime: new Date().toLocaleDateString('ps-AF', { hour: '2-digit', minute: '2-digit' })
      });
    }
  };

  // Set maximum progress on first render
  useEffect(() => {
    if (progress.progressPercent === 0) {
      onUpdateProgress(topic.id, {
        progressPercent: 5, // started reading indicator
        lastReadTime: new Date().toLocaleDateString('ps-AF', { hour: '2-digit', minute: '2-digit' })
      });
    }
    // Auto trigger scroll layout updates
    setTimeout(() => {
      if (containerRef.current) {
        const { scrollHeight, clientHeight } = containerRef.current;
        if (scrollHeight <= clientHeight) {
          onUpdateProgress(topic.id, { progressPercent: 100, isCompleted: true });
        }
      }
    }, 500);
  }, [topic.id]);

  // Dynamic fallback clipboard copy helper for restrictive / iframe environments
  const fallbackCopyToClipboard = (text: string): boolean => {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      textarea.style.top = '0';
      textarea.style.left = '0';
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      return successful;
    } catch (err) {
      console.error('Fallback copy failed', err);
      return false;
    }
  };

  const copyTextToClipboard = async (text: string): Promise<boolean> => {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      return fallbackCopyToClipboard(text);
    }
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn('Navigator clipboard fail, using fallback...', err);
      return fallbackCopyToClipboard(text);
    }
  };

  // Copy helper
  const handleCopyText = (text: string, index: number) => {
    copyTextToClipboard(text).then((success) => {
      if (success) {
        setCopiedSectionIndex(index);
        setTimeout(() => setCopiedSectionIndex(null), 2000);
      }
    });
  };

  // Share helper
  const handleShare = () => {
    const shareText = `📚 *${topic.title}*\n\n${topic.content.map(c => `🔸 ${c.subtitle || ''}\n${c.body}`).join('\n\n')}\n\nسودمن معلومات په پښتو ویناوالې اپلیکیشن کې ومومئ!`;
    if (navigator.share) {
      navigator.share({
        title: topic.title,
        text: shareText
      }).catch(err => {
        // Fallback copy
        copyTextToClipboard(shareText).then(() => {
          alert("د موضوع متن کاپي شو!");
        });
      });
    } else {
      copyTextToClipboard(shareText).then(() => {
        alert("د شريکولو متن په حافظه کې کاپي شو!");
      });
    }
  };

  // Complete manually
  const handleMarkAsCompleted = () => {
    onUpdateProgress(topic.id, {
      progressPercent: 100,
      isCompleted: true,
      lastReadTime: new Date().toLocaleDateString('ps-AF', { hour: '2-digit', minute: '2-digit' })
    });
    setScrollPercentage(100);
  };

  // Toggle favorite
  const handleToggleFavorite = () => {
    onUpdateProgress(topic.id, {
      isFavorite: !progress.isFavorite
    });
  };

  // Style helper values for typography
  const getTextSizeClass = () => {
    switch (settings.textSize) {
      case 'sm': return 'text-sm';
      case 'base': return 'text-base';
      case 'lg': return 'text-lg';
      case 'xl': return 'text-xl';
      case '2xl': return 'text-2xl';
    }
  };

  const getLineHeightClass = () => {
    switch (settings.lineHeight) {
      case 'tight': return 'leading-tight';
      case 'normal': return 'leading-normal';
      case 'relaxed': return 'leading-relaxed';
      case 'loose': return 'leading-loose';
    }
  };

  const getFontFamilyClass = () => {
    switch (settings.fontFamily) {
      case 'iransans': return 'font-iransans';
      case 'lateef': return 'font-lateef';
      case 'nastaliq': return 'font-nastaliq';
    }
  };

  return (
    <div className="fixed inset-0 z-40 bg-white dark:bg-zinc-950 flex flex-col h-screen" dir="rtl">
      {/* Scroll indicator bar */}
      <div className="fixed top-0 inset-x-0 h-1 bg-neutral-100 dark:bg-zinc-900 z-50">
        <div 
          className="h-full transition-all duration-100" 
          style={{ width: `${Math.min(scrollPercentage, 100)}%`, backgroundColor: activeStyle.hex }}
        />
      </div>

      {/* Custom Reading View Header */}
      <header 
        className="flex justify-between items-center p-4 pb-3 border-b border-neutral-100 dark:border-zinc-900 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md sticky top-0 z-20"
        style={{ paddingTop: 'calc(14px + env(safe-area-inset-top, 0px))' }}
      >
        <div className="flex items-center gap-3">
          <motion.button
            id="reading-back-btn"
            onClick={onBack}
            whileHover={{ scale: 1.08, x: 2 }}
            whileTap={{ scale: 0.95 }}
            className="p-2 rounded-xl text-neutral-600 hover:text-neutral-900 dark:text-zinc-400 dark:hover:text-white bg-neutral-50 hover:bg-neutral-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-all duration-200"
          >
            <ArrowRight className="w-5 h-5" />
          </motion.button>
          
          <div>
            <span 
              className="text-[10px] font-bold px-2 py-0.5 rounded animate-pulse"
              style={{ color: activeStyle.hex, backgroundColor: `${activeStyle.hex}15` }}
            >
              {topic.categoryLabel}
            </span>
            <h2 className="text-sm font-bold text-neutral-900 dark:text-white line-clamp-1 max-w-[150px] sm:max-w-xs font-sans mt-0.5">
              {topic.title}
            </h2>
          </div>
        </div>

        {/* Toolbar controls with subtle soft micro-animations */}
        <div className="flex items-center gap-1.5">
          <motion.button
            id="fav-reading-btn"
            onClick={handleToggleFavorite}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.88, rotate: [0, -12, 12, 0] }}
            className={`p-2 rounded-xl transition-all ${
              progress.isFavorite 
                ? "bg-rose-50 dark:bg-rose-500/10 text-rose-500" 
                : "bg-neutral-50 hover:bg-neutral-100 text-neutral-400 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            }`}
            title="خوښول"
          >
            <Heart className={`w-5 h-5 transition-all ${progress.isFavorite ? 'fill-rose-500 text-rose-500 scale-102' : ''}`} />
          </motion.button>

          <motion.button
            id="share-reading-btn"
            onClick={handleShare}
            whileHover={{ scale: 1.12, rotate: 12 }}
            whileTap={{ scale: 0.88 }}
            className="p-2 rounded-xl text-neutral-500 hover:text-neutral-900 dark:text-zinc-400 dark:hover:text-white bg-neutral-50 hover:bg-neutral-100 dark:bg-zinc-900 dark:hover:bg-zinc-800 transition-all"
            title="شريکول"
          >
            <Share2 className="w-5 h-5" />
          </motion.button>

          <motion.button
            id="settings-reading-btn"
            onClick={() => setShowSettingsPanel(!showSettingsPanel)}
            whileHover={{ scale: 1.12, rotate: 45 }}
            whileTap={{ scale: 0.88 }}
            className={`p-2 rounded-xl transition-all ${
              showSettingsPanel 
                ? `${activeStyle.text}` 
                : "bg-neutral-50 hover:bg-neutral-100 text-neutral-500 dark:bg-zinc-900 dark:hover:bg-zinc-800"
            }`}
            style={{
              backgroundColor: showSettingsPanel ? `${activeStyle.hex}15` : undefined
            }}
            title="ترتیبات"
          >
            <Settings className="w-5 h-5 animate-[spin_20s_linear_infinite]" />
          </motion.button>
        </div>
      </header>

      {/* Main Content Area */}
      <div 
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-6 py-8"
      >
        <div className="max-w-2xl mx-auto flex flex-col gap-6">
          {/* Main Title Badge */}
          <div className="flex items-center gap-2 text-xs text-neutral-400 dark:text-zinc-500 font-mono mb-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-zinc-400 animate-pulse" />
              {topic.estimatedReadTime} مطالعې موده
            </span>
            <span>•</span>
            <span>لوستل شوي: {scrollPercentage}%</span>
          </div>

          <h1 
            className="text-2xl sm:text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-normal font-sans mb-4 border-r-4 pr-3"
            style={{ borderRightColor: activeStyle.hex }}
          >
            {topic.title}
          </h1>

          {/* Render Sections */}
          <div className="flex flex-col gap-6 mt-4 pb-20">
            {topic.content.map((sec, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  delay: idx * 0.12 + 0.3,
                  type: "spring",
                  stiffness: 85,
                  damping: 15
                }}
                className="group relative p-5 rounded-2xl border border-neutral-100 hover:border-indigo-150 dark:border-zinc-900/80 dark:hover:border-zinc-800 bg-neutral-50/40 dark:bg-zinc-900/40 backdrop-blur-md transition-all duration-300 shadow-xs hover:shadow-md"
              >
                {/* Actions overlaid on copy */}
                <div className="absolute top-4 left-4 flex gap-1.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 bg-neutral-200/40 dark:bg-zinc-900/60 backdrop-blur-sm p-1 rounded-lg">
                  <motion.button
                    id={`copy-sec-btn-${idx}`}
                    onClick={() => handleCopyText(`${sec.subtitle ? sec.subtitle + '\n' : ''}${sec.body}`, idx)}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.85 }}
                    className="p-1 rounded text-neutral-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-white dark:hover:bg-zinc-800 transition"
                    title="مضمون کاپي کړی"
                  >
                    {copiedSectionIndex === idx ? (
                      <Check className="w-4 h-4 text-emerald-500 animate-[bounce_0.5s_infinite]" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </motion.button>
                </div>

                {sec.subtitle && (
                  <h3 className={`text-base font-bold mb-2.5 font-sans flex items-center gap-2 ${activeStyle.text}`}>
                    <motion.span 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: idx * 0.12 + 0.3, type: 'spring' }}
                      className="w-1.5 h-1.5 rounded-full" 
                      style={{ backgroundColor: activeStyle.hex }} 
                    />
                    <span>{sec.subtitle}</span>
                  </h3>
                )}
                
                <p className={`text-neutral-700 dark:text-zinc-100 ${getTextSizeClass()} ${getLineHeightClass()} ${getFontFamilyClass()} text-right whitespace-pre-line tracking-wide opacity-95`}>
                  {sec.body}
                </p>
              </motion.div>
            ))}

            {/* Bottom Actions Frame */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-between border-t border-neutral-100 dark:border-zinc-900/80 pt-8 mt-4">
              <div className="text-right">
                <span className="text-xs text-neutral-400 dark:text-zinc-500 font-sans">
                  مقاومت وکړه او تمرین جاري ساته.
                </span>
                <p className="text-sm font-semibold text-neutral-800 dark:text-zinc-300 font-sans">
                  ته کولی شې چې لومړی درجه ویناوال شي!
                </p>
              </div>

              {progress.isCompleted ? (
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20 text-sm font-bold font-sans">
                  <CheckCircle className="w-5 h-5" />
                  <span>تاسو دا برخه لوستلې ده</span>
                </div>
              ) : (
                <button
                  id="mark-completed-btn"
                  onClick={handleMarkAsCompleted}
                  className="w-full sm:w-auto px-5 py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white rounded-xl shadow-md text-sm font-bold font-sans flex items-center justify-center gap-2 transition active:scale-95"
                >
                  <CheckCircle className="w-4 h-4 animate-bounce" />
                  <span>لوستل شول • پای ته ورسول شوه</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Settings Drawer Panel */}
      <AnimatePresence>
        {showSettingsPanel && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSettingsPanel(false)}
              className="fixed inset-0 z-30 bg-black/40 backdrop-blur-xs"
            />
            {/* Panel */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed bottom-0 inset-x-0 z-40 bg-white dark:bg-zinc-950 border-t border-neutral-200 dark:border-zinc-800 rounded-t-3xl shadow-2xl p-6"
              dir="rtl"
            >
              <div className="max-w-md mx-auto flex flex-col gap-6">
                {/* Header inside Panel */}
                <div className="flex justify-between items-center pb-2 border-b border-neutral-100 dark:border-zinc-900">
                  <span className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2 font-sans">
                    <Type className="w-4 h-4" style={{ color: activeStyle.hex }} />
                    د متن ښکلا او تنظیمات
                  </span>
                  <button
                    id="close-reading-settings"
                    onClick={() => setShowSettingsPanel(false)}
                    className="text-xs font-semibold p-1 rounded-md"
                    style={{ color: activeStyle.hex, backgroundColor: `${activeStyle.hex}15` }}
                  >
                    بیا جوړول (Reset)
                  </button>
                </div>

                {/* Font Size controls (as buttons) */}
                <div>
                  <label className="text-xs text-neutral-400 dark:text-zinc-500 mb-2 block font-sans">
                    د تورو اندازه (Text Size)
                  </label>
                  <div className="grid grid-cols-5 gap-1.5 bg-neutral-100 dark:bg-zinc-900 p-1 rounded-xl">
                    {([
                      { id: 'sm', label: 'کوچنی' },
                      { id: 'base', label: 'عادي' },
                      { id: 'lg', label: 'منځنی' },
                      { id: 'xl', label: 'غټ' },
                      { id: '2xl', label: 'ستر' }
                    ] as const).map((sz) => (
                      <button
                        key={sz.id}
                        id={`fontsize-btn-${sz.id}`}
                        onClick={() => onUpdateSettings({ textSize: sz.id })}
                        className={`py-1.5 text-xs rounded-lg transition-all ${
                          settings.textSize === sz.id
                            ? 'text-white shadow font-bold'
                            : 'text-neutral-600 dark:text-zinc-400 hover:bg-neutral-200 dark:hover:bg-zinc-800'
                        }`}
                        style={{
                          backgroundColor: settings.textSize === sz.id ? activeStyle.hex : undefined
                        }}
                      >
                        {sz.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Line Height controls */}
                <div>
                  <label className="text-xs text-neutral-400 dark:text-zinc-500 mb-2 block font-sans">
                    د کرښو واټن (Line Height)
                  </label>
                  <div className="grid grid-cols-4 gap-2 bg-neutral-100 dark:bg-zinc-900 p-1 rounded-xl">
                    {([
                      { id: 'tight', label: 'تنګ' },
                      { id: 'normal', label: 'عادي' },
                      { id: 'relaxed', label: 'خپور' },
                      { id: 'loose', label: 'لوڅ' }
                    ] as const).map((lh) => (
                      <button
                        key={lh.id}
                        id={`lineheight-btn-${lh.id}`}
                        onClick={() => onUpdateSettings({ lineHeight: lh.id })}
                        className={`py-1.5 text-xs rounded-lg transition-all ${
                          settings.lineHeight === lh.id
                            ? 'text-white shadow font-bold'
                            : 'text-neutral-600 dark:text-zinc-400 hover:bg-neutral-200 dark:hover:bg-zinc-800'
                        }`}
                        style={{
                          backgroundColor: settings.lineHeight === lh.id ? activeStyle.hex : undefined
                        }}
                      >
                        {lh.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Family controls */}
                <div>
                  <label className="text-xs text-neutral-400 dark:text-zinc-500 mb-2 block font-sans">
                    د متن لیک بڼه (Pashto Typography)
                  </label>
                  <div className="grid grid-cols-3 gap-2 bg-neutral-100 dark:bg-zinc-900 p-1 rounded-xl">
                    {([
                      { id: 'iransans', label: 'ایران سنس' },
                      { id: 'lateef', label: 'لطیف فونټ' },
                      { id: 'nastaliq', label: 'نستعلیق' }
                    ] as const).map((ff) => (
                      <button
                        key={ff.id}
                        id={`fontfamily-btn-${ff.id}`}
                        onClick={() => onUpdateSettings({ fontFamily: ff.id })}
                        className={`py-2 text-xs rounded-lg transition-all ${
                          settings.fontFamily === ff.id
                            ? 'text-white shadow font-bold'
                            : 'text-neutral-600 dark:text-zinc-400 hover:bg-neutral-200 dark:hover:bg-zinc-800'
                        }`}
                        style={{
                          backgroundColor: settings.fontFamily === ff.id ? activeStyle.hex : undefined
                        }}
                      >
                        {ff.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Close Button Panel */}
                <button
                  id="close-settings-panel"
                  onClick={() => setShowSettingsPanel(false)}
                  className="w-full py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 dark:bg-zinc-900 dark:hover:bg-zinc-800 dark:text-zinc-300 font-bold rounded-xl text-xs transition"
                >
                  بندول (Close)
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, 
  Compass, 
  Flame, 
  Award, 
  Shield, 
  ChevronLeft, 
  Search, 
  Heart, 
  Play, 
  Sliders, 
  Clock, 
  CheckCircle, 
  BookMarked 
} from 'lucide-react';
import { Topic, UserProgress } from '../types';
import TypewriterTips from './TypewriterTips';
import { tipsList } from '../data';

interface HomeViewProps {
  topics: Topic[];
  progress: Record<string, UserProgress>;
  onTopicClick: (topicId: string) => void;
  onNavigate: (tab: 'home' | 'search' | 'about') => void;
  onOpenSettings: () => void;
  themeAccent?: string;
}

export default function HomeView({
  topics,
  progress,
  onTopicClick,
  onNavigate,
  onOpenSettings,
  themeAccent
}: HomeViewProps) {
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const accent = themeAccent || 'indigo';
  const accentStyles: Record<string, { hex: string; text: string; bg: string; borderHover: string; pillBg: string; textHover: string }> = {
    indigo: { hex: '#4f46e5', text: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-zinc-900', borderHover: 'hover:border-indigo-400 dark:hover:border-indigo-500/30', pillBg: 'bg-indigo-500/15 text-indigo-500', textHover: 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400' },
    teal: { hex: '#0d9488', text: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-zinc-900', borderHover: 'hover:border-teal-400 dark:hover:border-teal-500/30', pillBg: 'bg-teal-500/15 text-teal-500', textHover: 'group-hover:text-teal-600 dark:group-hover:text-teal-400' },
    emerald: { hex: '#10b981', text: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-zinc-900', borderHover: 'hover:border-emerald-400 dark:hover:border-emerald-500/30', pillBg: 'bg-emerald-500/15 text-emerald-500', textHover: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400' },
    amber: { hex: '#f59e0b', text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-zinc-900', borderHover: 'hover:border-amber-400 dark:hover:border-amber-500/30', pillBg: 'bg-amber-500/15 text-amber-500', textHover: 'group-hover:text-amber-600 dark:group-hover:text-amber-400' },
    rose: { hex: '#f43f5e', text: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-zinc-900', borderHover: 'hover:border-rose-400 dark:hover:border-rose-500/30', pillBg: 'bg-rose-500/15 text-rose-500', textHover: 'group-hover:text-rose-600 dark:group-hover:text-rose-400' },
    violet: { hex: '#8b5cf6', text: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-zinc-900', borderHover: 'hover:border-violet-400 dark:hover:border-violet-500/30', pillBg: 'bg-violet-500/15 text-violet-500', textHover: 'group-hover:text-violet-600 dark:group-hover:text-violet-400' },
    sky: { hex: '#0ea5e9', text: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-zinc-900', borderHover: 'hover:border-sky-400 dark:hover:border-sky-500/30', pillBg: 'bg-sky-500/15 text-sky-500', textHover: 'group-hover:text-sky-600 dark:group-hover:text-sky-400' },
    orange: { hex: '#f97316', text: 'text-orange-500 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-zinc-900', borderHover: 'hover:border-orange-450 dark:hover:border-orange-500/30', pillBg: 'bg-orange-500/15 text-orange-500', textHover: 'group-hover:text-orange-500 dark:group-hover:text-orange-405' },
    red: { hex: '#ef4444', text: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-zinc-900', borderHover: 'hover:border-red-400 dark:hover:border-red-500/30', pillBg: 'bg-red-500/15 text-red-500', textHover: 'group-hover:text-red-600 dark:group-hover:text-red-400' },
    fuchsia: { hex: '#d946ef', text: 'text-fuchsia-600 dark:text-fuchsia-400', bg: 'bg-fuchsia-50 dark:bg-zinc-900', borderHover: 'hover:border-fuchsia-400 dark:hover:border-fuchsia-500/30', pillBg: 'bg-fuchsia-500/15 text-fuchsia-500', textHover: 'group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400' },
    cyan: { hex: '#06b6d4', text: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-50 dark:bg-zinc-900', borderHover: 'hover:border-cyan-400 dark:hover:border-cyan-500/30', pillBg: 'bg-cyan-500/15 text-cyan-500', textHover: 'group-hover:text-cyan-600 dark:group-hover:text-cyan-400' },
    lime: { hex: '#84cc16', text: 'text-lime-600 dark:text-lime-400', bg: 'bg-lime-50 dark:bg-zinc-900', borderHover: 'hover:border-lime-400 dark:hover:border-lime-500/30', pillBg: 'bg-lime-500/15 text-lime-500', textHover: 'group-hover:text-lime-600 dark:group-hover:text-lime-400' },
    yellow: { hex: '#eab308', text: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-zinc-900', borderHover: 'hover:border-yellow-400 dark:hover:border-yellow-500/30', pillBg: 'bg-yellow-500/15 text-yellow-500', textHover: 'group-hover:text-yellow-600 dark:group-hover:text-yellow-405' },
    pink: { hex: '#ec4899', text: 'text-pink-500 dark:text-pink-400', bg: 'bg-pink-50 dark:bg-zinc-900', borderHover: 'hover:border-pink-400 dark:hover:border-pink-500/30', pillBg: 'bg-pink-500/15 text-pink-500', textHover: 'group-hover:text-pink-650 dark:group-hover:text-pink-400' },
    slate: { hex: '#64748b', text: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-50 dark:bg-zinc-900', borderHover: 'hover:border-slate-400 dark:hover:border-slate-500/30', pillBg: 'bg-slate-500/15 text-slate-500', textHover: 'group-hover:text-slate-600 dark:group-hover:text-slate-400' }
  };
  const activeStyle = accentStyles[accent] || accentStyles.indigo;

  // Derive favorites
  const favoriteTopicIds = Object.keys(progress).filter(id => progress[id]?.isFavorite);
  
  // Choose last updated topic or first topic with > 0 and < 100 progress
  const getContinueReadingTopic = (): Topic | null => {
    const unfinished = Object.values(progress)
      .filter(p => p.progressPercent > 0 && p.progressPercent < 100)
      .sort((a, b) => b.progressPercent - a.progressPercent);

    if (unfinished.length > 0) {
      const matched = topics.find(t => t.id === unfinished[0].topicId);
      if (matched) return matched;
    }
    
    // Fallback: any topic with progress > 0
    const started = Object.values(progress).filter(p => p.progressPercent > 0);
    if (started.length > 0) {
      const matched = topics.find(t => t.id === started[0].topicId);
      if (matched) return matched;
    }

    // Default: first topic
    return topics[0] || null;
  };

  const continueTopic = getContinueReadingTopic();

  // Filter topics list
  const displayedTopics = topics.filter(topic => {
    if (showOnlyFavorites) {
      return progress[topic.id]?.isFavorite;
    }
    return true;
  });

  return (
    <div className="flex flex-col gap-6" dir="rtl">
      {/* Beautiful Action Grid Buttons inside Home page */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Button 1: Search */}
        <button
          id="home-action-search"
          onClick={() => onNavigate('search')}
          className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white hover:bg-neutral-50/50 dark:bg-zinc-900/60 dark:hover:bg-zinc-800 border border-neutral-200 dark:border-zinc-800 hover:border-indigo-500 dark:hover:border-indigo-500/40 transition-all text-center gap-2 group shadow-xs active:scale-95"
        >
          <span className="p-2.5 rounded-xl bg-indigo-50 dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
            <Search className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold text-neutral-800 dark:text-white font-sans">
            پلټنه وکړئ
          </span>
          <span className="text-[10px] text-neutral-400 dark:text-zinc-400 font-sans">موضوعات ومومئ</span>
        </button>

        {/* Button 2: Favorites toggle filter */}
        <button
          id="home-action-favs"
          onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
          className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all text-center gap-2 shadow-xs active:scale-95 ${
            showOnlyFavorites
              ? "bg-rose-50 border-rose-400 dark:bg-rose-950/40 dark:border-rose-900/60"
              : "bg-white border-neutral-200 dark:bg-zinc-900/60 dark:border-zinc-800 hover:border-indigo-500 dark:hover:border-indigo-500/40 hover:bg-neutral-50/50"
          }`}
        >
          <span className={`p-2.5 rounded-xl transition-all ${
            showOnlyFavorites
              ? "bg-rose-500 text-white"
              : "bg-rose-50 dark:bg-zinc-800 text-rose-500 dark:text-rose-400"
          }`}>
            <Heart className={`w-4 h-4 ${showOnlyFavorites ? 'fill-white' : ''}`} />
          </span>
          <span className="text-xs font-bold text-neutral-800 dark:text-white font-sans">
            خوښ شوي موضوعات
          </span>
          <span className="text-[10px] text-neutral-400 dark:text-zinc-400 font-sans">
            {showOnlyFavorites ? "د ټولو ښودل" : `${favoriteTopicIds.length} موضوعګانې`}
          </span>
        </button>

        {/* Button 3: Continue Reading */}
        <button
          id="home-action-continue"
          onClick={() => continueTopic && onTopicClick(continueTopic.id)}
          disabled={!continueTopic}
          className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white hover:bg-neutral-50/50 dark:bg-zinc-900/60 dark:hover:bg-zinc-800 border border-neutral-200 dark:border-zinc-800 hover:border-indigo-500 dark:hover:border-indigo-500/40 transition-all text-center gap-2 group shadow-xs active:scale-95 disabled:opacity-50"
        >
          <span className="p-2.5 rounded-xl bg-emerald-50 dark:bg-zinc-800 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all animate-pulse">
            <Play className="w-4 h-4 fill-current" />
          </span>
          <span className="text-xs font-bold text-neutral-800 dark:text-white font-sans">
            مطالعې ادامه
          </span>
          <span className="text-[10px] text-neutral-400 dark:text-zinc-400 font-sans line-clamp-1 max-w-[90px]">
            {continueTopic ? continueTopic.title : "هیڅ شی نشته"}
          </span>
        </button>

        {/* Button 4: Reading Settings trigger */}
        <button
          id="home-action-settings"
          onClick={onOpenSettings}
          className="flex flex-col items-center justify-center p-4 rounded-2xl bg-white hover:bg-neutral-50/50 dark:bg-zinc-900/60 dark:hover:bg-zinc-800 border border-neutral-200 dark:border-zinc-800 hover:border-indigo-500 dark:hover:border-indigo-500/40 transition-all text-center gap-2 group shadow-xs active:scale-95"
        >
          <span className="p-2.5 rounded-xl bg-neutral-100 dark:bg-zinc-800 text-neutral-700 dark:text-zinc-300 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all">
            <Sliders className="w-4 h-4" />
          </span>
          <span className="text-xs font-bold text-neutral-800 dark:text-white font-sans">
            تنظیمات
          </span>
          <span className="text-[10px] text-neutral-400 dark:text-zinc-400 font-sans">لوستلو جزیات</span>
        </button>
      </div>

      {/* Header for list layout */}
      <div className="flex justify-between items-center text-xs text-neutral-400 dark:text-zinc-500 font-mono mt-2 mb-1">
        <h3 className="font-bold text-sm text-neutral-800 dark:text-zinc-300 font-sans flex items-center gap-2">
          <BookMarked className="w-4 h-4" style={{ color: activeStyle.hex }} />
          {showOnlyFavorites ? "خوښ شوي لړلیک مطبوعات" : "د ویناوالۍ بشپړ لړلیک"}
        </h3>
        <span>تعداد: {displayedTopics.length} برخې</span>
      </div>

      {/* Main List Layout representing progress */}
      <div className="flex flex-col gap-4">
        {displayedTopics.length > 0 ? (
          displayedTopics.map((topic, index) => {
            const topicProgress = progress[topic.id]?.progressPercent || 0;
            const isCompleted = progress[topic.id]?.isCompleted || false;
            const isFavorite = progress[topic.id]?.isFavorite || false;

            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => onTopicClick(topic.id)}
                className={`group relative cursor-pointer overflow-hidden border border-neutral-100 dark:border-zinc-900/10 bg-white dark:bg-zinc-900/20 p-5 rounded-2xl transition-all duration-300 shadow-xs ${activeStyle.borderHover}`}
              >
                {/* RTL full background progress bar bar with beautiful animation */}
                {topicProgress > 0 && (
                  <motion.div
                    className="absolute top-0 right-0 bottom-0 z-0 h-full"
                    style={{ 
                      originX: 1,
                      backgroundColor: isCompleted ? 'rgba(16, 185, 129, 0.06)' : `${activeStyle.hex}10`
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${topicProgress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                )}

                {/* Content wrapper with higher z-index */}
                <div className="relative z-10 flex flex-col gap-3">
                  {/* Top section: Category, Favorite icon, Progress badge */}
                  <div className="flex justify-between items-center w-full">
                    <span 
                      className="text-[10px] font-bold px-2 py-0.5 rounded font-sans"
                      style={{ 
                        color: activeStyle.hex, 
                        backgroundColor: `${activeStyle.hex}15` 
                      }}
                    >
                      {topic.categoryLabel}
                    </span>
                    <div className="flex items-center gap-2">
                      {isCompleted ? (
                        <span className="p-1 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center shrink-0" title="بشپړ شوی">
                          <CheckCircle className="w-3.5 h-3.5" />
                        </span>
                      ) : topicProgress > 0 ? (
                        <span 
                          className="text-[10px] font-bold font-sans px-2 py-0.5 rounded-md"
                          style={{ 
                            color: activeStyle.hex, 
                            backgroundColor: `${activeStyle.hex}15` 
                          }}
                        >
                          {topicProgress}% لوستل شوی
                        </span>
                      ) : null}
                      {isFavorite && (
                        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                      )}
                    </div>
                  </div>

                  {/* Middle section: Title, description, and chevron */}
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex-1 min-w-0 text-right">
                      <h4 className={`text-base font-extrabold text-neutral-900 dark:text-white line-clamp-1 transition-colors font-sans ${activeStyle.textHover}`}>
                        {topic.title}
                      </h4>
                      <p className="text-xs text-neutral-500 dark:text-zinc-300 line-clamp-1 mt-1 font-sans">
                        {topic.description}
                      </p>
                    </div>

                    <span className={`p-1.5 rounded-full bg-neutral-50 dark:bg-zinc-800 text-neutral-400 dark:text-zinc-500 ${activeStyle.textHover} group-hover:-translate-x-1.5 transition-all`}>
                      <ChevronLeft className="w-5 h-5" />
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="py-16 flex flex-col items-center justify-center text-center border border-dashed border-neutral-200 dark:border-zinc-900 rounded-3xl bg-neutral-50/10">
            <Heart className="w-12 h-12 text-rose-300 dark:text-zinc-800 fill-transparent mb-3 animate-bounce" />
            <h4 className="text-sm font-bold text-neutral-700 dark:text-zinc-300 font-sans">
              هیڅ خوښ شوي موضوع نشته
            </h4>
            <p className="text-xs text-neutral-400 dark:text-zinc-500 max-w-xs px-4 mt-1 font-sans">
              کله چې د مطالعې د لوستلو مخ خلاصه کړئ، هلته په پورتنۍ برخه کې د زړه ايکن کیکاږئ ترڅو دلته هم مړ شي!
            </p>
            <button
              id="show-all-topics-btn"
              onClick={() => setShowOnlyFavorites(false)}
              className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold font-sans hover:bg-indigo-500 transition-all active:scale-95"
            >
              د ټولو پرانیستل
            </button>
          </div>
        )}
      </div>

      {/* Typewriter Daily Tips below Topics List */}
      <TypewriterTips themeAccent={themeAccent} tips={tipsList} />
    </div>
  );
}

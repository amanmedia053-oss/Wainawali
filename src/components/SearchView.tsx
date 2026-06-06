/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Flame, Award, BookOpen, Compass, ChevronLeft, ShieldCheck, Heart, CheckCircle } from 'lucide-react';
import { Topic, UserProgress } from '../types';

interface SearchViewProps {
  topics: Topic[];
  progress: Record<string, UserProgress>;
  onTopicClick: (topicId: string) => void;
  themeAccent?: string;
}

export default function SearchView({ topics, progress, onTopicClick, themeAccent }: SearchViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const accent = themeAccent || 'indigo';
  const accentStyles: Record<string, { hex: string; text: string; bg: string; borderHover: string; pillBg: string; textHover: string; bgBtnBorder: string }> = {
    indigo: { hex: '#4f46e5', text: 'text-indigo-600 dark:text-indigo-400', bg: 'bg-indigo-50 dark:bg-zinc-900', borderHover: 'hover:border-indigo-400 dark:hover:border-indigo-500/30', pillBg: 'bg-indigo-500/15 text-indigo-505', textHover: 'group-hover:text-indigo-600 dark:group-hover:text-indigo-400', bgBtnBorder: 'focus:border-indigo-500 focus:ring-indigo-500/10 dark:focus:border-indigo-500' },
    teal: { hex: '#0d9488', text: 'text-teal-600 dark:text-teal-400', bg: 'bg-teal-50 dark:bg-zinc-900', borderHover: 'hover:border-teal-400 dark:hover:border-teal-500/30', pillBg: 'bg-teal-500/15 text-teal-500', textHover: 'group-hover:text-teal-600 dark:group-hover:text-teal-400', bgBtnBorder: 'focus:border-teal-500 focus:ring-teal-500/10 dark:focus:border-teal-500' },
    emerald: { hex: '#10b981', text: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-zinc-900', borderHover: 'hover:border-emerald-400 dark:hover:border-emerald-500/30', pillBg: 'bg-emerald-500/15 text-emerald-500', textHover: 'group-hover:text-emerald-600 dark:group-hover:text-emerald-400', bgBtnBorder: 'focus:border-emerald-500 focus:ring-emerald-500/10 dark:focus:border-emerald-500' },
    amber: { hex: '#f59e0b', text: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-zinc-900', borderHover: 'hover:border-amber-400 dark:hover:border-amber-500/30', pillBg: 'bg-amber-500/15 text-amber-500', textHover: 'group-hover:text-amber-600 dark:group-hover:text-amber-400', bgBtnBorder: 'focus:border-amber-500 focus:ring-amber-500/10 dark:focus:border-amber-500' },
    rose: { hex: '#f43f5e', text: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-zinc-900', borderHover: 'hover:border-rose-400 dark:hover:border-rose-500/30', pillBg: 'bg-rose-500/15 text-rose-500', textHover: 'group-hover:text-rose-600 dark:group-hover:text-rose-400', bgBtnBorder: 'focus:border-rose-500 focus:ring-rose-500/10 dark:focus:border-rose-500' },
    violet: { hex: '#8b5cf6', text: 'text-violet-600 dark:text-violet-400', bg: 'bg-violet-50 dark:bg-zinc-900', borderHover: 'hover:border-violet-400 dark:hover:border-violet-500/30', pillBg: 'bg-violet-500/15 text-violet-500', textHover: 'group-hover:text-violet-600 dark:group-hover:text-violet-400', bgBtnBorder: 'focus:border-violet-500 focus:ring-violet-500/10 dark:focus:border-violet-500' },
    sky: { hex: '#0ea5e9', text: 'text-sky-600 dark:text-sky-400', bg: 'bg-sky-50 dark:bg-zinc-900', borderHover: 'hover:border-sky-400 dark:hover:border-sky-500/30', pillBg: 'bg-sky-500/15 text-sky-505', textHover: 'group-hover:text-sky-600 dark:group-hover:text-sky-400', bgBtnBorder: 'focus:border-sky-500 focus:ring-sky-500/10 dark:focus:border-sky-500' },
    orange: { hex: '#f97316', text: 'text-orange-500 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-zinc-900', borderHover: 'hover:border-orange-450 dark:hover:border-orange-500/30', pillBg: 'bg-orange-500/15 text-orange-500', textHover: 'group-hover:text-orange-500 dark:group-hover:text-orange-405', bgBtnBorder: 'focus:border-orange-500 focus:ring-orange-500/10 dark:focus:border-orange-500' },
    red: { hex: '#ef4444', text: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-zinc-900', borderHover: 'hover:border-red-400 dark:hover:border-red-500/30', pillBg: 'bg-red-500/15 text-red-500', textHover: 'group-hover:text-red-600 dark:group-hover:text-red-400', bgBtnBorder: 'focus:border-red-500 focus:ring-red-500/10 dark:focus:border-red-500' },
    fuchsia: { hex: '#d946ef', text: 'text-fuchsia-600 dark:text-fuchsia-400', bg: 'bg-fuchsia-50 dark:bg-zinc-900', borderHover: 'hover:border-fuchsia-400 dark:hover:border-fuchsia-500/30', pillBg: 'bg-fuchsia-500/15 text-fuchsia-500', textHover: 'group-hover:text-fuchsia-600 dark:group-hover:text-fuchsia-400', bgBtnBorder: 'focus:border-fuchsia-500 focus:ring-fuchsia-500/10 dark:focus:border-fuchsia-500' },
    cyan: { hex: '#06b6d4', text: 'text-cyan-600 dark:text-cyan-400', bg: 'bg-cyan-50 dark:bg-zinc-900', borderHover: 'hover:border-cyan-400 dark:hover:border-cyan-500/30', pillBg: 'bg-cyan-500/15 text-cyan-500', textHover: 'group-hover:text-cyan-600 dark:group-hover:text-cyan-400', bgBtnBorder: 'focus:border-cyan-500 focus:ring-cyan-500/10 dark:focus:border-cyan-500' },
    lime: { hex: '#84cc16', text: 'text-lime-600 dark:text-lime-400', bg: 'bg-lime-50 dark:bg-zinc-900', borderHover: 'hover:border-lime-400 dark:hover:border-lime-500/30', pillBg: 'bg-lime-500/15 text-lime-500', textHover: 'group-hover:text-lime-600 dark:group-hover:text-lime-400', bgBtnBorder: 'focus:border-lime-500 focus:ring-lime-500/10 dark:focus:border-lime-500' },
    yellow: { hex: '#eab308', text: 'text-yellow-600 dark:text-yellow-405', bg: 'bg-yellow-50 dark:bg-zinc-900', borderHover: 'hover:border-yellow-400 dark:hover:border-yellow-500/30', pillBg: 'bg-yellow-500/15 text-yellow-500', textHover: 'group-hover:text-yellow-600 dark:group-hover:text-yellow-405', bgBtnBorder: 'focus:border-yellow-500 focus:ring-yellow-500/10 dark:focus:border-yellow-500' },
    pink: { hex: '#ec4899', text: 'text-pink-500 dark:text-pink-400', bg: 'bg-pink-50 dark:bg-zinc-900', borderHover: 'hover:border-pink-400 dark:hover:border-pink-500/30', pillBg: 'bg-pink-500/15 text-pink-500', textHover: 'group-hover:text-pink-650 dark:group-hover:text-pink-400', bgBtnBorder: 'focus:border-pink-500 focus:ring-pink-500/10 dark:focus:border-pink-500' },
    slate: { hex: '#64748b', text: 'text-slate-600 dark:text-slate-400', bg: 'bg-slate-50 dark:bg-zinc-900', borderHover: 'hover:border-slate-400 dark:hover:border-slate-500/30', pillBg: 'bg-slate-500/15 text-slate-505', textHover: 'group-hover:text-slate-600 dark:group-hover:text-slate-400', bgBtnBorder: 'focus:border-slate-500 focus:ring-slate-500/10 dark:focus:border-slate-500' }
  };
  const activeStyle = accentStyles[accent] || accentStyles.indigo;

  // Categories helper
  const categories = [
    { id: 'all', label: 'ټول مینو', count: topics.length },
    { id: 'definition', label: 'تعریفونه', count: topics.filter(t => t.category === 'definition').length },
    { id: 'principles', label: 'اصول', count: topics.filter(t => t.category === 'principles').length },
    { id: 'exercises', label: 'تمرینونه', count: topics.filter(t => t.category === 'exercises').length },
    { id: 'traits', label: 'ځانګړتیاوې', count: topics.filter(t => t.category === 'traits').length },
  ];

  // Filtering + Searching logic
  const filteredTopics = useMemo(() => {
    return topics.filter((topic) => {
      // Category filter
      if (selectedCategory !== 'all' && topic.category !== selectedCategory) {
        return false;
      }
      // Search matching titles, descriptions, or content body
      if (!searchQuery.trim()) return true;
      const query = searchQuery.toLowerCase();
      
      const matchTitle = topic.title.toLowerCase().includes(query);
      const matchDesc = topic.description.toLowerCase().includes(query);
      const matchContent = topic.content.some(
        (sec) => 
          (sec.subtitle?.toLowerCase().includes(query) || false) || 
          sec.body.toLowerCase().includes(query)
      );

      return matchTitle || matchDesc || matchContent;
    });
  }, [topics, searchQuery, selectedCategory]);

  return (
    <div className="flex flex-col gap-6" dir="rtl">
      {/* Intro Header */}
      <div>
        <h2 className="text-xl font-extrabold text-neutral-900 dark:text-white font-sans flex items-center gap-2">
          <span className="p-1 rounded-lg bg-pink-500/10 text-pink-500">
            <Search className="w-5 h-5" />
          </span>
          د ویناوالۍ پلټنه
        </h2>
        <p className="text-xs text-neutral-500 dark:text-zinc-400 font-sans mt-1">
          د مطالعې موضوعات، تمرينونه يا ځانګړي اصول سمدستي ومومئ.
        </p>
      </div>

      {/* Input Field Frame */}
      <div className="relative">
        <input
          id="search-input-field"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="د کلیمې پلټنه وکړئ... (مثلاً: تمرین، ویره، اعتماد)"
          className={`w-full h-12 pr-11 pl-4 rounded-xl border border-neutral-200 bg-white outline-none text-sm dark:bg-zinc-900 dark:border-zinc-800 text-neutral-800 dark:text-white font-sans transition-all focus:ring-4 ${activeStyle.bgBtnBorder}`}
        />
        <Search className="absolute right-4 top-3.5 w-5 h-5 text-neutral-400 dark:text-zinc-500 pointer-events-none" />
        
        {searchQuery && (
          <button
            id="clear-search-btn"
            onClick={() => setSearchQuery('')}
            className="absolute left-3 top-3 px-2 py-1 rounded bg-neutral-100 hover:bg-neutral-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs text-neutral-500 dark:text-zinc-400 font-sans"
          >
            پاکول
          </button>
        )}
      </div>

      {/* Categories Horizontal Scroll Chips */}
      <div className="flex gap-2.5 overflow-x-auto pb-1 no-scrollbar scroll-smooth" dir="rtl">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              id={`search-chip-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs rounded-xl font-sans font-semibold transition-all shrink-0 border ${
                isActive
                  ? 'border-transparent text-white shadow-md'
                  : 'bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-850'
              }`}
              style={{
                backgroundColor: isActive ? activeStyle.hex : undefined,
                boxShadow: isActive ? `0 4px 12px ${activeStyle.hex}25` : undefined
              }}
            >
              {cat.label} ({cat.count})
            </button>
          );
        })}
      </div>

      {/* Results Title count */}
      <div className="flex justify-between items-center text-xs text-neutral-500 dark:text-zinc-400 font-sans border-b border-neutral-100 dark:border-zinc-900 pb-2">
        <span>موندل شوي موضوعات:</span>
        <span 
          className="font-bold px-2 py-0.5 rounded-full"
          style={{
            color: activeStyle.hex,
            backgroundColor: `${activeStyle.hex}15`
          }}
        >
          {filteredTopics.length} برخې
        </span>
      </div>

      {/* Results Dynamic list */}
      <div className="flex flex-col gap-3.5">
        {filteredTopics.length > 0 ? (
          filteredTopics.map((topic, idx) => {
            const topicProgress = progress[topic.id]?.progressPercent || 0;
            const isCompleted = progress[topic.id]?.isCompleted || false;
            const isFavorite = progress[topic.id]?.isFavorite || false;

            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => onTopicClick(topic.id)}
                className={`group relative cursor-pointer overflow-hidden border border-neutral-100 dark:border-zinc-900/10 bg-white dark:bg-zinc-900/20 p-4.5 rounded-2xl transition-all duration-300 flex justify-between items-center gap-4 shadow-xs ${activeStyle.borderHover}`}
              >
                {/* RTL full background progress bar with beautiful animation */}
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
                <div className="relative z-10 flex-1 min-w-0 flex items-center justify-between gap-4">
                  {/* Right block: Icon & Text Info (In Pashto RTL) */}
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <span 
                      className="w-11 h-11 rounded-xl flex items-center justify-center transition-all group-hover:scale-110"
                      style={{ 
                        color: activeStyle.hex, 
                        backgroundColor: `${activeStyle.hex}12` 
                      }}
                    >
                      {topic.category === 'definition' && <BookOpen className="w-5 h-5" />}
                      {topic.category === 'principles' && <Compass className="w-5 h-5" />}
                      {topic.category === 'exercises' && <Flame className="w-5 h-5" />}
                      {topic.category === 'traits' && <Award className="w-5 h-5" />}
                    </span>

                    <div className="flex-1 min-w-0 text-right">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className={`text-sm font-bold text-neutral-800 dark:text-white font-sans line-clamp-1 transition-colors ${activeStyle.textHover}`}>
                          {topic.title}
                        </h3>
                        {isFavorite && <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />}
                        {isCompleted ? (
                          <span className="p-1 rounded-full bg-emerald-500/15 text-emerald-500 flex items-center justify-center shrink-0" title="بشپړ شوی">
                            <CheckCircle className="w-3.5 h-3.5" />
                          </span>
                        ) : topicProgress > 0 ? (
                          <span 
                            className="text-[10px] px-1.5 rounded font-bold font-sans"
                            style={{ 
                              color: activeStyle.hex, 
                              backgroundColor: `${activeStyle.hex}12` 
                            }}
                          >
                            {topicProgress}% لوستل شوی
                          </span>
                        ) : null}
                      </div>
                      
                      <p className="text-xs text-neutral-500 dark:text-zinc-300 font-sans line-clamp-1 mt-0.5">
                        {topic.description}
                      </p>
                    </div>
                  </div>

                  {/* Left block: Indicator Arrow */}
                  <div className={`shrink-0 text-neutral-300 dark:text-zinc-700 transition-all group-hover:-translate-x-1.5 ${activeStyle.textHover}`}>
                    <ChevronLeft className="w-5 h-5" />
                  </div>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="py-12 flex flex-col items-center text-center justify-center border border-dashed border-neutral-200 dark:border-zinc-800 rounded-3xl bg-neutral-50/20 dark:bg-transparent">
            <Search className="w-12 h-12 text-neutral-300 dark:text-zinc-700 mb-3 animate-pulse" />
            <h3 className="text-sm font-bold text-neutral-700 dark:text-zinc-300 font-sans">
              هیڅ موضوع ونه موندل شوه
            </h3>
            <p className="text-xs text-neutral-400 dark:text-zinc-500 font-sans mt-1 max-w-xs">
              ستاسو د پلټنې کلمې لپاره بیا هڅه وکړئ یا لاندني لنډ فلټرونه بدل کړئ.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

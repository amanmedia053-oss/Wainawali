/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Mic, 
  Compass, 
  Flame, 
  Shield, 
  Award, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { onboardingSlides } from '../data';
import { OnboardingSlide } from '../types';

interface OnboardingProps {
  onComplete: () => void;
  theme?: 'light' | 'dark';
}

// Map string names to Lucide icon components
const iconMap: Record<string, React.ComponentType<any>> = {
  Mic,
  Compass,
  Flame,
  Shield,
  Award,
  Sparkles,
};

export default function Onboarding({ onComplete, theme = 'light' }: OnboardingProps) {
  const [showSplash, setShowSplash] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNext = () => {
    if (currentSlide < onboardingSlides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const slide: OnboardingSlide = onboardingSlides[currentSlide];
  const IconComponent = iconMap[slide.iconName] || BookOpen;

  if (showSplash) {
    return (
      <div className={`fixed inset-0 z-50 flex flex-col justify-between p-6 overflow-hidden transition-colors duration-500 ${
        theme === 'dark' ? 'bg-zinc-950 text-white' : 'bg-neutral-50 text-neutral-800'
      }`} dir="rtl">
        {/* Abstract glowing background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.12, 0.22, 0.12],
              rotate: [0, 90, 0] 
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute -top-40 -right-40 w-96 h-96 rounded-full blur-3xl ${
              theme === 'dark' ? 'bg-indigo-600/20' : 'bg-indigo-500/10'
            }`} 
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.08, 0.18, 0.08],
              rotate: [0, -90, 0] 
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            className={`absolute -bottom-40 -left-40 w-96 h-96 rounded-full blur-3xl ${
              theme === 'dark' ? 'bg-emerald-600/20' : 'bg-emerald-500/10'
            }`} 
          />
        </div>

        {/* Top bar with beautiful logo & theme badge */}
        <div className="relative z-10 flex justify-between items-center mt-4">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/20">
              <BookOpen className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className={`text-xs font-bold tracking-wider font-mono ${
              theme === 'dark' ? 'text-zinc-400' : 'text-neutral-500'
            }`}>
              ځانګړی خپرول • د ویناوالۍ لارښود
            </span>
          </div>
        </div>

        {/* Central Brand Frame */}
        <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center max-w-sm mx-auto px-4">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="relative mb-8"
          >
            {/* Multi-layered animated ring */}
            <motion.div 
              animate={{ scale: [1, 1.15, 1], opacity: [0.35, 0, 0.35] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute inset-x-[-15px] inset-y-[-15px] rounded-full border border-indigo-500/40 dark:border-indigo-400/30 animate-pulse"
            />
            <motion.div 
              animate={{ scale: [1.15, 1, 1.15], opacity: [0.15, 0, 0.15] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute inset-x-[-30px] inset-y-[-30px] rounded-full border border-emerald-500/25"
            />

            <div className={`w-36 h-36 rounded-[2.2rem] bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-500 flex items-center justify-center shadow-2xl relative ${
              theme === 'dark' ? 'shadow-indigo-500/25 border border-white/10' : 'shadow-indigo-500/15 border border-neutral-100'
            }`}>
              <Mic className="w-16 h-16 text-white drop-shadow-lg" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                className="absolute inset-1 rounded-[2rem] border border-white/10 border-dashed"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 font-sans leading-relaxed ${
              theme === 'dark' ? 'text-white' : 'text-neutral-905'
            }`}>
              د ويناوالۍ لارښود ته ښه راغلاست
            </h1>
            
            <p className={`text-sm leading-relaxed mb-6 font-sans max-w-xs ${
              theme === 'dark' ? 'text-zinc-300' : 'text-neutral-600'
            }`}>
              په مجمع او مجلس کي بې ویرې او ډاډه وغږيږئ! ستاسو د خبرو او غږ په ځواک سره د زړونو د تسخیرولو نوې او اسانه زده کړه.
            </p>
          </motion.div>
        </div>

        {/* Action Button & Base Info */}
        <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center gap-4 mb-4">
          <motion.button
            id="start-onboard-arrow-btn"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowSplash(false)}
            className="w-full h-12 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-bold text-base shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2.5 group transition-all duration-300 active:scale-[0.98]"
          >
            <span>سفر پیل کړئ</span>
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </motion.button>
          
          <span className={`text-[10px] tracking-wide font-mono opacity-60 ${
            theme === 'dark' ? 'text-zinc-500' : 'text-neutral-450'
          }`}>
            نسخه 4.1.0 • د بیان هنر او جرأت
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-50 flex flex-col justify-between overflow-hidden font-sans select-none transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-zinc-950 text-white' 
        : 'bg-neutral-50 text-neutral-850'
    }`} dir="rtl">
      {/* Dynamic background glow */}
      <div className={`absolute inset-x-0 top-0 h-96 bg-gradient-to-b blur-3xl ${
        theme === 'dark'
          ? 'from-indigo-500/10 via-purple-500/5 to-transparent'
          : 'from-indigo-500/8 via-teal-500/4 to-transparent'
      }`} />

      {/* Top Header Controls */}
      <div className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
          <span className={`text-xs font-mono tracking-wider ${
            theme === 'dark' ? 'text-zinc-400' : 'text-neutral-500'
          }`}>ښوونکی ایپ • د پیل مینو</span>
        </div>
        
        {currentSlide < onboardingSlides.length - 1 && (
          <button 
            id="skip-onboarding-btn"
            onClick={onComplete}
            className={`text-xs transition-all px-3.5 py-1.5 rounded-full border ${
              theme === 'dark'
                ? 'text-zinc-400 hover:text-white bg-zinc-900/40 hover:bg-zinc-900 border-zinc-800'
                : 'text-neutral-600 hover:text-neutral-900 bg-neutral-200/50 hover:bg-neutral-200/80 border-neutral-200'
            }`}
          >
            تېرېدل (Skip)
          </button>
        )}
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 max-w-md mx-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 80, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -80, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            className="w-full flex flex-col items-center text-center"
          >
            {/* Visual Frame */}
            <div className={`w-32 h-32 rounded-3xl bg-gradient-to-tr ${slide.bgColor} flex items-center justify-center shadow-xl shadow-indigo-500/15 ${
              theme === 'dark' ? 'border border-white/10' : 'border border-neutral-100'
            } mb-8 relative group`}>
              <div className="absolute inset-0 rounded-3xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity blur" />
              <motion.div
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
              >
                <IconComponent className="w-16 h-16 text-white drop-shadow-md" />
              </motion.div>
            </div>

            {/* Slide Title */}
            <h1 className={`text-2xl font-bold tracking-tight mb-4 leading-normal font-sans ${
              theme === 'dark' ? 'text-white' : 'text-neutral-900'
            }`}>
              {slide.title}
            </h1>

            {/* Slide Description */}
            <p className={`text-sm leading-relaxed font-sans max-w-xs ${
              theme === 'dark' ? 'text-zinc-300' : 'text-neutral-600'
            }`}>
              {slide.description}
            </p>

            <span className={`mt-5 text-[11px] font-mono px-2.5 py-0.5 rounded-full ${
              theme === 'dark'
                ? 'text-indigo-400 bg-indigo-500/10'
                : 'text-indigo-600 bg-indigo-50'
            }`}>
              صفحه {currentSlide + 1} له {onboardingSlides.length} څخه
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Actions Frame */}
      <div className="relative z-10 p-6 max-w-md mx-auto w-full flex flex-col gap-6">
        {/* Progress Dots Indicator */}
        <div className="flex justify-center gap-2" dir="ltr">
          {onboardingSlides.map((_, idx) => (
            <div
              key={idx}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentSlide 
                  ? "w-7 bg-indigo-500" 
                  : theme === 'dark'
                    ? "w-2 bg-zinc-800"
                    : "w-2 bg-neutral-200"
              }`}
            />
          ))}
        </div>

        {/* Buttons Controls */}
        <div className="flex gap-4 items-center">
          {/* Back Button */}
          {currentSlide > 0 ? (
            <button
              id="back-slide-btn"
              onClick={handlePrev}
              className={`flex items-center justify-center w-12 h-12 rounded-2xl border transition-colors ${
                theme === 'dark'
                  ? 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-300'
                  : 'bg-white border-neutral-200 hover:bg-neutral-100 text-neutral-650'
              }`}
              title="شا ته"
            >
              <ArrowRight className="w-5 h-5 pointer-events-none" />
            </button>
          ) : (
            <div className="w-12 h-12" /> // Spacer
          )}

          {/* Action Button */}
          <button
            id="next-slide-btn"
            onClick={handleNext}
            className={`flex-1 h-12 rounded-2xl flex items-center justify-center gap-2 font-semibold text-sm transition-all active:scale-[0.98] ${
              currentSlide === onboardingSlides.length - 1
                ? "bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 shadow-lg shadow-indigo-600/30 text-white"
                : theme === 'dark'
                  ? "bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white"
                  : "bg-white border border-neutral-200 hover:bg-neutral-100 text-neutral-800 shadow-sm"
            }`}
          >
            {currentSlide === onboardingSlides.length - 1 ? (
              <>
                <span>ایپ شروع کړئ</span>
                <Sparkles className="w-4 h-4" />
              </>
            ) : (
              <>
                <span>بل مخ</span>
                <ArrowLeft className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

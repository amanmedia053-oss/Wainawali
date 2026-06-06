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

export default function Onboarding({ onComplete }: OnboardingProps) {
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

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-between bg-zinc-950 text-white overflow-hidden font-sans select-none" dir="rtl">
      {/* Dynamic background glow */}
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-indigo-500/10 via-purple-500/5 to-transparent blur-3xl" />

      {/* Top Header Controls */}
      <div className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          <span className="text-xs font-mono text-zinc-400 tracking-wider">ښوونکی ایپ • Onboarding</span>
        </div>
        
        {currentSlide < onboardingSlides.length - 1 && (
          <button 
            id="skip-onboarding-btn"
            onClick={onComplete}
            className="text-xs text-zinc-400 hover:text-white transition-all bg-zinc-900/40 hover:bg-zinc-900 px-3.5 py-1.5 rounded-full border border-zinc-800"
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
            <div className={`w-32 h-32 rounded-3xl bg-gradient-to-tr ${slide.bgColor} flex items-center justify-center shadow-xl shadow-indigo-500/10 border border-white/10 mb-8 relative group`}>
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
            <h1 className="text-2xl font-bold tracking-tight text-white mb-4 leading-normal font-sans">
              {slide.title}
            </h1>

            {/* Slide Description */}
            <p className="text-sm text-zinc-300 leading-relaxed font-sans max-w-xs">
              {slide.description}
            </p>

            <span className="mt-4 text-[11px] font-mono text-indigo-400/80 bg-indigo-500/10 px-2 rounded-md">
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
                  : "w-2 bg-zinc-800"
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
              className="flex items-center justify-center w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-300 transition-colors"
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
            className={`flex-1 h-12 rounded-2xl flex items-center justify-center gap-2 font-semibold text-sm transition-all ${
              currentSlide === onboardingSlides.length - 1
                ? "bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 shadow-lg shadow-indigo-600/30 text-white"
                : "bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-white"
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

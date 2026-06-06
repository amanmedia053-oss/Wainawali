/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Onboarding from './components/Onboarding';
import Toolbar from './components/Toolbar';
import Sidebar from './components/Sidebar';
import BottomNavigation from './components/BottomNavigation';
import HomeView from './components/HomeView';
import SearchView from './components/SearchView';
import AboutView from './components/AboutView';
import ReadingView from './components/ReadingView';
import PremiumSettings from './components/PremiumSettings';
import { appTopics } from './data';
import { UserProgress, AppSettings } from './types';
import { App as CapApp } from '@capacitor/app';
import { StatusBar as CapStatusBar, Style as CapStatusStyle } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';
import { LogOut } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  // --- States ---
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<boolean>(() => {
    return localStorage.getItem('onboarding_completed') === 'true';
  });

  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'about'>('home');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('app_theme');
    return (saved === 'dark' || saved === 'light') ? saved : 'dark';
  });

  const [progress, setProgress] = useState<Record<string, UserProgress>>(() => {
    const saved = localStorage.getItem('user_reading_progress');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return {}; }
    }
    return {};
  });

  const [activeTopicId, setActiveTopicId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isPremiumSettingsOpen, setIsPremiumSettingsOpen] = useState(false);
  const [showExitDialog, setShowExitDialog] = useState(false);

  const [settings, setSettings] = useState<AppSettings>(() => {
    const saved = localStorage.getItem('app_reading_settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (!parsed.themeAccent) parsed.themeAccent = 'indigo';
        return parsed;
      } catch (e) { /* ignore */ }
    }
    return {
      textSize: 'base',
      lineHeight: 'relaxed',
      fontFamily: 'iransans',
      theme: 'dark',
      themeAccent: 'indigo'
    };
  });

  // --- Effects ---
  // Sync Theme
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('app_theme', theme);
  }, [theme]);

  // Sync Progress to LocalStorage
  useEffect(() => {
    localStorage.setItem('user_reading_progress', JSON.stringify(progress));
  }, [progress]);

  // Sync Settings to LocalStorage
  useEffect(() => {
    localStorage.setItem('app_reading_settings', JSON.stringify(settings));
  }, [settings]);

  // Capacitor Status Bar & Android Hardware Back Button Handler
  useEffect(() => {
    // 1. Safe StatusBar Styling for Capacitor Native App
    if (Capacitor.isNativePlatform()) {
      CapStatusBar.setOverlaysWebView({ overlay: true })
        .then(() => {
          CapStatusBar.setStyle({
            style: theme === 'dark' ? CapStatusStyle.Dark : CapStatusStyle.Light
          }).catch(err => console.log('StatusBar setStyle error:', err));
        })
        .catch(err => console.log('StatusBar overlaysWebView error:', err));
    }
  }, [theme]);

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    // 2. Hardware Back Button routing hookup
    const backListenerPromise = CapApp.addListener('backButton', () => {
      if (activeTopicId !== null) {
        setActiveTopicId(null);
      } else if (isSidebarOpen) {
        setIsSidebarOpen(false);
      } else if (isPremiumSettingsOpen) {
        setIsPremiumSettingsOpen(false);
      } else if (activeTab !== 'home') {
        setActiveTab('home');
      } else {
        // Safe check for dialog state
        setShowExitDialog(true);
      }
    });

    return () => {
      backListenerPromise.then(handler => handler.remove());
    };
  }, [activeTopicId, isSidebarOpen, isPremiumSettingsOpen, activeTab]);

  // --- Handlers ---
  const handleOnboardingComplete = () => {
    localStorage.setItem('onboarding_completed', 'true');
    setIsOnboardingCompleted(true);
  };

  const handleThemeToggle = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleUpdateProgress = (topicId: string, stats: Partial<UserProgress>) => {
    setProgress(prev => {
      const current = prev[topicId] || {
        topicId,
        progressPercent: 0,
        isFavorite: false,
        isCompleted: false
      };
      return {
        ...prev,
        [topicId]: {
          ...current,
          ...stats
        }
      };
    });
  };

  const handleUpdateSettings = (newSettings: Partial<AppSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings
    }));
  };

  const handleResetProgress = () => {
    setProgress({});
    localStorage.removeItem('user_reading_progress');
  };

  const getFavoritesCount = () => {
    return (Object.values(progress) as UserProgress[]).filter(p => p.isFavorite).length;
  };

  // Find active topic if any
  const currentTopic = appTopics.find(t => t.id === activeTopicId);
  const currentProgress = activeTopicId 
    ? (progress[activeTopicId] || { topicId: activeTopicId, progressPercent: 0, isFavorite: false, isCompleted: false })
    : { topicId: '', progressPercent: 0, isFavorite: false, isCompleted: false };

  // --- Render logic ---
  if (!isOnboardingCompleted) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  return (
    <div className={`${theme} min-h-screen w-full bg-neutral-100 dark:bg-black flex justify-center`} dir="rtl">
      {/* Outer App Frame for Desktop-First/Mobile perfection */}
      <div id="main-app-container" className={`relative w-full max-w-md min-h-screen flex flex-col justify-between border-x transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-black text-white border-zinc-900 shadow-2xl' 
          : 'bg-white text-neutral-800 border-neutral-150 shadow-lg'
      }`}>
        
        {/* Top Header/Toolbar */}
        <Toolbar 
          onMenuClick={() => setIsSidebarOpen(true)}
          theme={theme}
          onThemeToggle={handleThemeToggle}
          appName="د ویناوالۍ ښوونکی"
        />

        {/* Dynamic Inner Container holding the views */}
        <main className="flex-1 px-5 py-6 overflow-y-auto pb-24">
          {activeTab === 'home' && (
            <HomeView 
              topics={appTopics}
              progress={progress}
              onTopicClick={(id) => setActiveTopicId(id)}
              onNavigate={(tab) => setActiveTab(tab)}
              onOpenSettings={() => {
                setIsPremiumSettingsOpen(true);
              }}
              themeAccent={settings.themeAccent}
            />
          )}

          {activeTab === 'search' && (
            <SearchView 
              topics={appTopics}
              progress={progress}
              onTopicClick={(id) => setActiveTopicId(id)}
              themeAccent={settings.themeAccent}
            />
          )}

          {activeTab === 'about' && (
            <AboutView />
          )}
        </main>

        {/* Bottom Navigation Drawer */}
        <BottomNavigation 
          activeTab={activeTab}
          onChange={(tab) => setActiveTab(tab)}
          themeAccent={settings.themeAccent}
        />

        {/* Sidebar Drawermenu */}
        <Sidebar 
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          topics={appTopics}
          progress={progress}
          onResetProgress={handleResetProgress}
          onNavigate={(tab) => setActiveTab(tab)}
          favoritesCount={getFavoritesCount()}
        />

        {/* Overlay Reading Screen */}
        {activeTopicId && currentTopic && (
          <ReadingView 
            topic={currentTopic}
            progress={currentProgress}
            onBack={() => setActiveTopicId(null)}
            onUpdateProgress={handleUpdateProgress}
            settings={settings}
            onUpdateSettings={handleUpdateSettings}
          />
        )}

        {/* Premium App Design Settings Custom Overlay Panel */}
        <PremiumSettings 
          isOpen={isPremiumSettingsOpen}
          onClose={() => setIsPremiumSettingsOpen(false)}
          settings={settings}
          progress={progress}
          topics={appTopics}
          onUpdateSettings={handleUpdateSettings}
          onResetProgress={handleResetProgress}
          theme={theme}
          onThemeToggle={handleThemeToggle}
        />

        {/* Beautiful Islamic Exit Confirmation Modal */}
        <AnimatePresence>
          {showExitDialog && (
            <div className="fixed inset-0 z-55 flex items-center justify-center p-4">
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowExitDialog(false)}
                className="absolute inset-0 bg-black/75 backdrop-blur-md"
              />

              {/* Card content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 30 }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className={`relative w-full max-w-xs overflow-hidden rounded-3xl p-6 shadow-2xl border transition-all duration-300 text-center ${
                  theme === 'dark' 
                    ? 'bg-zinc-950 text-white border-zinc-900' 
                    : 'bg-white text-neutral-850 border-neutral-150'
                }`}
                dir="rtl"
              >
                {/* Decorative Pattern & Glowing Icon */}
                <div className="relative mb-5 flex justify-center">
                  <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-full blur-md opacity-30 animate-pulse" />
                  <div className="relative w-16 h-16 rounded-full bg-rose-500/10 text-rose-550 dark:text-rose-400 flex items-center justify-center border border-rose-500/20">
                    <LogOut className="w-8 h-8" />
                  </div>
                </div>

                <h3 className="text-lg font-extrabold font-sans mb-2">
                  ایا غواړئ بهر شئ؟
                </h3>
                
                <p className="text-sm text-neutral-500 dark:text-zinc-400 font-sans leading-relaxed px-2 mb-6">
                  ایا تاسو واقعیا غواړئ چې له پښتو د ویناوالۍ ښوونکي اپلیکیشن څخه بهر شئ او خپل درس پاتې کړئ؟
                </p>

                {/* Subtitle Du'a / Quote line */}
                <span className="text-[10px] text-zinc-400 dark:text-zinc-500 block mb-6 italic select-none">
                  اللهم علمنا ما ينفعنا وانفعنا بما علمتنا 🤍🌿
                </span>

                {/* Buttons Grid */}
                <div className="grid grid-cols-2 gap-3">
                  {/* Exit Confirmation Button */}
                  <button
                    id="exit-confirm-yes-btn"
                    onClick={() => {
                      if (Capacitor.isNativePlatform()) {
                        CapApp.exitApp();
                      } else {
                        setShowExitDialog(false);
                        alert('تاسو اوس کولی شئ دا پاڼه بنده کړئ.');
                      }
                    }}
                    className="py-3 px-4 rounded-xl font-bold font-sans text-sm bg-rose-600 hover:bg-rose-500 active:scale-95 text-white shadow-lg shadow-rose-600/25 transition-all"
                  >
                    هو، وتل
                  </button>

                  {/* Cancel Button */}
                  <button
                    id="exit-cancel-btn"
                    onClick={() => setShowExitDialog(false)}
                    className="py-3 px-4 rounded-xl font-bold font-sans text-sm bg-neutral-100 dark:bg-zinc-900 text-neutral-700 dark:text-zinc-300 hover:bg-neutral-200 dark:hover:bg-zinc-800 active:scale-95 border border-neutral-200/50 dark:border-zinc-800 transition-all"
                  >
                    نه، پاتې کېدل
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

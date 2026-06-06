/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Mic, Sparkles } from 'lucide-react';

interface SplashProps {
  theme?: 'light' | 'dark';
  onFinished: () => void;
}

export default function Splash({ theme = 'light', onFinished }: SplashProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Increment progress bar sequentially for visual elegance
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 80);

    // Auto fadeout/callback after 2.5 seconds
    const timer = setTimeout(() => {
      onFinished();
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onFinished]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className={`fixed inset-0 z-[100] flex flex-col justify-between p-8 overflow-hidden transition-colors duration-500 font-sans select-none ${
        theme === 'dark' ? 'bg-zinc-950 text-white' : 'bg-neutral-50 text-neutral-800'
      }`}
      dir="rtl"
    >
      {/* Background Animated Glow Blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.15, 0.25, 0.15],
            rotate: [0, 120, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute -top-40 -left-40 w-[450px] h-[450px] rounded-full blur-3xl ${
            theme === 'dark' ? 'bg-indigo-600/15' : 'bg-indigo-500/10'
          }`}
        />
        <motion.div
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.1, 0.2, 0.1],
            rotate: [0, -120, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute -bottom-40 -right-40 w-[450px] h-[450px] rounded-full blur-3xl ${
            theme === 'dark' ? 'bg-emerald-600/15' : 'bg-emerald-500/10'
          }`}
        />
      </div>

      {/* Top Header Label */}
      <div className="relative z-10 flex justify-between items-center mt-6">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-indigo-500 dark:text-indigo-400 animate-spin-slow" />
          <span className={`text-[11px] font-bold tracking-widest font-mono opacity-85 ${
            theme === 'dark' ? 'text-zinc-400' : 'text-neutral-500'
          }`}>
            ځانګړی اپلیکیشن • د بیان او جرات زده کړه
          </span>
        </div>
      </div>

      {/* Central Interactive Artwork */}
      <div className="relative z-10 flex-grow flex flex-col items-center justify-center text-center">
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className="relative mb-8"
        >
          {/* Layered Pulsing Rings */}
          <motion.div
            animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
            className={`absolute inset-x-[-20px] inset-y-[-20px] rounded-full border ${
              theme === 'dark' ? 'border-indigo-500/30' : 'border-indigo-500/20'
            }`}
          />
          <motion.div
            animate={{ scale: [1.2, 0.9, 1.2], opacity: [0.15, 0, 0.15] }}
            transition={{ repeat: Infinity, duration: 3.5, ease: "easeInOut" }}
            className={`absolute inset-x-[-35px] inset-y-[-35px] rounded-full border ${
              theme === 'dark' ? 'border-emerald-500/20' : 'border-emerald-500/15'
            }`}
          />

          <div className={`w-36 h-36 rounded-[2.3rem] bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-500 flex items-center justify-center shadow-2xl relative ${
            theme === 'dark' ? 'shadow-indigo-500/25 border border-white/10' : 'shadow-indigo-500/15 border border-neutral-100'
          }`}>
            <Mic className="w-16 h-16 text-white drop-shadow-md" />
            
            {/* Spinning dotted orbital frame for modern digital alignment */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-1.5 rounded-[2.1rem] border border-white/15 border-dashed"
            />
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-xs mx-auto"
        >
          <h1 className={`text-2xl sm:text-3xl font-extrabold font-sans tracking-wide leading-relaxed mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-neutral-900'
          }`}>
            د ويناوالۍ لارښود
          </h1>
          <p className={`text-xs tracking-normal font-sans leading-relaxed ${
            theme === 'dark' ? 'text-zinc-400' : 'text-neutral-500'
          }`}>
            مجلس سمبال کړئ او په زړورتیا خبرې وکړئ!
          </p>
        </motion.div>
      </div>

      {/* Progress Load Bar at Footer */}
      <div className="relative z-10 w-full max-w-xs mx-auto flex flex-col items-center gap-4 mb-8">
        <div className={`w-full h-1.5 rounded-full overflow-hidden relative ${
          theme === 'dark' ? 'bg-zinc-900' : 'bg-neutral-200'
        }`}>
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>
        
        <span className={`text-[10px] font-bold font-mono tracking-wider opacity-60 ${
          theme === 'dark' ? 'text-zinc-500' : 'text-neutral-400'
        }`}>
          بارګیري کیږي... {progress}%
        </span>
      </div>
    </motion.div>
  );
}

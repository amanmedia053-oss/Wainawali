/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Heart,
  Sparkles,
  BookOpen,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

export default function AboutView() {
  const emailVal = "obaidkhanghafari@gmail.com";
  const whatsappVal = "+93779705897";
  const whatsappLink = `https://wa.me/93779705897`;

  // Custom container variants for staggered child transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <motion.div 
      className="flex flex-col gap-6 w-full max-w-md mx-auto px-1 pb-12" 
      dir="rtl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Soft Calm & Spiritual Ambient Gradient Header Section wrapper */}
      <motion.div 
        variants={itemVariants}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-500/10 via-sky-500/5 to-emerald-500/10 dark:from-emerald-950/20 dark:via-teal-950/10 dark:to-zinc-950 border border-teal-500/10 dark:border-emerald-500/10 p-6 flex flex-col items-center justify-center text-center shadow-xl backdrop-blur-md"
      >
        {/* Abstract background Islamic art inspired glows */}
        <div className="absolute top-0 right-1/4 w-32 h-32 bg-teal-450/10 dark:bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-sky-400/10 dark:bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        
        {/* Profile Avatar with Glowing Effect & Islamic Border Aesthetic */}
        <div className="relative mb-5 mt-2">
          {/* External ambient pulse ring */}
          <div className="absolute -inset-1 bg-gradient-to-r from-teal-400 via-emerald-400 to-sky-400 rounded-full blur-md opacity-70 dark:opacity-50 animate-pulse" />
          
          {/* Symmetrical fine geometric style border */}
          <div className="relative w-28 h-28 rounded-full bg-white dark:bg-zinc-900 p-1.5 flex items-center justify-center border border-white/40 shadow-inner">
            <div className="w-full h-full rounded-full bg-gradient-to-tr from-teal-600 via-emerald-500 to-sky-500 flex flex-col items-center justify-center text-white font-sans relative overflow-hidden shadow-md">
              
              {/* Islamic/Spiritual micro-pattern overlay */}
              <div className="absolute inset-0 opacity-10 mix-blend-overlay border-[6px] border-double border-white rounded-full scale-95" />
              
              {/* Monogram ع غ displaying initials beautifully */}
              <span className="text-4xl font-extrabold tracking-wide drop-shadow-sm font-sans mt-1 select-none">
                ع‌غ
              </span>
              
              {/* Subtle elegant subtitle decoration inside circle */}
              <span className="text-[9px] font-medium tracking-widest opacity-90 uppercase font-sans mt-0.5 pointer-events-none">
                طالب العلم
              </span>
            </div>
          </div>
        </div>

        {/* Name and Title banner */}
        <motion.div 
          className="flex flex-col items-center gap-1.5 z-10"
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-xl font-extrabold text-neutral-905 dark:text-zinc-50 font-sans tracking-tight">
            عبیدالله غفاري
          </h2>
          <div className="flex items-center gap-1.5 px-3 py-1 bg-teal-500/10 dark:bg-emerald-500/10 text-teal-800 dark:text-emerald-300 rounded-full text-xs font-bold font-sans border border-teal-500/20 dark:border-emerald-500/10">
            <BookOpen className="w-3.5 h-3.5" />
            <span>د سابعې (اوومې) درجې طالب العلم</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Main Glassmorphism Bio Card 1 (Quote & Mission) */}
      <motion.div 
        variants={itemVariants}
        className="relative overflow-hidden border border-neutral-150/80 dark:border-zinc-850/60 bg-white/75 dark:bg-zinc-900/40 backdrop-blur-lg rounded-2xl p-6 shadow-md shadow-neutral-100/30 dark:shadow-none"
      >
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-neutral-100 dark:border-zinc-800/80">
          <span className="p-1.5 rounded-lg bg-teal-550/10 text-teal-600 dark:text-teal-400">
            <Sparkles className="w-4.5 h-4.5" />
          </span>
          <h3 className="text-sm font-extrabold text-neutral-800 dark:text-zinc-100 font-sans">
            پیژندګلوي او موخه
          </h3>
        </div>

        <div className="space-y-4">
          <p className="text-sm sm:text-base text-neutral-700 dark:text-zinc-200 leading-relaxed font-sans text-right font-medium">
            زه عبیدالله غفاري یم، د لوګر ولایت د جهادي مدرسې د سابعې (اوومې) درجې طالب العلم. د دې اپلیکیشن د جوړولو موخه مې د الله تعالی رضا او خپلو افغانو وروڼو او خویندو ته د ګټور خدمت وړاندې کول دي.
          </p>

          <p className="text-sm sm:text-base text-neutral-700 dark:text-zinc-200 leading-relaxed font-sans text-right font-medium">
            هیله لرم چې دا کوچنۍ هڅه د علم، پوهاوي او خیر د خپرېدو وسیله وګرځي او د خلکو لپاره ګټوره تمامه شي. ستاسو دعاوې او نېکې مشورې زما لپاره لویه پانګه ده.
          </p>
        </div>
      </motion.div>

      {/* Modern Contact Information section */}
      <motion.div 
        variants={itemVariants}
        className="relative overflow-hidden border border-neutral-150/80 dark:border-zinc-850/60 bg-white/75 dark:bg-zinc-900/40 backdrop-blur-lg rounded-2xl p-6 shadow-md shadow-neutral-150/20 dark:shadow-none"
      >
        <div className="flex items-center gap-2 pb-3 mb-4 border-b border-neutral-100 dark:border-zinc-805/80">
          <span className="p-1.5 rounded-lg bg-sky-500/10 text-sky-505 dark:text-sky-400">
            <MessageCircle className="w-4.5 h-4.5" />
          </span>
          <h3 className="text-sm font-extrabold text-neutral-800 dark:text-zinc-100 font-sans">
            د اړیکو پاڼه او مراجع
          </h3>
        </div>

        {/* Quick Contact buttons in stylish grid */}
        <div className="flex flex-col gap-3">
          {/* Email action card */}
          <a
            id="obaid-email-link"
            href={`mailto:${emailVal}`}
            className="group flex items-center justify-between p-3.5 rounded-xl border border-neutral-100 hover:border-teal-500/40 bg-neutral-50/50 hover:bg-teal-50/20 dark:border-zinc-800/60 dark:hover:border-teal-500/20 dark:bg-zinc-900/30 dark:hover:bg-teal-950/10 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg flex items-center justify-center bg-sky-500/10 text-sky-500 dark:bg-sky-500/20 group-hover:scale-105 transition-transform duration-200">
                <Mail className="w-5 h-5" />
              </span>
              <div className="text-right">
                <div className="text-[10px] text-neutral-400 dark:text-zinc-500 font-sans">بېښنالیک پته</div>
                <div className="text-xs sm:text-sm font-bold text-neutral-700 dark:text-zinc-200 font-sans tracking-wide">
                  {emailVal}
                </div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-neutral-300 dark:text-zinc-600 group-hover:text-teal-500 dark:group-hover:text-emerald-450 transition-colors" />
          </a>

          {/* WhatsApp action card */}
          <a
            id="obaid-whatsapp-link"
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between p-3.5 rounded-xl border border-neutral-100 hover:border-emerald-500/40 bg-neutral-50/50 hover:bg-emerald-50/20 dark:border-zinc-800/60 dark:hover:border-emerald-500/20 dark:bg-zinc-900/30 dark:hover:bg-emerald-950/10 transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
                <MessageCircle className="w-5 h-5" />
              </span>
              <div className="text-right">
                <div className="text-[10px] text-neutral-400 dark:text-zinc-500 font-sans">واټساپ شمیره</div>
                <div className="text-xs sm:text-sm font-bold text-neutral-700 dark:text-zinc-200 font-sans tracking-wide" dir="ltr">
                  {whatsappVal}
                </div>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-neutral-300 dark:text-zinc-600 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors" />
          </a>
        </div>
      </motion.div>

      {/* Sacred Islamic Dua ending banner */}
      <motion.div 
        variants={itemVariants}
        className="relative overflow-hidden border border-emerald-500/10 bg-gradient-to-tr from-emerald-500/5 to-teal-500/5 dark:from-emerald-950/10 dark:to-zinc-950/40 rounded-2xl p-5 text-center shadow-inner"
      >
        <p className="text-sm sm:text-base text-teal-850 dark:text-emerald-300 font-extrabold italic leading-relaxed py-1.5 font-sans flex items-center justify-center gap-2 select-none">
          اللهم تقبل منا إنك أنت السميع العليم. 🤍🌿
        </p>
      </motion.div>

      {/* Small design credit label */}
      <motion.div 
        variants={itemVariants}
        className="flex justify-center items-center gap-1.5 py-2 text-[10px] text-neutral-400 dark:text-zinc-500 font-sans"
      >
        <span>دا اپلیکیشن په بشپړ ډول د رضا او ملګرتیا په روحیه ډیزاین شوی</span>
        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
      </motion.div>
    </motion.div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface TopicSection {
  id?: number;
  subtitle?: string;
  body: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  category: 'definition' | 'principles' | 'exercises' | 'traits';
  categoryLabel: string;
  content: TopicSection[];
  icon: string; // Key for Lucide icon
  estimatedReadTime: string;
}

export interface UserProgress {
  topicId: string;
  progressPercent: number; // 0 to 100
  isFavorite: boolean;
  isCompleted: boolean;
  lastReadTime?: string;
}

export interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  iconName: string;
  bgColor: string;
  textColor: string;
}

export interface AppSettings {
  textSize: 'sm' | 'base' | 'lg' | 'xl' | '2xl';
  lineHeight: 'tight' | 'normal' | 'relaxed' | 'loose';
  fontFamily: 'iransans' | 'lateef' | 'nastaliq';
  theme: 'light' | 'dark';
  themeAccent?: string; // App tint hex or tailwind text/bg color config
}

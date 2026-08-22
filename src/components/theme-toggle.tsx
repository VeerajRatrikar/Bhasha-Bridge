'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/lib/ThemeProvider';

export function ThemeToggle({
  className = '',
  expanded = false,
  showLabel = false
}: {
  className?: string;
  expanded?: boolean;
  showLabel?: boolean;
}) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  if (expanded) {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        onClick={toggleTheme}
        className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all cursor-pointer shadow-sm ${
          isDark
            ? 'bg-slate-900/90 border-[#2B354F] text-slate-200 hover:border-amber-400/50'
            : 'bg-white border-slate-200 text-slate-800 hover:border-amber-400'
        } ${className}`}
        type="button"
      >
        <div className="flex items-center gap-2.5">
          <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
            isDark ? 'bg-indigo-500/20 text-amber-300' : 'bg-amber-100 text-amber-600'
          }`}>
            {isDark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </div>
          <div className="text-left font-mono">
            <div className="text-xs font-bold">{isDark ? 'Dark Mode' : 'Light Mode'}</div>
            <div className="text-[10px] text-slate-500">{isDark ? 'Obsidian Cyber Glass' : 'Clean Pearl Slate'}</div>
          </div>
        </div>

        {/* Animated Pill Switch */}
        <div className={`w-12 h-6.5 rounded-full p-0.5 flex items-center transition-colors ${
          isDark ? 'bg-slate-800 border border-slate-700 justify-end' : 'bg-amber-200 border border-amber-300 justify-start'
        }`}>
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={`w-5 h-5 rounded-full flex items-center justify-center shadow-md ${
              isDark ? 'bg-indigo-600 text-amber-300' : 'bg-amber-500 text-white'
            }`}
          >
            {isDark ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
          </motion.div>
        </div>
      </motion.button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      className={`relative inline-flex items-center gap-2 p-1 rounded-full border transition-all cursor-pointer shadow-sm select-none ${
        isDark
          ? 'bg-slate-900/90 border-[#2B354F] hover:border-amber-400'
          : 'bg-white border-slate-200 hover:border-amber-400'
      } ${className}`}
      type="button"
    >
      {/* Animated Sliding Pill Track */}
      <div className={`relative w-12 h-6.5 rounded-full p-0.5 flex items-center transition-colors ${
        isDark ? 'bg-slate-800 border border-slate-700 justify-end' : 'bg-amber-100 border border-amber-300 justify-start'
      }`}>
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={`w-5 h-5 rounded-full flex items-center justify-center shadow-md ${
            isDark ? 'bg-indigo-600 text-amber-300' : 'bg-amber-500 text-white'
          }`}
        >
          {isDark ? <Moon className="w-3 h-3" /> : <Sun className="w-3 h-3" />}
        </motion.div>
      </div>

      {showLabel && (
        <span className="text-xs font-mono font-bold pr-1.5 text-slate-800 dark:text-slate-200">
          {isDark ? 'Dark' : 'Light'}
        </span>
      )}
    </motion.button>
  );
}

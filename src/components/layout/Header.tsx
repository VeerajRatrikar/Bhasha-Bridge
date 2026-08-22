'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '../../lib/store';
import { useTheme } from '../../lib/ThemeProvider';
import { Logo } from '../brand/Logo';
import {
  Mic,
  Search,
  Bell,
  Sun,
  Moon,
  Globe,
  Eye,
  ChevronDown,
  Command,
  Radio
} from 'lucide-react';

export function Header() {
  const {
    language,
    setLanguage,
    highContrast,
    toggleHighContrast,
    notifications,
    setIsListening,
    isListening
  } = useApp();

  const { theme, toggleTheme } = useTheme();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  return (
    <header className="sticky top-0 z-30 h-16 border-b border-slate-200 dark:border-zinc-800 bg-white/90 dark:bg-[#09090b]/95 backdrop-blur-md px-4 lg:px-8 flex items-center justify-between transition-colors duration-300">
      {/* Mobile Logo */}
      <div className="flex items-center gap-3 lg:hidden">
        <Link href="/app/overview">
          <Logo size="sm" />
        </Link>
      </div>

      {/* Global Quick Search & Command Palette Trigger */}
      <div className="flex-1 max-w-md mx-4 hidden sm:flex items-center">
        <button
          onClick={() => {
            const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true, ctrlKey: true });
            window.dispatchEvent(event);
          }}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-[#18181b] border border-slate-200 dark:border-zinc-800 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-orange-500/50 transition-all"
        >
          <div className="flex items-center gap-2.5">
            <Search className="w-4 h-4 text-orange-500 shrink-0" />
            <span>Search suppliers or command palette...</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsListening(!isListening);
              }}
              title="Voice input"
              className={`p-1 rounded-lg transition-all ${
                isListening ? 'bg-orange-500 text-white animate-pulse' : 'bg-orange-500/10 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20'
              }`}
            >
              <Mic className="w-3.5 h-3.5" />
            </button>
            <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-200 dark:bg-zinc-800 text-slate-600 dark:text-slate-300 flex items-center gap-0.5">
              <Command className="w-2.5 h-2.5" /> K
            </span>
          </div>
        </button>
      </div>

      {/* Header Actions */}
      <div className="flex items-center gap-2.5">
        {/* System Status Pill */}
        <div className="hidden xl:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-600 dark:text-orange-400 text-[11px] font-mono font-bold">
          <Radio className="w-3 h-3 text-orange-500 animate-pulse" />
          <span>Bhashini API Active</span>
        </div>

        {/* Vernacular Language Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 dark:bg-[#18181b] border border-slate-200 dark:border-zinc-800 text-xs text-slate-700 dark:text-slate-200 hover:border-orange-500/40 transition-all font-mono"
          >
            <Globe className="w-4 h-4 text-orange-500" />
            <span className="font-bold hidden sm:inline">
              {language === 'kn-IN' ? 'ಕನ್ನಡ' : language === 'kn-en' ? 'Kn + En' : 'English'}
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {showLangMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white dark:bg-[#18181b] border border-slate-200 dark:border-zinc-800 shadow-2xl p-2 z-50 text-xs space-y-1">
              <button
                onClick={() => { setLanguage('kn-en'); setShowLangMenu(false); }}
                className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-colors ${language === 'kn-en' ? 'bg-orange-500/15 text-orange-600 dark:text-orange-400 font-bold border border-orange-500/30' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800'}`}
              >
                Kannada + English (Mix)
              </button>
              <button
                onClick={() => { setLanguage('kn-IN'); setShowLangMenu(false); }}
                className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-colors ${language === 'kn-IN' ? 'bg-orange-500/15 text-orange-600 dark:text-orange-400 font-bold border border-orange-500/30' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800'}`}
              >
                ಕನ್ನಡ (Pure Kannada)
              </button>
              <button
                onClick={() => { setLanguage('en-IN'); setShowLangMenu(false); }}
                className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-colors ${language === 'en-IN' ? 'bg-orange-500/15 text-orange-600 dark:text-orange-400 font-bold border border-orange-500/30' : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-800'}`}
              >
                English (Indian)
              </button>
            </div>
          )}
        </div>

        {/* High Contrast Accessibility Toggle */}
        <button
          onClick={toggleHighContrast}
          title="Toggle high contrast mode"
          className={`p-2 rounded-xl border transition-all ${
            highContrast 
              ? 'bg-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-500/40' 
              : 'bg-slate-100 dark:bg-[#18181b] text-slate-600 dark:text-slate-300 border-slate-200 dark:border-zinc-800 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Eye className="w-4 h-4" />
        </button>

        {/* Theme Dark/Light Toggle */}
        <button
          onClick={toggleTheme}
          title="Toggle dark / light theme"
          className="p-2 rounded-xl bg-slate-100 dark:bg-[#18181b] border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all"
        >
          {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-orange-600" />}
        </button>

        {/* Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-slate-100 dark:bg-[#18181b] border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all relative"
          >
            <Bell className="w-4 h-4" />
            {notifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-orange-500 animate-ping" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white dark:bg-[#18181b] border border-slate-200 dark:border-zinc-800 shadow-2xl p-4 z-50 text-xs">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-zinc-800 pb-3 mb-3">
                <h4 className="font-bold text-slate-900 dark:text-white">Live Notifications</h4>
                <span className="text-[10px] bg-orange-500/20 text-orange-600 dark:text-orange-400 px-2 py-0.5 rounded-full font-bold">{notifications.length}</span>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="text-slate-500 dark:text-slate-400 text-center py-6">No recent notifications</p>
                ) : (
                  notifications.map((n) => (
                    <div key={n.id} className="p-3 rounded-xl bg-slate-50 dark:bg-[#09090b] border border-slate-200 dark:border-zinc-800">
                      <h5 className="font-semibold text-slate-900 dark:text-white text-xs">{n.title}</h5>
                      <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-1">{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}


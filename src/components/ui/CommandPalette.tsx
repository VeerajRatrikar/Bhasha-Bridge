'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../lib/store';
import {
  Search,
  Mic,
  LayoutDashboard,
  Building2,
  BarChart3,
  Sparkles,
  ShieldCheck,
  History,
  Settings,
  X,
  ArrowRight,
  Command,
  Sun,
  Moon,
  Globe
} from 'lucide-react';

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const router = useRouter();
  const { theme, toggleTheme, language, setIsListening } = useApp();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const navigationItems = [
    { name: 'Voice Studio Console', href: '/app/voice-assistant', icon: Mic, badge: 'Voice Engine' },
    { name: 'Overview Dashboard', href: '/app/overview', icon: LayoutDashboard, badge: 'Home' },
    { name: 'Supplier Discovery', href: '/app/supplier-discovery', icon: Building2, badge: 'Suppliers' },
    { name: 'Analytics & Health', href: '/app/analytics', icon: BarChart3, badge: 'Metrics' },
    { name: 'AI Recommendation Engine', href: '/app/recommendations', icon: Sparkles, badge: 'AI Match' },
    { name: 'Trusted Vendors Repository', href: '/app/trusted-vendors', icon: ShieldCheck, badge: 'Saved' },
    { name: 'Procurement History Log', href: '/app/procurement-history', icon: History, badge: 'Logs' },
    { name: 'Settings & Accessibility', href: '/app/settings', icon: Settings, badge: 'Config' },
  ];

  const filteredItems = navigationItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.badge.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (href: string) => {
    setIsOpen(false);
    setSearch('');
    router.push(href);
  };

  const handleTriggerVoice = () => {
    setIsOpen(false);
    setIsListening(true);
    router.push('/app/voice-assistant');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-700/80 bg-slate-900/95 shadow-2xl shadow-cyan-500/10 text-slate-100 z-10"
          >
            {/* Search Input Bar */}
            <div className="relative flex items-center border-b border-slate-800 px-4 py-3">
              <Search className="w-5 h-5 text-cyan-400 shrink-0 mr-3" />
              <input
                type="text"
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type a command, page, or supplier name..."
                className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
              />
              {search && (
                <button onClick={() => setSearch('')} className="p-1 text-slate-400 hover:text-slate-200">
                  <X className="w-4 h-4" />
                </button>
              )}
              <span className="ml-2 rounded px-2 py-0.5 text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">
                ESC
              </span>
            </div>

            {/* Quick Actions Bar */}
            <div className="p-3 bg-slate-950/50 border-b border-slate-800 flex items-center justify-between gap-2 overflow-x-auto text-xs">
              <button
                onClick={handleTriggerVoice}
                className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-xs hover:opacity-90 transition-opacity"
              >
                <Mic className="w-3.5 h-3.5" /> Launch Voice Mic
              </button>

              <button
                onClick={toggleTheme}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
              >
                {theme === 'dark' ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-cyan-400" />}
                Toggle Theme
              </button>

              <div className="flex items-center gap-1 text-[11px] text-slate-400">
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Lang: <strong className="text-slate-200 uppercase">{language}</strong></span>
              </div>
            </div>

            {/* Navigation Options List */}
            <div className="max-h-80 overflow-y-auto p-2 space-y-1">
              <span className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block">
                Platform Destinations ({filteredItems.length})
              </span>

              {filteredItems.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500">No matching commands or pages found.</div>
              ) : (
                filteredItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.href}
                      onClick={() => handleSelect(item.href)}
                      className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-indigo-600/20 hover:border-indigo-500/30 border border-transparent transition-all group text-left"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-800 group-hover:bg-cyan-500/20 text-cyan-400 transition-colors">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <span className="text-xs font-semibold text-slate-200 group-hover:text-white block">
                            {item.name}
                          </span>
                          <span className="text-[10px] text-slate-500 font-mono">{item.href}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 group-hover:text-cyan-300">
                          {item.badge}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-slate-800 bg-slate-950 text-[11px] text-slate-500 flex items-center justify-between">
              <span className="flex items-center gap-1 font-mono">
                <Command className="w-3 h-3" /> Navigation Command Palette
              </span>
              <span>Use ↑ ↓ to navigate, ↵ to select</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic, Building, Bell, Key, Play, Pause, Save, Volume2,
  CheckCircle2, Globe, Sparkles, Shield, User, Sliders,
  Sun, Moon, Monitor, QrCode, Lock, Check
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/lib/ThemeProvider';
import { ThemeToggle } from '@/components/theme-toggle';

export default function SettingsPage() {
  const { theme, setTheme, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<'voice' | 'theme' | 'business' | 'notifications' | 'security'>('voice');
  const [language, setLanguage] = useState('kn-IN');
  const [voiceTone, setVoiceTone] = useState('Professional & Clear (ಕನ್ನಡ ಧ್ವನಿ)');
  const [speechSpeed, setSpeechSpeed] = useState('1.0');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleTestAudio = () => {
    setIsPlayingAudio(true);
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance("ನಮಸ್ಕಾರ, ಭಾಷಾ ಬ್ರಿಡ್ಜ್‌ಗೆ ಸುಸ್ವಾಗತ. ಕರ್ನಾಟಕದ MSME ಗಳಿಗೆ ನಿಮ್ಮ ನೆಚ್ಚಿನ ಕನ್ನಡ ಭಾಷೆಯಲ್ಲೇ ವ್ಯಾಪಾರ ಅವಕಾಶಗಳು.");
      utterance.lang = 'kn-IN';
      utterance.rate = parseFloat(speechSpeed);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 2000);
    }
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto space-y-8 pb-12"
    >
      {/* ── Page Header ────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-[#1E283D]">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>Platform Settings // ವೇದಿಕೆ ಸೆಟ್ಟಿಂಗ್‌ಗಳು</span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose-600 to-amber-500 text-white font-bold font-mono shadow-sm">
              KARNATAKA NODE
            </span>
          </h1>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
            Configure your Bhasha Bridge Kannada Voice Assistant, switch between themes, manage business profile, and security keys.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>

      {/* ── Sub-Nav & Content Grid ────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left Sub-nav (4 cols) */}
        <div className="md:col-span-4 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] p-3 space-y-1 shadow-md h-fit font-mono">
          {[
            { id: 'voice', label: 'ಕನ್ನಡ ಧ್ವನಿ (Voice Assistant)', icon: Mic },
            { id: 'theme', label: 'Theme & Appearance', icon: Sun },
            { id: 'business', label: 'Business Profile (Karnataka)', icon: Building },
            { id: 'notifications', label: 'Notifications & Alerts', icon: Bell },
            { id: 'security', label: 'Security & Bhashini API', icon: Key },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ x: 2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                  active
                    ? 'bg-amber-50 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/40 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#1C2336]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0 text-amber-600 dark:text-amber-400" />
                <span className="truncate">{tab.label}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Right Main Settings Panel (8 cols) */}
        <div className="md:col-span-8 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] p-6 md:p-8 shadow-xl space-y-6">
          {/* Tab: Voice Settings */}
          {activeTab === 'voice' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-200 dark:border-[#1E283D]">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white shadow-sm">
                  <Mic className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white tracking-tight">
                  ಕನ್ನಡ ಧ್ವನಿ ಆದ್ಯತೆಗಳು (Voice Preferences)
                </h3>
              </div>

              {/* Form & Audio Player Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                <div className="space-y-4">
                  {/* Primary Language */}
                  <div>
                    <label className="text-xs font-mono uppercase font-bold text-slate-700 dark:text-amber-400 mb-1.5 block">
                      Primary Interface Language
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-xs font-bold text-slate-900 dark:text-amber-300 focus:outline-none focus:border-amber-500"
                    >
                      <option value="kn-IN">ಕನ್ನಡ (Kannada - Primary)</option>
                      <option value="en-IN">English (India)</option>
                      <option value="hi-IN">Hindi (हिन्दी)</option>
                      <option value="ta-IN">Tamil (தமிழ்)</option>
                      <option value="te-IN">Telugu (తెలుగు)</option>
                    </select>
                  </div>

                  {/* Voice Tone */}
                  <div>
                    <label className="text-xs font-mono uppercase font-bold text-slate-700 dark:text-amber-400 mb-1.5 block">
                      Voice Tone (ಧ್ವನಿಯ ಸ್ವರೂಪ)
                    </label>
                    <select
                      value={voiceTone}
                      onChange={(e) => setVoiceTone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-xs font-bold text-slate-900 dark:text-slate-100 focus:outline-none focus:border-amber-500"
                    >
                      <option>Professional &amp; Clear (ವೃತ್ತಿಪರ)</option>
                      <option>Friendly &amp; Warm (ಸ್ನೇಹಪರ)</option>
                      <option>Fast &amp; Concise (ಕ್ಷಿಪ್ರ)</option>
                    </select>
                  </div>

                  {/* Speech Speed */}
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                      <span className="text-slate-600 dark:text-slate-400 uppercase font-bold">Speech Speed</span>
                      <span className="text-amber-600 dark:text-amber-400 font-bold">({speechSpeed}x)</span>
                    </div>
                    <input
                      type="range"
                      min="0.75"
                      max="1.5"
                      step="0.25"
                      value={speechSpeed}
                      onChange={(e) => setSpeechSpeed(e.target.value)}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                  </div>
                </div>

                {/* Right Interactive Test Audio Card */}
                <div className="rounded-2xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] p-5 flex flex-col items-center justify-center text-center h-full min-h-[200px] shadow-sm">
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={handleTestAudio}
                    className="w-14 h-14 rounded-full bg-gradient-to-tr from-rose-600 via-amber-500 to-yellow-400 flex items-center justify-center text-white shadow-lg shadow-amber-500/25 cursor-pointer mb-3 border-0"
                  >
                    {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </motion.button>
                  <span className="font-bold text-xs text-amber-700 dark:text-amber-300 font-mono">ಧ್ವನಿ ಪರೀಕ್ಷೆ (Test Audio)</span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 italic mt-2 max-w-[220px] font-serif leading-relaxed">
                    &ldquo;ನಮಸ್ಕಾರ, ಭಾಷಾ ಬ್ರಿಡ್ಜ್‌ಗೆ ಸುಸ್ವಾಗತ. ಕರ್ನಾಟಕದ MSME ಗಳಿಗೆ ನಿಮ್ಮ ನೆಚ್ಚಿನ ಕನ್ನಡ ಭಾಷೆಯಲ್ಲೇ ವ್ಯಾಪಾರ ಅವಕಾಶಗಳು.&rdquo;
                  </p>
                </div>
              </div>

              {/* Bottom Save Action */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-200 dark:border-[#1E283D]">
                {savedSuccess && (
                  <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1 animate-fadeIn">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    ಸೆಟ್ಟಿಂಗ್ಸ್ ಉಳಿಸಲಾಗಿದೆ (Saved successfully)!
                  </span>
                )}
                <Button
                  onClick={handleSave}
                  className="bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md border-0"
                >
                  <Save className="w-3.5 h-3.5 mr-1.5" />
                  Save Voice Settings
                </Button>
              </div>
            </div>
          )}

          {/* Tab: Theme & Appearance (Dedicated Customizer) */}
          {activeTab === 'theme' && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex items-center gap-2.5 pb-4 border-b border-slate-200 dark:border-[#1E283D]">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Sun className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white tracking-tight">
                  Theme &amp; Visual Appearance
                </h3>
              </div>

              <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                Choose between luminous Pearl Light mode or ultra-premium Obsidian Glass dark mode.
              </p>

              {/* Theme Mode Option Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Dark Mode Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setTheme('dark')}
                  className={`p-5 rounded-3xl border-2 cursor-pointer transition-all shadow-md flex flex-col justify-between ${
                    theme === 'dark'
                      ? 'border-amber-400 bg-slate-900/90 text-white ring-2 ring-amber-400/40'
                      : 'border-slate-200 dark:border-[#1E283D] bg-slate-900 text-white'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-amber-300">
                        <Moon className="w-4 h-4" />
                      </div>
                      {theme === 'dark' && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-400 text-black font-mono font-bold text-[10px]">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <h4 className="font-extrabold text-sm mb-1">Obsidian Dark Mode</h4>
                    <p className="text-xs text-slate-400">Deep obsidian cyber glass with vibrant amber &amp; rose accents.</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center gap-1.5 text-xs text-amber-400 font-mono">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Recommended for Low-Light</span>
                  </div>
                </motion.div>

                {/* Light Mode Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setTheme('light')}
                  className={`p-5 rounded-3xl border-2 cursor-pointer transition-all shadow-md flex flex-col justify-between ${
                    theme === 'light'
                      ? 'border-amber-500 bg-amber-50/50 text-slate-900 ring-2 ring-amber-500/40'
                      : 'border-slate-200 dark:border-[#1E283D] bg-white text-slate-900'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-2xl bg-amber-100 flex items-center justify-center text-amber-600">
                        <Sun className="w-4 h-4" />
                      </div>
                      {theme === 'light' && (
                        <span className="px-2 py-0.5 rounded-full bg-amber-500 text-white font-mono font-bold text-[10px]">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <h4 className="font-extrabold text-sm mb-1 text-slate-900">Pearl Slate Light Mode</h4>
                    <p className="text-xs text-slate-600">High-contrast, crystal-clear typography on warm slate backdrops.</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center gap-1.5 text-xs text-amber-700 font-mono font-bold">
                    <Check className="w-3.5 h-3.5" />
                    <span>High Daylight Visibility</span>
                  </div>
                </motion.div>
              </div>

              {/* Quick Expanded Switcher */}
              <div className="pt-4 border-t border-slate-200 dark:border-[#1E283D]">
                <ThemeToggle expanded />
              </div>
            </div>
          )}

          {/* Tab: Business Profile */}
          {activeTab === 'business' && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Karnataka Business Profile</h3>
              <div className="space-y-3 font-mono text-xs">
                <div>
                  <label className="text-slate-700 dark:text-slate-400 block mb-1 font-bold">Company Name</label>
                  <input defaultValue="Karnataka Precision MSME Hub (Peenya Cluster)" className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-slate-900 dark:text-slate-200 font-sans font-medium" />
                </div>
                <div>
                  <label className="text-slate-700 dark:text-slate-400 block mb-1 font-bold">Karnataka GSTIN (State 29)</label>
                  <input defaultValue="29AABCU9603R1ZM" className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-amber-700 dark:text-amber-400 font-bold" />
                </div>
                <div>
                  <label className="text-slate-700 dark:text-slate-400 block mb-1 font-bold">Registered Industrial Cluster</label>
                  <input defaultValue="Peenya Industrial Area, Bengaluru - 560058, Karnataka" className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-slate-900 dark:text-slate-200 font-sans font-medium" />
                </div>
              </div>
            </div>
          )}

          {/* Tab: Notifications */}
          {activeTab === 'notifications' && (
            <div className="space-y-4 animate-fadeIn">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Notification Preferences</h3>
              <div className="space-y-2.5 text-xs text-slate-800 dark:text-slate-300 font-medium">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-amber-500" />
                  <span>Real-time Kannada voice inquiry transcription alerts</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-amber-500" />
                  <span>Mysuru-Bengaluru expressway &amp; NMPT port logistics alerts</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="accent-amber-500" />
                  <span>UPI milestone escrow payment verification webhooks</span>
                </label>
              </div>
            </div>
          )}

          {/* Tab: Security */}
          {activeTab === 'security' && (
            <div className="space-y-4 font-mono text-xs animate-fadeIn">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white font-sans">Bhashini AI Security &amp; Keys</h3>
              <div>
                <label className="text-slate-700 dark:text-slate-400 block mb-1 font-bold">Bhashini Karnataka Live API Key</label>
                <input type="password" defaultValue="bhashini_karnataka_secret_key_8923184" className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-slate-900 dark:text-slate-200" readOnly />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

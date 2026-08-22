'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic, ShieldCheck, Sparkles, Mail, Lock, Phone, ArrowRight,
  CheckCircle2, Key, Globe, User, Building2, Check, Radio
} from 'lucide-react';
import { BhashaLogo } from '@/components/bhasha-logo';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/theme-toggle';

export default function LoginPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<'VOICE_OTP' | 'PASSWORD'>('VOICE_OTP');
  const [phoneOrEmail, setPhoneOrEmail] = useState('+91 98801 23456');
  const [password, setPassword] = useState('karnataka_msme_2024');
  const [otpDigits, setOtpDigits] = useState(['7', '8', '9', '2']);
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState<string>('buyer');

  const PERSONAS = [
    {
      id: 'buyer',
      role: 'Karnataka Buyer',
      kannada: 'ಖರೀದಿದಾರರು',
      name: 'Suresh Gowda',
      cluster: 'Peenya CNC Cluster, Bengaluru',
      cred: 'suresh@peenyaprecision.in'
    },
    {
      id: 'supplier',
      role: 'MSME Artisan',
      kannada: 'ರೇಷ್ಮೆ ನೇಕಾರರು',
      name: 'Balaji Silk Weavers',
      cluster: 'Mysuru Silk Corridor',
      cred: 'balaji@mysuresilk.org'
    },
    {
      id: 'officer',
      role: 'State Desk',
      kannada: 'ರಾಜ್ಯ ಅಧಿಕಾರಿ',
      name: 'Dr. Ramesh Patil',
      cluster: 'GeM & Karnataka MSME Dept',
      cred: 'patil@karnataka.gov.in'
    }
  ];

  const handleSelectPersona = (p: typeof PERSONAS[0]) => {
    setSelectedPersona(p.id);
    setPhoneOrEmail(p.cred);
    if (p.id === 'buyer') setOtpDigits(['7', '8', '9', '2']);
    if (p.id === 'supplier') setOtpDigits(['4', '5', '1', '9']);
    if (p.id === 'officer') setOtpDigits(['2', '9', '0', '1']);
  };

  const handleSimulateVoiceOtp = () => {
    setIsVoiceRecording(true);
    setOtpDigits(['', '', '', '']);
    setTimeout(() => {
      setOtpDigits(['7', '8', '9', '2']);
      setIsVoiceRecording(false);
    }, 1400);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/app/overview');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090E] text-slate-900 dark:text-slate-100 relative overflow-hidden flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-700 dark:selection:text-amber-200 transition-colors duration-300">
      {/* Top Background Ambient Mesh Lights */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-rose-500/10 via-amber-500/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-indigo-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Top Nav Header */}
      <header className="relative z-20 max-w-7xl w-full mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <BhashaLogo size={36} textClassName="text-slate-900 dark:text-white font-extrabold" />
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/"
            className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Main Split Grid (Dribbble Layout) */}
      <main className="relative z-10 max-w-6xl w-full mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center my-auto">
        {/* Left Column: Visual Brand Showcase & Interactive Persona Selectors (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 dark:bg-amber-500/15 border border-amber-300 dark:border-amber-500/30 text-amber-800 dark:text-amber-300 font-mono font-bold text-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Digital India Bhashini Indic NLU</span>
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Sign in to Karnataka&apos;s Voice-First MSME Sourcing Hub.
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
              Access 1,840+ verified manufacturers across 31 districts, conduct multi-turn Kannada voice inquiries, and settle milestone payments with Dynamic UPI Escrow.
            </p>
          </div>

          {/* Dribbble-Grade Interactive Holographic Testimonial Card */}
          <div className="p-5 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] shadow-xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-[#1E283D] shrink-0">
                <img
                  src="/images/mysore_silk.jpg"
                  alt="Mysuru Silk Artisan"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">Balaji Silk Handlooms (Mysuru)</h4>
                <p className="text-xs text-amber-700 dark:text-amber-400 font-mono font-bold">100% Verified GOTS &amp; Silk Mark</p>
              </div>
              <Badge variant="green" size="xs" className="ml-auto">Active Node</Badge>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 italic font-serif leading-relaxed">
              &ldquo;ಭಾಷಾ ಬ್ರಿಡ್ಜ್ ಮೂಲಕ ನಮ್ಮ ಮೈಸೂರು ರೇಷ್ಮೆ ಸೀರೆಗಳಿಗೆ ನೇರವಾಗಿ ಬೆಂಗಳೂರು ಮತ್ತು ವಿದೇಶಿ ಖರೀದಿದಾರರಿಂದ ಆರ್ಡರ್‌ಗಳು ಬರುತ್ತಿವೆ. ಧ್ವನಿ ಆಧಾರಿತ ವ್ಯಾಪಾರ ಸುಲಭವಾಗಿದೆ!&rdquo;
            </p>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-[#1E283D] text-[11px] font-mono">
              <span className="text-slate-500">SETTLED VIA ESCROW:</span>
              <span className="font-black text-emerald-600 dark:text-emerald-400">₹9,85,000 Zero-Default</span>
            </div>
          </div>

          {/* Quick Demo Persona Switchers */}
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">
              1-Click Demo Persona Login:
            </span>
            <div className="grid grid-cols-3 gap-2">
              {PERSONAS.map((p) => {
                const isSelected = selectedPersona === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPersona(p)}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer shadow-sm ${
                      isSelected
                        ? 'border-amber-400 bg-amber-50 dark:bg-amber-500/15 text-slate-900 dark:text-white ring-2 ring-amber-400/30'
                        : 'border-slate-200 dark:border-[#1E283D] bg-white dark:bg-[#0E1422] text-slate-700 dark:text-slate-400 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-400">{p.kannada}</span>
                      {isSelected && <Check className="w-3 h-3 text-amber-500 stroke-[3]" />}
                    </div>
                    <div className="font-bold text-xs truncate text-slate-900 dark:text-white">{p.name}</div>
                    <div className="text-[10px] text-slate-500 truncate">{p.cluster.split(',')[0]}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Modern Glass Authentication Box (6 cols) */}
        <div className="lg:col-span-6 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden"
          >
            {/* Top Accent Gradient Bar */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-600 via-amber-500 to-yellow-400" />

            {/* Auth Mode Tabs */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E283D]">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Workspace Sign In</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">Secure Karnataka MSME Portal</p>
              </div>

              {/* Toggle Switch */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-[11px] font-mono font-bold">
                <button
                  type="button"
                  onClick={() => setAuthMode('VOICE_OTP')}
                  className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                    authMode === 'VOICE_OTP'
                      ? 'bg-amber-500 text-black shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  🎙️ Voice OTP
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('PASSWORD')}
                  className={`px-2.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                    authMode === 'PASSWORD'
                      ? 'bg-amber-500 text-black shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Password
                </button>
              </div>
            </div>

            {/* Form Body */}
            <form onSubmit={handleLogin} className="space-y-4 text-xs font-mono">
              {/* Identifier Input */}
              <div>
                <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">
                  MOBILE PHONE / GSTIN / EMAIL:
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={phoneOrEmail}
                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 pl-10 rounded-xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-slate-900 dark:text-white font-sans text-xs font-bold focus:outline-none focus:border-amber-400"
                    required
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                </div>
              </div>

              {/* Mode 1: One-Touch Voice OTP */}
              {authMode === 'VOICE_OTP' && (
                <div className="space-y-3 p-4 rounded-2xl bg-amber-50/50 dark:bg-[#0A0E1A] border border-amber-300/50 dark:border-amber-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-900 dark:text-amber-300">
                      4-DIGIT VERNACULAR OTP:
                    </span>
                    <button
                      type="button"
                      onClick={handleSimulateVoiceOtp}
                      className="flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400 hover:underline cursor-pointer"
                    >
                      <Mic className="w-3.5 h-3.5 animate-pulse" />
                      <span>{isVoiceRecording ? 'ಧ್ವನಿ ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದೆ...' : 'ಧ್ವನಿ ಮೂಲಕ ಹೇಳಿ (Speak OTP)'}</span>
                    </button>
                  </div>

                  {/* 4 Digit Boxes */}
                  <div className="flex items-center justify-center gap-3 py-1">
                    {otpDigits.map((digit, idx) => (
                      <div
                        key={idx}
                        className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-black font-mono transition-all ${
                          digit
                            ? 'bg-amber-400 text-black shadow-md border border-amber-300 scale-105'
                            : 'bg-white dark:bg-[#07090E] border border-slate-200 dark:border-slate-800 text-slate-400'
                        }`}
                      >
                        {digit || '•'}
                      </div>
                    ))}
                  </div>

                  <p className="text-[10px] text-slate-600 dark:text-slate-400 text-center">
                    Instant Kannada Voice OTP powered by Digital India Bhashini.
                  </p>
                </div>
              )}

              {/* Mode 2: Password Input */}
              {authMode === 'PASSWORD' && (
                <div className="space-y-1">
                  <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">
                    ENTER PASSWORD:
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 pl-10 rounded-xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-slate-900 dark:text-white font-sans text-xs font-bold focus:outline-none focus:border-amber-400"
                      required
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-amber-500 to-yellow-400 hover:from-rose-700 text-white font-black text-xs shadow-xl shadow-amber-500/25 border-0 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Launch Procurement Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            {/* Bottom Links */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-[#1E283D] text-xs font-mono">
              <Link
                href="/auth/register"
                className="text-amber-700 dark:text-amber-400 font-bold hover:underline"
              >
                + Register New MSME
              </Link>
              <Link
                href="/auth/forgot-password"
                className="text-slate-500 hover:text-slate-900 dark:hover:text-white"
              >
                Forgot Credentials?
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 max-w-7xl w-full mx-auto px-6 py-4 text-center text-xs text-slate-500 dark:text-slate-400 font-mono border-t border-slate-200 dark:border-[#171E2E]">
        © 2024 Bhasha Bridge. Enterprise Vernacular MSME Sourcing Infrastructure.
      </footer>
    </div>
  );
}

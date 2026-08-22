'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Building2, MapPin, User, ShieldCheck, Sparkles, ArrowRight,
  Phone, Mail, CheckCircle2, Lock, FileText, Check
} from 'lucide-react';
import { BhashaLogo } from '@/components/bhasha-logo';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/theme-toggle';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState<'BUYER' | 'SUPPLIER'>('BUYER');
  const [fullName, setFullName] = useState('Suresh Gowda');
  const [companyName, setCompanyName] = useState('Peenya Precision Engineering Hub');
  const [phone, setPhone] = useState('+91 98801 23456');
  const [cluster, setCluster] = useState('Peenya Industrial Area, Bengaluru');
  const [gstin, setGstin] = useState('29AABCU9603R1ZM');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/app/overview');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#07090E] text-slate-900 dark:text-slate-100 relative overflow-hidden flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-700 dark:selection:text-amber-200 transition-colors duration-300">
      {/* Background Ambient Lights */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-bl from-rose-500/10 via-amber-500/10 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-tr from-indigo-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none" />

      {/* Top Nav Header */}
      <header className="relative z-20 max-w-7xl w-full mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <BhashaLogo size={36} textClassName="text-slate-900 dark:text-white font-extrabold" />
        </Link>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/auth/login"
            className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-300 transition-colors"
          >
            Existing MSME? Sign In →
          </Link>
        </div>
      </header>

      {/* Main Register Form Grid */}
      <main className="relative z-10 max-w-6xl w-full mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center my-auto">
        {/* Left Column: Visual Highlights (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/15 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-mono font-bold text-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Karnataka State 29 GST Verification</span>
            </span>

            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
              Onboard your Enterprise onto Bhasha Bridge.
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Join 1,840+ Karnataka MSMEs with zero setup cost, instant Digital India Bhashini NLU support, and subsidized milestone escrow protection.
            </p>
          </div>

          <div className="space-y-3 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#111624] border border-slate-200 dark:border-[#1E283D] flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">AI-Assisted Vernacular Discovery</h4>
                <p className="text-slate-500 text-[11px]">Direct Kannada &amp; English ASR Entity extraction</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-[#111624] border border-slate-200 dark:border-[#1E283D] flex items-center gap-3 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Bank-Grade UPI Milestone Escrow</h4>
                <p className="text-slate-500 text-[11px]">NPCI bank-cleared escrow protection with zero default</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Register Form Card (7 cols) */}
        <div className="lg:col-span-7">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] p-6 sm:p-8 shadow-2xl space-y-5 relative overflow-hidden"
          >
            {/* Top Accent Gradient Bar */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-rose-600 via-amber-500 to-yellow-400" />

            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E283D]">
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Register MSME Workspace</h2>
                <p className="text-xs text-slate-500 font-mono mt-0.5">Quick 1-Minute Enterprise Onboarding</p>
              </div>

              {/* Role Switcher */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-[11px] font-mono font-bold">
                <button
                  type="button"
                  onClick={() => setRole('BUYER')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    role === 'BUYER'
                      ? 'bg-amber-500 text-black shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Buyer (ಖರೀದಿದಾರ)
                </button>
                <button
                  type="button"
                  onClick={() => setRole('SUPPLIER')}
                  className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    role === 'SUPPLIER'
                      ? 'bg-amber-500 text-black shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Supplier (ತಯಾರಕ)
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">FULL NAME (ಹೆಸರು):</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 pl-9 rounded-xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-slate-900 dark:text-white font-sans text-xs font-bold focus:outline-none focus:border-amber-400"
                      required
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">MOBILE PHONE (ದೂರವಾಣಿ):</label>
                  <div className="relative">
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 pl-9 rounded-xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-slate-900 dark:text-white font-sans text-xs font-bold focus:outline-none focus:border-amber-400"
                      required
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">ENTERPRISE NAME (ಕಂಪನಿ ಹೆಸರು):</label>
                <div className="relative">
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-3.5 py-2.5 pl-9 rounded-xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-slate-900 dark:text-white font-sans text-xs font-bold focus:outline-none focus:border-amber-400"
                    required
                  />
                  <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">KARNATAKA GSTIN (STATE 29):</label>
                  <input
                    type="text"
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-amber-700 dark:text-amber-400 font-bold text-xs focus:outline-none focus:border-amber-400"
                    required
                  />
                </div>

                <div>
                  <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">REGISTERED CLUSTER:</label>
                  <select
                    value={cluster}
                    onChange={(e) => setCluster(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-slate-900 dark:text-slate-200 font-sans text-xs focus:outline-none focus:border-amber-400"
                  >
                    <option>Peenya Industrial Area, Bengaluru</option>
                    <option>Mysuru Silk &amp; Handloom Corridor</option>
                    <option>Belagavi Foundry Complex</option>
                    <option>Davangere Central Textile Mills</option>
                    <option>Mangaluru NMPT Port Cargo Zone</option>
                  </select>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-amber-500 to-yellow-400 hover:from-rose-700 text-white font-black text-xs shadow-xl shadow-amber-500/25 border-0 flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <span>Create Verified Workspace &amp; Launch</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            <div className="pt-3 border-t border-slate-100 dark:border-[#1E283D] text-center text-xs font-mono">
              <Link href="/auth/login" className="text-amber-700 dark:text-amber-400 font-bold hover:underline">
                Already registered? Sign In →
              </Link>
            </div>
          </motion.div>
        </div>
      </main>

      <footer className="relative z-20 max-w-7xl w-full mx-auto px-6 py-4 text-center text-xs text-slate-500 dark:text-slate-400 font-mono border-t border-slate-200 dark:border-[#171E2E]">
        © 2024 Bhasha Bridge. Enterprise Vernacular MSME Sourcing Infrastructure.
      </footer>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, MessageSquare, Search, Truck, Settings, LogOut,
  HelpCircle, Sparkles, CreditCard, Bell, Globe, ArrowRight, Activity, Plus,
  ShieldCheck, BarChart3, QrCode, Building2, Mic, Radio, Calculator
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { BhashaLogo } from '@/components/bhasha-logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { QuickVoiceModal } from '@/components/voice/QuickVoiceModal';
import { CommandPalette } from '@/components/search/CommandPalette';

const NAV_ITEMS = [
  { href: '/app/overview',            icon: LayoutDashboard, label: 'Dashboard',         badge: null },
  { href: '/app/voice-assistant',     icon: MessageSquare,   label: 'Voice Inquiries',   badge: 'NLU 2.0' },
  { href: '/app/rfq-broadcast',       icon: Radio,           label: 'RFQ Broadcast',     badge: 'Live Bids' },
  { href: '/app/supplier-discovery',  icon: Search,          label: 'Supplier Discovery',badge: 'AI' },
  { href: '/app/trusted-vendors',     icon: ShieldCheck,     label: 'Trusted Vendors',   badge: 'Verified' },
  { href: '/app/procurement-history', icon: Truck,           label: 'Orders & Logistics',badge: 'Live' },
  { href: '/app/payments',            icon: QrCode,          label: 'QR Pay & Escrow',   badge: 'UPI' },
  { href: '/app/calculator',          icon: Calculator,      label: 'Freight Calculator',badge: 'GST 29' },
  { href: '/app/analytics',           icon: BarChart3,       label: 'MSME Analytics',    badge: '3D' },
  { href: '/app/utilities',           icon: Sparkles,        label: 'B2B & ONDC Tools',  badge: null },
  { href: '/app/settings',            icon: Settings,        label: 'Platform Settings', badge: null },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isQuickVoiceOpen, setIsQuickVoiceOpen] = useState(false);
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-[#07090E] text-slate-900 dark:text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-700 dark:selection:text-amber-200 transition-colors duration-300">
      {/* ── Left Sidebar: Ultra-Premium Responsive Glass ─────────────────────────── */}
      <aside className="hidden md:flex flex-col w-64 shrink-0 border-r border-slate-200 dark:border-[#171E2E] bg-white/95 dark:bg-[#0A0D16]/95 backdrop-blur-2xl relative z-20 transition-colors duration-300">
        {/* Ambient Top Glow in dark mode */}
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-amber-500/10 via-rose-500/5 to-transparent pointer-events-none opacity-0 dark:opacity-100 transition-opacity" />

        {/* Brand / Logo Header with Landing Page Logo */}
        <div className="px-5 py-5 flex items-center justify-between border-b border-slate-200 dark:border-[#171E2E] relative z-10 gap-4">
          <Link href="/app/overview" className="flex items-center gap-2 min-w-0">
            <BhashaLogo size={28} textClassName="text-slate-900 dark:text-white" />
          </Link>
          <div className="shrink-0">
            <ThemeToggle />
          </div>
        </div>

        {/* Action Button: + New Discovery (3D Gradient) */}
        <div className="px-4 pt-4 pb-2 relative z-10">
          <Button
            onClick={() => setIsQuickVoiceOpen(true)}
            className="w-full justify-center gap-2 rounded-xl bg-gradient-to-r from-rose-600 via-amber-500 to-yellow-500 hover:from-rose-700 hover:to-amber-600 text-white font-bold transition-all duration-300 shadow-lg shadow-amber-500/25 text-xs py-2.5 h-auto border-0 cursor-pointer active:scale-[0.98]"
          >
            <Mic className="w-4 h-4 animate-pulse" />
            <span>Quick Voice Search</span>
          </Button>
        </div>

        {/* Primary Navigation */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto relative z-10 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-800">
          {NAV_ITEMS.map(({ href, icon: Icon, label, badge }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs transition-all duration-200 group cursor-pointer relative overflow-hidden",
                  active
                    ? "bg-amber-100/90 dark:bg-amber-500/20 text-slate-950 dark:text-amber-300 font-extrabold border border-amber-400 dark:border-amber-400/50 shadow-sm"
                    : "text-slate-800 dark:text-slate-200 font-semibold hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#161D2E]"
                )}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-gradient-to-b from-amber-500 to-rose-500 rounded-r-full" />
                )}
                <Icon className={cn("w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110", active ? "text-amber-600 dark:text-amber-400 stroke-[2.5]" : "text-slate-600 dark:text-slate-300 group-hover:text-amber-500 dark:group-hover:text-amber-400")} />
                <span className="flex-1 leading-none">{label}</span>
                {badge && (
                  <Badge variant="secondary" className="text-[9px] py-0 px-1.5 h-4 font-mono font-bold bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-500/40">
                    {badge}
                  </Badge>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-slate-200 dark:border-[#171E2E] space-y-1 relative z-10 bg-white dark:bg-[#0A0D16]">
          <Link
            href="/app/admin"
            className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-800 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#161D2E] transition-colors"
          >
            <Activity className="w-3.5 h-3.5 text-emerald-500" />
            <span>Bengaluru.Node.31Districts</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-auto animate-pulse"></span>
          </Link>
          <div className="flex items-center justify-between px-3 py-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
            <span className="flex items-center gap-1.5 hover:text-slate-950 dark:hover:text-white cursor-pointer" onClick={() => router.push('/app/utilities')}>
              <HelpCircle className="w-3.5 h-3.5" />
              API Docs
            </span>
            <span className="flex items-center gap-1.5 hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer" onClick={() => router.push('/')}>
              <LogOut className="w-3.5 h-3.5" />
              Exit
            </span>
          </div>
        </div>
      </aside>

      {/* ── Main Content Area ─────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 max-h-screen relative overflow-hidden">
        {/* Top Header Bar */}
        <header className="flex items-center justify-between px-6 h-16 border-b border-slate-200 dark:border-[#171E2E] bg-white/80 dark:bg-[#0A0D16]/80 backdrop-blur-xl shrink-0 z-20 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <Link href="/" className="md:hidden flex items-center gap-2">
              <BhashaLogo size={24} textClassName="text-slate-900 dark:text-slate-100" />
            </Link>
            <div className="hidden md:flex items-center gap-2 text-xs font-medium text-slate-600 dark:text-slate-400 font-mono">
              <span className="text-amber-700 dark:text-amber-400 font-bold">Bhasha Bridge</span>
              <span>/</span>
              <span>Karnataka MSME</span>
              <span>/</span>
              <span className="text-slate-900 dark:text-slate-200 capitalize font-bold">{pathname.split('/')[2] || 'Overview'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Spotlight Search Trigger */}
            <button
              onClick={() => setIsCommandPaletteOpen(true)}
              className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-[#0E1422] border border-slate-200 dark:border-[#1E283D] text-xs text-slate-500 hover:border-amber-400 dark:hover:border-amber-500/40 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer font-mono"
            >
              <Search className="w-3.5 h-3.5 text-amber-500" />
              <span>Search Karnataka MSMEs...</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-[#161D2E] border border-slate-200 dark:border-slate-700 text-[10px] font-bold text-slate-700 dark:text-slate-300">
                ⌘K
              </kbd>
            </button>

            {/* Direct QR Pay Quick Button */}
            <Button
              onClick={() => router.push('/app/payments')}
              size="sm"
              className="h-8 px-3 rounded-lg bg-amber-500/15 dark:bg-gradient-to-r dark:from-amber-500/20 dark:to-rose-500/20 border border-amber-400/40 text-amber-800 dark:text-amber-300 hover:bg-amber-500/25 text-xs font-bold font-mono flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <QrCode className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="hidden sm:inline">UPI Dynamic Pay</span>
            </Button>

            <ThemeToggle />

            <button
              onClick={() => router.push('/app/settings')}
              title="Language: Kannada / English"
              className="h-8 px-2.5 rounded-lg bg-slate-100 dark:bg-[#121724] hover:bg-slate-200 dark:hover:bg-[#1A2234] border border-slate-200 dark:border-[#171E2E] flex items-center gap-1.5 text-xs text-amber-800 dark:text-amber-300 transition-colors cursor-pointer font-bold"
            >
              <Globe className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span className="hidden sm:inline">ಕನ್ನಡ / EN</span>
            </button>

            <div
              onClick={() => router.push('/app/settings')}
              className="flex items-center gap-2 pl-2 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-rose-600 via-amber-500 to-yellow-400 p-[1.5px] shadow-sm">
                <div className="w-full h-full rounded-full bg-white dark:bg-[#0A0D16] flex items-center justify-center text-xs font-bold text-amber-700 dark:text-amber-300">
                  KA
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto relative z-10 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-800">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 pb-28 md:pb-12">
            {children}
          </div>

          {/* Global Footer */}
          <footer className="max-w-7xl mx-auto px-4 md:px-8 py-6 border-t border-slate-200 dark:border-[#171E2E] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600 dark:text-slate-400 font-mono">
            <div>© 2024 Bhasha Bridge. Enterprise AI-Assisted Vernacular MSME Sourcing.</div>
            <div className="flex items-center gap-4">
              <Link href="/app/trusted-vendors" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Trusted Vendors</Link>
              <Link href="/app/payments" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Dynamic QR Pay</Link>
              <Link href="/app/analytics" className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors">Supply Chain AI</Link>
              <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                Bhashini ASR Online
              </span>
            </div>
          </footer>
        </main>

        {/* ── Global Floating Action Button (FAB) for Instant Voice AI ── */}
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsQuickVoiceOpen(true)}
          className="fixed bottom-20 md:bottom-8 right-6 z-40 w-14 h-14 rounded-full bg-gradient-to-tr from-rose-600 via-amber-500 to-yellow-400 text-white flex items-center justify-center shadow-2xl shadow-amber-500/40 cursor-pointer group"
          title="Quick Kannada Voice AI Search"
        >
          <span className="absolute -inset-1 rounded-full border-2 border-amber-400/60 animate-ping opacity-75" />
          <Mic className="w-6 h-6 animate-pulse text-white relative z-10" />
        </motion.button>

        {/* ── Quick Voice Modal Popup ── */}
        <QuickVoiceModal
          isOpen={isQuickVoiceOpen}
          onClose={() => setIsQuickVoiceOpen(false)}
        />

        {/* ── Spotlight Search Command Palette (⌘K) ── */}
        <CommandPalette
          isOpen={isCommandPaletteOpen}
          onClose={() => setIsCommandPaletteOpen(false)}
        />

        {/* ── Mobile Bottom Navigation ────────────────────────── */}
        <nav className="md:hidden fixed bottom-0 inset-x-0 border-t border-slate-200 dark:border-[#171E2E] bg-white/95 dark:bg-[#0A0D16]/95 backdrop-blur-2xl z-40 flex items-center justify-around px-2 py-2">
          {NAV_ITEMS.slice(0, 5).map(({ href, icon: Icon, label }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 px-3 py-1.5 rounded-lg min-w-14 transition-colors",
                  active ? "text-amber-600 dark:text-amber-400 font-bold" : "text-slate-600 dark:text-slate-400"
                )}
              >
                <Icon size={18} />
                <span className="text-[10px] font-medium leading-none">{label.split(' ')[0]}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}

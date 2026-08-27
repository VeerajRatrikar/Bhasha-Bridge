'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Smartphone, Monitor, Mic, Search, QrCode, LayoutDashboard,
  ShieldCheck, Battery, Wifi, Signal, Sparkles, ChevronLeft
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface MobileAppSimulatorWrapperProps {
  children: React.ReactNode;
}

export function MobileAppSimulatorWrapper({ children }: MobileAppSimulatorWrapperProps) {
  // Mobile App Simulator Toggle (defaults to active Mobile App View)
  const [isMobileDeviceView, setIsMobileDeviceView] = useState(true);
  const pathname = usePathname();

  const MOBILE_TABS = [
    { href: '/app/overview', icon: LayoutDashboard, label: 'Home' },
    { href: '/app/voice-assistant', icon: Mic, label: 'Voice AI' },
    { href: '/app/payments', icon: QrCode, label: 'UPI Pay' },
    { href: '/app/supplier-discovery', icon: Search, label: 'Suppliers' },
    { href: '/app/trusted-vendors', icon: ShieldCheck, label: 'Vendors' },
  ];

  return (
    <div className="min-h-screen bg-[#050810] text-white flex flex-col items-center justify-start font-sans">
      {/* ── Top Mode Switcher Banner ──────────────────────────── */}
      <header className="w-full bg-slate-950/90 border-b border-amber-500/20 py-2.5 px-4 backdrop-blur-xl sticky top-0 z-50 flex items-center justify-between text-xs font-mono">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="font-extrabold text-amber-300">Bhasha Bridge Native Mobile App Simulator</span>
          <Badge variant="gold" size="xs">Flutter / React Native UI</Badge>
        </div>

        {/* Device Mode Toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMobileDeviceView(true)}
            className={`px-3 py-1 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              isMobileDeviceView
                ? 'bg-amber-500 text-black border-amber-400 shadow-md font-extrabold'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>📱 Mobile App View</span>
          </button>

          <button
            onClick={() => setIsMobileDeviceView(false)}
            className={`px-3 py-1 rounded-xl border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              !isMobileDeviceView
                ? 'bg-amber-500 text-black border-amber-400 shadow-md font-extrabold'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>💻 Full Desktop Web</span>
          </button>
        </div>
      </header>

      {/* ── Main Viewport Area ────────────────────────── */}
      {isMobileDeviceView ? (
        <div className="w-full flex-1 py-6 flex items-center justify-center p-2 sm:p-6">
          {/* Smartphone Frame Container */}
          <div className="relative w-full max-w-[420px] h-[840px] bg-slate-950 rounded-[48px] border-[10px] border-slate-800 shadow-[0_0_80px_rgba(245,158,11,0.15)] flex flex-col overflow-hidden">

            {/* iOS / Android Status Bar */}
            <div className="h-11 bg-slate-950 px-6 pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400 select-none border-b border-slate-900">
              <span className="font-bold text-white">9:41 AM</span>

              {/* Speaker Notch */}
              <div className="w-24 h-4 bg-slate-900 rounded-full border border-slate-800 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-slate-950" />
              </div>

              <div className="flex items-center gap-1.5">
                <Signal className="w-3 h-3" />
                <Wifi className="w-3 h-3 text-amber-400" />
                <Battery className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            </div>

            {/* Mobile Application Screen Content */}
            <div className="flex-1 overflow-y-auto scrollbar-none bg-[#070A12] p-4">
              {children}
            </div>

            {/* Mobile Bottom Navigation Bar */}
            <nav className="h-16 bg-[#0A0D16] border-t border-slate-900 flex items-center justify-around px-2 z-40">
              {MOBILE_TABS.map((tab) => {
                const isActive = pathname === tab.href;
                const Icon = tab.icon;
                return (
                  <Link
                    key={tab.href}
                    href={tab.href}
                    className={`flex flex-col items-center justify-center gap-1 px-3 py-1 rounded-xl transition-all ${
                      isActive
                        ? 'text-amber-400 font-extrabold scale-105'
                        : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                    <span className="text-[10px] font-mono leading-none">{tab.label}</span>
                  </Link>
                );
              })}
            </nav>

            {/* Home Indicator Notch */}
            <div className="h-4 bg-[#0A0D16] flex items-center justify-center pb-1">
              <div className="w-32 h-1 bg-slate-700 rounded-full" />
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex-1">
          {children}
        </div>
      )}
    </div>
  );
}

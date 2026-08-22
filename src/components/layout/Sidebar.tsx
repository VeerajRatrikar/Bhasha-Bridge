'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Logo } from '../brand/Logo';
import { useApp } from '../../lib/store';
import {
  LayoutDashboard,
  Mic,
  Search,
  BookmarkCheck,
  History,
  BarChart3,
  ShieldCheck,
  Settings,
  Sparkles,
  Command
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();
  const { trustedVendors, queryHistory } = useApp();

  const navItems = [
    { label: 'Dashboard', href: '/app/overview', icon: LayoutDashboard },
    { label: 'Voice Studio', href: '/app/voice-assistant', icon: Mic, badge: 'Live AI' },
    { label: 'Supplier Discovery', href: '/app/supplier-discovery', icon: Search },
    { label: 'AI Match Rationale', href: '/app/recommendations', icon: Sparkles },
    { label: 'Saved Vendors', href: '/app/trusted-vendors', icon: BookmarkCheck, count: trustedVendors.length },
    { label: 'Activity Log', href: '/app/procurement-history', icon: History, count: queryHistory.length },
    { label: 'Analytics & Health', href: '/app/analytics', icon: BarChart3 },
    { label: 'Admin Console', href: '/app/admin', icon: ShieldCheck, badge: 'Ops' },
    { label: 'Settings', href: '/app/settings', icon: Settings },
  ];

  return (
    <aside className="hidden lg:flex flex-col w-64 border-r border-slate-200 dark:border-zinc-800 bg-white dark:bg-[#09090b] shrink-0 h-screen sticky top-0 z-30 select-none transition-colors duration-300">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-200 dark:border-zinc-800 flex items-center justify-between">
        <Link href="/app/overview">
          <Logo size="md" showTagline />
        </Link>
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto px-3 py-5 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-mono font-bold uppercase tracking-widest text-orange-600 dark:text-orange-500">
          Procurement Workspace
        </div>

        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          const Icon = item.icon;

          return (
            <Link key={item.href} href={item.href} className="relative block">
              {isActive && (
                <motion.div
                  layoutId="activeNavGlow"
                  className="absolute inset-0 rounded-xl bg-orange-500/10 dark:bg-orange-500/15 border border-orange-500/30 shadow-sm"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}

              <div
                className={`relative flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'text-orange-600 dark:text-orange-400 font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-[#18181b]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-orange-500' : 'text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30">
                    {item.badge}
                  </span>
                )}

                {item.count !== undefined && item.count > 0 && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-orange-500/15 text-orange-600 dark:text-orange-400">
                    {item.count}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* User Profile & Keyboard Shortcut Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-zinc-800 bg-slate-50 dark:bg-[#18181b]/50">
        <div className="flex items-center justify-between mb-3 text-[10px] text-slate-500 dark:text-slate-400 font-mono">
          <span className="flex items-center gap-1">
            <Command className="w-3 h-3 text-orange-500" /> Cmd + K
          </span>
          <span className="text-orange-600 dark:text-orange-400 font-bold">Quick Palette</span>
        </div>

        <div className="flex items-center gap-3 p-2 rounded-xl bg-white dark:bg-[#09090b] border border-slate-200 dark:border-zinc-800">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-600 p-0.5 shrink-0">
            <div className="w-full h-full rounded-lg bg-white dark:bg-[#09090b] flex items-center justify-center font-black text-xs text-orange-600 dark:text-orange-400">
              KA
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">MSME Buyer Workspace</h4>
            <p className="text-[10px] text-orange-600 dark:text-orange-400 font-mono truncate">Bhashini Vernacular AI</p>
          </div>
        </div>
      </div>
    </aside>
  );
}


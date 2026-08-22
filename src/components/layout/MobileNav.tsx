'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '../../lib/store';
import {
  LayoutDashboard,
  Mic,
  Search,
  BookmarkCheck,
  BarChart3,
  Settings
} from 'lucide-react';

export function MobileNav() {
  const pathname = usePathname();
  const { isListening, setIsListening } = useApp();

  const mobileNavItems = [
    { label: 'Home', href: '/app/overview', icon: LayoutDashboard },
    { label: 'Search', href: '/app/supplier-discovery', icon: Search },
    { label: 'Trusted', href: '/app/trusted-vendors', icon: BookmarkCheck },
    { label: 'Analytics', href: '/app/analytics', icon: BarChart3 },
    { label: 'Settings', href: '/app/settings', icon: Settings },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white dark:bg-slate-950 border-t border-gray-300 dark:border-slate-700/80 px-4 py-2 flex items-center justify-around select-none transition-colors duration-300">
      {mobileNavItems.slice(0, 2).map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 text-xs font-medium transition-colors ${
              isActive 
                ? 'text-blue-600 dark:text-blue-400 font-semibold' 
                : 'text-gray-600 dark:text-slate-500 hover:text-gray-900 dark:hover:text-slate-200'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        );
      })}

      {/* Floating Center Voice Assistant FAB */}
      <div className="relative -top-5 flex flex-col items-center">
        <button
          onClick={() => setIsListening(!isListening)}
          className={`flex items-center justify-center w-14 h-14 rounded-full shadow-xl transition-all font-medium ${
            isListening
              ? 'bg-gradient-to-tr from-red-500 to-pink-600 text-white animate-pulse ring-4 ring-red-500/40'
              : 'bg-gradient-to-tr from-blue-600 to-cyan-500 text-white shadow-blue-500/40 ring-4 ring-white dark:ring-slate-950 hover:shadow-2xl'
          }`}
        >
          <Mic className="w-6 h-6" />
        </button>
        <span className="text-xs font-bold uppercase tracking-tight text-blue-600 dark:text-blue-400 mt-1">
          Voice
        </span>
      </div>

      {mobileNavItems.slice(2).map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 text-xs font-medium transition-colors ${
              isActive 
                ? 'text-blue-600 dark:text-blue-400 font-semibold' 
                : 'text-gray-600 dark:text-slate-500 hover:text-gray-900 dark:hover:text-slate-200'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}

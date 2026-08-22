'use client';

import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export function Logo({ size = 'md', showTagline = false }: LogoProps) {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-4xl'
  };

  return (
    <div className="flex items-center gap-3 select-none group">
      {/* Icon: Orange Bridge Emblem */}
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-600 p-2 shadow-md shadow-orange-500/25 ${iconSizes[size]}`}>
        <svg className="w-full h-full text-white" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 24C11 14 25 14 31 24" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="11" y1="23" x2="11" y2="14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="18" y1="21" x2="18" y2="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
          <line x1="25" y1="23" x2="25" y2="14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M8 27C13 22 23 22 28 27" stroke="currentColor" strokeWidth="2" strokeOpacity="0.8" />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className={`font-black tracking-tight font-sans text-slate-900 dark:text-white ${textSizes[size]}`}>
          <span>Bhasha</span>
          <span className="text-orange-600 dark:text-orange-500">Bridge</span>
        </div>
        {showTagline && (
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 -mt-0.5">
            Vernacular AI Procurement
          </span>
        )}
      </div>
    </div>
  );
}

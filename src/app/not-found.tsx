'use client';

import React from 'react';
import Link from 'next/link';
import { Home, Search, ArrowLeft, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(45,226,230,0.12),transparent_24%),radial-gradient(circle_at_bottom,rgba(16,185,129,0.08),transparent_30%)] pointer-events-none" />

      <div className="relative z-10 max-w-xl text-center">
        <div className="relative mb-8">
          <div
            className="text-[10rem] font-black leading-none select-none"
            style={{
              background: 'linear-gradient(135deg, #0f172a 0%, #334155 40%, #22d3ee 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              opacity: 0.75,
            }}
          >
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-slate-900/80 border border-slate-700/60 backdrop-blur-sm flex items-center justify-center shadow-2xl shadow-cyan-950/20">
              <Search className="w-9 h-9 text-cyan-400" />
            </div>
          </div>
        </div>

        <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900/70 p-8 backdrop-blur-xl shadow-2xl shadow-slate-950/30">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-[11px] font-semibold text-cyan-200 mx-auto">
            <Sparkles className="h-3.5 w-3.5" /> Page not available
          </span>
          <h1 className="text-2xl font-extrabold text-slate-100">We couldn’t find that page.</h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            The link may be outdated or the page may have moved. Use the home page or the voice studio to continue exploring the platform.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href="/app/overview"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/40 active:scale-95"
            >
              <Home className="w-4 h-4" />
              Go to dashboard
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-200 text-sm font-semibold transition-all active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

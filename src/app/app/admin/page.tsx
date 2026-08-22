'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Store, ShieldCheck, Handshake, DollarSign, Download, RefreshCw,
  TrendingUp, Activity, Users, Database, Globe
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function AdminControlPanel() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 pb-12"
    >
      {/* ── Header & Action Controls ────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-[#1E283D]">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>Karnataka MSME Platform Telemetry</span>
          </h1>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
            Bhasha Bridge state-wide executive summary and telemetry across 31 Karnataka districts.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => alert('Karnataka state telemetry exported.')}
            className="text-xs border-slate-200 dark:border-[#1E283D] bg-white dark:bg-[#0E1422] text-slate-800 dark:text-amber-300 rounded-xl font-bold"
          >
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Export State Data
          </Button>
          <Button
            size="sm"
            onClick={handleRefresh}
            className="text-xs bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-700 text-white font-bold rounded-xl shadow-md border-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh Telemetry
          </Button>
        </div>
      </div>

      {/* ── 4 Executive Metric Cards ────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: TOTAL KARNATAKA MSMES */}
        <div className="rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] p-6 flex flex-col justify-between shadow-md">
          <div>
            <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3">
              <span>KARNATAKA MSMES</span>
              <Store className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-mono">
              14,289
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#1E283D] flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-mono font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14% across 31 districts</span>
          </div>
        </div>

        {/* Card 2: ACTIVE KARNATAKA SUPPLIERS */}
        <div className="rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] p-6 flex flex-col justify-between shadow-md">
          <div>
            <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3">
              <span>ACTIVE SUPPLIERS</span>
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-mono">
              3,450
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#1E283D] flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-mono font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+8% in Peenya &amp; Mysuru</span>
          </div>
        </div>

        {/* Card 3: SUCCESSFUL MATCHES */}
        <div className="rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] p-6 flex flex-col justify-between shadow-md">
          <div>
            <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3">
              <span>SUCCESSFUL MATCHES</span>
              <Handshake className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-mono">
              8,912
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#1E283D] flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-mono font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>96.4% NLU accuracy</span>
          </div>
        </div>

        {/* Card 4: TRANSACTION VOLUME */}
        <div className="rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] p-6 flex flex-col justify-between shadow-md">
          <div>
            <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-3">
              <span>TOTAL ESCROW SETTLED</span>
              <DollarSign className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-mono">
              ₹4.2M
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-[#1E283D] flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-mono font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Zero payment defaults</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
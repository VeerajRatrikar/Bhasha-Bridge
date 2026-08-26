'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  BarChart3, TrendingUp, Activity, ShieldCheck, Globe, Zap,
  Layers, Download, RefreshCw, Sparkles, CheckCircle2, ArrowUpRight, Cpu
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { SupplyChainGlobe } from '@/components/3d/SupplyChainGlobe';

export default function MSMEAnalyticsPage() {
  const router = useRouter();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeDistrictFilter, setActiveDistrictFilter] = useState('ALL');

  const CLUSTER_DATA = [
    { name: 'Mysuru Silk & Weaving', demandGrowth: '+24%', avgLeadTime: '2.1 Days', priceIndex: '₹4,850/kg', trend: 'up' },
    { name: 'Peenya CNC Precision Tooling', demandGrowth: '+32%', avgLeadTime: '1.4 Days', priceIndex: '₹185/unit', trend: 'up' },
    { name: 'Davangere Cotton Mills', demandGrowth: '+18%', avgLeadTime: '3.0 Days', priceIndex: '₹220/kg', trend: 'up' },
    { name: 'Belagavi & Hubballi Valves', demandGrowth: '+15%', avgLeadTime: '4.2 Days', priceIndex: '₹1,450/unit', trend: 'stable' },
    { name: 'Mangaluru NMPT Maritime Coastal', demandGrowth: '+28%', avgLeadTime: '1.8 Days', priceIndex: '₹3,200/TEU', trend: 'up' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-6xl mx-auto space-y-8 pb-12"
    >
      {/* ── Page Header ────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-[#1E283D]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              MSME Supply Chain Intelligence &amp; Telemetry
            </h1>
            <Badge variant="gold" size="xs">Live Telemetry</Badge>
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
            Real-time vernacular NLU performance, cluster demand forecasts, and national digital platform health.
          </p>
        </div>

        <Button
          onClick={() => {
            setIsRefreshing(true);
            setTimeout(() => setIsRefreshing(false), 700);
          }}
          className="bg-gradient-to-r from-rose-600 via-amber-500 to-yellow-400 hover:from-rose-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md border-0"
        >
          <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh Telemetry</span>
        </Button>
      </div>

      {/* ── 3D WebGL Interactive Globe & Node Telemetry Hero ── */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-[#0B101D] to-[#0A0D16] border border-amber-500/30 p-6 md:p-8 shadow-2xl overflow-hidden text-white flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="max-w-md space-y-3 z-10">
          <Badge variant="gold" size="xs">Three.js 3D WebGL Mesh</Badge>
          <h2 className="text-xl md:text-2xl font-black tracking-tight">
            Karnataka 31-Districts 3D Industrial Node Network
          </h2>
          <p className="text-xs text-slate-300 font-mono leading-relaxed">
            Real-time WebGL spatial telemetry visualizing active supply chain corridors, foundry flows, and milestone escrows across Peenya, Mysuru, Belagavi, Davangere, and Mangaluru.
          </p>
          <div className="flex items-center gap-3 pt-1 text-xs font-mono font-bold text-amber-300">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>350 Active Nodes</span>
            </span>
            <span>•</span>
            <span className="text-emerald-400">0.4ms Latency</span>
          </div>
        </div>

        <div className="w-full lg:w-80 h-72 relative z-10 shrink-0">
          <SupplyChainGlobe />
        </div>
      </div>

      {/* ── Top Metric Cards ────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Metric 1: Task Completion Time */}
        <div className="p-6 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] space-y-3 shadow-md">
          <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 font-bold">
            <span>TASK COMPLETION TIME</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">1.8 min</div>
          <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>68% faster than typing</span>
          </div>
        </div>

        {/* Metric 2: Vernacular Success Rate */}
        <div className="p-6 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] space-y-3 shadow-md">
          <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 font-bold">
            <span>NLU INTENT PRECISION</span>
            <Cpu className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="text-3xl font-black text-cyan-600 dark:text-cyan-300 font-mono">96.4%</div>
          <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Kannada code-switching</span>
          </div>
        </div>

        {/* Metric 3: System Usability Score (SUS) */}
        <div className="p-6 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] space-y-3 shadow-md">
          <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 font-bold">
            <span>MSME USABILITY (SUS)</span>
            <Activity className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">88.2 / 100</div>
          <div className="text-xs font-mono text-slate-600 dark:text-slate-400 font-bold">Top Quartile Industrial Score</div>
        </div>

        {/* Metric 4: Escrow Sourcing Volume */}
        <div className="p-6 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] space-y-3 shadow-md">
          <div className="flex items-center justify-between text-xs font-mono text-slate-600 dark:text-slate-400 font-bold">
            <span>UPI ESCROW SECURED</span>
            <ShieldCheck className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">₹4.2M</div>
          <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
            <span>100% Zero-Default Rate</span>
          </div>
        </div>
      </div>

      {/* ── Cluster Demand Index Table ────────────────── */}
      <div className="rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-[#1E283D]">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Karnataka Industrial Cluster Demand &amp; Price Index
          </h2>
          <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">Live 15-Minute Feed</span>
        </div>

        {/* District Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
          {[
            { id: 'ALL', label: 'All 31 Districts' },
            { id: 'PEENYA', label: '⚙️ Peenya CNC' },
            { id: 'MYSURU', label: '🧶 Mysuru Silk' },
            { id: 'BELAGAVI', label: '🔧 Belagavi Foundry' },
            { id: 'DAVANGERE', label: '📦 Davangere Cotton' },
            { id: 'MANGALURU', label: '⚓ Mangaluru Port' }
          ].map((dist) => (
            <button
              key={dist.id}
              onClick={() => setActiveDistrictFilter(dist.id)}
              className={`px-3 py-1.5 rounded-xl border font-bold transition-all cursor-pointer ${
                activeDistrictFilter === dist.id
                  ? 'bg-amber-500 text-black border-amber-400 font-extrabold shadow-md'
                  : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-400'
              }`}
            >
              {dist.label}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 dark:border-[#1E283D] text-slate-600 dark:text-slate-400 font-bold">
                <th className="pb-3">CLUSTER / SECTOR</th>
                <th className="pb-3">M-O-M GROWTH</th>
                <th className="pb-3">AVG LEAD TIME</th>
                <th className="pb-3">CURRENT PRICE INDEX</th>
                <th className="pb-3">STATE SOURCING STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-[#1E283D] text-slate-900 dark:text-slate-200">
              {CLUSTER_DATA.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 dark:hover:bg-[#121829] transition-colors">
                  <td className="py-3.5 font-bold font-sans text-slate-900 dark:text-white">{row.name}</td>
                  <td className="py-3.5 text-emerald-600 dark:text-emerald-400 font-black">{row.demandGrowth}</td>
                  <td className="py-3.5 text-slate-700 dark:text-slate-300">{row.avgLeadTime}</td>
                  <td className="py-3.5 font-black text-amber-700 dark:text-amber-300">{row.priceIndex}</td>
                  <td className="py-3.5">
                    <Badge variant="green" size="xs">Optimal Supply</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}

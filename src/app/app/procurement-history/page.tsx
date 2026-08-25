'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Truck, Package, MapPin, Calendar, CheckCircle2, Clock,
  ArrowRight, Search, Filter, ShieldCheck, QrCode, FileText,
  ExternalLink, ChevronRight, AlertCircle
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LogisticsRoute3D } from '@/components/3d/LogisticsRoute3D';

export default function ProcurementHistoryPage() {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const ORDERS = [
    {
      id: 'ORD-KA-9921',
      product: 'Pure Mulberry Silk Yarns (200 GSM)',
      vendor: 'Balaji Silk & Textiles Ltd.',
      hub: 'Mysuru ➔ Bengaluru Expressway',
      amount: '₹9,85,000',
      status: 'In Transit',
      statusBadge: 'blue' as const,
      date: 'Aug 16, 2024',
      eta: 'Tomorrow, 2:00 PM',
      tracking: 'KA-EXP-889921',
      milestone: 'Expressway Toll Gate 4 Passed (Bidadi)'
    },
    {
      id: 'ORD-KA-9874',
      product: 'Precision Haas CNC Gear Teeth (500 Pcs)',
      vendor: 'Peenya Precision CNC Hub',
      hub: 'Peenya Stage 2 ➔ Bommasandra Hub',
      amount: '₹6,50,000',
      status: 'Delivered',
      statusBadge: 'green' as const,
      date: 'Aug 12, 2024',
      eta: 'Delivered Aug 13',
      tracking: 'KA-EXP-774412',
      milestone: 'Quality Inspected & Escrow Released'
    },
    {
      id: 'ORD-KA-9710',
      product: 'Ductile Iron Hydraulic Valves (100 Units)',
      vendor: 'Belagavi Heavy Valves & Foundry',
      hub: 'Belagavi ➔ Hubballi-Dharwad Corridor',
      amount: '₹4,20,000',
      status: 'Processing',
      statusBadge: 'gold' as const,
      date: 'Aug 15, 2024',
      eta: 'Aug 19, 2024',
      tracking: 'KA-EXP-553319',
      milestone: 'Foundry Hydrostatic Testing at 25 Bar'
    },
    {
      id: 'ORD-KA-9540',
      product: 'Organic Green Cardamom (500 kg)',
      vendor: 'Western Ghats Spices & Arabica Co.',
      hub: 'Chikkamagaluru ➔ Mangaluru Port NMPT',
      amount: '₹7,10,000',
      status: 'Delivered',
      statusBadge: 'green' as const,
      date: 'Aug 04, 2024',
      eta: 'Delivered Aug 06',
      tracking: 'KA-EXP-221190',
      milestone: 'Customs Cleared at NMPT Container Freight Station'
    }
  ];

  const filteredOrders = ORDERS.filter((ord) => {
    const matchesStatus = filterStatus === 'ALL' || ord.status === filterStatus;
    const matchesSearch =
      ord.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ord.vendor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 pb-12"
    >
      {/* ── Header ────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-[#1E283D]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Orders &amp; Karnataka Logistics Telemetry
            </h1>
            <Badge variant="green" size="xs">Live E-Way Track</Badge>
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
            Track ongoing MSME shipments across 31 Karnataka Districts &amp; State Toll Gates.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.push('/app/payments')}
            className="bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md border-0"
          >
            <QrCode className="w-3.5 h-3.5 mr-1.5" />
            <span>Escrow Terminal</span>
          </Button>
        </div>
      </div>

      {/* ── 3D WebGL Highway Logistics Track Banner ── */}
      <div className="rounded-3xl bg-slate-950 border border-emerald-500/30 p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-white font-mono text-xs">
        <div className="space-y-2 max-w-md">
          <Badge variant="green" size="xs">Three.js 3D Logistics Track</Badge>
          <h2 className="text-lg font-black text-white">Live Expressway Telemetry &amp; Toll Gate Beacons</h2>
          <p className="text-slate-400 text-xs font-sans leading-relaxed">
            Real-time GPS sensors transmitting 3D truck orientation, speed, and automated e-NACH toll gate milestone approvals.
          </p>
        </div>

        <div className="w-full md:w-72 h-44 shrink-0">
          <LogisticsRoute3D />
        </div>
      </div>

      {/* ── Filters & Search ────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-[#0A0D16] border border-slate-200 dark:border-[#1E283D] w-full sm:w-auto text-xs font-mono">
          {['ALL', 'In Transit', 'Delivered', 'Processing'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterStatus(tab)}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap font-bold ${
                filterStatus === tab
                  ? 'bg-amber-500 text-black shadow-sm'
                  : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-[#1E283D] w-full sm:w-72 shadow-sm">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search order ID, product, supplier..."
            className="w-full bg-transparent text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none font-sans font-medium"
          />
        </div>
      </div>

      {/* ── Orders List ────────────────── */}
      <div className="space-y-4">
        {filteredOrders.map((ord) => (
          <motion.div
            key={ord.id}
            whileHover={{ y: -2 }}
            className="rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] p-6 shadow-md transition-all space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-[#1E283D]">
              <div className="flex items-center gap-3">
                <span className="font-mono font-black text-sm text-slate-900 dark:text-white">{ord.id}</span>
                <Badge variant={ord.statusBadge} size="xs">{ord.status}</Badge>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400">{ord.date}</span>
              </div>
              <div className="text-right font-mono">
                <span className="text-base font-black text-slate-900 dark:text-white">{ord.amount}</span>
                <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold block">UPI ESCROW SECURED</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-500 block">COMMODITY &amp; VENDOR</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 font-sans block">{ord.product}</span>
                <span className="text-slate-600 dark:text-slate-400 font-sans">{ord.vendor}</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 block">KARNATAKA ROUTING HUB</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1 font-sans">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" />
                  {ord.hub}
                </span>
                <span className="text-slate-500 text-[11px]">ETA: {ord.eta}</span>
              </div>

              <div>
                <span className="text-[10px] text-slate-500 block">CURRENT TELEMETRY STATUS</span>
                <span className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1 font-sans">
                  <Truck className="w-3.5 h-3.5 text-amber-500" />
                  {ord.milestone}
                </span>
                <span className="text-slate-500 text-[11px]">E-Way Track: {ord.tracking}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

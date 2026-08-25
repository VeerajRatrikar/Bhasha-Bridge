'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Mic, MicOff, Sparkles, TrendingUp, ShieldCheck, MapPin,
  ChevronRight, ArrowUpRight, Clock, Building, Volume2, Globe,
  QrCode, UserPlus, Zap, CheckCircle2, Lock, ArrowRight, Package,
  Compass, Radio, Calculator, Activity, Truck, FileText
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { KarnatakaGisMap } from '@/components/maps/KarnatakaGisMap';
import { SupplyChainGlobe } from '@/components/3d/SupplyChainGlobe';
import { VoiceOrb3D } from '@/components/3d/VoiceOrb3D';

export default function OverviewPage() {
  const router = useRouter();
  const [isListening, setIsListening] = useState(true);

  const KARNATAKA_HUBS = [
    {
      title: 'Balaji Silk & Textiles Ltd.',
      hub: 'MYSURU HUB (140km)',
      district: 'Mysuru',
      image: '/images/mysore_silk.jpg',
      desc: 'Authentic Mysuru pure raw silk & high-density organic cotton weavers.',
      match: 98,
      capacity: '50k M/Mo',
      id: 'sup_1'
    },
    {
      title: 'Peenya Precision CNC Hub',
      hub: 'BENGALURU PEENYA (15km)',
      district: 'Bengaluru',
      image: '/images/peenya_cnc.jpg',
      desc: 'High-precision CNC machining, aerospace gear milling & industrial toolings.',
      match: 96,
      capacity: '20k Units/Mo',
      id: 'sup_2'
    },
    {
      title: 'Belagavi Foundry & Hydraulics',
      hub: 'BELAGAVI FOUNDRY CLUSTER (500km)',
      district: 'Belagavi',
      image: '/images/belagavi_foundry.jpg',
      desc: 'Molten ductile iron casting, industrial valves, and pump housings.',
      match: 94,
      capacity: '15k Valves/Mo',
      id: 'sup_4'
    },
    {
      title: 'Western Ghats Spices & Coffee',
      hub: 'CHIKKAMAGALURU & HASSAN (240km)',
      district: 'Chikkamagaluru',
      image: '/images/karnataka_spices.jpg',
      desc: 'Export-grade organic green cardamom pods and roasted arabica coffee.',
      match: 91,
      capacity: '30k Burlap Bags/Mo',
      id: 'sup_5'
    },
    {
      title: 'Channapatna Craft Artisans Co-op',
      hub: 'RAMANAGARA CLUSTER (60km)',
      district: 'Ramanagara',
      image: '/images/channapatna_crafts.jpg',
      desc: 'Traditional eco-friendly lacquered wooden handicrafts & precision turnings.',
      match: 89,
      capacity: '10k Sets/Mo',
      id: 'sup_6'
    },
    {
      title: 'Davangere Cotton Mills Pvt.',
      hub: 'DAVANGERE TEXTILE CORRIDOR (260km)',
      district: 'Davangere',
      image: '/images/raw_cotton.jpg',
      desc: 'Central Karnataka high-capacity cotton spinning & organic staple yarns.',
      match: 93,
      capacity: '80k Bales/Mo',
      id: 'sup_3'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 pb-12"
    >
      {/* ── Page Header ────────────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
            <span>Karnataka MSME Command Center</span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-gradient-to-r from-rose-600 to-amber-500 text-white font-bold font-mono shadow-sm">
              31 DISTRICTS
            </span>
          </h1>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
            Bhasha Bridge AI-Assisted Voice-First Vernacular Sourcing Platform.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            onClick={() => router.push('/app/rfq-broadcast')}
            className="bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-700 text-white text-xs font-bold font-mono px-3.5 py-2 rounded-xl shadow-md border-0"
          >
            <Radio className="w-3.5 h-3.5 mr-1.5 animate-pulse" />
            <span>Broadcast RFQ</span>
          </Button>

          <Button
            onClick={() => router.push('/app/calculator')}
            className="bg-amber-500/15 dark:bg-gradient-to-r dark:from-amber-500/20 dark:to-rose-500/20 border border-amber-400/40 text-amber-800 dark:text-amber-300 hover:bg-amber-500/25 text-xs font-bold font-mono px-3.5 py-2 rounded-xl shadow-sm"
          >
            <Calculator className="w-3.5 h-3.5 mr-1.5 text-amber-600 dark:text-amber-400" />
            <span>Freight Calculator</span>
          </Button>

          <Button
            onClick={() => router.push('/app/payments')}
            variant="outline"
            className="border-slate-200 dark:border-[#1E283D] bg-white dark:bg-[#0E1422] text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white text-xs font-mono rounded-xl font-bold"
          >
            <QrCode className="w-3.5 h-3.5 mr-1.5 text-amber-500" />
            <span>UPI Escrow</span>
          </Button>
        </div>
      </div>

      {/* ── 4 Bento Telemetry KPI Cards ────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] shadow-lg space-y-2"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>ESCROW SECURED</span>
            <Lock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">₹21.15L</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+18.4% Volume (Month)</span>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] shadow-lg space-y-2"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>VERIFIED MSMES</span>
            <Building className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">1,840+</div>
          <div className="text-[11px] text-amber-700 dark:text-amber-400 font-bold">
            Across 31 Districts
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] shadow-lg space-y-2"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>KANNADA NLU ACCURACY</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">96.4%</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
            Digital India Bhashini
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          className="p-5 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] shadow-lg space-y-2"
        >
          <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
            <span>EXPRESS LOGISTICS</span>
            <Truck className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">24-48h</div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold">
            Karnataka Expressway SLA
          </div>
        </motion.div>
      </div>

      {/* ── Top Hero Grid: 3D Voice Gyroscope Radar & Live Stats ────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Central 3D Voice Gyroscope Box */}
        <motion.div
          whileHover={{ y: -2 }}
          className="lg:col-span-2 relative rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:via-[#0E1322] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] p-8 flex flex-col items-center justify-center min-h-[320px] overflow-hidden group shadow-xl transition-all"
        >
          {/* 3D WebGL Voice Audio Energy Orb */}
          <div className="absolute inset-0 flex items-center justify-center opacity-40 pointer-events-none">
            <VoiceOrb3D isListening={isListening} />
          </div>

          {/* Radiant Background Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-72 h-72 rounded-full bg-rose-500/5 dark:bg-rose-600/10 animate-ping opacity-25" />
            <div className="w-56 h-56 rounded-full border border-amber-500/20 dark:border-amber-500/30 animate-[spin_20s_linear_infinite]" />
            <div className="w-40 h-40 rounded-full border border-dashed border-rose-500/30 dark:border-rose-500/40 animate-[spin_12s_linear_infinite_reverse]" />
          </div>

          {/* Interactive Mic Button */}
          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setIsListening(!isListening)}
              className="relative w-22 h-22 rounded-3xl bg-gradient-to-b from-rose-600 via-amber-500 to-yellow-400 flex items-center justify-center text-white shadow-2xl shadow-amber-500/30 cursor-pointer p-[2px]"
            >
              <div className="w-full h-full rounded-[22px] bg-white dark:bg-[#0A0D16] flex items-center justify-center transition-colors">
                {isListening ? (
                  <Mic className="w-9 h-9 animate-pulse text-rose-600 dark:text-amber-400" />
                ) : (
                  <MicOff className="w-9 h-9 text-slate-400" />
                )}
              </div>
              {isListening && (
                <span className="absolute -inset-1 rounded-3xl border-2 border-amber-400/60 animate-ping" />
              )}
            </motion.button>

            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-6 tracking-wide flex items-center justify-center gap-2">
              <span>{isListening ? 'ಕೇಳಿಸಿಕೊಳ್ಳಲಾಗುತ್ತಿದೆ (Listening in Kannada)...' : 'ಧ್ವನಿ ಹುಡುಕಾಟ ವಿರಾಮದಲ್ಲಿದೆ'}</span>
            </h3>

            {/* High Contrast Language Pill */}
            <div className="mt-3 flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-amber-300 dark:bg-[#1A1208] dark:text-amber-200 border-2 border-amber-400 shadow-md text-xs font-black font-mono">
              <Globe className="w-4 h-4 text-amber-400 shrink-0" />
              <span>ಕನ್ನಡ ASR + Code-Switching • Bengaluru Core Node</span>
            </div>

            <Button
              onClick={() => router.push('/app/voice-assistant')}
              variant="outline"
              size="sm"
              className="mt-5 text-xs rounded-xl border-slate-200 dark:border-[#1E283D] bg-slate-50 dark:bg-[#121726] hover:bg-slate-100 dark:hover:bg-[#1A2236] text-amber-800 dark:text-amber-300 font-bold shadow-sm cursor-pointer"
            >
              <span>Launch Conversational Studio</span>
              <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </motion.div>

        {/* Live Karnataka MSME Sourcing Telemetry Feed */}
        <motion.div
          whileHover={{ y: -2 }}
          className="rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:via-[#0E1322] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] p-6 flex flex-col justify-between shadow-xl transition-all font-mono"
        >
          <div>
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider mb-4">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" />
                <span>Live Sourcing Feed</span>
              </span>
              <Badge variant="green" size="xs">Live Stream</Badge>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#07090E] border border-slate-100 dark:border-[#1E283D] space-y-1">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-amber-700 dark:text-amber-400">PEENYA CNC CLUSTER</span>
                  <span className="text-slate-500">2m ago</span>
                </div>
                <p className="font-sans font-semibold text-slate-900 dark:text-slate-200 text-xs">
                  500 Pcs Haas Gear Teeth quoted at ₹1,220/pc with 48h SLA.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#07090E] border border-slate-100 dark:border-[#1E283D] space-y-1">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">MYSURU SILK NODE</span>
                  <span className="text-slate-500">8m ago</span>
                </div>
                <p className="font-sans font-semibold text-slate-900 dark:text-slate-200 text-xs">
                  ₹9,85,000 Milestone 1 Advance released to Balaji Silk Weavers.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-[#07090E] border border-slate-100 dark:border-[#1E283D] space-y-1">
                <div className="flex justify-between items-center text-[10px]">
                  <span className="font-bold text-rose-600 dark:text-rose-400">BELAGAVI FOUNDRY</span>
                  <span className="text-slate-500">14m ago</span>
                </div>
                <p className="font-sans font-semibold text-slate-900 dark:text-slate-200 text-xs">
                  NABL Hydrostatic 25-Bar inspection cleared for 120 Valves.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-[#1E283D] mt-3">
            <Link
              href="/app/rfq-broadcast"
              className="text-xs font-bold text-amber-700 dark:text-amber-400 flex items-center justify-between hover:underline"
            >
              <span>View All 18 Incoming Bids</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* ── Real-Time Karnataka MSME GIS Sourcing Map (Embedded Live) ── */}
      <KarnatakaGisMap />

      {/* ── Visual Karnataka Cluster Spotlight Grid ── */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
              Top Karnataka MSME Sourcing Hubs
            </h2>
          </div>

          <Link
            href="/app/supplier-discovery"
            className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1 hover:underline"
          >
            <span>View All 31 Districts</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {KARNATAKA_HUBS.map((hub, idx) => (
            <motion.div
              key={hub.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08, duration: 0.3 }}
              whileHover={{ y: -3 }}
              className="group rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] overflow-hidden shadow-xl hover:border-amber-400 transition-all flex flex-col justify-between"
            >
              <div>
                {/* Photo Thumbnail */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                  <img
                    src={hub.image}
                    alt={hub.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-between p-4">
                    <span className="text-[10px] font-mono font-black text-amber-300 uppercase tracking-wider self-start px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm border border-amber-400/40">
                      {hub.hub}
                    </span>
                    <div>
                      <h3 className="text-base font-extrabold text-white leading-tight">
                        {hub.title}
                      </h3>
                      <p className="text-xs text-emerald-400 font-mono font-bold flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3 h-3 text-rose-500" />
                        {hub.district}, Karnataka • {hub.match}% Match
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-3 font-mono text-xs">
                  <p className="text-slate-600 dark:text-slate-300 font-sans leading-relaxed text-xs">
                    {hub.desc}
                  </p>

                  <div className="flex justify-between items-center pt-2 border-t border-slate-100 dark:border-[#1E283D] text-[11px]">
                    <span className="text-slate-500">CAPACITY:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{hub.capacity}</span>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Button
                  onClick={() => router.push(`/app/suppliers/${hub.id}`)}
                  className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-[#121726] hover:bg-amber-500 hover:text-black dark:hover:bg-amber-500 dark:hover:text-black text-slate-900 dark:text-slate-200 font-bold text-xs transition-all border border-slate-200 dark:border-[#1E283D] flex items-center justify-center gap-1.5 cursor-pointer font-mono"
                >
                  <span>View Supplier Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
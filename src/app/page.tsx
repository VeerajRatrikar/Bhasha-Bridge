'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight, Mic, Globe2, ShieldCheck, Zap, Search, Building2,
  TrendingUp, Star, ChevronRight, Check, Sparkles, QrCode, Calculator,
  Radio, MapPin, Lock, Layers
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { BhashaLogo } from '@/components/bhasha-logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { RotatingMicHero } from '@/components/voice/RotatingMicHero';

const STATS = [
  { value: '12,400+', label: 'Verified MSME Suppliers', sub: 'Across 31 Karnataka Districts' },
  { value: '96.4%',   label: 'Kannada ASR Precision',  sub: 'Digital India Bhashini NLU' },
  { value: '₹21.15L', label: 'Escrow Volume Locked',   sub: 'NPCI UPI 2.0 & RTGS Secured' },
  { value: '< 1.8s',   label: 'Vernacular Query Latency', sub: 'Instant Voice-to-RFQ' },
];

const LUXURY_CLUSTERS = [
  {
    title: 'Mysuru Pure Mulberry Silk Corridor',
    kannada: 'ಮೈಸೂರು ಶುದ್ಧ ರೇಷ್ಮೆ',
    image: '/images/mysore_silk.jpg',
    location: 'Mysuru & Mandya, Karnataka',
    desc: 'Government Silk Mark certified organic raw silk yarns, handloom zari weaves, and high-density cotton staples.',
    stats: '50,000 Meters/Mo • 98% Match',
    href: '/app/suppliers/sup_1'
  },
  {
    title: 'Peenya Precision CNC Aerospace Hub',
    kannada: 'ಪೀಣ್ಯ ನಿಖರ ಸಿಎನ್‌ಸಿ',
    image: '/images/peenya_cnc.jpg',
    location: 'Bengaluru Peenya Industrial Estate',
    desc: 'High-precision 5-axis Haas CNC gear milling, automotive gearboxes, and aerospace titanium toolings.',
    stats: '20,000 Units/Mo • ISO 9001:2015',
    href: '/app/suppliers/sup_2'
  },
  {
    title: 'Belagavi Heavy Foundry & Valves',
    kannada: 'ಬೆಳಗಾವಿ ಫೌಂಡ್ರಿ ಕ್ಲಸ್ಟರ್',
    image: '/images/belagavi_foundry.jpg',
    location: 'Belagavi Foundry Corridor',
    desc: 'Ductile iron molten casting, NABL hydrostatic 25-bar tested industrial pump valves, and marine housings.',
    stats: '15,000 Valves/Mo • NABL Certified',
    href: '/app/suppliers/sup_4'
  },
  {
    title: 'Chikkamagaluru Organic Spices & Arabica',
    kannada: 'ಚಿಕ್ಕಮಗಳೂರು ಕಾಫಿ ಮತ್ತು ಸಾಂಬಾರ',
    image: '/images/karnataka_spices.jpg',
    location: 'Chikkamagaluru & Hassan',
    desc: 'Export-grade organic green cardamom pods, shade-grown roasted Arabica coffee beans, and Western Ghats spices.',
    stats: '30,000 Burlap Bags/Mo • Spices Board',
    href: '/app/suppliers/sup_5'
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#070A12] text-slate-100 font-sans selection:bg-amber-500/30 selection:text-amber-200">

      {/* ── Siteinspire Luxury Top Navigation Bar ────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 h-20 border-b border-amber-500/20 bg-[#070A12]/90 backdrop-blur-2xl transition-all">
        <div className="max-w-7xl mx-auto px-6 md:px-10 h-full flex items-center justify-between gap-8">
          <BhashaLogo size={32} textClassName="text-white font-extrabold tracking-tight" />

          <div className="hidden lg:flex items-center gap-8 text-xs font-mono font-bold tracking-widest uppercase text-slate-300">
            <a href="#clusters" className="hover:text-amber-400 transition-colors">Industrial Hubs</a>
            <a href="#voice" className="hover:text-amber-400 transition-colors">Kannada AI</a>
            <a href="#payments" className="hover:text-amber-400 transition-colors">UPI Escrow</a>
            <a href="#gis" className="hover:text-amber-400 transition-colors">31 Districts GIS</a>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="text-xs font-mono text-slate-300 hover:text-white font-bold">
                Sign In
              </Button>
            </Link>
            <Link href="/app/overview">
              <Button size="sm" className="bg-gradient-to-r from-rose-600 via-amber-500 to-yellow-400 hover:from-rose-700 text-white font-extrabold text-xs px-5 py-2 rounded-xl shadow-lg shadow-amber-500/20 border-0 flex items-center gap-2">
                <span>Enterprise Console</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Siteinspire Luxury Hero Section ──────────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 md:pt-48 md:pb-36 overflow-hidden">
        {/* Luxury Ambient Backlight */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-amber-500/15 via-rose-500/10 to-transparent blur-[140px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-6 md:px-8 text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-mono font-bold shadow-xl">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>Digital India Bhashini NLU • Karnataka State 31 Districts Node</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.08] text-white">
            Enterprise Vernacular AI Sourcing for{' '}
            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-rose-400 bg-clip-text text-transparent italic font-serif">
              Karnataka MSMEs
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-sans font-medium">
            Discover, verify, and secure milestone escrow payments with 12,400+ certified Karnataka manufacturers by speaking naturally in{' '}
            <span className="text-amber-300 font-bold">ಕನ್ನಡ</span>, English, or Code-Switched dialects.
          </p>

          {/* 3D Rotating Microphone Orb with Orbiting Vernacular Badges */}
          <div className="py-4">
            <RotatingMicHero />
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto pt-4">
            <Link href="/app/voice-assistant" className="w-full sm:w-auto">
              <Button size="lg" className="w-full h-13 px-8 bg-gradient-to-r from-rose-600 via-amber-500 to-yellow-400 hover:from-rose-700 text-white font-extrabold text-sm gap-2 shadow-2xl shadow-amber-500/30 border-0 rounded-2xl">
                <Mic className="w-4 h-4" /> Speak in Kannada (ಧ್ವನಿ ASR)
              </Button>
            </Link>
            <Link href="/app/overview" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full h-13 px-8 text-sm gap-2 border-amber-500/40 bg-slate-900/60 hover:bg-slate-800 text-white font-bold rounded-2xl">
                Command Console <ChevronRight className="w-4 h-4 text-amber-400" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Luxury Telemetry KPI Ribbon ──────────────────────────────────────────── */}
      <section className="border-y border-amber-500/20 bg-slate-950/80 backdrop-blur-xl py-10">
        <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-2 lg:grid-cols-4 gap-8 font-mono">
          {STATS.map((stat, idx) => (
            <div key={idx} className="space-y-1 text-center md:text-left border-l border-amber-500/20 pl-6">
              <div className="text-3xl sm:text-4xl font-black text-amber-300 tracking-tight">{stat.value}</div>
              <div className="text-xs font-bold text-white uppercase">{stat.label}</div>
              <div className="text-[11px] text-slate-400">{stat.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Luxury Industrial Hubs Showcase Grid ────────────────────────────────── */}
      <section id="clusters" className="py-24 max-w-7xl mx-auto px-6 md:px-10 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase">
              <Sparkles className="w-4 h-4" />
              <span>Karnataka MSME Artisan &amp; Manufacturing Hubs</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Curated Industrial Sourcing Corridors
            </h2>
          </div>

          <Link href="/app/supplier-discovery" className="text-xs font-mono font-bold text-amber-400 flex items-center gap-1 hover:underline">
            <span>Explore All 31 Districts</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {LUXURY_CLUSTERS.map((cluster, idx) => (
            <div
              key={idx}
              className="group rounded-3xl bg-slate-950 border border-amber-500/20 overflow-hidden shadow-2xl hover:border-amber-400 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                  <img
                    src={cluster.image}
                    alt={cluster.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070A12] via-[#070A12]/40 to-transparent flex flex-col justify-between p-6">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-amber-400/40 text-[10px] font-mono font-bold text-amber-300">
                        {cluster.location}
                      </span>
                      <span className="text-xs font-mono font-bold text-amber-300 bg-amber-500/20 px-2.5 py-0.5 rounded-full border border-amber-400/40">
                        {cluster.kannada}
                      </span>
                    </div>
                    <h3 className="text-xl font-extrabold text-white leading-snug">
                      {cluster.title}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-3 font-mono text-xs">
                  <p className="text-slate-300 font-sans text-xs leading-relaxed">
                    {cluster.desc}
                  </p>
                  <div className="pt-2 text-amber-300 font-bold text-[11px] border-t border-slate-900">
                    {cluster.stats}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <Link href={cluster.href}>
                  <Button className="w-full py-3 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-black text-amber-300 font-mono font-bold text-xs transition-all border border-amber-500/30 flex items-center justify-center gap-2">
                    <span>Inspect Supplier CAD &amp; Request RFQ</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Luxury Siteinspire Footer ──────────────────────────────────────────── */}
      <footer className="border-t border-amber-500/20 bg-slate-950 py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-3">
            <BhashaLogo size={24} textClassName="text-white" />
            <span>© 2024 Bhasha Bridge Karnataka Enterprise Platform.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <Link href="/app/overview" className="hover:text-amber-400 transition-colors">Command Dashboard</Link>
            <Link href="/app/supplier-discovery" className="hover:text-amber-400 transition-colors">Supplier Discovery</Link>
            <Link href="/app/payments" className="hover:text-amber-400 transition-colors">UPI Dynamic Escrow</Link>
            <Link href="/app/analytics" className="hover:text-amber-400 transition-colors">3D Telemetry</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
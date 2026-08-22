'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Mic, Globe2, ShieldCheck, Zap, Search, Building2, TrendingUp, Star, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { BhashaLogo } from '@/components/bhasha-logo';
import { ThemeToggle } from '@/components/theme-toggle';
import { RotatingMicHero } from '@/components/voice/RotatingMicHero';

const STATS = [
  { value: '12,400+', label: 'Verified Suppliers', sub: 'Across Karnataka' },
  { value: '94.2%',   label: 'NLU Accuracy',       sub: 'Bhashini Powered' },
  { value: '3 Langs', label: 'Supported',           sub: 'Kannada · English · Mixed' },
  { value: '< 2s',    label: 'Query Response',      sub: 'End-to-End Latency' },
];

const PIPELINE = [
  { step: '01', icon: Mic,         title: 'Voice Input',       desc: 'Speak naturally in Kannada, English, or code-switched Kannada-English. No training required.' },
  { step: '02', icon: Globe2,      title: 'Bhashini ASR',      desc: 'Government-grade speech recognition converts your audio to text in real time via the Bhashini API.' },
  { step: '03', icon: Zap,         title: 'NLU Extraction',    desc: 'Intent, product category, budget, and location entities are extracted from the transcribed text.' },
  { step: '04', icon: Search,      title: 'Semantic Retrieval', desc: 'Multi-factor scoring across 12,000+ verified MSME supplier profiles ranked for relevance.' },
  { step: '05', icon: ShieldCheck, title: 'Trust Ranking',     desc: '40% relevance · 30% trust score · 15% distance · 15% procurement history.' },
  { step: '06', icon: TrendingUp,  title: 'Voice Response',    desc: 'Bhashini TTS returns ranked results as natural audio in your preferred language.' },
];

const TESTIMONIALS = [
  { name: 'Ravi Kumar', role: 'Purchase Manager, Peenya', quote: 'Finding silk yarn suppliers used to take days. Now I just speak in Kannada and get 5 options in seconds.' },
  { name: 'Meena Devi', role: 'MSME Owner, Mysuru',       quote: 'The voice search works even when I mix Kannada and English. It understands exactly what I need.' },
  { name: 'Suresh Gowda', role: 'Procurement, Mandya',   quote: 'The trust scores give me confidence. I know exactly which suppliers are government-verified.' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Navbar ────────────────────────────────────────── */}
      <nav className="fixed top-0 inset-x-0 z-50 h-16 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-6xl mx-auto px-4 md:px-8 h-full flex items-center justify-between gap-8">
          <BhashaLogo size={32} textClassName="text-foreground" />

          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#pipeline" className="hover:text-foreground transition-colors">How it works</a>
            <a href="#stats"    className="hover:text-foreground transition-colors">Results</a>
            <a href="#trust"    className="hover:text-foreground transition-colors">Trust & Safety</a>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="text-sm">Sign in</Button>
            </Link>
            <Link href="/app/overview">
              <Button size="sm" className="bg-primary hover:bg-primary/90 text-white gap-2 text-sm">
                Open Console <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-[480px] h-[480px] rounded-full bg-primary/8 blur-[100px]" />
          <div className="absolute bottom-1/4 left-1/4 w-[360px] h-[360px] rounded-full bg-secondary/8 blur-[100px]" />
        </div>

        <div className="relative max-w-6xl mx-auto px-4 md:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/25 bg-primary/8 text-primary text-xs font-mono mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            Powered by Bhashini · Ministry of Electronics & IT, Government of India
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 leading-[1.1]">
            Source suppliers in<br />
            <span className="bg-gradient-to-r from-primary via-amber-500 to-rose-500 bg-clip-text text-transparent">your own language</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            BhashaBridge lets Indian MSME procurement teams find, verify, and compare local suppliers by speaking naturally in Kannada, English, or both — no typing required.
          </p>

          {/* 3D Rotating Microphone Orb with Orbiting Vernacular Badges */}
          <RotatingMicHero />

          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-16">
            <Link href="/app/voice-assistant">
              <Button size="lg" className="w-full sm:w-auto h-12 px-8 bg-primary hover:bg-primary/90 text-white text-base gap-2 shadow-md">
                <Mic className="w-4 h-4" /> Try Voice Search — Free
              </Button>
            </Link>
            <Link href="/app/overview">
              <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base gap-2 border-border hover:bg-muted">
                View Dashboard <ChevronRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* Social proof bar */}
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-primary" /> No signup to try</span>
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-primary" /> Government-verified suppliers</span>
            <span className="flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-primary" /> Works in Kannada & English</span>
          </div>
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────── */}
      <section id="stats" className="py-16 border-y border-border bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl md:text-4xl font-extrabold text-foreground tracking-tight">{s.value}</div>
                <div className="text-sm font-semibold text-foreground/80 mt-1">{s.label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Pipeline ──────────────────────────────────────── */}
      <section id="pipeline" className="py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">6-Layer AI Pipeline</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">From voice to verified supplier</h2>
            <p className="text-muted-foreground max-w-xl mx-auto">Every query runs through a government-grade NLU pipeline that understands code-switched Indian vernacular speech.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PIPELINE.map((p) => (
              <div key={p.step} className="group relative bg-card border border-border rounded-xl p-6 transition-all hover:border-primary/50">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/15 transition-colors">
                    <p.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-mono text-muted-foreground mb-1">{p.step}</div>
                    <h3 className="font-semibold text-foreground mb-2">{p.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Trust Section ─────────────────────────────────── */}
      <section id="trust" className="py-24 bg-muted/20 border-y border-border">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-secondary/10 text-secondary border-secondary/20 hover:bg-secondary/10">Trust & Safety</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-5">Every supplier is verified</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We cross-reference GSTIN, UDYAM registration, and direct field verification before any supplier appears in results. Our trust score combines five independent signals.
              </p>
              <ul className="space-y-3">
                {[
                  'GSTIN verification via government API',
                  'UDYAM MSME registration cross-check',
                  'Field verification by local agents',
                  'Buyer review score (1,200+ verified reviews)',
                  'Fulfilment rate from past procurement',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm">
                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              {TESTIMONIALS.map((t) => (
                <div key={t.name} className="bg-card border border-border rounded-xl p-5">
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed mb-4">"{t.quote}"</p>
                  <div>
                    <div className="text-sm font-semibold">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4 md:px-8 text-center">
          <div className="max-w-2xl mx-auto bg-card border border-border rounded-2xl p-10 md:p-14">
            <Building2 className="w-10 h-10 text-primary mx-auto mb-5" />
            <h2 className="text-3xl font-bold mb-4">Ready to transform procurement?</h2>
            <p className="text-muted-foreground mb-8">
              Join 800+ Karnataka MSME teams already using BhashaBridge to source smarter — no English required.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Link href="/auth/register">
                <Button size="lg" className="w-full sm:w-auto h-12 px-8 bg-primary hover:bg-primary/90 text-white text-base">
                  Create Free Account
                </Button>
              </Link>
              <Link href="/app/overview">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base border-border hover:bg-muted">
                  Explore Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className="border-t border-border py-10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <BhashaLogo size={28} textClassName="text-foreground" />
          <p className="text-sm text-muted-foreground text-center">
            A vernacular MSME supplier discovery platform · Powered by{' '}
            <a href="https://bhashini.gov.in" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Bhashini</a>
            {' '}· Government of India Initiative
          </p>
        </div>
      </footer>
    </div>
  );
}
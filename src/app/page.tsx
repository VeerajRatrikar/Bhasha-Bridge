'use client';

import React from 'react';
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
        </div>
      </section>

      {/* ── Stats ─────────────────────────────────────────── */}
      <section id="stats" className="py-16 border-y border-border bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s, i) => (
            <div key={i} className="space-y-1">
              <div className="text-3xl md:text-4xl font-extrabold font-mono text-foreground">{s.value}</div>
              <div className="text-sm font-semibold text-foreground">{s.label}</div>
              <div className="text-xs text-muted-foreground">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works pipeline ─────────────────────────── */}
      <section id="pipeline" className="py-24 max-w-6xl mx-auto px-4 md:px-8 space-y-16">
        <div className="text-center space-y-4">
          <Badge variant="outline" size="default">Architecture Pipeline</Badge>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            How BhashaBridge Processes Vernacular Input
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From spoken audio in Kannada to verified local supplier matches in under two seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PIPELINE.map((p, i) => {
            const Icon = p.icon;
            return (
              <div key={i} className="p-6 rounded-2xl border border-border bg-card space-y-4 hover:border-primary/40 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-muted-foreground">{p.step}</span>
                </div>
                <h3 className="font-bold text-base">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Testimonials ───────────────────────────────────── */}
      <section id="trust" className="py-24 border-t border-border bg-muted/20">
        <div className="max-w-6xl mx-auto px-4 md:px-8 space-y-16">
          <div className="text-center space-y-4">
            <Badge variant="outline" size="default">User Trust &amp; Feedback</Badge>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Trusted by MSMEs Across Karnataka
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="p-6 rounded-2xl border border-border bg-card space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex gap-1 text-amber-500">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-sm text-muted-foreground italic leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                </div>
                <div>
                  <div className="font-bold text-sm text-foreground">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="border-t border-border py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground font-mono">
          <div className="flex items-center gap-2">
            <BhashaLogo size={24} textClassName="text-foreground" />
            <span>© 2024 BhashaBridge. Vernacular AI-Assisted Sourcing for MSMEs.</span>
          </div>

          <div className="flex items-center gap-6">
            <Link href="/app/overview" className="hover:text-foreground transition-colors">Console</Link>
            <Link href="/app/supplier-discovery" className="hover:text-foreground transition-colors">Suppliers</Link>
            <Link href="/app/payments" className="hover:text-foreground transition-colors">Dynamic QR Pay</Link>
            <Link href="/app/analytics" className="hover:text-foreground transition-colors">Analytics</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
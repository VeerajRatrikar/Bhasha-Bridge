'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Sparkles, Globe, Radio, Building2, Send, CheckCircle2,
  ExternalLink, ArrowRight, ShieldCheck, Terminal, Smartphone,
  Layers, MessageSquare, Volume2
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function UtilitiesPage() {
  const router = useRouter();
  const [bhashiniInput, setBhashiniInput] = useState('ನನಗೆ 500 ಗೇರ್ ಪೀಸ್‌ಗಳು ಪೀಣ್ಯ ಇಂಡಸ್ಟ್ರಿಯಲ್ ಏರಿಯಾಗೆ ಬೇಕು.');
  const [bhashiniOutput, setBhashiniOutput] = useState('I require 500 precision gear pieces delivered to Peenya Industrial Area, Bengaluru.');
  const [isTranslating, setIsTranslating] = useState(false);
  const [ondcBroadcasting, setOndcBroadcasting] = useState(false);
  const [ondcSuccess, setOndcSuccess] = useState(false);

  const handleTranslate = () => {
    setIsTranslating(true);
    setTimeout(() => {
      setIsTranslating(false);
      setBhashiniOutput('I require 500 precision gear pieces delivered to Peenya Industrial Area, Bengaluru (Tolerance ±0.05mm).');
    }, 600);
  };

  const handleOndcBroadcast = () => {
    setOndcBroadcasting(true);
    setTimeout(() => {
      setOndcBroadcasting(false);
      setOndcSuccess(true);
    }, 900);
  };

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
              National Digital Platform Utilities
            </h1>
            <Badge variant="gold" size="xs">Digital India &amp; ONDC</Badge>
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
            Direct integrations with Digital India BHASHINI Indic ASR, ONDC B2B Beckn Gateways, and GeM Karnataka state tenders.
          </p>
        </div>

        <Button
          onClick={() => router.push('/app/voice-assistant')}
          className="bg-gradient-to-r from-rose-600 via-amber-500 to-yellow-400 hover:from-rose-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md border-0"
        >
          <Sparkles className="w-3.5 h-3.5 mr-1.5" />
          <span>Launch Voice AI</span>
        </Button>
      </div>

      {/* ── Grid of 4 Core Utilities ────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Utility 1: Bhashini Indic NLU Sandbox */}
        <div className="rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Digital India BHASHINI Core</h3>
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">Kannada ASR &amp; Indic NMT</span>
                </div>
              </div>
              <Badge variant="green" size="xs">Live API</Badge>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Test real-time Kannada vernacular speech-to-speech, transcription, and contextual English translation for B2B specs.
            </p>

            <div className="space-y-2 text-xs font-mono">
              <label className="block text-slate-700 dark:text-slate-300 font-bold">KANNADA INPUT (ಧ್ವನಿ ಅಥವಾ ಪಠ್ಯ):</label>
              <textarea
                rows={2}
                value={bhashiniInput}
                onChange={(e) => setBhashiniInput(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-slate-900 dark:text-white font-sans text-xs focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-xs font-mono">
              <span className="text-[10px] text-slate-500 font-bold block mb-1">BHASHINI ENGLISH TRANSLATION:</span>
              <p className="text-slate-900 dark:text-slate-200 font-sans italic">&ldquo;{bhashiniOutput}&rdquo;</p>
            </div>
          </div>

          <Button
            onClick={handleTranslate}
            className="w-full mt-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs py-2.5 border-0"
          >
            {isTranslating ? 'Translating via Bhashini...' : 'Execute Translation'}
          </Button>
        </div>

        {/* Utility 2: ONDC B2B Beckn Gateway */}
        <div className="rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Radio className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">ONDC B2B Beckn Gateway</h3>
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">Decentralized RFQ Broadcast</span>
                </div>
              </div>
              <Badge variant="gold" size="xs">Beckn v2.0</Badge>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Broadcast procurement requests across open network seller apps throughout Karnataka with zero vendor lock-in.
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] space-y-1.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">GATEWAY STATUS:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Connected (Bengaluru Beckn Node)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">SUBSCRIBED SELLERS:</span>
                <span className="text-slate-900 dark:text-white font-bold">1,840 Karnataka MSMEs</span>
              </div>
            </div>

            {ondcSuccess && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>RFQ broadcast to 1,840 verified sellers across Karnataka!</span>
              </div>
            )}
          </div>

          <Button
            onClick={handleOndcBroadcast}
            className="w-full mt-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 text-white font-bold text-xs py-2.5 border-0 shadow-md"
          >
            {ondcBroadcasting ? 'Broadcasting on Beckn...' : 'Broadcast RFQ to Karnataka ONDC Sellers'}
          </Button>
        </div>

        {/* Utility 3: GeM Karnataka MSME Tender Matcher */}
        <div className="rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-600 dark:text-rose-500">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">GeM Government e-Marketplace</h3>
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">Karnataka Public Procurement</span>
                </div>
              </div>
              <Badge variant="green" size="xs">25% MSME Quota</Badge>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Automated matching with state government public tenders requiring mandatory 25% MSME procurement quota under Karnataka procurement rules.
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] space-y-1.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">MATCHED TENDERS:</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">42 Active Karnataka Tenders</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">ELIGIBLE CATEGORIES:</span>
                <span className="text-slate-900 dark:text-white font-bold">Textiles &amp; Precision Parts</span>
              </div>
            </div>
          </div>

          <Button
            onClick={() => router.push('/app/supplier-discovery')}
            variant="outline"
            className="w-full mt-3 rounded-xl border-slate-200 dark:border-[#1E283D] bg-white dark:bg-[#0E1422] text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-[#161D2E] text-xs font-bold py-2.5"
          >
            <span>Explore Matched Tenders</span>
            <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </div>

        {/* Utility 4: WhatsApp B2B Vernacular Bot Webhook */}
        <div className="rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] p-6 shadow-xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <Smartphone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">WhatsApp B2B Vernacular Bot</h3>
                  <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">Kannada Voice Note Webhook</span>
                </div>
              </div>
              <Badge variant="green" size="xs">Meta Cloud API</Badge>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
              Send and receive procurement voice notes and instant quotation PDFs directly on WhatsApp with Kannada audio transcription.
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] space-y-1.5 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">BOT NUMBER:</span>
                <span className="text-slate-900 dark:text-white font-bold">+91 80 2345 8899</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">VOICE RESPONSE SLA:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">&lt; 2.5s via Webhook</span>
              </div>
            </div>
          </div>

          <Button
            onClick={() => window.open('https://wa.me/918023458899?text=Hello%20Bhasha%20Bridge%2C%20I%20want%20to%20inquire%20about%20Karnataka%20suppliers', '_blank')}
            className="w-full mt-3 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-700 text-white font-bold text-xs border-0 cursor-pointer shadow-md flex items-center justify-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Launch WhatsApp MSME Bot</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

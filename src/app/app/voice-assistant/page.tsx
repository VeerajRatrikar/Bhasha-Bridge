'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic, MicOff, Volume2, Sparkles, ArrowRight, CheckCircle2,
  Calendar, Package, Layers, ShieldCheck, Play, Pause, RefreshCw, X,
  MapPin, DollarSign, QrCode, MessageSquare, Send, MessageCircle,
  Truck, Check, CornerDownRight, Zap, Lock
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function VoiceAssistantPage() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<number>(0);
  const [showNegotiationChat, setShowNegotiationChat] = useState(true);

  // Structured NLU state
  const [category, setCategory] = useState('Industrial Machining & Gears');
  const [quantity, setQuantity] = useState('500 Units');
  const [timeline, setTimeline] = useState('Q3 2024 (Within 3 months)');
  const [targetHub, setTargetHub] = useState('Peenya Industrial Area, Bengaluru');
  const [estimatedBudget, setEstimatedBudget] = useState('₹6,50,000');
  const [specs, setSpecs] = useState([
    'High-carbon steel alloy (Grade 1045 precision gear teeth)',
    '±0.05mm precision tolerance on Haas CNC milling center',
    'Anti-corrosive powder coating (matte black industrial finish)',
    'ISO 9001:2015 certified Karnataka production unit'
  ]);

  // Negotiation Chat Simulation
  const [chatMessages, setChatMessages] = useState([
    { sender: 'AI', text: 'ನಮಸ್ಕಾರ! ನಿಮ್ಮ 500 ಗೇರ್ ಪೀಸ್‌ಗಳ ಆರ್ಡರ್‌ಗೆ ಪೀಣ್ಯ ಸಿಎನ್‌ಸಿ ಹಬ್ ₹6,50,000 ಕೋಟ್ ನೀಡಿದೆ. ನೀವು ರಿಯಾಯಿತಿ ಅಥವಾ ಸ್ಯಾಂಪಲ್ ಕೇಳಲು ಬಯಸುವಿರಾ?' }
  ]);
  const [userChatInput, setUserChatInput] = useState('');

  const PRESETS = [
    {
      title: 'ಪೀಣ್ಯ ಗೇರ್ ಮ್ಯಾನುಫ್ಯಾಕ್ಚರಿಂಗ್ (Peenya CNC)',
      lang: 'kn-IN',
      image: '/images/peenya_cnc.jpg',
      text: 'ನನಗೆ 500 ಗೇರ್ ಪೀಸ್‌ಗಳು ಬೇಕು. ಮುಂದಿನ 3 ತಿಂಗಳೊಳಗೆ ಬೆಂಗಳೂರಿನ ಪೀಣ್ಯ ಇಂಡಸ್ಟ್ರಿಯಲ್ ಏರಿಯಾಗೆ ಡೆಲಿವರಿ ಬೇಕು. ISO 9001 ಪ್ರಮಾಣೀಕೃತ ತಯಾರಕರು ಬೇಕು.',
      category: 'Industrial Machining & Gears',
      quantity: '500 Units',
      timeline: 'Q3 2024 (Within 3 months)',
      hub: 'Peenya Industrial Area, Bengaluru',
      budget: '₹6,50,000',
      specs: [
        'High-carbon steel alloy (Grade 1045 precision gear teeth)',
        '±0.05mm precision tolerance on Haas CNC milling center',
        'Anti-corrosive powder coating (matte black industrial finish)',
        'ISO 9001:2015 certified Karnataka production unit'
      ]
    },
    {
      title: 'ಮೈಸೂರು ರೇಷ್ಮೆ ನೇಯ್ಗೆ (Mysuru Silk)',
      lang: 'kn-IN',
      image: '/images/mysore_silk.jpg',
      text: 'ನನಗೆ ಮೈಸೂರಿನಿಂದ 200 GSM organic pure mulberry raw silk blend ಬೇಕು, 1000 meters minimum order, Silk Mark certified.',
      category: 'Mysuru Silk & Organic Weaves',
      quantity: '1,000 Meters',
      timeline: 'Immediate Dispatch (14 Days)',
      hub: 'Mysuru Weavers Hub & Expressway',
      budget: '₹9,85,000',
      specs: [
        '200 GSM Heavy-weave 100% Mysuru natural spun blend',
        'GOTS & Silk Mark Certified Karnataka Standard',
        'Pre-shrunk treatment (shrinkage under 2.0%)',
        'Natural eco-friendly dye from Karnataka weavers'
      ]
    },
    {
      title: 'ಬೆಳಗಾವಿ ಫೌಂಡ್ರಿ & ವಾಲ್ವ್ (Belagavi Foundry)',
      lang: 'kn-IN',
      image: '/images/belagavi_foundry.jpg',
      text: 'ಬೆಳಗಾವಿ ಫೌಂಡ್ರಿ ಕ್ಲಸ್ಟರ್‌ನಿಂದ 15,000 ಹೈಡ್ರಾಲಿಕ್ ಡಕ್ಟೈಲ್ ಐರನ್ ವಾಲ್ವ್‌ಗಳು ಬೇಕು. ಇ-ವೇ ಬಿಲ್ ಜೊತೆಗೆ ರವಾನೆ ಬೇಕು.',
      category: 'Ductile Iron Foundry & Valves',
      quantity: '15,000 Valves',
      timeline: 'Within 45 Days',
      hub: 'Belagavi Foundry Corridor',
      budget: '₹18,50,000',
      specs: [
        'High tensile ductile iron casting (Grade 65-45-12)',
        'Hydrostatic pressure tested up to 25 Bar',
        'Flanged connection ends complying with ANSI B16.5',
        'Karnataka state inspection certificate'
      ]
    },
    {
      title: 'ಪಶ್ಚಿಮ ಘಟ್ಟದ ಏಲಕ್ಕಿ & ಕಾಫಿ (Spices & Coffee)',
      lang: 'kn-IN',
      image: '/images/karnataka_spices.jpg',
      text: 'ಚಿಕ್ಕಮಗಳೂರು ಮತ್ತು ಹಾಸನ ತೋಟಗಳಿಂದ 1000 ಕೆಜಿ ಹಸಿರು ಏಲಕ್ಕಿ ಮತ್ತು ಅರೇಬಿಕಾ ಕಾಫಿ ಬೀಜಗಳು ಬೇಕು.',
      category: 'Organic Cardamom & Roasted Arabica',
      quantity: '1,000 kg',
      timeline: 'Within 10 Days',
      hub: 'Chikkamagaluru & Hassan Warehouse',
      budget: '₹14,20,000',
      specs: [
        'Export Grade 8mm+ Jumbo Green Cardamom Pods',
        'AAA Grade Roasted Arabica Plantation Coffee Beans',
        'Direct farm gate packaging in nitrogen-flushed bags',
        'FSSAI & Karnataka Spices Board Inspected'
      ]
    },
    {
      title: 'ಚನ್ನಪಟ್ಟಣ ಮರದ ಕರಕುಶಲ (Channapatna Crafts)',
      lang: 'kn-IN',
      image: '/images/channapatna_crafts.jpg',
      text: 'ಚನ್ನಪಟ್ಟಣ ಕ್ಲಸ್ಟರ್‌ನಿಂದ 2,000 ಸೆಟ್ ನೈಸರ್ಗಿಕ ಬಣ್ಣದ ಪರಿಸರ ಸ್ನೇಹಿ ಮರದ ಆಟಿಕೆಗಳು ಮತ್ತು ಕರಕುಶಲ ವಸ್ತುಗಳು ಬೇಕು.',
      category: 'GI-Tagged Lacquered Woodcrafts',
      quantity: '2,000 Sets',
      timeline: 'Within 20 Days',
      hub: 'Ramanagara Channapatna Corridor',
      budget: '₹5,40,000',
      specs: [
        'GI Tagged traditional Wrightia tinctoria (Aale mara) wood',
        'Non-toxic vegetable dye lacquering process',
        'EN71 & BIS child safety certified',
        'Export-grade individual custom packaging'
      ]
    },
    {
      title: 'ದಾವಣಗೆರೆ ಹತ್ತಿ ನೂಲು (Davangere Cotton)',
      lang: 'kn-IN',
      image: '/images/raw_cotton.jpg',
      text: 'ದಾವಣಗೆರೆ ನೂಲಿನ ಗಿರಣಿಗಳಿಂದ 500 ಬೇಲ್ಸ್ ಸಾವಯವ ಹತ್ತಿ ನೂಲು (Combed 40s Count) ತಕ್ಷಣವೇ ಬೇಕಾಗಿದೆ.',
      category: 'Cotton Spinning Mills & Bales',
      quantity: '500 Bales',
      timeline: 'Within 7 Days',
      hub: 'Davangere Central Textile Corridor',
      budget: '₹12,80,000',
      specs: [
        'Combed 40s count ring spun 100% organic cotton yarn',
        'Tested for high tensile elongation and minimum hairiness',
        'Moisture controlled bale packaging with barcoded tags',
        'Karnataka Textile Federation certified'
      ]
    }
  ];

  const handleSelectScenario = (index: number) => {
    setSelectedScenario(index);
    const p = PRESETS[index];
    setCategory(p.category);
    setQuantity(p.quantity);
    setTimeline(p.timeline);
    setTargetHub(p.hub);
    setEstimatedBudget(p.budget);
    setSpecs(p.specs);
    setChatMessages([
      { sender: 'AI', text: `ನಮಸ್ಕಾರ! ನಿಮ್ಮ ${p.title.split(' ')[0]} ಆರ್ಡರ್‌ಗೆ ಸಂಬಂಧಿಸಿದಂತೆ ಧ್ವನಿ ವಿವರಗಳು ಮತ್ತು ವಿಶೇಷತೆಗಳನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಗುರುತಿಸಲಾಗಿದೆ. ಒಟ್ಟು ಅಂದಾಜು ಬಜೆಟ್ ${p.budget}.` }
    ]);
  };

  const handlePlayAudio = () => {
    setIsPlayingAudio(true);
    if ('speechSynthesis' in window) {
      const textToSpeak = PRESETS[selectedScenario].text;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'kn-IN';
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 2500);
    }
  };

  const handleSendChatMessage = (textToSend?: string) => {
    const msg = textToSend || userChatInput;
    if (!msg.trim()) return;

    setChatMessages((prev) => [...prev, { sender: 'User', text: msg }]);
    if (!textToSend) setUserChatInput('');

    setTimeout(() => {
      let botResponse = 'ಧನ್ಯವಾದಗಳು. ಸರಬರಾಜುದಾರರು ನಿಮ್ಮ ವಿನಂತಿಯನ್ನು ಸ್ವೀಕರಿಸಿದ್ದಾರೆ.';
      if (msg.includes('Discount') || msg.includes('ರಿಯಾಯಿತಿ')) {
        botResponse = '🎉 ಪೀಣ್ಯ ವೆಂಡರ್ ನಿಮ್ಮ ವಿನಂತಿಗೆ ಒಪ್ಪಿದ್ದಾರೆ! ಒಟ್ಟು ಮೊತ್ತದಲ್ಲಿ 4% ರಿಯಾಯಿತಿ ಅನ್ವಯಿಸಲಾಗಿದೆ (ಹೊಸ ಮೊತ್ತ: ₹6,24,000). ಈಗ UPI Escrow ಮೂಲಕ ಲಾಕ್ ಮಾಡಬಹುದು.';
      } else if (msg.includes('Sample') || msg.includes('ಸ್ಯಾಂಪಲ್')) {
        botResponse = '📦 10 ಪೀಸ್ ಮಾದರಿಗಳನ್ನು ನಾಳೆ ಬೆಳಗ್ಗೆ ಎಕ್ಸ್‌ಪ್ರೆಸ್‌ವೇ ಕೊರಿಯರ್ ಮೂಲಕ ರವಾನಿಸಲು ಬುಕ್ ಮಾಡಲಾಗಿದೆ (ಟ್ರ್ಯಾಕಿಂಗ್ ID: KA-SMP-9921).';
      } else if (msg.includes('Escrow') || msg.includes('ಲಾಕ್')) {
        botResponse = '🔒 UPI Escrow Terminal ಗೆ ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ. ಸರಬರಾಜು ಪರಿಶೀಲನೆಯ ನಂತರವೇ ಹಣ ಬಿಡುಗಡೆಯಾಗುತ್ತದೆ.';
      }

      setChatMessages((prev) => [...prev, { sender: 'AI', text: botResponse }]);
    }, 700);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 pb-12"
    >
      {/* ── Page Header ────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-[#1E283D]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Voice-First Inquiries &amp; Negotiation Bot
            </h1>
            <Badge variant="gold" size="xs">Bhashini Indic ASR</Badge>
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
            Speak in Kannada or English to automatically extract technical specs, calculate MSME pricing, and negotiate deals.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.push('/app/supplier-discovery')}
            className="bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md border-0"
          >
            <span>Match Karnataka Suppliers</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </div>
      </div>

      {/* ── Visual Scenarios Grid (6 Distinct Karnataka Photographic Hubs) ────────────────── */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Select Karnataka MSME Voice Scenario:
          </span>
          <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
            6 Industry Domains
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {PRESETS.map((preset, index) => {
            const isSelected = selectedScenario === index;
            return (
              <motion.button
                key={index}
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleSelectScenario(index)}
                className={`relative rounded-2xl overflow-hidden text-left border-2 transition-all p-2 flex flex-col justify-between h-36 cursor-pointer shadow-sm ${
                  isSelected
                    ? 'border-amber-400 bg-amber-50/50 dark:bg-amber-500/10 ring-2 ring-amber-400/40'
                    : 'border-slate-200 dark:border-[#1E283D] bg-white dark:bg-[#0E1422] hover:border-slate-400 dark:hover:border-slate-700'
                }`}
              >
                <div className="h-16 w-full rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900 relative">
                  <img
                    src={preset.image}
                    alt={preset.title}
                    className="w-full h-full object-cover"
                  />
                  {isSelected && (
                    <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-amber-400 text-black flex items-center justify-center shadow-md">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </div>
                <div className="mt-1.5">
                  <span className="text-[10px] font-bold text-slate-900 dark:text-slate-100 font-sans line-clamp-2 leading-tight block">
                    {preset.title.split(' (')[0]}
                  </span>
                  <span className="text-[9px] font-mono text-amber-700 dark:text-amber-400 font-bold block mt-0.5">
                    {preset.budget}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* ── Main Interactive Voice AI Studio (2-Col Grid) ────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Col: Live Voice Radar, Audio Equalizer & Transcript (6 cols) */}
        <div className="lg:col-span-6 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] p-6 md:p-8 shadow-xl space-y-6">
          {/* Active Voice Radar Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-[#1E283D]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Live Kannada Speech Recognition (ASR)
              </h3>
            </div>
            <Badge variant="green" size="xs">Online 96.4% Precision</Badge>
          </div>

          {/* Central 3D Mic Radar with Dynamic Audio Equalizer */}
          <div className="flex flex-col items-center justify-center py-2 text-center">
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsRecording(!isRecording)}
              className="relative w-22 h-22 rounded-3xl bg-gradient-to-tr from-rose-600 via-amber-500 to-yellow-400 flex items-center justify-center text-white shadow-xl shadow-amber-500/25 cursor-pointer p-[2px]"
            >
              <div className="w-full h-full rounded-[22px] bg-white dark:bg-[#0A0D16] flex items-center justify-center">
                {isRecording ? (
                  <Mic className="w-9 h-9 animate-pulse text-rose-600 dark:text-amber-400" />
                ) : (
                  <MicOff className="w-9 h-9 text-slate-400" />
                )}
              </div>
              {isRecording && (
                <span className="absolute -inset-1 rounded-3xl border-2 border-amber-400/60 animate-ping" />
              )}
            </motion.button>

            {/* Equalizer Frequency Bars */}
            <div className="flex items-center gap-1.5 h-8 mt-5">
              {[40, 75, 100, 60, 85, 30, 90, 65, 45, 80, 50, 70].map((h, idx) => (
                <motion.span
                  key={idx}
                  animate={{
                    height: isRecording || isPlayingAudio ? [`${h * 0.2}%`, `${h}%`, `${h * 0.4}%`] : '20%'
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.6 + (idx % 4) * 0.1,
                    ease: 'easeInOut'
                  }}
                  className="w-1.5 rounded-full bg-gradient-to-t from-amber-500 to-rose-500"
                />
              ))}
            </div>

            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 mt-2">
              {isRecording ? 'ಕೇಳಿಸಿಕೊಳ್ಳಲಾಗುತ್ತಿದೆ (Recording Live Audio)...' : 'ಧ್ವನಿ ಪರೀಕ್ಷಿಸಲು ಮೈಕ್ ಒತ್ತಿರಿ'}
            </span>
          </div>

          {/* Transcript Box with Audio Playback */}
          <div className="rounded-2xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] p-4 space-y-3 shadow-inner text-xs font-mono">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-slate-500 font-bold uppercase">VERBATIM KANNADA AUDIO (ಧ್ವನಿ ಪಠ್ಯ):</span>
              <button
                onClick={handlePlayAudio}
                className="flex items-center gap-1 text-[11px] font-bold text-amber-700 dark:text-amber-400 hover:underline cursor-pointer"
              >
                {isPlayingAudio ? <Pause className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span>{isPlayingAudio ? 'ಧ್ವನಿ ನುಡಿಯುತ್ತಿದೆ...' : 'ಧ್ವನಿ ಕೇಳಿ (Play Audio)'}</span>
              </button>
            </div>

            <p className="font-bold text-slate-900 dark:text-amber-300 font-sans text-sm leading-relaxed">
              &ldquo;{PRESETS[selectedScenario].text}&rdquo;
            </p>
          </div>

          {/* Extracted Entity Badges */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-mono font-bold text-slate-500 uppercase">Extracted Entity Tags:</span>
            <div className="flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-500/15 text-amber-800 dark:text-amber-300 text-xs font-mono font-bold border border-amber-300 dark:border-amber-500/30">
                📦 {quantity}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-500/15 text-rose-800 dark:text-rose-300 text-xs font-mono font-bold border border-rose-300 dark:border-rose-500/30">
                📍 {targetHub.split(',')[0]}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-100 dark:bg-emerald-500/15 text-emerald-800 dark:text-emerald-300 text-xs font-mono font-bold border border-emerald-300 dark:border-emerald-500/30">
                💰 Budget: {estimatedBudget}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-cyan-100 dark:bg-cyan-500/15 text-cyan-800 dark:text-cyan-300 text-xs font-mono font-bold border border-cyan-300 dark:border-cyan-500/30">
                ⏱️ {timeline}
              </span>
            </div>
          </div>
        </div>

        {/* Right Col: Structured Entity Sheet & Multi-Turn Negotiation Bot (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* Structured Spec Sheet */}
          <div className="rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E283D]">
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Structured Technical Specifications
              </h3>
              <Badge variant="gold" size="xs">Auto-Formatted</Badge>
            </div>

            <div className="space-y-2 text-xs font-mono">
              {specs.map((spec, i) => (
                <div key={i} className="flex items-start gap-2 text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed font-sans">{spec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Vernacular Negotiation Bot */}
          <div className="rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E283D]">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Multi-Turn Negotiation Bot (Kannada)
                </h3>
              </div>
              <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">Live Counter-Offers</span>
            </div>

            {/* Chat Feed */}
            <div className="space-y-3 max-h-48 overflow-y-auto pr-1 text-xs">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.sender === 'User' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                      msg.sender === 'User'
                        ? 'bg-amber-500 text-black font-semibold'
                        : 'bg-slate-100 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-slate-900 dark:text-slate-200 font-sans'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Action Negotiation Chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              <button
                onClick={() => handleSendChatMessage('💰 5% Volume Discount ಕೋಟ್ ನೀಡಬಹುದೇ? (Can you provide a 5% discount?)')}
                className="px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30 text-amber-800 dark:text-amber-300 text-[11px] font-mono font-bold hover:bg-amber-100 dark:hover:bg-amber-500/20 cursor-pointer"
              >
                💰 5% Discount ಕೇಳಿ
              </button>
              <button
                onClick={() => handleSendChatMessage('📦 10 Pcs Free Sample Dispatch ಕೇಳಿ (Request free samples first)')}
                className="px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-[11px] font-mono font-bold hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
              >
                📦 Sample Request
              </button>
              <button
                onClick={() => router.push('/app/payments')}
                className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 text-white text-[11px] font-mono font-bold cursor-pointer flex items-center gap-1 shadow-sm"
              >
                <Lock className="w-3 h-3" />
                <span>UPI Escrow Lock</span>
              </button>
            </div>

            {/* Chat Input */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-[#1E283D]">
              <input
                type="text"
                value={userChatInput}
                onChange={(e) => setUserChatInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                placeholder="ಕನ್ನಡದಲ್ಲಿ ಅಥವಾ ಇಂಗ್ಲಿಷ್‌ನಲ್ಲಿ ಸಂದೇಶ ಟೈಪ್ ಮಾಡಿ..."
                className="flex-1 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-amber-400"
              />
              <Button
                onClick={() => handleSendChatMessage()}
                size="sm"
                className="bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-xl text-xs px-3 border-0"
              >
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

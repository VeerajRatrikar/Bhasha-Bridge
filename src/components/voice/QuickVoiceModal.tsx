'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mic, MicOff, Volume2, Sparkles, X, ArrowRight,
  ShieldCheck, CheckCircle2, Globe, Search, RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export function QuickVoiceModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const [isListening, setIsListening] = useState(true);
  const [transcript, setTranscript] = useState('ನನಗೆ ಮೈಸೂರು ರೇಷ್ಮೆ ಸೀರೆಗಳ 200 ಪೀಸ್‌ಗಳು ಬೇಕು, ಬಜೆಟ್ ₹4,00,000.');
  const [translatedText, setTranslatedText] = useState('I need 200 pieces of pure Mysore Silk Sarees, budget ₹4,00,000.');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsListening(true);
      setIsProcessing(false);
    }
  }, [isOpen]);

  const handleSimulateVoice = (sampleKn: string, sampleEn: string) => {
    setIsListening(true);
    setTranscript(sampleKn);
    setTranslatedText(sampleEn);
  };

  const handleSearch = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onClose();
      router.push('/app/supplier-discovery');
    }, 600);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 350 }}
            className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#0E1322] border border-slate-200 dark:border-[#222E46] p-6 md:p-8 shadow-2xl space-y-6 z-10"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E283D]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white shadow-md">
                  <Mic className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                    Quick Vernacular Voice Sourcing
                  </h3>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">Digital India Bhashini Indic ASR</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Central 3D Mic Radar */}
            <div className="flex flex-col items-center justify-center py-4 text-center">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setIsListening(!isListening)}
                className="relative w-20 h-20 rounded-3xl bg-gradient-to-tr from-rose-600 via-amber-500 to-yellow-400 flex items-center justify-center text-white shadow-xl shadow-amber-500/25 cursor-pointer p-[2px]"
              >
                <div className="w-full h-full rounded-[22px] bg-white dark:bg-[#0A0D16] flex items-center justify-center">
                  {isListening ? (
                    <Mic className="w-8 h-8 animate-pulse text-rose-600 dark:text-amber-400" />
                  ) : (
                    <MicOff className="w-8 h-8 text-slate-400" />
                  )}
                </div>
                {isListening && (
                  <span className="absolute -inset-1 rounded-3xl border-2 border-amber-400/60 animate-ping" />
                )}
              </motion.button>

              <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-400 mt-4">
                {isListening ? 'ಕೇಳಿಸಿಕೊಳ್ಳಲಾಗುತ್ತಿದೆ (Speak in Kannada or English)...' : 'ಧ್ವನಿ ಹುಡುಕಾಟ ವಿರಾಮದಲ್ಲಿದೆ'}
              </span>
            </div>

            {/* Live Audio Transcript Box */}
            <div className="rounded-2xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] p-4 space-y-2 text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-500 font-bold block mb-0.5">KANNADA INPUT (ಧ್ವನಿ ಮಾದರಿ):</span>
                <p className="font-bold text-slate-900 dark:text-amber-300 font-sans text-sm">{transcript}</p>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-[#1E283D]">
                <span className="text-[10px] text-slate-500 font-bold block mb-0.5">BHASHINI NLU TRANSLATION:</span>
                <p className="text-slate-700 dark:text-slate-300 font-sans italic">&ldquo;{translatedText}&rdquo;</p>
              </div>
            </div>

            {/* Quick Prompt Presets */}
            <div className="space-y-1.5 text-xs font-mono">
              <span className="text-[10px] text-slate-500 font-bold uppercase">Try quick voice sample:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleSimulateVoice('ಪೀಣ್ಯ CNC ಗೇರ್ ಕಟಿಂಗ್ 500 ಪೀಸ್', 'Haas CNC precision gear cutting 500 pcs in Peenya')}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-300 cursor-pointer text-[11px]"
                >
                  ⚙️ Peenya CNC (500 Pcs)
                </button>
                <button
                  onClick={() => handleSimulateVoice('ದಾವಣಗೆರೆ ಹತ್ತಿ ನೂಲು 50 ಬೇಲ್ಸ್', 'Davangere pure cotton staple yarn 50 bales')}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-300 cursor-pointer text-[11px]"
                >
                  🧵 Davangere Cotton (50 Bales)
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                variant="outline"
                onClick={onClose}
                className="rounded-xl border-slate-200 dark:border-[#1E283D] text-xs font-bold font-mono"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSearch}
                className="bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-700 text-white font-bold text-xs rounded-xl shadow-md border-0 font-mono flex items-center justify-center gap-1.5"
              >
                {isProcessing ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Search className="w-3.5 h-3.5" />
                )}
                <span>Match Suppliers</span>
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

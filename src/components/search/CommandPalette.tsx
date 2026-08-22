'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, MapPin, Calculator, Radio, QrCode, MessageSquare,
  ShieldCheck, ArrowRight, Sparkles, Building2, Layers, X, Command
} from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const ITEMS = [
    {
      title: 'Karnataka RFQ Broadcast & Live Bids',
      kannada: 'ಲೈವ್ ಬಿಡ್ಡಿಂಗ್ ಮತ್ತು ಕೋಟ್‌ಗಳು',
      category: 'Procurement',
      href: '/app/rfq-broadcast',
      icon: Radio,
      badge: 'Live Bids'
    },
    {
      title: 'B2B Landed Cost & Karnataka Freight Calculator',
      kannada: 'ಸಾಗಣೆ ಮತ್ತು ಜಿಎಸ್‌ಟಿ ಲೆಕ್ಕಾಚಾರ',
      category: 'Calculators',
      href: '/app/calculator',
      icon: Calculator,
      badge: 'State 29 GST'
    },
    {
      title: 'Dynamic UPI QR & Milestone Escrow Studio',
      kannada: 'ಯುಪಿಐ ಕ್ಯೂಆರ್ ಮತ್ತು ಎಸ್ಕ್ರೋ',
      category: 'Payments',
      href: '/app/payments',
      icon: QrCode,
      badge: 'NPCI UPI 2.0'
    },
    {
      title: 'Karnataka MSME Voice Assistant & Audio Studio',
      kannada: 'ಕನ್ನಡ ಧ್ವನಿ ಸಹಾಯಕ',
      category: 'Voice AI',
      href: '/app/voice-assistant',
      icon: MessageSquare,
      badge: 'Bhashini Indic'
    },
    {
      title: 'Supplier Discovery (Karnataka 31 Districts)',
      kannada: 'ಕರ್ನಾಟಕ ಸರಬರಾಜುದಾರರು',
      category: 'Suppliers',
      href: '/app/supplier-discovery',
      icon: Search,
      badge: '1,840+ MSMEs'
    },
    {
      title: 'Balaji Silk & Textiles Ltd. (Mysuru)',
      kannada: 'ಮೈಸೂರು ರೇಷ್ಮೆ ಕೈಮಗ್ಗ',
      category: 'Verified Supplier',
      href: '/app/suppliers/sup_1',
      icon: Building2,
      badge: 'Silk Mark'
    },
    {
      title: 'Peenya Precision CNC Hub (Bengaluru)',
      kannada: 'ಪೀಣ್ಯ ನಿಖರ ಸಿಎನ್‌ಸಿ',
      category: 'Verified Supplier',
      href: '/app/suppliers/sup_2',
      icon: Building2,
      badge: 'ISO 9001'
    },
    {
      title: 'Belagavi Foundry & Hydraulics',
      kannada: 'ಬೆಳಗಾವಿ ಫೌಂಡ್ರಿ ಕ್ಲಸ್ಟರ್',
      category: 'Verified Supplier',
      href: '/app/suppliers/sup_4',
      icon: Building2,
      badge: 'NABL Certified'
    },
    {
      title: 'Trusted MSME Vendors Repository',
      kannada: 'ವಿಶ್ವಾಸಾರ್ಹ ಮಾರಾಟಗಾರರು',
      category: 'Vendors',
      href: '/app/trusted-vendors',
      icon: ShieldCheck,
      badge: 'Verified'
    },
    {
      title: 'Supply Chain & Research Analytics',
      kannada: 'ಸರಬರಾಜು ವಿಶ್ಲೇಷಣೆ',
      category: 'Intelligence',
      href: '/app/analytics',
      icon: Layers,
      badge: 'Table IX'
    }
  ];

  const filteredItems = ITEMS.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.kannada.includes(searchQuery) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose(); // toggle if already open handled upstream
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
      />

      {/* Palette Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.2 }}
        className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border-2 border-slate-200 dark:border-[#1E283D] shadow-2xl overflow-hidden z-10 text-slate-900 dark:text-white"
      >
        {/* Search Input Bar */}
        <div className="p-4 flex items-center gap-3 border-b border-slate-100 dark:border-[#1E283D]">
          <Search className="w-5 h-5 text-amber-500 shrink-0" />
          <input
            type="text"
            autoFocus
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Karnataka districts, suppliers, RFQs, calculators, or speak in ಕನ್ನಡ..."
            className="w-full bg-transparent text-sm font-semibold focus:outline-none placeholder:text-slate-400 text-slate-900 dark:text-white font-sans"
          />
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1.5 scrollbar-thin">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono text-slate-500">
              No matching Karnataka MSME records found for &quot;{searchQuery}&quot;.
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    router.push(item.href);
                    onClose();
                  }}
                  className="w-full p-3 rounded-2xl flex items-center justify-between text-left hover:bg-amber-50 dark:hover:bg-amber-500/10 border border-transparent hover:border-amber-300 dark:hover:border-amber-500/30 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-[#121724] border border-slate-200 dark:border-[#1E283D] flex items-center justify-center text-slate-700 dark:text-slate-300 group-hover:text-amber-500 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                        <span>{item.title}</span>
                        <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 font-bold">
                          {item.kannada}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-500 font-mono">{item.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-[10px] font-mono font-bold text-slate-600 dark:text-slate-400">
                      {item.badge}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="p-3 bg-slate-50 dark:bg-[#07090E] border-t border-slate-100 dark:border-[#1E283D] flex items-center justify-between text-[11px] font-mono text-slate-500">
          <span className="flex items-center gap-1.5">
            <Command className="w-3.5 h-3.5 text-amber-500" />
            <span>Spotlight Navigation</span>
          </span>
          <span>Press ESC to close</span>
        </div>
      </motion.div>
    </div>
  );
}

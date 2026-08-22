'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Supplier, RecommendationExplanation } from '../../types';
import { GlassCard } from '../ui/GlassCard';
import { useApp } from '../../lib/store';
import { ShieldCheck, Star, MapPin, Phone, Award, Clock, ArrowRight, Heart, Scale, MessageSquare } from 'lucide-react';

interface SupplierCardProps {
  supplier: Supplier;
  explanation?: RecommendationExplanation;
  distanceKm?: number;
  onSelect?: (supplier: Supplier) => void;
}

export function SupplierCard({
  supplier,
  explanation,
  distanceKm = 12.4,
  onSelect
}: SupplierCardProps) {
  const { addTrustedVendor, removeTrustedVendor, isSupplierTrusted, toggleCompareSupplier, comparedSupplierIds } = useApp();
  const trusted = isSupplierTrusted(supplier.Supplier_ID);
  const isCompared = comparedSupplierIds.includes(supplier.Supplier_ID);

  const handleToggleTrust = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (trusted) {
      removeTrustedVendor(supplier.Supplier_ID);
    } else {
      addTrustedVendor(supplier, 'TIER_1_GOLD', 'Added via Supplier Discovery');
    }
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleCompareSupplier(supplier.Supplier_ID);
  };

  const handleWhatsApp = (e: React.MouseEvent) => {
    e.stopPropagation();
    const msg = encodeURIComponent(`Hello ${supplier.Contact_Person}, I am interested in sourcing products from ${supplier.Business_Name} via Bhasha-Bridge.`);
    window.open(`https://wa.me/91${supplier.Phone.replace(/[^0-9]/g, '')}?text=${msg}`, '_blank');
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className="h-full"
    >
      <GlassCard
        onClick={() => onSelect && onSelect(supplier)}
        className="p-5 flex flex-col justify-between h-full group"
        glow={explanation && explanation.finalCompositeScore >= 85}
      >
        <div>
          {/* Header Badges */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <div className="flex items-center gap-2">
              {supplier.Verification_Status === 'GOLD_PARTNER' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-orange-500/15 text-orange-600 dark:text-orange-400 border border-orange-500/30">
                  <Award className="w-3 h-3" /> Gold Partner
                </span>
              )}
              {supplier.Verification_Status === 'VERIFIED' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3" /> GST Verified
                </span>
              )}
              {supplier.Verification_Status === 'PREMIUM' && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold tracking-wider uppercase bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/30">
                  <ShieldCheck className="w-3 h-3" /> Premium Verified
                </span>
              )}
            </div>

            {/* Action Buttons: WhatsApp, Compare & Favorite */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleWhatsApp}
                title="Quick WhatsApp message"
                className="p-1.5 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25 transition-all"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleToggleCompare}
                title={isCompared ? 'Remove from compare' : 'Compare supplier'}
                className={`p-1.5 rounded-xl border transition-all ${
                  isCompared
                    ? 'bg-orange-500/20 text-orange-600 dark:text-orange-400 border-orange-500'
                    : 'bg-slate-100 dark:bg-[#09090b] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-zinc-800 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleToggleTrust}
                title={trusted ? 'Remove from Saved Vendors' : 'Save to Trusted Vendors'}
                className={`p-1.5 rounded-xl border transition-all ${
                  trusted
                    ? 'bg-rose-500/20 text-rose-600 dark:text-rose-400 border-rose-500/50'
                    : 'bg-slate-100 dark:bg-[#09090b] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-zinc-800 hover:text-rose-500'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${trusted ? 'fill-current text-rose-500' : ''}`} />
              </button>
            </div>
          </div>

          {/* Business Title & Contact Person */}
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-1">
                {supplier.Business_Name}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Contact: <span className="text-slate-900 dark:text-white font-bold">{supplier.Contact_Person}</span> • {supplier.Years_In_Business} yrs in biz
              </p>
            </div>

            {/* Trust Score & Rating Pill */}
            <div className="flex flex-col items-end shrink-0">
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-[#09090b] border border-slate-200 dark:border-zinc-800 px-2.5 py-0.5 rounded-lg">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
                <span className="text-xs font-black text-slate-900 dark:text-white">{supplier.Trust_Score}%</span>
              </div>
              <span className="text-[10px] text-slate-600 dark:text-slate-300 mt-0.5 flex items-center gap-0.5 font-bold">
                <Star className="w-3 h-3 text-orange-500 fill-current" /> {supplier.Rating} ({supplier.Recommended_Count})
              </span>
            </div>
          </div>

          {/* Location & Response Time */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 dark:text-slate-300 mt-3 pt-3 border-t border-slate-200 dark:border-zinc-800">
            <div className="flex items-center gap-1 text-slate-700 dark:text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
              <span className="truncate max-w-[160px]">{supplier.Address}</span>
              <span className="text-orange-600 dark:text-orange-400 font-bold ml-0.5">({distanceKm} km)</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span>Avg Response: <strong className="text-slate-900 dark:text-white">{supplier.ResponseTimeMinutes} mins</strong></span>
            </div>
          </div>

          {/* Specialties Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {supplier.Specialties.map((spec, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-[#09090b] text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-zinc-800 font-medium"
              >
                {spec}
              </span>
            ))}
          </div>

          {/* AI Rationale Highlight if available */}
          {explanation && (
            <div className="mt-3 p-3 rounded-2xl bg-slate-50 dark:bg-[#09090b] border border-slate-200 dark:border-zinc-800 text-xs">
              <span className="text-[10px] font-mono font-bold uppercase text-orange-600 dark:text-orange-400 block mb-1">
                AI Match Rationale ({explanation.finalCompositeScore}% Match)
              </span>
              <ul className="list-disc list-inside text-slate-700 dark:text-slate-300 text-[11px] space-y-0.5">
                {explanation.keyFactors.slice(0, 2).map((factor, idx) => (
                  <li key={idx} className="truncate">{factor}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer Action */}
        <div className="mt-4 pt-3 border-t border-slate-200 dark:border-zinc-800 flex items-center justify-between">
          <a
            href={`tel:${supplier.Phone}`}
            onClick={(e) => e.stopPropagation()}
            className="text-xs text-slate-500 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 font-mono flex items-center gap-1"
          >
            <Phone className="w-3 h-3 text-orange-500" /> {supplier.Phone}
          </a>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (onSelect) onSelect(supplier);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-black hover:opacity-95 transition-opacity shadow-sm"
          >
            View Profile <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </GlassCard>
    </motion.div>
  );
}


'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../../lib/store';
import { GlassCard } from '../../../components/ui/GlassCard';
import { SUPPLIERS, VOICE_PRESET_SCENARIOS } from '../../../data/mockData';
import { rankSuppliersForEntities } from '../../../lib/recommendationEngine';
import { ShieldCheck, MapPin, Star, TrendingUp, Sparkles, ArrowRight, Award, CheckCircle2 } from 'lucide-react';

export default function RecommendationsPage() {
  const { trustedVendors } = useApp();
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState<number>(0);
  const scenario = VOICE_PRESET_SCENARIOS[selectedScenarioIndex];
  const rankedResults = rankSuppliersForEntities(
    SUPPLIERS,
    scenario.entities,
    { lat: 12.9716, lon: 77.5946 },
    trustedVendors.map((item) => item.Supplier_ID)
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Hero Header */}
      <div className="rounded-3xl border border-[#2a2420] bg-[#1c1815] p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-[#ef5623]/20 text-[#f9692c] border border-[#ef5623]/40">
              Composite Recommendation Engine
            </span>
            <span className="text-xs text-slate-400 font-mono">Real-time Ranking</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white">
            Supplier Ranking Rationale & Match Analytics
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Suppliers are ranked using product semantic similarity, composite trust score, proximity decay, and past procurement relationship history.
          </p>

          {/* Scenario Selector Pills */}
          <div className="mt-5 flex items-center gap-2 overflow-x-auto pb-1">
            <span className="text-[10px] font-mono font-bold uppercase text-slate-400 shrink-0">Test Scenario:</span>
            {VOICE_PRESET_SCENARIOS.map((sc, idx) => (
              <button
                key={sc.id}
                onClick={() => setSelectedScenarioIndex(idx)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold shrink-0 transition-all ${
                  selectedScenarioIndex === idx
                    ? 'bg-[#ef5623]/20 text-[#f9692c] border border-[#ef5623]/40 shadow-sm'
                    : 'bg-[#0f0d0c] text-slate-300 border border-[#2a2420] hover:text-white'
                }`}
              >
                {sc.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4 Pillars of Recommendation Scoring */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <GlassCard className="p-5" glow>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">1. Semantic Match</span>
            <Sparkles className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="text-slate-300 text-xs leading-relaxed">NLP semantic similarity match between audio query intent and supplier product catalog tags.</p>
        </GlassCard>

        <GlassCard className="p-5" glow>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">2. Trust Signal</span>
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-slate-300 text-xs leading-relaxed">GSTIN verification, user rating, and platform transaction trust history score.</p>
        </GlassCard>

        <GlassCard className="p-5" glow>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">3. Proximity Fit</span>
            <MapPin className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-slate-300 text-xs leading-relaxed">Geographic Haversine distance decay score calculation from buyer location hub.</p>
        </GlassCard>

        <GlassCard className="p-5" glow>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400">4. Relationship</span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-slate-300 text-xs leading-relaxed">Multiplier bonus points applied for saved trusted vendors and successful RFQ history.</p>
        </GlassCard>
      </div>

      {/* Scoring Breakdown & Top Winner */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
            <h2 className="text-base font-bold text-slate-100">Scoring Matrix for Selected Scenario</h2>
            <span className="text-xs font-mono font-bold text-cyan-400">{rankedResults.length} Suppliers Evaluated</span>
          </div>

          <div className="space-y-3">
            {rankedResults.map((result, index) => (
              <div key={result.supplier.Supplier_ID} className="p-4 rounded-2xl border border-slate-800 bg-slate-950/70 flex items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black ${
                      index === 0 ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-400'
                    }`}>
                      #{index + 1}
                    </span>
                    <h3 className="text-sm font-bold text-slate-100">{result.supplier.Business_Name}</h3>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1">{result.explanation.keyFactors.join(' • ')}</p>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-sm font-black font-mono text-emerald-300">{result.explanation.finalCompositeScore}%</div>
                  <div className="text-[10px] text-slate-500 font-mono">Match Score</div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-5">
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" /> #1 Recommended Winner Spotlight
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/30">
              Gold Match
            </span>
          </div>

          {rankedResults[0] && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl border border-slate-800 bg-slate-950/70 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-slate-100">{rankedResults[0].supplier.Business_Name}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{rankedResults[0].supplier.City} • {rankedResults[0].supplier.Contact_Person}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-black font-mono text-cyan-300">{rankedResults[0].explanation.finalCompositeScore}%</span>
                  <span className="text-[10px] text-slate-500 block font-mono">Composite Fit</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/70">
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-400">Proximity Distance</span>
                  <div className="mt-1 text-xl font-black text-cyan-300">{rankedResults[0].distanceKm} km</div>
                </div>
                <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/70">
                  <span className="text-[10px] font-mono font-bold uppercase text-slate-400">Trust Score</span>
                  <div className="mt-1 text-xl font-black text-emerald-300">{rankedResults[0].supplier.Trust_Score}%</div>
                </div>
              </div>

              <div className="p-4 rounded-2xl border border-indigo-500/20 bg-indigo-950/30 text-xs">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-300 block mb-1">
                  AI Match Narrative
                </span>
                <p className="text-slate-300 leading-relaxed">{scenario.rationale}</p>
              </div>
            </div>
          )}
        </GlassCard>
      </div>
    </motion.div>
  );
}
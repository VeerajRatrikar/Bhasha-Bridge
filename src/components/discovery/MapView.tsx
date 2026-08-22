'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Supplier } from '../../types';
import { MapPin, ShieldCheck, Star, Phone, ArrowRight, Navigation, Compass } from 'lucide-react';

interface MapViewProps {
  suppliers: Supplier[];
  onSelectSupplier?: (supplier: Supplier) => void;
}

export function MapView({ suppliers, onSelectSupplier }: MapViewProps) {
  const [activeSupplierId, setActiveSupplierId] = useState<string>(suppliers[0]?.Supplier_ID || '');

  const activeSupplier = suppliers.find((s) => s.Supplier_ID === activeSupplierId) || suppliers[0];

  return (
    <div className="relative w-full h-[540px] rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800/80 bg-slate-950 flex flex-col md:flex-row shadow-2xl">
      {/* Map Canvas Visualizer */}
      <div className="relative flex-1 bg-slate-950 overflow-hidden min-h-[320px]">
        {/* Grid Map Background Texture */}
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage: `radial-gradient(#06b6d4 1.5px, transparent 1.5px), radial-gradient(#6366f1 1.5px, #030712 1.5px)`,
            backgroundSize: '36px 36px',
            backgroundPosition: '0 0, 18px 18px'
          }}
        />

        {/* Map Roads & Proximity SVG Paths */}
        <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <path d="M 50 100 Q 200 300 400 200 T 700 400" stroke="#ffb800" strokeWidth="3" fill="none" strokeDasharray="6 6" />
          <path d="M 150 450 Q 300 200 650 150" stroke="#e11d48" strokeWidth="2.5" fill="none" />
          <path d="M 300 50 L 300 500" stroke="#334155" strokeWidth="2" />
          <path d="M 50 250 L 750 250" stroke="#334155" strokeWidth="2" />

          {/* Connected Distance Line to Active Supplier */}
          <line x1="50%" y1="50%" x2="42%" y2="32%" stroke="#ffb800" strokeWidth="2.5" strokeDasharray="4 4" className="animate-pulse" />
        </svg>

        {/* User Location Radar Marker (Bengaluru Center) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center group">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-rose-600 text-slate-950 font-black text-xs shadow-2xl shadow-amber-500/50">
            <span className="absolute inset-0 rounded-full bg-amber-400/40 animate-ping" />
            <Navigation className="w-5 h-5 fill-slate-950" />
          </div>
          <span className="mt-1 px-2.5 py-0.5 rounded-full bg-slate-950/90 text-amber-300 text-[10px] font-mono font-bold border border-amber-500/40 shadow-lg">
            Buyer Location (Bengaluru Hub)
          </span>
        </div>

        {/* Supplier Pin Markers */}
        {suppliers.map((supplier, idx) => {
          const positions = [
            { top: '32%', left: '42%' },
            { top: '28%', left: '68%' },
            { top: '65%', left: '72%' },
            { top: '72%', left: '30%' },
            { top: '48%', left: '56%' },
            { top: '80%', left: '85%' },
          ];

          const pos = positions[idx % positions.length];
          const isActive = supplier.Supplier_ID === activeSupplierId;

          return (
            <motion.button
              key={supplier.Supplier_ID}
              onClick={() => setActiveSupplierId(supplier.Supplier_ID)}
              style={{ top: pos.top, left: pos.left }}
              whileHover={{ scale: 1.15 }}
              animate={{ scale: isActive ? 1.25 : 1 }}
              className={`absolute z-30 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group ${
                isActive ? 'z-40' : ''
              }`}
            >
              {/* Pin */}
              <div
                className={`relative flex items-center justify-center px-2.5 py-1.5 rounded-2xl border transition-all shadow-xl ${
                  isActive
                    ? 'bg-gradient-to-tr from-amber-500 via-amber-400 to-rose-600 text-slate-950 font-black border-amber-300 shadow-amber-500/60 ring-4 ring-amber-500/30'
                    : 'bg-slate-900/90 text-slate-300 border-amber-500/30 hover:border-amber-400'
                }`}
              >
                <MapPin className="w-4 h-4 text-amber-400" />
                <span className="ml-1 text-[11px] font-black font-mono">{supplier.Trust_Score}%</span>
              </div>

              {/* Label */}
              <span
                className={`mt-1 px-2.5 py-0.5 rounded-xl text-[10px] font-bold whitespace-nowrap border shadow-xl ${
                  isActive
                    ? 'bg-slate-950 text-amber-300 border-amber-400'
                    : 'bg-slate-900/80 text-slate-300 border-slate-800'
                }`}
              >
                {supplier.Business_Name}
              </span>
            </motion.button>
          );
        })}

        {/* Map Overlay Controls */}
        <div className="absolute top-4 left-4 z-30 p-2 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-amber-500/30 text-xs text-slate-300 flex items-center gap-2 font-mono">
          <Compass className="w-4 h-4 text-amber-400" />
          <span className="font-bold">Karnataka Radar Map</span>
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-4 left-4 z-30 p-3 rounded-2xl bg-slate-950/90 backdrop-blur-md border border-amber-500/20 text-[10px] font-mono text-slate-400 flex items-center gap-3">
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" /> High Trust (&gt;90%)</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Verified Partner</span>
          <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400" /> Active Supplier</span>
        </div>
      </div>

      {/* Selected Supplier Details Sidebar Drawer */}
      {activeSupplier && (
        <div className="w-full md:w-84 bg-slate-900/95 border-t md:border-t-0 md:border-l border-amber-500/20 p-6 flex flex-col justify-between shrink-0 overflow-y-auto">
          <div>
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-[10px] font-mono font-extrabold uppercase tracking-widest text-amber-400">
                Selected Location Node
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 text-[10px] font-bold border border-amber-500/40">
                Trust {activeSupplier.Trust_Score}%
              </span>
            </div>

            <h3 className="text-base font-extrabold text-slate-100">{activeSupplier.Business_Name}</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {activeSupplier.Contact_Person} • {activeSupplier.City}
            </p>

            <div className="mt-4 space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{activeSupplier.Address}</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <Phone className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{activeSupplier.Phone}</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-slate-950/80 border border-slate-800">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400 shrink-0" />
                <span>{activeSupplier.Rating} Rating ({activeSupplier.Recommended_Count} reviews)</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800">
              <span className="text-[10px] font-mono font-bold uppercase text-amber-400 block mb-1.5">Specialties</span>
              <div className="flex flex-wrap gap-1.5">
                {activeSupplier.Specialties.map((s, i) => (
                  <span key={i} className="text-[10px] px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-800">
            <button
              onClick={() => onSelectSupplier && onSelectSupplier(activeSupplier)}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-rose-600 text-slate-950 text-xs font-black hover:opacity-95 transition-opacity shadow-xl shadow-amber-500/20"
            >
              Open Full Supplier Profile <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}


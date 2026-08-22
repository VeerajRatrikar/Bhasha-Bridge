'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../lib/store';
import { SUPPLIERS } from '../../data/mockData';
import { X, ShieldCheck, Star, MapPin, Clock, Phone, Scale } from 'lucide-react';

export function CompareModal() {
  const { comparedSupplierIds, toggleCompareSupplier, clearComparedSuppliers } = useApp();

  if (comparedSupplierIds.length === 0) return null;

  const selectedSuppliers = SUPPLIERS.filter((s) => comparedSupplierIds.includes(s.Supplier_ID));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-end sm:items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Scale className="w-5 h-5 text-cyan-400" /> Supplier Comparison Matrix ({selectedSuppliers.length} selected)
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Side-by-side evaluation of trust scores, location distance, ratings, and response SLA
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={clearComparedSuppliers}
                className="text-xs px-3.5 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 font-bold transition-colors"
              >
                Clear All
              </button>
              <button
                onClick={clearComparedSuppliers}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Comparison Matrix Table */}
          <div className="p-6 overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-800">
                  <th className="p-3.5 text-xs font-mono uppercase tracking-wider text-slate-400 w-1/4">Feature / Metric</th>
                  {selectedSuppliers.map((sup) => (
                    <th key={sup.Supplier_ID} className="p-3.5 text-sm font-extrabold text-slate-100 w-1/4">
                      <div className="flex items-center justify-between">
                        <span className="text-cyan-300">{sup.Business_Name}</span>
                        <button
                          onClick={() => toggleCompareSupplier(sup.Supplier_ID)}
                          className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80 text-xs">
                {/* Trust Score */}
                <tr>
                  <td className="p-3.5 font-bold text-slate-300">Composite Trust Score</td>
                  {selectedSuppliers.map((sup) => (
                    <td key={sup.Supplier_ID} className="p-3.5">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-emerald-950 text-emerald-300 font-black border border-emerald-500/30">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" /> {sup.Trust_Score}%
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Rating */}
                <tr>
                  <td className="p-3.5 font-bold text-slate-300">Rating & Reviews</td>
                  {selectedSuppliers.map((sup) => (
                    <td key={sup.Supplier_ID} className="p-3.5 text-slate-200">
                      <span className="flex items-center gap-1 text-amber-400 font-bold">
                        <Star className="w-4 h-4 fill-amber-400" /> {sup.Rating} ({sup.Recommended_Count} reviews)
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Location */}
                <tr>
                  <td className="p-3.5 font-bold text-slate-300">Location Hub</td>
                  {selectedSuppliers.map((sup) => (
                    <td key={sup.Supplier_ID} className="p-3.5 text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                        <span>{sup.City} ({sup.District})</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Verification Status */}
                <tr>
                  <td className="p-3.5 font-bold text-slate-300">Verification Status</td>
                  {selectedSuppliers.map((sup) => (
                    <td key={sup.Supplier_ID} className="p-3.5">
                      <span className="px-2.5 py-1 rounded-xl bg-indigo-950 text-indigo-300 font-bold border border-indigo-500/30">
                        {sup.Verification_Status}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Response Time */}
                <tr>
                  <td className="p-3.5 font-bold text-slate-300">Avg Response SLA</td>
                  {selectedSuppliers.map((sup) => (
                    <td key={sup.Supplier_ID} className="p-3.5 text-slate-300">
                      <span className="flex items-center gap-1 font-mono font-bold text-cyan-300">
                        <Clock className="w-4 h-4 text-cyan-400" /> {sup.ResponseTimeMinutes} Mins
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Years in Business */}
                <tr>
                  <td className="p-3.5 font-bold text-slate-300">Market Experience</td>
                  {selectedSuppliers.map((sup) => (
                    <td key={sup.Supplier_ID} className="p-3.5 text-slate-300 font-medium">
                      {sup.Years_In_Business} Years in Business
                    </td>
                  ))}
                </tr>

                {/* Languages Supported */}
                <tr>
                  <td className="p-3.5 font-bold text-slate-300">Language Support</td>
                  {selectedSuppliers.map((sup) => (
                    <td key={sup.Supplier_ID} className="p-3.5 text-slate-300">
                      {sup.LanguageSupport.join(', ')}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}


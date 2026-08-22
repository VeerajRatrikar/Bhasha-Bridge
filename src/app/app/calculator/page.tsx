'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calculator, Truck, ShieldCheck, DollarSign, ArrowRight,
  Sparkles, CheckCircle2, Lock, Percent, MapPin, Receipt, RefreshCw
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function CostCalculatorPage() {
  const router = useRouter();

  // Calculator State
  const [commodity, setCommodity] = useState('Pure Mysore Silk Yarns (200 GSM)');
  const [unitPrice, setUnitPrice] = useState<number>(985);
  const [quantity, setQuantity] = useState<number>(1000);
  const [originHub, setOriginHub] = useState('Mysuru Handloom Corridor');
  const [destinationHub, setDestinationHub] = useState('Bengaluru (Peenya / Bommasandra)');
  const [gstRate, setGstRate] = useState<number>(5); // 5% for textiles, 18% for CNC/industrial
  const [freightSpeed, setFreightSpeed] = useState<'EXPRESS' | 'STANDARD'>('EXPRESS');

  // Calculations
  const materialSubtotal = unitPrice * quantity;
  const gstAmount = Math.round((materialSubtotal * gstRate) / 100);
  const baseFreight = freightSpeed === 'EXPRESS' ? 4500 : 2500;
  const expresswayToll = 320; // Mysuru-BLR toll
  const totalFreight = baseFreight + expresswayToll;
  const escrowFee = 0; // 100% Subsidized
  const finalTotal = materialSubtotal + gstAmount + totalFreight;

  const handleApplyPreset = (name: string, price: number, qty: number, gst: number, orig: string) => {
    setCommodity(name);
    setUnitPrice(price);
    setQuantity(qty);
    setGstRate(gst);
    setOriginHub(orig);
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
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <span>B2B Landed Cost &amp; Karnataka Freight Calculator</span>
            </h1>
            <Badge variant="gold" size="xs">Live Freight Matrix</Badge>
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
            Calculate material costs, Karnataka State GST (State 29), expressway toll freight, and escrow totals with zero hidden fees.
          </p>
        </div>

        <Button
          onClick={() => router.push('/app/payments')}
          className="bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md border-0"
        >
          <Lock className="w-3.5 h-3.5 mr-1.5" />
          <span>Launch Escrow Terminal</span>
        </Button>
      </div>

      {/* ── Quick Commodity Presets ────────────────── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400 uppercase">Quick Presets:</span>
        <button
          onClick={() => handleApplyPreset('Pure Mysore Silk Yarns (200 GSM)', 985, 1000, 5, 'Mysuru Handloom Corridor')}
          className="px-3 py-1 rounded-xl bg-amber-50 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs font-mono font-bold hover:bg-amber-100 cursor-pointer"
        >
          🧵 Mysore Silk (1,000 M)
        </button>
        <button
          onClick={() => handleApplyPreset('Haas CNC Precision Gear Teeth', 1250, 500, 18, 'Bengaluru Peenya Ind. Area')}
          className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold hover:bg-slate-200 cursor-pointer"
        >
          ⚙️ Peenya CNC (500 Pcs)
        </button>
        <button
          onClick={() => handleApplyPreset('Davangere Combed Cotton Bales', 22000, 50, 5, 'Davangere Central Textile Mills')}
          className="px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-mono font-bold hover:bg-slate-200 cursor-pointer"
        >
          🌾 Davangere Cotton (50 Bales)
        </button>
      </div>

      {/* ── Calculator Grid (2 Cols) ────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs (6 cols) */}
        <div className="lg:col-span-6 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] p-6 md:p-8 shadow-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E283D]">
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <h2 className="font-extrabold text-base text-slate-900 dark:text-white">Procurement Parameters</h2>
            </div>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">Dynamic Calculator</span>
          </div>

          <div className="space-y-4 text-xs font-mono">
            {/* Commodity Name */}
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">MATERIAL / COMMODITY:</label>
              <input
                type="text"
                value={commodity}
                onChange={(e) => setCommodity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-slate-900 dark:text-white font-sans text-xs font-bold focus:outline-none focus:border-amber-400"
              />
            </div>

            {/* Price & Quantity Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">UNIT PRICE (INR ₹):</label>
                <input
                  type="number"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-slate-900 dark:text-white font-mono text-xs font-black focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">ORDER QUANTITY:</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-slate-900 dark:text-white font-mono text-xs font-black focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Quantity Range Slider */}
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-slate-500">Adjust Volume Scale:</span>
                <span className="text-amber-700 dark:text-amber-400 font-bold">{quantity.toLocaleString('en-IN')} Units</span>
              </div>
              <input
                type="range"
                min="10"
                max="5000"
                step="10"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Origin & Destination Hubs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">ORIGIN CLUSTER:</label>
                <select
                  value={originHub}
                  onChange={(e) => setOriginHub(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-slate-900 dark:text-slate-200 font-sans text-xs focus:outline-none focus:border-amber-400"
                >
                  <option>Mysuru Handloom Corridor</option>
                  <option>Bengaluru Peenya Ind. Area</option>
                  <option>Belagavi Foundry Corridor</option>
                  <option>Davangere Central Textile Mills</option>
                  <option>Chikkamagaluru &amp; Hassan</option>
                  <option>Mangaluru NMPT Port</option>
                </select>
              </div>

              <div>
                <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">DELIVERY DESTINATION:</label>
                <select
                  value={destinationHub}
                  onChange={(e) => setDestinationHub(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-slate-900 dark:text-slate-200 font-sans text-xs focus:outline-none focus:border-amber-400"
                >
                  <option>Bengaluru (Peenya / Bommasandra)</option>
                  <option>Mysuru (Nanjangud Industrial)</option>
                  <option>Hubballi-Dharwad Engineering Zone</option>
                  <option>Mangaluru Export Cargo Terminal</option>
                  <option>Tumakuru Mega Industrial Park</option>
                </select>
              </div>
            </div>

            {/* GST Slab & Freight Mode */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">GST TAX SLAB:</label>
                <div className="flex gap-2">
                  {[5, 18].map((slab) => (
                    <button
                      key={slab}
                      onClick={() => setGstRate(slab)}
                      className={`flex-1 py-2 rounded-xl font-bold border transition-colors cursor-pointer text-xs ${
                        gstRate === slab
                          ? 'bg-amber-500 text-black border-amber-400'
                          : 'bg-slate-50 dark:bg-[#07090E] text-slate-700 dark:text-slate-400 border-slate-200 dark:border-[#1E283D]'
                      }`}
                    >
                      {slab}% GST
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">LOGISTICS SLA:</label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setFreightSpeed('EXPRESS')}
                    className={`flex-1 py-2 rounded-xl font-bold border transition-colors cursor-pointer text-xs ${
                      freightSpeed === 'EXPRESS'
                        ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-white border-transparent'
                        : 'bg-slate-50 dark:bg-[#07090E] text-slate-700 dark:text-slate-400 border-slate-200 dark:border-[#1E283D]'
                    }`}
                  >
                    ⚡ Express
                  </button>
                  <button
                    onClick={() => setFreightSpeed('STANDARD')}
                    className={`flex-1 py-2 rounded-xl font-bold border transition-colors cursor-pointer text-xs ${
                      freightSpeed === 'STANDARD'
                        ? 'bg-amber-500 text-black border-amber-400'
                        : 'bg-slate-50 dark:bg-[#07090E] text-slate-700 dark:text-slate-400 border-slate-200 dark:border-[#1E283D]'
                    }`}
                  >
                    Standard
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Live Cost Breakdown Sheet (6 cols) */}
        <div className="lg:col-span-6 space-y-5">
          <div className="rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] p-6 md:p-8 shadow-xl space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E283D]">
              <div className="flex items-center gap-2">
                <Receipt className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                  Certified Cost Breakdown
                </h3>
              </div>
              <Badge variant="green" size="xs">100% Subsidized Escrow</Badge>
            </div>

            {/* Breakdown Rows */}
            <div className="space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">MATERIAL SUBTOTAL:</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">
                  ₹{materialSubtotal.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">KARNATAKA GST ({gstRate}%):</span>
                <span className="font-bold text-amber-700 dark:text-amber-400">
                  + ₹{gstAmount.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-slate-600 dark:text-slate-400">
                  EXPRESSWAY FREIGHT &amp; TOLL:
                </span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  + ₹{totalFreight.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#1E283D]">
                <span className="text-slate-600 dark:text-slate-400">ESCROW PROTECTION FEE:</span>
                <span className="font-black text-emerald-600 dark:text-emerald-400">
                  ₹0 (FREE MSME SUBSIDY)
                </span>
              </div>

              {/* Grand Total */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  <span className="text-xs font-bold text-slate-500 block uppercase">TOTAL LANDED COST</span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white">
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30">
                  All Inclusive
                </span>
              </div>
            </div>

            {/* Action Lock Button */}
            <Button
              onClick={() => router.push('/app/payments')}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-rose-600 via-amber-500 to-yellow-400 hover:from-rose-700 text-white font-extrabold text-xs shadow-xl shadow-amber-500/25 border-0 flex items-center justify-center gap-2 cursor-pointer mt-3"
            >
              <Lock className="w-4 h-4" />
              <span>Lock ₹{finalTotal.toLocaleString('en-IN')} in Dynamic UPI Escrow</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

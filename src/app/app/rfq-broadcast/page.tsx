'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Radio, Sparkles, Send, RefreshCw, CheckCircle2, ShieldCheck,
  Building2, MapPin, Clock, DollarSign, ArrowRight, Lock, Filter,
  TrendingDown, Check, Zap, HelpCircle, Layers
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface LiveBid {
  id: string;
  vendor: string;
  district: string;
  pricePerUnit: string;
  totalQuote: string;
  originalQuote: string;
  discount: string;
  leadTime: string;
  compliance: string;
  matchScore: number;
  image: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

export default function RfqBroadcastPage() {
  const router = useRouter();
  const [commodity, setCommodity] = useState('Haas CNC Precision Gear Teeth');
  const [quantity, setQuantity] = useState('500 Pcs');
  const [targetDistrict, setTargetDistrict] = useState('All 31 Districts');
  const [targetBudget, setTargetBudget] = useState('₹6,50,000');
  const [timeline, setTimeline] = useState('Within 14 Days');

  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [broadcastDone, setBroadcastDone] = useState(true);
  const [liveBids, setLiveBids] = useState<LiveBid[]>([
    {
      id: 'BID-KA-991',
      vendor: 'Peenya Precision CNC Hub',
      district: 'Bengaluru (Peenya Ind. Area)',
      pricePerUnit: '₹1,240 / pc',
      totalQuote: '₹6,20,000',
      originalQuote: '₹6,50,000',
      discount: '4.6% Volume Off',
      leadTime: '48 Hours Express',
      compliance: 'ISO 9001:2015 & NABL Tested',
      matchScore: 98,
      image: '/images/peenya_cnc.jpg',
      status: 'PENDING'
    },
    {
      id: 'BID-KA-884',
      vendor: 'Belagavi Heavy Valves & Foundry',
      district: 'Belagavi Foundry Corridor',
      pricePerUnit: '₹1,270 / pc',
      totalQuote: '₹6,35,000',
      originalQuote: '₹6,60,000',
      discount: '3.8% Off',
      leadTime: '4 Days via Expressway',
      compliance: 'Hydrostatic 25-Bar Certified',
      matchScore: 94,
      image: '/images/belagavi_foundry.jpg',
      status: 'PENDING'
    },
    {
      id: 'BID-KA-772',
      vendor: 'Hubballi-Dharwad Engineering Co-op',
      district: 'Hubballi (Gokul Road)',
      pricePerUnit: '₹1,290 / pc',
      totalQuote: '₹6,45,000',
      originalQuote: '₹6,50,000',
      discount: 'Free Sample Dispatch Included',
      leadTime: '5 Days',
      compliance: 'MSME Registered & State 29 GST',
      matchScore: 91,
      image: '/images/tech_blend.jpg',
      status: 'PENDING'
    }
  ]);

  const handleBroadcast = () => {
    setIsBroadcasting(true);
    setLiveBids([]);
    setTimeout(() => {
      setIsBroadcasting(false);
      setBroadcastDone(true);
      setLiveBids([
        {
          id: 'BID-KA-991',
          vendor: 'Peenya Precision CNC Hub',
          district: 'Bengaluru (Peenya Ind. Area)',
          pricePerUnit: '₹1,220 / pc',
          totalQuote: '₹6,10,000',
          originalQuote: '₹6,50,000',
          discount: '6.1% Volume Discount Applied',
          leadTime: '24-48 Hours Express',
          compliance: 'ISO 9001:2015 & NABL Tested',
          matchScore: 99,
          image: '/images/peenya_cnc.jpg',
          status: 'PENDING'
        },
        {
          id: 'BID-KA-884',
          vendor: 'Belagavi Heavy Valves & Foundry',
          district: 'Belagavi Foundry Corridor',
          pricePerUnit: '₹1,260 / pc',
          totalQuote: '₹6,30,000',
          originalQuote: '₹6,60,000',
          discount: '4.5% Off',
          leadTime: '3 Days via Hubballi Route',
          compliance: 'Hydrostatic 25-Bar Certified',
          matchScore: 95,
          image: '/images/belagavi_foundry.jpg',
          status: 'PENDING'
        },
        {
          id: 'BID-KA-772',
          vendor: 'Hubballi-Dharwad Engineering Co-op',
          district: 'Hubballi (Gokul Road)',
          pricePerUnit: '₹1,280 / pc',
          totalQuote: '₹6,40,000',
          originalQuote: '₹6,50,000',
          discount: 'Free Freight Included',
          leadTime: '4 Days',
          compliance: 'State 29 GST Certified',
          matchScore: 92,
          image: '/images/tech_blend.jpg',
          status: 'PENDING'
        }
      ]);
    }, 1500);
  };

  const handleAcceptBid = (bid: LiveBid) => {
    router.push('/app/payments');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 pb-12"
    >
      {/* ── Header ────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-[#1E283D]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-2">
              <span>Karnataka RFQ Broadcast &amp; Live Bid Matching</span>
            </h1>
            <Badge variant="gold" size="xs">ONDC Beckn Broadcast</Badge>
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
            Broadcast procurement specifications to 1,840+ verified Karnataka MSME sellers and receive competitive live quotes.
          </p>
        </div>

        <Button
          onClick={() => router.push('/app/voice-assistant')}
          className="bg-amber-500/15 dark:bg-amber-500/20 border border-amber-400/40 text-amber-800 dark:text-amber-300 font-bold text-xs px-4 py-2 rounded-xl"
        >
          <Sparkles className="w-3.5 h-3.5 mr-1.5" />
          <span>Voice RFQ Input</span>
        </Button>
      </div>

      {/* ── Broadcast Configuration Studio (2-Col Grid) ────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Form: Broadcast Parameters (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E283D]">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-amber-600 dark:text-amber-400 animate-pulse" />
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white">RFQ Specifications</h2>
            </div>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">1,840 Sellers Reach</span>
          </div>

          <div className="space-y-3 text-xs font-mono">
            <div>
              <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">COMMODITY / SPECIFICATION:</label>
              <input
                type="text"
                value={commodity}
                onChange={(e) => setCommodity(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-slate-900 dark:text-white font-sans text-xs font-semibold focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">ORDER QUANTITY:</label>
                <input
                  type="text"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-slate-900 dark:text-white font-sans text-xs font-semibold focus:outline-none focus:border-amber-400"
                />
              </div>
              <div>
                <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">MAX BUDGET (INR):</label>
                <input
                  type="text"
                  value={targetBudget}
                  onChange={(e) => setTargetBudget(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-amber-700 dark:text-amber-400 font-bold text-xs focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">TARGET KARNATAKA CLUSTER:</label>
              <select
                value={targetDistrict}
                onChange={(e) => setTargetDistrict(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-slate-900 dark:text-slate-200 font-sans text-xs font-semibold focus:outline-none focus:border-amber-400"
              >
                <option>All 31 Districts (State-Wide Broadcast)</option>
                <option>Bengaluru (Peenya &amp; Bommasandra)</option>
                <option>Mysuru &amp; Nanjangud Silk Corridor</option>
                <option>Belagavi &amp; Hubballi Heavy Foundry</option>
                <option>Davangere Central Textile Mills</option>
                <option>Mangaluru Port &amp; Coastal Zone</option>
              </select>
            </div>

            <div>
              <label className="text-slate-700 dark:text-slate-300 font-bold block mb-1">REQUIRED DELIVERY SLA:</label>
              <input
                type="text"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-slate-900 dark:text-white font-sans text-xs font-semibold focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <Button
            onClick={handleBroadcast}
            disabled={isBroadcasting}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 via-amber-500 to-yellow-400 hover:from-rose-700 text-white font-bold text-xs shadow-lg shadow-amber-500/25 border-0 flex items-center justify-center gap-2 cursor-pointer mt-2"
          >
            {isBroadcasting ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Broadcasting to Karnataka Network...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Broadcast RFQ on ONDC &amp; B2B Network</span>
              </>
            )}
          </Button>
        </div>

        {/* Right Area: Live Competitive Bids Feed (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Incoming Live MSME Quotes</span>
              <Badge variant="green" size="xs">{liveBids.length} Active Quotes</Badge>
            </h2>
            <span className="text-xs font-mono text-slate-500">Auto-Refreshed via ONDC Beckn</span>
          </div>

          {/* Broadcast Progress State */}
          {isBroadcasting && (
            <div className="rounded-3xl bg-white dark:bg-[#111624] border border-slate-200 dark:border-[#1E283D] p-10 flex flex-col items-center justify-center text-center space-y-3 shadow-md animate-pulse">
              <div className="w-14 h-14 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center text-amber-500">
                <Radio className="w-7 h-7 animate-ping" />
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">Connecting with Karnataka Seller Nodes...</h3>
              <p className="text-xs text-slate-500 max-w-sm">
                Broadcasting encrypted RFQ payload across Peenya, Mysuru, Belagavi, and Davangere industrial cooperatives.
              </p>
            </div>
          )}

          {/* Bids List */}
          <div className="space-y-4">
            {liveBids.map((bid, i) => (
              <motion.div
                key={bid.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                whileHover={{ y: -2 }}
                className="rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] p-5 shadow-md hover:border-amber-400 transition-all space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-[#1E283D]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-900 shrink-0">
                      <img src={bid.image} alt={bid.vendor} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">{bid.vendor}</h4>
                        <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-500/15 text-amber-800 dark:text-amber-300 font-mono font-bold text-[10px]">
                          {bid.matchScore}% Match
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1 font-mono mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-rose-500" />
                        {bid.district}
                      </p>
                    </div>
                  </div>

                  <div className="text-right font-mono">
                    <div className="text-lg font-black text-slate-900 dark:text-white">{bid.totalQuote}</div>
                    <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">{bid.discount}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div>
                    <span className="text-[10px] text-slate-500 block">UNIT PRICE:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{bid.pricePerUnit}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">DELIVERY LEAD TIME:</span>
                    <span className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {bid.leadTime}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block">QUALITY STANDARDS:</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{bid.compliance}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-[#1E283D] flex items-center justify-between gap-3">
                  <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    GST Verified Seller
                  </span>

                  <Button
                    onClick={() => handleAcceptBid(bid)}
                    className="bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-md border-0 font-mono flex items-center gap-1.5 cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Accept Quote &amp; Lock Escrow</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

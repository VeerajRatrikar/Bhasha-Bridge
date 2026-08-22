'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, MapPin, Mic, Filter, Star, ShieldCheck, ChevronRight,
  Sparkles, CheckCircle2, ArrowRight, SlidersHorizontal, RefreshCw, QrCode,
  Building2, Phone, MessageSquare
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function SupplierDiscoveryPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('Pure mulberry silk & organic cotton yarn suppliers in');
  const [locationQuery, setLocationQuery] = useState('Mysuru, Karnataka');
  const [matchThreshold, setMatchThreshold] = useState(75);
  const [verifiedOnly, setVerifiedOnly] = useState(true);
  const [msmeOnly, setMsmeOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All Sectors');
  const [selectedDistrict, setSelectedDistrict] = useState('ALL');

  const KARNATAKA_DISTRICTS = [
    { name: 'ALL', count: 142 },
    { name: 'Bengaluru (Peenya)', count: 48 },
    { name: 'Mysuru', count: 32 },
    { name: 'Belagavi', count: 24 },
    { name: 'Davangere', count: 18 },
    { name: 'Chikkamagaluru', count: 12 },
    { name: 'Ramanagara', count: 8 },
  ];

  const ALL_RESULTS = [
    {
      id: 'sup_1',
      name: 'Balaji Silk & Textiles Ltd.',
      score: 98,
      badge: 'User Trusted',
      badgeVariant: 'green' as const,
      desc: 'Authentic Mysuru pure raw silk, handloom cooperatives, and natural spun cotton.',
      city: 'Mysuru (140km)',
      district: 'Mysuru',
      image: '/images/mysore_silk.jpg',
      capacity: '50k M/Mo',
      moq: '100 kg'
    },
    {
      id: 'sup_2',
      name: 'Peenya Precision CNC Hub',
      score: 96,
      badge: 'Admin Seeded',
      badgeVariant: 'gold' as const,
      desc: 'Precision CNC machining, industrial toolings, and aerospace gears with ISO 9001.',
      city: 'Bengaluru (Peenya 15km)',
      district: 'Bengaluru (Peenya)',
      image: '/images/peenya_cnc.jpg',
      capacity: '20k Units/Mo',
      moq: '50 Units'
    },
    {
      id: 'sup_4',
      name: 'Belagavi Heavy Foundry & Valves',
      score: 94,
      badge: 'AI Discovered',
      badgeVariant: 'purple' as const,
      desc: 'Molten ductile iron castings, precision hydraulic valves, and engine manifolds.',
      city: 'Belagavi (500km)',
      district: 'Belagavi',
      image: '/images/belagavi_foundry.jpg',
      capacity: '15k Valves/Mo',
      moq: '100 Units'
    },
    {
      id: 'sup_5',
      name: 'Western Ghats Spices & Arabica Co.',
      score: 91,
      badge: 'User Trusted',
      badgeVariant: 'green' as const,
      desc: 'Plantation-direct organic green cardamom pods and roasted arabica coffee beans.',
      city: 'Chikkamagaluru (240km)',
      district: 'Chikkamagaluru',
      image: '/images/karnataka_spices.jpg',
      capacity: '30k Bags/Mo',
      moq: '250 kg'
    },
    {
      id: 'sup_6',
      name: 'Channapatna Lacquer Craft Guild',
      score: 89,
      badge: 'GI Tag Verified',
      badgeVariant: 'gold' as const,
      desc: 'Traditional non-toxic lacquered wooden handicrafts, wooden toys, and turnings.',
      city: 'Ramanagara (60km)',
      district: 'Ramanagara',
      image: '/images/channapatna_crafts.jpg',
      capacity: '10k Sets/Mo',
      moq: '50 Sets'
    },
    {
      id: 'sup_3',
      name: 'Davangere Cotton Mills Pvt.',
      score: 92,
      badge: 'AI Discovered',
      badgeVariant: 'purple' as const,
      desc: 'Central Karnataka high-capacity cotton spinning & organic staple yarns.',
      city: 'Davangere (260km)',
      district: 'Davangere',
      image: '/images/raw_cotton.jpg',
      capacity: '80k Bales/Mo',
      moq: '500 kg'
    }
  ];

  const filteredResults = ALL_RESULTS.filter((item) => {
    const matchesDistrict = selectedDistrict === 'ALL' || item.district === selectedDistrict;
    return matchesDistrict;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 pb-12"
    >
      {/* ── Top Dual Search Bar ────────────────── */}
      <div className="rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:via-[#0E1322] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] p-5 shadow-xl transition-all">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Query input */}
          <div className="flex-1 flex items-center gap-2.5 px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] w-full">
            <Search className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Karnataka products or Kannada vernacular terms..."
              className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none font-sans font-medium"
            />
          </div>

          {/* Location input - Karnataka Default */}
          <div className="md:w-72 flex items-center gap-2.5 px-4 py-3.5 rounded-2xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] w-full">
            <MapPin className="w-4 h-4 text-rose-600 dark:text-rose-500 shrink-0" />
            <input
              type="text"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              placeholder="Karnataka District / Hub..."
              className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none font-sans font-medium"
            />
          </div>

          {/* Voice Mic Trigger */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push('/app/voice-assistant')}
            title="Search with Voice in Kannada"
            className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-rose-600 via-amber-500 to-yellow-400 hover:from-rose-700 hover:to-amber-600 flex items-center justify-center text-white shadow-lg shadow-amber-500/25 shrink-0 cursor-pointer"
          >
            <Mic className="w-5 h-5 text-white" />
          </motion.button>
        </div>

        {/* Karnataka District Interactive Filter Strip */}
        <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-200 dark:border-[#1E283D] overflow-x-auto text-xs font-mono scrollbar-none">
          <span className="text-amber-800 dark:text-amber-400 uppercase text-[10px] font-bold shrink-0">KARNATAKA CLUSTERS:</span>
          {KARNATAKA_DISTRICTS.map((dist) => (
            <motion.button
              key={dist.name}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setSelectedDistrict(dist.name)}
              className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer whitespace-nowrap font-bold ${
                selectedDistrict === dist.name
                  ? 'bg-amber-500 text-black border-amber-400 shadow-sm'
                  : 'bg-slate-100 dark:bg-[#0E1422] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-[#1E283D] hover:bg-slate-200 dark:hover:bg-[#161D2E]'
              }`}
            >
              {dist.name} ({dist.count})
            </motion.button>
          ))}
        </div>
      </div>

      {/* ── Main Layout Grid: Filters Sidebar + Results ────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Filters Sidebar */}
        <div className="space-y-6">
          <div className="rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] p-5 space-y-6 shadow-xl font-mono">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#1E283D]">
              <span className="font-bold text-xs uppercase tracking-wider text-slate-900 dark:text-slate-300">Filters &amp; Sourcing</span>
              <button
                onClick={() => {
                  setMatchThreshold(75);
                  setVerifiedOnly(false);
                  setMsmeOnly(false);
                  setSelectedDistrict('ALL');
                }}
                className="text-[10px] text-amber-600 dark:text-amber-400 hover:underline uppercase font-bold cursor-pointer"
              >
                Clear All
              </button>
            </div>

            {/* AI Match Score Slider */}
            <div>
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-700 dark:text-slate-400 font-semibold">NLU MATCH SCORE</span>
                <span className="font-bold text-amber-700 dark:text-amber-400">
                  &gt; {matchThreshold}% {matchThreshold >= 75 ? 'Optimal' : 'Standard'}
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="95"
                value={matchThreshold}
                onChange={(e) => setMatchThreshold(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Trust Status Checkboxes */}
            <div className="space-y-2.5">
              <span className="text-xs uppercase text-slate-900 dark:text-slate-300 block font-bold">VERIFICATION STATUS</span>
              <label className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    className="accent-amber-500 rounded"
                  />
                  <span>User-Trusted Verified</span>
                </span>
                <span className="text-slate-600 dark:text-slate-400 text-[11px] font-bold">48</span>
              </label>

              <label className="flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 cursor-pointer hover:text-slate-900 dark:hover:text-white">
                <span className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={msmeOnly}
                    onChange={(e) => setMsmeOnly(e.target.checked)}
                    className="accent-amber-500 rounded"
                  />
                  <span>Karnataka Udyam (29...)</span>
                </span>
                <span className="text-slate-600 dark:text-slate-400 text-[11px] font-bold">26</span>
              </label>
            </div>

            {/* Industry Category Tags */}
            <div>
              <span className="text-xs uppercase text-slate-900 dark:text-slate-300 block font-bold mb-2.5">KARNATAKA SECTOR</span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { name: 'Silk & Textiles', count: 32 },
                  { name: 'Peenya CNC Machining', count: 28 },
                  { name: 'Foundry & Valves', count: 18 },
                  { name: 'Spices & Agro', count: 14 }
                ].map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer border ${
                      selectedCategory === cat.name
                        ? 'bg-amber-500/20 text-amber-900 dark:text-amber-300 border-amber-500 font-bold'
                        : 'bg-slate-50 dark:bg-[#07090E] text-slate-700 dark:text-slate-400 border-slate-200 dark:border-[#1E283D] hover:text-slate-900 dark:hover:text-slate-200'
                    }`}
                  >
                    {cat.name} ({cat.count})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-3 space-y-8">
          {/* Recommended for You Spotlight Cards with Real Distinct Images */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                Recommended for You in Karnataka
              </h2>
              <span className="text-xs text-slate-600 dark:text-slate-400 font-mono">Bhashini NLU Ranked</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Spotlight Card 1: Balaji Silk & Textiles Ltd. */}
              <motion.div
                whileHover={{ y: -3 }}
                onClick={() => router.push('/app/suppliers/sup_1')}
                className="relative rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] overflow-hidden hover:border-amber-500 transition-all duration-300 cursor-pointer shadow-xl group flex flex-col justify-between"
              >
                <div className="flex flex-col sm:flex-row h-full">
                  <div className="sm:w-2/5 relative min-h-[170px] sm:min-h-full overflow-hidden">
                    <img
                      src="/images/mysore_silk.jpg"
                      alt="Mysore Silk Weavers"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="sm:w-3/5 p-5 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <div className="space-y-0.5">
                          <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                            Balaji Silk &amp; Textiles Ltd.
                          </h3>
                          <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1 font-mono">
                            <MapPin className="w-3 h-3 text-rose-500" />
                            Mysuru, KA (140km)
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">TOP MATCH</span>
                          <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">98%</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 my-2">
                        <Badge variant="green" size="xs">Silk Mark Cert</Badge>
                        <Badge variant="gold" size="xs">User Trusted</Badge>
                      </div>

                      <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-2 leading-relaxed">
                        Authentic Mysuru pure raw mulberry silk, natural spun cotton, and handloom cooperatives.
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-[#1E283D]">
                      <div className="flex gap-3 text-xs font-mono">
                        <div>
                          <span className="text-[9px] text-slate-500 block">MIN. ORDER</span>
                          <span className="font-bold text-slate-900 dark:text-slate-200">100 kg</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-500 block">RESPONSE</span>
                          <span className="font-bold text-amber-600 dark:text-amber-400">&lt; 1 hr</span>
                        </div>
                      </div>
                      <Button size="sm" className="bg-gradient-to-r from-rose-600 via-amber-500 to-yellow-400 hover:from-rose-700 text-white font-bold text-xs rounded-xl border-0 shadow-md">
                        Contact Supplier
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Spotlight Card 2: Peenya Precision CNC Hub */}
              <motion.div
                whileHover={{ y: -3 }}
                onClick={() => router.push('/app/suppliers/sup_2')}
                className="relative rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] overflow-hidden hover:border-amber-500 transition-all duration-300 cursor-pointer shadow-xl group flex flex-col justify-between"
              >
                <div className="flex flex-col sm:flex-row h-full">
                  <div className="sm:w-2/5 relative min-h-[170px] sm:min-h-full overflow-hidden">
                    <img
                      src="/images/peenya_cnc.jpg"
                      alt="Peenya CNC Precision Tooling"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="sm:w-3/5 p-5 flex flex-col justify-between space-y-3">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <div className="space-y-0.5">
                          <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                            Peenya Precision CNC Hub
                          </h3>
                          <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1 font-mono">
                            <MapPin className="w-3 h-3 text-rose-500" />
                            Bengaluru, KA (15km)
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">MATCH</span>
                          <span className="text-xl font-black text-amber-600 dark:text-amber-400 font-mono">96%</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-1 my-2">
                        <Badge variant="gold" size="xs">ISO 9001</Badge>
                        <Badge variant="purple" size="xs">Aerospace CNC</Badge>
                      </div>

                      <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-2 leading-relaxed">
                        High-precision CNC metal milling, custom gear tooling, and rapid industrial machining.
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-[#1E283D]">
                      <div className="flex gap-3 text-xs font-mono">
                        <div>
                          <span className="text-[9px] text-slate-500 block">MIN. ORDER</span>
                          <span className="font-bold text-slate-900 dark:text-slate-200">50 Units</span>
                        </div>
                        <div>
                          <span className="text-[9px] text-slate-500 block">LEAD TIME</span>
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">24 hrs</span>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="border-slate-200 dark:border-[#1E283D] bg-slate-50 dark:bg-[#0E1422] text-xs rounded-xl text-slate-800 dark:text-amber-300 font-bold">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* All Karnataka Results Grid (Distinct Photos for every card) */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                Karnataka Verified Suppliers ({filteredResults.length} found)
              </h3>
              <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-2 font-mono">
                <span>SORT BY:</span>
                <select className="bg-slate-100 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] rounded-xl px-3 py-1 text-slate-900 dark:text-slate-200 focus:outline-none font-bold">
                  <option>Match Score</option>
                  <option>Expressway Distance</option>
                  <option>Trust Score</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <AnimatePresence>
                {filteredResults.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.05, duration: 0.25 }}
                    whileHover={{ y: -4 }}
                    onClick={() => router.push(`/app/suppliers/${item.id}`)}
                    className="rounded-3xl bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-[#1E283D] overflow-hidden hover:border-amber-500 transition-all duration-300 cursor-pointer shadow-md group flex flex-col justify-between"
                  >
                    <div className="h-36 w-full overflow-hidden relative bg-slate-100 dark:bg-[#07090E]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-lg bg-black/80 text-white font-mono font-bold text-xs backdrop-blur-sm">
                        {item.score}%
                      </div>
                    </div>

                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate">
                            {item.name}
                          </h4>
                        </div>

                        <div className="my-1.5">
                          <Badge variant={item.badgeVariant} size="xs">{item.badge}</Badge>
                        </div>

                        <p className="text-xs text-slate-700 dark:text-slate-300 line-clamp-2 leading-relaxed">{item.desc}</p>
                      </div>

                      <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-200 dark:border-[#1E283D] text-xs">
                        <span className="flex items-center gap-1 font-mono text-slate-700 dark:text-slate-300 font-medium">
                          <MapPin className="w-3 h-3 text-rose-500" />
                          {item.city}
                        </span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Load More Button */}
            <div className="flex justify-center mt-6">
              <Button variant="outline" className="text-xs rounded-xl border-slate-200 dark:border-[#1E283D] bg-white dark:bg-[#0E1422] text-slate-900 dark:text-amber-300 font-mono font-bold hover:bg-slate-100 dark:hover:bg-[#161D2E]">
                Load More Karnataka MSMEs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

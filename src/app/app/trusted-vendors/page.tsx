'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, Star, MapPin, Plus, Search, Filter, CheckCircle2,
  Building2, Phone, MessageSquare, QrCode, ArrowUpRight, Award,
  Sparkles, ExternalLink, Trash2, Clock, Check, X
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

type SourceType = 'ALL' | 'USER_TRUSTED' | 'AI_DISCOVERED' | 'ADMIN_SEEDED';

interface VendorItem {
  id: string;
  name: string;
  category: string;
  cluster: string;
  sourceType: 'USER_TRUSTED' | 'AI_DISCOVERED' | 'ADMIN_SEEDED';
  rating: number;
  ordersCompleted: number;
  qualityScore: number;
  deliveryOnTime: number;
  gstin: string;
  image: string;
  kannadaNotes: string;
  phone: string;
}

export default function TrustedVendorsPage() {
  const router = useRouter();
  const [filterTab, setFilterTab] = useState<SourceType>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [vendorName, setVendorName] = useState('');
  const [vendorGstin, setVendorGstin] = useState('29AAAAA0000A1Z5');
  const [vendorCluster, setVendorCluster] = useState('Mysuru Silk & Weaving Hub');
  const [vendorCategory, setVendorCategory] = useState('Silk & Organic Textiles');
  const [vendorPhone, setVendorPhone] = useState('+91 80 2345 8899');
  const [vendorNotes, setVendorNotes] = useState('ವಿಶ್ವಾಸಾರ್ಹ ಮೈಸೂರು ಸಿಲ್ಕ್ ಪೂರೈಕೆದಾರರು.');

  const [vendors, setVendors] = useState<VendorItem[]>([
    {
      id: 'ven_1',
      name: 'Balaji Silk & Handlooms Ltd.',
      category: 'Pure Mulberry Silk & Cotton Yarns',
      cluster: 'Mysuru Silk Corridor (140km)',
      sourceType: 'USER_TRUSTED',
      rating: 4.9,
      ordersCompleted: 142,
      qualityScore: 99.4,
      deliveryOnTime: 98.8,
      gstin: '29ABCDE1234F1Z5',
      image: '/images/mysore_silk.jpg',
      kannadaNotes: '100% ಶುದ್ಧ ಮೈಸೂರು ಸಿಲ್ಕ್ ಮಾರ್ಕ್ ದೃಢೀಕೃತ.',
      phone: '+91 821 245 6789'
    },
    {
      id: 'ven_2',
      name: 'Peenya CNC Aerospace Toolings',
      category: 'Precision CNC Machining & Gears',
      cluster: 'Bengaluru Peenya Stage 2 (15km)',
      sourceType: 'ADMIN_SEEDED',
      rating: 4.8,
      ordersCompleted: 89,
      qualityScore: 98.2,
      deliveryOnTime: 96.5,
      gstin: '29AABCP5678Q1Z9',
      image: '/images/peenya_cnc.jpg',
      kannadaNotes: 'ಪೀಣ್ಯ ಹೈಟೆಕ್ ಸಿಎನ್‌ಸಿ ಗೇರ್ ಮತ್ತು ಟೂಲಿಂಗ್ಸ್.',
      phone: '+91 80 2839 4411'
    },
    {
      id: 'ven_3',
      name: 'Belagavi Heavy Valves & Foundry',
      category: 'Ductile Iron Valves & Castings',
      cluster: 'Belagavi Udyambag Cluster (500km)',
      sourceType: 'AI_DISCOVERED',
      rating: 4.7,
      ordersCompleted: 64,
      qualityScore: 97.0,
      deliveryOnTime: 95.2,
      gstin: '29AAACF9012R1Z2',
      image: '/images/belagavi_foundry.jpg',
      kannadaNotes: 'ಬೆಳಗಾವಿ ಹೈಡ್ರಾಲಿಕ್ ಕಾಸ್ಟಿಂಗ್ಸ್.',
      phone: '+91 831 244 5566'
    },
    {
      id: 'ven_4',
      name: 'Western Ghats Organic Spices & Arabica',
      category: 'Green Cardamom & Roasted Arabica',
      cluster: 'Chikkamagaluru Plantation Hub (240km)',
      sourceType: 'USER_TRUSTED',
      rating: 4.9,
      ordersCompleted: 112,
      qualityScore: 99.1,
      deliveryOnTime: 99.0,
      gstin: '29AAACP3456T1Z1',
      image: '/images/karnataka_spices.jpg',
      kannadaNotes: 'ತೋಟದಿಂದ ನೇರ ಸಾವಯವ ಏಲಕ್ಕಿ ಮತ್ತು ಕಾಫಿ.',
      phone: '+91 8262 230 456'
    },
    {
      id: 'ven_5',
      name: 'Channapatna Craft Artisans Guild',
      category: 'GI Tagged Lacquered Woodcrafts',
      cluster: 'Ramanagara Channapatna Hub (60km)',
      sourceType: 'USER_TRUSTED',
      rating: 4.8,
      ordersCompleted: 78,
      qualityScore: 98.6,
      deliveryOnTime: 97.5,
      gstin: '29AAACG7890Y1Z8',
      image: '/images/channapatna_crafts.jpg',
      kannadaNotes: 'ಜಿಐ ಟ್ಯಾಗ್ ಪಡೆದ ನೈಸರ್ಗಿಕ ಬಣ್ಣದ ಮರದ ಕರಕುಶಲ ವಸ್ತುಗಳು.',
      phone: '+91 80 2725 3344'
    },
    {
      id: 'ven_6',
      name: 'Davangere Cotton Mills Pvt.',
      category: 'Combed Cotton Yarn & Bales',
      cluster: 'Davangere Textile Belt (260km)',
      sourceType: 'AI_DISCOVERED',
      rating: 4.6,
      ordersCompleted: 95,
      qualityScore: 96.8,
      deliveryOnTime: 94.0,
      gstin: '29AAACD3456K1Z4',
      image: '/images/raw_cotton.jpg',
      kannadaNotes: 'ದಾವಣಗೆರೆ ಹೈ-ಕೆಪಾಸಿಟಿ ಹತ್ತಿ ನೂಲು.',
      phone: '+91 8192 223 344'
    }
  ]);

  const handleAddVendor = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vendorName.trim()) return;

    const newVendor: VendorItem = {
      id: `ven_${Date.now()}`,
      name: vendorName,
      category: vendorCategory,
      cluster: vendorCluster,
      sourceType: 'USER_TRUSTED',
      rating: 5.0,
      ordersCompleted: 1,
      qualityScore: 100,
      deliveryOnTime: 100,
      gstin: vendorGstin,
      image: '/images/mysore_silk.jpg',
      kannadaNotes: vendorNotes,
      phone: vendorPhone
    };

    setVendors([newVendor, ...vendors]);
    setIsAddModalOpen(false);
    setVendorName('');
  };

  const filteredVendors = vendors.filter((v) => {
    const matchesTab = filterTab === 'ALL' || v.sourceType === filterTab;
    const matchesSearch =
      v.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.cluster.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-8 pb-12"
    >
      {/* ── Header ────────────────── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-[#1E283D]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Karnataka Trusted Vendors Repository
            </h1>
            <Badge variant="green" size="xs">Research Model Fig 5</Badge>
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
            Segregated supplier ecosystem ensuring MSMEs preserve trusted Karnataka local networks while accessing verified AI discovery.
          </p>
        </div>

        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-gradient-to-r from-rose-600 via-amber-500 to-yellow-400 hover:from-rose-700 hover:to-amber-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/25 border-0 flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add Trusted Vendor</span>
          </Button>
        </motion.div>
      </div>

      {/* ── 3D Trust Mesh Overview Metrics ────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-[#1E283D] shadow-sm font-mono">
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs mb-1">
            <span>USER TRUSTED</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">48</div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">100% Repeat Accuracy</div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-[#1E283D] shadow-sm font-mono">
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs mb-1">
            <span>AI DISCOVERED</span>
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">64</div>
          <div className="text-[10px] text-purple-600 dark:text-purple-400 font-bold">Bhashini NLU Vetted</div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-[#1E283D] shadow-sm font-mono">
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs mb-1">
            <span>ADMIN SEEDED</span>
            <Award className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">30</div>
          <div className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">Govt. Karnataka MSME</div>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-[#1E283D] shadow-sm font-mono">
          <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 text-xs mb-1">
            <span>AVG QUALITY</span>
            <Star className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white">98.4%</div>
          <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">Table V Benchmark</div>
        </div>
      </div>

      {/* ── Filters & Search Strip ────────────────── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Source Type Filter Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-[#0A0D16] border border-slate-200 dark:border-[#1E283D] w-full sm:w-auto overflow-x-auto text-xs font-mono">
          {(['ALL', 'USER_TRUSTED', 'AI_DISCOVERED', 'ADMIN_SEEDED'] as SourceType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap font-bold ${
                filterTab === tab
                  ? 'bg-amber-500 text-black shadow-sm'
                  : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* Search Query */}
        <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-white dark:bg-[#0E1422] border border-slate-200 dark:border-[#1E283D] w-full sm:w-72 shadow-sm">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search vendor, GSTIN, cluster..."
            className="w-full bg-transparent text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none font-sans font-medium"
          />
        </div>
      </div>

      {/* ── Vendors Grid (Distinct Real Photos with Framer Motion) ────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <AnimatePresence>
          {filteredVendors.map((vendor, index) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: index * 0.05, duration: 0.25 }}
              whileHover={{ y: -4 }}
              className="rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] overflow-hidden hover:border-amber-500 transition-all duration-300 shadow-md group flex flex-col justify-between"
            >
              {/* Real Photo Header */}
              <div className="h-40 w-full relative overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img
                  src={vendor.image}
                  alt={vendor.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-4">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-amber-300 uppercase block tracking-wider">
                      {vendor.cluster.split('(')[0]}
                    </span>
                    <h3 className="font-extrabold text-sm text-white">{vendor.name}</h3>
                  </div>
                </div>
              </div>

              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge
                      variant={
                        vendor.sourceType === 'USER_TRUSTED'
                          ? 'green'
                          : vendor.sourceType === 'ADMIN_SEEDED'
                          ? 'gold'
                          : 'purple'
                      }
                      size="xs"
                    >
                      {vendor.sourceType.replace('_', ' ')}
                    </Badge>
                    <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-bold">GST: {vendor.gstin}</span>
                  </div>

                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">{vendor.category}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 italic font-serif leading-relaxed">
                    &ldquo;{vendor.kannadaNotes}&rdquo;
                  </p>
                </div>

                {/* Score stats */}
                <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 dark:border-[#1E283D] text-xs font-mono">
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D]">
                    <span className="text-[10px] text-slate-500 block">QUALITY</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{vendor.qualityScore}%</span>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D]">
                    <span className="text-[10px] text-slate-500 block">DELIVERY</span>
                    <span className="font-bold text-amber-600 dark:text-amber-400">{vendor.deliveryOnTime}%</span>
                  </div>
                </div>

                {/* CTAs */}
                <div className="flex items-center gap-2 pt-2">
                  <Button
                    size="sm"
                    onClick={() => router.push('/app/voice-assistant')}
                    className="flex-1 bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-700 text-white font-bold text-xs rounded-xl border-0 shadow-sm"
                  >
                    <MessageSquare className="w-3.5 h-3.5 mr-1" />
                    <span>Inquire</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => router.push('/app/payments')}
                    className="border-slate-200 dark:border-[#1E283D] bg-white dark:bg-[#0E1422] text-slate-800 dark:text-amber-300 text-xs rounded-xl font-bold"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── Add Trusted Vendor Modal ────────────────── */}
      <AnimatePresence>
        {isAddModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#111624] border border-slate-200 dark:border-[#1E283D] p-6 md:p-8 shadow-2xl space-y-6"
            >
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>Add Karnataka Trusted MSME</span>
                </h3>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-400 mt-1">
                  Adds to your personal trusted repository for instant priority ranking during voice inquiries.
                </p>
              </div>

              <form onSubmit={handleAddVendor} className="space-y-4 text-xs font-mono">
                <div>
                  <label className="block text-slate-800 dark:text-slate-300 mb-1 font-bold">ENTERPRISE NAME</label>
                  <input
                    type="text"
                    required
                    value={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
                    placeholder="e.g. Mysuru Silk Weaving Co-op"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090D18] border border-slate-200 dark:border-[#1E283D] text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 font-sans font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-800 dark:text-slate-300 mb-1 font-bold">KARNATAKA GSTIN (29...)</label>
                    <input
                      type="text"
                      value={vendorGstin}
                      onChange={(e) => setVendorGstin(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090D18] border border-slate-200 dark:border-[#1E283D] text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-800 dark:text-slate-300 mb-1 font-bold">PHONE / WHATSAPP</label>
                    <input
                      type="text"
                      value={vendorPhone}
                      onChange={(e) => setVendorPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090D18] border border-slate-200 dark:border-[#1E283D] text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-800 dark:text-slate-300 mb-1 font-bold">KARNATAKA CLUSTER / DISTRICT</label>
                  <select
                    value={vendorCluster}
                    onChange={(e) => setVendorCluster(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090D18] border border-slate-200 dark:border-[#1E283D] text-slate-900 dark:text-white focus:outline-none font-sans font-medium"
                  >
                    <option>Mysuru Silk &amp; Weaving Hub</option>
                    <option>Bengaluru Peenya CNC Stage 1-4</option>
                    <option>Belagavi Heavy Foundry &amp; Valves</option>
                    <option>Chikkamagaluru &amp; Hassan Spices</option>
                    <option>Channapatna Lacquer Craft Guild</option>
                    <option>Davangere Textile Spinning Mills</option>
                    <option>Mangaluru NMPT Port Logistics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-800 dark:text-slate-300 mb-1 font-bold">KANNADA INSTRUCTIONS / ಟಿಪ್ಪಣಿಗಳು</label>
                  <textarea
                    rows={2}
                    value={vendorNotes}
                    onChange={(e) => setVendorNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090D18] border border-slate-200 dark:border-[#1E283D] text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 font-sans font-medium"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-[#1E283D]">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setIsAddModalOpen(false)}
                    className="text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-md border-0"
                  >
                    Save to Repository
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

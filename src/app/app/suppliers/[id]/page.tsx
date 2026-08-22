'use client';

import React, { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, Bookmark, BookmarkCheck, Share2, Sparkles, MapPin,
  ShieldCheck, Star, Calendar, Factory, Layers, Award, CheckCircle2,
  ExternalLink, MessageSquare, Package, ChevronRight, Languages, QrCode,
  Calculator, Lock, DollarSign, Send, X, Check, Truck
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function SupplierProfilePage() {
  const router = useRouter();
  const params = useParams();
  const [isSaved, setIsSaved] = useState(false);
  const [translatedKannada, setTranslatedKannada] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  // Quick Calculator state
  const [calcQty, setCalcQty] = useState<number>(500);
  const [calcFreightOption, setCalcFreightOption] = useState<'EXPRESS' | 'STANDARD'>('EXPRESS');
  const unitRate = 985;
  const subtotal = unitRate * calcQty;
  const gst = Math.round(subtotal * 0.05);
  const freight = calcFreightOption === 'EXPRESS' ? 3500 : 2000;
  const totalLanded = subtotal + gst + freight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-5xl mx-auto space-y-8 pb-12"
    >
      {/* ── Top Bar with Navigation & Actions ────────────────── */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Karnataka Directory</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsSaved(!isSaved)}
            className="w-9 h-9 rounded-xl bg-white dark:bg-[#0F1424] border border-slate-200 dark:border-[#1E283D] flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-amber-500 transition-colors cursor-pointer shadow-sm"
          >
            {isSaved ? <BookmarkCheck className="w-4 h-4 text-amber-500" /> : <Bookmark className="w-4 h-4" />}
          </button>
          <button
            onClick={() => {
              if (navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href);
                alert('Supplier profile link copied to clipboard!');
              }
            }}
            className="w-9 h-9 rounded-xl bg-white dark:bg-[#0F1424] border border-slate-200 dark:border-[#1E283D] flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-amber-500 transition-colors cursor-pointer shadow-sm"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── Profile Header Card with Real Image Avatar ────────────────── */}
      <div className="rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:via-[#0E1322] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] p-6 md:p-8 shadow-xl space-y-6 transition-colors">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            {/* Real Avatar Thumbnail */}
            <div className="relative w-18 h-18 rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-[#1E283D] shadow-lg shrink-0">
              <img
                src="/images/mysore_silk.jpg"
                alt="Balaji Silk & Textiles Avatar"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Balaji Silk &amp; Textiles Ltd.
                </h1>
                <Badge variant="green" size="xs">
                  <ShieldCheck className="w-3 h-3 mr-1" />
                  VERIFIED PARTNER
                </Badge>
                <Badge variant="slate" size="xs">MSME LEVEL 2</Badge>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                Specialized Karnataka manufacturers of high-GSM pure mulberry Mysore silk, organic cotton yarns, and technical blends for industrial garment clusters.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto shrink-0">
            <Button
              onClick={() => router.push('/app/voice-assistant')}
              className="bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-amber-500/25 border-0 flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Initiate Inquiry (ಕನ್ನಡ)</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => router.push('/app/payments')}
              className="text-xs border-slate-200 dark:border-[#1E283D] bg-slate-50 dark:bg-[#0E1422] text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-[#161D2E] rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4" />
              <span>Request Samples</span>
            </Button>
          </div>
        </div>

        {/* 4 Key Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-100 dark:border-[#1E283D] text-xs font-mono">
          <div>
            <span className="text-slate-500 block mb-1">LOCATION &amp; ROUTE</span>
            <span className="font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1 font-sans">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              Mysuru, Karnataka
            </span>
          </div>

          <div>
            <span className="text-slate-500 block mb-1">MONTHLY CAPACITY</span>
            <span className="font-extrabold text-slate-900 dark:text-slate-100 font-sans">
              50,000 Meters/Mo
            </span>
          </div>

          <div>
            <span className="text-slate-500 block mb-1">ESTABLISHED</span>
            <span className="font-extrabold text-slate-900 dark:text-slate-100 font-sans">
              2014 (10 Years MSME)
            </span>
          </div>

          <div>
            <span className="text-slate-500 block mb-1">VERNACULAR SUPPORT</span>
            <span className="font-extrabold text-amber-700 dark:text-amber-400 font-sans">
              ಕನ್ನಡ, English, Hindi
            </span>
          </div>
        </div>
      </div>

      {/* ── Quick Landed Cost Calculator Widget ── */}
      <div className="rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E283D]">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white">
              Instant Landed Cost Calculator (Mysuru ➔ Bengaluru Delivery)
            </h2>
          </div>
          <Badge variant="green" size="xs">Live Quote</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          <div className="space-y-3 font-mono text-xs">
            <div>
              <label className="text-slate-600 dark:text-slate-400 font-bold block mb-1">
                ORDER QUANTITY ({calcQty} Meters):
              </label>
              <input
                type="range"
                min="100"
                max="2000"
                step="50"
                value={calcQty}
                onChange={(e) => setCalcQty(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div>
              <label className="text-slate-600 dark:text-slate-400 font-bold block mb-1">
                LOGISTICS ROUTE:
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => setCalcFreightOption('EXPRESS')}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                    calcFreightOption === 'EXPRESS'
                      ? 'bg-amber-500 text-black border-amber-400'
                      : 'bg-slate-50 dark:bg-[#07090E] text-slate-700 dark:text-slate-400 border-slate-200 dark:border-[#1E283D]'
                  }`}
                >
                  ⚡ Expressway (24h)
                </button>
                <button
                  onClick={() => setCalcFreightOption('STANDARD')}
                  className={`flex-1 py-1.5 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                    calcFreightOption === 'STANDARD'
                      ? 'bg-amber-500 text-black border-amber-400'
                      : 'bg-slate-50 dark:bg-[#07090E] text-slate-700 dark:text-slate-400 border-slate-200 dark:border-[#1E283D]'
                  }`}
                >
                  Standard (48h)
                </button>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-slate-500">Material ({calcQty} M @ ₹985):</span>
              <span className="font-bold text-slate-900 dark:text-white">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Karnataka GST (5%):</span>
              <span className="font-bold text-amber-700 dark:text-amber-400">+₹{gst.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Expressway Freight:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">+₹{freight.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between pt-2 border-t border-slate-200 dark:border-[#1E283D] text-sm">
              <span className="font-bold text-slate-900 dark:text-white">Landed Total:</span>
              <span className="font-black text-emerald-600 dark:text-emerald-400">₹{totalLanded.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div>
            <Button
              onClick={() => router.push('/app/payments')}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-700 text-white font-bold text-xs shadow-md border-0 flex items-center justify-center gap-2 cursor-pointer font-mono"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock ₹{totalLanded.toLocaleString('en-IN')} in Escrow</span>
            </Button>
          </div>
        </div>
      </div>

      {/* ── Product Portfolio ────────────────── */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-4">Product Portfolio</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Main Card: Pure Mysore Silk Fabric */}
          <div className="sm:col-span-2 relative h-64 sm:h-80 rounded-3xl overflow-hidden border border-slate-200 dark:border-[#1E283D] group shadow-xl">
            <img
              src="/images/mysore_silk.jpg"
              alt="Pure Mulberry Mysore Silk"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-6">
              <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                FEATURED ITEM • 200 GSM
              </span>
              <h3 className="text-xl font-extrabold text-white">Pure Mulberry Mysore Silk (Natural Spun)</h3>
              <p className="text-xs text-slate-300 mt-1 max-w-lg">
                100% GOTS and Silk Mark Certified Karnataka organic silk fabric. Pre-shrunk with zero synthetic blending.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-col sm:justify-between">
            <div className="relative h-34 sm:h-38 rounded-2xl overflow-hidden border border-slate-200 dark:border-[#1E283D] group shadow-md">
              <img
                src="/images/raw_cotton.jpg"
                alt="Organic Cotton"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-mono font-bold text-white truncate">Organic Raw Cotton</span>
              </div>
            </div>

            <div className="relative h-34 sm:h-38 rounded-2xl overflow-hidden border border-slate-200 dark:border-[#1E283D] group shadow-md">
              <img
                src="/images/dyed_linens.jpg"
                alt="Dyed Linens"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent flex items-end p-3">
                <span className="text-[11px] font-mono font-bold text-white truncate">Dyed Linens</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Compliance & Certifications ────────────────── */}
      <div>
        <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight mb-4">Compliance &amp; Certifications</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-[#0E1322] border border-slate-200 dark:border-[#1E283D] flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 font-mono">ISO 9001:2015</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Quality Mgmt</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#0E1322] border border-slate-200 dark:border-[#1E283D] flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 font-mono">GOTS Certified</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Organic Textiles</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-[#0E1322] border border-slate-200 dark:border-[#1E283D] flex items-center gap-3 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-slate-100 font-mono">Silk Mark India</h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Govt. of Karnataka Verified</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Supplier Reviews Section ────────────────── */}
      <div className="rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] p-6 shadow-xl space-y-6 transition-colors">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-[#1E283D]">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">Supplier Reviews</h2>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
              <Star className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
              <span>4.9 (142 MSMEs)</span>
            </div>
            <Button
              size="sm"
              onClick={() => setShowReviewModal(true)}
              className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs rounded-xl"
            >
              + Write Review (ಕನ್ನಡ)
            </Button>
          </div>
        </div>

        {/* Review 1: Kannada with translation */}
        <div className="space-y-2.5 pb-5 border-b border-slate-200 dark:border-[#1E283D]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-indigo-600/20 text-indigo-700 dark:text-indigo-300 font-bold text-xs flex items-center justify-center">
                ಕೆ
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-200">ಕರ್ನಾಟಕ ಗಾರ್ಮೆಂಟ್ಸ್ (Peenya Hub)</span>
                <div className="flex items-center text-amber-500 text-[10px]">
                  {'★'.repeat(5)}
                </div>
              </div>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">2 weeks ago</span>
          </div>

          <p className="text-xs text-slate-700 dark:text-slate-300 italic font-serif leading-relaxed">
            {translatedKannada
              ? '"Excellent Mysore silk quality and rapid expressway delivery to our Peenya workshop! Highly reliable."'
              : '"ಉತ್ಕೃಷ್ಟ ಗುಣಮಟ್ಟ ಮತ್ತು ಸಮಯಕ್ಕೆ ಸರಿಯಾದ ಡೆಲಿವರಿ! ಮೈಸೂರು ಸಿಲ್ಕ್ ಗುಣಮಟ್ಟ ಅತ್ಯುತ್ತಮವಾಗಿದೆ ಮತ್ತು ಬೆಲೆಗಳು ಸಮಂಜಸವಾಗಿದೆ."'}
          </p>

          <button
            onClick={() => setTranslatedKannada(!translatedKannada)}
            className="flex items-center gap-1 text-[11px] font-mono text-indigo-600 dark:text-indigo-400 hover:underline transition-colors cursor-pointer"
          >
            <Languages className="w-3 h-3" />
            <span>{translatedKannada ? 'Show Original (ಕನ್ನಡ)' : 'Translate to English'}</span>
          </button>
        </div>

        {/* Review 2: EuroTextiles */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs flex items-center justify-center">
                E
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-200">EuroTextiles GmbH (Bengaluru Office)</span>
                <div className="flex items-center text-amber-500 text-[10px]">
                  {'★'.repeat(4)}{'☆'}
                </div>
              </div>
            </div>
            <span className="text-[11px] text-slate-500 font-mono">1 month ago</span>
          </div>

          <p className="text-xs text-slate-700 dark:text-slate-300 italic font-serif leading-relaxed">
            &ldquo;Consistently high quality organic cotton yarn. The GSM variance is within 1.5%, which is ideal for export production lines. Seamless UPI escrow transactions through Bhasha Bridge.&rdquo;
          </p>
        </div>
      </div>

      {/* ── Vernacular Review Modal ── */}
      <AnimatePresence>
        {showReviewModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReviewModal(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md rounded-3xl bg-white dark:bg-[#111624] border border-slate-200 dark:border-[#1E283D] p-6 shadow-2xl space-y-4 z-10 text-slate-900 dark:text-white"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-[#1E283D]">
                <h3 className="font-extrabold text-base">Write Vernacular Review (ವಿಮರ್ಶೆ)</h3>
                <button onClick={() => setShowReviewModal(false)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {reviewSubmitted ? (
                <div className="p-6 text-center space-y-2 font-mono text-xs text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-10 h-10 mx-auto" />
                  <p className="font-bold">ಧನ್ಯವಾದಗಳು! ನಿಮ್ಮ ವಿಮರ್ಶೆಯನ್ನು ಪ್ರಕಟಿಸಲಾಗಿದೆ.</p>
                  <p className="text-slate-500">Thank you! Your verified review has been published on the platform.</p>
                </div>
              ) : (
                <div className="space-y-3 text-xs font-mono">
                  <div>
                    <label className="text-slate-600 dark:text-slate-400 block mb-1">RATING:</label>
                    <div className="flex gap-1 text-amber-400 text-lg">
                      {'★'.repeat(5)}
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-600 dark:text-slate-400 block mb-1">YOUR REVIEW (ಕನ್ನಡ ಅಥವಾ ಇಂಗ್ಲಿಷ್):</label>
                    <textarea
                      rows={3}
                      placeholder="ಗುಣಮಟ್ಟ, ಸಮಯಕ್ಕೆ ಸರಿಯಾದ ಡೆಲಿವರಿ ಮತ್ತು ಸಂವಹನದ ಬಗ್ಗೆ ಬರೆಯಿರಿ..."
                      className="w-full p-3 rounded-xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-xs font-sans focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <Button
                    onClick={() => {
                      setReviewSubmitted(true);
                      setTimeout(() => {
                        setShowReviewModal(false);
                        setReviewSubmitted(false);
                      }, 1800);
                    }}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs py-2.5 rounded-xl border-0"
                  >
                    Submit Verified MSME Review
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

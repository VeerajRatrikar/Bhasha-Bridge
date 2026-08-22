'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  QrCode, ShieldCheck, CheckCircle2, Lock, Sparkles,
  Download, ArrowRight, RefreshCw, Zap, Building2, Receipt,
  CreditCard, Smartphone, Check, Eye, Printer, Layers, Clock,
  FileText, Activity, AlertCircle, MapPin
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { DynamicQrTerminal } from '@/components/payments/DynamicQrTerminal';

interface MilestoneContract {
  id: string;
  orderNumber: string;
  seller: string;
  district: string;
  totalAmount: string;
  m1Status: 'RELEASED' | 'LOCKED' | 'PENDING';
  m2Status: 'RELEASED' | 'LOCKED' | 'PENDING';
  m3Status: 'RELEASED' | 'LOCKED' | 'PENDING';
  gstin: string;
  product: string;
}

export default function PaymentsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'QR_ESCROW' | 'MILESTONE_STUDIO' | 'INVOICES' | 'TELEMETRY'>('QR_ESCROW');
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

  const [contracts, setContracts] = useState<MilestoneContract[]>([
    {
      id: 'CNT-KA-991',
      orderNumber: 'ORD-2024-KA-991',
      seller: 'Peenya Precision CNC Hub',
      district: 'Bengaluru (Peenya Ind. Area)',
      totalAmount: '₹6,50,000',
      m1Status: 'RELEASED',
      m2Status: 'LOCKED',
      m3Status: 'PENDING',
      gstin: '29AABCP5678Q1Z9',
      product: '500 Pcs Haas CNC Gear Teeth'
    },
    {
      id: 'CNT-KA-881',
      orderNumber: 'ORD-2024-KA-881',
      seller: 'Balaji Silk & Textiles Ltd.',
      district: 'Mysuru Silk Corridor',
      totalAmount: '₹9,85,000',
      m1Status: 'RELEASED',
      m2Status: 'RELEASED',
      m3Status: 'RELEASED',
      gstin: '29ABCDE1234F1Z5',
      product: '1,000 Meters Pure Mulberry Silk'
    },
    {
      id: 'CNT-KA-772',
      orderNumber: 'ORD-2024-KA-772',
      seller: 'Belagavi Heavy Valves & Foundry',
      district: 'Belagavi Foundry Complex',
      totalAmount: '₹4,80,000',
      m1Status: 'RELEASED',
      m2Status: 'PENDING',
      m3Status: 'PENDING',
      gstin: '29BELGV8821K1ZM',
      product: '120 Units Ductile Iron Valves'
    }
  ]);

  const INVOICES = [
    {
      id: 'INV-KA-2024-881',
      date: 'Aug 14, 2024',
      vendor: 'Balaji Silk & Textiles Ltd. (Mysuru)',
      amount: '₹9,85,000',
      status: 'Escrow Released',
      gstin: '29ABCDE1234F1Z5',
      tax: '₹1,77,300 (18% GST)',
      hsn: '500720',
      irn: '88a91c2f901192e48b81204092b11a'
    },
    {
      id: 'INV-KA-2024-762',
      date: 'Aug 02, 2024',
      vendor: 'Peenya Precision CNC Hub (Bengaluru)',
      amount: '₹6,50,000',
      status: 'Milestone 2 In-Progress',
      gstin: '29AABCP5678Q1Z9',
      tax: '₹1,17,000 (18% GST)',
      hsn: '848340',
      irn: '44b82c1e702281d39c71302081c22b'
    },
    {
      id: 'INV-KA-2024-640',
      date: 'Jul 26, 2024',
      vendor: 'Davangere Cotton Mills Pvt.',
      amount: '₹12,40,000',
      status: 'Escrow Released',
      gstin: '29AAACD3456K1Z4',
      tax: '₹62,000 (5% GST)',
      hsn: '520811',
      irn: '22c73d0a603370c28d61401070d33c'
    }
  ];

  const handleReleaseContractMilestone = (contractId: string, milestone: 'm2' | 'm3') => {
    setContracts(prev => prev.map(c => {
      if (c.id === contractId) {
        if (milestone === 'm2') return { ...c, m2Status: 'RELEASED', m3Status: 'LOCKED' };
        if (milestone === 'm3') return { ...c, m3Status: 'RELEASED' };
      }
      return c;
    }));
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
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Dynamic UPI Payments &amp; Milestone Escrow Studio
            </h1>
            <Badge variant="gold" size="xs">NPCI Bank-Grade</Badge>
          </div>
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mt-1">
            Dynamic UPI QR scan-to-pay, multi-stage milestone releases (20%/50%/30%), and Karnataka State 29 GST E-Invoices.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-100 dark:bg-[#0A0D16] border border-slate-200 dark:border-[#1E283D] text-xs font-mono overflow-x-auto">
          {[
            { id: 'QR_ESCROW', label: 'Dynamic QR Terminal' },
            { id: 'MILESTONE_STUDIO', label: 'Milestone Escrow Studio' },
            { id: 'INVOICES', label: 'GST E-Invoices' },
            { id: 'TELEMETRY', label: 'Bank Telemetry Logs' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap font-bold ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-black shadow-sm font-black'
                  : 'text-slate-700 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab 1: Interactive Dynamic UPI QR Terminal ────────────────── */}
      {activeTab === 'QR_ESCROW' && (
        <div className="space-y-6 animate-fadeIn">
          <DynamicQrTerminal />
        </div>
      )}

      {/* ── Tab 2: Multi-Stage Milestone Escrow Studio ────────────────── */}
      {activeTab === 'MILESTONE_STUDIO' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Active Karnataka MSME Escrow Contracts</span>
            </h2>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              3 Active Contracts (₹21.15 Lakh Secured)
            </span>
          </div>

          <div className="space-y-4">
            {contracts.map((c) => (
              <div
                key={c.id}
                className="rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] p-6 shadow-xl space-y-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-[#1E283D]">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{c.seller}</h3>
                      <Badge variant="green" size="xs">Verified Supplier</Badge>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-0.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-rose-500" />
                      {c.district} • {c.product}
                    </p>
                  </div>

                  <div className="text-right font-mono">
                    <div className="text-xs text-slate-500">TOTAL ESCROW VALUE:</div>
                    <div className="text-xl font-black text-slate-900 dark:text-white">{c.totalAmount}</div>
                  </div>
                </div>

                {/* 3 Milestone Progression Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
                  {/* Milestone 1 */}
                  <div className={`p-4 rounded-2xl border transition-all ${
                    c.m1Status === 'RELEASED'
                      ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/30'
                      : 'bg-slate-50 dark:bg-[#07090E] border-slate-200 dark:border-[#1E283D]'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-900 dark:text-white">M1: Advance Lock (20%)</span>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" /> Released
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                      Raw material procurement and factory batch allocation verified.
                    </p>
                  </div>

                  {/* Milestone 2 */}
                  <div className={`p-4 rounded-2xl border transition-all ${
                    c.m2Status === 'RELEASED'
                      ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/30'
                      : c.m2Status === 'LOCKED'
                      ? 'bg-amber-50 dark:bg-amber-500/10 border-amber-300 dark:border-amber-500/30'
                      : 'bg-slate-50 dark:bg-[#07090E] border-slate-200 dark:border-[#1E283D]'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-900 dark:text-white">M2: In-Transit QC (50%)</span>
                      <span className={`text-[10px] font-bold ${
                        c.m2Status === 'RELEASED' ? 'text-emerald-600' : 'text-amber-600'
                      }`}>
                        {c.m2Status === 'RELEASED' ? '✓ Released' : c.m2Status === 'LOCKED' ? '🔒 Escrow Locked' : 'Pending'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                      NABL QC clearance and Karnataka Expressway gate pass dispatch.
                    </p>
                    {c.m2Status === 'LOCKED' && (
                      <Button
                        size="sm"
                        onClick={() => handleReleaseContractMilestone(c.id, 'm2')}
                        className="w-full mt-3 bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs rounded-xl"
                      >
                        Verify QC &amp; Release 50%
                      </Button>
                    )}
                  </div>

                  {/* Milestone 3 */}
                  <div className={`p-4 rounded-2xl border transition-all ${
                    c.m3Status === 'RELEASED'
                      ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-300 dark:border-emerald-500/30'
                      : c.m3Status === 'LOCKED'
                      ? 'bg-amber-50 dark:bg-amber-500/10 border-amber-300 dark:border-amber-500/30'
                      : 'bg-slate-50 dark:bg-[#07090E] border-slate-200 dark:border-[#1E283D]'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-slate-900 dark:text-white">M3: Final Sign-off (30%)</span>
                      <span className={`text-[10px] font-bold ${
                        c.m3Status === 'RELEASED' ? 'text-emerald-600' : 'text-slate-500'
                      }`}>
                        {c.m3Status === 'RELEASED' ? '✓ Settled' : c.m3Status === 'LOCKED' ? '🔒 Locked' : 'Pending M2'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans">
                      Destination warehouse delivery and digital proof of acceptance.
                    </p>
                    {c.m3Status === 'LOCKED' && (
                      <Button
                        size="sm"
                        onClick={() => handleReleaseContractMilestone(c.id, 'm3')}
                        className="w-full mt-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl"
                      >
                        Sign-off Final 30%
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab 3: Official Karnataka GST E-Invoices ────────────────── */}
      {activeTab === 'INVOICES' && (
        <div className="rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-[#1E283D]">
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                Government of Karnataka GST E-Tax Invoices (State 29)
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-0.5">
                Compliant with GSTN e-Invoice portal and digitally signed by Bhasha Bridge escrow node.
              </p>
            </div>
            <Badge variant="gold" size="xs">Auto E-Way Bill Attached</Badge>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-[#1E283D]">
            {INVOICES.map((inv) => (
              <div
                key={inv.id}
                className="py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 font-mono text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-black text-slate-900 dark:text-white text-sm">{inv.id}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold text-[10px]">
                      {inv.status}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 font-sans font-medium">{inv.vendor}</p>
                  <p className="text-slate-500 text-[11px]">GSTIN: {inv.gstin} • HSN: {inv.hsn} • IRN: {inv.irn}</p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-black text-slate-900 dark:text-white text-base">{inv.amount}</div>
                    <div className="text-[10px] text-slate-500">{inv.tax}</div>
                  </div>

                  <Button
                    size="sm"
                    onClick={() => {
                      alert(`Downloading official GST Tax Invoice PDF for ${inv.id}`);
                    }}
                    className="bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Tab 4: Live Bank Webhook & Telemetry Console ────────────────── */}
      {activeTab === 'TELEMETRY' && (
        <div className="rounded-3xl bg-slate-950 border border-slate-800 p-6 shadow-2xl space-y-4 font-mono text-xs text-slate-300">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
              <h3 className="font-extrabold text-white">Live NPCI / Bank IMPS Webhook Stream</h3>
            </div>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
              WEBSOCKET_CONNECTED
            </span>
          </div>

          <div className="space-y-2 max-h-96 overflow-y-auto">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2">
              <span className="text-emerald-400 font-bold">[2024-08-21 21:40:02]</span>
              <span>NPCI_SETTLEMENT_200: Order ORD-2024-KA-991 locked ₹6,50,000 in escrow. State 29 GST allocated.</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2">
              <span className="text-amber-400 font-bold">[2024-08-21 21:38:15]</span>
              <span>UPI_DYNAMIC_QR_SCANNED: VPA client bhashabridge.escrow@icici via GooglePay Mobile App.</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2">
              <span className="text-cyan-400 font-bold">[2024-08-21 21:35:40]</span>
              <span>GATE_PASS_VERIFIED: Truck KA-01-EXP-8891 cleared Ramanagara Expressway toll point.</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-2">
              <span className="text-emerald-400 font-bold">[2024-08-21 21:20:10]</span>
              <span>ESCROW_MILESTONE_1_RELEASED: ₹1,97,000 credited to Balaji Silk Weavers Mysuru.</span>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

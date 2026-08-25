'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'qrcode';
import {
  QrCode, ShieldCheck, CheckCircle2, Copy, Download, ArrowRight,
  Zap, Lock, RefreshCw, Smartphone, Building2, Check, AlertCircle,
  FileText, ExternalLink, Printer, CreditCard, Banknote, HelpCircle,
  Calendar, Layers, Sparkles, Receipt, Sliders
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { EscrowCube3D } from '@/components/3d/EscrowCube3D';

interface DynamicQrProps {
  initialAmount?: number;
  orderId?: string;
  supplierName?: string;
  clusterCity?: string;
}

export function DynamicQrTerminal({
  initialAmount = 15000,
  orderId = 'ORD-2024-KA-889',
  supplierName = 'Balaji Silk & Textiles Ltd.',
  clusterCity = 'Mysuru Silk Corridor, Karnataka'
}: DynamicQrProps) {
  const [amount, setAmount] = useState<number>(initialAmount);
  const [paymentMode, setPaymentMode] = useState<'UPI_QR' | 'NET_BANKING' | 'AUTOPAY_MANDATE' | 'TREDS_CREDIT'>('UPI_QR');
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'scanning' | 'locked' | 'released'>('idle');
  const [upiVpa, setUpiVpa] = useState('bhashabridge.escrow@icici');
  const [copiedVpa, setCopiedVpa] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedAcc, setCopiedAcc] = useState(false);
  const [transactionRef, setTransactionRef] = useState('UPI-TXN-29' + Math.floor(10000000 + Math.random() * 90000000));
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedBank, setSelectedBank] = useState('Karnataka Bank');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [isGeneratingQr, setIsGeneratingQr] = useState(false);

  // NPCI Standard UPI Payload URL
  const upiPayload = `upi://pay?pa=${upiVpa}&pn=BhashaBridge%20Karnataka%20MSME%20Escrow&mc=5411&tid=${transactionRef}&tr=${orderId}&tn=Karnataka%20MSME%20Escrow%20Lock&am=${amount}&cu=INR`;

  // Dynamically generate true in-browser scannable QR matrix on any amount / detail change
  useEffect(() => {
    let isMounted = true;
    setIsGeneratingQr(true);

    QRCode.toDataURL(upiPayload, {
      width: 280,
      margin: 1.5,
      color: {
        dark: '#0A0D16',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'M'
    })
      .then((url) => {
        if (isMounted) {
          setQrDataUrl(url);
          setIsGeneratingQr(false);
        }
      })
      .catch((err) => {
        console.error('Error generating dynamic QR code:', err);
        setIsGeneratingQr(false);
      });

    return () => {
      isMounted = false;
    };
  }, [amount, upiVpa, transactionRef, orderId, upiPayload]);

  const handleSimulatePayment = () => {
    setPaymentStatus('scanning');
    setTimeout(() => {
      setPaymentStatus('locked');
    }, 500);
  };

  const handleReleaseEscrow = () => {
    setPaymentStatus('released');
  };

  const handleCopy = (text: string, type: 'vpa' | 'link' | 'acc') => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      if (type === 'vpa') { setCopiedVpa(true); setTimeout(() => setCopiedVpa(false), 2000); }
      if (type === 'link') { setCopiedLink(true); setTimeout(() => setCopiedLink(false), 2000); }
      if (type === 'acc') { setCopiedAcc(true); setTimeout(() => setCopiedAcc(false), 2000); }
    }
  };

  return (
    <div className="relative rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:via-[#0D121F] dark:to-[#090C15] border border-slate-200 dark:border-[#1E283D] p-6 md:p-8 shadow-xl overflow-hidden">
      {/* Top Ambient Glow & 3D WebGL Escrow Cube */}
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-gradient-to-br from-amber-500/15 via-rose-500/10 to-transparent blur-3xl pointer-events-none opacity-0 dark:opacity-100" />
      <div className="absolute top-2 right-4 w-40 h-40 pointer-events-none opacity-30 hidden lg:block z-0">
        <EscrowCube3D />
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-[#1E283D]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-600 via-amber-500 to-yellow-400 p-[1.5px] shadow-lg shadow-amber-500/20">
            <div className="w-full h-full rounded-[14px] bg-white dark:bg-[#0A0D16] flex items-center justify-center text-amber-600 dark:text-amber-400">
              <QrCode className="w-6 h-6" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Real Dynamic UPI &amp; B2B Payment Studio
              </h2>
              <Badge variant="green" size="xs">Live Dynamic Generator</Badge>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-0.5">
              Instant in-browser QR generation encoding standard NPCI UPI payload URLs.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5 font-bold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>256-Bit Bank Escrow</span>
          </span>
        </div>
      </div>

      {/* ── Payment Method Switcher Tabs ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-6">
        {[
          { id: 'UPI_QR', label: 'Dynamic UPI QR', icon: QrCode, badge: 'Live QR' },
          { id: 'NET_BANKING', label: 'B2B RTGS / NEFT', icon: Building2, badge: 'Large Orders' },
          { id: 'AUTOPAY_MANDATE', label: 'e-NACH AutoPay', icon: RefreshCw, badge: 'Milestones' },
          { id: 'TREDS_CREDIT', label: 'TReDS MSME Credit', icon: ShieldCheck, badge: '0% Govt' }
        ].map((mode) => {
          const Icon = mode.icon;
          const isSelected = paymentMode === mode.id;
          return (
            <button
              key={mode.id}
              onClick={() => setPaymentMode(mode.id as any)}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer shadow-sm ${
                isSelected
                  ? 'border-amber-400 bg-amber-50 dark:bg-amber-500/15 text-slate-900 dark:text-white ring-2 ring-amber-400/30 font-bold'
                  : 'border-slate-200 dark:border-[#1E283D] bg-slate-50/50 dark:bg-[#0A0E1A] text-slate-700 dark:text-slate-400 hover:border-amber-400'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <Icon className={`w-4 h-4 ${isSelected ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500'}`} />
                <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                  {mode.badge}
                </span>
              </div>
              <div className="text-xs font-extrabold truncate">{mode.label}</div>
            </button>
          );
        })}
      </div>

      {/* ── Mode 1: Real Dynamic UPI QR Terminal ── */}
      {paymentMode === 'UPI_QR' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: Real Dynamic Scannable QR (5 cols) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <div className="relative group p-6 rounded-3xl bg-slate-50 dark:bg-gradient-to-b dark:from-[#161D2E] dark:to-[#0D121F] border-2 border-amber-400 dark:border-amber-500/40 shadow-2xl flex flex-col items-center">
              {/* Laser Scan Animation Line */}
              {paymentStatus === 'scanning' && (
                <motion.div
                  animate={{ y: [0, 200, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-x-4 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22D3EE] z-20"
                />
              )}

              {/* Real In-Browser Rendered Dynamic QR Code */}
              <div className="relative p-3 rounded-2xl bg-white shadow-xl flex items-center justify-center select-none overflow-hidden min-h-[220px] min-w-[220px]">
                {qrDataUrl ? (
                  <img
                    src={qrDataUrl}
                    alt="Real Dynamic Karnataka Escrow UPI QR"
                    className="w-52 h-52 sm:w-60 sm:h-60 object-contain rounded-lg"
                  />
                ) : (
                  <div className="w-52 h-52 flex flex-col items-center justify-center text-slate-400 space-y-2">
                    <RefreshCw className="w-8 h-8 animate-spin text-amber-500" />
                    <span className="text-xs font-mono">Generating Live QR Matrix...</span>
                  </div>
                )}

                {/* Central Bhasha Logo Watermark Badge */}
                <div className="absolute inset-0 m-auto w-10 h-10 rounded-xl bg-white border-2 border-amber-400 flex items-center justify-center shadow-lg pointer-events-none">
                  <span className="font-mono font-black text-xs text-rose-600">ಭಾ</span>
                </div>
              </div>

              {/* Amount Pill */}
              <div className="mt-4 px-4 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-amber-300 font-mono text-xs font-extrabold flex items-center gap-1.5 shadow-md">
                <span>₹{amount.toLocaleString('en-IN')} INR</span>
                <span className="text-slate-500">•</span>
                <span className="text-emerald-400">Escrow Hold</span>
              </div>

              {/* Status Badge */}
              <div className="mt-3 flex items-center gap-1.5 text-xs font-mono">
                {paymentStatus === 'idle' && (
                  <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5 text-amber-500 animate-bounce" />
                    Scan with GPay, PhonePe, Paytm, or BHIM
                  </span>
                )}
                {paymentStatus === 'scanning' && (
                  <span className="text-cyan-600 dark:text-cyan-400 flex items-center gap-1 font-bold animate-pulse">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Verifying NPCI Bank Webhook...
                  </span>
                )}
                {paymentStatus === 'locked' && (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Funds Locked in Escrow
                  </span>
                )}
                {paymentStatus === 'released' && (
                  <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Settled to Supplier
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right: Order Details, Real-Time Amount Sliders & Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-4 font-mono text-xs">
            {/* Order Summary Card */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-[#1E283D]">
                <span className="text-slate-500 font-bold">ESCROW CONTRACT ID:</span>
                <span className="font-extrabold text-slate-900 dark:text-white text-xs">{orderId}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">BENEFICIARY MSME:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{supplierName}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-slate-500">REGISTERED CLUSTER:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">{clusterCity}</span>
              </div>

              {/* Dynamic Amount Adjuster with Presets */}
              <div className="pt-2 border-t border-slate-200 dark:border-[#1E283D] space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 font-bold">DYNAMIC AMOUNT (INR):</span>
                  <div className="flex items-center gap-1">
                    <span className="text-slate-500 font-bold">₹</span>
                    <input
                      type="number"
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="w-32 px-3 py-1.5 rounded-xl bg-white dark:bg-[#121724] border border-slate-300 dark:border-[#1E283D] text-slate-900 dark:text-white font-black text-right focus:outline-none focus:border-amber-400 text-xs"
                    />
                  </div>
                </div>

                {/* Quick Amount Chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] text-slate-500">Presets:</span>
                  {[5000, 15000, 50000, 250000, 650000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setAmount(preset)}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${
                        amount === preset
                          ? 'bg-amber-500 text-black border-amber-400'
                          : 'bg-white dark:bg-[#0E1422] border-slate-200 dark:border-[#1E283D] text-slate-700 dark:text-slate-300 hover:border-amber-400'
                      }`}
                    >
                      ₹{preset >= 100000 ? `${preset / 100000}L` : `${preset / 1000}k`}
                    </button>
                  ))}
                </div>

                {/* Interactive Slider */}
                <input
                  type="range"
                  min="1000"
                  max="1000000"
                  step="5000"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer pt-1"
                />
              </div>
            </div>

            {/* UPI Deep Link & VPA Action Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleCopy(upiVpa, 'vpa')}
                className="p-3 rounded-xl bg-slate-50 dark:bg-[#0E1422] border border-slate-200 dark:border-[#1E283D] flex items-center justify-between text-left hover:border-amber-400 transition-colors cursor-pointer"
              >
                <div>
                  <div className="text-[10px] text-slate-500 font-bold">ESCROW VPA:</div>
                  <div className="font-bold text-slate-900 dark:text-white truncate">{upiVpa}</div>
                </div>
                <Copy className="w-3.5 h-3.5 text-amber-500 shrink-0 ml-2" />
              </button>

              <button
                type="button"
                onClick={() => handleCopy(upiPayload, 'link')}
                className="p-3 rounded-xl bg-slate-50 dark:bg-[#0E1422] border border-slate-200 dark:border-[#1E283D] flex items-center justify-between text-left hover:border-amber-400 transition-colors cursor-pointer"
              >
                <div>
                  <div className="text-[10px] text-slate-500 font-bold">UPI INTENT PAYLOAD:</div>
                  <div className="font-bold text-slate-900 dark:text-white truncate">
                    {copiedLink ? 'Copied to Clipboard!' : 'Copy upi:// Payload'}
                  </div>
                </div>
                <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0 ml-2" />
              </button>
            </div>

            {/* Interactive Simulation Action Buttons */}
            <div className="space-y-2 pt-2">
              {paymentStatus === 'idle' && (
                <div className="space-y-2">
                  <Button
                    onClick={handleSimulatePayment}
                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-600 via-amber-500 to-yellow-400 hover:from-rose-700 text-white font-extrabold text-xs shadow-xl shadow-amber-500/25 border-0 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Lock className="w-4 h-4" />
                    <span>Simulate Mobile Scan &amp; Lock ₹{amount.toLocaleString('en-IN')}</span>
                  </Button>

                  <a
                    href={upiPayload}
                    className="w-full py-2.5 rounded-xl bg-slate-100 dark:bg-[#121724] border border-slate-300 dark:border-[#1E283D] text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-slate-200 dark:hover:bg-[#1A2234] transition-colors"
                  >
                    <Smartphone className="w-3.5 h-3.5 text-amber-500" />
                    <span>Open in Mobile UPI App (GPay / PhonePe / Paytm)</span>
                  </a>
                </div>
              )}

              {paymentStatus === 'locked' && (
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 flex items-center justify-between">
                    <span className="font-bold text-emerald-800 dark:text-emerald-300">
                      ₹{amount.toLocaleString('en-IN')} Secured in Karnataka Escrow Node
                    </span>
                    <Badge variant="green" size="xs">Milestone Protected</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleReleaseEscrow}
                      className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                    >
                      Release Escrow to MSME
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowReceiptModal(true)}
                      className="py-3 px-4 rounded-xl border-slate-300 dark:border-[#1E283D]"
                    >
                      <Receipt className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}

              {paymentStatus === 'released' && (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-black text-emerald-700 dark:text-emerald-300 text-sm">
                      ✓ ₹{amount.toLocaleString('en-IN')} Settled to {supplierName}
                    </span>
                    <Badge variant="green" size="xs">Settled</Badge>
                  </div>
                  <Button
                    onClick={() => setShowReceiptModal(true)}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs rounded-xl"
                  >
                    <FileText className="w-3.5 h-3.5 mr-1.5" />
                    <span>View Karnataka GST Tax Invoice</span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Mode 2: B2B Corporate NetBanking & RTGS / NEFT ── */}
      {paymentMode === 'NET_BANKING' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-mono text-xs animate-fadeIn">
          <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-50 dark:bg-[#0A0E1A] border border-slate-200 dark:border-[#1E283D] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#1E283D]">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-500" />
                <span>Dedicated Corporate Escrow Virtual Account</span>
              </h3>
              <Badge variant="gold" size="xs">RTGS / NEFT</Badge>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">BENEFICIARY NAME:</span>
                <span className="font-bold text-slate-900 dark:text-white">BHASHA BRIDGE ESCROW TRUST</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">VIRTUAL ACCOUNT NO:</span>
                <button
                  type="button"
                  onClick={() => handleCopy('KA29BHASHA8892', 'acc')}
                  className="font-black text-amber-700 dark:text-amber-400 flex items-center gap-1.5 hover:underline cursor-pointer"
                >
                  <span>KA29BHASHA8892</span>
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">IFSC CODE:</span>
                <span className="font-bold text-slate-900 dark:text-white">ICIC0000029 (Peenya, BLR)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">ACCOUNT TYPE:</span>
                <span className="font-bold text-slate-900 dark:text-white">Current / MSME Escrow</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 font-sans">
              Transfers above ₹2,00,000 via RTGS are credited into milestone escrow within 15 minutes with instant UTR reconciliation.
            </p>
          </div>

          <div className="lg:col-span-6 p-6 rounded-3xl bg-white dark:bg-[#111624] border border-slate-200 dark:border-[#1E283D] space-y-4">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Select Corporate Bank Portal</h3>
            <div className="grid grid-cols-2 gap-2.5">
              {['Karnataka Bank', 'Canara Bank', 'State Bank of India', 'ICICI Corporate', 'HDFC Enet', 'Axis Bank'].map((bank) => (
                <button
                  key={bank}
                  onClick={() => setSelectedBank(bank)}
                  className={`p-3 rounded-2xl border text-left text-xs transition-all cursor-pointer font-bold ${
                    selectedBank === bank
                      ? 'border-amber-400 bg-amber-50 dark:bg-amber-500/15 text-slate-900 dark:text-white'
                      : 'border-slate-200 dark:border-[#1E283D] text-slate-700 dark:text-slate-400'
                  }`}
                >
                  🏦 {bank}
                </button>
              ))}
            </div>

            <Button
              onClick={() => alert(`Redirecting to ${selectedBank} Corporate NetBanking Portal...`)}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs shadow-md border-0"
            >
              Continue to {selectedBank} Corporate Portal →
            </Button>
          </div>
        </div>
      )}

      {/* ── Mode 3: e-NACH AutoPay Mandate ── */}
      {paymentMode === 'AUTOPAY_MANDATE' && (
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#0A0E1A] border border-slate-200 dark:border-[#1E283D] space-y-4 font-mono text-xs animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#1E283D]">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-emerald-500" />
              <span>NPCI e-NACH Milestone AutoPay Mandate</span>
            </h3>
            <Badge variant="green" size="xs">Zero Transaction Fees</Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-white dark:bg-[#111624] border border-slate-200 dark:border-[#1E283D] space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">Phase 1: 20% Advance</span>
              <p className="text-slate-500 text-[11px] font-sans">Triggered upon factory raw material inspection.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-[#111624] border border-slate-200 dark:border-[#1E283D] space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">Phase 2: 50% In-Transit</span>
              <p className="text-slate-500 text-[11px] font-sans">Triggered upon Karnataka expressway toll gate pass.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-[#111624] border border-slate-200 dark:border-[#1E283D] space-y-1">
              <span className="font-bold text-slate-900 dark:text-white block">Phase 3: 30% Delivery</span>
              <p className="text-slate-500 text-[11px] font-sans">Triggered upon warehouse destination QR sign-off.</p>
            </div>
          </div>

          <Button
            onClick={() => alert('e-NACH AutoPay Mandate successfully registered for this contract.')}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-700 text-white font-bold text-xs"
          >
            Authorize NPCI e-Mandate with Aadhaar / NetBanking
          </Button>
        </div>
      )}

      {/* ── Mode 4: TReDS MSME Trade Credit ── */}
      {paymentMode === 'TREDS_CREDIT' && (
        <div className="p-6 rounded-3xl bg-slate-50 dark:bg-[#0A0E1A] border border-slate-200 dark:border-[#1E283D] space-y-4 font-mono text-xs animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#1E283D]">
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>TReDS Trade Receivables &amp; Karnataka Credit Guarantee</span>
            </h3>
            <Badge variant="gold" size="xs">45-Day Credit Window</Badge>
          </div>

          <p className="text-xs text-slate-700 dark:text-slate-300 font-sans leading-relaxed">
            Avail subsidized 45-day working capital trade credit backed by the Government of Karnataka MSME Credit Scheme. Suppliers receive immediate 100% advance payout while buyers pay on net-45 terms.
          </p>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-500/10 border border-amber-300 dark:border-amber-500/30 font-bold text-amber-900 dark:text-amber-300">
            <span>PRE-APPROVED MSME CREDIT LINE: ₹25,00,000</span>
            <span>0.0% APR (Subsidized)</span>
          </div>

          <Button
            onClick={() => alert('TReDS Bill Discounting applied. Supplier will be paid instantly.')}
            className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs"
          >
            Draw ₹{amount.toLocaleString('en-IN')} on TReDS MSME Credit Line
          </Button>
        </div>
      )}

      {/* ── Official Karnataka GST E-Tax Invoice Modal ── */}
      <AnimatePresence>
        {showReceiptModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReceiptModal(false)}
              className="absolute inset-0 bg-black/75 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg rounded-3xl bg-white dark:bg-[#111624] border border-slate-200 dark:border-[#1E283D] p-6 shadow-2xl space-y-4 z-10 text-slate-900 dark:text-white font-mono text-xs"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-[#1E283D]">
                <div>
                  <h3 className="font-extrabold text-sm">Government of Karnataka (State Code 29)</h3>
                  <p className="text-[10px] text-slate-500">Official GST E-Tax Invoice &amp; Escrow Seal</p>
                </div>
                <Badge variant="green" size="xs">VERIFIED</Badge>
              </div>

              <div className="space-y-2 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-500">INVOICE NO:</span>
                  <span className="font-bold">INV-KA-2024-889</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">SUPPLIER GSTIN:</span>
                  <span className="font-bold text-amber-700 dark:text-amber-400">29ABCDE1234F1Z5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">TRANSACTION REF:</span>
                  <span className="font-bold">{transactionRef}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">SETTLED AMOUNT:</span>
                  <span className="font-black text-sm text-slate-900 dark:text-white">
                    ₹{amount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-[10px] space-y-1 text-slate-500">
                <p>Digital IRN: 88a91c2f901192e48b81204092b11a9e882</p>
                <p>Cryptographically stamped by Bhasha Bridge Karnataka Node.</p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => window.print()}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-black font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Tax Invoice</span>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowReceiptModal(false)}
                  className="px-4 rounded-xl border-slate-300 dark:border-[#1E283D]"
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

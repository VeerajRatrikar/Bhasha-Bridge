'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CreditCard, QrCode, ShieldCheck, Lock, CheckCircle2, 
  ArrowRight, Download, Share2, Building2, Sparkles, AlertCircle, X
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface PaymentCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  supplierName: string;
  itemDescription: string;
  baseAmount: number;
}

export function PaymentCheckoutModal({ 
  isOpen, 
  onClose, 
  supplierName, 
  itemDescription, 
  baseAmount 
}: PaymentCheckoutModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'ESCROW'>('UPI');
  const [isEscrowLocked, setIsEscrowLocked] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionId, setTransactionId] = useState('');

  if (!isOpen) return null;

  const gstAmount = Math.round(baseAmount * 0.18);
  const totalAmount = baseAmount + gstAmount;

  const handlePayNow = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      const txRef = `TXN_${Math.floor(100000 + Math.random() * 900000)}`;
      setTransactionId(txRef);
      
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }, 1500);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-[#111827] text-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 px-6 py-4 bg-white/5">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-emerald-500 text-white shadow-md">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-base">Bhasha-Bridge Escrow Payment</h3>
                <p className="text-xs text-slate-400">100% Buyer Protection & MSME Escrow Guarantee</p>
              </div>
            </div>
            <button 
              onClick={onClose} 
              className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="p-6 space-y-5">
            {isSuccess ? (
              <div className="text-center py-6 space-y-4">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-bounce">
                  <CheckCircle2 className="h-10 w-10" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white">Payment Successful!</h4>
                  <p className="text-xs text-slate-400 mt-1">Transaction Ref: <span className="font-mono text-emerald-400 font-bold">{transactionId}</span></p>
                </div>

                <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-left text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Recipient:</span>
                    <span className="font-bold text-white">{supplierName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Item Details:</span>
                    <span className="text-white">{itemDescription}</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-2 font-bold text-sm">
                    <span>Total Amount Paid:</span>
                    <span className="text-emerald-400">₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button 
                    onClick={handlePrintReceipt} 
                    className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold hover:bg-white/10 transition-colors"
                  >
                    <Download className="h-4 w-4" /> Download PDF Receipt
                  </button>
                  <button 
                    onClick={onClose}
                    className="flex-1 rounded-xl bg-primary px-4 py-2.5 text-xs font-bold hover:bg-primary/90 transition-colors"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Order Summary Box */}
                <div className="rounded-xl border border-white/10 bg-black/30 p-4 space-y-2.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400 flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5 text-primary" /> Vendor:</span>
                    <span className="font-bold text-white text-sm">{supplierName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Description:</span>
                    <span className="text-slate-200">{itemDescription}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Base Price:</span>
                    <span className="font-mono text-slate-200">₹{baseAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">GST (18% CGST/SGST):</span>
                    <span className="font-mono text-slate-200">₹{gstAmount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-white/10 pt-2 text-sm font-bold">
                    <span className="text-white">Total Payable Amount:</span>
                    <span className="font-mono text-emerald-400 text-base">₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Escrow Lock Toggle */}
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Lock className="h-4 w-4 text-emerald-400 shrink-0" />
                    <div>
                      <div className="font-bold text-emerald-400">Enable Escrow Security Lock</div>
                      <div className="text-[10px] text-slate-300">Funds released only after material verification</div>
                    </div>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={isEscrowLocked} 
                    onChange={e => setIsEscrowLocked(e.target.checked)} 
                    className="h-4 w-4 rounded accent-emerald-500 cursor-pointer"
                  />
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300">Select Payment Method</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button 
                      onClick={() => setPaymentMethod('UPI')}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-medium transition-all ${
                        paymentMethod === 'UPI' 
                          ? 'border-primary bg-primary/20 text-white shadow-md' 
                          : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      <QrCode className="h-5 w-5 mb-1 text-primary" />
                      <span>Instant UPI / QR</span>
                    </button>

                    <button 
                      onClick={() => setPaymentMethod('CARD')}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-medium transition-all ${
                        paymentMethod === 'CARD' 
                          ? 'border-primary bg-primary/20 text-white shadow-md' 
                          : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      <CreditCard className="h-5 w-5 mb-1 text-teal-400" />
                      <span>Razorpay Card</span>
                    </button>

                    <button 
                      onClick={() => setPaymentMethod('ESCROW')}
                      className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-medium transition-all ${
                        paymentMethod === 'ESCROW' 
                          ? 'border-emerald-500 bg-emerald-500/20 text-white shadow-md' 
                          : 'border-white/10 bg-white/5 text-slate-400 hover:bg-white/10'
                      }`}
                    >
                      <ShieldCheck className="h-5 w-5 mb-1 text-emerald-400" />
                      <span>Bank Escrow</span>
                    </button>
                  </div>
                </div>

                {/* UPI QR Display */}
                {paymentMethod === 'UPI' && (
                  <div className="rounded-xl border border-white/10 bg-black/40 p-4 text-center space-y-2 animate-fade-in">
                    <div className="text-xs text-slate-300">Scan QR code using GPay, PhonePe, or Paytm</div>
                    <div className="mx-auto w-32 h-32 bg-white p-2 rounded-lg flex items-center justify-center shadow-lg">
                      {/* Simulated QR Code matrix */}
                      <div className="w-full h-full border-2 border-black grid grid-cols-5 gap-1 p-1 bg-black">
                        {Array.from({ length: 25 }).map((_, i) => (
                          <div key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-black'} />
                        ))}
                      </div>
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">UPI ID: <span className="text-white font-bold">bhashabridge@icici</span></div>
                  </div>
                )}

                {/* Action Button */}
                <button 
                  onClick={handlePayNow}
                  disabled={isProcessing}
                  className="w-full h-11 rounded-xl bg-gradient-to-r from-primary via-teal-500 to-emerald-500 font-bold text-white text-sm shadow-lg hover:opacity-90 transition-all flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <span>Processing Escrow Transfer...</span>
                  ) : (
                    <>
                      <span>Pay ₹{totalAmount.toLocaleString()} & Lock Escrow</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

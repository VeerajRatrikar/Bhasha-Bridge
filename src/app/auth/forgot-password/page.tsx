'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '../../../components/brand/Logo';
import { GlassCard } from '../../../components/ui/GlassCard';
import { Phone, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      <GlassCard className="w-full max-w-md p-8 relative z-10 shadow-2xl text-center" glow>
        <Logo size="md" />
        <h2 className="text-xl font-bold text-slate-100 mt-4">Reset Account Password</h2>
        <p className="text-xs text-slate-400 mt-1">Enter your registered mobile phone number</p>

        {submitted ? (
          <div className="mt-6 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <span className="font-bold block">Password Reset Link Sent</span>
            <p className="text-[11px] text-slate-400 mt-1">We sent an SMS with reset instructions to your phone number.</p>
            <Link
              href="/auth/login"
              className="mt-4 inline-block px-4 py-2 rounded-xl bg-slate-800 text-slate-200 font-bold hover:bg-slate-700 transition-colors"
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
            <div className="relative text-left">
              <label className="block text-slate-300 font-semibold mb-1">Mobile Phone Number</label>
              <div className="relative">
                <input
                  type="text"
                  defaultValue="+91 98450 12345"
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-100 focus:outline-none focus:border-cyan-500"
                  required
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/30 hover:opacity-90 transition-all"
            >
              Send Reset Code <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="mt-6 pt-4 border-t border-slate-800 text-xs text-slate-400">
          Remember password? <Link href="/auth/login" className="text-cyan-400 font-bold hover:underline">Log In</Link>
        </div>
      </GlassCard>
    </div>
  );
}

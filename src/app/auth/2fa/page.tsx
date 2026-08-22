'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '../../../components/brand/Logo';
import { GlassCard } from '../../../components/ui/GlassCard';
import { ShieldCheck, ArrowRight, Sparkles } from 'lucide-react';

export default function TwoFactorPage() {
  const router = useRouter();
  const [code, setCode] = useState(['4', '9', '1', '7', '8', '3']);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/app/overview');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(45,226,230,0.14),transparent_26%),radial-gradient(circle_at_bottom,rgba(16,185,129,0.10),transparent_28%)]" />

      <GlassCard className="relative z-10 w-full max-w-md overflow-hidden p-8 shadow-2xl" glow>
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400" />
        <div className="flex flex-col items-center text-center">
          <Logo size="md" />
          <span className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-200">
            <ShieldCheck className="h-3.5 w-3.5" /> Secure verification
          </span>
          <h2 className="text-2xl font-black text-slate-100 mt-4">Verify your sign-in</h2>
          <p className="text-xs text-slate-400 mt-1">Enter the code from your authenticator app to continue.</p>
        </div>

        <form onSubmit={handleVerify} className="mt-6 space-y-5 text-xs">
          <div className="flex justify-center gap-2">
            {code.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => {
                  const newCode = [...code];
                  newCode[idx] = e.target.value;
                  setCode(newCode);
                }}
                className="w-11 h-12 rounded-xl bg-slate-950 border border-slate-800 text-center text-lg font-black text-cyan-300 focus:outline-none focus:border-cyan-400"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white font-bold text-xs shadow-lg shadow-indigo-500/30 hover:opacity-90 transition-all"
          >
            Authenticate and proceed <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-center text-xs text-slate-400">
          <Sparkles className="mx-auto mb-2 h-4 w-4 text-cyan-400" />
          Need a different method?{' '}
          <Link href="/auth/login" className="text-cyan-400 font-bold hover:underline">
            return to login
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}


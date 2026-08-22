'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mic, Sparkles } from 'lucide-react';

export function RotatingMicHero() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const LANGUAGES = [
    { text: 'ಕನ್ನಡ', label: 'Kannada', x: 135, y: 0, isPrimary: true },
    { text: 'हिन्दी', label: 'Hindi', x: 42, y: 128, isPrimary: false },
    { text: 'English', label: 'English', x: -109, y: 79, isPrimary: false },
    { text: 'தமிழ்', label: 'Tamil', x: -109, y: -79, isPrimary: false },
    { text: 'తెలుగు', label: 'Telugu', x: 42, y: -128, isPrimary: false },
  ];

  return (
    <div
      onClick={() => router.push('/app/voice-assistant')}
      className="relative flex items-center justify-center py-10 my-6 cursor-pointer group select-none"
    >
      {/* ── Outer 3D Perspective Glow Container (Karnataka Flag Red & Gold) ──────────────── */}
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
        {/* Ambient Radial Background Glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-red-600/30 via-yellow-500/20 to-red-600/30 blur-3xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

        {/* ── 3D Rotating Outer Orbital Ring 1 (Clockwise - Karnataka Flag Red) ─────── */}
        <div
          className="absolute inset-0 rounded-full border border-dashed border-red-500/50 animate-[spin_24s_linear_infinite]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Karnataka Red Orbital Dot */}
          <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-red-600 shadow-[0_0_14px_#DC2626]" />
          {/* Karnataka Gold Orbital Dot */}
          <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_12px_#FACC15]" />
        </div>

        {/* ── 3D Rotating Middle Orbital Ring 2 (Counter-Clockwise - Karnataka Gold) ─ */}
        <div
          className="absolute inset-6 rounded-full border border-yellow-500/30 border-t-yellow-400 border-r-red-500 animate-[spin_16s_linear_infinite_reverse]"
        />

        {/* ── 3D Rotating Inner Orbital Ring 3 (Fast Spin) ─────── */}
        <div
          className="absolute inset-12 rounded-full border border-dashed border-yellow-500/40 animate-[spin_10s_linear_infinite]"
        />

        {/* ── Vernacular Floating Orbit Badges ────────────────── */}
        <div className="absolute inset-0 animate-[spin_32s_linear_infinite]">
          {LANGUAGES.map((lang, idx) => (
            <div
              key={idx}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ transform: `translate(${lang.x}px, ${lang.y}px)` }}
            >
              {/* Counter-rotate the badge text so it stays upright while orbiting */}
              <div className={`animate-[spin_32s_linear_infinite_reverse] px-3 py-1 rounded-full border text-[11px] font-mono shadow-lg backdrop-blur-md flex items-center gap-1.5 transition-all ${
                lang.isPrimary
                  ? 'bg-gradient-to-r from-red-600 to-yellow-500 text-white border-yellow-400 font-extrabold shadow-red-600/40 scale-110'
                  : 'bg-[#140F0C]/90 border-[#2B211C] text-yellow-300 font-semibold group-hover:border-yellow-500/40'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${lang.isPrimary ? 'bg-white' : 'bg-yellow-400'} animate-pulse`} />
                <span>{lang.text}</span>
              </div>
            </div>
          ))}
        </div>

        {/* ── Center Pulsing 3D Microphone Sphere in Karnataka Flag Colors ──────────────── */}
        <div className="relative z-10 flex flex-col items-center justify-center">
          {/* Animated Wave Rings behind Mic */}
          <div className="absolute w-28 h-28 rounded-full border-2 border-red-500/40 animate-ping opacity-35 pointer-events-none" />
          <div className="absolute w-36 h-36 rounded-full border border-yellow-500/30 animate-pulse pointer-events-none" />

          {/* Central Rotating Gradient Sphere Button (Karnataka Flag Duo: Red & Yellow) */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-b from-red-600 via-rose-600 to-yellow-500 p-[3px] shadow-[0_0_40px_rgba(220,38,38,0.5)] group-hover:shadow-[0_0_60px_rgba(250,204,21,0.8)] group-hover:scale-110 transition-all duration-500">
            <div className="w-full h-full rounded-full bg-[#120F0D] flex flex-col items-center justify-center relative overflow-hidden group-hover:bg-[#1A1410] transition-colors">
              {/* Rotating inner gradient sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-yellow-500/20 to-transparent animate-[spin_6s_linear_infinite] pointer-events-none" />

              {/* 3D Mic Icon in Karnataka Gold */}
              <Mic className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-400 group-hover:text-white transition-colors duration-300 transform group-hover:-translate-y-0.5" />

              {/* Micro Equalizer Bars in Karnataka Red & Yellow */}
              <div className="flex items-center gap-1 mt-1.5">
                <span className="w-1 h-2.5 bg-red-500 rounded-full animate-bounce" />
                <span className="w-1 h-4 bg-yellow-400 rounded-full animate-bounce delay-75" />
                <span className="w-1 h-3 bg-red-600 rounded-full animate-bounce delay-150" />
                <span className="w-1 h-4.5 bg-yellow-500 rounded-full animate-bounce delay-100" />
              </div>
            </div>
          </div>

          {/* Prompt Label below Mic */}
          <div className="mt-4 px-3.5 py-1 rounded-full bg-gradient-to-r from-red-600/20 to-yellow-500/20 border border-yellow-500/40 text-[11px] font-mono text-yellow-300 flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
            <span>ಕನ್ನಡದಲ್ಲಿ ಮಾತನಾಡಿ (Speak in Kannada)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

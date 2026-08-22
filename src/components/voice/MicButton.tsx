'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Loader2, Volume2 } from 'lucide-react';

interface MicButtonProps {
  isListening: boolean;
  isThinking?: boolean;
  isSpeaking?: boolean;
  onToggle: () => void;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function MicButton({
  isListening,
  isThinking = false,
  isSpeaking = false,
  onToggle,
  size = 'lg'
}: MicButtonProps) {
  const containerSizes = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-24 h-24',
    xl: 'w-36 h-36'
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-10 h-10',
    xl: 'w-14 h-14'
  };

  return (
    <div className="relative flex items-center justify-center select-none">
      {/* Outer Voice Wave Aura Pulse Rings when Listening or Speaking */}
      {(isListening || isSpeaking) && (
        <>
          <motion.div
            initial={{ scale: 1, opacity: 0.8 }}
            animate={{ scale: [1, 1.35, 1], opacity: [0.8, 0.2, 0.8] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className={`absolute rounded-full pointer-events-none bg-[#ef5623]/35 ${containerSizes[size]}`}
          />
          <motion.div
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: [1, 1.7, 1], opacity: [0.6, 0.1, 0.6] }}
            transition={{ repeat: Infinity, duration: 2.3, ease: 'easeInOut', delay: 0.3 }}
            className={`absolute rounded-full pointer-events-none bg-[#f9692c]/20 ${containerSizes[size]}`}
          />
        </>
      )}

      {/* Main Microphone Interactive Orb Button */}
      <motion.button
        onClick={onToggle}
        disabled={isThinking}
        whileHover={{ scale: isThinking ? 1 : 1.08 }}
        whileTap={{ scale: isThinking ? 1 : 0.95 }}
        aria-label="Toggle Vernacular Voice Assistant"
        className={`relative z-10 flex items-center justify-center rounded-full transition-all duration-200 shadow-2xl ${
          containerSizes[size]
        } ${
          isThinking
            ? 'bg-[#1c1815] text-[#f9692c] border border-[#ef5623]/40 cursor-wait'
            : isSpeaking
            ? 'bg-gradient-to-tr from-emerald-600 to-[#ef5623] text-white shadow-emerald-500/40 border-2 border-emerald-300'
            : isListening
            ? 'bg-gradient-to-tr from-[#ef5623] to-[#f9692c] text-white shadow-[#ef5623]/60 border-2 border-white'
            : 'bg-gradient-to-tr from-[#ef5623] to-[#f9692c] text-white font-black shadow-[#ef5623]/40 border border-white/20 hover:shadow-[#ef5623]/60'
        }`}
      >
        {isThinking ? (
          <Loader2 className={`${iconSizes[size]} animate-spin text-[#f9692c]`} />
        ) : isSpeaking ? (
          <Volume2 className={`${iconSizes[size]} animate-pulse text-white`} />
        ) : (
          <Mic className={`${iconSizes[size]} ${isListening ? 'animate-bounce' : ''}`} />
        )}
      </motion.button>
    </div>
  );
}


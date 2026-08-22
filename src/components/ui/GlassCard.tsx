'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export function GlassCard({
  children,
  className = '',
  glow = false,
  hoverEffect = true,
  onClick
}: GlassCardProps) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverEffect) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setRotateX(-y / 35);
    setRotateY(x / 35);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotateX,
        rotateY: rotateY,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      style={{ transformStyle: 'preserve-3d', perspective: 1000 }}
      className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
        glow
          ? 'border-orange-500/40 dark:border-orange-500/40 bg-white dark:bg-[#18181b] shadow-lg shadow-orange-500/10'
          : 'border-slate-200 dark:border-zinc-800/80 bg-white dark:bg-[#18181b] shadow-sm dark:shadow-md'
      } ${
        hoverEffect
          ? 'hover:border-orange-500/60 dark:hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/10'
          : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
    >
      {/* Top subtle accent ray */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-orange-500/60 to-transparent pointer-events-none" />

      {glow && (
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-orange-500/10 rounded-full blur-2xl pointer-events-none" />
      )}

      {children}
    </motion.div>
  );
}


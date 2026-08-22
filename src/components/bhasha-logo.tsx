import React from 'react';

interface BhashaLogoProps {
  size?: number;
  className?: string;
  showText?: boolean;
  textClassName?: string;
}

export function BhashaLogo({ size = 36, className = '', showText = true, textClassName = '' }: BhashaLogoProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <BhashaIcon size={size} />
      {showText && (
        <span className={`font-bold tracking-tight select-none ${textClassName}`} style={{ fontSize: size * 0.56 }}>
          Bhasha<span className="text-primary">Bridge</span>
        </span>
      )}
    </div>
  );
}

export function BhashaIcon({ size = 36, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="BhashaBridge logo"
    >
      {/* Background square with warm radius */}
      <rect width="40" height="40" rx="10" fill="hsl(20 89% 48%)" />

      {/* Bridge arch — white, strong */}
      <path
        d="M6 26 Q20 7 34 26"
        stroke="white"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Bridge deck */}
      <line x1="4" y1="26" x2="36" y2="26" stroke="white" strokeWidth="2.5" strokeLinecap="round" />

      {/* Suspension cables / pillars */}
      <line x1="13.5" y1="15.5" x2="13.5" y2="26" stroke="white" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="26.5" y1="15.5" x2="26.5" y2="26" stroke="white" strokeWidth="1.8" strokeLinecap="round" />

      {/* Hanger wires — subtle depth */}
      <line x1="9" y1="21" x2="9" y2="26" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeLinecap="round" />
      <line x1="20" y1="12.5" x2="20" y2="26" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeLinecap="round" />
      <line x1="31" y1="21" x2="31" y2="26" stroke="rgba(255,255,255,0.5)" strokeWidth="1" strokeLinecap="round" />

      {/* Voice / speech wave below the bridge */}
      <path
        d="M11 32 Q15.5 29 20 32 Q24.5 35 29 32"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
        fill="none"
        opacity="0.9"
      />
    </svg>
  );
}

export default BhashaLogo;

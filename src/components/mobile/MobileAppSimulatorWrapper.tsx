'use client';

import React from 'react';

interface MobileAppSimulatorWrapperProps {
  children: React.ReactNode;
}

export function MobileAppSimulatorWrapper({ children }: MobileAppSimulatorWrapperProps) {
  return (
    <div className="min-h-screen w-full bg-[#07090E] text-slate-100 antialiased overflow-x-hidden">
      {children}
    </div>
  );
}

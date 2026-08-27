'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Smartphone, Monitor, Mic, Search, QrCode, LayoutDashboard,
  ShieldCheck, Battery, Wifi, Signal, Sparkles, ZoomIn, ZoomOut
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface MobileAppSimulatorWrapperProps {
  children: React.ReactNode;
}

const DEVICES = [
  { id: 'iphone16', name: 'iPhone 16 Pro', width: 400, height: 820, borderRadius: '44px', notch: 'dynamic_island' },
  { id: 's24ultra', name: 'Galaxy S24 Ultra', width: 420, height: 840, borderRadius: '28px', notch: 'hole_punch' },
  { id: 'pixel8', name: 'Pixel 8 Pro', width: 410, height: 830, borderRadius: '36px', notch: 'hole_punch' },
];

export function MobileAppSimulatorWrapper({ children }: MobileAppSimulatorWrapperProps) {
  const [isSimulatorActive, setIsSimulatorActive] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState(DEVICES[0]);
  const [zoomScale, setZoomScale] = useState(1);
  const pathname = usePathname();

  const MOBILE_TABS = [
    { href: '/app/overview', icon: LayoutDashboard, label: 'Home' },
    { href: '/app/voice-assistant', icon: Mic, label: 'Voice AI' },
    { href: '/app/payments', icon: QrCode, label: 'UPI Pay' },
    { href: '/app/supplier-discovery', icon: Search, label: 'Suppliers' },
    { href: '/app/trusted-vendors', icon: ShieldCheck, label: 'Vendors' },
  ];

  return (
    <div className="min-h-screen w-full bg-[#050810] text-slate-100 antialiased font-sans flex flex-col items-center">
      {/* ── Top Floating Control Studio Ribbon ────────────────────────── */}
      <header className="w-full bg-slate-950/90 border-b border-amber-500/30 py-3 px-4 md:px-8 backdrop-blur-2xl sticky top-0 z-50 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <Smartphone className="w-4 h-4 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-amber-300 text-sm tracking-tight">Bhasha Bridge • Mobile App Simulator</span>
              <Badge variant="gold" size="xs">Live Interactive Frame</Badge>
            </div>
            <p className="text-[11px] text-slate-400 font-mono hidden sm:block">
              Testing Native MSME Voice Procurement App in Kannada & English
            </p>
          </div>
        </div>

        {/* Interactive Device & Zoom Controls */}
        <div className="flex items-center gap-2 font-mono text-xs">
          {/* Device Selector Dropdown */}
          {isSimulatorActive && (
            <div className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-800 rounded-xl p-1">
              {DEVICES.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDevice(d)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    selectedDevice.id === d.id
                      ? 'bg-amber-500 text-black shadow-md font-extrabold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {d.name}
                </button>
              ))}
            </div>
          )}

          {/* Zoom Buttons */}
          {isSimulatorActive && (
            <div className="hidden sm:flex items-center gap-1 bg-slate-900/90 border border-slate-800 rounded-xl p-1">
              <button
                onClick={() => setZoomScale(prev => Math.max(0.8, prev - 0.1))}
                className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>

              <span className="px-1 text-[11px] font-bold text-amber-400">{Math.round(zoomScale * 100)}%</span>

              <button
                onClick={() => setZoomScale(prev => Math.min(1.2, prev + 0.1))}
                className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* View Mode Toggle Button */}
          <button
            onClick={() => setIsSimulatorActive(!isSimulatorActive)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-extrabold transition-all cursor-pointer flex items-center gap-2 ${
              isSimulatorActive
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-black border-amber-400 shadow-lg shadow-amber-500/20'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
            }`}
          >
            {isSimulatorActive ? (
              <>
                <Smartphone className="w-4 h-4" />
                <span>📱 Mobile Phone Frame</span>
              </>
            ) : (
              <>
                <Monitor className="w-4 h-4" />
                <span>💻 Desktop Full Width</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* ── Main Viewport Content ────────────────────────────── */}
      {isSimulatorActive ? (
        <div className="w-full flex-1 py-8 px-4 flex items-center justify-center overflow-auto">
          {/* Animated Zoom Wrapper */}
          <div
            style={{ transform: `scale(${zoomScale})`, transformOrigin: 'top center' }}
            className="transition-transform duration-200"
          >
            {/* Realistic Smartphone Shell Frame */}
            <div
              style={{
                width: `${selectedDevice.width}px`,
                height: `${selectedDevice.height}px`,
                borderRadius: selectedDevice.borderRadius,
              }}
              className="relative bg-slate-950 border-[12px] border-slate-800 shadow-[0_20px_100px_rgba(245,158,11,0.2)] flex flex-col overflow-hidden ring-1 ring-amber-500/30"
            >
              {/* iOS / Android Status Bar */}
              <div className="h-11 bg-slate-950 px-6 pt-2 flex items-center justify-between text-[11px] font-mono text-slate-400 select-none border-b border-slate-900 shrink-0 z-30">
                <span className="font-bold text-white">9:41 AM</span>

                {/* Dynamic Notch / Camera Hole */}
                {selectedDevice.notch === 'dynamic_island' ? (
                  <div className="w-24 h-4 bg-black rounded-full border border-slate-800 flex items-center justify-center gap-2 px-2 shadow-inner">
                    <div className="w-2 h-2 rounded-full bg-slate-900 border border-slate-700" />
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500/80 animate-pulse" />
                  </div>
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full bg-black border border-slate-800" />
                )}

                <div className="flex items-center gap-1.5">
                  <Signal className="w-3 h-3" />
                  <Wifi className="w-3 h-3 text-amber-400" />
                  <Battery className="w-3.5 h-3.5 text-emerald-400" />
                </div>
              </div>

              {/* Scrollable Mobile App Body */}
              <div className="flex-1 overflow-y-auto bg-[#07090E] relative scrollbar-none is-mobile-app-frame">
                {children}
              </div>

              {/* Native Mobile Floating Bottom Navigation Bar */}
              <nav className="h-16 bg-[#0A0D16]/95 backdrop-blur-xl border-t border-slate-900 flex items-center justify-around px-2 shrink-0 z-40">
                {MOBILE_TABS.map((tab) => {
                  const isActive = pathname === tab.href;
                  const Icon = tab.icon;
                  return (
                    <Link
                      key={tab.href}
                      href={tab.href}
                      className={`flex flex-col items-center justify-center gap-1 px-3 py-1 rounded-xl transition-all ${
                        isActive
                          ? 'text-amber-400 font-extrabold scale-110'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-amber-400' : 'text-slate-500'}`} />
                      <span className="text-[10px] font-mono leading-none">{tab.label}</span>
                    </Link>
                  );
                })}
              </nav>

              {/* iOS / Android Home Indicator Bar */}
              <div className="h-3 bg-[#0A0D16] flex items-center justify-center pb-1 shrink-0">
                <div className="w-32 h-1 bg-slate-700 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex-1">
          {children}
        </div>
      )}
    </div>
  );
}

export const MobileAppStudioSimulator = MobileAppSimulatorWrapper;

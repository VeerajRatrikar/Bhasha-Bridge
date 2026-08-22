'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin, Navigation, Compass, Layers, ShieldCheck,
  TrendingUp, Truck, ExternalLink, Zap, Sparkles, MessageSquare, QrCode,
  Globe, Eye, Maximize2, Radio
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

interface ClusterNode {
  id: string;
  name: string;
  kannadaName: string;
  region: string;
  lat: number;
  lng: number;
  zoom: number;
  suppliersCount: number;
  capacity: string;
  leadTime: string;
  primarySector: string;
  status: 'ACTIVE' | 'HIGH_DEMAND' | 'PORT_CONNECTED';
  image: string;
  query: string;
}

const CLUSTERS: ClusterNode[] = [
  {
    id: 'peenya',
    name: 'Bengaluru (Peenya & Bommasandra)',
    kannadaName: 'ಪೀಣ್ಯ ಕೈಗಾರಿಕಾ ಪ್ರದೇಶ',
    region: 'South Karnataka',
    lat: 13.0315,
    lng: 77.5255,
    zoom: 14,
    suppliersCount: 48,
    capacity: '120k Units/Mo',
    leadTime: '12-24 hrs',
    primarySector: 'Precision CNC, Toolings & Electronics',
    status: 'HIGH_DEMAND',
    image: '/images/peenya_cnc.jpg',
    query: 'Peenya+Industrial+Area+Bengaluru+Karnataka'
  },
  {
    id: 'mysuru',
    name: 'Mysuru (Silk & Nanjangud)',
    kannadaName: 'ಮೈಸೂರು ರೇಷ್ಮೆ ಕ್ಲಸ್ಟರ್',
    region: 'South Karnataka',
    lat: 12.2958,
    lng: 76.6394,
    zoom: 14,
    suppliersCount: 32,
    capacity: '50k M/Mo',
    leadTime: '24-48 hrs',
    primarySector: 'Pure Mulberry Silk & Organic Yarns',
    status: 'ACTIVE',
    image: '/images/mysore_silk.jpg',
    query: 'Nanjangud+Industrial+Area+Mysuru+Karnataka'
  },
  {
    id: 'davangere',
    name: 'Davangere (Textile Corridor)',
    kannadaName: 'ದಾವಣಗೆರೆ ಹತ್ತಿ ಮಿಲ್',
    region: 'Central Karnataka',
    lat: 14.4644,
    lng: 75.9218,
    zoom: 14,
    suppliersCount: 24,
    capacity: '80k Bales/Mo',
    leadTime: '2-3 days',
    primarySector: 'Cotton Spinning & Organic Bales',
    status: 'ACTIVE',
    image: '/images/raw_cotton.jpg',
    query: 'Davangere+Textile+Mills+Karnataka'
  },
  {
    id: 'belagavi',
    name: 'Belagavi (Foundry & Hydraulics)',
    kannadaName: 'ಬೆಳಗಾವಿ ಫೌಂಡ್ರಿ ಹಬ್',
    region: 'North Karnataka',
    lat: 15.8497,
    lng: 74.4977,
    zoom: 14,
    suppliersCount: 22,
    capacity: '25k Valves/Mo',
    leadTime: '3-4 days',
    primarySector: 'Ductile Castings & Precision Pumps',
    status: 'ACTIVE',
    image: '/images/belagavi_foundry.jpg',
    query: 'Udyambag+Industrial+Estate+Belagavi+Karnataka'
  },
  {
    id: 'mangaluru',
    name: 'Mangaluru (NMPT Port & Coastal)',
    kannadaName: 'ಮಂಗಳೂರು ಬಂದರು ರಫ್ತು ವಲಯ',
    region: 'Coastal Karnataka',
    lat: 12.9234,
    lng: 74.8197,
    zoom: 14,
    suppliersCount: 18,
    capacity: '300 TEU/Mo',
    leadTime: '24 hrs to Port',
    primarySector: 'Marine Logistics, Cashew & Export Hub',
    status: 'PORT_CONNECTED',
    image: '/images/tech_blend.jpg',
    query: 'New+Mangalore+Port+Trust+Panambur+Karnataka'
  },
  {
    id: 'chikkamagaluru',
    name: 'Chikkamagaluru & Hassan (Agro)',
    kannadaName: 'ಚಿಕ್ಕಮಗಳೂರು ಕಾಫಿ ಮತ್ತು ಮಸಾಲೆ',
    region: 'Malenadu Karnataka',
    lat: 13.3161,
    lng: 75.7720,
    zoom: 14,
    suppliersCount: 16,
    capacity: '15k Quintals/Mo',
    leadTime: '2 days',
    primarySector: 'Arabica Coffee, Cardamom & Spices',
    status: 'ACTIVE',
    image: '/images/karnataka_spices.jpg',
    query: 'Chikkamagaluru+Coffee+Board+Karnataka'
  },
  {
    id: 'channapatna',
    name: 'Channapatna (Crafts & Lacquer)',
    kannadaName: 'ಚನ್ನಪಟ್ಟಣ ಗೊಂಬೆ ಮತ್ತು ಕರಕುಶಲ',
    region: 'Ramanagara Zone',
    lat: 12.6518,
    lng: 77.2089,
    zoom: 14,
    suppliersCount: 14,
    capacity: '40k Artifacts/Mo',
    leadTime: '24 hrs',
    primarySector: 'GI-Tagged Wooden Toys & Natural Lacquer',
    status: 'ACTIVE',
    image: '/images/channapatna_crafts.jpg',
    query: 'Channapatna+Crafts+Park+Karnataka'
  },
  {
    id: 'hubballi',
    name: 'Hubballi-Dharwad (Heavy Engineering)',
    kannadaName: 'ಹುಬ್ಬಳ್ಳಿ-ಧಾರವಾಡ ಎಂಜಿನಿಯರಿಂಗ್',
    region: 'North Karnataka',
    lat: 15.3647,
    lng: 75.1240,
    zoom: 14,
    suppliersCount: 20,
    capacity: '35k Assemblies/Mo',
    leadTime: '2-3 days',
    primarySector: 'Automotive Components & Valves',
    status: 'HIGH_DEMAND',
    image: '/images/dyed_linens.jpg',
    query: 'Gokul+Road+Industrial+Estate+Hubballi+Karnataka'
  }
];

export function KarnatakaGisMap() {
  const router = useRouter();
  const [selectedCluster, setSelectedCluster] = useState<ClusterNode>(CLUSTERS[0]);
  const [mapType, setMapType] = useState<'m' | 'k'>('m'); // 'm' = Roadmap, 'k' = Satellite
  const [stateOverview, setStateOverview] = useState(false);

  const googleMapUrl = stateOverview
    ? `https://maps.google.com/maps?q=Karnataka,India&t=${mapType}&z=7&ie=UTF8&iwloc=&output=embed`
    : `https://maps.google.com/maps?q=${selectedCluster.query}&t=${mapType}&z=${selectedCluster.zoom}&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="rounded-3xl bg-white dark:bg-gradient-to-b dark:from-[#111624] dark:to-[#0A0D16] border border-slate-200 dark:border-[#1E283D] p-5 md:p-6 shadow-xl space-y-5 transition-colors">
      {/* ── Top Bar with Map Controls ────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-[#1E283D]">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-amber-600 dark:text-amber-400 animate-spin-slow" />
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
              Real-Time Karnataka MSME GIS Sourcing Map
            </h2>
            <Badge variant="green" size="xs">Google Maps Live</Badge>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Interactive satellite &amp; expressway GIS mapping across Karnataka&apos;s 8 major industrial production clusters.
          </p>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-2">
          {/* Map Layer Switcher */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] text-[11px] font-mono font-bold">
            <button
              onClick={() => setMapType('m')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                mapType === 'm'
                  ? 'bg-amber-500 text-black shadow-sm font-black'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              🛣️ Road &amp; Transit
            </button>
            <button
              onClick={() => setMapType('k')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                mapType === 'k'
                  ? 'bg-amber-500 text-black shadow-sm font-black'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              🛰️ Satellite Hybrid
            </button>
          </div>

          <button
            onClick={() => setStateOverview(!stateOverview)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-bold transition-all cursor-pointer ${
              stateOverview
                ? 'bg-gradient-to-r from-rose-600 to-amber-500 text-white border-transparent'
                : 'bg-white dark:bg-[#0E1422] border-slate-200 dark:border-[#1E283D] text-slate-700 dark:text-slate-300 hover:border-amber-400'
            }`}
          >
            {stateOverview ? '📍 Focus Cluster' : '🗺️ State 31-Districts View'}
          </button>
        </div>
      </div>

      {/* ── Cluster Selector Quick Strip ────────────────── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CLUSTERS.map((node) => {
          const isSelected = !stateOverview && selectedCluster.id === node.id;
          return (
            <button
              key={node.id}
              onClick={() => {
                setSelectedCluster(node);
                setStateOverview(false);
              }}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl border text-xs font-mono transition-all shrink-0 cursor-pointer shadow-sm ${
                isSelected
                  ? 'bg-amber-500 text-black border-amber-400 font-black ring-2 ring-amber-400/40 shadow-amber-500/20'
                  : 'bg-slate-50 dark:bg-[#0A0E1A] border-slate-200 dark:border-[#1E283D] text-slate-700 dark:text-slate-300 hover:border-amber-400'
              }`}
            >
              <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-black fill-black' : 'text-rose-500'}`} />
              <div className="text-left leading-tight">
                <div>{node.name.split(' ')[0]}</div>
                <div className="text-[10px] opacity-80">{node.kannadaName.split(' ')[0]}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Real Google Maps Frame & Telemetry Split ────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Embedded Google Maps Viewer (8 cols) */}
        <div className="lg:col-span-8 relative h-[380px] sm:h-[420px] rounded-3xl overflow-hidden border-2 border-slate-200 dark:border-[#1E283D] shadow-2xl bg-slate-900 group">
          <iframe
            title="Karnataka MSME Real Google Map"
            src={googleMapUrl}
            className="w-full h-full border-0 filter contrast-105"
            loading="lazy"
            allowFullScreen
          />

          {/* Floating Map Watermark Badge */}
          <div className="absolute top-4 left-4 z-10 px-3.5 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-slate-700 text-white text-xs font-mono font-bold flex items-center gap-2 shadow-lg">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>
              {stateOverview ? 'Karnataka State Sourcing Grid' : selectedCluster.name}
            </span>
          </div>
        </div>

        {/* Right: Selected Cluster Telemetry Card (4 cols) */}
        <div className="lg:col-span-4 rounded-3xl bg-slate-50 dark:bg-[#07090E] border border-slate-200 dark:border-[#1E283D] p-5 shadow-lg space-y-4">
          <div className="relative h-32 rounded-2xl overflow-hidden border border-slate-200 dark:border-[#1E283D] shadow-inner">
            <img
              src={selectedCluster.image}
              alt={selectedCluster.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-3">
              <span className="text-[10px] font-mono font-bold text-amber-300 uppercase">
                {selectedCluster.region}
              </span>
              <h3 className="font-extrabold text-sm text-white truncate">
                {selectedCluster.name}
              </h3>
            </div>
          </div>

          <div className="space-y-2.5 font-mono text-xs">
            <div className="flex justify-between pb-1 border-b border-slate-200 dark:border-[#1E283D]">
              <span className="text-slate-500">PRIMARY INDUSTRY:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 text-right truncate max-w-[170px]">
                {selectedCluster.primarySector}
              </span>
            </div>

            <div className="flex justify-between pb-1 border-b border-slate-200 dark:border-[#1E283D]">
              <span className="text-slate-500">ACTIVE SELLERS:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {selectedCluster.suppliersCount} Verified MSMEs
              </span>
            </div>

            <div className="flex justify-between pb-1 border-b border-slate-200 dark:border-[#1E283D]">
              <span className="text-slate-500">PRODUCTION CAPACITY:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">
                {selectedCluster.capacity}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-slate-500">EXPRESSWAY SLA:</span>
              <span className="font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                <Truck className="w-3.5 h-3.5" />
                {selectedCluster.leadTime}
              </span>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <Button
              onClick={() => router.push('/app/voice-assistant')}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-amber-500 hover:from-rose-700 text-white font-bold text-xs shadow-md border-0 flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Inquire via Kannada Voice</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => router.push('/app/supplier-discovery')}
              className="w-full py-2.5 rounded-xl border-slate-200 dark:border-[#1E283D] bg-white dark:bg-[#0E1422] text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5"
            >
              <span>Explore {selectedCluster.suppliersCount} Suppliers</span>
              <ExternalLink className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

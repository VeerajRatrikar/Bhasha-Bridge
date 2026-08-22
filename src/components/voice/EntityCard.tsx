'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExtractedEntities } from '../../types';
import { Package, MapPin, Hash, Tag, Zap, DollarSign } from 'lucide-react';

interface EntityCardProps {
  entities: ExtractedEntities;
}

export function EntityCard({ entities }: EntityCardProps) {
  const entityItems = [
    { key: 'product', label: 'Product Target', value: entities.product, icon: Package, color: 'indigo' },
    { key: 'category', label: 'Category', value: entities.category, icon: Tag, color: 'cyan' },
    { key: 'location', label: 'Location Hub', value: entities.location, icon: MapPin, color: 'emerald' },
    { key: 'quantity', label: 'Required Volume', value: entities.quantity ? `${entities.quantity} ${entities.unit || ''}` : null, icon: Hash, color: 'amber' },
    { key: 'urgency', label: 'Timeline SLA', value: entities.urgency, icon: Zap, color: 'rose' },
    { key: 'max_price', label: 'Max Budget', value: entities.max_price ? `₹${entities.max_price}` : null, icon: DollarSign, color: 'purple' },
  ].filter((item) => item.value);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06
      }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 8, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring' as const, stiffness: 400, damping: 25 } }
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 w-full"
    >
      {entityItems.map((item) => {
        const Icon = item.icon;
        const colorClasses: Record<string, string> = {
          indigo: 'bg-indigo-950/40 border-indigo-500/30 text-indigo-400',
          cyan: 'bg-cyan-950/40 border-cyan-500/30 text-cyan-400',
          emerald: 'bg-emerald-950/40 border-emerald-500/30 text-emerald-400',
          amber: 'bg-amber-950/40 border-amber-500/30 text-amber-400',
          rose: 'bg-rose-950/40 border-rose-500/30 text-rose-400',
          purple: 'bg-purple-950/40 border-purple-500/30 text-purple-400',
        };

        return (
          <motion.div
            key={item.key}
            variants={itemAnim}
            whileHover={{ scale: 1.02 }}
            className={`flex items-center gap-2.5 p-3 rounded-2xl border backdrop-blur-md shadow-sm transition-all ${colorClasses[item.color]}`}
          >
            <div className="p-2 rounded-xl bg-slate-950/60 border border-white/5">
              <Icon className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-slate-400 block">
                {item.label}
              </span>
              <span className="text-xs font-extrabold text-slate-100 truncate block">
                {item.value}
              </span>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}


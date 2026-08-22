'use client';

import React from 'react';
import { useApp } from '../../lib/store';
import { CheckCircle2, AlertCircle, Info, X, ShieldAlert } from 'lucide-react';

export function ToastCenter() {
  const { notifications, dismissNotification } = useApp();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4">
      {notifications.map((n) => (
        <div
          key={n.id}
          className="pointer-events-auto flex items-start gap-3 p-4 rounded-lg border border-gray-300 dark:border-slate-700/80 bg-white dark:bg-slate-900/95 shadow-lg dark:shadow-2xl text-gray-900 dark:text-slate-100 animate-in slide-in-from-bottom-5 fade-in duration-300 transition-colors"
        >
          {n.type === 'success' && <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />}
          {n.type === 'error' && <ShieldAlert className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />}
          {n.type === 'warning' && <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5" />}
          {n.type === 'info' && <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />}

          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-slate-100 tracking-wide transition-colors">{n.title}</h4>
            <p className="text-xs text-gray-600 dark:text-slate-400 mt-1 leading-relaxed transition-colors">{n.message}</p>
          </div>

          <button
            onClick={() => dismissNotification(n.id)}
            className="text-gray-500 dark:text-slate-500 hover:text-gray-700 dark:hover:text-slate-300 transition-colors p-1 rounded-md shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

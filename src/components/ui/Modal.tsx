'use client';

import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { clsx } from 'clsx';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  showClose?: boolean;
  className?: string;
}

const sizeMap: Record<NonNullable<ModalProps['size']>, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-[95vw]',
};

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  showClose = true,
  className,
}: ModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 dark:bg-slate-950/80 backdrop-blur-sm animate-fade-in transition-colors" />

      {/* Panel */}
      <div
        className={clsx(
          'relative w-full rounded-xl border border-gray-300 dark:border-slate-700/60 bg-white dark:bg-slate-900/95 shadow-2xl dark:shadow-slate-950/60',
          'animate-slide-up',
          sizeMap[size],
          className
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
      >
        {/* Top highlight line */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 dark:via-indigo-500/40 to-transparent rounded-t-xl" />

        {/* Header */}
        {(title || showClose) && (
          <div className="flex items-start justify-between gap-4 px-6 pt-5 pb-4 border-b border-gray-200 dark:border-slate-800/60 transition-colors">
            <div>
              {title && (
                <h2 id="modal-title" className="text-lg font-bold text-gray-900 dark:text-slate-100 transition-colors">
                  {title}
                </h2>
              )}
              {description && (
                <p className="mt-1 text-sm text-gray-600 dark:text-slate-400 transition-colors">{description}</p>
              )}
            </div>
            {showClose && (
              <button
                onClick={onClose}
                className="shrink-0 p-1.5 rounded-lg text-gray-500 dark:text-slate-400 hover:text-gray-700 dark:hover:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}

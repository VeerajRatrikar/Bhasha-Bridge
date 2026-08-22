import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:focus:ring-slate-300 gap-1.5',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-saffron-500/10 text-saffron-600 dark:bg-saffron-500/20 dark:text-saffron-400 border-saffron-500/20',
        secondary:
          'border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700',
        destructive:
          'border-transparent bg-red-500/10 text-red-600 border-red-500/20 dark:bg-red-900/30 dark:text-red-400',
        outline: 'text-slate-950 dark:text-slate-50 border-slate-200 dark:border-slate-800',
        success: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400',
        green: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400',
        gold: 'border-amber-500/30 bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 dark:text-amber-300',
        amber: 'border-amber-500/30 bg-amber-500/10 text-amber-500 dark:bg-amber-500/20 dark:text-amber-300',
        purple: 'border-purple-500/30 bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-300',
        indigo: 'border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-300',
        blue: 'border-blue-500/30 bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-300',
        rose: 'border-rose-500/30 bg-rose-500/10 text-rose-600 dark:bg-rose-500/20 dark:text-rose-300',
        slate: 'border-slate-700/40 bg-slate-800/50 text-slate-300',
      },
      size: {
        default: 'px-2.5 py-0.5 text-xs',
        xs: 'px-2 py-0.5 text-[10px]',
        lg: 'px-3 py-1 text-xs font-bold',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
}

function Badge({ className, variant, size, icon, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, size }), className)} {...props}>
      {icon}
      {children}
    </div>
  );
}

export { Badge, badgeVariants };

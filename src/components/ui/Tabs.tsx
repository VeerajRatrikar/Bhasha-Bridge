import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import { cn } from '@/lib/utils';

export interface TabItem {
  id: string;
  label: string;
  count?: number;
  icon?: React.ReactNode;
}

export interface CustomTabsProps {
  tabs?: TabItem[];
  value?: string;
  activeTab?: string;
  onChange?: (id: string) => void;
  onTabChange?: (id: string) => void;
  variant?: 'default' | 'pills' | 'underline';
  className?: string;
}

type TabsProps = CustomTabsProps & Omit<React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>, 'onChange'>;

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  ({ tabs, value, activeTab, onChange, onTabChange, variant = 'default', className, children, ...props }, ref) => {
    const selectedId = value || activeTab;
    const handler = onChange || onTabChange;

    if (tabs && tabs.length > 0) {
      return (
        <div
          ref={ref}
          className={cn(
            'flex items-center gap-1.5 overflow-x-auto p-1 border-b border-slate-800/80',
            variant === 'pills' && 'bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800',
            className
          )}
        >
          {tabs.map((t) => {
            const isActive = selectedId === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => handler?.(t.id)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap cursor-pointer',
                  isActive
                    ? 'bg-saffron-500 text-white shadow-md shadow-saffron-500/20 dark:bg-saffron-500'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                )}
              >
                {t.icon}
                <span>{t.label}</span>
                {t.count !== undefined && (
                  <span
                    className={cn(
                      'px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold',
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-400'
                    )}
                  >
                    {t.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      );
    }

    return (
      <TabsPrimitive.Root className={className} value={value} onValueChange={handler} {...props}>
        {children}
      </TabsPrimitive.Root>
    );
  }
);
Tabs.displayName = 'Tabs';

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-lg bg-slate-100 p-1 text-slate-500 dark:bg-slate-800 dark:text-slate-400',
      className
    )}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-slate-950 data-[state=active]:shadow-sm dark:ring-offset-slate-950 dark:data-[state=active]:bg-slate-950 dark:data-[state=active]:text-slate-50',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-500 focus-visible:ring-offset-2 dark:ring-offset-slate-950',
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export interface TabPanelProps {
  id?: string;
  tabId?: string;
  activeId?: string;
  activeTab?: string;
  children: React.ReactNode;
  className?: string;
}

export function TabPanel({ id, tabId, activeId, activeTab, children, className = '' }: TabPanelProps) {
  const myId = id || tabId;
  const currentActive = activeId || activeTab;
  if (currentActive && myId && currentActive !== myId) return null;
  return <div className={className}>{children}</div>;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };

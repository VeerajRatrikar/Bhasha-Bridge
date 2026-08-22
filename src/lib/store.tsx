// Global State Store for Bhasha-Bridge SaaS Application

import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { Supplier, ProcurementQuery, TrustedVendor, LanguageCode } from '../types';
import { NLUAnalysisResult } from './voiceEngine';
import { SUPPLIERS, MOCK_TRUSTED_VENDORS, MOCK_PROCUREMENT_QUERIES } from '../data/mockData';

export interface ToastNotification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'info' | 'warning' | 'error';
  timestamp: string;
}

interface AppState {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  reducedMotion: boolean;
  toggleReducedMotion: () => void;
  
  // Voice & Query State
  activeQuery: NLUAnalysisResult | null;
  setActiveQuery: (query: NLUAnalysisResult | null) => void;
  isListening: boolean;
  setIsListening: (listening: boolean) => void;
  queryHistory: ProcurementQuery[];
  addQueryToHistory: (query: ProcurementQuery) => void;
  
  // Trusted Vendors State
  trustedVendors: TrustedVendor[];
  addTrustedVendor: (supplier: Supplier, preferredLevel?: TrustedVendor['Preferred_Level'], notes?: string) => void;
  removeTrustedVendor: (supplierId: string) => void;
  isSupplierTrusted: (supplierId: string) => boolean;

  // Comparison Drawer State
  comparedSupplierIds: string[];
  toggleCompareSupplier: (supplierId: string) => void;
  clearComparedSuppliers: () => void;

  // Toast Notifications
  notifications: ToastNotification[];
  addNotification: (title: string, message: string, type?: ToastNotification['type']) => void;
  dismissNotification: (id: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [language, setLanguage] = useState<LanguageCode>('kn-en');
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const [activeQuery, setActiveQuery] = useState<NLUAnalysisResult | null>(null);
  const [isListening, setIsListening] = useState(false);
  const [queryHistory, setQueryHistory] = useState<ProcurementQuery[]>(MOCK_PROCUREMENT_QUERIES);
  
  const [trustedVendors, setTrustedVendors] = useState<TrustedVendor[]>(MOCK_TRUSTED_VENDORS);
  const [comparedSupplierIds, setComparedSupplierIds] = useState<string[]>([]);
  const [notifications, setNotifications] = useState<ToastNotification[]>([]);

  // Apply dark mode class to html element
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  const toggleHighContrast = () => setHighContrast(prev => !prev);
  const toggleReducedMotion = () => setReducedMotion(prev => !prev);

  const addQueryToHistory = (query: ProcurementQuery) => {
    setQueryHistory(prev => [query, ...prev]);
  };

  const addTrustedVendor = (supplier: Supplier, preferredLevel: TrustedVendor['Preferred_Level'] = 'TIER_1_GOLD', notes: string = 'Added via Bhasha-Bridge Discovery') => {
    if (trustedVendors.some(tv => tv.Supplier_ID === supplier.Supplier_ID)) return;

    const newVendor: TrustedVendor = {
      Trust_ID: `TRU_${Date.now()}`,
      User_ID: 'USR_101',
      Supplier_ID: supplier.Supplier_ID,
      Preferred_Level: preferredLevel,
      Notes: notes,
      Added_At: new Date().toISOString(),
      ReorderCount: 1,
      SupplierDetails: supplier
    };
    setTrustedVendors(prev => [newVendor, ...prev]);
    addNotification('Trusted Vendor Saved', `${supplier.Business_Name} has been added to your Trusted Vendor Repository.`, 'success');
  };

  const removeTrustedVendor = (supplierId: string) => {
    setTrustedVendors(prev => prev.filter(tv => tv.Supplier_ID !== supplierId));
    addNotification('Vendor Removed', 'Removed supplier from trusted list.', 'info');
  };

  const isSupplierTrusted = (supplierId: string) => {
    return trustedVendors.some(tv => tv.Supplier_ID === supplierId);
  };

  const toggleCompareSupplier = (supplierId: string) => {
    setComparedSupplierIds(prev => {
      if (prev.includes(supplierId)) {
        return prev.filter(id => id !== supplierId);
      }
      if (prev.length >= 3) {
        addNotification('Comparison Limit', 'You can compare a maximum of 3 suppliers at a time.', 'warning');
        return prev;
      }
      return [...prev, supplierId];
    });
  };

  const clearComparedSuppliers = () => setComparedSupplierIds([]);

  const addNotification = (title: string, message: string, type: ToastNotification['type'] = 'info') => {
    const toast: ToastNotification = {
      id: `TOAST_${Date.now()}_${Math.random()}`,
      title,
      message,
      type,
      timestamp: new Date().toLocaleTimeString()
    };
    setNotifications(prev => [toast, ...prev.slice(0, 4)]);
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        language,
        setLanguage,
        highContrast,
        toggleHighContrast,
        reducedMotion,
        toggleReducedMotion,
        activeQuery,
        setActiveQuery,
        isListening,
        setIsListening,
        queryHistory,
        addQueryToHistory,
        trustedVendors,
        addTrustedVendor,
        removeTrustedVendor,
        isSupplierTrusted,
        comparedSupplierIds,
        toggleCompareSupplier,
        clearComparedSuppliers,
        notifications,
        addNotification,
        dismissNotification
      }}
    >
      <div className={`${highContrast ? 'contrast-125 brightness-105' : ''}`}>
        {children}
      </div>
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

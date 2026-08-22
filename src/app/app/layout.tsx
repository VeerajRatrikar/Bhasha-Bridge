'use client';

import React from 'react';
import { AppProvider } from '../../lib/store';
import Layout from '@/components/layout';
import { ToastCenter } from '../../components/ui/ToastCenter';
import { CompareModal } from '../../components/discovery/CompareModal';
import { CommandPalette } from '../../components/ui/CommandPalette';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <Layout>
        {children}
      </Layout>

      {/* Global Modals & Notifications */}
      <ToastCenter />
      <CompareModal />
      <CommandPalette />
    </AppProvider>
  );
}

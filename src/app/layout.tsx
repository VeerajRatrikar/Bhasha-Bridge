import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '../lib/ThemeProvider';

const inter = { variable: 'font-sans' };
const manrope = { variable: 'font-sans' };
const spaceGrotesk = { variable: 'font-sans' };

export const metadata: Metadata = {
  title: {
    default: 'Bhasha-Bridge — Voice-First Procurement AI',
    template: '%s | Bhasha-Bridge',
  },
  description:
    'Bhasha-Bridge is a premium voice-first procurement platform that helps buyers discover suppliers, compare options, and move faster with multilingual AI assistance.',
  keywords: [
    'voice-first procurement',
    'AI supplier discovery',
    'multilingual procurement',
    'B2B supplier platform',
    'enterprise procurement AI',
    'Bhasha-Bridge',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    title: 'Bhasha-Bridge — Voice-First Procurement AI',
    description:
      'Discover suppliers through natural voice commands, multilingual search, and premium procurement workflows.',
    siteName: 'Bhasha-Bridge',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#050816' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className="h-full antialiased dark" suppressHydrationWarning>
      <body className="min-h-full flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300" suppressHydrationWarning>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

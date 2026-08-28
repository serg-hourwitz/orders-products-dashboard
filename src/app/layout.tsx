import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.scss';

import { AppLayout } from '@/components/layout/AppLayout/AppLayout';
import { StoreProvider } from '@/store/StoreProvider';

import { I18nProvider } from '@/providers/I18nProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Orders & Products',
  description: 'Orders and products management dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <StoreProvider>
          <I18nProvider>
            <AppLayout>{children}</AppLayout>
          </I18nProvider>
        </StoreProvider>
      </body>
    </html>
  );
}

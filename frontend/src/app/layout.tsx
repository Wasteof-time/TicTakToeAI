import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Layout from '@/components/layout/Layout';
import '@/index.css';

export const metadata: Metadata = {
  title: 'T³ Online',
  description: 'A futuristic tic tac toe arena with ranked play, clans, and events.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="theme-default" suppressHydrationWarning>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
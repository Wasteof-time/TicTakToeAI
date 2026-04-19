"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import BottomAccount from './BottomAccount';
import { useThemeStore } from '@/store/themeStore';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { currentTheme } = useThemeStore();
  const pathname = usePathname();

  useEffect(() => {
    document.body.className = `theme-${currentTheme}`;
  }, [currentTheme]);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Auth page doesn't show sidebar/topbar */}
      {pathname !== '/auth' && (
        <>
          <Sidebar />
          <TopBar />
          <BottomAccount />
        </>
      )}

      {/* Main Content */}
      <main
        className={pathname !== '/auth' ? 'lg:ml-[260px] pt-16 pb-20 px-4 sm:px-6 lg:px-8' : ''}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{
              duration: 0.3,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

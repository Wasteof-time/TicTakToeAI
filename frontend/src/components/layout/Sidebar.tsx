"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Gamepad2,
  Trophy,
  Users,
  Calendar,
  UserPlus,
  Zap,
  BarChart3,
  Palette,
  Settings,
  X,
} from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { useIsMobile } from '@/hooks/use-mobile';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: Gamepad2, label: 'Play Game', path: '/game' },
  { icon: Trophy, label: 'Tournament', path: '/tournament' },
  { icon: Users, label: 'Clan', path: '/clan' },
  { icon: Calendar, label: 'Events', path: '/events' },
  { icon: UserPlus, label: 'Friends', path: '/friends' },
  { icon: Zap, label: 'Matchmaking', path: '/matchmaking' },
  { icon: BarChart3, label: 'Leaderboard', path: '/leaderboard' },
  { icon: Palette, label: 'Theme', path: '/theme' },
];

export default function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useUIStore();
  const pathname = usePathname();
  const isMobile = useIsMobile();

  const isActive = (path: string) => pathname === path;

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isMobile && !sidebarOpen ? '-100%' : 0,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed left-0 top-0 h-full w-[260px] z-50 flex flex-col lg:translate-x-0"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border-color)',
        }}
      >
        {/* Close button (mobile only) */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-lg lg:hidden"
          style={{ color: 'var(--text-secondary)' }}
        >
          <X size={20} />
        </button>

        {/* Logo */}
        <div className="px-6 pt-8 pb-6">
          <Link href="/" className="flex items-center gap-2">
            <span
              className="text-2xl font-bold tracking-wider"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                color: 'var(--accent-primary)',
                textShadow: '0 0 15px var(--accent-primary)',
              }}
            >
              T&#x00B3;
            </span>
            <span
              className="text-lg font-semibold tracking-wide"
              style={{ color: 'var(--text-primary)' }}
            >
              ONLINE
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => {
                    if (window.innerWidth < 1024) setSidebarOpen(false);
                  }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative"
                  style={{
                    backgroundColor: active
                      ? 'var(--accent-primary)15'
                      : 'transparent',
                    color: active
                      ? 'var(--accent-primary)'
                      : 'var(--text-secondary)',
                  }}
                >
                  {active && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 rounded-full"
                      style={{ backgroundColor: 'var(--accent-primary)' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  <Icon
                    size={20}
                    style={{
                      color: active
                        ? 'var(--accent-primary)'
                        : 'var(--text-secondary)',
                    }}
                    className="transition-colors duration-200"
                  />
                  <span
                    className="font-medium text-sm"
                    style={{
                      color: active
                        ? 'var(--accent-primary)'
                        : 'var(--text-secondary)',
                    }}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Settings */}
        <div className="px-3 py-4">
          <button
            className="flex items-center gap-3 px-4 py-3 rounded-xl w-full transition-all duration-200"
            style={{
              color: 'var(--text-secondary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Settings size={20} />
            <span className="font-medium text-sm">Settings</span>
          </button>
        </div>
      </motion.aside>
    </>
  );
}

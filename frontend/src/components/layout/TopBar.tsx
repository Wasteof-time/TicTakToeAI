"use client";

import { usePathname } from 'next/navigation';
import { Menu, Bell, Coins } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import { useAuthStore } from '@/store/authStore';

const pageTitles: Record<string, string> = {
  '/': 'Dashboard',
  '/game': 'Tic Tac Toe',
  '/tournament': 'Tournaments',
  '/clan': 'Clan',
  '/events': 'Events',
  '/friends': 'Friends',
  '/matchmaking': 'Matchmaking',
  '/theme': 'Select Theme',
  '/leaderboard': 'Leaderboard',
  '/auth': 'Authentication',
};

export default function TopBar() {
  const { toggleSidebar } = useUIStore();
  const { isAuthenticated } = useAuthStore();
  const pathname = usePathname();

  const title = pageTitles[pathname] || 'T³ Online';

  return (
    <header
      className="fixed top-0 left-0 right-0 h-16 z-30 flex items-center justify-between px-4 lg:pl-[276px]"
      style={{
        backgroundColor: 'var(--bg-primary)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      {/* Left: Hamburger + Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-lg transition-colors lg:hidden"
          style={{ color: 'var(--text-primary)' }}
        >
          <Menu size={24} />
        </button>
        <h1
          className="text-lg font-semibold tracking-wide"
          style={{
            fontFamily: 'Orbitron, sans-serif',
            color: 'var(--text-primary)',
          }}
        >
          {title}
        </h1>
      </div>

      {/* Right: Stats + Notifications */}
      {isAuthenticated && (
        <div className="flex items-center gap-4">
          {/* Currency */}
          <div
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
            }}
          >
            <Coins size={16} style={{ color: 'var(--accent-primary)' }} />
            <span
              className="text-sm font-mono font-medium"
              style={{ color: 'var(--accent-primary)' }}
            >
              2,450
            </span>
          </div>

          {/* Notifications */}
          <button
            className="relative p-2 rounded-lg transition-colors"
            style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'var(--bg-secondary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <Bell size={20} />
            <span
              className="absolute top-1 right-1 w-2 h-2 rounded-full"
              style={{ backgroundColor: 'var(--danger)' }}
            />
          </button>
        </div>
      )}
    </header>
  );
}

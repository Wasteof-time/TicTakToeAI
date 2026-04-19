"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, User, ChevronUp, Shield } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export default function BottomAccount() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    setShowMenu(false);
    router.push('/auth');
  };

  if (!isAuthenticated) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40 lg:left-[276px]">
      <motion.div
        initial={false}
        animate={{ y: 0 }}
        className="relative"
      >
        {/* Dropdown Menu */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: -8, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full left-0 mb-2 w-52 rounded-xl overflow-hidden shadow-lg"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div
                className="px-4 py-3 border-b"
                style={{ borderColor: 'var(--border-color)' }}
              >
                <p
                  className="text-sm font-medium"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {user?.username || 'Player'}
                </p>
                <p
                  className="text-xs"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {user?.email || 'guest@t3online.com'}
                </p>
              </div>
              <button
                onClick={() => {
                  setShowMenu(false);
                }}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <User size={16} />
                Profile
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                }}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <Shield size={16} />
                Account Settings
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors"
                style={{ color: 'var(--danger)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <LogOut size={16} />
                Logout
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Account Button */}
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200"
          style={{
            backgroundColor: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent-primary)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--border-color)';
          }}
        >
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--bg-primary)',
            }}
          >
            {user?.username?.[0]?.toUpperCase() || 'G'}
          </div>
          <span
            className="text-sm font-medium hidden sm:inline"
            style={{ color: 'var(--text-primary)' }}
          >
            {user?.username || 'Guest'}
          </span>
          <motion.div
            animate={{ rotate: showMenu ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronUp size={14} style={{ color: 'var(--text-secondary)' }} />
          </motion.div>
        </button>
      </motion.div>
    </div>
  );
}

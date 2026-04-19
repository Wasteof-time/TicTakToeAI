"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Shield, Swords } from 'lucide-react';
import { useUIStore } from '@/store/uiStore';

export default function MatchmakingPage() {
  const router = useRouter();
  const { matchmakingStatus, setMatchmakingStatus } = useUIStore();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (matchmakingStatus === 'found') {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setMatchmakingStatus('accepted');
            setTimeout(() => router.push('/game'), 500);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [matchmakingStatus, setMatchmakingStatus, router]);

  const handleFindMatch = () => {
    setMatchmakingStatus('searching');
    setTimeout(() => {
      setMatchmakingStatus('found');
      setCountdown(5);
    }, 3000);
  };

  const handleCancel = () => {
    setMatchmakingStatus('idle');
  };

  return (
    <div className="max-w-lg mx-auto py-8">
      {/* Rank Display */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div
          className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '2px solid var(--accent-primary)',
            boxShadow: '0 0 20px var(--accent-primary)40',
          }}
        >
          <Shield size={36} style={{ color: 'var(--accent-primary)' }} />
        </div>
        <h2
          className="text-xl font-bold mb-1"
          style={{ fontFamily: 'Orbitron', color: 'var(--text-primary)' }}
        >
          Diamond III
        </h2>
        <p className="text-sm font-mono" style={{ color: 'var(--accent-primary)' }}>
          2,150 ELO
        </p>
        <div className="flex justify-center gap-6 mt-4">
          <div className="text-center">
            <p className="text-lg font-bold font-mono" style={{ color: 'var(--text-primary)' }}>198</p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Wins</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold font-mono" style={{ color: 'var(--text-primary)' }}>87</p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Losses</p>
          </div>
          <div className="text-center">
            <p className="text-lg font-bold font-mono" style={{ color: 'var(--text-primary)' }}>68.4%</p>
            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Win Rate</p>
          </div>
        </div>
      </motion.div>

      {/* Rank Progress */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8 px-4"
      >
        <div className="flex justify-between text-xs mb-2">
          <span style={{ color: 'var(--text-secondary)' }}>Diamond III</span>
          <span style={{ color: 'var(--accent-primary)' }}>2,150 / 2,400</span>
          <span style={{ color: 'var(--text-secondary)' }}>Diamond II</span>
        </div>
        <div className="h-2 rounded-full" style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '72%' }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-full rounded-full"
            style={{ backgroundColor: 'var(--accent-primary)' }}
          />
        </div>
      </motion.div>

      {/* Matchmaking Animation / Button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col items-center"
      >
        <AnimatePresence mode="wait">
          {matchmakingStatus === 'idle' && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center"
            >
              <button
                onClick={handleFindMatch}
                className="px-12 py-5 rounded-2xl font-bold text-lg transition-all duration-200 hover:scale-[1.02]"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--bg-primary)',
                  boxShadow: '0 0 30px var(--accent-primary)40',
                }}
              >
                <div className="flex items-center gap-3">
                  <Zap size={24} />
                  Find Match
                </div>
              </button>
            </motion.div>
          )}

          {matchmakingStatus === 'searching' && (
            <motion.div
              key="searching"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              {/* Pulsing Rings */}
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div
                  className="absolute inset-0 rounded-full animate-matchmaking-pulse"
                  style={{ border: '2px solid var(--accent-primary)' }}
                />
                <div
                  className="absolute inset-2 rounded-full animate-matchmaking-pulse"
                  style={{ border: '2px solid var(--accent-primary)', animationDelay: '0.3s' }}
                />
                <div
                  className="absolute inset-4 rounded-full animate-matchmaking-pulse"
                  style={{ border: '2px solid var(--accent-primary)', animationDelay: '0.6s' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Swords size={32} style={{ color: 'var(--accent-primary)' }} />
                </div>
              </div>
              <p
                className="text-lg font-semibold mb-1"
                style={{ fontFamily: 'Orbitron', color: 'var(--text-primary)' }}
              >
                Finding Opponent
              </p>
              <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
                Searching for a worthy challenger...
              </p>
              <button
                onClick={handleCancel}
                className="px-6 py-2.5 rounded-xl text-sm font-medium"
                style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--danger)' }}
              >
                Cancel
              </button>
            </motion.div>
          )}

          {matchmakingStatus === 'found' && (
            <motion.div
              key="found"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <div
                className="rounded-2xl p-8 mb-4"
                style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--accent-primary)' }}
              >
                <p
                  className="text-sm font-medium mb-4"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  MATCH FOUND!
                </p>
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="text-center">
                    <div
                      className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-1"
                      style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--bg-primary)' }}
                    >
                      Y
                    </div>
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>You</p>
                  </div>
                  <span
                    className="text-lg font-bold"
                    style={{ color: 'var(--accent-primary)' }}
                  >
                    VS
                  </span>
                  <div className="text-center">
                    <img
                      src="/images/robot_ai.png"
                      alt="Opponent"
                      className="w-14 h-14 rounded-full object-cover mx-auto mb-1"
                      style={{ border: '2px solid var(--accent-secondary)' }}
                    />
                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>AI Opponent</p>
                  </div>
                </div>
                <div
                  className="text-4xl font-bold font-mono"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  {countdown}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

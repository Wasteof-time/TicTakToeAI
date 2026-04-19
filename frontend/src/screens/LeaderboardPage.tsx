"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { demoLeaderboard } from '@/utils/demoData';

const tabs = ['global', 'friends', 'season'] as const;

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('global');

  const top3 = demoLeaderboard.slice(0, 3);
  const rest = demoLeaderboard.slice(3);

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Orbitron' }}>
          Leaderboard
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Top players ranked by ELO rating
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-5 py-2 rounded-xl text-sm font-medium capitalize transition-all duration-200"
            style={{
              backgroundColor: activeTab === tab ? 'var(--accent-primary)' : 'var(--bg-secondary)',
              color: activeTab === tab ? 'var(--bg-primary)' : 'var(--text-secondary)',
              border: `1px solid ${activeTab === tab ? 'var(--accent-primary)' : 'var(--border-color)'}`,
            }}
          >
            {tab}
          </button>
        ))}
      </motion.div>

      {/* Podium Top 3 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-end justify-center gap-4 mb-6"
      >
        {/* 2nd Place */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col items-center"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '3px solid #C0C0C0',
              boxShadow: '0 0 15px #C0C0C040',
            }}
          >
            <img src={top3[1].avatar} alt={top3[1].username} className="w-12 h-12 rounded-full object-cover" />
          </div>
          <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{top3[1].username}</p>
          <p className="text-xs font-mono" style={{ color: '#C0C0C0' }}>{top3[1].elo}</p>
          <div
            className="w-20 h-16 rounded-t-lg mt-2 flex items-center justify-center"
            style={{ backgroundColor: '#C0C0C020', border: '1px solid #C0C0C040' }}
          >
            <span className="text-lg font-bold" style={{ color: '#C0C0C0' }}>2</span>
          </div>
        </motion.div>

        {/* 1st Place */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mb-2"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '3px solid #FFD700',
              boxShadow: '0 0 20px #FFD70060',
            }}
          >
            <img src={top3[0].avatar} alt={top3[0].username} className="w-16 h-16 rounded-full object-cover" />
          </div>
          <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{top3[0].username}</p>
          <p className="text-xs font-mono" style={{ color: '#FFD700' }}>{top3[0].elo}</p>
          <div
            className="w-24 h-24 rounded-t-lg mt-2 flex items-center justify-center"
            style={{ backgroundColor: '#FFD70015', border: '1px solid #FFD70040' }}
          >
            <Trophy size={24} style={{ color: '#FFD700' }} />
          </div>
        </motion.div>

        {/* 3rd Place */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mb-2"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '3px solid #CD7F32',
              boxShadow: '0 0 15px #CD7F3240',
            }}
          >
            <img src={top3[2].avatar} alt={top3[2].username} className="w-12 h-12 rounded-full object-cover" />
          </div>
          <p className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>{top3[2].username}</p>
          <p className="text-xs font-mono" style={{ color: '#CD7F32' }}>{top3[2].elo}</p>
          <div
            className="w-20 h-12 rounded-t-lg mt-2 flex items-center justify-center"
            style={{ backgroundColor: '#CD7F3215', border: '1px solid #CD7F3240' }}
          >
            <span className="text-lg font-bold" style={{ color: '#CD7F32' }}>3</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl overflow-hidden"
        style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
      >
        {/* Header */}
        <div
          className="grid grid-cols-12 gap-4 px-5 py-3 text-xs font-medium"
          style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)' }}
        >
          <div className="col-span-1">#</div>
          <div className="col-span-5">Player</div>
          <div className="col-span-2 text-right">Wins</div>
          <div className="col-span-2 text-right">Win Rate</div>
          <div className="col-span-2 text-right">ELO</div>
        </div>

        {/* Rows */}
        {rest.map((entry, i) => (
          <motion.div
            key={entry.rank}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + i * 0.03 }}
            className="grid grid-cols-12 gap-4 px-5 py-3 items-center transition-colors"
            style={{
              backgroundColor: entry.isCurrentUser ? 'var(--accent-primary)10' : 'transparent',
              borderBottom: i < rest.length - 1 ? '1px solid var(--border-color)' : 'none',
              borderLeft: entry.isCurrentUser ? '3px solid var(--accent-primary)' : '3px solid transparent',
            }}
            onMouseEnter={(e) => {
              if (!entry.isCurrentUser) e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
            }}
            onMouseLeave={(e) => {
              if (!entry.isCurrentUser) e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <div className="col-span-1 text-sm font-mono" style={{ color: 'var(--text-secondary)' }}>
              {entry.rank}
            </div>
            <div className="col-span-5 flex items-center gap-3">
              <img src={entry.avatar} alt={entry.username} className="w-8 h-8 rounded-full object-cover" />
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                {entry.username}
              </span>
            </div>
            <div className="col-span-2 text-right text-sm font-mono" style={{ color: 'var(--text-primary)' }}>
              {entry.wins}
            </div>
            <div className="col-span-2 text-right text-sm font-mono" style={{ color: 'var(--accent-primary)' }}>
              {entry.winRate}%
            </div>
            <div className="col-span-2 text-right text-sm font-bold font-mono" style={{ color: 'var(--text-primary)' }}>
              {entry.elo}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

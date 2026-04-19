"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Clock, ChevronRight, Award } from 'lucide-react';
import { demoTournaments } from '@/utils/demoData';
import type { Tournament } from '@/types';

const tabs = ['all', 'open', 'ongoing', 'completed'] as const;

export default function TournamentPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('all');

  const filtered =
    activeTab === 'all'
      ? demoTournaments
      : demoTournaments.filter((t) => t.status === activeTab);

  const getStatusColor = (status: Tournament['status']) => {
    switch (status) {
      case 'open':
        return 'var(--success)';
      case 'ongoing':
        return 'var(--accent-primary)';
      case 'completed':
        return 'var(--text-secondary)';
    }
  };

  const getStatusLabel = (status: Tournament['status']) => {
    switch (status) {
      case 'open':
        return 'JOIN';
      case 'ongoing':
        return 'VIEW';
      case 'completed':
        return 'RESULTS';
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1
          className="text-2xl font-bold mb-2"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          Tournaments
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Compete in tournaments and win amazing prizes
        </p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-2 overflow-x-auto pb-2"
      >
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-5 py-2 rounded-xl text-sm font-medium capitalize transition-all duration-200 whitespace-nowrap"
            style={{
              backgroundColor:
                activeTab === tab ? 'var(--accent-primary)' : 'var(--bg-secondary)',
              color:
                activeTab === tab ? 'var(--bg-primary)' : 'var(--text-secondary)',
              border: `1px solid ${activeTab === tab ? 'var(--accent-primary)' : 'var(--border-color)'}`,
            }}
          >
            {tab}
          </button>
        ))}
      </motion.div>

      {/* Tournament Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((tournament, i) => (
          <motion.div
            key={tournament.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="rounded-2xl overflow-hidden group cursor-pointer transition-all duration-200 hover:-translate-y-1"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
            }}
            whileHover={{
              boxShadow: `0 8px 32px ${getStatusColor(tournament.status)}20`,
            }}
          >
            {/* Banner */}
            <div
              className="h-32 bg-cover bg-center relative"
              style={{ backgroundImage: `url(${tournament.banner})` }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, var(--bg-secondary) 0%, transparent 60%)',
                }}
              />
              <div
                className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold"
                style={{
                  backgroundColor: getStatusColor(tournament.status) + '30',
                  color: getStatusColor(tournament.status),
                  border: `1px solid ${getStatusColor(tournament.status)}50`,
                }}
              >
                {tournament.status.toUpperCase()}
              </div>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3
                className="text-lg font-bold mb-3"
                style={{ color: 'var(--text-primary)' }}
              >
                {tournament.name}
              </h3>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <Award size={14} style={{ color: 'var(--warning)' }} />
                  <span
                    className="text-xs"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {tournament.prizePool}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={14} style={{ color: 'var(--accent-primary)' }} />
                  <span
                    className="text-xs"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {tournament.participants}/{tournament.maxParticipants}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={14} style={{ color: 'var(--accent-secondary)' }} />
                  <span
                    className="text-xs"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {new Date(tournament.startTime).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div
                className="h-1.5 rounded-full mb-4"
                style={{ backgroundColor: 'var(--bg-tertiary)' }}
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${(tournament.participants / tournament.maxParticipants) * 100}%`,
                    backgroundColor: getStatusColor(tournament.status),
                  }}
                />
              </div>

              {/* Action */}
              <button
                className="w-full py-2.5 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2"
                style={{
                  backgroundColor: getStatusColor(tournament.status) + '20',
                  color: getStatusColor(tournament.status),
                  border: `1px solid ${getStatusColor(tournament.status)}40`,
                }}
              >
                {getStatusLabel(tournament.status)}
                <ChevronRight size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

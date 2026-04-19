"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Gift, ChevronRight } from 'lucide-react';
import { demoEvents } from '@/utils/demoData';

const tabs = ['all', 'active', 'upcoming', 'past'] as const;

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('all');

  const filtered =
    activeTab === 'all'
      ? demoEvents
      : demoEvents.filter((e) => e.status === activeTab);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'var(--success)';
      case 'upcoming':
        return 'var(--accent-primary)';
      case 'past':
        return 'var(--text-secondary)';
      default:
        return 'var(--text-secondary)';
    }
  };

  const getDaysLeft = (endDate: string) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? `${diff}d left` : 'Ended';
  };

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Orbitron' }}>
          Events
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Special events and limited-time challenges
        </p>
      </motion.div>

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
              backgroundColor: activeTab === tab ? 'var(--accent-primary)' : 'var(--bg-secondary)',
              color: activeTab === tab ? 'var(--bg-primary)' : 'var(--text-secondary)',
              border: `1px solid ${activeTab === tab ? 'var(--accent-primary)' : 'var(--border-color)'}`,
            }}
          >
            {tab}
          </button>
        ))}
      </motion.div>

      <div className="space-y-4">
        {filtered.map((event, i) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.05 }}
            className="rounded-2xl overflow-hidden group"
            style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
          >
            <div className="flex flex-col md:flex-row">
              {/* Banner */}
              <div
                className="md:w-48 h-32 md:h-auto bg-cover bg-center flex-shrink-0"
                style={{ backgroundImage: `url(${event.banner})` }}
              />

              {/* Content */}
              <div className="flex-1 p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className="px-2 py-0.5 rounded text-xs font-bold"
                        style={{ backgroundColor: getStatusColor(event.status) + '30', color: getStatusColor(event.status) }}
                      >
                        {event.status.toUpperCase()}
                      </span>
                      {event.status === 'active' && (
                        <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                          <Clock size={12} />
                          {getDaysLeft(event.endDate)}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
                      {event.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm mb-4 line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                  {event.description}
                </p>

                {/* Rewards */}
                <div className="flex items-center gap-2 mb-4 flex-wrap">
                  <Gift size={14} style={{ color: 'var(--warning)' }} />
                  {event.rewards.map((reward, ri) => (
                    <span
                      key={ri}
                      className="px-2 py-1 rounded-lg text-xs"
                      style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}
                    >
                      {reward}
                    </span>
                  ))}
                </div>

                {/* Progress (active events only) */}
                {event.status === 'active' && event.progress !== undefined && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: 'var(--text-secondary)' }}>Progress</span>
                      <span style={{ color: 'var(--accent-primary)' }}>{event.progress}%</span>
                    </div>
                    <div className="h-2 rounded-full" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${event.progress}%`, backgroundColor: 'var(--accent-primary)' }}
                      />
                    </div>
                  </div>
                )}

                <button
                  className="flex items-center gap-2 text-sm font-medium transition-colors"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  {event.status === 'active' ? 'Participate' : 'View Details'}
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

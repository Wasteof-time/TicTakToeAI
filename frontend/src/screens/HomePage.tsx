"use client";

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Gamepad2,
  Trophy,
  Users,
  Calendar,
  UserPlus,
  Zap,
  BookOpen,
  Play,
  TrendingUp,
  Clock,
  Award,
  Swords,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const gameModes = [
  {
    icon: Zap,
    title: 'Ranked Match',
    description: 'Climb the ranks',
    path: '/matchmaking',
    color: 'var(--accent-primary)',
  },
  {
    icon: Trophy,
    title: 'Tournament',
    description: 'Compete for prizes',
    path: '/tournament',
    color: 'var(--warning)',
  },
  {
    icon: Users,
    title: 'Clan Wars',
    description: 'Team up and conquer',
    path: '/clan',
    color: 'var(--accent-secondary)',
  },
  {
    icon: Calendar,
    title: 'Events',
    description: 'Special challenges',
    path: '/events',
    color: 'var(--success)',
  },
  {
    icon: UserPlus,
    title: 'Friends',
    description: 'Play with friends',
    path: '/friends',
    color: 'var(--accent-primary)',
  },
  {
    icon: BookOpen,
    title: 'Practice',
    description: 'Hone your skills',
    path: '/game',
    color: 'var(--text-secondary)',
  },
];

const recentMatches = [
  { opponent: 'GridMaster99', result: 'win' as const, score: '3-1', time: '5m ago' },
  { opponent: 'CyberWolf', result: 'loss' as const, score: '1-3', time: '12m ago' },
  { opponent: 'PixelQueen', result: 'draw' as const, score: '2-2', time: '1h ago' },
  { opponent: 'TacticalTom', result: 'win' as const, score: '3-0', time: '2h ago' },
];

const stats = [
  { icon: Swords, label: 'Games Played', value: '342', color: 'var(--accent-primary)' },
  { icon: TrendingUp, label: 'Wins', value: '198', color: 'var(--success)' },
  { icon: Award, label: 'Win Rate', value: '68.4%', color: 'var(--warning)' },
  { icon: Clock, label: 'Current Streak', value: '7', color: 'var(--accent-secondary)' },
];

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuthStore();

  const getResultColor = (result: string) => {
    switch (result) {
      case 'win': return 'var(--success)';
      case 'loss': return 'var(--danger)';
      default: return 'var(--warning)';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 py-6">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div
          className="rounded-2xl p-6 sm:p-8 relative overflow-hidden"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
          }}
        >
          <div
            className="absolute top-0 right-0 w-64 h-64 opacity-10"
            style={{
              backgroundImage: 'url(/images/bg_menu.jpg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              maskImage: 'radial-gradient(circle, black 40%, transparent 70%)',
              WebkitMaskImage: 'radial-gradient(circle, black 40%, transparent 70%)',
            }}
          />
          <div className="relative z-10">
            <h1
              className="text-2xl sm:text-3xl font-bold mb-2"
              style={{ fontFamily: 'Orbitron, sans-serif' }}
            >
              Welcome back,{' '}
              <span style={{ color: 'var(--accent-primary)' }}>
                {user?.username || 'Player'}
              </span>
            </h1>
            <p
              className="text-sm sm:text-base"
              style={{ color: 'var(--text-secondary)' }}
            >
              Ready for your next match?
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {stats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                    className="flex items-center gap-3 p-3 rounded-xl"
                    style={{ backgroundColor: 'var(--bg-tertiary)' }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${stat.color}20` }}
                    >
                      <Icon size={18} style={{ color: stat.color }} />
                    </div>
                    <div>
                      <p
                        className="text-lg font-bold font-mono"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {stat.value}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {stat.label}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Quick Play */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h2
          className="text-lg font-semibold mb-4"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          Quick Play
        </h2>
        <motion.button
          onClick={() => router.push('/game')}
          className="w-full sm:w-auto flex items-center gap-4 px-8 py-5 rounded-2xl transition-all duration-200 hover:scale-[1.02]"
          style={{
            backgroundColor: 'var(--accent-primary)',
            color: 'var(--bg-primary)',
          }}
          whileHover={{ boxShadow: '0 0 30px var(--accent-primary)' }}
          whileTap={{ scale: 0.98 }}
        >
          <Gamepad2 size={32} />
          <div className="text-left">
            <p className="text-lg font-bold">Play Now</p>
            <p className="text-xs opacity-80">Jump into a quick match</p>
          </div>
          <Play size={24} className="ml-4" />
        </motion.button>
      </motion.section>

      {/* Game Modes Grid */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2
          className="text-lg font-semibold mb-4"
          style={{ fontFamily: 'Orbitron, sans-serif' }}
        >
          Game Modes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {gameModes.map((mode, i) => {
            const Icon = mode.icon;
            return (
              <motion.button
                key={mode.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.05, duration: 0.3 }}
                onClick={() => router.push(mode.path)}
                className="flex items-start gap-4 p-5 rounded-2xl text-left transition-all duration-200 group"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                }}
                whileHover={{
                  y: -4,
                  boxShadow: `0 8px 32px ${mode.color}30`,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: `${mode.color}20` }}
                >
                  <Icon size={24} style={{ color: mode.color }} />
                </div>
                <div>
                  <p
                    className="font-semibold mb-1"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {mode.title}
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {mode.description}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </div>
      </motion.section>

      {/* Recent Activity + Active Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Matches */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2
            className="text-lg font-semibold mb-4"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            Recent Activity
          </h2>
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
            }}
          >
            {recentMatches.map((match, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-5 py-4 transition-colors"
                style={{
                  borderBottom:
                    i < recentMatches.length - 1
                      ? '1px solid var(--border-color)'
                      : 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                    style={{
                      backgroundColor: getResultColor(match.result) + '30',
                      color: getResultColor(match.result),
                    }}
                  >
                    {match.result[0].toUpperCase()}
                  </div>
                  <div>
                    <p
                      className="text-sm font-medium"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      vs {match.opponent}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {match.time}
                    </p>
                  </div>
                </div>
                <span
                  className="text-sm font-mono font-medium"
                  style={{ color: getResultColor(match.result) }}
                >
                  {match.score}
                </span>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Active Events */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2
            className="text-lg font-semibold mb-4"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            Active Events
          </h2>
          <div
            className="rounded-2xl overflow-hidden relative"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
            }}
          >
            <div
              className="h-32 bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/event_banner.jpg)' }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(to top, var(--bg-secondary) 0%, transparent 100%)',
                }}
              />
            </div>
            <div className="relative z-10 px-5 pb-5 -mt-8">
              <div
                className="inline-block px-3 py-1 rounded-full text-xs font-medium mb-3"
                style={{
                  backgroundColor: 'var(--accent-primary)',
                  color: 'var(--bg-primary)',
                }}
              >
                ACTIVE
              </div>
              <h3
                className="text-lg font-bold mb-1"
                style={{ color: 'var(--text-primary)' }}
              >
                Neon Nights Festival
              </h3>
              <p
                className="text-sm mb-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                Double XP and exclusive rewards all week long!
              </p>
              <div className="flex items-center justify-between">
                <div
                  className="w-full h-2 rounded-full mr-4"
                  style={{ backgroundColor: 'var(--bg-tertiary)' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: '65%',
                      backgroundColor: 'var(--accent-primary)',
                    }}
                  />
                </div>
                <span
                  className="text-xs font-mono whitespace-nowrap"
                  style={{ color: 'var(--accent-primary)' }}
                >
                  65%
                </span>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

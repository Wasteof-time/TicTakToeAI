"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Trophy,
  Star,
  Crown,
  Shield,
  LogOut,
  Plus,
  X,
} from 'lucide-react';
import { demoClan } from '@/utils/demoData';

export default function ClanPage() {
  const [inClan, setInClan] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [clanForm, setClanForm] = useState({ name: '', tag: '', description: '' });

  const handleCreateClan = () => {
    setInClan(true);
    setShowCreate(false);
  };

  const handleLeaveClan = () => {
    setInClan(false);
  };

  if (!inClan) {
    return (
      <div className="max-w-2xl mx-auto py-12 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div
            className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
          >
            <Users size={40} style={{ color: 'var(--text-secondary)' }} />
          </div>
          <h2
            className="text-2xl font-bold mb-2"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            No Clan Yet
          </h2>
          <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
            Join or create a clan to team up with other players
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-[1.02]"
              style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--bg-primary)' }}
            >
              <Plus size={18} />
              Create Clan
            </button>
            <button
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200"
              style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
            >
              <Users size={18} />
              Find Clan
            </button>
          </div>
        </motion.div>

        {/* Create Clan Modal */}
        {showCreate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="w-full max-w-md rounded-2xl p-6"
              style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold" style={{ fontFamily: 'Orbitron' }}>Create Clan</h3>
                <button onClick={() => setShowCreate(false)} style={{ color: 'var(--text-secondary)' }}>
                  <X size={20} />
                </button>
              </div>
              <div className="space-y-4">
                <input
                  placeholder="Clan Name"
                  value={clanForm.name}
                  onChange={(e) => setClanForm({ ...clanForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                />
                <input
                  placeholder="Clan Tag (3-4 chars)"
                  maxLength={4}
                  value={clanForm.tag}
                  onChange={(e) => setClanForm({ ...clanForm, tag: e.target.value.toUpperCase() })}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                />
                <textarea
                  placeholder="Description"
                  rows={3}
                  value={clanForm.description}
                  onChange={(e) => setClanForm({ ...clanForm, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                />
                <button
                  onClick={handleCreateClan}
                  className="w-full py-3 rounded-xl font-medium text-sm"
                  style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--bg-primary)' }}
                >
                  Create Clan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 space-y-6">
      {/* Clan Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl overflow-hidden"
        style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
      >
        <div
          className="h-32 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${demoClan.banner})` }}
        >
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, var(--bg-secondary) 0%, transparent 70%)' }}
          />
        </div>
        <div className="px-6 pb-6 -mt-8 relative z-10">
          <div className="flex items-end justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1
                  className="text-2xl font-bold"
                  style={{ fontFamily: 'Orbitron, sans-serif' }}
                >
                  {demoClan.name}
                </h1>
                <span
                  className="px-2 py-0.5 rounded text-xs font-bold"
                  style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--bg-primary)' }}
                >
                  [{demoClan.tag}]
                </span>
              </div>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                {demoClan.description}
              </p>
            </div>
            <button
              onClick={handleLeaveClan}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-colors"
              style={{ color: 'var(--danger)', border: '1px solid var(--danger)40' }}
            >
              <LogOut size={14} />
              Leave
            </button>
          </div>

          {/* Clan Stats */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { icon: Users, label: 'Members', value: demoClan.members.length, color: 'var(--accent-primary)' },
              { icon: Trophy, label: 'Wins', value: demoClan.totalWins, color: 'var(--warning)' },
              { icon: Star, label: 'Rank', value: `#${demoClan.rank}`, color: 'var(--success)' },
              { icon: Shield, label: 'Clan XP', value: demoClan.xp.toLocaleString(), color: 'var(--accent-secondary)' },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="text-center p-3 rounded-xl"
                  style={{ backgroundColor: 'var(--bg-tertiary)' }}
                >
                  <Icon size={16} className="mx-auto mb-1" style={{ color: stat.color }} />
                  <p className="text-lg font-bold font-mono" style={{ color: 'var(--text-primary)' }}>
                    {stat.value}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Members List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Orbitron' }}>
          Members
        </h2>
        <div
          className="rounded-2xl overflow-hidden"
          style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
        >
          {demoClan.members.map((member, i) => (
            <div
              key={member.id}
              className="flex items-center justify-between px-5 py-4 transition-colors"
              style={{
                borderBottom: i < demoClan.members.length - 1 ? '1px solid var(--border-color)' : 'none',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={member.avatar}
                    alt={member.username}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div
                    className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
                    style={{
                      backgroundColor: member.status === 'online' ? 'var(--success)' : 'var(--text-secondary)',
                      borderColor: 'var(--bg-secondary)',
                    }}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      {member.username}
                    </p>
                    {member.role === 'leader' && <Crown size={12} style={{ color: 'var(--warning)' }} />}
                    {member.role === 'officer' && <Shield size={12} style={{ color: 'var(--accent-primary)' }} />}
                  </div>
                  <p className="text-xs capitalize" style={{ color: 'var(--text-secondary)' }}>
                    {member.role}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs font-mono" style={{ color: 'var(--accent-primary)' }}>
                  {member.contribution.toLocaleString()}
                </p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>contribution</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

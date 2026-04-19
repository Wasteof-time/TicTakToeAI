"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, UserPlus, Swords, MessageCircle, X, UserCheck, UserX } from 'lucide-react';
import { demoFriends } from '@/utils/demoData';

const tabs = ['friends', 'pending', 'add'] as const;

export default function FriendsPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('friends');
  const [searchQuery, setSearchQuery] = useState('');
  const [pendingRequests] = useState([
    { id: 'p1', username: 'ShadowPlay', avatar: '/images/default_avatar.png', type: 'incoming' as const },
    { id: 'p2', username: 'DataStream', avatar: '/images/default_avatar.png', type: 'outgoing' as const },
  ]);

  const filteredFriends = demoFriends.filter((f) =>
    f.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onlineCount = demoFriends.filter((f) => f.status === 'online' || f.status === 'playing').length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'var(--success)';
      case 'playing': return 'var(--accent-primary)';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Orbitron' }}>Friends</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          {onlineCount} friends online
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
            {tab === 'pending' && pendingRequests.length > 0 && (
              <span
                className="ml-1.5 px-1.5 py-0.5 rounded-full text-xs"
                style={{ backgroundColor: 'var(--danger)', color: 'white' }}
              >
                {pendingRequests.length}
              </span>
            )}
          </button>
        ))}
      </motion.div>

      {/* Search (for friends tab) */}
      {activeTab === 'friends' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative"
        >
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
          <input
            type="text"
            placeholder="Search friends..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl text-sm outline-none"
            style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
          />
        </motion.div>
      )}

      {/* Friends List */}
      {activeTab === 'friends' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl overflow-hidden"
          style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
        >
          {filteredFriends.map((friend, i) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between px-5 py-4 transition-colors"
              style={{
                borderBottom: i < filteredFriends.length - 1 ? '1px solid var(--border-color)' : 'none',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-tertiary)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={friend.avatar} alt={friend.username} className="w-10 h-10 rounded-full object-cover" />
                  <div
                    className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2"
                    style={{ backgroundColor: getStatusColor(friend.status), borderColor: 'var(--bg-secondary)' }}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{friend.username}</p>
                  <p className="text-xs capitalize" style={{ color: 'var(--text-secondary)' }}>
                    {friend.status === 'online' ? 'Online' : friend.status === 'playing' ? 'In Game' : friend.lastSeen}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-primary)'; e.currentTarget.style.color = 'var(--accent-primary)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  <Swords size={16} />
                </button>
                <button
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--bg-primary)'; e.currentTarget.style.color = 'var(--accent-primary)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'var(--text-secondary)'; }}
                >
                  <MessageCircle size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Pending Requests */}
      {activeTab === 'pending' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
          {pendingRequests.map((req, i) => (
            <motion.div
              key={req.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center justify-between px-5 py-4 rounded-2xl"
              style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex items-center gap-3">
                <img src={req.avatar} alt={req.username} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{req.username}</p>
                  <p className="text-xs capitalize" style={{ color: 'var(--text-secondary)' }}>
                    {req.type} request
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {req.type === 'incoming' ? (
                  <>
                    <button
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium"
                      style={{ backgroundColor: 'var(--success)20', color: 'var(--success)' }}
                    >
                      <UserCheck size={14} />
                      Accept
                    </button>
                    <button
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium"
                      style={{ backgroundColor: 'var(--danger)20', color: 'var(--danger)' }}
                    >
                      <UserX size={14} />
                      Decline
                    </button>
                  </>
                ) : (
                  <button
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium"
                    style={{ backgroundColor: 'var(--danger)20', color: 'var(--danger)' }}
                  >
                    <X size={14} />
                    Cancel
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Add Friend */}
      {activeTab === 'add' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="relative">
            <UserPlus size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-secondary)' }} />
            <input
              type="text"
              placeholder="Search by username..."
              className="w-full pl-12 pr-4 py-3 rounded-xl text-sm outline-none"
              style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
            />
          </div>
          <div
            className="rounded-2xl p-8 text-center"
            style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}
          >
            <Search size={32} className="mx-auto mb-3" style={{ color: 'var(--text-secondary)' }} />
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Enter a username to find and add friends
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

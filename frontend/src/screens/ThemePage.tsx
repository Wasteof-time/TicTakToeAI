"use client";

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useThemeStore } from '@/store/themeStore';
import type { Theme } from '@/types';

const themes: { id: Theme; name: string; description: string; preview: string }[] = [
  {
    id: 'default',
    name: 'Dark Futuristic',
    description: 'The classic neon cyberpunk experience with cyan and magenta accents',
    preview: '/images/theme_default.jpg',
  },
  {
    id: 'crimson',
    name: 'Crimson',
    description: 'Blood-red intensity for those who seek power and dominance',
    preview: '/images/theme_crimson.jpg',
  },
  {
    id: 'luxury',
    name: 'Luxury',
    description: 'Elegant gold and lavender on deep forest green',
    preview: '/images/theme_luxury.jpg',
  },
];

export default function ThemePage() {
  const { currentTheme, setTheme } = useThemeStore();

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Orbitron' }}>
          Select Theme
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Customize your gaming experience
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {themes.map((theme, i) => {
          const isActive = currentTheme === theme.id;
          return (
            <motion.button
              key={theme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              onClick={() => setTheme(theme.id)}
              className="relative rounded-2xl overflow-hidden text-left transition-all duration-300 group"
              style={{
                border: `2px solid ${isActive ? 'var(--accent-primary)' : 'var(--border-color)'}`,
              }}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              {/* Active Badge */}
              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--accent-primary)' }}
                >
                  <Check size={16} style={{ color: 'var(--bg-primary)' }} />
                </motion.div>
              )}

              {/* Preview Image */}
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={theme.preview}
                  alt={theme.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, var(--bg-secondary) 0%, transparent 50%)',
                  }}
                />
              </div>

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3
                  className="text-lg font-bold mb-1"
                  style={{ fontFamily: 'Orbitron', color: 'var(--text-primary)' }}
                >
                  {theme.name}
                </h3>
                <p className="text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>
                  {theme.description}
                </p>
                <div
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-medium transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                    color: isActive ? 'var(--bg-primary)' : 'var(--text-secondary)',
                    border: `1px solid ${isActive ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                  }}
                >
                  {isActive ? 'Selected' : 'Select'}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

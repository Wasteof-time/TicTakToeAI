"use client";

import { motion } from 'framer-motion';

interface SymbolOProps {
  isWinning?: boolean;
}

export default function SymbolO({ isWinning = false }: SymbolOProps) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="w-full h-full"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        duration: 0.3,
      }}
    >
      <motion.circle
        cx="50"
        cy="50"
        r="32"
        fill="none"
        stroke="var(--accent-secondary)"
        strokeWidth="8"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.35 }}
        style={{
          filter: isWinning
            ? 'drop-shadow(0 0 12px var(--accent-secondary)) drop-shadow(0 0 24px var(--accent-secondary))'
            : 'drop-shadow(0 0 6px var(--accent-secondary))',
        }}
      />
    </motion.svg>
  );
}

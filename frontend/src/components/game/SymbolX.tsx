"use client";

import { motion } from 'framer-motion';

interface SymbolXProps {
  isWinning?: boolean;
}

export default function SymbolX({ isWinning = false }: SymbolXProps) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className="w-full h-full"
      initial={{ scale: 0, rotate: -45 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        duration: 0.3,
      }}
    >
      <motion.line
        x1="20"
        y1="20"
        x2="80"
        y2="80"
        stroke="var(--accent-primary)"
        strokeWidth="8"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.2, delay: 0.05 }}
        style={{
          filter: isWinning
            ? 'drop-shadow(0 0 12px var(--accent-primary)) drop-shadow(0 0 24px var(--accent-primary))'
            : 'drop-shadow(0 0 6px var(--accent-primary))',
        }}
      />
      <motion.line
        x1="80"
        y1="20"
        x2="20"
        y2="80"
        stroke="var(--accent-primary)"
        strokeWidth="8"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.2, delay: 0.15 }}
        style={{
          filter: isWinning
            ? 'drop-shadow(0 0 12px var(--accent-primary)) drop-shadow(0 0 24px var(--accent-primary))'
            : 'drop-shadow(0 0 6px var(--accent-primary))',
        }}
      />
    </motion.svg>
  );
}

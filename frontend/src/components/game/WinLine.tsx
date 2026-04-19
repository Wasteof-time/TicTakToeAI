"use client";

import { motion } from 'framer-motion';

interface WinLineProps {
  pattern: number[];
}

export default function WinLine({ pattern }: WinLineProps) {
  const getLineCoords = () => {
    const [a, , c] = pattern;
    const rowA = Math.floor(a / 3);
    const colA = a % 3;
    const rowC = Math.floor(c / 3);
    const colC = c % 3;

    const x1 = colA * 33.33 + 16.67;
    const y1 = rowA * 33.33 + 16.67;
    const x2 = colC * 33.33 + 16.67;
    const y2 = rowC * 33.33 + 16.67;

    return { x1, y1, x2, y2 };
  };

  const coords = getLineCoords();

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      <motion.line
        x1={coords.x1}
        y1={coords.y1}
        x2={coords.x2}
        y2={coords.y2}
        stroke="#FFFFFF"
        strokeWidth="3"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{
          filter: 'drop-shadow(0 0 8px #FFFFFF) drop-shadow(0 0 16px #FFFFFF)',
        }}
      />
    </svg>
  );
}

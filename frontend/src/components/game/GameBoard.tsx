"use client";

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import SymbolX from './SymbolX';
import SymbolO from './SymbolO';
import WinLine from './WinLine';
import { useGameStore } from '@/store/gameStore';

export default function GameBoard() {
  const { board, makeMove, makeAIMove, currentPlayer, status, winningLine } =
    useGameStore();

  useEffect(() => {
    if (currentPlayer === 'O' && status === 'playing') {
      makeAIMove();
    }
  }, [currentPlayer, status, makeAIMove]);

  const handleCellClick = (index: number) => {
    if (status !== 'playing' || currentPlayer !== 'X') return;
    makeMove(index);
  };

  return (
    <div className="relative w-full max-w-[420px] mx-auto aspect-square">
      {/* Grid Container */}
      <div
        className="relative w-full h-full rounded-2xl p-4"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
        }}
      >
        {/* Grid Lines - CSS Grid */}
        <div className="grid grid-cols-3 grid-rows-3 gap-1 w-full h-full">
          {board.map((cell, index) => {
            const isWinningCell = winningLine?.includes(index);
            return (
              <motion.button
                key={index}
                onClick={() => handleCellClick(index)}
                className="relative flex items-center justify-center rounded-xl transition-all duration-200"
                style={{
                  backgroundColor: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-color)',
                }}
                whileHover={
                  cell === null && status === 'playing' && currentPlayer === 'X'
                    ? {
                        scale: 1.03,
                        borderColor: 'var(--accent-primary)',
                        boxShadow: 'var(--glow-primary)',
                      }
                    : {}
                }
                whileTap={
                  cell === null && status === 'playing' && currentPlayer === 'X'
                    ? { scale: 0.97 }
                    : {}
                }
                disabled={
                  cell !== null || status !== 'playing' || currentPlayer !== 'X'
                }
              >
                {cell === 'X' && (
                  <div className="w-3/5 h-3/5">
                    <SymbolX isWinning={isWinningCell} />
                  </div>
                )}
                {cell === 'O' && (
                  <div className="w-3/5 h-3/5">
                    <SymbolO isWinning={isWinningCell} />
                  </div>
                )}
                {cell === null &&
                  status === 'playing' &&
                  currentPlayer === 'X' && (
                    <div
                      className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
                      style={{
                        backgroundColor: 'var(--accent-primary)',
                        opacity: 0.05,
                      }}
                    />
                  )}
              </motion.button>
            );
          })}
        </div>

        {/* Win Line Overlay */}
        {winningLine && <WinLine pattern={winningLine} />}
      </div>
    </div>
  );
}

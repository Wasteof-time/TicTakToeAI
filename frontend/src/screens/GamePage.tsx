"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, LogOut } from 'lucide-react';
import GameBoard from '@/components/game/GameBoard';
import { useGameStore } from '@/store/gameStore';
import type { Difficulty } from '@/types';

export default function GamePage() {
  const router = useRouter();
  const {
    status,
    winner,
    scores,
    moves,
    difficulty,
    currentPlayer,
    resetGame,
    setDifficulty,
    startGame,
  } = useGameStore();

  useEffect(() => {
    if (status === 'menu') {
      startGame();
    }
  }, [status, startGame]);

  const getResultText = () => {
    if (winner === 'X') return { text: 'VICTORY', color: 'var(--success)' };
    if (winner === 'O') return { text: 'DEFEAT', color: 'var(--danger)' };
    return { text: 'DRAW', color: 'var(--warning)' };
  };

  const result = getResultText();

  return (
    <div className="max-w-2xl mx-auto py-4">
      {/* Player Info Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6 px-2"
      >
        {/* Player */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-lg font-bold"
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--bg-primary)',
              boxShadow: '0 0 15px var(--accent-primary)',
            }}
          >
            X
          </div>
          <div>
            <p
              className="text-sm font-semibold"
              style={{ color: 'var(--accent-primary)' }}
            >
              YOU
            </p>
            <p
              className="text-xs font-mono"
              style={{ color: 'var(--text-secondary)' }}
            >
              {scores.player} wins
            </p>
          </div>
        </div>

        {/* VS + Turn Indicator */}
        <div className="text-center">
          <motion.div
            className="px-4 py-1.5 rounded-full text-xs font-bold"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
            }}
            animate={{
              borderColor:
                currentPlayer === 'X'
                  ? 'var(--accent-primary)'
                  : 'var(--accent-secondary)',
              color:
                currentPlayer === 'X'
                  ? 'var(--accent-primary)'
                  : 'var(--accent-secondary)',
            }}
            transition={{ duration: 0.3 }}
          >
            {status === 'playing'
              ? `${currentPlayer === 'X' ? 'YOUR' : "AI's"} TURN`
              : 'GAME OVER'}
          </motion.div>
        </div>

        {/* AI */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p
              className="text-sm font-semibold"
              style={{ color: 'var(--accent-secondary)' }}
            >
              AI
            </p>
            <p
              className="text-xs font-mono"
              style={{ color: 'var(--text-secondary)' }}
            >
              {scores.ai} wins
            </p>
          </div>
          <div
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center overflow-hidden"
            style={{
              border: '2px solid var(--accent-secondary)',
              boxShadow: '0 0 15px var(--accent-secondary)',
            }}
          >
            <img
              src="/images/robot_ai.png"
              alt="AI"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </motion.div>

      {/* Difficulty Selector */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center mb-4"
      >
        <div
          className="inline-flex rounded-xl p-1"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
          }}
        >
          {(['easy', 'medium', 'hard'] as Difficulty[]).map((level) => (
            <button
              key={level}
              onClick={() => setDifficulty(level)}
              className="px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 capitalize"
              style={{
                backgroundColor:
                  difficulty === level ? 'var(--accent-primary)' : 'transparent',
                color:
                  difficulty === level
                    ? 'var(--bg-primary)'
                    : 'var(--text-secondary)',
              }}
            >
              {level}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Game Board */}
      <GameBoard />

      {/* Game Controls */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center gap-3 mt-6"
      >
        <button
          onClick={resetGame}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
          }}
        >
          <RotateCcw size={16} />
          Restart
        </button>
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 hover:scale-[1.02]"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-secondary)',
          }}
        >
          <LogOut size={16} />
          Quit
        </button>
      </motion.div>

      {/* Game Over Modal */}
      <AnimatePresence>
        {status === 'ended' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="w-full max-w-sm rounded-3xl p-8 text-center"
              style={{
                backgroundColor: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
              }}
            >
              <motion.h2
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 15, delay: 0.1 }}
                className="text-4xl font-bold mb-2"
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  color: result.color,
                  textShadow: `0 0 20px ${result.color}`,
                }}
              >
                {result.text}
              </motion.h2>

              <div className="flex justify-center gap-8 my-6">
                <div>
                  <p
                    className="text-2xl font-bold font-mono"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {moves}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Moves
                  </p>
                </div>
                <div
                  className="w-px"
                  style={{ backgroundColor: 'var(--border-color)' }}
                />
                <div>
                  <p
                    className="text-2xl font-bold font-mono"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {scores.player}
                  </p>
                  <p
                    className="text-xs"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    Your Score
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={resetGame}
                  className="w-full py-3 rounded-xl font-medium text-sm transition-all duration-200 hover:scale-[1.02]"
                  style={{
                    backgroundColor: 'var(--accent-primary)',
                    color: 'var(--bg-primary)',
                  }}
                >
                  Play Again
                </button>
                <button
                  onClick={() => router.push('/')}
                  className="w-full py-3 rounded-xl text-sm font-medium transition-all duration-200"
                  style={{
                    color: 'var(--text-secondary)',
                  }}
                >
                  Back to Menu
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

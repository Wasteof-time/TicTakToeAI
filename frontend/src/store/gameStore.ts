import { create } from 'zustand';
import type { GameState, GameResult, Difficulty } from '@/types';

const initialBoard = Array(9).fill(null);

const createInitialState = (): GameState => ({
  board: [...initialBoard],
  currentPlayer: 'X',
  status: 'menu',
  winner: null,
  winningLine: null,
  scores: { player: 0, ai: 0, draws: 0 },
  moves: 0,
  difficulty: 'medium',
});

const WIN_PATTERNS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

function checkWinner(board: (string | null)[]): { winner: GameResult; line: number[] | null } {
  for (const pattern of WIN_PATTERNS) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a] as 'X' | 'O', line: pattern };
    }
  }
  if (board.every((cell) => cell !== null)) {
    return { winner: 'draw', line: null };
  }
  return { winner: null, line: null };
}

function minimax(board: (string | null)[], depth: number, isMaximizing: boolean, alpha: number, beta: number): number {
  const result = checkWinner(board);
  if (result.winner === 'O') return 10 - depth;
  if (result.winner === 'X') return depth - 10;
  if (result.winner === 'draw') return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        const score = minimax(board, depth + 1, false, alpha, beta);
        board[i] = null;
        bestScore = Math.max(bestScore, score);
        alpha = Math.max(alpha, score);
        if (beta <= alpha) break;
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'X';
        const score = minimax(board, depth + 1, true, alpha, beta);
        board[i] = null;
        bestScore = Math.min(bestScore, score);
        beta = Math.min(beta, score);
        if (beta <= alpha) break;
      }
    }
    return bestScore;
  }
}

function getAIMove(board: (string | null)[], difficulty: Difficulty): number {
  const availableSpots = board.reduce<number[]>((acc, cell, idx) => {
    if (cell === null) acc.push(idx);
    return acc;
  }, []);

  if (availableSpots.length === 0) return -1;

  if (difficulty === 'easy') {
    return availableSpots[Math.floor(Math.random() * availableSpots.length)];
  }

  if (difficulty === 'medium') {
    if (Math.random() < 0.4) {
      return availableSpots[Math.floor(Math.random() * availableSpots.length)];
    }
  }

  let bestScore = -Infinity;
  let bestMove = availableSpots[0];

  for (const spot of availableSpots) {
    board[spot] = 'O';
    const score = minimax(board, 0, false, -Infinity, Infinity);
    board[spot] = null;
    if (score > bestScore) {
      bestScore = score;
      bestMove = spot;
    }
  }

  return bestMove;
}

interface GameStore extends GameState {
  makeMove: (index: number) => void;
  makeAIMove: () => void;
  resetGame: () => void;
  setDifficulty: (difficulty: Difficulty) => void;
  startGame: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  ...createInitialState(),

  makeMove: (index: number) => {
    const state = get();
    if (state.status !== 'playing' || state.board[index] !== null || state.currentPlayer !== 'X') return;

    const newBoard = [...state.board];
    newBoard[index] = 'X';
    const newMoves = state.moves + 1;

    const result = checkWinner(newBoard);

    if (result.winner) {
      const newScores = { ...state.scores };
      if (result.winner === 'X') newScores.player += 1;
      else if (result.winner === 'draw') newScores.draws += 1;

      set({
        board: newBoard,
        currentPlayer: 'O',
        winner: result.winner,
        winningLine: result.line,
        status: 'ended',
        scores: newScores,
        moves: newMoves,
      });
    } else {
      set({
        board: newBoard,
        currentPlayer: 'O',
        moves: newMoves,
      });
    }
  },

  makeAIMove: () => {
    const state = get();
    if (state.status !== 'playing' || state.currentPlayer !== 'O') return;

    const boardCopy = [...state.board];
    const aiMove = getAIMove(boardCopy, state.difficulty);

    if (aiMove === -1) return;

    setTimeout(() => {
      const currentState = get();
      if (currentState.status !== 'playing') return;

      const newBoard = [...currentState.board];
      newBoard[aiMove] = 'O';
      const newMoves = currentState.moves + 1;

      const result = checkWinner(newBoard);

      if (result.winner) {
        const newScores = { ...currentState.scores };
        if (result.winner === 'O') newScores.ai += 1;
        else if (result.winner === 'draw') newScores.draws += 1;

        set({
          board: newBoard,
          currentPlayer: 'X',
          winner: result.winner,
          winningLine: result.line,
          status: 'ended',
          scores: newScores,
          moves: newMoves,
        });
      } else {
        set({
          board: newBoard,
          currentPlayer: 'X',
          moves: newMoves,
        });
      }
    }, 600);
  },

  resetGame: () => {
    const state = get();
    set({
      ...createInitialState(),
      scores: state.scores,
      difficulty: state.difficulty,
    });
  },

  setDifficulty: (difficulty: Difficulty) => {
    set({ difficulty });
  },

  startGame: () => {
    set({ status: 'playing' });
  },
}));

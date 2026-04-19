export type Theme = 'default' | 'crimson' | 'luxury';

export type GameSymbol = 'X' | 'O' | null;

export type GameStatus = 'menu' | 'playing' | 'paused' | 'ended';

export type GameResult = 'X' | 'O' | 'draw' | null;

export type Difficulty = 'easy' | 'medium' | 'hard';

export type MatchmakingStatus = 'idle' | 'searching' | 'found' | 'accepted';

export interface User {
  id: string;
  username: string;
  email: string;
  avatar?: string;
  isGuest: boolean;
}

export interface GameState {
  board: GameSymbol[];
  currentPlayer: 'X' | 'O';
  status: GameStatus;
  winner: GameResult;
  winningLine: number[] | null;
  scores: { player: number; ai: number; draws: number };
  moves: number;
  difficulty: Difficulty;
}

export interface Friend {
  id: string;
  username: string;
  avatar: string;
  status: 'online' | 'playing' | 'offline';
  lastSeen: string;
}

export interface Tournament {
  id: string;
  name: string;
  banner: string;
  prizePool: string;
  participants: number;
  maxParticipants: number;
  startTime: string;
  status: 'open' | 'ongoing' | 'completed';
}

export interface Event {
  id: string;
  title: string;
  description: string;
  banner: string;
  startDate: string;
  endDate: string;
  rewards: string[];
  status: 'active' | 'upcoming' | 'past';
  progress?: number;
}

export interface Clan {
  id: string;
  name: string;
  tag: string;
  description: string;
  banner: string;
  members: ClanMember[];
  totalWins: number;
  rank: number;
  xp: number;
}

export interface ClanMember {
  id: string;
  username: string;
  avatar: string;
  role: 'leader' | 'officer' | 'member';
  contribution: number;
  status: 'online' | 'offline';
}

export interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  wins: number;
  winRate: number;
  elo: number;
  isCurrentUser?: boolean;
}

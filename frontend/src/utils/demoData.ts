import type { Tournament, Event, Friend, Clan, LeaderboardEntry } from '@/types';

export const demoTournaments: Tournament[] = [
  {
    id: '1',
    name: 'Cyber Championship 2025',
    banner: '/images/tournament_banner.jpg',
    prizePool: '10,000 Credits',
    participants: 128,
    maxParticipants: 256,
    startTime: '2025-05-01T18:00:00',
    status: 'open',
  },
  {
    id: '2',
    name: 'Neon Weekly Cup',
    banner: '/images/tournament_banner.jpg',
    prizePool: '2,500 Credits',
    participants: 64,
    maxParticipants: 64,
    startTime: '2025-04-20T15:00:00',
    status: 'ongoing',
  },
  {
    id: '3',
    name: 'Masters Elite',
    banner: '/images/tournament_banner.jpg',
    prizePool: '50,000 Credits',
    participants: 32,
    maxParticipants: 32,
    startTime: '2025-06-01T12:00:00',
    status: 'open',
  },
  {
    id: '4',
    name: 'Spring Showdown',
    banner: '/images/tournament_banner.jpg',
    prizePool: '5,000 Credits',
    participants: 256,
    maxParticipants: 256,
    startTime: '2025-04-15T10:00:00',
    status: 'completed',
  },
];

export const demoEvents: Event[] = [
  {
    id: '1',
    title: 'Neon Nights Festival',
    description: 'A week-long celebration with double XP, special rewards, and exclusive skins. Complete daily challenges to earn Neon Tokens.',
    banner: '/images/event_banner.jpg',
    startDate: '2025-04-20T00:00:00',
    endDate: '2025-04-27T23:59:59',
    rewards: ['Neon Avatar Frame', '2,000 Credits', 'Exclusive X Skin'],
    status: 'active',
    progress: 65,
  },
  {
    id: '2',
    title: 'Strategy Masters Challenge',
    description: 'Test your skills in a series of increasingly difficult AI matches. Beat the Grandmaster AI to win the ultimate prize.',
    banner: '/images/event_banner.jpg',
    startDate: '2025-05-01T00:00:00',
    endDate: '2025-05-10T23:59:59',
    rewards: ['Master Title', '5,000 Credits', 'Legendary Banner'],
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'Community Clash',
    description: 'Team up with your clan to compete against others in massive tournaments. The top 3 clans win exclusive rewards.',
    banner: '/images/event_banner.jpg',
    startDate: '2025-03-01T00:00:00',
    endDate: '2025-03-15T23:59:59',
    rewards: ['Clan Trophy', '10,000 Credits', 'Clan Banner'],
    status: 'past',
  },
];

export const demoFriends: Friend[] = [
  {
    id: '1',
    username: 'NeonStriker',
    avatar: '/images/default_avatar.png',
    status: 'online',
    lastSeen: 'Now',
  },
  {
    id: '2',
    username: 'GridMaster99',
    avatar: '/images/default_avatar.png',
    status: 'playing',
    lastSeen: 'Now',
  },
  {
    id: '3',
    username: 'CyberWolf',
    avatar: '/images/default_avatar.png',
    status: 'online',
    lastSeen: 'Now',
  },
  {
    id: '4',
    username: 'PixelQueen',
    avatar: '/images/default_avatar.png',
    status: 'offline',
    lastSeen: '2h ago',
  },
  {
    id: '5',
    username: 'TacticalTom',
    avatar: '/images/default_avatar.png',
    status: 'offline',
    lastSeen: '1d ago',
  },
  {
    id: '6',
    username: 'GlitchHunter',
    avatar: '/images/default_avatar.png',
    status: 'online',
    lastSeen: 'Now',
  },
];

export const demoClan: Clan = {
  id: '1',
  name: 'Neon Legion',
  tag: 'NL',
  description: 'Elite competitive clan focused on tournament domination and strategic excellence.',
  banner: '/images/bg_menu.jpg',
  members: [
    { id: '1', username: 'NeonStriker', avatar: '/images/default_avatar.png', role: 'leader', contribution: 15420, status: 'online' },
    { id: '2', username: 'GridMaster99', avatar: '/images/default_avatar.png', role: 'officer', contribution: 12300, status: 'online' },
    { id: '3', username: 'CyberWolf', avatar: '/images/default_avatar.png', role: 'officer', contribution: 9800, status: 'online' },
    { id: '4', username: 'PixelQueen', avatar: '/images/default_avatar.png', role: 'member', contribution: 5600, status: 'offline' },
    { id: '5', username: 'TacticalTom', avatar: '/images/default_avatar.png', role: 'member', contribution: 4200, status: 'offline' },
  ],
  totalWins: 342,
  rank: 7,
  xp: 45200,
};

export const demoLeaderboard: LeaderboardEntry[] = [
  { rank: 1, username: 'GridMaster99', avatar: '/images/default_avatar.png', wins: 342, winRate: 87.5, elo: 2847 },
  { rank: 2, username: 'NeonStriker', avatar: '/images/default_avatar.png', wins: 315, winRate: 82.1, elo: 2712 },
  { rank: 3, username: 'CyberWolf', avatar: '/images/default_avatar.png', wins: 298, winRate: 79.8, elo: 2650 },
  { rank: 4, username: 'PixelQueen', avatar: '/images/default_avatar.png', wins: 276, winRate: 76.3, elo: 2510 },
  { rank: 5, username: 'TacticalTom', avatar: '/images/default_avatar.png', wins: 254, winRate: 73.2, elo: 2420 },
  { rank: 6, username: 'GlitchHunter', avatar: '/images/default_avatar.png', wins: 241, winRate: 71.5, elo: 2380 },
  { rank: 7, username: 'You', avatar: '/images/default_avatar.png', wins: 198, winRate: 68.4, elo: 2150, isCurrentUser: true },
  { rank: 8, username: 'ShadowPlay', avatar: '/images/default_avatar.png', wins: 187, winRate: 65.1, elo: 2080 },
  { rank: 9, username: 'DataStream', avatar: '/images/default_avatar.png', wins: 176, winRate: 62.8, elo: 2010 },
  { rank: 10, username: 'CodeBreaker', avatar: '/images/default_avatar.png', wins: 165, winRate: 60.5, elo: 1950 },
];

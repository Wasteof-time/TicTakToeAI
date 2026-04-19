import { create } from 'zustand';
import type { MatchmakingStatus } from '@/types';

interface UIState {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  matchmakingStatus: MatchmakingStatus;
  setMatchmakingStatus: (status: MatchmakingStatus) => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpen: false,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  matchmakingStatus: 'idle',
  setMatchmakingStatus: (status) => set({ matchmakingStatus: status }),
}));

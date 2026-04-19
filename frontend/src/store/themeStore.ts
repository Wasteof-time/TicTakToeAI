import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Theme } from '@/types';

interface ThemeState {
  currentTheme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      currentTheme: 'default',
      setTheme: (theme) => {
        set({ currentTheme: theme });
        if (typeof document !== 'undefined') {
          document.body.className = `theme-${theme}`;
        }
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);

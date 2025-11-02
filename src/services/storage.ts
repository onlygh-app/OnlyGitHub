import { SidebarPosition } from '../types';

const STORAGE_KEYS = {
  TOKEN: 'githubToken',
  SIDEBAR_WIDTH: 'sidebarWidth',
  SIDEBAR_POSITION: 'sidebarPosition',
} as const;

export const storageService = {
  // Token operations
  getToken: (): string | null => {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },

  setToken: (token: string): void => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  },

  removeToken: (): void => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  },

  // Sidebar width operations
  getSidebarWidth: (defaultWidth: number = 260): number => {
    const saved = localStorage.getItem(STORAGE_KEYS.SIDEBAR_WIDTH);
    return saved ? parseInt(saved, 10) : defaultWidth;
  },

  setSidebarWidth: (width: number): void => {
    localStorage.setItem(STORAGE_KEYS.SIDEBAR_WIDTH, width.toString());
  },

  // Sidebar position operations
  getSidebarPosition: (defaultPosition: SidebarPosition = 'left'): SidebarPosition => {
    const saved = localStorage.getItem(STORAGE_KEYS.SIDEBAR_POSITION) as SidebarPosition;
    return saved || defaultPosition;
  },

  setSidebarPosition: (position: SidebarPosition): void => {
    localStorage.setItem(STORAGE_KEYS.SIDEBAR_POSITION, position);
  },
};

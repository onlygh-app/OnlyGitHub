import { Repository, User } from '../types';

declare global {
  interface Window {
    electron: {
      github: {
        fetchExploreRepos: (token: string, page: number) => Promise<Repository[]>;
        fetchTrendingRepos: (token: string, page: number) => Promise<Repository[]>;
        fetchUserInfo: (token: string) => Promise<User>;
        fetchUserRepos: (token: string, page: number) => Promise<Repository[]>;
      };
    };
  }
}

export const githubService = {
  fetchExploreRepos: async (token: string, page: number = 1): Promise<Repository[]> => {
    try {
      const repos = await window.electron.github.fetchExploreRepos(token, page);
      return repos;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Null Error');
    }
  },

  fetchTrendingRepos: async (token: string, page: number = 1): Promise<Repository[]> => {
    try {
      const repos = await window.electron.github.fetchTrendingRepos(token, page);
      return repos;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Null Error');
    }
  },

  fetchUserInfo: async (token: string): Promise<User> => {
    try {
      const user = await window.electron.github.fetchUserInfo(token);
      return user;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Null Error');
    }
  },

  fetchUserRepos: async (token: string, page: number = 1): Promise<Repository[]> => {
    try {
      const repos = await window.electron.github.fetchUserRepos(token, page);
      return repos;
    } catch (err) {
      throw err instanceof Error ? err : new Error('Null Error');
    }
  },
};

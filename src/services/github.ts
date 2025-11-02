import { Repository } from '../types';

declare global {
  interface Window {
    electron: {
      github: {
        fetchExploreRepos: (token: string) => Promise<Repository[]>;
        fetchTrendingRepos: (token: string) => Promise<Repository[]>;
      };
    };
  }
}

export const githubService = {
  fetchExploreRepos: async (token: string): Promise<Repository[]> => {
    try {
      const repos = await window.electron.github.fetchExploreRepos(token);
      return repos;
    } catch (err) {
      throw err instanceof Error ? err : new Error('未知错误');
    }
  },

  fetchTrendingRepos: async (token: string): Promise<Repository[]> => {
    try {
      const repos = await window.electron.github.fetchTrendingRepos(token);
      return repos;
    } catch (err) {
      throw err instanceof Error ? err : new Error('未知错误');
    }
  },
};

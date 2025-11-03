import { ipcMain } from 'electron';
import { Repository } from '../types';

const transformRepoData = (repo: any): Repository => ({
  id: repo.id,
  name: repo.name,
  full_name: repo.full_name,
  description: repo.description || 'No description',
  url: repo.html_url,
  stars: repo.stargazers_count,
  language: repo.language || 'Unknown',
  owner: {
    login: repo.owner.login,
    avatar_url: repo.owner.avatar_url,
    profile_url: repo.owner.html_url,
  },
});

const fetchWithTimeout = async (url: string, options: RequestInit, timeoutMs: number = 10000): Promise<Response> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeout);
  }
};

export const setupGitHubIPCHandlers = (): void => {
  ipcMain.handle('fetch-explore-repos', async (_event, token: string, page: number = 1) => {
    try {
      if (!token || token.trim() === '') {
        throw new Error('GitHub Token is required');
      }

      // 每次请求都生成随机参数
      const randomStars = Math.floor(Math.random() * 8000) + 50; // 随机50-8000
      const orders = ['asc', 'desc'];
      const sorts = ['stars', 'updated', 'forks', 'watchers'];
      const randomOrder = orders[Math.floor(Math.random() * orders.length)];
      const randomSort = sorts[Math.floor(Math.random() * sorts.length)];

      // 随机的时间范围也能增加多样性
      const randomYear = Math.floor(Math.random() * 5) + 2019;
      const randomMonth = Math.floor(Math.random() * 12) + 1;

      const url = `https://api.github.com/search/repositories?q=stars:%3E${randomStars}+created:%3E${randomYear}-${String(randomMonth).padStart(2, '0')}-01&sort=${randomSort}&order=${randomOrder}&per_page=30&page=${page}`;

      const response = await fetchWithTimeout(url, {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'OnlyGitHub-Electron',
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`GitHub API error (${response.status}): ${errorData}`);
      }

      const data = await response.json();
      if (!data.items || !Array.isArray(data.items)) {
        throw new Error('Invalid API response format');
      }

      return data.items.map(transformRepoData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('fetch-explore-repos error:', errorMessage);
      throw new Error(errorMessage);
    }
  });

  ipcMain.handle('fetch-trending-repos', async (_event, token: string, page: number = 1) => {
    try {
      if (!token || token.trim() === '') {
        throw new Error('GitHub Token is required');
      }

      const url = `https://api.github.com/search/repositories?q=stars:%3E500+created:%3E2025-10-01&sort=updated&order=desc&per_page=30&page=${page}`;

      const response = await fetchWithTimeout(url, {
        headers: {
          'Authorization': `token ${token}`,
          'Accept': 'application/vnd.github.v3+json',
          'User-Agent': 'Mozilla/5.0 OnlyGitHub/1.2.3',
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`GitHub API error (${response.status}): ${errorData}`);
      }

      const data = await response.json();
      if (!data.items || !Array.isArray(data.items)) {
        throw new Error('Invalid API response format');
      }

      return data.items.map(transformRepoData);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      console.error('fetch-trending-repos error:', errorMessage);
      throw new Error(errorMessage);
    }
  });
};

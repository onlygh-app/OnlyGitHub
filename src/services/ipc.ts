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

export const setupGitHubIPCHandlers = (): void => {
  ipcMain.handle('fetch-explore-repos', async (_event, token: string, page: number = 1) => {
    try {
      // 每次请求都生成随机参数
      const randomStars = Math.floor(Math.random() * 8000) + 50; // 随机50-8000
      const orders = ['asc', 'desc'];
      const sorts = ['stars', 'updated', 'forks', 'watchers'];
      const randomOrder = orders[Math.floor(Math.random() * orders.length)];
      const randomSort = sorts[Math.floor(Math.random() * sorts.length)];
      
      // 随机的时间范围也能增加多样性
      const randomYear = Math.floor(Math.random() * 5) + 2019; // 2019
      const randomMonth = Math.floor(Math.random() * 12) + 1;

      const response = await fetch(
        `https://api.github.com/search/repositories?q=stars:%3E${randomStars}+created:%3E${randomYear}-${String(randomMonth).padStart(2, '0')}-01&sort=${randomSort}&order=${randomOrder}&per_page=50&page=${page}`,
        {
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`GitHub API error (${response.status}): ${errorData}`);
      }

      const data = await response.json();
      return data.items.map(transformRepoData);
    } catch (err) {
      throw err instanceof Error ? err : new Error('Unknown error');
    }
  });

  ipcMain.handle('fetch-trending-repos', async (_event, token: string, page: number = 1) => {
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=stars:%3E500+created:%3E2025-10-01&sort=updated&order=desc&per_page=15&page=${page}`,
        {
          headers: {
            'Authorization': `token ${token}`,
            'Accept': 'application/vnd.github.v3+json',
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`GitHub API error (${response.status}): ${errorData}`);
      }

      const data = await response.json();
      return data.items.map(transformRepoData);
    } catch (err) {
      throw err instanceof Error ? err : new Error('Unknown error');
    }
  });
};

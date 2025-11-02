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
  ipcMain.handle('fetch-explore-repos', async (_event, token: string) => {
    try {
      const response = await fetch(
        'https://api.github.com/search/repositories?q=stars:%3E1000&sort=stars&order=desc&per_page=10',
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

  ipcMain.handle('fetch-trending-repos', async (_event, token: string) => {
    try {
      const response = await fetch(
        'https://api.github.com/search/repositories?q=stars:%3E500+created:%3E2025-10-01&sort=updated&order=desc&per_page=10',
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

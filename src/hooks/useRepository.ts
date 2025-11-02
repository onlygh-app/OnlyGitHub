import { useState, useCallback } from 'react';
import { Repository, PageType } from '../types';
import { githubService } from '../services/github';

export const useRepository = () => {
  const [explore, setExplore] = useState<Repository[]>([]);
  const [trending, setTrending] = useState<Repository[]>([]);
  const [currentPage, setCurrentPage] = useState<PageType>('explore');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const fetchRepositories = useCallback(async (authToken: string) => {
    setLoading(true);
    setError('');
    try {
      const [exploreRepos, trendingRepos] = await Promise.all([
        githubService.fetchExploreRepos(authToken),
        githubService.fetchTrendingRepos(authToken),
      ]);
      setExplore(exploreRepos);
      setTrending(trendingRepos);
    } catch (err) {
      setError(err instanceof Error ? err.message : '发生错误');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearRepositories = useCallback(() => {
    setExplore([]);
    setTrending([]);
    setCurrentPage('explore');
  }, []);

  const getCurrentData = useCallback(() => {
    return currentPage === 'explore' ? explore : trending;
  }, [currentPage, explore, trending]);

  const getPageInfo = useCallback(() => {
    return {
      title: currentPage === 'explore' ? 'Explore' : 'Trending',
      subtitle: currentPage === 'explore' ? 'Popular repositories' : 'Trending repositories',
    };
  }, [currentPage]);

  return {
    explore,
    trending,
    currentPage,
    setCurrentPage,
    loading,
    error,
    fetchRepositories,
    clearRepositories,
    getCurrentData,
    getPageInfo,
  };
};

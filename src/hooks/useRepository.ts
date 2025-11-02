import { useState, useCallback } from 'react';
import { Repository, PageType } from '../types';
import { githubService } from '../services/github';

export const useRepository = () => {
  const [explore, setExplore] = useState<Repository[]>([]);
  const [trending, setTrending] = useState<Repository[]>([]);
  const [currentPage, setCurrentPage] = useState<PageType>('explore');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [explorePage, setExplorePage] = useState<number>(1);
  const [trendingPage, setTrendingPage] = useState<number>(1);
  const [authToken, setAuthToken] = useState<string>('');

  const fetchRepositories = useCallback(async (token: string) => {
    setAuthToken(token);
    setLoading(true);
    setError('');
    setExplorePage(1);
    setTrendingPage(1);
    try {
      const [exploreRepos, trendingRepos] = await Promise.all([
        githubService.fetchExploreRepos(token, 1),
        githubService.fetchTrendingRepos(token, 1),
      ]);
      setExplore(exploreRepos);
      setTrending(trendingRepos);
    } catch (err) {
      setError(err instanceof Error ? err.message : '发生错误');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (loading || !authToken) return;

    try {
      setLoading(true);
      if (currentPage === 'explore') {
        const nextPage = explorePage + 1;
        const moreRepos = await githubService.fetchExploreRepos(authToken, nextPage);
        setExplore(prev => [...prev, ...moreRepos]);
        setExplorePage(nextPage);
      } else {
        const nextPage = trendingPage + 1;
        const moreRepos = await githubService.fetchTrendingRepos(authToken, nextPage);
        setTrending(prev => [...prev, ...moreRepos]);
        setTrendingPage(nextPage);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载失败');
    } finally {
      setLoading(false);
    }
  }, [currentPage, explorePage, trendingPage, authToken, loading]);

  const clearRepositories = useCallback(() => {
    setExplore([]);
    setTrending([]);
    setCurrentPage('explore');
    setExplorePage(1);
    setTrendingPage(1);
    setAuthToken('');
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
    loadMore,
  };
};

import { useState, useCallback } from 'react';
import { Repository, PageType, User } from '../types';
import { githubService } from '../services/github';

export const useRepository = () => {
  const [explore, setExplore] = useState<Repository[]>([]);
  const [trending, setTrending] = useState<Repository[]>([]);
  const [userRepos, setUserRepos] = useState<Repository[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [currentPage, setCurrentPage] = useState<PageType>('explore');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [explorePage, setExplorePage] = useState<number>(1);
  const [trendingPage, setTrendingPage] = useState<number>(1);
  const [userReposPage, setUserReposPage] = useState<number>(1);
  const [authToken, setAuthToken] = useState<string>('');

  const fetchRepositories = useCallback(async (token: string) => {
    setAuthToken(token);
    setLoading(true);
    setError('');
    setExplorePage(1);
    setTrendingPage(1);
    setUserReposPage(1);
    try {
      const [exploreRepos, trendingRepos, userInfo, repos] = await Promise.all([
        githubService.fetchExploreRepos(token, 1),
        githubService.fetchTrendingRepos(token, 1),
        githubService.fetchUserInfo(token),
        githubService.fetchUserRepos(token, 1),
      ]);
      setExplore(exploreRepos);
      setTrending(trendingRepos);
      setUser(userInfo);
      setUserRepos(repos);
    } catch (err) {
      setError(err instanceof Error ? err.message : '发生错误');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchUserInfo = useCallback(async (token: string) => {
    try {
      setLoading(true);
      const userInfo = await githubService.fetchUserInfo(token);
      setUser(userInfo);
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载用户信息失败');
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
      } else if (currentPage === 'my') {
        const nextPage = userReposPage + 1;
        const moreRepos = await githubService.fetchUserRepos(authToken, nextPage);
        setUserRepos(prev => [...prev, ...moreRepos]);
        setUserReposPage(nextPage);
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
  }, [currentPage, explorePage, trendingPage, userReposPage, authToken, loading]);

  const clearRepositories = useCallback(() => {
    setExplore([]);
    setTrending([]);
    setUserRepos([]);
    setUser(null);
    setCurrentPage('explore');
    setExplorePage(1);
    setTrendingPage(1);
    setUserReposPage(1);
    setAuthToken('');
  }, []);

  const getCurrentData = useCallback(() => {
    if (currentPage === 'explore') return explore;
    if (currentPage === 'my') return userRepos;
    return trending;
  }, [currentPage, explore, trending, userRepos]);

  const getPageInfo = useCallback(() => {
    return {
      title: currentPage === 'explore' ? 'Explore' : 'Trending',
      subtitle: currentPage === 'explore' ? 'Popular repositories' : 'Trending repositories',
    };
  }, [currentPage]);

  return {
    explore,
    trending,
    userRepos,
    user,
    currentPage,
    setCurrentPage,
    loading,
    error,
    setError,
    fetchRepositories,
    fetchUserInfo,
    clearRepositories,
    getCurrentData,
    getPageInfo,
    loadMore,
  };
};

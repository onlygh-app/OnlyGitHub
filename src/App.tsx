import React, { useEffect, useCallback, useRef, useMemo } from 'react';
import { CssBaseline, Box, ThemeProvider } from '@mui/material';
import { LoginCard, Sidebar, MainContent, AppHeader, StatusBar } from './components';
import { useAuth, useRepository, useSidebar } from './hooks';
import darkTheme from './theme';

export const App: React.FC = () => {
  const auth = useAuth();
  const repo = useRepository();
  const sidebar = useSidebar();
  const handleMouseUpRef = useRef<(() => void) | null>(null);

  handleMouseUpRef.current = () => {
    sidebar.handleMouseUp();
  };

  useEffect(() => {
    auth.initAuth();
    sidebar.initSidebar();
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated && auth.tempToken) {
      repo.fetchRepositories(auth.tempToken);
    }
  }, [auth.isAuthenticated, auth.tempToken]);

  useEffect(() => {
    const handleMouseUp = () => {
      if (handleMouseUpRef.current) {
        handleMouseUpRef.current();
      }
    };
    document.addEventListener('mouseup', handleMouseUp);
    return () => document.removeEventListener('mouseup', handleMouseUp);
  }, []);

  useEffect(() => {
    const flexDir = sidebar.sidebarPosition === 'right' ? 'row-reverse' : 'row';
    document.documentElement.style.setProperty('--flex-direction', flexDir);
  }, [sidebar.sidebarPosition]);

  const handleTokenSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (auth.login(auth.tempToken)) {
      repo.fetchRepositories(auth.tempToken);
    }
  }, [auth, repo]);

  const handleLogout = useCallback(() => {
    auth.logout();
    repo.clearRepositories();
  }, [auth, repo]);

  const currentData = repo.getCurrentData();
  const pageInfo = repo.getPageInfo();

  const sidebarProps = useMemo(
    () => ({
      width: sidebar.sidebarWidth,
      position: sidebar.sidebarPosition,
      currentPage: repo.currentPage,
      pageTitle: pageInfo.title,
      isResizing: sidebar.isResizing,
      onMouseDown: sidebar.handleMouseDown,
      onPageChange: repo.setCurrentPage,
      onTogglePosition: sidebar.togglePosition,
      onLogout: handleLogout,
      onSidebarResize: sidebar.setSidebarWidth,
    }),
    [
      sidebar.sidebarWidth,
      sidebar.sidebarPosition,
      repo.currentPage,
      pageInfo.title,
      sidebar.isResizing,
      sidebar.handleMouseDown,
      repo.setCurrentPage,
      sidebar.togglePosition,
      handleLogout,
      sidebar.setSidebarWidth,
    ]
  );

  const mainContentProps = useMemo(
    () => ({
      repositories: currentData,
      loading: repo.loading,
      error: repo.error,
      onLoadMore: repo.loadMore,
      currentPage: repo.currentPage,
      onErrorClear: () => repo.setError(''),
    }),
    [currentData, repo.loading, repo.error, repo.loadMore, repo.currentPage]
  );

  if (!auth.isAuthenticated) {
    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <LoginCard
          token={auth.tempToken}
          error={auth.error}
          onTokenChange={auth.setTempToken}
          onSubmit={handleTokenSubmit}
          onErrorClear={() => auth.setError('')}
        />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
        }}
      >
        <AppHeader currentPage={repo.currentPage} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'var(--flex-direction)',
            flex: 1,
            minHeight: 0,
            userSelect: sidebar.isResizing ? 'none' : 'auto',
            WebkitUserSelect: sidebar.isResizing ? 'none' : 'auto',
          }}
        >
          <Sidebar
            {...sidebarProps}
          />

          <MainContent
            {...mainContentProps}
          />
        </Box>

        <StatusBar 
          currentPage={repo.currentPage}
          repositoryCount={currentData.length}
          loading={repo.loading}
        />
      </Box>
    </ThemeProvider>
  );
};

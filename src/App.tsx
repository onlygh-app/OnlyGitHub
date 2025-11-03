import React, { useEffect, useCallback } from 'react';
import { CssBaseline, Box, ThemeProvider, createTheme } from '@mui/material';
import { LoginCard, Sidebar, MainContent } from './components';
import { useAuth, useRepository, useSidebar } from './hooks';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#58a6ff',
    },
    secondary: {
      main: '#d2a8ff',
    },
    background: {
      default: '#0d1117',
      paper: '#161b22',
    },
    text: {
      primary: '#e6edf3',
      secondary: '#8b949e',
    },
    error: {
      main: '#f85149',
    },
    warning: {
      main: '#d29922',
    },
    success: {
      main: '#3fb950',
    },
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
  },
});

export const App: React.FC = () => {
  const auth = useAuth();
  const repo = useRepository();
  const sidebar = useSidebar();

  useEffect(() => {
    auth.initAuth();
    sidebar.initSidebar();
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated && auth.tempToken) {
      repo.fetchRepositories(auth.tempToken);
    }
  }, [auth.isAuthenticated, auth.tempToken]);

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

  const currentData = repo.getCurrentData();
  const pageInfo = repo.getPageInfo();

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box
        sx={{
          display: 'flex',
          flexDirection: sidebar.sidebarPosition === 'right' ? 'row-reverse' : 'row',
          width: '100%',
          height: '100%',
          backgroundColor: '#0d1117',
        }}
      >
        <Sidebar
          width={sidebar.sidebarWidth}
          position={sidebar.sidebarPosition}
          currentPage={repo.currentPage}
          pageTitle={pageInfo.title}
          isResizing={sidebar.isResizing}
          onMouseDown={sidebar.handleMouseDown}
          onPageChange={repo.setCurrentPage}
          onTogglePosition={sidebar.togglePosition}
          onLogout={handleLogout}
        />

        <MainContent
          repositories={currentData}
          loading={repo.loading}
          error={repo.error}
          onLoadMore={repo.loadMore}
          currentPage={repo.currentPage}
          onErrorClear={() => repo.setError('')}
        />
      </Box>
    </ThemeProvider>
  );
};

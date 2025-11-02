import React, { useEffect, useCallback } from 'react';
import './App.scss';
import { LoginCard, Sidebar, MainContent } from './components';
import { useAuth, useRepository, useSidebar } from './hooks';

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
      <LoginCard
        token={auth.tempToken}
        error={auth.error}
        onTokenChange={auth.setTempToken}
        onSubmit={handleTokenSubmit}
      />
    );
  }

  const currentData = repo.getCurrentData();
  const pageInfo = repo.getPageInfo();

  return (
    <div className={`app-container app-container--${sidebar.sidebarPosition}`}>
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
      />
    </div>
  );
};

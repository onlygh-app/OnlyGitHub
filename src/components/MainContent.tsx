import React, { memo } from 'react';
import { Repository } from '../types';
import { RepositoryList } from './RepositoryList';
import { WaterfallList } from './WaterfallList';

interface MainContentProps {
  repositories: Repository[];
  loading: boolean;
  error: string;
  onLoadMore: () => void;
  currentPage: 'explore' | 'trending';
}

const MainContentComponent: React.FC<MainContentProps> = ({
  repositories,
  loading,
  error,
  onLoadMore,
  currentPage,
}) => {
  return (
    <main className="main-content">
      {currentPage === 'explore' ? (
        <WaterfallList repositories={repositories} loading={loading} error={error} onLoadMore={onLoadMore} />
      ) : (
        <RepositoryList repositories={repositories} loading={loading} error={error} onLoadMore={onLoadMore} />
      )}
    </main>
  );
};

export const MainContent = memo(MainContentComponent);

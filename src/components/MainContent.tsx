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
  onErrorClear?: () => void;
}

const MainContentComponent: React.FC<MainContentProps> = ({
  repositories,
  loading,
  error,
  onLoadMore,
  currentPage,
  onErrorClear,
}) => {
  return (
    <main className="main-content">
      {currentPage === 'explore' ? (
        <WaterfallList repositories={repositories} loading={loading} error={error} onLoadMore={onLoadMore} onErrorClear={onErrorClear} />
      ) : (
        <RepositoryList repositories={repositories} loading={loading} error={error} onLoadMore={onLoadMore} onErrorClear={onErrorClear} />
      )}
    </main>
  );
};

export const MainContent = memo(MainContentComponent);

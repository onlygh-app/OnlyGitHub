import React from 'react';
import { Repository } from '../types';
import { RepositoryList } from './RepositoryList';

interface MainContentProps {
  repositories: Repository[];
  loading: boolean;
  error: string;
}

export const MainContent: React.FC<MainContentProps> = ({
  repositories,
  loading,
  error,
}) => {
  return (
    <main className="main-content">
      <RepositoryList repositories={repositories} loading={loading} error={error} />
    </main>
  );
};

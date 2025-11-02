import React from 'react';
import { Repository } from '../types';
import { RepositoryItem } from './RepositoryItem';

interface RepositoryListProps {
  repositories: Repository[];
  loading: boolean;
  error: string;
}

export const RepositoryList: React.FC<RepositoryListProps> = ({
  repositories,
  loading,
  error,
}) => {
  return (
    <div className="content">
      {loading && <p className="loading">Loading repositories...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="repos-list">
        {repositories.length === 0 && !loading && (
          <p className="empty-state">No repositories found</p>
        )}
        {repositories.map((repo, index) => (
          <RepositoryItem key={repo.id} repo={repo} index={index} />
        ))}
      </div>
    </div>
  );
};

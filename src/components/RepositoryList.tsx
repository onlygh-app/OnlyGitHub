import React, { memo, useEffect, useRef, useCallback } from 'react';
import { Repository } from '../types';
import { RepositoryItem } from './RepositoryItem';
import { ErrorMessage } from './ErrorMessage';

interface RepositoryListProps {
  repositories: Repository[];
  loading: boolean;
  error: string;
  onLoadMore: () => void;
  onErrorClear?: () => void;
}

const RepositoryListComponent: React.FC<RepositoryListProps> = ({
  repositories,
  loading,
  error,
  onLoadMore,
  onErrorClear,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!contentRef.current || loading) return;

    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
    // 当滚动到距离底部200px时触发加载更多
    if (scrollHeight - scrollTop - clientHeight < 200) {
      onLoadMore();
    }
  }, [loading, onLoadMore]);

  useEffect(() => {
    const element = contentRef.current;
    if (element) {
      element.addEventListener('scroll', handleScroll);
      return () => element.removeEventListener('scroll', handleScroll);
    }
    return undefined;
  }, [handleScroll]);

  return (
    <div className="content" ref={contentRef}>
      <ErrorMessage message={error} onClose={onErrorClear} />

      <div className="repos-list">
        {repositories.length === 0 && !loading && (
          <p className="empty-state">No repositories found</p>
        )}
        {repositories.map((repo, index) => (
          <RepositoryItem key={repo.id} repo={repo} index={index} />
        ))}
      </div>

      {loading && repositories.length > 0 && (
        <p className="loading">Loading more repositories...</p>
      )}
    </div>
  );
};

export const RepositoryList = memo(RepositoryListComponent);

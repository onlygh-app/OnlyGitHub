import React, { memo, useEffect, useRef, useCallback, useMemo } from 'react';
import { Repository } from '../types';
import { RepositoryItem } from './RepositoryItem';

interface WaterfallListProps {
  repositories: Repository[];
  loading: boolean;
  error: string;
  onLoadMore: () => void;
}

const COLUMN_COUNT = 5;

const WaterfallListComponent: React.FC<WaterfallListProps> = ({
  repositories,
  loading,
  error,
  onLoadMore,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (!contentRef.current || loading) return;

    const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
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

  // 将仓库分组到列中
  const columns = useMemo(() => {
    const cols: Repository[][] = Array.from({ length: COLUMN_COUNT }, () => []);
    repositories.forEach((repo, index) => {
      cols[index % COLUMN_COUNT].push(repo);
    });
    return cols;
  }, [repositories]);

  return (
    <div className="content waterfall-container" ref={contentRef}>
      {error && <p className="error-message">{error}</p>}

      {repositories.length === 0 && !loading && (
        <p className="empty-state">No repositories found</p>
      )}

      <div className="waterfall-columns">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="waterfall-column">
            {column.map((repo, itemIndex) => (
              <div key={repo.id} className="waterfall-item">
                <RepositoryItem repo={repo} index={colIndex * COLUMN_COUNT + itemIndex} />
              </div>
            ))}
          </div>
        ))}
      </div>

      {loading && repositories.length > 0 && (
        <p className="loading">Loading more repositories...</p>
      )}
    </div>
  );
};

export const WaterfallList = memo(WaterfallListComponent);

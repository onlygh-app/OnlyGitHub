import React, { memo, useEffect, useRef, useCallback, useMemo, useState } from 'react';
import { Repository } from '../types';
import { RepositoryItem } from './RepositoryItem';
import { ErrorMessage } from './ErrorMessage';

interface WaterfallListProps {
  repositories: Repository[];
  loading: boolean;
  error: string;
  onLoadMore: () => void;
  onErrorClear?: () => void;
}

const WaterfallListComponent: React.FC<WaterfallListProps> = ({
  repositories,
  loading,
  error,
  onLoadMore,
  onErrorClear,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [columnCount, setColumnCount] = useState(5);

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

  // 监听窗口大小变化，计算列数
  useEffect(() => {
    const calculateColumns = () => {
      if (contentRef.current) {
        const width = contentRef.current.offsetWidth - 32; // 减去padding
        const cols = Math.max(1, Math.floor(width / 340)); // 340px是最小宽度 + gap
        setColumnCount(cols);
      }
    };

    calculateColumns();
    const resizeObserver = new ResizeObserver(calculateColumns);
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    return () => resizeObserver.disconnect();
  }, []);

  // 将仓库分组到列中
  const columns = useMemo(() => {
    const cols: Repository[][] = Array.from({ length: columnCount }, () => []);
    repositories.forEach((repo, index) => {
      cols[index % columnCount].push(repo);
    });
    return cols;
  }, [repositories, columnCount]);

  return (
    <div className="content waterfall-container" ref={contentRef}>
      <ErrorMessage message={error} onClose={onErrorClear} />

      {repositories.length === 0 && !loading && (
        <p className="empty-state">No repositories found</p>
      )}

      <div className="waterfall-columns">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="waterfall-column">
            {column.map((repo, itemIndex) => (
              <div key={repo.id} className="waterfall-item">
                <RepositoryItem repo={repo} index={colIndex * columnCount + itemIndex} />
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

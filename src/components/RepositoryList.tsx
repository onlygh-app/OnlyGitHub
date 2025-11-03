import React, { memo, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Container,
  useTheme,
} from '@mui/material';
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
  const theme = useTheme();
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
      element.addEventListener('scroll', handleScroll, { passive: true });
      return () => element.removeEventListener('scroll', handleScroll);
    }
    return undefined;
  }, [handleScroll]);

  return (
    <Box
      ref={contentRef}
      sx={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px 20px',
        backgroundColor: theme.palette.background.default,
      }}
    >
      <ErrorMessage message={error} onClose={onErrorClear} />

      <Container maxWidth="md" sx={{ paddingX: 0 }}>
        {repositories.length === 0 && !loading && (
          <Box sx={{ textAlign: 'center', paddingY: '40px' }}>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
              }}
            >
              No repositories found
            </Typography>
          </Box>
        )}

        {repositories.map((repo, index) => (
          <RepositoryItem key={repo.id} repo={repo} index={index} />
        ))}

        {loading && repositories.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', paddingY: '16px' }}>
            <CircularProgress size={32} />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export const RepositoryList = memo(RepositoryListComponent);

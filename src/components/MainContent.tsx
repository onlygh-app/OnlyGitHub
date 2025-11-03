import React, { memo } from 'react';
import { Box, useTheme } from '@mui/material';
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
  const theme = useTheme();

  return (
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: theme.palette.background.default,
      }}
    >
      {currentPage === 'explore' ? (
        <WaterfallList repositories={repositories} loading={loading} error={error} onLoadMore={onLoadMore} onErrorClear={onErrorClear} />
      ) : (
        <RepositoryList repositories={repositories} loading={loading} error={error} onLoadMore={onLoadMore} onErrorClear={onErrorClear} />
      )}
    </Box>
  );
};

export const MainContent = memo(MainContentComponent);

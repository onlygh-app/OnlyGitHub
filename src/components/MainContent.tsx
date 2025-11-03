import React, { memo } from 'react';
import { Box } from '@mui/material';
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
    <Box
      sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        backgroundColor: '#0d1117',
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

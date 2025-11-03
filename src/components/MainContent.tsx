import React, { memo } from 'react';
import { Box, useTheme, CircularProgress, Stack } from '@mui/material';
import { Repository } from '../types';
import { RepositoryList } from './RepositoryList';
import { WaterfallList } from './WaterfallList';
import { Toast } from './Toast';

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
  const isEmpty = repositories.length === 0;
  const showInitialLoading = isEmpty && loading;

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

      <Toast in={showInitialLoading} timeout={400}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: theme.palette.background.paper,
            borderRadius: theme.spacing(2),
            padding: theme.spacing(2),
            boxShadow: theme.shadows[8],
          }}
        >
          <Stack spacing={1.5} alignItems="center">
            <CircularProgress size={40} thickness={4} />
          </Stack>
        </Box>
      </Toast>
    </Box>
  );
};

export const MainContent = memo(MainContentComponent);

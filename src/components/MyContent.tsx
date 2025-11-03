import React, { memo, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  Container,
  useTheme,
  CircularProgress,
  Typography,
} from '@mui/material';
import { User, Repository } from '../types';
import { MyProfile } from './MyProfile';
import { RepositoryItem } from './RepositoryItem';
import { ErrorMessage } from './ErrorMessage';

interface MyContentProps {
  user: User | null;
  repositories: Repository[];
  loading: boolean;
  error: string;
  onLoadMore: () => void;
  onErrorClear?: () => void;
}

const MyContentComponent: React.FC<MyContentProps> = ({
  user,
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
        {user && <MyProfile user={user} />}
        {!user && !loading && (
          <Box sx={{ textAlign: 'center', paddingY: '40px' }}>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
              }}
            >
              Unable to load profile
            </Typography>
          </Box>
        )}

        {user && (
          <>
            <Box sx={{ marginTop: 3, marginBottom: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 600,
                  marginBottom: 1,
                }}
              >
                Repositories
              </Typography>
            </Box>

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
          </>
        )}
      </Container>
    </Box>
  );
};

export const MyContent = memo(MyContentComponent);

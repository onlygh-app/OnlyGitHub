import React, { memo, useCallback } from 'react';
import {
  Box,
  Button,
  Typography,
  Divider,
  Stack,
  Paper,
  useTheme,
} from '@mui/material';
import ExploreIcon from '@mui/icons-material/Explore';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LogoutIcon from '@mui/icons-material/Logout';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { PageType } from '../types';

interface SidebarProps {
  width: number;
  position: 'left' | 'right';
  currentPage: PageType;
  pageTitle: string;
  isResizing: boolean;
  onMouseDown: () => void;
  onPageChange: (page: PageType) => void;
  onTogglePosition: () => void;
  onLogout: () => void;
}

const SidebarComponent: React.FC<SidebarProps> = ({
  width,
  position,
  currentPage,
  pageTitle,
  isResizing,
  onMouseDown,
  onPageChange,
  onTogglePosition,
  onLogout,
}) => {
  const theme = useTheme();
  const handleNavClick = useCallback((page: PageType) => {
    onPageChange(page);
  }, [onPageChange]);

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          width: `${width}px`,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          order: position === 'right' ? 2 : 1,
          background: theme.palette.background.paper,
          borderRight: position === 'left' ? `1px solid ${theme.palette.divider}` : 'none',
          borderLeft: position === 'right' ? `1px solid ${theme.palette.divider}` : 'none',
        }}
      >
        <Box sx={{ padding: '24px 16px' }}>
          <Typography
            variant="h6"
            component="h1"
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '8px',
            }}
          >
            OnlyGitHub
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: theme.palette.text.secondary,
            }}
          >
            {pageTitle}
          </Typography>
        </Box>

        <Divider />

        <Stack
          spacing={1}
          sx={{
            flex: 1,
            padding: '16px',
          }}
        >
          <Button
            fullWidth
            startIcon={<ExploreIcon />}
            onClick={() => handleNavClick('explore')}
            variant={currentPage === 'explore' ? 'contained' : 'text'}
            sx={{
              justifyContent: 'flex-start',
              backgroundColor: currentPage === 'explore' ? theme.palette.primary.main : 'transparent',
              color: currentPage === 'explore' ? '#fff' : theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: currentPage === 'explore' ? theme.palette.primary.main : 'rgba(88, 166, 255, 0.1)',
              },
            }}
            title="Explore repositories"
          >
            Explore
          </Button>
          <Button
            fullWidth
            startIcon={<TrendingUpIcon />}
            onClick={() => handleNavClick('trending')}
            variant={currentPage === 'trending' ? 'contained' : 'text'}
            sx={{
              justifyContent: 'flex-start',
              backgroundColor: currentPage === 'trending' ? theme.palette.primary.main : 'transparent',
              color: currentPage === 'trending' ? '#fff' : theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: currentPage === 'trending' ? theme.palette.primary.main : 'rgba(88, 166, 255, 0.1)',
              },
            }}
            title="View trending repositories"
          >
            Trending
          </Button>
        </Stack>

        <Divider />

        <Stack
          spacing={1}
          sx={{
            padding: '16px',
          }}
        >
          <Button
            fullWidth
            startIcon={<CompareArrowsIcon />}
            onClick={onTogglePosition}
            variant="text"
            sx={{
              justifyContent: 'flex-start',
              color: theme.palette.text.secondary,
              '&:hover': {
                backgroundColor: 'rgba(88, 166, 255, 0.1)',
              },
            }}
            title={`Move to ${position === 'left' ? 'right' : 'left'}`}
          >
            Move
          </Button>
          <Button
            fullWidth
            startIcon={<LogoutIcon />}
            onClick={onLogout}
            variant="text"
            sx={{
              justifyContent: 'flex-start',
              color: theme.palette.error.main,
              '&:hover': {
                backgroundColor: 'rgba(248, 81, 73, 0.1)',
              },
            }}
            title="Logout"
          >
            Logout
          </Button>
        </Stack>
      </Paper>

      <Box
        onMouseDown={onMouseDown}
        sx={{
          width: '4px',
          cursor: isResizing ? 'col-resize' : 'pointer',
          backgroundColor: theme.palette.divider,
          transition: 'background-color 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            backgroundColor: theme.palette.primary.main,
          },
        }}
        role="separator"
        aria-label="Sidebar resize handle"
      />
    </>
  );
};

export const Sidebar = memo(SidebarComponent);

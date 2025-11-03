import React, { memo, useCallback } from 'react';
import {
  Box,
  Button,
  Typography,
  Divider,
  Stack,
  Paper,
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
          background: '#161b22',
          borderRight: position === 'left' ? '1px solid #30363d' : 'none',
          borderLeft: position === 'right' ? '1px solid #30363d' : 'none',
        }}
      >
        <Box sx={{ padding: '24px 16px' }}>
          <Typography
            variant="h6"
            component="h1"
            sx={{
              color: '#58a6ff',
              fontWeight: 700,
              marginBottom: '8px',
            }}
          >
            OnlyGitHub
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#8b949e',
            }}
          >
            {pageTitle}
          </Typography>
        </Box>

        <Divider sx={{ backgroundColor: '#30363d' }} />

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
              textTransform: 'none',
              fontSize: '14px',
              color: currentPage === 'explore' ? '#fff' : '#8b949e',
              backgroundColor: currentPage === 'explore' ? '#58a6ff' : 'transparent',
              '&:hover': {
                backgroundColor: currentPage === 'explore' ? '#58a6ff' : 'rgba(88, 166, 255, 0.1)',
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
              textTransform: 'none',
              fontSize: '14px',
              color: currentPage === 'trending' ? '#fff' : '#8b949e',
              backgroundColor: currentPage === 'trending' ? '#58a6ff' : 'transparent',
              '&:hover': {
                backgroundColor: currentPage === 'trending' ? '#58a6ff' : 'rgba(88, 166, 255, 0.1)',
              },
            }}
            title="View trending repositories"
          >
            Trending
          </Button>
        </Stack>

        <Divider sx={{ backgroundColor: '#30363d' }} />

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
              textTransform: 'none',
              fontSize: '14px',
              color: '#8b949e',
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
              textTransform: 'none',
              fontSize: '14px',
              color: '#f85149',
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
          backgroundColor: '#30363d',
          transition: 'background-color 0.2s ease',
          '&:hover': {
            backgroundColor: '#58a6ff',
          },
        }}
        role="separator"
        aria-label="Sidebar resize handle"
      />
    </>
  );
};

export const Sidebar = memo(SidebarComponent);

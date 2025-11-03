import React, { memo, useEffect, useRef, useState } from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  IconButton,
  useTheme,
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { SidebarPosition } from '../types';
import { PageType } from '../types';

interface SidebarProps {
  width: number;
  position: SidebarPosition;
  currentPage: PageType;
  pageTitle?: string;
  isResizing: boolean;
  onMouseDown: () => void;
  onPageChange: (page: PageType) => void;
  onTogglePosition: () => void;
  onLogout: () => void;
  onSidebarResize?: (width: number) => void;
}

const SidebarComponent: React.FC<SidebarProps> = ({
  width,
  position,
  currentPage,
  isResizing,
  onMouseDown,
  onPageChange,
  onTogglePosition,
  onLogout,
  onSidebarResize,
}) => {
  const theme = useTheme();
  const rafRef = useRef<number | null>(null);
  const pendingWidthRef = useRef<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevPositionRef = useRef(position);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (prevPositionRef.current !== position) {
      setIsAnimating(true);
      timer = setTimeout(() => setIsAnimating(false), 400);
      prevPositionRef.current = position;
    }
    return () => {
      if (timer !== null) clearTimeout(timer);
    };
  }, [position]);

  useEffect(() => {
    // Initialize CSS variable
    document.documentElement.style.setProperty('--sidebar-width', `${width}px`);
  }, [width]);

  useEffect(() => {
    if (!isResizing) return;

    const handleMouseMove = (e: MouseEvent) => {
        const minWidth = 200;
        const maxWidth = 400;
        let newWidth = position === 'left' ? e.clientX : window.innerWidth - e.clientX;
        newWidth = Math.max(minWidth, Math.min(maxWidth, newWidth));
      
      // Store the pending width
      pendingWidthRef.current = newWidth;

      // Cancel any pending animation frame
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }

      // Schedule update on next frame
      rafRef.current = requestAnimationFrame(() => {
        if (pendingWidthRef.current !== null) {
          // Update CSS variable for immediate visual feedback
          document.documentElement.style.setProperty('--sidebar-width', `${pendingWidthRef.current}px`);
          // Update state for persistence
          if (onSidebarResize) {
            onSidebarResize(pendingWidthRef.current);
          }
          rafRef.current = null;
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isResizing, position, onSidebarResize]);

  const sidebarContent = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Box sx={{ fontWeight: 600, color: theme.palette.text.primary }}>Menu</Box>
          <IconButton 
            size="small" 
            onClick={onTogglePosition}
            sx={{
              transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isAnimating ? 'rotate(180deg)' : 'rotate(0deg)',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              },
            }}
          >
            {position === 'left' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Box>
      </Box>

      <Divider />

      <List sx={{ flex: 1, px: 1 }}>
        <ListItem
          button
          selected={currentPage === 'explore'}
          onClick={() => onPageChange('explore')}
          sx={{
            mb: 1,
            borderRadius: 1,
            '&.Mui-selected': {
              backgroundColor: theme.palette.action.selected,
            },
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Explore" />
        </ListItem>

        <ListItem
          button
          selected={currentPage === 'trending'}
          onClick={() => onPageChange('trending')}
          sx={{
            mb: 1,
            borderRadius: 1,
            '&.Mui-selected': {
              backgroundColor: theme.palette.action.selected,
            },
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          <ListItemIcon>
            <TrendingUpIcon />
          </ListItemIcon>
          <ListItemText primary="Trending" />
        </ListItem>

        <ListItem
          button
          selected={currentPage === 'my'}
          onClick={() => onPageChange('my')}
          sx={{
            mb: 1,
            borderRadius: 1,
            '&.Mui-selected': {
              backgroundColor: theme.palette.action.selected,
            },
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="My" />
        </ListItem>
      </List>

      <Divider />

      <List sx={{ px: 1 }}>
        <ListItem
          button
          onClick={onLogout}
          sx={{
            borderRadius: 1,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          }}
        >
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>

      {position === 'left' && (
        <Box
          onMouseDown={onMouseDown}
          sx={{
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: '4px',
            cursor: 'col-resize',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
            },
            transition: 'background-color 0.2s',
          }}
        />
      )}

      {position === 'right' && (
        <Box
          onMouseDown={onMouseDown}
          sx={{
            position: 'absolute',
            left: 0,
            top: 0,
            bottom: 0,
            width: '4px',
            cursor: 'col-resize',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
            },
            transition: 'background-color 0.2s',
          }}
        />
      )}
    </Box>
  );

  return (
    <Drawer
      variant="permanent"
      anchor={position}
      sx={{
        width: 'var(--sidebar-width, 250px)',
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 'var(--sidebar-width, 250px)',
          position: 'relative',
          transition: isResizing 
            ? 'none' 
            : `width 0.3s ease${isAnimating ? ', opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)' : ''}`,
          opacity: isAnimating ? 0.6 : 1,
          transform: isAnimating 
            ? (position === 'left' ? 'translateX(-20px)' : 'translateX(20px)')
            : 'translateX(0)',
        },
      }}
    >
      {sidebarContent}
    </Drawer>
  );
};

export const Sidebar = memo(SidebarComponent);

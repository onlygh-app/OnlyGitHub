import React, { memo } from 'react';
import { AppBar, Box, Typography, useTheme } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

interface AppHeaderProps {
  currentPage: 'explore' | 'trending';
}

const AppHeaderComponent: React.FC<AppHeaderProps> = ({ currentPage }) => {
  const theme = useTheme();
  const title = currentPage === 'explore' ? 'Explore' : 'Trending';

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        height: '44px',
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: theme.palette.background.paper,
        zIndex: 1100,
      }}
    >
      <Box
        sx={{
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingX: 2,
          gap: 1,
        }}
      >
        <GitHubIcon 
          sx={{
            color: theme.palette.primary.main,
            fontSize: '20px',
            flexShrink: 0,
          }}
        />
        
        <Typography
          sx={{
            fontSize: '15px',
            fontWeight: 600,
            color: theme.palette.text.primary,
            letterSpacing: '-0.2px',
            lineHeight: 1,
          }}
        >
          {title}
        </Typography>
      </Box>
    </AppBar>
  );
};

export const AppHeader = memo(AppHeaderComponent);

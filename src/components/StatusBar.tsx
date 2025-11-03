import React, { memo } from 'react';
import { Box, Typography, useTheme, Stack } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import FolderIcon from '@mui/icons-material/Folder';
import { PageType } from '../types';

interface StatusBarProps {
  currentPage: PageType;
  repositoryCount: number;
  loading: boolean;
}

const StatusBarComponent: React.FC<StatusBarProps> = ({
  currentPage,
  repositoryCount,
  loading,
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        height: '24px',
        backgroundColor: theme.palette.background.paper,
        borderTop: `1px solid ${theme.palette.divider}`,
        display: 'flex',
        alignItems: 'center',
        paddingX: theme.spacing(1.5),
        gap: theme.spacing(2),
        userSelect: 'none',
        zIndex: 1100,
      }}
    >
      <Stack direction="row" spacing={1} alignItems="center">
        <FolderIcon sx={{ fontSize: '12px', color: theme.palette.primary.main }} />
        <Typography
          variant="caption"
          sx={{
            fontSize: '12px',
            color: theme.palette.text.secondary,
            fontWeight: 500,
          }}
        >
          {currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}
        </Typography>
      </Stack>

      <Box
        sx={{
          width: '1px',
          height: '16px',
          backgroundColor: theme.palette.divider,
          opacity: 0.5,
        }}
      />

      <Stack direction="row" spacing={0.5} alignItems="center">
        <Typography
          variant="caption"
          sx={{
            fontSize: '12px',
            color: theme.palette.text.secondary,
          }}
        >
          Repositories:
        </Typography>
        <Typography
          variant="caption"
          sx={{
            fontSize: '12px',
            color: theme.palette.primary.main,
            fontWeight: 600,
          }}
        >
          {repositoryCount}
        </Typography>
      </Stack>

      <Box sx={{ flex: 1 }} />

      <Stack direction="row" spacing={0.5} alignItems="center">
        <InfoIcon sx={{ fontSize: '12px', color: theme.palette.text.secondary }} />
        <Typography
          variant="caption"
          sx={{
            fontSize: '12px',
            color: theme.palette.text.secondary,
          }}
        >
          {loading ? 'Loading...' : 'Ready'}
        </Typography>
      </Stack>
    </Box>
  );
};

export const StatusBar = memo(StatusBarComponent);

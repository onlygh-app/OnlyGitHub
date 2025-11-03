import React, { ReactNode } from 'react';
import { Box, useTheme, Grow } from '@mui/material';

interface ToastProps {
  in: boolean;
  children: ReactNode;
  timeout?: number;
  maxWidth?: string | number;
}

export const Toast: React.FC<ToastProps> = ({
  in: inProp,
  children,
  timeout = 300,
  maxWidth = '360px',
}) => {
  const theme = useTheme();

  return (
    <Grow in={inProp} timeout={timeout}>
      <Box
        sx={{
          position: 'fixed',
          bottom: theme.spacing(3),
          right: theme.spacing(3),
          maxWidth: maxWidth,
          zIndex: 1300,
          pointerEvents: 'auto',
        }}
      >
        {children}
      </Box>
    </Grow>
  );
};

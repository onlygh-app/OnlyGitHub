import React, { memo } from 'react';
import { Alert, Box, IconButton, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface ErrorMessageProps {
  message: string;
  onClose?: () => void;
  variant?: 'card' | 'banner';
}

const ErrorMessageComponent: React.FC<ErrorMessageProps> = ({
  message,
  onClose,
  variant = 'banner',
}) => {
  const theme = useTheme();

  if (!message) return null;

  return (
    <Box sx={{ marginBottom: variant === 'card' ? '24px' : '16px' }}>
      <Alert
        severity="error"
        action={
          <IconButton
            size="small"
            color="inherit"
            onClick={onClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        sx={{
          backgroundColor: 'rgba(248, 81, 73, 0.1)',
          color: theme.palette.error.main,
          border: `1px solid rgba(248, 81, 73, 0.2)`,
          borderRadius: '4px',
          '& .MuiAlert-icon': {
            color: theme.palette.error.main,
          },
        }}
      >
        {message}
      </Alert>
    </Box>
  );
};

export const ErrorMessage = memo(ErrorMessageComponent);

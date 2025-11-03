import React, { memo } from 'react';
import { Alert, Box, IconButton } from '@mui/material';
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
      >
        {message}
      </Alert>
    </Box>
  );
};

export const ErrorMessage = memo(ErrorMessageComponent);

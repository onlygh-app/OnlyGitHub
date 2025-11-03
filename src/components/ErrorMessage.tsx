import React, { memo } from 'react';
import { Alert, Box, IconButton, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Toast } from './Toast';

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

  const alertContent = (
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
        borderRadius: theme.spacing(variant === 'banner' ? 1 : 0.5),
        }}
      >
        {message}
      </Alert>
  );

  if (variant === 'banner') {
    return <Toast in timeout={300} maxWidth="360px">{alertContent}</Toast>;
  }

  return (
    <Box sx={{ marginBottom: theme.spacing(3) }}>
      {alertContent}
    </Box>
  );
};

export const ErrorMessage = memo(ErrorMessageComponent);

import React, { memo, useCallback } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Link,
  Alert,
  IconButton,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface LoginCardProps {
  token: string;
  error: string;
  onTokenChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onErrorClear?: () => void;
}

const LoginCardComponent: React.FC<LoginCardProps> = ({
  token,
  error,
  onTokenChange,
  onSubmit,
  onErrorClear,
}) => {
  const theme = useTheme();
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onTokenChange(e.target.value);
  }, [onTokenChange]);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default,
        padding: '20px',
        background: `
          linear-gradient(135deg, rgba(88, 166, 255, 0.03) 0%, transparent 50%),
          linear-gradient(-135deg, rgba(210, 168, 255, 0.03) 0%, transparent 50%),
          ${theme.palette.background.default}
        `,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'fixed',
          inset: 0,
          background: `
            radial-gradient(circle at 20% 50%, rgba(88, 166, 255, 0.04) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(210, 168, 255, 0.04) 0%, transparent 50%)
          `,
          pointerEvents: 'none',
          zIndex: 0,
        },
      }}
    >
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Paper
          elevation={12}
          sx={{
            padding: '48px 40px',
            borderRadius: '12px',
            border: `1px solid ${theme.palette.divider}`,
            backdropFilter: 'blur(10px)',
            animation: 'slideInUp 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              textAlign: 'center',
              marginBottom: '12px',
            }}
          >
            OnlyGitHub
          </Typography>

          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              marginBottom: '32px',
              color: theme.palette.text.secondary,
            }}
          >
            Enter your GitHub Personal Access Token
          </Typography>

          <Box component="form" onSubmit={onSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <TextField
              type="password"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              value={token}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              autoFocus
              autoComplete="off"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, #4184f3 100%)`,
                marginTop: '8px',
              }}
            >
              Login
            </Button>
          </Box>

          {error && (
            <Alert
              severity="error"
              action={
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={onErrorClear}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
              sx={{ marginTop: '16px' }}
            >
              {error}
            </Alert>
          )}

          <Typography
            variant="body2"
            sx={{
              marginTop: '32px',
              textAlign: 'center',
              color: theme.palette.text.secondary,
              lineHeight: 1.8,
            }}
          >
            Create a token at:{' '}
            <Link
              href="https://github.com/settings/tokens"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ fontWeight: 500 }}
            >
              github.com/settings/tokens
            </Link>
          </Typography>
        </Paper>
      </Container>
      
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Box>
  );
};

export const LoginCard = memo(LoginCardComponent);

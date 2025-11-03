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
        backgroundColor: '#0d1117',
        padding: '20px',
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={2}
          sx={{
            padding: '48px 40px',
            borderRadius: '8px',
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              color: '#58a6ff',
              textAlign: 'center',
              marginBottom: '12px',
              fontWeight: 700,
            }}
          >
            OnlyGitHub
          </Typography>

          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              marginBottom: '32px',
              color: '#8b949e',
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
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '6px',
                },
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                backgroundColor: '#58a6ff',
                color: '#fff',
                fontWeight: 600,
                textTransform: 'none',
                fontSize: '16px',
                '&:hover': {
                  backgroundColor: '#3fb950',
                },
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
              marginTop: '24px',
              textAlign: 'center',
              color: '#8b949e',
            }}
          >
            Create a token at:{' '}
            <Link
              href="https://github.com/settings/tokens"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#58a6ff', textDecoration: 'none', fontWeight: 500 }}
            >
              github.com/settings/tokens
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export const LoginCard = memo(LoginCardComponent);

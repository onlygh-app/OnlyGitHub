import React, { memo, useCallback } from 'react';
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  IconButton,
  useTheme,
  Grow,
  Stack,
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
        padding: theme.spacing(2),
      }}
    >
      <Container maxWidth="xs">
        <Grow in timeout={300}>
          <Box>
            <Stack spacing={6}>
              <Box sx={{ textAlign: 'center' }}>
          <Typography
                  variant="h4"
            component="h1"
            sx={{
                    fontWeight: 500,
                    fontSize: '32px',
                    letterSpacing: '-0.5px',
                    marginBottom: theme.spacing(1),
                    color: theme.palette.text.primary,
            }}
          >
            OnlyGitHub
          </Typography>
          <Typography
            variant="body1"
            sx={{
                    fontSize: '15px',
              color: theme.palette.text.secondary,
                    fontWeight: 400,
                    letterSpacing: '0px',
                    lineHeight: 1.5,
            }}
          >
                  Sign in with your GitHub token to get started
          </Typography>
              </Box>

              <Box component="form" onSubmit={onSubmit}>
                <Stack spacing={3}>
            <TextField
              type="password"
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              value={token}
              onChange={handleInputChange}
              fullWidth
              variant="outlined"
              autoFocus
              autoComplete="off"
                    label="GitHub Token"
                    size="medium"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        backgroundColor: 'transparent',
                        transition: 'border-color 0.2s ease',
                        '& fieldset': {
                          borderColor: theme.palette.divider,
                          borderWidth: '1px',
                        },
                        '&:hover fieldset': {
                          borderColor: theme.palette.text.secondary,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: theme.palette.primary.main,
                          borderWidth: '1px',
                        },
                      },
                      '& .MuiInputBase-input': {
                        fontSize: '15px',
                        padding: '12px 14px',
                        letterSpacing: '0px',
                      },
                      '& .MuiInputLabel-root': {
                        fontSize: '15px',
                        transform: 'translate(14px, -9px) scale(0.75)',
                        '&.Mui-focused': {
                          color: theme.palette.primary.main,
                        },
                      },
                    }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
                    disabled={!token.trim()}
              sx={{
                      borderRadius: '8px',
                      textTransform: 'none',
                      fontSize: '15px',
                      fontWeight: 500,
                      padding: '10px 16px',
                      height: '40px',
                      backgroundColor: theme.palette.primary.main,
                      color: 'white',
                      transition: 'background-color 0.15s ease',
                      '&:hover:not(:disabled)': {
                        backgroundColor: theme.palette.primary.dark,
                      },
                      '&:disabled': {
                        backgroundColor: theme.palette.action.disabledBackground,
                        color: theme.palette.action.disabled,
                      },
              }}
            >
                    Sign In
            </Button>
                </Stack>
          </Box>

          {error && (
                <Grow in timeout={200}>
            <Alert
              severity="error"
              action={
                <IconButton
                  size="small"
                  color="inherit"
                  onClick={onErrorClear}
                        sx={{ marginRight: '-8px' }}
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
              }
                    sx={{
                      borderRadius: '8px',
                      fontSize: '13px',
                      '& .MuiAlert-message': {
                        padding: '0 8px',
                      },
                    }}
            >
              {error}
            </Alert>
                </Grow>
          )}

              <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="body2"
            sx={{
                    fontSize: '13px',
              color: theme.palette.text.secondary,
                    lineHeight: 1.6,
            }}
          >
                  Don't have a token?{' '}
                  <Box
                    component="a"
              href="https://github.com/settings/tokens"
              target="_blank"
              rel="noopener noreferrer"
                    sx={{
                      color: theme.palette.primary.main,
                      textDecoration: 'none',
                      fontWeight: 500,
                      cursor: 'pointer',
                      transition: 'opacity 0.15s ease',
                      '&:hover': {
                        opacity: 0.8,
                      },
                    }}
            >
                    Create one
                  </Box>
          </Typography>
              </Box>
            </Stack>
          </Box>
        </Grow>
      </Container>
    </Box>
  );
};

export const LoginCard = memo(LoginCardComponent);

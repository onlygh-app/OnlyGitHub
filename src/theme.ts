import { createTheme, ThemeOptions } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#58a6ff',
      light: '#79c0ff',
      dark: '#1f6feb',
    },
    secondary: {
      main: '#d2a8ff',
      light: '#e2c2ff',
      dark: '#a371f7',
    },
    success: {
      main: '#3fb950',
      light: '#56d364',
      dark: '#238636',
    },
    warning: {
      main: '#d29922',
      light: '#e8b34d',
      dark: '#bd561d',
    },
    error: {
      main: '#f85149',
      light: '#fa7a6d',
      dark: '#da3633',
    },
    background: {
      default: '#0d1117',
      paper: '#161b22',
    },
    text: {
      primary: '#e6edf3',
      secondary: '#8b949e',
    },
    divider: '#30363d',
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
    h1: {
      fontSize: '32px',
      fontWeight: 700,
      letterSpacing: '0.5px',
    },
    h6: {
      fontSize: '12px',
      fontWeight: 700,
      letterSpacing: '0.5px',
      textTransform: 'uppercase',
    },
    body1: {
      fontSize: '14px',
      letterSpacing: '0.3px',
    },
    body2: {
      fontSize: '13px',
      letterSpacing: '0.3px',
    },
    caption: {
      fontSize: '12px',
      letterSpacing: '0.2px',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          width: '100%',
          height: '100%',
        },
        body: {
          width: '100%',
          height: '100%',
          overflow: 'hidden',
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        '#app': {
          width: '100%',
          height: '100%',
        },
        '*': {
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(88, 166, 255, 0.3) #21262d',
        },
        '*::-webkit-scrollbar': {
          width: '8px',
          height: '8px',
        },
        '*::-webkit-scrollbar-track': {
          background: '#21262d',
        },
        '*::-webkit-scrollbar-thumb': {
          background: 'rgba(88, 166, 255, 0.3)',
          borderRadius: '4px',
          '&:hover': {
            background: 'rgba(88, 166, 255, 0.5)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#161b22',
          borderColor: '#30363d',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          letterSpacing: '0.2px',
          transition: 'all 250ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 8px 16px rgba(88, 166, 255, 0.3)',
          },
        },
        text: {
          color: '#8b949e',
          '&:hover': {
            backgroundColor: 'rgba(88, 166, 255, 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#161b22',
          backgroundImage: 'none',
          borderColor: '#30363d',
          border: '1px solid #30363d',
          transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            borderColor: '#58a6ff',
            boxShadow: '0 4px 12px rgba(88, 166, 255, 0.15)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            color: '#e6edf3',
            borderRadius: '6px',
            '& fieldset': {
              borderColor: '#30363d',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(88, 166, 255, 0.4)',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#58a6ff',
              boxShadow: '0 0 0 3px rgba(88, 166, 255, 0.15)',
            },
          },
          '& .MuiOutlinedInput-input': {
            '&::placeholder': {
              color: '#6e7681',
              opacity: 0.7,
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          height: '20px',
          fontSize: '11px',
          borderColor: '#30363d',
          color: '#8b949e',
          backgroundColor: 'transparent',
        },
        outlined: {
          borderColor: '#30363d',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(248, 81, 73, 0.1)',
          color: '#f85149',
          border: '1px solid rgba(248, 81, 73, 0.2)',
          borderRadius: '4px',
        },
        standardError: {
          backgroundColor: 'rgba(248, 81, 73, 0.1)',
          color: '#f85149',
          '& .MuiAlert-icon': {
            color: '#f85149',
          },
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#58a6ff',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#58a6ff',
          textDecoration: 'none',
          transition: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
          '&:hover': {
            textDecoration: 'underline',
            color: '#79c0ff',
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#30363d',
        },
      },
    },
  },
} as ThemeOptions);

export default darkTheme;

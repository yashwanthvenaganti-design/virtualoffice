import { createTheme, type ThemeOptions } from '@mui/material/styles';

export const createAppTheme = (isDark: boolean) => {
  const themeOptions: ThemeOptions = {
    palette: {
      mode: isDark ? 'dark' : 'light',
      primary: {
        main: isDark ? '#60a5fa' : '#3b82f6', // blue-400 : blue-500
        light: isDark ? '#93c5fd' : '#60a5fa', // blue-300 : blue-400
        dark: isDark ? '#3b82f6' : '#2563eb', // blue-500 : blue-600
        contrastText: '#ffffff',
      },
      secondary: {
        main: isDark ? '#c4b5fd' : '#a855f7', // purple-300 : purple-500
        light: isDark ? '#ddd6fe' : '#c084fc', // purple-200 : purple-400
        dark: isDark ? '#a855f7' : '#9333ea', // purple-500 : purple-600
        contrastText: '#ffffff',
      },
      background: {
        default: isDark ? '#030712' : '#f9fafb', // gray-950 : gray-50
        paper: isDark ? '#111827' : '#ffffff', // gray-900 : white
      },
      text: {
        primary: isDark ? '#f9fafb' : '#111827', // gray-50 : gray-900
        secondary: isDark ? '#9ca3af' : '#6b7280', // gray-400 : gray-500
      },
      divider: isDark ? '#374151' : '#e5e7eb', // gray-700 : gray-200
      success: {
        main: '#22c55e', // green-500
      },
      warning: {
        main: '#f59e0b', // amber-500
      },
      error: {
        main: isDark ? '#f87171' : '#ef4444', // red-400 : red-500
      },
    },
    typography: {
      fontFamily: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      h1: {
        fontWeight: 700,
        fontSize: '2.5rem',
        lineHeight: 1.2,
      },
      h2: {
        fontWeight: 700,
        fontSize: '2rem',
        lineHeight: 1.3,
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.5rem',
        lineHeight: 1.4,
      },
      h4: {
        fontWeight: 600,
        fontSize: '1.25rem',
        lineHeight: 1.4,
      },
      h5: {
        fontWeight: 600,
        fontSize: '1.125rem',
        lineHeight: 1.4,
      },
      h6: {
        fontWeight: 600,
        fontSize: '1rem',
        lineHeight: 1.5,
      },
      button: {
        fontWeight: 600,
        textTransform: 'none',
        fontSize: '0.875rem',
      },
    },
    shape: {
      borderRadius: 12, // Match Tailwind's rounded-xl
    },
    components: {
      // Only override components that need special handling
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '0.75rem', // rounded-xl
              backgroundColor: isDark ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(20px)',
              transition: 'all 0.2s ease-in-out',
              '&:hover': {
                backgroundColor: isDark ? 'rgba(17, 24, 39, 0.9)' : 'rgba(255, 255, 255, 0.9)',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: isDark ? '#60a5fa' : '#3b82f6',
                  borderWidth: '2px',
                },
              },
              '&.Mui-focused': {
                backgroundColor: isDark ? 'rgba(17, 24, 39, 1)' : 'rgba(255, 255, 255, 1)',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: isDark ? '#60a5fa' : '#3b82f6',
                  borderWidth: '2px',
                },
              },
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: isDark ? '#374151' : '#e5e7eb',
              },
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '0.75rem', // rounded-xl
            textTransform: 'none',
            fontWeight: 600,
            padding: '12px 24px',
            fontSize: '1rem',
            boxShadow: 'none',
            '&:hover': {
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
              transform: 'translateY(-2px)',
            },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '1rem', // rounded-2xl
            backgroundImage: 'none',
            backgroundColor: isDark ? 'rgba(17, 24, 39, 0.8)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)'}`,
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: '0.75rem', // rounded-xl
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            width: 44,
            height: 26,
            padding: 0,
            '& .MuiSwitch-switchBase': {
              padding: 0,
              margin: 2,
              transitionDuration: '300ms',
              '&.Mui-checked': {
                transform: 'translateX(18px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                  backgroundColor: isDark ? '#60a5fa' : '#3b82f6',
                  opacity: 1,
                  border: 0,
                },
              },
            },
            '& .MuiSwitch-thumb': {
              boxSizing: 'border-box',
              width: 22,
              height: 22,
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
            },
            '& .MuiSwitch-track': {
              borderRadius: 13,
              backgroundColor: isDark ? '#374151' : '#d1d5db',
              opacity: 1,
              transition: 'background-color 300ms',
            },
          },
        },
      },
    },
  };

  return createTheme(themeOptions);
};

import { createTheme, type ThemeOptions } from '@mui/material/styles';

// Apple-inspired color palette
const appleColors = {
  blue: '#007AFF',
  green: '#34C759',
  indigo: '#5856D6',
  orange: '#FF9500',
  pink: '#FF2D92',
  purple: '#AF52DE',
  red: '#FF3B30',
  teal: '#5AC8FA',
  yellow: '#FFCC00',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  },
};

// Apple system fonts
const systemFonts = [
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
].join(',');

const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: appleColors.blue,
      light: '#4DA3FF',
      dark: '#0051CC',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: appleColors.purple,
      light: '#C983E8',
      dark: '#8B3AB5',
      contrastText: '#FFFFFF',
    },
    success: {
      main: appleColors.green,
      light: '#5DD573',
      dark: '#1B9940',
      contrastText: '#FFFFFF',
    },
    warning: {
      main: appleColors.orange,
      light: '#FFB84D',
      dark: '#CC7700',
      contrastText: '#FFFFFF',
    },
    error: {
      main: appleColors.red,
      light: '#FF6B5D',
      dark: '#CC2E26',
      contrastText: '#FFFFFF',
    },
    info: {
      main: appleColors.teal,
      light: '#7DD8FB',
      dark: '#3E9FC7',
      contrastText: '#FFFFFF',
    },
    background: {
      default: appleColors.gray[50],
      paper: '#FFFFFF',
    },
    text: {
      primary: appleColors.gray[900],
      secondary: appleColors.gray[600],
    },
    divider: appleColors.gray[200],
    grey: appleColors.gray,
  },
  typography: {
    fontFamily: systemFonts,
    h1: {
      fontFamily: systemFonts,
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: systemFonts,
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontFamily: systemFonts,
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
    },
    h4: {
      fontFamily: systemFonts,
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.4,
    },
    h5: {
      fontFamily: systemFonts,
      fontWeight: 600,
      fontSize: '1.125rem',
      lineHeight: 1.4,
    },
    h6: {
      fontFamily: systemFonts,
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body1: {
      fontFamily: systemFonts,
      fontSize: '1rem',
      lineHeight: 1.5,
    },
    body2: {
      fontFamily: systemFonts,
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    button: {
      fontFamily: systemFonts,
      fontWeight: 600,
      fontSize: '0.875rem',
      textTransform: 'none',
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 12, // Apple-like rounded corners
  },
  spacing: 8,
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.1)',
    '0px 4px 8px rgba(0, 0, 0, 0.1)',
    '0px 8px 16px rgba(0, 0, 0, 0.1)',
    '0px 12px 24px rgba(0, 0, 0, 0.1)',
    '0px 16px 32px rgba(0, 0, 0, 0.1)',
    '0px 20px 40px rgba(0, 0, 0, 0.1)',
    '0px 24px 48px rgba(0, 0, 0, 0.1)',
    '0px 32px 64px rgba(0, 0, 0, 0.1)',
    '0px 40px 80px rgba(0, 0, 0, 0.1)',
    '0px 48px 96px rgba(0, 0, 0, 0.1)',
    '0px 56px 112px rgba(0, 0, 0, 0.1)',
    '0px 64px 128px rgba(0, 0, 0, 0.1)',
    '0px 72px 144px rgba(0, 0, 0, 0.1)',
    '0px 80px 160px rgba(0, 0, 0, 0.1)',
    '0px 88px 176px rgba(0, 0, 0, 0.1)',
    '0px 96px 192px rgba(0, 0, 0, 0.1)',
    '0px 104px 208px rgba(0, 0, 0, 0.1)',
    '0px 112px 224px rgba(0, 0, 0, 0.1)',
    '0px 120px 240px rgba(0, 0, 0, 0.1)',
    '0px 128px 256px rgba(0, 0, 0, 0.1)',
    '0px 136px 272px rgba(0, 0, 0, 0.1)',
    '0px 144px 288px rgba(0, 0, 0, 0.1)',
    '0px 152px 304px rgba(0, 0, 0, 0.1)',
    '0px 160px 320px rgba(0, 0, 0, 0.1)',
  ],
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
      easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
      sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
  },
};

export const theme = createTheme(themeOptions);

// Dark theme variant
export const darkTheme = createTheme({
  ...themeOptions,
  palette: {
    ...themeOptions.palette,
    mode: 'dark',
    background: {
      default: appleColors.gray[900],
      paper: appleColors.gray[800],
    },
    text: {
      primary: appleColors.gray[100],
      secondary: appleColors.gray[400],
    },
    divider: appleColors.gray[700],
  },
});

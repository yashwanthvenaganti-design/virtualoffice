import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router } from 'react-router-dom';
import { theme } from './theme/theme';
import { componentOverrides } from './theme/components';
import HomePage from './pages/HomePage';
import './App.css';
import MainLayout from './components/layout/MainLayout';

function App() {
  const enhancedTheme = React.useMemo(
    () => ({
      ...theme,
      components: {
        ...theme.components,
        ...componentOverrides(theme),
      },
    }),
    []
  );

  return (
    <ThemeProvider theme={enhancedTheme}>
      <CssBaseline />
      <Router>
        <div className='App'>
          <MainLayout>
            <HomePage />
          </MainLayout>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;

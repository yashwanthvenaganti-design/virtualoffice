import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { theme } from './theme/theme';
import { componentOverrides } from './theme/components';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import './App.css';
import MainLayout from './components/layout/MainLayout';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import AuthenticatedRedirect from './components/common/AuthenticatedRedirect';
import ProfilePage from './pages/ProfilePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';

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
      <AuthProvider>
        <Router>
          <div className='App'>
            <Routes>
              <Route path='/login' element={<LoginPage />} />

              <Route path='/forgot-password' element={<ForgotPasswordPage />} />

              <Route
                path='/home'
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <HomePage />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path='/profile'
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <ProfilePage />
                    </MainLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path='/virtual-office'
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <div>Virtual Office Page - Coming Soon</div>
                    </MainLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path='/settings'
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <div>Settings Page - Coming Soon</div>
                    </MainLayout>
                  </ProtectedRoute>
                }
              />

              {/* Root route - Smart redirect */}
              <Route path='/' element={<AuthenticatedRedirect />} />

              {/* Catch all route - redirect to login */}
              <Route path='*' element={<Navigate to='/login' replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;

import React, { useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import './index.css';
import MainLayout from './components/layout/MainLayout';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import AuthenticatedRedirect from './components/common/AuthenticatedRedirect';
import ProfilePage from './pages/ProfilePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import { ThemeProvider, useTheme } from './theme/ThemeContext';
import { createAppTheme } from './theme/mui-theme';

const AppContent: React.FC = () => {
  const { isDark } = useTheme();

  const muiTheme = useMemo(() => createAppTheme(isDark), [isDark]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <div className='min-h-screen bg-background text-foreground'>
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
                      <div className='p-8'>
                        <div className='card text-center'>
                          <h1 className='text-2xl font-bold text-foreground mb-4'>
                            Virtual Office
                          </h1>
                          <p className='text-muted'>Coming Soon</p>
                        </div>
                      </div>
                    </MainLayout>
                  </ProtectedRoute>
                }
              />

              <Route
                path='/settings'
                element={
                  <ProtectedRoute>
                    <MainLayout>
                      <div className='p-8'>
                        <div className='card text-center'>
                          <h1 className='text-2xl font-bold text-foreground mb-4'>Settings</h1>
                          <p className='text-muted'>Coming Soon</p>
                        </div>
                      </div>
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
    </MuiThemeProvider>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

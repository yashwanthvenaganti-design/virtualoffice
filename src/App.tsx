import React, { useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTheme } from './theme/ThemeContext';
import { createAppTheme } from './theme/mui-theme';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ProfilePage from './pages/ProfilePage';
import YourAvailability from './pages/YourAvailability';
import AvailabilityDetailPage from './components/availability/AvailabilityDetailPage';
import YourAppDevices from './pages/YourAppDevices';
import YourAddresses from './pages/YourAddresses';
import AddressDetailPage from './components/addresses/AddressDetailPage';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import AuthenticatedRedirect from './components/common/AuthenticatedRedirect';

import './index.css';

const App: React.FC = () => {
  const { isDark } = useTheme();
  const muiTheme = useMemo(() => createAppTheme(isDark), [isDark]);

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
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
              path='/availability'
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <YourAvailability />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path='/availability/:id'
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <AvailabilityDetailPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path='/messages'
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <HomePage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path='/devices'
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <YourAppDevices />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path='/addresses'
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <YourAddresses />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path='/addresses/:id'
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <AddressDetailPage />
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
                        <h1 className='text-2xl font-bold text-foreground mb-4'>Virtual Office</h1>
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
    </MuiThemeProvider>
  );
};

export default App;

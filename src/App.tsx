import React, { useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
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
import YourGreetings from './pages/YourGreetings';
import AddressDetailPage from './components/addresses/AddressDetailPage';
import MainLayout from './components/layout/MainLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import AuthenticatedRedirect from './components/common/AuthenticatedRedirect';

import './index.css';
import GreetingDetailPage from './components/greeting/GreetingDetailPage';

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
              path='/greetings'
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <YourGreetings />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path='/greetings/new'
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <GreetingDetailPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />

            <Route
              path='/greetings/:id'
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <GreetingDetailPage />
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

          {/* Toast Notifications Container */}
          <Toaster
            position='bottom-right'
            reverseOrder={false}
            gutter={8}
            containerClassName=''
            containerStyle={{}}
            toastOptions={{
              // Default options for all toasts
              duration: 4000,
              className: '',
              style: {
                background: isDark ? '#374151' : '#ffffff',
                color: isDark ? '#ffffff' : '#1f2937',
                border: isDark ? '1px solid #4B5563' : '1px solid #E5E7EB',
                borderRadius: '8px',
                padding: '12px 16px',
                fontSize: '14px',
                fontWeight: '500',
                boxShadow: isDark
                  ? '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.2)'
                  : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                maxWidth: '400px',
              },
              // Success toast styling
              success: {
                duration: 3000,
                style: {
                  background: '#10B981',
                  color: '#ffffff',
                  border: '1px solid #059669',
                },
                iconTheme: {
                  primary: '#ffffff',
                  secondary: '#10B981',
                },
              },
              error: {
                duration: 5000,
                style: {
                  background: '#EF4444',
                  color: '#ffffff',
                  border: '1px solid #DC2626',
                },
                iconTheme: {
                  primary: '#ffffff',
                  secondary: '#EF4444',
                },
              },
              loading: {
                style: {
                  background: isDark ? '#4B5563' : '#F3F4F6',
                  color: isDark ? '#ffffff' : '#1f2937',
                  border: isDark ? '1px solid #6B7280' : '1px solid #D1D5DB',
                },
              },
            }}
          />
        </div>
      </Router>
    </MuiThemeProvider>
  );
};

export default App;

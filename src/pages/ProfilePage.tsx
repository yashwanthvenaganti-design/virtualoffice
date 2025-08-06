import React, { useState } from 'react';
import {
  Typography,
  Avatar,
  Card,
  CardContent,
  Button,
  TextField,
  IconButton,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Email as EmailIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  AdminPanelSettings as AdminIcon,
  PhotoCamera as CameraIcon,
  Notifications as NotificationIcon,
  Security as SecurityIcon,
} from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../theme/ThemeContext';
import ErrorBoundary from '../utils/ErrorBoundary';

const ProfilePage: React.FC = () => {
  const { isDark } = useTheme();
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    virtualOfficeName: user?.virtualOfficeName || '',
  });
  const [notifications, setNotifications] = useState({
    email: true,
    desktop: true,
    mobile: false,
  });

  if (!user) {
    return (
      <div
        className={`p-8 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'} min-h-screen`}
      >
        <div className='max-w-4xl mx-auto'>
          <div
            className={`p-8 rounded-2xl text-center ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
          >
            <Typography variant='h6'>User not found</Typography>
          </div>
        </div>
      </div>
    );
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      username: user.username,
      email: user.email,
      virtualOfficeName: user.virtualOfficeName,
    });
    setIsEditing(false);
  };

  const getRoleColor = (role: string) => {
    const baseClasses = 'inline-flex px-3 py-1.5 rounded-xl text-sm font-semibold';
    switch (role?.toLowerCase()) {
      case 'admin':
        return `${baseClasses} ${isDark ? 'bg-red-900/30 text-red-300 border border-red-800/50' : 'bg-red-100 text-red-700 border border-red-200'}`;
      case 'manager':
        return `${baseClasses} ${isDark ? 'bg-blue-900/30 text-blue-300 border border-blue-800/50' : 'bg-blue-100 text-blue-700 border border-blue-200'}`;
      case 'user':
        return `${baseClasses} ${isDark ? 'bg-green-900/30 text-green-300 border border-green-800/50' : 'bg-green-100 text-green-700 border border-green-200'}`;
      case 'guest':
        return `${baseClasses} ${isDark ? 'bg-amber-900/30 text-amber-300 border border-amber-800/50' : 'bg-amber-100 text-amber-700 border border-amber-200'}`;
      default:
        return `${baseClasses} ${isDark ? 'bg-gray-800 text-gray-300 border border-gray-700' : 'bg-gray-100 text-gray-700 border border-gray-200'}`;
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleIcon = (role: string) => {
    switch (role?.toLowerCase()) {
      case 'admin':
        return <AdminIcon sx={{ fontSize: 20 }} />;
      case 'user':
        return <PersonIcon sx={{ fontSize: 20 }} />;
      case 'guest':
        return <PersonIcon sx={{ fontSize: 20 }} />;
      default:
        return <PersonIcon sx={{ fontSize: 20 }} />;
    }
  };

  return (
    <ErrorBoundary>
      <div className={`min-h-screen ${isDark ? 'bg-gray-900' : 'bg-gray-50'} p-6`}>
        <div className='max-w-4xl mx-auto space-y-6'>
          {/* Header */}
          <div className='flex items-center justify-between'>
            <div>
              <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Profile Settings
              </h1>
              <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Manage your account information and preferences
              </p>
            </div>

            {!isEditing && (
              <Button
                variant='contained'
                startIcon={<EditIcon />}
                onClick={handleEdit}
                sx={{
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                  py: 1.5,
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                  },
                }}
              >
                Edit Profile
              </Button>
            )}
          </div>

          <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
            {/* Profile Card */}
            <div className='lg:col-span-1'>
              <Card
                className={`p-6 ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border shadow-lg`}
                sx={{ borderRadius: '20px' }}
              >
                <div className='text-center'>
                  <div className='relative inline-block mb-6'>
                    <Avatar
                      src={user.avatar}
                      className='w-32 h-32 mx-auto shadow-xl ring-4 ring-white/20'
                      sx={{
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        fontSize: '2.5rem',
                        fontWeight: 700,
                        color: 'white',
                      }}
                    >
                      {getInitials(user.username)}
                    </Avatar>

                    <IconButton
                      className={`absolute bottom-2 right-2 shadow-lg ${
                        isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-white hover:bg-gray-50'
                      }`}
                      sx={{
                        width: 40,
                        height: 40,
                        border: '3px solid',
                        borderColor: isDark ? '#374151' : '#e5e7eb',
                      }}
                    >
                      <CameraIcon
                        sx={{
                          fontSize: 18,
                          color: isDark ? '#9ca3af' : '#6b7280',
                        }}
                      />
                    </IconButton>
                  </div>

                  <h2
                    className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}
                  >
                    {user.username}
                  </h2>

                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {user.email}
                  </p>

                  <div className='mb-6'>
                    <span className={getRoleColor(user.role)}>
                      {getRoleIcon(user.role)}
                      <span className='ml-2'>{user.role.toUpperCase()}</span>
                    </span>
                  </div>

                  <div className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <div className='flex items-center justify-center gap-2 mb-2'>
                      <div className='w-3 h-3 bg-green-500 rounded-full'></div>
                      <span>Online</span>
                    </div>
                    <p>Last seen: Just now</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Main Content */}
            <div className='lg:col-span-2 space-y-6'>
              {/* Personal Information */}
              <Card
                className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border shadow-lg`}
                sx={{ borderRadius: '20px' }}
              >
                <CardContent className='p-6'>
                  <div className='flex items-center justify-between mb-6'>
                    <h3
                      className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}
                    >
                      Personal Information
                    </h3>

                    {isEditing && (
                      <div className='flex gap-2'>
                        <Button
                          size='small'
                          startIcon={<SaveIcon />}
                          onClick={handleSave}
                          sx={{
                            borderRadius: '8px',
                            textTransform: 'none',
                            fontWeight: 600,
                            color: '#22c55e',
                            '&:hover': { backgroundColor: 'rgba(34, 197, 94, 0.1)' },
                          }}
                        >
                          Save
                        </Button>
                        <Button
                          size='small'
                          startIcon={<CancelIcon />}
                          onClick={handleCancel}
                          sx={{
                            borderRadius: '8px',
                            textTransform: 'none',
                            fontWeight: 600,
                            color: '#ef4444',
                            '&:hover': { backgroundColor: 'rgba(239, 68, 68, 0.1)' },
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className='space-y-6'>
                    {/* Username */}
                    <div className='flex items-center gap-4'>
                      <PersonIcon sx={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: 24 }} />
                      <div className='flex-1'>
                        <label
                          className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                        >
                          Username
                        </label>
                        {isEditing ? (
                          <TextField
                            fullWidth
                            value={formData.username}
                            onChange={e => setFormData({ ...formData, username: e.target.value })}
                            variant='outlined'
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f9fafb',
                              },
                            }}
                          />
                        ) : (
                          <p className={`text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {user.username}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Email */}
                    <div className='flex items-center gap-4'>
                      <EmailIcon sx={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: 24 }} />
                      <div className='flex-1'>
                        <label
                          className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                        >
                          Email Address
                        </label>
                        {isEditing ? (
                          <TextField
                            fullWidth
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                            variant='outlined'
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f9fafb',
                              },
                            }}
                          />
                        ) : (
                          <p className={`text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {user.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Virtual Office */}
                    <div className='flex items-center gap-4'>
                      <BusinessIcon sx={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: 24 }} />
                      <div className='flex-1'>
                        <label
                          className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                        >
                          Virtual Office
                        </label>
                        {isEditing ? (
                          <TextField
                            fullWidth
                            value={formData.virtualOfficeName}
                            onChange={e =>
                              setFormData({ ...formData, virtualOfficeName: e.target.value })
                            }
                            variant='outlined'
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                borderRadius: '12px',
                                backgroundColor: isDark ? 'rgba(255, 255, 255, 0.05)' : '#f9fafb',
                              },
                            }}
                          />
                        ) : (
                          <p className={`text-base ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            {user.virtualOfficeName}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Role */}
                    <div className='flex items-center gap-4'>
                      {getRoleIcon(user.role)}
                      <div className='flex-1'>
                        <label
                          className={`block text-sm font-medium mb-2 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}
                        >
                          Role
                        </label>
                        <span className={getRoleColor(user.role)}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Preferences */}
              <Card
                className={`${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border shadow-lg`}
                sx={{ borderRadius: '20px' }}
              >
                <CardContent className='p-6'>
                  <h3
                    className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
                  >
                    Notification Preferences
                  </h3>

                  <div className='space-y-4'>
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-3'>
                        <EmailIcon sx={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: 20 }} />
                        <div>
                          <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Email Notifications
                          </p>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Receive updates via email
                          </p>
                        </div>
                      </div>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={notifications.email}
                            onChange={e =>
                              setNotifications({ ...notifications, email: e.target.checked })
                            }
                          />
                        }
                        label=''
                      />
                    </div>

                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-3'>
                        <NotificationIcon
                          sx={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: 20 }}
                        />
                        <div>
                          <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Desktop Notifications
                          </p>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Show notifications on desktop
                          </p>
                        </div>
                      </div>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={notifications.desktop}
                            onChange={e =>
                              setNotifications({ ...notifications, desktop: e.target.checked })
                            }
                          />
                        }
                        label=''
                      />
                    </div>

                    <div className='flex items-center justify-between'>
                      <div className='flex items-center gap-3'>
                        <SecurityIcon
                          sx={{ color: isDark ? '#9ca3af' : '#6b7280', fontSize: 20 }}
                        />
                        <div>
                          <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                            Security Alerts
                          </p>
                          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                            Important security notifications
                          </p>
                        </div>
                      </div>
                      <FormControlLabel
                        control={<Switch checked={true} disabled={true} />}
                        label=''
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default ProfilePage;

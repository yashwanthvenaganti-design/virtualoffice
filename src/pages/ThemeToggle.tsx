import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useTheme } from '../theme/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  const handleToggle = () => {
    setIsAnimating(true);
    toggleTheme();
    setTimeout(() => setIsAnimating(false), 600);
  };

  return (
    <div className='relative'>
      {/* Outer glow effect */}
      <div
        className={`
        absolute inset-0 rounded-2xl transition-all duration-700 ease-out
        ${
          isDark
            ? 'shadow-[0_0_20px_rgba(59,130,246,0.3)] bg-gradient-to-br from-blue-500/20 to-purple-600/20'
            : 'shadow-[0_0_20px_rgba(245,158,11,0.3)] bg-gradient-to-br from-amber-400/20 to-orange-500/20'
        }
        ${isAnimating ? 'scale-110 opacity-100' : 'scale-100 opacity-0'}
      `}
      />

      {/* Main button */}
      <IconButton
        onClick={handleToggle}
        className={`
          !relative !w-12 !h-12 !rounded-2xl !transition-all !duration-500 !ease-out
          !border-2 !overflow-hidden group
          focus:!outline-none 
          ${
            isDark
              ? '!border-slate-600/50 !bg-gradient-to-br !from-slate-800 !to-slate-900 hover:!from-slate-700 hover:!to-slate-800'
              : '!border-amber-200/70 !bg-gradient-to-br !from-amber-50 !to-orange-100 hover:!from-amber-100 hover:!to-orange-200'
          }
          hover:!scale-105 hover:!shadow-xl active:!scale-95
          ${isAnimating ? '!animate-pulse' : ''}
        `}
        sx={{
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: '-50%',
            left: '-50%',
            width: '200%',
            height: '200%',
            background: isDark
              ? 'conic-gradient(from 0deg, rgba(59,130,246,0.1), rgba(147,51,234,0.1), rgba(59,130,246,0.1))'
              : 'conic-gradient(from 0deg, rgba(245,158,11,0.1), rgba(251,191,36,0.1), rgba(245,158,11,0.1))',
            borderRadius: '50%',
            animation: isAnimating ? 'spin 0.6s linear' : 'none',
            opacity: isAnimating ? 1 : 0,
            transition: 'opacity 0.3s ease',
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: '2px',
            background: isDark
              ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
              : 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
            borderRadius: '14px',
            zIndex: 1,
          },
          '@keyframes spin': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
          },
        }}
      >
        {/* Icon container with smooth rotation */}
        <div
          className={`
          relative z-10 flex items-center justify-center transition-all duration-500 ease-out
          ${isAnimating ? 'rotate-180 scale-110' : 'rotate-0 scale-100'}
        `}
        >
          {/* Background orb effect */}
          <div
            className={`
            absolute inset-0 rounded-full transition-all duration-500 ease-out,
            ${isAnimating ? 'scale-110 opacity-100' : 'scale-90 opacity-60'}
            group-hover:scale-100 group-hover:opacity-80
          `}
          />

          {/* Icon with enhanced styling */}
          <div className='relative z-10'>
            {isDark ? (
              <DarkMode
                className={`
                  transition-all duration-500 ease-out
                  text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.6)]
                  ${isAnimating ? 'brightness-150' : 'brightness-100'}
                  group-hover:brightness-125
                `}
                sx={{ fontSize: 20 }}
              />
            ) : (
              <LightMode
                className={`
                  transition-all duration-500 ease-out
                  text-amber-600 drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]
                  ${isAnimating ? 'brightness-150' : 'brightness-100'}
                  group-hover:brightness-125
                `}
                sx={{ fontSize: 20 }}
              />
            )}
          </div>
        </div>

        {/* Ripple effect on click */}
        {isAnimating && (
          <div
            className={`
            absolute inset-0 rounded-2xl animate-ping
            ${
              isDark
                ? 'bg-blue-500/30 border-2 border-blue-400/50'
                : 'bg-amber-500/30 border-2 border-amber-400/50'
            }
          `}
            style={{ animationDuration: '0.6s' }}
          />
        )}
      </IconButton>

      {/* Floating particles effect */}
      {isAnimating && (
        <>
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`
                absolute w-1 h-1 rounded-full animate-ping
                ${isDark ? 'bg-blue-400' : 'bg-amber-400'}
              `}
              style={{
                top: `${20 + Math.sin((i * 60 * Math.PI) / 180) * 20}px`,
                left: `${20 + Math.cos((i * 60 * Math.PI) / 180) * 20}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '0.8s',
              }}
            />
          ))}
        </>
      )}

      {/* Tooltip-like indicator */}
      <div
        className={`
        absolute -bottom-8 left-1/2 transform -translate-x-1/2 
        px-2 py-1 rounded-md text-xs font-medium whitespace-nowrap
        transition-all duration-300 ease-out pointer-events-none
        ${
          isDark
            ? 'bg-slate-800 text-blue-300 border border-slate-600'
            : 'bg-white text-amber-700 border border-amber-200 shadow-md'
        }
        ${isAnimating ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
      `}
      >
        {isDark ? '☾ Dark Mode' : '☀ Light Mode'}
        <div
          className={`
          absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rotate-45
          ${isDark ? 'bg-slate-800 border-l border-t border-slate-600' : 'bg-white border-l border-t border-amber-200'}
        `}
        />
      </div>
    </div>
  );
};

export default ThemeToggle;

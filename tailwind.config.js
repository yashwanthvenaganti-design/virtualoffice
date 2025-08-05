/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dashboard: {
          // Dark theme colors
          dark: {
            bg: '#0F172A', // Main background
            surface: '#1E293B', // Card/surface background
            surfaceHover: '#334155', // Hover states
            border: '#334155', // Borders
            text: '#F8FAFC', // Primary text
            textSecondary: '#CBD5E1', // Secondary text
            textMuted: '#94A3B8', // Muted text
          },
          // Light theme colors
          light: {
            bg: '#FFFFFF', // Main background
            surface: '#F8FAFC', // Card/surface background
            surfaceHover: '#F1F5F9', // Hover states
            border: '#E2E8F0', // Borders
            text: '#0F172A', // Primary text
            textSecondary: '#475569', // Secondary text
            textMuted: '#64748B', // Muted text
          },
        },
        // Accent colors from your design
        accent: {
          purple: '#8B5CF6', // Purple cards
          green: '#10B981', // Green cards/elements
          orange: '#F59E0B', // Orange cards
          blue: '#3B82F6', // Blue elements
          teal: '#14B8A6', // Teal/cyan elements
        },
        // Sidebar specific colors
        sidebar: {
          // Dark theme
          dark: {
            bg: '#0F172A',
            surface: '#1E293B',
            border: '#334155',
            text: '#F8FAFC',
            textSecondary: '#CBD5E1',
            textMuted: '#94A3B8',
            active: '#3B82F6',
            activeBg: '#1E40AF20',
            hover: '#334155',
          },
          // Light theme
          light: {
            bg: '#FFFFFF',
            surface: '#F8FAFC',
            border: '#E2E8F0',
            text: '#0F172A',
            textSecondary: '#475569',
            textMuted: '#64748B',
            active: '#3B82F6',
            activeBg: '#DBEAFE',
            hover: '#F1F5F9',
          },
        },
        // Header specific colors
        header: {
          // Dark theme
          dark: {
            bg: '#0F172A',
            surface: '#1E293B',
            border: '#334155',
            text: '#F8FAFC',
            textSecondary: '#CBD5E1',
            textMuted: '#94A3B8',
            hover: '#334155',
            searchBg: '#1E293B',
            searchBorder: '#475569',
            searchFocus: '#3B82F6',
          },
          // Light theme
          light: {
            bg: '#FFFFFF',
            surface: '#F8FAFC',
            border: '#E2E8F0',
            text: '#0F172A',
            textSecondary: '#475569',
            textMuted: '#64748B',
            hover: '#F1F5F9',
            searchBg: '#FFFFFF',
            searchBorder: '#D1D5DB',
            searchFocus: '#3B82F6',
          },
        },
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        secondary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
        success: {
          50: '#f0fdf4',
          500: '#22c55e',
          600: '#16a34a',
        },
        warning: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
        },
        error: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'fade-in-up': 'fadeInUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0, 0, 0, 0.1)',
        'glass-dark': '0 8px 32px rgba(0, 0, 0, 0.3)',
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'card-dark': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        header: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'header-dark': '0 4px 12px -2px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
        search: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'search-focus':
          '0 10px 15px -3px rgba(59, 130, 246, 0.1), 0 4px 6px -2px rgba(59, 130, 246, 0.05)',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')({ nocompatible: true })],
};

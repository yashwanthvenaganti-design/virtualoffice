import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDark, setIsDark] = useState<boolean>(false);
  const [systemPreference, setSystemPreference] = useState<boolean>(false);

  // Detect system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemPreference(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setSystemPreference(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      setIsDark(true);
    } else if (savedTheme === 'light') {
      setIsDark(false);
    } else {
      // Use system preference if no saved preference
      setIsDark(systemPreference);
    }
  }, [systemPreference]);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;

    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', isDark ? '#111827' : '#f9fafb');
    }
  }, [isDark]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  const setTheme = (theme: 'light' | 'dark' | 'system') => {
    if (theme === 'system') {
      setIsDark(systemPreference);
      localStorage.removeItem('theme');
    } else {
      setIsDark(theme === 'dark');
      localStorage.setItem('theme', theme);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

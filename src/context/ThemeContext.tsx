'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Theme, ThemeContextType } from '@/types/theme';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default to 'zeus' as the primary theme
  const [theme, setTheme] = useState<Theme>('zeus');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Avoid hydration mismatch by waiting for mount
    setMounted(true);
    const savedTheme = localStorage.getItem('olympus-theme') as Theme | null;
    if (savedTheme && ['zeus', 'poseidon', 'hades'].includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Update data-theme attribute on document root
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('olympus-theme', theme);
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme(prev => {
      if (prev === 'zeus') return 'poseidon';
      if (prev === 'poseidon') return 'hades';
      return 'zeus';
    });
  };

  // Prevent flash of incorrect theme (optional, can be improved with script in head)
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Fallback for build/SSR or disconnected components
    return {
      theme: 'zeus',
      setTheme: () => {},
      toggleTheme: () => {}
    } as ThemeContextType;
  }
  return context;
}

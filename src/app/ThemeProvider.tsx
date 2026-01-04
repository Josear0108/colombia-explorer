import { ReactNode, useEffect } from 'react';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  useEffect(() => {
    // Cargar tema guardado o usar dark por defecto
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const root = document.documentElement;

    if (savedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  return <>{children}</>;
};

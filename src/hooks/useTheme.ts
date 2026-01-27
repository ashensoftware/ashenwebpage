
import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

export const useTheme = () => {
    const [theme, setTheme] = useState<Theme>(() => {
        // Check local storage or system preference
        if (typeof window !== 'undefined') {
            const savedTheme = localStorage.getItem('theme') as Theme;
            if (savedTheme) return savedTheme;
            return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        }
        return 'dark'; // Default
    });

    useEffect(() => {
        const root = window.document.body;
        root.classList.remove('light-mode', 'dark-mode');

        if (theme === 'light') {
            root.classList.add('light-mode');
        } else {
            root.classList.add('dark-mode');
        }

        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
    };

    return { theme, toggleTheme };
};

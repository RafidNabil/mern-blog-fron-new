import React from 'react';
import { Box } from '@mui/joy';
import { useColorScheme } from '@mui/joy/styles';
import { useTheme } from '../contexts/ThemeContext.jsx';

import Navbar from './navbar.jsx';
import Footer from './footer.jsx';

export default function Layout({ children }) {
    const { isDarkMode, toggleTheme } = useTheme();
    const { setMode } = useColorScheme();

    // Sync theme context with MUI Joy theme system
    React.useEffect(() => {
        setMode(isDarkMode ? 'dark' : 'light');
    }, [isDarkMode, setMode]);

    return (
        <>
            <Navbar toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
            <Box
                component="main"
                sx={{
                    px: { xs: '4%', md: '16%' },
                    mt: 10
                }}
            >
                {children}
            </Box>
            <Footer />
        </>
    );
}
import { extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
    colorSchemes: {
        light: {
            palette: {
                background: {
                    body: '#ffffff',
                    surface: '#f8f9fa',
                    level1: '#f1f3f4',
                    level2: '#e8eaed',
                    level3: '#dadce0',
                },
                text: {
                    primary: '#202124',
                    secondary: '#5f6368',
                    tertiary: '#80868b',
                },
                primary: {
                    50: '#e3f2fd',
                    100: '#bbdefb',
                    200: '#90caf9',
                    300: '#64b5f6',
                    400: '#42a5f5',
                    500: '#2196f3',
                    600: '#1e88e5',
                    700: '#1976d2',
                    800: '#1565c0',
                    900: '#0d47a1',
                },
            },
        },
        dark: {
            palette: {
                background: {
                    body: '#0f1419',
                    surface: '#1a1d21',
                    level1: '#242729',
                    level2: '#2e3134',
                    level3: '#383b3e',
                },
                text: {
                    primary: '#e8eaed',
                    secondary: '#9aa0a6',
                    tertiary: '#80868b',
                },
                primary: {
                    50: '#e3f2fd',
                    100: '#bbdefb',
                    200: '#90caf9',
                    300: '#64b5f6',
                    400: '#42a5f5',
                    500: '#2196f3',
                    600: '#1e88e5',
                    700: '#1976d2',
                    800: '#1565c0',
                    900: '#0d47a1',
                },
            },
        },
    },
    cssVarPrefix: 'joy',
});

export default theme;

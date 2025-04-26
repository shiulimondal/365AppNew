import React, { createContext, useContext, useEffect, useState } from 'react';
import { Appearance } from 'react-native';
const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(
        Appearance.getColorScheme() === 'dark',
    );

    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            setIsDarkMode(colorScheme === 'dark');
        });

        return () => subscription.remove();
    }, []);

    const colors = {
        dark: {
            primaryThemeColor: '#1C81E9',
            secondaryThemeColor: '#ffffff',
            primaryFontColor: '#0E192A',
            secondaryFontColor: '#1E1E1E',
            subFontcolor: '#FFFFFF',
            tintText: '#595959',
            cardColor: 'rgba(214, 235, 255, 1)',
            inputBorder: 'rgba(240, 240, 240, 1)',
            inputBox: 'rgba(250, 250, 250, 1)',
            shadowColor: '#999',
            statusBarStyle: 'light-content',
            bottomTab: '#102048',
            borderColor: '#D0D0D0',
            buttonColor: '#1C81E9',
        },
        light: {
            primaryThemeColor: '#1C81E9',
            secondaryThemeColor: '#ffffff',
            primaryFontColor: '#0E192A',
            secondaryFontColor: '#1E1E1E',
            subFontcolor: '#FFFFFF',
            tintText: '#595959',
            cardColor: 'rgba(214, 235, 255, 1)',
            inputBorder: 'rgba(240, 240, 240, 1)',
            inputBox: 'rgba(250, 250, 250, 1)',
            shadowColor: '#999',
            statusBarStyle: 'light-content',
            bottomTab: '#102048',
            borderColor: '#D0D0D0',
            buttonColor: '#1C81E9',
        },
    };

    return (
        <ThemeContext.Provider
            value={{ isDarkMode, colors: isDarkMode ? colors.dark : colors.light }}>
            {children}
        </ThemeContext.Provider>
    );
};

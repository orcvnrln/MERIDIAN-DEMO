"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export interface ThemePalette {
    bg: string;
    card: string;
    elevated: string;
    text: string;
    muted: string;
    faded: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
    border: string;
    purple: string;
    cyan: string;
}

const darkPalette: ThemePalette = {
    bg: "#0D0D14",
    card: "#1A1A25",
    elevated: "#252532",
    text: "#E2E2F0",
    muted: "#A0A0B8",
    faded: "#6B6B7F",
    success: "#00F5A8",
    warning: "#FFA500",
    danger: "#FF4D8D",
    info: "#4A55E0",
    border: "rgba(74,85,224,0.2)",
    purple: "#A855F7",
    cyan: "#06B6D4",
};

const lightPalette: ThemePalette = {
    bg: "#F5F7FA",
    card: "#FFFFFF",
    elevated: "#F0F2F5",
    text: "#1A1A2E",
    muted: "#5C5C7A",
    faded: "#9999AA",
    success: "#00C48C",
    warning: "#FF9500",
    danger: "#FF3B6B",
    info: "#4A55E0",
    border: "rgba(74,85,224,0.15)",
    purple: "#9333EA",
    cyan: "#0891B2",
};

interface ThemeContextType {
    theme: "light" | "dark";
    palette: ThemePalette;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "dark",
    palette: darkPalette,
    toggleTheme: () => { },
});

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        if (savedTheme) {
            setTheme(savedTheme);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
    };

    const palette = theme === "dark" ? darkPalette : lightPalette;

    return (
        <ThemeContext.Provider value={{ theme, palette, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// Export palettes for use in components
export { darkPalette, lightPalette };

"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "dark";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
    theme: "dark",
    setTheme: () => { },
});

export function useTheme() {
    return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
    // Always dark
    useEffect(() => {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
    }, []);

    return (
        <ThemeContext.Provider value={{ theme: "dark", setTheme: () => { } }}>
            {children}
        </ThemeContext.Provider>
    );
}

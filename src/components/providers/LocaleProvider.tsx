"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Locale, t } from "@/lib/i18n";

interface LocaleContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (section: string, key: string) => string | string[];
}

const LocaleContext = createContext<LocaleContextType>({
    locale: "tr",
    setLocale: () => { },
    t: () => "",
});

export function useLocale() {
    return useContext(LocaleContext);
}

export function LocaleProvider({ children }: { children: ReactNode }) {
    const [locale, setLocaleState] = useState<Locale>(() => {
        if (typeof window !== "undefined") {
            return (localStorage.getItem("locale") as Locale) || "tr";
        }
        return "tr";
    });

    const setLocale = useCallback((newLocale: Locale) => {
        setLocaleState(newLocale);
        if (typeof window !== "undefined") {
            localStorage.setItem("locale", newLocale);
        }
    }, []);

    const translate = useCallback(
        (section: string, key: string) => t(section, key, locale),
        [locale]
    );

    return (
        <LocaleContext.Provider value={{ locale, setLocale, t: translate }}>
            {children}
        </LocaleContext.Provider>
    );
}

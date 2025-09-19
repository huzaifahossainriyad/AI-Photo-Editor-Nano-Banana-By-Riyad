import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';

type Language = 'en' | 'hi' | 'ar' | 'ja' | 'bn';

type Translations = {
    [key in Language]?: { [key: string]: string }
};

interface LocalizationContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: string) => string;
}

const LocalizationContext = createContext<LocalizationContextType | undefined>(undefined);

export const LocalizationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>('en');
    const [translations, setTranslations] = useState<Translations>({});
    const [isLoaded, setIsLoaded] = useState(false);

    // Effect to load the default language ('en') on initial mount
    useEffect(() => {
        const fetchDefaultLanguage = async () => {
            try {
                const response = await fetch('/locales/en.json');
                if (!response.ok) throw new Error('Failed to load default language file.');
                const data = await response.json();
                setTranslations({ en: data });
            } catch (error) {
                console.error(error);
                // If fetching fails, the app will still render but fallback to keys
            } finally {
                setIsLoaded(true); // Unlock the app after attempting to load
            }
        };
        fetchDefaultLanguage();
    }, []); // Empty dependency array ensures this runs only once on mount

    const setLanguage = useCallback((lang: Language) => {
        // If the language is already loaded, just set it
        if (translations[lang]) {
            setLanguageState(lang);
        } else {
            // Otherwise, fetch it, then set it
            const fetchLanguage = async () => {
                try {
                    const response = await fetch(`/locales/${lang}.json`);
                    if (!response.ok) throw new Error(`Failed to load language: ${lang}`);
                    const data = await response.json();
                    setTranslations(prev => ({ ...prev, [lang]: data }));
                    setLanguageState(lang);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchLanguage();
        }
    }, [translations]);

    const t = useCallback((key: string): string => {
        const currentTranslations = translations[language];
        // Safely access the key, falling back to the key itself if not found
        return currentTranslations?.[key] || key;
    }, [language, translations]);

    // Don't render the rest of the app until the initial language file has been loaded
    if (!isLoaded) {
        return null;
    }

    return (
        <LocalizationContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LocalizationContext.Provider>
    );
};

export const useLocalization = (): LocalizationContextType => {
    const context = useContext(LocalizationContext);
    if (!context) {
        throw new Error('useLocalization must be used within a LocalizationProvider');
    }
    return context;
};

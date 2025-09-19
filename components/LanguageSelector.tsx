import React from 'react';
// Fix: Add .tsx extension for module resolution
import { useLocalization } from '../context/LocalizationContext.tsx';
// Fix: Add .tsx extension for module resolution
import { GlobeIcon } from './Icons.tsx';

type Language = 'en' | 'hi' | 'ar' | 'ja' | 'bn';

const LANGUAGES: { code: Language, name: string }[] = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिन्दी' },
    { code: 'ar', name: 'العربية' },
    { code: 'ja', name: '日本語' },
    { code: 'bn', name: 'বাংলা' }
];

const LanguageSelector: React.FC = () => {
    const { language, setLanguage } = useLocalization();

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value as Language);
    };

    return (
        <div className="relative flex items-center">
            <GlobeIcon className="w-5 h-5 text-slate-400 absolute left-3 pointer-events-none" />
            <select
                value={language}
                onChange={handleLanguageChange}
                className="appearance-none bg-slate-800 border border-slate-700 rounded-md pl-10 pr-4 py-2 text-slate-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none cursor-pointer"
                aria-label="Select language"
            >
                {LANGUAGES.map(({ code, name }) => (
                    <option key={code} value={code}>
                        {name}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;
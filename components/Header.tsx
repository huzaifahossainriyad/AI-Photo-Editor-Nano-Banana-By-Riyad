import React, { useState } from 'react';
// Fix: Add .tsx extension for module resolution
import LanguageSelector from './LanguageSelector.tsx';
// Fix: Add .tsx extension for module resolution
import UserGuideModal from './UserGuideModal.tsx';
// Fix: Add .tsx extension for module resolution
import { InfoIcon } from './Icons.tsx';
// Fix: Add .tsx extension for module resolution
import { useLocalization } from '../context/LocalizationContext.tsx';

const Header: React.FC = () => {
    const { t } = useLocalization();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <header className="w-full flex justify-between items-center py-4 sm:py-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {t('appTitle')}
                </h1>
                <div className="flex items-center gap-2 sm:gap-4">
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors text-sm sm:text-base"
                        aria-label={t('userGuideTitle')}
                    >
                        <InfoIcon className="w-5 h-5" />
                        <span className="hidden sm:inline">{t('guideButton')}</span>
                    </button>
                    <LanguageSelector />
                </div>
            </header>
            <UserGuideModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default Header;

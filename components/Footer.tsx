import React from 'react';
// Fix: Add .tsx extension for module resolution
import { useLocalization } from '../context/LocalizationContext.tsx';

const Footer: React.FC = () => {
    const { t } = useLocalization();
    return (
        <footer className="w-full text-center py-6">
            <p className="text-slate-500 text-sm">
                {t('credit')}
            </p>
        </footer>
    );
};

export default Footer;
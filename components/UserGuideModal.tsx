import React from 'react';
// Fix: Add .tsx extension for module resolution
import { useLocalization } from '../context/LocalizationContext.tsx';
// Fix: Add .tsx extension for module resolution
import { XIcon } from './Icons.tsx';

interface UserGuideModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UserGuideModal: React.FC<UserGuideModalProps> = ({ isOpen, onClose }) => {
    const { t } = useLocalization();

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-labelledby="guide-title"
        >
            <div 
                className="bg-slate-800 rounded-xl border border-slate-700 shadow-2xl p-6 sm:p-8 w-full max-w-lg relative text-slate-300"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                    aria-label={t('close')}
                >
                    <XIcon className="w-6 h-6" />
                </button>
                <h2 id="guide-title" className="text-2xl font-bold text-white mb-4">{t('userGuideTitle')}</h2>
                <div className="space-y-4 text-slate-400">
                    <p dangerouslySetInnerHTML={{ __html: t('userGuideStep1') }} />
                    <p dangerouslySetInnerHTML={{ __html: t('userGuideStep2') }} />
                    <p dangerouslySetInnerHTML={{ __html: t('userGuideStep3') }} />
                    <p dangerouslySetInnerHTML={{ __html: t('userGuideStep4') }} />
                </div>
                 <button
                    onClick={onClose}
                    className="mt-6 w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-indigo-500 transition-colors"
                >
                    {t('close')}
                </button>
            </div>
        </div>
    );
};

export default UserGuideModal;
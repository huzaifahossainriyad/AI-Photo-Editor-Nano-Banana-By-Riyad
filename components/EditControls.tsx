import React from 'react';
// Fix: Add .tsx extension for module resolution
import { WandIcon } from './Icons.tsx';
// Fix: Add .tsx extension for module resolution
import { useLocalization } from '../context/LocalizationContext.tsx';

interface EditControlsProps {
    prompt: string;
    onPromptChange: (value: string) => void;
    onSubmit: () => void;
    isLoading: boolean;
    isSubmitDisabled: boolean;
}

const EditControls: React.FC<EditControlsProps> = ({ prompt, onPromptChange, onSubmit, isLoading, isSubmitDisabled }) => {
    const { t } = useLocalization();

    return (
        <div className="w-full">
            <h2 className="text-xl font-semibold text-slate-300 mb-2">{t('controlsTitle')}</h2>
            <textarea
                value={prompt}
                onChange={(e) => onPromptChange(e.target.value)}
                placeholder={t('controlsPlaceholder')}
                className="w-full h-28 p-3 bg-slate-900 border border-slate-700 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
                disabled={isLoading}
            />
            <button
                onClick={onSubmit}
                disabled={isLoading || isSubmitDisabled}
                className="mt-4 w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-200"
            >
                {isLoading ? (
                    <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('controlsButtonLoading')}
                    </>
                ) : (
                    <>
                        <WandIcon className="w-5 h-5" />
                        {t('controlsButton')}
                    </>
                )}
            </button>
        </div>
    );
};

export default EditControls;
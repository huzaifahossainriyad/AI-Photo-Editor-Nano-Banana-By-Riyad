import React, { useState } from 'react';
import { EditedImageResult } from '../types';
// Fix: Add .tsx extension for module resolution
import { DownloadIcon, CopyIcon } from './Icons.tsx';
// Fix: Add .tsx extension for module resolution
import { useLocalization } from '../context/LocalizationContext.tsx';

interface ResultDisplayProps {
    result: EditedImageResult | null;
    isLoading: boolean;
    error: string | null;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, isLoading, error }) => {
    const { t } = useLocalization();
    const [copied, setCopied] = useState(false);

    const handleCopyText = () => {
        if (result?.text) {
            navigator.clipboard.writeText(result.text).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    const handleDownloadImage = () => {
        if (result?.imageUrl) {
            const link = document.createElement('a');
            link.href = result.imageUrl;
            link.download = `edited-image-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    const renderContent = () => {
        if (isLoading) {
            return <div className="text-center text-slate-400">{t('resultLoading')}</div>;
        }

        if (error) {
            return <div className="text-center text-red-400">{t('errorPrefix')}: {error}</div>;
        }

        if (!result || !result.imageUrl) {
            return <div className="text-center text-slate-500">{t('resultPlaceholder')}</div>;
        }

        return (
            <div className="flex flex-col gap-4">
                <div className="relative group">
                    <img src={result.imageUrl} alt="Edited result" className="w-full h-auto object-contain rounded-lg" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                            onClick={handleDownloadImage}
                            className="flex items-center gap-2 bg-slate-100 text-slate-800 font-semibold py-2 px-4 rounded-md hover:bg-white transition-colors"
                        >
                            <DownloadIcon className="w-5 h-5" />
                            {t('downloadButton')}
                        </button>
                    </div>
                </div>
                {result.text && (
                    <div className="bg-slate-900 p-4 rounded-md border border-slate-700">
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-slate-300 font-semibold">{t('textResponseTitle')}</p>
                            <button
                                onClick={handleCopyText}
                                className="text-sm text-slate-400 hover:text-white flex items-center gap-1"
                                title={copied ? t('copiedTooltip') : t('copyTooltip')}
                            >
                                {copied ? t('copiedTooltip') : t('copyTooltip')}
                                <CopyIcon className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-slate-400 whitespace-pre-wrap">{result.text}</p>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="w-full">
            <h2 className="text-xl font-semibold text-slate-300 mb-2">{t('resultTitle')}</h2>
            <div className="w-full aspect-video border-2 border-slate-800 bg-slate-900/50 rounded-lg flex items-center justify-center p-2">
                {renderContent()}
            </div>
        </div>
    );
};

export default ResultDisplay;

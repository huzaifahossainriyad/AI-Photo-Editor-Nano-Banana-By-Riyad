import React, { useRef } from 'react';
// Fix: Add .tsx extension for module resolution
import { UploadIcon } from './Icons.tsx';
// Fix: Add .tsx extension for module resolution
import { useLocalization } from '../context/LocalizationContext.tsx';

interface ImageUploaderProps {
    onImageSelect: (file: File) => void;
    previewUrl: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelect, previewUrl }) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { t } = useLocalization();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            onImageSelect(event.target.files[0]);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
             onImageSelect(event.dataTransfer.files[0]);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.stopPropagation();
    };
    
    const handleClick = () => {
        fileInputRef.current?.click();
    }

    return (
        <div className="w-full">
            <h2 className="text-xl font-semibold text-slate-300 mb-2">{t('uploaderTitle')}</h2>
            <div
                onClick={handleClick}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                className="relative w-full aspect-video border-2 border-dashed border-slate-600 rounded-lg flex items-center justify-center text-center p-4 cursor-pointer hover:border-indigo-400 hover:bg-slate-800 transition-colors"
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/png, image/jpeg, image/webp"
                    className="hidden"
                />
                {previewUrl ? (
                    <img src={previewUrl} alt="Original preview" className="max-h-full max-w-full object-contain rounded-md" />
                ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-500">
                        <UploadIcon className="w-12 h-12" />
                        <p className="font-semibold">{t('uploaderPrompt')}</p>
                        <p className="text-sm">{t('uploaderFileType')}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUploader;
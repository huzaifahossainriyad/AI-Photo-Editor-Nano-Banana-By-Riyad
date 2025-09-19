import React, { useState, useMemo } from 'react';
// Fix: Add .tsx extension for module resolution
import Header from './components/Header.tsx';
// Fix: Add .tsx extension for module resolution
import ImageUploader from './components/ImageUploader.tsx';
// Fix: Add .tsx extension for module resolution
import EditControls from './components/EditControls.tsx';
// Fix: Add .tsx extension for module resolution
import ResultDisplay from './components/ResultDisplay.tsx';
// Fix: Add .tsx extension for module resolution
import Footer from './components/Footer.tsx';
import { editImage } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import { EditedImageResult } from './types';
// Fix: Add .tsx extension for module resolution
import { useLocalization } from './context/LocalizationContext.tsx';


const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [result, setResult] = useState<EditedImageResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLocalization();

  const previewUrl = useMemo(() => {
    if (imageFile) {
      return URL.createObjectURL(imageFile);
    }
    return null;
  }, [imageFile]);

  const handleImageSelect = (file: File) => {
    setImageFile(file);
    setResult(null); // Clear previous result when a new image is selected
    setError(null);
  };

  const handleSubmit = async () => {
    if (!imageFile || !prompt) {
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const { base64Data, mimeType } = await fileToBase64(imageFile);
      const apiResult = await editImage(base64Data, mimeType, prompt);
      setResult(apiResult);
    } catch (e: any) {
      setError(e.message || t('errorGeneric'));
    } finally {
      setIsLoading(false);
    }
  };

  const isSubmitDisabled = !imageFile || !prompt.trim();

  return (
    <div className="bg-slate-900 min-h-screen text-slate-200 flex flex-col items-center px-4">
      <div className="w-full max-w-4xl mx-auto">
        <Header />
        <main className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-4">
          <div className="flex flex-col gap-6">
            <ImageUploader onImageSelect={handleImageSelect} previewUrl={previewUrl} />
            <EditControls
              prompt={prompt}
              onPromptChange={setPrompt}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              isSubmitDisabled={isSubmitDisabled}
            />
          </div>
          <div className="flex flex-col">
            <ResultDisplay result={result} isLoading={isLoading} error={error} />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;


export const fileToBase64 = (file: File): Promise<{ base64Data: string; mimeType: string }> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            // The result is a data URL like "data:image/jpeg;base64,..."
            // We need to extract the base64 part and the mime type.
            const mimeType = result.split(':')[1].split(';')[0];
            const base64Data = result.split(',')[1];
            if (base64Data && mimeType) {
                resolve({ base64Data, mimeType });
            } else {
                reject(new Error("Failed to parse file data."));
            }
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsDataURL(file);
    });
};

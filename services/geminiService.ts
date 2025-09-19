import { GoogleGenAI, Modality } from "@google/genai";
import { EditedImageResult } from "../types";

// Initialize the GoogleGenAI client with the API key from environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

/**
 * Edits an image based on a text prompt using the Gemini API.
 * @param base64ImageData The base64 encoded string of the image.
 * @param mimeType The MIME type of the image.
 * @param prompt The text prompt for editing the image.
 * @returns A promise that resolves to an EditedImageResult object containing the new image URL and text.
 */
export const editImage = async (
    base64ImageData: string,
    mimeType: string,
    prompt: string
): Promise<EditedImageResult> => {
    // According to the guidelines, use the 'gemini-2.5-flash-image-preview' model for image editing.
    const model = 'gemini-2.5-flash-image-preview';

    // Construct the request payload with image and text parts.
    const imagePart = {
        inlineData: {
            data: base64ImageData,
            mimeType: mimeType,
        },
    };
    const textPart = {
        text: prompt,
    };

    try {
        // Call the Gemini API to generate content.
        const response = await ai.models.generateContent({
            model: model,
            contents: {
                parts: [imagePart, textPart],
            },
            // The config must include both IMAGE and TEXT modalities for this model.
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        // Initialize the result object.
        const result: EditedImageResult = {
            imageUrl: null,
            text: null,
        };

        // Process the response parts.
        // The response can contain multiple parts, including text and the edited image.
        if (response.candidates && response.candidates.length > 0) {
            for (const part of response.candidates[0].content.parts) {
                if (part.text) {
                    result.text = part.text;
                } else if (part.inlineData) {
                    const base64ImageBytes: string = part.inlineData.data;
                    // Create a data URL for the new image.
                    result.imageUrl = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
                }
            }
        }

        // If no image was returned, throw an error.
        if (!result.imageUrl) {
            throw new Error("API did not return an edited image.");
        }

        return result;

    } catch (error) {
        console.error("Error editing image with Gemini API:", error);
        // Re-throw the error to be handled by the calling component.
        throw new Error("Failed to edit image. Please check the console for more details.");
    }
};


import { GoogleGenAI, Chat } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you might want to handle this more gracefully.
  // For this context, we assume the key is present.
  console.warn("API_KEY environment variable not set. App will not function correctly.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY as string });

export function startChat(): Chat {
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    history: [
      {
        role: 'user',
        parts: [{ text: 'Hello! I need some financial advice.' }],
      },
      {
        role: 'model',
        parts: [{ text: 'Of course! I am Gemini, your personal finance assistant. How can I help you today? Ask me about budgeting, saving, or general financial questions.' }],
      },
    ],
    config: {
      systemInstruction: 'You are a friendly and helpful financial assistant chatbot named Gemini. Provide concise and practical advice about personal finance, budgeting, and saving. Do not provide investment advice that could be considered financial solicitation. Keep responses helpful and easy to understand.',
    },
  });
}

export async function generateImage(prompt: string): Promise<string> {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: `A high-quality, professional, and inspiring image representing a financial goal: ${prompt}. Style: photorealistic, vibrant, positive.`,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: '16:9',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        } else {
            throw new Error("No image was generated.");
        }
    } catch (error) {
        console.error("Error generating image:", error);
        throw new Error("Failed to generate image. Please check the prompt or try again later.");
    }
}

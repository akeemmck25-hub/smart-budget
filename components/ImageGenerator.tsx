
import React, { useState } from 'react';
import { generateImage } from '../services/geminiService';
import { ImageIcon } from './Icons';

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt to visualize your goal.");
      return;
    }
    setIsLoading(true);
    setGeneratedImage(null);
    setError(null);

    try {
      const imageUrl = await generateImage(prompt);
      setGeneratedImage(imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleGenerate();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white text-center">Goal Visualizer</h2>
      <p className="text-center text-gray-400">
        Turn your financial goals into inspiring images. What are you saving for?
      </p>
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="e.g., A new car, a vacation house by the beach..."
            className="flex-1 bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm text-white p-3"
            disabled={isLoading}
          />
          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="flex justify-center items-center gap-2 py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-emerald-500 disabled:bg-gray-600"
          >
            {isLoading ? 'Generating...' : 'Visualize'}
          </button>
        </div>
      </div>
      
      {error && <p className="text-center text-red-400 mt-4">{error}</p>}
      
      <div className="mt-6 aspect-video bg-gray-900/50 rounded-lg flex items-center justify-center overflow-hidden border border-gray-700">
        {isLoading && (
           <div className="flex flex-col items-center gap-2 text-gray-400">
            <ImageIcon className="h-12 w-12 animate-pulse text-emerald-500"/>
            <p>Creating your vision...</p>
           </div>
        )}
        {generatedImage && !isLoading && (
          <img src={generatedImage} alt={prompt} className="object-contain w-full h-full" />
        )}
        {!generatedImage && !isLoading && (
           <div className="text-center text-gray-500">
            <p>Your generated image will appear here.</p>
           </div>
        )}
      </div>
    </div>
  );
};

export default ImageGenerator;

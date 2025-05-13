
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Loader2, Sparkles } from 'lucide-react';
import { generateImageWithAI } from '@/services/imageGenerationService';

interface AIImageGeneratorProps {
  onImageGenerated: (imageUrl: string, imageAlt: string) => void;
}

const AIImageGenerator: React.FC<AIImageGeneratorProps> = ({ onImageGenerated }) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generatedAlt, setGeneratedAlt] = useState<string>('');

  const handleGenerateImage = async () => {
    if (!prompt.trim()) {
      return;
    }

    setIsGenerating(true);
    
    try {
      const result = await generateImageWithAI(prompt);
      
      if (result) {
        setGeneratedImage(result.url);
        setGeneratedAlt(result.alt);
        onImageGenerated(result.url, result.alt);
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePromptKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleGenerateImage();
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">AI Image Generator</h2>
      <div className="space-y-2">
        <Textarea
          placeholder="Describe the image you want to generate..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handlePromptKeyDown}
          disabled={isGenerating}
          className="min-h-[80px]"
        />
        <Button
          onClick={handleGenerateImage}
          disabled={isGenerating || !prompt.trim()}
          className="w-full sm:w-auto bg-gradient-primary hover:brightness-110 transition-all"
        >
          {isGenerating ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
          ) : (
            <><Sparkles className="mr-2 h-4 w-4" /> Generate Image</>
          )}
        </Button>
      </div>
      
      {generatedImage && (
        <div className="border rounded-md overflow-hidden">
          <AspectRatio ratio={16/9}>
            <img
              src={generatedImage}
              alt={generatedAlt}
              className="w-full h-full object-cover"
            />
          </AspectRatio>
          <div className="p-2 bg-muted/30">
            <p className="text-sm">{prompt}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIImageGenerator;

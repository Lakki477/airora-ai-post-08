
import { toast } from "sonner";
import { getApiKey } from "./aiService";

interface GeneratedImageResponse {
  url: string;
  alt: string;
}

export const generateImageWithAI = async (prompt: string): Promise<GeneratedImageResponse | null> => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    toast.error("Please set your AI API key in settings");
    return null;
  }

  try {
    // For demo purposes, we're using a mock implementation
    // In production, you would make an actual API call to an image generation service
    
    // Simulating API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return a placeholder image based on the prompt
    // In a real implementation, this would be an actual generated image
    const placeholderImages = [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b", 
      "https://images.unsplash.com/photo-1518770660439-4636190af475",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    ];
    
    // Use a hash of the prompt to select a consistent image
    const hash = prompt.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const imageIndex = hash % placeholderImages.length;
    
    return {
      url: placeholderImages[imageIndex],
      alt: `AI generated image for: ${prompt}`
    };
  } catch (error) {
    console.error("Error generating image:", error);
    toast.error("Failed to generate image. Please try again.");
    return null;
  }
};

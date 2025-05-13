
import { toast } from "sonner";

// These are the secrets that should ideally be stored in a backend service
// In a production app, you should use Supabase Edge Functions to securely store API keys
let apiKey = '';

export const setApiKey = (key: string) => {
  apiKey = key;
  localStorage.setItem('ai_api_key', key);
  return true;
};

export const getApiKey = (): string => {
  if (!apiKey) {
    apiKey = localStorage.getItem('ai_api_key') || '';
  }
  return apiKey;
};

export interface AIGeneratedContent {
  title: string;
  description: string;
  hashtags: string;
}

export const generateContentWithAI = async (topic: string): Promise<AIGeneratedContent> => {
  const key = getApiKey();
  
  if (!key) {
    toast.error("Please set your AI API key in settings");
    throw new Error("API key is not set");
  }

  try {
    // For demo purposes, we're using a mock implementation
    // In production, you would make an actual API call to Gemini or other AI services
    
    // Sample prompt for the AI
    const prompt = `Generate social media content about: ${topic}. 
    Please provide a JSON object with the following fields:
    1. title - An attention-grabbing title for a social media post
    2. description - A detailed description for the post (150-200 words)
    3. hashtags - Relevant hashtags for the topic (5-7 hashtags starting with #)`;

    // In a real implementation, you would call the actual API
    // const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'x-goog-api-key': key
    //   },
    //   body: JSON.stringify({
    //     contents: [{ parts: [{ text: prompt }] }],
    //     generationConfig: {
    //       temperature: 0.7,
    //       topP: 0.8,
    //       topK: 40
    //     }
    //   })
    // });
    // const data = await response.json();
    // Parse AI response and return structured content
    
    // For now, we'll simulate an API response with a delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate content based on the topic
    const topic_lower = topic.toLowerCase();
    const content: AIGeneratedContent = {
      title: `${topic.charAt(0).toUpperCase() + topic.slice(1)}: Transforming the Digital Landscape`,
      description: `Discover how ${topic_lower} is revolutionizing industries worldwide. This groundbreaking technology is reshaping how we interact with our digital environment, creating unprecedented opportunities for businesses and individuals. Our latest research shows that organizations implementing ${topic_lower} solutions have seen a 40% increase in efficiency and customer satisfaction. Join the conversation about how ${topic_lower} can solve today's most pressing challenges.`,
      hashtags: `#${topic_lower.replace(/\s+/g, '')} #Innovation #DigitalTransformation #TechTrends #FutureNow #Industry40`
    };
    
    return content;
  } catch (error) {
    console.error("Error generating AI content:", error);
    toast.error("Failed to generate content. Please try again.");
    throw error;
  }
};

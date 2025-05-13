
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { generateContentWithAI, getApiKey } from '@/services/aiService';

interface PostContentInputProps {
  postContent: string;
  setPostContent: (content: string) => void;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setHashtags: (hashtags: string) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
}

const PostContentInput: React.FC<PostContentInputProps> = ({
  postContent,
  setPostContent,
  setTitle,
  setDescription,
  setHashtags,
  isGenerating,
  setIsGenerating
}) => {
  const navigate = useNavigate();
  
  // Generate content with AI
  const generateContent = async () => {
    if (!postContent.trim()) {
      toast.error('Please enter what your post is about first');
      return;
    }
    
    // Check if API key is set
    if (!getApiKey()) {
      toast.error('API key not found. Please set your AI API key in settings.');
      const shouldGoToSettings = window.confirm('Would you like to go to settings to add your API key?');
      if (shouldGoToSettings) {
        navigate('/settings');
      }
      return;
    }
    
    setIsGenerating(true);
    
    try {
      // Call the AI service to generate content
      const generatedContent = await generateContentWithAI(postContent);
      
      setTitle(generatedContent.title);
      setDescription(generatedContent.description);
      setHashtags(generatedContent.hashtags);
      
      toast.success('AI content generated successfully!');
    } catch (error) {
      console.error('Error generating content:', error);
      // Error toast is shown by the service itself
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold">What's your post about?</h2>
      <Textarea
        placeholder="Enter your post topic here..."
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        className="min-h-[80px]"
      />
      <Button
        onClick={generateContent}
        disabled={isGenerating || !postContent}
        className="w-full sm:w-auto bg-gradient-primary hover:brightness-110 transition-all"
      >
        {isGenerating ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
        ) : (
          <><Sparkles className="mr-2 h-4 w-4" /> Generate Content with AI</>
        )}
      </Button>
    </div>
  );
};

export default PostContentInput;

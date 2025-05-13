
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

import PostContentInput from './PostContentInput';
import MediaUploader from './MediaUploader';
import AIImageGenerator from './AIImageGenerator';
import ContentFields from './ContentFields';
import PlatformSelector, { socialPlatforms } from './PlatformSelector';
import DateTimePicker from './DateTimePicker';
import { 
  isPlatformConnected, 
  publishToPlatform
} from '@/services/platformAuthService';

const PostForm: React.FC = () => {
  const [postContent, setPostContent] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>(new Date());
  const [isGenerating, setIsGenerating] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);
  const [mediaType, setMediaType] = useState<'none' | 'image' | 'video' | 'ai-image'>('none');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [connectedPlatforms, setConnectedPlatforms] = useState<string[]>([]);
  
  // Check which platforms are connected when the component mounts
  useEffect(() => {
    checkConnectedPlatforms();
  }, []);
  
  const checkConnectedPlatforms = () => {
    const connected: string[] = [];
    
    socialPlatforms.forEach(platform => {
      if (isPlatformConnected(platform.id)) {
        connected.push(platform.id);
      }
    });
    
    setConnectedPlatforms(connected);
  };
  
  const handlePlatformToggle = (platformId: string) => {
    if (!isPlatformConnected(platformId)) {
      toast({
        title: "Not connected",
        description: `Please connect your ${platformId} account first in the Connections page.`,
        variant: "destructive",
      });
      return;
    }
    
    setSelectedPlatforms(current => 
      current.includes(platformId)
        ? current.filter(id => id !== platformId)
        : [...current, platformId]
    );
  };
  
  const handleSchedulePost = async () => {
    if (!title || !description || selectedPlatforms.length === 0 || !scheduleDate) {
      toast({
        title: "Missing information",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }
    
    setIsScheduling(true);
    
    try {
      // Create an array of promises for posting to each platform
      const postPromises = selectedPlatforms.map(platform => 
        publishToPlatform(platform, {
          title,
          description,
          hashtags,
          mediaUrl: mediaPreview || undefined,
          mediaType: mediaType === 'ai-image' ? 'image' : mediaType,
        })
      );
      
      // Wait for all posts to complete
      await Promise.all(postPromises);
      
      // Build success message
      const platformsText = selectedPlatforms.length > 0 
        ? `to ${selectedPlatforms.map(id => 
            socialPlatforms.find(p => p.id === id)?.label).join(', ')}` 
        : '';
      
      const mediaText = mediaPreview ? ` with ${mediaType === 'ai-image' ? 'AI-generated image' : mediaType}` : '';
      
      toast({
        title: "Success!",
        description: `Post scheduled ${platformsText}${mediaText} successfully!`,
      });
      
      // Reset form
      setPostContent('');
      setTitle('');
      setDescription('');
      setHashtags('');
      setSelectedPlatforms([]);
      setScheduleDate(new Date());
      setMediaType('none');
      setMediaFile(null);
      setMediaPreview(null);
      
      // Show confetti (would be implemented with a proper confetti library)
      console.log('🎉 Confetti animation triggered');
    } catch (error) {
      console.error("Error scheduling post:", error);
      toast({
        title: "Error",
        description: "Failed to schedule the post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsScheduling(false);
    }
  };

  const handleAIImageGenerated = (imageUrl: string, imageAlt: string) => {
    setMediaPreview(imageUrl);
    setMediaType('ai-image');
  };
  
  const handleMediaTypeChange = (newType: 'none' | 'image' | 'video') => {
    setMediaType(newType);
    setMediaFile(null);
    setMediaPreview(null);
  };
  
  return (
    <div className="space-y-6">
      <PostContentInput
        postContent={postContent}
        setPostContent={setPostContent}
        setTitle={setTitle}
        setDescription={setDescription}
        setHashtags={setHashtags}
        isGenerating={isGenerating}
        setIsGenerating={setIsGenerating}
      />
      
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Add Media</h2>
        
        {/* Media Type Selector */}
        <div className="flex flex-wrap gap-3">
          <Button 
            variant={mediaType === 'none' ? "default" : "outline"} 
            onClick={() => handleMediaTypeChange('none')}
          >
            No Media
          </Button>
          <Button 
            variant={mediaType === 'image' ? "default" : "outline"} 
            onClick={() => handleMediaTypeChange('image')}
          >
            Upload Image
          </Button>
          <Button 
            variant={mediaType === 'video' ? "default" : "outline"} 
            onClick={() => handleMediaTypeChange('video')}
          >
            Upload Video
          </Button>
          <Button 
            variant={mediaType === 'ai-image' ? "default" : "outline"} 
            onClick={() => setMediaType('ai-image')}
          >
            Generate AI Image
          </Button>
        </div>
        
        {/* Show appropriate media component */}
        {mediaType === 'ai-image' ? (
          <AIImageGenerator onImageGenerated={handleAIImageGenerated} />
        ) : mediaType !== 'none' && (
          <MediaUploader
            mediaType={mediaType}
            onMediaTypeChange={handleMediaTypeChange}
            mediaFile={mediaFile}
            setMediaFile={setMediaFile}
            mediaPreview={mediaPreview}
            setMediaPreview={setMediaPreview}
          />
        )}
      </div>
      
      <div className="space-y-4 animate-fade-in">
        <ContentFields
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          hashtags={hashtags}
          setHashtags={setHashtags}
        />
        
        <div className="space-y-2">
          <label className="block text-sm font-medium mb-2">Target Platforms</label>
          {connectedPlatforms.length === 0 ? (
            <div className="p-4 border rounded-md bg-muted/20">
              <p className="text-center text-muted-foreground">
                No social media accounts connected. 
                <Button variant="link" asChild>
                  <a href="/connections">Connect accounts</a>
                </Button>
              </p>
            </div>
          ) : (
            <PlatformSelector
              selectedPlatforms={selectedPlatforms}
              onPlatformToggle={handlePlatformToggle}
            />
          )}
        </div>
        
        <DateTimePicker
          scheduleDate={scheduleDate}
          setScheduleDate={setScheduleDate}
        />
        
        <Button
          onClick={handleSchedulePost}
          disabled={isScheduling || !title || !description || selectedPlatforms.length === 0}
          className="w-full sm:w-auto mt-4 bg-gradient-primary hover:brightness-110 transition-all"
        >
          {isScheduling ? (
            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Scheduling...</>
          ) : (
            <>📅 Schedule Post</>
          )}
        </Button>
      </div>
    </div>
  );
};

export default PostForm;

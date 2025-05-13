
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

import PostContentInput from './PostContentInput';
import MediaUploader from './MediaUploader';
import ContentFields from './ContentFields';
import PlatformSelector, { socialPlatforms } from './PlatformSelector';
import DateTimePicker from './DateTimePicker';

const PostForm: React.FC = () => {
  const [postContent, setPostContent] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>(new Date());
  const [isGenerating, setIsGenerating] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);
  const [mediaType, setMediaType] = useState<'none' | 'image' | 'video'>('none');
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  
  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(current => 
      current.includes(platformId)
        ? current.filter(id => id !== platformId)
        : [...current, platformId]
    );
  };
  
  const handleSchedulePost = () => {
    if (!title || !description || selectedPlatforms.length === 0 || !scheduleDate) {
      toast.error('Please fill all required fields');
      return;
    }
    
    setIsScheduling(true);
    
    // Simulate uploading and scheduling
    setTimeout(() => {
      setIsScheduling(false);
      
      // Build success message
      const platformsText = selectedPlatforms.length > 0 
        ? `to ${selectedPlatforms.map(id => 
            socialPlatforms.find(p => p.id === id)?.label).join(', ')}` 
        : '';
      
      const mediaText = mediaFile ? ` with ${mediaType}` : '';
      
      toast.success(`Post scheduled ${platformsText}${mediaText} successfully!`);
      
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
    }, 1500);
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
      
      <MediaUploader
        mediaType={mediaType}
        onMediaTypeChange={setMediaType}
        mediaFile={mediaFile}
        setMediaFile={setMediaFile}
        mediaPreview={mediaPreview}
        setMediaPreview={setMediaPreview}
      />
      
      <div className="space-y-4 animate-fade-in">
        <ContentFields
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          hashtags={hashtags}
          setHashtags={setHashtags}
        />
        
        <PlatformSelector
          selectedPlatforms={selectedPlatforms}
          onPlatformToggle={handlePlatformToggle}
        />
        
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

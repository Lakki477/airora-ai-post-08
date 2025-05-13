import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Plus, Loader2, Image, Film, Upload, Sparkles, Wand } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { generateContentWithAI, getApiKey } from '@/services/aiService';
import { useNavigate } from 'react-router-dom';

const socialPlatforms = [
  { id: 'youtube', label: 'YouTube', icon: 'YT' },
  { id: 'instagram', label: 'Instagram', icon: 'IG' },
  { id: 'telegram', label: 'Telegram', icon: 'TG' },
  { id: 'twitter', label: 'X', icon: 'X' },
  { id: 'facebook', label: 'Facebook', icon: 'FB' },
];

const PostForm: React.FC = () => {
  const navigate = useNavigate();
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Generate content with AI (real implementation)
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
  
  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(current => 
      current.includes(platformId)
        ? current.filter(id => id !== platformId)
        : [...current, platformId]
    );
  };

  const handleMediaTypeChange = (value: string) => {
    if (value === 'none' || value === 'image' || value === 'video') {
      setMediaType(value);
      setMediaFile(null);
      setMediaPreview(null);
    }
  };

  const handleFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (
      (mediaType === 'image' && !file.type.startsWith('image/')) ||
      (mediaType === 'video' && !file.type.startsWith('video/'))
    ) {
      toast.error(`Please select a ${mediaType} file`);
      return;
    }

    setMediaFile(file);
    const objectUrl = URL.createObjectURL(file);
    setMediaPreview(objectUrl);
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
      
      {/* Media upload section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Upload Media</h2>
        <ToggleGroup type="single" value={mediaType} onValueChange={handleMediaTypeChange} className="justify-start">
          <ToggleGroupItem value="none">No Media</ToggleGroupItem>
          <ToggleGroupItem value="image" className="flex gap-2">
            <Image className="h-4 w-4" /> Image
          </ToggleGroupItem>
          <ToggleGroupItem value="video" className="flex gap-2">
            <Film className="h-4 w-4" /> Video
          </ToggleGroupItem>
        </ToggleGroup>
        
        {mediaType !== 'none' && (
          <div className="space-y-4">
            <Button 
              variant="outline" 
              onClick={handleFileSelect} 
              className="w-full border-dashed border-2 h-24 flex flex-col items-center justify-center gap-2"
            >
              <Upload className="h-6 w-6" />
              <span>Click to upload {mediaType}</span>
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept={mediaType === 'image' ? 'image/*' : 'video/*'}
              onChange={handleFileChange}
              className="hidden"
            />
            
            {mediaPreview && (
              <div className="rounded-md overflow-hidden border">
                <AspectRatio ratio={16/9}>
                  {mediaType === 'image' ? (
                    <img 
                      src={mediaPreview}
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video 
                      src={mediaPreview}
                      controls
                      className="w-full h-full object-contain bg-black"
                    />
                  )}
                </AspectRatio>
                <div className="p-2 bg-muted/30">
                  <p className="text-sm truncate">{mediaFile?.name}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Generated or manual content section */}
      <div className="space-y-4 animate-fade-in">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <Input
            placeholder="Enter post title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            placeholder="Enter post description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-[120px]"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Hashtags</label>
          <Input
            placeholder="Enter hashtags"
            value={hashtags}
            onChange={(e) => setHashtags(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Select Platforms</label>
          <div className="flex flex-wrap gap-3">
            {socialPlatforms.map((platform) => (
              <div 
                key={platform.id}
                className={cn(
                  "flex items-center space-x-2 border rounded-lg p-3 cursor-pointer transition-all",
                  selectedPlatforms.includes(platform.id)
                    ? "border-primary bg-primary/10"
                    : "border-muted-foreground/20 hover:border-primary/50"
                )}
                onClick={() => handlePlatformToggle(platform.id)}
              >
                <Checkbox
                  id={platform.id}
                  checked={selectedPlatforms.includes(platform.id)}
                  onCheckedChange={() => {}}
                  className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                />
                <div className="w-6 h-6 flex items-center justify-center bg-muted rounded mr-1">
                  {platform.icon}
                </div>
                <label
                  htmlFor={platform.id}
                  className="text-sm font-medium cursor-pointer"
                >
                  {platform.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Schedule Date & Time</label>
          <div className="flex items-center space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !scheduleDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {scheduleDate ? format(scheduleDate, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={scheduleDate}
                  onSelect={setScheduleDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            
            <Input
              type="time"
              className="w-[120px]"
              defaultValue="12:00"
            />
          </div>
        </div>
        
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

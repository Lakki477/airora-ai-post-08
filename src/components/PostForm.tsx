
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Plus, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

const socialPlatforms = [
  { id: 'youtube', label: 'YouTube', icon: 'YT' },
  { id: 'instagram', label: 'Instagram', icon: 'IG' },
  { id: 'telegram', label: 'Telegram', icon: 'TG' },
  { id: 'twitter', label: 'X', icon: 'X' },
];

const PostForm: React.FC = () => {
  const [postContent, setPostContent] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>(new Date());
  const [isGenerating, setIsGenerating] = useState(false);
  const [isScheduling, setIsScheduling] = useState(false);
  
  // Generate content with AI (simulated)
  const generateContent = async () => {
    if (!postContent.trim()) {
      toast.error('Please enter what your post is about first');
      return;
    }
    
    setIsGenerating(true);
    // Simulate AI response delay
    setTimeout(() => {
      const topic = postContent.toLowerCase();
      
      // Generate some fake AI content based on input
      const aiTitle = `${topic.charAt(0).toUpperCase() + topic.slice(1)}: The Future of Technology`;
      const aiDescription = `Explore how ${topic} is revolutionizing industries worldwide. This cutting-edge technology is changing how we interact with our digital world, creating new opportunities and challenges for businesses and individuals alike.`;
      const aiHashtags = `#${topic.replace(/\s+/g, '')} #TechTrends #Innovation #FutureTech #AI #DigitalTransformation`;
      
      setTitle(aiTitle);
      setDescription(aiDescription);
      setHashtags(aiHashtags);
      setIsGenerating(false);
      
      toast.success('AI content generated!');
    }, 2000);
  };
  
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
    
    // Simulate scheduling
    setTimeout(() => {
      setIsScheduling(false);
      toast.success('Post scheduled successfully!');
      
      // Reset form
      setPostContent('');
      setTitle('');
      setDescription('');
      setHashtags('');
      setSelectedPlatforms([]);
      setScheduleDate(new Date());
      
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
            <>✨ Generate Content with AI</>
          )}
        </Button>
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

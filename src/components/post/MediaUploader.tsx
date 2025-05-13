
import React, { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { toast } from 'sonner';
import { Image, Film, Upload } from 'lucide-react';

type MediaType = 'none' | 'image' | 'video';

interface MediaUploaderProps {
  mediaType: MediaType;
  onMediaTypeChange: (value: MediaType) => void;
  mediaFile: File | null;
  setMediaFile: (file: File | null) => void;
  mediaPreview: string | null;
  setMediaPreview: (url: string | null) => void;
}

const MediaUploader: React.FC<MediaUploaderProps> = ({
  mediaType,
  onMediaTypeChange,
  mediaFile,
  setMediaFile,
  mediaPreview,
  setMediaPreview
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleMediaTypeChange = (value: string) => {
    if (value === 'none' || value === 'image' || value === 'video') {
      onMediaTypeChange(value as MediaType);
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

  return (
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
  );
};

export default MediaUploader;

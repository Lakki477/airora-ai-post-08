
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface ContentFieldsProps {
  title: string;
  setTitle: (title: string) => void;
  description: string;
  setDescription: (description: string) => void;
  hashtags: string;
  setHashtags: (hashtags: string) => void;
}

const ContentFields: React.FC<ContentFieldsProps> = ({
  title,
  setTitle,
  description,
  setDescription,
  hashtags,
  setHashtags,
}) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default ContentFields;

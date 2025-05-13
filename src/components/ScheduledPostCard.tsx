
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

export interface ScheduledPost {
  id: string;
  title: string;
  description: string;
  platforms: string[];
  date: string;
  time: string;
  hashtags: string;
}

interface ScheduledPostCardProps {
  post: ScheduledPost;
  onDelete: (id: string) => void;
}

const ScheduledPostCard: React.FC<ScheduledPostCardProps> = ({ post, onDelete }) => {
  const [expanded, setExpanded] = React.useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleEdit = () => {
    toast.info("Edit feature coming soon!");
  };

  const handleDelete = () => {
    onDelete(post.id);
  };

  return (
    <Card className="card-hover overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-lg">{post.title}</h3>
          <div className="flex space-x-1 mt-1">
            {post.platforms.map((platform) => (
              <Badge key={platform} variant="outline" className="text-xs">
                {platform}
              </Badge>
            ))}
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          {post.date} at {post.time}
        </div>
      </CardHeader>
      
      <CardContent className="pb-3">
        {expanded ? (
          <div className="space-y-3 animate-fade-in">
            <p className="text-sm">{post.description}</p>
            <p className="text-xs text-blue-500 dark:text-blue-400">{post.hashtags}</p>
          </div>
        ) : (
          <p className="text-sm truncate">{post.description}</p>
        )}
      </CardContent>
      
      <CardFooter className="pt-0 flex justify-between">
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleEdit}>
            <Pencil className="h-4 w-4 mr-1" /> Edit
          </Button>
          <Button variant="outline" size="sm" onClick={handleDelete} className="text-destructive hover:text-destructive">
            <Trash2 className="h-4 w-4 mr-1" /> Delete
          </Button>
        </div>
        
        <Button variant="ghost" size="sm" onClick={toggleExpand}>
          {expanded ? (
            <><ChevronUp className="h-4 w-4 mr-1" /> Less</>
          ) : (
            <><ChevronDown className="h-4 w-4 mr-1" /> More</>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ScheduledPostCard;

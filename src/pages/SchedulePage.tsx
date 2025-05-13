
import React, { useState } from 'react';
import ScheduledPostCard, { ScheduledPost } from '@/components/ScheduledPostCard';
import { toast } from 'sonner';

const SchedulePage: React.FC = () => {
  // Sample data - in a real app this would come from an API
  const [posts, setPosts] = useState<ScheduledPost[]>([
    {
      id: '1',
      title: 'AI: The Future of Technology',
      description: 'Explore how AI is revolutionizing industries worldwide. This cutting-edge technology is changing how we interact with our digital world, creating new opportunities and challenges for businesses and individuals alike.',
      platforms: ['YouTube', 'Instagram'],
      date: 'May 20, 2025',
      time: '12:30 PM',
      hashtags: '#AI #TechTrends #Innovation #FutureTech #DigitalTransformation',
    },
    {
      id: '2',
      title: 'Machine Learning Applications in 2025',
      description: 'An overview of how machine learning is being applied across various industries to solve complex problems and create new value.',
      platforms: ['X', 'Telegram'],
      date: 'May 25, 2025',
      time: '3:45 PM',
      hashtags: '#MachineLearning #AI #DataScience #Tech2025 #Innovation',
    },
    {
      id: '3',
      title: 'The Rise of Smart Assistants',
      description: 'How virtual assistants powered by AI are becoming an integral part of our daily lives and transforming how we interact with technology.',
      platforms: ['YouTube', 'X', 'Instagram'],
      date: 'June 1, 2025',
      time: '9:00 AM',
      hashtags: '#SmartAssistants #AI #VoiceTech #FutureTech #Innovation',
    }
  ]);

  const handleDeletePost = (id: string) => {
    setPosts(posts.filter(post => post.id !== id));
    toast.success('Post deleted successfully');
  };

  return (
    <div className="container max-w-4xl mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">My Scheduled Posts</h1>
      
      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map(post => (
            <ScheduledPostCard 
              key={post.id} 
              post={post} 
              onDelete={handleDeletePost} 
            />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            No scheduled posts found.
          </p>
        </div>
      )}
    </div>
  );
};

export default SchedulePage;

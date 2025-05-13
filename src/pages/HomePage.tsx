
import React from 'react';
import PostForm from '@/components/PostForm';

const HomePage: React.FC = () => {
  return (
    <div className="container max-w-4xl mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">New AI Post</h1>
      <PostForm />
    </div>
  );
};

export default HomePage;


import React from 'react';
import PlatformConnections from '@/components/post/PlatformConnections';
import { useNavigate } from 'react-router-dom';

const ConnectionsPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleConnectionsChanged = () => {
    // Refresh the page data if needed
  };
  
  return (
    <div className="container max-w-4xl mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Account Connections</h1>
      
      <div className="space-y-8">
        <section className="bg-card p-6 rounded-lg border">
          <PlatformConnections onConnectionsChanged={handleConnectionsChanged} />
        </section>
        
        <section className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">About Platform Connections</h2>
          <p className="text-muted-foreground">
            Connecting your social media accounts allows you to schedule and publish posts directly
            from this application. We use secure authentication methods and do not store your passwords.
          </p>
          <p className="text-muted-foreground mt-2">
            Note: In this demo version, connections are simulated and no actual posts will be published
            to your accounts.
          </p>
        </section>
      </div>
    </div>
  );
};

export default ConnectionsPage;


import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  authenticatePlatform, 
  isPlatformConnected, 
  removePlatformAuth,
  PlatformAuth
} from '@/services/platformAuthService';
import { Loader2 } from 'lucide-react';
import { Youtube, Instagram, Facebook, MessageSquare } from 'lucide-react';

interface PlatformConnectionsProps {
  onConnectionsChanged: () => void;
}

interface PlatformInfo {
  id: string;
  label: string;
  icon: React.ReactNode;
}

const platforms: PlatformInfo[] = [
  { id: 'youtube', label: 'YouTube', icon: <Youtube className="h-5 w-5" /> },
  { id: 'instagram', label: 'Instagram', icon: <Instagram className="h-5 w-5" /> },
  { id: 'facebook', label: 'Facebook', icon: <Facebook className="h-5 w-5" /> },
  { id: 'telegram', label: 'Telegram', icon: <MessageSquare className="h-5 w-5" /> },
];

const PlatformConnections: React.FC<PlatformConnectionsProps> = ({ onConnectionsChanged }) => {
  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(null);
  const [connectedPlatforms, setConnectedPlatforms] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    // Check which platforms are connected
    const connected: Record<string, boolean> = {};
    platforms.forEach(platform => {
      connected[platform.id] = isPlatformConnected(platform.id);
    });
    setConnectedPlatforms(connected);
  }, []);
  
  const handleConnect = async (platformId: string) => {
    setConnectingPlatform(platformId);
    
    try {
      await authenticatePlatform(platformId);
      setConnectedPlatforms(prev => ({ ...prev, [platformId]: true }));
      onConnectionsChanged();
    } finally {
      setConnectingPlatform(null);
    }
  };
  
  const handleDisconnect = (platformId: string) => {
    removePlatformAuth(platformId);
    setConnectedPlatforms(prev => ({ ...prev, [platformId]: false }));
    onConnectionsChanged();
  };
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Connect Your Accounts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {platforms.map(platform => (
          <div 
            key={platform.id}
            className="border rounded-lg p-4 flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              <div className="bg-muted p-2 rounded-lg">
                {platform.icon}
              </div>
              <div>
                <h3 className="font-medium">{platform.label}</h3>
                <p className="text-sm text-muted-foreground">
                  {connectedPlatforms[platform.id] ? 'Connected' : 'Not connected'}
                </p>
              </div>
            </div>
            
            <Button
              variant={connectedPlatforms[platform.id] ? "destructive" : "default"}
              onClick={() => connectedPlatforms[platform.id] 
                ? handleDisconnect(platform.id) 
                : handleConnect(platform.id)
              }
              disabled={connectingPlatform === platform.id}
              className="whitespace-nowrap"
            >
              {connectingPlatform === platform.id ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Connecting</>
              ) : connectedPlatforms[platform.id] ? (
                'Disconnect'
              ) : (
                'Connect'
              )}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlatformConnections;


import { toast } from "sonner";

export interface PlatformAuth {
  platform: string;
  isConnected: boolean;
  username?: string;
  profileImage?: string;
  token?: string;
  expiry?: number;
}

const STORAGE_KEY = "platform_auth";

// Get all platform auth data from localStorage
export const getAllPlatformAuth = (): PlatformAuth[] => {
  const storedData = localStorage.getItem(STORAGE_KEY);
  if (storedData) {
    try {
      return JSON.parse(storedData);
    } catch (e) {
      console.error("Error parsing platform auth data", e);
    }
  }
  return [];
};

// Get specific platform auth data
export const getPlatformAuth = (platform: string): PlatformAuth | undefined => {
  return getAllPlatformAuth().find(auth => auth.platform === platform);
};

// Check if a platform is connected
export const isPlatformConnected = (platform: string): boolean => {
  const auth = getPlatformAuth(platform);
  return !!auth?.isConnected;
};

// Save platform auth data
export const savePlatformAuth = (authData: PlatformAuth): void => {
  const allAuth = getAllPlatformAuth().filter(auth => auth.platform !== authData.platform);
  allAuth.push(authData);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allAuth));
};

// Remove platform auth data
export const removePlatformAuth = (platform: string): void => {
  const allAuth = getAllPlatformAuth().filter(auth => auth.platform !== platform);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(allAuth));
  toast.success(`Disconnected from ${platform}`);
};

// Mock authentication process for demo purposes
export const authenticatePlatform = async (platform: string): Promise<PlatformAuth> => {
  // In a real implementation, this would redirect to the platform's OAuth flow
  // For demo purposes, we'll simulate a successful authentication
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Mock data for each platform
  const mockData: Record<string, Partial<PlatformAuth>> = {
    youtube: {
      username: "YourChannel",
      profileImage: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=128&h=128&fit=crop",
    },
    instagram: {
      username: "your.instagram",
      profileImage: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=128&h=128&fit=crop",
    },
    facebook: {
      username: "Your Page",
      profileImage: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=128&h=128&fit=crop",
    },
    telegram: {
      username: "your_telegram",
      profileImage: "https://images.unsplash.com/photo-1611944212129-29977ae1398c?w=128&h=128&fit=crop",
    },
  };
  
  const authData: PlatformAuth = {
    platform,
    isConnected: true,
    username: mockData[platform]?.username,
    profileImage: mockData[platform]?.profileImage,
    token: `mock_token_${Math.random().toString(36).substring(2)}`,
    expiry: Date.now() + 60 * 60 * 1000, // 1 hour from now
  };
  
  savePlatformAuth(authData);
  toast.success(`Connected to ${platform} as ${authData.username}`);
  
  return authData;
};

// Mock post publishing for demo purposes
export const publishToPlatform = async (
  platform: string, 
  content: { 
    title?: string, 
    description: string, 
    hashtags?: string, 
    mediaUrl?: string,
    mediaType?: 'image' | 'video' | 'none'
  }
): Promise<boolean> => {
  const auth = getPlatformAuth(platform);
  
  if (!auth?.isConnected) {
    toast.error(`You are not connected to ${platform}`);
    return false;
  }
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
  
  // Simulate success (in real implementation, this would call the platform API)
  toast.success(`Posted to ${platform} successfully!`);
  return true;
};

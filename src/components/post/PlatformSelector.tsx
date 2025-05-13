
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';

interface Platform {
  id: string;
  label: string;
  icon: string;
}

interface PlatformSelectorProps {
  selectedPlatforms: string[];
  onPlatformToggle: (platformId: string) => void;
}

// Social platform data
const socialPlatforms: Platform[] = [
  { id: 'youtube', label: 'YouTube', icon: 'YT' },
  { id: 'instagram', label: 'Instagram', icon: 'IG' },
  { id: 'telegram', label: 'Telegram', icon: 'TG' },
  { id: 'twitter', label: 'X', icon: 'X' },
  { id: 'facebook', label: 'Facebook', icon: 'FB' },
];

const PlatformSelector: React.FC<PlatformSelectorProps> = ({ 
  selectedPlatforms, 
  onPlatformToggle 
}) => {
  return (
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
            onClick={() => onPlatformToggle(platform.id)}
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
  );
};

export { socialPlatforms };
export default PlatformSelector;

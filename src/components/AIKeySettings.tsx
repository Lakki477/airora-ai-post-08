
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { setApiKey, getApiKey } from '@/services/aiService';
import { Eye, EyeOff, Key, Save } from 'lucide-react';

const AIKeySettings: React.FC = () => {
  const [apiKey, setApiKeyState] = useState('');
  const [showKey, setShowKey] = useState(false);
  const defaultGeminiKey = "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";

  useEffect(() => {
    const savedKey = getApiKey();
    if (savedKey) {
      setApiKeyState(savedKey);
    } else {
      // Set default Gemini key if no key is saved
      setApiKeyState(defaultGeminiKey);
      // Also save the default key to local storage
      if (setApiKey(defaultGeminiKey)) {
        console.log('Default Gemini API key set');
      }
    }
  }, []);

  const handleSaveKey = () => {
    if (!apiKey.trim()) {
      toast.error('Please enter a valid API key');
      return;
    }

    if (setApiKey(apiKey.trim())) {
      toast.success('API key saved successfully');
    }
  };

  const handleUseDefaultKey = () => {
    setApiKeyState(defaultGeminiKey);
    if (setApiKey(defaultGeminiKey)) {
      toast.success('Default Gemini API key set successfully');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Key className="w-5 h-5 text-primary" />
        <h3 className="text-lg font-medium">AI API Key</h3>
      </div>
      <p className="text-sm text-muted-foreground">
        Enter your Google Gemini API key to enable content generation features.
        You can get an API key from the Google AI Studio.
      </p>
      <div className="flex gap-2">
        <div className="relative flex-grow">
          <Input
            type={showKey ? 'text' : 'password'}
            value={apiKey}
            onChange={(e) => setApiKeyState(e.target.value)}
            placeholder="Enter your API key"
            className="pr-10"
          />
          <button
            type="button"
            onClick={() => setShowKey(!showKey)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showKey ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        <Button onClick={handleSaveKey} className="flex items-center gap-2">
          <Save className="h-4 w-4" />
          Save
        </Button>
      </div>
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          onClick={handleUseDefaultKey}
          className="text-sm"
        >
          Use Default Gemini Key
        </Button>
      </div>
      <div className="text-sm text-muted-foreground">
        Your API key is stored locally in your browser and is not sent to our servers.
      </div>
    </div>
  );
};

export default AIKeySettings;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import ThemeToggle from '@/components/ThemeToggle';
import { toast } from 'sonner';

const SettingsPage: React.FC = () => {
  const handleSaveChanges = () => {
    toast.success('Settings saved successfully');
  };

  return (
    <div className="container max-w-4xl mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <div className="space-y-8">
        {/* Appearance */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Appearance</h2>
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Dark Mode</p>
              <p className="text-sm text-muted-foreground">Toggle between light and dark themes</p>
            </div>
            <ThemeToggle />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Language</p>
              <p className="text-sm text-muted-foreground">Select your preferred language</p>
            </div>
            <Select defaultValue="english">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">Hindi</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Notifications */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <Separator />
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Post Reminders</p>
              <p className="text-sm text-muted-foreground">Get notified when it's time to post</p>
            </div>
            <Switch defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive email updates about your posts</p>
            </div>
            <Switch defaultChecked />
          </div>
        </div>
        
        {/* Support */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Support</h2>
          <Separator />
          
          <div>
            <p className="font-medium">Contact Us</p>
            <p className="text-sm text-muted-foreground mb-2">Need help? Get in touch with our support team</p>
            <Button variant="outline">Contact Support</Button>
          </div>
          
          <div>
            <p className="font-medium">About AIroraPost</p>
            <p className="text-sm text-muted-foreground mb-2">Version 1.0.0</p>
            <p className="text-sm text-muted-foreground">Powered by Gemini AI | Shadow Devs</p>
          </div>
        </div>
        
        <div className="pt-4">
          <Button onClick={handleSaveChanges} className="bg-gradient-primary hover:brightness-110 transition-all">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

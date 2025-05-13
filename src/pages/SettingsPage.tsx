
import React from 'react';
import AIKeySettings from '@/components/AIKeySettings';

const SettingsPage: React.FC = () => {
  return (
    <div className="container max-w-4xl mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <div className="space-y-8">
        <section className="bg-card p-6 rounded-lg border">
          <AIKeySettings />
        </section>

        <section className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">AI Integration</h2>
          <div className="space-y-4">
            <p className="text-muted-foreground">
              This application is integrated with Google's Gemini AI to provide intelligent content generation features.
            </p>
            <p className="text-muted-foreground">
              The default Gemini API key has been pre-configured, but you can also use your own API key from the Google AI Studio.
            </p>
            <p className="text-muted-foreground">
              <a 
                href="https://aistudio.google.com/app/apikey" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:underline"
              >
                Get your own API key →
              </a>
            </p>
          </div>
        </section>

        {/* Other settings sections can be added here */}
        <section className="bg-card p-6 rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
          <p className="text-muted-foreground">
            Account settings will be available in a future update.
          </p>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;

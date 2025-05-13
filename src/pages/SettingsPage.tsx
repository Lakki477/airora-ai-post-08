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

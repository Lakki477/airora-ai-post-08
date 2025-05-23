
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import AppLogo from './AppLogo';
import { toast } from 'sonner';

interface LoginFormProps {
  onLogin: (username: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = () => {
    setIsLoading(true);
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      onLogin('User');
      toast.success('Login successful!');
    }, 1500);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 w-full max-w-md px-8">
      <div className="text-center space-y-3">
        <AppLogo size="lg" />
        <p className="text-muted-foreground">
          Your AI-Powered Auto Posting Assistant
        </p>
      </div>
      
      <div className="w-full space-y-6">
        <Button 
          onClick={handleGoogleLogin}
          variant="outline" 
          className="w-full h-12 flex items-center justify-center space-x-2 border border-gray-300 dark:border-gray-700 shadow-sm"
          disabled={isLoading}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          <span>{isLoading ? 'Logging in...' : 'Continue with Google'}</span>
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;

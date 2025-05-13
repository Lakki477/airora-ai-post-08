
import React, { useEffect, useState } from 'react';
import AppLogo from './AppLogo';

const SplashScreen: React.FC<{onComplete: () => void}> = ({ onComplete }) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 3000);
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + (100 - prev) / 10;
        return newProgress > 99 ? 100 : newProgress;
      });
    }, 200);
    
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onComplete]);
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-airorapurple to-airorablue z-50">
      <div className="w-full max-w-xs flex flex-col items-center">
        <div className="animate-pulse mb-8">
          <AppLogo size="lg" className="text-white" />
        </div>
        
        <div className="w-full bg-white/20 rounded-full h-2 mb-6">
          <div 
            className="bg-white h-full rounded-full transition-all duration-300"
            style={{ width: `${loadingProgress}%` }}
          ></div>
        </div>
        
        <p className="text-white/90 text-sm animate-fade-in">
          Powered by Gemini AI | Shadow Devs
        </p>
      </div>
    </div>
  );
};

export default SplashScreen;


import React from 'react';

const AppLogo: React.FC<{ size?: 'sm' | 'md' | 'lg', className?: string }> = ({ 
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl'
  };

  return (
    <div className={`flex items-center ${className}`}>
      <h1 className={`font-poppins font-extrabold ${sizeClasses[size]}`}>
        <span className="text-airorablue">AIrora</span>
        <span className="text-airorapurple">Post</span>
      </h1>
    </div>
  );
};

export default AppLogo;

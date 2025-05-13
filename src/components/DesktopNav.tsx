
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Calendar, Settings } from 'lucide-react';

const DesktopNav: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  return (
    <nav className="hidden md:block">
      <div className="container py-8">
        <div className="flex flex-col space-y-2">
          <NavButton 
            to="/" 
            icon={<Plus className="mr-2 h-5 w-5" />} 
            label="New AI Post" 
            isActive={isActive('/')} 
          />
          <NavButton 
            to="/schedule" 
            icon={<Calendar className="mr-2 h-5 w-5" />} 
            label="My Schedule" 
            isActive={isActive('/schedule')} 
          />
          <NavButton 
            to="/settings" 
            icon={<Settings className="mr-2 h-5 w-5" />} 
            label="Settings" 
            isActive={isActive('/settings')} 
          />
        </div>
      </div>
    </nav>
  );
};

interface NavButtonProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({ to, icon, label, isActive }) => {
  return (
    <Button
      asChild
      variant={isActive ? "default" : "ghost"}
      className={`justify-start w-full ${isActive ? "bg-primary text-primary-foreground" : ""}`}
    >
      <Link to={to}>
        {icon}
        {label}
      </Link>
    </Button>
  );
};

export default DesktopNav;

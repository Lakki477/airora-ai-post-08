
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import AppLogo from './AppLogo';
import { LogOut, Plus, Calendar, Settings, Link2 } from 'lucide-react';

interface NavBarProps {
  username: string;
  onLogout: () => void;
}

const NavBar: React.FC<NavBarProps> = ({ username, onLogout }) => {
  const location = useLocation();
  
  return (
    <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-sm border-b">
      <div className="container flex justify-between items-center h-16 px-4">
        <div className="flex items-center">
          <AppLogo size="sm" />
        </div>
        
        <div className="flex items-center space-x-2">
          <p className="text-sm hidden md:block">
            Hi, <span className="font-semibold">{username}</span> 👋
          </p>
          <ThemeToggle />
          <button
            onClick={onLogout}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t z-50">
        <div className="grid grid-cols-5 h-16">
          <NavLink to="/" label="Home" icon={<Plus className="h-5 w-5" />} isActive={location.pathname === '/'} />
          <NavLink to="/schedule" label="Schedule" icon={<Calendar className="h-5 w-5" />} isActive={location.pathname === '/schedule'} />
          <NavLink to="/connections" label="Connect" icon={<Link2 className="h-5 w-5" />} isActive={location.pathname === '/connections'} />
          <NavLink to="/settings" label="Settings" icon={<Settings className="h-5 w-5" />} isActive={location.pathname === '/settings'} />
          <button
            onClick={onLogout}
            className="flex flex-col items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-xs mt-1">Logout</span>
          </button>
        </div>
      </nav>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  label: string;
  icon: React.ReactNode;
  isActive: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ to, label, icon, isActive }) => {
  return (
    <Link
      to={to}
      className={`flex flex-col items-center justify-center transition-colors ${
        isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
      }`}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </Link>
  );
};

export default NavBar;

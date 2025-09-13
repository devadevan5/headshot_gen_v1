import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [creditBalance, setCreditBalance] = useState(25);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const navigationItems = [
    { label: 'Create', path: '/dashboard', icon: 'Sparkles' },
    { label: 'Gallery', path: '/generated-images-gallery', icon: 'Images' },
    { label: 'Credits', path: '/credit-purchase', icon: 'CreditCard' },
    { label: 'Account', path: '/account-settings', icon: 'Settings' }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleProfileToggle = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleAdminToggle = () => {
    if (isAdminMode) {
      setIsAdminMode(false);
      navigate('/dashboard');
    } else {
      setIsAdminMode(true);
      navigate('/admin-dashboard');
    }
    setIsProfileDropdownOpen(false);
  };

  const handleLogout = () => {
    signOut().then(() => {
      navigate('/authentication');
    });
    setIsProfileDropdownOpen(false);
  };

  const isActiveRoute = (path) => {
    if (path === '/dashboard' && isAdminMode) return false;
    if (path === '/admin-dashboard') return isAdminMode;
    return location?.pathname === path;
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isProfileDropdownOpen && !event?.target?.closest('.profile-dropdown')) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isProfileDropdownOpen]);

  useEffect(() => {
    setIsAdmin(Math.random() > 0.5);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 bg-card border-b border-border z-1000">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center">
          <button
            onClick={() => handleNavigation('/dashboard')}
            className="flex items-center space-x-2 transition-smooth hover:opacity-80"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Camera" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              Headshot Generator
            </span>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                isActiveRoute(item?.path)
                  ? 'bg-accent text-accent-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </button>
          ))}
          {isAdmin && (
            <button
              onClick={() => handleNavigation('/admin-dashboard')}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                isActiveRoute('/admin-dashboard')
                  ? 'bg-accent text-accent-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name="Shield" size={16} />
              <span>Admin</span>
            </button>
          )}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Credit Balance */}
          <div className="hidden sm:flex items-center space-x-2 bg-muted px-3 py-1.5 rounded-full">
            <Icon name="Coins" size={16} className="text-warning" />
            <span className="text-sm font-mono font-medium text-foreground">
              {creditBalance}
            </span>
          </div>

          {/* Profile Dropdown */}
          <div className="relative profile-dropdown">
            <button
              onClick={handleProfileToggle}
              className="flex items-center space-x-2 p-2 rounded-full hover:bg-muted transition-smooth"
            >
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
            </button>

            {isProfileDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-md shadow-elevated z-1100">
                <div className="py-1">
                  <div className="px-4 py-2 border-b border-border">
                    <p className="text-sm font-medium text-foreground">John Doe</p>
                    <p className="text-xs text-muted-foreground">john@example.com</p>
                  </div>
                  
                  <div className="sm:hidden px-4 py-2 border-b border-border">
                    <div className="flex items-center space-x-2">
                      <Icon name="Coins" size={16} className="text-warning" />
                      <span className="text-sm font-mono font-medium">
                        {creditBalance} Credits
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      handleNavigation('/account-settings');
                      setIsProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-smooth flex items-center space-x-2"
                  >
                    <Icon name="Settings" size={16} />
                    <span>Account Settings</span>
                  </button>

                  {isAdmin && (
                    <button
                      onClick={handleAdminToggle}
                      className="w-full text-left px-4 py-2 text-sm text-foreground hover:bg-muted transition-smooth flex items-center space-x-2"
                    >
                      <Icon name={isAdminMode ? "User" : "Shield"} size={16} />
                      <span>{isAdminMode ? 'Switch to User' : 'Switch to Admin'}</span>
                    </button>
                  )}

                  <div className="border-t border-border">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-muted transition-smooth flex items-center space-x-2"
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Sign Out</span>
                  <p className="text-sm font-medium text-foreground">
                    {user?.user_metadata?.full_name || 'User'}
                  </p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-muted transition-smooth"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-card border-t border-border">
          <nav className="px-4 py-2 space-y-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-smooth ${
                  isActiveRoute(item?.path)
                    ? 'bg-accent text-accent-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
              </button>
            ))}
            {isAdmin && (
              <button
                onClick={() => handleNavigation('/admin-dashboard')}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium transition-smooth ${
                  isActiveRoute('/admin-dashboard')
                    ? 'bg-accent text-accent-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name="Shield" size={18} />
                <span>Admin Dashboard</span>
              </button>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const PWASection = () => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [canInstall, setCanInstall] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [offlineMode, setOfflineMode] = useState(true);
  const [autoSync, setAutoSync] = useState(true);
  const [backgroundSync, setBackgroundSync] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    const checkInstallStatus = () => {
      if (window.matchMedia('(display-mode: standalone)')?.matches) {
        setIsInstalled(true);
      }
    };

    // Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e?.preventDefault();
      setDeferredPrompt(e);
      setCanInstall(true);
    };

    // Listen for appinstalled event
    const handleAppInstalled = () => {
      setIsInstalled(true);
      setCanInstall(false);
      setDeferredPrompt(null);
    };

    checkInstallStatus();
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallApp = async () => {
    if (!deferredPrompt) return;

    deferredPrompt?.prompt();
    const { outcome } = await deferredPrompt?.userChoice;
    
    if (outcome === 'accepted') {
      setCanInstall(false);
      setDeferredPrompt(null);
    }
  };

  const getInstallationStatus = () => {
    if (isInstalled) {
      return {
        status: 'installed',
        text: 'App is installed',
        color: 'text-success',
        bgColor: 'bg-success/10',
        icon: 'CheckCircle'
      };
    } else if (canInstall) {
      return {
        status: 'available',
        text: 'Ready to install',
        color: 'text-primary',
        bgColor: 'bg-primary/10',
        icon: 'Download'
      };
    } else {
      return {
        status: 'unavailable',
        text: 'Not available',
        color: 'text-muted-foreground',
        bgColor: 'bg-muted',
        icon: 'Info'
      };
    }
  };

  const installStatus = getInstallationStatus();

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">Progressive Web App</h2>
      <div className="space-y-6">
        {/* Installation Status */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${installStatus?.bgColor}`}>
                <Icon name={installStatus?.icon} size={20} className={installStatus?.color} />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Installation Status</h3>
                <p className={`text-sm ${installStatus?.color}`}>{installStatus?.text}</p>
              </div>
            </div>
            
            {canInstall && (
              <Button
                variant="default"
                size="sm"
                iconName="Download"
                iconPosition="left"
                onClick={handleInstallApp}
              >
                Install App
              </Button>
            )}
          </div>
        </div>

        {/* PWA Features */}
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">App Features</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Smartphone" size={16} color="white" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Native App Experience</p>
                <p className="text-xs text-muted-foreground">Full-screen, app-like interface</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                <Icon name="Zap" size={16} color="white" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Fast Loading</p>
                <p className="text-xs text-muted-foreground">Cached resources for speed</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <div className="w-8 h-8 bg-warning rounded-full flex items-center justify-center">
                <Icon name="WifiOff" size={16} color="white" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Offline Support</p>
                <p className="text-xs text-muted-foreground">Limited functionality offline</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
              <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                <Icon name="Bell" size={16} color="white" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Push Notifications</p>
                <p className="text-xs text-muted-foreground">Stay updated with alerts</p>
              </div>
            </div>
          </div>
        </div>

        {/* PWA Settings */}
        <div className="space-y-4">
          <h3 className="font-medium text-foreground">App Preferences</h3>
          
          <div className="space-y-4">
            <Checkbox
              label="Enable offline mode"
              description="Cache content for offline viewing"
              checked={offlineMode}
              onChange={(e) => setOfflineMode(e?.target?.checked)}
            />
            
            <Checkbox
              label="Auto-sync when online"
              description="Automatically sync data when connection is restored"
              checked={autoSync}
              onChange={(e) => setAutoSync(e?.target?.checked)}
            />
            
            <Checkbox
              label="Background sync"
              description="Sync data in the background when app is closed"
              checked={backgroundSync}
              onChange={(e) => setBackgroundSync(e?.target?.checked)}
            />
          </div>
        </div>

        {/* Storage Usage */}
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-foreground">Storage Usage</h4>
            <Button variant="ghost" size="xs" iconName="RotateCcw">
              Clear Cache
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">App Cache</span>
              <span className="text-foreground">2.4 MB</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Generated Images</span>
              <span className="text-foreground">15.7 MB</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">User Data</span>
              <span className="text-foreground">0.3 MB</span>
            </div>
            <div className="pt-2 border-t border-border">
              <div className="flex items-center justify-between text-sm font-medium">
                <span className="text-foreground">Total</span>
                <span className="text-foreground">18.4 MB</span>
              </div>
            </div>
          </div>
        </div>

        {/* App Info */}
        <div className="bg-muted rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-3">App Information</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Version</p>
              <p className="text-foreground font-medium">1.2.3</p>
            </div>
            <div>
              <p className="text-muted-foreground">Last Updated</p>
              <p className="text-foreground font-medium">Sep 10, 2025</p>
            </div>
            <div>
              <p className="text-muted-foreground">Platform</p>
              <p className="text-foreground font-medium">Web</p>
            </div>
            <div>
              <p className="text-muted-foreground">Build</p>
              <p className="text-foreground font-medium">2025.09.10</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PWASection;
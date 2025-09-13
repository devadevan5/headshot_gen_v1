import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ProfileSection from './components/ProfileSection';
import SubscriptionSection from './components/SubscriptionSection';
import TransactionHistory from './components/TransactionHistory';
import PWASection from './components/PWASection';
import PrivacySection from './components/PrivacySection';
import NotificationSection from './components/NotificationSection';

const AccountSettings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const tabs = [
    {
      id: 'profile',
      label: 'Profile',
      icon: 'User',
      component: ProfileSection
    },
    {
      id: 'subscription',
      label: 'Subscription',
      icon: 'CreditCard',
      component: SubscriptionSection
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: 'Receipt',
      component: TransactionHistory
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      component: NotificationSection
    },
    {
      id: 'pwa',
      label: 'App Settings',
      icon: 'Smartphone',
      component: PWASection
    },
    {
      id: 'privacy',
      label: 'Privacy',
      icon: 'Shield',
      component: PrivacySection
    }
  ];

  const activeTabData = tabs?.find(tab => tab?.id === activeTab);
  const ActiveComponent = activeTabData?.component;

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <button
                onClick={() => navigate('/dashboard')}
                className="p-2 hover:bg-muted rounded-lg transition-smooth"
              >
                <Icon name="ArrowLeft" size={20} className="text-muted-foreground" />
              </button>
              <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
            </div>
            <p className="text-muted-foreground">
              Manage your profile, subscription, and app preferences
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Sidebar */}
            <div className="hidden lg:block w-64 flex-shrink-0">
              <div className="bg-card rounded-lg border border-border p-4 sticky top-24">
                <nav className="space-y-2">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => handleTabChange(tab?.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-smooth ${
                        activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                      }`}
                    >
                      <Icon name={tab?.icon} size={18} />
                      <span className="font-medium">{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Mobile Tab Selector */}
            <div className="lg:hidden">
              <div className="bg-card rounded-lg border border-border p-4 mb-6">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="w-full flex items-center justify-between p-3 bg-muted rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Icon name={activeTabData?.icon} size={18} />
                    <span className="font-medium text-foreground">{activeTabData?.label}</span>
                  </div>
                  <Icon 
                    name={isMobileMenuOpen ? "ChevronUp" : "ChevronDown"} 
                    size={18} 
                    className="text-muted-foreground" 
                  />
                </button>

                {isMobileMenuOpen && (
                  <div className="mt-3 space-y-1">
                    {tabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        onClick={() => handleTabChange(tab?.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-smooth ${
                          activeTab === tab?.id
                            ? 'bg-primary text-primary-foreground'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon name={tab?.icon} size={18} />
                        <span className="font-medium">{tab?.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 min-w-0">
              {ActiveComponent && <ActiveComponent />}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-12 bg-card rounded-lg border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Button
                variant="outline"
                iconName="Plus"
                iconPosition="left"
                onClick={() => navigate('/credit-purchase')}
                fullWidth
              >
                Buy Credits
              </Button>
              <Button
                variant="outline"
                iconName="Images"
                iconPosition="left"
                onClick={() => navigate('/generated-images-gallery')}
                fullWidth
              >
                View Gallery
              </Button>
              <Button
                variant="outline"
                iconName="Sparkles"
                iconPosition="left"
                onClick={() => navigate('/dashboard')}
                fullWidth
              >
                Generate Headshot
              </Button>
              <Button
                variant="outline"
                iconName="HelpCircle"
                iconPosition="left"
                fullWidth
              >
                Get Help
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
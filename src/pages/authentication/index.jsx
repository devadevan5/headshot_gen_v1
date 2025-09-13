import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from './components/AuthHeader';
import AuthForm from './components/AuthForm';
import TrustSignals from './components/TrustSignals';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useAuth } from '../../hooks/useAuth';

const Authentication = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showPWAPrompt, setShowPWAPrompt] = useState(false);
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  // Check if user is already authenticated
  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  // Show loading while checking auth state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="flex flex-col justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md mx-auto">
          <AuthHeader activeTab={activeTab} />
          <AuthForm 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <TrustSignals />
        </div>
      </div>

      {/* PWA Installation Prompt */}
      {showPWAPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-card rounded-lg p-6 max-w-sm w-full shadow-elevated">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Smartphone" size={24} color="white" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Install Headshot Generator
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                Add to your home screen for quick access and offline capabilities.
              </p>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowPWAPrompt(false)}
                  className="flex-1"
                >
                  Maybe Later
                </Button>
                <Button
                  variant="default"
                  onClick={() => {
                    setShowPWAPrompt(false);
                    navigate('/dashboard');
                  }}
                  className="flex-1"
                >
                  Install
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Authentication;
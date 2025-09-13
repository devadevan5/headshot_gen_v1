import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from './components/AuthHeader';
import AuthForm from './components/AuthForm';
import TrustSignals from './components/TrustSignals';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';



const Authentication = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);
  const [showPWAPrompt, setShowPWAPrompt] = useState(false);
  const navigate = useNavigate();

  // Mock credentials for testing
  const mockCredentials = {
    email: 'user@example.com',
    otp: '123456'
  };

  const handleAuthSubmit = async (authData) => {
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (authData?.type === 'google' || authData?.type === 'apple') {
        // Handle social authentication
        console.log(`${authData?.type} authentication initiated`);
        handleSuccessfulAuth(activeTab === 'register');
      } else if (authData?.type === 'email') {
        // Handle email submission
        console.log('OTP sent to:', authData?.email);
      } else if (authData?.type === 'otp') {
        // Handle OTP verification
        if (authData?.email === mockCredentials?.email && authData?.otp === mockCredentials?.otp) {
          handleSuccessfulAuth(activeTab === 'register');
        } else {
          alert('Invalid credentials. Please use:\nEmail: user@example.com\nOTP: 123456');
        }
      } else if (authData?.type === 'resend') {
        // Handle OTP resend
        console.log('OTP resent to:', authData?.email);
      }
    } catch (error) {
      console.error('Authentication error:', error);
      alert('Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuccessfulAuth = (isNewUser) => {
    // Store authentication state
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', mockCredentials?.email);
    
    if (isNewUser) {
      localStorage.setItem('creditBalance', '2'); // 2 free credits for new users
      setShowPWAPrompt(true);
      
      // Show PWA prompt after a short delay
      setTimeout(() => {
        if ('serviceWorker' in navigator) {
          // Trigger PWA installation prompt
          console.log('PWA installation prompt triggered');
        }
        navigate('/dashboard');
      }, 2000);
    } else {
      localStorage.setItem('creditBalance', '25'); // Existing user credits
      navigate('/dashboard');
    }
  };

  // Check if user is already authenticated
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated === 'true') {
      navigate('/dashboard');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <div className="flex flex-col justify-center min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md mx-auto">
          <AuthHeader activeTab={activeTab} />
          <AuthForm 
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onSubmit={handleAuthSubmit}
            isLoading={isLoading}
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
import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: 'Your data is protected with 256-bit SSL encryption'
    },
    {
      icon: 'Lock',
      title: 'Secure Authentication',
      description: 'Multi-factor authentication for enhanced security'
    },
    {
      icon: 'UserCheck',
      title: 'Privacy Protected',
      description: 'GDPR compliant data handling and storage'
    }
  ];

  const securityBadges = [
    { name: 'SSL Certificate', icon: 'ShieldCheck' },
    { name: 'GDPR Compliant', icon: 'FileCheck' },
    { name: 'Secure Payments', icon: 'CreditCard' }
  ];

  return (
    <div className="w-full max-w-md mx-auto mt-8">
      {/* Security Features */}
      <div className="grid grid-cols-1 gap-3 mb-6">
        {trustFeatures?.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
            <div className="flex-shrink-0">
              <Icon name={feature?.icon} size={20} className="text-success" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">{feature?.title}</p>
              <p className="text-xs text-muted-foreground">{feature?.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Security Badges */}
      <div className="flex justify-center items-center space-x-4 py-4 border-t border-border">
        {securityBadges?.map((badge, index) => (
          <div key={index} className="flex items-center space-x-1">
            <Icon name={badge?.icon} size={16} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{badge?.name}</span>
          </div>
        ))}
      </div>
      {/* Terms and Privacy */}
      <div className="text-center text-xs text-muted-foreground mt-4">
        By continuing, you agree to our{' '}
        <button className="text-accent hover:text-accent/80 transition-smooth">
          Terms of Service
        </button>{' '}
        and{' '}
        <button className="text-accent hover:text-accent/80 transition-smooth">
          Privacy Policy
        </button>
      </div>
    </div>
  );
};

export default TrustSignals;
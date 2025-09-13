import React from 'react';
import Icon from '../../../components/AppIcon';

const AuthHeader = ({ activeTab }) => {
  return (
    <div className="text-center mb-8">
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-elevated">
          <Icon name="Camera" size={32} color="white" />
        </div>
      </div>

      {/* App Name */}
      <h1 className="text-2xl font-semibold text-foreground mb-2">
        Headshot Generator
      </h1>

      {/* Subtitle */}
      <p className="text-muted-foreground text-sm max-w-sm mx-auto">
        {activeTab === 'login' ?'Welcome back! Sign in to create professional headshots with AI.' :'Transform your photos into professional headshots with AI technology.'
        }
      </p>
    </div>
  );
};

export default AuthHeader;
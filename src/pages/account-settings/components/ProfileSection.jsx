import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    company: 'Tech Solutions Inc.',
    jobTitle: 'Senior Developer',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });
  const [tempData, setTempData] = useState(profileData);

  const handleEdit = () => {
    setIsEditing(true);
    setTempData(profileData);
  };

  const handleSave = () => {
    setProfileData(tempData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempData(profileData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">Profile Information</h2>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            iconName="Edit"
            iconPosition="left"
            onClick={handleEdit}
          >
            Edit Profile
          </Button>
        )}
      </div>
      <div className="space-y-6">
        {/* Profile Image */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-muted">
              <Image
                src={profileData?.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {isEditing && (
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center hover:bg-primary/90 transition-smooth">
                <Icon name="Camera" size={16} color="white" />
              </button>
            )}
          </div>
          <div>
            <h3 className="font-medium text-foreground">
              {profileData?.firstName} {profileData?.lastName}
            </h3>
            <p className="text-sm text-muted-foreground">{profileData?.email}</p>
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="First Name"
            type="text"
            value={isEditing ? tempData?.firstName : profileData?.firstName}
            onChange={(e) => handleInputChange('firstName', e?.target?.value)}
            disabled={!isEditing}
            required
          />
          
          <Input
            label="Last Name"
            type="text"
            value={isEditing ? tempData?.lastName : profileData?.lastName}
            onChange={(e) => handleInputChange('lastName', e?.target?.value)}
            disabled={!isEditing}
            required
          />
          
          <Input
            label="Email Address"
            type="email"
            value={isEditing ? tempData?.email : profileData?.email}
            onChange={(e) => handleInputChange('email', e?.target?.value)}
            disabled={!isEditing}
            required
            description="Used for login and notifications"
          />
          
          <Input
            label="Phone Number"
            type="tel"
            value={isEditing ? tempData?.phone : profileData?.phone}
            onChange={(e) => handleInputChange('phone', e?.target?.value)}
            disabled={!isEditing}
          />
          
          <Input
            label="Company"
            type="text"
            value={isEditing ? tempData?.company : profileData?.company}
            onChange={(e) => handleInputChange('company', e?.target?.value)}
            disabled={!isEditing}
          />
          
          <Input
            label="Job Title"
            type="text"
            value={isEditing ? tempData?.jobTitle : profileData?.jobTitle}
            onChange={(e) => handleInputChange('jobTitle', e?.target?.value)}
            disabled={!isEditing}
          />
        </div>

        {/* Authentication Methods */}
        <div className="border-t border-border pt-6">
          <h3 className="font-medium text-foreground mb-4">Authentication Methods</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Mail" size={16} color="white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <p className="text-xs text-muted-foreground">Primary login method</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-xs text-success font-medium">Connected</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                  <Icon name="Chrome" size={16} color="white" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Google</p>
                  <p className="text-xs text-muted-foreground">Quick sign-in option</p>
                </div>
              </div>
              <Button variant="outline" size="xs">
                Connect
              </Button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {isEditing && (
          <div className="flex items-center space-x-3 pt-4 border-t border-border">
            <Button
              variant="default"
              iconName="Check"
              iconPosition="left"
              onClick={handleSave}
            >
              Save Changes
            </Button>
            <Button
              variant="outline"
              iconName="X"
              iconPosition="left"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;
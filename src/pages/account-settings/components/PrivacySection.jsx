import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const PrivacySection = () => {
  const [dataProcessing, setDataProcessing] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [thirdPartySharing, setThirdPartySharing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');

  const handleDataExport = () => {
    // Mock data export functionality
    const exportData = {
      profile: {
        name: 'John Doe',
        email: 'john.doe@example.com',
        createdAt: '2025-06-01T00:00:00Z'
      },
      usage: {
        totalHeadshots: 15,
        creditsUsed: 15,
        lastLogin: '2025-09-13T10:49:26Z'
      },
      preferences: {
        notifications: true,
        theme: 'light'
      }
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'headshot-generator-data-export.json';
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation?.toLowerCase() === 'delete my account') {
      // Mock account deletion
      alert('Account deletion request submitted. You will receive a confirmation email within 24 hours.');
      setShowDeleteModal(false);
      setDeleteConfirmation('');
    }
  };

  const privacySettings = [
    {
      id: 'data-processing',
      title: 'Essential Data Processing',
      description: 'Allow processing of your data for core app functionality',
      checked: dataProcessing,
      onChange: setDataProcessing,
      required: true
    },
    {
      id: 'analytics',
      title: 'Analytics & Performance',
      description: 'Help us improve the app by sharing anonymous usage data',
      checked: analytics,
      onChange: setAnalytics,
      required: false
    },
    {
      id: 'marketing',
      title: 'Marketing Communications',
      description: 'Receive promotional emails and product updates',
      checked: marketing,
      onChange: setMarketing,
      required: false
    },
    {
      id: 'third-party',
      title: 'Third-party Integrations',
      description: 'Allow data sharing with trusted partners for enhanced features',
      checked: thirdPartySharing,
      onChange: setThirdPartySharing,
      required: false
    }
  ];

  return (
    <div className="space-y-6">
      {/* Privacy Settings */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">Privacy & Data</h2>
        
        <div className="space-y-6">
          {/* GDPR Compliance Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name="Shield" size={14} color="white" />
              </div>
              <div>
                <h3 className="font-medium text-blue-900 mb-1">GDPR Compliance</h3>
                <p className="text-sm text-blue-800">
                  We comply with GDPR regulations and respect your data privacy rights. 
                  You have full control over your personal data and can request access, 
                  modification, or deletion at any time.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Controls */}
          <div className="space-y-4">
            <h3 className="font-medium text-foreground">Data Processing Preferences</h3>
            
            {privacySettings?.map((setting) => (
              <div key={setting?.id} className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
                <Checkbox
                  checked={setting?.checked}
                  onChange={(e) => setting?.onChange(e?.target?.checked)}
                  disabled={setting?.required}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-foreground">{setting?.title}</h4>
                    {setting?.required && (
                      <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded">
                        Required
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{setting?.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Data Retention */}
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-3">Data Retention Policy</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Generated Images</span>
                <span className="text-foreground font-medium">7 days</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Account Data</span>
                <span className="text-foreground font-medium">Until deletion</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Usage Analytics</span>
                <span className="text-foreground font-medium">12 months</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Payment Records</span>
                <span className="text-foreground font-medium">7 years</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Data Management */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Data Management</h3>
        
        <div className="space-y-4">
          {/* Export Data */}
          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Icon name="Download" size={20} color="white" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Export Your Data</h4>
                <p className="text-sm text-muted-foreground">Download a copy of all your data</p>
              </div>
            </div>
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              onClick={handleDataExport}
            >
              Export Data
            </Button>
          </div>

          {/* Delete Account */}
          <div className="flex items-center justify-between p-4 bg-destructive/5 border border-destructive/20 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-destructive rounded-full flex items-center justify-center">
                <Icon name="Trash2" size={20} color="white" />
              </div>
              <div>
                <h4 className="font-medium text-foreground">Delete Account</h4>
                <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
              </div>
            </div>
            <Button
              variant="destructive"
              iconName="Trash2"
              iconPosition="left"
              onClick={() => setShowDeleteModal(true)}
            >
              Delete Account
            </Button>
          </div>
        </div>
      </div>
      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-6 w-full max-w-md">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-destructive rounded-full flex items-center justify-center">
                <Icon name="AlertTriangle" size={24} color="white" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Delete Account</h3>
                <p className="text-sm text-muted-foreground">This action cannot be undone</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                <h4 className="font-medium text-destructive mb-2">What will be deleted:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Your profile and account information</li>
                  <li>• All generated headshots and images</li>
                  <li>• Credit balance and transaction history</li>
                  <li>• App preferences and settings</li>
                </ul>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Type "delete my account" to confirm:
                </label>
                <input
                  type="text"
                  value={deleteConfirmation}
                  onChange={(e) => setDeleteConfirmation(e?.target?.value)}
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="delete my account"
                />
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  disabled={deleteConfirmation?.toLowerCase() !== 'delete my account'}
                  fullWidth
                >
                  Delete Account
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowDeleteModal(false);
                    setDeleteConfirmation('');
                  }}
                  fullWidth
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrivacySection;
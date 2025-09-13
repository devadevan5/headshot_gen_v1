import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const NotificationSection = () => {
  const [emailNotifications, setEmailNotifications] = useState({
    accountUpdates: true,
    creditAlerts: true,
    promotions: false,
    weeklyDigest: true,
    securityAlerts: true
  });

  const [pushNotifications, setPushNotifications] = useState({
    generationComplete: true,
    creditLow: true,
    newFeatures: false,
    systemMaintenance: true
  });

  const [notificationFrequency, setNotificationFrequency] = useState('immediate');
  const [quietHours, setQuietHours] = useState({
    enabled: true,
    start: '22:00',
    end: '08:00'
  });

  const frequencyOptions = [
    { value: 'immediate', label: 'Immediate' },
    { value: 'hourly', label: 'Hourly Digest' },
    { value: 'daily', label: 'Daily Digest' },
    { value: 'weekly', label: 'Weekly Digest' }
  ];

  const handleEmailToggle = (key) => {
    setEmailNotifications(prev => ({
      ...prev,
      [key]: !prev?.[key]
    }));
  };

  const handlePushToggle = (key) => {
    setPushNotifications(prev => ({
      ...prev,
      [key]: !prev?.[key]
    }));
  };

  const handleQuietHoursToggle = () => {
    setQuietHours(prev => ({
      ...prev,
      enabled: !prev?.enabled
    }));
  };

  const handleTestNotification = () => {
    // Mock test notification
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Test Notification', {
        body: 'This is a test notification from Headshot Generator',
        icon: '/favicon.ico'
      });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission()?.then(permission => {
        if (permission === 'granted') {
          new Notification('Test Notification', {
            body: 'This is a test notification from Headshot Generator',
            icon: '/favicon.ico'
          });
        }
      });
    } else {
      alert('Test notification sent! (Browser notifications not supported)');
    }
  };

  const emailNotificationSettings = [
    {
      key: 'accountUpdates',
      title: 'Account Updates',
      description: 'Important changes to your account and subscription',
      checked: emailNotifications?.accountUpdates,
      required: true
    },
    {
      key: 'creditAlerts',
      title: 'Credit Alerts',
      description: 'Notifications when your credits are running low',
      checked: emailNotifications?.creditAlerts,
      required: false
    },
    {
      key: 'promotions',
      title: 'Promotions & Offers',
      description: 'Special deals and promotional content',
      checked: emailNotifications?.promotions,
      required: false
    },
    {
      key: 'weeklyDigest',
      title: 'Weekly Digest',
      description: 'Summary of your activity and new features',
      checked: emailNotifications?.weeklyDigest,
      required: false
    },
    {
      key: 'securityAlerts',
      title: 'Security Alerts',
      description: 'Login attempts and security-related notifications',
      checked: emailNotifications?.securityAlerts,
      required: true
    }
  ];

  const pushNotificationSettings = [
    {
      key: 'generationComplete',
      title: 'Generation Complete',
      description: 'When your headshot generation is finished',
      checked: pushNotifications?.generationComplete
    },
    {
      key: 'creditLow',
      title: 'Low Credits',
      description: 'When you have 5 or fewer credits remaining',
      checked: pushNotifications?.creditLow
    },
    {
      key: 'newFeatures',
      title: 'New Features',
      description: 'Announcements about new app features',
      checked: pushNotifications?.newFeatures
    },
    {
      key: 'systemMaintenance',
      title: 'System Maintenance',
      description: 'Scheduled maintenance and downtime alerts',
      checked: pushNotifications?.systemMaintenance
    }
  ];

  return (
    <div className="space-y-6">
      {/* Email Notifications */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Email Notifications</h2>
          <Button
            variant="outline"
            size="sm"
            iconName="Mail"
            iconPosition="left"
          >
            Test Email
          </Button>
        </div>

        <div className="space-y-4">
          {emailNotificationSettings?.map((setting) => (
            <div key={setting?.key} className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
              <Checkbox
                checked={setting?.checked}
                onChange={() => handleEmailToggle(setting?.key)}
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

        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Notification Frequency
              </label>
              <Select
                options={frequencyOptions}
                value={notificationFrequency}
                onChange={setNotificationFrequency}
                placeholder="Select frequency"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground bg-muted px-3 py-2 rounded-md flex-1">
                  john.doe@example.com
                </span>
                <Button variant="ghost" size="sm" iconName="Edit">
                  Change
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Push Notifications */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Push Notifications</h2>
          <Button
            variant="outline"
            size="sm"
            iconName="Bell"
            iconPosition="left"
            onClick={handleTestNotification}
          >
            Test Push
          </Button>
        </div>

        <div className="space-y-4">
          {pushNotificationSettings?.map((setting) => (
            <div key={setting?.key} className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
              <Checkbox
                checked={setting?.checked}
                onChange={() => handlePushToggle(setting?.key)}
                className="mt-1"
              />
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{setting?.title}</h4>
                <p className="text-sm text-muted-foreground mt-1">{setting?.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Quiet Hours */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-start space-x-3 p-4 bg-muted rounded-lg">
            <Checkbox
              checked={quietHours?.enabled}
              onChange={handleQuietHoursToggle}
              className="mt-1"
            />
            <div className="flex-1">
              <h4 className="font-medium text-foreground">Quiet Hours</h4>
              <p className="text-sm text-muted-foreground mt-1">
                Disable push notifications during specified hours
              </p>
              
              {quietHours?.enabled && (
                <div className="grid grid-cols-2 gap-4 mt-3">
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      value={quietHours?.start}
                      onChange={(e) => setQuietHours(prev => ({ ...prev, start: e?.target?.value }))}
                      className="w-full px-2 py-1 text-sm border border-border rounded bg-background text-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-muted-foreground mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      value={quietHours?.end}
                      onChange={(e) => setQuietHours(prev => ({ ...prev, end: e?.target?.value }))}
                      className="w-full px-2 py-1 text-sm border border-border rounded bg-background text-foreground"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Notification History */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Notifications</h3>
        
        <div className="space-y-3">
          {[
            {
              id: 1,
              type: 'success',
              title: 'Headshot Generated',
              message: 'Your professional headshot is ready for download',
              time: '2 hours ago',
              icon: 'CheckCircle'
            },
            {
              id: 2,
              type: 'warning',
              title: 'Low Credits',
              message: 'You have 5 credits remaining',
              time: '1 day ago',
              icon: 'AlertTriangle'
            },
            {
              id: 3,
              type: 'info',
              title: 'Monthly Refresh',
              message: 'Your credits have been refreshed for this month',
              time: '3 days ago',
              icon: 'RefreshCw'
            },
            {
              id: 4,
              type: 'success',
              title: 'Payment Successful',
              message: 'Your Pro plan subscription has been renewed',
              time: '1 week ago',
              icon: 'CreditCard'
            }
          ]?.map((notification) => (
            <div key={notification?.id} className="flex items-start space-x-3 p-3 bg-muted rounded-lg">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                notification?.type === 'success' ? 'bg-success' :
                notification?.type === 'warning' ? 'bg-warning' :
                notification?.type === 'info' ? 'bg-primary' : 'bg-muted-foreground'
              }`}>
                <Icon name={notification?.icon} size={16} color="white" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-foreground">{notification?.title}</h4>
                <p className="text-sm text-muted-foreground">{notification?.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{notification?.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="ghost" size="sm" fullWidth>
            View All Notifications
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotificationSection;
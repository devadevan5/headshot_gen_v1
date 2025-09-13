import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import MetricsCard from './components/MetricsCard';
import ContentManagement from './components/ContentManagement';
import UserManagement from './components/UserManagement';
import Analytics from './components/Analytics';
import PromptTemplateEditor from './components/PromptTemplateEditor';
import FeedbackManagement from './components/FeedbackManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const metricsData = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12.5%',
      changeType: 'positive',
      icon: 'Users',
      iconColor: 'bg-accent'
    },
    {
      title: 'Generations Today',
      value: '1,234',
      change: '+8.2%',
      changeType: 'positive',
      icon: 'Zap',
      iconColor: 'bg-warning'
    },
    {
      title: 'Revenue (MTD)',
      value: '$12,450',
      change: '+15.3%',
      changeType: 'positive',
      icon: 'DollarSign',
      iconColor: 'bg-success'
    },
    {
      title: 'System Health',
      value: '99.8%',
      change: '-0.1%',
      changeType: 'negative',
      icon: 'Activity',
      iconColor: 'bg-primary'
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'BarChart3' },
    { id: 'content', label: 'Content', icon: 'Image' },
    { id: 'users', label: 'Users', icon: 'Users' },
    { id: 'analytics', label: 'Analytics', icon: 'TrendingUp' },
    { id: 'prompts', label: 'Prompts', icon: 'FileText' },
    { id: 'feedback', label: 'Feedback', icon: 'MessageSquare' }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'user_signup',
      message: 'New user registered: sarah.johnson@email.com',
      timestamp: '2 minutes ago',
      icon: 'UserPlus',
      iconColor: 'text-success'
    },
    {
      id: 2,
      type: 'generation',
      message: '156 headshots generated in the last hour',
      timestamp: '5 minutes ago',
      icon: 'Zap',
      iconColor: 'text-warning'
    },
    {
      id: 3,
      type: 'subscription',
      message: 'Pro subscription purchased by michael.chen@email.com',
      timestamp: '12 minutes ago',
      icon: 'CreditCard',
      iconColor: 'text-accent'
    },
    {
      id: 4,
      type: 'feedback',
      message: 'New 5-star review received',
      timestamp: '18 minutes ago',
      icon: 'Star',
      iconColor: 'text-warning'
    },
    {
      id: 5,
      type: 'system',
      message: 'Daily backup completed successfully',
      timestamp: '1 hour ago',
      icon: 'Shield',
      iconColor: 'text-primary'
    }
  ];

  const quickStats = [
    { label: 'Active Sessions', value: '234', icon: 'Activity' },
    { label: 'Queue Length', value: '12', icon: 'Clock' },
    { label: 'Error Rate', value: '0.2%', icon: 'AlertTriangle' },
    { label: 'Avg Response', value: '1.8s', icon: 'Gauge' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {metricsData?.map((metric, index) => (
                <MetricsCard key={index} {...metric} />
              ))}
            </div>
            {/* Quick Stats and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Quick Stats */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">System Status</h3>
                <div className="space-y-4">
                  {quickStats?.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Icon name={stat?.icon} size={16} className="text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{stat?.label}</span>
                      </div>
                      <span className="text-sm font-medium text-foreground">{stat?.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activity */}
              <div className="lg:col-span-2 bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
                  <button className="text-sm text-accent hover:text-accent/80 transition-smooth">
                    View All
                  </button>
                </div>
                <div className="space-y-4">
                  {recentActivity?.map((activity) => (
                    <div key={activity?.id} className="flex items-start space-x-3">
                      <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                        <Icon name={activity?.icon} size={14} className={activity?.iconColor} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">{activity?.message}</p>
                        <p className="text-xs text-muted-foreground">{activity?.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 'content':
        return <ContentManagement />;
      case 'users':
        return <UserManagement />;
      case 'analytics':
        return <Analytics />;
      case 'prompts':
        return <PromptTemplateEditor />;
      case 'feedback':
        return <FeedbackManagement />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Shield" size={24} color="white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-muted-foreground">
                  Comprehensive platform management and analytics
                </p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-8">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-smooth ${
                      activeTab === tab?.id
                        ? 'border-accent text-accent' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={16} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="min-h-[600px]">
            {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
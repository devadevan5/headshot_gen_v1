import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SubscriptionSection = () => {
  const navigate = useNavigate();

  const subscriptionData = {
    plan: 'Pro',
    price: '$19.99',
    credits: 45,
    totalCredits: 60,
    nextRefresh: '2025-10-13',
    status: 'active'
  };

  const usageHistory = [
    {
      id: 1,
      date: '2025-09-12',
      action: 'Headshot Generated',
      credits: -1,
      remaining: 45
    },
    {
      id: 2,
      date: '2025-09-11',
      action: 'Headshot Generated',
      credits: -1,
      remaining: 46
    },
    {
      id: 3,
      date: '2025-09-10',
      action: 'Monthly Refresh',
      credits: +60,
      remaining: 47
    },
    {
      id: 4,
      date: '2025-09-09',
      action: 'Headshot Generated',
      credits: -1,
      remaining: 47
    },
    {
      id: 5,
      date: '2025-09-08',
      action: 'Headshot Generated',
      credits: -1,
      remaining: 48
    }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getProgressPercentage = () => {
    return (subscriptionData?.credits / subscriptionData?.totalCredits) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Current Plan */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Current Subscription</h2>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-sm text-success font-medium capitalize">{subscriptionData?.status}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-foreground">{subscriptionData?.plan} Plan</h3>
              <p className="text-lg text-muted-foreground">{subscriptionData?.price}/month</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Credits Remaining</span>
                <span className="text-sm font-medium text-foreground">
                  {subscriptionData?.credits} / {subscriptionData?.totalCredits}
                </span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${getProgressPercentage()}%` }}
                ></div>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Calendar" size={16} />
              <span>Next refresh: {formatDate(subscriptionData?.nextRefresh)}</span>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-3">
            <Button
              variant="default"
              iconName="CreditCard"
              iconPosition="left"
              onClick={() => navigate('/credit-purchase')}
              fullWidth
            >
              Upgrade Plan
            </Button>
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              fullWidth
            >
              Download Invoice
            </Button>
          </div>
        </div>
      </div>
      {/* Usage History */}
      <div className="bg-card rounded-lg border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
        
        <div className="space-y-3">
          {usageHistory?.map((item) => (
            <div key={item?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  item?.credits > 0 ? 'bg-success' : 'bg-primary'
                }`}>
                  <Icon 
                    name={item?.credits > 0 ? 'Plus' : 'Minus'} 
                    size={16} 
                    color="white" 
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item?.action}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(item?.date)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${
                  item?.credits > 0 ? 'text-success' : 'text-foreground'
                }`}>
                  {item?.credits > 0 ? '+' : ''}{item?.credits} credits
                </p>
                <p className="text-xs text-muted-foreground">{item?.remaining} remaining</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-border">
          <Button variant="ghost" size="sm" fullWidth>
            View Full History
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionSection;
import React, { useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import PricingCard from './PricingCard';

const PaywallModal = ({ 
  isOpen, 
  onClose, 
  onSelectPlan, 
  pricingPlans = [],
  isLoading = false 
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevated max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Out of Credits</h2>
            <p className="text-muted-foreground mt-1">
              Choose a plan to continue generating professional headshots
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Alert Message */}
          <div className="bg-warning/10 border border-warning/20 rounded-md p-4 mb-6">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-foreground mb-1">Credits Required</h3>
                <p className="text-sm text-muted-foreground">
                  You need credits to generate headshots. Each generation uses 1 credit. 
                  Choose a plan below to get started.
                </p>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingPlans?.map((plan, index) => (
              <PricingCard
                key={plan?.id}
                plan={plan}
                isPopular={index === 1}
                onSelect={onSelectPlan}
                isLoading={isLoading}
                currentCredits={0}
              />
            ))}
          </div>

          {/* Trust Signals */}
          <div className="mt-8 pt-6 border-t border-border">
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span className="text-sm text-muted-foreground">Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="RefreshCw" size={16} className="text-success" />
                <span className="text-sm text-muted-foreground">Cancel Anytime</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={16} className="text-success" />
                <span className="text-sm text-muted-foreground">Instant Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaywallModal;
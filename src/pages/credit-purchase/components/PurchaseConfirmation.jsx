import React, { useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PurchaseConfirmation = ({ 
  isOpen, 
  onClose, 
  purchaseDetails = null,
  onContinue 
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

  if (!isOpen || !purchaseDetails) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-elevated max-w-md w-full">
        {/* Success Header */}
        <div className="text-center p-6 border-b border-border">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="CheckCircle" size={32} className="text-success" />
          </div>
          <h2 className="text-2xl font-semibold text-foreground mb-2">
            Purchase Successful!
          </h2>
          <p className="text-muted-foreground">
            Your credits have been added to your account
          </p>
        </div>

        {/* Purchase Details */}
        <div className="p-6 space-y-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Plan:</span>
              <span className="font-medium text-foreground">{purchaseDetails?.planName}</span>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Credits Added:</span>
              <div className="flex items-center space-x-1">
                <Icon name="Coins" size={16} className="text-warning" />
                <span className="font-medium text-foreground">{purchaseDetails?.credits}</span>
              </div>
            </div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">Amount Paid:</span>
              <span className="font-medium text-foreground">${purchaseDetails?.amount}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">New Balance:</span>
              <div className="flex items-center space-x-1">
                <Icon name="Coins" size={16} className="text-warning" />
                <span className="font-bold text-success">{purchaseDetails?.newBalance}</span>
              </div>
            </div>
          </div>

          {/* Next Billing */}
          {purchaseDetails?.nextBilling && (
            <div className="bg-accent/10 border border-accent/20 rounded-md p-3">
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={16} className="text-accent" />
                <span className="text-sm font-medium text-accent">
                  Next billing: {new Date(purchaseDetails.nextBilling)?.toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
              </div>
            </div>
          )}

          {/* Receipt Info */}
          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Receipt sent to your email address
            </p>
            <p className="text-xs text-muted-foreground">
              Transaction ID: {purchaseDetails?.transactionId || 'TXN-' + Date.now()}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 pt-0 space-y-3">
          <Button
            variant="default"
            size="lg"
            fullWidth
            onClick={onContinue}
            iconName="Sparkles"
            iconPosition="left"
          >
            Start Creating Headshots
          </Button>
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={onClose}
          >
            View Account Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PurchaseConfirmation;
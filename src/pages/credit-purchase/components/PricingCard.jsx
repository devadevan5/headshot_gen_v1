import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PricingCard = ({ 
  plan, 
  isPopular = false, 
  onSelect, 
  isLoading = false,
  currentCredits = 0 
}) => {
  const calculateValuePerCredit = (price, credits) => {
    return (price / credits)?.toFixed(2);
  };

  const getBadgeColor = () => {
    if (plan?.name === 'Premium') return 'bg-warning text-warning-foreground';
    if (plan?.name === 'Pro') return 'bg-accent text-accent-foreground';
    return 'bg-secondary text-secondary-foreground';
  };

  return (
    <div className={`relative bg-card border rounded-lg p-6 transition-smooth hover:shadow-elevated ${
      isPopular ? 'border-accent shadow-soft' : 'border-border'
    }`}>
      {/* Popular Badge */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
            Most Popular
          </span>
        </div>
      )}
      {/* Plan Header */}
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold text-foreground mb-2">{plan?.name}</h3>
        <div className="flex items-baseline justify-center mb-2">
          <span className="text-3xl font-bold text-foreground">${plan?.price}</span>
          <span className="text-muted-foreground ml-1">/month</span>
        </div>
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Icon name="Coins" size={16} className="text-warning" />
          <span className="text-lg font-medium text-foreground">{plan?.credits} Credits</span>
        </div>
        <p className="text-sm text-muted-foreground">
          ${calculateValuePerCredit(plan?.price, plan?.credits)} per credit
        </p>
      </div>
      {/* Features */}
      <div className="space-y-3 mb-6">
        {plan?.features?.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Icon name="Check" size={16} className="text-success flex-shrink-0" />
            <span className="text-sm text-foreground">{feature}</span>
          </div>
        ))}
      </div>
      {/* Value Proposition */}
      {plan?.savings && (
        <div className="bg-success/10 border border-success/20 rounded-md p-3 mb-6">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">
              Save {plan?.savings}% vs individual credits
            </span>
          </div>
        </div>
      )}
      {/* Action Button */}
      <Button
        variant={isPopular ? "default" : "outline"}
        size="lg"
        fullWidth
        loading={isLoading}
        onClick={() => onSelect(plan)}
        iconName="CreditCard"
        iconPosition="left"
      >
        {currentCredits === 0 ? 'Get Credits Now' : 'Upgrade Plan'}
      </Button>
      {/* Monthly Refresh Note */}
      <p className="text-xs text-muted-foreground text-center mt-3">
        Credits refresh monthly on your billing date
      </p>
    </div>
  );
};

export default PricingCard;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CreditBalance = ({ credits, showLowCreditWarning }) => {
  const navigate = useNavigate();

  const handleBuyCredits = () => {
    navigate('/credit-purchase');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            credits > 5 ? 'bg-success/10' : credits > 0 ? 'bg-warning/10' : 'bg-destructive/10'
          }`}>
            <Icon 
              name="Coins" 
              size={20} 
              className={credits > 5 ? 'text-success' : credits > 0 ? 'text-warning' : 'text-destructive'}
            />
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-foreground">Credit Balance</h3>
            <p className="text-2xl font-bold text-foreground">{credits}</p>
          </div>
        </div>

        <Button
          variant={credits === 0 ? "default" : "outline"}
          size="sm"
          onClick={handleBuyCredits}
          iconName="Plus"
          iconPosition="left"
        >
          Buy Credits
        </Button>
      </div>

      {showLowCreditWarning && credits <= 5 && credits > 0 && (
        <div className="mt-3 p-3 bg-warning/10 border border-warning/20 rounded-md">
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning mt-0.5" />
            <div>
              <p className="text-sm font-medium text-warning">Low Credit Warning</p>
              <p className="text-xs text-warning/80 mt-1">
                You have {credits} credit{credits !== 1 ? 's' : ''} remaining. Consider purchasing more to continue generating headshots.
              </p>
            </div>
          </div>
        </div>
      )}

      {credits === 0 && (
        <div className="mt-3 p-3 bg-destructive/10 border border-destructive/20 rounded-md">
          <div className="flex items-start space-x-2">
            <Icon name="AlertCircle" size={16} className="text-destructive mt-0.5" />
            <div>
              <p className="text-sm font-medium text-destructive">No Credits Remaining</p>
              <p className="text-xs text-destructive/80 mt-1">
                Purchase credits to generate professional headshots.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreditBalance;
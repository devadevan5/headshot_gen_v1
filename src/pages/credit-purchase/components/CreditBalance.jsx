import React from 'react';
import Icon from '../../../components/AppIcon';

const CreditBalance = ({ credits = 0, lastRefresh = null, nextRefresh = null }) => {
  const formatDate = (date) => {
    if (!date) return 'N/A';
    return new Date(date)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getBalanceColor = () => {
    if (credits === 0) return 'text-destructive';
    if (credits <= 5) return 'text-warning';
    return 'text-success';
  };

  const getBalanceIcon = () => {
    if (credits === 0) return 'AlertCircle';
    if (credits <= 5) return 'AlertTriangle';
    return 'CheckCircle';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">Credit Balance</h2>
        <div className={`flex items-center space-x-2 ${getBalanceColor()}`}>
          <Icon name={getBalanceIcon()} size={20} />
          <span className="text-2xl font-bold">{credits}</span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Cost per generation:</span>
          <span className="font-medium text-foreground">1 credit</span>
        </div>

        {lastRefresh && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Last refresh:</span>
            <span className="font-medium text-foreground">{formatDate(lastRefresh)}</span>
          </div>
        )}

        {nextRefresh && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Next refresh:</span>
            <span className="font-medium text-foreground">{formatDate(nextRefresh)}</span>
          </div>
        )}

        {credits === 0 && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-md p-3 mt-4">
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} className="text-destructive" />
              <span className="text-sm font-medium text-destructive">
                No credits remaining
              </span>
            </div>
            <p className="text-xs text-destructive/80 mt-1">
              Purchase credits below to continue generating headshots
            </p>
          </div>
        )}

        {credits > 0 && credits <= 5 && (
          <div className="bg-warning/10 border border-warning/20 rounded-md p-3 mt-4">
            <div className="flex items-center space-x-2">
              <Icon name="AlertTriangle" size={16} className="text-warning" />
              <span className="text-sm font-medium text-warning">
                Low credit balance
              </span>
            </div>
            <p className="text-xs text-warning/80 mt-1">
              Consider purchasing more credits to avoid interruptions
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreditBalance;
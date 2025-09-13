import React from 'react';
import Icon from '../../../components/AppIcon';

const PaymentMethods = () => {
  const paymentMethods = [
    { name: 'Visa', icon: 'CreditCard', color: 'text-blue-600' },
    { name: 'Mastercard', icon: 'CreditCard', color: 'text-red-600' },
    { name: 'American Express', icon: 'CreditCard', color: 'text-blue-500' },
    { name: 'PayPal', icon: 'Wallet', color: 'text-blue-700' },
    { name: 'Apple Pay', icon: 'Smartphone', color: 'text-gray-800' },
    { name: 'Google Pay', icon: 'Smartphone', color: 'text-green-600' }
  ];

  const trustSignals = [
    {
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: 'Your payment information is secure'
    },
    {
      icon: 'Lock',
      title: 'PCI Compliant',
      description: 'Industry standard security'
    },
    {
      icon: 'RefreshCw',
      title: 'Cancel Anytime',
      description: 'No long-term commitments'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Secure Payment</h3>
      {/* Payment Methods */}
      <div className="mb-6">
        <p className="text-sm text-muted-foreground mb-3">Accepted payment methods:</p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {paymentMethods?.map((method, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-3 border border-border rounded-md hover:bg-muted transition-smooth"
            >
              <Icon 
                name={method?.icon} 
                size={24} 
                className={method?.color}
              />
              <span className="text-xs text-muted-foreground mt-1 text-center">
                {method?.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Trust Signals */}
      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground">Security & Trust:</p>
        {trustSignals?.map((signal, index) => (
          <div key={index} className="flex items-center space-x-3">
            <Icon name={signal?.icon} size={16} className="text-success flex-shrink-0" />
            <div>
              <span className="text-sm font-medium text-foreground">{signal?.title}</span>
              <p className="text-xs text-muted-foreground">{signal?.description}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Powered by Stripe */}
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-xs text-muted-foreground">Powered by</span>
          <div className="flex items-center space-x-1">
            <Icon name="CreditCard" size={16} className="text-primary" />
            <span className="text-sm font-semibold text-primary">Stripe</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
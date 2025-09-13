import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TransactionHistory = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const transactions = [
    {
      id: 'txn_1234567890',
      date: '2025-09-13',
      description: 'Pro Plan - Monthly Subscription',
      amount: 19.99,
      status: 'completed',
      method: 'Visa ending in 4242',
      credits: 60
    },
    {
      id: 'txn_0987654321',
      date: '2025-08-13',
      description: 'Pro Plan - Monthly Subscription',
      amount: 19.99,
      status: 'completed',
      method: 'Visa ending in 4242',
      credits: 60
    },
    {
      id: 'txn_1122334455',
      date: '2025-07-13',
      description: 'Starter Plan - Monthly Subscription',
      amount: 9.99,
      status: 'completed',
      method: 'Visa ending in 4242',
      credits: 20
    },
    {
      id: 'txn_5566778899',
      date: '2025-06-15',
      description: 'Premium Plan - One-time Purchase',
      amount: 29.99,
      status: 'completed',
      method: 'PayPal',
      credits: 120
    },
    {
      id: 'txn_9988776655',
      date: '2025-06-01',
      description: 'Starter Plan - Monthly Subscription',
      amount: 9.99,
      status: 'failed',
      method: 'Visa ending in 4242',
      credits: 0
    }
  ];

  const filters = [
    { value: 'all', label: 'All Transactions' },
    { value: 'completed', label: 'Completed' },
    { value: 'failed', label: 'Failed' },
    { value: 'pending', label: 'Pending' }
  ];

  const filteredTransactions = selectedFilter === 'all' 
    ? transactions 
    : transactions?.filter(t => t?.status === selectedFilter);

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-success bg-success/10';
      case 'failed':
        return 'text-destructive bg-destructive/10';
      case 'pending':
        return 'text-warning bg-warning/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'failed':
        return 'XCircle';
      case 'pending':
        return 'Clock';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-xl font-semibold text-foreground">Transaction History</h2>
        
        <div className="flex items-center space-x-2">
          {filters?.map((filter) => (
            <button
              key={filter?.value}
              onClick={() => setSelectedFilter(filter?.value)}
              className={`px-3 py-1.5 text-sm rounded-md transition-smooth ${
                selectedFilter === filter?.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}
            >
              {filter?.label}
            </button>
          ))}
        </div>
      </div>
      {filteredTransactions?.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Receipt" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No transactions found</h3>
          <p className="text-muted-foreground">No transactions match the selected filter.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Date</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Description</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Amount</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Status</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Credits</th>
                    <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions?.map((transaction) => (
                    <tr key={transaction?.id} className="border-b border-border hover:bg-muted/50 transition-smooth">
                      <td className="py-4 px-2">
                        <span className="text-sm text-foreground">{formatDate(transaction?.date)}</span>
                      </td>
                      <td className="py-4 px-2">
                        <div>
                          <p className="text-sm font-medium text-foreground">{transaction?.description}</p>
                          <p className="text-xs text-muted-foreground">{transaction?.method}</p>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <span className="text-sm font-medium text-foreground">${transaction?.amount}</span>
                      </td>
                      <td className="py-4 px-2">
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction?.status)}`}>
                          <Icon name={getStatusIcon(transaction?.status)} size={12} />
                          <span className="capitalize">{transaction?.status}</span>
                        </div>
                      </td>
                      <td className="py-4 px-2">
                        <span className="text-sm text-foreground">
                          {transaction?.credits > 0 ? `+${transaction?.credits}` : '0'}
                        </span>
                      </td>
                      <td className="py-4 px-2 text-right">
                        <Button variant="ghost" size="xs" iconName="Download">
                          Receipt
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-3">
            {filteredTransactions?.map((transaction) => (
              <div key={transaction?.id} className="bg-muted rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-sm font-medium text-foreground">{transaction?.description}</p>
                    <p className="text-xs text-muted-foreground">{formatDate(transaction?.date)}</p>
                  </div>
                  <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction?.status)}`}>
                    <Icon name={getStatusIcon(transaction?.status)} size={12} />
                    <span className="capitalize">{transaction?.status}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm font-medium text-foreground">${transaction?.amount}</span>
                    <span className="text-sm text-muted-foreground">
                      {transaction?.credits > 0 ? `+${transaction?.credits} credits` : 'No credits'}
                    </span>
                  </div>
                  <Button variant="ghost" size="xs" iconName="Download">
                    Receipt
                  </Button>
                </div>
                
                <div className="mt-2 pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground">{transaction?.method}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {filteredTransactions?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border flex justify-center">
          <Button variant="outline" size="sm">
            Load More Transactions
          </Button>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [subscriptionFilter, setSubscriptionFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [creditAdjustment, setCreditAdjustment] = useState('');

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'active', label: 'Active' },
    { value: 'suspended', label: 'Suspended' },
    { value: 'pending', label: 'Pending' }
  ];

  const subscriptionOptions = [
    { value: 'all', label: 'All Subscriptions' },
    { value: 'free', label: 'Free' },
    { value: 'starter', label: 'Starter' },
    { value: 'pro', label: 'Pro' },
    { value: 'premium', label: 'Premium' }
  ];

  const users = [
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@email.com',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
      status: 'active',
      subscription: 'pro',
      credits: 45,
      totalGenerations: 156,
      joinDate: '2024-12-15',
      lastActive: '2025-01-13',
      totalSpent: 59.97
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
      status: 'active',
      subscription: 'premium',
      credits: 89,
      totalGenerations: 234,
      joinDate: '2024-11-28',
      lastActive: '2025-01-13',
      totalSpent: 119.94
    },
    {
      id: 3,
      name: 'Michael Chen',
      email: 'michael.chen@email.com',
      avatar: 'https://randomuser.me/api/portraits/men/68.jpg',
      status: 'suspended',
      subscription: 'starter',
      credits: 0,
      totalGenerations: 67,
      joinDate: '2024-12-20',
      lastActive: '2025-01-10',
      totalSpent: 29.99
    },
    {
      id: 4,
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      avatar: 'https://randomuser.me/api/portraits/women/22.jpg',
      status: 'active',
      subscription: 'free',
      credits: 2,
      totalGenerations: 12,
      joinDate: '2025-01-08',
      lastActive: '2025-01-12',
      totalSpent: 0
    },
    {
      id: 5,
      name: 'David Wilson',
      email: 'david.w@email.com',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      status: 'pending',
      subscription: 'free',
      credits: 2,
      totalGenerations: 0,
      joinDate: '2025-01-13',
      lastActive: '2025-01-13',
      totalSpent: 0
    }
  ];

  const filteredUsers = users?.filter(user => {
    const matchesSearch = user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         user?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user?.status === statusFilter;
    const matchesSubscription = subscriptionFilter === 'all' || user?.subscription === subscriptionFilter;
    return matchesSearch && matchesStatus && matchesSubscription;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success text-success-foreground', label: 'Active' },
      suspended: { color: 'bg-destructive text-destructive-foreground', label: 'Suspended' },
      pending: { color: 'bg-warning text-warning-foreground', label: 'Pending' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.active;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getSubscriptionBadge = (subscription) => {
    const subscriptionConfig = {
      free: { color: 'bg-muted text-muted-foreground', label: 'Free' },
      starter: { color: 'bg-accent text-accent-foreground', label: 'Starter' },
      pro: { color: 'bg-primary text-primary-foreground', label: 'Pro' },
      premium: { color: 'bg-secondary text-secondary-foreground', label: 'Premium' }
    };
    
    const config = subscriptionConfig?.[subscription] || subscriptionConfig?.free;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const handleUserSelect = (userId) => {
    setSelectedUsers(prev => 
      prev?.includes(userId) 
        ? prev?.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const handleStatusChange = (userId, newStatus) => {
    console.log('Change status for user:', userId, 'to:', newStatus);
  };

  const handleCreditAdjustment = (userId) => {
    if (creditAdjustment) {
      console.log('Adjust credits for user:', userId, 'by:', creditAdjustment);
      setEditingUser(null);
      setCreditAdjustment('');
    }
  };

  const handleBulkAction = (action) => {
    if (selectedUsers?.length > 0) {
      console.log('Bulk action:', action, 'for users:', selectedUsers);
      setSelectedUsers([]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
        </div>
        <div className="lg:w-48">
          <Select
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="Filter by status"
          />
        </div>
        <div className="lg:w-48">
          <Select
            options={subscriptionOptions}
            value={subscriptionFilter}
            onChange={setSubscriptionFilter}
            placeholder="Filter by subscription"
          />
        </div>
      </div>
      {/* Bulk Actions */}
      {selectedUsers?.length > 0 && (
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {selectedUsers?.length} user{selectedUsers?.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="UserCheck"
                onClick={() => handleBulkAction('activate')}
              >
                Activate
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="UserX"
                onClick={() => handleBulkAction('suspend')}
              >
                Suspend
              </Button>
              <Button
                variant="destructive"
                size="sm"
                iconName="Trash2"
                onClick={() => handleBulkAction('delete')}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Users Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    checked={selectedUsers?.length === filteredUsers?.length && filteredUsers?.length > 0}
                    onChange={(e) => {
                      if (e?.target?.checked) {
                        setSelectedUsers(filteredUsers?.map(user => user?.id));
                      } else {
                        setSelectedUsers([]);
                      }
                    }}
                    className="w-4 h-4 rounded border-border"
                  />
                </th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">User</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Subscription</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Credits</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Generations</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Total Spent</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Last Active</th>
                <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers?.map((user) => (
                <tr key={user?.id} className="border-t border-border hover:bg-muted/50">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers?.includes(user?.id)}
                      onChange={() => handleUserSelect(user?.id)}
                      className="w-4 h-4 rounded border-border"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                          src={user?.avatar}
                          alt={user?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{user?.name}</p>
                        <p className="text-sm text-muted-foreground">{user?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    {getStatusBadge(user?.status)}
                  </td>
                  <td className="p-4">
                    {getSubscriptionBadge(user?.subscription)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-sm">{user?.credits}</span>
                      <button
                        onClick={() => setEditingUser(user?.id)}
                        className="text-accent hover:text-accent/80 transition-smooth"
                      >
                        <Icon name="Edit2" size={14} />
                      </button>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-mono text-sm">{user?.totalGenerations}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-mono text-sm">${user?.totalSpent?.toFixed(2)}</span>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">{user?.lastActive}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleStatusChange(user?.id, user?.status === 'active' ? 'suspended' : 'active')}
                        className="text-muted-foreground hover:text-foreground transition-smooth"
                      >
                        <Icon name={user?.status === 'active' ? 'UserX' : 'UserCheck'} size={16} />
                      </button>
                      <button className="text-muted-foreground hover:text-foreground transition-smooth">
                        <Icon name="MoreHorizontal" size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* Credit Adjustment Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card border border-border rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-foreground mb-4">Adjust Credits</h3>
            <div className="space-y-4">
              <Input
                label="Credit Adjustment"
                type="number"
                placeholder="Enter amount (+ to add, - to subtract)"
                value={creditAdjustment}
                onChange={(e) => setCreditAdjustment(e?.target?.value)}
                description="Use positive numbers to add credits, negative to subtract"
              />
              <div className="flex items-center space-x-3">
                <Button
                  variant="default"
                  onClick={() => handleCreditAdjustment(editingUser)}
                  disabled={!creditAdjustment}
                >
                  Apply Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditingUser(null);
                    setCreditAdjustment('');
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
      {filteredUsers?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No users found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

import Select from '../../../components/ui/Select';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [activeChart, setActiveChart] = useState('usage');

  const timeRangeOptions = [
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: '1y', label: 'Last Year' }
  ];

  const usageData = [
    { date: '2025-01-07', generations: 45, users: 12, revenue: 89.55 },
    { date: '2025-01-08', generations: 67, users: 18, revenue: 134.33 },
    { date: '2025-01-09', generations: 52, users: 15, revenue: 103.48 },
    { date: '2025-01-10', generations: 78, users: 22, revenue: 156.22 },
    { date: '2025-01-11', generations: 89, users: 25, revenue: 178.55 },
    { date: '2025-01-12', generations: 94, users: 28, revenue: 188.22 },
    { date: '2025-01-13', generations: 112, users: 32, revenue: 224.44 }
  ];

  const subscriptionData = [
    { name: 'Free', value: 245, color: '#64748B' },
    { name: 'Starter', value: 89, color: '#3B82F6' },
    { name: 'Pro', value: 156, color: '#1E293B' },
    { name: 'Premium', value: 67, color: '#059669' }
  ];

  const popularOutfits = [
    { name: 'Navy Business Suit', uses: 245, category: 'Professional' },
    { name: 'Smart Casual Blazer', uses: 189, category: 'Business Casual' },
    { name: 'Casual Button Down', uses: 156, category: 'Casual' },
    { name: 'Winter Formal Coat', uses: 98, category: 'Seasonal' },
    { name: 'Summer Polo', uses: 87, category: 'Casual' }
  ];

  const popularBackgrounds = [
    { name: 'Corporate Office', uses: 312, category: 'Professional' },
    { name: 'Modern Studio', uses: 267, category: 'Aesthetic' },
    { name: 'Neutral Gradient', uses: 198, category: 'Casual' },
    { name: 'Holiday Theme', uses: 134, category: 'Seasonal' },
    { name: 'Urban Backdrop', uses: 123, category: 'Aesthetic' }
  ];

  const revenueData = [
    { month: 'Jul 2024', revenue: 2450, subscriptions: 45 },
    { month: 'Aug 2024', revenue: 3200, subscriptions: 67 },
    { month: 'Sep 2024', revenue: 2890, subscriptions: 52 },
    { month: 'Oct 2024', revenue: 4100, subscriptions: 78 },
    { month: 'Nov 2024', revenue: 4850, subscriptions: 89 },
    { month: 'Dec 2024', revenue: 5200, subscriptions: 94 },
    { month: 'Jan 2025', revenue: 6100, subscriptions: 112 }
  ];

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date?.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatCurrency = (value) => {
    return `$${value?.toFixed(2)}`;
  };

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold text-foreground">Analytics Dashboard</h3>
          <div className="w-48">
            <Select
              options={timeRangeOptions}
              value={timeRange}
              onChange={setTimeRange}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2 bg-muted p-1 rounded-lg">
          <button
            onClick={() => setActiveChart('usage')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-smooth ${
              activeChart === 'usage' ?'bg-card text-foreground shadow-soft' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Usage
          </button>
          <button
            onClick={() => setActiveChart('revenue')}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-smooth ${
              activeChart === 'revenue' ?'bg-card text-foreground shadow-soft' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Revenue
          </button>
        </div>
      </div>
      {/* Main Chart */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="h-80">
          {activeChart === 'usage' ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={usageData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={formatDate}
                  stroke="var(--color-muted-foreground)"
                />
                <YAxis stroke="var(--color-muted-foreground)" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                  labelFormatter={(value) => formatDate(value)}
                />
                <Bar dataKey="generations" fill="var(--color-accent)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-muted-foreground)"
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                  formatter={(value) => [`$${value}`, 'Revenue']}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="var(--color-success)" 
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-success)', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
      {/* Secondary Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subscription Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="text-lg font-semibold text-foreground mb-4">Subscription Distribution</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={subscriptionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {subscriptionData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {subscriptionData?.map((item) => (
              <div key={item?.name} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item?.color }}
                />
                <span className="text-sm text-muted-foreground">{item?.name}</span>
                <span className="text-sm font-medium text-foreground ml-auto">{item?.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Content */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h4 className="text-lg font-semibold text-foreground mb-4">Popular Content</h4>
          <div className="space-y-4">
            <div>
              <h5 className="text-sm font-medium text-muted-foreground mb-2">Top Outfits</h5>
              <div className="space-y-2">
                {popularOutfits?.slice(0, 3)?.map((outfit, index) => (
                  <div key={outfit?.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
                        #{index + 1}
                      </span>
                      <span className="text-sm text-foreground">{outfit?.name}</span>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {outfit?.uses} uses
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t border-border pt-4">
              <h5 className="text-sm font-medium text-muted-foreground mb-2">Top Backgrounds</h5>
              <div className="space-y-2">
                {popularBackgrounds?.slice(0, 3)?.map((background, index) => (
                  <div key={background?.name} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
                        #{index + 1}
                      </span>
                      <span className="text-sm text-foreground">{background?.name}</span>
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">
                      {background?.uses} uses
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Detailed Tables */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Popular Outfits Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-4 border-b border-border">
            <h4 className="text-lg font-semibold text-foreground">Popular Outfits</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Rank</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Name</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Category</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Uses</th>
                </tr>
              </thead>
              <tbody>
                {popularOutfits?.map((outfit, index) => (
                  <tr key={outfit?.name} className="border-t border-border">
                    <td className="p-3">
                      <span className="text-sm font-mono bg-muted px-2 py-1 rounded">
                        #{index + 1}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-foreground">{outfit?.name}</td>
                    <td className="p-3 text-sm text-muted-foreground">{outfit?.category}</td>
                    <td className="p-3 text-sm font-medium text-foreground">{outfit?.uses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Popular Backgrounds Table */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <div className="p-4 border-b border-border">
            <h4 className="text-lg font-semibold text-foreground">Popular Backgrounds</h4>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Rank</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Name</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Category</th>
                  <th className="text-left p-3 text-sm font-medium text-muted-foreground">Uses</th>
                </tr>
              </thead>
              <tbody>
                {popularBackgrounds?.map((background, index) => (
                  <tr key={background?.name} className="border-t border-border">
                    <td className="p-3">
                      <span className="text-sm font-mono bg-muted px-2 py-1 rounded">
                        #{index + 1}
                      </span>
                    </td>
                    <td className="p-3 text-sm text-foreground">{background?.name}</td>
                    <td className="p-3 text-sm text-muted-foreground">{background?.category}</td>
                    <td className="p-3 text-sm font-medium text-foreground">{background?.uses}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
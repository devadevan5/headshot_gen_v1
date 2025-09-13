import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterBar = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  selectedCount, 
  onBulkDownload,
  onSelectAll,
  onDeselectAll,
  totalImages 
}) => {
  const dateRangeOptions = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' }
  ];

  const ratingOptions = [
    { value: 'all', label: 'All Ratings' },
    { value: 'unrated', label: 'Unrated' },
    { value: '1', label: '1 Star' },
    { value: '2', label: '2 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '5', label: '5 Stars' }
  ];

  const outfitOptions = [
    { value: 'all', label: 'All Outfits' },
    { value: 'professional', label: 'Professional' },
    { value: 'business-casual', label: 'Business Casual' },
    { value: 'casual', label: 'Casual' },
    { value: 'seasonal', label: 'Seasonal' }
  ];

  const backgroundOptions = [
    { value: 'all', label: 'All Backgrounds' },
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'aesthetic', label: 'Aesthetic' },
    { value: 'seasonal', label: 'Seasonal' }
  ];

  const hasActiveFilters = filters?.dateRange !== 'all' || 
                          filters?.rating !== 'all' || 
                          filters?.outfit !== 'all' || 
                          filters?.background !== 'all';

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      {/* Filter Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Select
          label="Date Range"
          options={dateRangeOptions}
          value={filters?.dateRange}
          onChange={(value) => onFilterChange('dateRange', value)}
          className="w-full"
        />
        
        <Select
          label="Rating"
          options={ratingOptions}
          value={filters?.rating}
          onChange={(value) => onFilterChange('rating', value)}
          className="w-full"
        />
        
        <Select
          label="Outfit"
          options={outfitOptions}
          value={filters?.outfit}
          onChange={(value) => onFilterChange('outfit', value)}
          className="w-full"
        />
        
        <Select
          label="Background"
          options={backgroundOptions}
          value={filters?.background}
          onChange={(value) => onFilterChange('background', value)}
          className="w-full"
        />
      </div>
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Filter Actions */}
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="outline"
              size="sm"
              onClick={onClearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear Filters
            </Button>
          )}
          
          {hasActiveFilters && (
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Icon name="Filter" size={16} />
              <span>Filters applied</span>
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        <div className="flex items-center space-x-2">
          {selectedCount > 0 && (
            <>
              <span className="text-sm text-muted-foreground">
                {selectedCount} selected
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={onBulkDownload}
                iconName="Download"
                iconPosition="left"
              >
                Download Selected
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onDeselectAll}
              >
                Deselect All
              </Button>
            </>
          )}
          
          {selectedCount === 0 && totalImages > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onSelectAll}
              iconName="CheckSquare"
              iconPosition="left"
            >
              Select All
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
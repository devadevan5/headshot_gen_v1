import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const EmptyState = ({ hasFilters, onClearFilters }) => {
  const navigate = useNavigate();

  if (hasFilters) {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Search" size={32} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No images match your filters
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          Try adjusting your filter criteria to see more results, or clear all filters to view your complete gallery.
        </p>
        <Button
          variant="outline"
          onClick={onClearFilters}
          iconName="X"
          iconPosition="left"
        >
          Clear All Filters
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center py-16">
      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon name="Camera" size={40} className="text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3">
        No headshots generated yet
      </h3>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Start creating professional headshots with AI. Your generated images will appear here and be available for 7 days.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button
          variant="default"
          onClick={() => navigate('/dashboard')}
          iconName="Sparkles"
          iconPosition="left"
        >
          Create Your First Headshot
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate('/credit-purchase')}
          iconName="CreditCard"
          iconPosition="left"
        >
          Purchase Credits
        </Button>
      </div>
      
      {/* Feature Highlights */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
        <div className="text-center">
          <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Zap" size={24} className="text-accent" />
          </div>
          <h4 className="font-medium text-foreground mb-1">AI-Powered</h4>
          <p className="text-sm text-muted-foreground">
            Generate professional headshots in seconds
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Download" size={24} className="text-success" />
          </div>
          <h4 className="font-medium text-foreground mb-1">High Quality</h4>
          <p className="text-sm text-muted-foreground">
            Download in multiple formats and resolutions
          </p>
        </div>
        
        <div className="text-center">
          <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mx-auto mb-3">
            <Icon name="Star" size={24} className="text-warning" />
          </div>
          <h4 className="font-medium text-foreground mb-1">Rate & Review</h4>
          <p className="text-sm text-muted-foreground">
            Rate your results to improve future generations
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;
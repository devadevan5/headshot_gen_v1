import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ImageCard = ({ image, onSelect, isSelected, onRate, onDownload, onPreview }) => {
  const [isRating, setIsRating] = useState(false);
  const [hoveredStar, setHoveredStar] = useState(0);

  const handleStarClick = (rating) => {
    onRate(image?.id, rating);
    setIsRating(false);
  };

  const handleStarHover = (rating) => {
    setHoveredStar(rating);
  };

  const formatTimeRemaining = (expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return 'Expired';
    if (diffDays === 1) return '1 day left';
    return `${diffDays} days left`;
  };

  const getExpiryColor = (expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 0) return 'text-destructive';
    if (diffDays <= 2) return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden shadow-soft hover:shadow-elevated transition-smooth">
      {/* Image Container */}
      <div className="relative aspect-square bg-muted">
        <Image
          src={image?.url}
          alt={`Generated headshot from ${image?.createdAt}`}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => onPreview(image)}
        />
        
        {/* Selection Checkbox */}
        <div className="absolute top-2 left-2">
          <button
            onClick={(e) => {
              e?.stopPropagation();
              onSelect(image?.id);
            }}
            className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-smooth ${
              isSelected
                ? 'bg-accent border-accent text-accent-foreground'
                : 'bg-card border-border hover:border-accent'
            }`}
          >
            {isSelected && <Icon name="Check" size={14} />}
          </button>
        </div>

        {/* Expiry Warning */}
        <div className="absolute top-2 right-2">
          <div className={`px-2 py-1 bg-card/90 backdrop-blur-sm rounded text-xs font-medium ${getExpiryColor(image?.expiryDate)}`}>
            {formatTimeRemaining(image?.expiryDate)}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="absolute bottom-2 right-2 flex space-x-1">
          <Button
            variant="secondary"
            size="icon"
            onClick={(e) => {
              e?.stopPropagation();
              onDownload(image);
            }}
            className="w-8 h-8 bg-card/90 backdrop-blur-sm hover:bg-card"
          >
            <Icon name="Download" size={14} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={(e) => {
              e?.stopPropagation();
              onPreview(image);
            }}
            className="w-8 h-8 bg-card/90 backdrop-blur-sm hover:bg-card"
          >
            <Icon name="Eye" size={14} />
          </Button>
        </div>
      </div>
      {/* Card Content */}
      <div className="p-4">
        {/* Generation Details */}
        <div className="mb-3">
          <p className="text-sm font-medium text-foreground mb-1">
            {new Date(image.createdAt)?.toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </p>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <span>{image?.outfit}</span>
            <span>•</span>
            <span>{image?.background}</span>
          </div>
        </div>

        {/* Rating Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5]?.map((star) => (
              <button
                key={star}
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarHover(star)}
                onMouseLeave={() => setHoveredStar(0)}
                className="p-0.5 transition-smooth hover:scale-110"
              >
                <Icon
                  name="Star"
                  size={16}
                  className={`transition-smooth ${
                    star <= (hoveredStar || image?.rating)
                      ? 'text-warning fill-current' :'text-muted-foreground'
                  }`}
                />
              </button>
            ))}
          </div>
          
          {image?.rating > 0 && (
            <span className="text-xs text-muted-foreground">
              {image?.rating}/5
            </span>
          )}
        </div>

        {/* Comment Section */}
        {image?.comment && (
          <div className="mt-2 p-2 bg-muted rounded text-xs text-muted-foreground">
            "{image?.comment}"
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCard;
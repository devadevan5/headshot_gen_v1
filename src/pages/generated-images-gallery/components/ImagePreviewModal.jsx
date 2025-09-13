import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const ImagePreviewModal = ({ image, isOpen, onClose, onRate, onDownload }) => {
  const [downloadFormat, setDownloadFormat] = useState('jpg');
  const [downloadQuality, setDownloadQuality] = useState('high');
  const [rating, setRating] = useState(image?.rating || 0);
  const [comment, setComment] = useState(image?.comment || '');
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);

  if (!isOpen || !image) return null;

  const formatOptions = [
    { value: 'jpg', label: 'JPG' },
    { value: 'png', label: 'PNG' },
    { value: 'webp', label: 'WebP' }
  ];

  const qualityOptions = [
    { value: 'high', label: 'High Quality (Original)' },
    { value: 'medium', label: 'Medium Quality (75%)' },
    { value: 'low', label: 'Low Quality (50%)' }
  ];

  const handleStarClick = (newRating) => {
    setRating(newRating);
  };

  const handleSubmitRating = async () => {
    setIsSubmittingRating(true);
    try {
      await onRate(image?.id, rating, comment);
    } finally {
      setIsSubmittingRating(false);
    }
  };

  const handleDownload = () => {
    onDownload(image, { format: downloadFormat, quality: downloadQuality });
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

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div>
            <h2 className="text-lg font-semibold text-foreground">
              Generated Headshot
            </h2>
            <p className="text-sm text-muted-foreground">
              Created on {new Date(image.createdAt)?.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 max-h-[calc(90vh-80px)] overflow-y-auto">
          {/* Image Section */}
          <div className="p-6 bg-muted/30">
            <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
              <Image
                src={image?.url}
                alt={`Generated headshot from ${image?.createdAt}`}
                className="w-full h-full object-cover"
              />
              
              {/* Expiry Badge */}
              <div className="absolute top-4 right-4">
                <div className="px-3 py-1 bg-card/90 backdrop-blur-sm rounded-full text-sm font-medium text-warning">
                  {formatTimeRemaining(image?.expiryDate)}
                </div>
              </div>
            </div>

            {/* Image Details */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Outfit:</span>
                <span className="font-medium text-foreground">{image?.outfit}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Background:</span>
                <span className="font-medium text-foreground">{image?.background}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Resolution:</span>
                <span className="font-medium text-foreground">1024 × 1024</span>
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="p-6 space-y-6">
            {/* Download Section */}
            <div>
              <h3 className="text-base font-semibold text-foreground mb-4">
                Download Options
              </h3>
              <div className="space-y-4">
                <Select
                  label="Format"
                  options={formatOptions}
                  value={downloadFormat}
                  onChange={setDownloadFormat}
                />
                
                <Select
                  label="Quality"
                  options={qualityOptions}
                  value={downloadQuality}
                  onChange={setDownloadQuality}
                />
                
                <Button
                  variant="default"
                  fullWidth
                  onClick={handleDownload}
                  iconName="Download"
                  iconPosition="left"
                >
                  Download Image
                </Button>
              </div>
            </div>

            {/* Rating Section */}
            <div className="border-t border-border pt-6">
              <h3 className="text-base font-semibold text-foreground mb-4">
                Rate This Headshot
              </h3>
              
              {/* Star Rating */}
              <div className="flex items-center space-x-1 mb-4">
                {[1, 2, 3, 4, 5]?.map((star) => (
                  <button
                    key={star}
                    onClick={() => handleStarClick(star)}
                    onMouseEnter={() => setHoveredStar(star)}
                    onMouseLeave={() => setHoveredStar(0)}
                    className="p-1 transition-smooth hover:scale-110"
                  >
                    <Icon
                      name="Star"
                      size={24}
                      className={`transition-smooth ${
                        star <= (hoveredStar || rating)
                          ? 'text-warning fill-current' :'text-muted-foreground'
                      }`}
                    />
                  </button>
                ))}
                {rating > 0 && (
                  <span className="ml-2 text-sm text-muted-foreground">
                    {rating}/5
                  </span>
                )}
              </div>

              {/* Comment */}
              <Input
                label="Comment (Optional)"
                type="text"
                placeholder="Share your thoughts about this headshot..."
                value={comment}
                onChange={(e) => setComment(e?.target?.value)}
                className="mb-4"
              />

              <Button
                variant="outline"
                fullWidth
                onClick={handleSubmitRating}
                loading={isSubmittingRating}
                disabled={rating === 0}
                iconName="Star"
                iconPosition="left"
              >
                {image?.rating > 0 ? 'Update Rating' : 'Submit Rating'}
              </Button>
            </div>

            {/* Additional Actions */}
            <div className="border-t border-border pt-6">
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    // Share functionality would go here
                    navigator.share?.({
                      title: 'My Professional Headshot',
                      url: image?.url
                    });
                  }}
                  iconName="Share2"
                  iconPosition="left"
                >
                  Share
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    // Delete functionality would go here
                    if (confirm('Are you sure you want to delete this image?')) {
                      onClose();
                    }
                  }}
                  iconName="Trash2"
                  iconPosition="left"
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagePreviewModal;
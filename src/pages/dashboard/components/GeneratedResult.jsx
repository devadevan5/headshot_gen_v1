import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const GeneratedResult = ({ result, onDownload, onRate, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [hasRated, setHasRated] = useState(false);

  const handleRatingSubmit = () => {
    if (rating > 0) {
      onRate({ rating, comment });
      setHasRated(true);
    }
  };

  const handleDownload = () => {
    onDownload(result);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">
              Your Professional Headshot
            </h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-muted transition-colors"
            >
              <Icon name="X" size={20} className="text-muted-foreground" />
            </button>
          </div>

          <div className="space-y-4">
            <div className="relative bg-muted rounded-lg overflow-hidden">
              <Image
                src={result?.imageUrl}
                alt="Generated headshot"
                className="w-full h-auto"
              />
              
              <div className="absolute top-2 right-2 bg-success text-success-foreground px-2 py-1 rounded-full text-xs font-medium">
                <Icon name="Sparkles" size={12} className="inline mr-1" />
                AI Generated
              </div>
            </div>

            <div className="flex space-x-2">
              <Button
                variant="default"
                onClick={handleDownload}
                iconName="Download"
                iconPosition="left"
                fullWidth
              >
                Download
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigator.share && navigator.share({
                  title: 'My Professional Headshot',
                  text: 'Check out my new AI-generated headshot!',
                  url: result?.imageUrl
                })}
                iconName="Share"
                size="default"
              >
                Share
              </Button>
            </div>

            {!hasRated ? (
              <div className="border-t border-border pt-4 space-y-4">
                <div className="text-center">
                  <h4 className="text-sm font-medium text-foreground mb-2">
                    Rate this result
                  </h4>
                  <div className="flex justify-center space-x-1 mb-3">
                    {[1, 2, 3, 4, 5]?.map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="p-1 transition-colors"
                      >
                        <Icon
                          name="Star"
                          size={20}
                          className={star <= rating ? 'text-warning fill-current' : 'text-muted-foreground'}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  value={comment}
                  onChange={(e) => setComment(e?.target?.value)}
                  placeholder="Share your feedback (optional)"
                  className="w-full p-3 border border-border rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  rows={3}
                />

                <Button
                  variant="outline"
                  onClick={handleRatingSubmit}
                  disabled={rating === 0}
                  fullWidth
                  iconName="Send"
                  iconPosition="left"
                >
                  Submit Rating
                </Button>
              </div>
            ) : (
              <div className="border-t border-border pt-4 text-center">
                <div className="flex items-center justify-center space-x-2 text-success">
                  <Icon name="CheckCircle" size={16} />
                  <span className="text-sm font-medium">Thank you for your feedback!</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneratedResult;
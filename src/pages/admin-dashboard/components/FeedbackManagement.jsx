import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';

const FeedbackManagement = () => {
  const [selectedRating, setSelectedRating] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedFeedback, setSelectedFeedback] = useState([]);

  const ratingOptions = [
    { value: 'all', label: 'All Ratings' },
    { value: '5', label: '5 Stars' },
    { value: '4', label: '4 Stars' },
    { value: '3', label: '3 Stars' },
    { value: '2', label: '2 Stars' },
    { value: '1', label: '1 Star' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'highest', label: 'Highest Rating' },
    { value: 'lowest', label: 'Lowest Rating' }
  ];

  const feedbackData = [
    {
      id: 1,
      user: {
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      rating: 5,
      comment: `Absolutely amazing results! The AI generated headshot looks incredibly professional and natural. I've been using it for my LinkedIn profile and received so many compliments. The outfit selection was perfect and the background looked very corporate. Definitely worth every credit!`,
      generatedImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=400&fit=crop',outfit: 'Professional Blazer',background: 'Corporate Office',timestamp: '2025-01-13 09:30:00',status: 'published',
      helpful: 12,
      reported: 0
    },
    {
      id: 2,
      user: {
        name: 'Michael Chen',email: 'michael.chen@email.com',avatar: 'https://randomuser.me/api/portraits/men/68.jpg'
      },
      rating: 4,
      comment: `Great quality overall! The face detection worked perfectly and the final result looks very professional. Only minor issue was that the lighting could have been slightly better, but still very satisfied with the outcome. Will definitely use again.`,
      generatedImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',outfit: 'Business Casual Shirt',background: 'Modern Studio',timestamp: '2025-01-12 14:45:00',status: 'published',
      helpful: 8,
      reported: 0
    },
    {
      id: 3,
      user: {
        name: 'Emily Davis',email: 'emily.davis@email.com',avatar: 'https://randomuser.me/api/portraits/women/22.jpg'
      },
      rating: 3,
      comment: `The result was okay but not exactly what I expected. The outfit looked good but the background seemed a bit artificial. Maybe needs some improvement in the blending. Customer service was helpful though.`,
      generatedImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop',outfit: 'Casual Sweater',background: 'Neutral Gradient',timestamp: '2025-01-11 16:20:00',status: 'published',
      helpful: 3,
      reported: 1
    },
    {
      id: 4,
      user: {
        name: 'David Wilson',email: 'david.w@email.com',avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
      },
      rating: 2,
      comment: `Not satisfied with the quality. The face detection didn't work properly and the final image looked distorted. Had to use multiple credits to get a decent result. Support team was responsive but the technical issues need to be fixed.`,
      generatedImage: null,
      outfit: 'Formal Suit',
      background: 'Professional Office',
      timestamp: '2025-01-10 11:15:00',
      status: 'under_review',
      helpful: 1,
      reported: 3
    },
    {
      id: 5,
      user: {
        name: 'Lisa Anderson',
        email: 'lisa.a@email.com',
        avatar: 'https://randomuser.me/api/portraits/women/67.jpg'
      },
      rating: 5,
      comment: `Exceeded my expectations! The AI perfectly captured the professional look I was going for. The process was smooth and the results were ready quickly. Highly recommend for anyone needing professional headshots.`,
      generatedImage: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300&h=400&fit=crop',
      outfit: 'Executive Blazer',
      background: 'Corporate Backdrop',
      timestamp: '2025-01-09 13:40:00',
      status: 'published',
      helpful: 15,
      reported: 0
    }
  ];

  const filteredFeedback = feedbackData?.filter(feedback => {
    const matchesRating = selectedRating === 'all' || feedback?.rating?.toString() === selectedRating;
    const matchesSearch = feedback?.user?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         feedback?.comment?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    return matchesRating && matchesSearch;
  });

  const sortedFeedback = [...filteredFeedback]?.sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.timestamp) - new Date(a.timestamp);
      case 'oldest':
        return new Date(a.timestamp) - new Date(b.timestamp);
      case 'highest':
        return b?.rating - a?.rating;
      case 'lowest':
        return a?.rating - b?.rating;
      default:
        return 0;
    }
  });

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <Icon
            key={star}
            name="Star"
            size={16}
            className={star <= rating ? "text-warning fill-current" : "text-muted-foreground"}
          />
        ))}
      </div>
    );
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      published: { color: 'bg-success text-success-foreground', label: 'Published' },
      under_review: { color: 'bg-warning text-warning-foreground', label: 'Under Review' },
      hidden: { color: 'bg-destructive text-destructive-foreground', label: 'Hidden' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.published;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const handleFeedbackSelect = (feedbackId) => {
    setSelectedFeedback(prev => 
      prev?.includes(feedbackId) 
        ? prev?.filter(id => id !== feedbackId)
        : [...prev, feedbackId]
    );
  };

  const handleStatusChange = (feedbackId, newStatus) => {
    console.log('Change status for feedback:', feedbackId, 'to:', newStatus);
  };

  const handleBulkAction = (action) => {
    if (selectedFeedback?.length > 0) {
      console.log('Bulk action:', action, 'for feedback:', selectedFeedback);
      setSelectedFeedback([]);
    }
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const averageRating = feedbackData?.reduce((sum, feedback) => sum + feedback?.rating, 0) / feedbackData?.length;
  const totalFeedback = feedbackData?.length;
  const ratingDistribution = [5, 4, 3, 2, 1]?.map(rating => ({
    rating,
    count: feedbackData?.filter(f => f?.rating === rating)?.length,
    percentage: (feedbackData?.filter(f => f?.rating === rating)?.length / totalFeedback) * 100
  }));

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Star" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Average Rating</p>
              <p className="text-xl font-bold text-foreground">{averageRating?.toFixed(1)}</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="MessageSquare" size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Reviews</p>
              <p className="text-xl font-bold text-foreground">{totalFeedback}</p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="ThumbsUp" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Positive (4-5★)</p>
              <p className="text-xl font-bold text-foreground">
                {feedbackData?.filter(f => f?.rating >= 4)?.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-destructive/10 rounded-lg flex items-center justify-center">
              <Icon name="AlertTriangle" size={20} className="text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Reported</p>
              <p className="text-xl font-bold text-foreground">
                {feedbackData?.filter(f => f?.reported > 0)?.length}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Rating Distribution */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h4 className="text-lg font-semibold text-foreground mb-4">Rating Distribution</h4>
        <div className="space-y-3">
          {ratingDistribution?.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 w-16">
                <span className="text-sm font-medium text-foreground">{rating}</span>
                <Icon name="Star" size={14} className="text-warning fill-current" />
              </div>
              <div className="flex-1 bg-muted rounded-full h-2">
                <div 
                  className="bg-warning h-2 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="w-12 text-sm text-muted-foreground text-right">
                {count}
              </div>
              <div className="w-12 text-sm text-muted-foreground text-right">
                {percentage?.toFixed(0)}%
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search feedback by user or content..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
        </div>
        <div className="lg:w-48">
          <Select
            options={ratingOptions}
            value={selectedRating}
            onChange={setSelectedRating}
            placeholder="Filter by rating"
          />
        </div>
        <div className="lg:w-48">
          <Select
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy}
            placeholder="Sort by"
          />
        </div>
      </div>
      {/* Bulk Actions */}
      {selectedFeedback?.length > 0 && (
        <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {selectedFeedback?.length} feedback{selectedFeedback?.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Eye"
                onClick={() => handleBulkAction('publish')}
              >
                Publish
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="EyeOff"
                onClick={() => handleBulkAction('hide')}
              >
                Hide
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
      {/* Feedback List */}
      <div className="space-y-4">
        {sortedFeedback?.map((feedback) => (
          <div key={feedback?.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <input
                type="checkbox"
                checked={selectedFeedback?.includes(feedback?.id)}
                onChange={() => handleFeedbackSelect(feedback?.id)}
                className="w-4 h-4 rounded border-border mt-1"
              />
              
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={feedback?.user?.avatar}
                  alt={feedback?.user?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-3">
                      <h5 className="font-medium text-foreground">{feedback?.user?.name}</h5>
                      {renderStars(feedback?.rating)}
                      {getStatusBadge(feedback?.status)}
                    </div>
                    <p className="text-sm text-muted-foreground">{feedback?.user?.email}</p>
                    <p className="text-xs text-muted-foreground">{formatTimestamp(feedback?.timestamp)}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleStatusChange(feedback?.id, 'published')}
                      className="text-muted-foreground hover:text-foreground transition-smooth"
                    >
                      <Icon name="Eye" size={16} />
                    </button>
                    <button className="text-muted-foreground hover:text-foreground transition-smooth">
                      <Icon name="MoreHorizontal" size={16} />
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-foreground leading-relaxed">{feedback?.comment}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <span>Outfit: {feedback?.outfit}</span>
                    <span>Background: {feedback?.background}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Icon name="ThumbsUp" size={12} />
                      <span>{feedback?.helpful}</span>
                    </div>
                    {feedback?.reported > 0 && (
                      <div className="flex items-center space-x-1 text-destructive">
                        <Icon name="Flag" size={12} />
                        <span>{feedback?.reported}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {feedback?.generatedImage && (
                <div className="w-16 h-20 overflow-hidden rounded-lg">
                  <Image
                    src={feedback?.generatedImage}
                    alt="Generated headshot"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {sortedFeedback?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="MessageSquare" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No feedback found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default FeedbackManagement;
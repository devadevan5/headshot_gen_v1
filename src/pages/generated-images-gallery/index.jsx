import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import ImageCard from './components/ImageCard';
import FilterBar from './components/FilterBar';
import ImagePreviewModal from './components/ImagePreviewModal';
import EmptyState from './components/EmptyState';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const GeneratedImagesGallery = () => {
  const [images, setImages] = useState([]);
  const [filteredImages, setFilteredImages] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    dateRange: 'all',
    rating: 'all',
    outfit: 'all',
    background: 'all'
  });

  // Mock data for generated images
  const mockImages = [
    {
      id: 1,
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      createdAt: '2025-01-12T14:30:00Z',
      expiryDate: '2025-01-19T14:30:00Z',
      outfit: 'Professional Suit',
      background: 'Corporate Office',
      rating: 5,
      comment: 'Perfect for LinkedIn profile!'
    },
    {
      id: 2,
      url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
      createdAt: '2025-01-12T10:15:00Z',
      expiryDate: '2025-01-19T10:15:00Z',
      outfit: 'Business Casual',
      background: 'Modern Studio',
      rating: 4,
      comment: 'Great lighting and composition'
    },
    {
      id: 3,
      url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
      createdAt: '2025-01-11T16:45:00Z',
      expiryDate: '2025-01-18T16:45:00Z',
      outfit: 'Casual Shirt',
      background: 'Natural Light',
      rating: 3,
      comment: ''
    },
    {
      id: 4,
      url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face',
      createdAt: '2025-01-11T09:20:00Z',
      expiryDate: '2025-01-18T09:20:00Z',
      outfit: 'Professional Blazer',
      background: 'Gradient Blue',
      rating: 0,
      comment: ''
    },
    {
      id: 5,
      url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
      createdAt: '2025-01-10T13:10:00Z',
      expiryDate: '2025-01-17T13:10:00Z',
      outfit: 'Seasonal Sweater',
      background: 'Warm Bokeh',
      rating: 4,
      comment: 'Love the seasonal vibe'
    },
    {
      id: 6,
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face',
      createdAt: '2025-01-10T11:30:00Z',
      expiryDate: '2025-01-17T11:30:00Z',
      outfit: 'Creative Casual',
      background: 'Artistic Studio',
      rating: 5,
      comment: 'Perfect for creative portfolio'
    },
    {
      id: 7,
      url: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face',
      createdAt: '2025-01-09T15:45:00Z',
      expiryDate: '2025-01-16T15:45:00Z',
      outfit: 'Executive Suit',
      background: 'Corporate Gray',
      rating: 0,
      comment: ''
    },
    {
      id: 8,
      url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face',
      createdAt: '2025-01-09T08:20:00Z',
      expiryDate: '2025-01-16T08:20:00Z',
      outfit: 'Smart Casual',
      background: 'Soft White',
      rating: 3,
      comment: 'Good for general use'
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setImages(mockImages);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Apply filters
    let filtered = [...images];

    // Date range filter
    if (filters?.dateRange !== 'all') {
      const now = new Date();
      const filterDate = new Date();
      
      switch (filters?.dateRange) {
        case 'today':
          filterDate?.setHours(0, 0, 0, 0);
          break;
        case 'week':
          filterDate?.setDate(now?.getDate() - 7);
          break;
        case 'month':
          filterDate?.setMonth(now?.getMonth() - 1);
          break;
      }
      
      filtered = filtered?.filter(img => new Date(img.createdAt) >= filterDate);
    }

    // Rating filter
    if (filters?.rating !== 'all') {
      if (filters?.rating === 'unrated') {
        filtered = filtered?.filter(img => img?.rating === 0);
      } else {
        filtered = filtered?.filter(img => img?.rating === parseInt(filters?.rating));
      }
    }

    // Outfit filter
    if (filters?.outfit !== 'all') {
      filtered = filtered?.filter(img => 
        img?.outfit?.toLowerCase()?.includes(filters?.outfit?.replace('-', ' '))
      );
    }

    // Background filter
    if (filters?.background !== 'all') {
      filtered = filtered?.filter(img => 
        img?.background?.toLowerCase()?.includes(filters?.background)
      );
    }

    setFilteredImages(filtered);
  }, [images, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      dateRange: 'all',
      rating: 'all',
      outfit: 'all',
      background: 'all'
    });
  };

  const handleSelectImage = (imageId) => {
    setSelectedImages(prev => 
      prev?.includes(imageId)
        ? prev?.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };

  const handleSelectAll = () => {
    setSelectedImages(filteredImages?.map(img => img?.id));
  };

  const handleDeselectAll = () => {
    setSelectedImages([]);
  };

  const handlePreviewImage = (image) => {
    setPreviewImage(image);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
    setPreviewImage(null);
  };

  const handleRateImage = async (imageId, rating, comment = '') => {
    setImages(prev => prev?.map(img => 
      img?.id === imageId 
        ? { ...img, rating, comment }
        : img
    ));
    
    // Update preview image if it's the same one
    if (previewImage && previewImage?.id === imageId) {
      setPreviewImage(prev => ({ ...prev, rating, comment }));
    }
  };

  const handleDownloadImage = (image, options = {}) => {
    // Simulate download
    const link = document.createElement('a');
    link.href = image?.url;
    link.download = `headshot-${image?.id}-${Date.now()}.${options?.format || 'jpg'}`;
    document.body?.appendChild(link);
    link?.click();
    document.body?.removeChild(link);
  };

  const handleBulkDownload = () => {
    const selectedImageData = images?.filter(img => selectedImages?.includes(img?.id));
    selectedImageData?.forEach((image, index) => {
      setTimeout(() => {
        handleDownloadImage(image);
      }, index * 500); // Stagger downloads
    });
    setSelectedImages([]);
  };

  const hasActiveFilters = filters?.dateRange !== 'all' || 
                          filters?.rating !== 'all' || 
                          filters?.outfit !== 'all' || 
                          filters?.background !== 'all';

  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Generated Images Gallery - Headshot Generator</title>
          <meta name="description" content="View, download, and manage your AI-generated professional headshots" />
        </Helmet>
        <div className="min-h-screen bg-background">
          <Header />
          <main className="pt-16">
            <div className="container mx-auto px-4 py-8">
              <div className="flex items-center justify-center py-16">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading your gallery...</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Generated Images Gallery - Headshot Generator</title>
        <meta name="description" content="View, download, and manage your AI-generated professional headshots" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-16">
          <div className="container mx-auto px-4 py-8">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Images" size={24} className="text-accent" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Generated Images Gallery
                  </h1>
                  <p className="text-muted-foreground">
                    View, download, and manage your AI-generated professional headshots
                  </p>
                </div>
              </div>
              
              {images?.length > 0 && (
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <span>{images?.length} total images</span>
                  <span>•</span>
                  <span>{filteredImages?.length} showing</span>
                  {selectedImages?.length > 0 && (
                    <>
                      <span>•</span>
                      <span>{selectedImages?.length} selected</span>
                    </>
                  )}
                </div>
              )}
            </div>

            {images?.length > 0 && (
              <FilterBar
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                selectedCount={selectedImages?.length}
                onBulkDownload={handleBulkDownload}
                onSelectAll={handleSelectAll}
                onDeselectAll={handleDeselectAll}
                totalImages={filteredImages?.length}
              />
            )}

            {/* Gallery Grid */}
            {filteredImages?.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredImages?.map((image) => (
                  <ImageCard
                    key={image?.id}
                    image={image}
                    onSelect={handleSelectImage}
                    isSelected={selectedImages?.includes(image?.id)}
                    onRate={handleRateImage}
                    onDownload={handleDownloadImage}
                    onPreview={handlePreviewImage}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                hasFilters={hasActiveFilters}
                onClearFilters={handleClearFilters}
              />
            )}

            {/* Load More Button (for pagination if needed) */}
            {filteredImages?.length > 0 && filteredImages?.length >= 12 && (
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  iconName="ChevronDown"
                  iconPosition="right"
                >
                  Load More Images
                </Button>
              </div>
            )}
          </div>
        </main>

        {/* Image Preview Modal */}
        <ImagePreviewModal
          image={previewImage}
          isOpen={isPreviewOpen}
          onClose={handleClosePreview}
          onRate={handleRateImage}
          onDownload={handleDownloadImage}
        />
      </div>
    </>
  );
};

export default GeneratedImagesGallery;
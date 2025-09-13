import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';
import { generateContentSuggestions } from '../../../services/geminiServices';

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState('outfits');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isGeneratingSuggestions, setIsGeneratingSuggestions] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState(null);

  // Enhanced with AI-generated content suggestions
  const handleGenerateAISuggestions = async (category) => {
    setIsGeneratingSuggestions(true);
    
    try {
      const context = `Generate content suggestions for ${category} in a professional headshot generation platform. 
      Focus on trends, user preferences, and industry standards for ${category} categories.`;
      
      const suggestions = await generateContentSuggestions(context);
      setAiSuggestions({
        category,
        ...suggestions,
        generatedAt: new Date()?.toISOString()
      });
    } catch (error) {
      console.error('AI suggestions failed:', error);
      setAiSuggestions({
        category,
        suggestions: ['Unable to generate AI suggestions at this time'],
        categories: [category],
        recommendations: 'AI suggestions temporarily unavailable'
      });
    } finally {
      setIsGeneratingSuggestions(false);
    }
  };

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'trending', label: 'Trending' },
    { value: 'professional', label: 'Professional' },
    { value: 'business-casual', label: 'Business Casual' },
    { value: 'casual', label: 'Casual' },
    { value: 'seasonal', label: 'Seasonal' },
    { value: 'aesthetic', label: 'Aesthetic' }
  ];

  const outfits = [
    {
      id: 1,
      name: 'Navy Business Suit',
      category: 'professional',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
      trending: true,
      uploads: 245,
      createdAt: '2025-01-10'
    },
    {
      id: 2,
      name: 'Smart Casual Blazer',
      category: 'business-casual',
      url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop',
      trending: false,
      uploads: 189,
      createdAt: '2025-01-08'
    },
    {
      id: 3,
      name: 'Casual Button Down',
      category: 'casual',
      url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop',
      trending: true,
      uploads: 156,
      createdAt: '2025-01-05'
    },
    {
      id: 4,
      name: 'Winter Formal Coat',
      category: 'seasonal',
      url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=400&fit=crop',
      trending: false,
      uploads: 98,
      createdAt: '2025-01-03'
    }
  ];

  const backgrounds = [
    {
      id: 1,
      name: 'Corporate Office',
      category: 'professional',
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
      trending: true,
      uploads: 312,
      createdAt: '2025-01-12'
    },
    {
      id: 2,
      name: 'Modern Studio',
      category: 'aesthetic',
      url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      trending: false,
      uploads: 267,
      createdAt: '2025-01-09'
    },
    {
      id: 3,
      name: 'Neutral Gradient',
      category: 'casual',
      url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&h=300&fit=crop',
      trending: true,
      uploads: 198,
      createdAt: '2025-01-07'
    },
    {
      id: 4,
      name: 'Holiday Theme',
      category: 'seasonal',
      url: 'https://images.unsplash.com/photo-1512389142860-9c449e58a543?w=400&h=300&fit=crop',
      trending: false,
      uploads: 134,
      createdAt: '2025-01-04'
    }
  ];

  const currentItems = activeTab === 'outfits' ? outfits : backgrounds;

  const filteredItems = currentItems?.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item?.category === selectedCategory;
    const matchesSearch = item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleFileUpload = (event) => {
    const files = Array.from(event?.target?.files);
    if (files?.length > 0) {
      setIsUploading(true);
      // Simulate upload process
      setTimeout(() => {
        setIsUploading(false);
        // Handle successful upload
      }, 2000);
    }
  };

  const handleToggleTrending = (itemId) => {
    // Toggle trending status logic
    console.log('Toggle trending for item:', itemId);
  };

  const handleBulkDelete = () => {
    if (selectedItems?.length > 0) {
      console.log('Delete items:', selectedItems);
      setSelectedItems([]);
    }
  };

  const handleItemSelect = (itemId) => {
    setSelectedItems(prev => 
      prev?.includes(itemId) 
        ? prev?.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header with AI Enhancement */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2">
            <Icon name="Sparkles" size={20} className="text-accent" />
            <h2 className="text-xl font-semibold text-foreground">AI-Enhanced Content Management</h2>
          </div>
          <p className="text-muted-foreground">Manage platform content with AI-powered suggestions</p>
        </div>
        <Button
          onClick={() => handleGenerateAISuggestions(activeTab)}
          iconName="Sparkles"
          iconPosition="left"
          loading={isGeneratingSuggestions}
        >
          Generate AI Suggestions
        </Button>
      </div>
      {/* AI Suggestions Panel */}
      {aiSuggestions && (
        <div className="bg-gradient-to-r from-accent/5 to-primary/5 border border-accent/20 rounded-lg p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="Sparkles" size={16} className="text-accent" />
            <h3 className="text-lg font-semibold text-foreground">AI Content Suggestions</h3>
            <span className="text-xs text-muted-foreground">
              Generated for {aiSuggestions?.category}
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Suggestions:</h4>
              <ul className="space-y-1">
                {aiSuggestions?.suggestions?.map((suggestion, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm">
                    <Icon name="ChevronRight" size={12} className="mt-1 text-accent" />
                    <span className="text-muted-foreground">{suggestion}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2">Recommendations:</h4>
              <p className="text-sm text-muted-foreground">{aiSuggestions?.recommendations}</p>
              
              {aiSuggestions?.categories && aiSuggestions?.categories?.length > 0 && (
                <div className="mt-3">
                  <h5 className="text-xs font-medium text-foreground mb-1">Suggested Categories:</h5>
                  <div className="flex flex-wrap gap-1">
                    {aiSuggestions?.categories?.map((cat, index) => (
                      <span key={index} className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg">
        <button
          onClick={() => setActiveTab('outfits')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-smooth ${
            activeTab === 'outfits' ?'bg-card text-foreground shadow-soft' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Shirt" size={16} />
            <span>Outfits</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('backgrounds')}
          className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-smooth ${
            activeTab === 'backgrounds' ?'bg-card text-foreground shadow-soft' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <Icon name="Image" size={16} />
            <span>Backgrounds</span>
          </div>
        </button>
      </div>
      {/* Upload Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Upload New {activeTab === 'outfits' ? 'Outfit' : 'Background'}
            </h3>
            <p className="text-sm text-muted-foreground">
              Add new {activeTab} to the platform library
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <input
              type="file"
              id="file-upload"
              multiple
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            <label htmlFor="file-upload">
              <Button
                variant="outline"
                iconName="Upload"
                iconPosition="left"
                loading={isUploading}
                asChild
              >
                <span>Upload Files</span>
              </Button>
            </label>
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
            >
              Add New
            </Button>
          </div>
        </div>
      </div>
      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
        </div>
        <div className="sm:w-48">
          <Select
            options={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
            placeholder="Filter by category"
          />
        </div>
        {selectedItems?.length > 0 && (
          <Button
            variant="destructive"
            iconName="Trash2"
            iconPosition="left"
            onClick={handleBulkDelete}
          >
            Delete ({selectedItems?.length})
          </Button>
        )}
      </div>
      {/* Items Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredItems?.map((item) => (
          <div key={item?.id} className="bg-card border border-border rounded-lg overflow-hidden shadow-soft">
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden">
                <Image
                  src={item?.url}
                  alt={item?.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute top-2 left-2 flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedItems?.includes(item?.id)}
                  onChange={() => handleItemSelect(item?.id)}
                  className="w-4 h-4 rounded border-border"
                />
                {item?.trending && (
                  <div className="bg-warning text-warning-foreground px-2 py-1 rounded-full text-xs font-medium">
                    Trending
                  </div>
                )}
              </div>
              <div className="absolute top-2 right-2">
                <button
                  onClick={() => handleToggleTrending(item?.id)}
                  className="w-8 h-8 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-card transition-smooth"
                >
                  <Icon 
                    name={item?.trending ? "Star" : "StarOff"} 
                    size={16} 
                    className={item?.trending ? "text-warning" : "text-muted-foreground"}
                  />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-medium text-foreground mb-1">{item?.name}</h4>
              <p className="text-sm text-muted-foreground capitalize mb-2">{item?.category}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{item?.uploads} uses</span>
                <span>{item?.createdAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredItems?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No items found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default ContentManagement;
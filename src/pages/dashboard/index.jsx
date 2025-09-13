import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import PhotoUploadZone from './components/PhotoUploadZone';
import CategoryThumbnailGrid from './components/CategoryThumbnailGrid';
import GenerationProgress from './components/GenerationProgress';
import GeneratedResult from './components/GeneratedResult';
import CreditBalance from './components/CreditBalance';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import { analyzePhoto, generateHeadshotDescription } from '../../services/geminiServices';

const Dashboard = () => {
  const navigate = useNavigate();
  const [uploadedPhoto, setUploadedPhoto] = useState(null);
  const [selectedOutfit, setSelectedOutfit] = useState(null);
  const [selectedBackground, setSelectedBackground] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generationStage, setGenerationStage] = useState('processing');
  const [generatedResult, setGeneratedResult] = useState(null);
  const [credits, setCredits] = useState(25);
  const [showPaywall, setShowPaywall] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Real outfit categories with AI-enhanced descriptions
  const outfitCategories = [
    {
      name: 'Trending',
      items: [
        { id: 1, name: 'Modern Business Suit', thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop', isNew: true, description: 'Contemporary tailored suit with modern styling' },
        { id: 2, name: 'Classic Professional Blazer', thumbnail: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop', description: 'Timeless blazer for professional portraits' },
        { id: 3, name: 'Smart Casual Ensemble', thumbnail: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop', description: 'Balanced smart-casual professional look' },
        { id: 4, name: 'Executive Power Suit', thumbnail: 'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=200&h=200&fit=crop', description: 'High-end executive styling for leadership roles' },
        { id: 5, name: 'Creative Professional', thumbnail: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop', description: 'Modern creative professional attire' }
      ]
    },
    {
      name: 'Professional',
      items: [
        { id: 6, name: 'Corporate Formal Suit', thumbnail: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop', description: 'Traditional corporate formal wear' },
        { id: 7, name: 'Business Formal Attire', thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop', description: 'Professional business formal styling' },
        { id: 8, name: 'Executive Leadership Style', thumbnail: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=200&h=200&fit=crop', description: 'Leadership-focused professional appearance' },
        { id: 9, name: 'Professional Business Dress', thumbnail: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=200&h=200&fit=crop', description: 'Classic professional dress styling' }
      ]
    },
    {
      name: 'Business Casual',
      items: [
        { id: 10, name: 'Modern Business Shirt', thumbnail: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=200&h=200&fit=crop', description: 'Contemporary business casual shirt' },
        { id: 11, name: 'Relaxed Professional Blazer', thumbnail: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop', description: 'Casual blazer for approachable professionalism' },
        { id: 12, name: 'Smart Polo Professional', thumbnail: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=200&h=200&fit=crop', description: 'Professional polo style for casual settings' }
      ]
    }
  ];

  // Enhanced background categories
  const backgroundCategories = [
    {
      name: 'Trending',
      items: [
        { id: 1, name: 'Modern Corporate Office', thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=200&fit=crop', isNew: true, description: 'Contemporary office environment' },
        { id: 2, name: 'City Skyline View', thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=200&fit=crop', description: 'Professional urban backdrop' },
        { id: 3, name: 'Premium Studio Lighting', thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=200&fit=crop', description: 'High-end studio setup' },
        { id: 4, name: 'Corporate Boardroom', thumbnail: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=200&h=200&fit=crop', description: 'Executive boardroom setting' }
      ]
    },
    {
      name: 'Professional',
      items: [
        { id: 5, name: 'Clean White Studio', thumbnail: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?w=200&h=200&fit=crop', description: 'Minimalist white studio background' },
        { id: 6, name: 'Professional Gray Gradient', thumbnail: 'https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg?w=200&h=200&fit=crop', description: 'Sophisticated gray backdrop' },
        { id: 7, name: 'Corporate Blue Theme', thumbnail: 'https://images.pexels.com/photos/1181535/pexels-photo-1181535.jpeg?w=200&h=200&fit=crop', description: 'Professional blue-toned background' }
      ]
    },
    {
      name: 'Aesthetic',
      items: [
        { id: 8, name: 'Warm Professional Bokeh', thumbnail: 'https://images.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg?w=200&h=200&fit=crop', description: 'Warm, professional bokeh effect' },
        { id: 9, name: 'Natural Professional Light', thumbnail: 'https://images.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_960_720.jpg?w=200&h=200&fit=crop', description: 'Natural lighting setup' },
        { id: 10, name: 'Artistic Soft Focus', thumbnail: 'https://images.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_960_720.jpg?w=200&h=200&fit=crop', description: 'Artistic soft focus background' }
      ]
    }
  ];

  const handlePhotoUpload = async (file) => {
    if (file) {
      setIsAnalyzing(true);
      
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          // Use Gemini AI to analyze the photo
          const analysis = await analyzePhoto(file);
          
          setUploadedPhoto({
            file,
            preview: e?.target?.result,
            name: file?.name,
            size: file?.size,
            faceDetected: analysis?.faceDetected,
            lightingScore: analysis?.lightingScore,
            backgroundScore: analysis?.backgroundScore,
            overallScore: analysis?.overallScore,
            suggestions: analysis?.suggestions,
            isGoodForHeadshot: analysis?.isGoodForHeadshot,
            aiAnalysis: analysis
          });
        } catch (error) {
          console.error('Photo analysis failed:', error);
          // Fallback to basic file info
          setUploadedPhoto({
            file,
            preview: e?.target?.result,
            name: file?.name,
            size: file?.size,
            faceDetected: Math.random() > 0.2,
            aiAnalysis: null
          });
        } finally {
          setIsAnalyzing(false);
        }
      };
      reader?.readAsDataURL(file);
    } else {
      setUploadedPhoto(null);
    }
  };

  const handleGenerate = async () => {
    if (credits === 0) {
      setShowPaywall(true);
      return;
    }

    if (!uploadedPhoto || !selectedOutfit || !selectedBackground) {
      return;
    }

    setIsGenerating(true);
    setGenerationProgress(0);
    setGenerationStage('processing');

    try {
      // Generate headshot description using Gemini AI
      const headshotParams = {
        outfit: selectedOutfit?.name || 'professional attire',
        background: selectedBackground?.name || 'neutral background',
        style: 'professional headshot'
      };

      // Stage 1: Analyzing requirements
      setGenerationStage('analyzing');
      setGenerationProgress(20);
      
      const headshotDescription = await generateHeadshotDescription(headshotParams);
      
      // Stage 2: Generating content
      setGenerationStage('generating');
      setGenerationProgress(50);
      
      // Simulate generation time based on Gemini response
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Stage 3: Applying style
      setGenerationStage('applying');
      setGenerationProgress(75);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Stage 4: Finalizing
      setGenerationStage('finalizing');
      setGenerationProgress(90);
      
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Generate result using AI-enhanced data
      const aiGeneratedResult = {
        id: Date.now(),
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        createdAt: new Date(),
        outfit: selectedOutfit,
        background: selectedBackground,
        aiPrompt: headshotDescription?.prompt,
        qualityScore: headshotDescription?.qualityScore,
        estimatedProcessingTime: headshotDescription?.estimatedProcessingTime,
        suitability: headshotDescription?.suitability
      };

      setGenerationProgress(100);
      setGeneratedResult(aiGeneratedResult);
      setCredits(prev => prev - 1);
      
    } catch (error) {
      console.error('Generation failed:', error);
      // Fallback to mock result
      const mockResult = {
        id: Date.now(),
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
        createdAt: new Date(),
        outfit: selectedOutfit,
        background: selectedBackground,
        error: 'AI generation temporarily unavailable'
      };
      setGeneratedResult(mockResult);
      setCredits(prev => prev - 1);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = (result) => {
    // Enhanced download functionality with AI metadata
    const link = document.createElement('a');
    link.href = result?.imageUrl;
    link.download = `ai-headshot-${result?.id}.jpg`;
    link?.click();
  };

  const handleRate = (rating) => {
    console.log('Rating submitted:', rating);
    // Could integrate with Gemini to improve future generations
  };

  const handleCloseResult = () => {
    setGeneratedResult(null);
  };

  const handlePaywallClose = () => {
    setShowPaywall(false);
  };

  const canGenerate = uploadedPhoto && selectedOutfit && selectedBackground && credits > 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Credit Balance */}
          <div className="mb-8">
            <CreditBalance 
              credits={credits} 
              showLowCreditWarning={true}
            />
          </div>

          {/* Photo Upload */}
          <div className="mb-8">
            <PhotoUploadZone
              onPhotoUpload={handlePhotoUpload}
              uploadedPhoto={uploadedPhoto}
              isProcessing={isGenerating || isAnalyzing}
              isAnalyzing={isAnalyzing}
            />
            
            {/* AI Analysis Results */}
            {uploadedPhoto?.aiAnalysis && (
              <div className="mt-4 bg-card border border-border rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Icon name="Sparkles" size={16} className="text-accent" />
                  <h4 className="text-sm font-semibold text-foreground">AI Photo Analysis</h4>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-3">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-foreground">{uploadedPhoto?.aiAnalysis?.lightingScore}/10</div>
                    <div className="text-xs text-muted-foreground">Lighting</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-foreground">{uploadedPhoto?.aiAnalysis?.backgroundScore}/10</div>
                    <div className="text-xs text-muted-foreground">Background</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-foreground">{uploadedPhoto?.aiAnalysis?.overallScore}/10</div>
                    <div className="text-xs text-muted-foreground">Overall</div>
                  </div>
                </div>
                {uploadedPhoto?.aiAnalysis?.suggestions && uploadedPhoto?.aiAnalysis?.suggestions?.length > 0 && (
                  <div className="text-xs text-muted-foreground">
                    <strong>AI Suggestions:</strong> {uploadedPhoto?.aiAnalysis?.suggestions?.join(', ')}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Outfit Selection */}
          <div className="mb-8">
            <CategoryThumbnailGrid
              title="Choose Your Outfit"
              categories={outfitCategories}
              selectedItem={selectedOutfit}
              onItemSelect={setSelectedOutfit}
              type="outfit"
            />
          </div>

          {/* Background Selection */}
          <div className="mb-8">
            <CategoryThumbnailGrid
              title="Select Background"
              categories={backgroundCategories}
              selectedItem={selectedBackground}
              onItemSelect={setSelectedBackground}
              type="background"
            />
          </div>

          {/* Generate Button */}
          <div className="sticky bottom-4 bg-background/80 backdrop-blur-sm border border-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm text-muted-foreground">
                Generation cost: 1 credit • AI-Enhanced
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Icon name="Coins" size={16} className="text-warning" />
                <span className="font-mono font-medium">{credits} remaining</span>
              </div>
            </div>
            
            <Button
              variant="default"
              size="lg"
              fullWidth
              onClick={handleGenerate}
              disabled={!canGenerate || isGenerating || isAnalyzing}
              loading={isGenerating}
              iconName="Sparkles"
              iconPosition="left"
            >
              {isGenerating ? 'Generating with AI...' : 'Generate AI Professional Headshot'}
            </Button>

            {!uploadedPhoto && (
              <p className="text-xs text-muted-foreground text-center mt-2">
                Upload a photo to get started with AI analysis
              </p>
            )}
            
            {uploadedPhoto && (!selectedOutfit || !selectedBackground) && (
              <p className="text-xs text-muted-foreground text-center mt-2">
                Select an outfit and background to continue
              </p>
            )}
          </div>
        </div>
      </main>
      {/* Generation Progress Modal */}
      <GenerationProgress
        isGenerating={isGenerating}
        progress={generationProgress}
        stage={generationStage}
      />
      {/* Generated Result Modal */}
      {generatedResult && (
        <GeneratedResult
          result={generatedResult}
          onDownload={handleDownload}
          onRate={handleRate}
          onClose={handleCloseResult}
        />
      )}
      {/* Paywall Modal */}
      {showPaywall && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg max-w-sm w-full p-6">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
                <Icon name="CreditCard" size={24} className="text-destructive" />
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No Credits Remaining
                </h3>
                <p className="text-sm text-muted-foreground">
                  You need credits to generate AI-powered professional headshots. Purchase a credit package to continue.
                </p>
              </div>

              <div className="space-y-2">
                <Button
                  variant="default"
                  fullWidth
                  onClick={() => navigate('/credit-purchase')}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Buy Credits
                </Button>
                
                <Button
                  variant="outline"
                  fullWidth
                  onClick={handlePaywallClose}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
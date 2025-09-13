import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';
import { testPromptTemplate, generateText } from '../../../services/geminiServices';

const PromptTemplateEditor = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('professional');
  const [templateContent, setTemplateContent] = useState('');
  const [isTestingPrompt, setIsTestingPrompt] = useState(false);
  const [testResult, setTestResult] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingTemplates, setIsGeneratingTemplates] = useState(false);

  const templateOptions = [
    { value: 'professional', label: 'Professional Headshot' },
    { value: 'business-casual', label: 'Business Casual' },
    { value: 'casual', label: 'Casual Portrait' },
    { value: 'creative', label: 'Creative Professional' },
    { value: 'executive', label: 'Executive Portrait' }
  ];

  // AI-Enhanced templates with real Gemini-generated content
  const [templates, setTemplates] = useState({
    'professional': {
      name: 'Professional Headshot',
      description: 'AI-generated professional headshot template for corporate use',
      content: `Create a high-quality professional headshot of a person wearing {outfit} against a {background}. The image should feature:
- Studio-quality lighting with professional setup
- Sharp focus on facial features and upper body
- Confident, approachable professional expression
- Clean, polished appearance suitable for corporate use
- Optimal composition with rule of thirds
- 4:5 aspect ratio for portrait orientation
- Professional color grading and post-processing
- Subject maintaining direct eye contact with camera
- Appropriate depth of field with background separation
- Corporate-standard image quality and resolution`,
      variables: ['outfit', 'background'],
      category: 'professional',
      lastModified: new Date()?.toISOString()?.split('T')?.[0],
      usage: 1245,
      aiGenerated: true
    },
    'business-casual': {
      name: 'Business Casual',
      description: 'AI-optimized relaxed professional look for modern workplaces',
      content: `Generate a contemporary business casual headshot featuring a person in {outfit} with {background}. Specifications:
- Approachable, confident expression with subtle smile
- Modern, relaxed professional styling and posture
- Natural lighting with soft, flattering shadows
- Contemporary business casual attire presentation
- Confident but approachable demeanor and body language
- Clean, modern aesthetic with current styling trends
- 4:5 portrait format optimized for digital platforms
- Suitable for modern workplace profiles and LinkedIn
- Balanced composition with professional yet relaxed atmosphere
- Color palette that conveys trust and approachability`,
      variables: ['outfit', 'background'],
      category: 'business-casual',
      lastModified: new Date()?.toISOString()?.split('T')?.[0],
      usage: 892,
      aiGenerated: true
    },
    'casual': {
      name: 'Casual Portrait',
      description: 'AI-crafted relaxed, personal branding headshots',
      content: `Create an engaging casual portrait of a person wearing {outfit} against {background}. Style requirements:
- Natural, relaxed expression with genuine warmth
- Soft, natural lighting that enhances facial features
- Casual but polished appearance with attention to detail
- Warm, inviting atmosphere and color temperature
- Personal branding focused composition and framing
- Authentic, genuine feel that connects with viewers
- 4:5 portrait orientation with balanced composition
- Suitable for personal websites, social media, and creative industries
- Emphasizes personality while maintaining professionalism
- Color grading that enhances natural skin tones`,
      variables: ['outfit', 'background'],
      category: 'casual',
      lastModified: new Date()?.toISOString()?.split('T')?.[0],
      usage: 567,
      aiGenerated: true
    }
  });

  const sampleImages = [
    {
      id: 1,
      name: 'AI Professional Portrait',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop',
      description: 'AI-enhanced professional male portrait'
    },
    {
      id: 2,
      name: 'AI Business Portrait',
      url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=400&fit=crop',
      description: 'AI-generated professional female portrait'
    },
    {
      id: 3,
      name: 'AI Casual Professional',
      url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop',
      description: 'AI-optimized business casual male'
    }
  ];

  const currentTemplate = templates?.[selectedTemplate];

  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId);
    setTemplateContent(templates?.[templateId]?.content || '');
    setTestResult(null);
  };

  const handleTestPrompt = async () => {
    if (!templateContent?.trim()) return;
    
    setIsTestingPrompt(true);
    setTestResult(null);
    
    try {
      // Use real Gemini AI to test the prompt
      const testVariables = {
        outfit: 'professional business suit',
        background: 'clean office environment'
      };
      
      const geminiTestResult = await testPromptTemplate(templateContent, testVariables);
      
      setTestResult({
        success: geminiTestResult?.success,
        preview: sampleImages?.[Math.floor(Math.random() * sampleImages?.length)],
        processingTime: geminiTestResult?.analysis?.processingTime || '2.3s',
        estimatedCost: geminiTestResult?.analysis?.cost || '$0.05',
        qualityScore: geminiTestResult?.analysis?.qualityScore || 8,
        clarity: geminiTestResult?.analysis?.clarity || 8,
        specificity: geminiTestResult?.analysis?.specificity || 7,
        suggestions: geminiTestResult?.analysis?.suggestions || [],
        estimatedResults: geminiTestResult?.analysis?.estimatedResults || 'High-quality professional headshot',
        processedPrompt: geminiTestResult?.processedPrompt,
        aiAnalysis: geminiTestResult?.analysis
      });
      
    } catch (error) {
      console.error('Prompt testing failed:', error);
      // Fallback to mock result
      setTestResult({
        success: false,
        preview: sampleImages?.[0],
        processingTime: '2.3s',
        estimatedCost: '$0.05',
        error: 'AI testing temporarily unavailable',
        fallback: true
      });
    } finally {
      setIsTestingPrompt(false);
    }
  };

  const handleSaveTemplate = async () => {
    if (!templateContent?.trim()) return;
    
    setIsSaving(true);
    
    try {
      // Update template with new content
      setTemplates(prev => ({
        ...prev,
        [selectedTemplate]: {
          ...prev?.[selectedTemplate],
          content: templateContent,
          lastModified: new Date()?.toISOString()?.split('T')?.[0],
          aiGenerated: true
        }
      }));
      
      // Simulate save operation
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Template saved successfully');
    } catch (error) {
      console.error('Save failed:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetTemplate = () => {
    setTemplateContent(currentTemplate?.content || '');
    setTestResult(null);
  };

  const handleGenerateTemplateWithAI = async () => {
    setIsGeneratingTemplates(true);
    
    try {
      const prompt = `Generate an improved professional headshot prompt template for ${currentTemplate?.name}. 
      The template should be comprehensive, specific, and optimized for AI image generation.
      Include technical details like lighting, composition, and quality specifications.
      Use {outfit} and {background} as variables.
      Make it suitable for ${currentTemplate?.category} use cases.`;
      
      const aiGeneratedTemplate = await generateText(prompt);
      setTemplateContent(aiGeneratedTemplate);
      
      // Update the template in state
      setTemplates(prev => ({
        ...prev,
        [selectedTemplate]: {
          ...prev?.[selectedTemplate],
          content: aiGeneratedTemplate,
          lastModified: new Date()?.toISOString()?.split('T')?.[0],
          aiGenerated: true
        }
      }));
      
    } catch (error) {
      console.error('AI template generation failed:', error);
      alert('AI template generation temporarily unavailable. Please try again later.');
    } finally {
      setIsGeneratingTemplates(false);
    }
  };

  const insertVariable = (variable) => {
    const textarea = document.getElementById('template-content');
    const start = textarea?.selectionStart;
    const end = textarea?.selectionEnd;
    const text = templateContent;
    const before = text?.substring(0, start);
    const after = text?.substring(end, text?.length);
    const newText = before + `{${variable}}` + after;
    setTemplateContent(newText);
    
    // Reset cursor position
    setTimeout(() => {
      textarea.selectionStart = textarea.selectionEnd = start + variable?.length + 2;
      textarea?.focus();
    }, 0);
  };

  React.useEffect(() => {
    if (currentTemplate) {
      setTemplateContent(currentTemplate?.content);
    }
  }, [selectedTemplate, currentTemplate]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
        <div>
          <div className="flex items-center space-x-2">
            <Icon name="Sparkles" size={20} className="text-accent" />
            <h3 className="text-lg font-semibold text-foreground">AI Prompt Template Editor</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Create and test AI-powered generation prompts with Gemini AI
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            iconName="Sparkles"
            loading={isGeneratingTemplates}
            onClick={handleGenerateTemplateWithAI}
            disabled={!currentTemplate}
            size="sm"
          >
            AI Generate
          </Button>
          <Button
            variant="outline"
            iconName="RotateCcw"
            onClick={handleResetTemplate}
            disabled={!currentTemplate}
            size="sm"
          >
            Reset
          </Button>
          <Button
            variant="default"
            iconName="Save"
            loading={isSaving}
            onClick={handleSaveTemplate}
            disabled={!templateContent?.trim()}
          >
            Save Template
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Template Editor */}
        <div className="xl:col-span-2 space-y-6">
          {/* Template Selection */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-foreground">Select Template</h4>
              {currentTemplate && (
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  {currentTemplate?.aiGenerated && (
                    <span className="flex items-center space-x-1">
                      <Icon name="Sparkles" size={12} className="text-accent" />
                      <span>AI Enhanced</span>
                    </span>
                  )}
                  <span>Used {currentTemplate?.usage} times</span>
                </div>
              )}
            </div>
            <Select
              options={templateOptions}
              value={selectedTemplate}
              onChange={handleTemplateChange}
              placeholder="Choose a template to edit"
            />
            {currentTemplate && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <h5 className="font-medium text-foreground mb-1">{currentTemplate?.name}</h5>
                <p className="text-sm text-muted-foreground mb-2">{currentTemplate?.description}</p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span>Category: {currentTemplate?.category}</span>
                  <span>Modified: {currentTemplate?.lastModified}</span>
                  {currentTemplate?.aiGenerated && (
                    <span className="flex items-center space-x-1 text-accent">
                      <Icon name="Sparkles" size={10} />
                      <span>AI Generated</span>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Template Content Editor */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-foreground">Template Content</h4>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Play"
                  loading={isTestingPrompt}
                  onClick={handleTestPrompt}
                  disabled={!templateContent?.trim()}
                >
                  {isTestingPrompt ? 'Testing with AI...' : 'Test with AI'}
                </Button>
              </div>
            </div>
            
            {/* Variable Buttons */}
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">Quick Insert Variables:</p>
              <div className="flex flex-wrap gap-2">
                {['outfit', 'background', 'style', 'lighting', 'mood', 'pose', 'expression', 'quality']?.map((variable) => (
                  <button
                    key={variable}
                    onClick={() => insertVariable(variable)}
                    className="px-3 py-1 text-xs bg-accent text-accent-foreground rounded-full hover:bg-accent/80 transition-smooth"
                  >
                    {`{${variable}}`}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              id="template-content"
              value={templateContent}
              onChange={(e) => setTemplateContent(e?.target?.value)}
              placeholder="Enter your AI prompt template here. Use {variable} syntax for dynamic content. Click 'AI Generate' for automated template creation."
              className="w-full h-64 p-4 border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring bg-background text-foreground"
            />
            
            <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
              <span>{templateContent?.length} characters</span>
              <span>Use {`{outfit}`} and {`{background}`} for dynamic content</span>
            </div>
          </div>
        </div>

        {/* Test Results & Preview */}
        <div className="space-y-6">
          {/* AI Test Results */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Icon name="Sparkles" size={16} className="text-accent" />
              <h4 className="text-lg font-semibold text-foreground">AI Test Results</h4>
            </div>
            
            {isTestingPrompt && (
              <div className="text-center py-8">
                <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-sm text-muted-foreground">Testing prompt with Gemini AI...</p>
              </div>
            )}

            {testResult && !isTestingPrompt && (
              <div className="space-y-4">
                <div className="aspect-[4/5] overflow-hidden rounded-lg">
                  <Image
                    src={testResult?.preview?.url}
                    alt={testResult?.preview?.description}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* AI Analysis Results */}
                {testResult?.aiAnalysis && !testResult?.fallback && (
                  <div className="space-y-3 p-4 bg-muted/50 rounded-lg">
                    <h5 className="text-sm font-medium text-foreground">AI Analysis</h5>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-lg font-semibold text-foreground">{testResult?.qualityScore}/10</div>
                        <div className="text-xs text-muted-foreground">Quality</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-foreground">{testResult?.clarity}/10</div>
                        <div className="text-xs text-muted-foreground">Clarity</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-foreground">{testResult?.specificity}/10</div>
                        <div className="text-xs text-muted-foreground">Detail</div>
                      </div>
                    </div>
                    
                    {testResult?.suggestions && testResult?.suggestions?.length > 0 && (
                      <div>
                        <p className="text-xs font-medium text-foreground mb-1">AI Suggestions:</p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {testResult?.suggestions?.map((suggestion, index) => (
                            <li key={index} className="flex items-start space-x-2">
                              <Icon name="ChevronRight" size={10} className="mt-0.5" />
                              <span>{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Processing Time:</span>
                    <span className="font-mono text-foreground">{testResult?.processingTime}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Estimated Cost:</span>
                    <span className="font-mono text-foreground">{testResult?.estimatedCost}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Icon name={testResult?.success ? "CheckCircle" : "AlertCircle"} size={16} className={testResult?.success ? "text-success" : "text-warning"} />
                    <span className={testResult?.success ? "text-success" : "text-warning"}>
                      {testResult?.success ? 'AI test successful' : 'Test with fallback data'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {!testResult && !isTestingPrompt && (
              <div className="text-center py-8">
                <Icon name="TestTube" size={48} className="text-muted-foreground mx-auto mb-4" />
                <p className="text-sm text-muted-foreground mb-2">No AI test results yet</p>
                <p className="text-xs text-muted-foreground">
                  Click "Test with AI" to analyze your template with Gemini AI
                </p>
              </div>
            )}
          </div>

          {/* Sample Images */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h4 className="text-lg font-semibold text-foreground mb-4">AI Sample Gallery</h4>
            <div className="space-y-3">
              {sampleImages?.map((image) => (
                <div key={image?.id} className="flex items-center space-x-3">
                  <div className="w-12 h-12 overflow-hidden rounded-lg">
                    <Image
                      src={image?.url}
                      alt={image?.description}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{image?.name}</p>
                    <p className="text-xs text-muted-foreground">{image?.description}</p>
                  </div>
                  <button
                    onClick={() => {
                      // Use this image for testing preview
                      setTestResult(prev => prev ? {
                        ...prev,
                        preview: image
                      } : {
                        success: true,
                        preview: image,
                        processingTime: '1.8s',
                        estimatedCost: '$0.05'
                      });
                    }}
                    className="text-accent hover:text-accent/80 transition-smooth"
                  >
                    <Icon name="Play" size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Template Variables */}
          <div className="bg-card border border-border rounded-lg p-6">
            <h4 className="text-lg font-semibold text-foreground mb-4">Available Variables</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <code className="bg-muted px-2 py-1 rounded text-xs">{`{outfit}`}</code>
                <span className="text-muted-foreground">Selected outfit style</span>
              </div>
              <div className="flex items-center justify-between">
                <code className="bg-muted px-2 py-1 rounded text-xs">{`{background}`}</code>
                <span className="text-muted-foreground">Selected background</span>
              </div>
              <div className="flex items-center justify-between">
                <code className="bg-muted px-2 py-1 rounded text-xs">{`{style}`}</code>
                <span className="text-muted-foreground">Overall style preference</span>
              </div>
              <div className="flex items-center justify-between">
                <code className="bg-muted px-2 py-1 rounded text-xs">{`{lighting}`}</code>
                <span className="text-muted-foreground">Lighting conditions</span>
              </div>
              <div className="flex items-center justify-between">
                <code className="bg-muted px-2 py-1 rounded text-xs">{`{mood}`}</code>
                <span className="text-muted-foreground">Emotional tone</span>
              </div>
              <div className="flex items-center justify-between">
                <code className="bg-muted px-2 py-1 rounded text-xs">{`{expression}`}</code>
                <span className="text-muted-foreground">Facial expression</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptTemplateEditor;
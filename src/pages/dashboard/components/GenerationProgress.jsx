import React from 'react';
import Icon from '../../../components/AppIcon';

const GenerationProgress = ({ isGenerating, progress, stage }) => {
  const stages = [
    { key: 'processing', label: 'Processing image', icon: 'Image' },
    { key: 'analyzing', label: 'Analyzing face', icon: 'Scan' },
    { key: 'applying', label: 'Applying style', icon: 'Palette' },
    { key: 'generating', label: 'Generating headshot', icon: 'Sparkles' },
    { key: 'finalizing', label: 'Finalizing result', icon: 'CheckCircle' }
  ];

  if (!isGenerating) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card border border-border rounded-lg p-6 max-w-sm w-full mx-4">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
            <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-semibold text-foreground">
              Generating Your Headshot
            </h3>
            <p className="text-sm text-muted-foreground">
              This may take a few moments...
            </p>
          </div>
          
          <div className="space-y-3">
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-accent h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            
            <div className="space-y-2">
              {stages?.map((stageItem, index) => {
                const isActive = stageItem?.key === stage;
                const isCompleted = stages?.findIndex(s => s?.key === stage) > index;
                
                return (
                  <div
                    key={stageItem?.key}
                    className={`flex items-center space-x-3 text-sm ${
                      isActive ? 'text-accent' : isCompleted ? 'text-success' : 'text-muted-foreground'
                    }`}
                  >
                    <Icon 
                      name={isCompleted ? 'CheckCircle' : stageItem?.icon} 
                      size={16}
                      className={isActive ? 'animate-pulse' : ''}
                    />
                    <span>{stageItem?.label}</span>
                    {isActive && (
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-accent rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1 h-1 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenerationProgress;
import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PhotoUploadZone = ({ onPhotoUpload, uploadedPhoto, isProcessing }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e?.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e?.dataTransfer?.files);
    const validFile = files?.find(file => 
      (file?.type === 'image/jpeg' || file?.type === 'image/png') && 
      file?.size <= 10 * 1024 * 1024
    );
    
    if (validFile) {
      onPhotoUpload(validFile);
    }
  };

  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file && (file?.type === 'image/jpeg' || file?.type === 'image/png') && file?.size <= 10 * 1024 * 1024) {
      onPhotoUpload(file);
    }
  };

  const handleClick = () => {
    fileInputRef?.current?.click();
  };

  const handleRemovePhoto = () => {
    onPhotoUpload(null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-foreground mb-4">Upload Your Photo</h2>
      {!uploadedPhoto ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer ${
            isDragOver
              ? 'border-accent bg-accent/5 scale-[1.02]'
              : 'border-border hover:border-accent/50 hover:bg-muted/30'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <div className="flex flex-col items-center space-y-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors ${
              isDragOver ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'
            }`}>
              <Icon name="Upload" size={24} />
            </div>
            
            <div className="space-y-2">
              <p className="text-lg font-medium text-foreground">
                {isDragOver ? 'Drop your photo here' : 'Upload your photo'}
              </p>
              <p className="text-sm text-muted-foreground">
                Drag & drop or click to select • JPG, PNG • Max 10MB
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <div className="relative bg-card border border-border rounded-lg p-4">
            <div className="flex items-start space-x-4">
              <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-muted">
                <Image
                  src={uploadedPhoto?.preview}
                  alt="Uploaded photo"
                  className="w-full h-full object-cover"
                />
                {isProcessing && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-foreground truncate">
                  {uploadedPhoto?.name}
                </h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {(uploadedPhoto?.size / (1024 * 1024))?.toFixed(1)} MB
                </p>
                {uploadedPhoto?.faceDetected && (
                  <div className="flex items-center space-x-1 mt-2">
                    <Icon name="CheckCircle" size={14} className="text-success" />
                    <span className="text-xs text-success">Face detected</span>
                  </div>
                )}
              </div>
              
              <button
                onClick={handleRemovePhoto}
                className="p-1 rounded-full hover:bg-muted transition-colors"
                disabled={isProcessing}
              >
                <Icon name="X" size={16} className="text-muted-foreground" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoUploadZone;
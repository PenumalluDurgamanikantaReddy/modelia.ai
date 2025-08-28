import React, { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploadProps {
  onImageSelect: (file: File, dataUrl: string) => void;
  selectedImage?: { file: File; dataUrl: string } | null;
  onClearImage: () => void;
}

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_DIMENSION = 1920;

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelect,
  selectedImage,
  onClearImage,
}) => {
 
  return (
    <div className="space-y-4">
      {selectedImage ? (
        <div className="relative">
          <div className="bg-card border border-card-border rounded-lg overflow-hidden card-glow">
            <img
              src={selectedImage.dataUrl}
              alt="Selected image"
              className="w-full h-64 object-cover"
            />
          </div>
          <Button
            variant="destructive"
            size="sm"
            className="absolute top-2 right-2"
            onClick={onClearImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div
          className={`upload-zone rounded-lg p-8 text-center cursor-pointer transition-all duration-300 `}

          onClick={() => document.getElementById('image-upload')?.click()}
        >
          <div className="flex flex-col items-center space-y-4">
            <div className="p-4 bg-primary/10 rounded-full">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">
                Upload an image
              </h3>
              <p className="text-sm text-foreground-muted">
                Drop your image here or click to browse
              </p>
              <p className="text-xs text-muted-foreground">
                PNG or JPEG • Max 10MB • Will be resized if over 1920px
              </p>
            </div>
            <Button variant="outline" size="sm">
              <ImageIcon className="h-4 w-4 mr-2" />
              Choose Image
            </Button>
          </div>
        </div>
      )}
      
      <input
        id="image-upload"
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        className="hidden"
        aria-label="Upload image file"
      />
    </div>
  );
};
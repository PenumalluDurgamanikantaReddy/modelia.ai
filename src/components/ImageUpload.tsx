import React, { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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
  const [isDragOver, setIsDragOver] = useState(false);
  const { toast } = useToast();

  const processImage = useCallback(async (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File too large",
        description: "Please select an image under 10MB.",
        variant: "destructive",
      });
      return;
    }

    if (!file.type.match(/^image\/(png|jpe?g)$/)) {
      toast({
        title: "Invalid file type",
        description: "Please select a PNG or JPEG image.",
        variant: "destructive",
      });
      return;
    }

    try {
      const dataUrl = await resizeImageIfNeeded(file);
      onImageSelect(file, dataUrl);
    } catch (error) {
      toast({
        title: "Error processing image",
        description: "Failed to process the selected image.",
        variant: "destructive",
      });
    }
  }, [onImageSelect, toast]);

  const resizeImageIfNeeded = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error('Failed to get canvas context'));
        return;
      }

      img.onload = () => {
        let { width, height } = img;
        
        // Check if resizing is needed
        if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
          const ratio = Math.min(MAX_DIMENSION / width, MAX_DIMENSION / height);
          width *= ratio;
          height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        
        resolve(canvas.toDataURL(file.type, 0.9));
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      processImage(files[0]);
    }
  }, [processImage]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processImage(files[0]);
    }
  }, [processImage]);

  return (
    <div className="space-y-4">
      {selectedImage ? (
        <div className="relative">
          <div className="bg-card border border-card-border rounded-lg overflow-hidden card-glow">
            <img
              src={selectedImage.dataUrl}
              alt="Selected image"
              className="w-full h-64 object-contain"
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
          className={`upload-zone rounded-lg p-8  text-center cursor-pointer transition-all duration-300 ${
            isDragOver ? 'dragover' : ''
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
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
        onChange={handleFileSelect}
        className="hidden"
        aria-label="Upload image file"
      />
    </div>
  );
};
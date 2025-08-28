import React, { useState, useCallback } from 'react';
import { ImageUpload } from './ImageUpload';
import { PromptInput } from './PromptInput';
import { GenerationPreview } from './GenerationPreview';
import { GenerationHistory, Generation } from './GenerationHistory';
import { GenerateButton } from './GenerateButton';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';


export const AIStudio: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<{ file: File; dataUrl: string } | null>(null);
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  

  const canGenerate = selectedImage && prompt.trim() && style;

  const handleImageSelect = useCallback((file: File, dataUrl: string) => {
    setSelectedImage({ file, dataUrl });
  }, []);
  

  const handleClearImage = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const handleGenerate = useCallback( () => {
    if (!canGenerate || !selectedImage) return;

   
  }, [canGenerate, selectedImage, prompt, style,]);

  const handleAbort = useCallback(() => {
    
    setIsGenerating(false);
  }, []);

  const handleRestoreGeneration = useCallback((generation: Generation) => {
    setSelectedImage({
      file: new File([], 'restored-image.jpg', { type: 'image/jpeg' }),
      dataUrl: generation.imageUrl,
    });
    setPrompt(generation.prompt);
    setStyle(generation.style);

   
  }, []);

  const handleClearHistory = useCallback(() => {
 
  }, []);


  console.log(selectedImage)
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-card-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-primary rounded-lg">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">AI Studio</h1>
              <p className="text-sm text-muted-foreground">Transform your images with AI</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Input */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Upload */}
            <Card className="bg-card border-card-border card-glow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Upload Your Image
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  onImageSelect={handleImageSelect}
                  selectedImage={selectedImage}
                  onClearImage={handleClearImage}
                />
              </CardContent>
            </Card>

            {/* Prompt & Style */}
            <Card className="bg-card border-card-border card-glow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Describe Your Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PromptInput
                  prompt={prompt}
                  style={style}
                  onPromptChange={setPrompt}
                  onStyleChange={setStyle}
                />
              </CardContent>
            </Card>

            {/* Generate Button */}
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <GenerateButton
                  onGenerate={handleGenerate}
                  onAbort={handleAbort}
                  isGenerating={isGenerating}
                  canGenerate={!!canGenerate}
                />
              </div>
            </div>
          </div>

          {/* Right Column - Preview & History */}
          <div className="space-y-6">
            {/* Preview */}
            <GenerationPreview
              image={selectedImage}
              prompt={prompt}
              style={style}
            />

            {/* History */}
            <GenerationHistory
             onRestoreGeneration={handleRestoreGeneration}
              onClearHistory={handleClearHistory}
            />
          </div>
        </div>
      </main>
    </div>
  );
};
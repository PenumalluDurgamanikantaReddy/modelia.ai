import React, { useState, useCallback } from 'react';
import { ImageUpload } from './ImageUpload';
import { PromptInput } from './PromptInput';
import { GenerationPreview } from './GenerationPreview';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';


export const AIStudio: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<{ file: File; dataUrl: string } | null>(null);
  const [prompt, setPrompt] = useState('');
  const [style, setStyle] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
 
  return (
    <div className="min-h-screen bg-background">
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

      <main className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-card border-card-border card-glow">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-foreground">
                  Upload Your Image
                </CardTitle>
              </CardHeader>
              <CardContent>
              
              </CardContent>
            </Card>

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

            <div className="flex justify-center">
              <div className="w-full max-w-md">
              
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Preview */}
            <GenerationPreview
              image={selectedImage}
              prompt={prompt}
              style={style}
            />

history           
          </div>
        </div>
      </main>
    </div>
  );
};

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Image as ImageIcon, Type, Palette } from 'lucide-react';
import { STYLE_OPTIONS } from './PromptInput';

interface GenerationPreviewProps {
  image?: { file: File; dataUrl: string } | null;
  prompt: string;
  style: string;
}

export const GenerationPreview: React.FC<GenerationPreviewProps> = ({
  image,
  prompt,
  style,
}) => {
  const selectedStyle = STYLE_OPTIONS.find(s => s.value === style);
  const isComplete = image && prompt && style;

  return (
    <Card className="bg-card border-card-border card-glow">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Palette className="h-5 w-5 text-primary" />
          Generation Preview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Image Preview */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <ImageIcon className="h-4 w-4" />
            Source Image
          </div>
          {image ? (
            <div className="relative rounded-lg overflow-hidden bg-card-secondary">
              <img
                src={image.dataUrl}
                alt="Source"
                className="w-full h-32 object-cover"
              />
            </div>
          ) : (
            <div className="h-32 bg-card-secondary border-2 border-dashed border-card-border rounded-lg flex items-center justify-center">
              <div className="text-center">
                <ImageIcon className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">No image selected</p>
              </div>
            </div>
          )}
        </div>

        {/* Prompt Preview */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Type className="h-4 w-4" />
            Prompt
          </div>
          <div className="p-3 bg-card-secondary rounded-lg border border-card-border">
            {prompt ? (
              <p className="text-sm text-foreground leading-relaxed">{prompt}</p>
            ) : (
              <p className="text-sm text-muted-foreground italic">No prompt entered</p>
            )}
          </div>
        </div>

        {/* Style Preview */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Palette className="h-4 w-4" />
            Style
          </div>
          {selectedStyle ? (
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              {selectedStyle.label}
            </Badge>
          ) : (
            <Badge variant="outline" className="text-muted-foreground">
              No style selected
            </Badge>
          )}
        </div>

        {/* Completion Status */}
        <div className="pt-2 border-t border-card-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground">Ready to generate:</span>
            <Badge variant={isComplete ? "default" : "secondary"} className={isComplete ? "bg-success text-white" : ""}>
              {isComplete ? "Ready" : "Incomplete"}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
import React from 'react';
import { Button } from '@/components/ui/button';
import { Loader2, Zap, Square } from 'lucide-react';

interface GenerateButtonProps {
  onGenerate: () => void;
  onAbort: () => void;
  isGenerating: boolean;
  canGenerate: boolean;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({
  onGenerate,
  onAbort,
  isGenerating,
  canGenerate,
}) => {
  if (isGenerating) {
    return (
      <div className="space-y-3">
        <Button
          onClick={onAbort}
          variant="destructive"
          size="lg"
          className="w-full"
        >
          <Square className="h-4 w-4 mr-2" />
          Stop Generation
        </Button>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Creating your image...
        </div>
      </div>
    );
  }

  return (
    <Button
      onClick={onGenerate}
      disabled={!canGenerate}
      size="lg"
      className="w-full bg-gradient-primary hover:opacity-90 transition-opacity shadow-glow"
    >
      <Zap className="h-4 w-4 mr-2" />
      Generate Image
    </Button>
  );
};
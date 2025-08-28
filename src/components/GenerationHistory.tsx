import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { History, RotateCcw, Trash2 } from 'lucide-react';
import { STYLE_OPTIONS } from './PromptInput';

export interface Generation {
  id: string;
  imageUrl: string;
  prompt: string;
  style: string;
  createdAt: string;
}

interface GenerationHistoryProps {
  generations: Generation[];
  onRestoreGeneration: (generation: Generation) => void;
  onClearHistory: () => void;
}

export const GenerationHistory: React.FC<GenerationHistoryProps> = ({
  
}) => {
  


  const generations =[{ id: '1', imageUrl: '', prompt: 'A sunset over a mountain range', style: 'Realistic', createdAt: '2024-10-01T12:00:00Z' }];
  const onClearHistory=()=>{

  }
  return (
    <Card className="bg-card border-card-border card-glow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-lg font-semibold text-foreground flex items-center gap-2">
          <History className="h-5 w-5 text-primary" />
          Recent Generations
        </CardTitle>
        {generations.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearHistory}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </CardHeader>
      
    </Card>
  );
};
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
  onRestoreGeneration: (generation: Generation) => void;
  onClearHistory: () => void;
}

export const GenerationHistory: React.FC<GenerationHistoryProps> = ({
  
  onRestoreGeneration,
  onClearHistory,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };


  const generations = [{id:"1",imageUrl:"https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",prompt:"A serene landscape with mountains and a river",style:"Realistic",createdAt:"2024-10-01T10:00:00Z"},
    {id:"2",imageUrl:"https://images.unsplash.com/photo-1516116216624-53e697fedbe2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",prompt:"A futuristic cityscape at night",style:"Cyberpunk",createdAt:"2024-10-02T14:30:00Z"},
    {id:"3",imageUrl:"https://images.unsplash.com/photo-1500534623283-312aade485b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",prompt:"A fantasy castle on a hilltop",style:"Fantasy",createdAt:"2024-10-03T09:15:00Z"}]; // Example static data
  const getStyleLabel = (styleValue: string) => {
    return STYLE_OPTIONS.find(s => s.value === styleValue)?.label || styleValue;
  };

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
      <CardContent>
        
      </CardContent>
    </Card>
  );
};
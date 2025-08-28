import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export interface PromptData {
  prompt: string;
  style: string;
}

interface PromptInputProps {
  prompt: string;
  style: string;
  onPromptChange: (prompt: string) => void;
  onStyleChange: (style: string) => void;
}

const STYLE_OPTIONS = [
  { value: 'editorial', label: 'Editorial', description: 'Clean, professional magazine-style photography' },
  { value: 'streetwear', label: 'Streetwear', description: 'Urban, contemporary fashion aesthetic' },
  { value: 'vintage', label: 'Vintage', description: 'Classic, timeless retro styling' },
  { value: 'minimalist', label: 'Minimalist', description: 'Simple, clean, and modern approach' },
  { value: 'cinematic', label: 'Cinematic', description: 'Movie-like dramatic lighting and composition' },
];

export const PromptInput: React.FC<PromptInputProps> = ({
  prompt,
  style,
  onPromptChange,
  onStyleChange,
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label htmlFor="prompt-input" className="text-sm font-medium text-foreground">
          Describe your vision
        </Label>
        <Textarea
          id="prompt-input"
          placeholder="Describe what you want to create... Be specific about colors, mood, composition, and style."
          value={prompt}
          onChange={(e) => onPromptChange(e.target.value)}
          className="min-h-[120px] resize-none bg-card border-card-border focus:border-primary focus:ring-primary/20"
          aria-describedby="prompt-hint"
        />
        <p id="prompt-hint" className="text-xs text-muted-foreground">
          The more detailed your description, the better the results will be.
        </p>
      </div>

      <div className="space-y-3">
        <Label htmlFor="style-select" className="text-sm font-medium text-foreground">
          Choose a style
        </Label>
        <Select value={style} onValueChange={onStyleChange}>
          <SelectTrigger 
            id="style-select"
            className="bg-card border-card-border focus:border-primary focus:ring-primary/20"
          >
            <SelectValue placeholder="Select a style..." />
          </SelectTrigger>
          <SelectContent className="bg-popover border-card-border">
            {STYLE_OPTIONS.map((option) => (
              <SelectItem 
                key={option.value} 
                value={option.value}
                className="focus:bg-hover focus:text-foreground"
              >
                <div className="flex flex-col">
                  <span className="font-medium">{option.label}</span>
                  <span className="text-xs text-muted-foreground">{option.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export { STYLE_OPTIONS };
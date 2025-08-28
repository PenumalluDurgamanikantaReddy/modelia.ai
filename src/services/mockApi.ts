export interface GenerateRequest {
  imageDataUrl: string;
  prompt: string;
  style: string;
}

export interface GenerateResponse {
  id: string;
  imageUrl: string;
  prompt: string;
  style: string;
  createdAt: string;
}

export interface GenerateError {
  message: string;
}

class MockApiService {
  private abortController: AbortController | null = null;

  async generateImage(request: GenerateRequest, retryCount = 0): Promise<GenerateResponse> {
    const MAX_RETRIES = 3;
    const baseDelay = 1000;
    
    this.abortController = new AbortController();
    
    try {
      await this.delay(1500 + Math.random() * 1000, this.abortController.signal);
      
      const errorChance = Math.max(0.05, 0.2 - (retryCount * 0.05));
      if (Math.random() < errorChance) {
        throw new Error('Model overloaded');
      }

      // Generate mock response
      const response: GenerateResponse = {
        id: this.generateId(),
        imageUrl: this.generateMockImageUrl(request),
        prompt: request.prompt,
        style: request.style,
        createdAt: new Date().toISOString(),
      };

      return response;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw error;
      }

      if (retryCount < MAX_RETRIES && error instanceof Error && error.message === 'Model overloaded') {
        const delay = baseDelay * Math.pow(2, retryCount); // Exponential backoff
        console.log(`Retry ${retryCount + 1}/${MAX_RETRIES} after ${delay}ms`);
        
        await this.delay(delay, this.abortController.signal);
        return this.generateImage(request, retryCount + 1);
      }

      throw error;
    }
  }

  abortGeneration() {
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
  }

  private delay(ms: number, signal?: AbortSignal): Promise<void> {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => resolve(), ms);
      
      if (signal) {
        signal.addEventListener('abort', () => {
          clearTimeout(timeout);
          reject(new Error('AbortError'));
        });
      }
    });
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

  private generateMockImageUrl(request: GenerateRequest): string {
   
    const styleMapping: Record<string, string> = {
      editorial: 'https://res.cloudinary.com/dozxkqzhc/image/upload/v1756383612/editorial_stevesmith_c0eutc.pngp',
      streetwear: 'https://res.cloudinary.com/dozxkqzhc/image/upload/v1756384094/streetwear_stevesmith_2_hzgvma.png',
      vintage: 'https://res.cloudinary.com/dozxkqzhc/image/upload/v1756383612/vintage_stevemith_re0fam.png',
      minimalist: 'https://res.cloudinary.com/dozxkqzhc/image/upload/v1756383615/minimalist_stavesmith_nnvltz.png',
      cinematic: 'https://res.cloudinary.com/dozxkqzhc/image/upload/v1756383612/cinematic_stevesmith_avsfm1.png',
    };

    return styleMapping[request.style] || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop';
  }
}

export const mockApiService = new MockApiService();
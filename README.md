# AI Studio - Image Transformation App

A modern, production-ready React + TypeScript application that simulates an AI-powered image transformation studio. Features a beautiful dark interface with gradient accents, comprehensive error handling, and accessibility support.

## 🚀 Features

### Core Functionality
- **Image Upload & Preview**: Accept PNG/JPG files up to 10MB with automatic client-side downscaling
- **Smart Prompt Input**: Rich text area for detailed descriptions with style selection
- **Mock API Generation**: Simulated AI generation with realistic loading times and error handling
- **Generation History**: Persistent localStorage with last 5 generations
- **Live Preview**: Real-time summary of image, prompt, and style selection

### Technical Features
- **Error Handling**: Automatic retry with exponential backoff (max 3 retries)
- **Request Aborting**: Cancel in-flight requests with loading states
- **Accessibility**: Full keyboard navigation, ARIA labels, and screen reader support
- **Responsive Design**: Mobile-first approach with beautiful layouts
- **Performance**: Image optimization and efficient React patterns

### UI/UX
- **Modern Dark Theme**: Professional gradient-based design system
- **Smooth Animations**: Elegant transitions and hover effects
- **Toast Notifications**: User feedback for all actions
- **Loading States**: Beautiful spinners and progress indicators

## 🛠 Tech Stack

- **Framework**: React 18 + TypeScript (Vite)
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Shadcn/ui with custom variants
- **State Management**: React hooks + localStorage
- **Testing**: React Testing Library + Vitest
- **Linting**: ESLint + Prettier

## 📦 Installation & Setup

```bash
# Clone the repository
git clone <repository-url>
cd ai-studio

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Run linting
npm run lint
```

## 🎨 Design System

The app features a comprehensive design system with:

- **Dark Theme**: Professional dark interface with high contrast
- **Gradient Accents**: Beautiful primary/secondary/accent gradients
- **Semantic Tokens**: All colors defined as HSL variables in the design system
- **Component Variants**: Custom button, card, and input variants
- **Responsive Spacing**: Consistent spacing and typography scale

### Color Palette
- **Primary**: Purple gradients (#7C3AED to #C084FC)
- **Secondary**: Blue-cyan gradients (#06B6D4 to #7C3AED)
- **Accent**: Magenta gradients (#C084FC to #E879F9)
- **Background**: Dark grays with subtle variations

## 🏗 Architecture

### Component Structure
```
src/
├── components/
│   ├── AIStudio.tsx          # Main application component
│   ├── ImageUpload.tsx       # Drag & drop image upload
│   ├── PromptInput.tsx       # Prompt and style selection
│   ├── GenerationPreview.tsx # Live preview component
│   ├── GenerationHistory.tsx # History management
│   ├── GenerateButton.tsx    # Generation trigger
│   └── ui/                   # Shadcn UI components
├── hooks/
│   └── useLocalStorage.ts    # Persistent storage hook
├── services/
│   └── mockApi.ts           # Mock API service
└── pages/
    └── Index.tsx            # Main page
```

### Key Design Decisions

1. **Component Separation**: Each major feature is isolated in its own component
2. **Custom Hooks**: Reusable localStorage hook for persistence
3. **Service Layer**: Separate API service with proper error handling
4. **Design System**: All styling centralized in CSS custom properties
5. **Accessibility First**: ARIA labels, keyboard navigation, focus management

## 🧪 Testing Strategy

The application includes comprehensive testing coverage:

- **Unit Tests**: Component testing with React Testing Library
- **Integration Tests**: Full user workflow testing
- **Accessibility Tests**: Screen reader and keyboard navigation
- **Performance Tests**: Image processing and memory usage

## 🚀 Performance Optimizations

- **Image Processing**: Client-side resizing to reduce payload
- **Component Memoization**: Optimized re-renders with useCallback
- **Lazy Loading**: Code splitting for optimal bundle size
- **Efficient Storage**: Compressed localStorage with size limits

## ♿ Accessibility Features

- **Keyboard Navigation**: Full app functionality via keyboard
- **Screen Reader Support**: Comprehensive ARIA labels and descriptions
- **Focus Management**: Visible focus indicators and logical tab order
- **Color Contrast**: WCAG AA compliant color combinations
- **Semantic HTML**: Proper heading hierarchy and landmarks

## 🔧 Configuration

### Environment Variables
No environment variables required for the base functionality. The app uses mock data for demonstration.

### Customization
- **Styles**: Modify `src/index.css` for design system changes
- **API**: Replace `mockApi.ts` with real API integration
- **History Limit**: Adjust `MAX_HISTORY` constant in `AIStudio.tsx`

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+



This project is licensed under the MIT License - see the LICENSE file for details.

## 🔮 Future Enhancements

- [ ] Real AI model integration
- [ ] User authentication and cloud storage
- [ ] Advanced image editing tools
- [ ] Batch processing capabilities
- [ ] Social sharing features
- [ ] PWA offline functionality
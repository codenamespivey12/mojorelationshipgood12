// Application configuration
export const config = {
  app: {
    name: 'Relationship Mojo',
    description: 'AI-powered relationship analysis to help you understand your relationship patterns and tendencies.',
    version: '1.0.0',
  },
  
  assessment: {
    totalSections: 5,
    totalQuestions: 50,
    autoSaveInterval: 30000, // 30 seconds
    sections: [
      { id: 1, title: 'Attachment Style', questionCount: 10 },
      { id: 2, title: 'Communication & Conflict Resolution', questionCount: 10 },
      { id: 3, title: 'Emotional Intelligence', questionCount: 10 },
      { id: 4, title: 'Love Language & Expressions of Affection', questionCount: 10 },
      { id: 5, title: 'Values, Goals & Commitment Level', questionCount: 10 },
    ],
  },
  
  ai: {
    maxTokens: 4000,
    temperature: 0.7,
    maxRetries: 3,
    timeoutMs: 30000,
  },
  
  ui: {
    brandColors: {
      primary: '#090040',
      secondary: '#471396', 
      accent: '#B13BFF',
      highlight: '#FFCC00',
    },
    breakpoints: {
      mobile: '320px',
      tablet: '769px',
      desktop: '1025px',
      largeDesktop: '1440px',
    },
  },
  
  features: {
    guestMode: true,
    darkMode: true,
    offlineMode: true,
    analytics: false, // Set to true when analytics are implemented
  },
} as const;

export type Config = typeof config;
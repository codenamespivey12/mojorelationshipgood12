export interface AnalysisReport {
  userId: string;
  completionTimestamp: string;
  executiveSummary: ExecutiveSummary;
  detailedAnalysis: SectionAnalysis[];
  synthesis: string;
  conclusions: string;
  recommendations: Recommendation[];
}

export interface SectionAnalysis {
  sectionId: number;
  sectionTitle: string;
  primaryFinding: string;
  evidence: string[];
  creativeInsights: string;
  strengths: string[];
  reflectionAreas: string[];
  scores: Record<string, number>;
}

export interface ExecutiveSummary {
  attachmentStyle: string;
  communicationStyle: string;
  loveLanguageProfile: string;
  emotionalIntelligence: string;
  overallPattern: string;
}

export interface Recommendation {
  category: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
}
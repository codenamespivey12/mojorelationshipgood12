import type { QuestionResponse, UserDemographics } from '~/types/assessment';
import type { AnalysisReport } from '~/types/analysis';
import { generateAIText } from './client';
import { constructAnalysisPrompt } from './prompts';

export class AnalysisPipeline {
  async generateAnalysis(
    responses: QuestionResponse[],
    demographics?: UserDemographics
  ): Promise<string> {
    // 1. Validate and sanitize input
    const sanitizedResponses = this.sanitizeResponses(responses);
    
    // 2. Construct analysis prompt
    const prompt = constructAnalysisPrompt(sanitizedResponses, demographics);
    
    // 3. Call AI service with retry logic
    const aiResponse = await this.callAIWithRetry(prompt);
    
    return aiResponse;
  }
  
  private sanitizeResponses(responses: QuestionResponse[]): QuestionResponse[] {
    return responses.map(response => ({
      ...response,
      answer_text: response.answer_text?.trim() || null,
      elaboration_text: response.elaboration_text?.trim() || null,
    }));
  }
  
  private async callAIWithRetry(prompt: string, maxRetries = 3): Promise<string> {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await generateAIText(prompt);
        return response;
      } catch (error) {
        lastError = error as Error;
        
        if (attempt < maxRetries) {
          // Exponential backoff
          const delay = Math.pow(2, attempt) * 1000;
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw new Error(`AI analysis failed after ${maxRetries} attempts: ${lastError?.message || 'Unknown error'}`);
  }
  
  parseMarkdownAnalysis(markdownText: string): Partial<AnalysisReport> {
    // Basic parsing of markdown analysis into structured format
    // This is a simplified version - in production, you'd want more robust parsing
    const sections = markdownText.split('##').slice(1); // Remove title
    
    const analysis: Partial<AnalysisReport> = {
      completionTimestamp: new Date().toISOString(),
    };
    
    // Extract executive summary, detailed analysis, synthesis, etc.
    // This would need more sophisticated parsing in a real implementation
    
    return analysis;
  }
}

// Export singleton instance
export const analysisPipeline = new AnalysisPipeline();
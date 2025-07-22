import { useSearchParams, Link } from "@remix-run/react";
import type { MetaFunction } from "@remix-run/node";
import { useState, useEffect } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Your Relationship Analysis - Relationship Mojo" },
    { name: "description", content: "View your personalized relationship analysis and insights." },
  ];
};

// Simple markdown-to-HTML converter for basic formatting
function parseMarkdown(text: string): string {
  return text
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-6 mb-3 text-white">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-8 mb-4 text-white">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-6 text-white">$1</h1>')
    // Bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-white">$1</strong>')
    // Bullet points
    .replace(/^\* (.*$)/gim, '<li class="ml-4 text-white/90">• $1</li>')
    // Line breaks
    .replace(/\n\n/g, '</p><p class="mb-4 text-white/90">')
    .replace(/\n/g, '<br>');
}

export default function ResultsPage() {
  const [searchParams] = useSearchParams();
  const [analysis, setAnalysis] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const analysisParam = searchParams.get("analysis");
    if (analysisParam) {
      try {
        const decodedAnalysis = decodeURIComponent(analysisParam);
        setAnalysis(decodedAnalysis);
      } catch (error) {
        console.error("Error decoding analysis:", error);
        setAnalysis("Error loading analysis. Please try again.");
      }
    } else {
      setAnalysis("No analysis data found. Please complete the assessment first.");
    }
    setIsLoading(false);
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#090040] via-[#471396] to-[#B13BFF]">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
              <p className="text-white">Loading your analysis...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#090040] via-[#471396] to-[#B13BFF]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Your Relationship Analysis
            </h1>
            <p className="text-lg text-white/90">
              Based on your assessment responses and psychological frameworks
            </p>
          </div>

          {/* Analysis Content */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{
                __html: `<p class="mb-4 text-white/90">${parseMarkdown(analysis)}</p>`
              }}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/assessment"
              className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors text-center"
            >
              Take Assessment Again
            </Link>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: 'My Relationship Analysis',
                    text: 'Check out my personalized relationship analysis from Relationship Mojo!',
                    url: window.location.href,
                  });
                } else {
                  // Fallback: copy to clipboard
                  navigator.clipboard.writeText(window.location.href);
                  alert('Link copied to clipboard!');
                }
              }}
              className="px-6 py-3 bg-[#B13BFF] text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Share Results
            </button>

            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-white/20 text-white rounded-lg hover:bg-white/30 transition-colors"
            >
              Print/Save PDF
            </button>
          </div>

          {/* Disclaimer */}
          <div className="mt-8 bg-yellow-400/20 border-l-4 border-[#FFCC00] p-4 rounded">
            <p className="text-sm text-white">
              <strong>Important:</strong> This analysis is for educational and self-reflection purposes only.
              It is not a substitute for professional psychological advice, diagnosis, or treatment.
              If you're experiencing relationship difficulties, consider consulting with a qualified therapist or counselor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
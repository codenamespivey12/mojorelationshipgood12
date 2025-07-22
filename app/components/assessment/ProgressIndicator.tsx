interface ProgressIndicatorProps {
  currentSection: number;
  currentQuestion: number;
  totalSections: number;
  totalQuestions: number;
  completionPercentage: number;
}

export function ProgressIndicator({
  currentSection,
  currentQuestion,
  totalSections,
  totalQuestions,
  completionPercentage,
}: ProgressIndicatorProps) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6 border border-white/20">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-white">
          Section {currentSection} of {totalSections}
        </span>
        <span className="text-sm font-medium text-white">
          {Math.round(completionPercentage)}% Complete
        </span>
      </div>

      <div className="w-full bg-white/20 rounded-full h-2 mb-2">
        <div
          className="bg-gradient-to-r from-[#FFCC00] to-[#B13BFF] h-2 rounded-full transition-all duration-300"
          style={{ width: `${completionPercentage}%` }}
        />
      </div>

      <div className="text-xs text-white/80">
        Question {currentQuestion} of {totalQuestions}
      </div>
    </div>
  );
}
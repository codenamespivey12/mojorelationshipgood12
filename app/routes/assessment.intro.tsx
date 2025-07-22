import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/Button";
import { config } from "~/lib/config";

export default function AssessmentIntro() {
  return (
    <div className="max-w-3xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-6 text-center">
        Welcome to Your Relationship Assessment
      </h1>
      
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">What to Expect</h2>
        <p className="mb-4">
          You're about to begin a comprehensive assessment that will help you understand your relationship patterns and tendencies.
        </p>
        
        <ul className="list-disc list-inside space-y-2 mb-6">
          <li>
            <span className="font-medium">50 questions</span> across 5 psychological domains
          </li>
          <li>
            Takes approximately <span className="font-medium">15-20 minutes</span> to complete
          </li>
          <li>
            Your answers are <span className="font-medium">automatically saved</span> as you progress
          </li>
          <li>
            You'll receive a <span className="font-medium">detailed AI analysis</span> of your relationship style
          </li>
        </ul>
        
        <h3 className="text-xl font-semibold mb-2">The 5 Assessment Areas:</h3>
        <ol className="list-decimal list-inside space-y-2 mb-6">
          {config.assessment.sections.map((section) => (
            <li key={section.id} className="font-medium">
              {section.title} <span className="text-sm font-normal">({section.questionCount} questions)</span>
            </li>
          ))}
        </ol>
        
        <div className="bg-yellow-400/20 border-l-4 border-[#FFCC00] p-4 rounded">
          <p className="text-sm">
            <strong>Note:</strong> This assessment is for educational purposes only and is not a substitute for professional advice, diagnosis, or treatment.
          </p>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Link to="/assessment/section/1">
          <Button variant="secondary" size="lg">
            Begin Assessment
          </Button>
        </Link>
      </div>
    </div>
  );
}
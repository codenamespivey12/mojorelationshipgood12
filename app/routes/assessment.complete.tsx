import { json, redirect } from "@remix-run/node";
import type { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigation, Form } from "@remix-run/react";
import { requireAuth } from "~/lib/auth";
import { generateRelationshipAnalysis } from "~/lib/ai/xai-service";
import type { QuestionResponse, UserDemographics } from "~/types/assessment";
import { useState, useEffect } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireAuth({ request });
  
  // TODO: Get assessment responses and user demographics from database/session
  // For now, we'll simulate having the data
  const mockResponses: QuestionResponse[] = [
    {
      section_id: 1,
      section_title: "Attachment Style",
      question_id: 1,
      question_text: "How do you typically feel about getting close to others?",
      question_type: "multiple_choice",
      selected_option: "I find it easy to get close to others and am comfortable depending on them",
      answer_text: "I find it easy to get close to others and am comfortable depending on them",
      elaboration_text: null,
    },
    // Add more mock responses as needed for testing
  ];

  const mockDemographics: UserDemographics = {
    age: "25-34",
    gender: "woman",
    sexualOrientation: "heterosexual",
    race: "white",
    relationshipStatus: "single",
    previousRelationships: "3-5",
    relationshipGoals: "serious-relationship",
    additionalInfo: "Looking to understand my patterns better",
  };

  return json({
    user,
    responses: mockResponses,
    demographics: mockDemographics,
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const user = await requireAuth({ request });
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "generate_analysis") {
    try {
      // Get the data from the loader (in a real app, this would come from the database)
      const responses: QuestionResponse[] = JSON.parse(formData.get("responses") as string);
      const demographics: UserDemographics = JSON.parse(formData.get("demographics") as string);

      const analysisInput = {
        userId: user.id,
        completionTimestamp: new Date().toISOString(),
        demographics,
        responses,
      };

      const result = await generateRelationshipAnalysis(analysisInput);

      if (result.success) {
        // TODO: Save analysis to database
        // For now, redirect to results with the analysis
        return redirect(`/results?analysis=${encodeURIComponent(result.analysis || '')}`);
      } else {
        return json({ error: result.error }, { status: 500 });
      }
    } catch (error) {
      console.error("Analysis generation error:", error);
      return json({ error: "Failed to generate analysis" }, { status: 500 });
    }
  }

  return json({ error: "Invalid action" }, { status: 400 });
}

export default function AssessmentComplete() {
  const { user, responses, demographics } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const [isGenerating, setIsGenerating] = useState(false);

  const isSubmitting = navigation.state === "submitting";

  useEffect(() => {
    if (isSubmitting) {
      setIsGenerating(true);
    }
  }, [isSubmitting]);

  return (
    <div className="max-w-3xl mx-auto text-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">
          🎉 Assessment Complete!
        </h1>
        <p className="text-lg text-white/90">
          Congratulations! You've completed all sections of the relationship assessment.
          Now let's generate your personalized analysis.
        </p>
      </div>

      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
        <h2 className="text-xl font-semibold mb-4 text-white">Assessment Summary</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="font-semibold text-white mb-2">Questions Answered</h3>
            <p className="text-white/90">{responses.length} responses collected</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-2">Sections Completed</h3>
            <p className="text-white/90">5 of 5 sections</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-2">Demographics</h3>
            <p className="text-white/90">Profile information collected</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-2">Analysis Ready</h3>
            <p className="text-white/90">Ready to generate insights</p>
          </div>
        </div>

        <div className="bg-blue-400/20 border-l-4 border-blue-400 p-4 rounded mb-6">
          <p className="text-sm text-white">
            <strong>What happens next:</strong> Our AI will analyze your responses using established psychological frameworks including Attachment Theory, Love Languages, and Emotional Intelligence research to provide you with personalized insights about your relationship patterns.
          </p>
        </div>

        <Form method="post" className="text-center">
          <input type="hidden" name="responses" value={JSON.stringify(responses)} />
          <input type="hidden" name="demographics" value={JSON.stringify(demographics)} />
          
          <button
            type="submit"
            name="action"
            value="generate_analysis"
            disabled={isSubmitting}
            className="px-8 py-4 bg-[#B13BFF] text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Your Analysis...
              </span>
            ) : (
              "Generate My Relationship Analysis"
            )}
          </button>
        </Form>

        {isGenerating && (
          <div className="mt-6 text-center">
            <p className="text-white/90 text-sm">
              This may take 30-60 seconds as our AI carefully analyzes your responses...
            </p>
          </div>
        )}
      </div>

      <div className="bg-yellow-400/20 border-l-4 border-[#FFCC00] p-4 rounded">
        <p className="text-sm text-white">
          <strong>Privacy Note:</strong> Your analysis is generated using advanced AI and is based solely on your assessment responses. Your data remains private and secure.
        </p>
      </div>
    </div>
  );
}

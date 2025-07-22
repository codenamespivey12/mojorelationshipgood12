import { json } from "@remix-run/node";
import type { ActionFunctionArgs } from "@remix-run/node";
import { Form, useActionData, useNavigation } from "@remix-run/react";
import { generateRelationshipAnalysis } from "~/lib/ai/xai-service";
import type { QuestionResponse, UserDemographics } from "~/types/assessment";

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const action = formData.get("action");

  if (action === "test_ai") {
    try {
      // Create test data
      const testResponses: QuestionResponse[] = [
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
        {
          section_id: 1,
          section_title: "Attachment Style",
          question_id: 2,
          question_text: "When your partner needs space, how do you typically react?",
          question_type: "multiple_choice",
          selected_option: "I respect their need for space while staying emotionally available",
          answer_text: "I respect their need for space while staying emotionally available",
          elaboration_text: null,
        },
        {
          section_id: 2,
          section_title: "Communication & Conflict Resolution",
          question_id: 3,
          question_text: "During disagreements, I tend to:",
          question_type: "multiple_choice",
          selected_option: "Express my feelings clearly while listening to my partner's perspective",
          answer_text: "Express my feelings clearly while listening to my partner's perspective",
          elaboration_text: null,
        },
      ];

      const testDemographics: UserDemographics = {
        age: "25-34",
        gender: "woman",
        sexualOrientation: "heterosexual",
        race: "white",
        relationshipStatus: "single",
        previousRelationships: "3-5",
        relationshipGoals: "serious-relationship",
        additionalInfo: "Looking to understand my attachment patterns better",
      };

      const analysisInput = {
        userId: "test-user-123",
        completionTimestamp: new Date().toISOString(),
        demographics: testDemographics,
        responses: testResponses,
      };

      const result = await generateRelationshipAnalysis(analysisInput);

      return json({
        success: result.success,
        analysis: result.analysis,
        error: result.error,
        tokensUsed: result.tokensUsed,
        processingTime: result.processingTime,
      });
    } catch (error) {
      console.error("Test AI Error:", error);
      return json({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  return json({ error: "Invalid action" }, { status: 400 });
}

export default function TestAI() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#090040] via-[#471396] to-[#B13BFF]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-4">
              AI Integration Test
            </h1>
            <p className="text-lg text-white/90">
              Test the xAI Grok-4 integration with sample assessment data
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-8">
            <Form method="post" className="text-center mb-6">
              <button
                type="submit"
                name="action"
                value="test_ai"
                disabled={isSubmitting}
                className="px-8 py-4 bg-[#B13BFF] text-white rounded-lg font-semibold hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Testing AI Analysis...
                  </span>
                ) : (
                  "Test AI Analysis Generation"
                )}
              </button>
            </Form>

            {actionData && (
              <div className="mt-6">
                {actionData.success ? (
                  <div className="space-y-4">
                    <div className="bg-green-400/20 border-l-4 border-green-400 p-4 rounded">
                      <p className="text-white font-semibold">✅ AI Analysis Generated Successfully!</p>
                      <p className="text-white/90 text-sm mt-1">
                        Processing Time: {actionData.processingTime}ms
                        {actionData.tokensUsed && ` | Tokens Used: ${actionData.tokensUsed}`}
                      </p>
                    </div>
                    
                    <div className="bg-white/5 rounded-lg p-4">
                      <h3 className="text-white font-semibold mb-2">Generated Analysis:</h3>
                      <div className="text-white/90 text-sm whitespace-pre-wrap max-h-96 overflow-y-auto">
                        {actionData.analysis}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-red-400/20 border-l-4 border-red-400 p-4 rounded">
                    <p className="text-white font-semibold">❌ AI Analysis Failed</p>
                    <p className="text-white/90 text-sm mt-1">
                      Error: {actionData.error}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="bg-yellow-400/20 border-l-4 border-[#FFCC00] p-4 rounded">
            <p className="text-sm text-white">
              <strong>Note:</strong> This is a test page to verify the AI integration is working correctly. 
              It uses sample assessment data to generate a test analysis using xAI Grok-4.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

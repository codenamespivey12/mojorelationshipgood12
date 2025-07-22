import { useLoaderData, useParams, useNavigate } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { useState, useCallback } from "react";
import { ProgressIndicator } from "~/components/assessment/ProgressIndicator";
import { config } from "~/lib/config";
import { getQuestionsBySection, getSectionQuestionCount } from "~/data/assessmentQuestions";
import type { Question, QuestionResponse } from "~/types/assessment";

export async function loader({ params }: LoaderFunctionArgs) {
  const sectionId = Number(params.sectionId);

  // Validate section ID
  if (isNaN(sectionId) || sectionId < 1 || sectionId > config.assessment.totalSections) {
    throw new Response("Invalid section ID", { status: 404 });
  }

  // Get actual questions for this section
  const section = config.assessment.sections.find(s => s.id === sectionId);
  const sectionQuestions = getQuestionsBySection(sectionId);
  const totalQuestions = getSectionQuestionCount(sectionId);

  return json({
    section,
    questions: sectionQuestions,
    currentQuestion: 1,
    totalQuestions,
    progress: {
      currentSection: sectionId,
      totalSections: config.assessment.totalSections,
      completionPercentage: ((sectionId - 1) / config.assessment.totalSections) * 100
    }
  });
}

export default function AssessmentSection() {
  const { section, questions, progress } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  // State management
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<QuestionResponse[]>([]);

  const currentQuestion = questions[currentQuestionIndex];
  const currentResponse = responses.find(r => r.question_id === currentQuestion?.id);

  // Navigation handlers
  const handlePrevious = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else {
      // Go to previous section
      const prevSection = progress.currentSection - 1;
      if (prevSection >= 1) {
        navigate(`/assessment/section/${prevSection}`);
      }
    }
  }, [currentQuestionIndex, progress.currentSection, navigate]);

  const handleNext = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Go to next section
      const nextSection = progress.currentSection + 1;
      if (nextSection <= config.assessment.totalSections) {
        navigate(`/assessment/section/${nextSection}`);
      } else {
        // Assessment complete - go to results
        navigate('/assessment/complete');
      }
    }
  }, [currentQuestionIndex, questions.length, progress.currentSection, navigate]);

  const handleAnswer = useCallback((answer: QuestionResponse) => {
    setResponses(prev => {
      const filtered = prev.filter(r => r.question_id !== answer.question_id);
      return [...filtered, answer];
    });

    // Auto-advance to next question after a short delay
    setTimeout(() => {
      handleNext();
    }, 500);
  }, [handleNext]);

  // Calculate progress
  const questionProgress = ((currentQuestionIndex + 1) / questions.length) * 100;
  const overallProgress = ((progress.currentSection - 1) / config.assessment.totalSections) * 100 +
    (questionProgress / config.assessment.totalSections);

  if (!currentQuestion) {
    return (
      <div className="max-w-3xl mx-auto text-white">
        <div className="text-center p-12">
          <p className="text-lg">No questions available for this section.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto text-white">
      <ProgressIndicator
        currentSection={progress.currentSection}
        currentQuestion={currentQuestionIndex + 1}
        totalSections={progress.totalSections}
        totalQuestions={questions.length}
        completionPercentage={overallProgress}
      />

      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 my-8">
        <div className="mb-4">
          <span className="text-sm text-gray-300">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
        </div>

        <h2 className="text-xl font-bold mb-6 text-white">
          {currentQuestion.questionText}
          {currentQuestion.isRequired && <span className="text-red-400 ml-1">*</span>}
        </h2>

        <div className="space-y-4">
          {currentQuestion.questionType === 'multiple_choice' && currentQuestion.options && (
            <div className="space-y-3">
              {currentQuestion.options.map((option, index) => (
                <label key={index} className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value={option}
                    className="w-4 h-4 text-purple-600"
                    onChange={(e) => {
                      const response: QuestionResponse = {
                        section_id: currentQuestion.sectionId,
                        section_title: currentQuestion.sectionTitle,
                        question_id: currentQuestion.id,
                        question_text: currentQuestion.questionText,
                        question_type: currentQuestion.questionType,
                        selected_option: e.target.value,
                        answer_text: null,
                        elaboration_text: null,
                      };
                      handleAnswer(response);
                    }}
                  />
                  <span className="text-white">{option}</span>
                </label>
              ))}
            </div>
          )}

          {currentQuestion.questionType === 'free_text' && (
            <div>
              <textarea
                className="w-full p-4 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30"
                rows={4}
                placeholder="Share your thoughts..."
                maxLength={500}
                onChange={(e) => {
                  // Handle text input
                }}
              />
              <button
                className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                onClick={() => {
                  const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
                  const response: QuestionResponse = {
                    section_id: currentQuestion.sectionId,
                    section_title: currentQuestion.sectionTitle,
                    question_id: currentQuestion.id,
                    question_text: currentQuestion.questionText,
                    question_type: currentQuestion.questionType,
                    selected_option: null,
                    answer_text: textarea.value,
                    elaboration_text: null,
                  };
                  handleAnswer(response);
                }}
              >
                Submit Answer
              </button>
            </div>
          )}

          {currentQuestion.questionType === 'yes_no_comment' && (
            <div className="space-y-4">
              <div className="flex space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value="yes"
                    className="w-4 h-4 text-purple-600"
                  />
                  <span className="text-white">Yes</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`question-${currentQuestion.id}`}
                    value="no"
                    className="w-4 h-4 text-purple-600"
                  />
                  <span className="text-white">No</span>
                </label>
              </div>
              <textarea
                className="w-full p-4 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30"
                rows={3}
                placeholder="Please elaborate on your answer..."
                maxLength={300}
              />
              <button
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                onClick={() => {
                  const radio = document.querySelector(`input[name="question-${currentQuestion.id}"]:checked`) as HTMLInputElement;
                  const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
                  const response: QuestionResponse = {
                    section_id: currentQuestion.sectionId,
                    section_title: currentQuestion.sectionTitle,
                    question_id: currentQuestion.id,
                    question_text: currentQuestion.questionText,
                    question_type: currentQuestion.questionType,
                    selected_option: radio?.value || null,
                    answer_text: null,
                    elaboration_text: textarea.value,
                  };
                  handleAnswer(response);
                }}
              >
                Submit Answer
              </button>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-8 pt-6 border-t border-white/20">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0 && progress.currentSection === 1}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Previous
          </button>

          <span className="text-sm text-gray-300">
            Section {progress.currentSection}: {section?.title}
          </span>

          <button
            onClick={handleNext}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
}
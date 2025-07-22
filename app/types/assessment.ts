export interface Question {
  id: number;
  sectionId: number;
  sectionTitle: string;
  questionText: string;
  questionType: 'multiple_choice' | 'free_text' | 'yes_no_comment' | 'multiple_choice_plus_text';
  options?: string[];
  orderIndex: number;
  isRequired: boolean;
}

export interface QuestionResponse {
  section_id: number;
  section_title: string;
  question_id: number;
  question_text: string;
  question_type: string;
  selected_option: string | null;
  answer_text: string | null;
  elaboration_text: string | null;
}

export interface UserDemographics {
  age?: string;
  gender?: string;
  sexualOrientation?: string;
  relationshipStatus?: string;
  location?: string;
}

export interface AssessmentSection {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}
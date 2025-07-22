import type { Question } from '~/types/assessment';

/**
 * Complete assessment questions based on documentation/assessment.md
 * "What Kind of Partner Am I?" - A Self-Discovery Relationship Questionnaire
 */

export const assessmentQuestions: Question[] = [
  // Section 1: Attachment Style
  {
    id: 1,
    sectionId: 1,
    sectionTitle: "Attachment Style",
    questionText: "How comfortable are you with depending on others?",
    questionType: "multiple_choice",
    options: [
      "Very uncomfortable - I prefer to be completely self-reliant",
      "Somewhat uncomfortable - I struggle with asking for help",
      "Neutral - I can depend on others when necessary",
      "Comfortable - I'm generally ok with asking for support",
      "Very comfortable - I easily reach out when I need help"
    ],
    orderIndex: 1,
    isRequired: true,
  },
  {
    id: 2,
    sectionId: 1,
    sectionTitle: "Attachment Style",
    questionText: "Think about a time you felt truly connected to a partner. What were you doing, and what made that experience feel so special?",
    questionType: "free_text",
    orderIndex: 2,
    isRequired: true,
  },
  {
    id: 3,
    sectionId: 1,
    sectionTitle: "Attachment Style",
    questionText: "How do you typically react when you and your partner have a disagreement?",
    questionType: "multiple_choice_plus_text",
    options: [
      "I tend to withdraw and need space",
      "I become frustrated and need to express my feelings immediately",
      "I stay engaged and focus on finding solutions",
      "I try to compromise but sometimes need time to process"
    ],
    orderIndex: 3,
    isRequired: true,
  },
  {
    id: 4,
    sectionId: 1,
    sectionTitle: "Attachment Style",
    questionText: "How do you balance independence and closeness in relationships?",
    questionType: "multiple_choice",
    options: [
      "I strongly prioritize my independence above all else",
      "I need significant personal space while maintaining connection",
      "I seek a balanced approach between togetherness and independence",
      "I prefer spending most time together while maintaining some independence",
      "I prioritize togetherness over independence"
    ],
    orderIndex: 4,
    isRequired: true,
  },
  {
    id: 5,
    sectionId: 1,
    sectionTitle: "Attachment Style",
    questionText: "Think back to your childhood. When you were upset or needed comfort, what was your typical response?",
    questionType: "multiple_choice",
    options: [
      "I easily went to parents/caregivers for comfort",
      "I tried to handle things on my own",
      "I had inconsistent responses depending on the situation",
      "I struggled to express my needs for comfort",
      "I sought comfort but didn't always feel better after"
    ],
    orderIndex: 5,
    isRequired: true,
  },
  {
    id: 6,
    sectionId: 1,
    sectionTitle: "Attachment Style",
    questionText: "How do you feel when your partner needs time alone?",
    questionType: "multiple_choice_plus_text",
    options: [
      "Secure - I'm comfortable with it",
      "Anxious - I worry about what it means",
      "Rejected - I take it personally",
      "Relieved - I value alone time too"
    ],
    orderIndex: 6,
    isRequired: true,
  },
  {
    id: 7,
    sectionId: 1,
    sectionTitle: "Attachment Style",
    questionText: "Let's say you and your partner are a superhero duo. What are your powers, and how do you work together to save the day?",
    questionType: "free_text",
    orderIndex: 7,
    isRequired: true,
  },
  {
    id: 8,
    sectionId: 1,
    sectionTitle: "Attachment Style",
    questionText: "Do you find it easy to express your needs and feelings to your partner?",
    questionType: "yes_no_comment",
    orderIndex: 8,
    isRequired: true,
  },
  {
    id: 9,
    sectionId: 1,
    sectionTitle: "Attachment Style",
    questionText: "When someone gets too close emotionally, I typically:",
    questionType: "multiple_choice",
    options: [
      "Feel comfortable and welcome the closeness",
      "Feel somewhat overwhelmed but try to manage it",
      "Feel the need to create some distance",
      "Feel anxious about maintaining the connection",
      "Feel conflicted between wanting closeness and needing space"
    ],
    orderIndex: 9,
    isRequired: true,
  },
  {
    id: 10,
    sectionId: 1,
    sectionTitle: "Attachment Style",
    questionText: "If your ideal relationship were a movie, what genre would it be and who would play the lead roles?",
    questionType: "free_text",
    orderIndex: 10,
    isRequired: true,
  },

  // Section 2: Communication and Conflict Resolution Style
  {
    id: 11,
    sectionId: 2,
    sectionTitle: "Communication & Conflict Resolution",
    questionText: "How would you describe your primary communication style with partners?",
    questionType: "multiple_choice",
    options: [
      "Direct and straightforward",
      "Careful and diplomatic",
      "Emotional and expressive",
      "Reserved and thoughtful",
      "Playful and lighthearted"
    ],
    orderIndex: 1,
    isRequired: true,
  },
  {
    id: 12,
    sectionId: 2,
    sectionTitle: "Communication & Conflict Resolution",
    questionText: "How do you typically handle disagreements?",
    questionType: "multiple_choice",
    options: [
      "Address them immediately to find resolution",
      "Take time to process before discussing",
      "Try to avoid conflict when possible",
      "Look for compromise and middle ground",
      "Depend on the situation and intensity"
    ],
    orderIndex: 2,
    isRequired: true,
  },
  {
    id: 13,
    sectionId: 2,
    sectionTitle: "Communication & Conflict Resolution",
    questionText: "When you're upset with your partner, what's your typical first response?",
    questionType: "multiple_choice",
    options: [
      "I express my feelings immediately",
      "I need time to cool down first",
      "I try to understand their perspective",
      "I withdraw until I feel better",
      "I seek to resolve it through discussion"
    ],
    orderIndex: 3,
    isRequired: true,
  },
  {
    id: 14,
    sectionId: 2,
    sectionTitle: "Communication & Conflict Resolution",
    questionText: "Describe a recent disagreement you had with someone close to you. How did you handle it, and what would you do differently?",
    questionType: "free_text",
    orderIndex: 4,
    isRequired: true,
  },
  {
    id: 15,
    sectionId: 2,
    sectionTitle: "Communication & Conflict Resolution",
    questionText: "How comfortable are you with expressing anger or frustration?",
    questionType: "multiple_choice",
    options: [
      "Very comfortable - I express it openly",
      "Somewhat comfortable - I can express it when needed",
      "Neutral - I express it sometimes",
      "Somewhat uncomfortable - I struggle to express it",
      "Very uncomfortable - I avoid expressing it"
    ],
    orderIndex: 5,
    isRequired: true,
  },
  {
    id: 16,
    sectionId: 2,
    sectionTitle: "Communication & Conflict Resolution",
    questionText: "When your partner is upset, what's your typical response?",
    questionType: "multiple_choice",
    options: [
      "I immediately try to fix the problem",
      "I listen and offer emotional support",
      "I give them space to process",
      "I try to understand what went wrong",
      "I feel overwhelmed and unsure how to help"
    ],
    orderIndex: 6,
    isRequired: true,
  },
  {
    id: 17,
    sectionId: 2,
    sectionTitle: "Communication & Conflict Resolution",
    questionText: "You and your partner are planning a dinner party, but you have completely different visions. How do you navigate this?",
    questionType: "free_text",
    orderIndex: 7,
    isRequired: true,
  },
  {
    id: 18,
    sectionId: 2,
    sectionTitle: "Communication & Conflict Resolution",
    questionText: "Do you feel heard and understood in your relationships?",
    questionType: "yes_no_comment",
    orderIndex: 8,
    isRequired: true,
  },
  {
    id: 19,
    sectionId: 2,
    sectionTitle: "Communication & Conflict Resolution",
    questionText: "How do you prefer to receive feedback or criticism?",
    questionType: "multiple_choice",
    options: [
      "Direct and straightforward",
      "Gentle and supportive",
      "With specific examples",
      "In private, one-on-one",
      "With suggestions for improvement"
    ],
    orderIndex: 9,
    isRequired: true,
  },
  {
    id: 20,
    sectionId: 2,
    sectionTitle: "Communication & Conflict Resolution",
    questionText: "If you could have a magical communication device that helped you and your partner understand each other perfectly, what would it look like and how would it work?",
    questionType: "free_text",
    orderIndex: 10,
    isRequired: true,
  },

  // Section 3: Emotional Intelligence
  {
    id: 21,
    sectionId: 3,
    sectionTitle: "Emotional Intelligence",
    questionText: "How well do you understand your own emotions?",
    questionType: "multiple_choice",
    options: [
      "Very well - I'm always aware of what I'm feeling",
      "Well - I usually understand my emotions",
      "Moderately - I sometimes understand my emotions",
      "Poorly - I often struggle to identify my emotions",
      "Very poorly - I'm rarely aware of my emotions"
    ],
    orderIndex: 1,
    isRequired: true,
  },
  {
    id: 22,
    sectionId: 3,
    sectionTitle: "Emotional Intelligence",
    questionText: "Imagine you have a control panel for your emotions. What are some of the buttons and levers, and how do you use them to manage how you feel?",
    questionType: "free_text",
    orderIndex: 2,
    isRequired: true,
  },
  {
    id: 23,
    sectionId: 3,
    sectionTitle: "Emotional Intelligence",
    questionText: "How do you typically handle your emotions during stressful situations?",
    questionType: "multiple_choice",
    options: [
      "I often feel overwhelmed and struggle to cope",
      "I try to manage but sometimes get overwhelmed",
      "I can usually stay calm but need time to process",
      "I generally maintain emotional balance",
      "I effectively regulate my emotions even under severe stress"
    ],
    orderIndex: 3,
    isRequired: true,
  },
  {
    id: 24,
    sectionId: 3,
    sectionTitle: "Emotional Intelligence",
    questionText: "How good are you at reading other people's emotions?",
    questionType: "multiple_choice",
    options: [
      "Excellent - I can easily read others' emotions",
      "Good - I usually pick up on others' emotions",
      "Average - I sometimes read others' emotions correctly",
      "Poor - I often miss emotional cues from others",
      "Very poor - I struggle to understand others' emotions"
    ],
    orderIndex: 4,
    isRequired: true,
  },
  {
    id: 25,
    sectionId: 3,
    sectionTitle: "Emotional Intelligence",
    questionText: "When someone close to you is going through a difficult time, how do you typically respond?",
    questionType: "multiple_choice",
    options: [
      "I offer practical solutions and advice",
      "I provide emotional support and listen",
      "I give them space unless they ask for help",
      "I try to distract them with positive activities",
      "I share my own similar experiences"
    ],
    orderIndex: 5,
    isRequired: true,
  },
  {
    id: 26,
    sectionId: 3,
    sectionTitle: "Emotional Intelligence",
    questionText: "Describe a time when you successfully helped someone through an emotional challenge. What did you do?",
    questionType: "free_text",
    orderIndex: 6,
    isRequired: true,
  },
  {
    id: 27,
    sectionId: 3,
    sectionTitle: "Emotional Intelligence",
    questionText: "How do you handle it when your emotions feel overwhelming?",
    questionType: "multiple_choice",
    options: [
      "I take time alone to process",
      "I talk to someone I trust",
      "I engage in physical activity or movement",
      "I use breathing or mindfulness techniques",
      "I distract myself with other activities"
    ],
    orderIndex: 7,
    isRequired: true,
  },
  {
    id: 28,
    sectionId: 3,
    sectionTitle: "Emotional Intelligence",
    questionText: "Do you feel comfortable expressing vulnerability to your partner?",
    questionType: "yes_no_comment",
    orderIndex: 8,
    isRequired: true,
  },
  {
    id: 29,
    sectionId: 3,
    sectionTitle: "Emotional Intelligence",
    questionText: "How do you typically respond when someone is angry with you?",
    questionType: "multiple_choice",
    options: [
      "I become defensive and argue back",
      "I try to understand their perspective",
      "I withdraw and avoid the confrontation",
      "I apologize even if I don't think I'm wrong",
      "I stay calm and work toward resolution"
    ],
    orderIndex: 9,
    isRequired: true,
  },
  {
    id: 30,
    sectionId: 3,
    sectionTitle: "Emotional Intelligence",
    questionText: "If emotions were weather patterns, what would your emotional climate be like, and how would you forecast your emotional weather?",
    questionType: "free_text",
    orderIndex: 10,
    isRequired: true,
  },

  // Section 4: Love Language and Expressions of Affection
  {
    id: 31,
    sectionId: 4,
    sectionTitle: "Love Language & Expressions of Affection",
    questionText: "How do you most naturally express love and affection?",
    questionType: "multiple_choice",
    options: [
      "Through words and compliments",
      "Through helpful actions",
      "Through physical touch",
      "Through quality time together",
      "Through meaningful gifts"
    ],
    orderIndex: 1,
    isRequired: true,
  },
  {
    id: 32,
    sectionId: 4,
    sectionTitle: "Love Language & Expressions of Affection",
    questionText: "How do you prefer to receive love and affection?",
    questionType: "multiple_choice",
    options: [
      "Through words and compliments",
      "Through helpful actions",
      "Through physical touch",
      "Through quality time together",
      "Through meaningful gifts"
    ],
    orderIndex: 2,
    isRequired: true,
  },
  {
    id: 33,
    sectionId: 4,
    sectionTitle: "Love Language & Expressions of Affection",
    questionText: "You're having a rough day and stop by Walmart to pick up a few things. Which aisle do you find yourself gravitating towards for a little mood boost?",
    questionType: "free_text",
    orderIndex: 3,
    isRequired: true,
  },
  {
    id: 34,
    sectionId: 4,
    sectionTitle: "Love Language & Expressions of Affection",
    questionText: "What makes you feel most appreciated in a relationship?",
    questionType: "multiple_choice",
    options: [
      "When my partner verbalizes their feelings",
      "When they go out of their way to help me",
      "When they make time just for us",
      "When they remember small details about me",
      "When they show physical affection"
    ],
    orderIndex: 4,
    isRequired: true,
  },
  {
    id: 35,
    sectionId: 4,
    sectionTitle: "Love Language & Expressions of Affection",
    questionText: "Imagine you're planning a surprise for your partner. What would it be, and how would you make it special?",
    questionType: "free_text",
    orderIndex: 5,
    isRequired: true,
  },
  {
    id: 36,
    sectionId: 4,
    sectionTitle: "Love Language & Expressions of Affection",
    questionText: "How do you typically show someone you care during difficult times?",
    questionType: "multiple_choice",
    options: [
      "Offer emotional support and encouragement",
      "Provide practical help and solutions",
      "Give them space but stay available",
      "Spend extra time with them",
      "Express care through physical comfort"
    ],
    orderIndex: 6,
    isRequired: true,
  },
  {
    id: 37,
    sectionId: 4,
    sectionTitle: "Love Language & Expressions of Affection",
    questionText: "Describe your ideal way of spending quality time with a partner.",
    questionType: "free_text",
    orderIndex: 7,
    isRequired: true,
  },
  {
    id: 38,
    sectionId: 4,
    sectionTitle: "Love Language & Expressions of Affection",
    questionText: "How comfortable are you with public displays of affection?",
    questionType: "multiple_choice",
    options: [
      "Very comfortable with most forms of PDA",
      "Comfortable with subtle gestures only",
      "It depends on the situation",
      "Generally uncomfortable with PDA",
      "Completely uncomfortable with any PDA"
    ],
    orderIndex: 8,
    isRequired: true,
  },
  {
    id: 39,
    sectionId: 4,
    sectionTitle: "Love Language & Expressions of Affection",
    questionText: "Imagine you're creating a care package for your partner who's feeling down. What are three essential items you include, and why?",
    questionType: "free_text",
    orderIndex: 9,
    isRequired: true,
  },
  {
    id: 40,
    sectionId: 4,
    sectionTitle: "Love Language & Expressions of Affection",
    questionText: "When you want to show your partner you appreciate them, you're most likely to...",
    questionType: "multiple_choice",
    options: [
      "Tell them how much you admire and value them",
      "Do something helpful to make their life easier",
      "Plan a special outing or activity to enjoy together",
      "Give them a heartfelt hug or cuddle",
      "Surprise them with a small, thoughtful gift"
    ],
    orderIndex: 10,
    isRequired: true,
  },

  // Section 5: Values, Goals, and Commitment Level
  {
    id: 41,
    sectionId: 5,
    sectionTitle: "Values, Goals & Commitment Level",
    questionText: "How do you view commitment in relationships?",
    questionType: "multiple_choice",
    options: [
      "I prefer to keep things casual and open",
      "I value flexibility and freedom within relationships",
      "I believe in committed partnerships with some independence",
      "I strongly value exclusive, committed relationships",
      "I seek complete dedication and lifelong partnership"
    ],
    orderIndex: 1,
    isRequired: true,
  },
  {
    id: 42,
    sectionId: 5,
    sectionTitle: "Values, Goals & Commitment Level",
    questionText: "Imagine you and your partner are setting sail on a voyage. Where are you going, and what kind of ship are you sailing on?",
    questionType: "free_text",
    orderIndex: 2,
    isRequired: true,
  },
  {
    id: 43,
    sectionId: 5,
    sectionTitle: "Values, Goals & Commitment Level",
    questionText: "What are your primary goals in a relationship?",
    questionType: "multiple_choice",
    options: [
      "Growth and personal development",
      "Stability and security",
      "Adventure and new experiences",
      "Deep emotional connection",
      "Building a family/future together"
    ],
    orderIndex: 3,
    isRequired: true,
  },
  {
    id: 44,
    sectionId: 5,
    sectionTitle: "Values, Goals & Commitment Level",
    questionText: "How do you balance career and relationship priorities?",
    questionType: "multiple_choice",
    options: [
      "Career comes first",
      "Relationship comes first",
      "Seek equal balance between both",
      "Depends on current circumstances",
      "Integration of both as life priorities"
    ],
    orderIndex: 4,
    isRequired: true,
  },
  {
    id: 45,
    sectionId: 5,
    sectionTitle: "Values, Goals & Commitment Level",
    questionText: "If you could build your dream home with your partner, what would it look like, where would it be, and what would be the most important features?",
    questionType: "free_text",
    orderIndex: 5,
    isRequired: true,
  },
  {
    id: 46,
    sectionId: 5,
    sectionTitle: "Values, Goals & Commitment Level",
    questionText: "How aligned do you need your partner's values to be with yours?",
    questionType: "multiple_choice",
    options: [
      "Completely aligned on all important values",
      "Aligned on major values, flexible on others",
      "Share some core values, differ on others",
      "Values can differ if there's mutual respect",
      "Value differences make relationships interesting"
    ],
    orderIndex: 6,
    isRequired: true,
  },
  {
    id: 47,
    sectionId: 5,
    sectionTitle: "Values, Goals & Commitment Level",
    questionText: "When it comes to managing finances in a relationship, which scenario best aligns with your values?",
    questionType: "multiple_choice_plus_text",
    options: [
      "Complete financial merger - shared accounts and decisions",
      "Hybrid approach - shared and individual accounts with agreed-upon splits",
      "Independent finances with shared responsibilities",
      "Flexible system based on each partner's income and comfort level",
      "Separate finances with clear boundaries"
    ],
    orderIndex: 7,
    isRequired: true,
  },
  {
    id: 48,
    sectionId: 5,
    sectionTitle: "Values, Goals & Commitment Level",
    questionText: "What role does personal growth play in your relationships?",
    questionType: "multiple_choice",
    options: [
      "It's the primary purpose",
      "It's important but not the main focus",
      "It happens naturally but isn't a goal",
      "I prefer stability to constant growth",
      "I keep personal growth separate from relationships"
    ],
    orderIndex: 8,
    isRequired: true,
  },
  {
    id: 49,
    sectionId: 5,
    sectionTitle: "Values, Goals & Commitment Level",
    questionText: "Do you believe in soulmates?",
    questionType: "yes_no_comment",
    orderIndex: 9,
    isRequired: true,
  },
  {
    id: 50,
    sectionId: 5,
    sectionTitle: "Values, Goals & Commitment Level",
    questionText: "If you could create a time capsule that represents your ideal relationship 10 years from now, what 5 items would you put in it and why?",
    questionType: "free_text",
    orderIndex: 10,
    isRequired: true,
  },
];

/**
 * Get questions for a specific section
 */
export function getQuestionsBySection(sectionId: number): Question[] {
  return assessmentQuestions.filter(q => q.sectionId === sectionId);
}

/**
 * Get a specific question by ID
 */
export function getQuestionById(questionId: number): Question | undefined {
  return assessmentQuestions.find(q => q.id === questionId);
}

/**
 * Get total number of questions
 */
export function getTotalQuestions(): number {
  return assessmentQuestions.length;
}

/**
 * Get total number of questions for a section
 */
export function getSectionQuestionCount(sectionId: number): number {
  return assessmentQuestions.filter(q => q.sectionId === sectionId).length;
}

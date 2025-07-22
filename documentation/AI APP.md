# **Relationship Mojo \- AI-Powered Relationship Analysis App**

*Development Guide for AI Coding Agents*

## **🎯 Project Overview**

**App Name:** Relationship Mojo  
 **Core Purpose:** AI-driven relationship self-discovery through psychological assessment  
 **Primary Feature:** "What Kind of Partner Am I?" analysis using 50-question assessment across 5 psychological domains

### **Value Proposition**

Transform relationship self-awareness through personalized AI insights based on established psychological frameworks (Attachment Theory, Love Languages, EQ, Communication Styles).

---

## **🛠️ Technical Stack**

### **Frontend Framework**

* **Remix** (React-based full-stack)  
* **Material Web Components** (`@material/web` \- NOT Material UI)  
* **Progressive Web App** (PWA) capabilities  
* **Framer Motion** for animations

### **Backend & Infrastructure**

* **Database:** Neon PostgreSQL  
* **ORM:** Drizzle  
* **Authentication:** Clerk (using provided login pages)  
* **AI Integration:** Vercel AI SDK with OpenAI, Google, and TAI dependencies  
* **Hosting:** Fly.io, Render, or Vercel

### **Key Libraries**

npm install @material/web @clerk/remix framer-motion @vercel/ai (and Ai libraries)  
npm install @neondatabase/serverless drizzle-orm

---

## **🎨 Design System**

### **Color Palette (Primary)**

* **Deep Purple:** `#090040` (primary dark)  
* **Royal Purple:** `#471396` (primary medium)  
* **Electric Purple:** `#B13BFF` (accent)  
* **Golden Yellow:** `#FFCC00` (highlight)

### **Additional Suggested Colors**

* **Neutral Grays:** `#F8F9FA`, `#6C757D`, `#212529`  
* **Success Green:** `#10B981`  
* **Warning Orange:** `#F59E0B`  
* **Error Red:** `#EF4444`

### **Design Principles**

* **Mobile-First Responsive Design**  
* **High Contrast Accessibility**  
* **Dark Mode Support**  
* **Smooth Micro-Animations**  
* **Gradient Overlays** using primary palette  
* **Glass morphism effects** for modern feel

---

## **📱 Screen Flow & Components**

### **1\. Landing Page**

**File:** `app/routes/_index.tsx`

// Key Features to Implement:  
\- Hero section with animated gradient background  
\- Floating card animations on scroll  
\- Interactive hover effects on CTAs  
\- Particle or geometric background animations  
\- Split-screen layout (desktop) / stacked (mobile)

**UI Requirements:**

* **Eye-catching animations:** Framer Motion page transitions, staggered card reveals  
* **Unique layout:** Avoid typical landing page patterns \- consider diagonal sections, floating elements  
* **Interactive elements:** Hover states that reveal additional info, animated icons  
* **Social proof:** Subtle testimonial carousel or usage statistics

### **2\. Authentication**

**File:** `app/routes/auth.$.tsx` (Clerk integration)

// Clerk Configuration:  
\- Social logins (Google, Apple)  
\- Guest mode with data persistence warning  
\- Custom styling to match brand colors  
\- Progressive enhancement for auth state

CLERK SIGN IN ADDRESS - https://helpful-cicada-2.accounts.dev/sign-in
CLERK SIGN UP ADDRESS - https://helpful-cicada-2.accounts.dev/sign-up

### **3\. Assessment Flow**

**File:** `app/routes/assessment.tsx` and child routes

#### **Core Assessment Component Structure:**

// app/components/assessment/  
├── QuestionCard.tsx       // Individual question display  
├── ProgressIndicator.tsx  // Visual progress tracking  
├── SectionSelector.tsx    // 5-section navigation  
├── NavigationControls.tsx // Back/Next/Skip controls  
└── SafetyFeatures.tsx     // Crisis resources, data controls

#### **Question Types to Handle:**

* **Multiple Choice:** Tappable cards with hover effects  
* **Free Text:** Character-counted textarea with validation  
* **Yes/No \+ Comment:** Toggle with conditional text input  
* **Multiple Choice \+ Other:** Dynamic "Other" field revelation

#### **UX Enhancements:**

* **Smooth transitions** between questions using Framer Motion  
* **Autosave functionality** every 30 seconds  
* **Keyboard navigation** support  
* **Loading states** with branded animations  
* **Error boundaries** with friendly messaging

### **4\. Results Dashboard**

**File:** `app/routes/results.$analysisId.tsx`

// AI Integration Pattern:  
const generateAnalysis \= async (responses) \=\> {  
  const aiResponse \= await ai.generateText({  
    model: 'gpt-4', // or chosen model  
    prompt: constructAnalysisPrompt(responses),  
    temperature: 0.7  
  });  
  return parseAnalysisResponse(aiResponse);  
};

**Dynamic Content Sections:**

* **Executive Summary Cards:** Animated counters, progress rings  
* **Detailed Analysis:** Collapsible sections with smooth expand/collapse  
* **Visual Charts:** Attachment style radar chart, communication pie chart  
* **Action Items:** Personalized recommendations with save/share options

---

## **🧠 AI Integration Architecture**

### **Analysis Prompt Structure**

// app/lib/ai/prompts.js  
const ANALYSIS\_PROMPT \= \`  
You are Relationship Mojo, a sophisticated analytical engine...  
\[Include full prompt from document\]

User Data: ${JSON.stringify(userResponses)}  
Demographics: ${JSON.stringify(userProfile)}

Generate analysis following the markdown structure...  
\`;

### **Response Processing**

// app/lib/ai/processor.js  
export const processAIResponse \= (rawResponse) \=\> {  
  // Parse markdown sections  
  // Extract key insights  
  // Generate shareable summaries  
  // Create visualization data points  
};

---

## **🗄️ Database Schema**

### **Core Tables (using Drizzle ORM)**

// schema/users.js  
export const users \= pgTable('users', {  
  id: uuid('id').primaryKey(),  
  clerkId: text('clerk\_id').unique().notNull(),  
  email: text('email').notNull(),  
  demographics: jsonb('demographics'), // age, orientation, etc.  
  createdAt: timestamp('created\_at').defaultNow(),  
});

// schema/assessments.js  
export const assessments \= pgTable('assessments', {  
  id: uuid('id').primaryKey(),  
  userId: uuid('user\_id').references(() \=\> users.id),  
  responses: jsonb('responses').notNull(),  
  analysisResult: jsonb('analysis\_result'),  
  completedAt: timestamp('completed\_at'),  
  status: text('status').default('in\_progress'), // in\_progress, completed  
});

// schema/questions.js  
export const questions \= pgTable('questions', {  
  id: serial('id').primaryKey(),  
  sectionId: integer('section\_id'),  
  questionText: text('question\_text').notNull(),  
  questionType: text('question\_type'), // multiple\_choice, free\_text, etc.  
  options: jsonb('options'), // for multiple choice questions  
});

---

## **🔒 Data Privacy & Security**

### **Key Requirements**

* **GDPR Compliance:** Right to deletion, data export  
* **Data Encryption:** At rest and in transit  
* **Session Security:** Secure cookie handling via Clerk  
* **Crisis Resources:** Always accessible help links

### **Implementation Notes**

// app/lib/privacy.js  
export const anonymizeData \= (userData) \=\> {  
  // Remove PII for AI processing  
  // Hash identifiers  
  // Maintain analysis integrity  
};

---

## **🎭 Advanced UI/UX Features**

### **Animation Guidelines**

// app/lib/animations.js  
export const pageTransitions \= {  
  initial: { opacity: 0, y: 20 },  
  animate: { opacity: 1, y: 0 },  
  exit: { opacity: 0, y: \-20 },  
  transition: { duration: 0.3, ease: "easeInOut" }  
};

export const staggerChildren \= {  
  animate: {  
    transition: {  
      staggerChildren: 0.1  
    }  
  }  
};

### **Responsive Breakpoints**

* **Mobile:** 320px \- 768px (primary focus)  
* **Tablet:** 769px \- 1024px  
* **Desktop:** 1025px+  
* **Large Desktop:** 1440px+

### **Accessibility Features**

* **Screen Reader Support:** Semantic HTML, ARIA labels  
* **Keyboard Navigation:** Focus management, skip links  
* **Color Contrast:** WCAG AA compliance  
* **Text Scaling:** Support up to 200% zoom  
* **Motion Preferences:** Respect `prefers-reduced-motion`

---

## **🚀 Performance Optimizations**

### **Code Splitting Strategy**

// Dynamic imports for assessment sections  
const AttachmentSection \= lazy(() \=\> import('./sections/AttachmentSection'));  
const CommunicationSection \= lazy(() \=\> import('./sections/CommunicationSection'));

### **Caching Strategy**

* **Static Assets:** Long-term caching for images, fonts  
* **API Routes:** Appropriate cache headers for analysis results  
* **Client State:** Optimistic updates with error boundaries

### **Bundle Size Targets**

* **Initial Load:** \< 200KB gzipped  
* **Assessment Sections:** \< 50KB per section  
* **AI Integration:** Lazy load AI SDK components

---

## **📊 Analytics & Monitoring**

### **Key Metrics to Track**

* **Completion Rates:** By section and overall  
* **Drop-off Points:** Identify UX friction  
* **Analysis Generation Time:** AI performance monitoring  
* **User Engagement:** Return visits, sharing behavior

### **Error Handling**

// app/lib/errorBoundary.jsx  
export const AssessmentErrorBoundary \= ({ children }) \=\> {  
  // Graceful degradation  
  // User-friendly error messages  
  // Automatic error reporting  
  // Recovery suggestions  
};

---

## **🧪 Testing Strategy**

### **Unit Testing**

* **Question Logic:** Response validation, scoring algorithms  
* **AI Integration:** Mock responses, error scenarios  
* **Form Handling:** Validation, state management

### **Integration Testing**

* **User Flows:** Complete assessment journey  
* **Authentication:** Clerk integration scenarios  
* **Database Operations:** CRUD with error handling

### **Performance Testing**

* **Load Testing:** Concurrent user scenarios  
* **AI Response Times:** Analysis generation benchmarks  
* **Mobile Performance:** Real device testing

---

## **🎯 Future Enhancement Areas**

### **Phase 2 Features**

* **Couple Assessments:** Partner compatibility analysis  
* **Progress Tracking:** Longitudinal relationship growth  
* **Community Features:** Anonymous insights sharing  
* **Expert Content:** Relationship tips and articles

### **Technical Debt Prevention**

* **Code Reviews:** Consistent patterns and conventions  
* **Documentation:** Keep this guide updated  
* **Refactoring Sprints:** Regular code quality improvements  
* **Performance Audits:** Monthly Lighthouse scoring

---

## **📝 Development Notes**

### **Form Handling Best Practices**

// Use Remix's native form handling  
export const action \= async ({ request }) \=\> {  
  const formData \= await request.formData();  
  // Validate with Zod  
  // Progressive enhancement  
  // Handle JavaScript disabled scenarios  
};

### **State Management Philosophy**

* **Server State:** Remix loaders/actions for persistence  
* **Client State:** React hooks for UI interactions  
* **Form State:** Native form handling with progressive enhancement  
* **Global State:** Minimal \- prefer lifting state up

This guide provides a comprehensive foundation for building Relationship Mojo with attention to modern web development practices, user experience, and maintainable architecture.

COMPLETE AI PROMPT \- 

You are Relationship Mojo, a sophisticated analytical engine designed for relationship self-discovery. Your function is to process a user's responses to the "What Kind of Partner Am I?" questionnaire and generate a comprehensive, personalized, and insightful report.

PRIMARY GOAL: To provide the user with a structured, empathetic, and actionable analysis of their relationship patterns, tendencies, and styles. The analysis MUST be grounded in established psychological frameworks, directly referencing the user's specific answers to create a deeply personalized and non-judgmental profile.

INPUT FORMAT: You will receive the user's complete questionnaire responses as a single JSON object. The structure is non-negotiable and will be as follows. DO NOT proceed if the input deviates from this structure.

Generated json

{

 "userId": "string",

 "completionTimestamp": "ISO\_8601\_string",

 "responses": \[

   {

     "section\_id": "integer (1-5)",

     "section\_title": "string (e.g., 'Attachment Style')",

     "question\_id": "integer (1-10)",

     "question\_text": "string (The full question text)",

     "question\_type": "enum ('multiple\_choice', 'free\_text', 'yes\_no\_comment', 'multiple\_choice\_plus\_text')",

     "selected\_option": "string | null (e.g., 'a', 'b', 'Yes', 'No')",

     "answer\_text": "string | null (The text of the selected option or the full free\_text answer)",

     "elaboration\_text": "string | null (For 'Other (please specify)', optional comments, or follow-up questions)"

   },

   // ... additional response objects

 \]

}

THEORETICAL FRAMEWORK & KNOWLEDGE BASE

You MUST base your analysis on the following frameworks. Your entire analysis is constrained by these definitions.

Section 1: Attachment Theory (Hazan & Shaver)

Secure: Comfortable with intimacy and interdependence; optimistic and sociable. Balances closeness and independence effectively.

Anxious-Preoccupied: Craves high levels of intimacy, approval, and responsiveness from partners, becoming overly dependent. Can be anxious and less trusting.

Dismissive-Avoidant: Desires high levels of independence, often appearing to avoid attachment altogether. Views self as self-sufficient and invulnerable to closeness.

Fearful-Avoidant: Desires emotional closeness but also feels uncomfortable with it. Characterized by a fear of intimacy and a view of self as unworthy. Can be distrustful and seek less intimacy.

Section 2: Communication & Conflict Resolution Styles

Assertive: Clearly and respectfully expresses own needs, wants, and boundaries. Listens to others without judgment. Aims for win-win solutions.

Aggressive: Expresses feelings and opinions at the expense of others. May be blaming, intimidating, or controlling.

Passive: Fails to express feelings or needs, allowing others to infringe on their rights. Avoids confrontation.

Passive-Aggressive: Appears passive on the surface but acts out anger in subtle, indirect ways. Uses sarcasm, stubbornness, or procrastination.

Conflict Approaches: (a) Collaborating (problem-solving), (b) Avoiding (withdrawing), (c) Accommodating (yielding), (d) Competing (forcing), (e) Compromising (finding middle ground).

Section 3: Emotional Intelligence (EQ)

Self-Awareness: The ability to recognize and understand your own emotions.

Self-Regulation: The ability to manage or redirect disruptive emotions and impulses.

Empathy: The ability to understand the emotional makeup of other people; skill in treating people according to their emotional reactions.

Social Skill: Proficiency in managing relationships and building networks.

Section 4: The 5 Love Languages® (Gary Chapman)

Words of Affirmation: Expressing affection through spoken words, praise, or appreciation.

Acts of Service: Actions, rather than words, are used to show and receive love.

Receiving Gifts: Gifting is symbolic of love and affection.

Quality Time: Expressing affection with undivided, undistracted attention.

Physical Touch: Feeling loved through physical affection like hugging, holding hands, or cuddling.

CORE TASK: REPORT GENERATION PROTOCOL

You will generate a single, coherent report in Markdown format. The structure defined below is MANDATORY.

Report Structure:

**\# Your Personalized Partner Profile**

**\#\# Introduction**

Start with a warm, encouraging paragraph.

State the report's purpose: to offer a "mirror" to the user's relationship patterns based exclusively on their questionnaire answers.

Emphasize that these are tendencies, not unchangeable labels, and that self-awareness is the first step toward growth.

**\#\# Executive Summary: Your Core Relationship Tendencies**

Provide a high-level synthesis in 3-5 bullet points. This is a "snapshot" of the most prominent traits identified in the detailed analysis.

Example:

Primary Attachment Leanings: Your responses suggest a predominantly Secure attachment style, valuing both connection and independence, though with some Dismissive-Avoidant tendencies under stress.

Dominant Communication Style: You favor an Assertive and Direct communication approach, aiming for quick resolution in conflicts.

Primary Love Language Profile: You most naturally express affection through Acts of Service and feel most loved when receiving Quality Time.

**\#\# Detailed Analysis**

This is the main body of the report. For each of the five sections, you MUST follow this sub-structure precisely.

**\#\#\# Section \[Number\]: \[Title of Section\]**

1\. Primary Finding: Begin with a concise statement identifying the user's primary style or tendency within this section's framework. Use bold for key terms.

Example: "Your answers in this section point towards a Dismissive-Avoidant attachment tendency, characterized by a strong emphasis on self-reliance and independence."

2\. Evidence from Your Answers: This is critical for personalization. Directly quote or accurately paraphrase 2-3 of the user's most indicative answers from this section to support your finding. ALWAYS connect the answer back to the analysis.

Example: "For instance, when asked how you balance independence and closeness, you selected, 'I strongly prioritize my independence above all else.' This directly reflects the core value of self-sufficiency found in the Dismissive-Avoidant pattern. Furthermore, your reaction to a partner's need for space is 'Relieved \- I value alone time too,' reinforcing this preference."

3\. Analysis of Creative & Projective Insights: For sections containing metaphorical/creative questions (e.g., "superhero duo," "movie genre," "time capsule"), analyze them here. Interpret them as symbolic representations of the user's desires, fears, or perspectives. DO NOT treat them literally.

Example: "Your description of your ideal relationship movie as a 'solo explorer documentary' metaphorically highlights your deep-seated value for autonomy and self-discovery, even within the context of a partnership."

4\. Associated Strengths: Based on the identified tendency, list 2-3 positive attributes. Frame these constructively.

Example: "This independent nature equips you with remarkable resilience and the ability to handle challenges on your own. Partners likely appreciate your lack of clinginess and your respect for personal boundaries."

5\. Opportunities for Reflection: Based on the identified tendency, gently and constructively frame 2-3 areas for potential growth or self-reflection. DO NOT use accusatory language. Phrase these as questions or invitations to consider another perspective.

Example: "An area for reflection might be how your strong self-reliance is perceived by partners who may desire more interdependence. You might ask yourself: 'Are there times when allowing myself to be vulnerable and ask for help could actually strengthen my connection with a partner?'"

(Repeat this 5-part sub-structure for all five sections of the questionnaire.)

**\#\# Synthesis: How Your Traits Weave Together**

In 2-3 paragraphs, analyze the interplay between the findings from different sections. This demonstrates a deeper level of analysis.

Identify potential harmonies and conflicts.

Harmony Example: "Your Assertive communication style (Section 2\) synergizes well with your primary Love Language of Words of Affirmation (Section 4), as you are likely skilled at clearly articulating your appreciation for a partner."

Conflict Example: "An interesting dynamic emerges between your Anxious-Preoccupied attachment leanings (Section 1\) and your conflict-resolution style of taking time to process (Section 2). While needing space is a valid strategy, it might accidentally trigger your own anxieties about the relationship's stability. Recognizing this link is a powerful step."

**\#\# Concluding Thoughts**

Provide a brief, empowering summary.

Reiterate that this report is a tool for self-discovery, not a final judgment.

Encourage the user to use these insights to foster healthier, more fulfilling relationships.

**\#\# IMPORTANT DISCLAIMER**

You MUST include this section verbatim at the end of every report.

"This report is an automated analysis based on your questionnaire responses and is intended for self-exploration and educational purposes only. It is not a psychological diagnosis, nor is it a substitute for professional advice from a qualified therapist, counselor, or mental health practitioner. The frameworks used (Attachment Theory, Love Languages, etc.) are simplified models to help understand complex human behaviors."

GUIDING PRINCIPLES & CONSTRAINTS (NON-NEGOTIABLE)

Empathy and Non-Judgment: The tone MUST be consistently empathetic, supportive, and non-judgmental. Avoid pathologizing language. Use phrases like "tendency toward," "pattern suggests," "inclination for" instead of definitive statements like "you are."

Strict Data Adherence: Base your analysis EXCLUSIVELY on the provided JSON data. DO NOT infer or assume any information about the user not present in their answers.

Handle Missing Data Gracefully: If a user skips questions in a section, you MUST state this at the beginning of that section's analysis (e.g., "Based on the limited responses provided for this section...").

Prioritize Free-Text: When a question has an "Other (please specify)" or an optional comment, that free-text data point (elaboration\_text) is the most valuable piece of information for that question. Prioritize it in your analysis.

Personalization: Address the user by name in their report, use their demographic information in your analysis, or when making recommendatios, as relationship statistics swing greatly between sexual orientation, race, gender, etc..  if you reference statistics, cite a source.

.ENV IS IN PLACE WITH ALL THE NEEDED ENV VARIABLES.
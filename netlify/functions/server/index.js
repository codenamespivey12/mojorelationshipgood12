"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const jsxRuntime = require("react/jsx-runtime");
const node_stream = require("node:stream");
const node = require("@remix-run/node");
const react = require("@remix-run/react");
const isbot = require("isbot");
const server = require("react-dom/server");
const remix = require("@clerk/remix");
const ssr_server = require("@clerk/remix/ssr.server");
const react$1 = require("react");
const clsx = require("clsx");
const tailwindMerge = require("tailwind-merge");
const ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  return isbot.isbot(request.headers.get("user-agent") || "") ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = server.renderToPipeableStream(
      /* @__PURE__ */ jsxRuntime.jsx(
        react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onAllReady() {
          shellRendered = true;
          const body = new node_stream.PassThrough();
          const stream = node.createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let shellRendered = false;
    const { pipe, abort } = server.renderToPipeableStream(
      /* @__PURE__ */ jsxRuntime.jsx(
        react.RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        }
      ),
      {
        onShellReady() {
          shellRendered = true;
          const body = new node_stream.PassThrough();
          const stream = node.createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html");
          resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          );
          pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500;
          if (shellRendered) {
            console.error(error);
          }
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest
}, Symbol.toStringTag, { value: "Module" }));
const loader$2 = (args) => {
  return ssr_server.rootAuthLoader(args);
};
const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  }
];
function Layout({ children }) {
  return /* @__PURE__ */ jsxRuntime.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("head", { children: [
      /* @__PURE__ */ jsxRuntime.jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsxRuntime.jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsxRuntime.jsx(react.Meta, {}),
      /* @__PURE__ */ jsxRuntime.jsx(react.Links, {})
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntime.jsx(react.ScrollRestoration, {}),
      /* @__PURE__ */ jsxRuntime.jsx(react.Scripts, {})
    ] })
  ] });
}
function App() {
  return /* @__PURE__ */ jsxRuntime.jsx(react.Outlet, {});
}
const root = remix.ClerkApp(App);
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Layout,
  default: root,
  links,
  loader: loader$2
}, Symbol.toStringTag, { value: "Module" }));
function ProgressIndicator({
  currentSection,
  currentQuestion,
  totalSections,
  totalQuestions,
  completionPercentage
}) {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-6 border border-white/20", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-sm font-medium text-white", children: [
        "Section ",
        currentSection,
        " of ",
        totalSections
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-sm font-medium text-white", children: [
        Math.round(completionPercentage),
        "% Complete"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-full bg-white/20 rounded-full h-2 mb-2", children: /* @__PURE__ */ jsxRuntime.jsx(
      "div",
      {
        className: "bg-gradient-to-r from-[#FFCC00] to-[#B13BFF] h-2 rounded-full transition-all duration-300",
        style: { width: `${completionPercentage}%` }
      }
    ) }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-xs text-white/80", children: [
      "Question ",
      currentQuestion,
      " of ",
      totalQuestions
    ] })
  ] });
}
const config = {
  app: {
    name: "Relationship Mojo",
    description: "AI-powered relationship analysis to help you understand your relationship patterns and tendencies."
  },
  assessment: {
    totalSections: 5,
    // 30 seconds
    sections: [
      { id: 1, title: "Attachment Style", questionCount: 10 },
      { id: 2, title: "Communication & Conflict Resolution", questionCount: 10 },
      { id: 3, title: "Emotional Intelligence", questionCount: 10 },
      { id: 4, title: "Love Language & Expressions of Affection", questionCount: 10 },
      { id: 5, title: "Values, Goals & Commitment Level", questionCount: 10 }
    ]
  }
};
const assessmentQuestions = [
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
    isRequired: true
  },
  {
    id: 2,
    sectionId: 1,
    sectionTitle: "Attachment Style",
    questionText: "Think about a time you felt truly connected to a partner. What were you doing, and what made that experience feel so special?",
    questionType: "free_text",
    orderIndex: 2,
    isRequired: true
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
    isRequired: true
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
    isRequired: true
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
    isRequired: true
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
    isRequired: true
  },
  {
    id: 7,
    sectionId: 1,
    sectionTitle: "Attachment Style",
    questionText: "Let's say you and your partner are a superhero duo. What are your powers, and how do you work together to save the day?",
    questionType: "free_text",
    orderIndex: 7,
    isRequired: true
  },
  {
    id: 8,
    sectionId: 1,
    sectionTitle: "Attachment Style",
    questionText: "Do you find it easy to express your needs and feelings to your partner?",
    questionType: "yes_no_comment",
    orderIndex: 8,
    isRequired: true
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
    isRequired: true
  },
  {
    id: 10,
    sectionId: 1,
    sectionTitle: "Attachment Style",
    questionText: "If your ideal relationship were a movie, what genre would it be and who would play the lead roles?",
    questionType: "free_text",
    orderIndex: 10,
    isRequired: true
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
    isRequired: true
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
    isRequired: true
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
    isRequired: true
  },
  {
    id: 14,
    sectionId: 2,
    sectionTitle: "Communication & Conflict Resolution",
    questionText: "Describe a recent disagreement you had with someone close to you. How did you handle it, and what would you do differently?",
    questionType: "free_text",
    orderIndex: 4,
    isRequired: true
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
    isRequired: true
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
    isRequired: true
  },
  {
    id: 17,
    sectionId: 2,
    sectionTitle: "Communication & Conflict Resolution",
    questionText: "You and your partner are planning a dinner party, but you have completely different visions. How do you navigate this?",
    questionType: "free_text",
    orderIndex: 7,
    isRequired: true
  },
  {
    id: 18,
    sectionId: 2,
    sectionTitle: "Communication & Conflict Resolution",
    questionText: "Do you feel heard and understood in your relationships?",
    questionType: "yes_no_comment",
    orderIndex: 8,
    isRequired: true
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
    isRequired: true
  },
  {
    id: 20,
    sectionId: 2,
    sectionTitle: "Communication & Conflict Resolution",
    questionText: "If you could have a magical communication device that helped you and your partner understand each other perfectly, what would it look like and how would it work?",
    questionType: "free_text",
    orderIndex: 10,
    isRequired: true
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
    isRequired: true
  },
  {
    id: 22,
    sectionId: 3,
    sectionTitle: "Emotional Intelligence",
    questionText: "Imagine you have a control panel for your emotions. What are some of the buttons and levers, and how do you use them to manage how you feel?",
    questionType: "free_text",
    orderIndex: 2,
    isRequired: true
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
    isRequired: true
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
    isRequired: true
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
    isRequired: true
  },
  {
    id: 26,
    sectionId: 3,
    sectionTitle: "Emotional Intelligence",
    questionText: "Describe a time when you successfully helped someone through an emotional challenge. What did you do?",
    questionType: "free_text",
    orderIndex: 6,
    isRequired: true
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
    isRequired: true
  },
  {
    id: 28,
    sectionId: 3,
    sectionTitle: "Emotional Intelligence",
    questionText: "Do you feel comfortable expressing vulnerability to your partner?",
    questionType: "yes_no_comment",
    orderIndex: 8,
    isRequired: true
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
    isRequired: true
  },
  {
    id: 30,
    sectionId: 3,
    sectionTitle: "Emotional Intelligence",
    questionText: "If emotions were weather patterns, what would your emotional climate be like, and how would you forecast your emotional weather?",
    questionType: "free_text",
    orderIndex: 10,
    isRequired: true
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
    isRequired: true
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
    isRequired: true
  },
  {
    id: 33,
    sectionId: 4,
    sectionTitle: "Love Language & Expressions of Affection",
    questionText: "You're having a rough day and stop by Walmart to pick up a few things. Which aisle do you find yourself gravitating towards for a little mood boost?",
    questionType: "free_text",
    orderIndex: 3,
    isRequired: true
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
    isRequired: true
  },
  {
    id: 35,
    sectionId: 4,
    sectionTitle: "Love Language & Expressions of Affection",
    questionText: "Imagine you're planning a surprise for your partner. What would it be, and how would you make it special?",
    questionType: "free_text",
    orderIndex: 5,
    isRequired: true
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
    isRequired: true
  },
  {
    id: 37,
    sectionId: 4,
    sectionTitle: "Love Language & Expressions of Affection",
    questionText: "Describe your ideal way of spending quality time with a partner.",
    questionType: "free_text",
    orderIndex: 7,
    isRequired: true
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
    isRequired: true
  },
  {
    id: 39,
    sectionId: 4,
    sectionTitle: "Love Language & Expressions of Affection",
    questionText: "Imagine you're creating a care package for your partner who's feeling down. What are three essential items you include, and why?",
    questionType: "free_text",
    orderIndex: 9,
    isRequired: true
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
    isRequired: true
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
    isRequired: true
  },
  {
    id: 42,
    sectionId: 5,
    sectionTitle: "Values, Goals & Commitment Level",
    questionText: "Imagine you and your partner are setting sail on a voyage. Where are you going, and what kind of ship are you sailing on?",
    questionType: "free_text",
    orderIndex: 2,
    isRequired: true
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
    isRequired: true
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
    isRequired: true
  },
  {
    id: 45,
    sectionId: 5,
    sectionTitle: "Values, Goals & Commitment Level",
    questionText: "If you could build your dream home with your partner, what would it look like, where would it be, and what would be the most important features?",
    questionType: "free_text",
    orderIndex: 5,
    isRequired: true
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
    isRequired: true
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
    isRequired: true
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
    isRequired: true
  },
  {
    id: 49,
    sectionId: 5,
    sectionTitle: "Values, Goals & Commitment Level",
    questionText: "Do you believe in soulmates?",
    questionType: "yes_no_comment",
    orderIndex: 9,
    isRequired: true
  },
  {
    id: 50,
    sectionId: 5,
    sectionTitle: "Values, Goals & Commitment Level",
    questionText: "If you could create a time capsule that represents your ideal relationship 10 years from now, what 5 items would you put in it and why?",
    questionType: "free_text",
    orderIndex: 10,
    isRequired: true
  }
];
function getQuestionsBySection(sectionId) {
  return assessmentQuestions.filter((q) => q.sectionId === sectionId);
}
function getSectionQuestionCount(sectionId) {
  return assessmentQuestions.filter((q) => q.sectionId === sectionId).length;
}
async function loader$1({ params }) {
  const sectionId = Number(params.sectionId);
  if (isNaN(sectionId) || sectionId < 1 || sectionId > config.assessment.totalSections) {
    throw new Response("Invalid section ID", { status: 404 });
  }
  const section = config.assessment.sections.find((s) => s.id === sectionId);
  const sectionQuestions = getQuestionsBySection(sectionId);
  const totalQuestions = getSectionQuestionCount(sectionId);
  return node.json({
    section,
    questions: sectionQuestions,
    currentQuestion: 1,
    totalQuestions,
    progress: {
      currentSection: sectionId,
      totalSections: config.assessment.totalSections,
      completionPercentage: (sectionId - 1) / config.assessment.totalSections * 100
    }
  });
}
function AssessmentSection() {
  const { section, questions, progress } = react.useLoaderData();
  const navigate = react.useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = react$1.useState(0);
  const [responses, setResponses] = react$1.useState([]);
  const currentQuestion = questions[currentQuestionIndex];
  responses.find((r) => r.question_id === (currentQuestion == null ? void 0 : currentQuestion.id));
  const handlePrevious = react$1.useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    } else {
      const prevSection = progress.currentSection - 1;
      if (prevSection >= 1) {
        navigate(`/assessment/section/${prevSection}`);
      }
    }
  }, [currentQuestionIndex, progress.currentSection, navigate]);
  const handleNext = react$1.useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      const nextSection = progress.currentSection + 1;
      if (nextSection <= config.assessment.totalSections) {
        navigate(`/assessment/section/${nextSection}`);
      } else {
        navigate("/assessment/complete");
      }
    }
  }, [currentQuestionIndex, questions.length, progress.currentSection, navigate]);
  const handleAnswer = react$1.useCallback((answer) => {
    setResponses((prev) => {
      const filtered = prev.filter((r) => r.question_id !== answer.question_id);
      return [...filtered, answer];
    });
    setTimeout(() => {
      handleNext();
    }, 500);
  }, [handleNext]);
  const questionProgress = (currentQuestionIndex + 1) / questions.length * 100;
  const overallProgress = (progress.currentSection - 1) / config.assessment.totalSections * 100 + questionProgress / config.assessment.totalSections;
  if (!currentQuestion) {
    return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "max-w-3xl mx-auto text-white", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "text-center p-12", children: /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-lg", children: "No questions available for this section." }) }) });
  }
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "max-w-3xl mx-auto text-white", children: [
    /* @__PURE__ */ jsxRuntime.jsx(
      ProgressIndicator,
      {
        currentSection: progress.currentSection,
        currentQuestion: currentQuestionIndex + 1,
        totalSections: progress.totalSections,
        totalQuestions: questions.length,
        completionPercentage: overallProgress
      }
    ),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-lg p-6 my-8", children: [
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mb-4", children: /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-sm text-gray-300", children: [
        "Question ",
        currentQuestionIndex + 1,
        " of ",
        questions.length
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsxs("h2", { className: "text-xl font-bold mb-6 text-white", children: [
        currentQuestion.questionText,
        currentQuestion.isRequired && /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-red-400 ml-1", children: "*" })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
        currentQuestion.questionType === "multiple_choice" && currentQuestion.options && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "space-y-3", children: currentQuestion.options.map((option, index) => /* @__PURE__ */ jsxRuntime.jsxs("label", { className: "flex items-center space-x-3 cursor-pointer", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "input",
            {
              type: "radio",
              name: `question-${currentQuestion.id}`,
              value: option,
              className: "w-4 h-4 text-purple-600",
              onChange: (e) => {
                const response = {
                  section_id: currentQuestion.sectionId,
                  section_title: currentQuestion.sectionTitle,
                  question_id: currentQuestion.id,
                  question_text: currentQuestion.questionText,
                  question_type: currentQuestion.questionType,
                  selected_option: e.target.value,
                  answer_text: null,
                  elaboration_text: null
                };
                handleAnswer(response);
              }
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-white", children: option })
        ] }, index)) }),
        currentQuestion.questionType === "free_text" && /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "textarea",
            {
              className: "w-full p-4 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30",
              rows: 4,
              placeholder: "Share your thoughts...",
              maxLength: 500,
              onChange: (e) => {
              }
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              className: "mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700",
              onClick: () => {
                const textarea = document.querySelector("textarea");
                const response = {
                  section_id: currentQuestion.sectionId,
                  section_title: currentQuestion.sectionTitle,
                  question_id: currentQuestion.id,
                  question_text: currentQuestion.questionText,
                  question_type: currentQuestion.questionType,
                  selected_option: null,
                  answer_text: textarea.value,
                  elaboration_text: null
                };
                handleAnswer(response);
              },
              children: "Submit Answer"
            }
          )
        ] }),
        currentQuestion.questionType === "yes_no_comment" && /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex space-x-6", children: [
            /* @__PURE__ */ jsxRuntime.jsxs("label", { className: "flex items-center space-x-2 cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "input",
                {
                  type: "radio",
                  name: `question-${currentQuestion.id}`,
                  value: "yes",
                  className: "w-4 h-4 text-purple-600"
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-white", children: "Yes" })
            ] }),
            /* @__PURE__ */ jsxRuntime.jsxs("label", { className: "flex items-center space-x-2 cursor-pointer", children: [
              /* @__PURE__ */ jsxRuntime.jsx(
                "input",
                {
                  type: "radio",
                  name: `question-${currentQuestion.id}`,
                  value: "no",
                  className: "w-4 h-4 text-purple-600"
                }
              ),
              /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-white", children: "No" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntime.jsx(
            "textarea",
            {
              className: "w-full p-4 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30",
              rows: 3,
              placeholder: "Please elaborate on your answer...",
              maxLength: 300
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx(
            "button",
            {
              className: "px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700",
              onClick: () => {
                const radio = document.querySelector(`input[name="question-${currentQuestion.id}"]:checked`);
                const textarea = document.querySelector("textarea");
                const response = {
                  section_id: currentQuestion.sectionId,
                  section_title: currentQuestion.sectionTitle,
                  question_id: currentQuestion.id,
                  question_text: currentQuestion.questionText,
                  question_type: currentQuestion.questionType,
                  selected_option: (radio == null ? void 0 : radio.value) || null,
                  answer_text: null,
                  elaboration_text: textarea.value
                };
                handleAnswer(response);
              },
              children: "Submit Answer"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex justify-between items-center mt-8 pt-6 border-t border-white/20", children: [
        /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            onClick: handlePrevious,
            disabled: currentQuestionIndex === 0 && progress.currentSection === 1,
            className: "px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed",
            children: "← Previous"
          }
        ),
        /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-sm text-gray-300", children: [
          "Section ",
          progress.currentSection,
          ": ",
          section == null ? void 0 : section.title
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx(
          "button",
          {
            onClick: handleNext,
            className: "px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700",
            children: "Next →"
          }
        )
      ] })
    ] })
  ] });
}
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AssessmentSection,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
function AssessmentIndex() {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-center mb-8", children: [
      /* @__PURE__ */ jsxRuntime.jsx("h1", { className: "text-3xl font-bold text-gray-900 mb-4", children: "Relationship Assessment" }),
      /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-lg text-gray-600", children: "This comprehensive assessment will help you understand your relationship patterns across 5 key areas." })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "bg-white rounded-lg shadow-md p-8", children: [
      /* @__PURE__ */ jsxRuntime.jsx("h2", { className: "text-xl font-semibold mb-4", children: "Assessment Overview" }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-8 h-8 bg-[#471396] text-white rounded-full flex items-center justify-center font-semibold", children: "1" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { children: "Attachment Style" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-8 h-8 bg-[#471396] text-white rounded-full flex items-center justify-center font-semibold", children: "2" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { children: "Communication & Conflict Resolution" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-8 h-8 bg-[#471396] text-white rounded-full flex items-center justify-center font-semibold", children: "3" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { children: "Emotional Intelligence" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-8 h-8 bg-[#471396] text-white rounded-full flex items-center justify-center font-semibold", children: "4" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { children: "Love Languages" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-8 h-8 bg-[#471396] text-white rounded-full flex items-center justify-center font-semibold", children: "5" }),
          /* @__PURE__ */ jsxRuntime.jsx("span", { children: "Additional Relationship Factors" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mt-8 text-center", children: /* @__PURE__ */ jsxRuntime.jsx("button", { className: "bg-[#B13BFF] text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors", children: "Begin Assessment" }) })
    ] })
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AssessmentIndex
}, Symbol.toStringTag, { value: "Module" }));
function cn(...inputs) {
  return tailwindMerge.twMerge(clsx.clsx(inputs));
}
const Button = react$1.forwardRef(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:-translate-y-0.5 active:scale-95";
    const variants = {
      primary: "bg-gradient-to-r from-[#471396] to-[#B13BFF] text-white hover:from-[#5a1bb8] hover:to-[#c44fff] focus:ring-[#B13BFF]/50 shadow-lg hover:shadow-xl",
      secondary: "bg-gradient-to-r from-[#FFCC00] to-[#FFB800] text-[#090040] hover:from-[#FFD700] hover:to-[#FFC000] focus:ring-[#FFCC00]/50 shadow-lg hover:shadow-xl font-bold",
      outline: "border-2 border-white/30 text-white hover:bg-white/10 hover:border-white/50 focus:ring-white/50 backdrop-blur-sm",
      ghost: "text-white hover:bg-white/10 focus:ring-white/50"
    };
    const sizes = {
      sm: "px-5 py-2.5 text-sm min-h-[40px]",
      md: "px-7 py-3.5 text-base min-h-[48px]",
      lg: "px-9 py-4.5 text-lg min-h-[56px]"
    };
    return /* @__PURE__ */ jsxRuntime.jsx(
      "button",
      {
        ref,
        className: cn(baseStyles, variants[variant], sizes[size], className),
        ...props,
        children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "relative z-10", children })
      }
    );
  }
);
Button.displayName = "Button";
function AssessmentIntro() {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "max-w-3xl mx-auto text-white", children: [
    /* @__PURE__ */ jsxRuntime.jsx("h1", { className: "text-4xl font-bold mb-6 text-center", children: "Welcome to Your Relationship Assessment" }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8", children: [
      /* @__PURE__ */ jsxRuntime.jsx("h2", { className: "text-2xl font-semibold mb-4", children: "What to Expect" }),
      /* @__PURE__ */ jsxRuntime.jsx("p", { className: "mb-4", children: "You're about to begin a comprehensive assessment that will help you understand your relationship patterns and tendencies." }),
      /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "list-disc list-inside space-y-2 mb-6", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("li", { children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: "50 questions" }),
          " across 5 psychological domains"
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("li", { children: [
          "Takes approximately ",
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: "15-20 minutes" }),
          " to complete"
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("li", { children: [
          "Your answers are ",
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: "automatically saved" }),
          " as you progress"
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("li", { children: [
          "You'll receive a ",
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-medium", children: "detailed AI analysis" }),
          " of your relationship style"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "text-xl font-semibold mb-2", children: "The 5 Assessment Areas:" }),
      /* @__PURE__ */ jsxRuntime.jsx("ol", { className: "list-decimal list-inside space-y-2 mb-6", children: config.assessment.sections.map((section) => /* @__PURE__ */ jsxRuntime.jsxs("li", { className: "font-medium", children: [
        section.title,
        " ",
        /* @__PURE__ */ jsxRuntime.jsxs("span", { className: "text-sm font-normal", children: [
          "(",
          section.questionCount,
          " questions)"
        ] })
      ] }, section.id)) }),
      /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-yellow-400/20 border-l-4 border-[#FFCC00] p-4 rounded", children: /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-sm", children: [
        /* @__PURE__ */ jsxRuntime.jsx("strong", { children: "Note:" }),
        " This assessment is for educational purposes only and is not a substitute for professional advice, diagnosis, or treatment."
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntime.jsx(react.Link, { to: "/assessment/section/1", children: /* @__PURE__ */ jsxRuntime.jsx(Button, { variant: "secondary", size: "lg", children: "Begin Assessment" }) }) })
  ] });
}
const route3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AssessmentIntro
}, Symbol.toStringTag, { value: "Module" }));
async function requireAuth(args) {
  const { userId } = await ssr_server.getAuth(args);
  if (!userId) {
    throw node.redirect("/sign-in");
  }
  return userId;
}
async function loader(args) {
  return requireAuth(args);
}
function AssessmentLayout() {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "min-h-screen bg-gradient-to-br from-[#090040] via-[#471396] to-[#B13BFF]", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntime.jsx(react.Outlet, {}) }) });
}
const route4 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: AssessmentLayout,
  loader
}, Symbol.toStringTag, { value: "Module" }));
function SignInPage() {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "min-h-screen bg-gradient-to-br from-[#090040] via-[#471396] to-[#B13BFF] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white rounded-lg shadow-xl p-8", children: /* @__PURE__ */ jsxRuntime.jsx(
    remix.SignIn,
    {
      routing: "path",
      path: "/sign-in",
      signUpUrl: "/sign-up",
      afterSignInUrl: "/assessment"
    }
  ) }) });
}
const route5 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SignInPage
}, Symbol.toStringTag, { value: "Module" }));
function SignUpPage() {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "min-h-screen bg-gradient-to-br from-[#090040] via-[#471396] to-[#B13BFF] flex items-center justify-center", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "bg-white rounded-lg shadow-xl p-8", children: /* @__PURE__ */ jsxRuntime.jsx(
    remix.SignUp,
    {
      routing: "path",
      path: "/sign-up",
      signInUrl: "/sign-in",
      afterSignUpUrl: "/assessment/intro"
    }
  ) }) });
}
const route6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: SignUpPage
}, Symbol.toStringTag, { value: "Module" }));
const meta$1 = () => {
  return [
    { title: "Results - Relationship Mojo" },
    { name: "description", content: "View your personalized relationship analysis and insights." }
  ];
};
function ResultsLayout() {
  return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "min-h-screen bg-gray-50", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntime.jsx(react.Outlet, {}) }) });
}
const route7 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ResultsLayout,
  meta: meta$1
}, Symbol.toStringTag, { value: "Module" }));
function Header() {
  var _a;
  const { isSignedIn, user } = remix.useUser();
  return /* @__PURE__ */ jsxRuntime.jsx("header", { className: "bg-[#090040] text-white py-4", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "container mx-auto px-4 flex justify-between items-center", children: [
    /* @__PURE__ */ jsxRuntime.jsxs(react.Link, { to: "/", className: "flex items-center space-x-2", children: [
      /* @__PURE__ */ jsxRuntime.jsx(
        "img",
        {
          src: "/logo-light.png",
          alt: config.app.name,
          className: "h-8 w-auto"
        }
      ),
      /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-bold text-xl", children: config.app.name })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("nav", { className: "hidden md:flex items-center space-x-6", children: [
      /* @__PURE__ */ jsxRuntime.jsx(react.Link, { to: "/", className: "hover:text-[#FFCC00] transition-colors", children: "Home" }),
      /* @__PURE__ */ jsxRuntime.jsx(react.Link, { to: "/about", className: "hover:text-[#FFCC00] transition-colors", children: "About" }),
      /* @__PURE__ */ jsxRuntime.jsx(react.Link, { to: "/how-it-works", className: "hover:text-[#FFCC00] transition-colors", children: "How It Works" })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex items-center space-x-4", children: isSignedIn ? /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center space-x-4", children: [
      /* @__PURE__ */ jsxRuntime.jsx(react.Link, { to: "/dashboard", children: /* @__PURE__ */ jsxRuntime.jsx(Button, { variant: "outline", size: "sm", children: "Dashboard" }) }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "relative group", children: [
        /* @__PURE__ */ jsxRuntime.jsx("button", { className: "flex items-center space-x-2", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-8 h-8 rounded-full bg-[#471396] flex items-center justify-center", children: ((_a = user == null ? void 0 : user.firstName) == null ? void 0 : _a[0]) || "U" }) }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-1 z-10 hidden group-hover:block", children: [
          /* @__PURE__ */ jsxRuntime.jsx(react.Link, { to: "/profile", className: "block px-4 py-2 hover:bg-gray-100", children: "Profile" }),
          /* @__PURE__ */ jsxRuntime.jsx(react.Link, { to: "/settings", className: "block px-4 py-2 hover:bg-gray-100", children: "Settings" }),
          /* @__PURE__ */ jsxRuntime.jsx(react.Link, { to: "/sign-out", className: "block px-4 py-2 hover:bg-gray-100", children: "Sign Out" })
        ] })
      ] })
    ] }) : /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center space-x-4", children: [
      /* @__PURE__ */ jsxRuntime.jsx(react.Link, { to: "/sign-in", children: /* @__PURE__ */ jsxRuntime.jsx(Button, { variant: "ghost", size: "sm", children: "Sign In" }) }),
      /* @__PURE__ */ jsxRuntime.jsx(react.Link, { to: "/sign-up", children: /* @__PURE__ */ jsxRuntime.jsx(Button, { variant: "secondary", size: "sm", children: "Sign Up" }) })
    ] }) })
  ] }) });
}
function Footer() {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsxRuntime.jsx("footer", { className: "bg-[#090040] text-white py-8", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "container mx-auto px-4", children: [
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-8", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntime.jsxs(react.Link, { to: "/", className: "flex items-center space-x-2 mb-4", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "img",
            {
              src: "/logo-light.png",
              alt: config.app.name,
              className: "h-8 w-auto"
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "font-bold text-xl", children: config.app.name })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-sm text-gray-300", children: config.app.description })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "font-semibold text-lg mb-4", children: "Quick Links" }),
        /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsx(react.Link, { to: "/", className: "text-gray-300 hover:text-[#FFCC00] transition-colors", children: "Home" }) }),
          /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsx(react.Link, { to: "/about", className: "text-gray-300 hover:text-[#FFCC00] transition-colors", children: "About" }) }),
          /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsx(react.Link, { to: "/how-it-works", className: "text-gray-300 hover:text-[#FFCC00] transition-colors", children: "How It Works" }) }),
          /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsx(react.Link, { to: "/assessment", className: "text-gray-300 hover:text-[#FFCC00] transition-colors", children: "Take Assessment" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "font-semibold text-lg mb-4", children: "Resources" }),
        /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsx(react.Link, { to: "/faq", className: "text-gray-300 hover:text-[#FFCC00] transition-colors", children: "FAQ" }) }),
          /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsx(react.Link, { to: "/blog", className: "text-gray-300 hover:text-[#FFCC00] transition-colors", children: "Blog" }) }),
          /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsx(react.Link, { to: "/support", className: "text-gray-300 hover:text-[#FFCC00] transition-colors", children: "Support" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "font-semibold text-lg mb-4", children: "Legal" }),
        /* @__PURE__ */ jsxRuntime.jsxs("ul", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsx(react.Link, { to: "/privacy", className: "text-gray-300 hover:text-[#FFCC00] transition-colors", children: "Privacy Policy" }) }),
          /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsx(react.Link, { to: "/terms", className: "text-gray-300 hover:text-[#FFCC00] transition-colors", children: "Terms of Service" }) }),
          /* @__PURE__ */ jsxRuntime.jsx("li", { children: /* @__PURE__ */ jsxRuntime.jsx(react.Link, { to: "/disclaimer", className: "text-gray-300 hover:text-[#FFCC00] transition-colors", children: "Disclaimer" }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center", children: [
      /* @__PURE__ */ jsxRuntime.jsxs("p", { className: "text-sm text-gray-400", children: [
        "© ",
        currentYear,
        " ",
        config.app.name,
        ". All rights reserved."
      ] }),
      /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex space-x-4 mt-4 md:mt-0", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("a", { href: "#", className: "text-gray-400 hover:text-[#FFCC00]", children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: "Twitter" }),
          /* @__PURE__ */ jsxRuntime.jsx("svg", { className: "h-6 w-6", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntime.jsx("path", { d: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("a", { href: "#", className: "text-gray-400 hover:text-[#FFCC00]", children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: "Instagram" }),
          /* @__PURE__ */ jsxRuntime.jsx("svg", { className: "h-6 w-6", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntime.jsx("path", { fillRule: "evenodd", d: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z", clipRule: "evenodd" }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsxs("a", { href: "#", className: "text-gray-400 hover:text-[#FFCC00]", children: [
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "sr-only", children: "Facebook" }),
          /* @__PURE__ */ jsxRuntime.jsx("svg", { className: "h-6 w-6", fill: "currentColor", viewBox: "0 0 24 24", "aria-hidden": "true", children: /* @__PURE__ */ jsxRuntime.jsx("path", { fillRule: "evenodd", d: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z", clipRule: "evenodd" }) })
        ] })
      ] })
    ] })
  ] }) });
}
const meta = () => {
  return [
    { title: "Relationship Mojo - Discover Your Relationship Style" },
    { name: "description", content: "AI-powered relationship analysis to help you understand your relationship patterns and tendencies." },
    { name: "viewport", content: "width=device-width, initial-scale=1" }
  ];
};
function Index() {
  return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "min-h-screen bg-gradient-to-br from-[#090040] via-[#471396] to-[#B13BFF] relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntime.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntime.jsx("main", { className: "relative z-10", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "container mx-auto px-4 mobile:px-6", children: [
      /* @__PURE__ */ jsxRuntime.jsx("section", { className: "py-16 lg:py-24 text-center", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "max-w-4xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntime.jsx("h1", { className: "text-4xl lg:text-6xl font-bold text-white mb-6", children: "Discover Your Relationship Mojo" }),
        /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-xl lg:text-2xl text-white/80 mb-8 max-w-3xl mx-auto", children: "AI-powered relationship analysis to help you understand your patterns and build stronger connections." }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center items-center", children: [
          /* @__PURE__ */ jsxRuntime.jsx(react.Link, { to: "/assessment/intro", children: /* @__PURE__ */ jsxRuntime.jsx(Button, { variant: "secondary", size: "lg", className: "min-w-[240px]", children: "Start Free Assessment →" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(react.Link, { to: "/about", children: /* @__PURE__ */ jsxRuntime.jsx(Button, { variant: "outline", size: "lg", className: "min-w-[240px]", children: "Learn More" }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx("section", { className: "py-16 lg:py-24", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "max-w-6xl mx-auto", children: [
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "text-center mb-16", children: [
          /* @__PURE__ */ jsxRuntime.jsx("h2", { className: "text-3xl lg:text-4xl font-bold text-white mb-4", children: "Why Choose Relationship Mojo?" }),
          /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-lg text-white/80 max-w-2xl mx-auto", children: "Discover the science-backed approach to understanding your relationship patterns" })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10", children: [
          {
            icon: "🧠",
            title: "Science-Based Analysis",
            description: "Built on established psychological frameworks including Attachment Theory and Love Languages"
          },
          {
            icon: "🎯",
            title: "Personalized Insights",
            description: "Get tailored recommendations based on your unique relationship patterns and communication style"
          },
          {
            icon: "🔒",
            title: "Private & Secure",
            description: "Your data is encrypted and private. Take the assessment anonymously if you prefer"
          },
          {
            icon: "📊",
            title: "Comprehensive Assessment",
            description: "50 carefully crafted questions covering attachment style, communication, and emotional intelligence"
          },
          {
            icon: "💡",
            title: "Actionable Advice",
            description: "Receive specific strategies and tips to improve your relationships and communication"
          },
          {
            icon: "🚀",
            title: "Instant Results",
            description: "Get your detailed analysis immediately after completing the assessment"
          }
        ].map((feature, index) => /* @__PURE__ */ jsxRuntime.jsxs(
          "div",
          {
            className: "bg-white/8 backdrop-blur-md rounded-3xl p-8 text-center text-white border border-white/15 shadow-2xl hover:bg-white/12 transition-all duration-300",
            children: [
              /* @__PURE__ */ jsxRuntime.jsx("div", { className: "w-24 h-24 bg-gradient-to-br from-[#FFCC00]/25 to-[#B13BFF]/25 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/25", children: /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-4xl", children: feature.icon }) }),
              /* @__PURE__ */ jsxRuntime.jsx("h3", { className: "text-xl font-bold mb-4", children: feature.title }),
              /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-white/80 leading-relaxed", children: feature.description })
            ]
          },
          index
        )) })
      ] }) }),
      /* @__PURE__ */ jsxRuntime.jsx("section", { className: "py-16 lg:py-24", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "max-w-4xl mx-auto text-center", children: /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "bg-white/5 backdrop-blur-md rounded-3xl p-8 lg:p-12 border border-white/20 shadow-2xl", children: [
        /* @__PURE__ */ jsxRuntime.jsx("h2", { className: "text-3xl lg:text-4xl font-bold text-white mb-6", children: "Ready to Transform Your Relationships?" }),
        /* @__PURE__ */ jsxRuntime.jsx("p", { className: "text-lg lg:text-xl text-white/80 mb-8 max-w-2xl mx-auto", children: "Join thousands who have discovered their relationship patterns and built stronger, more fulfilling connections." }),
        /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center items-center", children: [
          /* @__PURE__ */ jsxRuntime.jsx(react.Link, { to: "/assessment/intro", children: /* @__PURE__ */ jsxRuntime.jsx(Button, { variant: "secondary", size: "lg", className: "min-w-[240px]", children: "Start Free Assessment →" }) }),
          /* @__PURE__ */ jsxRuntime.jsx(react.Link, { to: "/about", children: /* @__PURE__ */ jsxRuntime.jsx(Button, { variant: "outline", size: "lg", className: "min-w-[240px]", children: "Learn More" }) })
        ] }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "mt-8 pt-6 border-t border-white/20", children: /* @__PURE__ */ jsxRuntime.jsx("div", { className: "flex flex-wrap justify-center items-center gap-6 text-white/70", children: [
          { text: "100% Free", color: "#FFCC00" },
          { text: "Science-Based", color: "#B13BFF" },
          { text: "Private & Secure", color: "#10B981" }
        ].map((item, index) => /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntime.jsx(
            "div",
            {
              className: "w-2.5 h-2.5 rounded-full",
              style: { backgroundColor: item.color }
            }
          ),
          /* @__PURE__ */ jsxRuntime.jsx("span", { className: "text-sm sm:text-base font-medium", children: item.text })
        ] }, index)) }) })
      ] }) }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntime.jsx(Footer, {})
  ] });
}
const route8 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-Ca_heF8r.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/index-DAIS7bKj.js", "/assets/components-CFjjCa5P.js", "/assets/browser-Dj-8wM2I.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-Bi2rsKNO.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/index-DAIS7bKj.js", "/assets/components-CFjjCa5P.js", "/assets/browser-Dj-8wM2I.js", "/assets/index-Cifxc9O-.js"], "css": ["/assets/root-DVyitzom.css"] }, "routes/assessment.section.$sectionId": { "id": "routes/assessment.section.$sectionId", "parentId": "routes/assessment", "path": "section/:sectionId", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/assessment.section._sectionId-BatD7mv7.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/index-DAIS7bKj.js", "/assets/config-B0IFH7mz.js", "/assets/components-CFjjCa5P.js"], "css": [] }, "routes/assessment._index": { "id": "routes/assessment._index", "parentId": "routes/assessment", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/assessment._index-D_ld5bh5.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js"], "css": [] }, "routes/assessment.intro": { "id": "routes/assessment.intro", "parentId": "routes/assessment", "path": "intro", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/assessment.intro-BtEXWA2j.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/Button-BMAhzgCw.js", "/assets/config-B0IFH7mz.js", "/assets/components-CFjjCa5P.js", "/assets/index-DAIS7bKj.js"], "css": [] }, "routes/assessment": { "id": "routes/assessment", "parentId": "root", "path": "assessment", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/assessment-rsyuW6JD.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/index-DAIS7bKj.js"], "css": [] }, "routes/sign-in.$": { "id": "routes/sign-in.$", "parentId": "root", "path": "sign-in/*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/sign-in._-Dslfx2D0.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/index-Cifxc9O-.js", "/assets/index-DAIS7bKj.js", "/assets/components-CFjjCa5P.js", "/assets/browser-Dj-8wM2I.js"], "css": [] }, "routes/sign-up.$": { "id": "routes/sign-up.$", "parentId": "root", "path": "sign-up/*", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/sign-up._-DrzTXuOn.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/index-Cifxc9O-.js", "/assets/index-DAIS7bKj.js", "/assets/components-CFjjCa5P.js", "/assets/browser-Dj-8wM2I.js"], "css": [] }, "routes/results": { "id": "routes/results", "parentId": "root", "path": "results", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/results-C134c_6F.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/index-DAIS7bKj.js"], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-Bdfb2sTk.js", "imports": ["/assets/jsx-runtime-0DLF9kdB.js", "/assets/index-Cifxc9O-.js", "/assets/Button-BMAhzgCw.js", "/assets/config-B0IFH7mz.js", "/assets/components-CFjjCa5P.js", "/assets/index-DAIS7bKj.js", "/assets/browser-Dj-8wM2I.js"], "css": [] } }, "url": "/assets/manifest-84d66c8f.js", "version": "84d66c8f" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_routeConfig": false, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/assessment.section.$sectionId": {
    id: "routes/assessment.section.$sectionId",
    parentId: "routes/assessment",
    path: "section/:sectionId",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/assessment._index": {
    id: "routes/assessment._index",
    parentId: "routes/assessment",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  },
  "routes/assessment.intro": {
    id: "routes/assessment.intro",
    parentId: "routes/assessment",
    path: "intro",
    index: void 0,
    caseSensitive: void 0,
    module: route3
  },
  "routes/assessment": {
    id: "routes/assessment",
    parentId: "root",
    path: "assessment",
    index: void 0,
    caseSensitive: void 0,
    module: route4
  },
  "routes/sign-in.$": {
    id: "routes/sign-in.$",
    parentId: "root",
    path: "sign-in/*",
    index: void 0,
    caseSensitive: void 0,
    module: route5
  },
  "routes/sign-up.$": {
    id: "routes/sign-up.$",
    parentId: "root",
    path: "sign-up/*",
    index: void 0,
    caseSensitive: void 0,
    module: route6
  },
  "routes/results": {
    id: "routes/results",
    parentId: "root",
    path: "results",
    index: void 0,
    caseSensitive: void 0,
    module: route7
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route8
  }
};
exports.assets = serverManifest;
exports.assetsBuildDirectory = assetsBuildDirectory;
exports.basename = basename;
exports.entry = entry;
exports.future = future;
exports.isSpaMode = isSpaMode;
exports.mode = mode;
exports.publicPath = publicPath;
exports.routes = routes;

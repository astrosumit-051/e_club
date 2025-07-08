
import { WeekModule } from "./types"

export const CURRICULUM_WEEKS: WeekModule[] = [
  {
    weekNumber: 1,
    title: "Problem Discovery & Empathy-Driven Innovation",
    theme: "Finding Problems Worth Solving",
    learningObjectives: [
      "Apply Design Thinking principles to identify meaningful problems",
      "Conduct effective customer discovery interviews using 'The Mom Test' methodology",
      "Distinguish between symptoms and root causes of problems",
      "Evaluate problem significance using impact assessment frameworks",
      "Develop empathy maps and user personas for target audiences"
    ],
    content: {
      videos: [
        {
          title: "Introduction to Design Thinking",
          description: "Stanford d.school methodology and MIT's 'mind and hand' philosophy",
          duration: "25 minutes",
          placeholder: true
        },
        {
          title: "The Art of Customer Discovery",
          description: "How to conduct unbiased customer interviews",
          duration: "30 minutes",
          placeholder: true
        },
        {
          title: "From Problems to Opportunities",
          description: "Identifying and validating meaningful problems",
          duration: "22 minutes",
          placeholder: true
        }
      ],
      readings: [
        {
          title: "Design Thinking Fundamentals",
          type: "guide",
          content: "Design Thinking is a human-centered approach to innovation that integrates the needs of people, the possibilities of technology, and requirements for business success. The process involves five key stages: Empathize, Define, Ideate, Prototype, and Test. This methodology helps entrepreneurs understand their users deeply and create solutions that truly meet their needs."
        },
        {
          title: "The Mom Test Framework",
          type: "framework",
          content: "The Mom Test is a methodology for customer discovery interviews that helps you ask better questions and get honest feedback. Key principles: 1) Talk about their life instead of your idea, 2) Ask about specifics in the past instead of generics or opinions about the future, 3) Talk less and listen more. Good questions focus on their world, bad questions are about your world."
        }
      ],
      activities: [
        {
          title: "Customer Discovery Interview Template",
          type: "template",
          description: "Structured template for conducting effective customer interviews",
          instructions: [
            "Identify 5-7 potential customers in your target segment",
            "Schedule 20-30 minute conversations using the provided script",
            "Focus on understanding their current problems and pain points",
            "Document insights using the empathy map template",
            "Synthesize findings to identify patterns and opportunities"
          ]
        },
        {
          title: "Empathy Map Creation",
          type: "exercise",
          description: "Visual tool to capture what users say, think, feel, and do",
          instructions: [
            "Choose your primary user persona",
            "Fill out each quadrant based on interview insights",
            "Identify pain points and gains",
            "Validate assumptions with additional research"
          ]
        }
      ]
    },
    caseStudies: ["Grammarly"],
    achievements: ["Discovery Badge", "Empathy Champion", "Problem Validator"]
  },
  {
    weekNumber: 2,
    title: "Solution Ideation & Lean Validation",
    theme: "From Problems to Possibilities",
    learningObjectives: [
      "Generate multiple solution approaches using structured ideation techniques",
      "Apply Lean Startup methodology to formulate testable hypotheses",
      "Design and conduct solution validation experiments",
      "Create compelling value propositions using proven frameworks",
      "Understand product-market fit and early indicators"
    ],
    content: {
      videos: [
        {
          title: "Lean Startup Methodology Deep Dive",
          description: "Build-Measure-Learn cycles and hypothesis testing",
          duration: "28 minutes",
          placeholder: true
        },
        {
          title: "Solution Ideation Techniques",
          description: "Structured brainstorming and creative problem solving",
          duration: "24 minutes",
          placeholder: true
        },
        {
          title: "Value Proposition Design",
          description: "Creating compelling value propositions that resonate",
          duration: "26 minutes",
          placeholder: true
        }
      ],
      readings: [
        {
          title: "Lean Startup Principles",
          type: "guide",
          content: "The Lean Startup methodology is built on the principle of validated learning through scientific experimentation. Key concepts include: Minimum Viable Product (MVP), Build-Measure-Learn feedback loops, Innovation Accounting, and Pivot or Persevere decisions. This approach helps entrepreneurs test their assumptions quickly and cost-effectively."
        },
        {
          title: "Value Proposition Canvas",
          type: "framework",
          content: "The Value Proposition Canvas helps you design value propositions that customers want. It has two sides: Customer Profile (jobs, pains, gains) and Value Map (products/services, pain relievers, gain creators). The goal is to achieve fit between what you offer and what customers need."
        }
      ],
      activities: [
        {
          title: "Solution Brainstorming Workshop",
          type: "exercise",
          description: "Generate multiple solution approaches for your identified problem",
          instructions: [
            "Use divergent thinking to generate 15-20 potential solutions",
            "Apply convergent thinking to select top 3 solutions",
            "Evaluate each solution on feasibility, desirability, and viability",
            "Choose one solution for further development"
          ]
        },
        {
          title: "Hypothesis Formation & Testing",
          type: "template",
          description: "Structure your assumptions as testable hypotheses",
          instructions: [
            "Identify key assumptions about your solution",
            "Format as testable hypotheses",
            "Design simple experiments to validate/invalidate",
            "Define success metrics and criteria"
          ]
        }
      ]
    },
    caseStudies: ["Notion", "Warby Parker"],
    achievements: ["Ideation Innovator", "Validation Virtuoso", "Hypothesis Hero"]
  },
  {
    weekNumber: 3,
    title: "Prototyping & MVP Development",
    theme: "Building to Learn",
    learningObjectives: [
      "Design and build low-fidelity prototypes using no-code tools",
      "Apply MVP principles to create testable product versions",
      "Conduct user testing sessions and gather actionable feedback",
      "Iterate rapidly based on user insights and data",
      "Understand different prototyping approaches for various business models"
    ],
    content: {
      videos: [
        {
          title: "No-Code Development Masterclass",
          description: "Building functional prototypes with Bubble, Figma, and Webflow",
          duration: "35 minutes",
          placeholder: true
        },
        {
          title: "User Testing Best Practices",
          description: "How to conduct effective user testing sessions",
          duration: "20 minutes",
          placeholder: true
        },
        {
          title: "MVP Design Principles",
          description: "Building the right product with minimal resources",
          duration: "25 minutes",
          placeholder: true
        }
      ],
      readings: [
        {
          title: "MVP Development Guide",
          type: "guide",
          content: "A Minimum Viable Product (MVP) is the simplest version of your product that allows you to learn the most about your customers with the least effort. Types of MVPs include: Landing page, Concierge MVP, Wizard of Oz, Prototype, and Single-feature MVP. Choose based on your hypothesis and available resources."
        },
        {
          title: "No-Code Tool Comparison",
          type: "guide",
          content: "Popular no-code tools for entrepreneurs: Bubble (web apps), Figma (design prototypes), Webflow (websites), Airtable (databases), Zapier (automation). Each tool has strengths for different types of products and use cases."
        }
      ],
      activities: [
        {
          title: "MVP Planning Workshop",
          type: "exercise",
          description: "Define and scope your minimum viable product",
          instructions: [
            "Identify core features for your MVP",
            "Choose appropriate no-code tools",
            "Create development timeline and milestones",
            "Set user testing goals and metrics"
          ]
        },
        {
          title: "User Testing Protocol",
          type: "template",
          description: "Structured approach to gathering user feedback",
          instructions: [
            "Define testing objectives and questions",
            "Recruit 5-8 target users for testing",
            "Prepare testing scenarios and tasks",
            "Document findings and iterate on design"
          ]
        }
      ]
    },
    caseStudies: ["Warby Parker", "Zocdoc"],
    achievements: ["Prototype Pioneer", "User Whisperer", "Technical Trailblazer"]
  },
  {
    weekNumber: 4,
    title: "Business Model Design & Market Strategy",
    theme: "Creating Sustainable Value",
    learningObjectives: [
      "Design comprehensive business models using proven frameworks",
      "Develop go-to-market strategies for different customer segments",
      "Understand revenue models and pricing strategies",
      "Create financial projections and unit economics",
      "Analyze competitive landscapes and positioning strategies"
    ],
    content: {
      videos: [
        {
          title: "Business Model Canvas Masterclass",
          description: "Complete guide to business model design",
          duration: "32 minutes",
          placeholder: true
        },
        {
          title: "Go-to-Market Strategy Development",
          description: "From product to market success",
          duration: "28 minutes",
          placeholder: true
        },
        {
          title: "Financial Modeling for Startups",
          description: "Unit economics, projections, and key metrics",
          duration: "30 minutes",
          placeholder: true
        }
      ],
      readings: [
        {
          title: "Business Model Canvas Guide",
          type: "framework",
          content: "The Business Model Canvas is a visual tool with 9 building blocks: Customer Segments, Value Propositions, Channels, Customer Relationships, Revenue Streams, Key Resources, Key Activities, Key Partnerships, and Cost Structure. It helps you understand how your business creates, delivers, and captures value."
        },
        {
          title: "Revenue Model Strategies",
          type: "guide",
          content: "Common revenue models include: Subscription (recurring), Transaction (per use), Freemium (free + premium), Marketplace (commission), Advertising (attention-based), and Direct sales (one-time). Choose based on your value proposition and customer behavior."
        }
      ],
      activities: [
        {
          title: "Business Model Canvas Workshop",
          type: "template",
          description: "Complete business model visualization",
          instructions: [
            "Fill out all 9 building blocks of the canvas",
            "Validate key assumptions with research",
            "Identify potential risks and dependencies",
            "Create multiple model variations for testing"
          ]
        },
        {
          title: "Competitive Analysis Framework",
          type: "exercise",
          description: "Analyze your competitive landscape",
          instructions: [
            "Identify direct and indirect competitors",
            "Map competitive positioning",
            "Analyze strengths, weaknesses, and opportunities",
            "Define your unique value proposition"
          ]
        }
      ]
    },
    caseStudies: ["Chobani", "TOMS"],
    achievements: ["Business Model Architect", "Market Strategist", "Financial Forecaster"]
  },
  {
    weekNumber: 5,
    title: "Pitching, Storytelling & Fundraising Fundamentals",
    theme: "Communicating Your Vision",
    learningObjectives: [
      "Craft compelling startup narratives and pitch decks",
      "Deliver confident and persuasive presentations",
      "Understand fundraising landscape and investor perspectives",
      "Navigate legal and regulatory considerations",
      "Build networks and strategic partnerships"
    ],
    content: {
      videos: [
        {
          title: "The Perfect Pitch Deck",
          description: "Structure, design, and storytelling for investor presentations",
          duration: "30 minutes",
          placeholder: true
        },
        {
          title: "Fundraising Fundamentals",
          description: "Understanding investors, valuations, and funding rounds",
          duration: "35 minutes",
          placeholder: true
        },
        {
          title: "Presentation Skills for Entrepreneurs",
          description: "Confident delivery and handling Q&A sessions",
          duration: "25 minutes",
          placeholder: true
        }
      ],
      readings: [
        {
          title: "Pitch Deck Best Practices",
          type: "guide",
          content: "A great pitch deck tells a compelling story in 10-12 slides: Problem, Solution, Market, Business Model, Traction, Competition, Team, Financials, Funding Ask, and Use of Funds. Keep it visual, data-driven, and focused on the most important information."
        },
        {
          title: "Investor Landscape Overview",
          type: "guide",
          content: "Types of investors include: Angel investors (individuals), Venture Capital (firms), Accelerators (programs + funding), Crowdfunding (platforms), and Government grants. Each has different expectations, check sizes, and involvement levels."
        }
      ],
      activities: [
        {
          title: "Pitch Deck Creation",
          type: "template",
          description: "Build your investor presentation",
          instructions: [
            "Follow the standard pitch deck structure",
            "Include compelling visuals and data",
            "Practice your story narrative",
            "Prepare for common investor questions"
          ]
        },
        {
          title: "Investor Research & Outreach",
          type: "exercise",
          description: "Identify and connect with potential investors",
          instructions: [
            "Research investors in your industry/stage",
            "Understand their investment thesis",
            "Craft personalized outreach messages",
            "Build relationships before you need funding"
          ]
        }
      ]
    },
    caseStudies: ["Zocdoc", "Grammarly"],
    achievements: ["Pitch Perfect", "Story Weaver", "Investor Magnet"]
  },
  {
    weekNumber: 6,
    title: "Scaling Strategies & Ecosystem Navigation",
    theme: "Building for Growth and Impact",
    learningObjectives: [
      "Develop scaling strategies for different business models",
      "Navigate startup ecosystems and support resources",
      "Plan international expansion and market entry",
      "Integrate advanced technologies and AI tools",
      "Create actionable next steps and career pathways"
    ],
    content: {
      videos: [
        {
          title: "Scaling Your Startup",
          description: "Growth frameworks and expansion strategies",
          duration: "32 minutes",
          placeholder: true
        },
        {
          title: "Global Market Expansion",
          description: "International scaling and market entry",
          duration: "28 minutes",
          placeholder: true
        },
        {
          title: "AI Integration for Startups",
          description: "Leveraging AI tools for business operations",
          duration: "26 minutes",
          placeholder: true
        }
      ],
      readings: [
        {
          title: "Scaling Strategies Framework",
          type: "framework",
          content: "Scaling strategies include: Product scaling (features, platforms), Market scaling (segments, geography), Operations scaling (team, processes), and Technology scaling (infrastructure, automation). Choose strategies that align with your business model and resources."
        },
        {
          title: "Startup Ecosystem Navigation",
          type: "guide",
          content: "Startup ecosystems include: Accelerators, Incubators, Venture capital, Angel networks, Government programs, University resources, and Industry associations. Understanding how to navigate and leverage these resources is crucial for growth."
        }
      ],
      activities: [
        {
          title: "Scaling Strategy Development",
          type: "exercise",
          description: "Create your growth and expansion plan",
          instructions: [
            "Analyze your scalability constraints",
            "Develop 6-month and 12-month growth plans",
            "Identify required resources and partnerships",
            "Create risk mitigation strategies"
          ]
        },
        {
          title: "Next Steps Action Plan",
          type: "template",
          description: "Define your post-course action plan",
          instructions: [
            "Set specific, measurable goals",
            "Identify required resources and support",
            "Create timeline and milestones",
            "Plan for continued learning and development"
          ]
        }
      ]
    },
    caseStudies: ["Grammarly", "Warby Parker", "Chobani"],
    achievements: ["Scaling Strategist", "Global Visionary", "AI Integrator", "Ecosystem Navigator"]
  }
]

export const ACHIEVEMENT_DEFINITIONS = [
  { id: "discovery", name: "Discovery Badge", description: "Completed first customer interview", iconName: "Search", category: "discovery", points: 100 },
  { id: "empathy", name: "Empathy Champion", description: "Created insightful empathy map", iconName: "Heart", category: "discovery", points: 150 },
  { id: "problem", name: "Problem Validator", description: "Identified problem with quantifiable impact", iconName: "Target", category: "discovery", points: 200 },
  { id: "ideation", name: "Ideation Innovator", description: "Generated 10+ unique solutions", iconName: "Lightbulb", category: "innovation", points: 150 },
  { id: "validation", name: "Validation Virtuoso", description: "Most creative validation experiment", iconName: "CheckCircle", category: "innovation", points: 200 },
  { id: "hypothesis", name: "Hypothesis Hero", description: "Best-structured testable hypothesis", iconName: "FlaskConical", category: "innovation", points: 175 },
  { id: "prototype", name: "Prototype Pioneer", description: "Completed functional prototype", iconName: "Wrench", category: "innovation", points: 250 },
  { id: "user", name: "User Whisperer", description: "Most valuable user insights", iconName: "Users", category: "innovation", points: 200 },
  { id: "technical", name: "Technical Trailblazer", description: "Innovative use of no-code tools", iconName: "Code", category: "innovation", points: 225 },
  { id: "business", name: "Business Model Architect", description: "Comprehensive canvas completion", iconName: "Building", category: "business", points: 250 },
  { id: "market", name: "Market Strategist", description: "Innovative go-to-market approach", iconName: "TrendingUp", category: "business", points: 200 },
  { id: "financial", name: "Financial Forecaster", description: "Realistic detailed projections", iconName: "DollarSign", category: "business", points: 225 },
  { id: "pitch", name: "Pitch Perfect", description: "Compelling presentation delivery", iconName: "Presentation", category: "leadership", points: 300 },
  { id: "story", name: "Story Weaver", description: "Most engaging narrative", iconName: "BookOpen", category: "leadership", points: 250 },
  { id: "investor", name: "Investor Magnet", description: "Understanding investor perspectives", iconName: "Handshake", category: "leadership", points: 200 },
  { id: "scaling", name: "Scaling Strategist", description: "Comprehensive growth planning", iconName: "Rocket", category: "business", points: 275 },
  { id: "global", name: "Global Visionary", description: "International expansion strategy", iconName: "Globe", category: "business", points: 250 },
  { id: "ai", name: "AI Integrator", description: "Innovative technology adoption", iconName: "Brain", category: "innovation", points: 225 },
  { id: "ecosystem", name: "Ecosystem Navigator", description: "Resource identification and utilization", iconName: "Network", category: "leadership", points: 200 }
]

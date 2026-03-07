import type { ReactElement } from "react";
import type { BrandLogoEntry } from "./brand-logos";

export interface ServiceFeature {
  iconName: string; // Lucide icon name — resolved in the page component
  title: string;
  desc: string;
}

export interface ServiceFaq {
  q: string;
  a: string;
}

export interface ServicePageConfig {
  slug: string;
  pillarNumber: string;
  pillarId: string; // matches the id on What We Do page for cross-linking
  title: string; // AccentHeading H1 — use **bold** for accent words
  metaTitle: string;
  metaDescription: string;
  subtitle: string;
  gradient: string;
  glowColor: string;
  iconBg: string;
  iconColor: string;
  // Problem section
  problemHeading: string;
  problemText: string;
  problemBullets: string[];
  // Approach section
  approachHeading: string;
  approachText: string;
  approachBullets: string[];
  // Features — expanded
  features: ServiceFeature[];
  // FAQ
  faq: ServiceFaq[];
  // Logo set key — resolved in the page component
  logoSetKey?: "OUTBOUND_LOGOS" | "DIGITAL_LOGOS" | "AI_LOGOS" | "SYSTEMS_LOGOS";
  // CTA
  ctaHeading: string;
  ctaText: string;
}

export const SERVICE_CONFIGS: Record<string, ServicePageConfig> = {
  /* ─────────────────────────────────────────────────────
   * 1. OUTBOUND LEAD GENERATION
   * ───────────────────────────────────────────────────── */
  "lead-generation": {
    slug: "lead-generation",
    pillarNumber: "02",
    pillarId: "leads",
    title: "B2B lead generation that actually **fills your pipeline.**",
    metaTitle: "B2B Lead Generation Services | Outpace",
    metaDescription:
      "Multi-channel outbound lead generation — email sequences, AI-powered calling, prospect list building, and meeting booking. Fill your pipeline with qualified decision-makers.",
    subtitle:
      "Most businesses rely on referrals and hope for the best. We build a predictable outbound engine that puts your offer in front of the right decision-makers — every single week.",
    gradient: "from-emerald-400 to-teal-500",
    glowColor: "rgba(52, 211, 153, 0.15)",
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-400",

    problemHeading: "Referrals are brilliant — until they **dry up.**",
    problemText:
      "Most B2B companies have no predictable way to generate new business. Pipeline is feast or famine. When referrals slow down, there's nothing behind them — and by the time you notice, it's already too late.",
    problemBullets: [
      "No predictable pipeline — you don't know where next month's revenue is coming from",
      "Over-reliance on referrals and word-of-mouth that you can't control",
      "Sales team spending more time finding leads than closing them",
      "Previous agency campaigns that generated clicks but zero qualified meetings",
    ],

    approachHeading: "How we **fill your pipeline**",
    approachText:
      "We don't just send emails and hope. We build a complete outbound system — from identifying and verifying your ideal prospects to multi-channel campaigns that get replies. Email, phone, LinkedIn — whatever it takes to get your offer in front of the right person at the right time.",
    approachBullets: [
      "We start by mapping your ideal customer profile — who buys, why they buy, and where to find them",
      "We build verified prospect lists using data scraping and enrichment tools",
      "We run multi-channel sequences — email, AI-powered calling, and LinkedIn — so no decision-maker slips through",
      "We book qualified meetings directly into your calendar and hand them off warm",
    ],

    features: [
      {
        iconName: "Mail",
        title: "B2B Email Sequences",
        desc: "Personalised multi-step email campaigns that get opened, read, and replied to — not sent to spam.",
      },
      {
        iconName: "Phone",
        title: "AI-Powered Outbound Calling",
        desc: "AI voice agents that call prospects at scale, qualify interest, and book meetings for your team.",
      },
      {
        iconName: "Users",
        title: "Prospect List Building",
        desc: "Scraped, verified, and enriched prospect lists tailored to your ideal customer profile.",
      },
      {
        iconName: "Linkedin",
        title: "LinkedIn Outreach",
        desc: "Strategic connection requests and messaging sequences targeting decision-makers in your space.",
      },
      {
        iconName: "CalendarCheck",
        title: "Meeting Booking & Handoff",
        desc: "Qualified meetings booked directly into your calendar — warm introductions, not cold leads.",
      },
      {
        iconName: "Target",
        title: "Lead Scoring & Qualification",
        desc: "Every lead scored on fit and intent so your team focuses on the ones most likely to close.",
      },
      {
        iconName: "BarChart3",
        title: "Campaign Analytics & A/B Testing",
        desc: "Every subject line, message, and call script is tested and optimised for maximum response rates.",
      },
      {
        iconName: "TrendingUp",
        title: "Pipeline Reporting",
        desc: "Transparent dashboards showing exactly how many prospects were contacted, replied, and booked — in real time.",
      },
    ],

    faq: [
      {
        q: "How many leads can we expect per month?",
        a: "It depends on your market and offer, but most clients see 10-30 qualified meetings per month within the first 60 days. We'll give you realistic projections during the discovery call based on your specific situation.",
      },
      {
        q: "What industries do you work with?",
        a: "We specialise in B2B — security, construction, professional services, manufacturing, SaaS, and hospitality. If you sell to other businesses, we can likely help.",
      },
      {
        q: "How does the AI calling work?",
        a: "Our AI voice agents make outbound calls on your behalf, qualify prospects with natural-sounding conversations, and book meetings for interested leads. They work 24/7 and can handle hundreds of calls per day.",
      },
      {
        q: "Do you replace our sales team?",
        a: "No — we fill the top of your pipeline so your sales team can focus on what they do best: closing deals. We handle the prospecting; they handle the selling.",
      },
      {
        q: "How quickly can we start seeing results?",
        a: "Most campaigns are live within 2-3 weeks of kickoff. First qualified meetings typically come within 30 days. We move fast because pipeline waits for no one.",
      },
    ],

    logoSetKey: "OUTBOUND_LOGOS",

    ctaHeading: "Ready to stop relying on **referrals?**",
    ctaText:
      "Book a free discovery call. We'll map your ideal customer profile, estimate your pipeline potential, and show you exactly how we'd fill it.",
  },

  /* ─────────────────────────────────────────────────────
   * 2. DIGITAL PRESENCE
   * ───────────────────────────────────────────────────── */
  "digital-presence": {
    slug: "digital-presence",
    pillarNumber: "03",
    pillarId: "digital",
    title: "A digital presence that works as hard as your **sales team.**",
    metaTitle: "Digital Marketing & Web Development | Outpace",
    metaDescription:
      "Websites, SEO, paid advertising, and social media — built as an integrated system. We make sure you're found, trusted, and chosen when prospects search for what you do.",
    subtitle:
      "Your website should be your best salesperson — not a brochure people glance at and forget. We build digital presence that generates leads, not just looks good.",
    gradient: "from-violet-400 to-purple-500",
    glowColor: "rgba(167, 139, 250, 0.15)",
    iconBg: "bg-violet-500/10",
    iconColor: "text-violet-400",

    problemHeading: "Your website looks fine. It just doesn't **do anything.**",
    problemText:
      "Most B2B websites are digital brochures — they exist, but they don't generate enquiries. SEO is an afterthought, paid ads burn budget without converting, and social media is a graveyard of posts nobody sees.",
    problemBullets: [
      "Website gets traffic but zero enquiries — visitors leave without taking action",
      "Competitors outrank you on Google for the keywords that actually matter",
      "Paid ads running but cost-per-lead is too high and quality is too low",
      "Social media feels like shouting into a void — posting for the sake of posting",
    ],

    approachHeading: "How we build digital that **actually converts**",
    approachText:
      "We don't build websites and walk away. We build an integrated digital system where your website, SEO, paid ads, and social media all work together toward one goal: generating qualified enquiries. Every page has a job. Every channel feeds the pipeline.",
    approachBullets: [
      "We audit your current digital presence — what's working, what's leaking, and where the quick wins are",
      "We build or rebuild your website with conversion in mind — not just aesthetics",
      "We run SEO and paid ads as a coordinated strategy, not separate silos",
      "We manage your social channels with content that builds trust and drives traffic back to your site",
    ],

    features: [
      {
        iconName: "Globe",
        title: "Website Development",
        desc: "High-converting websites built on modern frameworks — fast, mobile-first, and designed to generate leads.",
      },
      {
        iconName: "FileCode",
        title: "Search Engine Optimisation",
        desc: "Technical SEO, keyword strategy, and content that gets you ranking for the searches that actually drive revenue.",
      },
      {
        iconName: "MousePointerClick",
        title: "Google Ads Management",
        desc: "Search and display campaigns targeting high-intent keywords — every pound tracked to a lead or sale.",
      },
      {
        iconName: "Linkedin",
        title: "LinkedIn Advertising",
        desc: "Targeted campaigns reaching decision-makers by job title, company size, and industry on the platform where B2B happens.",
      },
      {
        iconName: "Megaphone",
        title: "Meta & Social Ads",
        desc: "Facebook and Instagram campaigns for brand awareness, retargeting, and lead generation — especially effective for B2C.",
      },
      {
        iconName: "Share2",
        title: "Social Media Management",
        desc: "Content planning, creation, and scheduling across LinkedIn, Instagram, Facebook, and X — consistent presence without the overhead.",
      },
      {
        iconName: "FileText",
        title: "Landing Page Creation",
        desc: "Dedicated landing pages for campaigns, events, and offers — built to convert a specific audience on a specific message.",
      },
      {
        iconName: "BarChart3",
        title: "Conversion Rate Optimisation",
        desc: "A/B testing, heatmaps, and user journey analysis to squeeze more leads out of the traffic you already have.",
      },
    ],

    faq: [
      {
        q: "How long until we see SEO results?",
        a: "SEO is a compounding investment. You'll typically see ranking improvements within 3-4 months and meaningful traffic growth by month 6. We supplement with paid ads in the meantime so you're not waiting around.",
      },
      {
        q: "What platform do you build websites on?",
        a: "We build on Next.js and WordPress depending on your needs. Next.js for performance-critical sites; WordPress for content-heavy sites where your team needs to update regularly.",
      },
      {
        q: "Can you work with our existing website?",
        a: "Absolutely. We'll audit what you have, identify what's working and what isn't, and make targeted improvements. Sometimes a full rebuild is the right call, but often strategic changes to your existing site deliver faster results.",
      },
      {
        q: "Do you manage our social media accounts?",
        a: "Yes — we handle content planning, creation, scheduling, and community management. You approve the content calendar each month, and we take care of the rest.",
      },
      {
        q: "What's your approach to paid advertising?",
        a: "We start small, test fast, and scale what works. Every campaign is tracked to a lead or sale — not impressions or clicks. If an ad isn't generating revenue, we cut it and redirect the budget.",
      },
    ],

    logoSetKey: "DIGITAL_LOGOS",

    ctaHeading: "Ready to turn your website into a **lead machine?**",
    ctaText:
      "Book a free discovery call. We'll audit your current digital presence, identify the biggest opportunities, and show you what's possible.",
  },

  /* ─────────────────────────────────────────────────────
   * 3. AI-POWERED GROWTH TOOLS
   * ───────────────────────────────────────────────────── */
  "ai-growth-tools": {
    slug: "ai-growth-tools",
    pillarNumber: "06",
    pillarId: "ai",
    title: "AI tools that sell while you **sleep.**",
    metaTitle: "AI Sales Tools & Automation | Outpace",
    metaDescription:
      "Practical AI built into your sales process — voice agents, chatbots, auto-generated proposals, and personalised landing pages. Not experimental. Live and generating pipeline.",
    subtitle:
      "Everyone's talking about AI. We're actually building it into sales processes — voice agents that run discovery calls, chatbots that qualify leads at 3am, and systems that generate proposals in minutes.",
    gradient: "from-cyan-400 to-emerald-400",
    glowColor: "rgba(34, 211, 238, 0.15)",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",

    problemHeading: "AI is everywhere. Practical **implementation** isn't.",
    problemText:
      "Your team has played with ChatGPT. Maybe someone built a prompt library. But turning AI into something that actually generates revenue? That's where most businesses get stuck. The gap between AI hype and AI results is execution.",
    problemBullets: [
      "AI experiments that never make it past the 'cool demo' stage",
      "No idea how to integrate AI into your actual sales workflow",
      "Team is curious but nobody has time to figure it out properly",
      "Worried about AI sounding robotic or damaging client relationships",
    ],

    approachHeading: "How we turn AI into **revenue**",
    approachText:
      "We don't do AI workshops or strategy decks. We build working AI systems and plug them directly into your sales process. Voice agents that sound natural, chatbots that actually qualify, and proposal generators that save your team hours every week. Practical. Tested. Live.",
    approachBullets: [
      "We audit your sales process to identify where AI creates the biggest leverage",
      "We build custom AI tools trained on your business, your tone, and your offer",
      "We integrate everything into your existing CRM and workflow — no new dashboards to learn",
      "We monitor, refine, and improve continuously — AI gets smarter the longer it runs",
    ],

    features: [
      {
        iconName: "Mic",
        title: "AI Voice Agents",
        desc: "Natural-sounding voice agents that run discovery calls, qualify prospects, and book meetings — available 24/7.",
      },
      {
        iconName: "Phone",
        title: "AI Outbound Calling",
        desc: "Hundreds of outbound calls per day with AI that handles objections, qualifies interest, and escalates hot leads to your team.",
      },
      {
        iconName: "MessageSquare",
        title: "Chatbot Lead Qualification",
        desc: "24/7 chatbots on your website that engage visitors, ask the right questions, and pass qualified leads straight to your CRM.",
      },
      {
        iconName: "FileText",
        title: "Auto-Generated Proposals",
        desc: "AI that turns discovery call notes into tailored client proposals in minutes — not days.",
      },
      {
        iconName: "MousePointerClick",
        title: "Personalised Landing Pages",
        desc: "Dynamic landing pages that adapt to each prospect — their industry, their challenges, their name — for conversion rates that generic pages can't touch.",
      },
      {
        iconName: "Mail",
        title: "AI Email Personalisation",
        desc: "Outbound emails that reference the prospect's business, recent news, and specific pain points — at scale, without sounding templated.",
      },
    ],

    faq: [
      {
        q: "Will AI replace my sales team?",
        a: "No. AI handles the repetitive, time-consuming work — prospecting, initial qualification, proposal drafting — so your team can focus on the high-value conversations that close deals.",
      },
      {
        q: "How does the voice agent actually work?",
        a: "Our AI voice agents use advanced speech models to have natural conversations. They're trained on your business, your offer, and your ideal customer. They can run discovery calls, handle objections, and book meetings — and they sound remarkably human.",
      },
      {
        q: "What data do you need from us?",
        a: "We need your sales materials, common objections, ideal customer profile, and access to your CRM. The more context we have about how you sell, the better the AI performs.",
      },
      {
        q: "How quickly can AI tools be live?",
        a: "Chatbots can be live in 1-2 weeks. Voice agents typically take 3-4 weeks to build, train, and test. Proposal generators depend on complexity but are usually ready within 2-3 weeks.",
      },
      {
        q: "What if the AI makes mistakes or says something wrong?",
        a: "Every AI system goes through rigorous testing before going live. We set guardrails, monitor conversations, and continuously refine. If something isn't working, we catch it fast and fix it.",
      },
    ],

    logoSetKey: "AI_LOGOS",

    ctaHeading: "Ready to put AI to **work?**",
    ctaText:
      "Book a free discovery call. We'll audit your sales process, identify where AI creates the most leverage, and show you what's possible — with real examples, not slide decks.",
  },

  /* ─────────────────────────────────────────────────────
   * 4. SALES ENABLEMENT & TRAINING
   * ───────────────────────────────────────────────────── */
  "sales-enablement": {
    slug: "sales-enablement",
    pillarNumber: "07",
    pillarId: "sales",
    title: "Turn your sales team into a **closing machine.**",
    metaTitle: "Sales Enablement & Training | Outpace",
    metaDescription:
      "Sales playbooks, discovery call coaching, objection handling frameworks, and process optimisation. We work with your team to close more of the pipeline you're already generating.",
    subtitle:
      "No point filling a pipeline if your team can't close it. We work with your salespeople — not instead of them — to sharpen their pitch, tighten their process, and turn more conversations into revenue.",
    gradient: "from-indigo-400 to-blue-500",
    glowColor: "rgba(129, 140, 248, 0.15)",
    iconBg: "bg-indigo-500/10",
    iconColor: "text-indigo-400",

    problemHeading: "Your pipeline is full. Your **close rate** isn't.",
    problemText:
      "You're generating leads — maybe more than ever. But deals stall, follow-ups slip, and too many conversations end with 'we'll think about it' instead of a signed contract. The problem isn't your product. It's the process.",
    problemBullets: [
      "No documented sales process — every rep does it differently",
      "Discovery calls that don't uncover real pain points or budget",
      "Objections that derail conversations instead of advancing them",
      "Deals that go quiet after the proposal with no structured follow-up",
    ],

    approachHeading: "How we sharpen your **sales engine**",
    approachText:
      "We don't do one-day training workshops that everyone forgets by Friday. We embed ourselves in your sales process — listening to calls, reviewing pipelines, and building the tools your team actually needs. Playbooks they'll use. Scripts they'll adapt. Processes they'll follow because they make closing easier, not harder.",
    approachBullets: [
      "We audit your current sales process end-to-end — from first contact to closed deal",
      "We build a custom sales playbook with scripts, objection handlers, and qualification frameworks",
      "We coach your team through real calls and real deals — not role-play scenarios",
      "We set up pipeline review cadences and win/loss analysis so improvement is continuous, not one-off",
    ],

    features: [
      {
        iconName: "BookOpen",
        title: "Sales Playbook Creation",
        desc: "A documented, repeatable sales process your team can follow — from first touch to close. Not a generic template; built around how your business actually sells.",
      },
      {
        iconName: "GraduationCap",
        title: "Discovery Call Coaching",
        desc: "We listen to your team's real calls and coach them on asking better questions, uncovering pain, and qualifying harder — so fewer deals waste everyone's time.",
      },
      {
        iconName: "MessageSquare",
        title: "Objection Handling Frameworks",
        desc: "Structured responses to your most common objections — price, timing, competitor comparisons — so your team stays confident when the conversation gets tough.",
      },
      {
        iconName: "Workflow",
        title: "Sales Process Mapping",
        desc: "We map your entire sales journey, identify where deals stall or leak, and redesign the process to move prospects through faster.",
      },
      {
        iconName: "Trophy",
        title: "Win/Loss Analysis",
        desc: "We review your closed-won and closed-lost deals to find patterns. What's working gets reinforced. What's losing gets fixed.",
      },
      {
        iconName: "BarChart3",
        title: "Pipeline Review Cadence",
        desc: "Structured weekly or fortnightly pipeline reviews that keep deals moving, surface blockers early, and hold the team accountable to next steps.",
      },
    ],

    faq: [
      {
        q: "How is this different from a sales training workshop?",
        a: "Training workshops are one-off events. We embed ourselves in your process for weeks or months — listening to real calls, reviewing real pipelines, and coaching on real deals. The improvements stick because they're built into how your team works every day.",
      },
      {
        q: "Do you work with our existing CRM?",
        a: "Yes — we work with HubSpot, Salesforce, Pipedrive, and most major CRMs. We build the playbook and pipeline stages directly into your existing system so there's no new tool to learn.",
      },
      {
        q: "How long does an engagement typically take?",
        a: "A typical sales enablement engagement runs 8-12 weeks. We deliver the playbook in the first 2-3 weeks, then spend the rest coaching, refining, and embedding the process into your team's daily workflow.",
      },
      {
        q: "Do you sit in on real sales calls?",
        a: "Yes — that's where the real coaching happens. We listen to live or recorded calls, provide specific feedback, and help reps improve in the context of actual conversations, not hypothetical scenarios.",
      },
      {
        q: "What if our sales team is small — just 2-3 people?",
        a: "That's actually the sweet spot. Smaller teams adopt changes faster and see results sooner. A tight playbook and consistent process can transform a 2-person sales team's conversion rate in weeks.",
      },
    ],

    ctaHeading: "Ready to close more of what you **generate?**",
    ctaText:
      "Book a free discovery call. We'll review your current sales process, identify where deals are leaking, and show you exactly how to fix it.",
  },

  /* ─────────────────────────────────────────────────────
   * 5. CONSULTATIVE BUSINESS ANALYSIS
   * ───────────────────────────────────────────────────── */
  "business-analysis": {
    slug: "business-analysis",
    pillarNumber: "01",
    pillarId: "analysis",
    title: "Know your business inside-out before you **spend a cent.**",
    metaTitle: "Business Analysis & Growth Strategy | Outpace",
    metaDescription:
      "Deep-dive business analysis — competitive mapping, target market identification, USP documentation, and growth roadmaps. Understand your business before you invest in growth.",
    subtitle:
      "Most businesses jump straight into marketing without knowing what makes them different. We sit with your team, learn your business inside-out, and build a plan that's worth following.",
    gradient: "from-cyan-400 to-blue-500",
    glowColor: "rgba(34, 211, 238, 0.15)",
    iconBg: "bg-cyan-500/10",
    iconColor: "text-cyan-400",

    problemHeading: "You can't outrun a **bad strategy.**",
    problemText:
      "Too many businesses pour money into campaigns without understanding their market, their competition, or what actually makes them worth choosing. The result? Wasted budget, confused messaging, and growth that never quite sticks.",
    problemBullets: [
      "No documented unique selling points — your team describes the business differently every time",
      "Unclear on which markets or segments offer the best return on effort",
      "Competitors winning business you should be getting — and you're not sure why",
      "Previous agencies jumped straight to tactics without understanding your business first",
    ],

    approachHeading: "How we **build the foundation**",
    approachText:
      "We start every engagement the same way — by understanding your business better than your competitors do. We audit your current position, map the competitive landscape, identify your strongest markets, and document the reasons people should choose you. This becomes the foundation everything else is built on.",
    approachBullets: [
      "We run structured sessions with your team to extract what makes you genuinely different",
      "We research your competitors — what they're saying, where they're winning, and where the gaps are",
      "We map your target markets and identify the segments with the best growth potential",
      "We deliver a prioritised growth roadmap — not 50 ideas, but the 5 that will move the needle fastest",
    ],

    features: [
      {
        iconName: "Search",
        title: "Full Business Audit",
        desc: "A deep-dive into your current operations, sales process, and market position — so we know exactly where you stand before anything else happens.",
      },
      {
        iconName: "Target",
        title: "USP Documentation",
        desc: "We extract and document what makes your business genuinely different — then turn it into messaging your team can actually use.",
      },
      {
        iconName: "Users",
        title: "Target Market Identification",
        desc: "We identify the markets, segments, and buyer profiles where your offer has the strongest pull — so you focus effort where it counts.",
      },
      {
        iconName: "BarChart3",
        title: "Competitive Landscape Mapping",
        desc: "A clear picture of who you're up against, what they're doing well, and where the opportunities are for you to win.",
      },
      {
        iconName: "BadgeEuro",
        title: "Grant & Funding Navigation",
        desc: "We help you identify and apply for Enterprise Ireland, LEO, and other funding programmes that can subsidise your growth investment.",
      },
      {
        iconName: "Lightbulb",
        title: "Growth Opportunity Roadmap",
        desc: "A prioritised plan of the initiatives most likely to drive revenue — with timelines, owners, and clear next steps.",
      },
    ],

    faq: [
      {
        q: "How long does the analysis phase take?",
        a: "Typically 2-4 weeks depending on the size and complexity of your business. We move fast but we're thorough — cutting corners here means building everything else on shaky ground.",
      },
      {
        q: "Do we need to prepare anything before you start?",
        a: "We'll send you a brief intake questionnaire and ask for access to any existing sales data, marketing materials, and competitor intel you have. Beyond that, we just need time with the people who know your business best.",
      },
      {
        q: "Is this a one-off project or an ongoing engagement?",
        a: "The analysis itself is a defined phase with clear deliverables. But most clients move straight into execution with us — because once you see the opportunities, you'll want to act on them.",
      },
      {
        q: "What do we actually get at the end?",
        a: "A comprehensive document covering your USPs, competitive landscape, target market analysis, and a prioritised growth roadmap. Plus a debrief session where we walk you through every recommendation.",
      },
      {
        q: "Can you help with Enterprise Ireland or LEO applications?",
        a: "Yes — we've helped clients access funding through Enterprise Ireland, Local Enterprise Offices, and other programmes. We know what they look for and how to position your application.",
      },
    ],

    ctaHeading: "Ready to understand your business **better than anyone?**",
    ctaText:
      "Book a free discovery call. We'll learn about your business, identify the biggest growth opportunities, and show you exactly where to start.",
  },

  /* ─────────────────────────────────────────────────────
   * 6. SYSTEMS & OPERATIONS
   * ───────────────────────────────────────────────────── */
  "systems-operations": {
    slug: "systems-operations",
    pillarNumber: "04",
    pillarId: "systems",
    title: "Build the systems that let your business **actually scale.**",
    metaTitle: "CRM Implementation & Business Systems | Outpace",
    metaDescription:
      "CRM implementation, process mapping, workflow automation, and reporting dashboards. We build the operational backbone that lets your business scale without the chaos.",
    subtitle:
      "Growth without systems is chaos. We implement the CRMs, automate the workflows, and build the processes that let your team focus on closing deals — not chasing spreadsheets.",
    gradient: "from-amber-400 to-orange-500",
    glowColor: "rgba(251, 191, 36, 0.15)",
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-400",

    problemHeading: "Your business is growing. Your **systems** aren't.",
    problemText:
      "You're winning more business than ever — but leads are falling through cracks, follow-ups are getting missed, and your team is drowning in manual processes. The tools that got you here won't get you to the next level.",
    problemBullets: [
      "Leads tracked in spreadsheets, inboxes, and sticky notes — with no single source of truth",
      "No CRM discipline — data is messy, stages are meaningless, and nobody trusts the pipeline",
      "Manual processes eating hours every week that should be spent on revenue-generating work",
      "No reporting — you're making decisions on gut feel instead of data",
    ],

    approachHeading: "How we build your **operational backbone**",
    approachText:
      "We don't just install software and hand you a login. We map your processes, configure your tools to match how your team actually works, migrate your data cleanly, and train everyone until they're confident. Then we stick around to make sure it's working.",
    approachBullets: [
      "We map your current workflows end-to-end and identify every bottleneck and manual step",
      "We select and configure the right tools for your business — not the most expensive ones",
      "We migrate your existing data, clean it up, and make sure nothing gets lost in the transition",
      "We train your team hands-on and build documentation so the knowledge doesn't walk out the door",
    ],

    features: [
      {
        iconName: "Settings",
        title: "CRM Implementation",
        desc: "Full setup and customisation of HubSpot, Salesforce, or Pipedrive — pipelines, properties, automations, and integrations configured for how your team actually sells.",
      },
      {
        iconName: "HeadphonesIcon",
        title: "Customer Service Consulting",
        desc: "We design and implement customer service processes — ticketing systems, SLA frameworks, and escalation paths that keep your clients happy and your team sane.",
      },
      {
        iconName: "Workflow",
        title: "Process Mapping & Optimisation",
        desc: "We document your workflows, cut the bottlenecks, and redesign processes so your team spends less time on admin and more time on work that matters.",
      },
      {
        iconName: "BarChart3",
        title: "Reporting Dashboards",
        desc: "Custom dashboards that give you real-time visibility into pipeline, revenue, activity, and KPIs — so you make decisions on data, not gut feel.",
      },
      {
        iconName: "BrainCircuit",
        title: "Workflow Automation",
        desc: "Automated lead routing, task creation, email triggers, and data syncing — the repetitive stuff your team shouldn't be doing manually.",
      },
      {
        iconName: "ClipboardCheck",
        title: "Tool Integration & Data Migration",
        desc: "We connect your tools so data flows between them cleanly — and migrate your existing records without losing a single contact or deal.",
      },
    ],

    faq: [
      {
        q: "Which CRM do you recommend?",
        a: "It depends on your team size, budget, and complexity. HubSpot is our go-to for most SMEs — powerful, scalable, and the free tier is genuinely useful. Salesforce for larger operations. We'll recommend what fits, not what pays us the highest commission.",
      },
      {
        q: "Can you work with our existing systems?",
        a: "Absolutely. We'll audit what you have, fix what's broken, and build on what's working. Sometimes a fresh setup is the right call, but we won't rip and replace unless it genuinely makes sense.",
      },
      {
        q: "How long does a CRM implementation take?",
        a: "A straightforward HubSpot setup takes 2-4 weeks. More complex implementations with data migration, custom integrations, and team training typically run 6-8 weeks. We'll give you a clear timeline during the discovery call.",
      },
      {
        q: "Do you train our team on the new systems?",
        a: "Yes — hands-on training is included in every implementation. We don't just show your team what buttons to press; we train them on why each process matters so adoption actually sticks.",
      },
      {
        q: "What if we outgrow the initial setup?",
        a: "That's the plan. We build systems with growth in mind — so when you double your team or enter a new market, your operations scale with you instead of breaking apart.",
      },
    ],

    logoSetKey: "SYSTEMS_LOGOS",

    ctaHeading: "Ready to build systems that **scale?**",
    ctaText:
      "Book a free discovery call. We'll audit your current operations, identify the biggest bottlenecks, and show you how to fix them.",
  },

  /* ─────────────────────────────────────────────────────
   * 7. CONTENT & VIDEO
   * ───────────────────────────────────────────────────── */
  "content-video": {
    slug: "content-video",
    pillarNumber: "05",
    pillarId: "content",
    title: "Content that builds trust before the **first meeting.**",
    metaTitle: "Video Production & Content Strategy | Outpace",
    metaDescription:
      "Professional video production, content strategy, and thought leadership — management interviews, client testimonials, brand films, and social media content that builds trust and drives enquiries.",
    subtitle:
      "People buy from companies they trust. We produce professional video content and build a content strategy that positions you as the authority in your space — so prospects are already sold before they pick up the phone.",
    gradient: "from-rose-400 to-pink-500",
    glowColor: "rgba(251, 113, 133, 0.15)",
    iconBg: "bg-rose-500/10",
    iconColor: "text-rose-400",

    problemHeading: "Your competitors are showing up. **You're not.**",
    problemText:
      "Your prospects are researching online before they ever talk to you. If all they find is a static website and a dead social feed, you've already lost ground to the competitor who's putting out video, writing thought leadership, and showing up where it matters.",
    problemBullets: [
      "No video content — prospects can't see your team, your culture, or your work before they engage",
      "Social media is sporadic at best — posting when someone remembers, with no strategy behind it",
      "Competitors are building authority through content while you rely on reputation alone",
      "No content strategy — every piece of marketing is a one-off with no compounding value",
    ],

    approachHeading: "How we make you the **authority**",
    approachText:
      "We produce professional video content — interviews with your leadership team, client testimonials, facility tours — and pair it with a content strategy that puts the right content in front of the right people at the right time. Not vanity content. Trust-building content that shortens your sales cycle.",
    approachBullets: [
      "We plan a content calendar aligned with your sales process — every piece has a purpose",
      "We produce professional video on-site — management interviews, testimonials, brand films",
      "We repurpose long-form content into social clips, blog posts, and email sequences",
      "We distribute content across the channels where your prospects actually spend time",
    ],

    features: [
      {
        iconName: "Mic",
        title: "Management Interview Series",
        desc: "Structured interviews with your leadership team that showcase expertise, personality, and the thinking behind your business.",
      },
      {
        iconName: "Video",
        title: "Client Testimonial Videos",
        desc: "Your best clients telling their story on camera — the most powerful sales tool you can have, and most businesses don't have a single one.",
      },
      {
        iconName: "Camera",
        title: "Facility Tours & Brand Films",
        desc: "Professional footage of your operation — what you do, how you do it, and why it matters. Shows prospects the real business behind the website.",
      },
      {
        iconName: "Pencil",
        title: "Content Strategy & Thought Leadership",
        desc: "A documented content plan that positions your team as the go-to experts in your space — articles, posts, and insights that build trust over time.",
      },
      {
        iconName: "UserPlus",
        title: "Employer Branding & Recruitment Content",
        desc: "Video and content that attracts talent — culture films, team spotlights, and behind-the-scenes content that makes people want to work with you.",
      },
      {
        iconName: "Share2",
        title: "Social Media Content Calendars",
        desc: "Monthly content plans with formats, topics, and posting schedules — so your social presence is consistent, strategic, and actually builds an audience.",
      },
    ],

    faq: [
      {
        q: "What kind of video do you produce?",
        a: "Management interviews, client testimonials, facility tours, brand films, social media clips, and recruitment content. Everything is shot professionally on-site — no stock footage, no templates.",
      },
      {
        q: "How long is a typical video shoot?",
        a: "A standard shoot day produces 3-5 finished videos. We handle all the planning, scripting, filming, and editing — your team just needs to show up and be themselves.",
      },
      {
        q: "Can you do ongoing content, not just a one-off?",
        a: "Absolutely — and that's what we recommend. Content compounds over time. A single video is nice; a consistent monthly rhythm of content is what builds real authority.",
      },
      {
        q: "Do you handle distribution or just production?",
        a: "Both. We produce the content and distribute it across your website, social channels, email sequences, and anywhere else it makes sense. Content that sits on a hard drive doesn't build trust.",
      },
      {
        q: "What about written content — blogs, articles, case studies?",
        a: "Yes — we produce written content alongside video. Blog posts, case studies, LinkedIn articles, and thought leadership pieces. We can also repurpose your video content into written formats to maximise ROI.",
      },
    ],

    ctaHeading: "Ready to become the **authority** in your space?",
    ctaText:
      "Book a free discovery call. We'll discuss your content gaps, plan a production schedule, and show you how the right content shortens your sales cycle.",
  },

  /* ─────────────────────────────────────────────────────
   * 8. CUSTOMER RETENTION & GROWTH
   * ───────────────────────────────────────────────────── */
  "customer-retention": {
    slug: "customer-retention",
    pillarNumber: "08",
    pillarId: "retention",
    title: "Stop losing clients you already **won.**",
    metaTitle: "Customer Retention & Account Growth | Outpace",
    metaDescription:
      "Client health scoring, churn prevention, upsell strategy, and quarterly business reviews. We build retention systems that keep your best clients and grow their accounts.",
    subtitle:
      "Your easiest revenue is already in your database. We build the systems that keep your best clients from drifting away — and grow the accounts you've already won.",
    gradient: "from-teal-400 to-cyan-500",
    glowColor: "rgba(45, 212, 191, 0.15)",
    iconBg: "bg-teal-500/10",
    iconColor: "text-teal-400",

    problemHeading: "You're chasing new logos while your best clients **drift away.**",
    problemText:
      "Everyone obsesses over new business. Meanwhile, existing clients get neglected, renewals are assumed instead of earned, and upsell opportunities slip by because nobody's looking for them. By the time you notice a client is unhappy, they're already talking to your competitor.",
    problemBullets: [
      "No early warning system — you find out clients are unhappy when they leave, not before",
      "Account management is reactive — check-ins only happen when there's a problem",
      "No structured upsell or cross-sell process — revenue growth from existing clients is accidental",
      "Client onboarding is inconsistent — some clients get a great experience, others don't",
    ],

    approachHeading: "How we turn clients into **long-term revenue**",
    approachText:
      "We build retention systems that work without you thinking about them. Health scores that flag at-risk accounts before they churn. Structured check-ins that surface new opportunities. Upsell playbooks that grow accounts naturally. The goal isn't just keeping clients — it's making them worth more every year.",
    approachBullets: [
      "We build a client health scoring model based on engagement, satisfaction, and usage signals",
      "We design structured QBR and check-in cadences that deepen relationships and surface opportunities",
      "We create upsell and cross-sell playbooks tailored to your product and client segments",
      "We optimise your onboarding process so new clients start strong and stay engaged from day one",
    ],

    features: [
      {
        iconName: "Heart",
        title: "Client Health Scoring",
        desc: "A scoring model that flags at-risk accounts based on engagement, NPS, usage, and communication patterns — so you intervene before clients decide to leave.",
      },
      {
        iconName: "ThumbsUp",
        title: "NPS / CSAT Programme Setup",
        desc: "Structured feedback programmes that measure client satisfaction at key moments — and turn the insights into action, not just charts.",
      },
      {
        iconName: "ArrowUpRight",
        title: "Upsell & Cross-Sell Strategy",
        desc: "Playbooks for growing existing accounts — identifying expansion opportunities, timing the conversation, and positioning the value naturally.",
      },
      {
        iconName: "Presentation",
        title: "Quarterly Business Review Framework",
        desc: "Structured QBR templates and cadences that show clients the value you're delivering — and open the door to new opportunities every quarter.",
      },
      {
        iconName: "ClipboardCheck",
        title: "Client Onboarding Optimisation",
        desc: "A consistent, impressive onboarding experience that sets expectations, builds confidence, and reduces early-stage churn.",
      },
      {
        iconName: "RefreshCw",
        title: "Loyalty & Referral Programme Design",
        desc: "Structured programmes that reward your best clients for staying and for referring others — turning retention into acquisition.",
      },
    ],

    faq: [
      {
        q: "How do you measure client health?",
        a: "We build a scoring model using signals you already have — communication frequency, NPS responses, product usage, support tickets, payment patterns. Each signal is weighted and the score tells you who needs attention right now.",
      },
      {
        q: "What's a QBR and do we need one?",
        a: "A Quarterly Business Review is a structured meeting with your client to review results, align on goals, and identify new opportunities. If you have clients worth more than a few thousand a year, yes — you need them.",
      },
      {
        q: "Can this work for smaller accounts too?",
        a: "Yes — we design different retention touchpoints for different account tiers. Your top clients get QBRs and dedicated check-ins. Smaller accounts get automated health monitoring and triggered outreach when scores drop.",
      },
      {
        q: "How quickly does retention work show results?",
        a: "You'll see early wins within the first month — at-risk accounts flagged, quick interventions made. Meaningful churn reduction and account growth typically show up within 2-3 months.",
      },
      {
        q: "Do you handle the client outreach or train our team?",
        a: "Both, depending on what you need. We can run the initial retention programme while training your team to take it over, or we can build the systems and frameworks and let your team run them from day one.",
      },
    ],

    ctaHeading: "Ready to keep your best clients **and grow them?**",
    ctaText:
      "Book a free discovery call. We'll review your current retention approach, identify at-risk accounts, and show you how to turn existing clients into your biggest growth lever.",
  },

  /* ─────────────────────────────────────────────────────
   * 9. BRAND POSITIONING & GTM STRATEGY
   * ───────────────────────────────────────────────────── */
  "brand-positioning": {
    slug: "brand-positioning",
    pillarNumber: "09",
    pillarId: "positioning",
    title: "Get crystal clear on who you're for and why they should **care.**",
    metaTitle: "Brand Positioning & Go-To-Market Strategy | Outpace",
    metaDescription:
      "Brand positioning, messaging frameworks, ICP development, go-to-market strategy, and competitive differentiation. Get clear before you spend a cent on marketing.",
    subtitle:
      "If your positioning is vague, every campaign you run is a coin flip. We help you get crystal clear on who you're for, why they should care, and how to take that message to market — so every pound you spend actually lands.",
    gradient: "from-sky-400 to-blue-500",
    glowColor: "rgba(56, 189, 248, 0.15)",
    iconBg: "bg-sky-500/10",
    iconColor: "text-sky-400",

    problemHeading: "You sound like **everyone else.**",
    problemText:
      "Your messaging changes depending on who's selling. Your website says one thing, your pitch deck says another, and your team describes the business differently every time. When your positioning is unclear, every campaign is a gamble — and your prospects can feel it.",
    problemBullets: [
      "No consistent message — every rep, every page, every pitch sounds different",
      "Struggling to articulate why prospects should choose you over the competitor down the road",
      "Marketing campaigns that don't resonate because the foundation isn't right",
      "Entering a new market or launching a new product without a clear go-to-market plan",
    ],

    approachHeading: "How we sharpen your **positioning**",
    approachText:
      "We run structured workshops with your team to uncover what really makes you different — not the generic stuff, the real reasons people choose you. Then we turn that into a messaging framework your entire organisation can use: website, pitch decks, sales calls, and campaigns. One clear story, everywhere.",
    approachBullets: [
      "We facilitate positioning workshops that cut through internal assumptions and get to what actually matters to buyers",
      "We build a messaging hierarchy — from one-liner to full pitch — that your entire team can use",
      "We define your ICP with precision — not just demographics, but pain points, triggers, and buying behaviour",
      "We design a go-to-market strategy for your next launch with channels, timing, and success metrics",
    ],

    features: [
      {
        iconName: "Crosshair",
        title: "Messaging & Value Proposition",
        desc: "A documented messaging framework — from elevator pitch to detailed value proposition — that your entire organisation uses consistently.",
      },
      {
        iconName: "Map",
        title: "Go-To-Market Strategy",
        desc: "A detailed plan for taking your product or service to a new market — channels, timing, messaging, pricing, and success metrics all mapped out.",
      },
      {
        iconName: "Users",
        title: "ICP & Buyer Persona Development",
        desc: "Detailed profiles of your ideal customers — not just job titles, but the pain points, triggers, and decision criteria that drive their buying behaviour.",
      },
      {
        iconName: "Tag",
        title: "Pricing & Packaging Strategy",
        desc: "Pricing analysis and packaging recommendations — how to structure your offer so it's easy to buy and hard to say no to.",
      },
      {
        iconName: "Target",
        title: "Competitive Differentiation",
        desc: "A clear framework for how you're different from every competitor — not 'better service' platitudes, but specific, provable advantages.",
      },
      {
        iconName: "Pencil",
        title: "Brand Voice & Tone Guidelines",
        desc: "A documented guide to how your brand sounds — across website copy, social media, sales materials, and client communications.",
      },
    ],

    faq: [
      {
        q: "How is this different from what a brand agency does?",
        a: "Brand agencies typically focus on visual identity — logos, colours, fonts. We focus on what you say and how you sell. Messaging, positioning, and go-to-market strategy that directly impacts revenue.",
      },
      {
        q: "How long does the positioning process take?",
        a: "A focused positioning engagement typically runs 3-4 weeks. We move through workshops, research, and framework development quickly — because vague positioning costs you money every day it stays unfixed.",
      },
      {
        q: "Do we need this before we start marketing?",
        a: "Ideally, yes. Marketing without clear positioning is like building a house without foundations — it might stand for a while, but it won't hold up. That said, we can run positioning alongside active campaigns if needed.",
      },
      {
        q: "What do we actually walk away with?",
        a: "A complete messaging framework, ICP documentation, competitive positioning matrix, and if relevant, a go-to-market plan. Everything your team needs to communicate consistently and sell more effectively.",
      },
      {
        q: "Can you help with a new market or product launch?",
        a: "Absolutely — that's one of the most common reasons clients come to us. We'll help you define the opportunity, position your offer, plan the launch, and execute the go-to-market strategy.",
      },
    ],

    ctaHeading: "Ready to get your positioning **right?**",
    ctaText:
      "Book a free discovery call. We'll dig into your current messaging, identify where it's costing you deals, and show you how to fix it.",
  },

  /* ─────────────────────────────────────────────────────
   * 10. PARTNERSHIPS & REFERRAL PROGRAMMES
   * ───────────────────────────────────────────────────── */
  "partnerships": {
    slug: "partnerships",
    pillarNumber: "10",
    pillarId: "partnerships",
    title: "Turn your network into a predictable source of **warm introductions.**",
    metaTitle: "Partnership & Referral Programme Development | Outpace",
    metaDescription:
      "Strategic partner identification, referral programme design, co-marketing campaigns, and channel partner strategy. Turn word-of-mouth into a repeatable, scalable growth channel.",
    subtitle:
      "Your best clients know other businesses just like them — but most referrals happen by accident. We build the systems that make word-of-mouth predictable, trackable, and scalable.",
    gradient: "from-lime-400 to-emerald-500",
    glowColor: "rgba(163, 230, 53, 0.15)",
    iconBg: "bg-lime-500/10",
    iconColor: "text-lime-400",

    problemHeading: "Referrals are your best leads. You just can't **control them.**",
    problemText:
      "You know referrals convert better than any other channel. But they come in randomly — there's no system, no tracking, and no way to scale it. Strategic partnerships sound great in theory but never get off the ground because nobody owns the process.",
    problemBullets: [
      "Referrals happen by accident — no structured programme, no incentives, no tracking",
      "Strategic partnerships discussed but never formalised or followed through",
      "No idea which clients or contacts are most likely to refer — you're just hoping",
      "Competitor partnerships creating value while yours sit in a spreadsheet of 'good ideas'",
    ],

    approachHeading: "How we make referrals **repeatable**",
    approachText:
      "We design referral and partnership programmes that turn your network into a growth channel — not a lucky bonus. Structured incentives, clear processes, partner enablement materials, and tracking so you know exactly what's working and what isn't.",
    approachBullets: [
      "We identify your best referral sources — existing clients, industry contacts, and complementary businesses",
      "We design a referral programme with clear incentives, simple processes, and automated tracking",
      "We identify and approach strategic partners whose clients are your ideal customers",
      "We build co-marketing campaigns and partner enablement materials that make it easy for partners to sell you",
    ],

    features: [
      {
        iconName: "Handshake",
        title: "Strategic Partner Identification",
        desc: "We map your ecosystem to find businesses whose clients are your ideal customers — and build outreach strategies to get the conversation started.",
      },
      {
        iconName: "Network",
        title: "Referral Programme Design",
        desc: "A structured programme with clear incentives, simple referral mechanics, and automated tracking — so referrals become a channel, not a fluke.",
      },
      {
        iconName: "Gift",
        title: "Co-Marketing Campaigns",
        desc: "Joint content, shared events, and cross-promotion campaigns with strategic partners that put your offer in front of warm, pre-qualified audiences.",
      },
      {
        iconName: "Briefcase",
        title: "Partner Enablement & Collateral",
        desc: "Sales decks, one-pagers, and training materials that make it dead simple for partners to recommend you — and position you correctly when they do.",
      },
      {
        iconName: "TrendingUp",
        title: "Channel Partner Strategy",
        desc: "A framework for building and managing a channel partner network — recruitment, onboarding, performance tracking, and incentive structures.",
      },
      {
        iconName: "BadgeEuro",
        title: "Affiliate & Commission Frameworks",
        desc: "Commission structures and affiliate programmes designed to motivate referrals without eating your margins — clear, fair, and easy to administer.",
      },
    ],

    faq: [
      {
        q: "How do you find the right partners for us?",
        a: "We start by mapping your ecosystem — who serves the same clients you do but doesn't compete with you? Accountants, technology providers, industry associations, complementary service firms. Then we prioritise by fit and approach them strategically.",
      },
      {
        q: "What if we already have a referral programme that isn't working?",
        a: "We'll audit it. Usually the issue is one of three things: the incentive isn't motivating enough, the process is too complicated, or nobody's actively managing it. We fix all three.",
      },
      {
        q: "How long until we see referrals coming in?",
        a: "A well-designed referral programme can generate its first referrals within 4-6 weeks of launch. Strategic partnerships take longer — typically 2-3 months to formalise and start producing — but the leads are among the warmest you'll ever get.",
      },
      {
        q: "Do you manage the partner relationships ongoing?",
        a: "We can — or we can build the programme and train your team to run it. Most clients start with us managing it, then transition to internal ownership once the programme is running smoothly.",
      },
      {
        q: "Does this work for B2B companies?",
        a: "It's built for B2B companies. Referral and partner programmes are some of the most effective growth levers in B2B because trust transfers between business relationships far more powerfully than any ad campaign.",
      },
    ],

    ctaHeading: "Ready to turn your network into a **growth engine?**",
    ctaText:
      "Book a free discovery call. We'll map your partnership ecosystem, design a referral programme that fits your business, and show you how to make word-of-mouth predictable.",
  },
};

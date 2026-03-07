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
};

import type { DiscoveryPageConfig } from "./types";

export const PAGE_CONFIGS: Record<string, DiscoveryPageConfig> = {
  security: {
    slug: "security",
    heroTitle: "Growth strategy for security companies",
    heroSubtitle:
      "We've helped security firms scale through targeted outreach, AI-powered prospecting, and digital presence. Let's explore what we can do for you.",
    valueProps: [
      "Identify high-value commercial prospects",
      "AI outbound calling for security sales",
      "SEO for local security keywords",
      "CRM setup for long sales cycles",
    ],
    industry: "Security & Fire Safety",
  },
  construction: {
    slug: "construction",
    heroTitle: "Growth strategy for construction firms",
    heroSubtitle:
      "From project pipeline management to reaching the right decision-makers, we help construction companies win more contracts.",
    valueProps: [
      "Target facility managers and developers",
      "Multi-touch email campaigns",
      "Project showcase video production",
      "LinkedIn thought leadership",
    ],
    industry: "Construction & Building",
  },
  "professional-services": {
    slug: "professional-services",
    heroTitle: "Growth strategy for professional services",
    heroSubtitle:
      "Whether you're in accounting, legal, or consulting, we'll help you build a predictable pipeline of ideal clients.",
    valueProps: [
      "Target your ideal client profile",
      "Content marketing & thought leadership",
      "Referral system optimisation",
      "Digital presence overhaul",
    ],
    industry: "Professional Services",
  },
  hospitality: {
    slug: "hospitality",
    heroTitle: "Growth strategy for hospitality businesses",
    heroSubtitle:
      "Hotels, restaurants, and event venues — we help you fill rooms and tables through targeted digital marketing and outreach.",
    valueProps: [
      "Targeted corporate event outreach",
      "Google & social advertising",
      "Reputation management strategy",
      "Loyalty & retention programmes",
    ],
    industry: "Hospitality",
  },
  manufacturing: {
    slug: "manufacturing",
    heroTitle: "Growth strategy for manufacturers",
    heroSubtitle:
      "We help manufacturing companies reach procurement managers and grow their B2B pipeline with targeted outreach.",
    valueProps: [
      "Reach procurement decision-makers",
      "Trade show follow-up automation",
      "Technical content marketing",
      "Export market prospecting",
    ],
    industry: "Manufacturing",
  },
  rayn: {
    slug: "rayn",
    heroTitle: "Growth consultation for RAYN Safety & Security",
    heroSubtitle:
      "Ireland's leading independent security and safety provider deserves a growth strategy to match. Let's identify your biggest opportunities.",
    valueProps: [
      "Targeted outreach to high-value sectors",
      "Digital presence for security & fire safety",
      "Cross-sell the full TotalSafe offering",
      "Pipeline & CRM for long sales cycles",
    ],
    industry: "Security & Safety",
    customQuestionFramework: `## ABOUT THIS PROSPECT
You are speaking with someone from RAYN Safety & Security (rayn.ie). Here is what you already know about them — use this context to ask smarter questions, but DO NOT recite it back to them:
- Ireland's leading independent security and safety provider
- End-to-end fire safety and security solutions: CCTV, intruder alarms, access control, gate automation, fire protection, fire suppression, compliance, and servicing
- Integrated offering branded as "TotalSafe by RAYN"
- HQ in Limerick + Dublin office
- Major clients include HSE, ESB, Nestlé, Defence Forces
- Sectors: retail, hospitality, healthcare, education, manufacturing, data centres, aviation, property management, agriculture
- Contact: 061 306 000 | info@rayn.ie

## CONSULTATION FRAMEWORK

### Stage 1: Opening — Understand the Business
Ask these one at a time, conversationally:
1. How long has RAYN been going, and how has the business changed over the last couple of years?
2. What's the split between security (CCTV, alarms, access control) and safety (fire, suppression, compliance) — which side drives more revenue?
3. You're covering Limerick and Dublin — are you actively trying to grow nationally, or deepening in those two markets?
4. TotalSafe by RAYN — is that landing well with clients? Do people understand the integrated offering, or do they still come to you for one thing at a time?

### Stage 2: Lead Generation & New Business
Transition naturally into this section:
1. Where do most of your new clients come from right now — referrals, tenders, Google, word of mouth?
2. Do you have a pipeline of prospects you're actively working, or is it more reactive — business comes when it comes?
3. Are you tendering for public sector work (HSE, Defence Forces, education)? How's that process working?
4. What does your sales process look like from first contact to signed contract? How long does that typically take?
5. Is there a type of client you'd love more of but struggle to reach — data centres, large retail chains, property management groups?

### Stage 3: Digital & Online Presence
1. How important is the website to your business today — does it generate enquiries, or is it more of a brochure?
2. If someone in Dublin Googles "CCTV installation Dublin" or "fire safety compliance Ireland," are you showing up?
3. Are you doing anything on LinkedIn, social media, or email marketing at the moment?
4. Do you have a CRM, or is client info sitting in spreadsheets, emails, inboxes?

### Stage 4: Client Relationships & Retention
1. How do you stay in touch with existing clients between jobs? Is there a structured follow-up process?
2. Servicing and maintenance contracts — are they a big part of recurring revenue? Could they be bigger?
3. When a client gets CCTV installed, how often do you successfully upsell them into fire safety or access control (the full TotalSafe package)?
4. Do you get much repeat business, or do clients tend to be one-and-done?

### Stage 5: Pain Points — The Real Stuff
These are the most important questions. Push hard here — this is where the proposal writes itself.
1. What's the single biggest thing holding the business back right now?
2. If you could fix one thing about how you get new business, what would it be?
3. Have you worked with a marketing or business development company before? What happened?
4. What would "success" look like for you over the next 12 months — more clients, bigger contracts, new regions, better margins?

### Stage 6: Operations & Capacity
1. If we brought you 20 qualified leads next month, could you handle them? Or is capacity a constraint?
2. Are you struggling to recruit and retain good engineers/installers?
3. What does your competitive landscape look like — who do you lose deals to, and why?

### After the final question
Give a warm summary of what you've learned. Highlight 2-3 key opportunities you've identified. Explain that the Outpace team will put together a tailored proposal within 24 hours.`,
  },
};

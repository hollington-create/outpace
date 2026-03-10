// ─── Consultation Stage Tracking ───
export type ConsultationStage =
  | "opening"
  | "branch_detection"
  | "business_analysis"
  | "lead_generation"
  | "digital_presence"
  | "systems_operations"
  | "content_brand"
  | "ai_growth_tools"
  | "sales_enablement"
  | "client_retention"
  | "brand_positioning"
  | "partnerships"
  | "closing"
  | "complete";

// ─── Pain Branch Identifiers ───
export type PainBranch =
  | "business_analysis"
  | "lead_generation"
  | "digital_presence"
  | "systems_operations"
  | "content_brand"
  | "ai_growth_tools"
  | "sales_enablement"
  | "client_retention"
  | "brand_positioning"
  | "partnerships";

// ─── Extracted Company Data ───
export interface CompanyInfo {
  name: string | null;
  industry: string | null;
  employeeCount: string | null;
  annualRevenue: string | null;
  location: string | null;
  website: string | null;
  contactName: string | null;
  contactRole: string | null;
  contactEmail: string | null;
}

export interface LeadGenData {
  currentLeadSources: string | null;
  outboundProcess: string | null;
  monthlyLeadVolume: string | null;
  averageDealSize: string | null;
  closeRate: string | null;
}

export interface DigitalPresenceData {
  lastWebsiteRedesign: string | null;
  enquiryGeneration: string | null;
  keywordRankings: string | null;
  paidAdsStatus: string | null;
  currentCMS: string | null;
}

export interface SystemsOpsData {
  currentCRM: string | null;
  leadTrackingMethod: string | null;
  dataSilos: string | null;
  automatedFollowUps: string | null;
}

export interface ClientRetentionData {
  repeatRevenuePercentage: string | null;
  followUpProcess: string | null;
  npsScore: string | null;
  upsellPrograms: string | null;
}

export interface ContentBrandData {
  contentStrategy: string | null;
  linkedInActivity: string | null;
  videoInvestment: string | null;
  uspCommunication: string | null;
}

export interface BusinessAnalysisData {
  growthStage: string | null;
  competitivePosition: string | null;
  uspClarity: string | null;
  targetMarketClarity: string | null;
  grantEligibility: string | null;
}

export interface AIGrowthToolsData {
  currentAIUsage: string | null;
  salesProcessAutomation: string | null;
  teamOpenness: string | null;
  aiToolsInterest: string | null;
}

export interface SalesEnablementData {
  salesProcess: string | null;
  discoveryCallQuality: string | null;
  objectionHandling: string | null;
  pipelineReview: string | null;
}

export interface BrandPositioningData {
  currentPositioning: string | null;
  messagingConsistency: string | null;
  icpClarity: string | null;
  gtmReadiness: string | null;
}

export interface PartnershipsData {
  referralStructure: string | null;
  partnerRelationships: string | null;
  coMarketingActivity: string | null;
  channelStrategy: string | null;
}

export interface ClosingData {
  topPriorityFix: string | null;
  previousAgencyExperience: string | null;
  twelveMonthSuccessVision: string | null;
  monthlyBudget: string | null;
  startTimeline: string | null;
}

export interface QualificationSignals {
  budgetIndicated: boolean;
  timelineUrgent: boolean;
  decisionMaker: boolean;
  painClearlyArticulated: boolean;
  previousAgencyExperience: boolean;
  readyToStart: boolean;
  qualificationScore: number;
}

// ─── Full Extracted Data Object ───
export interface ExtractedConsultationData {
  company: CompanyInfo;
  primaryPainBranch: PainBranch | null;
  secondaryPainBranches: PainBranch[];
  businessAnalysis: BusinessAnalysisData;
  leadGeneration: LeadGenData;
  digitalPresence: DigitalPresenceData;
  systemsOperations: SystemsOpsData;
  contentBrand: ContentBrandData;
  aiGrowthTools: AIGrowthToolsData;
  salesEnablement: SalesEnablementData;
  clientRetention: ClientRetentionData;
  brandPositioning: BrandPositioningData;
  partnerships: PartnershipsData;
  closing: ClosingData;
  qualification: QualificationSignals;
  currentStage: ConsultationStage;
  questionsAsked: string[];
  keyInsights: string[];
}

// ─── Discovery Page Config ───
export interface DiscoveryPageConfig {
  slug: string;
  heroTitle: string;
  heroSubtitle: string;
  valueProps: string[];
  industry: string;
  systemPromptAdditions?: string;
  customQuestionFramework?: string;
  firstMessage?: string;
  companyLogo?: string;
  companyName?: string;
  companyDescription?: string;
  contactName?: string;
  knownClients?: string[];
  heroImage?: string;
  website?: string;
}

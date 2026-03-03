// ─── Consultation Stage Tracking ───
export type ConsultationStage =
  | "opening"
  | "branch_detection"
  | "lead_generation"
  | "digital_presence"
  | "systems_operations"
  | "client_retention"
  | "content_brand"
  | "closing"
  | "complete";

// ─── Pain Branch Identifiers ───
export type PainBranch =
  | "lead_generation"
  | "digital_presence"
  | "systems_operations"
  | "client_retention"
  | "content_brand";

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
  leadGeneration: LeadGenData;
  digitalPresence: DigitalPresenceData;
  systemsOperations: SystemsOpsData;
  clientRetention: ClientRetentionData;
  contentBrand: ContentBrandData;
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
}

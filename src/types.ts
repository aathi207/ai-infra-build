export type DPITab = 
  | 'overview'
  | 'identity'
  | 'payments'
  | 'consent'
  | 'grievance'
  | 'policy'
  | 'procurement'
  | 'deliberation';

export interface VerifiableCredential {
  id: string;
  holderDid: string;
  holderName: string;
  credentialType: 'NationalCitizenID' | 'FarmerLandCertificate' | 'DisabilityWelfarePass' | 'HealthcareUniversalToken' | 'CleanEnergyOperator';
  issuingAuthority: string;
  issuedAt: string;
  expiresAt: string;
  status: 'valid' | 'revoked' | 'suspended';
  claims: Record<string, string | number | boolean>;
  zkProofCapable: boolean;
  tamperProofHash: string;
}

export interface DBTTransaction {
  id: string;
  timestamp: string;
  beneficiaryDid: string;
  beneficiaryMaskedName: string;
  schemeName: string;
  amountUSD: number;
  status: 'Disbursed' | 'Flagged_Anomaly' | 'Escrow_Pending' | 'Rejected';
  routingChannel: 'Direct-Central-Treasury' | 'Inter-Bank-Gateway' | 'Micro-ATM-Kiosk';
  riskScore: number; // 0 to 100
  anomalyReason?: string;
}

export interface ConsentArtifact {
  id: string;
  citizenDid: string;
  dataConsumer: string;
  purpose: string;
  dataAttributesShared: string[];
  durationDays: number;
  status: 'ACTIVE' | 'EXPIRED' | 'REVOKED';
  createdDate: string;
  autoExpiryDate: string;
  privacyTier: 'Differential_Privacy_High' | 'K_Anonymity_5' | 'Zero_Knowledge_Predicate';
}

export interface CitizenGrievance {
  id: string;
  title: string;
  description: string;
  language: string;
  category: string;
  department: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  urgencyScore: number;
  sentiment: string;
  location: string;
  status: 'TRIAGED_DISPATCHED' | 'CREW_EN_ROUTE' | 'UNDER_REPAIR' | 'RESOLVED';
  slaHours: number;
  timeRemainingHours: number;
  submittedAt: string;
  citizenNotification: string;
  suggestedWorkOrder?: {
    title: string;
    actionSteps: string[];
    estimatedCostUSD: number;
    crewRequired: string;
  };
  applicableWelfareSchemes?: string[];
}

export interface PolicySimulationResult {
  summary: string;
  feasibilityScore: number;
  projectedBenefits: string[];
  projectedRisks: string[];
  economicImpactMetrics: {
    gdpMultiplier: number;
    giniCoefficientChange: number;
    jobsCreatedEstimated: number;
    expectedRoiPercent: number;
  };
  timeSeriesProjections: {
    month: string;
    adoptionRate: number;
    fiscalCostM: number;
    citizenSatisfaction: number;
  }[];
  recommendedSafeguards: string[];
}

export interface TenderAuditRecord {
  id: string;
  title: string;
  procuringAgency: string;
  budgetAllocatedUSD: number;
  winningBidUSD: number;
  vendorName: string;
  biddersCount: number;
  anomalyScore: number;
  riskClassification: 'Critical' | 'High' | 'Moderate' | 'Clean';
  flaggedSignals: string[];
  auditStatus: 'Pending_AI_Review' | 'Flagged_Forensic_Review' | 'Verified_Compliant' | 'Frozen_Anti_Corruption';
}

export interface DeliberationBill {
  id: string;
  title: string;
  code: string;
  status: 'Open_For_Consultation' | 'Under_Parliamentary_Review' | 'Enacted';
  openUntil: string;
  summary: string;
  submissionsCount: number;
  consensusScore: number;
  sentimentBreakdown: {
    positive: number;
    neutral: number;
    concerns: number;
  };
  keyThemes: {
    theme: string;
    supportPercent: number;
    summary: string;
  }[];
}

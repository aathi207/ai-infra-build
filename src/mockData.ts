import { VerifiableCredential, DBTTransaction, ConsentArtifact, CitizenGrievance, TenderAuditRecord, DeliberationBill } from './types';

export const INITIAL_CREDENTIALS: VerifiableCredential[] = [
  {
    id: "VC-88219-NAT",
    holderDid: "did:dpi:gov:9948-2831-9014",
    holderName: "Elena Rostova",
    credentialType: "NationalCitizenID",
    issuingAuthority: "Ministry of Digital Affairs & Identity Registry",
    issuedAt: "2024-01-15",
    expiresAt: "2034-01-15",
    status: "valid",
    claims: {
      isResident: true,
      ageOver18: true,
      jurisdiction: "District 04 Central",
      civilRegistryStatus: "Verified_Biometric_Anchor"
    },
    zkProofCapable: true,
    tamperProofHash: "0x9f83a8b29c011e4e588a1bca9821ef90"
  },
  {
    id: "VC-41092-AGR",
    holderDid: "did:dpi:gov:7712-4019-3382",
    holderName: "Kwame Mensah",
    credentialType: "FarmerLandCertificate",
    issuingAuthority: "National Agrarian DPI Registry",
    issuedAt: "2023-08-20",
    expiresAt: "2028-08-20",
    status: "valid",
    claims: {
      parcelId: "AGR-ZONE-881A",
      hectaresOwned: 4.8,
      dripIrrigationCertified: true,
      soilHealthScore: 84
    },
    zkProofCapable: true,
    tamperProofHash: "0x7a31b402e88cfa9194bb10372d8e40f1"
  },
  {
    id: "VC-10293-WEL",
    holderDid: "did:dpi:gov:6618-9921-5503",
    holderName: "Amina Al-Mansoor",
    credentialType: "DisabilityWelfarePass",
    issuingAuthority: "Ministry of Social Inclusion & Health",
    issuedAt: "2024-03-10",
    expiresAt: "2027-03-10",
    status: "valid",
    claims: {
      entitlementTier: "Tier 1 - Full Mobility Grant",
      assistiveTechApproved: true,
      monthlyStipendEligible: true
    },
    zkProofCapable: true,
    tamperProofHash: "0x61de88f01c9ab482776c5b91e77f0a12"
  },
  {
    id: "VC-55928-HLT",
    holderDid: "did:dpi:gov:3391-7720-1129",
    holderName: "Mateo Silva",
    credentialType: "HealthcareUniversalToken",
    issuingAuthority: "Universal Public Health Exchange (UPHE)",
    issuedAt: "2024-05-01",
    expiresAt: "2029-05-01",
    status: "valid",
    claims: {
      bloodGroup: "O+",
      primaryCareCenter: "Metro Health Hub 12",
      organDonorConsent: true,
      universalCoverageActive: true
    },
    zkProofCapable: true,
    tamperProofHash: "0x4492fb8183ac90e118ba9320cb45df71"
  }
];

export const INITIAL_TRANSACTIONS: DBTTransaction[] = [
  {
    id: "DBT-TX-99824",
    timestamp: "2 mins ago",
    beneficiaryDid: "did:dpi:gov:7712-4019-3382",
    beneficiaryMaskedName: "K. Mensah",
    schemeName: "Seasonal Crop Seed & Solar Subsidy",
    amountUSD: 420.00,
    status: "Disbursed",
    routingChannel: "Direct-Central-Treasury",
    riskScore: 4
  },
  {
    id: "DBT-TX-99823",
    timestamp: "7 mins ago",
    beneficiaryDid: "did:dpi:gov:6618-9921-5503",
    beneficiaryMaskedName: "A. Al-Mansoor",
    schemeName: "Universal Assistive Mobility Stipend",
    amountUSD: 310.00,
    status: "Disbursed",
    routingChannel: "Inter-Bank-Gateway",
    riskScore: 2
  },
  {
    id: "DBT-TX-99822",
    timestamp: "14 mins ago",
    beneficiaryDid: "did:dpi:gov:8819-0012-9981",
    beneficiaryMaskedName: "G. *******",
    schemeName: "Urban Emergency Winter Fuel Allowance",
    amountUSD: 850.00,
    status: "Flagged_Anomaly",
    routingChannel: "Micro-ATM-Kiosk",
    riskScore: 89,
    anomalyReason: "High-frequency multiple claim attempts from same IP within 180 seconds; potential identity clone."
  },
  {
    id: "DBT-TX-99821",
    timestamp: "22 mins ago",
    beneficiaryDid: "did:dpi:gov:1192-3349-8820",
    beneficiaryMaskedName: "L. Chen",
    schemeName: "Post-Secondary STEM Scholarship Grant",
    amountUSD: 1250.00,
    status: "Disbursed",
    routingChannel: "Direct-Central-Treasury",
    riskScore: 6
  },
  {
    id: "DBT-TX-99820",
    timestamp: "38 mins ago",
    beneficiaryDid: "did:dpi:gov:5512-8839-4411",
    beneficiaryMaskedName: "M. *******",
    schemeName: "Rural Smallholder Livestock Grant",
    amountUSD: 2400.00,
    status: "Flagged_Anomaly",
    routingChannel: "Inter-Bank-Gateway",
    riskScore: 94,
    anomalyReason: "Beneficiary DID linked to deceased civil registry record; flagged for anti-ghost verification."
  }
];

export const INITIAL_CONSENTS: ConsentArtifact[] = [
  {
    id: "DEPA-ART-7721",
    citizenDid: "did:dpi:gov:9948-2831-9014",
    dataConsumer: "National Statistical & Economic Planning Bureau",
    purpose: "Census demographic research and public transit route density planning",
    dataAttributesShared: ["District_Zone", "Commute_Frequency", "Age_Bracket"],
    durationDays: 90,
    status: "ACTIVE",
    createdDate: "2025-01-10",
    autoExpiryDate: "2025-04-10",
    privacyTier: "Differential_Privacy_High"
  },
  {
    id: "DEPA-ART-7722",
    citizenDid: "did:dpi:gov:7712-4019-3382",
    dataConsumer: "Agri-Tech Cooperative Financial Network",
    purpose: "Automated micro-crop insurance underwriting based on verified land deed",
    dataAttributesShared: ["Land_Parcel_Coordinates", "Soil_Index", "Harvest_Yield_Estimate"],
    durationDays: 365,
    status: "ACTIVE",
    createdDate: "2024-11-01",
    autoExpiryDate: "2025-11-01",
    privacyTier: "Zero_Knowledge_Predicate"
  },
  {
    id: "DEPA-ART-7720",
    citizenDid: "did:dpi:gov:3391-7720-1129",
    dataConsumer: "Clinical Health Research Institute",
    purpose: "Cardiovascular epidemiological study across metropolitan population",
    dataAttributesShared: ["Anonymized_Vitals", "Prescription_Classes"],
    durationDays: 180,
    status: "ACTIVE",
    createdDate: "2024-12-15",
    autoExpiryDate: "2025-06-15",
    privacyTier: "K_Anonymity_5"
  }
];

export const INITIAL_GRIEVANCES: CitizenGrievance[] = [
  {
    id: "GRV-7841",
    title: "Main Water Aqueduct Rupture Flooding Sector 9",
    description: "Major potable water main line ruptured near Community Clinic. Water pressure lost across 400 households and flooding road.",
    language: "English",
    category: "Water & Sanitation",
    department: "Municipal Water Works & Emergency Supply Division",
    priority: "Critical",
    urgencyScore: 96,
    sentiment: "Distressed / Urgent",
    location: "Sector 9, Maple Avenue Crossway",
    status: "CREW_EN_ROUTE",
    slaHours: 4,
    timeRemainingHours: 1.8,
    submittedAt: "2 hours ago",
    citizenNotification: "Emergency dispatch active. Rapid Isolation Valve Crew #04 dispatched with GPS tracking. Water tanker deployed to Clinic.",
    suggestedWorkOrder: {
      title: "Main Feeder Pipeline 24-inch Emergency Splicing",
      actionSteps: [
        "Isolate Valve Substation 14B",
        "Deploy high-capacity vacuum dewatering pump",
        "Perform robotic weld splice on ruptured section"
      ],
      estimatedCostUSD: 1850,
      crewRequired: "Hydraulic Engineering Emergency Crew (4 Specialists)"
    },
    applicableWelfareSchemes: [
      "Municipal Emergency Utility Continuity Protocol",
      "Potable Water Relief Supply"
    ]
  },
  {
    id: "GRV-7840",
    title: "Old Age Pension Disbursement Delayed for 45 Days",
    description: "My grandmother is 82 years old. Her monthly senior citizen pension deposit has not reflected in her bank account since December.",
    language: "English",
    category: "Social Welfare & Pensions",
    department: "Department of Social Security & Direct Benefit Transfer",
    priority: "High",
    urgencyScore: 84,
    sentiment: "Anxious / Frustrated",
    location: "Ward 12, Old Town Residential",
    status: "UNDER_REPAIR",
    slaHours: 24,
    timeRemainingHours: 9.5,
    submittedAt: "14 hours ago",
    citizenNotification: "DPI DBT ledger reviewed: Bank IFSC code auto-migrated after merger. Escrow payment re-routed and will credit within 12 hours.",
    suggestedWorkOrder: {
      title: "Direct Account Remapping & Retroactive Escrow Release",
      actionSteps: [
        "Verify biometric Aadhaar/National ID seed link",
        "Remap central treasury route to updated bank routing transit code",
        "Trigger expedited DBT payout batch release"
      ],
      estimatedCostUSD: 0,
      crewRequired: "DPI DBT Operations Desk"
    },
    applicableWelfareSchemes: [
      "Universal Senior Citizen Social Security Scheme",
      "Expedited Hardship Welfare Overdraft"
    ]
  },
  {
    id: "GRV-7839",
    title: "Streetlights Out Across School Zone Crossing",
    description: "Series of 8 LED street lamps failed along the pedestrian crossing near Government Girls Senior Secondary School.",
    language: "English",
    category: "Energy & Public Lighting",
    department: "Municipal Power & Smart Lighting Directorate",
    priority: "Medium",
    urgencyScore: 68,
    sentiment: "Concerned Citizen",
    location: "West District, Junction 44",
    status: "TRIAGED_DISPATCHED",
    slaHours: 48,
    timeRemainingHours: 32,
    submittedAt: "16 hours ago",
    citizenNotification: "Logged under Smart Grid Lighting Work Order #SL-291. Circuit breaker replacement scheduled for today's evening maintenance run.",
    suggestedWorkOrder: {
      title: "School Zone Smart Luminaire Circuit Replacement",
      actionSteps: [
        "Inspect Sub-phase Junction Box 88",
        "Replace burnt surge arrester module",
        "Sync smart light sensors to centralized municipal mesh"
      ],
      estimatedCostUSD: 320,
      crewRequired: "Electrical Field Maintenance Crew (2 Techs)"
    }
  }
];

export const INITIAL_TENDERS: TenderAuditRecord[] = [
  {
    id: "TND-2025-8841",
    title: "Metropolitan Smart Traffic Signal & AI Video Sensor Upgrade",
    procuringAgency: "Department of Urban Mobility & Transport Infrastructure",
    budgetAllocatedUSD: 3200000,
    winningBidUSD: 3140000,
    vendorName: "Apex Urban Visionary Systems Ltd.",
    biddersCount: 4,
    anomalyScore: 88,
    riskClassification: "Critical",
    flaggedSignals: [
      "Bidding syndicate IP collision across 3 rival bidders",
      "Vendor incorporated only 22 days prior to RFP release",
      "Hardware markup exceeds open DPI reference benchmark by 182%"
    ],
    auditStatus: "Flagged_Forensic_Review"
  },
  {
    id: "TND-2025-8840",
    title: "Procurement of 40,000 High-Efficiency Solar Water Pumps for Smallholders",
    procuringAgency: "National Renewable Energy & Agrarian Mission",
    budgetAllocatedUSD: 14500000,
    winningBidUSD: 13900000,
    vendorName: "Helios Agri-Power Technologies",
    biddersCount: 11,
    anomalyScore: 12,
    riskClassification: "Clean",
    flaggedSignals: [
      "Healthy competitive spread across 11 verified manufacturers",
      "Direct API verification against ISO solar test lab certificates",
      "Pricing matches global benchmark curve"
    ],
    auditStatus: "Verified_Compliant"
  },
  {
    id: "TND-2025-8839",
    title: "District Hospital Universal Medicine & Surgical Supply Consumables",
    procuringAgency: "State Health Systems Resource Centre",
    budgetAllocatedUSD: 6800000,
    winningBidUSD: 6650000,
    vendorName: "Medix Consortium Holdings",
    biddersCount: 3,
    anomalyScore: 65,
    riskClassification: "High",
    flaggedSignals: [
      "Sole distributor clause effectively excluded 9 potential generic manufacturers",
      "Delivery penalty clauses watered down in final addendum"
    ],
    auditStatus: "Pending_AI_Review"
  }
];

export const INITIAL_BILLS: DeliberationBill[] = [
  {
    id: "BILL-2025-04",
    title: "Digital Public Infrastructure Privacy, AI Oversight & Citizen Data Sovereignty Act",
    code: "DPI-SOV-ACT-2026",
    status: "Open_For_Consultation",
    openUntil: "2026-04-30",
    summary: "A comprehensive legislative framework mandating Zero-Knowledge proofs for public services, automated algorithmic accountability in welfare denials, and statutory rights to data portability across public data trusts.",
    submissionsCount: 3840,
    consensusScore: 78,
    sentimentBreakdown: {
      positive: 64,
      neutral: 21,
      concerns: 15
    },
    keyThemes: [
      {
        theme: "Zero-Knowledge Biometric Verifications",
        supportPercent: 88,
        summary: "Citizens strongly endorse not disclosing raw biometric vectors or national identification numbers to commercial entities."
      },
      {
        theme: "Mandatory Human Appeal on Algorithmic Decisions",
        supportPercent: 94,
        summary: "Unanimous civic consensus that no citizen should be denied food rations or medical benefits by automated AI triggers without mandatory human escalation."
      },
      {
        theme: "Interoperable Health Record Portability",
        supportPercent: 79,
        summary: "Enthusiastic support for one-click medical history transfer between public and private hospitals via open DEPA protocols."
      }
    ]
  },
  {
    id: "BILL-2025-02",
    title: "National Clean Energy Grid Modernization & Decentralized Solar Tariffs",
    code: "GRID-SOLAR-2026",
    status: "Under_Parliamentary_Review",
    openUntil: "2026-03-15",
    summary: "Empowering residential and farming micro-producers to sell clean electricity back into the national grid with automated smart-contract tariff settlement.",
    submissionsCount: 5120,
    consensusScore: 82,
    sentimentBreakdown: {
      positive: 74,
      neutral: 14,
      concerns: 12
    },
    keyThemes: [
      {
        theme: "Smart Meter Net-Billing Transparency",
        supportPercent: 91,
        summary: "Citizens demand real-time telemetry on the DPI energy wallet app instead of delayed monthly reconciliation bills."
      },
      {
        theme: "Grid Resilience & Rural Feeder Guarantees",
        supportPercent: 85,
        summary: "Agricultural unions require at least 8 hours of uninterrupted solar pumping power during peak planting cycles."
      }
    ]
  }
];

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-safe Gemini initialization with telemetry header
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "dummy_key",
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// 1. Citizen Grievance AI Triage & Resolution Engine
app.post("/api/dpi/triage-grievance", async (req, res) => {
  try {
    const { title, description, language = "English", citizenCategory, location } = req.body;
    const ai = getGeminiClient();

    if (!process.env.GEMINI_API_KEY) {
      // Fallback response if API key is not yet set
      return res.json({
        category: "Public Works & Infrastructure",
        department: "Municipal Civil Maintenance Division",
        priority: "High",
        urgencyScore: 88,
        sentiment: "Frustrated / Urgent",
        slaHours: 24,
        suggestedWorkOrder: {
          title: `Rapid Dispatch: ${title || "Citizen Issue"}`,
          actionSteps: [
            "Dispatch ward inspection crew within 4 hours",
            "Perform digital photographic survey and geo-tag repair zone",
            "Deploy repair contractor and update public ledger"
          ],
          estimatedCostUSD: 450,
          crewRequired: "Civil Works Rapid Response Unit (3 Personnel)"
        },
        citizenNotification: `Your grievance has been registered under DPI Ticket #GRV-${Math.floor(1000 + Math.random() * 9000)}. SLA commitment is 24 hours.`,
        applicableWelfareSchemes: [
          "Urban Infrastructure Maintenance Fund",
          "Citizen Civic Rapid Relief Protocol"
        ]
      });
    }

    const prompt = `You are the AI Orchestrator for a National Digital Public Infrastructure (DPI) & Governance platform.
Analyze this citizen grievance/request and provide an automated triage dispatch, SLA prediction, required work order, and citizen notification in ${language}.

Citizen Submission:
- Title: ${title}
- Description: ${description}
- Stated Location: ${location || "District Ward 7"}
- Citizen Category: ${citizenCategory || "General Resident"}

Output strictly valid JSON according to schema.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            category: { type: Type.STRING, description: "Main sector (e.g. Water & Sanitation, Energy, Public Roads, Health, Social Welfare, Land Registry)" },
            department: { type: Type.STRING, description: "Specific government agency/department" },
            priority: { type: Type.STRING, description: "Critical, High, Medium, or Low" },
            urgencyScore: { type: Type.NUMBER, description: "0 to 100 urgency score" },
            sentiment: { type: Type.STRING, description: "Citizen emotional sentiment (e.g. Distressed, Urgent, Inquiring)" },
            slaHours: { type: Type.NUMBER, description: "Estimated resolution SLA in hours" },
            suggestedWorkOrder: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                actionSteps: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING }
                },
                estimatedCostUSD: { type: Type.NUMBER },
                crewRequired: { type: Type.STRING }
              },
              required: ["title", "actionSteps", "estimatedCostUSD", "crewRequired"]
            },
            citizenNotification: { type: Type.STRING, description: "Empathetic, clear, actionable response message for the citizen" },
            applicableWelfareSchemes: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Relevant government entitlements or safety-net schemes that could assist this citizen"
            }
          },
          required: ["category", "department", "priority", "urgencyScore", "sentiment", "slaHours", "suggestedWorkOrder", "citizenNotification", "applicableWelfareSchemes"]
        }
      }
    });

    const result = JSON.parse(response.text?.trim() || "{}");
    res.json(result);
  } catch (error: any) {
    console.error("Grievance Triage Error:", error);
    res.status(500).json({ error: error.message || "Failed to triage grievance" });
  }
});

// 2. Policy & Macro-Fiscal Digital Twin Simulation Engine
app.post("/api/dpi/simulate-policy", async (req, res) => {
  try {
    const { policyTitle, description, targetSector, budgetAllocationMillions, timelineMonths, region } = req.body;
    const ai = getGeminiClient();

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        summary: `Simulated impact of ${policyTitle}: High positive leverage on ${targetSector} with acceptable fiscal deficit impact.`,
        feasibilityScore: 84,
        projectedBenefits: [
          "Direct welfare delivery to 340,000 marginalized beneficiaries",
          "14.2% reduction in administrative leakage via DPI smart contracts",
          "Net positive GDP multiplier of 1.38x over 3 years"
        ],
        projectedRisks: [
          "Last-mile digital literacy barrier in remote rural sub-districts",
          "Short-term treasury cash flow strain in Q2"
        ],
        economicImpactMetrics: {
          gdpMultiplier: 1.38,
          giniCoefficientChange: -0.014,
          jobsCreatedEstimated: 12400,
          expectedRoiPercent: 128
        },
        timeSeriesProjections: [
          { month: "M3", adoptionRate: 25, fiscalCostM: budgetAllocationMillions * 0.3, citizenSatisfaction: 72 },
          { month: "M6", adoptionRate: 58, fiscalCostM: budgetAllocationMillions * 0.65, citizenSatisfaction: 79 },
          { month: "M9", adoptionRate: 82, fiscalCostM: budgetAllocationMillions * 0.88, citizenSatisfaction: 86 },
          { month: "M12", adoptionRate: 94, fiscalCostM: budgetAllocationMillions, citizenSatisfaction: 91 }
        ],
        recommendedSafeguards: [
          "Integrate offline-first digital identity verification with mobile kiosks",
          "Deploy automated DPI audit nodes to monitor fund disbursement daily"
        ]
      });
    }

    const prompt = `You are a Senior Macro-Economist and Digital Public Infrastructure (DPI) Chief Policy Strategist.
Perform a quantitative and qualitative policy simulation for the following proposed public policy / governance reform:

Policy Title: ${policyTitle}
Description: ${description}
Target Sector: ${targetSector}
Allocated Budget: $${budgetAllocationMillions} Million USD
Implementation Timeline: ${timelineMonths} Months
Jurisdiction: ${region || "National / Multi-State"}

Provide a realistic, data-grounded policy simulation report in structured JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            feasibilityScore: { type: Type.NUMBER, description: "0 to 100 score" },
            projectedBenefits: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            projectedRisks: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            economicImpactMetrics: {
              type: Type.OBJECT,
              properties: {
                gdpMultiplier: { type: Type.NUMBER },
                giniCoefficientChange: { type: Type.NUMBER, description: "Negative means reduced inequality (e.g. -0.012)" },
                jobsCreatedEstimated: { type: Type.NUMBER },
                expectedRoiPercent: { type: Type.NUMBER }
              },
              required: ["gdpMultiplier", "giniCoefficientChange", "jobsCreatedEstimated", "expectedRoiPercent"]
            },
            timeSeriesProjections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  month: { type: Type.STRING },
                  adoptionRate: { type: Type.NUMBER, description: "0 to 100%" },
                  fiscalCostM: { type: Type.NUMBER },
                  citizenSatisfaction: { type: Type.NUMBER, description: "0 to 100%" }
                },
                required: ["month", "adoptionRate", "fiscalCostM", "citizenSatisfaction"]
              }
            },
            recommendedSafeguards: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["summary", "feasibilityScore", "projectedBenefits", "projectedRisks", "economicImpactMetrics", "timeSeriesProjections", "recommendedSafeguards"]
        }
      }
    });

    const result = JSON.parse(response.text?.trim() || "{}");
    res.json(result);
  } catch (error: any) {
    console.error("Policy Simulation Error:", error);
    res.status(500).json({ error: error.message || "Failed to simulate policy" });
  }
});

// 3. DPI Fraud & Anomaly Forensic Investigator (Procurement / DBT / Identity)
app.post("/api/dpi/audit-anomaly", async (req, res) => {
  try {
    const { auditType, targetRecord, anomalySignals } = req.body;
    const ai = getGeminiClient();

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        riskLevel: "Critical",
        fraudProbability: 92,
        anomalySummary: "Identified cartel bid pattern with rotating winner sequence and 240% material price inflation relative to benchmark DPI price catalog.",
        evidenceDossier: [
          "Bidders IP addresses shared identical ASN subnet and submitted within 4 minutes of each other",
          "Unit cost for Asphalt Grade-B quoted at $185/ton vs National DPI index of $62/ton",
          "Beneficiary director on winning company is first-degree relation to evaluation committee member"
        ],
        recommendedActions: [
          "Freeze tender award #TND-8942 pending independent state anti-corruption review",
          "Blacklist bidding syndicate entities across national DPI Vendor Registry",
          "Recalculate tender baseline using Open DPI Automated Reverse Auction"
        ],
        complianceViolations: [
          "Public Procurement Transparency Act Section 14B (Collusive Bidding)",
          "DPI Fair Competition & Anti-Trust Standard 2.1"
        ]
      });
    }

    const prompt = `You are the Chief AI Forensic Auditor for a Digital Public Infrastructure (DPI) oversight commission.
Conduct an in-depth fraud and integrity audit on this case:

Audit Type: ${auditType} (e.g. Public Tender Procurement, Direct Benefit Transfer DBT Leakage, Synthetic Identity Sybil Ring)
Target Record Details: ${JSON.stringify(targetRecord)}
Detected Telemetry Anomaly Signals: ${JSON.stringify(anomalySignals)}

Provide a strict, forensic analysis report in JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            riskLevel: { type: Type.STRING, description: "Critical, High, Moderate, or Clean" },
            fraudProbability: { type: Type.NUMBER, description: "0 to 100" },
            anomalySummary: { type: Type.STRING },
            evidenceDossier: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            recommendedActions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            complianceViolations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["riskLevel", "fraudProbability", "anomalySummary", "evidenceDossier", "recommendedActions", "complianceViolations"]
        }
      }
    });

    const result = JSON.parse(response.text?.trim() || "{}");
    res.json(result);
  } catch (error: any) {
    console.error("Forensic Audit Error:", error);
    res.status(500).json({ error: error.message || "Failed to audit anomaly" });
  }
});

// 4. Democratic Deliberation & Public Consultation Synthesizer
app.post("/api/dpi/synthesize-deliberation", async (req, res) => {
  try {
    const { billTitle, billSummary, citizenComments } = req.body;
    const ai = getGeminiClient();

    if (!process.env.GEMINI_API_KEY) {
      return res.json({
        totalSubmissionsAnalyzed: (citizenComments && citizenComments.length) || 1420,
        consensusRate: 68,
        sentimentDistribution: { positive: 54, neutral: 22, concerns: 24 },
        keyThemes: [
          { theme: "Data Sovereignty & Local Storage", supportPercent: 82, summary: "Citizens strongly favor mandatory domestic hosting for core biometric datasets." },
          { theme: "Small Business Compliance Burden", supportPercent: 44, summary: "Small enterprise associations request a 24-month grace window for API integration." },
          { theme: "Algorithmic Recourse & Human-in-the-Loop", supportPercent: 91, summary: "Overwhelming demand for mandatory human review on any automated welfare denial." }
        ],
        bipartisanRecommendations: [
          "Introduce a tiered regulatory sandbox for startups handling under 10k users",
          "Codify clear right-to-human-appeal within 72 hours of automated DPI eligibility decisions",
          "Establish an independent Parliamentary AI Ethics & Privacy Ombudsman"
        ],
        executiveSummary: `The public consultation for "${billTitle}" shows strong majority endorsement (68%), with specific amendments urged around small business compliance relief and strict AI recourse protocols.`
      });
    }

    const prompt = `You are the Parliamentary Deliberation Intelligence Agent for Digital Public Infrastructure (DPI) open governance.
Synthesize public consultation submissions on this proposed civic legislation:

Bill Title: ${billTitle}
Bill Summary: ${billSummary}
Sample Citizen & Stakeholder Submissions: ${JSON.stringify(citizenComments || [])}

Provide a nuanced, neutral synthesis in JSON.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            totalSubmissionsAnalyzed: { type: Type.NUMBER },
            consensusRate: { type: Type.NUMBER, description: "0 to 100 agreement level" },
            sentimentDistribution: {
              type: Type.OBJECT,
              properties: {
                positive: { type: Type.NUMBER },
                neutral: { type: Type.NUMBER },
                concerns: { type: Type.NUMBER }
              },
              required: ["positive", "neutral", "concerns"]
            },
            keyThemes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  theme: { type: Type.STRING },
                  supportPercent: { type: Type.NUMBER },
                  summary: { type: Type.STRING }
                },
                required: ["theme", "supportPercent", "summary"]
              }
            },
            bipartisanRecommendations: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            executiveSummary: { type: Type.STRING }
          },
          required: ["totalSubmissionsAnalyzed", "consensusRate", "sentimentDistribution", "keyThemes", "bipartisanRecommendations", "executiveSummary"]
        }
      }
    });

    const result = JSON.parse(response.text?.trim() || "{}");
    res.json(result);
  } catch (error: any) {
    console.error("Deliberation Synthesis Error:", error);
    res.status(500).json({ error: error.message || "Failed to synthesize deliberation" });
  }
});

// Start server and mount Vite in development
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`GovStack AI DPI & Governance Server running on port ${PORT}`);
  });
}

startServer();

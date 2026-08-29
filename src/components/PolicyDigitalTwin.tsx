import React, { useState } from 'react';
import { 
  BarChart3, 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle2, 
  RefreshCw, 
  Play, 
  Layers, 
  Briefcase, 
  ShieldCheck, 
  Users
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { PolicySimulationResult } from '../types';

export const PolicyDigitalTwin: React.FC = () => {
  const [policyTitle, setPolicyTitle] = useState('Universal Clean Energy Micro-Producer Feed-in Tariff & Grid Subsidy');
  const [description, setDescription] = useState(
    'Incentivize 250,000 rural farming households and urban rooftops to install 3kW solar panels and sell excess clean power to the national grid with automated smart-contract payments.'
  );
  const [targetSector, setTargetSector] = useState('Clean Energy & Agrarian');
  const [budgetAllocationMillions, setBudgetAllocationMillions] = useState(180);
  const [timelineMonths, setTimelineMonths] = useState(12);
  const [region, setRegion] = useState('National / Multi-District');
  const [simulating, setSimulating] = useState(false);

  const [simulationResult, setSimulationResult] = useState<PolicySimulationResult | null>({
    summary: "Simulated impact of Clean Energy Feed-in Tariff: Significant positive multiplier on rural household income with long-term carbon emissions abatement.",
    feasibilityScore: 88,
    projectedBenefits: [
      "250,000 rural families gain ~$45/month in supplemental clean energy export income",
      "Reduces state grid peak load carbon emissions by 410,000 tons annually",
      "Automated smart contracts settle tariffs in < 30 seconds via DPI payment rails"
    ],
    projectedRisks: [
      "Local grid substation transformer capacity bottlenecks in remote wards",
      "Initial solar hardware supply chain import delays in Q1"
    ],
    economicImpactMetrics: {
      gdpMultiplier: 1.44,
      giniCoefficientChange: -0.018,
      jobsCreatedEstimated: 14800,
      expectedRoiPercent: 134
    },
    timeSeriesProjections: [
      { month: "Month 3", adoptionRate: 22, fiscalCostM: 45, citizenSatisfaction: 74 },
      { month: "Month 6", adoptionRate: 54, fiscalCostM: 98, citizenSatisfaction: 82 },
      { month: "Month 9", adoptionRate: 81, fiscalCostM: 142, citizenSatisfaction: 88 },
      { month: "Month 12", adoptionRate: 96, fiscalCostM: 180, citizenSatisfaction: 93 }
    ],
    recommendedSafeguards: [
      "Mandate dynamic grid congestion pricing to prevent rural feeder overheating",
      "Integrate automated DPI hardware serial number verification to prevent fake panel fraud"
    ]
  });

  const presetPolicies = [
    {
      title: "Universal Early Childhood Nutrition Stipend via DPI-DBT",
      description: "Direct $60/month nutrition cash transfer to mothers of children aged 0-5 years mapped to verifiable birth registry records.",
      sector: "Public Health & Social Welfare",
      budget: 320,
      months: 24
    },
    {
      title: "Zero-Fee Instant Business License & Municipal Tax Holiday for Youth Startups",
      description: "Automated single-window algorithmic business registration in 5 minutes via DPI national registry with 1-year municipal tax exemption.",
      sector: "Commerce & Economic Development",
      budget: 85,
      months: 12
    },
    {
      title: "AI-Managed Dynamic Municipal Congestion & Emission Pricing",
      description: "Automated road-user toll pricing based on real-time air quality sensors and traffic volume, reinvesting 100% of revenue into free electric bus transit.",
      sector: "Urban Mobility & Environment",
      budget: 110,
      months: 18
    }
  ];

  const handleApplyPreset = (preset: typeof presetPolicies[0]) => {
    setPolicyTitle(preset.title);
    setDescription(preset.description);
    setTargetSector(preset.sector);
    setBudgetAllocationMillions(preset.budget);
    setTimelineMonths(preset.months);
  };

  const handleRunSimulation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!policyTitle.trim()) return;

    setSimulating(true);
    try {
      const res = await fetch("/api/dpi/simulate-policy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          policyTitle,
          description,
          targetSector,
          budgetAllocationMillions,
          timelineMonths,
          region
        })
      });

      const data = await res.json();
      setSimulationResult(data);
    } catch (err) {
      console.error("Policy simulation error:", err);
    } finally {
      setSimulating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-purple-500/10 text-purple-300 border border-purple-500/30">
                AI POLICY DIGITAL TWIN
              </span>
              <h2 className="text-xl font-bold text-white">Predictive Macro-Fiscal Sandbox for Public Governance</h2>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl">
              Stress-test legislative reforms and fiscal interventions before national rollout. Gemini 3.7 models macroeconomic multiplier effects, Gini inequality shifts, adoption curves, and operational bottlenecks.
            </p>
          </div>

          <div className="bg-slate-950 px-3.5 py-2 rounded-lg border border-slate-800 text-xs font-mono">
            <span className="text-slate-400 block text-[10px]">Model Archetype</span>
            <span className="text-purple-400 font-bold text-sm">Gemini 3.7 Multi-Agent</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Policy Formulation & Real-Time Simulation Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Policy Parameters Config */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <h3 className="text-sm font-bold text-white">Policy Hypothesis Sandbox</h3>
            </div>

            {/* Presets */}
            <div className="mb-4">
              <span className="text-[10px] font-mono text-slate-400 block mb-1.5">Load Policy Archetype:</span>
              <div className="space-y-1.5">
                {presetPolicies.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyPreset(preset)}
                    className="w-full text-left p-2 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 transition-colors"
                  >
                    <div className="font-semibold text-white truncate">{preset.title}</div>
                    <div className="text-[10px] text-slate-400 font-mono flex items-center gap-2 mt-0.5">
                      <span>{preset.sector}</span>
                      <span>•</span>
                      <span className="text-purple-300">${preset.budget}M Budget</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleRunSimulation} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Policy Proposal Title</label>
                <input
                  type="text"
                  required
                  value={policyTitle}
                  onChange={(e) => setPolicyTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Target Sector</label>
                  <input
                    type="text"
                    value={targetSector}
                    onChange={(e) => setTargetSector(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Jurisdiction</label>
                  <input
                    type="text"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Budget ($ Millions USD)</label>
                  <input
                    type="number"
                    min="1"
                    max="50000"
                    value={budgetAllocationMillions}
                    onChange={(e) => setBudgetAllocationMillions(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Horizon (Months)</label>
                  <input
                    type="number"
                    min="1"
                    max="60"
                    value={timelineMonths}
                    onChange={(e) => setTimelineMonths(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Mechanisms & Implementation Plan</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={simulating}
                className="w-full py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-bold shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {simulating ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Simulating Multi-Agent Macro Dynamics...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    Execute AI Digital Twin Simulation
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Quantitative & Qualitative Projection Dash */}
        <div className="lg:col-span-7 space-y-5">
          {simulationResult ? (
            <div className="space-y-5">
              {/* Executive Summary & Feasibility Score */}
              <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 block">
                      Policy Simulation Report
                    </span>
                    <h3 className="text-base font-bold text-white mt-0.5">{policyTitle}</h3>
                  </div>

                  <div className="flex items-center gap-2 self-start sm:self-auto bg-slate-950 px-3 py-1.5 rounded-lg border border-purple-500/30">
                    <span className="text-xs text-slate-400 font-mono">Feasibility Score:</span>
                    <span className="text-sm font-bold font-mono text-purple-300">
                      {simulationResult.feasibilityScore}/100
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                  {simulationResult.summary}
                </p>

                {/* 4 Core Macro Impact Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-800 text-xs">
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                    <span className="text-slate-500 text-[10px] block font-mono">GDP Multiplier</span>
                    <span className="text-white font-bold text-sm font-mono mt-0.5 flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                      {simulationResult.economicImpactMetrics.gdpMultiplier}x
                    </span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                    <span className="text-slate-500 text-[10px] block font-mono">Gini Index Delta</span>
                    <span className="text-emerald-400 font-bold text-sm font-mono mt-0.5 flex items-center gap-1">
                      <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                      {simulationResult.economicImpactMetrics.giniCoefficientChange}
                    </span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                    <span className="text-slate-500 text-[10px] block font-mono">Jobs Created</span>
                    <span className="text-cyan-300 font-bold text-sm font-mono mt-0.5">
                      +{simulationResult.economicImpactMetrics.jobsCreatedEstimated.toLocaleString()}
                    </span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                    <span className="text-slate-500 text-[10px] block font-mono">Projected ROI</span>
                    <span className="text-purple-300 font-bold text-sm font-mono mt-0.5">
                      {simulationResult.economicImpactMetrics.expectedRoiPercent}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Time Series Recharts Graph */}
              {simulationResult.timeSeriesProjections && simulationResult.timeSeriesProjections.length > 0 && (
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-xs font-bold text-white font-mono flex items-center gap-2">
                      <BarChart3 className="w-3.5 h-3.5 text-purple-400" />
                      Projected Adoption Rate (%) vs Citizen Satisfaction (%)
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400">12-Month Horizon</span>
                  </div>

                  <div className="h-52 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={simulationResult.timeSeriesProjections} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorAdoption" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#a855f7" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#a855f7" stopOpacity={0.0}/>
                          </linearGradient>
                          <linearGradient id="colorSat" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4}/>
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                        <XAxis dataKey="month" stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                        <YAxis stroke="#64748b" tick={{ fontSize: 10, fill: '#94a3b8' }} domain={[0, 100]} />
                        <Tooltip 
                          contentStyle={{ backgroundColor: '#020617', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', color: '#fff' }}
                        />
                        <Area type="monotone" dataKey="adoptionRate" name="Adoption Rate %" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorAdoption)" />
                        <Area type="monotone" dataKey="citizenSatisfaction" name="Satisfaction %" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorSat)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              )}

              {/* Benefits, Risks & Safeguards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" /> Projected Systemic Benefits
                  </span>
                  <ul className="space-y-1.5 text-slate-300 font-mono text-[11px]">
                    {simulationResult.projectedBenefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-emerald-400">✓</span> {b}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                  <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4" /> Identified Implementation Risks
                  </span>
                  <ul className="space-y-1.5 text-slate-300 font-mono text-[11px]">
                    {simulationResult.projectedRisks.map((r, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-amber-400">⚠</span> {r}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-64 rounded-xl border border-slate-800 bg-slate-900 flex items-center justify-center text-slate-500 text-xs">
              Configure parameters and execute simulation to view results.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { 
  ShieldCheck, 
  Fingerprint, 
  CreditCard, 
  Lock, 
  MessageSquareWarning, 
  BarChart3, 
  Scale, 
  Users2, 
  ArrowUpRight, 
  Sparkles, 
  Cpu, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingDown, 
  Zap, 
  Server,
  Network
} from 'lucide-react';
import { DPITab } from '../types';

interface OverviewProps {
  setActiveTab: (tab: DPITab) => void;
  systemMetrics: {
    verifiedCitizens: string;
    treasuryDisbursed: string;
    avgSlaHours: string;
    fraudPrevented: string;
  };
}

export const DPIExecutiveOverview: React.FC<OverviewProps> = ({ setActiveTab, systemMetrics }) => {
  return (
    <div className="space-y-6">
      {/* Hero / Strategic Statement Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-950 border border-slate-800 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Next-Generation Digital Public Goods & Open Governance Protocol
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
              AI-Orchestrated Digital Public Infrastructure (DPI)
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl">
              An open-source governance stack integrating <span className="text-white font-medium">Verifiable Digital Identity</span>, 
              <span className="text-emerald-400 font-medium"> Direct Benefit Transfer (DBT)</span>, and 
              <span className="text-cyan-400 font-medium"> DEPA Consent Data Architecture</span> with autonomous Gemini 3.7 agents 
              for continuous public policy simulations, zero-leakage municipal procurement audits, and proactive citizen grievance triage.
            </p>

            {/* Core Capability Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 text-xs border border-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Zero-Knowledge Privacy Proofs
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 text-xs border border-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
                Autonomous Municipal Work Orders
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 text-xs border border-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                Multi-Agent Policy Simulation
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800/80 text-slate-300 text-xs border border-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                Cartel Bidding Forensic Hunter
              </span>
            </div>
          </div>

          {/* Real-time System Pulse Card */}
          <div className="lg:col-span-4 bg-slate-950/70 border border-slate-800/90 rounded-xl p-5 backdrop-blur-sm">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <Server className="w-3.5 h-3.5 text-cyan-400" /> DPI Consensus Engine
              </span>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                HEALTHY (99.98%)
              </span>
            </div>

            <div className="space-y-3 pt-3 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Throughput:</span>
                <span className="font-mono text-white font-semibold">14,280 tx/sec</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Treasury Leakage Rate:</span>
                <span className="font-mono text-emerald-400 font-semibold flex items-center gap-1">
                  <TrendingDown className="w-3 h-3" /> 0.04% <span className="text-[10px] text-slate-500">(-14.2%)</span>
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Mean Grievance Triage:</span>
                <span className="font-mono text-cyan-400 font-semibold">1.4 seconds (AI Auto)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">ZK-Proof Verification:</span>
                <span className="font-mono text-purple-300 font-semibold">&lt; 42ms per claim</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 DPI Pillars + 4 Governance Wings Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Network className="w-4 h-4 text-cyan-400" />
              Foundational DPI Pillars & AI Governance Wings
            </h3>
            <p className="text-xs text-slate-400">
              Explore the core architectural modules powering national public digital infrastructure
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Pillar 1 */}
          <div 
            onClick={() => setActiveTab('identity')}
            className="group cursor-pointer bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-5 transition-all duration-200 shadow-lg relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                <Fingerprint className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                DPI PILLAR 1
              </span>
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
              Verifiable Identity & Credentials
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
            </h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Self-Sovereign Identity (SSI) with Zero-Knowledge proofs for selective disclosure without biometric exposure. AI Sybil fraud scanner.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Active Credentials:</span>
              <span className="text-cyan-400 font-semibold">{systemMetrics.verifiedCitizens}</span>
            </div>
          </div>

          {/* Pillar 2 */}
          <div 
            onClick={() => setActiveTab('payments')}
            className="group cursor-pointer bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl p-5 transition-all duration-200 shadow-lg relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                <CreditCard className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                DPI PILLAR 2
              </span>
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center justify-between">
              Unified Payments & DBT Flows
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400" />
            </h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Real-time Direct Benefit Transfer ledger with AI ghost-beneficiary hunter, biometric deceased matching, and liquidity routing.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Disbursed YTD:</span>
              <span className="text-emerald-400 font-semibold">{systemMetrics.treasuryDisbursed}</span>
            </div>
          </div>

          {/* Pillar 3 */}
          <div 
            onClick={() => setActiveTab('consent')}
            className="group cursor-pointer bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-indigo-500/50 rounded-xl p-5 transition-all duration-200 shadow-lg relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-105 transition-transform">
                <Lock className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800">
                DPI PILLAR 3
              </span>
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors flex items-center justify-between">
              DEPA Consent & Privacy Bus
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-indigo-400" />
            </h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Data Empowerment and Protection Architecture. Granular, time-bound consent artifacts with differential privacy & automated PII scrubbers.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Consent Artifacts:</span>
              <span className="text-indigo-400 font-semibold">1,240,900 Active</span>
            </div>
          </div>

          {/* Wing 1 */}
          <div 
            onClick={() => setActiveTab('grievance')}
            className="group cursor-pointer bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-xl p-5 transition-all duration-200 shadow-lg relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                <MessageSquareWarning className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-slate-700">
                GOVERNANCE WING
              </span>
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors flex items-center justify-between">
              Citizen Grievance Copilot & SLA
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400" />
            </h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Multilingual voice/text grievance redressal with automated department triage, emergency work orders, and strict SLA enforcement.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>SLA Resolution Rate:</span>
              <span className="text-cyan-400 font-semibold">97.8% on-time</span>
            </div>
          </div>

          {/* Wing 2 */}
          <div 
            onClick={() => setActiveTab('policy')}
            className="group cursor-pointer bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-purple-500/50 rounded-xl p-5 transition-all duration-200 shadow-lg relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                <BarChart3 className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-800 text-purple-300 border border-slate-700">
                GOVERNANCE WING
              </span>
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors flex items-center justify-between">
              Policy & Fiscal Digital Twin
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-purple-400" />
            </h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              AI Macro-simulation engine to stress-test public policy proposals, budgetary impacts, Gini inequality shifts, and citizen adoption curves.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Simulated Scenarios:</span>
              <span className="text-purple-400 font-semibold">48 Policies Tested</span>
            </div>
          </div>

          {/* Wing 3 */}
          <div 
            onClick={() => setActiveTab('procurement')}
            className="group cursor-pointer bg-slate-900/60 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-xl p-5 transition-all duration-200 shadow-lg relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                <Scale className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                GOVERNANCE WING
              </span>
            </div>
            <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
              Procurement & Tender AI Auditor
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
            </h4>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              Automated anti-corruption auditor detecting cartel bidding syndicates, supplier kickbacks, and price gouging across public tenders.
            </p>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Leakage Prevented:</span>
              <span className="text-amber-400 font-semibold">{systemMetrics.fraudPrevented}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time DPI Audit Trail Stream */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Live DPI Autonomous Node Activity Stream</h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Zero-Trust Event Stream
          </span>
        </div>

        <div className="space-y-2.5 font-mono text-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                ZK_VERIFY_OK
              </span>
              <span className="text-slate-300">
                Citizen DID <span className="text-cyan-300">did:dpi:gov:9948...</span> proved [Age &gt; 18] to E-Voting Gateway with 0 biometric data leaked.
              </span>
            </div>
            <span className="text-slate-500 text-[11px] mt-1 sm:mt-0">12s ago</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
                AI_FRAUD_FLAG
              </span>
              <span className="text-slate-300">
                DBT Anomaly Engine auto-paused $2,400 livestock grant disbursement for DID <span className="text-amber-300">did:dpi:gov:5512...</span> (Deceased registry match).
              </span>
            </div>
            <span className="text-slate-500 text-[11px] mt-1 sm:mt-0">1m ago</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/60">
            <div className="flex items-center gap-3">
              <span className="text-[10px] text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                AUTO_DISPATCH
              </span>
              <span className="text-slate-300">
                Grievance <span className="text-white font-medium">#GRV-7841</span> triaged to Municipal Water Works; Hydraulic Crew #04 dispatched with 4h SLA.
              </span>
            </div>
            <span className="text-slate-500 text-[11px] mt-1 sm:mt-0">3m ago</span>
          </div>
        </div>
      </div>
    </div>
  );
};

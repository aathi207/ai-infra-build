import React, { useState } from 'react';
import { Header } from './components/Header';
import { DPIExecutiveOverview } from './components/DPIExecutiveOverview';
import { DPIIdentityPillar } from './components/DPIIdentityPillar';
import { DPIPaymentsPillar } from './components/DPIPaymentsPillar';
import { DPIConsentPillar } from './components/DPIConsentPillar';
import { CitizenGrievanceHub } from './components/CitizenGrievanceHub';
import { PolicyDigitalTwin } from './components/PolicyDigitalTwin';
import { ProcurementAuditor } from './components/ProcurementAuditor';
import { CivicDeliberation } from './components/CivicDeliberation';
import { DPITab } from './types';
import { ShieldCheck, Network, Cpu, Lock, Github, ExternalLink } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<DPITab>('overview');

  const [systemMetrics] = useState({
    verifiedCitizens: '28.4M',
    treasuryDisbursed: '$1.42B',
    avgSlaHours: '4.2h',
    fraudPrevented: '$342.8M'
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Top Header & Navigation */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        systemMetrics={systemMetrics} 
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'overview' && (
          <DPIExecutiveOverview 
            setActiveTab={setActiveTab} 
            systemMetrics={systemMetrics} 
          />
        )}
        {activeTab === 'identity' && <DPIIdentityPillar />}
        {activeTab === 'payments' && <DPIPaymentsPillar />}
        {activeTab === 'consent' && <DPIConsentPillar />}
        {activeTab === 'grievance' && <CitizenGrievanceHub />}
        {activeTab === 'policy' && <PolicyDigitalTwin />}
        {activeTab === 'procurement' && <ProcurementAuditor />}
        {activeTab === 'deliberation' && <CivicDeliberation />}
      </main>

      {/* DPI Architecture & Open Standards Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-900/60 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <Network className="w-3.5 h-3.5" />
            </div>
            <div>
              <span className="text-white font-semibold">GovStack DPI-AI Matrix</span>
              <span className="text-slate-500 text-[11px] ml-2">Digital Public Goods for Autonomous & Transparent Governance</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> W3C DID / Verifiable Credentials
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <Lock className="w-3.5 h-3.5 text-indigo-400" /> DEPA Consent v2.0
            </span>
            <span className="flex items-center gap-1.5 text-slate-400">
              <Cpu className="w-3.5 h-3.5 text-purple-400" /> Gemini 3.7 Orchestrator
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

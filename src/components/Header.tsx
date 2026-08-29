import React from 'react';
import { 
  ShieldCheck, 
  Layers, 
  Activity, 
  CheckCircle2, 
  Building2, 
  Fingerprint, 
  CreditCard, 
  Lock, 
  MessageSquareWarning, 
  BarChart3, 
  Scale, 
  Users2
} from 'lucide-react';
import { DPITab } from '../types';

interface HeaderProps {
  activeTab: DPITab;
  setActiveTab: (tab: DPITab) => void;
  systemMetrics: {
    verifiedCitizens: string;
    treasuryDisbursed: string;
    avgSlaHours: string;
    fraudPrevented: string;
  };
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, systemMetrics }) => {
  const navItems: { id: DPITab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'overview', label: 'Executive Overview', icon: <Layers className="w-4 h-4" /> },
    { id: 'identity', label: 'Identity & Credentials', icon: <Fingerprint className="w-4 h-4" />, badge: 'Pillar 1' },
    { id: 'payments', label: 'Payments & DBT Flow', icon: <CreditCard className="w-4 h-4" />, badge: 'Pillar 2' },
    { id: 'consent', label: 'DEPA Data Consent', icon: <Lock className="w-4 h-4" />, badge: 'Pillar 3' },
    { id: 'grievance', label: 'Citizen Copilot & SLA', icon: <MessageSquareWarning className="w-4 h-4" /> },
    { id: 'policy', label: 'Policy Digital Twin', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'procurement', label: 'Procurement AI Auditor', icon: <Scale className="w-4 h-4" /> },
    { id: 'deliberation', label: 'Civic Deliberation', icon: <Users2 className="w-4 h-4" /> },
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur-md sticky top-0 z-50">
      {/* Top Banner: Status & DPI Telemetry */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3 gap-3 border-b border-slate-800/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-teal-500 to-emerald-400 p-[2px] shadow-lg shadow-cyan-500/20">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                <Building2 className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                  GovStack <span className="text-cyan-400 font-extrabold">DPI-AI</span>
                </h1>
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                  v3.7 Autonomous Core
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Digital Public Infrastructure & AI-Orchestrated Governance Matrix
              </p>
            </div>
          </div>

          {/* Real-time DPI Indicators */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <div className="flex items-center gap-2 bg-slate-950/80 px-3 py-1.5 rounded-lg border border-slate-800">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-300">DPI Mesh: <span className="text-emerald-400 font-semibold">100% Operational</span></span>
            </div>

            <div className="hidden sm:flex items-center gap-4 text-slate-400">
              <div>
                <span className="text-slate-500">Citizen IDs:</span> <span className="text-white font-medium">{systemMetrics.verifiedCitizens}</span>
              </div>
              <div className="h-3 w-px bg-slate-800" />
              <div>
                <span className="text-slate-500">DBT Disbursed:</span> <span className="text-emerald-400 font-medium">{systemMetrics.treasuryDisbursed}</span>
              </div>
              <div className="h-3 w-px bg-slate-800" />
              <div>
                <span className="text-slate-500">Avg AI SLA:</span> <span className="text-cyan-400 font-medium">{systemMetrics.avgSlaHours}</span>
              </div>
              <div className="h-3 w-px bg-slate-800" />
              <div>
                <span className="text-slate-500">Fraud Stopped:</span> <span className="text-amber-400 font-medium">{systemMetrics.fraudPrevented}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <nav className="flex space-x-1 overflow-x-auto py-2 no-scrollbar">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-150 ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                    isActive ? 'bg-cyan-400/20 text-cyan-200' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

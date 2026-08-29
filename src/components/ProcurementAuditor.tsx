import React, { useState } from 'react';
import { 
  Scale, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  Search, 
  Sparkles, 
  RefreshCw, 
  FileText, 
  Gavel, 
  TrendingUp, 
  Building2,
  Lock
} from 'lucide-react';
import { TenderAuditRecord } from '../types';
import { INITIAL_TENDERS } from '../mockData';

export const ProcurementAuditor: React.FC = () => {
  const [tenders, setTenders] = useState<TenderAuditRecord[]>(INITIAL_TENDERS);
  const [selectedTender, setSelectedTender] = useState<TenderAuditRecord>(INITIAL_TENDERS[0]);
  const [auditing, setAuditing] = useState(false);
  const [auditDossier, setAuditDossier] = useState<{
    riskLevel: string;
    fraudProbability: number;
    anomalySummary: string;
    evidenceDossier: string[];
    recommendedActions: string[];
    complianceViolations: string[];
  } | null>(null);

  const handleRunForensicAudit = async (tender: TenderAuditRecord) => {
    setSelectedTender(tender);
    setAuditing(true);
    setAuditDossier(null);

    try {
      const res = await fetch("/api/dpi/audit-anomaly", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          auditType: "Public Tender Procurement & Cartel Collusion",
          targetRecord: tender,
          anomalySignals: tender.flaggedSignals
        })
      });

      const data = await res.json();
      setAuditDossier(data);
    } catch (err) {
      console.error("Forensic audit error:", err);
    } finally {
      setAuditing(false);
    }
  };

  const handleFreezeTender = (tenderId: string) => {
    setTenders(tenders.map(t => {
      if (t.id === tenderId) {
        return { ...t, auditStatus: 'Frozen_Anti_Corruption' };
      }
      return t;
    }));
    if (selectedTender.id === tenderId) {
      setSelectedTender({ ...selectedTender, auditStatus: 'Frozen_Anti_Corruption' });
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-amber-500/10 text-amber-300 border border-amber-500/30">
                GOVERNANCE INTEGRITY
              </span>
              <h2 className="text-xl font-bold text-white">Public Procurement & Tender Anti-Corruption AI Auditor</h2>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl">
              Automated scrutiny of municipal and state public tenders. Detects bid-rigging cartels, shell company rotators, undisclosed conflicts of interest, and material price gouging against open DPI catalog indices.
            </p>
          </div>

          <div className="bg-slate-950 px-3.5 py-2 rounded-lg border border-slate-800 text-xs font-mono">
            <span className="text-slate-400 block text-[10px]">Tender Integrity Watchdog</span>
            <span className="text-amber-400 font-bold text-sm">Active 24/7 AI Audit</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Tenders Watchlist + Forensic Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Tenders Ledger */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center justify-between">
              <span>High-Value Public Tenders Under Audit</span>
              <span className="text-xs font-mono text-slate-400">{tenders.length} Audited Tenders</span>
            </h3>

            <div className="space-y-3">
              {tenders.map((tender) => {
                const isSelected = selectedTender.id === tender.id;
                const isCrit = tender.riskClassification === 'Critical';
                const isHigh = tender.riskClassification === 'High';
                const isFrozen = tender.auditStatus === 'Frozen_Anti_Corruption';

                return (
                  <div
                    key={tender.id}
                    onClick={() => handleRunForensicAudit(tender)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-slate-800 border-amber-500/80 shadow-lg'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono text-amber-400 font-bold">{tender.id}</span>
                          <span className={`text-[9px] font-mono px-2 py-0.5 rounded ${
                            isFrozen
                              ? 'bg-rose-950 text-rose-300 border border-rose-800 font-bold'
                              : isCrit
                              ? 'bg-rose-950 text-rose-300 border border-rose-800'
                              : isHigh
                              ? 'bg-amber-950 text-amber-300 border border-amber-800'
                              : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          }`}>
                            {isFrozen ? 'FROZEN BY AUDIT' : `${tender.riskClassification} Risk (${tender.anomalyScore}/100)`}
                          </span>
                        </div>
                        <h4 className="text-xs font-bold text-white mt-1 line-clamp-1">{tender.title}</h4>
                        <p className="text-[10px] text-slate-400 font-mono mt-0.5">{tender.procuringAgency}</p>
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono">
                      <div>
                        <span className="text-slate-500 text-[10px] block">Winning Bid</span>
                        <span className="text-white font-semibold">${(tender.winningBidUSD / 1000000).toFixed(2)}M</span>
                      </div>
                      <div className="text-right">
                        <span className="text-slate-500 text-[10px] block">Vendor</span>
                        <span className="text-cyan-300 truncate max-w-[130px] block">{tender.vendorName}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: AI Forensic Evidence Dossier */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono text-slate-400">Forensic Integrity Inspection</span>
                </div>
                <h3 className="text-base font-bold text-white mt-1">{selectedTender.title}</h3>
                <p className="text-xs text-slate-400 mt-0.5">Procuring Body: {selectedTender.procuringAgency}</p>
              </div>

              {selectedTender.auditStatus !== 'Frozen_Anti_Corruption' ? (
                <button
                  onClick={() => handleFreezeTender(selectedTender.id)}
                  className="px-3 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 text-xs font-mono font-bold flex items-center gap-1.5 self-start sm:self-auto transition-colors"
                >
                  <Gavel className="w-3.5 h-3.5" />
                  Freeze Tender Award
                </button>
              ) : (
                <span className="px-3 py-1 rounded bg-rose-950 text-rose-300 border border-rose-800 font-mono text-xs font-bold">
                  AWARD FROZEN
                </span>
              )}
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Allocated Budget</span>
                <span className="text-white font-bold text-sm">${(selectedTender.budgetAllocatedUSD / 1000000).toFixed(2)}M</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Awarded Bid</span>
                <span className="text-emerald-400 font-bold text-sm">${(selectedTender.winningBidUSD / 1000000).toFixed(2)}M</span>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Competing Bidders</span>
                <span className="text-cyan-300 font-bold text-sm">{selectedTender.biddersCount} Entities</span>
              </div>
            </div>

            {/* Flagged Signals from Data Pipeline */}
            <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[11px] font-mono text-amber-400 font-semibold flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5" /> Telemetry Flagged Signals:
              </span>
              <ul className="space-y-1 text-xs text-slate-300 font-mono">
                {selectedTender.flaggedSignals.map((sig, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-400">•</span>
                    <span>{sig}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Run Forensic Report Button or Display Dossier */}
            {auditing ? (
              <div className="p-8 rounded-xl bg-slate-950 border border-slate-800 flex flex-col items-center justify-center text-center space-y-2">
                <RefreshCw className="w-6 h-6 animate-spin text-amber-400" />
                <span className="text-xs font-mono text-slate-300">
                  Gemini 3.7 synthesizing corporate registry graph & price catalog deviations...
                </span>
              </div>
            ) : auditDossier ? (
              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-amber-300 font-mono flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      AI FORENSIC AUDIT EVIDENCE DOSSIER
                    </span>
                    <span className="text-xs font-mono text-rose-400 font-bold">
                      Fraud Prob: {auditDossier.fraudProbability}%
                    </span>
                  </div>

                  <p className="text-xs text-slate-200 leading-relaxed font-mono">
                    {auditDossier.anomalySummary}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Forensic Evidence Points:
                    </span>
                    {auditDossier.evidenceDossier.map((ev, idx) => (
                      <div key={idx} className="text-xs text-slate-300 font-mono flex items-start gap-2">
                        <span className="text-amber-400 font-bold">[{idx + 1}]</span>
                        <span>{ev}</span>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-slate-800">
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                      Enforcement Actions:
                    </span>
                    {auditDossier.recommendedActions.map((act, idx) => (
                      <div key={idx} className="text-xs text-emerald-300 font-mono flex items-start gap-2">
                        <span className="text-emerald-400 font-bold">→</span>
                        <span>{act}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <button
                onClick={() => handleRunForensicAudit(selectedTender)}
                className="w-full py-2.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-600/20 flex items-center justify-center gap-2 transition-colors"
              >
                <Sparkles className="w-4 h-4" />
                Generate Complete AI Forensic Audit Dossier
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { 
  CreditCard, 
  ArrowDownRight, 
  ArrowUpRight, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Search, 
  TrendingDown, 
  Sparkles, 
  Zap, 
  Filter, 
  RefreshCw, 
  Send,
  Building,
  Landmark
} from 'lucide-react';
import { DBTTransaction } from '../types';
import { INITIAL_TRANSACTIONS } from '../mockData';

export const DPIPaymentsPillar: React.FC = () => {
  const [transactions, setTransactions] = useState<DBTTransaction[]>(INITIAL_TRANSACTIONS);
  const [filter, setFilter] = useState<'ALL' | 'DISBURSED' | 'FLAGGED'>('ALL');
  const [disbursing, setDisbursing] = useState(false);

  // New DBT Disbursement form state
  const [schemeName, setSchemeName] = useState('Emergency Flood Relief Allowance');
  const [targetDid, setTargetDid] = useState('did:dpi:gov:4421-9901-2244');
  const [beneficiaryName, setBeneficiaryName] = useState('S. Tariq');
  const [amountUSD, setAmountUSD] = useState(350);

  const filteredTxs = transactions.filter((tx) => {
    if (filter === 'DISBURSED') return tx.status === 'Disbursed';
    if (filter === 'FLAGGED') return tx.status === 'Flagged_Anomaly';
    return true;
  });

  const handleTriggerDisbursement = (e: React.FormEvent) => {
    e.preventDefault();
    setDisbursing(true);

    setTimeout(() => {
      // AI checks for anomalies on submission
      const isSuspicious = amountUSD > 3000 || targetDid.includes("0000");
      const newTx: DBTTransaction = {
        id: `DBT-TX-${Math.floor(90000 + Math.random() * 9999)}`,
        timestamp: 'Just now',
        beneficiaryDid: targetDid,
        beneficiaryMaskedName: beneficiaryName,
        schemeName: schemeName,
        amountUSD: Number(amountUSD),
        status: isSuspicious ? 'Flagged_Anomaly' : 'Disbursed',
        routingChannel: 'Direct-Central-Treasury',
        riskScore: isSuspicious ? 92 : 3,
        anomalyReason: isSuspicious ? 'Abnormal lump sum exceedance over historical district median grant cap.' : undefined
      };

      setTransactions([newTx, ...transactions]);
      setDisbursing(false);
    }, 600);
  };

  const handleResolveAnomaly = (txId: string) => {
    setTransactions(transactions.map(t => {
      if (t.id === txId) {
        return { ...t, status: 'Disbursed', riskScore: 10, anomalyReason: 'Manual verified by biometric override desk' };
      }
      return t;
    }));
  };

  return (
    <div className="space-y-6">
      {/* Pillar Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                DPI PILLAR 2
              </span>
              <h2 className="text-xl font-bold text-white">Unified Public Payments & Direct Benefit Transfer (DBT)</h2>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl">
              Zero-leakage fiscal disbursement infrastructure. Direct-to-beneficiary account routing eliminates bureaucratic middlemen, ghost claimants, and bribery rent-seeking via AI biometric matching.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950 px-3.5 py-2 rounded-lg border border-slate-800 text-xs font-mono">
              <span className="text-slate-400 block text-[10px]">Total Leakage Prevented</span>
              <span className="text-emerald-400 font-bold text-sm">$342.8M USD</span>
            </div>
            <div className="bg-slate-950 px-3.5 py-2 rounded-lg border border-slate-800 text-xs font-mono">
              <span className="text-slate-400 block text-[10px]">Mean Settlement Time</span>
              <span className="text-cyan-400 font-bold text-sm">380 milliseconds</span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Disbursement Trigger + Live Transaction Ledger */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Direct Benefit Transfer Dispatcher */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white">Simulate DBT Treasury Payout</h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Trigger a direct welfare grant from the central treasury to a citizen's verifiable DID wallet with real-time AI fraud interception.
            </p>

            <form onSubmit={handleTriggerDisbursement} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Public Welfare Scheme</label>
                <select
                  value={schemeName}
                  onChange={(e) => setSchemeName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                >
                  <option value="Emergency Flood Relief Allowance">Emergency Flood Relief Allowance ($350)</option>
                  <option value="Seasonal Crop Seed & Solar Subsidy">Seasonal Crop Seed & Solar Subsidy ($420)</option>
                  <option value="Universal Assistive Mobility Grant">Universal Assistive Mobility Grant ($310)</option>
                  <option value="Post-Secondary STEM Scholarship Grant">Post-Secondary STEM Scholarship Grant ($1,250)</option>
                  <option value="Rural Livestock Modernization Cap">Rural Livestock Modernization ($2,400)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Beneficiary Masked Alias</label>
                <input
                  type="text"
                  value={beneficiaryName}
                  onChange={(e) => setBeneficiaryName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Beneficiary Verifiable DID</label>
                <input
                  type="text"
                  value={targetDid}
                  onChange={(e) => setTargetDid(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-[11px] focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Disbursement Amount (USD)</label>
                <input
                  type="number"
                  min="10"
                  max="10000"
                  value={amountUSD}
                  onChange={(e) => setAmountUSD(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={disbursing}
                className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {disbursing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    AI Checking Fraud Vectors...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Dispatch DBT Payout
                  </>
                )}
              </button>
            </form>
          </div>

          {/* AI Guardian Protocol Info */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4 space-y-2 text-xs">
            <span className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1.5">
              <ShieldAlert className="w-3.5 h-3.5" /> AI Ghost-Beneficiary Detection
            </span>
            <p className="text-slate-400 leading-relaxed">
              Every payout is verified against dead-citizen civil registries, deduplication biometric seeds, and geographical transaction clusters in milliseconds.
            </p>
          </div>
        </div>

        {/* Right Column: Live DBT Transaction Flow & Anomaly Watch */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-emerald-400" />
                  Live Direct Benefit Transfer (DBT) Stream
                </h3>
                <p className="text-xs text-slate-400">Continuous verifiable public fund disbursement ledger</p>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs font-mono">
                <button
                  onClick={() => setFilter('ALL')}
                  className={`px-2.5 py-1 rounded transition-colors ${filter === 'ALL' ? 'bg-slate-800 text-white font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  All ({transactions.length})
                </button>
                <button
                  onClick={() => setFilter('DISBURSED')}
                  className={`px-2.5 py-1 rounded transition-colors ${filter === 'DISBURSED' ? 'bg-emerald-950 text-emerald-300 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  Clean Disbursed
                </button>
                <button
                  onClick={() => setFilter('FLAGGED')}
                  className={`px-2.5 py-1 rounded transition-colors ${filter === 'FLAGGED' ? 'bg-amber-950 text-amber-300 font-semibold' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  Flagged Anomalies ({transactions.filter(t => t.status === 'Flagged_Anomaly').length})
                </button>
              </div>
            </div>

            {/* List */}
            <div className="space-y-3">
              {filteredTxs.map((tx) => {
                const isFlagged = tx.status === 'Flagged_Anomaly';
                return (
                  <div
                    key={tx.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isFlagged
                        ? 'bg-amber-950/20 border-amber-500/50 shadow-md shadow-amber-950/30'
                        : 'bg-slate-950/60 border-slate-800/80 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                          isFlagged ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {isFlagged ? <AlertTriangle className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-xs font-bold text-white">{tx.schemeName}</h4>
                            <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                              isFlagged
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            }`}>
                              {tx.status}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                            Beneficiary: <span className="text-slate-200">{tx.beneficiaryMaskedName}</span> ({tx.beneficiaryDid.substring(0, 18)}...)
                          </p>
                        </div>
                      </div>

                      <div className="text-right sm:self-center">
                        <span className={`text-sm font-bold font-mono ${isFlagged ? 'text-amber-400' : 'text-emerald-400'}`}>
                          ${tx.amountUSD.toFixed(2)}
                        </span>
                        <span className="block text-[10px] text-slate-500 font-mono">{tx.timestamp}</span>
                      </div>
                    </div>

                    {isFlagged && tx.anomalyReason && (
                      <div className="mt-3 pt-3 border-t border-amber-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <div className="text-amber-200/90 font-mono text-[11px] flex items-start gap-1.5">
                          <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>AI Reason: {tx.anomalyReason}</span>
                        </div>
                        <button
                          onClick={() => handleResolveAnomaly(tx.id)}
                          className="px-2.5 py-1 rounded bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 text-[10px] font-mono whitespace-nowrap self-start sm:self-auto transition-colors"
                        >
                          Manual Biometric Clear
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

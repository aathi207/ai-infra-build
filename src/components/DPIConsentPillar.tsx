import React, { useState } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  FileKey, 
  Trash2, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  EyeOff, 
  Layers,
  Database
} from 'lucide-react';
import { ConsentArtifact } from '../types';
import { INITIAL_CONSENTS } from '../mockData';

export const DPIConsentPillar: React.FC = () => {
  const [consents, setConsents] = useState<ConsentArtifact[]>(INITIAL_CONSENTS);
  const [rawTextToScrub, setRawTextToScrub] = useState(
    "Citizen Johnathan Doe (National ID: 9948-2831-9014, Phone: +1-555-0192, Address: 42 Elm Street, Ward 7) visited Metro Health Clinic for cardiology checkup with Dr. Sarah Smith."
  );
  const [scrubbing, setScrubbing] = useState(false);
  const [scrubbedResult, setScrubbedResult] = useState<string | null>(null);

  const handleRevokeConsent = (id: string) => {
    setConsents(consents.map(c => c.id === id ? { ...c, status: 'REVOKED' } : c));
  };

  const handleScrubData = () => {
    setScrubbing(true);
    setScrubbedResult(null);

    setTimeout(() => {
      // Simulate AI Differential Privacy & PII scrubber
      const scrubbed = rawTextToScrub
        .replace(/Johnathan Doe/gi, "[REDACTED_ANON_CITIZEN_0x8F]")
        .replace(/9948-2831-9014/gi, "[REDACTED_DID_HASH]")
        .replace(/\+1-555-0192/gi, "[REDACTED_CONTACT]")
        .replace(/42 Elm Street, Ward 7/gi, "[ZONE: DISTRICT_04_CENTRAL (k=5 Anonymized)]")
        .replace(/Dr\. Sarah Smith/gi, "[CLINICIAN_ID_MHC12]");

      setScrubbedResult(scrubbed);
      setScrubbing(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
                DPI PILLAR 3
              </span>
              <h2 className="text-xl font-bold text-white">DEPA: Data Empowerment & Consent Architecture</h2>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl">
              Citizen-centric data governance framework. Data remains in distributed source registries; it flows securely to approved data consumers only with granular, electronic, revocable consent.
            </p>
          </div>

          <div className="bg-slate-950 px-3.5 py-2 rounded-lg border border-slate-800 text-xs font-mono">
            <span className="text-slate-400 block text-[10px]">Differential Privacy Guarantee</span>
            <span className="text-indigo-400 font-bold text-sm">ε = 0.5 (Strict Privacy)</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Active Consents + AI Privacy Scrubber */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Consent Artifacts Ledger */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileKey className="w-4 h-4 text-indigo-400" />
                Active Citizen Consent Artifacts
              </h3>
              <span className="text-xs font-mono text-indigo-400">{consents.length} Signed Artifacts</span>
            </div>

            <div className="space-y-3">
              {consents.map((consent) => {
                const isRevoked = consent.status === 'REVOKED';
                return (
                  <div
                    key={consent.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isRevoked
                        ? 'bg-slate-950/40 border-slate-800/60 opacity-60'
                        : 'bg-slate-950/70 border-indigo-500/30 shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-white">{consent.dataConsumer}</span>
                          <span className={`text-[9px] font-mono px-2 py-0.5 rounded ${
                            isRevoked
                              ? 'bg-slate-800 text-slate-400'
                              : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          }`}>
                            {consent.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-1">{consent.purpose}</p>
                      </div>

                      {!isRevoked && (
                        <button
                          onClick={() => handleRevokeConsent(consent.id)}
                          className="text-rose-400 hover:text-rose-300 p-1.5 rounded hover:bg-rose-500/10 transition-colors"
                          title="Revoke Consent"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-800 flex flex-wrap gap-1.5">
                      {consent.dataAttributesShared.map((attr) => (
                        <span key={attr} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                          {attr}
                        </span>
                      ))}
                    </div>

                    <div className="mt-2.5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                      <span>Tier: {consent.privacyTier}</span>
                      <span>Valid until: {consent.autoExpiryDate}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: AI Differential Privacy & PII Redactor Sandbox */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <h3 className="text-sm font-bold text-white">AI Differential Privacy & PII Scrubber</h3>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Test how the DPI anonymization gateway strips personally identifiable information (PII) before publishing open datasets for public governance analytics.
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Raw Citizen Record (Unmasked Input)</label>
                <textarea
                  rows={3}
                  value={rawTextToScrub}
                  onChange={(e) => setRawTextToScrub(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-950 border border-slate-700 text-white font-mono text-xs focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              <button
                onClick={handleScrubData}
                disabled={scrubbing}
                className="w-full py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {scrubbing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Applying Laplace Noise & K-Anonymity Filter...
                  </>
                ) : (
                  <>
                    <EyeOff className="w-4 h-4" />
                    Execute Zero-Trust PII Scrubbing
                  </>
                )}
              </button>

              {scrubbedResult && (
                <div className="p-4 rounded-lg bg-slate-950 border border-indigo-500/40 space-y-2 animate-fadeIn">
                  <div className="flex items-center justify-between text-emerald-400 font-mono text-xs font-bold">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      Differential Privacy Protected Output
                    </span>
                    <span className="text-[10px] text-indigo-300">0% Direct PII Leaked</span>
                  </div>
                  <p className="text-xs text-slate-200 font-mono leading-relaxed bg-slate-900 p-2.5 rounded border border-slate-800">
                    {scrubbedResult}
                  </p>
                  <div className="text-[10px] font-mono text-slate-500 pt-1">
                    Verified compliant with Open Public Data Trust Standard & GDPR Article 25 (Data Protection by Design).
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

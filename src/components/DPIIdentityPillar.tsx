import React, { useState } from 'react';
import { 
  Fingerprint, 
  ShieldCheck, 
  KeyRound, 
  QrCode, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  FileText, 
  Sparkles, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  Lock
} from 'lucide-react';
import { VerifiableCredential } from '../types';
import { INITIAL_CREDENTIALS } from '../mockData';

export const DPIIdentityPillar: React.FC = () => {
  const [credentials, setCredentials] = useState<VerifiableCredential[]>(INITIAL_CREDENTIALS);
  const [selectedCred, setSelectedCred] = useState<VerifiableCredential>(INITIAL_CREDENTIALS[0]);
  const [zkPredicate, setZkPredicate] = useState<'age' | 'residency' | 'welfare'>('age');
  const [zkVerifying, setZkVerifying] = useState(false);
  const [zkResult, setZkResult] = useState<{ verified: boolean; proofHash: string; revealedData: string } | null>(null);

  // New credential creation modal / state
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [newHolderName, setNewHolderName] = useState('');
  const [newCredType, setNewCredType] = useState<VerifiableCredential['credentialType']>('NationalCitizenID');

  const runZeroKnowledgeProof = () => {
    setZkVerifying(true);
    setZkResult(null);

    setTimeout(() => {
      let revealed = "";
      if (zkPredicate === 'age') {
        revealed = "Predicate: [Claim: Age >= 18] -> Result: TRUE (Raw Date of Birth NOT revealed to third party).";
      } else if (zkPredicate === 'residency') {
        revealed = "Predicate: [Claim: Jurisdiction == District 04] -> Result: TRUE (Exact Street Address NOT revealed).";
      } else {
        revealed = "Predicate: [Claim: Annual Income < Poverty Line Threshold] -> Result: TRUE (Exact Tax Return figures NOT revealed).";
      }

      setZkResult({
        verified: true,
        proofHash: `zk-snark-0x${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`,
        revealedData: revealed
      });
      setZkVerifying(false);
    }, 700);
  };

  const handleIssueCredential = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newHolderName.trim()) return;

    const newCred: VerifiableCredential = {
      id: `VC-${Math.floor(10000 + Math.random() * 90000)}-${newCredType.substring(0, 3).toUpperCase()}`,
      holderDid: `did:dpi:gov:${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
      holderName: newHolderName,
      credentialType: newCredType,
      issuingAuthority: "National Digital Identity & Civil Authority",
      issuedAt: new Date().toISOString().split('T')[0],
      expiresAt: "2034-01-01",
      status: "valid",
      claims: {
        isResident: true,
        identityVerified: true,
        biometricAnchorStatus: "Zero_Knowledge_Seeded"
      },
      zkProofCapable: true,
      tamperProofHash: `0x${Math.random().toString(16).substring(2, 18)}`
    };

    setCredentials([newCred, ...credentials]);
    setSelectedCred(newCred);
    setShowIssueModal(false);
    setNewHolderName('');
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                DPI PILLAR 1
              </span>
              <h2 className="text-xl font-bold text-white">Self-Sovereign Identity & Verifiable Credentials (SSI / VC)</h2>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl">
              Cryptographically verifiable digital identity layer based on open standards (W3C DID/VC). Enables citizens to prove claims with Zero-Knowledge without exposing private personal data or centralizing honeypots.
            </p>
          </div>

          <button
            onClick={() => setShowIssueModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold shadow-lg shadow-cyan-600/20 transition-colors"
          >
            <KeyRound className="w-4 h-4" />
            Issue Verifiable Credential
          </button>
        </div>
      </div>

      {/* Main Grid: Credential Explorer & Zero Knowledge Prover */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Credential Wallet List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4">
            <h3 className="text-sm font-bold text-white mb-3 flex items-center justify-between">
              <span>Citizen Verifiable Credentials Ledger</span>
              <span className="text-xs font-mono text-cyan-400 font-normal">{credentials.length} Records</span>
            </h3>

            <div className="space-y-2.5 max-h-[520px] overflow-y-auto pr-1">
              {credentials.map((cred) => {
                const isSelected = selectedCred.id === cred.id;
                return (
                  <div
                    key={cred.id}
                    onClick={() => {
                      setSelectedCred(cred);
                      setZkResult(null);
                    }}
                    className={`cursor-pointer p-3.5 rounded-lg border transition-all ${
                      isSelected
                        ? 'bg-cyan-950/40 border-cyan-500/60 shadow-md shadow-cyan-950'
                        : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-cyan-400">
                          <Fingerprint className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-white">{cred.holderName}</h4>
                          <p className="text-[10px] font-mono text-cyan-400">{cred.credentialType}</p>
                        </div>
                      </div>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                        {cred.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>DID: {cred.holderDid.substring(0, 16)}...</span>
                      <span>Issued: {cred.issuedAt}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Credential Cryptographic Inspector & ZK-Proof Simulator */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card View */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-xl p-5 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono text-slate-300">W3C Compliant DID / VC Inspector</span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">ID: {selectedCred.id}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Holder Name</span>
                <span className="text-white font-semibold text-sm">{selectedCred.holderName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Issuing Authority</span>
                <span className="text-slate-200 font-medium">{selectedCred.issuingAuthority}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Holder Decentralized ID (DID)</span>
                <span className="text-cyan-300 font-mono text-[11px] break-all">{selectedCred.holderDid}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Tamper-Proof Merkle Root Hash</span>
                <span className="text-emerald-400 font-mono text-[11px] break-all">{selectedCred.tamperProofHash}</span>
              </div>
            </div>

            {/* Claims list */}
            <div className="mt-4 pt-3 border-t border-slate-800">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block mb-2">
                Signed Verifiable Claims:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {Object.entries(selectedCred.claims).map(([key, val]) => (
                  <div key={key} className="bg-slate-950/70 p-2 rounded border border-slate-800/80 flex items-center justify-between">
                    <span className="text-slate-400">{key}:</span>
                    <span className="text-cyan-300 font-semibold">{String(val)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Zero-Knowledge Proof Playground */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <h4 className="text-sm font-bold text-white">AI Zero-Knowledge Selective Disclosure Verifier</h4>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              Simulate how a public agency (e.g. Voting Booth, Welfare Window, Liquor License, Health Center) can cryptographically verify eligibility without accessing raw confidential records.
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setZkPredicate('age')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  zkPredicate === 'age'
                    ? 'bg-purple-950 text-purple-200 border-purple-500'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                Prove Age &gt;= 18 (e-Voting)
              </button>
              <button
                onClick={() => setZkPredicate('residency')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  zkPredicate === 'residency'
                    ? 'bg-purple-950 text-purple-200 border-purple-500'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                Prove District Residency (Civic Grant)
              </button>
              <button
                onClick={() => setZkPredicate('welfare')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                  zkPredicate === 'welfare'
                    ? 'bg-purple-950 text-purple-200 border-purple-500'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                }`}
              >
                Prove Income Poverty Threshold (Subsidies)
              </button>
            </div>

            <button
              onClick={runZeroKnowledgeProof}
              disabled={zkVerifying}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold shadow-lg shadow-purple-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {zkVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Generating zk-SNARK Cryptographic Proof...
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  Generate & Verify Zero-Knowledge Claim
                </>
              )}
            </button>

            {zkResult && (
              <div className="mt-4 p-4 rounded-lg bg-slate-950 border border-purple-500/40 space-y-2 animate-fadeIn">
                <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  ZERO-KNOWLEDGE VERIFICATION SUCCESSFUL
                </div>
                <p className="text-xs text-slate-300 font-mono">{zkResult.revealedData}</p>
                <div className="pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-500">
                  Proof Signature: <span className="text-purple-300">{zkResult.proofHash}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal: Issue Credential */}
      {showIssueModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-scaleUp">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <KeyRound className="w-4 h-4 text-cyan-400" />
              Issue New Verifiable Credential
            </h3>
            <p className="text-xs text-slate-400">
              Sign a tamper-proof digital credential to the national identity registry with asymmetric cryptography.
            </p>

            <form onSubmit={handleIssueCredential} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Citizen Full Legal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marcus Vance"
                  value={newHolderName}
                  onChange={(e) => setNewHolderName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Credential Category</label>
                <select
                  value={newCredType}
                  onChange={(e) => setNewCredType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="NationalCitizenID">National Citizen Digital ID</option>
                  <option value="FarmerLandCertificate">Farmer Land & Soil Registry Certificate</option>
                  <option value="DisabilityWelfarePass">Universal Disability Welfare Pass</option>
                  <option value="HealthcareUniversalToken">Universal Healthcare Identity Token</option>
                  <option value="CleanEnergyOperator">Clean Energy Micro-Producer License</option>
                </select>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowIssueModal(false)}
                  className="px-3 py-1.5 rounded-lg text-slate-400 hover:bg-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-semibold shadow-md transition-colors"
                >
                  Sign & Register Credential
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import { 
  Users2, 
  Sparkles, 
  Send, 
  CheckCircle2, 
  MessageSquare, 
  TrendingUp, 
  FileText, 
  ThumbsUp, 
  RefreshCw, 
  Scale, 
  Layers
} from 'lucide-react';
import { DeliberationBill } from '../types';
import { INITIAL_BILLS } from '../mockData';

export const CivicDeliberation: React.FC = () => {
  const [bills, setBills] = useState<DeliberationBill[]>(INITIAL_BILLS);
  const [selectedBill, setSelectedBill] = useState<DeliberationBill>(INITIAL_BILLS[0]);
  const [newComment, setNewComment] = useState('');
  const [stakeholderType, setStakeholderType] = useState('Individual Citizen');
  const [synthesizing, setSynthesizing] = useState(false);

  const [aiSynthesis, setAiSynthesis] = useState<{
    totalSubmissionsAnalyzed: number;
    consensusRate: number;
    sentimentDistribution: { positive: number; neutral: number; concerns: number };
    keyThemes: { theme: string; supportPercent: number; summary: string }[];
    bipartisanRecommendations: string[];
    executiveSummary: string;
  } | null>({
    totalSubmissionsAnalyzed: 3840,
    consensusRate: 78,
    sentimentDistribution: { positive: 64, neutral: 21, concerns: 15 },
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
    ],
    bipartisanRecommendations: [
      "Incorporate a 72-hour guaranteed statutory response window for welfare denial appeals",
      "Establish an independent Parliamentary Privacy & AI Standards Council",
      "Create zero-cost sandbox environments for municipal civic tech open-source developers"
    ],
    executiveSummary: "Broad cross-demographic consensus supports the core data sovereignty provisions of the Bill, with primary community focus centered on strict algorithmic accountability protections."
  });

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const updated = {
      ...selectedBill,
      submissionsCount: selectedBill.submissionsCount + 1
    };

    setBills(bills.map(b => b.id === selectedBill.id ? updated : b));
    setSelectedBill(updated);
    setNewComment('');
  };

  const handleRunSynthesis = async () => {
    setSynthesizing(true);
    try {
      const res = await fetch("/api/dpi/synthesize-deliberation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          billTitle: selectedBill.title,
          billSummary: selectedBill.summary,
          citizenComments: [
            "We need strict human-in-the-loop oversight on all automated welfare disbursements.",
            "Make sure small farmers don't need expensive smartphones to use the DPI registry.",
            "Zero-Knowledge proofs are essential to prevent identity tracking across private vendors."
          ]
        })
      });

      const data = await res.json();
      setAiSynthesis(data);
    } catch (err) {
      console.error("Deliberation synthesis error:", err);
    } finally {
      setSynthesizing(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                CIVIC INTELLIGENCE
              </span>
              <h2 className="text-xl font-bold text-white">Democratic Deliberation & Public Consultation Synthesizer</h2>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl">
              Open public consultation portal where citizens submit legislative feedback. AI analyzes thousands of civic opinions to detect consensus clusters, bridge polarization, and distill evidence-based parliamentary recommendations.
            </p>
          </div>

          <div className="bg-slate-950 px-3.5 py-2 rounded-lg border border-slate-800 text-xs font-mono">
            <span className="text-slate-400 block text-[10px]">Consultation Submissions</span>
            <span className="text-cyan-400 font-bold text-sm">8,960 Citizen Voices</span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Bills & Citizen Feedback Submission */}
        <div className="lg:col-span-5 space-y-4">
          {/* Bill Selection */}
          <div className="space-y-2.5">
            {bills.map((bill) => {
              const isSelected = selectedBill.id === bill.id;
              return (
                <div
                  key={bill.id}
                  onClick={() => setSelectedBill(bill)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-800 border-cyan-500 shadow-md'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-400 font-bold">{bill.code}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      CONSULTATION OPEN
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white mt-1">{bill.title}</h4>
                  <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>Submissions: <span className="text-white font-medium">{bill.submissionsCount.toLocaleString()}</span></span>
                    <span>Consensus: <span className="text-emerald-400 font-medium">{bill.consensusScore}%</span></span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Citizen Comment Box */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
            <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-2">
              <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
              Add Citizen Consultation Submission
            </h4>

            <form onSubmit={handleAddComment} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Stakeholder Perspective</label>
                <select
                  value={stakeholderType}
                  onChange={(e) => setStakeholderType(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Individual Citizen">Individual Citizen</option>
                  <option value="Civic Tech / Privacy Advocate">Civic Tech / Privacy Advocate</option>
                  <option value="Smallholder Farmer / Producer">Smallholder Farmer / Producer</option>
                  <option value="Public Health Practitioner">Public Health Practitioner</option>
                  <option value="SME Enterprise Representative">SME Enterprise Representative</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Feedback / Suggested Amendments</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Share your concerns, endorsements, or policy recommendations..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold flex items-center justify-center gap-2 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                Submit to Public Record
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: AI Synthesis & Parliamentary Brief */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block">
                  Deliberation Intelligence Report
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">{selectedBill.title}</h3>
              </div>

              <button
                onClick={handleRunSynthesis}
                disabled={synthesizing}
                className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white text-xs font-bold shadow-md flex items-center gap-2 self-start sm:self-auto transition-all disabled:opacity-50"
              >
                {synthesizing ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Extracting Consensus Clusters...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5" />
                    Re-Synthesize Civic Sentiment
                  </>
                )}
              </button>
            </div>

            {/* Bill Summary */}
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3 rounded-lg border border-slate-800">
              {selectedBill.summary}
            </p>

            {aiSynthesis && (
              <div className="space-y-4">
                {/* Consensus Gauge & Sentiment Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
                  <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">Overall Civic Consensus</span>
                    <span className="text-emerald-400 font-bold text-lg mt-0.5 block">
                      {aiSynthesis.consensusRate}% Agreement
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Based on {aiSynthesis.totalSubmissionsAnalyzed.toLocaleString()} submissions
                    </span>
                  </div>

                  <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800">
                    <span className="text-slate-500 text-[10px] block mb-1">Sentiment Distribution</span>
                    <div className="flex h-2.5 rounded-full overflow-hidden mb-1.5">
                      <div style={{ width: `${aiSynthesis.sentimentDistribution.positive}%` }} className="bg-emerald-500" title="Positive" />
                      <div style={{ width: `${aiSynthesis.sentimentDistribution.neutral}%` }} className="bg-slate-600" title="Neutral" />
                      <div style={{ width: `${aiSynthesis.sentimentDistribution.concerns}%` }} className="bg-amber-500" title="Concerns" />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400">
                      <span className="text-emerald-400">{aiSynthesis.sentimentDistribution.positive}% Positive</span>
                      <span>{aiSynthesis.sentimentDistribution.neutral}% Neutral</span>
                      <span className="text-amber-400">{aiSynthesis.sentimentDistribution.concerns}% Concerns</span>
                    </div>
                  </div>
                </div>

                {/* Extracted Key Themes */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-white block">
                    Core Citizen Priorities & Thematic Breakdown:
                  </span>
                  <div className="space-y-2">
                    {aiSynthesis.keyThemes.map((t, idx) => (
                      <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800 text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-cyan-300">{t.theme}</span>
                          <span className="text-xs font-mono text-emerald-400">{t.supportPercent}% Support</span>
                        </div>
                        <p className="text-slate-300 text-[11px] leading-relaxed">{t.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bipartisan Policy Recommendations */}
                <div className="p-4 rounded-xl bg-slate-950 border border-cyan-500/30 space-y-2">
                  <span className="text-xs font-bold text-cyan-300 font-mono flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    BIPARTISAN PARLIAMENTARY RECOMMENDATIONS
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-200 font-mono">
                    {aiSynthesis.bipartisanRecommendations.map((rec, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold">→</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

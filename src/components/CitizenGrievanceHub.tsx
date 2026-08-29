import React, { useState } from 'react';
import { 
  MessageSquareWarning, 
  Sparkles, 
  Send, 
  Clock, 
  Wrench, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Languages, 
  ShieldCheck, 
  FileCheck,
  Building,
  UserCheck
} from 'lucide-react';
import { CitizenGrievance } from '../types';
import { INITIAL_GRIEVANCES } from '../mockData';

export const CitizenGrievanceHub: React.FC = () => {
  const [grievances, setGrievances] = useState<CitizenGrievance[]>(INITIAL_GRIEVANCES);
  const [selectedGrievance, setSelectedGrievance] = useState<CitizenGrievance>(INITIAL_GRIEVANCES[0]);

  // Form input state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Sector 4, West District');
  const [language, setLanguage] = useState('English');
  const [citizenCategory, setCitizenCategory] = useState('Resident Citizen');
  const [submitting, setSubmitting] = useState(false);

  const samplePresets = [
    {
      title: "Sewage overflow contaminating local drinking water borewell",
      description: "Underground drainage line clogged near primary school. Foul-smelling sewage is seeping into the community borewell line. Children at risk of waterborne diseases.",
      location: "Ward 14, East Market Junction",
      category: "Water & Sanitation"
    },
    {
      title: "Broken elevator & missing tactile paving at Central Metro Hub",
      description: "The wheelchair elevator at platform 2 has been non-functional for 3 weeks, preventing disabled and elderly passengers from boarding trains.",
      location: "Central Metro Interchange Station",
      category: "Public Transit & Accessibility"
    },
    {
      title: "Farmer solar irrigation subsidy application pending 60 days",
      description: "Applied under National Agrarian Solar Mission with verified land certificate VC-41092. Inspection was completed but DBT subsidy disbursal is stuck in state escrow.",
      location: "Rural Feeder Sub-District 9",
      category: "Agrarian Subsidies"
    }
  ];

  const handleApplyPreset = (preset: typeof samplePresets[0]) => {
    setTitle(preset.title);
    setDescription(preset.description);
    setLocation(preset.location);
  };

  const handleSubmitGrievance = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/dpi/triage-grievance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          location,
          language,
          citizenCategory
        })
      });

      const data = await res.json();

      const newGrievance: CitizenGrievance = {
        id: `GRV-${Math.floor(8000 + Math.random() * 1999)}`,
        title,
        description,
        language,
        category: data.category || "Municipal Infrastructure",
        department: data.department || "Public Works Department",
        priority: data.priority || "High",
        urgencyScore: data.urgencyScore || 85,
        sentiment: data.sentiment || "Urgent Concern",
        location,
        status: "TRIAGED_DISPATCHED",
        slaHours: data.slaHours || 24,
        timeRemainingHours: data.slaHours || 24,
        submittedAt: "Just now",
        citizenNotification: data.citizenNotification || "Your grievance has been auto-triaged and assigned to field division.",
        suggestedWorkOrder: data.suggestedWorkOrder,
        applicableWelfareSchemes: data.applicableWelfareSchemes
      };

      setGrievances([newGrievance, ...grievances]);
      setSelectedGrievance(newGrievance);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.error("Grievance submission error:", err);
    } finally {
      setSubmitting(false);
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
                AI CITIZEN COPILOT
              </span>
              <h2 className="text-xl font-bold text-white">Autonomous Citizen Grievance Triage & SLA Dispatch</h2>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl">
              Multilingual natural language civic intake. Autonomous Gemini 3.7 agents classify jurisdiction, compute real-time urgency, generate field engineering work orders, and bind municipal departments to transparent SLAs.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-950 px-3.5 py-2 rounded-lg border border-slate-800 text-xs font-mono">
              <span className="text-slate-400 block text-[10px]">Active Grievances</span>
              <span className="text-cyan-400 font-bold text-sm">{grievances.length} Tickets</span>
            </div>
            <div className="bg-slate-950 px-3.5 py-2 rounded-lg border border-slate-800 text-xs font-mono">
              <span className="text-slate-400 block text-[10px]">On-Time SLA Rate</span>
              <span className="text-emerald-400 font-bold text-sm">97.4% Met</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Submission Form & Active Ticket Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: AI Citizen Copilot Intake */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Citizen Voice & Grievance Intake</h3>
              </div>
              <span className="text-[10px] font-mono text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                Multilingual AI
              </span>
            </div>

            {/* Quick Presets */}
            <div className="mb-4">
              <span className="text-[10px] font-mono text-slate-400 block mb-1.5">Quick Scenario Presets:</span>
              <div className="flex flex-wrap gap-1.5">
                {samplePresets.map((preset, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleApplyPreset(preset)}
                    className="text-[10px] px-2.5 py-1 rounded bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition-colors text-left"
                  >
                    {preset.category}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmitGrievance} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="English">English</option>
                    <option value="Spanish">Español (Spanish)</option>
                    <option value="Hindi">हिंदी (Hindi)</option>
                    <option value="French">Français (French)</option>
                    <option value="Swahili">Kiswahili (Swahili)</option>
                    <option value="Bahasa">Bahasa Indonesia</option>
                    <option value="Arabic">العربية (Arabic)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Citizen Status</label>
                  <select
                    value={citizenCategory}
                    onChange={(e) => setCitizenCategory(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Resident Citizen">Resident Citizen</option>
                    <option value="Senior Citizen">Senior Citizen (65+)</option>
                    <option value="Registered Farmer">Registered Farmer</option>
                    <option value="Small Business Owner">Small Business Owner</option>
                    <option value="Persons with Disability (PwD)">Persons with Disability</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Grievance Headline / Issue</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Major water pipeline rupture on Main Street"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Location / Ward</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the incident, impacts, and urgency..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 rounded-lg bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-2.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold shadow-lg shadow-cyan-600/20 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    AI Triaging & Dispatching Work Order...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Submit for Autonomous Dispatch
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Ticket Inspector & Work Order Details */}
        <div className="lg:col-span-7 space-y-4">
          {/* Ticket Selector Bar */}
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {grievances.map((g) => {
              const isSelected = selectedGrievance.id === g.id;
              const isCrit = g.priority === 'Critical';
              return (
                <button
                  key={g.id}
                  onClick={() => setSelectedGrievance(g)}
                  className={`px-3 py-2 rounded-lg border text-left shrink-0 transition-all ${
                    isSelected
                      ? 'bg-slate-800 border-cyan-500 text-white shadow-md'
                      : 'bg-slate-900/70 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold font-mono">{g.id}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded font-mono ${
                      isCrit ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-slate-950 text-slate-400'
                    }`}>
                      {g.priority}
                    </span>
                  </div>
                  <div className="text-[11px] truncate max-w-[140px] mt-0.5">{g.title}</div>
                </button>
              );
            })}
          </div>

          {/* Selected Ticket Deep-Dive */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-cyan-400 font-bold">{selectedGrievance.id}</span>
                  <span className="text-xs font-mono text-slate-500">• {selectedGrievance.submittedAt}</span>
                </div>
                <h3 className="text-base font-bold text-white mt-1">{selectedGrievance.title}</h3>
                <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                  {selectedGrievance.location}
                </p>
              </div>

              <div className="flex sm:flex-col items-end gap-1.5 shrink-0">
                <span className={`text-xs font-mono px-2.5 py-1 rounded-full font-bold ${
                  selectedGrievance.priority === 'Critical' 
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' 
                    : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                }`}>
                  Priority: {selectedGrievance.priority} (Urgency: {selectedGrievance.urgencyScore}/100)
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Target SLA: {selectedGrievance.slaHours} Hours
                </span>
              </div>
            </div>

            {/* AI Autonomous Triage Insights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Assigned Department</span>
                <span className="text-white font-semibold flex items-center gap-1.5 mt-0.5">
                  <Building className="w-3.5 h-3.5 text-cyan-400" />
                  {selectedGrievance.department}
                </span>
              </div>
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-500 text-[10px] block">Citizen Emotional Sentiment</span>
                <span className="text-amber-300 font-semibold mt-0.5 block">
                  {selectedGrievance.sentiment}
                </span>
              </div>
            </div>

            {/* AI Generated Work Order */}
            {selectedGrievance.suggestedWorkOrder && (
              <div className="bg-slate-950/80 border border-cyan-500/30 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-cyan-300 flex items-center gap-1.5 font-mono">
                    <Wrench className="w-4 h-4 text-cyan-400" />
                    AUTONOMOUS WORK ORDER DISPATCH
                  </span>
                  <span className="text-xs font-mono text-emerald-400 font-semibold">
                    Est. Cost: ${selectedGrievance.suggestedWorkOrder.estimatedCostUSD}
                  </span>
                </div>

                <div className="text-xs text-white font-semibold">
                  {selectedGrievance.suggestedWorkOrder.title}
                </div>

                <div className="space-y-1.5 text-xs text-slate-300 font-mono">
                  {selectedGrievance.suggestedWorkOrder.actionSteps.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-cyan-400 font-bold shrink-0">{idx + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between font-mono">
                  <span>Crew Assigned: {selectedGrievance.suggestedWorkOrder.crewRequired}</span>
                  <span className="text-emerald-400">STATUS: ACTIVE IN FIELD</span>
                </div>
              </div>
            )}

            {/* Citizen SMS / WhatsApp Notification preview */}
            <div className="p-3.5 rounded-lg bg-cyan-950/20 border border-cyan-500/20 text-xs">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider block mb-1">
                Citizen Copilot Notification Preview:
              </span>
              <p className="text-slate-200 italic">
                "{selectedGrievance.citizenNotification}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

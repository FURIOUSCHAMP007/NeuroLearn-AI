import React, { useState } from 'react';
import { Brain, Users, Home, Cpu, Database, ShieldCheck, Award, Activity, Heart, Info, Globe, AlertTriangle, LifeBuoy, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CognitiveState, BiometricState } from './types';
import HomePage from './components/HomePage';
import StudentWorkspace from './components/StudentWorkspace'; import TeacherDashboard from './components/TeacherDashboard';
import ParentDashboard from './components/ParentDashboard';
import SystemArchitecture from './components/SystemArchitecture';
import CloudAndVertex from './components/CloudAndVertex';
import EthicsAndXAI from './components/EthicsAndXAI';
import SolveForTomorrow from './components/SolveForTomorrow';
import { sendDistressSignal, DistressSignal } from './lib/firebase';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'student' | 'teacher' | 'parent' | 'arch' | 'cloud' | 'ethics' | 'samsung'>('home');

  // Shared Biometric / Cognitive states for the live simulation
  const [cognitive, setCognitive] = useState<CognitiveState>({
    attention: 'High',
    stress: 'Low',
    fatigue: 'Low'
  });

  const [biometric, setBiometric] = useState<BiometricState>({
    hrv: 78,
    gsr: 2.4,
    headMovement: 'Stable',
    heartRate: 70,
    temperature: 36.60
  });

  // Emergency help distress states
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [emergencyMessage, setEmergencyMessage] = useState('Elevated fatigue / stress threshold limit crossed during intensive research block. Seeking advisor assistance.');
  const [customEmergencyText, setCustomEmergencyText] = useState('');
  const [isSendingEmergency, setIsSendingEmergency] = useState(false);
  const [emergencySuccess, setEmergencySuccess] = useState<string | null>(null);
  const [emergencyError, setEmergencyError] = useState<string | null>(null);

  const handleTriggerEmergency = async () => {
    setIsSendingEmergency(true);
    setEmergencySuccess(null);
    setEmergencyError(null);

    const finalMessage = customEmergencyText.trim() || emergencyMessage;

    const signal: DistressSignal = {
      studentId: 'student_alex',
      studentName: 'Alex Mercer',
      message: finalMessage,
      attentionSnapshot: cognitive.attention,
      stressSnapshot: cognitive.stress,
      heartRateSnapshot: biometric.heartRate
    };

    try {
      await sendDistressSignal(signal);
      setEmergencySuccess("Incident signal successfully broadcasted to Cloud DB!");
      setCustomEmergencyText('');
    } catch (err) {
      console.error(err);
      setEmergencyError("Network latency or offline status detected. Signal preserved in offline core safely.");
    } finally {
      setIsSendingEmergency(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans" id="neurolearn-root-container">
      
      {/* GLOBAL HIGH-FIDELITY APP HEADER */}
      <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 p-4 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-tr from-indigo-500 to-indigo-700 p-2 rounded-xl shadow-lg shadow-indigo-500/10">
              <Brain className="h-5.5 w-5.5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-black text-slate-100 tracking-tight flex items-center gap-1.5 uppercase font-sans">
                NEUROLEARN AI
              </h1>
              <p className="text-[10px] text-slate-400 font-medium tracking-wide">Brain-Adaptive Learning & Wellness Ecosystem</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Live active wearer block */}
            <div className="bg-slate-950/60 border border-slate-800 px-3 py-1.5 rounded-lg text-[10px] text-slate-400 font-medium flex items-center gap-1.5 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-500"></span>
              <span>Wearer: <strong className="text-slate-200">Alex Mercer</strong></span>
            </div>

            {/* Global simulated disaster trigger button */}
            <button
              onClick={() => {
                setIsEmergencyModalOpen(true);
                setEmergencySuccess(null);
                setEmergencyError(null);
              }}
              className="bg-red-950/40 hover:bg-red-900/40 border border-red-900/40 hover:border-red-500/40 text-red-400 hover:text-red-300 text-xs font-bold px-3.5 py-1.5 rounded-lg flex items-center space-x-1.5 shadow-sm transition-all cursor-pointer shrink-0"
              id="emergency-trigger-header-button"
            >
              <LifeBuoy className="h-3.5 w-3.5 text-red-500" />
              <span>Emergency Help</span>
            </button>
          </div>
        </div>
      </header>

      {/* CORE TAB NAVIGATION BAR */}
      <nav className="bg-slate-900/40 border-b border-slate-800 p-2 sticky top-[73px] z-40 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex space-x-1 bg-slate-950/30 p-1 rounded-xl border border-slate-800/50">
          <button
            onClick={() => setActiveTab('home')}
            className={`relative px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'home' 
                ? 'bg-indigo-600/15 text-indigo-400 font-bold shadow-sm' 
                : 'text-slate-400 hover:text-slate-205 text-slate-350'
            }`}
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home</span>
            {activeTab === 'home' && (
              <motion.span
                layoutId="activeTabUnderline"
                className="absolute bottom-1 left-2.5 right-2.5 h-0.5 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab('student')}
            className={`relative px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'student' 
                ? 'bg-indigo-600/15 text-indigo-400 font-bold shadow-sm' 
                : 'text-slate-400 hover:text-slate-205 text-slate-350'
            }`}
          >
            <Brain className="h-3.5 w-3.5" />
            <span>Student Workspace</span>
            {activeTab === 'student' && (
              <motion.span
                layoutId="activeTabUnderline"
                className="absolute bottom-1 left-2.5 right-2.5 h-0.5 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab('teacher')}
            className={`relative px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'teacher' 
                ? 'bg-indigo-600/15 text-indigo-400 font-bold shadow-sm' 
                : 'text-slate-400 hover:text-slate-205 text-slate-350'
            }`}
          >
            <Users className="h-3.5 w-3.5" />
            <span>Teacher Panel</span>
            {activeTab === 'teacher' && (
              <motion.span
                layoutId="activeTabUnderline"
                className="absolute bottom-1 left-2.5 right-2.5 h-0.5 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab('parent')}
            className={`relative px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'parent' 
                ? 'bg-indigo-600/15 text-indigo-400 font-bold shadow-sm' 
                : 'text-slate-400 hover:text-slate-205 text-slate-350'
            }`}
          >
            <Heart className="h-3.5 w-3.5" />
            <span>Parent Hub</span>
            {activeTab === 'parent' && (
              <motion.span
                layoutId="activeTabUnderline"
                className="absolute bottom-1 left-2.5 right-2.5 h-0.5 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab('arch')}
            className={`relative px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'arch' 
                ? 'bg-indigo-600/15 text-indigo-400 font-bold shadow-sm' 
                : 'text-slate-400 hover:text-slate-205 text-slate-350'
            }`}
          >
            <Cpu className="h-3.5 w-3.5" />
            <span>Hardware Specs</span>
            {activeTab === 'arch' && (
              <motion.span
                layoutId="activeTabUnderline"
                className="absolute bottom-1 left-2.5 right-2.5 h-0.5 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab('cloud')}
            className={`relative px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'cloud' 
                ? 'bg-indigo-600/15 text-indigo-400 font-bold shadow-sm' 
                : 'text-slate-400 hover:text-slate-205 text-slate-350'
            }`}
          >
            <Database className="h-3.5 w-3.5" />
            <span>Cloud Spec</span>
            {activeTab === 'cloud' && (
              <motion.span
                layoutId="activeTabUnderline"
                className="absolute bottom-1 left-2.5 right-2.5 h-0.5 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab('ethics')}
            className={`relative px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'ethics' 
                ? 'bg-indigo-600/15 text-indigo-400 font-bold shadow-sm' 
                : 'text-slate-400 hover:text-slate-205 text-slate-350'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Ethical AI</span>
            {activeTab === 'ethics' && (
              <motion.span
                layoutId="activeTabUnderline"
                className="absolute bottom-1 left-2.5 right-2.5 h-0.5 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>

          <button
            onClick={() => setActiveTab('samsung')}
            className={`relative px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center space-x-1.5 cursor-pointer whitespace-nowrap ${
              activeTab === 'samsung' 
                ? 'bg-indigo-600/15 text-indigo-400 font-bold shadow-sm' 
                : 'text-slate-400 hover:text-slate-205 text-slate-350'
            }`}
          >
            <Award className="h-3.5 w-3.5 text-amber-400" />
            <span>Samsung Decks</span>
            {activeTab === 'samsung' && (
              <motion.span
                layoutId="activeTabUnderline"
                className="absolute bottom-1 left-2.5 right-2.5 h-0.5 bg-indigo-500 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </button>
        </div>
      </nav>

      {/* MAIN LAYOUT SPACE */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 pb-20">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          {activeTab === 'home' && (
            <HomePage onNavigate={setActiveTab} />
          )}

          {activeTab === 'student' && (
            <StudentWorkspace 
              cognitive={cognitive} 
              setCognitive={setCognitive} 
              biometric={biometric} 
              setBiometric={setBiometric} 
            />
          )}

          {activeTab === 'teacher' && (
            <TeacherDashboard 
              cognitive={cognitive} 
              biometric={biometric} 
            />
          )}

          {activeTab === 'parent' && (
            <ParentDashboard 
              cognitive={cognitive} 
              biometric={biometric} 
            />
          )}

          {activeTab === 'arch' && <SystemArchitecture />}

          {activeTab === 'cloud' && <CloudAndVertex />}

          {activeTab === 'ethics' && <EthicsAndXAI />}

          {activeTab === 'samsung' && <SolveForTomorrow />}
        </motion.div>
      </main>

      {/* PROFESSIONAL SLATE APP FOOTER */}
      <footer className="bg-slate-950 border-t border-slate-900 p-6 text-center text-xs text-slate-500 space-y-2 mt-auto">
        <p className="max-w-2xl mx-auto leading-relaxed">
          <strong>NeuroLearn AI Applet Proof-of-concept</strong>. Developed for standard evaluation with active post-training quantized edge routines, BigQuery analytics warehouses and premium Gemini learning assistants.
        </p>
        <p className="text-[10px] text-slate-600">
          SDG 3 • SDG 4 • SDG 9 • SDG 10 | Protected under dual AES-256 GCM encrypted channels. All rights reserved.
        </p>
      </footer>

      {/* GLOBAL EMERGENCY DISTRESS SIGNAL SIMULATOR MODAL */}
      <AnimatePresence>
        {isEmergencyModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" id="emergency-modal-backdrop">
            {/* Backdrop slide-in and blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEmergencyModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-slate-900 border border-red-900/45 rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl p-6 space-y-5"
              id="emergency-modal-content-panel"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3 text-red-400">
                  <div className="p-2.5 bg-red-950 border border-red-900/60 rounded-xl">
                    <LifeBuoy className="h-6 w-6 text-red-500 animate-spin-slow" />
                  </div>
                  <div>
                    <h3 className="text-base font-black tracking-tight text-slate-200 uppercase">Trigger Distress Signal Alert</h3>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Live Wearable Bio-Sensor Telemetry Broadcast</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEmergencyModalOpen(false)}
                  className="p-1 px-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-slate-200 transition-all cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Bio snapshot box */}
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2 text-slate-400">
                <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider block font-mono">Current Alex Mercer Snapshot</span>
                <div className="grid grid-cols-3 gap-2.5">
                  <div className="bg-slate-900/40 p-2 rounded-md border border-slate-800 text-center">
                    <span className="text-[8px] text-slate-500 block">EEG Stress State</span>
                    <strong className="text-red-400 text-xs font-black">{cognitive.stress}</strong>
                  </div>
                  <div className="bg-slate-900/40 p-2 rounded-md border border-slate-800 text-center">
                    <span className="text-[8px] text-slate-500 block">EEG Attention</span>
                    <strong className="text-emerald-400 text-xs font-black">{cognitive.attention}</strong>
                  </div>
                  <div className="bg-slate-900/40 p-2 rounded-md border border-slate-800 text-center">
                    <span className="text-[8px] text-slate-500 block">Heart Rate</span>
                    <strong className="text-pink-400 text-xs font-black font-mono">{biometric.heartRate} BPM</strong>
                  </div>
                </div>
              </div>

              {/* Suggestions */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold text-slate-400 block">Select Simulated Distress Alert Payload Template:</label>
                <div className="grid grid-cols-1 gap-1.5">
                  {[
                    'Elevated fatigue / stress threshold limit crossed during intensive research block. Seeking advisor assistance.',
                    'Panic and cognitive overload triggered during computed logic exam tasks. Immediate remediation coaching requested.',
                    'Biometric sensors indicate prolonged hyperarousal states. Heart Rate spikes above normal resting threshold.'
                  ].map((tpl) => (
                    <button
                      type="button"
                      key={tpl}
                      onClick={() => {
                        setEmergencyMessage(tpl);
                        setEmergencySuccess(null);
                        setEmergencyError(null);
                      }}
                      className={`text-left p-2.5 rounded-lg border text-xs leading-relaxed transition-all cursor-pointer ${
                        emergencyMessage === tpl && !customEmergencyText
                          ? 'bg-red-950/15 border-red-900/40 text-red-200 font-medium'
                          : 'bg-slate-950/40 border-slate-800 hover:bg-slate-900 text-slate-400'
                      }`}
                    >
                      {tpl}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom message box */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-slate-400 block">Or Customize Distress Message / Situation:</label>
                <textarea
                  value={customEmergencyText}
                  onChange={(e) => {
                    setCustomEmergencyText(e.target.value);
                    setEmergencySuccess(null);
                    setEmergencyError(null);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-red-900 focus:outline-none p-3 rounded-lg text-xs text-slate-200 placeholder-slate-600 resize-none h-16 font-sans leading-relaxed"
                  placeholder="Type a custom simulated distress alert status report... (e.g. Anxiety elevated due to high cognitive strain under continuous tests)"
                />
              </div>

              {/* Messages success / error feedback */}
              {emergencySuccess && (
                <div className="bg-emerald-950/20 border border-emerald-900/60 text-emerald-300 rounded-lg p-2.5 text-xs leading-relaxed flex items-center gap-1.5 font-medium animate-fadeIn">
                  <Sparkles className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span>{emergencySuccess}</span>
                </div>
              )}
              {emergencyError && (
                <div className="bg-red-950/20 border border-red-900/60 text-red-300 rounded-lg p-2.5 text-xs leading-relaxed flex items-center gap-1.5 font-medium">
                  <AlertTriangle className="h-4 w-4 text-red-400 shrink-0" />
                  <span>{emergencyError}</span>
                </div>
              )}

              {/* Submit triggers */}
              <div className="flex gap-2.5 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsEmergencyModalOpen(false)}
                  className="flex-1 bg-slate-850 hover:bg-slate-800 text-slate-300 border border-slate-800 hover:border-slate-700 text-xs font-bold py-2.5 rounded-xl transition-all cursor-pointer"
                >
                  Cancel / Close
                </button>
                <button
                  type="button"
                  disabled={isSendingEmergency}
                  onClick={handleTriggerEmergency}
                  className="flex-1 bg-gradient-to-r from-red-750 to-red-650 hover:from-red-750 hover:to-red-550 cursor-pointer text-white text-xs font-bold py-2.5 rounded-xl shadow-lg shadow-red-950/50 hover:shadow-red-900/20 transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                  id="submit-distress-broadcast-button"
                >
                  {isSendingEmergency ? (
                    <span className="flex items-center gap-2">
                      <span className="h-3 w-3 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                      Broadcast is active...
                    </span>
                  ) : (
                    <>
                      <LifeBuoy className="h-4 w-4 animate-pulse" />
                      <span>Trigger Distress Call</span>
                    </>
                  )}
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

import React, { useState } from 'react';
import { Award, Compass, Calculator, Layers, HelpCircle, Activity, Heart, Presentation, ArrowRight, DollarSign } from 'lucide-react';

export default function SolveForTomorrow() {
  const [activeDeckSection, setActiveDeckSection] = useState<'3min' | '5min' | 'qa' | 'economics'>('3min');
  const [selectedQuestionIdx, setSelectedQuestionIdx] = useState<number | null>(null);

  // Economic Sliding Variables
  const [deviceCount, setDeviceCount] = useState(100);
  const [ruralSubsidyRate, setRuralSubsidyRate] = useState(40); // % subsidy for sliding scale

  // Q&A list from competition judges
  const judgeQuestions = [
    {
      q: "EEG devices are notoriously fragile. How does NeuroLearn AI survive the rough classroom environments of underprivileged schools?",
      a: "Our custom headband enclosure represents a durable architectural breakdown. The FP1/FP2 electrodes are protected with soft, hypoallergenic medical-grade injection-molded silicone rather than fragile glass or silver contacts. Furthermore, the ESP32 controller modules are house-sealed within high-strength, drop-tested recycled ABS polymers, designed specifically to absorb typical classroom knocks."
    },
    {
      q: "Wearable technologies in public rural educational centers pose high safety and ethical concerns. How do you protect student biometric data?",
      a: "Our safety standard is built on strict data minimization guidelines. No video, biometric imagery, or audio is ever recorded. The micro-conductance GSR and raw microvolts are immediately filtered locally on the ESP32-S3 and encrypted before transmission. Under FERPA, parents retain complete audit and absolute 'Right to Delete' keys, and names are replaced with rotating cryptographic GUID tokens."
    },
    {
      q: "Your solution claims high scalability, but rural classrooms often face total offline power grid limits. How does the system handle this?",
      a: "We implemented an offline-first decentralized firmware model. In the absence of school internet, the ESP32-S3 edge classifier runs locally. The student portal logs their data securely into the browser's IndexedDB, synchronizing automatically with regional Firestore nodes only when they establish connectivity."
    },
    {
      q: "What is your long-term plan to ensure this platform reduces, rather than increases, tech inequality between rich and rural centers?",
      a: "We developed a sliding-scale financial SaaS framework. High-tier private academies pay a premium corporate licensing fee, which directly subsidizes hardware acquisition costs for rural schools, letting us offer high-frequency EEG sets to rural communities on a sliding scale. This represents our core commitment to SDG 10 (Reduced Inequalities)."
    }
  ];

  // Calculations for Economics
  const baseCostPerHeadband = 32; // $32 to build
  const subscriptionLicensePerStudentYear = 15; // $15 annual
  
  const rawHardwareCost = deviceCount * baseCostPerHeadband;
  const corporateSaaSRevenue = deviceCount * subscriptionLicensePerStudentYear;
  const directRuralSubsidyFunds = (corporateSaaSRevenue * (ruralSubsidyRate / 100));
  const netRuralHeadbandsFunded = Math.floor(directRuralSubsidyFunds / baseCostPerHeadband);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6" id="solve_for_tomorrow_tab">
      
      {/* Tab Selectors */}
      <div className="flex border-b border-slate-800 pb-3 justify-between items-center flex-wrap gap-2">
        <div>
          <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
            <Award className="h-5 w-5 text-yellow-500 animate-pulse" />
            Samsung Solve for Tomorrow Master Playbook
          </h3>
          <p className="text-xs text-slate-400">
            Hackathon pitches, judge Q&A simulators, and social-impact sliding SaaS economics calculators.
          </p>
        </div>

        <div className="flex space-x-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveDeckSection('3min')}
            className={`px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition-all ${
              activeDeckSection === '3min' ? 'bg-yellow-600 text-slate-100' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            3-Min Pitch
          </button>
          <button
            onClick={() => setActiveDeckSection('5min')}
            className={`px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition-all ${
              activeDeckSection === '5min' ? 'bg-yellow-600 text-slate-100' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            5-Min Pitch
          </button>
          <button
            onClick={() => setActiveDeckSection('qa')}
            className={`px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition-all ${
              activeDeckSection === 'qa' ? 'bg-yellow-600 text-slate-100' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Judge Q&A Simulator
          </button>
          <button
            onClick={() => setActiveDeckSection('economics')}
            className={`px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition-all ${
              activeDeckSection === 'economics' ? 'bg-yellow-600 text-slate-100' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Sliding Scale Math
          </button>
        </div>
      </div>

      {activeDeckSection === '3min' && (
        <div className="space-y-6">
          <div className="bg-slate-950 p-6 rounded-lg border border-slate-800 relative">
            <span className="absolute top-3 right-3 text-[10px] uppercase font-bold text-yellow-500 bg-yellow-950/40 border border-yellow-900 px-2.5 py-0.5 rounded">
              High-Impact Executive Presentation
            </span>
            
            <h4 className="text-sm font-bold text-slate-200 uppercase mb-4 flex items-center gap-1.5">
              <Presentation className="h-4.5 w-4.5 text-yellow-500" />
              3-Minute Elevator Pitch Slide Deck Blueprint
            </h4>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <div className="bg-slate-900 p-4 rounded-md border border-slate-800">
                <span className="text-[10px] text-yellow-400 uppercase font-bold block mb-1">Slide 1: The Invisible Classroom Struggle</span>
                <p>
                  "We believe that traditional education is blind to the mental states of our children. When raw study challenges become high-frequency burnout, students struggle quietly, and teachers are left without visibility. This is a massive educational inequality crisis."
                </p>
                <div className="text-[10px] text-slate-500 mt-2 font-medium">Visual: Heartfelt footage showing an exhausted rural student; stats on 64% increase in youth stress indexes.</div>
              </div>

              <div className="bg-slate-900 p-4 rounded-md border border-slate-800">
                <span className="text-[10px] text-yellow-400 uppercase font-bold block mb-1">Slide 2: Introducing NeuroLearn AI</span>
                <p>
                  "Our solution is NeuroLearn AI. We designed a $32 neuro-adaptive headband that converts raw EEG waves into instant mental attention indices locally on the edge. Directly integrates with Gemini, adapting instructional complexity and physical posture breathing prompts in real time."
                </p>
                <div className="text-[10px] text-slate-500 mt-2 font-medium">Visual: Mock animation showing Alex wears the sensor band, wave charts fluctuate, tutor changes explanation style.</div>
              </div>

              <div className="bg-slate-900 p-4 rounded-md border border-slate-800">
                <span className="text-[10px] text-yellow-400 uppercase font-bold block mb-1">Slide 3: Impact and Scalability</span>
                <p>
                  "Using Google Cloud Storage and Vertex AI, we scale predictions to millions. Through our social sliding subscription licensing, we subsidize rural technological access, helping resolve SDG 4 and SDG 10 directly on the ground. Together, let's solve for tomorrow with neuro-adaptive equity."
                </p>
                <div className="text-[10px] text-slate-500 mt-2 font-medium">Visual: Global map showing funded classrooms across Asia and Latin America.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeDeckSection === '5min' && (
        <div className="space-y-6">
          <div className="bg-slate-950 p-6 rounded-lg border border-slate-800 relative">
            <span className="absolute top-3 right-3 text-[10px] uppercase font-bold text-yellow-500 bg-yellow-950/40 border border-yellow-900 px-2.5 py-0.5 rounded">
              Deep Technical Pitch
            </span>
            
            <h4 className="text-sm font-bold text-slate-200 uppercase mb-4 flex items-center gap-1.5">
              <Presentation className="h-4.5 w-4.5 text-yellow-500" />
              5-Minute Technical Slide Deck & Proof-of-Concept Blueprint
            </h4>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <div className="bg-slate-900 p-4 rounded-md border border-slate-800">
                <span className="text-[10px] text-yellow-400 uppercase font-bold block mb-1">Section 1: The Bio-sensing Electrode Cluster</span>
                <p>
                  "We sample frontal differential voltages on FP1 and FP2. We resolve high signal-to-noise ratios locally. Features are engineered on the fly to detect attention loss prior to physical distraction."
                </p>
                <div className="text-[10px] text-slate-500 mt-2 font-medium">Technical Detail: Bandpass filtration (0.5 to 45Hz); baseline subtraction algorithm to eliminate eyeblinks.</div>
              </div>

              <div className="bg-slate-900 p-4 rounded-md border border-slate-800">
                <span className="text-[10px] text-yellow-400 uppercase font-bold block mb-1">Section 2: Edge Classifier (TensorFlow Lite INT8)</span>
                <p>
                  "Our Conv1D model is quantized heavily down to 8-bit integers, keeping the size at just 99KB, allowing us to execute inferencing offline directly inside the ESP32-S3 within 10.6ms."
                </p>
                <div className="text-[10px] text-slate-500 mt-2 font-medium">Technical Detail: Integer activation tables prevent expensive floating-point math, saving dual-core CPU batteries.</div>
              </div>

              <div className="bg-slate-900 p-4 rounded-md border border-slate-800">
                <span className="text-[10px] text-yellow-400 uppercase font-bold block mb-1">Section 3: Cloud APIs & Multi-Agent Orchestration</span>
                <p>
                  "We proxy our requests through full-stack Express routes directly to Gemini 3.5. System prompts are altered on-the-fly using student biometric snapshot packets, providing instruction adaptations inside 2 seconds."
                </p>
                <div className="text-[10px] text-slate-500 mt-2 font-medium">Technical Detail: Google Cloud Functions process real-time alerts via Firebase Cloud Messaging queues.</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeDeckSection === 'qa' && (
        <div className="space-y-4">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold mb-1">Select a typical tough Samsung Judge question to test team response</span>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Question selector */}
            <div className="space-y-2">
              {judgeQuestions.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedQuestionIdx(idx)}
                  className={`w-full text-left p-3.5 rounded-lg border text-xs font-semibold cursor-pointer transition-colors flex items-start gap-2.5 ${
                    selectedQuestionIdx === idx ? 'bg-yellow-950/40 text-yellow-300 border-yellow-800' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <HelpCircle className="h-5 w-5 shrink-0 text-yellow-500" />
                  <span>{item.q}</span>
                </button>
              ))}
            </div>

            {/* Answer panel */}
            <div className="bg-slate-950 border border-slate-800 p-5 rounded-lg min-h-[220px] flex flex-col justify-between">
              {selectedQuestionIdx !== null ? (
                <div>
                  <strong className="text-yellow-400 block text-xs mb-2.5 uppercase font-bold">Team Mentor Response:</strong>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    "{judgeQuestions[selectedQuestionIdx].a}"
                  </p>
                </div>
              ) : (
                <div className="text-center py-10 font-mono text-slate-600 text-xs my-auto">
                  &lt; Select a judge question to see our expert peer-reviewed hackathon answer &gt;
                </div>
              )}

              <div className="border-t border-slate-800 pt-3 text-[10px] text-slate-500 italic mt-4">
                *Designed under Samsung Solve for Tomorrow guidance to resolve tough feasibility and ethical questions.
              </div>
            </div>
          </div>
        </div>
      )}

      {activeDeckSection === 'economics' && (
        <div className="space-y-6">
          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 space-y-4 text-xs">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest flex items-center gap-1">
              <Calculator className="h-4.5 w-4.5 text-yellow-500" />
              Socio-Economic Sliding Scale Licensing Model
            </h4>
            <p className="text-slate-400 leading-relaxed max-w-2xl">
              To guarantee that hardware technology doesn't widen inequality gaps, high-tier private academies pay a premium corporate SaaS subscription fee, which is automatically earmarked to subsidize the raw cost of hardware components for rural, underfunded institutions.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Sliders to control numbers */}
              <div className="space-y-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-400 uppercase tracking-widest block font-bold">Adjust Financial Scale Parameters</span>
                
                <div>
                  <div className="flex justify-between font-semibold text-slate-300 mb-1">
                    <span>Corporate / Premium Student Licenses</span>
                    <strong className="text-sky-300">{deviceCount} Students</strong>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="50"
                    value={deviceCount}
                    onChange={(e) => setDeviceCount(Number(e.target.value))}
                    className="w-full accent-yellow-500 cursor-pointer h-1.5 bg-slate-950 rounded-lg appearance-none"
                  />
                  <span className="text-[9px] text-slate-500 block mt-0.5">SaaS income generated at $15/student/year license</span>
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-slate-300 mb-1">
                    <span>Corporate Subsidy Earmark Rate</span>
                    <strong className="text-emerald-400">{ruralSubsidyRate}%</strong>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    step="5"
                    value={ruralSubsidyRate}
                    onChange={(e) => setRuralSubsidyRate(Number(e.target.value))}
                    className="w-full accent-yellow-500 cursor-pointer h-1.5 bg-slate-950 rounded-lg appearance-none"
                  />
                  <span className="text-[9px] text-slate-500 block mt-0.5">Percentage of subscription funds directed to rural components</span>
                </div>
              </div>

              {/* Outputs math */}
              <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold mb-3 border-b border-slate-800 pb-1.5">Social Impact Calculations</span>
                  
                  <div className="space-y-2.5">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Total Premium SaaS Revenue:</span>
                      <strong className="text-sky-300 font-mono">${corporateSaaSRevenue.toLocaleString()}</strong>
                    </div>

                    <div className="flex justify-between">
                      <span className="text-slate-400">Subsidy Allocation Fund:</span>
                      <strong className="text-emerald-400 font-mono">${directRuralSubsidyFunds.toLocaleString()}</strong>
                    </div>

                    <div className="flex justify-between border-t border-slate-800 pt-2 text-sm">
                      <span className="text-slate-200 font-bold">Rural Headbands Funded:</span>
                      <strong className="text-yellow-405 font-black text-base text-yellow-400 font-mono">{netRuralHeadbandsFunded} Headbands</strong>
                    </div>
                  </div>
                </div>

                <p className="text-[10px] italic text-slate-500 mt-4">
                  *By charging private academies, we provide complete hardware systems to {netRuralHeadbandsFunded} underprivileged schools for zero cost.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

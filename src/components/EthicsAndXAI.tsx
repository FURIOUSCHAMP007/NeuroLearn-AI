import React, { useState } from 'react';
import { ShieldCheck, Eye, EyeOff, LayoutGrid, Layers, Check, FileText } from 'lucide-react';

export default function EthicsAndXAI() {
  const [activeTab, setActiveTab] = useState<'ethics' | 'xai'>('ethics');
  
  // Interactive XAI state sliders
  const [thetaBetaWeight, setThetaBetaWeight] = useState(65); // % (correlates with fatigue focus)
  const [gsrStressWeight, setGsrStressWeight] = useState(30);   // % (correlates with physiological distress)
  const [blinkAnomaly, setBlinkAnomaly] = useState(40);        // % (correlates with eye strain)

  const [parentSignName, setParentSignName] = useState('');
  const [studentSignName, setStudentSignName] = useState('');
  const [isSigned, setIsSigned] = useState(false);

  // Compute live Burnout risk and list explaining factor weights
  const combinedBurnoutRisk = Math.round(
    (thetaBetaWeight * 0.4) + (gsrStressWeight * 0.4) + (blinkAnomaly * 0.2)
  );

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6" id="ethics_and_xai_tab">
      
      {/* Tab Selectors */}
      <div className="flex border-b border-slate-800 pb-3 justify-between items-center flex-wrap gap-2">
        <div>
          <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-emerald-400" />
            Privacy, Compliance & Explainable AI (XAI)
          </h3>
          <p className="text-xs text-slate-400">
            Ethics consent protocols, GDPR/FERPA sandboxing, and interactive mathematical AI bias explanations.
          </p>
        </div>

        <div className="flex space-x-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab('ethics')}
            className={`px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition-all ${
              activeTab === 'ethics' ? 'bg-emerald-600 text-slate-100' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Ethics & Consent
          </button>
          <button
            onClick={() => setActiveTab('xai')}
            className={`px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition-all ${
              activeTab === 'xai' ? 'bg-emerald-600 text-slate-100' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Explainable AI (XAI) Layer
          </button>
        </div>
      </div>

      {activeTab === 'ethics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Privacy & Legal Playbook Column (Span 7) */}
          <div className="lg:col-span-7 bg-slate-950 p-5 rounded-lg border border-slate-800 space-y-4 text-xs text-slate-300">
            <div className="border-b border-slate-800 pb-2.5">
              <strong className="text-sm font-semibold text-slate-200 block">FERPA & GDPR Compliance Playbook</strong>
              <p className="text-slate-500 font-medium">Guaranteeing strict security parameters in national educational infrastructures.</p>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-bold text-emerald-400 block mb-1">🔐 1. End-to-End Encrypted Handband Streaming</span>
                <p className="leading-relaxed text-slate-400">
                  Raw EEG raw data microvolts are immediately filtered locally on the ESP32-S3 and are encrypted using military-grade AED-256 GCM protocols before streaming over Bluetooth.
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-emerald-400 block mb-1">🔐 2. FERPA Integrity (Student Records)</span>
                <p className="leading-relaxed text-slate-400">
                  In compliance with the Family Educational Rights and Privacy Act (FERPA), biometric logs are strictly segregated from formal directory academic databases. Parents retain complete audit keys.
                </p>
              </div>

              <div>
                <span className="text-[11px] font-bold text-emerald-400 block mb-1">🔐 3. GDPR "Right to be Forgotten" & Local Anonymization</span>
                <p className="leading-relaxed text-slate-400">
                  Data storage logs inside FireStore collections are masked with randomly rotating UUID tokens rather than plain names. A single parent button delete wipes the entire history.
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Consent E-Signature Form (Span 5) */}
          <div className="lg:col-span-5 bg-slate-950 p-5 rounded-lg border border-emerald-950 text-xs">
            <h4 className="font-bold text-slate-200 text-xs flex items-center mb-1">
              <FileText className="h-4 w-4 text-emerald-400 mr-2" />
              Ethics Multi-Party Consent Framework
            </h4>
            <p className="text-slate-400 mb-4 leading-relaxed">
              Schools require explicit parental and student signatures prior to EEG telemetry activation. Sign below to activate simulated telemetry:
            </p>

            <div className="space-y-3.5">
              <div>
                <label className="block text-slate-400 mb-1 font-medium">1. Parent / Guardian E-Signature Name</label>
                <input
                  type="text"
                  placeholder="e.g. Lucia Mercer"
                  disabled={isSigned}
                  value={parentSignName}
                  onChange={(e) => setParentSignName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 font-sans focus:outline-none focus:border-emerald-500 text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1 font-medium">2. Student E-Signature Name</label>
                <input
                  type="text"
                  placeholder="e.g. Alex Mercer"
                  disabled={isSigned}
                  value={studentSignName}
                  onChange={(e) => setStudentSignName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded p-1.5 font-sans focus:outline-none focus:border-emerald-500 text-slate-100"
                />
              </div>

              {!isSigned ? (
                <button
                  onClick={() => setIsSigned(true)}
                  disabled={!parentSignName.trim() || !studentSignName.trim()}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-xs cursor-pointer py-2 rounded text-slate-100 font-bold transition-all text-center"
                >
                  Verify Consent and Seal Signatures
                </button>
              ) : (
                <div className="bg-emerald-950/40 border border-emerald-800 text-emerald-400 p-3 rounded-lg text-center font-medium">
                  <Check className="h-4.5 w-4.5 mx-auto mb-1.5" />
                  Telemetry Agreement Activated & Sealed!
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'xai' && (
        <div className="space-y-6">
          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-2.5">
              Demystifying Model Predictions (No Black-Box AI)
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed max-w-2xl mb-4">
              Our Explainable AI (XAI) layer uses model feature-weight calculations to demonstrate exactly *how* a prediction was determined, preventing unexplainable student bias or automated grading errors:
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
              {/* interactive sliders to manipulate mock features */}
              <div className="space-y-4">
                <span className="text-[10px] text-slate-500 uppercase tracking-widest block font-bold">Adjust Simulated Neural Contributors</span>
                
                {/* Sliders */}
                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>1. Theta/Beta Power Ratio (Fatigue)</span>
                    <strong className="text-sky-300">{thetaBetaWeight}%</strong>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={thetaBetaWeight}
                    onChange={(e) => setThetaBetaWeight(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-900 rounded-lg appearance-none"
                  />
                  <span className="text-[9px] text-slate-500 block mt-0.5">Reflects alpha reduction and slow-wave theta surges</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>2. Electrodermal GSR Variance (Stress)</span>
                    <strong className="text-rose-400">{gsrStressWeight}%</strong>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={gsrStressWeight}
                    onChange={(e) => setGsrStressWeight(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-900 rounded-lg appearance-none"
                  />
                  <span className="text-[9px] text-slate-500 block mt-0.5">GSR skin micro-conductance shifts</span>
                </div>

                <div>
                  <div className="flex justify-between text-xs text-slate-300 mb-1">
                    <span>3. Accelerometer Wobble Anomalies (Restlessness)</span>
                    <strong className="text-yellow-400">{blinkAnomaly}%</strong>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={blinkAnomaly}
                    onChange={(e) => setBlinkAnomaly(Number(e.target.value))}
                    className="w-full accent-emerald-500 cursor-pointer h-1.5 bg-slate-900 rounded-lg appearance-none"
                  />
                  <span className="text-[9px] text-slate-500 block mt-0.5">Head gestures suggesting attention loss</span>
                </div>
              </div>

              {/* Live XAI Output Explanation panel */}
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2 mb-3">
                    <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">XAI Model Real-Time Estimate</span>
                    <span className="text-sky-300 text-xs font-mono">Classifier Core: v1.07</span>
                  </div>

                  <div className="text-center py-4">
                    <span className="text-xs text-slate-400 block mb-0.5">Burnout / Exhaustion Probability</span>
                    <strong className={`text-4xl font-black ${
                      combinedBurnoutRisk > 75 ? 'text-rose-500' : combinedBurnoutRisk > 45 ? 'text-yellow-500' : 'text-emerald-400'
                    }`}>
                      {combinedBurnoutRisk}%
                    </strong>
                  </div>

                  <div className="space-y-1.5 text-[11px] leading-relaxed pt-2">
                    <strong className="text-slate-300 block mb-1">Mathematical Attribution:</strong>
                    <p className="text-slate-400">
                      • The <strong>Fatigue spectrum</strong> accounts for {Math.round((thetaBetaWeight * 0.4) / combinedBurnoutRisk * 100)}% of this estimate.
                    </p>
                    <p className="text-slate-400">
                      • The <strong>Stress spectrum</strong> accounts for {Math.round((gsrStressWeight * 0.4) / combinedBurnoutRisk * 100)}% of this estimate.
                    </p>
                    <p className="text-slate-400">
                      • The <strong>Restless factor</strong> accounts for {Math.round((blinkAnomaly * 0.2) / combinedBurnoutRisk * 100)}% of this estimate.
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800 text-[10px] text-slate-500 italic">
                  Attribution calculated in real time using local Linear Regression weights, presenting complete transparency for teachers.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

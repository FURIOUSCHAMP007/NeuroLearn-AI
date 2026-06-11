import React, { useState } from 'react';
import { Cpu, Server, Database, Share2, Eye, Compass, Workflow, List, Pocket } from 'lucide-react';

export default function SystemArchitecture() {
  const [activeTab, setActiveTab] = useState<'diagram' | 'dataflow' | 'edge'>('diagram');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6" id="architecture_and_edge_tab">
      
      {/* Tab Selectors */}
      <div className="flex border-b border-slate-800 pb-3 justify-between items-center flex-wrap gap-2">
        <div>
          <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
            <Cpu className="h-5 w-5 text-sky-400" />
            Hardware & Edge AI Architecture
          </h3>
          <p className="text-xs text-slate-400">
            Protocols, quantization routines and data pipelines powering our ESP32-S3 and Cloud platforms.
          </p>
        </div>

        <div className="flex space-x-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab('diagram')}
            className={`px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition-all ${
              activeTab === 'diagram' ? 'bg-indigo-600 text-slate-100' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            System Diagram
          </button>
          <button
            onClick={() => setActiveTab('dataflow')}
            className={`px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition-all ${
              activeTab === 'dataflow' ? 'bg-indigo-600 text-slate-100' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Data Flow
          </button>
          <button
            onClick={() => setActiveTab('edge')}
            className={`px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition-all ${
              activeTab === 'edge' ? 'bg-indigo-600 text-slate-100' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Edge AI Specs
          </button>
        </div>
      </div>

      {activeTab === 'diagram' && (
        <div className="space-y-6">
          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Complete Electro-Cybernetic System Schema</h4>
            
            {/* Elegant SVG System Architecture Diagram */}
            <div className="overflow-x-auto">
              <svg className="w-[720px] h-[360px] mx-auto overflow-visible" viewBox="0 0 720 360">
                {/* Node Styles & Grouping */}
                {/* HARDWARE LAYER */}
                <rect x="20" y="30" width="160" height="280" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                <text x="30" y="52" fill="#94a3b8" fontSize="11" fontWeight="bold" className="uppercase">Hardware Layer</text>
                
                {/* Hardware components */}
                <rect x="35" y="75" width="130" height="40" rx="5" fill="#1e293b" stroke="#38bdf8" strokeWidth="1" />
                <text x="45" y="99" fill="#e2e8f0" fontSize="10" fontWeight="bold">EEG Headband (FP1/FP2)</text>

                <rect x="35" y="130" width="130" height="40" rx="5" fill="#1e293b" stroke="#f43f5e" strokeWidth="1" />
                <text x="45" y="154" fill="#e2e8f0" fontSize="10" fontWeight="bold">MAX30102 HRV Sensor</text>

                <rect x="35" y="185" width="130" height="40" rx="5" fill="#1e293b" stroke="#fbbf24" strokeWidth="1" />
                <text x="45" y="209" fill="#e2e8f0" fontSize="10" fontWeight="bold">GSR Stress Sensor</text>

                <rect x="35" y="240" width="130" height="50" rx="5" fill="#020617" stroke="#e0f2fe" strokeWidth="1.5" />
                <text x="45" y="260" fill="#38bdf8" fontSize="10" fontWeight="bold">ESP32-S3 Controller</text>
                <text x="45" y="275" fill="#a1a1aa" fontSize="8">(Edge TFLite Inference)</text>

                {/* CONNECTION LINES (BLE Protocol) */}
                <line x1="180" y1="170" x2="260" y2="170" stroke="#38bdf8" strokeDasharray="4,4" strokeWidth="2" />
                <polygon points="260,170 250,165 250,175" fill="#38bdf8" />
                <text x="185" y="160" fill="#38bdf8" fontSize="8" className="font-mono">BLE Payload</text>

                {/* CLIENT ACCESS LAYER */}
                <rect x="260" y="30" width="180" height="280" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                <text x="270" y="52" fill="#94a3b8" fontSize="11" fontWeight="bold" className="uppercase">Client / Web Portal</text>

                <rect x="275" y="75" width="150" height="50" rx="5" fill="#020617" stroke="#38bdf8" strokeWidth="1" />
                <text x="285" y="95" fill="#f1f5f9" fontSize="10" fontWeight="bold">Student Interactive App</text>
                <text x="285" y="110" fill="#64748b" fontSize="8">Gemini Adaptive Learning View</text>

                <rect x="275" y="145" width="150" height="45" rx="5" fill="#020617" stroke="#34d399" strokeWidth="1" />
                <text x="285" y="165" fill="#f1f5f9" fontSize="10" fontWeight="bold">Teacher Dashboard</text>
                <text x="285" y="178" fill="#64748b" fontSize="8">Engagement Heatmap</text>

                <rect x="275" y="210" width="150" height="45" rx="5" fill="#020617" stroke="#fb923c" strokeWidth="1" />
                <text x="285" y="230" fill="#f1f5f9" fontSize="10" fontWeight="bold">Wellness Coach View</text>
                <text x="285" y="243" fill="#64748b" fontSize="8">Breathing & Posture Guide</text>

                {/* CLOUD API LAYER */}
                <rect x="520" y="30" width="180" height="280" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="1.5" />
                <text x="530" y="52" fill="#94a3b8" fontSize="11" fontWeight="bold" className="uppercase">Firebase & GCP</text>

                <rect x="535" y="75" width="150" height="45" rx="5" fill="#1e1b4b" stroke="#818cf8" strokeWidth="1" />
                <text x="545" y="93" fill="#f1f5f9" fontSize="10" fontWeight="bold">Firestore Database</text>
                <text x="545" y="106" fill="#818cf8" fontSize="8">User profiles & biometrics</text>

                <rect x="535" y="135" width="150" height="45" rx="5" fill="#1e1b4b" stroke="#ec4899" strokeWidth="1" />
                <text x="545" y="153" fill="#f1f5f9" fontSize="10" fontWeight="bold">Vertex AI Engine</text>
                <text x="545" y="166" fill="#ec4899" fontSize="8">Attention Estimation Models</text>

                <rect x="535" y="195" width="150" height="45" rx="5" fill="#1e1b4b" stroke="#f43f5e" strokeWidth="1" />
                <text x="545" y="213" fill="#f1f5f9" fontSize="10" fontWeight="bold">Gemini 3.5 AI Router</text>
                <text x="545" y="226" fill="#f43f5e" fontSize="8">Proxying tutor responses</text>

                <rect x="535" y="255" width="150" height="45" rx="5" fill="#1e293b" stroke="#22c55e" strokeWidth="1" />
                <text x="545" y="273" fill="#f1f5f9" fontSize="10" fontWeight="bold">BigQuery Storage</text>
                <text x="545" y="286" fill="#22c55e" fontSize="8">Nocturnal Sleep Logs</text>

                {/* API HTTPS LINES */}
                <path d="M 440,100 C 480,100 480,100 520,100" fill="none" stroke="#6366f1" strokeWidth="1.5" />
                <polygon points="520,100 510,95 510,105" fill="#6366f1" />

                <path d="M 440,170 C 480,170 480,150 520,150" fill="none" stroke="#6366f1" strokeWidth="1.5" />
                <polygon points="520,150 510,145 510,155" fill="#6366f1" />

                <path d="M 440,230 C 480,230 480,210 520,210" fill="none" stroke="#6366f1" strokeWidth="1.5" />
                <polygon points="520,210 510,205 510,215" fill="#6366f1" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 p-4 border border-slate-800 rounded-lg">
              <strong className="text-sky-400 block mb-2 flex items-center gap-1.5">
                <Share2 className="h-4 w-4" /> Hardware Architecture Spec
              </strong>
              <ul className="space-y-2 text-slate-350">
                <li>• <strong>FP1 & FP2 Channels</strong> read differential voltage mappings to track real-time cognitive load indices.</li>
                <li>• <strong>MAX30102 HRV Sensor</strong> captures pulse timings to evaluate sympathetic nervous system signals.</li>
                <li>• <strong>ESP32-S3 Processor</strong> processes signals locally in real-time, delivering up to 70%+ SNR levels.</li>
               </ul>
            </div>
            
            <div className="bg-slate-950 p-4 border border-slate-800 rounded-lg">
              <strong className="text-emerald-400 block mb-2 flex items-center gap-1.5">
                <Server className="h-4 w-4" /> Secure BLE Transport Protocol
              </strong>
              <p className="text-slate-400 leading-relaxed text-[11px]">
                The ESP32-S3 packages sensor metrics into compact 16-byte hex packets dispatched via Bluetooth Low Energy (BLE) every 250ms:
              </p>
              <pre className="bg-slate-900 text-yellow-400 font-mono text-[9px] p-2 mt-2 rounded border border-slate-800">
                [HEADER (0xAA)] [ALPHA] [BETA] [THETA] [HRV] [GSR] [POSTURE] [CHECKSUM]
              </pre>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'dataflow' && (
        <div className="space-y-6">
          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Sensory Acquisition Pipeline Flow</h4>

            {/* Step list for sequential data flow */}
            <div className="space-y-4 font-normal text-xs text-slate-300">
              <div className="flex space-x-3 items-start">
                <div className="h-5 w-5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-900/60 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">1</div>
                <div>
                  <strong className="text-slate-205">Voltage Potential Acquisition (0 - 50ms)</strong>
                  <p className="text-slate-400 mt-1">Frontal electrode pads sample active voltage potential at 250 Hz. Bandpass filters (0.5 to 50 Hz) discard electrical AC noise.</p>
                </div>
              </div>

              <div className="flex space-x-3 items-start">
                <div className="h-5 w-5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-900/60 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">2</div>
                <div>
                  <strong className="text-slate-205">Edge FFT on ESP32 (50 - 100ms)</strong>
                  <p className="text-slate-400 mt-1">Converts raw microvolts into frequency bands (Alpha, Beta, Theta). TFLite classifier instantly resolves indices.</p>
                </div>
              </div>

              <div className="flex space-x-3 items-start">
                <div className="h-5 w-5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-900/60 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">3</div>
                <div>
                  <strong className="text-slate-205">BLE Transmission to Portal (100 - 150ms)</strong>
                  <p className="text-slate-400 mt-1">The student browser gathers BLE packets, renders live EEG graphics locally, and proxies aggregated metrics to Firestore.</p>
                </div>
              </div>

              <div className="flex space-x-3 items-start">
                <div className="h-5 w-5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-900/60 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">4</div>
                <div>
                  <strong className="text-slate-205">Firestore & Live Retraining (150 - 300ms)</strong>
                  <p className="text-slate-400 mt-1">Biometrics append to user documents in Firestore. Firebase Cloud Messaging triggers instant burnout notifications to teacher panels.</p>
                </div>
              </div>

              <div className="flex space-x-3 items-start">
                <div className="h-5 w-5 rounded-full bg-indigo-950 text-indigo-400 border border-indigo-900/60 flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">5</div>
                <div>
                  <strong className="text-slate-205">Gemini Adaptive Guidance (300 - 2000ms)</strong>
                  <p className="text-slate-400 mt-1">Tutor routes combine lesson content with student biometric indexes, responding with tailored coaching.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'edge' && (
        <div className="space-y-6 text-xs text-slate-300">
          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">ESP32-S3 TensorFlow Lite Model Optimizations</h4>
            <p className="leading-relaxed mb-4 text-slate-400">
              To host attention and stress classifiers directly on standard, low-cost $4 ESP32 microcontrollers, we utilize complete Post-Training integer quantization (INT8) to achieve high offline edge speeds:
            </p>

            <table className="w-full text-left font-mono text-[11px] border border-slate-800 rounded overflow-hidden">
              <thead>
                <tr className="bg-slate-900 text-sky-400 border-b border-slate-800">
                  <th className="p-2">Model Layer</th>
                  <th className="p-2">FP32 Size</th>
                  <th className="p-2">INT8 Size</th>
                  <th className="p-2">Latency</th>
                  <th className="p-2">Edge Optimizer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-900">
                <tr>
                  <td className="p-2 font-bold">1. Conv1D (FFT Filter)</td>
                  <td className="p-2">128 KB</td>
                  <td className="p-2 text-emerald-400">32 KB</td>
                  <td className="p-2">4.2 ms</td>
                  <td className="p-2 text-slate-500 font-sans">SIMD vector fusion</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold">2. Dense (Cognitive State)</td>
                  <td className="p-2">256 KB</td>
                  <td className="p-2 text-emerald-400">64 KB</td>
                  <td className="p-2">6.1 ms</td>
                  <td className="p-2 text-slate-500 font-sans">Fused bias weights</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold">3. Softmax Classifier</td>
                  <td className="p-2">12 KB</td>
                  <td className="p-2 text-emerald-400">3 KB</td>
                  <td className="p-2">0.3 ms</td>
                  <td className="p-2 text-slate-500 font-sans">Lookup registers</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 border border-slate-800 rounded-lg">
              <strong className="text-yellow-405 text-yellow-400 block mb-2 uppercase font-semibold">Quantization Flow Code</strong>
              <pre className="bg-slate-900 border border-slate-800 font-mono text-[9px] text-sky-300 p-2.5 rounded leading-relaxed">
{`# Post-training integer quantization pipeline
import tensorflow as tf

converter = tf.lite.TFLiteConverter.from_saved_model(saved_model_dir)
converter.optimizations = [tf.lite.Optimize.DEFAULT]
converter.representative_dataset = representative_dataset_gen
converter.target_spec.supported_ops = [tf.lite.OpsSet.TFLITE_BUILTINS_INT8]
converter.inference_input_type = tf.int8
converter.inference_output_type = tf.int8

quantized_model = converter.convert()
with open("attn_model_int8.tflite", "wb") as f:
    f.write(quantized_model)`}
              </pre>
            </div>

            <div className="bg-slate-950 p-4 border border-slate-800 rounded-lg flex flex-col justify-between">
              <div>
                <strong className="text-purple-400 block mb-1">ESP32 Execution Memory Footprint</strong>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                  Under strict rural school constraints, our INT8 model limits RAM pressure to fit easily inside the ESP32-S3's 512KB SRAM:
                </p>
                <div className="space-y-1 bg-slate-900 p-2.5 rounded border border-slate-800 text-[10px] font-mono leading-relaxed">
                  <div>RAM Tensor Arena Score: <span className="text-emerald-400">36 KB</span></div>
                  <div>CPU Instruction Flash: <span className="text-emerald-400">120 KB</span></div>
                  <div>Remaining SRAM Room: <span className="text-orange-400">356 KB (Free for BLE/Wifi stacks)</span></div>
                </div>
              </div>
              <p className="text-[10px] text-slate-500 italic mt-2">
                *TFLite model runs offline natively without school internet connection. Supports maximum equity in poor rural areas.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

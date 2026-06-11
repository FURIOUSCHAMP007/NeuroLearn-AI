import React, { useState } from 'react';
import { Database, Network, Terminal, Sparkles, Send, CheckCircle2, ChevronRight, Activity, ArrowRight, Layers } from 'lucide-react';

export default function CloudAndVertex() {
  const [activeTab, setActiveTab] = useState<'firebase' | 'vertex' | 'api'>('firebase');
  const [selectedSchema, setSelectedSchema] = useState('students');
  const [apiState, setApiState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [selectedEndpoint, setSelectedEndpoint] = useState('tutor');

  const schemas: { [key: string]: any } = {
    students: {
      userId: "student_alex_04",
      personal: {
        fullname: "Alex Mercer",
        email: "alex.mercer@ruraledu.net",
        birthdate: "2013-09-12",
        enrolledGrade: 7,
      },
      assignedTeacherId: "teacher_sarah_01",
      parentContactId: "parent_lucia_01",
      deviceAssociation: {
        eegBandMac: "24:6F:28:C2:5E:10",
        wearableMac: "3C:71:BF:84:92:02"
      }
    },
    eeg_data: {
      timestamp: "2026-06-11T05:40:00Z",
      sessionUID: "session_sci_772a",
      eegMetrics: {
        differentialFp1Fp2: {
          alphaMicrovolt: 8.4,
          betaMicrovolt: 15.1,
          thetaMicrovolt: 5.2,
          gammaMicrovolt: 3.9
        },
        processedAttnIndex: 88,
        processedFatigueIndex: 12
      },
      sampleFrequencyHz: 250
    },
    sensor_data: {
      timestamp: "2026-06-11T05:40:00Z",
      heartRateBpm: 72,
      hrvIntervalMs: 68,
      skinElectrodermalUs: 3.5,
      postureAngleX: -4.5,
      postureAngleY: 12.1
    },
    wellness_logs: {
      logId: "log_well_9918",
      studentId: "student_alex_04",
      criticalCount: 0,
      burnoutMetrics: {
        dailyMaxStressUs: 8.2,
        unhealthyMovingEventsCount: 2,
        sleepHoursPreviousNight: 7.8
      },
      athenaInterventionsTriggered: [
        {
          timestamp: "2026-06-11T14:15:00Z",
          triggerBiometric: "GSR > 8.0 uS",
          assignedTechnique: "4-7-8 Breathing Regulation"
        }
      ]
    },
    learning_analytics: {
      analyticId: "analytics_learn_4011",
      studentId: "student_alex_04",
      completedLessonsCount: 15,
      adaptedDifficultyProfile: {
        currentDifficultyLevel: "Medium",
        preferredFormat: "Adaptive Interactive MCQ",
        averageAnswerTimeSeconds: 18.5
      }
    }
  };

  const vertexPipelineSteps = [
    {
      title: "1. Data Ingestion & Cloud Pub/Sub",
      desc: "Raw EEG microvolt arrays stream into Cloud Pub/Sub at 250Hz. Direct extraction filters high-frequency sensor motion offsets."
    },
    {
      title: "2. Real-Time Feature Engineering",
      desc: "We compute moving window Fourier Transforms. Feature values are built from custom wave parameters: Beta/Alpha ratios, and HRV intervals."
    },
    {
      title: "3. AutoML & Custom Model Training",
      desc: "Hyper-parameter tuning optimizes Convolutional 1D classifiers on Vertex AI. XGBoost predicts mental stress triggers. Target precision: 90% accuracy."
    },
    {
      title: "4. Deployment on Vertex Endpoints",
      desc: "Classifiers deploy as sub-millisecond endpoints. Google Cloud Functions retrieve student biometric predictions securely."
    }
  ];

  const apiEndpoints: { [key: string]: any } = {
    tutor: {
      method: "POST",
      url: "/api/gemini/tutor",
      reqBody: {
        message: "Can you explain DNA replication briefly?",
        cognitiveState: {
          attention: "Low",
          stress: "Low",
          fatigue: "Medium"
        },
        topic: "DNA Biology"
      },
      resBody: {
        success: true,
        text: "Hi Alex! Let's explain DNA like a recipe book. Think of DNA as a long twisting zipline that opens up. Special zipper molecules read the code and make a perfect copy, so you get two identical copies. To test yourself: If DNA is a zipper, what do you think acts as the teeth? A) Sugar bases B) Molecular tags",
        appliedCognitiveProfile: {
          attention: "Low",
          stress: "Low",
          adaptiveStyle: "The student is currently fatigued or distracted. Simplify explanations, keep answers maximum 2 paragraphs, use playful summaries."
        }
      }
    },
    quiz: {
      method: "POST",
      url: "/api/gemini/quiz",
      reqBody: {
        topic: "Neuroscience Basic",
        difficulty: "Easy",
        cognitiveState: { attention: "Low" }
      },
      resBody: {
        success: true,
        topic: "Neuroscience Basic",
        difficulty: "Easy",
        questions: [
          {
            id: 1,
            question: "Which wave represents relaxation or alert resting?",
            options: ["Alpha", "Beta", "Theta", "Delta"],
            correctAnswer: "Alpha",
            explanation: "Alpha waves are associated with a relaxed, alert state of mind, like resting with closed eyes."
          }
        ]
      }
    }
  };

  const handleTestApi = () => {
    setApiState('loading');
    setTimeout(() => {
      setApiState('success');
    }, 1000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6" id="cloud_and_vertex_tab">
      
      {/* Tab Selectors */}
      <div className="flex border-b border-slate-800 pb-3 justify-between items-center flex-wrap gap-2">
        <div>
          <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
            <Database className="h-5 w-5 text-indigo-400" />
            Cloud Storage & Vertex AI pipelines
          </h3>
          <p className="text-xs text-slate-400">
            Database schema trees, AI model training cycles, and core REST API playgrounds.
          </p>
        </div>

        <div className="flex space-x-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab('firebase')}
            className={`px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition-all ${
              activeTab === 'firebase' ? 'bg-indigo-600 text-slate-100' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Firebase Schema
          </button>
          <button
            onClick={() => setActiveTab('vertex')}
            className={`px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition-all ${
              activeTab === 'vertex' ? 'bg-indigo-600 text-slate-100' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Vertex AI Pipelines
          </button>
          <button
            onClick={() => setActiveTab('api')}
            className={`px-3 py-1.5 rounded text-xs font-semibold cursor-pointer transition-all ${
              activeTab === 'api' ? 'bg-indigo-600 text-slate-100' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            REST API Testing
          </button>
        </div>
      </div>

      {activeTab === 'firebase' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Schema selectors list */}
          <div className="md:col-span-4 space-y-2">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold block mb-1">Firestore Collections</span>
            {['students', 'eeg_data', 'sensor_data', 'wellness_logs', 'learning_analytics'].map((key) => (
              <button
                key={key}
                onClick={() => setSelectedSchema(key)}
                className={`w-full text-left p-2.5 rounded-lg text-xs font-semibold flex items-center justify-between border cursor-pointer transition-colors ${
                  selectedSchema === key ? 'bg-indigo-950/40 text-indigo-300 border-indigo-800' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <span>{key}.json</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            ))}
          </div>

          {/* JSON schema visualization tree */}
          <div className="md:col-span-8 bg-slate-950 border border-slate-800 p-5 rounded-xl shadow-inner font-mono text-xs overflow-x-auto relative">
            <span className="absolute top-2 right-2 text-[9px] bg-indigo-950 text-indigo-400 px-2 py-0.5 rounded border border-indigo-900 font-bold uppercase">
              JSON Representation
            </span>
            <pre className="text-sky-300 leading-relaxed max-h-[300px] overflow-y-auto mt-2">
              {JSON.stringify(schemas[selectedSchema], null, 2)}
            </pre>
          </div>

        </div>
      )}

      {activeTab === 'vertex' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pb-2">
            {vertexPipelineSteps.map((step, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col justify-between">
                <div>
                  <strong className="text-xs text-indigo-400 block mb-2">{step.title}</strong>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
                <span className="text-[9px] text-slate-600 block text-right mt-3">Pipeline Node #{idx + 1}</span>
              </div>
            ))}
          </div>

          <div className="bg-slate-950 p-4 border border-slate-800 rounded-lg flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-3.5">
              <Network className="h-6 w-6 text-pink-400 animate-pulse" />
              <div>
                <strong className="text-slate-200 text-xs">Vertex Model Version Controller</strong>
                <p className="text-[10px] text-slate-500">Continuous Evaluation on BigQuery clinical datasets triggers automatic redeployment.</p>
              </div>
            </div>
            
            <div className="flex gap-4 text-xs font-mono">
              <div className="text-right">
                <span className="text-slate-500 block text-[9px]">Attention accuracy</span>
                <strong className="text-emerald-400 font-bold">92.4%</strong>
              </div>
              <div className="text-right">
                <span className="text-slate-500 block text-[9px]">Stress precision</span>
                <strong className="text-emerald-400 font-bold">89.8%</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'api' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center space-x-2">
              <Terminal className="h-4 w-4 text-indigo-400" />
              <strong className="text-xs text-slate-300">Interact with API payload designs</strong>
            </div>

            <div className="flex space-x-1.5 bg-slate-950 p-1 rounded-md border border-slate-800">
              <button
                onClick={() => {
                  setSelectedEndpoint('tutor');
                  setApiState('idle');
                }}
                className={`px-3 py-1 rounded text-[11px] cursor-pointer font-bold ${
                  selectedEndpoint === 'tutor' ? 'bg-indigo-900 text-indigo-300' : 'text-slate-500 hover:text-slate-350'
                }`}
              >
                /api/gemini/tutor
              </button>
              <button
                onClick={() => {
                  setSelectedEndpoint('quiz');
                  setApiState('idle');
                }}
                className={`px-3 py-1 rounded text-[11px] cursor-pointer font-bold ${
                  selectedEndpoint === 'quiz' ? 'bg-indigo-900 text-indigo-300' : 'text-slate-500 hover:text-slate-350'
                }`}
              >
                /api/gemini/quiz
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Request side */}
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block font-semibold mb-2">REST Request Format (JSON Payload)</span>
                <pre className="font-mono text-[10px] text-sky-300">
                  {JSON.stringify(apiEndpoints[selectedEndpoint].reqBody, null, 2)}
                </pre>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[10px] bg-slate-900 px-2 py-0.5 rounded text-sky-400 font-bold font-mono">
                  {apiEndpoints[selectedEndpoint].method} {apiEndpoints[selectedEndpoint].url}
                </span>

                <button
                  onClick={handleTestApi}
                  className="bg-indigo-600 hover:bg-indigo-500 cursor-pointer text-white font-semibold text-xs px-3.5 py-1.5 rounded transition-all flex items-center gap-1.5"
                >
                  <Send className="h-3 w-3" /> Execute API Simulation
                </button>
              </div>
            </div>

            {/* Response side */}
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-lg relative min-h-[220px]">
              <span className="text-[10px] text-slate-500 uppercase block font-semibold mb-2">Simulated Response Payload</span>
              
              {apiState === 'idle' && (
                <div className="text-center py-10 text-slate-600 text-xs font-mono">
                  &lt; Waiting for simulation trigger... &gt;
                </div>
              )}

              {apiState === 'loading' && (
                <div className="text-center py-10 text-slate-400 text-xs font-mono animate-pulse">
                  POSTing payload to full-stack Express router...
                </div>
              )}

              {apiState === 'success' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900 font-mono font-bold flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" /> Status 200 OK
                    </span>
                    <span className="text-[8px] text-slate-500">Time: 12ms</span>
                  </div>
                  <pre className="font-mono text-[10px] text-sky-300 max-h-[150px] overflow-y-auto leading-relaxed">
                    {JSON.stringify(apiEndpoints[selectedEndpoint].resBody, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

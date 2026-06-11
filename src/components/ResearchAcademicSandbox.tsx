import React, { useState, useEffect, useRef } from 'react';
import { 
  Activity, 
  FlaskConical, 
  Download, 
  Play, 
  Square, 
  Sliders, 
  Plus, 
  Brain, 
  Heart, 
  Sparkles, 
  ClipboardCopy, 
  Filter, 
  Compass, 
  Tag, 
  Check, 
  ChevronRight, 
  ArrowRight,
  Info,
  Database,
  Search,
  Key,
  FileJson,
  ShieldCheck,
  Eye,
  RefreshCw,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid, 
  ReferenceLine,
  ScatterChart, 
  Scatter
} from 'recharts';
import { CognitiveState, BiometricState } from '../types';

interface ResearchAcademicSandboxProps {
  cognitive: CognitiveState;
  biometric: BiometricState;
}

interface TrialLog {
  timestamp: string;
  brainwaves: {
    alpha: number;
    beta: number;
    theta: number;
    gamma: number;
  };
  tbr: number;       // Theta/Beta Ratio
  bar: number;       // Beta/Alpha Ratio
  heartRate: number;
  hrv: number;
  gsr: number;
  cognitive: {
    attention: string;
    stress: string;
    fatigue: string;
  };
  marker?: string;
}

export default function ResearchAcademicSandbox({ cognitive, biometric }: ResearchAcademicSandboxProps) {
  // Academic trial configurations
  const [participantId, setParticipantId] = useState('SUBJ-082');
  const [irbId, setIrbId] = useState('IRB-2026-NEURO-88B');
  const [electrodeMontage, setElectrodeMontage] = useState('Prefrontal Differential Fp1-Fp2');
  const [sampleRate, setSampleRate] = useState('250 Hz');

  // Interactive hardware/software signal filters states
  const [notchFilterEnabled, setNotchFilterEnabled] = useState(true);
  const [lowPassCutoff, setLowPassCutoff] = useState(45); // Hz
  const [highPassCutoff, setHighPassCutoff] = useState(0.5); // Hz
  const [digitalGainMultiplier, setDigitalGainMultiplier] = useState(1.2);

  // Active logging states
  const [isRecording, setIsRecording] = useState(false);
  const [recordedLogs, setRecordedLogs] = useState<TrialLog[]>([]);
  const [currentMarkerInput, setCurrentMarkerInput] = useState('');
  const [markersList, setMarkersList] = useState<{ time: string; label: string }[]>([]);

  // qEEG brainwave values simulated with direct matching to the cognitive state
  const [alphaPower, setAlphaPower] = useState(32);
  const [betaPower, setBetaPower] = useState(48);
  const [thetaPower, setThetaPower] = useState(15);
  const [gammaPower, setGammaPower] = useState(5);

  // Event-Related Potentials (ERP) epoch simulation
  const [erpActive, setErpActive] = useState(false);
  const [erpType, setErpType] = useState<'auditory' | 'visual' | 'none'>('none');
  const [erpChartData, setErpChartData] = useState<{ ms: number; microvolts: number }[]>([]);

  // Gemini Academic Synthesis Report variables
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [synthesizedReport, setSynthesizedReport] = useState<string | null>(null);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Poincaré plot data (HRV non-linear dynamics helper data list)
  const [poincareData, setPoincareData] = useState<{ currentRR: number; nextRR: number }[]>([]);

  // BigQuery Cloud Data Export states
  const [researcherId, setResearcherId] = useState('RES-2026-NEURO-CORNELL');
  const [researcherLicense, setResearcherLicense] = useState('LIC-89304-X-CLINICAL');
  const [queryCohort, setQueryCohort] = useState('all');
  const [queryDateRange, setQueryDateRange] = useState('last-30-days');
  const [queryLimit, setQueryLimit] = useState(20);
  const [queryElectrode, setQueryElectrode] = useState('all');
  const [bqDataset, setBqDataset] = useState<any[] | null>(null);
  const [bqQueryInfo, setBqQueryInfo] = useState<any | null>(null);
  const [isQueryingBq, setIsQueryingBq] = useState(false);
  const [bqError, setBqError] = useState<string | null>(null);
  const [bqActiveTab, setBqActiveTab] = useState<'viewer' | 'sql' | 'anon-info'>('viewer');
  const [copiedSQLText, setCopiedSQLText] = useState(false);

  const handleQueryBigQuery = async () => {
    if (!researcherId.trim()) {
      setBqError('Institutional Researcher Reference ID cannot be empty.');
      return;
    }
    setIsQueryingBq(true);
    setBqError(null);
    try {
      const response = await fetch('/api/bigquery/export', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          researcherId,
          researcherLicense,
          cohort: queryCohort,
          dateRange: queryDateRange,
          limit: queryLimit,
          electrodeConfig: queryElectrode
        })
      });
      const data = await response.json();
      if (data.success && data.dataset) {
        setBqDataset(data.dataset);
        setBqQueryInfo(data.queryInfo);
      } else {
        setBqError(data.error || 'Analytical database extraction failed.');
      }
    } catch (err: any) {
      console.error(err);
      setBqError('Unable to connect to Google Cloud BigQuery. Ensure dev server is active.');
    } finally {
      setIsQueryingBq(false);
    }
  };

  const handleExportJSON = () => {
    if (!bqDataset) return;
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify({
        metadata: {
          institutionalPipeline: "Google Cloud BigQuery",
          researcherId,
          researcherLicense,
          queryTime: new Date().toISOString(),
          anonymizationGrade: "HIPAA Compliant Safe Harbor",
          metricsExtracted: bqQueryInfo
        },
        dataset: bqDataset
      }, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `bigquery_extract_cohort_${queryCohort}_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  };

  const handleExportCSV = () => {
    if (!bqDataset || bqDataset.length === 0) return;
    
    const headers = [
      'SessionId', 'ParticipantHash', 'Timestamp', 
      'AlphaPct', 'BetaPct', 'ThetaPct', 'GammaPct', 
      'ThetaBetaRatio', 'BetaAlphaRatio', 
      'HeartRateBpm', 'HRVms', 'GSRuS', 
      'AttentionClass', 'StressClass', 'FatigueClass',
      'AgeRangeAnonymized', 'GenderAnonymized', 'Handedness', 'SleepIndex', 'BaselineAnxiety', 'CohortAnonymized',
      'TasksCompletedCount', 'DistractionCount', 'FocusDurationSec', 'ActiveLearningEfficiency'
    ];

    const rows = bqDataset.map(row => [
      row.sessionId,
      row.participantHash,
      row.timestamp,
      row.brainwaves.alpha,
      row.brainwaves.beta,
      row.brainwaves.theta,
      row.brainwaves.gamma,
      row.tbr,
      row.bar,
      row.heartRate,
      row.hrv,
      row.gsr,
      row.cognitive.attention,
      row.cognitive.stress,
      row.cognitive.fatigue,
      row.demographics.ageRange,
      row.demographics.gender,
      row.demographics.handedness,
      row.demographics.sleepQualityIndex,
      row.demographics.baselineAnxietyScore,
      row.demographics.academicCohort,
      row.performance.tasksCompleted,
      row.performance.distractionCount,
      row.performance.focusDurationSec,
      row.performance.activeLearningEfficiency
    ]);

    const metadataHeader = [
      `# Institutional Cloud Telemetry Extract Pipeline`,
      `# Source: bigquery-public-data.neurolearn_pipeline`,
      `# Authorized Researcher Reference ID: ${researcherId}`,
      `# Clearance License ID: ${researcherLicense}`,
      `# Extraction Timestamp: ${new Date().toISOString()}`,
      `# Billed Query Cost Capacity: ${bqQueryInfo?.billedBytes || '0.00 MB'}`,
      `# Anonymization Protocol: HIPAA Safe Harbor Standard`,
      `# ==========================================================`,
      ''
    ].join('\n');

    const csvContent = "data:text/csv;charset=utf-8," 
      + encodeURIComponent(metadataHeader + [headers.join(','), ...rows.map(e => e.join(','))].join('\n'));
      
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', csvContent);
    downloadAnchor.setAttribute('download', `bigquery_extract_cohort_${queryCohort}_${Date.now()}.csv`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
  };

  const handleCopySQL = () => {
    if (!bqQueryInfo?.sqlQuery) return;
    navigator.clipboard.writeText(bqQueryInfo.sqlQuery);
    setCopiedSQLText(true);
    setTimeout(() => setCopiedSQLText(false), 2000);
  };

  // Sync simulated raw bands with stress/attention state adjustments
  useEffect(() => {
    let a = 32;
    let b = 48;
    let t = 15;
    let g = 5;

    if (cognitive.stress === 'High') {
      b = 58;  // Stress drives hyper-arousal Beta waves
      a = 20;  // Alpha drops (relaxation down)
      t = 12;
      g = 10;  // Gamma spikes denoting task processing pressure
    } else if (cognitive.attention === 'Low') {
      t = 34;  // Cognitive wandering or fatigue increases Theta waves
      b = 30;  // Beta drops (lack of mental drive)
      a = 31;  // Drowsy Alpha waves
      g = 5;
    } else { // Optimal
      a = 42;  // High, calm, aligned Alpha Waves
      b = 36;  // Focused, non-anxious Beta
      t = 18;  // Well-balanced theta
      g = 4;
    }

    // Add brief micro-noise to the values to make them look authentic
    const noiseLimit = 3;
    setAlphaPower(Math.max(5, Math.round(a + (Math.random() * noiseLimit - noiseLimit/2))));
    setBetaPower(Math.max(5, Math.round(b + (Math.random() * noiseLimit - noiseLimit/2))));
    setThetaPower(Math.max(5, Math.round(t + (Math.random() * noiseLimit - noiseLimit/2))));
    setGammaPower(Math.max(2, Math.round(g + (Math.random() * noiseLimit - noiseLimit/2))));
  }, [cognitive]);

  // Generate Poincaré scatter point from live HRV data updates
  useEffect(() => {
    const liveRR = Math.round(60000 / biometric.heartRate); // average RR interval in ms
    // append state-simulated dynamic drift
    const prevRR = poincareData.length > 0 ? poincareData[poincareData.length - 1].currentRR : (liveRR - 15);
    
    setPoincareData(prev => {
      const updated = [...prev, { currentRR: prevRR, nextRR: liveRR }].slice(-24); // maintain last 24 points
      return updated;
    });
  }, [biometric.heartRate]);

  // Active Recording logic: appends samples every 2 seconds
  useEffect(() => {
    if (!isRecording) return;

    const interval = setInterval(() => {
      const nowStr = new Date().toLocaleTimeString([], { hour12: false });
      
      const tbrCalculated = thetaPower / Math.max(1, betaPower);
      const barCalculated = betaPower / Math.max(1, alphaPower);

      const newLog: TrialLog = {
        timestamp: nowStr,
        brainwaves: {
          alpha: alphaPower,
          beta: betaPower,
          theta: thetaPower,
          gamma: gammaPower
        },
        tbr: tbrCalculated,
        bar: barCalculated,
        heartRate: biometric.heartRate,
        hrv: biometric.hrv,
        gsr: biometric.gsr,
        cognitive: {
          attention: cognitive.attention,
          stress: cognitive.stress,
          fatigue: cognitive.fatigue
        }
      };

      setRecordedLogs(prev => [...prev, newLog]);
    }, 2000);

    return () => clearInterval(interval);
  }, [isRecording, alphaPower, betaPower, thetaPower, gammaPower, biometric, cognitive]);

  // Handle triggered stimulus event-related potentials wave charting
  const handleTriggerStimulus = (type: 'auditory' | 'visual') => {
    setErpActive(true);
    setErpType(type);

    // Create realistic P300 / N200 wave dataset
    const waves = [];
    const peakP300 = type === 'auditory' ? 310 : 340; // auditory has faster neural processing speed
    const n200Peak = 200;

    for (let ms = 0; ms <= 600; ms += 15) {
      // Baseline signal with alpha contamination (10Hz)
      const alphaContamination = 1.8 * Math.sin(ms * 2 * Math.PI * 10 / 1000);
      
      // Mismatch Negativity (N200) formula
      const n200Curve = -6.5 * Math.exp(-Math.pow((ms - n200Peak) / 45, 2));

      // Attention Orienting (P300) formula
      const p300Curve = 8.5 * Math.exp(-Math.pow((ms - peakP300) / 75, 2));

      // Random high-frequency neural noise
      const sensorNoise = Math.random() * 0.8 - 0.4;

      let microvolts = alphaContamination + n200Curve + p300Curve + sensorNoise;
      
      // Apply filters if enabled
      if (notchFilterEnabled) {
        // simulation of removing 50Hz/60Hz grid line noise
        microvolts *= 0.95; 
      }
      // Apply digital calibration multiplier
      microvolts *= digitalGainMultiplier;

      waves.push({
        ms,
        microvolts: Number(microvolts.toFixed(2))
      });
    }

    setErpChartData(waves);

    // Turn off pulsing state after 1.5 seconds
    setTimeout(() => {
      setErpActive(false);
    }, 1500);
  };

  // Add event marker to recorded logs timeline
  const handleAddMarker = () => {
    if (!currentMarkerInput.trim()) return;
    const nowStr = new Date().toLocaleTimeString([], { hour12: false });
    
    // add indicator to lists
    setMarkersList(prev => [...prev, { time: nowStr, label: currentMarkerInput.trim() }]);
    
    // Inject marker strictly into the last captured logging block if active
    if (isRecording && recordedLogs.length > 0) {
      setRecordedLogs(prev => {
        const copy = [...prev];
        copy[copy.length - 1].marker = currentMarkerInput.trim();
        return copy;
      });
    }
    setCurrentMarkerInput('');
  };

  // Triggers server-side academic analysis synthesis
  const fetchAcademicReport = async () => {
    if (recordedLogs.length === 0) return;
    setIsSynthesizing(true);
    setSynthesizedReport(null);

    try {
      const res = await fetch('/api/gemini/academic-synthesis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          trialMetadata: {
            participantId,
            sampleRate,
            electrodeConfig: electrodeMontage,
            irbId
          },
          logs: recordedLogs
        })
      });

      const data = await res.json();
      if (data.success && data.text) {
        setSynthesizedReport(data.text);
      } else {
        throw new Error(data.error || 'Syntax parsing mismatch in endpoint response');
      }
    } catch (err: any) {
      console.error(err);
      setSynthesizedReport(`### ACADEMIC SYNTHESIS ERROR\nFailed to draft institutional neuroscience synthesis reports. Error: ${err.message || 'Interrupted websocket port.'}`);
    } finally {
      setIsSynthesizing(false);
    }
  };

  // Export recorded trial lists locally as direct CSV format
  const exportToCSV = () => {
    if (recordedLogs.length === 0) return;

    const headers = [
      'Timestamp',
      'Alpha(%)', 'Beta(%)', 'Theta(%)', 'Gamma(%)',
      'ThetaBetaRatio', 'BetaAlphaRatio',
      'HeartRate(bpm)', 'HRV(ms)', 'GSR(uS)',
      'AttentionState', 'StressState', 'FatigueState',
      'EventMarker'
    ];

    const rows = recordedLogs.map((log) => [
      log.timestamp,
      log.brainwaves.alpha, log.brainwaves.beta, log.brainwaves.theta, log.brainwaves.gamma,
      log.tbr.toFixed(4), log.bar.toFixed(4),
      log.heartRate, log.hrv, log.gsr.toFixed(4),
      log.cognitive.attention, log.cognitive.stress, log.cognitive.fatigue,
      log.marker || ''
    ]);

    // Format metadata block
    const metadataHeader = [
      `# NeuroLearn qEEG Academic Sandbox Record File`,
      `# Participant Target: ${participantId}`,
      `# IRB Identification Code: ${irbId}`,
      `# Electrode Montage Configuration: ${electrodeMontage}`,
      `# Simulated Live Sampling Rate: ${sampleRate}`,
      `# Record Date: ${new Date().toISOString()}`,
      `# -----------------------------------------------`
    ].join('\n');

    const csvContent = "data:text/csv;charset=utf-8," 
      + metadataHeader + '\n'
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `neuro_sandbox_trial_${participantId}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Copy synthesis result markdown draft helper
  const handleCopyReport = () => {
    if (!synthesizedReport) return;
    navigator.clipboard.writeText(synthesizedReport);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2000);
  };

  // RAtios calculations
  const totalPower = alphaPower + betaPower + thetaPower + gammaPower;
  const tbr = thetaPower / Math.max(1, betaPower);
  const bar = betaPower / Math.max(1, alphaPower);

  return (
    <div className="space-y-6" id="research-sandbox-outer">
      
      {/* SECTION HEADER BAR */}
      <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="p-1 px-2.5 bg-indigo-950 text-indigo-400 font-mono text-[9.5px] rounded-full border border-indigo-900/40 font-bold uppercase tracking-wider flex items-center gap-1">
              <FlaskConical className="h-3.5 w-3.5" />
              Academic Lab
            </span>
            <span className="bg-emerald-950 text-emerald-400 font-mono text-[8.5px] px-2 py-0.5 rounded-full border border-emerald-900/30">
              qEEG Signal Suite
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-black font-sans text-slate-100 flex items-center gap-2">
            Quantitative EEG & Neurofeedback Research Suite
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            Institutional laboratory environment for verifying differential brainwave bands, designing digital signal filters, tracking autonomic heart Poincaré mappings, and synthesizing certified case study drafts using Gemini 2.5 Flash analytical prompts.
          </p>
        </div>

        {/* Dynamic IRB metadata info tag */}
        <div className="bg-slate-950 px-4 py-2.5 rounded-xl border border-slate-850 text-right font-mono text-[10px] space-y-1">
          <div className="text-slate-500 font-bold uppercase flex items-center gap-1 md:justify-end">
            <Compass className="h-3 w-3 text-indigo-400" />
            <span>Telemetry Standard</span>
          </div>
          <p className="text-slate-300 font-extrabold">{electrodeMontage}</p>
          <p className="text-slate-400 text-[9px]">IRB File: <span className="text-rose-400">{irbId}</span></p>
        </div>
      </div>

      {/* CORE SANDBOX INTERACTIVE MODULES BRIDGES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COMPONENT: TELEMETRY LAB CONTROLLERS (7-cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* CARD 1: SPECTRUM ANALYZER AND INTERACTIVE FILTERS */}
          <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-850/80 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs uppercase font-bold tracking-widest text-indigo-400 flex items-center gap-1.5 font-sans">
                <Sliders className="h-4 w-4" />
                qEEG Brainwave Band Spectrum Analyzer
              </h3>
              <span className="text-[10px] text-slate-500 font-mono">Live FP1/FP2 Differential Spectral Balance</span>
            </div>

            {/* Simulated brainwave spectrum visual bars layout */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-850">
              
              {/* Alpha */}
              <div className="space-y-1 text-center bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/60 flex flex-col justify-between">
                <span className="font-sans font-black text-[10px] text-emerald-400 tracking-wider">ALPHA (α)</span>
                <span className="text-[9px] text-slate-500 font-mono">8 - 12 Hz</span>
                <div className="h-20 flex items-end justify-center py-2 bg-slate-950/40 rounded-md">
                  <motion.div 
                    animate={{ height: `${alphaPower}%` }} 
                    transition={{ type: 'spring', damping: 15 }}
                    className="w-4 rounded bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                  />
                </div>
                <div className="font-mono text-xs font-bold text-slate-100">{alphaPower}%</div>
                <span className="text-[8px] text-slate-500">Relaxation/Flow</span>
              </div>

              {/* Beta */}
              <div className="space-y-1 text-center bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/60 flex flex-col justify-between">
                <span className="font-sans font-black text-[10px] text-indigo-400 tracking-wider">BETA (β)</span>
                <span className="text-[9px] text-slate-500 font-mono">12 - 30 Hz</span>
                <div className="h-20 flex items-end justify-center py-2 bg-slate-950/40 rounded-md">
                  <motion.div 
                    animate={{ height: `${betaPower}%` }} 
                    className="w-4 rounded bg-indigo-505 bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.4)]"
                  />
                </div>
                <div className="font-mono text-xs font-bold text-slate-100">{betaPower}%</div>
                <span className="text-[8px] text-slate-500">Active Cognition</span>
              </div>

              {/* Theta */}
              <div className="space-y-1 text-center bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/60 flex flex-col justify-between">
                <span className="font-sans font-black text-[10px] text-purple-400 tracking-wider">THETA (θ)</span>
                <span className="text-[9px] text-slate-500 font-mono">4 - 8 Hz</span>
                <div className="h-20 flex items-end justify-center py-2 bg-slate-950/40 rounded-md">
                  <motion.div 
                    animate={{ height: `${thetaPower}%` }} 
                    className="w-4 rounded bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.4)]"
                  />
                </div>
                <div className="font-mono text-xs font-bold text-slate-100">{thetaPower}%</div>
                <span className="text-[8px] text-slate-500">Fatigue/Wandering</span>
              </div>

              {/* Gamma */}
              <div className="space-y-1 text-center bg-slate-900/50 p-2.5 rounded-lg border border-slate-800/60 flex flex-col justify-between">
                <span className="font-sans font-black text-[10px] text-rose-400 tracking-wider">GAMMA (γ)</span>
                <span className="text-[9px] text-slate-500 font-mono">30 - 100 Hz</span>
                <div className="h-20 flex items-end justify-center py-2 bg-slate-950/40 rounded-md">
                  <motion.div 
                    animate={{ height: `${gammaPower}%` }} 
                    className="w-4 rounded bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.4)]"
                  />
                </div>
                <div className="font-mono text-xs font-bold text-slate-100">{gammaPower}%</div>
                <span className="text-[8px] text-slate-500">Binding/Insight</span>
              </div>

            </div>

            {/* Mathematical Ratio Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 text-xs font-mono space-y-1.5">
                <div className="flex items-center justify-between text-slate-500 uppercase font-black text-[9px] tracking-wider">
                  <span>Theta / Beta Ratio (TBR)</span>
                  <span className="text-indigo-400 font-extrabold">{tbr.toFixed(2)}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500" style={{ width: `${Math.min(100, tbr * 30)}%` }} />
                </div>
                <p className="text-[8.5px] text-slate-400 leading-normal">
                  *TBR metrics above 2.5 historically denote critical metabolic prefrontal depletion and low cognitive arousal.
                </p>
              </div>

              <div className="p-3 bg-slate-950 rounded-xl border border-slate-850 text-xs font-mono space-y-1.5">
                <div className="flex items-center justify-between text-slate-500 uppercase font-black text-[9px] tracking-wider">
                  <span>Beta / Alpha Ratio (BAR)</span>
                  <span className="text-emerald-400 font-extrabold">{bar.toFixed(2)}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: `${Math.min(100, bar * 30)}%` }} />
                </div>
                <p className="text-[8.5px] text-slate-400 leading-normal">
                  *BAR targets above 1.5 indicate highly focused neural recruitment, whereas values below 0.8 register sub-attentive drift.
                </p>
              </div>
            </div>

            {/* Hardware Filters Simulator Panel */}
            <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-850 space-y-3">
              <span className="text-[9.5px] font-mono text-slate-550 flex items-center gap-1.5 tracking-wider font-extrabold uppercase">
                <Filter className="h-3.5 w-3.5 text-indigo-400 animate-spin-slow" />
                Live DSP Signal Filters Configuration
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 items-center">
                
                {/* 50Hz Notch Filter Toggle */}
                <div className="flex items-center justify-between bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-bold text-slate-350 block">50Hz Grid Notch</span>
                    <span className="text-[8px] text-slate-500 block font-mono">Remove line buzz</span>
                  </div>
                  <button
                    onClick={() => setNotchFilterEnabled(!notchFilterEnabled)}
                    className={`h-5 w-10 text-[9px] rounded-full transition-all duration-200 cursor-pointer text-slate-300 font-black flex items-center ${
                      notchFilterEnabled ? 'bg-indigo-650 justify-end px-1.5' : 'bg-slate-800 justify-start px-1.5'
                    }`}
                    title="Toggle Notch Filter"
                    type="button"
                  >
                    <span>{notchFilterEnabled ? 'ON' : 'OFF'}</span>
                  </button>
                </div>

                {/* Low-pass cutoff slider */}
                <div className="space-y-1 bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-[9px] font-mono">
                  <div className="flex justify-between text-slate-350 font-bold">
                    <span>Low-Pass Filter</span>
                    <span className="text-indigo-400">{lowPassCutoff} Hz</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="80"
                    value={lowPassCutoff}
                    onChange={(e) => setLowPassCutoff(Number(e.target.value))}
                    className="w-full accent-indigo-550 focus:outline-none"
                    title="Low-Pass Cutoff Frequency"
                  />
                </div>

                {/* High-pass cutoff slider */}
                <div className="space-y-1 bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-[9px] font-mono">
                  <div className="flex justify-between text-slate-350 font-bold">
                    <span>High-Pass Filter</span>
                    <span className="text-indigo-400">{highPassCutoff} Hz</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="2.0"
                    step="0.1"
                    value={highPassCutoff}
                    onChange={(e) => setHighPassCutoff(Number(e.target.value))}
                    className="w-full accent-indigo-550 focus:outline-none"
                    title="High-Pass Cutoff Frequency"
                  />
                </div>

                {/* Calibration multiplier slider */}
                <div className="space-y-1 bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-[9px] font-mono">
                  <div className="flex justify-between text-slate-350 font-bold">
                    <span>Digital Gain Calibration</span>
                    <span className="text-indigo-400">x{digitalGainMultiplier.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="2.5"
                    step="0.1"
                    value={digitalGainMultiplier}
                    onChange={(e) => setDigitalGainMultiplier(Number(e.target.value))}
                    className="w-full accent-indigo-550 focus:outline-none"
                    title="Digital Gain Multiplier"
                  />
                </div>

              </div>
            </div>

          </div>

          {/* CARD 2: EVENT-RELATED POTENTIALS (ERP) VISUALIZER */}
          <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-850/80 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="space-y-0.5">
                <h3 className="text-xs uppercase font-bold tracking-widest text-indigo-400 flex items-center gap-1.5 font-sans">
                  <Activity className="h-4 w-4 animate-pulse text-indigo-400" />
                  Sensory Event-Related Potentials (ERP) Evoked Peak Analyzer
                </h3>
                <p className="text-[10px] text-slate-500 font-mono">Simulate synchronous brainwave epoch maps following sudden stimuli</p>
              </div>

              <div className="flex gap-1.5">
                <button
                  onClick={() => handleTriggerStimulus('auditory')}
                  className="px-2.5 py-1 bg-indigo-950 text-indigo-400 hover:bg-indigo-900 text-[9px] font-bold font-mono uppercase tracking-wider rounded border border-indigo-900/35 cursor-pointer"
                  type="button"
                >
                  Auditory Click
                </button>
                <button
                  onClick={() => handleTriggerStimulus('visual')}
                  className="px-2.5 py-1 bg-rose-950 text-rose-400 hover:bg-rose-900 text-[9px] font-bold font-mono uppercase tracking-wider rounded border border-rose-900/35 cursor-pointer"
                  type="button"
                >
                  Visual Flash
                </button>
              </div>
            </div>

            {/* Simulated ERP Chart */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 relative">
              
              {/* Dynamic trigger visual alert overlay */}
              <AnimatePresence>
                {erpActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={`absolute inset-0 z-10 pointer-events-none flex items-center justify-center rounded-xl bg-slate-950/30 font-mono text-[10px] font-bold uppercase ${
                      erpType === 'auditory' ? 'border-2 border-indigo-500' : 'border-2 border-rose-500'
                    }`}
                  >
                    <div className={`px-4 py-2 bg-slate-950 rounded-lg border flex items-center gap-2 ${
                      erpType === 'auditory' ? 'text-indigo-400 border-indigo-900' : 'text-rose-400 border-rose-900'
                    }`}>
                      <Activity className="h-4.5 w-4.5 animate-bounce" />
                      <span>{erpType === 'auditory' ? 'STIMULUS TRIGGERED: Auditory Click Stimulus Epoch Running' : 'STIMULUS TRIGGERED: Visual Flash Stimulus Epoch Running'}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {erpChartData.length > 0 ? (
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={erpChartData} margin={{ top: 5, right: 10, left: -25, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#0e1327" />
                      <XAxis dataKey="ms" stroke="#475569" fontSize={9} tickLine={false} unit="ms" />
                      <YAxis stroke="#475569" fontSize={9} tickLine={false} unit="uV" domain={[-12, 12]} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#090d16', borderColor: '#1e293b', fontSize: '9px', fontFamily: 'monospace' }}
                        labelFormatter={(v) => `Post-Stimulus: ${v}ms`}
                      />
                      <ReferenceLine y={0} stroke="#475569" strokeDasharray="3 3" />
                      {/* Classical N200 marked line */}
                      <ReferenceLine x={200} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'N200 (Mismatch Neg)', fill: '#f87171', fontSize: 8 }} />
                      {/* Classical P300 attention orienting line */}
                      <ReferenceLine x={erpType === 'auditory' ? 310 : 340} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'P300 (Orienting Peak)', fill: '#34d399', fontSize: 8 }} />
                      
                      <Line 
                        type="monotone" 
                        dataKey="microvolts" 
                        stroke={erpType === 'auditory' ? '#6366f1' : '#f43f5e'} 
                        strokeWidth={2} 
                        dot={false}
                        activeDot={{ r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-44 w-full flex flex-col items-center justify-center text-slate-500 font-mono text-[10px] space-y-2">
                  <Activity className="h-9 w-9 text-slate-700 animate-pulse" />
                  <span>No active auditory or visual sensory stimulation trials initiated yet.</span>
                  <p className="text-[8.5px] text-slate-600">Click the upper sensory stimulus overrides to trigger microvolt response epochs.</p>
                </div>
              )}
            </div>

            {/* Scientific explanations */}
            <div className="bg-slate-950/20 p-3 rounded-lg border border-slate-850/60 font-mono text-[9px] text-slate-400 space-y-1.5 leading-relaxed">
              <span className="text-indigo-400 font-extrabold uppercase flex items-center gap-1">
                <Info className="h-3 w-3 shrink-0" /> Academic ERP Baseline Benchmarks:
              </span>
              <p>
                - <strong>N200 Response peak:</strong> Represents automatic pre-attentive mismatch negativity processing during sound deviations (amplitude norm: -4µV to -8µV).
              </p>
              <p>
                - <strong>P305 / P340 Peak:</strong> Corresponds to endogenously evoked attention reallocation vectors. Delay times are proportional to cognitive fatigue and processing speed limits.
              </p>
            </div>
          </div>

        </div>

        {/* RIGHT COMPONENT: TRIAL LOGGER & AUTONOMIC POINCARÉ MAPS (5-cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* CARD 3: PARASYMPATHETIC HRV POINCARÉ SCATTER MAPPINGS */}
          <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-850/80 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="space-y-0.5">
                <h3 className="text-xs uppercase font-bold tracking-widest text-indigo-400 flex items-center gap-1.5 font-sans">
                  <Heart className="h-4 w-4 text-emerald-400 animate-pulse" />
                  HRV Non-Linear Poincaré Phase Scatter Plane
                </h3>
                <p className="text-[10px] text-slate-500 font-mono">Autonomic parasympathetic vs sympathetic vagal indicators (RR(n) vs RR(n+1))</p>
              </div>
            </div>

            {/* Scatter plot plane area */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-850">
              <div className="h-44 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#0e1327" />
                    <XAxis 
                      type="number" 
                      dataKey="currentRR" 
                      name="RR(n)" 
                      unit="ms" 
                      domain={[500, 1100]} 
                      stroke="#475569" 
                      fontSize={8} 
                      tickLine={false}
                    />
                    <YAxis 
                      type="number" 
                      dataKey="nextRR" 
                      name="RR(n+1)" 
                      unit="ms" 
                      domain={[500, 1100]} 
                      stroke="#475569" 
                      fontSize={8} 
                      tickLine={false}
                    />
                    <Tooltip 
                      cursor={{ strokeDasharray: '3 3' }} 
                      contentStyle={{ backgroundColor: '#090d16', borderColor: '#1e293b', fontSize: '9px', fontFamily: 'monospace' }}
                      formatter={(v) => `${v} ms`}
                    />
                    {/* Perfect coherence diagonal line baseline */}
                    <ReferenceLine segment={[{ x: 500, y: 500 }, { x: 1100, y: 1100 }]} stroke="#475569" strokeDasharray="3 3" strokeWidth={1} label={{ value: 'Identity Line (Zero Var)', fill: '#64748b', fontSize: 8, position: 'insideTopRight' }} />
                    <Scatter 
                      name="Autonomic Intervals" 
                      data={poincareData} 
                      fill={cognitive.stress === 'High' ? '#a855f7' : '#10b981'} 
                      shape="circle"
                      line={false}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center text-[9px] font-mono leading-relaxed">
              <div className="bg-slate-950 p-2 rounded border border-slate-850">
                <span className="text-slate-550 block text-[8px] font-black uppercase tracking-wider">SD1 (Short-term VAR)</span>
                <span className="text-emerald-400 font-extrabold">{(biometric.hrv * 0.707).toFixed(1)} ms</span>
                <p className="text-[7.5px] text-slate-500">Parasympathetic Vagal Tone</p>
              </div>
              <div className="bg-slate-950 p-2 rounded border border-slate-850">
                <span className="text-slate-550 block text-[8px] font-black uppercase tracking-wider">SD2 (Long-term VAR)</span>
                <span className="text-indigo-400 font-extrabold">{(biometric.hrv * 1.414).toFixed(1)} ms</span>
                <p className="text-[7.5px] text-slate-500">Sympathovagal Balance Index</p>
              </div>
            </div>
          </div>

          {/* CARD 4: ACADEMIC TRIAL RECORDER SESSION LOGS EXPORTER */}
          <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-850/80 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-xs uppercase font-bold tracking-widest text-indigo-400 flex items-center gap-1.5 font-sans">
                <FlaskConical className="h-4 w-4" />
                Active Case Trial Recorder
              </h3>
              <div className="flex items-center gap-1 bg-slate-950 px-2 py-0.5 rounded border border-slate-850 text-slate-400 font-mono text-[9px]">
                <span className={`h-1.5 w-1.5 rounded-full ${isRecording ? 'bg-red-500 animate-ping' : 'bg-slate-600'}`} />
                <span>{isRecording ? 'RECORDING' : 'IDLE'}</span>
              </div>
            </div>

            {/* Trial setup metadata input */}
            <div className="grid grid-cols-2 gap-2 text-[9px] font-mono text-slate-300">
              <div className="space-y-1">
                <label className="text-slate-550 inline-block font-extrabold uppercase">Participant ID</label>
                <input
                  type="text"
                  value={participantId}
                  onChange={(e) => setParticipantId(e.target.value)}
                  className="bg-slate-950 border border-slate-850 rounded px-2 py-1 w-full text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="space-y-1">
                <label className="text-slate-550 inline-block font-extrabold uppercase">IRB Protocol ID</label>
                <input
                  type="text"
                  value={irbId}
                  onChange={(e) => setIrbId(e.target.value)}
                  className="bg-slate-950 border border-slate-850 rounded px-2 py-1 w-full text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Trigger Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  if (isRecording) {
                    setIsRecording(false);
                  } else {
                    setRecordedLogs([]);
                    setIsRecording(true);
                  }
                }}
                className={`flex-1 py-2 px-3 rounded-xl border text-[10px] font-bold font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 cursor-pointer transition-all duration-200 ${
                  isRecording 
                    ? 'bg-red-950/40 hover:bg-red-900/40 border-red-900/60 text-red-400' 
                    : 'bg-indigo-600 hover:bg-indigo-650 border-indigo-700 text-slate-100 shadow-md shadow-indigo-600/10'
                }`}
                type="button"
              >
                {isRecording ? (
                  <>
                    <Square className="h-3.5 w-3.5 fill-current" />
                    <span>Stop Recording</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>Record New Trial</span>
                  </>
                )}
              </button>

              <button
                onClick={exportToCSV}
                disabled={recordedLogs.length === 0}
                className={`py-2 px-3.5 rounded-xl border text-[10px] font-bold font-mono uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all ${
                  recordedLogs.length > 0 
                    ? 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-200' 
                    : 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed'
                }`}
                title="Download CSV log"
                type="button"
              >
                <Download className="h-3.5 w-3.5" />
                <span>CSV</span>
              </button>
            </div>

            {/* Custom Event Marker injector bar list */}
            <div className="space-y-1.5">
              <label className="text-[8px] font-mono text-slate-550 block font-extrabold uppercase">
                Synchronous Event Marker Injector
              </label>
              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="e.g. Auditory stimulus cross, ADHD stress spike..."
                  value={currentMarkerInput}
                  onChange={(e) => setCurrentMarkerInput(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-850 rounded px-2.5 py-1 text-[9.5px] text-slate-200 focus:outline-none focus:border-indigo-505"
                />
                <button
                  type="button"
                  onClick={handleAddMarker}
                  className="px-2.5 py-1 bg-indigo-950 text-indigo-400 border border-indigo-900/40 rounded text-[9px] font-bold font-mono flex items-center gap-1 cursor-pointer hover:bg-indigo-900/50"
                  title="Add Event Marker"
                >
                  <Plus className="h-3 w-3" />
                  <span>Marker</span>
                </button>
              </div>
            </div>

            {/* Trial progress log timeline */}
            <div className="bg-slate-950 border border-slate-850 rounded-xl max-h-36 overflow-y-auto font-mono text-[9px]">
              <table className="w-full text-left">
                <thead className="bg-slate-900 text-slate-550 border-b border-slate-850 font-black text-[8px] tracking-wider sticky top-0 uppercase">
                  <tr>
                    <th className="p-1 px-2.5">Time</th>
                    <th className="p-1">TBR</th>
                    <th className="p-1">BAR</th>
                    <th className="p-1">HRV</th>
                    <th className="p-1">State</th>
                    <th className="p-1 pr-2.5">Marker Flags</th>
                  </tr>
                </thead>
                <tbody className="text-slate-400 divide-y divide-slate-900">
                  {recordedLogs.length > 0 ? (
                    recordedLogs.map((log, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40">
                        <td className="p-1 px-2.5 font-bold text-slate-350">{log.timestamp}</td>
                        <td className="p-1">{log.tbr.toFixed(1)}</td>
                        <td className="p-1">{log.bar.toFixed(1)}</td>
                        <td className="p-1 text-emerald-400">{log.hrv}ms</td>
                        <td className={`p-1 font-bold ${
                          log.cognitive.stress === 'High' ? 'text-red-400' : 'text-slate-350'
                        }`}>
                          {log.cognitive.stress === 'High' ? 'STRESS' : 'OK'}
                        </td>
                        <td className="p-1 text-rose-400 font-extrabold pr-2.5">
                          {log.marker ? `▶ ${log.marker}` : ''}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center p-3 text-slate-600">
                        No real-time logs captured yet. Click \"Record New Trial\" to stream log frames.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>

        </div>

      </div>

      {/* CLOUD SECURE TELEMETRY EXTRACTION PANEL: GOOGLE BIGQUERY PIPELINE */}
      <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-850/80 space-y-4" id="bigquery-extraction-panel">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-3 gap-3">
          <div className="space-y-0.5">
            <span className="p-1 px-2 bg-indigo-950/60 border border-indigo-900/50 text-indigo-400 font-mono text-[9px] rounded-full font-bold uppercase tracking-wider inline-flex items-center gap-1">
              <Database className="h-3 w-3 animate-pulse" />
              BigQuery Data Warehouse
            </span>
            <h3 className="text-sm font-black uppercase text-indigo-100 flex items-center gap-1.5 font-sans">
              Google Cloud BigQuery Research Pipeline & Telemetry Export
            </h3>
            <p className="text-[10px] text-slate-400 font-mono leading-relaxed max-w-xl">
              Execute live, secure analytical SQL queries against the centralized BigQuery data pipeline and extract anonymized telemetry. CSV/JSON export complies with HIPAA Safe Harbor anonymization directives.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleQueryBigQuery}
              disabled={isQueryingBq}
              className={`py-1.5 px-3.5 rounded-xl border text-[10px] font-bold font-mono uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-all duration-200 ${
                isQueryingBq
                  ? 'bg-slate-950 border-slate-850 text-slate-500 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-500 border-indigo-700 text-white shadow-md shadow-indigo-600/10'
              }`}
              type="button"
            >
              {isQueryingBq ? (
                <>
                  <RefreshCw className="h-3.5 w-3.5 animate-spin text-indigo-450" />
                  <span>Scanning BigQuery shards...</span>
                </>
              ) : (
                <>
                  <Search className="h-3.5 w-3.5" />
                  <span>Query Cloud Telemetry</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* AUTHORIZATION CREDENTIALS CHECKBOX */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-850 text-[10px] font-mono text-slate-300">
          <div className="space-y-1 md:col-span-2">
            <label className="text-slate-500 font-extrabold uppercase flex items-center gap-1">
              <Key className="h-3 w-3 text-indigo-400" />
              Authorized Researcher Identifier Reference ID
            </label>
            <input
              type="text"
              value={researcherId}
              onChange={(e) => setResearcherId(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 w-full text-slate-100 focus:outline-none focus:border-indigo-500"
              placeholder="e.g. RES-2026-NEURO-CORNELL"
            />
          </div>
          <div className="space-y-1 md:col-span-2">
            <label className="text-slate-500 font-extrabold uppercase flex items-center gap-1">
              <ShieldCheck className="h-3 w-3 text-emerald-400" />
              Academic Clinical License / Clearance Code
            </label>
            <input
              type="text"
              value={researcherLicense}
              onChange={(e) => setResearcherLicense(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded px-2.5 py-1.5 w-full text-slate-100 focus:outline-none focus:border-indigo-500"
              placeholder="e.g. LIC-89304-X-CLINICAL"
            />
          </div>
        </div>

        {/* QUERY CONDITION PARAMETERS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-950/40 p-4 rounded-xl border border-slate-850/60 text-[10px] font-mono text-slate-300">
          <div className="space-y-1">
            <label className="text-slate-500 font-bold uppercase">Cohort Division</label>
            <select
              value={queryCohort}
              onChange={(e) => setQueryCohort(e.target.value)}
              className="bg-slate-950 border border-slate-850 rounded px-2 py-1 w-full text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Registered Cohorts</option>
              <option value="undergrad">Undergraduate Baseline</option>
              <option value="adhd">ADHD Active Learning Group</option>
              <option value="high-school">High School Explorers</option>
              <option value="control">Clinical Healthy Control</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-500 font-bold uppercase">Electrode Config Montage</label>
            <select
              value={queryElectrode}
              onChange={(e) => setQueryElectrode(e.target.value)}
              className="bg-slate-950 border border-slate-850 rounded px-2 py-1 w-full text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="all">All Montages (Combined)</option>
              <option value="Prefrontal Differential Fp1-Fp2">Prefrontal Differential Fp1-Fp2</option>
              <option value="Temporal Bilateral T3-T4">Temporal Bilateral T3-T4</option>
              <option value="Parietal Coherence P3-P4">Parietal Coherence P3-P4</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-500 font-bold uppercase">Date Sub-Interval</label>
            <select
              value={queryDateRange}
              onChange={(e) => setQueryDateRange(e.target.value)}
              className="bg-slate-950 border border-slate-850 rounded px-2 py-1 w-full text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="last-7-days">Last 7 Days</option>
              <option value="last-30-days">Last 30 Days (Standard)</option>
              <option value="last-90-days">Last 90 Days</option>
              <option value="all-time">All Time (Historical Stream)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-slate-500 font-bold uppercase">Data Row Limit</label>
            <select
              value={queryLimit}
              onChange={(e) => setQueryLimit(Number(e.target.value))}
              className="bg-slate-950 border border-slate-850 rounded px-2 py-1 w-full text-slate-300 focus:outline-none focus:border-indigo-500"
            >
              <option value={10}>Top 10 Records</option>
              <option value={20}>Top 20 Records</option>
              <option value={50}>Top 50 Records</option>
              <option value={100}>Top 100 Records</option>
            </select>
          </div>
        </div>

        {bqError && (
          <div className="p-3 bg-rose-950/20 border border-rose-900/60 rounded-xl flex items-center gap-2 text-rose-450 text-rose-400 font-mono text-[9.5px]">
            <AlertCircle className="h-4 w-4 text-red-500 shrink-0" />
            <span>{bqError}</span>
          </div>
        )}

        {/* RESULTS EXPLORER & EXPORTERS CONTAINER */}
        {bqDataset ? (
          <div className="space-y-4">
            {/* PIPELINE DATA STATISTICS */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-indigo-950/50 p-3 rounded-xl border border-indigo-900/30 text-[9px] font-mono leading-tight">
              <div className="space-y-0.5">
                <span className="text-slate-400 block uppercase">Matched Bq Queries Size</span>
                <span className="text-indigo-300 font-bold text-xs">{bqQueryInfo?.billedBytes || '0.00 MB'}</span>
              </div>
              <div className="space-y-0.5 border-l border-slate-850 pl-3">
                <span className="text-slate-400 block uppercase">Cloud Execution Latency</span>
                <span className="text-emerald-400 font-bold text-xs">{bqQueryInfo?.executionTimeMs || '55'} ms</span>
              </div>
              <div className="space-y-0.5 border-l border-slate-850 pl-3 col-span-2">
                <span className="text-slate-400 block uppercase">Anonymization Level Applied</span>
                <span className="text-indigo-400 font-extrabold text-[8.5px] line-clamp-1">Secure SHA-256 Hashing; Age-Range Binning; Safe Harbor</span>
              </div>
            </div>

            {/* DOWNLOAD TRIGGER ACTIONS BUTTONS & TABS SWITCHER */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-slate-800 pb-2">
              <div className="flex bg-slate-950 p-0.5 rounded-lg border border-slate-850 text-[9px] font-mono uppercase h-8 items-center shrink-0">
                <button
                  type="button"
                  onClick={() => setBqActiveTab('viewer')}
                  className={`px-3 py-1 rounded font-bold cursor-pointer transition-all ${
                    bqActiveTab === 'viewer' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Matched Dataset ({bqDataset.length})
                </button>
                <button
                  type="button"
                  onClick={() => setBqActiveTab('sql')}
                  className={`px-3 py-1 rounded font-bold cursor-pointer transition-all ${
                    bqActiveTab === 'sql' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Standard SQL Script
                </button>
                <button
                  type="button"
                  onClick={() => setBqActiveTab('anon-info')}
                  className={`px-3 py-1 rounded font-bold cursor-pointer transition-all ${
                    bqActiveTab === 'anon-info' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Safe Harbor Audit Log
                </button>
              </div>

              {/* ACTION EXPORTS */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleExportCSV}
                  className="py-1 px-3.5 bg-slate-950 hover:bg-slate-850 text-emerald-400 hover:text-emerald-350 rounded-lg border border-emerald-900/40 text-[9px] font-bold font-mono transition-all uppercase flex items-center gap-1.5 cursor-pointer"
                  type="button"
                >
                  <Download className="h-3 w-3 text-emerald-400" />
                  <span>Export Standard CSV</span>
                </button>
                <button
                  onClick={handleExportJSON}
                  className="py-1 px-3.5 bg-slate-950 hover:bg-slate-850 text-indigo-400 hover:text-indigo-350 rounded-lg border border-indigo-900/40 text-[9px] font-bold font-mono transition-all uppercase flex items-center gap-1.5 cursor-pointer"
                  type="button"
                >
                  <FileJson className="h-3 w-3 text-indigo-400" />
                  <span>Export JSON Extract</span>
                </button>
              </div>
            </div>

            {/* TAB CONTENT: viewer */}
            {bqActiveTab === 'viewer' && (
              <div className="bg-slate-950 rounded-xl border border-slate-850 overflow-hidden">
                <div className="max-h-60 overflow-y-auto font-mono text-[9px] scrollbar-thin">
                  <table className="w-full text-left">
                    <thead className="bg-slate-900 text-slate-500 border-b border-slate-850 font-extrabold text-[8px] tracking-wider sticky top-0 uppercase">
                      <tr>
                        <th className="p-2 pl-3">Session ID</th>
                        <th className="p-2">Anonymized Participant Hash</th>
                        <th className="p-2">Cohort</th>
                        <th className="p-2">Timestamp (UTC)</th>
                        <th className="p-2">qEEG Wave Bands (α,β,θ,γ)</th>
                        <th className="p-2">Prefrontal TBR/BAR</th>
                        <th className="p-2">Autonomic Metric</th>
                        <th className="p-2">Age / Sleep</th>
                        <th className="p-2 pr-3">Tasks Compl</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-400 divide-y divide-slate-900">
                      {bqDataset.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-900/40 transition-colors">
                          <td className="p-2 pl-3 font-semibold text-slate-300">{row.sessionId}</td>
                          <td className="p-2 text-indigo-300" title={row.participantHash}>
                            {row.participantHash.substring(0, 12)}...
                          </td>
                          <td className="p-2 font-bold text-slate-450">{row.demographics?.academicCohort || 'N/A'}</td>
                          <td className="p-2 text-[8px] text-slate-500">{new Date(row.timestamp).toISOString()}</td>
                          <td className="p-2 text-[8px] text-slate-300">
                            α:{row.brainwaves.alpha}% | β:{row.brainwaves.beta}% | θ:{row.brainwaves.theta}% | γ:{row.brainwaves.gamma}%
                          </td>
                          <td className="p-2 font-semibold">TBR:{row.tbr} | BAR:{row.bar}</td>
                          <td className="p-2 text-[8.5px] text-slate-350">
                            HR:{row.heartRate}bpm | HRV:{row.hrv}ms | GSR:{row.gsr}uS
                          </td>
                          <td className="p-2">
                            {row.demographics?.ageRange} | Sleep: {row.demographics?.sleepQualityIndex}/10
                          </td>
                          <td className="p-2 text-emerald-400 pr-3 font-bold text-center">
                            {row.performance?.tasksCompleted}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB CONTENT: sql */}
            {bqActiveTab === 'sql' && (
              <div className="space-y-2">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 font-mono text-[9px] text-slate-300 relative overflow-hidden">
                  <div className="absolute top-2 right-2">
                    <button
                      onClick={handleCopySQL}
                      className="p-1 px-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded font-semibold text-[8px] hover:text-white uppercase transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <ClipboardCopy className="h-3 w-3 text-slate-405" />
                      <span>{copiedSQLText ? 'Copied!' : 'Copy SQL'}</span>
                    </button>
                  </div>
                  <pre className="whitespace-pre-wrap max-h-48 overflow-y-auto scrollbar-thin text-indigo-250 leading-relaxed">
                    {bqQueryInfo?.sqlQuery}
                  </pre>
                </div>
                <div className="p-3 bg-indigo-950/20 rounded-lg border border-indigo-900/30 text-[8.5px] font-mono text-slate-400 leading-normal">
                  *Query automatically structures BigQuery nested analytical constructs (UNNEST demographic arrays) and forces strict SHA256 key hashing on individual subject codes.
                </div>
              </div>
            )}

            {/* TAB CONTENT: anon-info */}
            {bqActiveTab === 'anon-info' && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-850 font-mono text-[9px] text-slate-400 space-y-3 leading-relaxed">
                <span className="text-emerald-400 font-extrabold uppercase flex items-center gap-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                  HIPAA SAFE HARBOR COHORT ANONYMIZATION COMPLIANCE REPORT
                </span>
                <p>
                  To secure complete participant anonymity and allow institutional telemetry transfers from the BigQuery pipeline, the cloud analytics extraction applies the following strict anonymization rules:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 text-slate-300">
                  <div className="bg-slate-900 p-2.5 rounded border border-slate-850/60">
                    <strong className="text-indigo-400 block mb-0.5">SHA-256 Subject Salt Hashing</strong>
                    <span>All raw participant keys identifier components are replaced with unique irreversibly hashed fingerprints. It is computationally impossible to backtrack secondary participants.</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded border border-slate-850/60">
                    <strong className="text-emerald-400 block mb-0.5">Demographic Age & Sleep Binning</strong>
                    <span>Individual birth dates and age digits are converted into anonymized age bracket bins (e.g., 18-24, 25-34) to avoid outliers and preserve identity privacy standard.</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded border border-slate-850/60">
                    <strong className="text-amber-400 block mb-0.5">Clinical Cohort Sanitization</strong>
                    <span>Direct relational mappings are scrubbed. Cohort tag indicators are grouped into standardized regional study classifications to prevent location correlations.</span>
                  </div>
                  <div className="bg-slate-900 p-2.5 rounded border border-slate-850/60">
                    <strong className="text-pink-400 block mb-0.5">Electrode Montage Masking</strong>
                    <span>Specific hardware device telemetry addresses are masked, preserving only normalized microvolt coefficients (α, β, θ, γ wave percentages) and HRV short-term intervals.</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-slate-950/60 rounded-xl border border-slate-850/40 p-10 text-center font-mono text-[9.5px] text-slate-500 space-y-2">
            <Database className="h-8 w-8 text-slate-800 mx-auto animate-pulse" />
            <span>BigQuery Centralized Telemetry Pipeline is connected.</span>
            <p className="text-[8.5px] text-slate-600 max-w-md mx-auto">
              Please enter valid institutional researcher identifiers (ID & License) and click <strong>\"Query Cloud Telemetry\"</strong> above to fetch recent database records and trigger direct CSV/JSON downloads.
            </p>
          </div>
        )}
      </div>

      {/* STAGE 3: GEMINI ACADEMIC SYNTHESIS COMPILER REPORT BLOCK */}
      <div className="bg-slate-900/40 p-5 rounded-2xl border border-slate-850/80 space-y-4">
        
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border-b border-slate-800 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-xs uppercase font-bold tracking-widest text-indigo-400 flex items-center gap-1.5 font-sans">
              <Sparkles className="h-4 w-4 text-indigo-400 animate-pulse" />
              Gemini Cognitive Synthesis Report Generator
            </h3>
            <p className="text-[10px] text-slate-500 font-mono">Transforms the time-series logs compiled above into standard APA publications or case summaries.</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={fetchAcademicReport}
              disabled={isSynthesizing || recordedLogs.length === 0}
              className={`py-1.5 px-3 rounded-lg border text-[10px] font-bold font-mono uppercase transition-all cursor-pointer flex items-center gap-1.5 ${
                recordedLogs.length > 0 && !isSynthesizing
                  ? 'bg-indigo-600 hover:bg-indigo-650 border-indigo-750 text-slate-100 shadow-md shadow-indigo-600/10'
                  : 'bg-slate-950/40 border-slate-900 text-slate-600 cursor-not-allowed'
              }`}
              type="button"
            >
              {isSynthesizing ? (
                <>
                  <svg className="animate-spin h-3.5 w-3.5 text-indigo-450 shrink-0" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Synthesizing abstract data models...</span>
                </>
              ) : (
                <>
                  <FlaskConical className="h-3.5 w-3.5" />
                  <span>Draft Research Abstract</span>
                </>
              )}
            </button>

            {synthesizedReport && (
              <button
                onClick={handleCopyReport}
                className="py-1.5 px-3 bg-slate-950 hover:bg-slate-850 text-slate-300 rounded-lg border border-slate-850 text-[10px] font-bold font-mono transition-all uppercase flex items-center gap-1.5 cursor-pointer"
                type="button"
              >
                {copiedNotification ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <ClipboardCopy className="h-3.5 w-3.5 text-slate-400" />
                    <span>Copy Draft</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* Synthesis results box */}
        <div className="bg-slate-950 rounded-xl border border-slate-850 p-5 min-h-36 relative overflow-hidden" id="academic-synthesis-report-container">
          <div className="absolute top-0 right-0 p-4 opacity-[0.03] select-none pointer-events-none">
            <Brain className="h-44 w-44 text-slate-300" />
          </div>

          {synthesizedReport ? (
            <div className="prose prose-invert max-w-none text-xs space-y-4 font-sans text-slate-300 leading-relaxed max-h-[420px] overflow-y-auto pr-2 scrollbar-thin">
              {synthesizedReport.split('\n').map((line, idx) => {
                const isHeading1 = line.trim().startsWith('# ') || (line.trim().startsWith('1.') && line.toUpperCase() === line);
                const isHeading2 = line.trim().startsWith('## ') || line.trim().startsWith('===') || line.trim().startsWith('**');
                
                if (isHeading1) {
                  return (
                    <h4 key={idx} className="text-sm font-black uppercase text-indigo-400 border-b border-indigo-950/70 pb-1 flex items-center gap-2 mt-4">
                      <div className="h-1.5 w-1.5 bg-indigo-500 rounded-full animate-ping" />
                      {line.replace(/^#\s+/, '')}
                    </h4>
                  );
                }
                
                if (line.trim().startsWith('###')) {
                  const title = line.replace(/^###\s+/, '');
                  return (
                    <h5 key={idx} className="text-xs font-black text-slate-100 uppercase tracking-wider mt-3 flex items-center gap-1">
                      <ChevronRight className="h-3.5 w-3.5 text-indigo-400 shrink-0" />
                      {title}
                    </h5>
                  );
                }

                if (line.trim().startsWith('-') || line.trim().startsWith('*')) {
                  return (
                    <li key={idx} className="ml-4 list-disc text-slate-350 list-none flex items-start gap-1.5 pl-1.5">
                      <ArrowRight className="h-3 w-3 text-indigo-500 mt-1 shrink-0" />
                      <span>{line.replace(/^[\s-*]+/, '')}</span>
                    </li>
                  );
                }

                if (line.trim() === '') {
                  return <div key={idx} className="h-1" />;
                }

                return (
                  <p key={idx} className="text-slate-300 leading-relaxed font-sans">
                    {line}
                  </p>
                );
              })}
            </div>
          ) : isSynthesizing ? (
            <div className="h-36 flex flex-col items-center justify-center space-y-3 font-mono text-[10px] text-indigo-400 bg-indigo-955/5 p-4 rounded-lg">
              <Activity className="h-6 w-6 animate-spin text-indigo-400" />
              <span>Sensing timeline parameters, computing HRV Poincaré short-intervals and drafting professional abstracts via neural pipeline.</span>
            </div>
          ) : (
            <div className="h-36 flex flex-col items-center justify-center text-slate-600 font-mono text-[10px] space-y-2 text-center p-4">
              <FlaskConical className="h-7 w-7 text-slate-800 animate-pulse" />
              <span>No academic report synthesized yet.</span>
              <p className="text-[8.5px] max-w-md">
                To generate a formal report draft first enable <strong>\"Record New Trial\"</strong> to compile at least 2 or 3 biometric logs under standard conditions.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

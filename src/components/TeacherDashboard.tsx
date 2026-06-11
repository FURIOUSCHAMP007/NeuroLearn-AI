import React, { useState, useEffect } from 'react';
import { Users, LayoutGrid, AlertTriangle, CheckSquare, Sparkles, HelpCircle, Activity, Heart, ShieldAlert, Zap, Layers, Volume2 } from 'lucide-react';
import { CognitiveState, BiometricState } from '../types';
import { getWellnessCheckIns, WellnessData, getDistressSignals, DistressSignal } from '../lib/firebase';

interface StudentData {
  id: string;
  name: string;
  attention: 'High' | 'Moderate' | 'Low';
  stress: 'High' | 'Moderate' | 'Low';
  fatigue: 'High' | 'Moderate' | 'Low';
  hrv: number;
  gsr: number;
  posture: string;
}

interface TeacherDashboardProps {
  cognitive?: CognitiveState;
  biometric?: BiometricState;
}

export default function TeacherDashboard({ cognitive, biometric }: TeacherDashboardProps) {
  // Mock student roster
  const [students, setStudents] = useState<StudentData[]>([
    { id: '1', name: 'Alex Mercer', attention: 'High', stress: 'Low', fatigue: 'Low', hrv: 85, gsr: 3.2, posture: 'Proper' },
    { id: '2', name: 'Jack Peterson', attention: 'Low', stress: 'High', fatigue: 'High', hrv: 32, gsr: 9.8, posture: 'Slouched' },
    { id: '3', name: 'Sophia Lin', attention: 'High', stress: 'Moderate', fatigue: 'Low', hrv: 62, gsr: 5.4, posture: 'Proper' },
    { id: '4', name: 'Ethan Hunt', attention: 'Moderate', stress: 'Low', fatigue: 'Moderate', hrv: 72, gsr: 4.1, posture: 'Moving' },
    { id: '5', name: 'Chloe Fraser', attention: 'High', stress: 'Low', fatigue: 'Low', hrv: 94, gsr: 2.8, posture: 'Proper' },
    { id: '6', name: 'Zack Ward', attention: 'Low', stress: 'Low', fatigue: 'High', hrv: 69, gsr: 3.0, posture: 'Micro-naps' },
    { id: '7', name: 'Abby Williams', attention: 'Moderate', stress: 'High', fatigue: 'Moderate', hrv: 44, gsr: 8.5, posture: 'Forward lean' },
    { id: '8', name: 'Lucas Scott', attention: 'High', stress: 'Low', fatigue: 'Low', hrv: 88, gsr: 3.3, posture: 'Proper' },
    { id: '9', name: 'Mia Wong', attention: 'High', stress: 'Moderate', fatigue: 'Low', hrv: 55, gsr: 5.8, posture: 'Slouched' },
    { id: '10', name: 'Noah Miller', attention: 'Low', stress: 'Moderate', fatigue: 'High', hrv: 48, gsr: 6.2, posture: 'Restless' },
    { id: '11', name: 'Emma Davis', attention: 'Moderate', stress: 'Low', fatigue: 'Low', hrv: 79, gsr: 3.9, posture: 'Proper' },
    { id: '12', name: 'Oliver Taylor', attention: 'High', stress: 'Low', fatigue: 'Low', hrv: 90, gsr: 2.9, posture: 'Proper' }
  ]);

  const [wellnessLogs, setWellnessLogs] = useState<WellnessData[]>([]);
  const [isLogsLoading, setIsLogsLoading] = useState(false);
  const [distressSignals, setDistressSignals] = useState<DistressSignal[]>([]);
  const [isDistressLoading, setIsDistressLoading] = useState(false);

  useEffect(() => {
    async function loadData() {
      setIsLogsLoading(true);
      setIsDistressLoading(true);
      try {
        const [logs, signals] = await Promise.all([
          getWellnessCheckIns('student_alex'),
          getDistressSignals()
        ]);
        setWellnessLogs(logs);
        setDistressSignals(signals);
      } catch (err) {
        console.error("Failed to load data in Teacher Dashboard", err);
      } finally {
        setIsLogsLoading(false);
        setIsDistressLoading(false);
      }
    }
    loadData();
  }, []);

  const mappedStudents = students.map(s => {
    if (s.id === '1' && cognitive && biometric) {
      return {
        ...s,
        attention: cognitive.attention,
        stress: cognitive.stress,
        fatigue: cognitive.fatigue,
        hrv: biometric.hrv,
        gsr: biometric.gsr,
        posture: biometric.headMovement === 'Stable' ? 'Proper' : biometric.headMovement === 'Erratic' ? 'Restless' : 'Proper'
      };
    }
    return s;
  });

  const [hoveredStudent, setHoveredStudent] = useState<StudentData | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);
  const [classroomFocusTriggered, setClassroomFocusTriggered] = useState(false);

  // Stats calculation
  const totalStudents = mappedStudents.length;
  const highAttentionCount = mappedStudents.filter(s => s.attention === 'High').length;
  const highStressCount = mappedStudents.filter(s => s.stress === 'High').length;
  const highFatigueCount = mappedStudents.filter(s => s.fatigue === 'High').length;

  const averageAttentionIndex = Math.round((mappedStudents.filter(s => s.attention !== 'Low').length / totalStudents) * 100);

  const [alerts, setAlerts] = useState([
    {
      id: 'alert_1',
      studentName: 'Jack Peterson',
      type: 'Burnout Warning',
      severity: 'CRITICAL',
      timestamp: '2 mins ago',
      details: 'GSR score of 9.8 µS sustained with theta brainwaves dominating for 40 mins. High risk of immediate cognitive exhaustion.',
      recom: 'Trigger 5-minute offline screen detoxification and breathing exercises immediately.'
    },
    {
      id: 'alert_2',
      studentName: 'Abby Williams',
      type: 'Cognitive Stress Spillover',
      severity: 'HIGH',
      timestamp: '5 mins ago',
      details: 'Heart rate variability falling steadily to 44ms (suggests sympathetic nervous strain). Posture reveals erratic jerking.',
      recom: 'Instruct Abby to explore the Wellness Athena Coach page for shoulder posture shrugging.'
    },
    {
      id: 'alert_3',
      studentName: 'Zack Ward',
      type: 'Prolonged Attention Fade',
      severity: 'MODERATE',
      timestamp: '15 mins ago',
      details: 'Attentional indices sitting inside Low focus category. Alpha/Beta amplitude has degraded. Theta surges suggest drowsiness.',
      recom: 'Present an interactive gaming micro-challenge rather than another long explanation.'
    }
  ]);

  const triggerClassroomFocusBreak = () => {
    setClassroomFocusTriggered(true);
    setTimeout(() => {
      setClassroomFocusTriggered(false);
    }, 4500);
  };

  return (
    <div className="space-y-6" id="teacher_dashboard_tab">
      
      {/* Alert Ribbon for Classroom Focus Overlay Triggers */}
      {classroomFocusTriggered && (
        <div className="bg-gradient-to-r from-sky-600 to-sky-700 text-white rounded-xl p-4 flex items-center justify-between shadow-lg animate-pulse border border-sky-400">
          <div className="flex items-center space-x-3">
            <Volume2 className="h-5 w-5 animate-bounce" />
            <div>
              <strong className="text-sm block">Broadcast Sent: Adaptive Focus Break Enforced!</strong>
              <p className="text-xs text-sky-200">Enforcing a 60-second breathing overlay and posture alignment screen on all student platforms.</p>
            </div>
          </div>
          <span className="text-xs bg-sky-950 font-semibold px-2 py-1 rounded">Activating...</span>
        </div>
      )}

      {/* Classroom KPIs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Students */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4.5 flex items-center space-x-4">
          <div className="p-3 bg-slate-950 text-sky-400 rounded-lg">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Class Roster</span>
            <strong className="text-2xl text-slate-100 font-bold">12 Students</strong>
            <p className="text-[10px] text-emerald-400">100% sensors online</p>
          </div>
        </div>

        {/* Avg Attention */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4.5 flex items-center space-x-4">
          <div className="p-3 bg-slate-950 text-emerald-400 rounded-lg">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Cognitive Focus</span>
            <strong className="text-2xl text-slate-100 font-bold">{averageAttentionIndex}%</strong>
            <p className="text-[10px] text-slate-400">Optimal flow limits</p>
          </div>
        </div>

        {/* Active Stress Alert count */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4.5 flex items-center space-x-4">
          <div className="p-3 bg-slate-950 text-red-400 rounded-lg">
            <ShieldAlert className="h-5 w-5 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">Active Burnout Risks</span>
            <strong className="text-2xl text-red-400 font-bold">{highStressCount} Students</strong>
            <p className="text-[10px] text-rose-300">Requires offline detox</p>
          </div>
        </div>

        {/* Active Fatigue Count */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4.5 flex items-center space-x-4">
          <div className="p-3 bg-slate-950 text-yellow-400 rounded-lg">
            <Zap className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider block">High Fatigue</span>
            <strong className="text-2xl text-slate-100 font-bold">{highFatigueCount} Students</strong>
            <p className="text-[10px] text-yellow-400">Theta brainwaves elevated</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* HEATMAP GRID: Left Column (Span 7) */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl">
          <div className="flex items-center justify-between border-b border-slate-850 pb-3 mb-4">
            <div>
              <h3 className="font-bold text-slate-200 text-sm flex items-center gap-2">
                <LayoutGrid className="h-4 w-4 text-sky-400" />
                Live Seating Engagement Heatmap
              </h3>
              <p className="text-[11px] text-slate-400">
                Visual matrix representing physical seat positions in the cyber-lab. Hover on a tile to probe.
              </p>
            </div>
            {/* Quick Map Legend */}
            <div className="flex items-center space-x-2 text-[9px] text-slate-400">
              <span className="flex items-center"><span className="h-2 w-2 bg-emerald-500 rounded-full mr-1"></span> Focus</span>
              <span className="flex items-center"><span className="h-2 w-2 bg-yellow-500 rounded-full mr-1"></span> Tired</span>
              <span className="flex items-center"><span className="h-2 w-2 bg-rose-500 rounded-full mr-1"></span> Stressed</span>
            </div>
          </div>

          {/* Interactive Responsive Grid representing 12 desks */}
          <div className="grid grid-cols-4 gap-3.5 pt-2">
            {mappedStudents.map((student) => {
              let colorClass = 'border-slate-800 bg-slate-950 hover:border-slate-600 text-slate-300';
              if (student.attention === 'High' && student.stress !== 'High') {
                colorClass = 'bg-emerald-950/20 text-emerald-300 border-emerald-900/60 hover:border-emerald-600';
              } else if (student.stress === 'High') {
                colorClass = 'bg-rose-950/20 text-rose-300 border-rose-900/60 hover:border-rose-600 animate-pulse';
              } else if (student.fatigue === 'High' || student.attention === 'Low') {
                colorClass = 'bg-amber-950/20 text-yellow-300 border-amber-900/60 hover:border-yellow-600';
              }

              return (
                <div
                  key={student.id}
                  onMouseEnter={() => setHoveredStudent(student)}
                  onMouseLeave={() => setHoveredStudent(null)}
                  className={`p-3 rounded-lg border cursor-pointer text-center transition-all ${colorClass}`}
                >
                  <strong className="text-xs truncate block">{student.name.split(' ')[0]}</strong>
                  <span className="text-[9px] text-slate-400 block font-mono mt-1 pr-1 bg-slate-900/80 rounded py-0.5 mt-1">
                    GSR {student.gsr} • HRV {student.hrv}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Hover Details Panel */}
          {hoveredStudent ? (() => {
            const activeHoveredStudent = mappedStudents.find(s => s.id === hoveredStudent.id) || hoveredStudent;
            const latestCheckin = activeHoveredStudent.id === '1' && wellnessLogs.length > 0 ? wellnessLogs[0] : null;

            return (
              <div className="bg-slate-950 border border-slate-850 p-4 mt-5 rounded-lg flex flex-col justify-between transition-all">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <strong className="text-sm text-slate-200 block">{activeHoveredStudent.name}</strong>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wide">Dynamic Wearable Telemetry</span>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <div>
                        <span className="text-[9px] text-slate-500 block">Attention Index</span>
                        <strong className="text-xs text-emerald-400 font-semibold">{activeHoveredStudent.attention}</strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 block">Posture Angle</span>
                        <strong className="text-xs text-sky-400 font-semibold">{activeHoveredStudent.posture}</strong>
                      </div>
                      <div>
                        <span className="text-[9px] text-slate-500 block">Stress Indicator (GSR)</span>
                        <strong className="text-xs text-rose-400 font-bold">{activeHoveredStudent.gsr} µS</strong>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-right">
                    <span className="text-[9px] text-slate-400 block font-mono">HR / HRV</span>
                    <strong className="text-sm text-slate-200 mt-1 font-bold block">{activeHoveredStudent.id === '1' && biometric ? biometric.heartRate : 78} BPM</strong>
                    <span className="text-[9px] text-slate-500 font-mono block">SDNN: {activeHoveredStudent.hrv} ms</span>
                  </div>
                </div>

                {latestCheckin && (
                  <div className="mt-3 pt-3 border-t border-slate-900 text-[10px] text-slate-400 flex items-center md:justify-between flex-wrap gap-2">
                    <span className="flex items-center gap-1">
                      <Heart className="h-3.5 w-3.5 text-pink-500 animate-pulse" />
                      <span>Firebase Daily Reported State: <strong className="text-pink-400">{latestCheckin.moodLabel}</strong> (Mood: {latestCheckin.mood}/5)</span>
                    </span>
                    <span className="bg-indigo-950 text-indigo-400 px-2 py-0.5 rounded border border-indigo-900/60">
                      Sleep: <strong>{latestCheckin.sleepHours} hrs</strong> ({latestCheckin.sleepQuality})
                    </span>
                  </div>
                )}
              </div>
            );
          })() : (
            <div className="bg-slate-950 border border-slate-900 p-4 mt-5 rounded-lg text-center text-xs text-slate-500">
              Hover over student tiles in the workspace layout above to inspect high-frequency EEG data channels.
            </div>
          )}

          {/* Cognitive Load Map & Daily Stress Hours Section using inline SVGs */}
          <div className="mt-6 border-t border-slate-850 pt-5">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-1.5">
              <Layers className="h-4.5 w-4.5 text-sky-400" />
              Class-Wide Stress Trends Index (7-Day Aggregation)
            </h4>
            <div className="bg-slate-950 rounded-lg p-4 border border-slate-850">
              <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
                <span>Sympathetic/Para-sympathetic Load Ratio</span>
                <span className="text-[10px] text-sky-400">High load spikes during math exams</span>
              </div>
              {/* Beautiful Simulated Area Chart */}
              <svg className="w-full h-24 text-sky-500 overflow-visible" viewBox="0 0 400 100">
                <defs>
                  <linearGradient id="stressGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3"/>
                    <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.0"/>
                  </linearGradient>
                </defs>
                <path d="M 0,90 Q 50,40 100,55 T 200,30 T 300,75 T 400,20 L 400,100 L 0,100 Z" fill="url(#stressGrad)" />
                <path d="M 0,90 Q 50,40 100,55 T 200,30 T 300,75 T 400,20" fill="none" stroke="#0ea5e9" strokeWidth="2.5" />
                <line x1="0" y1="50" x2="400" y2="50" stroke="#ef4444" strokeDasharray="3,3" strokeWidth="1" />
                <text x="340" y="45" fill="#ef4444" fontSize="8" className="font-semibold">Burnout Threshold</text>
                {/* Horizontal time line labels */}
                <text x="5" y="98" fill="#64748b" fontSize="8">Mon</text>
                <text x="70" y="98" fill="#64748b" fontSize="8">Tue</text>
                <text x="140" y="98" fill="#64748b" fontSize="8">Wed</text>
                <text x="210" y="98" fill="#64748b" fontSize="8">Thu</text>
                <text x="280" y="98" fill="#64748b" fontSize="8">Fri</text>
                <text x="350" y="98" fill="#64748b" fontSize="8">Sat/Sun</text>
              </svg>
            </div>
          </div>

        </div>

        {/* ALERTS & INTELLIGENT ACTIONS CHANNEL: Right Column (Span 5) */}
        <div className="lg:col-span-5 flex flex-col space-y-6">
          
          {/* Active alerts panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-xl flex-1 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-slate-200 text-sm flex items-center mb-1">
                <AlertTriangle className="h-4.5 w-4.5 text-rose-500 mr-2" />
                Live Burnout Alerts Feed
              </h3>
              <p className="text-xs text-slate-400 mb-4 pb-2 border-b border-slate-850">
                Continuous edge processing triggers real-time educational interventions.
              </p>

              <div className="space-y-3">
                {(() => {
                  const activeAlerts = [...alerts];
                  if (cognitive && cognitive.stress === 'High') {
                    if (!activeAlerts.some(a => a.id === 'mercer_stress')) {
                      activeAlerts.unshift({
                        id: 'mercer_stress',
                        studentName: 'Alex Mercer',
                        type: 'Active Sympathetic Strain Surge',
                        severity: 'CRITICAL',
                        timestamp: 'Just now',
                        details: `Live wearable band reports biometric values out of safe zone: GSR is elevated to ${biometric ? biometric.gsr : 8.5} µS, and Heart Rate Variability has collapsed to ${biometric ? biometric.hrv : 38}ms. High alpha/theta load indicating cognitive burnout risk.`,
                        recom: 'Instruct Alex to pause study module, take deep breathing block, and complete an emotional refresh.'
                      });
                    }
                  } else if (cognitive && cognitive.fatigue === 'High') {
                    if (!activeAlerts.some(a => a.id === 'mercer_fatigue')) {
                      activeAlerts.unshift({
                        id: 'mercer_fatigue',
                        studentName: 'Alex Mercer',
                        type: 'Sustained Fatigue Detected',
                        severity: 'HIGH',
                        timestamp: 'Just now',
                        details: `Wearable band metrics suggest fatigue levels have crossed safe threshold limits. Alpha activity decreased while slow-theta waveforms rose by 32%.`,
                        recom: 'Broadcast adaptive focus break, or prompt quick physical posture stretch.'
                      });
                    }
                  }

                  // Inject manual distress signal alerts triggered by students
                  distressSignals.forEach((ds) => {
                    const dId = `distress_${ds.id || 'new'}`;
                    if (!activeAlerts.some(a => a.id === dId)) {
                      activeAlerts.unshift({
                        id: dId,
                        studentName: ds.studentName,
                        type: 'MANUAL DISTRESS / RESCUE SIGNAL',
                        severity: 'CRITICAL',
                        timestamp: ds.createdAt ? new Date(ds.createdAt).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'}) : 'Just now',
                        details: `Student manually pressed 'Emergency Help' on headband console. Message details: "${ds.message}". Biometric Context -> Stress: ${ds.stressSnapshot || 'N/A'}, Attention Focus: ${ds.attentionSnapshot || 'N/A'}, Heart Rate: ${ds.heartRateSnapshot ? ds.heartRateSnapshot + ' BPM' : 'N/A'}.`,
                        recom: 'Deploy Immediate Intervention. Initiate active dialogue link or quiet desk check-in.'
                      });
                    }
                  });

                  return activeAlerts.map((al) => (
                    <div
                      key={al.id}
                      onClick={() => setSelectedAlert(selectedAlert === al.id ? null : al.id)}
                      className={`p-3.5 rounded-lg border text-left cursor-pointer transition-all ${
                        selectedAlert === al.id 
                          ? 'bg-slate-950 border-rose-500' 
                          : al.severity === 'CRITICAL'
                            ? 'bg-rose-950/15 border-rose-900/60 hover:bg-rose-950/25'
                            : al.severity === 'HIGH'
                              ? 'bg-amber-950/15 border-amber-900/60 hover:bg-amber-950/25'
                              : 'bg-slate-950/50 border-slate-850 hover:bg-slate-850/30'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[10px] uppercase font-bold tracking-wider text-rose-400 flex items-center gap-1">
                          <span className="h-1.5 w-1.5 bg-red-500 rounded-full animate-ping"></span>
                          {al.severity} • {al.type}
                        </span>
                        <span className="text-[9px] text-slate-500">{al.timestamp}</span>
                      </div>
                      <strong className="text-xs text-slate-200 block">{al.studentName}</strong>
                      <p className={`text-[11px] leading-relaxed mt-1 text-slate-400 ${selectedAlert === al.id ? '' : 'truncate'}`}>
                        {al.details}
                      </p>

                      {selectedAlert === al.id && (
                        <div className="mt-3.5 pt-3 border-t border-slate-850 bg-slate-950/80 p-2.5 rounded text-[11px]">
                          <strong className="text-emerald-400 flex items-center gap-1 mb-1">
                            <Sparkles className="h-3.5 w-3.5 text-yellow-400" /> RECOMMENDED REMEDIAL ACTION:
                          </strong>
                          <p className="text-slate-300 font-medium leading-relaxed">{al.recom}</p>
                        </div>
                      )}
                    </div>
                  ));
                })()}
              </div>
            </div>

            {/* Quick intervention broad cast panel */}
            <div className="pt-5 border-t border-slate-850 mt-5">
              <h4 className="text-xs font-bold text-slate-200 mb-2">Classroom Intervention Broadcaster</h4>
              <p className="text-[10px] text-slate-400 mb-3.5 leading-relaxed">
                Notice general attention fading or post-exam burnout? Enforce a calming physical rest session on all client screens instantly.
              </p>
              <button
                onClick={triggerClassroomFocusBreak}
                className="w-full bg-slate-850 hover:bg-slate-850 cursor-pointer text-sky-400 border border-sky-900 hover:border-sky-500 text-xs font-semibold py-2 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5"
              >
                <Volume2 className="h-4 w-4" />
                BroadCast Calming Focus Break
              </button>
            </div>

            {/* Real-time self report log stream */}
            <div className="pt-5 border-t border-slate-850 mt-5">
              <h4 className="text-xs font-bold text-slate-250 mb-2.5 flex items-center gap-1.5 justify-between">
                <span className="flex items-center gap-1.5">
                  <Heart className="h-3.5 w-3.5 text-pink-500 animate-pulse" />
                  Alex's Real-time Self-Report Stream
                </span>
                <span className="text-[9px] font-mono text-pink-400 bg-pink-950/40 border border-pink-900/60 px-1.5 py-0.2 rounded font-bold uppercase">
                  Firebase Stream
                </span>
              </h4>
              {isLogsLoading ? (
                <div className="text-[11px] text-slate-500 animate-pulse text-center py-2">Loading logs...</div>
              ) : wellnessLogs.length > 0 ? (
                <div className="space-y-2 max-h-[160px] overflow-y-auto scrollbar-thin">
                  {wellnessLogs.slice(0, 2).map((log, index) => (
                    <div key={index} className="bg-slate-950 p-2.5 rounded border border-slate-850 text-[10px] space-y-1">
                      <div className="flex justify-between items-center text-slate-300">
                        <span className="font-bold">{log.moodLabel} (Score: {log.mood}/5)</span>
                        <span className="text-slate-500 text-[8px]">{log.createdAt ? new Date(log.createdAt).toLocaleDateString() : 'Today'}</span>
                      </div>
                      <p className="text-slate-400 text-[10px]">Sleep: <strong className="text-indigo-400">{log.sleepHours}h</strong> ({log.sleepQuality})</p>
                      {log.notes && (
                        <p className="border-l-2 border-indigo-500/40 pl-1.5 text-slate-400 italic text-[9.5px]">
                          "{log.notes}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-[11px] text-center py-3 border border-dashed border-slate-800 rounded">No self-reports yet.</p>
              )}
            </div>

            {/* Real-time distress signal alerts stream */}
            <div className="pt-5 border-t border-slate-850 mt-5">
              <h4 className="text-xs font-bold text-slate-250 mb-2.5 flex items-center gap-1.5 justify-between">
                <span className="flex items-center gap-1.5 text-rose-500">
                  <ShieldAlert className="h-4 w-4 animate-pulse text-red-500" />
                  Alex's Incident / Distress Stream
                </span>
                <span className="text-[9px] font-mono text-red-400 bg-red-950/40 border border-red-900/60 px-1.5 py-0.2 rounded font-bold uppercase">
                  Firestore Stream
                </span>
              </h4>
              {isDistressLoading ? (
                <div className="text-[11px] text-slate-500 animate-pulse text-center py-2">Loading distress signals...</div>
              ) : distressSignals.length > 0 ? (
                <div className="space-y-2 max-h-[160px] overflow-y-auto scrollbar-thin">
                  {distressSignals.slice(0, 3).map((sig, index) => (
                    <div key={index} className="bg-red-950/15 p-2.5 rounded border border-red-900/30 text-[10px] space-y-1">
                      <div className="flex justify-between items-center text-rose-400 font-bold">
                        <span>Incident Signal Triggered</span>
                        <span className="text-slate-500 text-[8px] font-mono">
                          {sig.createdAt ? new Date(sig.createdAt).toLocaleTimeString() : 'Just now'}
                        </span>
                      </div>
                      <p className="text-slate-250 italic">"{sig.message}"</p>
                      <div className="flex items-center gap-1 text-[8.5px] font-mono text-slate-400">
                        {sig.stressSnapshot && <span>Stress: {sig.stressSnapshot} |</span>}
                        {sig.attentionSnapshot && <span>Focus: {sig.attentionSnapshot} |</span>}
                        {sig.heartRateSnapshot && <span className="text-pink-400">{sig.heartRateSnapshot} BPM</span>}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-500 text-[11px] text-center py-3 border border-dashed border-slate-800 rounded">No emergency alerts logged.</p>
              )}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

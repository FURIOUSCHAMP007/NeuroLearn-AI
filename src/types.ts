export interface CognitiveState {
  attention: 'High' | 'Moderate' | 'Low';
  stress: 'High' | 'Moderate' | 'Low';
  fatigue: 'High' | 'Moderate' | 'Low';
}

export interface BiometricState {
  hrv: number; // ms
  gsr: number; // µS
  headMovement: 'Stable' | 'Moderate' | 'High' | 'Erratic';
  heartRate: number; // bpm
  temperature: number; // °C
}

export interface Brainwaves {
  alpha: number; // 8-12 Hz
  beta: number;  // 12-30 Hz
  theta: number; // 4-8 Hz
  gamma: number; // 30-100 Hz
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  cognitiveMetric: string;
}

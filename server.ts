import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Mock Storage for simulation analytics list (In-memory for prototype)
const sessionLogs: any[] = [];

// API: Health status
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// API: AI Tutor with Adaptive System Instructions based on Cognitive state
app.post('/api/gemini/tutor', async (req, res) => {
  try {
    const { message, history = [], cognitiveState = { attention: 'High', stress: 'Low', fatigue: 'Low' }, topic = 'General Science' } = req.body;

    const attentionStr = String(cognitiveState.attention);
    const stressStr = String(cognitiveState.stress);
    const fatigueStr = String(cognitiveState.fatigue);

    // Dynamic prompt engineering responding directly to student's live brainwave metrics
    let adaptiveGuideline = '';
    if (attentionStr === 'Low' || fatigueStr === 'High') {
      adaptiveGuideline = 'The student is currently fatigued or distracted. Simplify your explanations, keep answers maximum 2 paragraphs, use friendly emoji/analogies, and include a simple interactive multiple-choice check-in question or riddle to recapture attention.';
    } else if (stressStr === 'High') {
      adaptiveGuideline = 'The student exhibits High Stress. Adopt a calm, incredibly gentle academic advisory style. Do NOT demand heavy computation; break definitions down into slow, reassuring baby-steps. Offer immediate validation.';
    } else {
      adaptiveGuideline = 'The student is highly focused and receptive. Provide advanced concepts, stimulate critical thinking with open-ended prompt challenges, and provide thorough, high-fidelity engineering/scientific breakdowns.';
    }

    const systemInstruction = `You are NeuroLearn AI's Brain-Adaptive Tutor.
Current Topic: ${topic}.
Current Cognitive State of Student: Attention: ${attentionStr}, Stress: ${stressStr}, Fatigue: ${fatigueStr}.
Adaptive Directive: ${adaptiveGuideline}
Keep your tone educational, deeply supportive, and exciting. Format answers using pristine structure and clean bold text. Do not over-explain or write extremely long essays unless they have High Focus.`;

    const chatHistory = history.map((h: any) => ({
      role: h.role === 'user' ? 'user' : 'model',
      parts: [{ text: h.text }],
    }));

    // Start a chat conversation using the SDK structure
    const chat = ai.chats.create({
      model: 'gemini-3.5-flash',
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    // Populate history if available (we need to send previous messages iteratively or set them)
    // For simplicity, we can do generateContent by passing the recent conversation stack
    const contents = [...chatHistory, { role: 'user', parts: [{ text: message }] }];

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({
      success: true,
      text: response.text,
      appliedCognitiveProfile: {
        attention: attentionStr,
        stress: stressStr,
        adaptiveStyle: adaptiveGuideline
      }
    });
  } catch (error: any) {
    console.error('Error in AI Tutor Route:', error);
    res.status(500).json({ error: error.message || 'Error executing AI Tutor request.' });
  }
});

// API: Focus Recovery & Emotional Wellness Coach
app.post('/api/gemini/coach', async (req, res) => {
  try {
    const { message, biometricState = { hrv: 65, gsr: 4.8, headMovement: 'High' } } = req.body;

    const gsr = Number(biometricState.gsr);
    const hrv = Number(biometricState.hrv);
    const movement = String(biometricState.headMovement);

    let coachingFocus = '';
    if (gsr > 7.0 || hrv < 50) {
      coachingFocus = 'The student has physiological signs of high stress (elevated GSR / depressed HRV). Guide them immediately into a 4-7-8 deep diaphragmatic breathing technique. Count the steps together.';
    } else if (movement === 'High' || movement === 'Erratic') {
      coachingFocus = 'The student shows high head movement activity, suggesting restlessness or poor posture. Suggest a quick 30-second shoulder shrugging and posture reset.';
    } else {
      coachingFocus = 'The student is stable. Help them set a mindful daily learning micro-goal or offer positive reinforcement.';
    }

    const systemInstruction = `You are NeuroLearn AI's Focus Recovery & Student Wellness Coach.
Your objective is to optimize learning performance by assisting the student with emotional self-regulation, mindfulness, and physical posture resets.
Current Biometrics: Heart Rate Variability (HRV): ${hrv} ms, Galvanic Skin Response (GSR): ${gsr} µS, Head Motion: ${movement}.
Coaching Directive: ${coachingFocus}
Write with authentic empathy, calmness, and practical clarity. Keep replies concise and extremely refreshing.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: message,
      config: {
        systemInstruction,
        temperature: 0.6,
      }
    });

    res.json({
      success: true,
      text: response.text,
      wellnessDirectives: coachingFocus
    });
  } catch (error: any) {
    console.error('Error in AI Coach Route:', error);
    res.status(500).json({ error: error.message || 'Error executing AI Coach request.' });
  }
});

// API: Personalized Quiz Generator with Dynamic Difficulty
app.post('/api/gemini/quiz', async (req, res) => {
  try {
    const { topic = 'Neuroscience Basic', difficulty = 'Medium', cognitiveState = { attention: 'High' } } = req.body;

    const prompt = `Generate an interactive quiz with exactly 3 multiple-choice questions on "${topic}". 
The target difficulty is ${difficulty}, adapted for a student whose focus is ${cognitiveState.attention}.
Return a strict JSON array representing the questions.`;

    const systemInstruction = `You are NeuroLearn AI's Interactive Adaptive Quiz Generator. 
You must output a strict JSON array. Each element in the array must be an object with the following fields:
1. "id" (number)
2. "question" (string)
3. "options" (array of 4 strings)
4. "correctAnswer" (string, which must be exactly equal to one of the options)
5. "explanation" (string explaining why it is correct, written in a brain-supportive encouraging way)
6. "cognitiveMetric" (string detailing what aspect of attention/memory this question evaluates)

Do NOT wrap the output in markdown block. Return raw JSON string only. No leading or trailing characters.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        temperature: 0.8,
      }
    });

    let rawText = response.text || '[]';
    // Clean up any potential accidental markdown backticks just to be 100% resilient
    if (rawText.includes('```json')) {
      rawText = rawText.split('```json')[1].split('```')[0].trim();
    } else if (rawText.includes('```')) {
      rawText = rawText.split('```')[1].split('```')[0].trim();
    }

    const questions = JSON.parse(rawText.trim());
    res.json({
      success: true,
      topic,
      difficulty,
      questions,
    });
  } catch (error: any) {
    console.error('Error in Quiz Generator:', error);
    res.status(500).json({
      error: error.message || 'Error generating quiz.',
      // fallback mock questions to prevent UI failure
      questions: [
        {
          id: 1,
          question: "Which EEG frequency band is classically associated with deep focus and cognitive problem solving?",
          options: ["Delta waves (1-4 Hz)", "Theta waves (4-8 Hz)", "Beta waves (12-30 Hz)", "High Gamma waves (30-100 Hz)"],
          correctAnswer: "Beta waves (12-30 Hz)",
          explanation: "Beta bands reflect focused mental activity and analytical engagement, while theta reflects light sleep or relaxation.",
          cognitiveMetric: "Attentional focus"
        },
        {
          id: 2,
          question: "How does elevated heart rate variability (HRV) typically relate to a student's cognitive stress resilience?",
          options: ["Higher HRV indicates high psychological distress", "Higher HRV correlates with higher calm and emotional state stability", "HRV is purely a measure of physical exercise exhaustion", "HRV stays constant and doesn't change with stress"],
          correctAnswer: "Higher HRV correlates with higher calm and emotional state stability",
          explanation: "Higher heart rate variability represents high parasympathetic nervous network tone, which means better stress adjustment and mental clarity.",
          cognitiveMetric: "Stress resilience"
        }
      ]
    });
  }
});

// API: Save simulated student logs (for Firestore / BigQuery simulation logs)
app.post('/api/simulation/log', (req, res) => {
  const log = req.body;
  log.timestamp = new Date().toISOString();
  log.id = `log_${Date.now()}`;
  sessionLogs.push(log);
  if (sessionLogs.length > 50) {
    sessionLogs.shift(); // keep last 50
  }
  res.json({ success: true, savedLogId: log.id });
});

app.get('/api/simulation/logs', (req, res) => {
  res.json({ success: true, count: sessionLogs.length, logs: sessionLogs });
});

// Setup Vite & Static Files routing
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[NeuroLearn AI Backend] Server running at http://localhost:${PORT}`);
  });
}

startServer();

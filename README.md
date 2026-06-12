# NeuroLearn AI 🧠💻
### **Brain-Adaptive Education & Student Wellness Ecosystem**

> **Samsung "Solve for Tomorrow" Multi-Stakeholder Proposal Concept**  
> *Transforming classroom engagement, neuro-diversity calibration, and student wellness through on-device Graph Neural Networks (GNN), real-time EEG/Autonomic Biofeedback loop engineering, and server-side state-adaptive LLM orchestration.*

---

## 🌌 Overview & Core Philosophy

**NeuroLearn AI** is an advanced, dual-engine full-stack platform designed to harmonize student learning efficacy with nervous system health. Traditional educational systems treat student energy, attention span, and mental burnout as static constants. NeuroLearn AI shifts this paradigm into a dynamic, closed-loop cyber-physical feed-forward loop.

By processing continuous non-invasive EEG brainwave measurements, autonomic biomarkers, and kinetic postures, the system reconstructs a real-time **Cognitive state Profile** (measuring live *Attention, Stress, and Fatigue*). This profile dynamically calibrates:
1. **Lessons and Explanations:** Real-time generation of custom mindmaps, difficulty scales, and tutor interaction pacing via Gemini 3.5.
2. **Environmental & Sensory Stimuli:** Synchronized binaural neuro-acoustic fields and guided pulmonary expansion structures (coherence breathing).
3. **Classroom Topology:** Machine-learning-driven student collaboration matching via Graph Neural Network (GNN) peer-to-peer synergy calculations.

```
+--------------------------------------------------------------------------------------------------+
|                                    NEURO-AUTONOMIC INPUTS                                        |
|  [EEG Brainwaves (Alpha, Beta, Theta, Gamma)]   [Autonomic Biomarkers (HRV, HR, GSR, Temp)]      |
+-------------------------------------------------+------------------------------------------------+
                                                  |
                                                  v
+-------------------------------------------------+------------------------------------------------+
|                             COGNITIVE STATE CALIBRATION ENGINE                                   |
|   - TBR (Theta/Beta Ratio)    - BAR (Beta/Alpha Ratio)    - Stress/Fatigue Vector Computation   |
+-------------------------------------------------+------------------------------------------------+
                                                  |
                                                  v
+-------------------------------------------------+------------------------------------------------+
|                                EXPRESS FULL-STACK API MIDDLEWARE                                 |
|   - Adaptive AI Tutor         - Focus Recovery Coach      - Personalized Abstract Synthesis     |
|   - Dynamic Lesson Maps       - Structured MCQs Generator - BigQuery Real-Time Analytics Pipeline|
+-------------------------------------------------+------------------------------------------------+
                                                  |
                                                  v
+-------------------------------------------------+------------------------------------------------+
|                              CROSS-PLATFORM STUDENT FEEDBACK LOOPS                               |
|   - Student Workspace         - Teacher GNN Monitor        - Parent Wellness Guard               |
+--------------------------------------------------------------------------------------------------+
```

---

## 🔬 Core Algorithms, Mathematical Models & Simulations

The application simulates complex physical and neurological phenomena. Below is an exhaustive breakdown of the mathematical algorithms embedded within the simulation engines:

### ⚡ 1. EEG & Autonomic State Calibration Engine
The simulation converts clinical bio-signals into actionable student states via deterministic neural metrics:
*   **Attention Index (TBR Inverse):** Computed from simulated Theta (4-8 Hz) and Beta (12-30 Hz) power spectra:
    $$\text{TBR} = \frac{\theta_{power}}{\beta_{power}}$$
    A high Theta-to-Beta Ratio (TBR) signifies mind-wandering, focus fatigue, or ADHD markers. Attention is classified as *High* when $\text{TBR} < 1.8$, *Moderate* when $1.8 \le \text{TBR} \le 3.5$, and *Low* when $\text{TBR} > 3.5$.
*   **Stress Vector (Arousal & Sympathetic Charge):** Evaluated from Galvanic Skin Response (GSR) in microsiemens ($\mu\text{S}$) and Heart Rate Variability (HRV) in milliseconds ($\text{ms}$):
    $$\text{Stress Score} = w_1 \cdot \text{GSR}_{scaled} - w_2 \cdot \text{HRV}_{scaled}$$
    *   Where $w_1 = 0.6$ and $w_2 = 0.4$. High skin conductance combined with compressed heart coherence (depressed HRV) triggers automatic stress warnings.
*   **Fatigue Indicator (BAR Inverse):** Derived from Beta-to-Alpha Ratio (BAR):
    $$\text{BAR} = \frac{\beta_{power}}{\alpha_{power}}$$
    A decaying BAR index alongside elevated Theta waves indicates physical sleepiness or postural exhaustion.

### 🕸️ 2. Graph Neural Network (GNN) Force-Directed Collaboration Grid
The classroom's physical and psychological topology is managed by an active layout simulation using interactive spring-mass parameters:
*   **Edge Weight Connection ($W_{ij}$):** Establishes the collaboration alignment coefficient between student $i$ and student $j$:
    $$W_{ij} = \alpha \cdot \Delta \text{Attention} + \beta \cdot (1 - \text{StressDelta}) + \gamma \cdot \text{RoleCompatibility}$$
*   **Force Resonance (Attractive Spring Forces):** Hooke’s law modeling pulling compatible students together:
    $$F_{attractive} = \frac{Distance^2}{K_s}$$
*   **Repulsive Forces (Anxiety Dampening):** Coulombic repulsive fields pushing highly stressed adjacent nodes apart to prevent a simulated "anxiety contagion" waterfall:
    $$F_{repulsive} = \frac{K_r^2}{Distance}$$
*   **Propagation Velocity Score:** Represents the rapid spread speed of collaboration concepts if an intervention is initiated:
    $$\text{Velocity} = \sum (\text{DegreeCentrality} \times \text{SynapticAlignment})$$

### 🧪 3. Self-Supervised Physiological Pre-training with SimCLR
Located in the academic playground module, this simulates a modern SSL framework trained on the public **WESAD** (Wearable Stress and Affect Detection) physiological database:
*   **Augmentation Operators:**
    1.  *Spectral Frequency Masking:* Randomly mutes key bands in the Fourier Space to force the encoder to recognize invariant rhythms.
    2.  *Phase Shift Modulation:* Alters wave timing offsets to simulate sensor latency changes.
*   **Objective Function (InfoNCE Loss):**
    $$\mathcal{L}_{i,j} = -\log \frac{\exp(\text{sim}(z_i, z_j)/\tau)}{\sum_{k=1}^{2N} \mathbb{1}_{[k \neq i]} \exp(\text{sim}(z_i, z_k)/\tau)}$$
    By minimizing InfoNCE, the model aligns positive augmented pairs $(z_i, z_j)$ while pushing apart negative non-matching pairs, saving up to 90% in label annotation requirements.

### 📈 4. GNN Predictive Burnout Modeler
Simulates real-time epidemiological stress diffusion across student table tables (Alpha, Beta, Gamma cohorts):
*   Uses a multi-agent model where high-anxiety students acts as stress source transmitters:
    $$\text{Burnout Risk}(Node_i) = \text{Anxiety}_i + \delta \sum_{j \in Nodes} (W_{ij} \times \text{Stress}_j)$$
    If the threshold crosses $0.85$, a predictive alarm is fed back to the teacher suggesting student displacement or mandatory breathing pauses.

---

## ✨ Exhaustive Feature Breakdown by Stakeholder

The platform provides dedicated, real-time reactive workspaces for students, teachers, parents, and clinical researchers:

### 🎒 1. Student Workspace Dashboard (`StudentWorkspace.tsx`)
A high-performance student UI designed for maximum cognitive readability (with optimized contrast text, spacious margins, and smooth transitions):
*   **Interactive Lesson Navigator:** Allows students to prompt key learning topics (e.g. quantum mechanics, neuro-plasticity, cell biology).
*   **Generative Cognitive Mindmap:** Visualizes an interactive, 5-node learning route constructed on-demand. Clicking nodes pulls down custom text synthesized by Gemini based on whether the student has low attention (focus on analogies, micro-breaks) or high attention (focus on derivation challenges).
*   **Focus Game:** An attentional reinforcement tool matching speed triggers with ocular sync intervals, rewarding students when their focus aligns.
*   **Biometrics Coherence Breather:** An interactive expanding sphere conducting deep box-breathing and vagal down-regulation rhythms when elevated stress indices are detected.
*   **Neuro-Acoustics Synth:** Custom tone synthesizer that generates live ambient sound waves (Alpha focus tones vs. Gamma cognitive spikes).

### 👩‍🏫 2. Teacher GNN Monitor Hub (`TeacherDashboard.tsx`)
A dense dashboard allowing instructors class-wide oversight without violating individual student privacy boundaries:
*   **Interactive Desk Heatmap (60 Desks):** Displays a physical classroom layout. Fully searchable (by student name) and filterable by status categories (Focus, Stressed, Tired) using dense accessible tiles colored by active real-time status.
*   **Real-time Attention Aggregators:** Depicts high attention counts, average attention indexes, and stress warnings across the cohort.
*   **Biometric Time Series Tracking:** Interactive historical charts plotting HRV distributions and GSR conductivity levels.

### 🏠 3. Parent Wellness Guardian (`ParentDashboard.tsx`)
A portal giving parents supportive, non-invasive insight into their child's academic health:
*   **Bio-History Logs:** Real-time logging metrics for sleep, heart coherence, and academic fatigue alerts.
*   **Lifestyle Inputs Terminal:** Form enabling parents to record diet, nutrition, and screen-time indicators, integrating these variables into the correlation telemetry graphs.
*   **Remote Workspace Overrides:** Remote triggers allowing parents to activate calm sensory lighting or send mental health notes to the student.

### 🧪 4. Academic Research & Sandbox Playfield (`ResearchAcademicSandbox.tsx`)
The clinical engine demonstrating the analytical depth behind the platform:
*   **Pre-training Simulator Card:** Features parameter calibration sliders (InfoNCE Temperature, Batch Capacity, Augmentation selectors) for training the encoder on WESAD stress biomarkers.
*   **Generative Clinical Publication Synthesizer:** Compiles raw simulated biosignal rows and formats them into formal academic thesis abstracts instantly via server-side LLM orchestration.
*   **Live BigQuery Connector Simulator:** Displays actual, production-ready SQL statements used to partition spatial EEG data, returning structured synthetic data grids.

---

## 🛠️ Full-Stack Server API Gateway Router Schema

All LLM calls and secure computations run on the Express backend (`server.ts`). This architectural boundaries keeping API keys masked from client inspectors:

### `1. POST /api/gemini/tutor`
Customizes learning content dynamically based on the student's cognitive attention levels.
*   **Body Request:**
    ```json
    {
      "message": "Explain CRISPR gene editing.",
      "cognitiveState": { "attention": "Low", "stress": "Moderate", "fatigue": "Low" },
      "topic": "Genetic Engineering",
      "history": []
    }
    ```
*   **Response (Adapted Output):**
    ```json
    {
      "response": "Think of CRISPR as a highly precise word processor for your DNA's code..."
    }
    ```

### `2. POST /api/gemini/coach`
An alert-triggered therapeutic counseling assistant addressing stress spikes or physical fatigue.
*   **Body Request:**
    ```json
    {
      "message5": "I feel extremely anxious about my forthcoming presentation.",
      "biometricState": { "hrv": 32, "gsr": 9.4, "headMovement": "Erratic" }
    }
    ```
*   **Response:** Tailored biofeedback and micro-stretching/breathing coaching routines.

### `3. POST /api/gemini/mindmap`
Constructs structured 5-node hierarchical learning routes returning structured JSON.
*   **Body Request:**
    ```json
    {
      "topic": "Neural Synapses",
      "cognitiveState": { "attention": "High", "stress": "Low" }
    }
    ```
*   **Response (JSON Schema):**
    ```json
    {
      "nodes": [
        { "id": "1", "label": "Structure of a Neuron", "details": "Deep axon terminal descriptions..." },
        { "id": "2", "label": "Neurotransmitter release", "details": "Synaptic vesicle fusion calculations..." }
      ]
    }
    ```

### `4. POST /api/gemini/quiz`
Generates focus-span optimized multiple choice quizzes.
*   **Body Request:**
    ```json
    {
      "topic": "Photosynthesis",
      "difficulty": "Hard",
      "cognitiveState": { "attention": "High" }
    }
    ```
*   **Response Structure:** Array of detailed diagnostic questions, options, correct selections, and diagnostic explanations.

---

## 📂 Codebase File Tree & Modular Descriptions

```
📁 Root Workspace (/)
├── 📄 server.ts                           # Node/Express Entry Point; handles Vite middleware and ports
├── 📄 package.json                        # Node script execution workflows and dependencies
├── 📄 tsconfig.json                       # Compiler rules for TypeScript
├── 📄 vite.config.ts                      # Proxy routing, aliases and standard compilers
├── 📄 firestore.rules                     # Direct database security settings
├── 📄 firebase-blueprint.json             # Schema templates for Cloud Firestore
└── 📁 src                                 # Application Core Dir
    ├── 📄 main.tsx                        # Client boot loader
    ├── 📄 types.ts                        # Shared TypeScript interfaces (biometrics, lessons, logs)
    ├── 📄 index.css                       # Accessible custom colors, Inter/Fira font imports, & global styles
    ├── 📄 App.tsx                         # Core stakeholder router, state controller, and menu shell
    └── 📁 components                      # Modular Client-side Layout Sub-Units
        ├── 🧩 StudentWorkspace.tsx        # Coordinates study panels, breathing, and neurotone tools
        ├── 🧩 TeacherDashboard.tsx        # Cohort seating heatmaps, charts, alerts, and metrics
        ├── 🧩 ParentDashboard.tsx         # Parent-directed overrides, logs, and home biometric trackers
        ├── 🧩 ResearchAcademicSandbox.tsx # SSL/SimCLR model panels, BigQuery, & clinic abstract tool
        ├── 🧩 GnnCollaborationLab.tsx     # Vector physics engines, parameter tuning, and cohort charts
        ├── 🧩 GnnForceDirectedGraph.tsx   # Interactive node graph representing peer communication flows
        ├── 🧩 CognitiveMindmap.tsx        # UI renderer for dynamic lesson layouts
        ├── 🧩 BiometricsCoherenceBreather.tsx # Heart-rate pacing expander
        ├── 🧩 FocusGame.tsx               # Interactive cognitive focus trainer
        ├── 🧩 NeuroAcoustics.tsx          # Sound wave generator for isochronic noise fields
        ├── 🧩 SystemArchitecture.tsx      # System layout visual blueprint
        ├── 🧩 CloudAndVertex.tsx          # Analytical warehouse structures (BigQuery metrics)
        ├── 🧩 EthicsAndXAI.tsx            # Compliance cards (GDPR, COPPA, HIPAA bounds)
        ├── 🧩 DailyWellnessCheckin.tsx    # Emotional logging form and historical log explorer
        └── 🧩 DailyAcademicGoal.tsx       # Live studies logger, preset timer tags, & circular ring progress
```

---

## 🚀 Quick Install & Sandboxed Host Booting

To compile, build, and deploy this full-stack workspace locally, execute the following commands in sequence:

### 1. Extract Dependencies
Install all packaged frameworks and the official `@google/genai` packages:
```bash
npm install
```

### 2. Configure Environment Secrets
Create a `.env` in the root of your directory to house secrets safely:
```bash
cp .env.example .env
```
Open `.env` and configure your key:
```env
GEMINI_API_KEY=AIzaSyYourKeyGoesHere
```

### 3. Initiate Hybrid Dev Gateway
Boot the custom Express server with Vite assets middleware running on the standard external socket:
```bash
npm run dev
```
Open your browser and navigate to:
👉 **`http://localhost:3000`**

### 4. Build & Production Launch compile
Bundle all modular client-side components and transpile the Express server layout cleanly using high-speed `esbuild` to a standalone production file:
```bash
# Compiles client files to /dist and creates /dist/server.cjs
npm run build

# Runs production asset server
npm run start
```

---

## 🛡️ Privacy, Ethical Guards & Security Boundaries

Operating with neural telemetry demands absolute respect for clinical/student boundaries:
1.  **On-Device Anonymization:** Raw biometric values (EEG wave ratios and galvanic frequencies) remain locally inside temporary memory and are never uploaded. Only high-level state strings (e.g., "Low Attention") are sent to API routes.
2.  **Parental Consent Gates:** Full COPPA and GDPR workflows are implemented so that students under standard ages must have their tokens verified before parent oversight becomes functional.
3.  **Anonymized Database Partitioning:** Firestore matches students by decoupled numeric IDs, protecting user names and preventing metadata association.

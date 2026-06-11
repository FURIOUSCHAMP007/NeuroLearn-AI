import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BookMarked, Clock, CheckCircle2, RotateCcw, Plus, Sparkles, Award } from 'lucide-react';

export default function DailyAcademicGoal() {
  const [topic, setTopic] = useState(() => {
    return localStorage.getItem('academic_goal_topic') || 'Neuro-Plasticity & Learning';
  });
  const [estimatedTime, setEstimatedTime] = useState(() => {
    const saved = localStorage.getItem('academic_goal_est');
    return saved ? parseInt(saved, 10) : 45;
  });
  const [studiedTime, setStudiedTime] = useState(() => {
    const saved = localStorage.getItem('academic_goal_studied');
    return saved ? parseInt(saved, 10) : 15;
  });

  // Keep localStorage updated
  useEffect(() => {
    localStorage.setItem('academic_goal_topic', topic);
  }, [topic]);

  useEffect(() => {
    localStorage.setItem('academic_goal_est', estimatedTime.toString());
  }, [estimatedTime]);

  useEffect(() => {
    localStorage.setItem('academic_goal_studied', studiedTime.toString());
  }, [studiedTime]);

  // Calculations for progress ring
  const percentage = estimatedTime > 0 ? Math.min(100, Math.round((studiedTime / estimatedTime) * 100)) : 0;
  
  // Radial ring parameters
  const radius = 50;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const handleIncrement = (amount: number) => {
    setStudiedTime(prev => Math.min(estimatedTime, Math.max(0, prev + amount)));
  };

  const handleReset = () => {
    setStudiedTime(0);
  };

  const setEstPreset = (mins: number) => {
    setEstimatedTime(mins);
    if (studiedTime > mins) {
      setStudiedTime(mins);
    }
  };

  // Dynamic feedback copy based on study progress level
  let motivationText = "Time to lock in! Setup your goal above.";
  let statusColor = "text-indigo-400";
  if (percentage === 0) {
    motivationText = "Set study goals & click +5m/+15m to track!";
    statusColor = "text-slate-400";
  } else if (percentage < 40) {
    motivationText = "Getting started is the hardest part. You’ve got this!";
    statusColor = "text-sky-400";
  } else if (percentage < 75) {
    motivationText = "Superb focus! You are in the optimal cognitive flow zone.";
    statusColor = "text-emerald-400";
  } else if (percentage < 100) {
    motivationText = "Almost there! One final push to complete your module goal.";
    statusColor = "text-indigo-400";
  } else {
    motivationText = "Fantastic work! Daily Academic Goal successfully achieved! 🎯";
    statusColor = "text-amber-400";
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-2xl relative overflow-hidden" id="daily_academic_goal_component">
      {/* Decorative glow background */}
      <div className="absolute top-0 right-0 -mr-12 -mt-12 h-32 w-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
      
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <BookMarked className="h-5 w-5 text-indigo-400" />
          <div>
            <h3 className="font-bold text-slate-100 text-sm">Daily Academic Goal</h3>
            <p className="text-[10px] text-slate-400">Log physical progress against target topic timelines</p>
          </div>
        </div>
        {percentage >= 100 && (
          <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-amber-400 bg-amber-950/40 border border-amber-900 px-2 py-0.5 rounded animate-pulse">
            <Award className="h-3 w-3" /> Goal Cleared
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
        {/* LEFT COLUMN: Inputs & Presets (Span 7) */}
        <div className="md:col-span-7 space-y-3.5 pr-0 md:pr-2">
          {/* Study Topic Input */}
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Current Focus Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Brain plasticity, Fourier Transforms..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 focus:outline-none px-3 py-2 rounded-lg text-xs text-slate-100 placeholder-slate-600 transition-colors"
            />
          </div>

          {/* Duration Config with Presets */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Target Study Duration
              </label>
              <span className="text-[11px] font-mono text-indigo-400 font-bold">{estimatedTime} minutes</span>
            </div>
            
            {/* Custom Range Slider */}
            <input
              type="range"
              min="10"
              max="180"
              step="5"
              value={estimatedTime}
              onChange={(e) => setEstPreset(parseInt(e.target.value, 10))}
              className="w-full h-1 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-indigo-500 my-2"
            />

            {/* Quick preset buttons */}
            <div className="flex space-x-1 mt-1 justify-between">
              {[15, 30, 45, 60, 90, 120].map((mins) => (
                <button
                  key={mins}
                  type="button"
                  onClick={() => setEstPreset(mins)}
                  className={`text-[9px] font-bold px-2 py-1 rounded transition-colors border cursor-pointer ${
                    estimatedTime === mins
                      ? 'bg-indigo-950 border-indigo-700 text-indigo-400'
                      : 'bg-slate-950 border-slate-850 text-slate-500 hover:text-slate-350 hover:border-slate-700'
                  }`}
                >
                  {mins}m
                </button>
              ))}
            </div>
          </div>

          {/* Time Logging triggers */}
          <div className="space-y-1.5 pt-1">
            <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Log Active Study Sessions
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleIncrement(5)}
                disabled={studiedTime >= estimatedTime}
                className="flex items-center gap-1 bg-slate-950 border border-slate-800 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold hover:border-indigo-600 hover:bg-slate-900 disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors"
              >
                <Plus className="h-3 w-3 text-indigo-400" />
                <span>+5 Mins</span>
              </button>
              <button
                type="button"
                onClick={() => handleIncrement(15)}
                disabled={studiedTime >= estimatedTime}
                className="flex items-center gap-1 bg-slate-950 border border-slate-800 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold hover:border-indigo-600 hover:bg-slate-900 disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors"
              >
                <Plus className="h-3.5 w-3.5 text-indigo-400" />
                <span>+15 Mins</span>
              </button>
              <button
                type="button"
                onClick={() => setStudiedTime(estimatedTime)}
                disabled={studiedTime >= estimatedTime}
                className="flex items-center gap-1 bg-indigo-600 hover:bg-indigo-500 text-slate-100 px-3 py-1.5 rounded-lg text-xs font-bold disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors"
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Mark Complete</span>
              </button>
              <button
                type="button"
                onClick={handleReset}
                title="Reset log progress"
                className="flex items-center justify-center border border-slate-850 hover:bg-slate-800 text-slate-400 hover:text-slate-200 p-1.5 rounded-lg text-xs cursor-pointer transition-all"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Circle Progress Ring Panel (Span 5) */}
        <div className="md:col-span-5 flex flex-col items-center justify-center py-2 relative">
          <div className="relative flex items-center justify-center">
            {/* SVG Progress Ring */}
            <svg width="130" height="130" className="transform -rotate-90">
              {/* Outer track rim */}
              <circle
                cx="65"
                cy="65"
                r={radius}
                stroke="#0f172a"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              {/* Underlay glow ring */}
              <circle
                cx="65"
                cy="65"
                r={radius}
                stroke={percentage >= 100 ? '#f59e0b' : '#6366f1'}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                style={{ filter: `blur(2px)`, opacity: 0.2 }}
                className="transition-all duration-500 ease-out"
              />
              {/* Dynamic Filled circular meter arc */}
              <motion.circle
                cx="65"
                cy="65"
                r={radius}
                stroke={percentage >= 100 ? '#f59e0b' : '#6366f1'}
                strokeWidth={strokeWidth}
                strokeDasharray={circumference}
                animate={{ strokeDashoffset: strokeDashoffset }}
                transition={{ type: 'spring', stiffness: 60, damping: 15 }}
                strokeLinecap="round"
                fill="transparent"
              />
            </svg>

            {/* Central Progress Statistics */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Studied</span>
              <span className="text-xl font-bold text-slate-100 leading-none">
                {studiedTime}
              </span>
              <span className="text-[9px] text-slate-400 font-mono mt-0.5">
                / {estimatedTime}m
              </span>
            </div>
          </div>

          <div className="mt-3 text-center">
            <span className={`text-[10px] uppercase tracking-wider font-extrabold ${statusColor} flex items-center justify-center gap-1`}>
              <Sparkles className="h-3 w-3 animate-pulse" />
              <span>{percentage}% Completed</span>
            </span>
          </div>
        </div>
      </div>

      {/* Dynamic Feedback Zone */}
      <div className="mt-4 bg-slate-950/70 p-3 rounded-lg border border-slate-800/60 flex items-center gap-2 text-xs">
        <Clock className="h-4 w-4 text-slate-500 shrink-0" />
        <span className="text-slate-350 leading-relaxed italic">{motivationText}</span>
      </div>
    </div>
  );
}

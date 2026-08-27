'use client';

import React, { useState } from 'react';
import { Sparkles, Brain, Code2, CheckCircle2, RefreshCw, Send, SlidersHorizontal, Cpu, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { parseNaturalLanguageInput, ParsedNluResult } from '@/lib/nlp/indicNluEngine';

const SAMPLE_PROMPTS = [
  {
    label: '⚙️ Peenya CNC (English)',
    text: 'Need 500 pcs Haas CNC precision spur gears from Peenya hub under 6.5 lakhs within 14 days'
  },
  {
    label: '🧶 Mysuru Silk (Kannada)',
    text: 'ನನಗೆ ಮೈಸೂರಿನಿಂದ 200 GSM organic pure mulberry raw silk blend ಬೇಕು, 1000 meters minimum order, Silk Mark certified.'
  },
  {
    label: '🔧 Belagavi Valve (Kanglish)',
    text: 'Belagavi foundry cluster ninda 15,000 hydraulic ductile iron valves beku under 12 lakhs with e-way bill'
  },
  {
    label: '📦 Davangere Cotton (Kannada)',
    text: 'ದಾವಣಗೆರೆ ನೂಲಿನ ಗಿರಣಿಗಳಿಂದ 500 ಬೇಲ್ಸ್ ಸಾವಯವ ಹತ್ತಿ ನೂಲು ತಕ್ಷಣವೇ ಬೇಕಾಗಿದೆ.'
  }
];

export function IndicNluStudio() {
  const [inputText, setInputText] = useState(SAMPLE_PROMPTS[0].text);
  const [isProcessing, setIsProcessing] = useState(false);
  const [nluResult, setNluResult] = useState<ParsedNluResult>(() =>
    parseNaturalLanguageInput(SAMPLE_PROMPTS[0].text)
  );

  const handleParse = (textToParse?: string) => {
    const target = textToParse || inputText;
    if (!target.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      const result = parseNaturalLanguageInput(target);
      setNluResult(result);
      setIsProcessing(false);
    }, 250);
  };

  return (
    <div className="relative w-full rounded-3xl bg-slate-950 border-2 border-amber-500/30 p-6 shadow-2xl space-y-6 text-white font-mono">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-amber-400 animate-pulse" />
            <h3 className="font-black text-base text-amber-300">Live Vernacular NLP / NLU Model Studio</h3>
            <Badge variant="gold" size="xs">Bhashini NLU Core</Badge>
          </div>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Real-time Natural Language Parsing for Kannada (ಕನ್ನಡ), English, and Code-Switched Kanglish.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="green" size="xs">Confidence: {(nluResult.confidenceScore * 100).toFixed(1)}%</Badge>
        </div>
      </div>

      {/* Preset Prompts Selector */}
      <div className="space-y-2">
        <label className="text-[11px] font-bold text-slate-400 uppercase">Try Sample Natural Language Queries:</label>
        <div className="flex flex-wrap items-center gap-2">
          {SAMPLE_PROMPTS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setInputText(p.text);
                handleParse(p.text);
              }}
              className="px-3 py-1.5 rounded-xl border border-slate-800 bg-slate-900 hover:border-amber-400 hover:text-white text-slate-300 text-xs font-bold transition-all cursor-pointer"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="space-y-3">
        <div className="relative">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={3}
            placeholder="Type or speak natural language query in Kannada, English, or Kanglish..."
            className="w-full rounded-2xl bg-slate-900 border border-slate-800 p-4 text-xs font-sans text-white focus:outline-none focus:border-amber-400 transition-all resize-none"
          />
          <button
            onClick={() => handleParse()}
            disabled={isProcessing}
            className="absolute bottom-3 right-3 px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 via-amber-500 to-yellow-400 hover:from-rose-700 text-white font-extrabold text-xs shadow-lg flex items-center gap-2 border-0 cursor-pointer"
          >
            {isProcessing ? (
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Send className="w-3.5 h-3.5" />
            )}
            <span>Parse NLP Entities</span>
          </button>
        </div>
      </div>

      {/* Extracted NLU Entities Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
        {/* Language Detection */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase">Detected Language</div>
          <div className="text-sm font-extrabold text-amber-300">
            {nluResult.detectedLanguage === 'kn-IN' && 'ಕನ್ನಡ (Kannada)'}
            {nluResult.detectedLanguage === 'en-IN' && 'English (India)'}
            {nluResult.detectedLanguage === 'kn-en-mixed' && 'Kanglish (Code-Switched)'}
          </div>
        </div>

        {/* Classified Intent */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase">Classified NLU Intent</div>
          <div className="text-sm font-extrabold text-emerald-400">
            {nluResult.intent}
          </div>
        </div>

        {/* Extracted Commodity Category */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase">Product Category Entity</div>
          <div className="text-xs font-bold text-white">
            {nluResult.entities.category}
          </div>
        </div>

        {/* Location District */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase">Target District Hub</div>
          <div className="text-xs font-bold text-amber-300">
            {nluResult.entities.district}
          </div>
        </div>

        {/* Extracted Budget */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase">Extracted Target Budget</div>
          <div className="text-sm font-extrabold text-rose-400">
            {nluResult.entities.budget}
          </div>
        </div>

        {/* Quantity & Lead Time */}
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
          <div className="text-[10px] font-bold text-slate-400 uppercase">Quantity &amp; Timeline</div>
          <div className="text-xs font-bold text-slate-200">
            {nluResult.entities.quantity} • {nluResult.entities.timeline}
          </div>
        </div>
      </div>

      {/* Technical Specs */}
      <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
        <div className="text-[10px] font-bold text-slate-400 uppercase">Extracted Engineering Specifications:</div>
        <div className="flex flex-wrap gap-2">
          {nluResult.entities.specs.map((spec, idx) => (
            <span key={idx} className="px-3 py-1 rounded-lg bg-black border border-slate-800 text-[11px] font-sans text-amber-200 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{spec}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

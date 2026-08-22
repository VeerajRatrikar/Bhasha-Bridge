// Voice Engine & Vernacular NLU Parser for Bhasha-Bridge
// Bhashini API (primary) with Web Speech API fallback for ASR/TTS

import { ExtractedEntities, LanguageCode } from '../types';
import {
  ASRResult,
  bhashiniASR,
  bhashiniTTS,
  fetchBhashiniStatus,
  playBase64Audio,
  recordAudioBlob,
  SpeechProvider,
} from './bhashini';

function hashTranscript(text: string): number {
  let hash = 0;
  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 31 + text.charCodeAt(index)) % 1000003;
  }
  return hash;
}

export interface NLUAnalysisResult {
  transcript: string;
  detectedLanguage: LanguageCode;
  intent: string;
  confidence: number;
  entities: ExtractedEntities;
  structuredQuery: {
    search_term: string;
    filters: Record<string, unknown>;
  };
  audioDurationSec: number;
  speechProvider?: SpeechProvider;
}

let cachedBhashiniConfigured: boolean | null = null;

export async function isBhashiniAvailable(): Promise<boolean> {
  if (cachedBhashiniConfigured !== null) return cachedBhashiniConfigured;
  const status = await fetchBhashiniStatus();
  cachedBhashiniConfigured = status.configured;
  return status.configured;
}

export function detectLanguageFromText(transcriptText: string): LanguageCode {
  const lower = transcriptText.toLowerCase();
  const kannadaWords = [
    'nange',
    'beku',
    'yaaru',
    'madoke',
    'ಇದೆ',
    'ಬೇಕು',
    'ಬೊಮ್ಮಸಂದ್ರದಲ್ಲಿ',
    'ಪೀಸ್',
    'ಡೆಲಿವರಿ',
    'ನಮಗೆ',
    'ತುರ್ತು',
  ];
  const hasKannada = kannadaWords.some((w) => transcriptText.includes(w) || lower.includes(w));
  const hasEnglish = /[a-z]/i.test(transcriptText);

  if (hasKannada && hasEnglish) return 'kn-en';
  if (hasKannada) return 'kn-IN';
  return 'en-IN';
}

// Rule-based Vernacular NLU Parser simulating Transformer/spaCy NLU pipeline
export function parseVernacularNLU(
  transcriptText: string,
  confidenceOverride?: number,
  provider?: SpeechProvider
): NLUAnalysisResult {
  const lower = transcriptText.toLowerCase();
  const transcriptHash = hashTranscript(transcriptText);
  const detectedLanguage = detectLanguageFromText(transcriptText);

  let intent = 'DISCOVER_SUPPLIER';
  if (
    lower.includes('price') ||
    lower.includes('cost') ||
    lower.includes('rupees') ||
    lower.includes(' rate ')
  ) {
    intent = 'CHECK_PRICE_AND_DISCOVER';
  } else if (lower.includes('compare') || lower.includes('versus') || lower.includes('vs')) {
    intent = 'COMPARE_SUPPLIERS';
  }

  const entities: ExtractedEntities = { raw_vernacular_terms: [] };

  const qtyMatch = lower.match(/(\d+)\s*(kg|pieces|pc|boxes|meters|coils)?/i);
  if (qtyMatch) {
    entities.quantity = parseInt(qtyMatch[1], 10);
    if (qtyMatch[2]) entities.unit = qtyMatch[2];
  }

  const locations = [
    'mandya',
    'peenya',
    'bommasandra',
    'tumakuru',
    'rajajinagar',
    'coimbatore',
    'bengaluru',
  ];
  for (const loc of locations) {
    if (lower.includes(loc)) {
      entities.location = loc.charAt(0).toUpperCase() + loc.slice(1);
      break;
    }
  }

  if (lower.includes('silk') || lower.includes('yarn') || lower.includes('zari')) {
    entities.product = 'Mulberry Silk Yarn';
    entities.category = 'Textiles & Silk Fabrics';
  } else if (
    lower.includes('bolt') ||
    lower.includes('fastener') ||
    lower.includes('screw') ||
    lower.includes('ss 304')
  ) {
    entities.product = 'SS 304 Hex Bolts';
    entities.category = 'Industrial Fasteners & Hardware';
  } else if (lower.includes('box') || lower.includes('corrugated') || lower.includes('packaging')) {
    entities.product = '5-Ply Corrugated Box';
    entities.category = 'Corrugated Packaging & Containers';
  } else if (lower.includes('cable') || lower.includes('copper') || lower.includes('wire')) {
    entities.product = 'Armoured Copper Cable';
    entities.category = 'Electrical & Automation Components';
  } else {
    entities.product = transcriptText.split(' ').slice(0, 3).join(' ');
    entities.category = 'General Industrial Procurement';
  }

  const priceMatch = lower.match(/(under|below|max|less than)\s*(\d+)/i);
  if (priceMatch) entities.max_price = parseInt(priceMatch[2], 10);

  if (lower.includes('standard') || lower.includes('grade a')) {
    entities.quality_grade = 'Standard Grade A';
  }
  if (lower.includes('grade 304') || lower.includes('ss304')) {
    entities.quality_grade = 'Grade 304 Stainless Steel';
  }

  if (
    lower.includes('urgent') ||
    lower.includes('fast') ||
    lower.includes('ತುರ್ತು') ||
    lower.includes('immediate')
  ) {
    entities.urgency = 'HIGH_URGENT';
  } else {
    entities.urgency = 'NORMAL';
  }

  const kannadaWords = [
    'nange',
    'beku',
    'yaaru',
    'madoke',
    'ಇದೆ',
    'ಬೇಕು',
    'ನಮಗೆ',
    'ತುರ್ತು',
  ];
  kannadaWords.forEach((w) => {
    if (transcriptText.includes(w)) entities.raw_vernacular_terms?.push(w);
  });

  const confidence =
    confidenceOverride ?? Math.min(0.99, Math.max(0.88, 0.88 + (transcriptHash % 12) / 100));

  return {
    transcript: transcriptText,
    detectedLanguage,
    intent,
    confidence,
    entities,
    structuredQuery: {
      search_term: entities.product || transcriptText,
      filters: {
        location: entities.location,
        category: entities.category,
        max_price: entities.max_price,
      },
    },
    audioDurationSec: Math.round((3.2 + (transcriptHash % 16) / 10) * 10) / 10,
    speechProvider: provider,
  };
}

function getWebSpeechRecognition(): any {
  if (typeof window === 'undefined') return null;
  const w = window as any;
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export function recognizeWithWebSpeech(language: LanguageCode): Promise<ASRResult> {
  return new Promise((resolve, reject) => {
    const SpeechRecognitionCtor = getWebSpeechRecognition();
    if (!SpeechRecognitionCtor) {
      reject(new Error('Web Speech API not supported'));
      return;
    }

    const recognition = new SpeechRecognitionCtor();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang =
      language === 'kn-IN' ? 'kn-IN' : language === 'kn-en' ? 'kn-IN' : 'en-IN';

    recognition.onresult = (event: any) => {
      const transcript = event.results[0]?.[0]?.transcript ?? '';
      const confidence = event.results[0]?.[0]?.confidence ?? 0.9;
      resolve({ transcript, confidence, provider: 'web-speech' });
    };

    recognition.onerror = (event: any) => {
      reject(new Error(event.error));
    };

    recognition.start();
  });
}

export async function captureAndTranscribe(
  language: LanguageCode,
  durationMs = 4500
): Promise<ASRResult> {
  const bhashiniReady = await isBhashiniAvailable();

  if (bhashiniReady) {
    try {
      const { base64, format } = await recordAudioBlob(durationMs);
      const result = await bhashiniASR(base64, language, format, 16000);
      if (result?.transcript?.trim()) return result;
    } catch {
      // Fall through to Web Speech API
    }
  }

  return recognizeWithWebSpeech(language);
}

export function speakWithWebSpeech(text: string, lang: string = 'en-IN', onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    onEnd?.();
    return;
  }

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = 0.95;
  utterance.pitch = 1.0;
  utterance.lang = lang === 'kn-IN' || lang === 'kn-en' ? 'kn-IN' : 'en-IN';

  const voices = window.speechSynthesis.getVoices();
  const selectedVoice =
    voices.find((v) => v.lang.includes('kn') || v.lang.includes('hi') || v.lang.includes('en-IN')) ??
    voices[0];
  if (selectedVoice) utterance.voice = selectedVoice;

  if (onEnd) utterance.onend = onEnd;
  utterance.onerror = () => onEnd?.();

  window.speechSynthesis.speak(utterance);
}

// Speak AI Response — Bhashini TTS primary, Web Speech API fallback
export async function speakText(
  text: string,
  lang: LanguageCode | string = 'en-IN',
  onEnd?: () => void
) {
  const language = (lang as LanguageCode) || 'en-IN';
  const bhashiniReady = await isBhashiniAvailable();

  if (bhashiniReady) {
    try {
      const audioBase64 = await bhashiniTTS(text, language);
      if (audioBase64) {
        await playBase64Audio(audioBase64, 'wav');
        onEnd?.();
        return;
      }
    } catch {
      // Fall through to Web Speech API
    }
  }

  speakWithWebSpeech(text, language, onEnd);
}

export async function processVoiceInput(
  transcriptOrCapture: string | 'capture',
  language: LanguageCode = 'kn-en'
): Promise<NLUAnalysisResult> {
  if (transcriptOrCapture !== 'capture') {
    return parseVernacularNLU(transcriptOrCapture);
  }

  const asr = await captureAndTranscribe(language);
  return parseVernacularNLU(asr.transcript, asr.confidence, asr.provider);
}

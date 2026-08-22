// Client-side Bhashini API wrapper (proxied through Next.js API routes)

import { LanguageCode } from '../types';

export type SpeechProvider = 'bhashini' | 'web-speech';

export interface BhashiniStatus {
  configured: boolean;
  provider: string;
  supportedLanguages: string[];
  features: string[];
}

export interface ASRResult {
  transcript: string;
  confidence: number;
  provider: SpeechProvider;
}

export function toBhashiniLang(code: LanguageCode): string {
  if (code === 'kn-IN' || code === 'kn-en') return 'kn';
  return 'en';
}

export async function fetchBhashiniStatus(): Promise<BhashiniStatus> {
  try {
    const res = await fetch('/api/bhashini/status');
    if (!res.ok) throw new Error('Status check failed');
    return res.json();
  } catch {
    return {
      configured: false,
      provider: 'Web Speech API (fallback)',
      supportedLanguages: ['kn-IN', 'en-IN', 'kn-en'],
      features: ['asr', 'tts'],
    };
  }
}

export async function bhashiniASR(
  audioBase64: string,
  language: LanguageCode,
  audioFormat = 'wav',
  samplingRate = 16000
): Promise<ASRResult | null> {
  try {
    const res = await fetch('/api/bhashini/asr', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        audioBase64,
        language: toBhashiniLang(language),
        audioFormat,
        samplingRate,
      }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    return {
      transcript: data.transcript,
      confidence: data.confidence,
      provider: 'bhashini',
    };
  } catch {
    return null;
  }
}

export async function bhashiniTranslate(
  text: string,
  sourceLanguage: LanguageCode,
  targetLanguage: LanguageCode = 'en-IN'
): Promise<string | null> {
  try {
    const res = await fetch('/api/bhashini/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        sourceLanguage: toBhashiniLang(sourceLanguage),
        targetLanguage: toBhashiniLang(targetLanguage),
      }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.translated;
  } catch {
    return null;
  }
}

export async function bhashiniTTS(text: string, language: LanguageCode): Promise<string | null> {
  try {
    const res = await fetch('/api/bhashini/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        language: toBhashiniLang(language),
        gender: 'female',
      }),
    });

    if (!res.ok) return null;
    const data = await res.json();
    return data.audioBase64;
  } catch {
    return null;
  }
}

export function playBase64Audio(base64: string, format = 'wav'): Promise<void> {
  return new Promise((resolve, reject) => {
    const audio = new Audio(`data:audio/${format};base64,${base64}`);
    audio.onended = () => resolve();
    audio.onerror = () => reject(new Error('Audio playback failed'));
    audio.play().catch(reject);
  });
}

export async function recordAudioBlob(durationMs = 4000): Promise<{ base64: string; format: string }> {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  const mimeType = MediaRecorder.isTypeSupported('audio/webm') ? 'audio/webm' : 'audio/mp4';
  const recorder = new MediaRecorder(stream, { mimeType });
  const chunks: Blob[] = [];

  return new Promise((resolve, reject) => {
    recorder.ondataavailable = (event) => {
      if (event.data.size > 0) chunks.push(event.data);
    };

    recorder.onstop = async () => {
      stream.getTracks().forEach((track) => track.stop());
      const blob = new Blob(chunks, { type: mimeType });
      const buffer = await blob.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
      const format = mimeType.includes('webm') ? 'webm' : 'mp4';
      resolve({ base64, format });
    };

    recorder.onerror = () => {
      stream.getTracks().forEach((track) => track.stop());
      reject(new Error('Recording failed'));
    };

    recorder.start();
    setTimeout(() => {
      if (recorder.state === 'recording') recorder.stop();
    }, durationMs);
  });
}

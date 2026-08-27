import { NextRequest, NextResponse } from 'next/server';
import { isBhashiniConfigured, runBhashiniTTS, toBhashiniLanguageCode } from '../../../../lib/bhashiniServer';

export async function GET() {
  return NextResponse.json({
    status: 'ONLINE',
    service: 'Digital India Bhashini Text-to-Speech (TTS) Gateway',
    supportedLanguages: ['kn-IN', 'en-IN', 'hi-IN']
  });
}

export async function POST(request: NextRequest) {
  try {
    let body: any = {};
    try {
      body = await request.json();
    } catch {
      body = {};
    }

    const { text, language = 'en', gender = 'female' } = body;
    const sourceLanguage = toBhashiniLanguageCode(language);

    if (isBhashiniConfigured() && text?.trim()) {
      const audioBase64 = await runBhashiniTTS(text, sourceLanguage, gender);
      return NextResponse.json({
        audioBase64,
        audioFormat: 'wav',
        provider: 'bhashini',
        sourceLanguage,
      });
    }

    return NextResponse.json({
      audioBase64: '',
      audioFormat: 'wav',
      provider: 'bhashini_simulated',
      sourceLanguage,
    });
  } catch (error: any) {
    return NextResponse.json({
      audioBase64: '',
      audioFormat: 'wav',
      provider: 'bhashini_simulated',
      sourceLanguage: 'en',
    });
  }
}

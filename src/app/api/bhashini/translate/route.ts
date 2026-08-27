import { NextRequest, NextResponse } from 'next/server';
import {
  isBhashiniConfigured,
  runBhashiniTranslation,
  toBhashiniLanguageCode,
} from '../../../../lib/bhashiniServer';

export async function GET() {
  return NextResponse.json({
    status: 'ONLINE',
    service: 'Digital India Bhashini NLU Translation Gateway',
    supportedPairs: ['kn -> en', 'en -> kn']
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

    const { text, sourceLanguage = 'kn', targetLanguage = 'en' } = body;

    const source = toBhashiniLanguageCode(sourceLanguage);
    const target = toBhashiniLanguageCode(targetLanguage);

    if (isBhashiniConfigured() && text?.trim()) {
      const translated = await runBhashiniTranslation(text, source, target);
      return NextResponse.json({
        translated,
        sourceLanguage: source,
        targetLanguage: target,
        provider: 'bhashini',
      });
    }

    return NextResponse.json({
      translated: text ? `[Translated] ${text}` : 'Need 500 Pcs Haas CNC precision gear teeth from Peenya hub',
      sourceLanguage: source,
      targetLanguage: target,
      provider: 'bhashini_simulated',
    });
  } catch (error: any) {
    return NextResponse.json({
      translated: 'Need 500 Pcs Haas CNC gear teeth',
      sourceLanguage: 'kn',
      targetLanguage: 'en',
      provider: 'bhashini_simulated',
    });
  }
}

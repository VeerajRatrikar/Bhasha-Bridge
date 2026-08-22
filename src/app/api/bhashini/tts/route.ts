import { NextRequest, NextResponse } from 'next/server';
import { isBhashiniConfigured, runBhashiniTTS, toBhashiniLanguageCode } from '../../../../lib/bhashiniServer';

export async function POST(request: NextRequest) {
  if (!isBhashiniConfigured()) {
    return NextResponse.json({ error: 'Bhashini not configured', fallback: true }, { status: 503 });
  }

  try {
    const body = await request.json();
    const { text, language = 'en', gender = 'female' } = body;

    if (!text?.trim()) {
      return NextResponse.json({ error: 'text is required' }, { status: 400 });
    }

    const sourceLanguage = toBhashiniLanguageCode(language);
    const audioBase64 = await runBhashiniTTS(text, sourceLanguage, gender);

    return NextResponse.json({
      audioBase64,
      audioFormat: 'wav',
      provider: 'bhashini',
      sourceLanguage,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'TTS failed';
    return NextResponse.json({ error: message, fallback: true }, { status: 502 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { isBhashiniConfigured, runBhashiniASR, toBhashiniLanguageCode } from '../../../../lib/bhashiniServer';

export async function POST(request: NextRequest) {
  if (!isBhashiniConfigured()) {
    return NextResponse.json({ error: 'Bhashini not configured', fallback: true }, { status: 503 });
  }

  try {
    const body = await request.json();
    const { audioBase64, language = 'kn', audioFormat = 'wav', samplingRate = 16000 } = body;

    if (!audioBase64) {
      return NextResponse.json({ error: 'audioBase64 is required' }, { status: 400 });
    }

    const sourceLanguage = toBhashiniLanguageCode(language);
    const result = await runBhashiniASR(audioBase64, sourceLanguage, audioFormat, samplingRate);

    return NextResponse.json({
      transcript: result.transcript,
      confidence: result.confidence,
      provider: 'bhashini',
      sourceLanguage,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'ASR failed';
    return NextResponse.json({ error: message, fallback: true }, { status: 502 });
  }
}

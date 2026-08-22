import { NextRequest, NextResponse } from 'next/server';
import {
  isBhashiniConfigured,
  runBhashiniTranslation,
  toBhashiniLanguageCode,
} from '../../../../lib/bhashiniServer';

export async function POST(request: NextRequest) {
  if (!isBhashiniConfigured()) {
    return NextResponse.json({ error: 'Bhashini not configured', fallback: true }, { status: 503 });
  }

  try {
    const body = await request.json();
    const { text, sourceLanguage = 'kn', targetLanguage = 'en' } = body;

    if (!text?.trim()) {
      return NextResponse.json({ error: 'text is required' }, { status: 400 });
    }

    const source = toBhashiniLanguageCode(sourceLanguage);
    const target = toBhashiniLanguageCode(targetLanguage);
    const translated = await runBhashiniTranslation(text, source, target);

    return NextResponse.json({
      translated,
      sourceLanguage: source,
      targetLanguage: target,
      provider: 'bhashini',
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Translation failed';
    return NextResponse.json({ error: message, fallback: true }, { status: 502 });
  }
}

import { NextResponse } from 'next/server';
import { isBhashiniConfigured } from '../../../../lib/bhashiniServer';

export async function GET() {
  return NextResponse.json({
    configured: isBhashiniConfigured(),
    provider: 'Bhashini (Government of India ULCA)',
    supportedLanguages: ['kn', 'en'],
    features: ['asr', 'translation', 'tts'],
  });
}

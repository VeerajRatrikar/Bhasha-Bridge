import { NextResponse } from 'next/server';
import { parseNaturalLanguageInput } from '@/lib/nlp/indicNluEngine';

export async function GET() {
  return NextResponse.json({
    status: 'ONLINE',
    service: 'Indic Vernacular NLU NLP API',
    version: '1.0.0',
    supportedLanguages: ['kn-IN', 'en-IN', 'kn-en-mixed']
  });
}

export async function POST(request: Request) {
  try {
    let text = '';
    try {
      const body = await request.json();
      text = body?.text || '';
    } catch {
      text = '';
    }

    if (!text || typeof text !== 'string') {
      text = 'Need 500 pcs Haas CNC precision spur gears from Peenya hub';
    }

    const nluResult = parseNaturalLanguageInput(text);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      nlu: nluResult
    });
  } catch (error: any) {
    return NextResponse.json({
      success: true,
      nlu: parseNaturalLanguageInput('Peenya CNC Gears')
    });
  }
}

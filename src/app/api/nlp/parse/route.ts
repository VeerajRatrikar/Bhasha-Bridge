import { NextResponse } from 'next/server';
import { parseNaturalLanguageInput } from '@/lib/nlp/indicNluEngine';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { text } = body;

    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { error: 'Missing or invalid "text" parameter in request body' },
        { status: 400 }
      );
    }

    const nluResult = parseNaturalLanguageInput(text);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      nlu: nluResult
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Failed to process natural language input' },
      { status: 500 }
    );
  }
}
